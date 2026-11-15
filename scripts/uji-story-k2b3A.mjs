// Uji Story Kelas 2 Bab 3 Sub-Bab A (Bangun Datar): dua video (materi kurikulum dan metode luar) dengan mesin animasi Story.
// Video diputar bergaya guru: suara, teks terlihat, sumber, judul adegan, dan subjudul tanpa penyebutan buku (kata terlarang diperiksa pada adegan yang diputar).
// Memeriksa: pemicu kata, suara tanpa digit, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas, teks bertumpuk, pemisahan materi dan metode luar (nama metode hanya Indonesia),
// dan HITUNG ULANG dari struktur adegan: banyak titik sudut jalur segi banyak = banyak sisi yang disebut suara dan nama bangun (segitiga 3, segi empat 4, segi lima 5, segi enam 6),
// penanda sisi dan pojok (garis dari sudut i ke sudut i+1, angka berurutan), kelompok segi banyak dan bentuk lengkung (kotak pilah), lingkaran (jari-jari sama, cap dan putar pas) lawan telur dan hati,
// pilihan jawaban (satu disorot dan benar), kolom pilah menurut banyak sisi, papan paku (karet menyambung paku ke paku dan menutup), emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k2b3A.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k2b3A-video.ts");
const U1 = await import("../src/components/modul/story/k2b3A-luar-1.ts");
const B = await import("../src/components/modul/story/k2b3A-bantu.ts");

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
const VIDEO = [V.VIDEO_MATERI_K2B3A, V.VIDEO_LUAR_K2B3A];
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
const M_VIDEO = V.VIDEO_MATERI_K2B3A;
const U = V.VIDEO_LUAR_K2B3A;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const NAMA_LUAR = /van Hiele|Pilah Ciri|Papan Paku|metode luar|metode dari luar/i;
const NAMA_INGGRIS = /Attribute Sort|Geoboard|Compose|Decompose|Face Print|Mystery Bag|3D Attributes|Singapore Math/i;
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M_VIDEO);
  const luar = teksVideo(U);
  cek(!NAMA_LUAR.test(materi), "video materi tidak memuat nama metode luar (maju di jalur bilangan, pecah, dan tabel nilai tempat adalah istilah materi)");
  for (const m of U1.NAMA_METODE_ID) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE_ID, ["van Hiele Visual", "Pilah Ciri", "Papan Paku"], "nama Indonesia metode luar (namaId data)");
  cek(!NAMA_INGGRIS.test(materi) && !NAMA_INGGRIS.test(luar), "nama metode hanya bahasa Indonesia (tanpa Attribute Sort, Geoboard)");
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
      cek(!/\b(Tika|Paman|Ibu|Ayah|Bapak|Budi|Ani|Doni|Sinta|Dewi|Rudi|Nina|Andi|Siti|Bu Guru|Pak Guru)\b/.test(semua.join(" | ")), `${v.id}/${a.id}: hanya enam tokoh tetap`);
    }
  }
  cek(M_VIDEO.subjudul === "Materi kurikulum" && U.subjudul === "Tiga metode luar", "subjudul video: Materi kurikulum dan Tiga metode luar");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 46), "video materi: label sumber berbentuk Materi: ... dan pendek");
  cek(U.adegan.every((a) => /Metode luar|Ringkasan/i.test(a.sumber) && a.sumber.length <= 46), "video metode luar: label sumber metode luar atau ringkasan, pendek");
  cek(M_VIDEO.id === "k2b3A-materi" && U.id === "k2b3A-luar", "id video k2b3A-materi dan k2b3A-luar");
  cek(U.judul.endsWith(": Metode dari Luar") && !/menurut/i.test(M_VIDEO.judul), "judul video: materi tanpa 'menurut', luar berakhir ': Metode dari Luar'");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,cerita-sarang,sisi-pojok,segi-banyak,lengkung,pilah-dua,bukan-segi-banyak,hitung-sisi,segi-lima-enam,bandingkan-sisi,pola-nama,lingkaran-putar,temukan-bentuk,tiga-pertanyaan,latihan-satu,latihan-dua,latihan-tiga,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-visual,luar-visual-terapan,luar-pilah,luar-pilah-terapan,luar-paku,luar-paku-terapan,luar-ringkas", "urutan adegan metode luar");
  cek(M_VIDEO.adegan[0].id === "sapaan" && U.adegan[0].id === "sapaan", "tiap video dibuka adegan sapaan");
  cek(M_VIDEO.adegan.filter((a) => /^latihan-/.test(a.id)).length === 3 && M_VIDEO.adegan[M_VIDEO.adegan.length - 1].id === "penutup", "video materi: Latihan 1 sampai 3 lalu penutup");
  cek(U.adegan[1].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  cek(U.adegan.length - 3 === 6, "video metode luar: konsep dan penerapan untuk tiga metode (6 adegan di antara pembuka dan ringkasan)");
  for (const kata of ["Latihan", "Igil", "Halim", "Kira", "Wei", "Upe", "sarang lebah", "segi banyak", "bentuk lengkung", "sisi", "pojok", "segitiga", "segi empat", "segi lima", "segi enam", "lingkaran", "telur", "hati", "kurva", "garis lurus", "diputar", "pas"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  // Geometri bangun datar: tanpa luas, keliling, rumus, satuan baku, bangun ruang, dan bilangan besar.
  const BOCOR = /\bluas\b|keliling|rumus|volume|sentimeter|centimeter|\bcm\b|\bmeter\b|penggaris|\bkubus\b|\bbalok\b|\btabung\b|\bkerucut\b|\bbola\b|rusuk|bangun ruang|\bribu\b|\bratus\b|dikali|perkalian|pembagian|dibagi|×|÷|−/i;
  for (const v of [M_VIDEO, U]) {
    for (const a of v.adegan) cek(!BOCOR.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa luas, keliling, rumus, satuan baku, bangun ruang, perkalian`);
    for (const a of v.adegan) for (const i of a.ketukan.keys()) for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) for (const b of bilanganDari(t)) cek(Number(b) <= 20, `${v.id}/${a.id}#${i + 1}: angka di gambar paling besar dua puluh ("${t}")`);
  }
  const ketMateri = M_VIDEO.adegan.reduce((t, ad) => t + ad.ketukan.length, 0);
  cek(totalKetukan >= 70 && ketMateri >= 70, `total ketukan cukup dalam (${totalKetukan}; materi ${ketMateri})`);
  const kataMateri = kataVideo(M_VIDEO);
  cek(kataMateri / 120 >= 8 && kataMateri / 120 <= 13, `durasi materi diputar 8 sampai 13 menit (${(kataMateri / 120).toFixed(1)} menit)`);
  cek(kataVideo(U) / 120 >= 3, `durasi video luar paling sedikit 3 menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
}

/* ------------------------------ Nama bilangan 10 sampai 20 yang diucapkan tampak sebagai angka ------------------------------ */
const NAMA = B.NAMA_BILANGAN;
const tokoh = (s) => s.toLowerCase().split(/\s+/).filter(Boolean).map((w) => ({ w: w.replace(/[^a-z]/g, ""), akhir: /[,.;:!?]$/.test(w) }));
/** Nama bilangan 1 sampai 20 yang dimulai pada token `p`: [nilai, panjang] atau null. */
const bacaAngka = (t, p) => {
  for (let n = 20; n >= 1; n -= 1) {
    const pc = NAMA[n].split(" ");
    if (pc.every((c, q) => t[p + q]?.w === c && (q === pc.length - 1 || !t[p + q].akhir))) return [n, pc.length];
  }
  return null;
};
/** Panjang deret bilangan berurutan terpanjang yang dimulai dari satu dalam suara. */
const rantaiSatu = (suara) => {
  const t = tokoh(suara);
  let terbaik = 0;
  for (let p = 0; p < t.length; p += 1) {
    const r = bacaAngka(t, p);
    if (!r || r[0] !== 1) continue;
    let len = 1;
    let q = p + r[1];
    let v = 1;
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

/* ------------------------------ Struktur bentuk dihitung ulang dari gambar ------------------------------ */
const NAMA_SEGI = { 3: "segitiga", 4: "segi empat", 5: "segi lima", 6: "segi enam" };
const NAMA_ANGKA = { tiga: 3, empat: 4, lima: 5, enam: 6 };
const di = (id, ke) => {
  const a = adegan(M_VIDEO, id) ?? adegan(U, id);
  return akhirAdegan(a, ke);
};
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
const stat = { poligon: 0, label: 0, sisi: 0, sudut: 0, lengkung: 0, jawaban: 0, cap: 0, paku: 0, kolom: 0, zona: 0, sarang: 0, jn: 0, rantai: 0, nama: 0, khusus: 0 };
const poligonDari = (objs) => objs.filter((o) => o.t === "jalur" && titikJalur(o));
const titikPoligon = (o) => titikJalur(o).map((p) => [Math.round(p[0] * 10) / 10, Math.round(p[1] * 10) / 10]);
const dekat = (p, q, tol = 0.35) => Math.abs(p[0] - q[0]) <= tol && Math.abs(p[1] - q[1]) <= tol;
const lengkungAda = (o) => (o.t === "bulat" && (o.r ?? 0) >= 10 && !/-cap$/.test(o.id) && o.warna !== "none") || (o.t === "jalur" && /[CQ]/.test(o.d ?? "") && o.warna !== "none" && o.id !== "kv");
const jenisBentuk = (o) => (o.t === "bulat" ? "lingkaran" : "bentuk lengkung");
const batasKurva = (o) => {
  const n = bilangan(o.d ?? "");
  const xs = n.filter((_, q) => q % 2 === 0).map(Math.abs);
  const ys = n.filter((_, q) => q % 2 === 1).map(Math.abs);
  return { a: Math.max(...xs), b: Math.max(...ys) };
};
/** Satu bentuk pas bila diputar di atas capnya: lingkaran selalu; bentuk lain hanya bila putarannya kelipatan 180 derajat (bentuk tidak bulat). */
const pas = (o) => {
  if (o.t === "bulat") return true;
  const { a, b } = batasKurva(o);
  if (Math.abs(a - b) < 0.5) return true;
  return (((o.rot ?? 0) % 180) + 180) % 180 === 0;
};
const bentukSemua = (objs) => objs.filter((o) => (o.t === "jalur" && titikJalur(o) && !/^(pk|pr\d)$/.test(o.id)) || lengkungAda(o));
const pilih = (objs) => [1, 2, 3].map((q) => ({ t: isiTeks(objs, `c${q}-t`), s: ketemu(objs, `c${q}-k`)?.sorot })).filter((c) => c.t !== undefined);
const dipilih = (objs) => pilih(objs).filter((c) => c.s).map((c) => c.t);
const kaki = (o) => [[o.x, o.y], [o.x + (o.x2 ?? 0), o.y + (o.y2 ?? 0)]];

for (const v of VIDEO) {
  for (const a of v.adegan) {
    a.ketukan.forEach((kt, i) => {
      const objs = akhirAdegan(a, i);
      const nm = `${v.id}/${a.id}#${i + 1}`;
      const poli = poligonDari(objs);
      const titik = new Map(poli.map((o) => [o.id, titikPoligon(o)]));
      stat.poligon += poli.length;
      // 1) Nama bangun sama dengan banyak titik sudut; nama bentuk lengkung cocok dengan jenisnya.
      for (const o of objs.filter((q) => q.t === "teks" && /-nm$/.test(q.id))) {
        const dasar = o.id.replace(/-nm$/, "");
        const bentuk = ketemu(objs, dasar);
        cek(!!bentuk, `${nm}: nama "${o.isi}" punya bentuk ${dasar}`);
        if (!bentuk) continue;
        stat.label += 1;
        if (titik.has(dasar)) cek(o.isi === NAMA_SEGI[titik.get(dasar).length], `${nm}: bentuk ${dasar} bertitik sudut ${titik.get(dasar).length} bernama "${o.isi}" harus "${NAMA_SEGI[titik.get(dasar).length]}"`);
        else {
          cek(lengkungAda(bentuk), `${nm}: bentuk ${dasar} bernama "${o.isi}" harus lengkung`);
          cek(["lingkaran", "bentuk lengkung", "lengkung", "telur", "hati"].includes(o.isi), `${nm}: nama bentuk lengkung "${o.isi}"`);
          if (o.isi === "lingkaran") cek(bentuk.t === "bulat", `${nm}: "lingkaran" harus bulat`);
          if (o.isi === "telur" || o.isi === "hati") cek(bentuk.t === "jalur", `${nm}: "${o.isi}" bukan bulat`);
        }
      }
      // 2) Penanda sisi: garis dari sudut i ke sudut i+1; angka urut; tak lebih dari banyak sudut.
      for (const [id, pts] of titik) {
        const n = pts.length;
        cek(!ketemu(objs, `${id}s${n}`) && !ketemu(objs, `${id}d${n}`), `${nm}: ${id} hanya punya ${n} sisi dan pojok penanda`);
        for (let q = 0; q < n; q += 1) {
          const s = ketemu(objs, `${id}s${q}`);
          if (s) {
            stat.sisi += 1;
            const [p1, p2] = kaki(s);
            cek(s.t === "garis" && dekat(p1, pts[q]) && dekat(p2, pts[(q + 1) % n], 0.45), `${nm}: sisi ${q + 1} dari ${id} menghubungkan sudut ${q + 1} dan ${((q + 1) % n) + 1}`);
            const ang = ketemu(objs, `${id}sn${q}`);
            cek(ang && ang.isi === String(q + 1), `${nm}: angka sisi ${q + 1} dari ${id}`);
          }
          const d = ketemu(objs, `${id}d${q}`);
          if (d) {
            stat.sudut += 1;
            cek(d.t === "bulat" && dekat([d.x, d.y], pts[q]), `${nm}: titik pojok ${q + 1} dari ${id} tepat di sudut`);
            const ang = ketemu(objs, `${id}dn${q}`);
            if (ang) cek(ang.isi === String(q + 1), `${nm}: angka pojok ${q + 1} dari ${id}`);
          }
        }
        // Angka sisi/pojok berurutan dari satu tanpa lompat.
        for (const jenis of ["sn", "dn"]) {
          const ada = Array.from({ length: n }, (_, q) => !!ketemu(objs, `${id}${jenis}${q}`));
          const m = ada.filter(Boolean).length;
          cek(ada.every((x, q) => q < m ? x : !x), `${nm}: angka ${jenis === "sn" ? "sisi" : "pojok"} ${id} berurutan dari satu`);
        }
      }
      // 3) Hitung "satu, dua, tiga, ..." di suara sama dengan banyak angka sisi atau pojok yang ditambahkan ketukan ini.
      {
        const tambahan = kt.aksi.flatMap((ak) => (ak.tambah === undefined ? [] : [].concat(ak.tambah)));
        const grup = new Map();
        for (const o of tambahan) {
          const m = /^(.+)(sn|dn)(\d+)$/.exec(o.id);
          if (m && o.t === "teks") grup.set(`${m[1]}${m[2]}`, (grup.get(`${m[1]}${m[2]}`) ?? 0) + 1);
        }
        for (const [kunci, banyak] of grup) {
          if (banyak < 2) continue;
          stat.rantai += 1;
          const dasar = kunci.slice(0, -2);
          const total = objs.filter((o) => new RegExp(`^${dasar}${kunci.slice(-2)}\\d+$`).test(o.id)).length;
          const rantai = rantaiSatu(kt.suara);
          cek(rantai === total && titik.get(dasar)?.length === total, `${nm}: ${total} angka ${kunci.slice(-2) === "sn" ? "sisi" : "pojok"} pada ${dasar} cocok dengan hitungan suara (${rantai}) dan banyak sudut (${titik.get(dasar)?.length})`);
        }
      }
      // 4) Banyak sisi dan nama yang diucapkan ada pada bangun yang tergambar.
      if (poli.length > 0) {
        const adaN = new Set([...titik.values()].map((p) => p.length));
        const suara = kt.suara.toLowerCase();
        for (const m of suara.matchAll(/\b(tiga|empat|lima|enam) (sisi|pojok)\b/g)) {
          stat.nama += 1;
          cek(adaN.has(NAMA_ANGKA[m[1]]), `${nm}: "${m[0]}" ada bangun bertitik sudut ${NAMA_ANGKA[m[1]]} yang tergambar`);
        }
        for (const [n, nama] of Object.entries(NAMA_SEGI)) {
          if (new RegExp(`\\b${nama}\\b`).test(suara) && !/\b(dibatasi|dinamakan|bentuk dasar)\b/.test(suara) && !/penutup|ringkas|pertanyaan|pembuka/.test(a.id)) {
            stat.nama += 1;
            cek(adaN.has(Number(n)), `${nm}: "${nama}" disebut dan ada bangun bertitik sudut ${n}`);
          }
        }
      }
      // 5) Teks "N sisi" di dekat bangun, kartu "N sisi dan N pojok", "0 sisi lurus".
      for (const o of objs.filter((q) => q.t === "teks" && /-jn$/.test(q.id))) {
        const m = /^(\d) sisi$/.exec(o.isi);
        cek(!!m, `${nm}: teks hitung ${o.id} berbentuk "N sisi"`);
        const dasar = o.id.replace(/-jn$/, "");
        stat.jn += 1;
        cek(m && titik.get(dasar)?.length === Number(m[1]), `${nm}: "${o.isi}" pada ${dasar} sama dengan ${titik.get(dasar)?.length} sudut yang tergambar`);
      }
      for (const t of L.teksTerlihat(objs)) {
        const m = /^(\d) sisi dan (\d) pojok$/.exec(t);
        if (m) {
          stat.jn += 1;
          cek(m[1] === m[2] && poli.length === 1 && titik.get(poli[0].id).length === Number(m[1]), `${nm}: kartu "${t}" sama dengan bangun yang tergambar`);
        }
        {
          const m2 = /^(d) lebih banyak dari (d)$/.exec(t);
          if (m2) {
            stat.jn += 1;
            const ada = new Set([...titik.values()].map((p) => p.length));
            cek(Number(m2[1]) > Number(m2[2]) && ada.has(Number(m2[1])) && ada.has(Number(m2[2])), `${nm}: kartu "${t}" sama dengan dua bangun yang tergambar`);
          }
          const m3 = /^selisih (d) sisi$/.exec(t);
          if (m3) {
            stat.jn += 1;
            const ada = [...titik.values()].map((p) => p.length).sort();
            cek(ada.length === 2 && ada[1] - ada[0] === Number(m3[1]), `${nm}: kartu "${t}" sama dengan selisih sisi dua bangun (${ada.join(",")})`);
          }
        }
        if (t === "0 sisi lurus") cek(poli.length === 0 && bentukSemua(objs).length >= 1 && bentukSemua(objs).every(lengkungAda), `${nm}: kartu "0 sisi lurus" hanya untuk bentuk lengkung (${poli.length} segi banyak)`);
      }
      // 6) Banyak bentuk per adegan paling banyak dua puluh.
      cek(bentukSemua(objs).length <= 20, `${nm}: bentuk paling banyak dua puluh (${bentukSemua(objs).length})`);
      // 7) Cap dan putaran: cap sama ukuran; tanda pas hanya pada bentuk yang pas.
      for (const cap of objs.filter((o) => /-cap$/.test(o.id))) {
        const dasar = ketemu(objs, cap.id.replace(/-cap$/, ""));
        cek(!!dasar, `${nm}: cap ${cap.id} punya bentuk`);
        if (!dasar) continue;
        stat.cap += 1;
        cek(Math.abs(dasar.x - cap.x) < 0.1 && Math.abs(dasar.y - cap.y) < 0.1, `${nm}: cap ${cap.id} sepusat dengan bentuknya`);
        if (dasar.t === "bulat") cek(cap.t === "bulat" && cap.r === dasar.r, `${nm}: cap lingkaran berjari-jari sama`);
        else {
          const m = batasKurva(dasar);
          const c = batasKurva(cap);
          cek(Math.abs(m.a - c.a) < 0.1 && Math.abs(m.b - c.b) < 0.1 && (cap.rot ?? 0) === 0, `${nm}: cap telur berukuran sama dan tegak`);
        }
      }
      for (const o of objs.filter((q) => q.t === "teks" && /(-ok|^lg-ok|-no|^no)$/.test(q.id))) {
        const dasar = o.id === "no" ? "tl" : o.id.replace(/-(ok|no)$/, "");
        const b = ketemu(objs, dasar);
        cek(!!b, `${nm}: tanda ${o.id} punya bentuk ${dasar}`);
        if (b && /-ok$/.test(o.id) && o.isi === "✅" && ketemu(objs, `${dasar}-cap`)) cek(pas(b), `${nm}: tanda pas ${o.id} pada bentuk yang pas`);
        if (b && /(-no|^no)$/.test(o.id)) cek(!pas(b), `${nm}: tanda tidak pas ${o.id} pada bentuk yang tidak pas (rot ${b.rot ?? 0})`);
      }
      // 8) Jari-jari lingkaran sama panjang; penunjuk putar sepanjang jari-jari.
      {
        const lg = ketemu(objs, "lg");
        const jr = objs.filter((o) => /^jr\d+$/.test(o.id));
        if (jr.length) {
          cek(!!lg && lg.t === "bulat" && jr.length === 6, `${nm}: enam jari-jari pada lingkaran`);
          for (const j of jr) cek(lg && Math.abs(j.x - lg.x) < 0.1 && Math.abs(j.y - lg.y) < 0.1 && Math.abs(Math.hypot(j.x2, j.y2) - lg.r) < 0.15, `${nm}: ${j.id} sama panjang dengan jari-jari ${lg?.r} (ada ${Math.hypot(j.x2, j.y2).toFixed(2)})`);
          stat.khusus += jr.length;
        }
        const pt = ketemu(objs, "pt");
        if (pt && pt.t === "garis" && lg) cek(Math.abs(Math.hypot(pt.x2, pt.y2) - lg.r) < 0.1 && pt.x === lg.x && pt.y === lg.y, `${nm}: penunjuk putar sepanjang jari-jari lingkaran`);
      }
      // 9) Papan paku: karet dari paku ke paku, bersambung, menutup, dan sama dengan bangunnya.
      {
        const paku = objs.filter((o) => /^pg\d\d$/.test(o.id)).map((o) => [o.x, o.y]);
        const kr = objs.filter((o) => /^kr\d+$/.test(o.id)).sort((p, q) => Number(p.id.slice(2)) - Number(q.id.slice(2)));
        if (kr.length) {
          stat.paku += 1;
          cek(paku.length === 16, `${nm}: papan paku empat kali empat (${paku.length} paku)`);
          cek(kr.every((o, q) => o.id === `kr${q}`), `${nm}: tarikan karet berurutan dari nol`);
          cek(kr.every((o) => paku.some((p) => dekat(p, kaki(o)[0], 0.1)) && paku.some((p) => dekat(p, kaki(o)[1], 0.1))), `${nm}: tiap karet berawal dan berakhir di paku`);
          cek(kr.every((o, q) => q === 0 || dekat(kaki(kr[q - 1])[1], kaki(o)[0], 0.1)), `${nm}: karet bersambung dari paku ke paku`);
          const pk = ketemu(objs, "pk");
          if (pk) {
            const t = titikPoligon(pk);
            cek(t.length === kr.length, `${nm}: ${kr.length} karet membentuk bangun bertitik sudut ${t.length}`);
            cek(dekat(kaki(kr[kr.length - 1])[1], kaki(kr[0])[0], 0.1), `${nm}: karet terakhir kembali ke paku pertama`);
            cek(kr.every((o, q) => dekat(kaki(o)[0], t[q], 0.1)), `${nm}: sudut bangun sama dengan paku yang ditarik`);
            cek(new Set(t.map((p) => p.join())).size === t.length, `${nm}: paku bangun berbeda-beda`);
            // Bangun cembung: semua belokan searah.
            const lintang = t.map((p, q) => {
              const a1 = t[(q + 1) % t.length];
              const a2 = t[(q + 2) % t.length];
              return (a1[0] - p[0]) * (a2[1] - a1[1]) - (a1[1] - p[1]) * (a2[0] - a1[0]);
            });
            cek(lintang.every((c) => c > 0) || lintang.every((c) => c < 0), `${nm}: bangun di papan paku cembung dan tak berpotongan`);
          }
          const nomor = objs.filter((o) => /^pn\d+$/.test(o.id));
          if (nomor.length) cek(nomor.every((o, q) => o.isi === String(q + 1) && o.id === `pn${q}`) && nomor.length >= kr.length, `${nm}: nomor paku berurutan dari satu`);
        }
      }
    });
  }
}

/* ------------------------------ Isi tiap adegan dihitung ulang ------------------------------ */
const vertex = (objs, id) => poligonDari(objs).find((o) => o.id === id) && titikPoligon(ketemu(objs, id)).length;
const kuncikan = (objs, daftar) => daftar.map((id) => vertex(objs, id));
{
  // Sarang lebah: tujuh segi enam berdempetan yang berbagi sisi dengan segi enam di tengah.
  const sr = di("cerita-sarang", 0);
  const hs = Array.from({ length: 7 }, (_, q) => ketemu(sr, `sh${q}`));
  sama(hs.map((o) => titikPoligon(o).length), [6, 6, 6, 6, 6, 6, 6], "sarang lebah: tujuh segi enam");
  const t0 = titikPoligon(hs[0]);
  for (let q = 1; q < 7; q += 1) {
    const tq = titikPoligon(hs[q]);
    const sama2 = tq.filter((p) => t0.some((r) => dekat(p, r, 0.35))).length;
    stat.sarang += 1;
    cek(sama2 === 2, `sarang lebah: segi enam ${q} berbagi satu sisi (dua sudut) dengan yang tengah (ada ${sama2})`);
  }
  {
    const lg = di("cerita-sarang", 2);
    sama([vertex(lg, "bg"), isiTeks(lg, "bgsn5"), ketemu(lg, "bgs5") ? 6 : 0], [6, "6", 6], "cerita sarang: hitung enam sisi pada satu lubang");
    const lh = di("cerita-sarang", 3);
    sama([isiTeks(lh, "bg-jn"), isiTeks(lh, "bg-nm")], ["6 sisi", "segi enam"], "cerita sarang: segi enam punya 6 sisi");
    const lk = di("cerita-sarang", 4);
    sama([vertex(lk, "sg0"), vertex(lk, "sg1"), vertex(lk, "sg2"), ketemu(lk, "lg")?.t], [3, 4, 5, "bulat"], "cerita sarang: segitiga, segi empat, segi lima, lingkaran");
  }
  // Sisi dan pojok segitiga.
  {
    const p4 = di("sisi-pojok", 3);
    sama([vertex(p4, "sg"), [0, 1, 2].filter((q) => ketemu(p4, `sgs${q}`)).length], [3, 3], "sisi dan pojok: segitiga dengan tiga sisi tertanda");
    const p5 = di("sisi-pojok", 4);
    sama([[0, 1, 2].filter((q) => ketemu(p5, `sgd${q}`)).length, [0, 1, 2].filter((q) => ketemu(p5, `sgs${q}`)).length], [3, 0], "sisi dan pojok: tiga pojok tertanda");
    const p1 = di("sisi-pojok", 0);
    sama([vertex(p1, "t0"), vertex(p1, "t1"), ketemu(p1, "t2")?.t], [3, 4, "bulat"], "sisi dan pojok: tiga bentuk dasar");
  }
  // Segi banyak: empat bangun, banyak pojok sama dengan banyak sisi.
  {
    const b4 = di("segi-banyak", 3);
    sama(kuncikan(b4, ["sg0", "sg1", "sg2", "sg3"]), [3, 4, 5, 6], "segi banyak: segitiga, segi empat, segi lima, segi enam");
    sama([0, 1, 2, 3].map((i) => b4.filter((o) => new RegExp(`^sg${i}d\\d+$`).test(o.id)).length), [3, 4, 5, 6], "segi banyak: pojok sama dengan sisi pada tiap bangun");
    sama([0, 1, 2, 3].map((i) => isiTeks(di("segi-banyak", 1), `sg${i}-nm`)), ["segitiga", "segi empat", "segi lima", "segi enam"], "segi banyak: nama empat bangun");
  }
  // Bentuk lengkung: tanpa sisi lurus.
  {
    const l3 = di("lengkung", 2);
    sama([ketemu(l3, "lg")?.t, ketemu(l3, "tl")?.t, ketemu(l3, "ht")?.t, poligonDari(l3).length], ["bulat", "jalur", "jalur", 0], "lengkung: lingkaran, telur, hati tanpa sisi lurus");
    cek(["tl", "ht"].every((id) => /C/.test(ketemu(l3, id).d)), "lengkung: telur dan hati berkurva");
    cek(/^M[^]*C/.test(ketemu(di("lengkung", 0), "kv").d) && !/ L/.test(ketemu(di("lengkung", 0), "kv").d), "lengkung: kurva tanpa garis lurus");
  }
  // Memilah: tiga segi banyak di kotak kiri, tiga bentuk lengkung di kotak kanan.
  {
    const pa = di("pilah-dua", 4);
    const zona = (o) => (o.y > 98 && o.x > 6 && o.x < 144 ? 0 : o.y > 98 && o.x > 156 && o.x < 294 ? 1 : -1);
    const semua = ["pl0", "pl1", "pl2", "pl3", "pl4", "pl5"].map((id) => ketemu(pa, id));
    sama(semua.map(zona), semua.map((o) => (poligonDari([o]).length ? 0 : 1)), "pilah: segi banyak di kotak kiri dan bentuk lengkung di kotak kanan");
    sama([semua.filter((o) => zona(o) === 0).length, semua.filter((o) => zona(o) === 1).length], [3, 3], "pilah: tiga bentuk di tiap kotak");
    sama([vertex(pa, "pl0"), vertex(pa, "pl2"), vertex(pa, "pl4")], [3, 4, 5], "pilah: segitiga, segi empat, segi lima di kotak segi banyak");
    sama(["pl1", "pl3", "pl5"].map((id) => ketemu(pa, id).t), ["bulat", "jalur", "jalur"], "pilah: lingkaran, telur, hati di kotak lengkung");
    sama(["zl0", "zl1"].map((id) => isiTeks(pa, id)), ["Segi banyak", "Bentuk lengkung"], "pilah: judul dua kotak");
    stat.zona += 6;
    // Bentuk bergerak satu per satu: pada ketukan sebelumnya hanya sebagian sudah masuk kotak.
    const nMasuk = (ke) => ["pl0", "pl1", "pl2", "pl3", "pl4", "pl5"].map((id) => ketemu(di("pilah-dua", ke), id)).filter((o) => zona(o) >= 0).length;
    sama([nMasuk(1), nMasuk(2), nMasuk(3)], [1, 3, 6], "pilah: bentuk masuk kotak bertahap 1, 3, 6");
  }
  // Syarat segi banyak: hanya yang semua sisinya lurus.
  {
    const x = di("bukan-segi-banyak", 5);
    sama(["cb0", "cb1", "cb2", "cb3"].map((id) => (poligonDari([ketemu(x, id)]).length ? titikPoligon(ketemu(x, id)).length : 0)), [4, 0, 3, 0], "syarat segi banyak: segi empat dan segitiga lurus semua; dua bangun lain berkurva");
    sama(["cb1", "cb3"].map((id) => lengkungAda(ketemu(x, id))), [true, true], "syarat segi banyak: setengah lingkaran dan bawah melengkung punya kurva");
    sama(["cb0-ya", "cb1-tdk", "cb2-ya", "cb3-tdk"].map((id) => isiTeks(x, id)), ["✅", "❌", "✅", "❌"], "syarat segi banyak: tanda ya dan tidak");
    for (const tanda of x.filter((o) => /-(ya|tdk)$/.test(o.id))) {
      const b = ketemu(x, tanda.id.replace(/-(ya|tdk)$/, ""));
      stat.khusus += 1;
      cek(/-ya$/.test(tanda.id) ? poligonDari([b]).length === 1 : poligonDari([b]).length === 0, `syarat segi banyak: tanda ${tanda.id} cocok dengan bentuk`);
    }
  }
  // Membandingkan banyak sisi.
  {
    const y = di("bandingkan-sisi", 3);
    sama([vertex(y, "bp0"), vertex(y, "bp1"), isiTeks(y, "bp0-jn"), isiTeks(y, "bp1-jn"), isiTeks(y, "bd-t0")], [5, 6, "5 sisi", "6 sisi", "6 lebih banyak dari 5"], "bandingkan: segi enam enam sisi lebih banyak dari segi lima lima sisi");
    sama(isiTeks(di("bandingkan-sisi", 4), "sl-t0"), "selisih 1 sisi", "bandingkan: selisih satu sisi");
  }
  // Menghitung sisi: segitiga, segi empat (dua rupa), segi lima, segi enam.
  {
    const h6 = di("hitung-sisi", 5);
    sama([vertex(h6, "j0"), vertex(h6, "j1"), isiTeks(h6, "j0-nm"), isiTeks(h6, "j1-nm")], [4, 4, "segi empat", "segi empat"], "hitung sisi: dua segi empat berbeda rupa tetap empat sisi");
    cek(titikPoligon(ketemu(h6, "j0")).join() !== titikPoligon(ketemu(h6, "j1")).join(), "hitung sisi: dua segi empat berbeda ukuran");
    sama([vertex(di("hitung-sisi", 2), "h0"), vertex(di("hitung-sisi", 3), "h1")], [3, 4], "hitung sisi: segitiga tiga sisi, segi empat empat sisi");
    const i2 = di("segi-lima-enam", 4);
    sama([vertex(i2, "i0"), vertex(i2, "i1"), isiTeks(i2, "i0-nm"), isiTeks(i2, "i1-nm"), isiTeks(i2, "i0-jn"), isiTeks(i2, "i1-jn")], [5, 6, "segi lima", "segi enam", "5 sisi", "6 sisi"], "segi lima dan segi enam: sisi dan nama");
    sama(vertex(di("segi-lima-enam", 2), "rb"), 5, "segi lima: rumah burung berbentuk segi lima");
  }
  // Pola nama: baris demi baris.
  {
    const pn = di("pola-nama", 3);
    sama([0, 1, 2, 3].map((i) => [vertex(pn, `pn${i}`), isiTeks(pn, `pn${i}-jn`), isiTeks(pn, `pn${i}-nm`)]), [[3, "3 sisi", "segitiga"], [4, "4 sisi", "segi empat"], [5, "5 sisi", "segi lima"], [6, "6 sisi", "segi enam"]], "pola nama: banyak sisi dan nama");
  }
  // Lingkaran lawan telur dan hati: cetak dan putar.
  {
    const c3 = di("lingkaran-putar", 2);
    sama([ketemu(c3, "lg").r, ketemu(c3, "lg-cap").r, ketemu(c3, "lg-cap").putus], [38, 38, true], "lingkaran: cap berjari-jari sama");
    const c4 = di("lingkaran-putar", 3);
    sama([ketemu(c4, "pt").rot, pas(ketemu(c4, "lg"))], [300, true], "lingkaran: diputar ke mana pun tetap pas");
    const c5 = di("lingkaran-putar", 4);
    const c6 = di("lingkaran-putar", 5);
    sama([pas(ketemu(c5, "tl")), ketemu(c5, "tl").rot ?? 0, pas(ketemu(c6, "tl")), ketemu(c6, "tl").rot], [true, 0, false, 90], "telur: tegak di atas cap pas, setelah diputar seperempat tidak pas");
    const tl = batasKurva(ketemu(c6, "tl"));
    cek(tl.a > tl.b + 5, "telur: panjang lebih dari lebar (bagian keluar dari cap saat diputar)");
    const c7 = di("lingkaran-putar", 6);
    sama([isiTeks(c7, "lg-ok"), isiTeks(c7, "tl-no"), pas(ketemu(c7, "lg")), pas(ketemu(c7, "tl")), isiTeks(c7, "lg-nm"), isiTeks(c7, "tl-nm")], ["✅", "❌", true, false, "lingkaran", "telur"], "perbandingan: hanya lingkaran yang selalu pas");
    const c2 = di("lingkaran-putar", 1);
    sama([ketemu(c2, "lg").r, objs6(c2)], [44, 6], "lingkaran: enam jari-jari sama panjang dari titik tengah");
    stat.khusus += 6;
  }
  // Temukan bentuk pada benda di layar.
  {
    const t7 = di("temukan-bentuk", 5);
    sama(kuncikan(t7, ["bn0", "bn1", "bn2", "bn3"]), [3, 4, 5, 6], "temukan bentuk: rambu 3, bendera 4, rumah burung 5, sarang lebah 6 sisi");
    sama([ketemu(t7, "bn4").t, jenisBentuk(ketemu(t7, "bn5")), isiTeks(t7, "bn4-nm"), isiTeks(t7, "bn5-nm")], ["bulat", "bentuk lengkung", "lingkaran", "lengkung"], "temukan bentuk: jam dinding lingkaran dan telur lengkung");
    sama([0, 1, 2, 3].map((i) => isiTeks(t7, `bn${i}-nm`)), ["segitiga", "segi empat", "segi lima", "segi enam"], "temukan bentuk: nama empat segi banyak");
    sama(Array.from({ length: 6 }, (_, q) => isiTeks(t7, `bn${q}-bd`)), ["rambu", "bendera", "rumah burung", "sarang lebah", "jam dinding", "telur"], "temukan bentuk: enam benda");
  }
  // Latihan: jawaban dihitung dari gambar.
  {
    const n1 = vertex(di("latihan-satu", 1), "bg");
    const a1 = di("latihan-satu", 3);
    sama([n1, pilih(a1).map((c) => c.t), dipilih(a1), isiTeks(a1, "bg-nm")], [5, ["segi empat", "segi lima", "segi enam"], [NAMA_SEGI[n1]], "segi lima"], "latihan 1: bangun lima sisi dinamakan segi lima dan jawaban itu dipilih");
    sama([0, 1, 2, 3, 4].filter((q) => ketemu(di("latihan-satu", 1), `bgs${q}`)).length, 5, "latihan 1: lima sisi dihitung");
    stat.jawaban += 1;
    const h = ketemu(di("latihan-dua", 0), "ht");
    const a2 = di("latihan-dua", 3);
    const jawab2 = lengkungAda(h) && h.t !== "bulat" ? "bentuk lengkung" : "segi banyak";
    sama([pilih(a2).map((c) => c.t), dipilih(a2), jawab2], [["segi banyak", "lingkaran", "bentuk lengkung"], ["bentuk lengkung"], "bentuk lengkung"], "latihan 2: hati termasuk bentuk lengkung dan jawaban itu dipilih");
    stat.jawaban += 1;
    const n3 = vertex(di("latihan-tiga", 0), "hx");
    const a3 = di("latihan-tiga", 3);
    sama([n3, pilih(a3).map((c) => c.t), dipilih(a3), isiTeks(a3, "hx-nm"), [0, 1, 2, 3, 4, 5].filter((q) => ketemu(di("latihan-tiga", 1), `hxs${q}`)).length], [6, ["5", "6", "7"], ["6"], "segi enam", 6], "latihan 3: lubang sarang enam sisi dan jawaban 6 dipilih");
    stat.jawaban += 1;
  }
  // Metode luar: van Hiele Visual.
  {
    const v3 = di("luar-visual", 2);
    sama(kuncikan(v3, ["v0", "v1", "v2"]), [3, 3, 3], "visual: tiga segitiga tinggi, lebar, miring");
    cek(new Set(["v0", "v1", "v2"].map((id) => titikPoligon(ketemu(v3, id)).map((p) => p.join()).sort().join("|"))).size === 3, "visual: tiga segitiga berbeda rupa");
    cek(ketemu(v3, "v2").d !== ketemu(v3, "v1").d && ["v0", "v1", "v2"].every((id) => isiTeks(v3, `${id}-nm`) === "segitiga"), "visual: semuanya bernama segitiga");
    const v4 = di("luar-visual", 3);
    sama([vertex(v4, "w0"), vertex(v4, "w1"), isiTeks(v4, "w0-nm"), isiTeks(v4, "w1-nm"), poligonDari(v4).length], [4, 4, "segi empat", "segi empat", 2], "visual: dua segi empat, satu tegak dan satu miring");
    const w = di("luar-visual-terapan", 3);
    const rf = vertex(w, "rf");
    const opsi = ["o1", "o2", "o3"].map((id) => (ketemu(w, id).t === "bulat" ? 0 : vertex(w, id)));
    const dip = [1, 2, 3].filter((q) => ketemu(w, `c${q}-k`).sorot);
    sama([rf, opsi, dip, opsi.filter((x) => x === rf).length, opsi[dip[0] - 1]], [5, [6, 5, 0], [2], 1, rf], "visual terapan: pilihan kedua satu-satunya segi lima, sama dengan contoh, dan dipilih");
    sama([isiTeks(w, "rf-jn"), isiTeks(w, "rf-nm")], ["5 sisi", "segi lima"], "visual terapan: contoh segi lima");
    cek(ketemu(w, "o2").d !== ketemu(w, "rf").d, "visual terapan: pilihan benar diputar (tidak sama persis dengan contoh)");
    stat.jawaban += 1;
  }
  // Metode luar: Pilah Ciri.
  {
    const p5 = di("luar-pilah", 4);
    const kol = (o) => [0, 1, 2, 3].find((c) => o.x > 8 + 72 * c && o.x < 8 + 72 * c + 68 && o.y > 112 && o.y < 192) ?? -1;
    const sh = ["mp0", "mp1", "mp2", "mp3", "mp4", "mp5"].map((id) => ketemu(p5, id));
    sama(sh.map((o) => titikPoligon(o).length), [6, 3, 4, 5, 3, 6], "pilah ciri: bangun campuran enam, tiga, empat, lima, tiga, enam");
    sama(sh.map(kol), sh.map((o) => titikPoligon(o).length - 3), "pilah ciri: tiap bangun di kolom sesuai banyak sisinya");
    sama([0, 1, 2, 3].map((c) => isiTeks(p5, `kh${c}`)), ["3 sisi", "4 sisi", "5 sisi", "6 sisi"], "pilah ciri: judul kolom tiga sampai enam sisi");
    sama([0, 1, 2, 3].map((c) => sh.filter((o) => kol(o) === c).length), [2, 1, 1, 2], "pilah ciri: isi kolom 2, 1, 1, 2");
    stat.kolom += 6;
    const nMasuk = (ke) => ["mp0", "mp1", "mp2", "mp3", "mp4", "mp5"].map((id) => ketemu(di("luar-pilah", ke), id)).filter((o) => kol(o) >= 0).length;
    sama([nMasuk(2), nMasuk(3), nMasuk(4)], [0, 3, 6], "pilah ciri: bangun masuk kolom bertahap 0, 3, 6");
    const q4 = di("luar-pilah-terapan", 3);
    const nq = vertex(q4, "pt");
    sama([nq, pilih(q4).map((c) => c.t), dipilih(q4), isiTeks(q4, "pt-nm"), [0, 1, 2, 3, 4, 5].filter((q) => ketemu(di("luar-pilah-terapan", 1), `pts${q}`)).length], [6, ["3 sisi", "5 sisi", "6 sisi"], [`${nq} sisi`], "segi enam", 6], "pilah ciri terapan: bangun enam sisi masuk kolom enam sisi dan dipilih");
    stat.jawaban += 1;
  }
  // Metode luar: Papan Paku.
  {
    const pegs = (objs) => (kr) => kaki(kr)[0].map((v) => Math.round(v));
    void pegs;
    const sudutDariPaku = (b, c) => [99 + c * 34, 64 + b * 34];
    const k3 = di("luar-paku", 2);
    const t3 = titikPoligon(ketemu(k3, "pk"));
    sama([t3.length, isiTeks(k3, "pk-nm"), ["kr0", "kr1", "kr2"].every((id) => ketemu(k3, id))], [3, "segitiga", true], "papan paku: tiga karet membentuk segitiga");
    sama(t3.map((p) => p.join()), [[3, 0], [3, 2], [1, 1]].map(([b, c]) => sudutDariPaku(b, c).join()), "papan paku: segitiga pada paku (3,0), (3,2), (1,1)");
    const k4 = di("luar-paku", 3);
    sama([titikPoligon(ketemu(k4, "pk")).length, isiTeks(k4, "pk-nm"), objsKr(k4), objsPn(k4)], [4, "segi empat", 4, 4], "papan paku: empat karet empat paku membentuk segi empat");
    const k5 = di("luar-paku", 4);
    sama(k5.filter((o) => /^pg\d\d$/.test(o.id) && o.sorot).length, 4, "papan paku: empat paku disorot sebagai empat pojok");
    const m4 = di("luar-paku-terapan", 3);
    sama([titikPoligon(ketemu(m4, "pk")).length, objsKr(m4), objsPn(m4), m4.filter((o) => /^kr\d+$/.test(o.id) && o.sorot).length], [5, 5, 5, 1], "papan paku terapan: lima paku, lima karet, satu sisi disorot");
    const m5 = di("luar-paku-terapan", 4);
    sama([isiTeks(m5, "pk-nm"), objsKr(m5)], ["segi lima", 5], "papan paku terapan: segi lima");
    sama(titikPoligon(ketemu(m5, "pk")).map((p) => p.join()), [[3, 0], [3, 2], [1, 3], [0, 2], [1, 0]].map(([b, c]) => sudutDariPaku(b, c).join()), "papan paku terapan: segi lima pada lima paku");
    stat.khusus += 4;
  }
}
function objs6(o) { return o.filter((x) => /^jr\d+$/.test(x.id)).length; }
function objsKr(o) { return o.filter((x) => /^kr\d+$/.test(x.id)).length; }
function objsPn(o) { return o.filter((x) => /^pn\d+$/.test(x.id)).length; }

// Pilihan jawaban umum: tiga pilihan berbeda; paling banyak satu disorot.
for (const v of VIDEO) {
  for (const a of v.adegan) {
    a.ketukan.forEach((kt, i) => {
      const objs = akhirAdegan(a, i);
      const pil = pilih(objs).filter((c) => /^c[123]-t$/.test("c1-t"));
      const ada = pilih(objs);
      void pil;
      if (ada.length && /^latihan-|luar-.*terapan$/.test(a.id) && !/^luar-visual-terapan$/.test(a.id)) {
        cek(ada.length === 3 && new Set(ada.map((c) => c.t)).size === 3, `${v.id}/${a.id}#${i + 1}: tiga pilihan jawaban berbeda`);
        cek(dipilih(objs).length <= 1, `${v.id}/${a.id}#${i + 1}: paling banyak satu jawaban disorot`);
      }
    });
  }
}
console.log(`Pemeriksaan bentuk: ${stat.poligon} bangun, ${stat.label} nama, ${stat.sisi} sisi, ${stat.sudut} pojok, ${stat.rantai} hitungan suara, ${stat.nama} sebutan, ${stat.jn} teks hitung, ${stat.cap} cap, ${stat.paku} keadaan papan paku, ${stat.sarang} sisi sarang, ${stat.jawaban} jawaban, ${stat.khusus} khusus`);

/* ------------------------------ Aturan pemilik ------------------------------ */
{
  const MANDIRI = /kerja kelompok|berkelompok|secara berkelompok|diskusi kelompok|sekelompok|kelompokmu|kelompok belajar|bersama kelompok|tanya teman|survei|karet gelang|uang tabungan|uang logam|\bpaman\b|\btika\b|\bteman\w*|\bkawan\w*|sekawan|depan kelas|bersama kelas|seluruh kelas|\bkelas\b|berpasangan dengan (teman|kawan)|bekerja berpasangan|secara berpasangan|bermain bersama|bertanya kepada|buat ceritamu|buku|menulis di|menuliskan di|tulis di|tuliskan di|menggambar|gambarlah|gambar sendiri|\bbawa(lah)?\b|membawa|dibawa|\bkertas\b|\bpensil\b|\bpulpen\b|\bspidol\b|\bgunting\b|ambil (benda|pensil|kelereng|bola|sedotan|balon|kerucut|kubus)|tangan (kiri|kanan)|\bjari\b|menyuruh|suruh|jengkal|telapak|\bdepa\b|penggaris|\bkoin\b|di sekitar|di rumah|di kelas|centimeter|\bmeter\b|kakimu|tanganmu|badanmu|\braba\w*|\bmeraba|\btubuh|\blengan|lingkari|coret|guru kelas|orang tua|\bayah\b|\bibu guru|bapak guru|\bloker\b|singapura|\bmeja\b|di sekitarmu/i;
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      const semua = [a.judul, a.sumber];
      a.ketukan.forEach((kt, i) => {
        semua.push(kt.suara);
        semua.push(...L.teksTerlihat(L.keadaanStory(a, i, 9999)));
      });
      const kena = semua.filter((t) => MANDIRI.test(t));
      cek(kena.length === 0, `${v.id}/${a.id}: narasi mandiri dan digital, tanpa kelompok, teman, kelas, buku, kertas, pensil, gunting, koin, atau benda nyata (${kena.slice(0, 2).join(" | ")})`);
    }
  }
}

