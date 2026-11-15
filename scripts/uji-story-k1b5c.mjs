// Uji Story Kelas 1 Bab 5 Sub-Bab C (Nilai Tempat Puluhan dan Satuan): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Video diputar bergaya guru: suara, teks terlihat, sumber, judul adegan, dan subjudul tanpa penyebutan buku (kata terlarang diperiksa pada adegan yang diputar).
// Memeriksa: pemicu kata, suara tanpa digit, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas, teks bertumpuk, pemisahan materi dan metode luar (nama Indonesia saja),
// hanya bilangan sampai dua puluh (tanpa kali, bagi, kurang, banding, atau bilangan lebih dari dua puluh), tiap kalimat tambah di gambar benar dan tersusun mengikuti ucapan,
// hitungan satu demi satu mengikuti kata bilangan (termasuk sebelas sampai dua puluh), benda yang digabung (kantong, ikatan, menara, lingkaran, bingkai) berjumlah tepat sepuluh dan sisanya satuan,
// tabel nilai tempat, bilangan dua angka dan nilai tiap angka, tukar sepuluh, susun kartu kalimat, latihan, peta dan tabel susun, aturan aplikasi belajar mandiri
// (tanpa kelompok, teman, depan kelas, buku, menulis, menggambar, membawa benda, kertas, pensil), emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k1b5c.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k1b5c-video.ts");
const U1 = await import("../src/components/modul/story/k1b5c-luar-1.ts");
const U2 = await import("../src/components/modul/story/k1b5c-luar-2.ts");
const M1 = await import("../src/components/modul/story/k1b5c-materi-1.ts");
const M2 = await import("../src/components/modul/story/k1b5c-materi-2.ts");
const M3 = await import("../src/components/modul/story/k1b5c-materi-3.ts");

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

/* ------------------------------ Isi dua video ------------------------------ */
const VIDEO = [V.VIDEO_MATERI_K1B5C, V.VIDEO_LUAR_K1B5C];
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
      cek(!/[=×÷<>\/%+]/.test(kt.suara), `${nama}#${i + 1}: suara tanpa lambang yang sulit dibaca mesin suara`);
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
        else if (o.t === "garis" || o.t === "panah") cek(x > -2 && x < 302 && y > -2 && y < 204 && x + (o.x2 ?? 0) > -2 && x + (o.x2 ?? 0) < 302 && y + (o.y2 ?? 0) > -2 && y + (o.y2 ?? 0) < 204, `${nama}#${i + 1}: garis ${o.id} masuk kanvas`);
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
const M_VIDEO = V.VIDEO_MATERI_K1B5C;
const U = V.VIDEO_LUAR_K1B5C;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const NAMA_LUAR = /Hitung sampai (20|dua puluh)|Sepuluh dan Satuan|Dua Bingkai Sepuluh|metode luar|metode dari luar/i;
const NAMA_INGGRIS = /Count to 20|Ten and Ones|Double Ten Frame|Counting On|Counting Back|Counting|Place value early|Ten-frame|Take Away|Part.Part.Whole/i;
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
// Kata terlarang (aturan pemilik: aplikasi belajar mandiri, interaktif, dan digital) pada suara, teks gambar, judul, sumber, peta, dan tabel.
const TERLARANG_PEMILIK = /kelompok|teman|kawan|depan kelas|berpasangan|berpasang-pasangan|bersama-sama dengan|buku|menulis di|tulis di|menulis|menggambar|gambar sendiri|bawa|kertas|pensil|spidol|krayon|gunting|warnai|ambil benda|angkat jari|buat ceritamu|bercerita di|ceritakan|jelaskan kepada|catat di|salin ke/i;
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M_VIDEO);
  const luar = teksVideo(U);
  cek(!NAMA_LUAR.test(materi), "video materi tidak memuat nama metode luar");
  cek(!NAMA_INGGRIS.test(materi) && !NAMA_INGGRIS.test(luar), "tanpa nama metode berbahasa Inggris (Count to 20, Ten and Ones, Double Ten Frame)");
  for (const m of U1.NAMA_METODE) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE, ["Hitung sampai 20", "Sepuluh dan Satuan", "Dua Bingkai Sepuluh"], "nama metode luar (bahasa Indonesia saja)");
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
      const kena = semua.filter((t) => TERLARANG.test(t) || /soal nomor|nomor [1-9]|catatan video|menurut buku/i.test(t));
      cek(kena.length === 0, `${v.id}/${a.id}: tanpa penyebutan buku atau catatan sumber (${kena.slice(0, 2).join(" | ")})`);
      cek(!/Uji Kompetensi|Pengayaan|Ayo Berlatih|Ayo Berdiskusi|Ayo Berefleksi|Ayo Mengingat|Ayo Berkomunikasi|Ayo Berpikir|Ayo Mencoba|soal \d|Soal \d|Eksplorasi|Refleksi/.test(semua.join(" | ")), `${v.id}/${a.id}: latihan disajikan sebagai Latihan, tanpa istilah buku`);
    }
  }
  cek(M_VIDEO.subjudul === "Materi kurikulum" && U.subjudul === "Tiga metode luar", "subjudul video: Materi kurikulum dan Tiga metode luar");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 46), "video materi: label sumber berbentuk Materi: ... dan pendek");
  cek(U.adegan.every((a) => /Metode luar|Ringkasan/i.test(a.sumber) && a.sumber.length <= 46), "video metode luar: label sumber metode luar atau ringkasan, pendek");
  cek(M_VIDEO.id === "k1b5c-materi" && U.id === "k1b5c-luar", "id video k1b5c-materi dan k1b5c-luar");
  cek(U.judul.endsWith(": Metode dari Luar") && !/menurut/i.test(M_VIDEO.judul), "judul video: materi tanpa 'menurut', luar berakhir ': Metode dari Luar'");
  sama(M_VIDEO.adegan.map((a) => a.id).join(), "sapaan,cerita-kelereng,kantong-sepuluh,ikat-sedotan,menara-balok,papan-nilai,baca-angka,angka-sama,daftar-nilai,tukar-sepuluh,dua-puluh,susun-kalimat,latihan-satu,latihan-dua,latihan-tiga,penutup", "urutan adegan materi");
  sama(U.adegan.map((a) => a.id).join(), "sapaan,luar-pembuka,luar-hitung,luar-hitung-terapan,luar-satuan,luar-satuan-terapan,luar-bingkai,luar-bingkai-terapan,luar-ringkas", "urutan adegan metode luar");
  cek(M_VIDEO.adegan[0].id === "sapaan" && U.adegan[0].id === "sapaan", "tiap video dibuka adegan sapaan");
  cek(M_VIDEO.adegan.filter((a) => /^latihan-/.test(a.id)).length === 3 && M_VIDEO.adegan[M_VIDEO.adegan.length - 1].id === "penutup", "video materi: Latihan 1 sampai 3 lalu penutup");
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-hitung", "luar-hitung-terapan", "luar-satuan", "luar-satuan-terapan", "luar-bingkai", "luar-bingkai-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(U.adegan[1].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  for (const kata of ["Latihan", "Igil", "Kira", "Wei", "Halim", "kelereng", "kantong", "sedotan", "balok", "kubus", "lidi", "puluhan", "satuan", "papan nilai tempat", "sebelas", "dua puluh", "ditambah", "sama dengan"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const kata of ["Igil", "Upe", "Kira", "Malosi", "Wei", "kancing", "titik", "bingkai", "puluhan", "satuan", "ditambah"]) cek(luar.toLowerCase().includes(kata.toLowerCase()), `video luar memuat "${kata}"`);
  // Hanya bilangan sampai dua puluh: tanpa banding, kali, bagi, kurang, atau bilangan lebih dari dua puluh.
  const BOCOR = /lebih (banyak|sedikit|besar|kecil)|paling (banyak|sedikit)|bandingkan|membandingkan|\b(tiga|empat|lima|enam|tujuh|delapan|sembilan) puluh\b|dua puluh (satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan)|\bratus\b|\bribu\b|dikali|\bkali\b|dibagi|\bbagi\b|rumus|\bluas\b|keliling|ukuran|\bkurang\b|dikurangi/i;
  for (const v of [M_VIDEO, U]) {
    for (const a of v.adegan) cek(!BOCOR.test(teksAdegan(a)), `${v.id}/${a.id}: hanya bilangan sampai dua puluh, tanpa banding, kali, bagi, kurang, atau bilangan lebih dari dua puluh`);
    for (const a of v.adegan) for (const [i] of a.ketukan.entries()) for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) for (const b of bilanganDari(t)) cek(Number(b) <= 20, `${v.id}/${a.id}#${i + 1}: angka di gambar paling besar dua puluh ("${t}")`);
  }
  cek(totalKetukan >= 70, `total ketukan cukup dalam (${totalKetukan})`);
  cek(M_VIDEO.adegan.reduce((t, a) => t + a.ketukan.length, 0) >= 70, "video materi: paling sedikit 70 ketukan");
  for (const v of VIDEO) cek(v.adegan.every((a) => a.ketukan.length >= 3 && a.ketukan.length <= 14), `${v.id}: tiap adegan 3 sampai 14 ketukan`);
  // Durasi materi diputar 8 sampai 13 menit (dua kata per detik, sapaan termasuk).
  const kataMateri = kataVideo(M_VIDEO);
  cek(kataMateri / 120 >= 8 && kataMateri / 120 <= 13, `durasi materi diputar 8 sampai 13 menit (${(kataMateri / 120).toFixed(1)} menit)`);
  cek(kataVideo(U) / 120 >= 3, `durasi video luar paling sedikit 3 menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
}

/* ------------------------------ Bilangan yang diucapkan dengan kata tampak sebagai angka ------------------------------ */
const NAMA = [
  "nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh",
  "sebelas", "dua belas", "tiga belas", "empat belas", "lima belas", "enam belas", "tujuh belas", "delapan belas", "sembilan belas", "dua puluh",
];
const kataAkhir = (n) => NAMA[n].split(" ").pop();
for (const v of VIDEO) {
  for (const a of v.adegan) {
    const terlihat = new Set();
    a.ketukan.forEach((kt, i) => {
      for (let p = 0; p < L.kataDari(kt.suara).length; p += 1) for (const o of L.keadaanStory(a, i, p)) if (o.t === "teks" && o.isi) for (const b of bilanganDari(o.isi)) terlihat.add(b);
      if (L.kataDari(kt.suara).some((w) => w.toLowerCase().replace(/[^a-z]/g, "") === "sepuluh")) cek(terlihat.has("10"), `${v.id}/${a.id}#${i + 1}: "sepuluh" tampak sebagai angka 10 di gambar`);
    });
  }
}

