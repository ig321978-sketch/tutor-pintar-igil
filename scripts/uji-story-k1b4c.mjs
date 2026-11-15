// Uji Story Kelas 1 Bab 4 Sub-Bab C (Menyusun dan Mengurai Bentuk Bangun): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Video diputar bergaya guru: suara, teks terlihat, sumber, judul adegan, dan subjudul tanpa penyebutan buku (kata terlarang diperiksa pada adegan yang diputar).
// Memeriksa: pemicu kata, suara tanpa digit, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas, teks bertumpuk, pemisahan materi dan metode luar (nama Indonesia saja),
// hanya bilangan sampai sepuluh dengan tanda tambah, kurang, dan sama dengan (tanpa kali, bagi, rumus, ukuran, atau bilangan lebih dari sepuluh), tiap kalimat tambah dan kurang di gambar benar,
// bentuk gabungan (dua keping dirapatkan pada sisi yang sama, hasilnya segitiga atau segi empat), kereta, rumah, roket, dan mobil dari keping (jenis dan banyak penyusun), lidi sama panjang,
// hitungan satu demi satu, kalimat hitungan yang tersusun potongan demi potongan mengikuti kata bilangan, memilah bentuk lengkung dan lurus, peta dan tabel susun, aturan aplikasi belajar mandiri (tanpa kelompok, teman, depan kelas, buku, menulis, menggambar, membawa benda, kertas, pensil),
// emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k1b4c.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k1b4c-video.ts");
const U1 = await import("../src/components/modul/story/k1b4c-luar-1.ts");
const G = await import("../src/components/modul/story/k1b4c-gambar.ts");

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
const VIDEO = [V.VIDEO_MATERI_K1B4C, V.VIDEO_LUAR_K1B4C];
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
const M_VIDEO = V.VIDEO_MATERI_K1B4C;
const U = V.VIDEO_LUAR_K1B4C;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const NAMA_LUAR = /Kenali Bentuk|Pilah Ciri|Bentuk di Sekitar|metode luar|metode dari luar/i;
const NAMA_INGGRIS = /van Hiele|Attribute Sort|Shape in Environment|Take Away|Counting Back|Counting On|Ten Frame|Part.Part.Whole/i;
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
// Kata terlarang (aturan pemilik: aplikasi belajar mandiri, interaktif, dan digital) pada suara, teks gambar, judul, sumber, peta, dan tabel.
const TERLARANG_PEMILIK = /kelompok|teman|kawan|depan kelas|berpasangan|berpasang-pasangan|bersama-sama dengan|buku|menulis di|tulis di|menulis|menggambar|gambar sendiri|bawa|kertas|pensil|spidol|krayon|gunting|warnai|ambil benda|angkat jari|buat ceritamu|bercerita di|ceritakan|ceritakan kepada|jelaskan kepada|bTikab/i;
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M_VIDEO);
  const luar = teksVideo(U);
  cek(!NAMA_LUAR.test(materi), "video materi tidak memuat nama metode luar");
  cek(!NAMA_INGGRIS.test(materi) && !NAMA_INGGRIS.test(luar), "tanpa nama metode berbahasa Inggris (van Hiele Visual, Attribute Sort, Shape in Environment)");
  for (const m of U1.NAMA_METODE) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE, ["Kenali Bentuk", "Pilah Ciri", "Bentuk di Sekitar"], "nama metode luar (bahasa Indonesia saja)");
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
      cek(!/Uji Kompetensi|Pengayaan|Ayo Berlatih|Ayo Berdiskusi|Ayo Berefleksi|Ayo Mengingat|Ayo Berkomunikasi|Ayo Berpikir|soal \d|Soal \d|Eksplorasi|Refleksi/.test(semua.join(" | ")), `${v.id}/${a.id}: latihan disajikan sebagai Latihan, tanpa istilah buku`);
    }
  }
  cek(M_VIDEO.subjudul === "Materi kurikulum" && U.subjudul === "Tiga metode luar", "subjudul video: Materi kurikulum dan Tiga metode luar");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 46), "video materi: label sumber berbentuk Materi: ... dan pendek");
  cek(U.adegan.every((a) => /Metode luar|Ringkasan/i.test(a.sumber) && a.sumber.length <= 46), "video metode luar: label sumber metode luar atau ringkasan, pendek");
  cek(M_VIDEO.id === "k1b4c-materi" && U.id === "k1b4c-luar", "id video k1b4c-materi dan k1b4c-luar");
  cek(U.judul.endsWith(": Metode dari Luar") && !/menurut/i.test(M_VIDEO.judul), "judul video: materi tanpa 'menurut', luar berakhir ': Metode dari Luar'");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,cerita-segitiga,dua-cara,bangun-baru,kereta-keping,urai-rumah,jenis-rumah,tambah-bagian,kurang-bagian,lidi-bentuk,lidi-rumah,susun-layar,pas-potongan,latihan-satu,latihan-dua,latihan-tiga,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-kenali,luar-kenali-terapan,luar-pilah,luar-pilah-terapan,luar-sekitar,luar-sekitar-terapan,luar-ringkas", "urutan adegan metode luar");
  cek(M_VIDEO.adegan[0].id === "sapaan" && U.adegan[0].id === "sapaan", "tiap video dibuka adegan sapaan");
  cek(M_VIDEO.adegan.filter((a) => /^latihan-/.test(a.id)).length === 3 && M_VIDEO.adegan[M_VIDEO.adegan.length - 1].id === "penutup", "video materi: Latihan 1 sampai 3 lalu penutup");
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-kenali", "luar-kenali-terapan", "luar-pilah", "luar-pilah-terapan", "luar-sekitar", "luar-sekitar-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(U.adegan[1].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  for (const kata of ["Latihan", "Igil", "Malosi", "Kira", "Upe", "Wei", "Halim", "segitiga", "segi empat", "lengkung", "menyusun", "mengurai", "kereta", "rumah", "lidi", "roket", "ditambah", "kurang", "sama dengan"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  // Hanya bilangan sampai sepuluh: tanpa banding, kali, bagi, atau bilangan lebih dari sepuluh.
  const BOCOR = /lebih (banyak|besar|sedikit|kecil)|bandingkan|membandingkan|\bbelas\b|\bpuluh\b|\bratus\b|\bribu\b|sebelas|dua belas|operasi|hasil bagi|dikali|\bkali\b|dibagi|\bbagi\b|rumus|\bluas\b|keliling|ukuran|sentimeter|\bcm\b|derajat|segi lima|segi enam|kubus|\bbalok\b|tabung|perempat|setengah/i;
  for (const v of [M_VIDEO, U]) {
    for (const a of v.adegan) cek(!BOCOR.test(teksAdegan(a)), `${v.id}/${a.id}: hanya bentuk dan tambah atau kurang sampai sepuluh, tanpa banding, kali, bagi, rumus, luas, keliling, ukuran, atau bilangan lebih dari sepuluh`);
    for (const a of v.adegan) for (const [i] of a.ketukan.entries()) for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) for (const b of bilanganDari(t)) cek(Number(b) <= 10, `${v.id}/${a.id}#${i + 1}: angka di gambar paling besar sepuluh ("${t}")`);
  }
  cek(totalKetukan >= 70, `total ketukan cukup dalam (${totalKetukan})`);
  for (const v of VIDEO) cek(v.adegan.every((a) => a.ketukan.length >= 3 && a.ketukan.length <= 14), `${v.id}: tiap adegan 3 sampai 14 ketukan`);
  // Durasi materi diputar 8 sampai 13 menit (dua kata per detik, sapaan termasuk).
  const kataMateri = kataVideo(M_VIDEO);
  cek(kataMateri / 120 >= 8 && kataMateri / 120 <= 13, `durasi materi diputar 8 sampai 13 menit (${(kataMateri / 120).toFixed(1)} menit)`);
  cek(kataVideo(U) / 120 >= 3, `durasi video luar paling sedikit 3 menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
}

/* ------------------------------ Bilangan yang diucapkan dengan kata tampak sebagai angka ------------------------------ */
const NAMA_ANGKA = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh"];
for (const v of VIDEO) {
  for (const a of v.adegan) {
    const terlihat = new Set();
    a.ketukan.forEach((kt, i) => {
      for (let p = 0; p < L.kataDari(kt.suara).length; p += 1) for (const o of L.keadaanStory(a, i, p)) if (o.t === "teks" && o.isi) for (const b of bilanganDari(o.isi)) terlihat.add(b);
      if (L.kataDari(kt.suara).some((w) => w.toLowerCase().replace(/[^a-z]/g, "") === "sepuluh")) cek(terlihat.has("10"), `${v.id}/${a.id}#${i + 1}: "sepuluh" tampak sebagai angka 10 di gambar`);
    });
  }
}