/* ------------------------------ Sapaan dan peta susun ------------------------------ */
{
  const sap = adegan(M_VIDEO, "sapaan");
  const DAFTAR = ["Segi banyak dan lengkung", "Menghitung sisi lalu menamai", "Lingkaran yang bisa berputar"];
  cek(/Halo anak-anak/.test(sap.ketukan[0].suara) && /Segi banyak dan lengkung/i.test(L.teksTerlihat(akhirAdegan(sap, 1)).join(" | ")), "sapaan materi: tiga hal yang dipelajari tampil");
  sama(L.teksTerlihat(akhirAdegan(sap, 1)).filter((t) => DAFTAR.includes(t)), DAFTAR, "sapaan materi: daftar tiga hal");
  cek(!/\d/.test(sap.ketukan[1].suara) && !/\d/.test(DAFTAR.join(" ")), "sapaan materi: tanpa angka");
  const sapLuar = adegan(U, "sapaan");
  cek(/cara lain/i.test(L.teksTerlihat(akhirAdegan(sapLuar, 1)).join(" | ")) && /metode-luar|Metode luar/.test(sapLuar.sumber), "sapaan metode luar: pengumuman cara lain");
  const ringkasBerkas = new URL("../src/data/kelas2-bab3-ringkas.json", import.meta.url);
  const sumberRingkas = existsSync(ringkasBerkas) ? JSON.parse(readFileSync(ringkasBerkas, "utf8")).subBab?.A : null;
  const sementara = new URL("../.tmp-k2b3s/A.json", import.meta.url);
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
    // Isi tabel dihitung ulang dari bangun yang bernama pada video materi.
    sama(T.kolom, ["Sisi", "Pojok", "Contoh"], "tabel susun: kolom sisi, pojok, contoh");
    const bentukBernama = new Map();
    const teksMateri = new Set();
    for (const a of M_VIDEO.adegan) for (let i = 0; i < a.ketukan.length; i += 1) {
      const objs = akhirAdegan(a, i);
      for (const o of objs.filter((q) => q.t === "teks" && /-nm$/.test(q.id))) {
        const b = objs.find((q) => q.id === o.id.replace(/-nm$/, ""));
        if (b && titikJalur(b)) bentukBernama.set(o.isi, titikJalur(b).length);
      }
      for (const t of L.teksTerlihat(objs)) teksMateri.add(t.toLowerCase());
    }
    const lengkapSuara = M_VIDEO.adegan.flatMap((a) => a.ketukan.map((kt) => kt.suara.toLowerCase())).join(" ");
    const CONTOH = { Segitiga: "rambu", "Segi empat": "bendera", "Segi lima": "rumah", "Segi enam": "sarang" };
    sama(T.baris.map((b) => b.label), ["Segitiga", "Segi empat", "Segi lima", "Segi enam"], "tabel susun: baris segitiga sampai segi enam");
    for (const b of T.baris) {
      const n = bentukBernama.get(b.label.toLowerCase());
      cek(n !== undefined, `tabel susun: ${b.label} tampil bernama pada video materi`);
      cek(b.sel[0] === `${n} sisi` && b.sel[1] === `${n} pojok`, `tabel susun: ${b.label} bertitik sudut ${n} bersisi dan berpojok ${n} (sel ${b.sel[0]}, ${b.sel[1]})`);
      cek(b.sel[2] === CONTOH[b.label] && lengkapSuara.includes(b.sel[2]), `tabel susun: contoh ${b.label} (${b.sel[2]}) disebut pada video materi`);
    }
    const KATA_LARANG = /buku|halaman|kunci|kerja kelompok|berkelompok|\bteman|kawan|kelas\b|kertas|pensil|\bbawa\b|menggambar|menulis di|depan kelas|\bluas\b|keliling|di rumah|survei|karet gelang|uang tabungan|di sekitar|\bpaman\b|\btika\b|loker|ibu guru|singapura|attribute sort|geoboard|compose|decompose/i;
    cek(!KATA_LARANG.test(JSON.stringify({ p: A.petaSusun, t: A.tabelSusun })), "peta dan tabel susun: tanpa kata terlarang dan tanpa nama Inggris, kelompok, teman, kelas, buku, kertas, pensil, loker, Ibu guru");
    cek(peta.every((s) => ![...s.teks, ...(s.ikon ?? "")].some((c) => c.codePointAt(0) > 0x1fa95)), "peta susun: emoji paling tinggi Emoji 12");
  } else cek(false, "peta dan tabel susun: .tmp-k2b3s/A.json atau kelas2-bab3-ringkas.json subBab.A.petaSusun ada");
}

console.log(`${VIDEO.map((v) => `${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, a) => t + a.ketukan.length, 0)} ketukan, ${kataVideo(v)} kata (sekitar ${(kataVideo(v) / 120).toFixed(1)} menit diputar)`).join("\n")}`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
