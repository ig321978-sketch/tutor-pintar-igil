// Uji Story Kelas 4 Bab 1 Sub-Bab A (Membaca dan Menulis Bilangan Cacah sampai 10.000, termasuk pembuka bab): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Video diputar bergaya guru: suara, teks terlihat, sumber, judul adegan, dan subjudul tanpa penyebutan buku (kata terlarang diperiksa pada adegan yang diputar).
// Memeriksa: pemicu kata, sinkron angka suara dan gambar (bilangan yang diucapkan dengan kata tampak sebagai angka), suara tanpa digit, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas,
// teks bertumpuk, pemisahan materi dan metode luar, tidak membocorkan materi sub-bab B sampai I (nilai tempat, membandingkan, menyusun, operasi, faktor) di luar pembuka, peta konsep, dan Panduan Guru awal,
// kutipan buku terhadap teks PDF (pdftotext, atau PyMuPDF bila tidak ada), nama bilangan dihitung ulang dari angka (terbilang mandiri) untuk semua soal dan kunci, papan empat tempat, balok Dienes, kartu angka,
// garis penghubung nomor 3, tabel nomor 4 (angka berbeda), harga dan kembalian, emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k4b1a.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { spawnSync } from "node:child_process";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k4b1a-video.ts");

const stat = { kutipan: 0, terbilang: 0, teksPasang: 0, persamaan: 0, data: 0, papan: 0, balok: 0 };
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
const VIDEO = [V.VIDEO_MATERI_K4B1A, V.VIDEO_LUAR_K4B1A];
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
          else if (/A/.test(o.d ?? "")) {
            const n = bilangan(o.d);
            const r = n[4];
            cek(x - r > -2 && x + r < 302 && y - r > -2 && y + r < 210, `${nama}#${i + 1}: juring ${o.id} masuk kanvas`);
          }
        } else if (o.t === "garis" || o.t === "panah") cek(x > -2 && x < 302 && y > -2 && y < 204 && x + (o.x2 ?? 0) > -2 && x + (o.x2 ?? 0) < 302 && y + (o.y2 ?? 0) > -2 && y + (o.y2 ?? 0) < 204, `${nama}#${i + 1}: garis ${o.id} masuk kanvas`);
      }
      {
        const teksAda = akhir.filter((o) => o.t === "teks" && (o.op ?? 1) > 0 && o.isi && !/^[\u{1F000}-\u{1FFFF}]|^[✂✅❌]$/u.test(o.isi));
        for (let p = 0; p < teksAda.length; p += 1) {
          for (let q = p + 1; q < teksAda.length; q += 1) {
            stat.teksPasang += 1;
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
const G = await import("../src/components/modul/story/k4b1a-gambar.ts");
const U1 = await import("../src/components/modul/story/k4b1a-luar-1.ts");
const M_VIDEO = V.VIDEO_MATERI_K4B1A;
// Pembuka administratif (tujuan, peta konsep, panduan awal; di I: rubrik, refleksi, interaksi orang tua) tidak lagi diputar di video materi.
// Adegannya tetap ada di berkas materi, jadi pemeriksaan isi memakai daftar penuh; hanya jumlah dan urutan adegan diuji terhadap video yang diputar.
const MODUL_MATERI = Object.assign({}, await import("../src/components/modul/story/k4b1a-materi-1.ts"), await import("../src/components/modul/story/k4b1a-materi-2.ts"), await import("../src/components/modul/story/k4b1a-materi-3.ts"));
const M = { ...M_VIDEO, adegan: [MODUL_MATERI.ADEGAN_PEMBUKA, MODUL_MATERI.ADEGAN_PETA, MODUL_MATERI.ADEGAN_PANDUAN_AWAL, MODUL_MATERI.ADEGAN_CERITA, MODUL_MATERI.ADEGAN_JARAK, MODUL_MATERI.ADEGAN_AKTIVITAS, MODUL_MATERI.ADEGAN_CARA_BACA, MODUL_MATERI.ADEGAN_MENULIS, MODUL_MATERI.ADEGAN_NAMA, MODUL_MATERI.ADEGAN_LATIHAN_SATU, MODUL_MATERI.ADEGAN_LATIHAN_DUA, MODUL_MATERI.ADEGAN_LATIHAN_EMPAT] };
const U = V.VIDEO_LUAR_K4B1A;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const NAMA_LUAR = /Dienes Blocks|Place-Value Chart|Zero as Placeholder|Say-Write-Show|Balok Dienes|Papan Nilai Tempat|Nol Penjaga Tempat|Ucap, Tulis, Tunjuk|metode luar|metode dari luar/i;
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M);
  const luar = teksVideo(U);
  const METODE = ["Dienes Blocks", "Place-Value Chart", "Zero as Placeholder", "Say-Write-Show"];
  const NAMA_ID = ["Balok Dienes Empat Tingkat", "Papan Nilai Tempat", "Nol Penjaga Tempat", "Ucap, Tulis, Tunjuk"];
  cek(!NAMA_LUAR.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of [...METODE, ...NAMA_ID]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE, METODE, "nama metode di berkas luar-1");
  sama(U1.NAMA_METODE_ID, NAMA_ID, "nama Indonesia metode luar");
  // Video diputar sebagai guru yang mengajar: tidak ada penyebutan sumber buku di suara, teks terlihat, label sumber, judul adegan, dan subjudul.
  const TERLARANG = /buku|panduan guru|hlm|halaman|kunci|rubrik|salah ketik|salah cetak|tambahan video|contoh video|temuan/i;
  for (const v of [M_VIDEO, U]) {
    cek(!TERLARANG.test(`${v.judul} ${v.subjudul}`), `${v.id}: judul dan subjudul video tanpa kata terlarang`);
    cek(!/nomor|no\./i.test(v.subjudul) && v.subjudul.length <= 40, `${v.id}: subjudul pendek tanpa nomor halaman`);
    for (const a of v.adegan) {
      const semua = [a.judul, a.sumber];
      a.ketukan.forEach((kt, i) => {
        semua.push(kt.suara);
        for (let p = 0; p < L.kataDari(kt.suara).length; p += 1) semua.push(...L.teksTerlihat(L.keadaanStory(a, i, p)));
      });
      const kena = semua.filter((t) => TERLARANG.test(t) || /soal nomor|Ayo Berlatih nomor|nomor [1-4]|BS|BG|catatan video|menurut buku/i.test(t));
      cek(kena.length === 0, `${v.id}/${a.id}: tanpa penyebutan buku atau catatan sumber (${kena.slice(0, 2).join(" | ")})`);
    }
  }
  cek(M_VIDEO.subjudul === "Materi kurikulum" && U.subjudul === "Empat metode luar", "subjudul video: Materi kurikulum dan Empat metode luar");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber)), "video materi: label sumber berbentuk Materi: ...");
  cek(U.adegan.every((a) => /Metode luar|Ringkasan/i.test(a.sumber)), "video metode luar: tiap adegan bersumber metode luar atau ringkasan");
  cek(U.adegan.every((a) => a.sumber.length <= 46), "video metode luar: label sumber cukup pendek untuk kanvas 300 lebar");
  cek(M_VIDEO.adegan.every((a) => a.sumber.length <= 46), "video materi: label sumber cukup pendek untuk kanvas 300 lebar");
  for (const kata of ["Peta konsep", "Kata kunci", "Apersepsi", "Ayo Berlatih", "Ayo Berpikir", "Miskonsepsi", "Diferensiasi", "Refleksi", "Subbab", "Tujuan pembelajaran", "Panduan guru", "Aktivitas"]) cek(!luar.includes(kata), `video metode luar tidak memuat "${kata}" milik materi`);
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-dienes", "luar-dienes-terapan", "luar-papan", "luar-papan-terapan", "luar-nol", "luar-nol-terapan", "luar-ucap", "luar-ucap-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(U.adegan[0].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  cek(M_VIDEO.adegan.length === 9 && U.adegan.length === 10, "9 adegan materi dan 10 adegan metode luar");
  cek(M.id === "k4b1a-materi" && U.id === "k4b1a-luar", "id video k4b1a-materi dan k4b1a-luar");
  // Sub-Bab A tidak membocorkan materi sub-bab B sampai I. Pembuka bab, peta konsep, dan Panduan Guru awal boleh menyebut nilai tempat, komposisi, operasi, faktor, dan kelipatan sebagai tujuan, kata kunci, dan cabang peta.
  const BOCOR = /membandingkan|mengurutkan|komposisi|dekomposisi|menguraikan|menyusun|penjumlahan|pengurangan|perkalian|pembagian|faktor|kelipatan|nilai tempat|uji kompetensi|refleksi|pengayaan|remedial|lebih besar|lebih kecil/i;
  const boleh = ["pembuka-bab", "peta-konsep", "panduan-awal"];
  for (const a of M.adegan.filter((x) => !boleh.includes(x.id))) cek(!BOCOR.test(teksAdegan(a)), `materi ${a.id} tidak membocorkan sub-bab B sampai I`);
  for (const a of U.adegan) cek(!BOCOR.test(teksAdegan(a).replace(/Papan Nilai Tempat|Place-Value Chart/g, "")), `metode luar ${a.id} tidak membocorkan sub-bab B sampai I`);
  cek(/nilai tempat/i.test(teksAdegan(adegan(M, "pembuka-bab"))) && /nilai tempat/i.test(teksAdegan(adegan(M, "peta-konsep"))), "pembuka bab dan peta konsep menyebut nilai tempat sebagai tujuan, kata kunci, dan cabang peta");
  cek(totalKetukan >= 70, `total ketukan cukup dalam (${totalKetukan})`);
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "cerita-minimarket,jarak-rumah,aktivitas-satu,cara-membaca,menulis-bilangan,nama-bilangan,berlatih-satu,berlatih-dua-tiga,berlatih-empat", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "luar-pembuka,luar-dienes,luar-dienes-terapan,luar-papan,luar-papan-terapan,luar-nol,luar-nol-terapan,luar-ucap,luar-ucap-terapan,luar-ringkas", "urutan adegan metode luar");
  // Tiga nama metode lama sama dengan naskah bab; nama metode baru belum dipakai naskah, judul, atau lab lain pada bab ini.
  const modul = new URL("../src/components/modul/", import.meta.url);
  const baca = (n) => readFileSync(new URL(n, modul), "utf8");
  const naskah = baca("naskah-k4b1.ts");
  cek(/Dienes Blocks/.test(naskah) && /Place-Value Chart/.test(naskah) && /Zero as Placeholder/.test(naskah), "tiga nama metode lama sama dengan nama di naskah bab");
  cek(/Balok Dienes Empat Tingkat/.test(naskah) && /Papan Nilai Tempat/.test(naskah) && /Nol Penjaga Tempat/.test(naskah), "tiga nama Indonesia metode lama sama dengan naskah bab");
  const berkasLab = readdirSync(modul).filter((f) => /^lab-.*k4b1.*\.ts$/.test(f));
  cek(berkasLab.length >= 8, `berkas lab bab 1 ditemukan (${berkasLab.length})`);
  for (const n of ["naskah-k4b1.ts", "data-k4b1.ts", ...berkasLab]) cek(!/Say-Write-Show|Ucap, Tulis, Tunjuk|Digit Cards/i.test(baca(n)), `nama metode baru Say-Write-Show / Ucap, Tulis, Tunjuk tidak bentrok dengan ${n}`);
  for (const ad of [...M.adegan, ...U.adegan]) cek(!/Say-Write-Show|Ucap, Tulis, Tunjuk/i.test(ad.judul) || U.adegan.includes(ad), `judul ${ad.id}: nama metode baru hanya di video metode luar`);
}