/* ------------------------------ Hitungan, bangun gabungan, lidi, dan pilahan ------------------------------ */
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
const kataSuara = (kt) => L.kataDari(kt.suara).map((w) => w.toLowerCase().replace(/[^a-z]/g, ""));
const W_EMAS = "#FFC800";
const stat = { tambah: 0, kurang: 0, rumus: 0, hitung: 0, gabung: 0, lidi: 0, pilah: 0, bentuk: 0 };
const dekat = (p, q) => Math.abs(p[0] - q[0]) < 0.01 && Math.abs(p[1] - q[1]) < 0.01;
const sisiPoligon = (pts) => pts.map((p, i) => [p, pts[(i + 1) % pts.length]]);
const punyaSisi = (pts, p, q) => sisiPoligon(pts).some(([a, b]) => (dekat(a, p) && dekat(b, q)) || (dekat(a, q) && dekat(b, p)));
const titikUnik = (...daftar) => {
  const out = [];
  for (const t of daftar.flat()) if (!out.some((u) => dekat(u, t))) out.push(t);
  return out;
};
const panjang2 = (a, b) => (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2;
const kotakBatas = (o) => {
  if (o.t === "kotak") return [o.x, o.y, o.x + o.w, o.y + o.h];
  if (o.t === "bulat") return [o.x - o.r, o.y - o.r, o.x + o.r, o.y + o.r];
  const t = titikJalur(o);
  return [Math.min(...t.map((p) => p[0])), Math.min(...t.map((p) => p[1])), Math.max(...t.map((p) => p[0])), Math.max(...t.map((p) => p[1]))];
};
const didalam = (o, kt) => {
  const b = kotakBatas(o);
  return b[0] >= kt.x && b[1] >= kt.y && b[2] <= kt.x + kt.w && b[3] <= kt.y + kt.h;
};
const urutPos = (w, daftar, setelah) => {
  let dari = setelah ? w.indexOf(setelah) + 1 : 0;
  return daftar.map((d) => {
    const p = w.indexOf(d, dari);
    dari = p + 1;
    return p;
  });
};
const ujung = (o) => [[o.x, o.y], [o.x + o.x2, o.y + o.y2]];
const susut = (t) => sisiPoligon(t).map(([p, q]) => panjang2(p, q)).sort((m, n) => m - n).join();
{
  // 1) Semua kalimat hitungan yang tampak benar (tiga suku boleh), paling besar sepuluh, tanpa kali dan bagi.
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((kt, i) => {
        for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) {
          for (const m of t.matchAll(/\d+(?:\s*[+−]\s*\d+)+\s*=\s*\d+/g)) {
            const bagian = m[0].split("=");
            const suku = bagian[0].match(/\d+|[+−]/g);
            let nilai = Number(suku[0]);
            let aman = nilai <= 10;
            for (let q = 1; q < suku.length; q += 2) {
              nilai = suku[q] === "+" ? nilai + Number(suku[q + 1]) : nilai - Number(suku[q + 1]);
              aman = aman && nilai >= 0 && nilai <= 10;
              stat[suku[q] === "+" ? "tambah" : "kurang"] += 1;
            }
            cek(aman && nilai === Number(bagian[1]), `${v.id}/${a.id}#${i + 1}: kalimat hitungan benar, tidak lebih dari sepuluh dan tidak di bawah nol ("${m[0]}")`);
          }
          cek(!/\d\s*[×÷*\/]\s*\d|\d\s*-\s*\d/.test(t), `${v.id}/${a.id}#${i + 1}: tanpa tanda kali, bagi, atau tanda hubung sebagai kurang ("${t}")`);
        }
      });
    }
  }
  // 2) Kalimat hitungan yang disusun potongan demi potongan: [video, adegan, ketukan (mulai 0), awalan id, potongan].
  const rumus = [
    [M_VIDEO, "jenis-rumah", 4, "ha", ["1", "+", "3", "=", "4"]],
    [M_VIDEO, "tambah-bagian", 1, "ia", ["5", "+", "1", "=", "6"]],
    [M_VIDEO, "tambah-bagian", 2, "ib", ["6", "+", "3", "=", "9"]],
    [M_VIDEO, "kurang-bagian", 2, "ja", ["9", "−", "3", "=", "6"]],
    [M_VIDEO, "kurang-bagian", 3, "jc", ["6", "+", "3", "=", "9"]],
    [M_VIDEO, "lidi-rumah", 4, "lr", ["4", "+", "2", "=", "6"]],
    [M_VIDEO, "latihan-dua", 1, "qa", ["3", "+", "3", "=", "?"]],
    [M_VIDEO, "latihan-dua", 4, "qb", ["8", "−", "3", "=", "5"]],
    [M_VIDEO, "latihan-tiga", 1, "rr", ["4", "+", "2", "=", "?"]],
    [U, "luar-kenali-terapan", 3, "me", ["2", "+", "2", "=", "4"]],
    [U, "luar-pilah", 4, "pr", ["2", "+", "3", "=", "5"]],
    [U, "luar-pilah-terapan", 3, "qr", ["6", "+", "3", "=", "9"]],
    [U, "luar-sekitar-terapan", 3, "tr", ["1", "+", "2", "+", "1", "=", "4"]],
  ];
  for (const [v, id, ke, p, token] of rumus) {
    const a = adegan(v, id);
    const o = akhirAdegan(a, ke);
    stat.rumus += 1;
    sama(token.map((_, i) => isiTeks(o, `${p}${i}`)), token, `${id}: kalimat ${token.join(" ")} tersusun`);
    if (!token.includes("?")) {
      const suku = token.slice(0, token.indexOf("="));
      let nilai = Number(suku[0]);
      for (let q = 1; q < suku.length; q += 2) nilai = suku[q] === "+" ? nilai + Number(suku[q + 1]) : nilai - Number(suku[q + 1]);
      cek(nilai === Number(token[token.length - 1]), `${id}: hitungan ${p} benar`);
    }
    const xs = token.map((_, i) => ketemu(o, `${p}${i}`).x);
    cek(xs.every((x, i) => i === 0 || x > xs[i - 1]), `${id}: potongan ${p} berderet kiri ke kanan`);
    const w = kataSuara(a.ketukan[ke]);
    const sebut = w.filter((q) => NAMA_ANGKA.includes(q));
    const angka = token.filter((t) => /^\d$/.test(t)).map(Number);
    let dari = 0;
    cek(angka.every((n) => { const q = sebut.indexOf(NAMA_ANGKA[n], dari); dari = q + 1; return q >= 0; }), `${id}: suara menyebut ${angka.join(" ")} berurutan (${sebut.join(" ")})`);
    cek(token.includes("+") ? w.includes("ditambah") || w.includes("tambah") : w.includes("kurang"), `${id}: suara menyebut kata tambah atau kurang`);
    const pos = token.map((_, i) => [...Array(w.length).keys()].find((q) => ketemu(L.keadaanStory(a, ke, q), `${p}${i}`)));
    cek(pos.every((q, i) => q !== undefined && (i === 0 || q > pos[i - 1])), `${id}: potongan ${p} muncul satu demi satu mengikuti ucapan`);
  }
  // Hasil yang masih "?" diganti angka jawaban pada ketukan berikutnya.
  sama(isiTeks(akhirAdegan(adegan(M_VIDEO, "latihan-dua"), 2), "qa4"), "6", "Latihan 2: jawaban enam");
  sama(isiTeks(akhirAdegan(adegan(M_VIDEO, "latihan-tiga"), 3), "rr4"), "6", "Latihan 3: jawaban enam");

  // 3) Hitung satu demi satu: penghitung berubah tepat saat kata bilangan diucapkan.
  const hitungan = [
    [M_VIDEO, "kereta-keping", 2, "cs", "segi empat", 5],
    [M_VIDEO, "kereta-keping", 3, "cg", "segitiga", 1],
    [M_VIDEO, "kereta-keping", 4, "cl", "lengkung", 3],
    [M_VIDEO, "jenis-rumah", 1, "hg", "segitiga", 1],
    [M_VIDEO, "jenis-rumah", 2, "hs", "segi empat", 3],
    [U, "luar-kenali-terapan", 1, "mc", "segi empat", 2],
    [U, "luar-kenali-terapan", 2, "md", "lengkung", 2],
    [U, "luar-sekitar-terapan", 2, "tc", "segi empat", 2],
  ];
  for (const [v, id, ke, cid, label, n] of hitungan) {
    const a = adegan(v, id);
    const w = kataSuara(a.ketukan[ke]);
    const urutan = [];
    for (let p = -1; p < w.length; p += 1) {
      const t = isiTeks(L.keadaanStory(a, ke, p), cid);
      if (t !== undefined && urutan[urutan.length - 1]?.t !== t) urutan.push({ t, p });
    }
    stat.hitung += 1;
    sama(urutan.map((x) => x.t), Array.from({ length: n }, (_, i) => `${label}: ${i + 1}`), `${id}: penghitung ${label} naik satu demi satu`);
    urutan.forEach((x, i) => {
      cek(w[x.p] === NAMA_ANGKA[i + 1], `${id}: penghitung ${label} ${i + 1} berubah saat kata ${NAMA_ANGKA[i + 1]} (kata: ${w[x.p]})`);
      cek(L.keadaanStory(a, ke, x.p).some((o) => o.sorot), `${id}: ada bagian yang menyala saat menghitung ${label} ${i + 1}`);
    });
  }
  // Jenis bentuk di gambar benda: [segi empat, segitiga, lengkung] dihitung dari jenis gambarnya (kotak, jalur tiga titik, bulat).
  const jenisBentuk = (objs, re) => {
    const s = objs.filter((o) => re.test(o.id));
    return [s.filter((o) => o.t === "kotak").length, s.filter((o) => o.t === "jalur" && titikJalur(o)?.length === 3).length, s.filter((o) => o.t === "bulat").length];
  };
  const BENDA = { Kereta: jenisBentuk(G.kereta(), /^kr\d$/), Rumah: jenisBentuk(G.rumah(false), /^rm\d$/), Roket: jenisBentuk(G.roket(), /^rk\d$/), Mobil: jenisBentuk(G.mobil(), /^mb\d$/) };
  sama(BENDA, { Kereta: [5, 1, 3], Rumah: [3, 1, 0], Roket: [1, 3, 1], Mobil: [2, 0, 2] }, "bentuk penyusun kereta, rumah, roket, mobil sesuai data");
  globalThis.BENDA_GAMBAR = BENDA;
  stat.bentuk += 4;
}

