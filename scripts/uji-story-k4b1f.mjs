// Uji Story Kelas 4 Bab 1 Sub-Bab F (Pengurangan Bilangan Cacah sampai 1.000): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, sinkron angka suara dan gambar (angka dan bilangan yang diucapkan dengan kata), perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas,
// teks bertumpuk, pemisahan materi dan metode luar, tidak membocorkan perkalian, pembagian, pecahan, atau penutup bab, kutipan buku terhadap teks PDF (pdftotext, atau PyMuPDF bila tidak ada),
// hitungan mandiri semua angka buku (kunci Panduan Guru, tabel nilai tempat dan penanda mengambil, balok ratusan-puluhan-satuan, garis lompat, garis nomor 4, batang soal cerita, Compensation),
// semua ekspresi bertanda sama dengan (termasuk tanda kurung) dihitung ulang, emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k4b1f.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { spawnSync } from "node:child_process";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k4b1f-video.ts");

const stat = { kutipan: 0, terbilang: 0, teksPasang: 0, persamaan: 0, data: 0 };
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
const VIDEO = [V.VIDEO_MATERI_K4B1F, V.VIDEO_LUAR_K4B1F];
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
const G = await import("../src/components/modul/story/k4b1f-gambar.ts");
const U1 = await import("../src/components/modul/story/k4b1f-luar-1.ts");
const U2 = await import("../src/components/modul/story/k4b1f-luar-2.ts");
const M = V.VIDEO_MATERI_K4B1F;
const U = V.VIDEO_LUAR_K4B1F;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const nilaiId = (objs, id) => objs.find((o) => o.id === id)?.isi;
const T = (v, id, ke) => akhirAdegan(adegan(v, id), ke);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M);
  const luar = teksVideo(U);
  const METODE = ["Standard Subtraction", "Borrowing", "Counting Up", "Compensation"];
  const NAMA_ID = ["Pengurangan Bersusun", "Meminjam", "Menghitung Naik", "Kompensasi"];
  cek(!/Standard Subtraction|Borrowing|Counting Up|Compensation|metode luar|metode dari luar/i.test(materi), "video materi tidak memuat nama metode luar");
  cek(!/Pengurangan Bersusun|Menghitung Naik|Kompensasi|Meminjam:|Meminjam,|Meminjam\b/.test(materi), "video materi tidak memuat nama Indonesia metode luar");
  for (const m of [...METODE, ...NAMA_ID]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE, METODE, "nama metode di berkas luar-1");
  sama(U1.NAMA_METODE_ID, NAMA_ID, "nama Indonesia metode luar");
  cek(M.adegan.every((a) => /^(Materi|Pesan guru): /.test(a.sumber)), "video materi: tiap adegan berlabel pelajaran netral (Materi: ... atau Pesan guru: ...)");
  cek(M.subjudul === "Materi kurikulum" && U.subjudul === "Empat metode luar", "subjudul video: tanpa nomor halaman dan tanpa kata buku");
  // Video bergaya guru: suara, teks terlihat, label sumber, judul adegan, dan subjudul tidak menyebut sumber buku.
  const TERLARANG = /\bbuku\b|panduan guru|\bhlm\b|halaman|\bkunci\b|rubrik|salah ketik|salah cetak|tambahan video|contoh video|temuan/i;
  for (const v of VIDEO) {
    cek(!TERLARANG.test(`${v.judul} ${v.subjudul}`), `${v.id}: judul dan subjudul tanpa kata terlarang`);
    for (const a of v.adegan) {
      cek(!TERLARANG.test(`${a.judul} ${a.sumber}`), `${v.id}/${a.id}: judul adegan dan sumber tanpa kata terlarang`);
      a.ketukan.forEach((kt, i) => {
        const terlihat = L.teksTerlihat(L.keadaanStory(a, i, 9999));
        cek(!TERLARANG.test(kt.suara), `${v.id}/${a.id}/${i}: suara tanpa kata terlarang`);
        cek(!TERLARANG.test(JSON.stringify(terlihat)), `${v.id}/${a.id}/${i}: teks terlihat tanpa kata terlarang`);
      });
    }
  }
  cek(U.adegan.every((a) => /Metode luar|Ringkasan/i.test(a.sumber)), "video metode luar: tiap adegan bersumber metode luar atau ringkasan");
  cek(U.adegan.every((a) => a.sumber.length <= 46), "video metode luar: label sumber cukup pendek untuk kanvas 300 lebar");
  cek(M.adegan.every((a) => a.sumber.length <= 52), "video materi: label sumber cukup pendek untuk kanvas 300 lebar");
  for (const kata of ["Peta konsep", "Kata kunci", "Apersepsi", "Ayo Berlatih", "Ayo Berpikir", "Ayo Mengamati", "Miskonsepsi", "Diferensiasi", "Refleksi", "Subbab", "Tujuan pembelajaran", "Panduan guru", "Panduan Guru", "Aktivitas", "Buku Siswa", "buku guru"]) cek(!luar.includes(kata), `video metode luar tidak memuat "${kata}" (itu isi video materi)`);
  const ids = U.adegan.map((a) => a.id);
  cek(U.adegan[0].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  cek(M.adegan.length === 11 && U.adegan.length === 10, "11 adegan materi dan 10 adegan metode luar");
  cek(M.id === "k4b1f-materi" && U.id === "k4b1f-luar", "id video k4b1f-materi dan k4b1f-luar");
  // Sub-Bab F tidak membocorkan perkalian, pembagian, pecahan, atau penutup bab. Pengayaan dan diferensiasi disebut Panduan Guru hlm. 60 sendiri.
  const BOCOR = /perkalian|pembagian|dikalikan|dibagi|donat|pecahan|desimal|uji kompetensi|rubrik|remedial|interaksi orang tua|perkalian bilangan/i;
  for (const a of M.adegan) cek(!BOCOR.test(teksAdegan(a)), `materi ${a.id} tidak membocorkan sub-bab lain`);
  for (const a of U.adegan) cek(!BOCOR.test(teksAdegan(a)), `metode luar ${a.id} tidak membocorkan sub-bab lain`);
  cek(totalKetukan >= 80, `total ketukan cukup dalam (${totalKetukan})`);
  cek(M.adegan.map((a) => a.id).join() === "apersepsi-stimulus,amati-buku,sekali-mengambil,dua-kali-mengambil,pendek-mengambil,berlatih-satu,berlatih-dua,berlatih-tiga,berlatih-empat,berlatih-lima,miskonsepsi-diferensiasi", "urutan adegan materi");
  cek(ids.join() === "luar-pembuka,luar-standar,luar-standar-terapan,luar-pinjam,luar-pinjam-terapan,luar-naik,luar-naik-terapan,luar-kompensasi,luar-kompensasi-terapan,luar-ringkas", "urutan adegan metode luar");
  // Tiga nama metode lama sama dengan naskah bab; nama metode baru belum dipakai naskah, judul, atau lab lain pada bab ini.
  const modul = new URL("../src/components/modul/", import.meta.url);
  const baca = (n) => readFileSync(new URL(n, modul), "utf8");
  const naskah = baca("naskah-k4b1.ts");
  cek(/Standard Subtraction/.test(naskah) && /Borrowing/.test(naskah) && /Counting Up/.test(naskah), "tiga nama metode lama sama dengan nama di naskah bab");
  cek(/Pengurangan Bersusun/.test(naskah) && /Meminjam/.test(naskah) && /Menghitung Naik/.test(naskah), "tiga nama Indonesia metode lama sama dengan naskah bab");
  const berkasLab = readdirSync(modul).filter((f) => /^lab-.*k4b1.*\.ts$/.test(f));
  cek(berkasLab.length >= 1, `berkas lab bab 1 ditemukan (${berkasLab.length})`);
  for (const n of ["naskah-k4b1.ts", "data-k4b1.ts", ...berkasLab]) if (existsSync(new URL(n, modul))) cek(!/Compensation|Kompensasi/i.test(baca(n)), `nama metode baru Compensation / Kompensasi tidak bentrok dengan ${n}`);
  for (const ad of [...M.adegan, ...U.adegan]) cek(!/Compensation|Kompensasi/i.test(ad.judul) || U.adegan.includes(ad), `judul ${ad.id}: nama metode baru hanya di video metode luar`);
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


/* ------------------------------ Angka buku dan gambar dihitung ulang ------------------------------ */
const objAda = (objs, id) => objs.find((o) => o.id === id);
const sel = (objs, id) => objs.find((o) => o.id === id)?.isi ?? "";
/** Angka satu baris tabel nilai tempat (sel kosong dilewati): "0","6","5" menjadi 65; baris ["","2","7"] menjadi 27. */
const angkaBaris = (objs, id) => {
  const d = [0, 1, 2].map((c) => sel(objs, `${id}-t${c}`)).filter((s) => s !== "");
  return d.length ? Number(d.join("")) : null;
};
const hitungBebas = (s) => {
  const t = s.replace(/−/g, "-").replace(/\./g, "");
  if (!/^[\d\s+()-]+$/.test(t)) return null;
  return Function(`"use strict";return (${t})`)();
};
// Nilai efektif tiap kolom setelah mengambil (hitungan mandiri di uji: satuan, lalu puluhan).
const efektifTes = (a, b) => {
  const ad = [Math.floor(a / 100), Math.floor(a / 10) % 10, a % 10];
  const bd = [Math.floor(b / 100), Math.floor(b / 10) % 10, b % 10];
  const e = [...ad];
  for (let i = 2; i >= 1; i -= 1) {
    if (e[i] < bd[i]) {
      e[i] += 10;
      e[i - 1] -= 1;
    }
  }
  return e.map((v, i) => (v !== ad[i] ? String(v) : ""));
};
const tandaBaris = (objs, pre) => [0, 1, 2].map((c) => sel(objs, `${pre}-m${c}`));
const tabelOk = (nama, objs, pre, a, b, hasilTampak = true) => {
  sama(angkaBaris(objs, `${pre}r0`), a, `${nama}: baris bilangan pertama`);
  sama(angkaBaris(objs, `${pre}r1`), b, `${nama}: baris pengurang`);
  if (hasilTampak) sama(angkaBaris(objs, `${pre}r2`), a - b, `${nama}: baris hasil dihitung ulang`);
  stat.data += 3;
};
const blokJumlah = (objs, id) => {
  const r = objs.filter((o) => new RegExp(`^${id}-r\\d+$`).test(o.id)).length;
  const p = objs.filter((o) => new RegExp(`^${id}-p\\d+$`).test(o.id)).length;
  const s = objs.filter((o) => new RegExp(`^${id}-s\\d+$`).test(o.id)).length;
  return { r, p, s, nilai: r * 100 + p * 10 + s };
};
const lompatInfo = (objs, id) => {
  const urut = (re) => objs.filter((o) => re.test(o.id)).sort((p, q) => Number(p.id.match(/\d+$/)[0]) - Number(q.id.match(/\d+$/)[0]));
  const stops = urut(new RegExp(`^${id}-n\\d+$`)).map((o) => Number(o.isi));
  const lompat = urut(new RegExp(`^${id}-j\\d+$`)).map((o) => Number(o.isi.replace("+", "")));
  const xs = urut(new RegExp(`^${id}-k\\d+$`)).map((o) => o.x);
  return { stops, lompat, xs };
};
const lompatOk = (nama, objs, id, stops, selisih) => {
  const i = lompatInfo(objs, id);
  sama(i.stops, stops, `${nama}: titik singgah garis lompat`);
  cek(i.lompat.length === i.stops.length - 1 && i.lompat.every((j, n) => j === i.stops[n + 1] - i.stops[n]), `${nama}: tiap lompatan sama dengan selisih dua titik (${i.lompat.join()})`);
  sama(
    i.lompat.reduce((s, j) => s + j, 0),
    selisih,
    `${nama}: jumlah lompatan sama dengan selisih`,
  );
  cek(i.xs.every((x, n) => n === 0 || Math.abs(x - i.xs[n - 1] - (i.xs[1] - i.xs[0])) < 1e-6), `${nama}: titik singgah berjarak sama (tidak berskala)`);
  stat.data += 3;
};
{
  // Data buku ditulis ulang sebagai pembanding mandiri (kunci Panduan Guru hlm. 56-59).
  sama([G.AMATI.buku - G.AMATI.pinjam, G.AMATI.sisa], [133, 133], "hlm. 34: 265 dikurangi 132 sama dengan 133");
  sama([G.SATU_KALI.a - G.SATU_KALI.b, G.SATU_KALI.hasil], [112, 112], "hlm. 35: 241 dikurangi 129 sama dengan 112");
  sama([G.DUA_KALI.a - G.DUA_KALI.b, G.DUA_KALI.hasil], [77, 77], "hlm. 36: 253 dikurangi 176 sama dengan 77");
  sama([G.PENDEK.a - G.PENDEK.b, G.PENDEK.hasil], [66, 66], "hlm. 36: 241 dikurangi 175 sama dengan 66");
  sama([G.STIMULUS.a - G.STIMULUS.b, G.STIMULUS.hasil, G.STIMULUS.jawabanSiswa], [8, 8, 12], "stimulus: 27 dikurangi 19 sama dengan 8 (hitungan mandiri), jawaban siswa 12 keliru");
  cek(G.STIMULUS.a - G.STIMULUS.b !== G.STIMULUS.jawabanSiswa, "stimulus: jawaban siswa 12 memang bukan 27 dikurangi 19");
  sama(G.LATIHAN_1.map((q) => [...q]), [[633, 211, 422], [879, 436, 443], [522, 148, 374], [367, 289, 78]], "kunci nomor 1 a sampai d (Panduan Guru hlm. 56)");
  sama(G.LATIHAN_2.map((q) => [...q]), [[573, 268, 305], [422, 146, 276], [623, 292, 331], [344, 279, 65]], "kunci nomor 2 a sampai d (Panduan Guru hlm. 57)");
  sama(G.LATIHAN_3.map((q) => [...q]), [[455, 328, 127], [832, 622, 210], [712, 89, 623], [600, 235, 365], [505, 77, 428]], "kunci nomor 3 a sampai e (Panduan Guru hlm. 57)");
  sama(G.CERITA.map((q) => [...q]), [[333, 129, 204], [765, 179, 586], [427, 218, 209], [128, 79, 49]], "kunci nomor 5 a sampai d (Panduan Guru hlm. 58-59)");
  for (const [nama, daftar] of [["nomor 1", G.LATIHAN_1], ["nomor 2", G.LATIHAN_2], ["nomor 3", G.LATIHAN_3], ["nomor 5", G.CERITA]]) daftar.forEach(([a, b, h], i) => sama(a - b, h, `hitungan mandiri ${nama}${"abcde"[i]}: ${a} dikurangi ${b}`));
  sama([689 - 233, 912 - 67, 398 - 291 - 66, 720 - 89, 300 - 34], [456, 845, 41, 631, 266], "hitungan mandiri nomor 4 a sampai e");
  sama([...G.LATIHAN_4.garis], [456, 845, 41, 631, 266], "garis nomor 4 menurut kunci Panduan Guru hlm. 58: a ke 456, b ke 845, c ke 41, d ke 631, e ke 266");
  sama([...G.LATIHAN_4.jawabanKolom], [845, 266, 456, 41, 631], "urutan kolom jawaban nomor 4 di buku");
  // Kunci tabel 2b Panduan Guru hlm. 57 menulis pengurang 145, padahal soal 146: 422 dikurangi 146 sama dengan 276, 422 dikurangi 145 sama dengan 277.
  sama([422 - 146, 422 - 145], [276, 277], "salah ketik kunci 2b: pengurang 145 memberi 277, bukan 276");

  // Stimulus Panduan Guru hlm. 55.
  const st = T(M, "apersepsi-stimulus", 3);
  tabelOk("stimulus", st, "st", 27, 19, false);
  sama(angkaBaris(st, "str2"), 12, "stimulus: tabel menampilkan jawaban siswa 12");
  sama(nilaiId(T(M, "apersepsi-stimulus", 4), "g3-t0"), "27 − 19 = 8", "hitungan mandiri video: 27 dikurangi 19 sama dengan 8");
  sama(nilaiId(T(M, "apersepsi-stimulus", 4), "g2-t0"), "kita hitung bersama", "stimulus: hitungan dilakukan bersama guru");
  // Ayo Mengamati: 265 dikurangi 132.
  tabelOk("amati susun pendek", T(M, "amati-buku", 5), "tp", 265, 132);
  sama(blokJumlah(T(M, "amati-buku", 4), "hb"), { r: 1, p: 3, s: 3, nilai: 133 }, "balok sisa buku: 1 ratusan, 3 puluhan, 3 satuan");
  // Satu kali mengambil: 241 dikurangi 129; balok 241 lalu 2 ratusan, 3 puluhan, 11 satuan.
  const sk = T(M, "sekali-mengambil", 2);
  sama(blokJumlah(sk, "bk"), { r: 2, p: 4, s: 1, nilai: 241 }, "satu kali mengambil: balok 241");
  sama(blokJumlah(sk, "bl"), { r: 2, p: 3, s: 11, nilai: 241 }, "satu kali mengambil: puluhan dibuka, 2 ratusan 3 puluhan 11 satuan masih bernilai 241");
  // Susun pendek dengan mengambil: 241 dikurangi 175, penanda gaya buku (1, 3, 11).
  const pd = T(M, "pendek-mengambil", 3);
  sama(angkaBaris(pd, "pr0"), 241, "susun pendek: 241");
  sama(angkaBaris(pd, "pr1"), 175, "susun pendek: 175");
  sama([0, 1, 2].map((c) => sel(pd, `pr2-t${c}`)), ["0", "6", "6"], "susun pendek: hasil 066 sama dengan 66");
  sama(241 - 175, 66, "hitungan mandiri 241 dikurangi 175");
  sama([sel(pd, "po-m0"), sel(pd, "pm-m1"), sel(pd, "pm-m2")].join(), [String(2 - 1), String(4 - 1), String(1 + 10)].join(), "penanda buku: ratusan 1, puluhan 3, satuan 11");
  // Ayo Berlatih 2: tabel susun pendek dan penanda mengambil sama dengan kunci Panduan Guru hlm. 57 (dibaca dari gambar PDF).
  const KUNCI_TANDA = { a: ["", "6", "13"], b: ["3", "11", "12"], c: ["5", "12", ""], d: ["2", "13", "14"] };
  [["a", 1, 573, 268], ["b", 2, 422, 146], ["c", 3, 623, 292], ["d", 4, 344, 279]].forEach(([h, ke, a, b]) => {
    const o = T(M, "berlatih-dua", ke);
    tabelOk(`nomor 2${h}`, o, "q", a, b);
    sama(tandaBaris(o, "qm"), KUNCI_TANDA[h], `nomor 2${h}: penanda mengambil sama dengan kunci buku`);
    sama(efektifTes(a, b), KUNCI_TANDA[h], `nomor 2${h}: penanda dihitung mandiri`);
    sama(nilaiId(o, "q-eq"), `${a} − ${b} = ${a - b}`, `nomor 2${h}: persamaan penutup`);
  });
  // Ayo Berlatih 1: bentuk uraian dan kurang tiap bagian.
  sama(nilaiId(T(M, "berlatih-satu", 0), "e4-t0"), "633 − 211 = 422", "nomor 1a");
  sama(nilaiId(T(M, "berlatih-satu", 1), "e10-t0"), "400 + 40 + 3 = 443", "nomor 1b");
  const e3 = T(M, "berlatih-satu", 2);
  sama([hitungBebas("400 + 110 + 12"), hitungBebas("500 + 20 + 2"), hitungBebas("100 + 40 + 8")], [522, 522, 148], "nomor 1c: uraian 522 dan 148");
  cek(nilaiId(e3, "e14") === "522 = 400 + 110 + 12", "nomor 1c: 522 diuraikan 400 + 110 + 12");
  const e4 = T(M, "berlatih-satu", 3);
  sama(hitungBebas(nilaiId(e4, "e16")), 374, "nomor 1c: (400 − 100) + (110 − 40) + (12 − 8) = 374");
  const e5 = T(M, "berlatih-satu", 4);
  sama(hitungBebas(nilaiId(e5, "e23")), 78, "nomor 1d: (200 − 200) + (150 − 80) + (17 − 9) = 78");
  cek(hitungBebas("200 + 150 + 17") === 367 && hitungBebas("200 + 80 + 9") === 289, "nomor 1d: 367 = 200 + 150 + 17 dan 289 = 200 + 80 + 9");
  // Ayo Berlatih 3.
  [[1, [0, 1]], [2, [2, 3]], [3, [4]]].forEach(([ke, daftar]) => {
    const o = T(M, "berlatih-tiga", ke);
    for (const i of daftar) {
      const id = `t${"abcde"[i]}-t0`;
      const m = nilaiId(o, id)?.match(/^[a-e]\. (\d+) − (\d+) = (\d+)$/);
      cek(!!m && Number(m[1]) - Number(m[2]) === Number(m[3]) && [Number(m[1]), Number(m[2]), Number(m[3])].join() === G.LATIHAN_3[i].join(), `nomor 3${"abcde"[i]}: ${nilaiId(o, id)} cocok dengan kunci`);
      stat.data += 1;
    }
  });
  // Ayo Berlatih 4: tiap garis menghubungkan soal dengan jawaban yang sama nilainya.
  const o4 = T(M, "berlatih-empat", 3);
  for (let i = 0; i < 5; i += 1) {
    const g = objAda(o4, `ln${i}`);
    const kiri = objAda(o4, `l${i}-k`);
    cek(!!g && !!kiri, `nomor 4: garis ${i} dan kartu soal ada`);
    const ujungY = g.y + g.y2;
    const j = [0, 1, 2, 3, 4].find((q) => Math.abs(objAda(o4, `r${q}-k`).y + objAda(o4, `r${q}-k`).h / 2 - ujungY) < 1.5);
    cek(j !== undefined, `nomor 4: ujung garis ${i} tepat di tengah sebuah kartu jawaban`);
    cek(Math.abs(g.y - (kiri.y + kiri.h / 2)) < 1.5, `nomor 4: pangkal garis ${i} di tengah kartu soal`);
    const soal = nilaiId(o4, `l${i}-t0`).replace(/^[a-e]\. /, "").replace(/ =$/, "");
    const nilai = hitungBebas(soal);
    sama([nilai, Number(nilaiId(o4, `r${j}-t0`))], [G.LATIHAN_4.garis[i], nilai], `nomor 4${"abcde"[i]}: ${soal} ditarik ke jawaban yang nilainya sama`);
    stat.data += 3;
  }
  sama(new Set([0, 1, 2, 3, 4].map((i) => objAda(o4, `ln${i}`).y + objAda(o4, `ln${i}`).y2)).size, 5, "nomor 4: lima garis menuju lima jawaban berbeda");
  // Ayo Berlatih 5: batang sisa sebanding.
  [0, 1, 2, 3].forEach((i) => {
    const o = T(M, "berlatih-lima", i);
    const [t, b, h] = G.CERITA[i];
    const p = objAda(o, `cb${i}-p`);
    const s = objAda(o, `cb${i}-s`);
    const r = objAda(o, `cb${i}-t`);
    cek(Math.abs(p.w / r.w - b / t) < 1e-6 && Math.abs(s.w / r.w - h / t) < 1e-6 && Math.abs(p.w + s.w - r.w) < 1e-6, `soal cerita ${"abcd"[i]}: batang sebanding ${b} dan ${h} dari ${t}`);
    sama([nilaiId(o, `cp${i}`), nilaiId(o, `cq${i}`), nilaiId(o, `ct${i}`), nilaiId(o, `ce${i}-t0`)], [String(b), String(h), String(t), `${t} − ${b} = ${h}`], `soal cerita ${"abcd"[i]}: angka di gambar`);
    stat.data += 2;
  });

  // Metode luar. Standard Subtraction.
  tabelOk("Standard 633 − 211", T(U, "luar-standar-terapan", 0), "ta", 633, 211);
  tabelOk("Standard 879 − 436", T(U, "luar-standar-terapan", 1), "ta", 879, 436);
  tabelOk("Standard 573 − 268 (tanpa hasil)", T(U, "luar-standar-terapan", 2), "ta", 573, 268, false);
  tabelOk("Standard 265 − 132", T(U, "luar-standar", 2), "s", 265, 132);
  // Borrowing.
  const bp = T(U, "luar-pinjam", 1);
  sama(blokJumlah(bp, "bk"), { r: 2, p: 4, s: 1, nilai: 241 }, "Borrowing: balok 241");
  sama(blokJumlah(bp, "bl"), { r: 2, p: 3, s: 11, nilai: 241 }, "Borrowing: 1 puluhan dibuka menjadi 10 satuan, nilai tetap 241");
  const bq = T(U, "luar-pinjam", 3);
  sama([blokJumlah(bq, "br").r, blokJumlah(bq, "bs").p], [1, 10], "Borrowing: 1 ratusan dibuka menjadi 10 puluhan");
  [["luar-pinjam-terapan", 1, "tb", 253, 176], ["luar-pinjam-terapan", 2, "tc", 623, 292], ["luar-pinjam-terapan", 3, "td", 344, 279]].forEach(([id, ke, pre, a, b]) => {
    const o = T(U, id, ke);
    tabelOk(`Borrowing ${a} − ${b}`, o, pre, a, b);
    sama(tandaBaris(o, `${pre}m`), efektifTes(a, b), `Borrowing ${a} − ${b}: penanda mengambil dihitung mandiri`);
  });
  sama(tandaBaris(T(U, "luar-pinjam-terapan", 1), "tbm"), ["1", "14", "13"], "Borrowing 253 − 176: dua kali mengambil, penanda 1, 14, 13");
  // Counting Up.
  lompatOk("Counting Up 241 − 129", T(U, "luar-naik", 2), "gn", [129, 130, 200, 241], 241 - 129);
  [[0, [34, 40, 300], 300 - 34], [1, [235, 300, 600], 600 - 235], [2, [77, 80, 500, 505], 505 - 77], [3, [89, 100, 700, 712], 712 - 89]].forEach(([ke, stops, d]) => lompatOk(`Counting Up soal buku ${stops[0]} sampai ${stops[stops.length - 1]}`, T(U, "luar-naik-terapan", ke), "gp", stops, d));
  sama([300 - 34, 600 - 235, 505 - 77, 712 - 89], [266, 365, 428, 623], "Counting Up: selisih sama dengan kunci nomor 3 dan 4 (266, 365, 428, 623)");
  lompatOk("Compensation 89 ke 90", T(U, "luar-kompensasi", 3), "gk", [89, 90], 1);
  // Compensation.
  sama(U2.KOMPENSASI_SOAL.map((q) => [...q]), [[505, 77, 80], [912, 67, 70], [720, 89, 90], [300, 34, 40]], "Compensation: soal buku dan pengurang bulat");
  const KUNCI_KOMP = [428, 845, 631, 266];
  [["qa", 0], ["qb", 1], ["qc", 2], ["qd", 3]].forEach(([pre, i]) => {
    const o = T(U, "luar-kompensasi-terapan", i);
    const m0 = nilaiId(o, `${pre}0-t0`)?.match(/^(\d+) − (\d+) = \?$/);
    const m1 = nilaiId(o, `${pre}1-t0`)?.match(/^(\d+) dibulatkan jadi (\d+), lebih (\d+)$/);
    const m2 = nilaiId(o, `${pre}2-t0`)?.match(/^(\d+) − (\d+) = (\d+)$/);
    const m3 = nilaiId(o, `${pre}3-t0`)?.match(/^(\d+) \+ (\d+) = (\d+)$/);
    cek(!!m0 && !!m1 && !!m2 && !!m3, `Compensation ${pre}: empat baris terbaca`);
    if (m0 && m1 && m2 && m3) {
      const [a, b] = [Number(m0[1]), Number(m0[2])];
      const [b2, bulat, lebih] = [Number(m1[1]), Number(m1[2]), Number(m1[3])];
      sama([a, b, b2], [U2.KOMPENSASI_SOAL[i][0], U2.KOMPENSASI_SOAL[i][1], b], `Compensation ${pre}: soal sama di tiap baris`);
      cek(bulat - b === lebih && bulat % 10 === 0, `Compensation ${pre}: ${b} dibulatkan jadi ${bulat}, lebih ${lebih}`);
      cek(Number(m2[1]) === a && Number(m2[2]) === bulat && Number(m2[3]) === a - bulat, `Compensation ${pre}: ${a} − ${bulat} = ${a - bulat}`);
      cek(Number(m3[1]) === a - bulat && Number(m3[2]) === lebih && Number(m3[3]) === a - b && a - b === KUNCI_KOMP[i], `Compensation ${pre}: tambah ${lebih} kembali ke hasil ${a - b} (kunci buku ${KUNCI_KOMP[i]})`);
      stat.data += 4;
    }
  });
  sama([712 - 90 + 1, 712 - 89], [623, 623], "Compensation: 712 − 90 + 1 = 623 = 712 − 89");

  // Setiap teks bertanda sama dengan yang tampak di gambar dihitung ulang, termasuk uraian dan tanda kurung.
  const semuaTeks = new Set();
  for (const v of [M, U]) for (const a of v.adegan) a.ketukan.forEach((_, i) => { for (const o of L.keadaanStory(a, i, 9999)) if (o.t === "teks" && o.isi) semuaTeks.add(o.isi); });
  let ekspresi = 0;
  for (const s of semuaTeks) {
    const bagian = s.split("=").map((x) => x.trim());
    if (bagian.length >= 2 && bagian.every((x) => /^[\d\s+()−.-]+$/.test(x) && /\d/.test(x))) {
      const nilai = bagian.map((x) => hitungBebas(x));
      ekspresi += 1;
      cek(nilai.every((n) => n === nilai[0]), `ekspresi "${s}" bernilai sama di kedua sisi (${nilai.join(", ")})`);
    }
  }
  stat.persamaan += ekspresi;
  cek(ekspresi >= 60, `jumlah ekspresi dengan tanda sama dengan yang dihitung ulang (${ekspresi})`);
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
  // Kelas IV: Buku Siswa hlm. N = PDF N+12 (sub-bab F: PDF 46-50, soal cerita nomor 5 di atas PDF 51 = hlm. 39; PDF 46 mulai dengan akhir E);
  // Panduan Guru hlm. N = PDF N+12 (sub-bab F: PDF 66-71 dan Diferensiasi di atas PDF 72 = hlm. 60; PDF 66 mulai dengan akhir E).
  const bagian = existsSync(bs) && existsSync(bg) ? [ambil(bs, 46, 51), ambil(bg, 66, 72)] : [null];
  if (bagian.some((b) => b === null)) console.log("PDF atau pembaca PDF tidak tersedia: pemeriksaan kutipan buku dilewati");
  else {
    const bersih = (t) => t.toLowerCase().replace(/-\s*\n\s*/g, "-").replace(/\s+/g, " ").trim();
    const JUDUL_F = "f. pengurangan bilangan cacah sampai 1.000";
    const JUDUL_G = "g. perkalian bilangan cacah sampai 100";
    const potong = (t) => {
      const b = bersih(t);
      const i = b.indexOf(JUDUL_F);
      const j = b.indexOf(JUDUL_G);
      return i >= 0 && j > i ? b.slice(i, j) : null;
    };
    const siswa = potong(bagian[0]);
    const guru = potong(bagian[1]);
    cek(siswa !== null && guru !== null, "judul subbab F dan awal subbab G ditemukan di Buku Siswa PDF 46-51 dan Panduan Guru PDF 66-72");
    const buku = `${siswa}\n${guru}`;
    // Subbab F tidak dimulai sebelum PDF 46 (BS) dan PDF 66 (BG), dan G sudah mulai di PDF 51 (BS) dan PDF 72 (BG).
    cek(!bersih(ambil(bs, 45, 45)).includes(JUDUL_F) && !bersih(ambil(bg, 65, 65)).includes(JUDUL_F), "subbab F belum mulai di Buku Siswa PDF 45 dan Panduan Guru PDF 65");
    cek(bersih(ambil(bs, 46, 46)).includes(JUDUL_F) && bersih(ambil(bg, 66, 66)).includes(JUDUL_F), "subbab F mulai di Buku Siswa PDF 46 dan Panduan Guru PDF 66");
    cek(!bersih(ambil(bs, 46, 50)).includes(JUDUL_G) && bersih(ambil(bs, 51, 51)).includes(JUDUL_G), "subbab G mulai di Buku Siswa PDF 51 (soal cerita nomor 5 ikut F di atasnya)");
    cek(!bersih(ambil(bg, 66, 71)).includes(JUDUL_G) && bersih(ambil(bg, 72, 72)).includes(JUDUL_G), "subbab G mulai di Panduan Guru PDF 72 (Diferensiasi F di atasnya)");
    // Nomor halaman cetak sama dengan PDF dikurangi 12.
    const halaman = (berkas, pdf, cetak) => new RegExp(`(^|\\n)\\s*${cetak}(\\s|$)`).test(ambil(berkas, pdf, pdf));
    for (let pdf = 46; pdf <= 51; pdf += 1) cek(halaman(bs, pdf, pdf - 12), `Buku Siswa PDF ${pdf} bernomor halaman ${pdf - 12}`);
    for (let pdf = 66; pdf <= 72; pdf += 1) cek(halaman(bg, pdf, pdf - 12), `Panduan Guru PDF ${pdf} bernomor halaman ${pdf - 12}`);
    let n = 0;
    for (const a of M.adegan) {
      for (const kt of a.kutipan ?? []) {
        n += 1;
        cek(buku.includes(bersih(kt)), `kutipan buku ${a.id}: "${kt}" ada di teks PDF`);
      }
    }
    stat.kutipan = n;
    cek(n >= 80, `jumlah kutipan buku yang diperiksa (${n})`);
    cek(M.adegan.every((a) => (a.kutipan ?? []).length >= 3), "tiap adegan materi memuat paling sedikit 3 kutipan buku");
    // Keganjilan buku yang dicatat di video.
    cek(/untuk penjumlahan berikut!/.test(bersih(ambil(bs, 49, 49))) && /untuk penjumlahan berikut!/.test(bersih(ambil(bg, 69, 69))), "petunjuk nomor 2 menyebut penjumlahan di Buku Siswa hlm. 37 dan Panduan Guru hlm. 57 (salah ketik, soalnya pengurangan)");
    cek(/4\s+2\s+2\s+1\s+4\s+5\s+2\s+7\s+6/.test(ambil(bg, 69, 69)), "kunci 2b Panduan Guru hlm. 57: baris pengurang tertulis 1 4 5 (seharusnya 1 4 6) dan hasil 2 7 6");
    cek(/5\s+7\s+3\s+2\s+6\s+8\s+3\s+0\s+5/.test(ambil(bg, 69, 69)) && /6\s+2\s+3\s+2\s+9\s+2\s+3\s+3\s+1/.test(ambil(bg, 69, 69)), "kunci 2a dan 2c Panduan Guru hlm. 57 cocok dengan hitungan mandiri (305, 331)");
    cek(/00 \+ 70 \+ 8/.test(bersih(ambil(bg, 68, 68))), "kunci 1d Panduan Guru hlm. 56 menulis 00 + 70 + 8 (salah ketik, cukup satu angka nol)");
    cek(/pengurangan dua bilangan dimulai dari nilai tempat satuan/.test(guru) && /miskonsepsi yang sering terjadi dalam operasi pengurangan/.test(guru), "Panduan Guru hlm. 59 menyebut mulai dari satuan sebagai miskonsepsi");
    cek(!/kunci/.test(siswa), "Buku Siswa hlm. 34-39: tanpa kunci jawaban (hitungan mandiri dan Panduan Guru)");
    cek(/diambi 1 puluhan/.test(siswa), "Buku Siswa hlm. 36 menulis diambi (salah ketik) pada penjelasan puluhan");
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k4b1f-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|k4b1f-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k4b1f sendiri (${impor.join(", ")})`);
  }
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k4b1f.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_F41|video-k4b2-umum|video-k4b1-umum|naskah-k4b1/.test(pembungkus) && /VIDEO_MATERI_K4B1F/.test(pembungkus) && /VIDEO_LUAR_K4B1F/.test(pembungkus) && /export function VideoK4B1F/.test(pembungkus) && /daftar-video-cerita/.test(pembungkus), "video-k4b1f.tsx: dua video dari mesin Story, tanpa naskah lama");
  cek(!/\r/.test(pembungkus), "video-k4b1f.tsx: akhir baris LF");
  const sendiri = readFileSync(new URL("uji-story-k4b1f.mjs", import.meta.url), "utf8");
  cek(!/\r/.test(sendiri), "uji-story-k4b1f.mjs: akhir baris LF");
}

for (const v of [M, U]) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${((n * 0.5) / 60).toFixed(1)} menit suara)`);
}
console.log(`Pemeriksaan: ${stat.kutipan} kutipan terhadap teks PDF, ${stat.terbilang} bilangan berkata, ${stat.persamaan} persamaan, ${stat.teksPasang} pasangan teks, ${stat.data} angka buku dan gambar`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