/* ------------------------------ Bilangan yang diucapkan dengan kata tampak sebagai angka ------------------------------ */
const SATUAN = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];
const NAMA_ANGKA = new Set([...SATUAN, "sepuluh", "sebelas", "seratus", "seribu", "belas", "puluh", "ratus", "ribu"]);
const nilaiKata = (kata) => {
  let total = 0;
  let cur = 0;
  let tunda = 0;
  for (const w of kata) {
    const u = SATUAN.indexOf(w);
    if (u >= 0) tunda = u;
    else if (w === "sepuluh") cur += 10;
    else if (w === "sebelas") cur += 11;
    else if (w === "belas") {
      cur += tunda + 10;
      tunda = 0;
    } else if (w === "puluh") {
      cur += tunda * 10;
      tunda = 0;
    } else if (w === "seratus") cur += 100;
    else if (w === "ratus") {
      cur += tunda * 100;
      tunda = 0;
    } else if (w === "seribu") total += 1000;
    else if (w === "ribu") {
      total += (cur + tunda || 1) * 1000;
      cur = 0;
      tunda = 0;
    }
  }
  return total + cur + tunda;
};
const deretBilangan = (suara) => {
  const hasil = [];
  let run = [];
  const tutup = () => {
    if (run.length && !["puluh", "belas", "ratus"].includes(run[0])) {
      const nilai = nilaiKata(run);
      if (nilai >= 10) hasil.push({ kata: run.join(" "), nilai });
    }
    run = [];
  };
  for (const mentah of suara.split(/\s+/).filter(Boolean)) {
    const w = mentah.toLowerCase().replace(/[^a-z]/g, "");
    if (NAMA_ANGKA.has(w)) run.push(w);
    else tutup();
    if (/[,.:;?!]$/.test(mentah)) tutup();
  }
  tutup();
  return hasil;
};
for (const v of [M, U]) {
  for (const a of v.adegan) {
    const terlihat = new Set();
    a.ketukan.forEach((kt, i) => {
      for (let p = 0; p < L.kataDari(kt.suara).length; p += 1) for (const o of L.keadaanStory(a, i, p)) if (o.t === "teks" && o.isi) for (const b of bilanganDari(o.isi)) terlihat.add(b);
      for (const d of deretBilangan(kt.suara)) {
        stat.terbilang += 1;
        cek(terlihat.has(String(d.nilai)), `${v.id}/${a.id}#${i + 1}: bilangan "${d.kata}" (${d.nilai}) tampak sebagai angka di gambar`);
      }
    });
  }
}