{
  // 4) Menyusun: dua keping digabung membentuk bangun baru (sisi yang dirapatkan sama, hasilnya benar).
  const a = adegan(M_VIDEO, "dua-cara");
  const D2 = akhirAdegan(a, 1);
  const ga = titikJalur(ketemu(D2, "ga"));
  const gb = titikJalur(ketemu(D2, "gb"));
  stat.gabung += 1;
  cek(punyaSisi(ga, [110, 70], [110, 130]) && punyaSisi(gb, [110, 70], [110, 130]), "dua cara: dua keping dirapatkan pada sisi yang tegak (sisi sama)");
  cek(susut(ga) === susut(gb), "dua cara: dua keping sama bentuk dan sama besar");
  const alas = titikUnik(ga, gb).filter((p) => p[1] === 130).map((p) => p[0]).sort((m, n) => m - n);
  cek(alas.length === 3 && titikUnik(ga, gb).length === 4 && (alas[0] + alas[2]) / 2 === 110, "dua cara: gabungan menjadi segitiga besar (alas tiga titik sebaris, puncak di tengah)");
  const D3 = akhirAdegan(a, 2);
  const gc = titikJalur(ketemu(D3, "gc"));
  const ga3 = titikJalur(ketemu(D3, "ga"));
  stat.gabung += 1;
  cek(punyaSisi(ga3, [110, 70], [150, 130]) && punyaSisi(gc, [110, 70], [150, 130]), "dua cara: dua keping dirapatkan pada sisi yang miring (sisi sama)");
  const sudut = titikUnik(ga3, gc);
  cek(sudut.length === 4 && [110, 150].every((x) => [70, 130].every((y) => sudut.some((p) => dekat(p, [x, y])))), "dua cara: gabungan pada sisi miring menjadi segi empat (empat sudut siku)");
  cek(susut(ga3) === susut(gc), "dua cara: kedua keping sama bentuk dan sama besar");
  cek(!ketemu(D3, "gb") && !ketemu(D3, "lb"), "dua cara: keping cara tegak dibereskan sebelum cara miring");
  // Bangun baru: dua persegi, potongan dan segitiga, empat persegi kecil.
  const b = adegan(M_VIDEO, "bangun-baru");
  const B1 = akhirAdegan(b, 0);
  const q1 = ketemu(B1, "q1");
  const q2 = ketemu(B1, "q2");
  stat.gabung += 1;
  cek(q1.x + q1.w === q2.x && q1.y === q2.y && q1.h === q2.h && q1.w === q2.w, "bangun baru: dua persegi sama dirapatkan menjadi persegi panjang");
  const B2 = akhirAdegan(b, 1);
  const e1 = titikJalur(ketemu(B2, "e1"));
  const e2 = titikJalur(ketemu(B2, "e2"));
  stat.gabung += 1;
  cek(e1.length === 4 && e2.length === 3 && punyaSisi(e1, [140, 60], [160, 120]) && punyaSisi(e2, [140, 60], [160, 120]), "bangun baru: potongan segi empat dan segitiga kecil berbagi sisi miring");
  const semua = titikUnik(e1, e2);
  cek(semua.every((p) => p[0] === 100 || p[0] === 160 || p[1] === 60 || p[1] === 120) && [[100, 60], [160, 60], [160, 120], [100, 120]].every((p) => semua.some((u) => dekat(u, p))), "bangun baru: gabungan menjadi segi empat utuh (persegi)");
  const B4 = akhirAdegan(b, 3);
  stat.gabung += 1;
  const sq = ["s1", "s2", "s3", "s4"].map((id) => ketemu(B4, id));
  cek(sq.every((o) => o.w === 30 && o.h === 30) && new Set(sq.map((o) => `${o.x},${o.y}`)).size === 4 && new Set(sq.map((o) => o.x)).size === 2 && new Set(sq.map((o) => o.y)).size === 2 && Math.abs(sq[0].x - sq[1].x) === 30 && Math.abs(sq[0].y - sq[2].y) === 30, "bangun baru: empat persegi kecil sama rapat menjadi persegi besar");
  // Rumah: utuh, terurai, dan utuh lagi; atap menempel di dinding, pintu berdiri di dasar dinding.
  const r = adegan(M_VIDEO, "urai-rumah");
  const R0 = akhirAdegan(r, 0);
  const R1 = akhirAdegan(r, 1);
  const R3 = akhirAdegan(r, 3);
  const rh = ["rm0", "rm1", "rm2", "rm3"];
  stat.gabung += 1;
  cek(rh.every((id) => ketemu(R0, id).x === ketemu(R3, id).x && ketemu(R0, id).y === ketemu(R3, id).y), "urai rumah: setelah disusun lagi, tiap bagian kembali ke tempat semula");
  cek(rh.every((id) => ketemu(R0, id).x !== ketemu(R1, id).x || ketemu(R0, id).y !== ketemu(R1, id).y), "urai rumah: tiap bagian berpindah saat diurai");
  const kb = rh.map((id) => kotakBatas(ketemu(R1, id)));
  cek(kb.every((p, i) => kb.every((q, j) => i === j || p[2] <= q[0] || q[2] <= p[0] || p[3] <= q[1] || q[3] <= p[1])), "urai rumah: bagian terurai tidak saling menimpa");
  const [at, dd, pt, jd] = rh.map((id) => kotakBatas(ketemu(R0, id)));
  cek(at[3] === dd[1] && pt[3] === dd[3] && jd[0] > dd[0] && jd[2] < dd[2] && pt[0] > dd[0] && pt[2] < dd[2], "rumah utuh: atap di atas dinding, pintu di dasar dinding, jendela di dalam dinding");
  // Roket: lima keping berserakan lalu tersusun; sirip dan hidung menempel pada badan.
  const ro = adegan(M_VIDEO, "susun-layar");
  const O0 = akhirAdegan(ro, 0);
  const O4 = akhirAdegan(ro, 4);
  stat.gabung += 1;
  const idRoket = ["rk0", "rk1", "rk2", "rk3", "rk4"];
  cek(idRoket.every((id) => ketemu(O0, id).x !== ketemu(O4, id).x || ketemu(O0, id).y !== ketemu(O4, id).y), "roket: lima keping berserakan lalu semuanya pindah ke tempatnya");
  const badan = kotakBatas(ketemu(O4, "rk0"));
  const hidung = titikJalur(ketemu(O4, "rk1"));
  const sirip = [titikJalur(ketemu(O4, "rk2")), titikJalur(ketemu(O4, "rk3"))];
  cek(hidung.length === 3 && hidung.some((p) => dekat(p, [badan[0], badan[1]])) && hidung.some((p) => dekat(p, [badan[2], badan[1]])), "roket: hidung segitiga menempel di atas badan");
  cek(sirip[0].filter((p) => p[0] === badan[0] && p[1] >= badan[1] && p[1] <= badan[3]).length === 2 && sirip[1].filter((p) => p[0] === badan[2] && p[1] >= badan[1] && p[1] <= badan[3]).length === 2, "roket: dua sirip segitiga menempel di sisi kiri dan kanan badan");
  const jr = ketemu(O4, "rk4");
  cek(jr.x > badan[0] && jr.x < badan[2] && jr.y > badan[1] && jr.y < badan[3], "roket: jendela lengkung di dalam badan");
  // Pas atau tidak: potongan pertama sama bentuk dan sama besar dengan lubang atap.
  const pa = adegan(M_VIDEO, "pas-potongan");
  const P1 = akhirAdegan(pa, 1);
  const P3 = akhirAdegan(pa, 3);
  stat.gabung += 1;
  const lebar = (o) => kotakBatas(o)[2] - kotakBatas(o)[0];
  cek(ketemu(P1, "ps").d === ketemu(P1, "pc0").d && ketemu(P1, "pc1").t === "jalur" && lebar(ketemu(P1, "pc1")) < lebar(ketemu(P1, "ps")) && ketemu(P1, "pc2").t === "kotak", "pas atau tidak: potongan pertama pas, kedua terlalu kecil, ketiga bentuknya salah");
  cek(ketemu(P3, "pc0").x === ketemu(P1, "ps").x && ketemu(P3, "pc0").y === ketemu(P1, "ps").y && (ketemu(P3, "pc1").op ?? 1) < 1 && (ketemu(P3, "pc2").op ?? 1) < 1 && !ketemu(P3, "ps"), "pas atau tidak: potongan pertama dipasang di lubang atap, yang lain memudar");
  // Latihan 1: dua segitiga dirapatkan pada sisi miring menjadi segi empat; jawaban segi empat dipilih.
  const l1 = adegan(M_VIDEO, "latihan-satu");
  const S2 = akhirAdegan(l1, 2);
  const sa = titikJalur(ketemu(S2, "sa"));
  const sc = titikJalur(ketemu(S2, "sc"));
  stat.gabung += 1;
  cek(punyaSisi(sa, [130, 46], [170, 96]) && punyaSisi(sc, [130, 46], [170, 96]) && titikUnik(sa, sc).length === 4, "Latihan 1: dua segitiga dirapatkan pada sisi miring menjadi segi empat");
  cek(ketemu(S2, "a1-k").warna === W_EMAS && isiTeks(S2, "a1-t0") === "segi empat" && ketemu(S2, "a0-k").warna !== W_EMAS && ketemu(S2, "a2-k").warna !== W_EMAS, "Latihan 1: hanya jawaban segi empat ditandai benar");
  const s1 = akhirAdegan(l1, 1);
  sama([isiTeks(s1, "a0-t0"), isiTeks(s1, "a1-t0"), isiTeks(s1, "a2-t0")], ["segitiga", "segi empat", "lengkung"], "Latihan 1: tiga pilihan jawaban");
  // Latihan 2: tiga segitiga dan tiga segi empat; delapan keping, tiga dilepas, tinggal lima.
  const l2 = adegan(M_VIDEO, "latihan-dua");
  const Q0 = akhirAdegan(l2, 0);
  sama([Q0.filter((o) => /^pt\d$/.test(o.id) && o.t === "jalur").length, Q0.filter((o) => /^ps\d$/.test(o.id) && o.t === "kotak").length], [3, 3], "Latihan 2: tiga keping segitiga dan tiga keping segi empat");
  const Q2 = akhirAdegan(l2, 2);
  cek(ketemu(Q2, "ca6-k").sorot === true && ["ca5-k", "ca7-k"].every((id) => !ketemu(Q2, id).sorot), "Latihan 2: jawaban enam dipilih dengan ketukan");
  const wq = kataSuara(l2.ketukan[3]);
  const pq = urutPos(wq, ["satu", "dua", "tiga"], "itu");
  stat.hitung += 1;
  sama(pq.map((q) => L.keadaanStory(l2, 3, q).filter((o) => /^pk\d$/.test(o.id) && (o.op ?? 1) < 1).length), [1, 2, 3], "Latihan 2: tiga dari delapan keping memudar satu demi satu");
  const pkAkhir = L.keadaanStory(l2, 3, 9999).filter((o) => /^pk\d$/.test(o.id));
  sama([pkAkhir.length, pkAkhir.filter((o) => (o.op ?? 1) === 1).length], [8, 5], "Latihan 2: delapan keping, lima tersisa");
  // Latihan 3: rumah dari enam lidi sama panjang, jawaban enam.
  const l3 = adegan(M_VIDEO, "latihan-tiga");
  const T0 = akhirAdegan(l3, 0);
  const T2 = akhirAdegan(l3, 2);
  const T3 = akhirAdegan(l3, 3);
  cek(ketemu(T2, "jr5-k") && ketemu(T2, "jr6-t").isi === "6" && ketemu(T2, "jr7-k") && ketemu(T2, "jr5-t").isi === "5" && ketemu(T2, "jr7-t").isi === "7", "Latihan 3: tiga kartu jawaban lima, enam, tujuh");
  cek(ketemu(T3, "jr6-k").warna === W_EMAS && ketemu(T3, "jr5-k").warna !== W_EMAS && ketemu(T3, "jr7-k").warna !== W_EMAS, "Latihan 3: hanya jawaban enam ditandai benar");
  const lidiDari = (objs, re) => objs.filter((o) => re.test(o.id) && o.t === "garis");
  const periksaRumahLidi = (objs, re, nama) => {
    const l = lidiDari(objs, re);
    stat.lidi += 1;
    cek(l.length === 6, `${nama}: enam lidi`);
    cek(l.every((o) => Math.abs(Math.sqrt(panjang2(...ujung(o))) - 60) < 1), `${nama}: semua lidi sama panjang`);
    const titik = titikUnik(...l.map(ujung));
    const derajat = titik.map((t) => l.filter((o) => ujung(o).some((u) => dekat(u, t))).length);
    cek(titik.length === 5 && derajat.slice().sort().join() === "2,2,2,3,3", `${nama}: dinding segi empat dan atap segitiga tersambung (lima titik, dua titik bertemu tiga lidi)`);
  };
  periksaRumahLidi(T0, /^rl\d$/, "Latihan 3");
  // Lidi: segitiga tiga lidi, segi empat empat lidi, rumah enam lidi; meletakkan lidi satu demi satu.
  const lb = adegan(M_VIDEO, "lidi-bentuk");
  const periksaBentukLidi = (objs, re, n, nama) => {
    const l = lidiDari(objs, re);
    stat.lidi += 1;
    cek(l.length === n && l.every((o) => !o.putus), `${nama}: ${n} lidi sudah diletakkan`);
    cek(l.every((o) => Math.abs(Math.sqrt(panjang2(...ujung(o))) - 60) < 1), `${nama}: semua lidi sama panjang`);
    const titik = titikUnik(...l.map(ujung));
    cek(titik.length === n && titik.every((t) => l.filter((o) => ujung(o).some((u) => dekat(u, t))).length === 2), `${nama}: lidi membentuk bangun tertutup dengan ${n} sudut`);
  };
  periksaBentukLidi(akhirAdegan(lb, 1), /^kt\d$/, 3, "segitiga dari lidi");
  periksaBentukLidi(akhirAdegan(lb, 2), /^ks\d$/, 4, "segi empat dari lidi");
  const lr = adegan(M_VIDEO, "lidi-rumah");
  periksaRumahLidi(akhirAdegan(lr, 4), /^ld\d$/, "rumah dari lidi");
  // [adegan, ketukan, id lidi, nomor awal, banyak, kata penanda]
  const bertahap = [
    [lb, 1, /^kt\d$/, 3, "meletakkan"],
    [lb, 2, /^ks\d$/, 4, "meletakkan"],
    [lr, 1, /^ld[0-3]$/, 4, "dindingnya"],
    [lr, 2, /^ld[45]$/, 2, "tempat"],
  ];
  for (const [ad, ke, re, n, penanda] of bertahap) {
    const w = kataSuara(ad.ketukan[ke]);
    const pos = urutPos(w, NAMA_ANGKA.slice(1, n + 1), penanda);
    stat.hitung += 1;
    sama(pos.map((q) => L.keadaanStory(ad, ke, q).filter((o) => re.test(o.id) && o.t === "garis" && !o.putus).length), Array.from({ length: n }, (_, i) => i + 1), `${ad.id}#${ke + 1}: lidi diletakkan satu demi satu mengikuti ucapan`);
  }
  // 5) Memilah: bentuk lengkung masuk kotak sisi lengkung, bentuk bersisi lurus masuk kotak sisi lurus.
  const KIRI = { x: 10, y: 56, w: 135, h: 100 };
  const KANAN = { x: 155, y: 56, w: 135, h: 100 };
  const pl = adegan(U, "luar-pilah");
  const PL1 = akhirAdegan(pl, 1);
  const PL4 = akhirAdegan(pl, 4);
  stat.pilah += 1;
  const kepingPl = ["pa", "pb", "pc", "pd", "pe"].map((id) => ketemu(PL4, id));
  cek(kepingPl.filter((o) => o.t === "bulat").length === 2 && kepingPl.filter((o) => o.t !== "bulat").length === 3, "Pilah Ciri: dua keping lengkung dan tiga keping bersisi lurus");
  cek(kepingPl.every((o) => (o.t === "bulat" ? didalam(o, KIRI) && !didalam(o, KANAN) : didalam(o, KANAN) && !didalam(o, KIRI))), "Pilah Ciri: lengkung di kotak kiri, bersisi lurus di kotak kanan");
  cek(["pa", "pb", "pc", "pd", "pe"].every((id) => !didalam(ketemu(PL1, id), KIRI) && !didalam(ketemu(PL1, id), KANAN)), "Pilah Ciri: lima keping mula-mula di luar kedua kotak");
  const pt2 = adegan(U, "luar-pilah-terapan");
  const wq3 = kataSuara(pt2.ketukan[1]);
  const lengkungDalam = (ad, ke, p) => L.keadaanStory(ad, ke, p).filter((o) => /^kp\d$/.test(o.id) && o.t === "bulat" && didalam(o, KIRI)).length;
  const lurusDalam = (ad, ke, p) => L.keadaanStory(ad, ke, p).filter((o) => /^kp\d$/.test(o.id) && o.t !== "bulat" && didalam(o, KANAN)).length;
  stat.pilah += 1;
  sama(urutPos(wq3, ["satu", "dua", "tiga"], "keping").map((p) => lengkungDalam(pt2, 1, p)), [1, 2, 3], "Pilah Ciri terapan: tiga keping lengkung masuk kotak satu demi satu");
  const wq4 = kataSuara(pt2.ketukan[2]);
  sama(urutPos(wq4, NAMA_ANGKA.slice(1, 7), "pindahkan").map((p) => lurusDalam(pt2, 2, p)), [1, 2, 3, 4, 5, 6], "Pilah Ciri terapan: enam keping lurus masuk kotak satu demi satu");
  const PT = akhirAdegan(pt2, 2).filter((o) => /^kp\d$/.test(o.id));
  sama([PT.filter((o) => o.t === "bulat").length, PT.filter((o) => o.t === "kotak").length, PT.filter((o) => o.t === "jalur").length], [3, 5, 1], "Pilah Ciri terapan: tiga lengkung, lima segi empat, satu segitiga");
  cek(PT.every((o) => didalam(o, o.t === "bulat" ? KIRI : KANAN)), "Pilah Ciri terapan: semua sembilan keping sudah di kotak yang cocok");
  // 6) Kenali Bentuk dan Bentuk di Sekitar: bentuk dan label cocok.
  const kn = akhirAdegan(adegan(U, "luar-kenali"), 3);
  stat.bentuk += 1;
  cek(ketemu(kn, "ow").t === "bulat" && titikJalur(ketemu(kn, "os")).length === 3 && ketemu(kn, "oe").t === "kotak" && isiTeks(kn, "ss") === "3 sisi, 3 sudut" && isiTeks(kn, "se") === "4 sisi, 4 sudut" && isiTeks(kn, "sw") === "tanpa sudut", "Kenali Bentuk: lengkung bulat tanpa sudut, segitiga tiga sisi, segi empat empat sisi");
  const sk = akhirAdegan(adegan(U, "luar-sekitar"), 1);
  cek(ketemu(sk, "oj").t === "bulat" && isiTeks(sk, "sj") === "lengkung" && ketemu(sk, "op").t === "kotak" && isiTeks(sk, "sp") === "segi empat" && isiTeks(sk, "sz") === "segitiga", "Bentuk di Sekitar: jam lengkung, pintu segi empat, pizza segitiga");
  const sk3 = akhirAdegan(adegan(U, "luar-sekitar"), 2);
  const sk4 = akhirAdegan(adegan(U, "luar-sekitar"), 3);
  cek(ketemu(sk3, "oj").sorot === true && ketemu(sk4, "oz").sorot === true && !ketemu(sk4, "oj").sorot, "Bentuk di Sekitar: benda lengkung lalu benda segitiga diketuk");
  const tm = akhirAdegan(adegan(U, "luar-sekitar-terapan"), 1);
  cek(titikJalur(ketemu(tm, "tn0")).length === 3 && isiTeks(tm, "s0") === "segitiga" && ketemu(tm, "mt0").t === "bulat" && isiTeks(tm, "s1") === "lengkung" && ketemu(tm, "pn0").t === "kotak" && isiTeks(tm, "s2") === "segi empat", "taman: tenda segitiga, matahari lengkung, papan nama segi empat");
  // 7) Metode luar: nama (bahasa Indonesia) tampil pada kepala tiap adegan konsep dan terapan.
  for (const [id, i] of [["luar-kenali", 0], ["luar-kenali-terapan", 0], ["luar-pilah", 1], ["luar-pilah-terapan", 1], ["luar-sekitar", 2], ["luar-sekitar-terapan", 2]]) {
    const semuaT = adegan(U, id).ketukan.flatMap((kt, q) => L.teksTerlihat(L.keadaanStory(adegan(U, id), q, 9999)));
    cek(semuaT.includes(U1.NAMA_METODE[i]), `${id}: kepala memuat ${U1.NAMA_METODE[i]}`);
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
  const DAFTAR = ["Menyusun bentuk", "Mengurai bangun", "Menghitung penyusunnya"];
  cek(/Halo anak-anak/.test(sap.ketukan[0].suara) && /Menyusun bentuk/i.test(L.teksTerlihat(akhirAdegan(sap, 1)).join(" | ")), "sapaan materi: tiga hal yang dipelajari tampil");
  sama(L.teksTerlihat(akhirAdegan(sap, 1)).filter((t) => DAFTAR.includes(t)), DAFTAR, "sapaan materi: daftar tiga hal");
  cek(!/\d/.test(sap.ketukan[1].suara), "sapaan materi: tanpa angka");
  cek(adegan(U, "sapaan").sumber.startsWith("Metode luar") && sap.sumber.startsWith("Materi"), "sapaan: dua jenis (materi dan metode luar)");
  // Data peta dan tabel: dibaca dari berkas ringkas bila sudah digabung koordinator, bila belum dari berkas sementara .tmp-k1b4s/C.json.
  let A = null;
  try {
    A = JSON.parse(readFileSync(new URL("../src/data/kelas1-bab4-ringkas.json", import.meta.url), "utf8")).subBab.C;
  } catch {}
  if (!A || !A.petaSusun) {
    try {
      A = JSON.parse(readFileSync(new URL("../.tmp-k1b4s/C.json", import.meta.url), "utf8"));
    } catch {}
  }
  cek(!!(A && A.petaSusun && A.tabelSusun), "peta dan tabel susun: data ada (kelas1-bab4-ringkas.json subBab.C atau .tmp-k1b4s/C.json)");
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
    cek(!/halaman|kunci|van Hiele|Attribute Sort|Shape in Environment/i.test(JSON.stringify({ p: A.petaSusun, t: A.tabelSusun })), "peta dan tabel susun: tanpa kata halaman, kunci, atau nama metode berbahasa Inggris");
    cek(!/\bbelas\b|\bpuluh\b|\bratus\b|\bribu\b|dikali|dibagi|rumus|\bluas\b|keliling|ukuran/i.test(JSON.stringify({ p: A.petaSusun, t: A.tabelSusun })), "peta dan tabel susun: hanya bentuk dan bilangan sampai sepuluh");
    cek(A.petaSusun.pusat.judul.length <= 28, "peta susun: judul pusat <= 28 huruf (masalah sub-bab)");
    cek(/\?$/.test(A.petaSusun.pusat.judul), "peta susun: pusat berupa pertanyaan masalah sub-bab");
    const T = A.tabelSusun;
    cek(T.baris.length >= 3 && T.baris.length <= 5 && T.kolom.length >= 3 && T.kolom.length <= 4, "tabel susun: 3 sampai 5 baris dan 3 sampai 4 kolom");
    cek(T.baris.every((b) => b.sel.every((s) => s.length <= 26 && (s.match(/\d+/g) ?? []).length <= 1)), "tabel susun: sel <= 26 huruf dan paling banyak satu angka per sel");
    cek(T.baris.every((b) => b.label.split(/\s+/).every((w) => w.length <= 8)), "tabel susun: kata terlama kolom label <= 8 huruf");
    cek(!/\d/.test(T.suara) && !/\d/.test(T.petunjuk), "tabel susun: suara dan petunjuk tanpa digit");
    sama(T.kolom, ["Segi empat", "Segitiga", "Lengkung"], "tabel susun: kolom jenis bentuk");
    // Isi tabel sama dengan gambar benda di video (kotak, segitiga, bulat pada kereta, rumah, roket, mobil).
    for (const b of T.baris) {
      const dari = globalThis.BENDA_GAMBAR?.[b.label];
      cek(!!dari && dari.map(String).join() === b.sel.join(), `tabel susun: baris ${b.label} sesuai bentuk penyusun benda di gambar (${b.sel.join(",")} / ${dari})`);
    }
    cek(T.baris.every((b) => b.sel.every((s) => /^\d$/.test(s)) && b.sel.map(Number).reduce((m, n) => m + n, 0) <= 10), "tabel susun: tiap sel satu angka dan jumlah penyusun satu benda paling banyak sepuluh");
    // Margin teks sel >= 5 px di lebar 405 px: sel satu angka (lebar teks jauh di bawah lebar sel), label terpanjang dipakai sebagai batas.
    cek(T.baris.every((b) => b.sel.every((s) => s.length <= 2)) && Math.max(...T.baris.map((b) => b.label.length)) <= 8, "tabel susun: sel pendek supaya margin teks >= 5 px di lebar 405 px");
  }
}


