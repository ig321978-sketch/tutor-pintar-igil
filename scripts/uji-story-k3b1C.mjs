// Uji Story Kelas 3 Bab 1 Sub-Bab C (Membandingkan dan Mengurutkan Bilangan Cacah sampai 1.000): dua video (materi kurikulum dan metode luar) dengan mesin animasi Story.
// Video diputar bergaya guru: suara, teks terlihat, sumber, judul adegan, dan subjudul tanpa penyebutan buku (kata terlarang diperiksa pada adegan yang diputar).
// Memeriksa: pemicu kata, suara tanpa digit (bilangan dieja), perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas, teks bertumpuk, pemisahan materi dan metode luar (nama metode hanya Indonesia),
// dan HITUNG ULANG dari struktur adegan: angka tiap tempat pada papan nilai tempat (label = 100 x ratusan + 10 x puluhan + satuan), tanda < > = dari bilangan di papan, perbandingan tertulis,
// ejaan bilangan di suara = nilai bilangan yang tampak, kalimat "kurang dari", "lebih dari", "sama dengan" (bilangan dan angka tempat), tempat yang sama pada dua bilangan, urutan naik dan turun pada kartu bilangan,
// letak titik pada garis bilangan sebanding dengan nilainya, bilangan milik tiap tokoh, jawaban latihan (satu pilihan benar dan disorot), dan isi tabel susun.
// Jalankan: node --no-warnings scripts/uji-story-k3b1C.mjs
import { readFileSync, existsSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k3b1C-video.ts");
const U1 = await import("../src/components/modul/story/k3b1C-luar-1.ts");

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
const VIDEO = [V.VIDEO_MATERI_K3B1C, V.VIDEO_LUAR_K3B1C];
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
const M_VIDEO = V.VIDEO_MATERI_K3B1C;
const U = V.VIDEO_LUAR_K3B1C;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const NAMA_LUAR = /Banding per Tempat|Garis Bilangan Ratusan|metode luar|metode dari luar|Mengurutkan(?! bilangan)/i;
const NAMA_INGGRIS = /Compare Placewise|Number Line|Ordering|Dienes|Place[- ]Value|Number Names|Montessori|Expanded Form|Standard Addition|Number Bond|Counting On|Counting Up|Regrouping|Equal Groups|Fair Share|Fact Family|Singapore Math|Van de Walle|Number sense/i;
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M_VIDEO);
  const luar = teksVideo(U);
  cek(!NAMA_LUAR.test(materi), "video materi tidak memuat nama metode luar ");
  for (const m of U1.NAMA_METODE_ID) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE_ID, ["Banding per Tempat", "Garis Bilangan Ratusan", "Mengurutkan"], "nama Indonesia metode luar (namaId data)");
  cek(!NAMA_INGGRIS.test(materi) && !NAMA_INGGRIS.test(luar), "nama metode hanya bahasa Indonesia (tanpa Compare Placewise, Number Line, Ordering)");
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
      cek(!/Uji Kompetensi|Pengayaan|Ayo Berlatih|Ayo Berdiskusi|Ayo Berefleksi|Ayo Mengingat|Ayo Berkomunikasi|Ayo Berpikir|Ayo Berkarya|Ayo Bermain|Ayo Mencoba|soal \d|Soal \d|Eksplorasi|Refleksi/.test(semua.join(" | ")), `${v.id}/${a.id}: latihan disajikan sebagai Latihan, tanpa istilah buku`);
      // Tokoh hanya enam tokoh tetap (Malosi, Kira, Upe, Wei, Halim, Igil): tanpa nama lain dari data sumber.
      cek(!/\b(Tika|Lili|Paman|Ibu|Ayah|Bapak|Budi|Ani|Doni|Sinta|Dewi|Rudi|Nina|Andi|Siti|Bu Guru|Pak Guru|Pak|Ahmad)\b/.test(semua.join(" | ")), `${v.id}/${a.id}: hanya enam tokoh tetap`);
      cek(semua.every((t) => ![...t].some((c) => c.codePointAt(0) > 0x1fa95)), `${v.id}/${a.id}: emoji paling tinggi Emoji 12`);
    }
  }
  cek(M_VIDEO.subjudul === "Materi kurikulum" && U.subjudul === "Tiga metode luar", "subjudul video: Materi kurikulum dan Tiga metode luar");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 46), "video materi: label sumber berbentuk Materi: ... dan pendek");
  cek(U.adegan.every((a) => /Metode luar|Ringkasan/i.test(a.sumber) && a.sumber.length <= 46), "video metode luar: label sumber metode luar atau ringkasan, pendek");
  cek(M_VIDEO.id === "k3b1C-materi" && U.id === "k3b1C-luar", "id video k3b1C-materi dan k3b1C-luar");
  cek(U.judul.endsWith(": Metode dari Luar") && !/menurut/i.test(M_VIDEO.judul), "judul video: materi tanpa 'menurut', luar berakhir ': Metode dari Luar'");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,cerita-jarak,papan-nilai,banding-ratusan,tiga-tanda,banding-puluhan,banding-satuan,sama-dengan,tiga-langkah,banding-nol,tiga-bilangan,urut-tiga,urut-turun,latihan-satu,latihan-dua,latihan-tiga,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-banding,luar-banding-terapan,luar-garis,luar-garis-terapan,luar-urut,luar-urut-terapan,luar-ringkas", "urutan adegan metode luar");
  cek(M_VIDEO.adegan[0].id === "sapaan" && U.adegan[0].id === "sapaan", "tiap video dibuka adegan sapaan");
  cek(M_VIDEO.adegan.filter((a) => /^latihan-/.test(a.id)).length === 3 && M_VIDEO.adegan[M_VIDEO.adegan.length - 1].id === "penutup", "video materi: Latihan 1 sampai 3 lalu penutup");
  cek(U.adegan[1].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  cek(U.adegan.length - 3 === 6, "video metode luar: konsep dan penerapan untuk tiga metode (6 adegan di antara pembuka dan ringkasan)");
  for (const kata of ["Latihan", "Igil", "Halim", "Kira", "Wei", "Upe", "Malosi", "ratusan", "puluhan", "satuan", "papan nilai tempat", "kurang dari", "lebih dari", "sama dengan", "urutan naik", "urutan turun", "terkecil", "terbesar", "mulut", "buaya", "bintang", "kelereng", "meter", "tiga langkah", "nol"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  // Batas bab: bilangan cacah sampai seribu, tanpa operasi hitung, satuan baku selain meter, dan rumus.
  const BOCOR = /kilogram|gram|kg|dikali|perkalian|pembagian|rumus|ribu|×|÷|−|liter|pecahan|ditambah|dikurangi/i;
  for (const v of [M_VIDEO, U]) {
    for (const a of v.adegan) cek(!BOCOR.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa satuan baku, rumus, operasi hitung`);
    for (const a of v.adegan) for (const i of a.ketukan.keys()) for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) for (const b of bilanganDari(t)) cek(Number(b) <= 1000, `${v.id}/${a.id}#${i + 1}: angka di gambar paling besar seribu ("${t}")`);
  }
  const ketMateri = M_VIDEO.adegan.reduce((t, ad) => t + ad.ketukan.length, 0);
  cek(totalKetukan >= 70 && ketMateri >= 70, `total ketukan cukup dalam (${totalKetukan}; materi ${ketMateri})`);
  const kataMateri = kataVideo(M_VIDEO);
  cek(kataMateri / 120 >= 8 && kataMateri / 120 <= 13, `durasi materi diputar 8 sampai 13 menit (${(kataMateri / 120).toFixed(1)} menit)`);
  cek(kataVideo(U) / 120 >= 3, `durasi video luar paling sedikit 3 menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
}

/* ------------------------------ Papan, kartu, garis bilangan, dan kalimat dihitung ulang dari struktur adegan ------------------------------ */
const G = await import("../src/components/modul/story/k3b1C-gambar.ts");
const stat = { papan: 0, tanda: 0, banding: 0, kartu: 0, urut: 0, gb: 0, nb: 0, klaim: 0, cp: 0, pilihan: 0, jawaban: 0, tabel: 0 };
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const U9 = "satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan";
const NILAI9 = { nol: 0, satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8, sembilan: 9 };
const D9 = `nol|${U9}`;
const TENS = `sepuluh|sebelas|(?:${U9}) belas|(?:${U9}) puluh`;
const NP = `(?:seratus|(?:${U9}) ratus)(?: (?:${TENS}))?(?: (?:${U9}))?(?![a-z])`;
const NAMA = "malosi|kira|upe|wei|halim|igil";
const TEMPAT = ["ratusan", "puluhan", "satuan"];
/** Nilai bilangan dari ejaan, mis. "tujuh ratus lima puluh sembilan" = 759. */
const nilaiNP = (s) => {
  const w = s.toLowerCase().trim().split(/\s+/);
  let v = 0;
  let i = 0;
  if (w[i] === "seratus") {
    v = 100;
    i += 1;
  } else {
    v = 100 * NILAI9[w[i]];
    i += 2;
  }
  if (w[i] === "sepuluh") {
    v += 10;
    i += 1;
  } else if (w[i] === "sebelas") {
    v += 11;
    i += 1;
  } else if (w[i + 1] === "belas") {
    v += 10 + NILAI9[w[i]];
    i += 2;
  } else if (w[i + 1] === "puluh") {
    v += 10 * NILAI9[w[i]];
    i += 2;
  }
  if (i < w.length) v += NILAI9[w[i]];
  return v;
};
/** Ejaan bilangan 1 sampai 999 dari angka (untuk menguji nilaiNP dan kata dari digit). */
const eja = (n) => {
  const S = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];
  const r = Math.floor(n / 100);
  const p = Math.floor(n / 10) % 10;
  const s = n % 10;
  const out = [];
  if (r === 1) out.push("seratus");
  else if (r > 1) out.push(`${S[r]} ratus`);
  if (p === 1) out.push(s === 0 ? "sepuluh" : s === 1 ? "sebelas" : `${S[s]} belas`);
  else {
    if (p > 1) out.push(`${S[p]} puluh`);
    if (s > 0) out.push(S[s]);
  }
  return out.join(" ");
};
for (const n of [339, 421, 583, 529, 769, 761, 804, 138, 103, 183, 720, 639, 709, 415, 912, 921, 291, 475, 507, 570, 480, 840, 352, 325, 523, 407, 470, 468, 647, 645]) cek(nilaiNP(eja(n)) === n, `pengeja bilangan: ${n} = ${eja(n)}`);
sama([eja(804), eja(103), eja(415), eja(912)], ["delapan ratus empat", "seratus tiga", "empat ratus lima belas", "sembilan ratus dua belas"], "ejaan contoh (nol penjaga tempat tidak dibaca)");
const angkaDari = (isi) => {
  const m = /^\s*(\d+)/.exec(isi ?? "");
  return m ? Number(m[1]) : NaN;
};
const angkaTempat = G.angkaTempat;
const rel = (p, q) => (p < q ? "kurang dari" : p > q ? "lebih dari" : "sama dengan");
const tandaDari = (p, q) => (p < q ? "<" : p > q ? ">" : "=");
const urutNaik = (arr) => arr.every((v, i) => i === 0 || arr[i - 1] < v);
const urutTurun = (arr) => arr.every((v, i) => i === 0 || arr[i - 1] > v);
const gabungKoma = (arr) => arr.join(", ");

/** Papan nilai tempat a dan b dari benda-benda. */
const bacaPapan = (objs) => {
  const out = {};
  for (const s of ["a", "b"]) {
    const d = [0, 1, 2].map((i) => ketemu(objs, `pv-${s}-d${i}`));
    const c = [0, 1, 2].map((i) => ketemu(objs, `pv-${s}-c${i}`));
    const h = [0, 1, 2].map((i) => ketemu(objs, `pv-${s}-h${i}`));
    const n = ketemu(objs, `pv-${s}-n`);
    if (d.some(Boolean) || c.some(Boolean) || h.some(Boolean) || n) out[s] = { d, c, h, n, angka: d.every(Boolean) ? Number(d.map((o) => o.isi).join("")) : null, label: n ? Number(n.isi) : null };
  }
  return out;
};
const nilaiTempat = (n) => {
  const [r, p, s] = [Math.floor(n / 100), Math.floor(n / 10) % 10, n % 10];
  return [n, 100 * r, 10 * p, s, r, p, s];
};
/** Kartu bilangan bk dari benda-benda, terurut dari kiri ke kanan. */
const bacaKartu = (objs) => {
  const ids = [...new Set(objs.map((o) => /^bk(\d+)-[kt]$/.exec(o.id)?.[1]).filter((q) => q !== undefined))];
  return ids.map((i) => ({ i: Number(i), k: ketemu(objs, `bk${i}-k`), t: ketemu(objs, `bk${i}-t`) })).sort((p, q) => (p.k?.x ?? 0) - (q.k?.x ?? 0));
};
/** Garis bilangan: tanda, titik, dan angkanya. */
const bacaGb = (objs) => {
  const g = ketemu(objs, "gb-g");
  const tanda = [];
  const titik = [];
  for (const o of objs) {
    let m;
    if ((m = /^gb-t(\d+)$/.exec(o.id))) tanda.push({ v: Number(m[1]), o, l: ketemu(objs, `gb-l${m[1]}`) });
    else if ((m = /^gb-m(\d+)$/.exec(o.id))) titik.push({ v: Number(m[1]), o, n: ketemu(objs, `gb-n${m[1]}`) });
  }
  return { g, tanda: tanda.sort((p, q) => p.v - q.v), titik: titik.sort((p, q) => p.v - q.v) };
};
const nbDari = (objs) => objs.filter((o) => /^nb-[a-z]+$/.test(o.id)).map((o) => ({ slug: o.id.slice(3), n: angkaDari(o.isi), x: o.x, o }));

const bilanganTerlihatSemua = new Set();
const papanMateri = [];
for (const v of VIDEO) {
  for (const a of v.adegan) {
    const terlihatNilai = new Set();
    a.ketukan.forEach((kt, i) => {
      const objs = akhirAdegan(a, i);
      const akhirAd = i === a.ketukan.length - 1;
      const nm = `${v.id}/${a.id}#${i + 1}`;
      const t = kt.suara.toLowerCase();
      const pp = bacaPapan(objs);
      const kartuB = bacaKartu(objs);
      const gb = bacaGb(objs);
      const nbs = nbDari(objs);
      const lengkapA = pp.a?.angka != null ? pp.a.angka : null;
      const lengkapB = pp.b?.angka != null ? pp.b.angka : null;
      const arahObj = ketemu(objs, "or-arah");
      const tandaObj = ketemu(objs, "tanda");

      /* nilai yang tampak (kumulatif per adegan, termasuk di tengah kalimat) */
      for (let p = 0; p < L.kataDari(kt.suara).length; p += 1) {
        const ob = L.keadaanStory(a, i, p);
        for (const o of ob) {
          if (o.t === "teks" && o.isi) for (const b of o.isi.match(/\d+/g) ?? []) terlihatNilai.add(Number(b));
        }
        const pq = bacaPapan(ob);
        for (const s of ["a", "b"]) if (pq[s]?.angka != null) terlihatNilai.add(pq[s].angka);
      }
      for (const o of objs) if (o.t === "teks" && o.isi) for (const b of o.isi.match(/\d+/g) ?? []) bilanganTerlihatSemua.add(Number(b));

      /* 1) Papan nilai tempat: angka per tempat, label, warna, letak, dan tanda perbandingan. */
      for (const [s, b] of Object.entries(pp)) {
        stat.papan += 1;
        cek(b.d.every((o) => !o || /^\d$/.test(o.isi)), `${nm}: papan ${s}: tiap tempat berisi satu angka`);
        if (b.angka != null && b.label != null) cek(b.angka === b.label, `${nm}: papan ${s}: label bilangan (${b.label}) sama dengan angka tempat (${b.angka})`);
        if (b.angka != null) cek(b.angka >= 100 && b.angka <= 999, `${nm}: papan ${s}: bilangan tiga angka (${b.angka})`);
        b.h.forEach((o, q) => o && cek(o.isi === TEMPAT[q], `${nm}: papan ${s}: judul tempat ${q} adalah ${TEMPAT[q]}`));
        b.c.forEach((o, q) => o && cek(o.warna === G.WARNA_TEMPAT[q], `${nm}: papan ${s}: warna tempat ${TEMPAT[q]}`));
        if (b.c.every(Boolean)) cek(b.c[0].x < b.c[1].x && b.c[1].x < b.c[2].x && b.c[0].y === b.c[1].y && b.c[1].y === b.c[2].y, `${nm}: papan ${s}: ratusan, puluhan, satuan berurutan dari kiri ke kanan`);
        b.d.forEach((o, q) => {
          if (o && b.c[q]) cek(Math.abs(o.x - (b.c[q].x + b.c[q].w / 2)) < 0.5 && o.y > b.c[q].y && o.y < b.c[q].y + b.c[q].h + 4, `${nm}: papan ${s}: angka ${q} di dalam kotak tempatnya`);
        });
        if (b.n && b.c.every(Boolean)) cek(Math.abs(b.n.x - (b.c[0].x + (b.c[2].x + b.c[2].w - b.c[0].x) / 2)) < 0.5, `${nm}: papan ${s}: label di tengah papan`);
      }
      if (pp.a && pp.b) cek(pp.a.c[0] && pp.b.c[0] ? pp.a.c[0].x < pp.b.c[0].x : true, `${nm}: papan a di kiri papan b`);
      if (tandaObj) {
        stat.tanda += 1;
        cek(lengkapA != null && lengkapB != null, `${nm}: tanda perbandingan hanya muncul bersama dua papan lengkap`);
        if (lengkapA != null && lengkapB != null) cek(tandaObj.isi === tandaDari(lengkapA, lengkapB), `${nm}: tanda "${tandaObj.isi}" benar untuk ${lengkapA} dan ${lengkapB}`);
        cek(["<", ">", "="].includes(tandaObj.isi), `${nm}: tanda adalah <, >, atau =`);
      }
      if (lengkapA != null && lengkapB != null && akhirAd && tandaObj) stat.banding += 1;

      /* 2) Perbandingan tertulis di gambar (p < q): benar, dan cocok dengan papan atau kartu. */
      for (const o of objs.filter((q) => q.t === "teks" && q.isi)) {
        const m = /^(\d+) ([<>=]) (\d+)$/.exec(o.isi);
        if (!m) continue;
        stat.cp += 1;
        const p = Number(m[1]);
        const q = Number(m[3]);
        cek(tandaDari(p, q) === m[2], `${nm}: "${o.isi}" benar`);
        if (lengkapA != null && lengkapB != null) {
          const va = nilaiTempat(lengkapA);
          const vb = nilaiTempat(lengkapB);
          cek(va.some((x, r) => x === p && vb[r] === q), `${nm}: "${o.isi}" membandingkan tempat yang sama pada papan (${lengkapA} dan ${lengkapB})`);
        } else if (kartuB.length >= 2 && p >= 100) cek(kartuB.some((c) => Number(c.t?.isi) === p) && kartuB.some((c) => Number(c.t?.isi) === q), `${nm}: "${o.isi}" memakai bilangan pada kartu`);
      }

      /* 3) Kartu bilangan dan urutan. */
      if (kartuB.length) {
        stat.kartu += 1;
        cek(kartuB.every((c) => c.k && c.t && Math.abs(c.t.x - (c.k.x + c.k.w / 2)) < 0.5 && c.t.y > c.k.y && c.t.y < c.k.y + c.k.h + 4), `${nm}: tiap kartu bilangan: isi di dalam kotak`);
        cek(new Set(kartuB.map((c) => c.k.x)).size === kartuB.length && new Set(kartuB.map((c) => c.t.isi)).size === kartuB.length && kartuB.every((c) => c.k.y === kartuB[0].k.y), `${nm}: kartu bilangan: posisi dan isi berbeda, sebaris`);
        cek(kartuB.every((c) => /^\d{3}$/.test(c.t.isi)), `${nm}: kartu bilangan berisi bilangan tiga angka`);
      }
      if (arahObj) {
        cek(kartuB.length >= 2, `${nm}: arah urutan tampil bersama kartu bilangan`);
        const nilai = kartuB.map((c) => Number(c.t.isi));
        if (/naik/.test(arahObj.isi)) cek(urutNaik(nilai), `${nm}: urutan naik: kartu dari kiri ke kanan ${nilai.join(", ")}`);
        else if (/turun/.test(arahObj.isi)) cek(urutTurun(nilai), `${nm}: urutan turun: kartu dari kiri ke kanan ${nilai.join(", ")}`);
        else cek(false, `${nm}: arah urutan naik atau turun`);
        stat.urut += 1;
        const pn = ketemu(objs, "or-pn");
        if (pn) cek(/naik/.test(arahObj.isi) ? pn.x2 > 0 : pn.x2 < 0, `${nm}: panah urutan searah dengan urutan ${arahObj.isi}`);
      }

      /* 4) Garis bilangan: letak sebanding dengan nilai. */
      if (gb.tanda.length || gb.titik.length) {
        stat.gb += 1;
        cek(gb.tanda.length >= 2, `${nm}: garis bilangan punya paling sedikit dua tanda`);
        if (gb.tanda.length >= 2) {
          const t0 = gb.tanda[0];
          const t1 = gb.tanda[1];
          const lereng = (t1.o.x - t0.o.x) / (t1.v - t0.v);
          cek(lereng > 0, `${nm}: garis bilangan makin ke kanan makin besar`);
          for (const q of gb.tanda) {
            cek(q.v % 100 === 0 && q.l && q.l.isi === String(q.v) && Math.abs(q.l.x - q.o.x) < 0.01, `${nm}: tanda ${q.v} dan angkanya`);
            cek(Math.abs(q.o.x - (t0.o.x + lereng * (q.v - t0.v))) < 0.01, `${nm}: tanda ${q.v} berjarak sebanding`);
          }
          for (const q of gb.titik) {
            cek(q.n && q.n.isi === String(q.v) && Math.abs(q.n.x - q.o.x) < 0.01, `${nm}: titik ${q.v} dan angkanya`);
            cek(Math.abs(q.o.x - (t0.o.x + lereng * (q.v - t0.v))) < 0.01, `${nm}: titik ${q.v} letaknya sebanding dengan nilainya`);
            cek(q.v >= gb.tanda[0].v && q.v <= gb.tanda[gb.tanda.length - 1].v, `${nm}: titik ${q.v} di dalam garis`);
            if (gb.g) cek(q.o.y === gb.g.y, `${nm}: titik ${q.v} tepat di garis`);
          }
          if (gb.g) cek(gb.g.x <= t0.o.x && gb.g.x + gb.g.x2 >= gb.tanda[gb.tanda.length - 1].o.x && gb.g.y2 === 0, `${nm}: garis bilangan memuat semua tanda`);
          else cek(false, `${nm}: garis bilangan ada`);
        }
      }

      /* 5) Bilangan anak (nb): kalimat dan perbandingannya. */
      if (nbs.length) stat.nb += 1;
      const nilaiNb = (slug) => nbs.find((q) => q.slug === slug)?.n;
      const nbUrut = [...nbs].sort((p, q) => p.x - q.x);

      /* 6) Kalimat di suara dihitung ulang dari gambar. */
      const sumber = [
        ...kartuB.map((c) => Number(c.t.isi)),
        ...nbs.map((q) => q.n),
        ...[lengkapA, lengkapB].filter((q) => q != null),
      ];
      const sisaNP = t.replace(new RegExp(NP, "g"), "<np>");
      // 6a) Setiap bilangan yang dieja tampak di gambar, dan ejaannya sama dengan nilainya.
      for (const m of t.matchAll(new RegExp(NP, "g"))) {
        stat.klaim += 1;
        const nlai = nilaiNP(m[0]);
        cek(eja(nlai) === m[0], `${nm}: ejaan "${m[0]}" sesuai nilainya (${nlai})`);
        cek(terlihatNilai.has(nlai), `${nm}: bilangan "${m[0]}" (${nlai}) tampak di gambar`);
      }
      // 6b) Bilangan dibandingkan: benar dan sesuai papan.
      for (const m of t.matchAll(new RegExp(`(${NP}) (kurang dari|lebih dari|sama dengan) (${NP})`, "g"))) {
        stat.klaim += 1;
        const p = nilaiNP(m[1]);
        const q = nilaiNP(m[3]);
        cek(rel(p, q) === m[2], `${nm}: "${m[0]}" benar (${p} dan ${q})`);
        if (lengkapA != null && lengkapB != null) cek(nilaiTempat(lengkapA).some((x, r) => x === p && nilaiTempat(lengkapB)[r] === q), `${nm}: "${m[0]}" sesuai papan kiri dan kanan (${lengkapA} dan ${lengkapB})`);
        else cek(terlihatNilai.has(p) && terlihatNilai.has(q), `${nm}: "${m[0]}" kedua bilangan tampak di gambar`);
      }
      // 6c) Angka tempat dibandingkan: benar dan sesuai papan.
      for (const m of sisaNP.matchAll(new RegExp(`\\b(${D9}) (kurang dari|lebih dari|sama dengan) (${D9})\\b`, "g"))) {
        stat.klaim += 1;
        const p = NILAI9[m[1]];
        const q = NILAI9[m[3]];
        cek(rel(p, q) === m[2], `${nm}: "${m[0]}" benar`);
        if (lengkapA != null && lengkapB != null) cek([0, 1, 2].some((r) => angkaTempat(lengkapA)[r] === p && angkaTempat(lengkapB)[r] === q), `${nm}: "${m[0]}" sesuai satu tempat pada papan`);
      }
      // 6d) Tempat yang sama pada kedua bilangan.
      for (const m of t.matchAll(new RegExp(`(ratusan|puluhan|satuan)nya (?:juga )?sama, yaitu (${D9})`, "g"))) {
        stat.klaim += 1;
        const r = TEMPAT.indexOf(m[1]);
        cek(lengkapA != null && lengkapB != null && angkaTempat(lengkapA)[r] === NILAI9[m[2]] && angkaTempat(lengkapB)[r] === NILAI9[m[2]], `${nm}: "${m[0]}" benar untuk ${lengkapA} dan ${lengkapB}`);
      }
      // 6e) "X ratusan, puluhan, satuan": angka itu ada pada tempat tersebut di salah satu bilangan yang tampak.
      for (const m of t.matchAll(new RegExp(`\\b(${D9}) (ratusan|puluhan|satuan)\\b`, "g"))) {
        stat.klaim += 1;
        const r = TEMPAT.indexOf(m[2]);
        cek(sumber.some((n) => angkaTempat(n)[r] === NILAI9[m[1]]), `${nm}: "${m[0]}" ada pada salah satu bilangan yang tampak (${sumber.join(", ")})`);
      }
      // 6f) Isi papan kiri dan kanan.
      for (const m of t.matchAll(new RegExp(`papan (kiri|kanan) berisi (${NP})`, "g"))) {
        stat.klaim += 1;
        cek((m[1] === "kiri" ? lengkapA : lengkapB) === nilaiNP(m[2]), `${nm}: "${m[0]}" sama dengan isi papan`);
      }
      // 6g) Bilangan milik anak.
      for (const m of t.matchAll(new RegExp(`\\b(${NAMA}) (?:punya|mengumpulkan|memiliki) (${NP})`, "g"))) {
        stat.klaim += 1;
        cek(nilaiNb(m[1]) === nilaiNP(m[2]), `${nm}: "${m[0]}" sama dengan keterangan di gambar (${nilaiNb(m[1])})`);
      }
      for (const m of t.matchAll(new RegExp(`jarak (${NAMA}) ke sekolah (?:adalah )?(${NP})`, "g"))) {
        stat.klaim += 1;
        cek(nilaiNb(m[1]) === nilaiNP(m[2]), `${nm}: "${m[0]}" sama dengan keterangan di gambar (${nilaiNb(m[1])})`);
      }
      for (const m of t.matchAll(new RegExp(`\\b(${NAMA}) dan (${NAMA}) sama-sama mengumpulkan (${NP})`, "g"))) {
        stat.klaim += 1;
        cek(nilaiNb(m[1]) === nilaiNP(m[3]) && nilaiNb(m[2]) === nilaiNP(m[3]), `${nm}: "${m[0]}" kedua bilangan sama dengan keterangan`);
      }
      for (const m of t.matchAll(new RegExp(`\\b(${NAMA}) dan (${NAMA}) punya bintang sama banyak`, "g"))) {
        stat.klaim += 1;
        cek(nilaiNb(m[1]) !== undefined && nilaiNb(m[1]) === nilaiNb(m[2]), `${nm}: "${m[0]}" benar menurut keterangan`);
      }
      for (const m of t.matchAll(new RegExp(`\\b(${NAMA}) punya bintang lebih (banyak|sedikit)`, "g"))) {
        stat.klaim += 1;
        const lain = nbs.filter((q) => q.slug !== m[1]);
        cek(nbs.length === 2 && lain.every((q) => (m[2] === "banyak" ? nilaiNb(m[1]) > q.n : nilaiNb(m[1]) < q.n)), `${nm}: "${m[0]}" benar menurut keterangan (${nbs.map((q) => `${q.slug}:${q.n}`).join(", ")})`);
      }
      for (const m of t.matchAll(new RegExp(`\\b(${NAMA}) berjalan lebih (jauh|dekat)`, "g"))) {
        stat.klaim += 1;
        const lain = nbs.filter((q) => q.slug !== m[1]);
        cek(nbs.length === 2 && lain.every((q) => (m[2] === "jauh" ? nilaiNb(m[1]) > q.n : nilaiNb(m[1]) < q.n)), `${nm}: "${m[0]}" benar menurut keterangan`);
      }
      for (const m of t.matchAll(new RegExp(`jarak (${NAMA}) lebih (jauh|dekat) dari jarak (${NAMA})`, "g"))) {
        stat.klaim += 1;
        cek(nilaiNb(m[1]) !== undefined && (m[2] === "jauh" ? nilaiNb(m[1]) > nilaiNb(m[3]) : nilaiNb(m[1]) < nilaiNb(m[3])), `${nm}: "${m[0]}" benar menurut keterangan`);
      }
      for (const m of t.matchAll(new RegExp(`\\b(${NAMA}) paling (sedikit|banyak)(?:, lalu (${NAMA}), lalu (${NAMA}))?`, "g"))) {
        stat.klaim += 1;
        const nilai = nbs.map((q) => q.n);
        const diri = nilaiNb(m[1]);
        cek(nbs.length >= 2 && nilai.every((x) => x === diri || (m[2] === "banyak" ? diri > x : diri < x)), `${nm}: "${m[0]}" benar menurut keterangan`);
        if (m[3]) cek(m[2] === "sedikit" ? urutNaik([nilaiNb(m[1]), nilaiNb(m[3]), nilaiNb(m[4])]) : urutTurun([nilaiNb(m[1]), nilaiNb(m[3]), nilaiNb(m[4])]), `${nm}: urutan "${m[0]}" benar`);
      }
      for (const m of t.matchAll(new RegExp(`ketiganya punya (${D9}) ratusan`, "g"))) {
        stat.klaim += 1;
        cek(nbs.length === 3 && nbs.every((q) => angkaTempat(q.n)[0] === NILAI9[m[1]]), `${nm}: "${m[0]}" benar untuk tiga bilangan`);
      }
      for (const m of t.matchAll(new RegExp(`puluhannya (${D9}), (${D9}), dan (${D9})`, "g"))) {
        stat.klaim += 1;
        cek(nbUrut.length === 3 && [1, 2, 3].every((q, r) => angkaTempat(nbUrut[r].n)[1] === NILAI9[m[q]]), `${nm}: "${m[0]}" sama dengan puluhan ketiga bilangan dari kiri ke kanan`);
      }
      // 6h) Paling kecil dan paling besar di antara kartu atau titik pada garis.
      for (const m of t.matchAll(new RegExp(`(${NP}) paling (kecil|besar)`, "g"))) {
        stat.klaim += 1;
        const himpunan = kartuB.length >= 2 ? kartuB.map((c) => Number(c.t.isi)) : gb.titik.map((q) => q.v);
        const target = m[2] === "kecil" ? Math.min(...himpunan) : Math.max(...himpunan);
        cek(himpunan.length >= 2 && nilaiNP(m[1]) === target, `${nm}: "${m[0]}" benar di antara ${himpunan.join(", ")}`);
      }
      // 6i) Daftar tiga bilangan dengan kata naik atau turun, terkecil atau terbesar.
      for (const kal of t.split(/[.?!]/)) {
        const bil = [...kal.matchAll(new RegExp(NP, "g"))].map((q) => nilaiNP(q[0]));
        if (bil.length < 3) continue;
        const naik = /naik|terkecil/.test(kal);
        const turun = /turun|terbesar/.test(kal);
        if (naik === turun) continue;
        stat.klaim += 1;
        cek(naik ? urutNaik(bil) : urutTurun(bil), `${nm}: daftar "${kal.trim().slice(0, 50)}..." berurutan ${naik ? "naik" : "turun"} (${bil.join(", ")})`);
        if (kartuB.length === 3) cek([...bil].sort((p, q) => p - q).join() === kartuB.map((c) => Number(c.t.isi)).sort((p, q) => p - q).join(), `${nm}: daftar memuat tepat bilangan pada kartu`);
      }

      /* 7) Pilihan jawaban: satu pilihan benar, dihitung dari gambar. */
      {
        const cp = [1, 2, 3].map((q) => ({ t: ketemu(objs, `c${q}-t`)?.isi, s: ketemu(objs, `c${q}-k`)?.sorot })).filter((c) => c.t !== undefined);
        if (cp.length) {
          stat.pilihan += 1;
          cek(new Set(cp.map((c) => c.t)).size === cp.length && cp.length >= 2, `${nm}: pilihan jawaban berbeda (${cp.map((c) => c.t).join(", ")})`);
          const dipilih = cp.filter((c) => c.s);
          cek(/^betul/.test(t) ? dipilih.length === 1 : dipilih.length === 0, `${nm}: jawaban disorot tepat pada ketukan "Betul!"`);
          const tanya = ketemu(objs, "tanya")?.isi ?? "";
          cek(tanya.length > 0, `${nm}: pertanyaan tampil bersama pilihan`);
          let benar = null;
          let m;
          const himpunan = kartuB.length >= 2 ? kartuB.map((c) => Number(c.t.isi)) : gb.titik.map((q) => q.v);
          if (/^tanda yang tepat\?$/.test(tanya)) {
            cek(lengkapA != null && lengkapB != null, `${nm}: dua papan lengkap untuk "${tanya}"`);
            benar = cp.filter((c) => c.t === tandaDari(lengkapA, lengkapB)).map((c) => c.t);
          } else if ((m = /^paling (kecil|besar) yang mana\?$/.exec(tanya))) {
            cek(himpunan.length >= 3, `${nm}: tiga bilangan untuk "${tanya}"`);
            const target = m[1] === "kecil" ? Math.min(...himpunan) : Math.max(...himpunan);
            benar = cp.filter((c) => Number(c.t) === target).map((c) => c.t);
            cek(cp.every((c) => himpunan.includes(Number(c.t))), `${nm}: pilihan adalah bilangan yang tampak`);
          } else if ((m = /^urutan (naik|turun) yang mana\?$/.exec(tanya))) {
            cek(himpunan.length === 3, `${nm}: tiga kartu untuk "${tanya}"`);
            const urut = [...himpunan].sort((p, q) => (m[1] === "naik" ? p - q : q - p));
            benar = cp.filter((c) => c.t === gabungKoma(urut)).map((c) => c.t);
          }
          cek(benar !== null && benar.length === 1, `${nm}: tepat satu pilihan benar untuk "${tanya}" (${benar})`);
          if (benar && benar.length === 1) {
            stat.jawaban += 1;
            if (dipilih.length === 1) cek(dipilih[0].t === benar[0], `${nm}: jawaban yang disorot "${dipilih[0].t}" sama dengan hitungan ulang "${benar[0]}"`);
          }
        }
      }
      if (akhirAd && lengkapA != null && lengkapB != null && tandaObj) papanMateri.push({ v: v.id, a: lengkapA, b: lengkapB, adegan: a.id });
    });
  }
}

/* ------------------------------ Bilangan sumber dan cakupan ------------------------------ */
{
  const sumberJson = JSON.parse(readFileSync(new URL("../src/data/kelas3-bab1.json", import.meta.url), "utf8")).subBabs.C;
  const angkaSumber = [...new Set(JSON.stringify(sumberJson.stories).match(/\b\d{3}\b/g) ?? [])].map(Number);
  cek(angkaSumber.length >= 10, `data sumber memuat bilangan tiga angka (${angkaSumber.join(", ")})`);
  for (const n of angkaSumber) cek(bilanganTerlihatSemua.has(n), `bilangan sumber ${n} dipakai di gambar video`);
  for (const [a, b] of [[339, 421], [583, 529], [769, 761], [804, 804]]) cek(papanMateri.some((q) => q.v === "k3b1C-materi" && q.a === a && q.b === b), `video materi: papan ${a} dan ${b} dengan tanda`);
  sama(
    papanMateri.filter((q) => q.v === "k3b1C-materi").map((q) => [q.a, q.b]),
    [[339, 421], [583, 529], [769, 761], [804, 804], [407, 470], [456, 465]],
    "video materi: pasangan bilangan pada papan (urutan adegan)",
  );
  sama(
    papanMateri.filter((q) => q.v === "k3b1C-luar").map((q) => [q.a, q.b]),
    [[468, 475], [647, 645]],
    "video luar: pasangan bilangan pada papan",
  );
}

console.log(`Pemeriksaan: ${stat.papan} papan, ${stat.tanda} tanda, ${stat.banding} perbandingan akhir adegan, ${stat.cp} perbandingan tertulis, ${stat.kartu} keadaan kartu, ${stat.urut} urutan, ${stat.gb} garis bilangan, ${stat.nb} keterangan anak, ${stat.klaim} klaim di suara, ${stat.pilihan} pilihan, ${stat.jawaban} jawaban`);
for (const [nama, batas] of [["papan", 70], ["tanda", 12], ["banding", 6], ["cp", 15], ["kartu", 25], ["urut", 10], ["gb", 8], ["nb", 12], ["klaim", 150], ["pilihan", 6], ["jawaban", 5]]) cek(stat[nama] >= batas, `uji menjalankan cukup banyak pemeriksaan ${nama} (${stat[nama]} >= ${batas})`);

/* ------------------------------ Aturan pemilik ------------------------------ */
{
  const MANDIRI = /kerja kelompok|berkelompok|secara berkelompok|diskusi kelompok|sekelompok|kelompokmu|kelompok belajar|bersama kelompok|tanya teman|survei|karet gelang|uang tabungan|uang logam|\bpaman\b|\btika\b|\bteman\w*|\bkawan\w*|sekawan|sahabat|depan kelas|bersama kelas|seluruh kelas|\bkelas\b|berpasangan dengan (teman|kawan)|bekerja berpasangan|secara berpasangan|bermain bersama|bertanya kepada|buat ceritamu|buku|menulis di|menuliskan di|tulis di|tuliskan di|menulis|menggambar|gambarlah|gambar sendiri|\bbawa(lah)?\b|membawa|dibawa|\bkertas\b|\bpensil\b|\bpulpen\b|\bspidol\b|\bgunting\b|ambil (benda|pensil|kelereng|bola|sedotan|balon|kerucut|kubus)|\bjari\b|menyuruh|suruh|jengkal|telapak|\bdepa\b|penggaris|\bkoin\b|di sekitar|di rumah|di kelas|kakimu|tanganmu|badanmu|\braba\w*|\bmeraba|\btubuh|\blengan|lingkari|guru kelas|orang tua|\bayah\b|\bibu\b|\bibu guru|bapak guru|\bloker\b|singapura|\bmeja\b|di sekitarmu|\brumah\b|\bpisau\b|\bkelompok\b|dua tangan|tangan (kiri|kanan)|angkat|mengangkat|\bkantin|\blidi\b|kelas tiga|presentasi|mempresentasikan|\bketua\b|\banggota\b|toples|manik|kerikil|kaleng|gelas plastik|\bpak\b|\bbandi\b|pramuka|barung|alun-alun|perpustakaan|toko/i;
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      const semua = [a.judul, a.sumber];
      a.ketukan.forEach((kt, i) => {
        semua.push(kt.suara);
        semua.push(...L.teksTerlihat(L.keadaanStory(a, i, 9999)));
      });
      const kena = semua.filter((t) => MANDIRI.test(t) || /\b(Lili|Alfa|Galih|Alen|Meutia|Andi)\b/.test(t));
      cek(kena.length === 0, `${v.id}/${a.id}: narasi mandiri dan digital, tanpa kelompok, teman, kelas, rumah, buku, kertas, pensil, kantin, menulis, atau tokoh di luar enam (${kena.slice(0, 2).join(" | ")})`);
    }
  }
}