/* ------------------------------ Semua persamaan di gambar dihitung ulang ------------------------------ */
const hitungEks = (s) => {
  const t = s.replace(/\./g, "").replace(/×/g, "*").replace(/x/g, "*").replace(/−/g, "-");
  if (!/^[\d\s+*-]+$/.test(t)) return null;
  return Function(`"use strict";return (${t})`)();
};
for (const v of [M, U]) {
  for (const a of v.adegan) {
    const sudah = new Set();
    a.ketukan.forEach((kt, i) => {
      for (let p = 0; p < L.kataDari(kt.suara).length; p += 1)
        for (const o of L.keadaanStory(a, i, p)) {
          if (o.t !== "teks" || !o.isi || sudah.has(`${o.id}:${o.isi}`)) continue;
          sudah.add(`${o.id}:${o.isi}`);
          const m = o.isi.match(/^([\d\s+×x−.-]+?)\s*=\s*(\d[\d.]*)(?:\D.*)?$/);
          if (m && /[+×x−-]/.test(m[1])) {
            stat.persamaan += 1;
            cek(hitungEks(m[1]) === Number(m[2].replace(/\./g, "")), `${v.id}/${a.id}: persamaan "${o.isi}" dihitung ulang`);
          }
        }
    });
  }
}


/* ------------------------------ Terbilang mandiri dan data buku ------------------------------ */
const SAT = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];
/** Nama bilangan 0 sampai 9999 dihitung dari angkanya (tanpa melihat data buku). */
const terbilang = (n) => {
  if (n === 0) return "nol";
  const r = Math.floor(n / 1000);
  const s = Math.floor((n % 1000) / 100);
  const p = Math.floor((n % 100) / 10);
  const u = n % 10;
  const bagian = [];
  if (r) bagian.push(r === 1 ? "seribu" : `${SAT[r]} ribu`);
  if (s) bagian.push(s === 1 ? "seratus" : `${SAT[s]} ratus`);
  if (p === 1) bagian.push(u === 0 ? "sepuluh" : u === 1 ? "sebelas" : `${SAT[u]} belas`);
  else {
    if (p > 1) bagian.push(`${SAT[p]} puluh`);
    if (u) bagian.push(SAT[u]);
  }
  return bagian.join(" ");
};
const angkaDari = (t) => Number(String(t).replace(/\./g, ""));
{
  sama([terbilang(3286), terbilang(6750), terbilang(1025), terbilang(7003), terbilang(6570), terbilang(1206), terbilang(6002), terbilang(10)], ["tiga ribu dua ratus delapan puluh enam", "enam ribu tujuh ratus lima puluh", "seribu dua puluh lima", "tujuh ribu tiga", "enam ribu lima ratus tujuh puluh", "seribu dua ratus enam", "enam ribu dua", "sepuluh"], "terbilang mandiri: contoh");
  for (const [nama, daftar] of [["Latihan 1", G.LATIHAN_SATU], ["Latihan 2", G.LATIHAN_DUA], ["Latihan 3", G.LATIHAN_TIGA], ["Contoh baca", G.CONTOH_BACA]]) {
    for (const [n, kata] of daftar) {
      stat.data += 1;
      cek(terbilang(n) === kata.toLowerCase(), `${nama}: ${n} dibaca "${terbilang(n)}", data buku "${kata}"`);
      cek(G.rb(n) === String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "."), `${nama}: titik ribuan ${n}`);
    }
  }
  for (const [angka, n, kata] of G.TABEL_EMPAT) {
    stat.data += 1;
    cek(Number(angka) === n && terbilang(n) === kata, `Tabel nomor 4: ${angka} bernilai ${n}, dibaca "${terbilang(n)}", data "${kata}"`);
  }
  const berulang = G.TABEL_EMPAT.map(([angka]) => new Set(angka).size < 4);
  sama(berulang, [false, true, true, false, false, true], "Tabel nomor 4: baris yang mengulang angka (8888, 7030, 0036) dihitung mandiri");
  cek(G.LATIHAN_DUA[1][0] - G.LATIHAN_DUA[0][0] === G.LATIHAN_DUA[2][0] && G.LATIHAN_DUA[0][0] + G.LATIHAN_DUA[2][0] === G.LATIHAN_DUA[1][0], "nomor 2: kembalian 2.150 = 9.500 dikurangi 7.350");
  cek(new Set(G.LATIHAN_TIGA.map(([n]) => n)).size === 4 && new Set(G.LATIHAN_TIGA.map(([, t]) => t)).size === 4, "nomor 3: empat bilangan dan empat nama berbeda");
}