/* ------------------------------ Hitungan, benda yang digabung, tabel nilai tempat, dan latihan ------------------------------ */
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
const kataSuara = (kt) => L.kataDari(kt.suara).map((w) => w.toLowerCase().replace(/[^a-z]/g, ""));
const W_EMAS = "#FFC800";
const stat = { tambah: 0, rumus: 0, hitung: 0, pindah: 0, gabung: 0, tabel: 0, baca: 0, kartu: 0 };
const batas = (o) => {
  if (o.t === "kotak") return [o.x, o.y, o.x + o.w, o.y + o.h];
  if (o.t === "bulat") return [o.x - o.r, o.y - o.r, o.x + o.r, o.y + o.r];
  if (o.t === "garis") return [Math.min(o.x, o.x + o.x2), Math.min(o.y, o.y + o.y2), Math.max(o.x, o.x + o.x2), Math.max(o.y, o.y + o.y2)];
  return [o.x, o.y, o.x, o.y];
};
const dalam = (o, kt) => {
  const b = batas(o);
  return b[0] >= kt.x && b[1] >= kt.y && b[2] <= kt.x + kt.w && b[3] <= kt.y + kt.h;
};
const sentuh = (o, kt) => {
  const b = batas(o);
  return b[2] > kt.x && b[0] < kt.x + kt.w && b[3] > kt.y && b[1] < kt.y + kt.h;
};
const berdampak = (p, q) => {
  const b = batas(p);
  const c = batas(q);
  return b[2] > c[0] && b[0] < c[2] && b[3] > c[1] && b[1] < c[3];
};
const awalan = (objs, re) => objs.filter((o) => re.test(o.id));
{
  // 1) Semua kalimat hitungan yang tampak benar (tambah saja), paling besar dua puluh.
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((kt, i) => {
        for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) {
          for (const m of t.matchAll(/\d+(?:\s*[+−]\s*\d+)+\s*=\s*\d+/g)) {
            const bagian = m[0].split("=");
            const suku = bagian[0].match(/\d+|[+−]/g);
            let nilai = Number(suku[0]);
            for (let q = 1; q < suku.length; q += 2) {
              cek(suku[q] === "+", `${v.id}/${a.id}#${i + 1}: hanya tanda tambah ("${m[0]}")`);
              nilai += Number(suku[q + 1]);
              stat.tambah += 1;
            }
            cek(nilai <= 20 && nilai === Number(bagian[1]), `${v.id}/${a.id}#${i + 1}: kalimat hitungan benar dan tidak lebih dari dua puluh ("${m[0]}")`);
          }
          cek(!/\d\s*[×÷*\/]\s*\d|\d\s*-\s*\d|−/.test(t), `${v.id}/${a.id}#${i + 1}: tanpa tanda kali, bagi, kurang, atau tanda hubung sebagai kurang ("${t}")`);
        }
      });
    }
  }
  // 2) Kalimat tambah yang disusun potongan demi potongan: [video, adegan, ketukan (mulai 0), awalan id, [a, b]].
  const rumus = [
    [M_VIDEO, "kantong-sepuluh", 4, "ka", [10, 5]],
    [M_VIDEO, "ikat-sedotan", 4, "ra", [10, 3]],
    [M_VIDEO, "menara-balok", 4, "rb", [10, 4]],
    [M_VIDEO, "angka-sama", 4, "rs", [10, 1]],
    [M_VIDEO, "dua-puluh", 2, "rd", [10, 10]],
    [M_VIDEO, "latihan-dua", 3, "rq", [10, 8]],
    [M_VIDEO, "latihan-tiga", 2, "rt", [10, 2]],
    [U, "luar-hitung-terapan", 4, "ru", [10, 6]],
    [U, "luar-satuan-terapan", 4, "rm", [10, 7]],
    [U, "luar-bingkai-terapan", 3, "rw", [10, 8]],
  ];
  for (const [v, id, ke, p, [m, n]] of rumus) {
    const a = adegan(v, id);
    const o = akhirAdegan(a, ke);
    const token = [String(m), "+", String(n), "=", String(m + n)];
    stat.rumus += 1;
    sama(token.map((_, i) => isiTeks(o, `${p}${i}`)), token, `${id}: kalimat ${token.join(" ")} tersusun`);
    cek(m + n <= 20, `${id}: hasil paling besar dua puluh`);
    const xs = token.map((_, i) => ketemu(o, `${p}${i}`).x);
    cek(xs.every((x, i) => i === 0 || x > xs[i - 1]), `${id}: potongan ${p} berderet kiri ke kanan`);
    const w = kataSuara(a.ketukan[ke]).join(" ");
    // suara menyebut: a ditambah b sama dengan hasil (berurutan)
    let dari = 0;
    const urut = [NAMA[m], "ditambah", NAMA[n], "sama dengan", NAMA[m + n]].every((f) => {
      const q = w.indexOf(f, dari);
      dari = q + f.length;
      return q >= 0;
    });
    cek(urut, `${id}: suara menyebut ${NAMA[m]} ditambah ${NAMA[n]} sama dengan ${NAMA[m + n]} berurutan (${w})`);
    const kw = kataSuara(a.ketukan[ke]);
    const pos = token.map((_, i) => [...Array(kw.length).keys()].find((q) => ketemu(L.keadaanStory(a, ke, q), `${p}${i}`)));
    cek(pos.every((q, i) => q !== undefined && (i === 0 || q > pos[i - 1])), `${id}: potongan ${p} muncul satu demi satu mengikuti ucapan`);
    cek(kw[pos[0]] === "sepuluh" && kw[pos[1]] === "ditambah" && kw[pos[2]] === kataAkhir(n) && kw[pos[3]] === "sama" && kw[pos[4]] === kataAkhir(m + n), `${id}: tiap potongan muncul tepat saat kata-nya diucapkan`);
  }
  sama(isiTeks(akhirAdegan(adegan(M_VIDEO, "latihan-dua"), 3), "rq0"), "10", "Latihan 2: sepuluh di awal kalimat");

  // 3) Hitung satu demi satu: penghitung berubah tepat saat kata bilangan diucapkan.
  // [video, adegan, ketukan, id penghitung, label, bilangan pertama, banyak]
  const hitungan = [
    [M_VIDEO, "cerita-kelereng", 1, "ch", "kelereng", 1, 15],
    [M_VIDEO, "ikat-sedotan", 3, "ch", "satuan", 1, 3],
    [M_VIDEO, "menara-balok", 3, "ch", "satuan", 1, 4],
    [U, "luar-hitung", 1, "ch", "hitung", 1, 10],
    [U, "luar-hitung", 2, "ch", "hitung", 11, 5],
    [U, "luar-hitung", 3, "ch", "hitung", 16, 5],
    [U, "luar-hitung-terapan", 1, "ch", "kancing", 1, 10],
    [U, "luar-hitung-terapan", 2, "ch", "kancing", 11, 6],
    [U, "luar-satuan-terapan", 3, "ch", "satuan", 1, 7],
  ];
  for (const [v, id, ke, cid, label, mulai, n] of hitungan) {
    const a = adegan(v, id);
    const w = kataSuara(a.ketukan[ke]);
    const urutan = [];
    for (let p = -1; p < w.length; p += 1) {
      const t = isiTeks(L.keadaanStory(a, ke, p), cid);
      if (t !== undefined && urutan[urutan.length - 1]?.t !== t) urutan.push({ t, p });
    }
    stat.hitung += 1;
    const harap = Array.from({ length: n }, (_, i) => `${label}: ${mulai + i}`);
    if (mulai > 1) harap.unshift(`${label}: ${mulai - 1}`);
    sama(urutan.map((x) => x.t), harap, `${id}#${ke + 1}: penghitung ${label} naik satu demi satu`);
    urutan.forEach((x, i) => {
      const bil = mulai > 1 ? mulai - 1 + i : mulai + i;
      if (mulai > 1 && i === 0) return;
      cek(w[x.p] === kataAkhir(bil), `${id}#${ke + 1}: penghitung ${label} ${bil} berubah saat kata ${NAMA[bil]} (kata: ${w[x.p]})`);
      cek(L.keadaanStory(a, ke, x.p).some((o) => o.sorot), `${id}#${ke + 1}: ada benda yang menyala saat menghitung ${label} ${bil}`);
    });
  }

  // 4) Benda berpindah satu demi satu saat bilangan diucapkan: [video, adegan, ketukan, awalan id, letak tujuan(i), banyak]
  const pindah = [
    [M_VIDEO, "kantong-sepuluh", 1, /^kl\d+$/, M1.dalamKantong, 10],
    [M_VIDEO, "ikat-sedotan", 1, /^sd\d+$/, M1.dalamIkatan, 10],
    [M_VIDEO, "menara-balok", 1, /^bl\d+$/, M1.dalamMenara, 10],
    [U, "luar-satuan-terapan", 1, /^tt\d+$/, U2.titikBlok, 10],
  ];
  for (const [v, id, ke, re, tujuan, n] of pindah) {
    const a = adegan(v, id);
    const w = kataSuara(a.ketukan[ke]);
    const hitungTiba = (p) => awalan(L.keadaanStory(a, ke, p), re).filter((o) => {
      const i = Number(o.id.replace(/\D/g, ""));
      return i < n && o.x === tujuan(i).x && o.y === tujuan(i).y;
    }).length;
    const urutan = [];
    for (let p = -1; p < w.length; p += 1) {
      const c = hitungTiba(p);
      if (urutan[urutan.length - 1]?.c !== c) urutan.push({ c, p });
    }
    stat.pindah += 1;
    sama(urutan.map((x) => x.c), Array.from({ length: n + 1 }, (_, i) => i), `${id}: ${n} benda berpindah satu demi satu`);
    urutan.forEach((x, i) => i > 0 && cek(w[x.p] === kataAkhir(i), `${id}: benda ke-${i} pindah saat kata ${NAMA[i]} (kata: ${w[x.p]})`));
  }

  // 5) Kelereng Halim: lima belas kelereng, sepuluh masuk kantong (satu puluhan), lima di luar (satuan).
  {
    const c = adegan(M_VIDEO, "cerita-kelereng");
    const C1 = akhirAdegan(c, 0);
    const kl = awalan(C1, /^kl\d+$/);
    stat.gabung += 1;
    cek(kl.length === 15 && kl.every((o) => o.t === "bulat") && new Set(kl.map((o) => `${o.x},${o.y}`)).size === 15, "cerita kelereng: lima belas kelereng di tempat berbeda");
    const k = adegan(M_VIDEO, "kantong-sepuluh");
    const K1 = akhirAdegan(k, 0);
    const K4 = akhirAdegan(k, 3);
    const kt = ketemu(K4, "kt");
    const bag = { x: kt.x, y: kt.y, w: kt.w, h: kt.h };
    sama(bag, M1.KANTONG, "kantong: letak sesuai data gambar");
    const klK = awalan(K4, /^kl\d+$/);
    cek(klK.length === 15, "kantong: tetap lima belas kelereng");
    cek(klK.filter((o) => dalam(o, bag)).length === 10 && klK.filter((o) => !sentuh(o, bag)).length === 5, "kantong: tepat sepuluh kelereng di dalam kantong dan lima di luar");
    cek(klK.filter((o) => dalam(o, bag)).every((o) => Number(o.id.slice(2)) < 10), "kantong: sepuluh kelereng pertama yang masuk");
    cek(awalan(K1, /^kl\d+$/).every((o) => !sentuh(o, bag)), "kantong: kelereng mula-mula di luar kantong");
    cek(kt.z < 0, "kantong: digambar di belakang kelereng (z kecil)");
    sama([isiTeks(K4, "l1"), isiTeks(K4, "l5")], ["1 puluhan", "5 satuan"], "kantong: label 1 puluhan dan 5 satuan");
    cek(klK.filter((o) => !sentuh(o, bag)).every((o) => o.warna === "#FBA919"), "kantong: kelereng satuan diberi warna lain");
    sama(awalan(akhirAdegan(k, 4), /^ka[0-4]$/).length, 5, "kantong: kalimat 10 + 5 = 15");
    stat.gabung += 1;
  }
  // 6) Sedotan Kira: tiga belas sedotan, sepuluh diikat pita, tiga lepas.
  {
    const a = adegan(M_VIDEO, "ikat-sedotan");
    const I0 = akhirAdegan(a, 0);
    const I2 = akhirAdegan(a, 2);
    const I4 = akhirAdegan(a, 4);
    stat.gabung += 1;
    const sd = awalan(I2, /^sd\d+$/);
    cek(awalan(I0, /^sd\d+$/).length === 13 && sd.length === 13 && sd.every((o) => o.t === "garis" && o.x2 === 0 && o.y2 === 30), "ikat sedotan: tiga belas sedotan sama panjang");
    const pt = ketemu(I2, "pt");
    const ikat = sd.filter((o) => o.x >= pt.x && o.x <= pt.x + pt.w);
    const lepas = sd.filter((o) => o.x < pt.x || o.x > pt.x + pt.w);
    cek(ikat.length === 10 && lepas.length === 3, "ikat sedotan: sepuluh sedotan di bawah pita dan tiga lepas");
    cek(ikat.every((o) => Number(o.id.slice(2)) < 10) && lepas.every((o) => Number(o.id.slice(2)) >= 10), "ikat sedotan: sepuluh sedotan pertama yang diikat");
    cek(pt.y > ikat[0].y && pt.y + pt.h < ikat[0].y + 30 && pt.z > 0, "ikat sedotan: pita melingkari bagian tengah ikatan, digambar di atas sedotan");
    cek(new Set(ikat.map((o) => o.x)).size === 10 && Math.max(...ikat.map((o) => o.x)) - Math.min(...ikat.map((o) => o.x)) < 50, "ikat sedotan: sepuluh sedotan rapat dalam satu ikatan");
    cek(isiTeks(I2, "l1") === "1 puluhan" && isiTeks(I4, "ch") === "satuan: 3", "ikat sedotan: 1 puluhan dan 3 satuan");
    stat.gabung += 1;
  }
  // 7) Balok Wei: empat belas balok, menara sepuluh tertumpuk rapat, empat lepas.
  {
    const a = adegan(M_VIDEO, "menara-balok");
    const D0 = akhirAdegan(a, 0);
    const D2 = akhirAdegan(a, 2);
    stat.gabung += 1;
    const bl = awalan(D2, /^bl\d+$/);
    cek(awalan(D0, /^bl\d+$/).length === 14 && bl.length === 14 && bl.every((o) => o.t === "kotak" && o.w === 24 && o.h === 11), "menara balok: empat belas balok sama besar");
    const menara = bl.filter((o) => o.x === 46).sort((p, q) => q.y - p.y);
    const lepas = bl.filter((o) => o.x !== 46);
    cek(menara.length === 10 && lepas.length === 4, "menara balok: sepuluh balok di menara dan empat lepas");
    cek(menara.every((o, i) => i === 0 || menara[i - 1].y - o.y === 11) && menara[0].y + 11 === 176, "menara balok: sepuluh balok tertumpuk rapat tanpa celah dari alas");
    cek(lepas.every((o) => !sentuh(o, { x: 46, y: 66, w: 24, h: 110 })), "menara balok: balok lepas tidak menimpa menara");
    cek(lepas.every((o) => o.y === lepas[0].y) && new Set(lepas.map((o) => o.x)).size === 4, "menara balok: empat balok lepas berjajar");
    cek(isiTeks(D2, "l1") === "1 puluhan" && isiTeks(akhirAdegan(a, 3), "ch") === "satuan: 4", "menara balok: 1 puluhan dan 4 satuan");
    stat.gabung += 1;
  }
  // 8) Papan nilai tempat: angka kiri di kolom puluhan, angka kanan di kolom satuan.
  {
    const a = adegan(M_VIDEO, "papan-nilai");
    const E1 = akhirAdegan(a, 3);
    stat.gabung += 1;
    const cp = ketemu(E1, "cp");
    const cs = ketemu(E1, "cs");
    const dp = ketemu(E1, "dp");
    const ds = ketemu(E1, "ds");
    cek(dp.isi === "1" && ds.isi === "5" && dp.x > cp.x && dp.x < cp.x + cp.w && ds.x > cs.x && ds.x < cs.x + cs.w && cp.x < cs.x, "papan nilai tempat: angka satu di kolom puluhan (kiri), angka lima di kolom satuan (kanan)");
    const hp = ketemu(E1, "hp-k");
    const hs = ketemu(E1, "hs-k");
    cek(hp.x === cp.x && hp.w === cp.w && hs.x === cs.x && hs.w === cs.w && isiTeks(E1, "hp-t0") === "Puluhan" && isiTeks(E1, "hs-t0") === "Satuan" && hp.y + hp.h <= cp.y, "papan nilai tempat: judul kolom puluhan dan satuan tepat di atas kolomnya");
    sama([isiTeks(E1, "l1"), isiTeks(E1, "l5"), isiTeks(E1, "n15")], ["1 puluhan", "5 satuan", "15"], "papan nilai tempat: label dan bilangan lima belas");
    sama(isiTeks(akhirAdegan(a, 4), "kj-t0"), "1 puluhan + 5 satuan = 15", "papan nilai tempat: kalimat nilai tempat");
  }
  // 9) Membaca bilangan: tiap baris puluhan dan satuan cocok dengan bilangannya, dan suara menyebut bilangannya.
  {
    const a = adegan(M_VIDEO, "baca-angka");
    const B = akhirAdegan(a, 3);
    sama(M2.BACA, [[12, 1, 2], [18, 1, 8], [17, 1, 7]], "baca angka: daftar bilangan");
    M2.BACA.forEach(([n, pu, sa], i) => {
      stat.baca += 1;
      sama([isiTeks(B, `bn${i}-t`), isiTeks(B, `bd${i}`)], [String(n), `${pu} puluhan, ${sa} satuan`], `baca angka: baris ${i + 1}`);
      cek(pu * 10 + sa === n && String(n)[0] === String(pu) && String(n)[1] === String(sa), `baca angka: ${n} = angka kiri puluhan dan angka kanan satuan`);
      cek(a.ketukan.map((kt) => kataSuara(kt).join(" ")).join(" ").includes(NAMA[n]), `baca angka: suara menyebut ${NAMA[n]}`);
    });
  }
  // 10) Angka sama, nilai berbeda: bilangan sebelas.
  {
    const a = adegan(M_VIDEO, "angka-sama");
    const S = akhirAdegan(a, 3);
    const d1 = ketemu(S, "d1");
    const d2 = ketemu(S, "d2");
    stat.baca += 1;
    cek(d1.isi === "1" && d2.isi === "1" && d1.x < d2.x, "angka sama: dua angka satu berdampingan");
    const kp = ketemu(S, "kp-k");
    const ks = ketemu(S, "ks-k");
    cek(d1.x > kp.x && d1.x < kp.x + kp.w && d2.x > ks.x && d2.x < ks.x + ks.w, "angka sama: kartu nilai tepat di bawah angkanya");
    sama([isiTeks(S, "kp-t0"), isiTeks(S, "kp-t1"), isiTeks(S, "ks-t0"), isiTeks(S, "ks-t1")], ["puluhan", "bernilai 10", "satuan", "bernilai 1"], "angka sama: kiri puluhan bernilai 10, kanan satuan bernilai 1");
  }
  // 11) Daftar sepuluh sampai dua puluh: tiap baris benar dan muncul saat namanya disebut.
  {
    const a = adegan(M_VIDEO, "daftar-nilai");
    const D = akhirAdegan(a, 3);
    stat.baca += 1;
    for (let n = 10; n <= 20; n += 1) {
      cek(isiTeks(D, `rw${n}`) === `${n}: ${Math.floor(n / 10)} puluhan, ${n % 10} satuan`, `daftar: baris ${n} benar (${isiTeks(D, `rw${n}`)})`);
      let ke = -1;
      let pos = -1;
      a.ketukan.forEach((kt, i) => {
        if (ke >= 0) return;
        const kw = kataSuara(kt);
        for (let p = 0; p < kw.length; p += 1) if (ketemu(L.keadaanStory(a, i, p), `rw${n}`) && !(i > 0 && ketemu(L.keadaanStory(a, i - 1, 9999), `rw${n}`))) { ke = i; pos = p; break; }
      });
      cek(ke >= 0 && kataSuara(a.ketukan[ke])[pos] === NAMA[n].split(" ")[0], `daftar: baris ${n} muncul saat ${NAMA[n]} disebut (kata: ${ke >= 0 ? kataSuara(a.ketukan[ke])[pos] : "-"})`);
    }
    cek(Array.from({ length: 11 }, (_, i) => ketemu(D, `rw${10 + i}`).y).every((y, i, s) => i === 0 || y > s[i - 1]), "daftar: baris berurut dari atas ke bawah");
  }
  // 12) Tukar sepuluh kubus dengan satu batang.
  {
    const a = adegan(M_VIDEO, "tukar-sepuluh");
    const T0 = akhirAdegan(a, 0);
    const T1 = akhirAdegan(a, 1);
    const T2 = akhirAdegan(a, 2);
    const T3 = akhirAdegan(a, 3);
    stat.gabung += 1;
    cek(awalan(T0, /^kb\d+$/).length === 12 && awalan(T0, /^kb\d+$/).every((o) => o.w === 12 && o.h === 12), "tukar sepuluh: dua belas kubus satuan");
    cek(awalan(T1, /^kb\d+$/).filter((o) => o.sorot).length === 10, "tukar sepuluh: sepuluh kubus diketuk (menyala)");
    cek(awalan(T2, /^kb\d+$/).length === 2 && !ketemu(T2, "t10"), "tukar sepuluh: sepuluh kubus ditukar, tinggal dua kubus");
    const bt = ketemu(T2, "bt");
    cek(!!bt && bt.h >= 80 && isiTeks(T2, "bt-t") === "10", "tukar sepuluh: satu batang puluhan bernilai sepuluh");
    const sisa = awalan(T3, /^kb\d+$/);
    cek(sisa.every((o) => !berdampak(o, bt)) && sentuh({ x: sisa[0].x, y: sisa[0].y, w: 1, h: 1, t: "kotak" }, { x: 0, y: 0, w: 300, h: 200 }), "tukar sepuluh: kubus sisa tidak menimpa batang");
    const l2 = ketemu(T3, "l2");
    cek(sisa.every((o) => l2.x >= o.x - 12 && l2.x <= o.x + 24 + 12) && isiTeks(T3, "l1") === "1 puluhan" && l2.isi === "2 satuan", "tukar sepuluh: 1 puluhan dan 2 satuan, label satuan di bawah kubus sisa");
  }
  // 13) Dua puluh kubus: dua baris sepuluh.
  {
    const a = adegan(M_VIDEO, "dua-puluh");
    const J = akhirAdegan(a, 0);
    stat.gabung += 1;
    const ku = awalan(J, /^ku\d+$/);
    const baris = [...new Set(ku.map((o) => o.y))];
    cek(ku.length === 20 && baris.length === 2 && baris.every((y) => ku.filter((o) => o.y === y).length === 10), "dua puluh kubus: dua baris, tiap baris tepat sepuluh kubus (dua puluhan)");
    cek(akhirAdegan(a, 2).find((o) => o.id === "p3")?.isi === "2 puluhan, 0 satuan", "dua puluh kubus: dua puluhan dan nol satuan");
    const J4 = akhirAdegan(a, 3);
    sama([isiTeks(J4, "a19-t"), isiTeks(J4, "a20-t"), isiTeks(J4, "u19"), isiTeks(J4, "u20")], ["19", "20", "1 puluhan, 9 satuan", "2 puluhan, 0 satuan"], "dua puluh: sembilan belas lalu dua puluh");
  }
  // 14) Susun kalimat dengan kartu: tiap kartu ke kotak yang benar.
  {
    const a = adegan(M_VIDEO, "susun-kalimat");
    const K0 = akhirAdegan(a, 0);
    const K4 = akhirAdegan(a, 4);
    stat.kartu += 1;
    cek(M3.KARTU_KALIMAT.every(([id, , x]) => ketemu(K0, `${id}-k`).x === x && ketemu(K0, `${id}-k`).y === 130), "susun kalimat: tiga kartu mula-mula di bawah, di luar kotak");
    for (const [id, isi, , t] of M3.KARTU_KALIMAT) {
      const slot = ketemu(K4, `sl${t}`);
      const kk = ketemu(K4, `${id}-k`);
      const tt = ketemu(K4, `${id}-t`);
      cek(kk.x === slot.x && kk.y === slot.y && tt.isi === isi && tt.x === slot.x + slot.w / 2 && tt.y > slot.y && tt.y < slot.y + slot.h, `susun kalimat: kartu ${isi} tepat di kotak ke-${t + 1}`);
    }
    const lab = [ketemu(K4, "kt0").x, ketemu(K4, "kt1").x, ketemu(K4, "kt2").x, ketemu(K4, "kt3").x];
    cek(M3.TEMPAT_KALIMAT[0].x < lab[0] && lab[0] < M3.TEMPAT_KALIMAT[1].x && M3.TEMPAT_KALIMAT[1].x < lab[2] && lab[2] < lab[3] && lab[3] < M3.TEMPAT_KALIMAT[2].x, "susun kalimat: kotak puluhan, kata puluhan, kotak satuan, kata satuan, sama dengan, kotak hasil berurutan");
    sama(M3.KARTU_KALIMAT.map(([, isi, , t]) => [t, isi]).sort(), [[0, "1"], [1, "3"], [2, "13"]], "susun kalimat: 1 puluhan, 3 satuan, 13");
    cek(10 * 1 + 3 === 13, "susun kalimat: 1 puluhan dan 3 satuan = 13");
    // Tiap kartu berpindah tepat saat kata seret diucapkan.
    for (const [ke, id] of [[1, "ca1"], [2, "ca3"], [3, "ca13"]]) {
      const w = kataSuara(a.ketukan[ke]);
      const awal = ketemu(L.keadaanStory(a, ke, -1), `${id}-k`);
      const p = [...Array(w.length).keys()].find((q) => { const o = ketemu(L.keadaanStory(a, ke, q), `${id}-k`); return o.x !== awal.x || o.y !== awal.y; });
      cek(p !== undefined && w[p] === "seret", `susun kalimat: kartu ${id} berpindah saat kata seret (kata: ${w[p]})`);
    }
  }
  // 15) Latihan 1: pilih tabel yang cocok dengan empat belas balok; hanya satu pilihan benar, kolom tertukar salah.
  {
    const a = adegan(M_VIDEO, "latihan-satu");
    const A0 = akhirAdegan(a, 0);
    const A2 = akhirAdegan(a, 2);
    stat.kartu += 1;
    const nilai = M3.PILIHAN_TABEL.map((t) => { const m = t.match(/^puluhan (\d), satuan (\d)$/); return Number(m[1]) * 10 + Number(m[2]); });
    sama(nilai, [14, 41, 13], "Latihan 1: nilai tiga pilihan tabel (kolom tertukar menjadi 41)");
    cek(nilai.filter((n) => n === 14).length === 1 && nilai[0] === 14, "Latihan 1: hanya pilihan pertama sama dengan empat belas");
    cek(awalan(A0, /^ls\d$/).length === 4 && isiTeks(A0, "lb-t") === "10" && ketemu(A0, "lb").h > 60 && isiTeks(A0, "lt") === "14 balok", "Latihan 1: satu batang sepuluh dan empat balok lepas, empat belas balok");
    cek(ketemu(A2, "a0-k").warna === W_EMAS && ketemu(A2, "a1-k").warna !== W_EMAS && ketemu(A2, "a2-k").warna !== W_EMAS, "Latihan 1: hanya pilihan pertama ditandai benar");
    sama([isiTeks(akhirAdegan(a, 1), "a0-t0"), isiTeks(akhirAdegan(a, 1), "a1-t0"), isiTeks(akhirAdegan(a, 1), "a2-t0")], M3.PILIHAN_TABEL, "Latihan 1: tiga pilihan tabel");
  }
  // 16) Latihan 2: delapan belas kelereng, sepuluh di kantong dan delapan lepas; kartu angka satu dan delapan pada kolom yang benar.
  {
    const a = adegan(M_VIDEO, "latihan-dua");
    const Q0 = akhirAdegan(a, 0);
    const Q3 = akhirAdegan(a, 3);
    stat.kartu += 1;
    const kg = ketemu(Q0, "kg");
    const tp = awalan(Q0, /^tp\d$/);
    const tl = awalan(Q0, /^tl\d$/);
    cek(tp.length === 10 && tp.every((o) => dalam(o, kg)) && tl.length === 8 && tl.every((o) => !sentuh(o, kg)), "Latihan 2: sepuluh titik di dalam kantong dan delapan titik lepas (delapan belas)");
    const [slotP, slotS] = M3.SLOT_PAPAN;
    const cd1 = ketemu(Q3, "cd1-k");
    const cd8 = ketemu(Q3, "cd8-k");
    const cd5 = ketemu(Q3, "cd5-k");
    cek(dalam(cd1, slotP) && dalam(cd8, slotS) && !sentuh(cd5, slotP) && !sentuh(cd5, slotS), "Latihan 2: kartu satu di kolom puluhan, kartu delapan di kolom satuan, kartu lima tetap di luar");
    cek(isiTeks(Q3, "cd1-t") === "1" && isiTeks(Q3, "cd8-t") === "8" && 10 * 1 + 8 === 18 && isiTeks(Q3, "hp") === "puluhan" && isiTeks(Q3, "hs") === "satuan", "Latihan 2: papan menunjukkan satu dan delapan (delapan belas)");
    cek(ketemu(Q3, "hp").x === slotP.x + slotP.w / 2 && ketemu(Q3, "hs").x === slotS.x + slotS.w / 2 && slotP.x < slotS.x, "Latihan 2: judul kolom di atas kotaknya, puluhan di kiri");
  }
  // 17) Latihan 3: dua belas lidi, sepuluh diikat dan dua lepas; jawaban dua belas.
  {
    const a = adegan(M_VIDEO, "latihan-tiga");
    const R0 = akhirAdegan(a, 0);
    const R1 = akhirAdegan(a, 1);
    const R2 = akhirAdegan(a, 2);
    stat.kartu += 1;
    const ld = awalan(R0, /^ld\d+$/);
    const lp = ketemu(R0, "lp");
    cek(ld.length === 12 && ld.every((o) => o.t === "garis" && o.y2 === 30), "Latihan 3: dua belas lidi sama panjang");
    cek(ld.filter((o) => o.x >= lp.x && o.x <= lp.x + lp.w).length === 10 && ld.filter((o) => o.x > lp.x + lp.w).length === 2, "Latihan 3: sepuluh lidi diikat pita dan dua lepas (1 puluhan dan 2 satuan)");
    sama(["ja11-t", "ja12-t", "ja20-t"].map((id) => isiTeks(R1, id)), ["11", "12", "20"], "Latihan 3: tiga kartu jawaban sebelas, dua belas, dua puluh");
    cek(ketemu(R2, "ja12-k").warna === W_EMAS && ketemu(R2, "ja11-k").warna !== W_EMAS && ketemu(R2, "ja20-k").warna !== W_EMAS, "Latihan 3: hanya jawaban dua belas ditandai benar");
    sama([isiTeks(R1, "l1"), isiTeks(R1, "l2")], ["1 puluhan", "2 satuan"], "Latihan 3: label 1 puluhan dan 2 satuan");
  }
  // 18) Metode luar: Hitung sampai dua puluh (dua puluh titik dalam dua baris), kancing, titik Malosi, bingkai.
  {
    const a = adegan(U, "luar-hitung");
    const H = akhirAdegan(a, 3);
    stat.gabung += 1;
    const dt = awalan(H, /^dt\d+$/);
    const baris = [...new Set(dt.map((o) => o.y))];
    cek(dt.length === 20 && baris.length === 2 && baris.every((y) => dt.filter((o) => o.y === y).length === 10) && isiTeks(H, "ch") === "hitung: 20", "Hitung sampai 20: dua puluh titik dalam dua baris sepuluh, penghitung berakhir di dua puluh");
    const t = adegan(U, "luar-hitung-terapan");
    const T = akhirAdegan(t, 3);
    const kn = awalan(T, /^kn\d+$/);
    cek(kn.length === 16 && kn.filter((o) => o.warna !== "#FECACA").length === 10 && kn.filter((o) => o.warna === "#FECACA").every((o) => Number(o.id.slice(2)) >= 10), "kancing Upe: enam belas kancing, sepuluh pertama satu puluhan dan enam sisanya satuan");
    cek(isiTeks(T, "l1") === "1 puluhan" && isiTeks(T, "l2") === "6 satuan" && isiTeks(T, "ch") === "kancing: 16", "kancing Upe: 1 puluhan dan 6 satuan");
    // Satuan terapan: titik Malosi
    const s = adegan(U, "luar-satuan-terapan");
    const S = akhirAdegan(s, 3);
    const tt = awalan(S, /^tt\d+$/);
    const ring = ketemu(S, "ring");
    stat.gabung += 1;
    cek(tt.length === 17 && tt.filter((o) => dalam(o, ring)).length === 10 && tt.filter((o) => !sentuh(o, ring)).length === 7, "titik Malosi: tepat sepuluh titik di dalam lingkaran dan tujuh di luar (tujuh belas)");
    sama(U2.RING, { x: ring.x, y: ring.y, w: ring.w, h: ring.h }, "titik Malosi: letak lingkaran");
    cek(tt.filter((o) => dalam(o, ring)).every((o) => Number(o.id.slice(2)) < 10) && ring.z < 0, "titik Malosi: sepuluh titik pertama di dalam lingkaran dan lingkaran di belakang titik");
    sama([isiTeks(S, "l1"), isiTeks(S, "ch")], ["1 puluhan", "satuan: 7"], "titik Malosi: 1 puluhan dan 7 satuan");
    // Bingkai sepuluh
    const frame = (objs, awal) => awalan(objs, new RegExp(`^${awal}\\d$`));
    const pusat = (c) => [c.x + c.w / 2, c.y + c.h / 2];
    const dotDalamSel = (objs, dots, sel) => dots.every((d) => { const i = Number(d.id.slice(2)); const c = sel.find((cc) => cc.id === `${d.id.startsWith("ba") ? "fa" : "fb"}${i}`); return !!c && d.x === pusat(c)[0] && d.y === pusat(c)[1] && dalam(d, c); });
    const b = adegan(U, "luar-bingkai");
    const B = akhirAdegan(b, 3);
    stat.gabung += 1;
    const fa = frame(B, "fa");
    const fb = frame(B, "fb");
    const ba = frame(B, "ba");
    const bb = frame(B, "bb");
    cek(fa.length === 10 && fb.length === 10 && fa.every((c) => c.w === 22 && c.h === 22), "bingkai sepuluh: dua bingkai, masing-masing sepuluh kotak sama besar");
    cek([...new Set(fa.map((c) => c.y))].length === 2 && [...new Set(fa.map((c) => c.x))].length === 5, "bingkai sepuluh: dua baris, tiap baris lima kotak");
    cek(ba.length === 10 && dotDalamSel(B, ba, fa) && bb.length === 4 && dotDalamSel(B, bb, fb), "bingkai sepuluh: satu bingkai penuh sepuluh titik dan bingkai kedua empat titik, tiap titik di dalam kotaknya");
    cek(isiTeks(B, "n14") === "14" && isiTeks(B, "l1") === "1 puluhan" && isiTeks(B, "l2") === "4 satuan" && 10 + 4 === 14, "bingkai sepuluh: 1 puluhan dan 4 satuan, empat belas");
    cek(ketemu(B, "fa0").x < ketemu(B, "fb0").x && isiTeks(B, "hA") === "puluhan" && isiTeks(B, "hB") === "satuan", "bingkai sepuluh: bingkai puluhan di kiri dan bingkai satuan di kanan");
    const bt = adegan(U, "luar-bingkai-terapan");
    const BT = akhirAdegan(bt, 3);
    const ba2 = frame(BT, "ba");
    const bb2 = frame(BT, "bb");
    stat.gabung += 1;
    cek(ba2.length === 10 && dotDalamSel(BT, ba2, frame(BT, "fa")) && bb2.length === 8 && dotDalamSel(BT, bb2, frame(BT, "fb")), "bingkai Wei: sepuluh titik di bingkai pertama dan delapan titik di bingkai kedua (delapan belas)");
    cek(isiTeks(BT, "t10") === "1 puluhan" && isiTeks(BT, "l2") === "8 satuan", "bingkai Wei: 1 puluhan dan 8 satuan");
    // Munculnya titik bingkai satu demi satu saat bilangan diucapkan
    for (const [ad, ke, re, n] of [[b, 1, /^ba\d$/, 10], [b, 2, /^bb\d$/, 4], [bt, 1, /^ba\d$/, 10], [bt, 2, /^bb\d$/, 8]]) {
      const w = kataSuara(ad.ketukan[ke]);
      const urutan = [];
      for (let p = -1; p < w.length; p += 1) { const c = awalan(L.keadaanStory(ad, ke, p), re).length; if (urutan[urutan.length - 1]?.c !== c) urutan.push({ c, p }); }
      stat.hitung += 1;
      sama(urutan.map((x) => x.c), Array.from({ length: n + 1 }, (_, i) => i), `${ad.id}#${ke + 1}: titik bingkai muncul satu demi satu`);
      urutan.forEach((x, i) => i > 0 && cek(w[x.p] === kataAkhir(i), `${ad.id}#${ke + 1}: titik ke-${i} muncul saat kata ${NAMA[i]} (kata: ${w[x.p]})`));
    }
  }
  // 19) Sepuluh dan Satuan: tiap kalimat sepuluh ditambah sisa sesuai bilangannya.
  {
    const a = adegan(U, "luar-satuan");
    const P = akhirAdegan(a, 1);
    sama([isiTeks(P, "f1"), isiTeks(P, "f2"), isiTeks(P, "f3")], ["10 + 1 = 11", "10 + 2 = 12", "10 + 3 = 13"], "Sepuluh dan Satuan: sebelas, dua belas, tiga belas");
    const P4 = akhirAdegan(a, 3);
    sama([isiTeks(P4, "f4"), isiTeks(P4, "f5")], ["10 + 5 = 15", "10 + 9 = 19"], "Sepuluh dan Satuan: lima belas dan sembilan belas");
    const w = kataSuara(a.ketukan[1]);
    for (const [n, id] of [[1, "f1"], [2, "f2"], [3, "f3"]]) {
      const p = [...Array(w.length).keys()].find((q) => ketemu(L.keadaanStory(a, 1, q), id));
      cek(w[p] === (n === 1 ? "sebelas" : NAMA[10 + n].split(" ")[0]), `Sepuluh dan Satuan: kalimat ${id} muncul saat ${NAMA[10 + n]} disebut (kata: ${w[p]})`);
    }
  }
  // 20) Metode luar: nama (bahasa Indonesia) tampil pada kepala tiap adegan konsep dan terapan.
  for (const [id, i] of [["luar-hitung", 0], ["luar-hitung-terapan", 0], ["luar-satuan", 1], ["luar-satuan-terapan", 1], ["luar-bingkai", 2], ["luar-bingkai-terapan", 2]]) {
    const semuaT = adegan(U, id).ketukan.flatMap((kt, q) => L.teksTerlihat(L.keadaanStory(adegan(U, id), q, 9999)));
    cek(semuaT.includes(U1.NAMA_METODE[i]), `${id}: kepala memuat ${U1.NAMA_METODE[i]}`);
  }
  globalThis.UKUR = {
    Kelereng: [15, 10],
    Sedotan: [13, 10],
    Balok: [14, 10],
    Kubus: [20, 20],
  };
  // Ukuran benda di video untuk tabel: banyak seluruhnya dan banyak yang digabung jadi puluhan.
  {
    const k4 = akhirAdegan(adegan(M_VIDEO, "kantong-sepuluh"), 3);
    const bag = { x: M1.KANTONG.x, y: M1.KANTONG.y, w: M1.KANTONG.w, h: M1.KANTONG.h };
    const kl = awalan(k4, /^kl\d+$/);
    const sd = awalan(akhirAdegan(adegan(M_VIDEO, "ikat-sedotan"), 4), /^sd\d+$/);
    const pt = ketemu(akhirAdegan(adegan(M_VIDEO, "ikat-sedotan"), 4), "pt");
    const bl = awalan(akhirAdegan(adegan(M_VIDEO, "menara-balok"), 4), /^bl\d+$/);
    const ku = awalan(akhirAdegan(adegan(M_VIDEO, "dua-puluh"), 0), /^ku\d+$/);
    globalThis.UKUR = {
      Kelereng: [kl.length, kl.filter((o) => dalam(o, bag)).length],
      Sedotan: [sd.length, sd.filter((o) => o.x >= pt.x && o.x <= pt.x + pt.w).length],
      Balok: [bl.length, bl.filter((o) => o.x === 46).length],
      Kubus: [ku.length, ku.length],
    };
  }
}