/* ------------------------------ Sapaan, peta susun, dan tabel susun ------------------------------ */
{
  const sap = adegan(M_VIDEO, "sapaan");
  const DAFTAR = ["Membandingkan dua bilangan", "Memakai tanda perbandingan", "Mengurutkan bilangan"];
  cek(/Halo anak-anak/.test(sap.ketukan[0].suara) && /Membandingkan dua bilangan/i.test(L.teksTerlihat(akhirAdegan(sap, 1)).join(" | ")), "sapaan materi: tiga hal yang dipelajari tampil");
  sama(L.teksTerlihat(akhirAdegan(sap, 1)).filter((t) => DAFTAR.includes(t)), DAFTAR, "sapaan materi: daftar tiga hal");
  cek(!/\d/.test(sap.ketukan[1].suara) && !/\d/.test(DAFTAR.join(" ")), "sapaan materi: tanpa angka");
  const sapLuar = adegan(U, "sapaan");
  cek(/cara lain/i.test(L.teksTerlihat(akhirAdegan(sapLuar, 1)).join(" | ")) && /metode-luar|Metode luar/.test(sapLuar.sumber), "sapaan metode luar: pengumuman cara lain");
  const ringkasBerkas = new URL("../src/data/kelas3-bab1-ringkas.json", import.meta.url);
  const sumberRingkas = existsSync(ringkasBerkas) ? JSON.parse(readFileSync(ringkasBerkas, "utf8")).subBab?.C : null;
  const sementara = new URL("../.tmp-k3b1s/C.json", import.meta.url);
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
    cek(T.baris.every((b) => b.sel.every((s) => s.length <= 8)), "tabel susun: sel pendek supaya margin teks >= 5 px di 405 px");
    // Isi tabel dihitung ulang dari pasangan bilangan pada papan video materi: tempat penentu, tanda, dan kata.
    sama(T.kolom, ["Tempat", "Tanda", "Kata"], "tabel susun: kolom tempat, tanda, kata");
    sama(T.baris.map((b) => b.label), ["339 421", "583 529", "769 761", "804 804"], "tabel susun: baris pasangan bilangan sesuai urutan adegan materi");
    for (const b of T.baris) {
      const [p, q] = b.label.split(" ").map(Number);
      cek(papanMateri.some((x) => x.v === "k3b1C-materi" && x.a === p && x.b === q), `tabel susun: pasangan ${b.label} ada pada papan video materi`);
      stat.tabel += 1;
      const r = [0, 1, 2].findIndex((i) => angkaTempat(p)[i] !== angkaTempat(q)[i]);
      sama(b.sel, [r < 0 ? "semua" : TEMPAT[r], tandaDari(p, q), p < q ? "kurang" : p > q ? "lebih" : "sama"], `tabel susun: baris ${b.label} dihitung ulang dari angka tiap tempat`);
    }
    const KATA_LARANG = /buku|halaman|kunci|kerja kelompok|berkelompok|\bteman|kawan|kelas\b|kertas|pensil|\bbawa\b|menggambar|menulis|depan kelas|\bluas\b|keliling|di rumah|survei|karet gelang|uang tabungan|di sekitar|\bpaman\b|\btika\b|\blili\b|loker|ibu guru|singapura|pisau|koin|\brumah\b|\bayah\b|\bpak\b|\bkantin|\blidi\b|compare placewise|number line|ordering|\bketua\b|\banggota\b|sahabat|\balfa\b|\bgalih\b|\balen\b|\bandi\b/i;
    cek(!KATA_LARANG.test(JSON.stringify({ p: A.petaSusun, t: A.tabelSusun })), "peta dan tabel susun: tanpa kata terlarang dan tanpa nama Inggris, kelompok, teman, kelas, buku, kertas, pensil, pisau, loker, Ibu guru");
    cek(peta.every((s) => ![...s.teks, ...(s.ikon ?? "")].some((c) => c.codePointAt(0) > 0x1fa95)), "peta susun: emoji paling tinggi Emoji 12");
  } else cek(false, "peta dan tabel susun: .tmp-k3b1s/C.json atau kelas3-bab1-ringkas.json subBab.C.petaSusun ada");
}

console.log(`Tabel susun dihitung ulang: ${stat.tabel} baris`);
console.log(`${VIDEO.map((v) => `${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, a) => t + a.ketukan.length, 0)} ketukan, ${kataVideo(v)} kata (sekitar ${(kataVideo(v) / 120).toFixed(1)} menit diputar)`).join("\n")}`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