/* ------------------------------ Gambar dihitung ulang: papan, kartu angka, balok Dienes, garis hubung, tabel ------------------------------ */
const adegM = (id) => adegan(M, id);
const adegU = (id) => adegan(U, id);
const semuaAdegan = [...M.adegan, ...U.adegan];
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
{
  // Papan empat tempat: kolom berurutan kiri ke kanan, kepala benar, bilangan terbentuk sama dengan yang diucapkan atau ditulis di adegan yang sama.
  let papan = 0;
  for (const a of semuaAdegan) {
    const bacaan = a.ketukan.map((kt) => kt.suara.toLowerCase()).join(" ");
    const tampak = new Set();
    a.ketukan.forEach((kt, i) => L.teksTerlihat(L.keadaanStory(a, i, 9999)).forEach((t) => tampak.add(t)));
    a.ketukan.forEach((kt, i) => {
      const objs = L.keadaanStory(a, i, 9999);
      const awalan = new Set(objs.map((o) => /^(.*)-dt[0-3]$/.exec(o.id)?.[1]).filter(Boolean));
      for (const p of awalan) {
        const dt = [0, 1, 2, 3].map((c) => ketemu(objs, `${p}-dt${c}`));
        const d = [0, 1, 2, 3].map((c) => ketemu(objs, `${p}-d${c}`));
        if (!dt.every(Boolean) || !d.every(Boolean)) continue;
        papan += 1;
        const nama = `${a.id}#${i + 1} papan ${p}`;
        cek(d.every((o, c) => c === 0 || (o.x > d[c - 1].x && Math.abs(o.w - d[0].w) < 1e-9 && Math.abs(o.x - d[c - 1].x - d[0].w) < 1e-6)), `${nama}: empat kolom berderet sama lebar dari kiri ke kanan`);
        cek(dt.every((o, c) => Math.abs(o.x - (d[c].x + d[c].w / 2)) < 1e-6 && o.y > d[c].y && o.y < d[c].y + d[c].h + 8), `${nama}: angka tepat di tengah kotak kolomnya`);
        const kepalaTeks = [0, 1, 2, 3].map((c) => isiTeks(objs, `${p}-ht${c}`));
        if (kepalaTeks.every(Boolean)) {
          sama(kepalaTeks, ["Ribuan", "Ratusan", "Puluhan", "Satuan"], `${nama}: kepala kolom`);
          cek([0, 1, 2, 3].every((c) => Math.abs(ketemu(objs, `${p}-ht${c}`).x - (d[c].x + d[c].w / 2)) < 1e-6), `${nama}: kepala kolom sejajar dengan kolom angkanya`);
        }
        const n = Number(dt.map((o) => o.isi).join(""));
        cek(bacaan.includes(terbilang(n)) || tampak.has(G.rb(n)) || [...tampak].some((t) => t.includes(G.rb(n))), `${nama}: bilangan ${n} ("${terbilang(n)}") disebut atau tertulis di adegan`);
      }
    });
  }
  cek(papan >= 20, `papan empat tempat diperiksa (${papan})`);
  stat.papan = papan;

  // Kartu angka Aktivitas 1 dan contoh lain: sepuluh kartu 0 sampai 9, kartu jarak 3 2 8 6, label harga 6750, kartu 3254, kartu 9045.
  const a1 = akhirAdegan(adegM("aktivitas-satu"), 2);
  sama([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => isiTeks(a1, `ka${i}-t`)), ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], "Aktivitas 1: sepuluh kartu angka nol sampai sembilan berurutan");
  cek(a1.filter((o) => /^ka\d-k$/.test(o.id)).every((o, i, s) => o.w === s[0].w && o.h === s[0].h), "Aktivitas 1: kartu sama besar");
  const a1b = akhirAdegan(adegM("aktivitas-satu"), 1);
  sama(a1b.filter((o) => /^kt\d$/.test(o.id)).length, 10, "Aktivitas 1 langkah 2: sepuluh kotak karton digambar");
  const a1c = akhirAdegan(adegM("aktivitas-satu"), 3);
  sama(["m0", "m1", "m2", "m3"].map((c) => isiTeks(a1c, `${c}-t`)).join(""), "3286", "Aktivitas 1 langkah 5: kartu angka jarak rumah Helen terbaca 3286");
  sama(angkaDari(isiTeks(akhirAdegan(adegM("jarak-rumah"), 1), "r5-t0")?.split(" ")[0]), 3286, "jarak rumah Helen 3.286 meter");
  sama([0, 1, 2, 3].map((i) => isiTeks(akhirAdegan(adegM("jarak-rumah"), 2), `b3${i}-t`)).join(""), "3286", "kartu angka 3286 pada adegan jarak");
  sama([0, 1, 2, 3].map((i) => isiTeks(akhirAdegan(adegM("panduan-awal")), `la${i}-t`)).join(""), "6750", "kartu angka label harga 6750 di panduan awal");
  sama([0, 1, 2, 3].map((i) => isiTeks(akhirAdegan(adegM("menulis-bilangan")), `hk${i}-t`)).join(""), "3254", "kartu angka 3254 pada hasil percakapan");
  sama([0, 1, 2, 3].map((i) => isiTeks(akhirAdegan(adegU("luar-ucap-terapan"), 2), `vg${i}-t`)).join(""), "9045", "Say-Write-Show: kartu angka 9045");
  // Papan Buku Siswa: jarak 3286, contoh 2634, 7003, 6570, Semeru 3676, percakapan 3254, 4327, 1025, 2000.
  const nilaiPapan = (objs, p) => [0, 1, 2, 3].map((c) => isiTeks(objs, `${p}-dt${c}`)).join("");
  sama(nilaiPapan(akhirAdegan(adegM("cara-membaca"), 4), "pj"), "3286", "papan jarak rumah Helen");
  sama([nilaiPapan(akhirAdegan(adegM("cara-membaca"), 5), "e1"), nilaiPapan(akhirAdegan(adegM("cara-membaca"), 5), "e2"), nilaiPapan(akhirAdegan(adegM("cara-membaca"), 6), "e3")], ["2634", "7003", "6570"], "papan contoh Buku Siswa hlm. 6");
  sama([nilaiPapan(akhirAdegan(adegM("menulis-bilangan"), 2), "ms"), nilaiPapan(akhirAdegan(adegM("menulis-bilangan"), 4), "pq")], ["3676", "3254"], "papan Gunung Semeru dan percakapan");
  sama([nilaiPapan(akhirAdegan(adegM("nama-bilangan"), 0), "na"), nilaiPapan(akhirAdegan(adegM("nama-bilangan"), 3), "nf"), nilaiPapan(akhirAdegan(adegM("nama-bilangan"), 5), "no")], ["4327", "1025", "2000"], "papan Buku Siswa hlm. 9");
  // Cara membaca: kartu hasil jarak dibaca benar, dan tiga bacaan contoh (diucapkan di suara) sama dengan terbilang mandiri.
  const cb = akhirAdegan(adegM("cara-membaca"), 4);
  sama(`${isiTeks(cb, "pjb-t0")} ${isiTeks(cb, "pjb-t1")}`.toLowerCase(), "tiga ribu dua ratus delapan puluh enam", "kartu Dibaca jarak rumah Helen");
  const cb2 = akhirAdegan(adegM("cara-membaca"), 5);
  sama([isiTeks(cb2, "e1b"), isiTeks(cb2, "e2b")], [terbilang(2634), terbilang(7003)], "contoh membaca 2.634 dan 7.003");
  sama(isiTeks(akhirAdegan(adegM("cara-membaca"), 6), "e3b"), terbilang(6570), "contoh membaca 6.570");
  // Pesan guru tentang tertukar tempat: papan kepala empat kolom dan kartu salah/benar tampil.
  const cat = akhirAdegan(adegM("cara-membaca"), 2);
  sama([0, 1, 2, 3].map((i) => isiTeks(cat, `pc-ht${i}`)), ["Ribuan", "Ratusan", "Puluhan", "Satuan"], "pesan guru tertukar tempat: kepala kolom papan");
  cek(!!ketemu(cat, "pcm-k") && !!ketemu(cat, "pcn-k"), "pesan guru tertukar tempat: kartu salah dan benar");
  // Jarak rumah Helen: urutan angka 3.286 (benar) dan 3.268 (contoh salah) tampil bersama.
  const jr = akhirAdegan(adegM("jarak-rumah"), 3);
  cek(L.teksTerlihat(jr).some((t) => t.includes("3.268")) && L.teksTerlihat(jr).some((t) => t.includes("3.286")), "pesan guru urutan angka: 3.268 salah dan 3.286 benar tampil");
  // Semeru dan latihan: nama bilangan pada gambar dihitung ulang.
  const lat = adegM("berlatih-satu");
  const KOTAK = [["la", 1, "lb-t0", "5.091"], ["lb2", 2, "lb2-t0", "4.884 mdpl"], ["lc2", 3, "lc2-t0", "5.780 km²"], ["ld5", 4, "ld5", "1.206"]];
  for (const [id, ke, , harapan] of KOTAK) {
    const objs = akhirAdegan(lat, ke);
    const t = objs.find((o) => o.t === "teks" && o.isi === harapan);
    cek(!!t, `latihan nomor 1: gambar ${"abcd"[ke - 1]} memuat "${harapan}" (${id})`);
  }
  [0, 1, 2, 3].forEach((i) => {
    const [n, nama] = G.LATIHAN_SATU[i];
    const objs = akhirAdegan(lat, i + 1);
    const baris = objs.filter((o) => o.t === "teks" && o.isi === nama);
    cek(baris.length === 1 && terbilang(n) === nama, `latihan nomor 1 ${"abcd"[i]}: kartu bacaan "${nama}" sama dengan terbilang ${n}`);
  });
  // Nol pada latihan nomor 1: ratusan nol (5091), satuan nol (5780), puluhan nol (1206).
  sama([["5091", 1], ["5780", 3], ["1206", 2]].map(([a, c]) => a[c]), ["0", "0", "0"], "latihan nomor 1: posisi nol 5.091 ratusan, 5.780 satuan, 1.206 puluhan");
  // Nomor 2: harga, uang, kembalian; hitungan mandiri.
  const dua = akhirAdegan(adegM("berlatih-dua-tiga"), 0);
  sama([isiTeks(dua, "d1-t0"), isiTeks(dua, "d2-t0"), isiTeks(dua, "d3-t0")].map((t) => angkaDari(t.split("Rp")[1])), [7350, 9500, 2150], "nomor 2: harga, uang, kembalian di gambar");
  const kunci2 = akhirAdegan(adegM("berlatih-dua-tiga"), 1);
  sama([0, 1, 2].map((i) => isiTeks(kunci2, `e${i + 1}-t1`)), G.LATIHAN_DUA.map(([, t]) => t), "nomor 2: bacaan kunci di gambar");
  // Nomor 3: garis penghubung dihitung ulang dari koordinat; kunci Panduan Guru: tiap bilangan terhubung ke nama yang sama dengan terbilang mandiri.
  {
    const a = adegM("berlatih-dua-tiga");
    const objs = akhirAdegan(a, a.ketukan.length - 1);
    const kiri = [0, 1, 2, 3].map((i) => ({ n: angkaDari(isiTeks(objs, `kl${i}-t0`)), y: ketemu(objs, `kl${i}-k`).y + ketemu(objs, `kl${i}-k`).h / 2 }));
    const kanan = [0, 1, 2, 3].map((j) => ({ t: isiTeks(objs, `kr${j}-t0`), y: ketemu(objs, `kr${j}-k`).y + ketemu(objs, `kr${j}-k`).h / 2 }));
    sama(new Set(kanan.map((q) => q.t)).size, 4, "nomor 3: empat nama di kolom kanan berbeda");
    let hubung = 0;
    for (let i = 0; i < 4; i += 1) {
      const g = ketemu(objs, `gk${i}`);
      cek(!!g, `nomor 3: garis gk${i} digambar`);
      if (!g) continue;
      const mulai = kiri.find((q) => Math.abs(q.y - g.y) < 1);
      const tujuan = kanan.find((q) => Math.abs(q.y - (g.y + g.y2)) < 1);
      cek(!!mulai && !!tujuan, `nomor 3: ujung garis gk${i} tepat di tengah kotak`);
      if (mulai && tujuan) {
        hubung += 1;
        cek(tujuan.t.toLowerCase() === terbilang(mulai.n), `nomor 3: ${mulai.n} terhubung ke "${tujuan.t}", terbilang mandiri "${terbilang(mulai.n)}"`);
      }
    }
    sama(hubung, 4, "nomor 3: empat garis hubung");
    cek(kiri.every((q) => G.LATIHAN_TIGA.some(([n]) => n === q.n)), "nomor 3: bilangan kolom kiri sama dengan soal buku");
  }
  // Nomor 4: tabel dari gambar; angka diambil, nilai, dan nama bilangan dihitung ulang; baris berulang diberi warna.
  {
    const a = adegM("berlatih-empat");
    const objs = akhirAdegan(a, 3);
    // Tiga baris yang disajikan memakai empat angka berbeda: 4680, 7201, 0694 (baris 0, 3, 4 pada data).
    const rowsOk = [0, 1, 2].map((i) => {
      const angka = isiTeks(objs, `r${i}-t0`)?.replace(/ /g, "");
      const n = angkaDari(isiTeks(objs, `r${i}-t1`));
      return Number(angka) === n && isiTeks(objs, `r${i}-t2`) === terbilang(n) && angka.length === 4;
    });
    sama(rowsOk, [true, true, true], "nomor 4: tiap baris tabel: angka, nilai, dan nama bilangan cocok");
    sama([0, 1, 2].map((i) => new Set(isiTeks(objs, `r${i}-t0`).replace(/ /g, "")).size), [4, 4, 4], "nomor 4: baris yang disajikan memakai empat angka berbeda");
    const merah = akhirAdegan(a, 4);
    cek(L.teksTerlihat(merah).some((t) => t.startsWith("8 8 8 8")) && !ketemu(merah, "nx-k"), "nomor 4: contoh angka berulang 8 8 8 8 ditolak");
  }
}