/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k1b4c-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k1b4c-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k1b4c sendiri (${impor.join(", ")})`);
  }
  // Emoji dalam data teks gambar juga paling tinggi Emoji 12 (diperiksa pada gambar yang diputar).
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d), `${v.id}/${a.id}: emoji gambar paling tinggi Emoji 12`);
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k1b4c.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|naskah-k1b1/.test(pembungkus) && /VIDEO_MATERI_K1B4C/.test(pembungkus) && /VIDEO_LUAR_K1B4C/.test(pembungkus) && /export function VideoK1B4C/.test(pembungkus) && /daftar-video-cerita/.test(pembungkus), "video-k1b4c.tsx: dua video dari mesin Story, tanpa naskah lama");
  cek(!/\r/.test(pembungkus), "video-k1b4c.tsx: akhir baris LF");
  const sendiri = readFileSync(new URL("uji-story-k1b4c.mjs", import.meta.url), "utf8");
  cek(!/\r/.test(sendiri), "uji-story-k1b4c.mjs: akhir baris LF");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit diputar)`);
}
console.log(`Pemeriksaan: ${stat.tambah} langkah tambah, ${stat.kurang} langkah kurang, ${stat.rumus} kalimat hitungan tersusun, ${stat.hitung} hitungan satu demi satu, ${stat.gabung} gabungan bentuk, ${stat.lidi} susunan lidi, ${stat.pilah} pilahan, ${stat.bentuk} daftar bentuk benda`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