/* ------------------------------ Aplikasi belajar mandiri: tanpa instruksi kelompok, teman, buku, menulis, menggambar, atau benda nyata ------------------------------ */
{
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      const semua = [a.judul, a.sumber, v.judul, v.subjudul];
      a.ketukan.forEach((kt, i) => {
        semua.push(kt.suara);
        for (let p = 0; p < L.kataDari(kt.suara).length; p += 1) semua.push(...L.teksTerlihat(L.keadaanStory(a, i, p)));
      });
      const kena = semua.filter((t) => TERLARANG_PEMILIK.test(t));
      cek(kena.length === 0, `${v.id}/${a.id}: tanpa kelompok, teman, depan kelas, buku, menulis di, menggambar, bawa, kertas, atau pensil (${kena.slice(0, 2).join(" | ")})`);
    }
  }
}

/* ------------------------------ Sapaan, peta susun, dan tabel susun ------------------------------ */
{
  const sap = adegan(M_VIDEO, "sapaan");
  const DAFTAR = ["Membentuk satu puluhan", "Menghitung satuan", "Membaca nilai tempat"];
  cek(/Halo anak-anak/.test(sap.ketukan[0].suara) && /Membentuk satu puluhan/i.test(L.teksTerlihat(akhirAdegan(sap, 1)).join(" | ")), "sapaan materi: tiga hal yang dipelajari tampil");
  sama(L.teksTerlihat(akhirAdegan(sap, 1)).filter((t) => DAFTAR.includes(t)), DAFTAR, "sapaan materi: daftar tiga hal");
  cek(!/\d/.test(sap.ketukan[1].suara), "sapaan materi: tanpa angka");
  cek(adegan(U, "sapaan").sumber.startsWith("Metode luar") && sap.sumber.startsWith("Materi"), "sapaan: dua jenis (materi dan metode luar)");
  // Data peta dan tabel: dibaca dari berkas ringkas bila sudah digabung koordinator, bila belum dari berkas sementara .tmp-k1b5s/C.json.
  let A = null;
  try {
    A = JSON.parse(readFileSync(new URL("../src/data/kelas1-bab5-ringkas.json", import.meta.url), "utf8")).subBab.C;
  } catch {}
  if (!A || !A.petaSusun) {
    try {
      A = JSON.parse(readFileSync(new URL("../.tmp-k1b5s/C.json", import.meta.url), "utf8"));
    } catch {}
  }
  cek(!!(A && A.petaSusun && A.tabelSusun), "peta dan tabel susun: data ada (kelas1-bab5-ringkas.json subBab.C atau .tmp-k1b5s/C.json)");
  if (A && A.petaSusun && A.tabelSusun) {
    const peta = A.petaSusun.simpul;
    const anak = (id) => peta.filter((s) => s.induk === id).map((s) => s.teks);
    const akar = peta.filter((s) => s.induk === null);
    cek(akar.length === 3, "peta susun: tiga cabang dari pusat");
    sama(anak(akar[0].id), DAFTAR, "peta susun: cabang pertama sama dengan daftar sapaan");
    sama([anak(akar[1].id).length, anak(akar[2].id).length, peta.length], [3, 2, 11], "peta susun: 3 cara, 2 hasil, 11 simpul");
    sama(peta.map((s) => s.nomor), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], "peta susun: nomor 1 sampai 11");
    cek(peta.every((s) => s.teks.length <= 28) && new Set(peta.map((s) => s.teks)).size === peta.length, "peta susun: teks <= 28 huruf dan unik");
    cek(!/\d/.test(A.petaSusun.pusat.suara) && !/\d/.test(A.petaSusun.petunjuk) && peta.every((s) => !/\d/.test(s.petunjuk ?? "")), "peta susun: suara dan petunjuk tanpa digit");
    cek(!TERLARANG_PEMILIK.test(JSON.stringify({ p: A.petaSusun, t: A.tabelSusun })), "peta dan tabel susun: tanpa kata terlarang (kelompok, teman, buku, menulis, menggambar, bawa, kertas, pensil)");
    cek(!/halaman|kunci|Count to 20|Ten and Ones|Double Ten Frame/i.test(JSON.stringify({ p: A.petaSusun, t: A.tabelSusun })), "peta dan tabel susun: tanpa kata halaman, kunci, atau nama metode berbahasa Inggris");
    cek(!/lebih banyak|lebih sedikit|bandingkan|\bratus\b|\bribu\b|dikali|dibagi|rumus|\bluas\b|keliling|ukuran|\bkurang\b/i.test(JSON.stringify({ p: A.petaSusun, t: A.tabelSusun })), "peta dan tabel susun: hanya puluhan dan satuan sampai dua puluh");
    cek(A.petaSusun.pusat.judul.length <= 28, "peta susun: judul pusat <= 28 huruf (masalah sub-bab)");
    cek(/\?$/.test(A.petaSusun.pusat.judul), "peta susun: pusat berupa pertanyaan masalah sub-bab");
    const T = A.tabelSusun;
    cek(T.baris.length >= 3 && T.baris.length <= 5 && T.kolom.length >= 3 && T.kolom.length <= 4, "tabel susun: 3 sampai 5 baris dan 3 sampai 4 kolom");
    cek(T.baris.every((b) => b.sel.every((s) => s.length <= 26 && (s.match(/\d+/g) ?? []).length <= 1)), "tabel susun: sel <= 26 huruf dan paling banyak satu angka per sel");
    cek(T.baris.every((b) => b.label.split(/\s+/).every((w) => w.length <= 8)), "tabel susun: kata terlama kolom label <= 8 huruf");
    cek(!/\d/.test(T.suara) && !/\d/.test(T.petunjuk), "tabel susun: suara dan petunjuk tanpa digit");
    sama(T.kolom, ["Banyak", "Puluhan", "Satuan"], "tabel susun: kolom banyak, puluhan, satuan");
    // Isi tabel sama dengan benda di video: banyak seluruhnya, banyak puluhan (sepuluh digabung jadi satu), dan satuan sisanya.
    for (const b of T.baris) {
      const u = globalThis.UKUR?.[b.label];
      stat.tabel += 1;
      cek(!!u && u[0] === Number(b.sel[0]) && Math.floor(u[1] / 10) === Number(b.sel[1]), `tabel susun: baris ${b.label} sesuai benda di gambar (banyak ${u?.[0]}, digabung ${u?.[1]}; tabel ${b.sel.join(",")})`);
      cek(Number(b.sel[1]) * 10 + Number(b.sel[2]) === Number(b.sel[0]) && Number(b.sel[0]) <= 20, `tabel susun: ${b.label}: banyak = puluhan x sepuluh + satuan, paling besar dua puluh`);
      cek(!!u && Number(b.sel[2]) === u[0] - Math.floor(u[0] / 10) * 10, `tabel susun: ${b.label}: satuan = sisa di luar gabungan sepuluh`);
    }
    cek(T.baris.every((b) => b.sel.every((s) => /^\d{1,2}$/.test(s))), "tabel susun: tiap sel bilangan paling banyak dua angka");
    // Margin teks sel >= 5 px di lebar 405 px: sel satu atau dua angka (jauh lebih sempit dari sel), label terpanjang dipakai sebagai batas.
    cek(T.baris.every((b) => b.sel.every((s) => s.length <= 2)) && Math.max(...T.baris.map((b) => b.label.length)) <= 8, "tabel susun: sel pendek supaya margin teks >= 5 px di lebar 405 px");
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k1b5c-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k1b5c-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k1b5c sendiri (${impor.join(", ")})`);
  }
  // Emoji dalam data teks gambar juga paling tinggi Emoji 12 (diperiksa pada gambar yang diputar).
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d), `${v.id}/${a.id}: emoji gambar paling tinggi Emoji 12`);
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k1b5c.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|naskah-k1b1/.test(pembungkus) && /VIDEO_MATERI_K1B5C/.test(pembungkus) && /VIDEO_LUAR_K1B5C/.test(pembungkus) && /export function VideoK1B5C/.test(pembungkus) && /daftar-video-cerita/.test(pembungkus), "video-k1b5c.tsx: dua video dari mesin Story, tanpa naskah lama");
  cek(!/\r/.test(pembungkus), "video-k1b5c.tsx: akhir baris LF");
  const sendiri = readFileSync(new URL("uji-story-k1b5c.mjs", import.meta.url), "utf8");
  cek(!/\r/.test(sendiri), "uji-story-k1b5c.mjs: akhir baris LF");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit diputar)`);
}
console.log(`Pemeriksaan: ${stat.tambah} langkah tambah, ${stat.rumus} kalimat hitungan tersusun, ${stat.hitung} hitungan satu demi satu, ${stat.pindah} perpindahan benda satu demi satu, ${stat.gabung} gabungan sepuluh, ${stat.baca} pembacaan nilai tempat, ${stat.kartu} latihan kartu, ${stat.tabel} baris tabel`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