/* ------------------------------ Balok Dienes dihitung ulang ------------------------------ */
{
  const hitungJenis = (objs, id, j) => objs.filter((o) => new RegExp(`^${id}-${j}\\d+$`).test(o.id)).length;
  const luas = (o) => (o.t === "bulat" ? Math.PI * o.r * o.r : o.w * o.h);
  const sa = akhirAdegan(adegU("luar-dienes"), 0);
  const L4 = ["p", "u", "b", "o"].map((j) => ketemu(sa, `sa-${j}0`));
  cek(L4.every(Boolean) && luas(L4[0]) > luas(L4[1]) && luas(L4[1]) > luas(L4[2]) && luas(L4[2]) > luas(L4[3]), "Dienes: ukuran peti > dus > bungkus > benda");
  const nilai = akhirAdegan(adegU("luar-dienes"), 1);
  sama(["sv0", "sv1", "sv2", "sv3"].map((i) => isiTeks(nilai, i)), ["1", "10", "100", "1.000"], "Dienes: nilai benda, bungkus, dus, peti");
  const tukar = akhirAdegan(adegU("luar-dienes"), 2);
  sama([hitungJenis(tukar, "sb", "o"), hitungJenis(tukar, "sb", "b"), hitungJenis(tukar, "sc", "b"), hitungJenis(tukar, "sc", "u")], [10, 1, 10, 1], "Dienes: sepuluh benda satu bungkus, sepuluh bungkus satu dus");
  const tukar2 = akhirAdegan(adegU("luar-dienes"), 3);
  sama([hitungJenis(tukar2, "sd", "u"), hitungJenis(tukar2, "sd", "p")], [10, 1], "Dienes: sepuluh dus satu peti");
  const NILAI_JENIS = { p: 1000, u: 100, b: 10, o: 1 };
  const NAMA_JENIS = { peti: "p", dus: "u", bungkus: "b", benda: "o" };
  const periksa = (ke, awalan, bilangan, judulTeks) => {
    const t = akhirAdegan(adegU("luar-dienes-terapan"), ke);
    const hitung = ["p", "u", "b", "o"].map((j) => hitungJenis(t, awalan, j));
    sama(hitung.reduce((s, c, i) => s + c * Object.values(NILAI_JENIS)[i], 0), bilangan, `Dienes terapan ${awalan}: balok bernilai ${bilangan}`);
    cek(hitung.every((c) => c <= 9), `Dienes terapan ${awalan}: tiap jenis balok paling banyak 9 (${hitung.join(",")})`);
    const label = t.filter((o) => o.t === "teks" && /^\d+ (peti|dus|bungkus|benda) = [\d.]+$/.test(o.isi ?? ""));
    sama(label.length, 4, `Dienes terapan ${awalan}: empat label hitungan`);
    for (const o of label) {
      const m = /^(\d+) (\w+) = ([\d.]+)$/.exec(o.isi);
      const j = NAMA_JENIS[m[2]];
      cek(Number(m[1]) === hitungJenis(t, awalan, j) && Number(m[1]) * NILAI_JENIS[j] === angkaDari(m[3]), `Dienes terapan ${awalan}: label "${o.isi}" cocok dengan gambar dan hitungan mandiri`);
    }
    cek(judulTeks === undefined || L.teksTerlihat(t).some((x) => x.includes(judulTeks)), `Dienes terapan ${awalan}: judul memuat ${judulTeks}`);
    stat.balok += hitung.reduce((s, c) => s + c, 0);
  };
  stat.balok = 0;
  periksa(2, "ta", 3286, "3.286");
  periksa(3, "tq", 6750, "6.750");
  const tq = akhirAdegan(adegU("luar-dienes-terapan"), 3);
  sama(hitungJenis(tq, "tq", "o"), 0, "Dienes terapan 6.750: tidak ada benda lepas (satuan nol)");
  sama(L.kataDari(adegU("luar-dienes-terapan").ketukan[3].suara).includes("nol."), true, "Dienes terapan 6.750: suara menyebut satuan nol");
}

/* ------------------------------ Aturan nol dan pecahan ucapan di metode luar ------------------------------ */
{
  const Z = adegU("luar-nol");
  const z2 = akhirAdegan(Z, 1);
  sama([isiTeks(z2, "zc"), isiTeks(z2, "ze")], ["7.003", "73"], "Zero as Placeholder: 7.003 tanpa nol menjadi 73");
  sama(terbilang(73), "tujuh puluh tiga", "Zero as Placeholder: 73 dibaca tujuh puluh tiga");
  const y4 = akhirAdegan(adegU("luar-nol-terapan"), 3);
  sama(nilaiPapanSemua(y4, "yd"), "6002", "Zero as Placeholder: papan 6.002");
  cek(L.teksTerlihat(y4).some((t) => t.includes("62")) && terbilang(62) === "enam puluh dua", "Zero as Placeholder: tanpa nol penjaga 6.002 menjadi 62 (enam puluh dua)");
  sama(["ya", "yb", "yc"].map((p, i) => nilaiPapanSemua(akhirAdegan(adegU("luar-nol-terapan"), i), p)), ["7003", "6570", "1025"], "Zero as Placeholder: papan 7.003, 6.570, 1.025");
  const q1 = akhirAdegan(adegU("luar-papan-terapan"), 0);
  sama([nilaiPapanSemua(q1, "qa"), nilaiPapanSemua(akhirAdegan(adegU("luar-papan-terapan"), 2), "qc"), nilaiPapanSemua(akhirAdegan(adegU("luar-papan"), 2), "pc")], ["2634", "3254", "2634"], "Place-Value Chart: papan 2.634, 3.254, 2.634");
  const q2 = akhirAdegan(adegU("luar-papan-terapan"), 1);
  sama([0, 1, 2, 3].map((i) => isiTeks(q2, `qv${i}`)), ["2.000", "600", "30", "4"], "Place-Value Chart: nilai tiap kolom 2.634");
  sama([2000, 600, 30, 4].map(terbilang), [isiTeks(q2, "qb0"), isiTeks(q2, "qb1"), isiTeks(q2, "qb2"), isiTeks(q2, "qb3")], "Place-Value Chart: bacaan tiap kolom sama dengan terbilang mandiri");
  const p2 = akhirAdegan(adegU("luar-papan"), 1);
  sama([isiTeks(p2, "pb1-t0"), isiTeks(p2, "pb2-t0"), isiTeks(p2, "pb3-t0")].map((t) => t.match(/\(([\d.]+)\)/)[1]), ["50", "500", "5.000"], "Place-Value Chart: lima di puluhan, ratusan, ribuan");
  sama([terbilang(50), terbilang(500), terbilang(5000)], ["lima puluh", "lima ratus", "lima ribu"], "Place-Value Chart: bacaan lima di tiap kolom");
  const v4 = akhirAdegan(adegU("luar-ucap-terapan"), 3);
  cek(L.teksTerlihat(v4).includes("kartu: 62") && L.teksTerlihat(v4).includes("kartu: 6.002"), "Say-Write-Show: tulisan enam dua keliru, 6.002 benar");
  sama(terbilang(9045), "sembilan ribu empat puluh lima", "Say-Write-Show: 9.045 dibaca sembilan ribu empat puluh lima");
}
function nilaiPapanSemua(objs, p) {
  return [0, 1, 2, 3].map((c) => objs.find((o) => o.id === `${p}-dt${c}`)?.isi).join("");
}

/* ------------------------------ Kutipan buku (bila PDF tersedia) ------------------------------ */
{
  const bs = new URL("../bahan-sd/Matematika-BS-KLS-IV.pdf", import.meta.url);
  const bg = new URL("../bahan-sd/Matematika-BG-KLS-IV.pdf", import.meta.url);
  const jalur = (u) => u.pathname.replace(/^\/([A-Za-z]:)/, "$1");
  const KODE_PY = "import sys, pymupdf\nsys.stdout.reconfigure(encoding='utf-8', errors='replace')\nd = pymupdf.open(sys.argv[1])\nsys.stdout.write('\\n'.join(d[i - 1].get_text() for i in range(int(sys.argv[2]), int(sys.argv[3]) + 1)))";
  const ambil = (berkas, dari, sampai) => {
    const r = spawnSync("pdftotext", ["-enc", "UTF-8", "-f", String(dari), "-l", String(sampai), "-raw", jalur(berkas), "-"], { encoding: "utf8", maxBuffer: 1 << 26 });
    if (r.status === 0) return r.stdout;
    // Cadangan bila pdftotext tidak ada: PyMuPDF (python -I).
    const p = spawnSync("python", ["-I", "-c", KODE_PY, jalur(berkas), String(dari), String(sampai)], { encoding: "utf8", maxBuffer: 1 << 26 });
    return p.status === 0 ? p.stdout : null;
  };
  // Kelas IV: Buku Siswa hlm. N = PDF N+12 (hlm. 1-12 = PDF 13-24; subbab B mulai di tengah PDF 24, nomor 4 Ayo Berlatih masih milik A); Panduan Guru hlm. N = PDF N+12 (hlm. 27-35 = PDF 39-47; subbab B mulai di tengah PDF 47).
  const bagian = existsSync(bs) && existsSync(bg) ? [ambil(bs, 13, 24), ambil(bg, 39, 47), ambil(bs, 13, 23), ambil(bg, 39, 46), ambil(bs, 24, 24), ambil(bg, 47, 47)] : [null];
  if (bagian.some((b) => b === null)) console.log("PDF atau pembaca PDF tidak tersedia: pemeriksaan kutipan buku dilewati");
  else {
    const bersih = (t) => t.toLowerCase().replace(/-\s*\n\s*/g, "-").replace(/\s+/g, " ").trim();
    const JUDUL_B_BS = "b. menentukan dan menggunakan nilai tempat";
    const JUDUL_B_BG = "b. nilai tempat bilangan cacah";
    const siswaPenuh = bersih(bagian[0]);
    const guruPenuh = bersih(bagian[1]);
    const awalBs = siswaPenuh.indexOf(JUDUL_B_BS);
    const awalBg = guruPenuh.indexOf(JUDUL_B_BG);
    cek(awalBs > 0 && awalBg > 0, "Buku Siswa PDF 24 dan Panduan Guru PDF 47 memuat judul subbab B");
    const siswa = siswaPenuh.slice(0, awalBs);
    const guru = guruPenuh.slice(0, awalBg);
    const buku = `${siswa}\n${guru}`;
    cek(!bersih(bagian[2]).includes(JUDUL_B_BS) && !bersih(bagian[3]).includes(JUDUL_B_BG), "subbab B belum mulai di Buku Siswa PDF 13-23 dan Panduan Guru PDF 39-46");
    cek(bersih(bagian[4]).includes(JUDUL_B_BS) && bersih(bagian[5]).includes(JUDUL_B_BG), "subbab B mulai di Buku Siswa PDF 24 dan Panduan Guru PDF 47");
    cek(bersih(bagian[4]).indexOf("ambil kartu bilangan dengan 4 angka") >= 0 && bersih(bagian[4]).indexOf("ambil kartu bilangan dengan 4 angka") < bersih(bagian[4]).indexOf(JUDUL_B_BS), "nomor 4 Ayo Berlatih ada di PDF 24, sebelum judul subbab B");
    // Nomor halaman cetak sama dengan PDF dikurangi 12 (PDF 39 adalah halaman judul bab tanpa nomor).
    const halaman = (berkas, pdf, cetak) => new RegExp(`(^|\\n)\\s*${cetak}(\\s|$)`).test(ambil(berkas, pdf, pdf));
    for (let pdf = 13; pdf <= 24; pdf += 1) cek(halaman(bs, pdf, pdf - 12), `Buku Siswa PDF ${pdf} bernomor halaman ${pdf - 12}`);
    for (let pdf = 40; pdf <= 47; pdf += 1) cek(halaman(bg, pdf, pdf - 12), `Panduan Guru PDF ${pdf} bernomor halaman ${pdf - 12}`);
    let n = 0;
    for (const a of M.adegan) {
      for (const kt of a.kutipan ?? []) {
        n += 1;
        cek(buku.includes(bersih(kt)), `kutipan buku ${a.id}: "${kt}" ada di teks PDF`);
      }
    }
    stat.kutipan = n;
    cek(n >= 100, `jumlah kutipan buku yang diperiksa (${n})`);
    cek(M.adegan.every((a) => (a.kutipan ?? []).length >= 3), "tiap adegan materi memuat paling sedikit 3 kutipan buku");
    // Tujuan: Buku Siswa dua belas butir, Panduan Guru dua belas butir (1.1 sampai 1.12 lintas dua halaman).
    sama((ambil(bs, 14, 14).match(/•/g) ?? []).length, 12, "Buku Siswa hlm. 2: 12 butir tujuan");
    sama(((ambil(bg, 39, 40)).match(/(^|\n)1\.\d+ /g) ?? []).length, 12, "Panduan Guru hlm. 27-28: 12 butir tujuan");
    // Kunci Panduan Guru dan soal Buku Siswa cocok dengan data gambar dan terbilang mandiri.
    const tulisanBg = bersih(ambil(bg, 45, 46));
    for (const [n2, nama] of G.LATIHAN_SATU) cek(tulisanBg.includes(`${G.rb(n2)} dibaca ${nama}`), `kunci Panduan Guru nomor 1: ${G.rb(n2)} dibaca ${nama}`);
    for (const [n2, nama] of G.LATIHAN_DUA) cek(tulisanBg.includes(`bilangan ${G.rb(n2)}! dibaca ${nama}`), `kunci Panduan Guru nomor 2: ${G.rb(n2)} dibaca ${nama}`);
    for (const [n2, nama] of G.LATIHAN_TIGA) cek(tulisanBg.includes(`${G.rb(n2)} terhubung dengan ${nama.toLowerCase()}`), `kunci Panduan Guru nomor 3: ${G.rb(n2)} terhubung dengan ${nama}`);
    for (const [, n2, nama] of G.TABEL_EMPAT) cek(tulisanBg.includes(nama), `contoh jawaban Panduan Guru nomor 4: ${nama}`);
    const soalBs = bersih(ambil(bs, 23, 23));
    for (const [n2] of G.LATIHAN_DUA) cek(soalBs.includes(`rp${G.rb(n2)},00`), `Buku Siswa nomor 2: Rp${G.rb(n2)},00`);
    for (const [n2, nama] of G.LATIHAN_TIGA) cek(soalBs.includes(G.rb(n2)) && soalBs.includes(nama.toLowerCase()), `Buku Siswa nomor 3: ${G.rb(n2)} dan "${nama}" ada di soal`);
    // Keganjilan buku yang dicatat di video.
    const bs19 = bersih(ambil(bs, 19, 19));
    cek(bs19.includes("tiga ribu enam ratus tujuh puluh enam rupiah") && bs19.includes("3.676") && bs19.includes("meter di atas permukaan laut"), "Buku Siswa hlm. 7: tinggi Semeru dalam meter, tetapi kalimat contoh berakhir kata rupiah");
    const bs18 = bersih(ambil(bs, 18, 18));
    cek(/a\.\s*untuk satuan/.test(bs18) && /d\.\s*untuk ribuan/.test(bs18) && /ribuan ratusan puluhan satuan a b c d/.test(bs18), "Buku Siswa hlm. 6: tabel memberi huruf A sampai D dari ribuan, aturan memakai A untuk satuan dan D untuk ribuan");
    const bs21 = bersih(ambil(bs, 21, 21));
    cek(bs21.includes("yaitu , ditulis") && /seribu\W+bukan\W+satu ribu/.test(bs21), "Buku Siswa hlm. 9: angka puluhan hilang (yaitu , ditulis) dan penulisan seribu");
    const bs17 = bersih(ambil(bs, 17, 17));
    cek(bs17.includes("yaitu 3.286 meter") && !bs17.includes("3.268"), "Buku Siswa hlm. 5: kalimat memuat 3.286 (tulisan 3.268 pada panah gambar adalah gambar raster, diperiksa dari render halaman)");
    // Gambar jarak pada hlm. 5: tulisan pada panah adalah gambar, bukan teks PDF; tidak ada teks 3.268 di halaman.
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k4b1a-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|k4b1a-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k4b1a sendiri (${impor.join(", ")})`);
  }
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k4b1a.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_A41|video-k4b1-umum|video-k4b2-umum|naskah-k4b1/.test(pembungkus) && /VIDEO_MATERI_K4B1A/.test(pembungkus) && /VIDEO_LUAR_K4B1A/.test(pembungkus) && /export function VideoK4B1A/.test(pembungkus) && /daftar-video-cerita/.test(pembungkus), "video-k4b1a.tsx: dua video dari mesin Story, tanpa naskah lama");
  cek(!/\r/.test(pembungkus), "video-k4b1a.tsx: akhir baris LF");
  const sendiri = readFileSync(new URL("uji-story-k4b1a.mjs", import.meta.url), "utf8");
  cek(!/\r/.test(sendiri), "uji-story-k4b1a.mjs: akhir baris LF");
}

for (const v of [M, U]) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${((n * 0.5) / 60).toFixed(1)} menit suara)`);
}
console.log(`Pemeriksaan: ${stat.kutipan} kutipan terhadap teks PDF, ${stat.terbilang} bilangan berkata, ${stat.persamaan} persamaan, ${stat.teksPasang} pasangan teks, ${stat.data} data buku, ${stat.papan} papan, ${stat.balok} balok Dienes`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
