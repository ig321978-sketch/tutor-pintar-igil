// Uji Story Kelas 3 Bab 1 Sub-Bab D (Penjumlahan sampai 100): dua video (materi kurikulum dan metode luar) dengan mesin animasi Story.
// Video diputar bergaya guru: suara, teks terlihat, sumber, judul adegan, dan subjudul tanpa penyebutan buku (kata terlarang diperiksa pada adegan yang diputar).
// Memeriksa: pemicu kata, suara tanpa digit, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas, teks bertumpuk, pemisahan materi dan metode luar (nama metode hanya Indonesia),
// dan HITUNG ULANG dari struktur adegan: susun pendek (digit atas dan bawah, jumlah satuan, simpanan, hasil puluhan, catatan satuan dan puluhan), blok bilangan (batang dan kotak sama dengan bilangan),
// satuan lepas dan tukaran sepuluh satuan (nilai total tetap), tabel nilai tempat, tokoh dan banyaknya, hitungan tertulis (a + b = c), kalimat di suara (a ditambah b sama dengan c, bilangan diurai,
// satuan dan puluhan, pecahan bilangan, banyak langkah maju), garis bilangan (mulai dari bilangan lebih besar, loncatan), pecahan bilangan (pasangan sepuluh), susun panjang sama dengan susun pendek,
// jawaban latihan (satu pilihan benar dan disorot), isi tabel susun, dan emoji paling tinggi Emoji 12.
// Jalankan: node --no-warnings scripts/uji-story-k3b1D.mjs
import { readFileSync, existsSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k3b1D-video.ts");
const U1 = await import("../src/components/modul/story/k3b1D-luar-1.ts");

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
const VIDEO = [V.VIDEO_MATERI_K3B1D, V.VIDEO_LUAR_K3B1D];
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
            const n = bilangan(o.d ?? "");
            const px = n.filter((_, q) => q % 2 === 0).map((q) => x + q);
            const py = n.filter((_, q) => q % 2 === 1).map((q) => y + q);
            cek(px.every((p) => p > -2 && p < 302) && py.every((p) => p > -2 && p < 204), `${nama}#${i + 1}: angka tulisan ${o.id} masuk kanvas`);
          }
        } else if (o.t === "garis" || o.t === "panah") cek(x > -2 && x < 302 && y > -2 && y < 204 && x + (o.x2 ?? 0) > -2 && x + (o.x2 ?? 0) < 302 && y + (o.y2 ?? 0) > -2 && y + (o.y2 ?? 0) < 204, `${nama}#${i + 1}: garis ${o.id} masuk kanvas`);
      }
      {
        const teksAda = akhir.filter((o) => o.t === "teks" && (o.op ?? 1) > 0 && o.isi && !/^[\u{1F000}-\u{1FFFF}]|^[✂✅❌➕❓]$/u.test(o.isi));
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
const M_VIDEO = V.VIDEO_MATERI_K3B1D;
const U = V.VIDEO_LUAR_K3B1D;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const NAMA_LUAR = /Penjumlahan Bersusun|Pasangan Bilangan|Menghitung Maju|metode luar|metode dari luar/i;
const NAMA_INGGRIS = /Standard Addition|Number Bond|Counting On|Singapore Math|Van de Walle|Algorithms/i;
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M_VIDEO);
  const luar = teksVideo(U);
  cek(!NAMA_LUAR.test(materi), "video materi tidak memuat nama metode luar ");
  for (const m of U1.NAMA_METODE_ID) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE_ID, ["Penjumlahan Bersusun", "Pasangan Bilangan", "Menghitung Maju"], "nama Indonesia metode luar (namaId data)");
  cek(!NAMA_INGGRIS.test(materi) && !NAMA_INGGRIS.test(luar), "nama metode hanya bahasa Indonesia (tanpa Standard Addition, Number Bond, Counting On)");
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
      cek(!/\b(Tika|Lili|Paman|Ibu|Ayah|Bapak|Budi|Ani|Doni|Sinta|Dewi|Rudi|Nina|Andi|Siti|Bu Guru|Pak Guru|Pak|Ahmad|Alfa|Galih|Alen|Meutia|Bandi)\b/.test(semua.join(" | ")), `${v.id}/${a.id}: hanya enam tokoh tetap`);
      cek(semua.every((t) => ![...t].some((c) => c.codePointAt(0) > 0x1fa95)), `${v.id}/${a.id}: emoji paling tinggi Emoji 12`);
    }
  }
  cek(M_VIDEO.subjudul === "Materi kurikulum" && U.subjudul === "Tiga metode luar", "subjudul video: Materi kurikulum dan Tiga metode luar");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 46), "video materi: label sumber berbentuk Materi: ... dan pendek");
  cek(U.adegan.every((a) => /Metode luar|Ringkasan/i.test(a.sumber) && a.sumber.length <= 46), "video metode luar: label sumber metode luar atau ringkasan, pendek");
  cek(M_VIDEO.id === "k3b1D-materi" && U.id === "k3b1D-luar", "id video k3b1D-materi dan k3b1D-luar");
  cek(U.judul.endsWith(": Metode dari Luar") && !/menurut/i.test(M_VIDEO.judul), "judul video: materi tanpa 'menurut', luar berakhir ': Metode dari Luar'");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,cerita-kelereng,nilai-tempat,susun-pendek,periksa-blok,tanpa-simpan-dua,tukar-sepuluh,simpan-satuan,simpan-puluhan,simpan-contoh,panjang-urai,panjang-jumlah,panjang-sama,tiga-bilangan,soal-cerita,pilih-cara,latihan-satu,latihan-dua,latihan-tiga,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-bersusun,luar-bersusun-terapan,luar-pasangan,luar-pasangan-terapan,luar-maju,luar-maju-terapan,luar-ringkas", "urutan adegan metode luar");
  cek(M_VIDEO.adegan[0].id === "sapaan" && U.adegan[0].id === "sapaan", "tiap video dibuka adegan sapaan");
  cek(M_VIDEO.adegan.filter((a) => /^latihan-/.test(a.id)).length === 3 && M_VIDEO.adegan[M_VIDEO.adegan.length - 1].id === "penutup", "video materi: Latihan 1 sampai 3 lalu penutup");
  cek(U.adegan[1].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  cek(U.adegan.length - 3 === 6, "video metode luar: konsep dan penerapan untuk tiga metode (6 adegan di antara pembuka dan ringkasan)");
  for (const kata of ["Latihan", "Igil", "Halim", "Kira", "Wei", "Upe", "Malosi", "susun pendek", "susun panjang", "puluhan", "satuan", "menyimpan", "diurai", "tiga bilangan", "soal cerita", "kelereng", "stiker", "jeruk", "bunga", "jumlah", "tukar sepuluh satuan"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  // Batas bab: penjumlahan dua bilangan sampai seratus; tanpa pengurangan, perkalian, pembagian, satuan baku, ratusan.
  const BOCOR = /kilogram|\bgram\b|\bkg\b|dikali|perkalian|pembagian|dibagi|dikurangi|pengurangan|rumus|ribu|\bratus|×|÷|−|\bmeter\b|\bliter\b/i;
  for (const v of [M_VIDEO, U]) {
    for (const a of v.adegan) cek(!BOCOR.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa satuan baku, rumus, perkalian, pembagian, ratusan`);
    for (const a of v.adegan) for (const i of a.ketukan.keys()) for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) for (const b of bilanganDari(t)) cek(Number(b) <= 100, `${v.id}/${a.id}#${i + 1}: angka di gambar paling besar seratus ("${t}")`);
  }
  const ketMateri = M_VIDEO.adegan.reduce((t, ad) => t + ad.ketukan.length, 0);
  cek(totalKetukan >= 70 && ketMateri >= 70, `total ketukan cukup dalam (${totalKetukan}; materi ${ketMateri})`);
  const kataMateri = kataVideo(M_VIDEO);
  cek(kataMateri / 120 >= 8 && kataMateri / 120 <= 13, `durasi materi diputar 8 sampai 13 menit (${(kataMateri / 120).toFixed(1)} menit)`);
  cek(kataVideo(U) / 120 >= 3, `durasi video luar paling sedikit 3 menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
}

/* ------------------------------ Penjumlahan dihitung ulang dari struktur adegan ------------------------------ */
const stat = { susun: 0, blok: 0, lepas: 0, nt: 0, tokoh: 0, aritm: 0, klaim: 0, pilihan: 0, jawaban: 0, garisBil: 0, pecah: 0, tabel: 0 };
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const U9 = "satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan";
const NILAI9 = { satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8, sembilan: 9, sepuluh: 10 };
const NUMW = `(?:seratus|sepuluh|sebelas|(?:${U9}) belas|(?:${U9}) puluh(?: (?:${U9}))?|${U9})(?![a-z])`;
const nilaiKata = (s) => {
  const t = s.toLowerCase().trim();
  if (t === "seratus") return 100;
  if (t === "sepuluh") return 10;
  if (t === "sebelas") return 11;
  let m = /^(\w+) belas$/.exec(t);
  if (m) return 10 + NILAI9[m[1]];
  m = /^(\w+) puluh(?: (\w+))?$/.exec(t);
  if (m) return 10 * NILAI9[m[1]] + (m[2] ? NILAI9[m[2]] : 0);
  return NILAI9[t] ?? null;
};
const semuaNum = (s) => [...s.matchAll(new RegExp(NUMW, "g"))].map((m) => nilaiKata(m[0]));
const hitungAritm = (s) => {
  const m = /^(\d+(?: [+-] \d+)+) = (\d+)$/.exec(s);
  if (!m) return null;
  const t = m[1].split(" ");
  let v = Number(t[0]);
  for (let i = 1; i < t.length; i += 2) v = t[i] === "+" ? v + Number(t[i + 1]) : v - Number(t[i + 1]);
  return { ok: v === Number(m[2]), angka: t.filter((_, i) => i % 2 === 0).map(Number), ops: t.filter((_, i) => i % 2 === 1), hasil: Number(m[2]) };
};
const angkaDi = (objs, id) => {
  const o = ketemu(objs, id);
  return o && /^\d+$/.test(o.isi ?? "") ? Number(o.isi) : null;
};

/** Susun pendek `ls-*`. */
const bacaKolom = (objs) => {
  const at = angkaDi(objs, "ls-a-t");
  const as = angkaDi(objs, "ls-a-s");
  const bt = angkaDi(objs, "ls-b-t");
  const bs = angkaDi(objs, "ls-b-s");
  const ht = angkaDi(objs, "ls-h-t");
  const hs = angkaDi(objs, "ls-h-s");
  const sim = angkaDi(objs, "ls-sim");
  const ada = [at, as, bt, bs, ht, hs, sim].some((q) => q !== null) || !!ketemu(objs, "ls-gar");
  const a = at !== null && as !== null ? at * 10 + as : null;
  const b = bt !== null && bs !== null ? bt * 10 + bs : null;
  const hasil = ht !== null && hs !== null ? ht * 10 + hs : null;
  return { ada, at, as, bt, bs, ht, hs, sim, a, b, hasil };
};
/** Blok bilangan `bk-*`: batang, kotak, label, keterangan. */
const bacaBlok = (objs) => {
  const peta = new Map();
  for (const o of objs) {
    const m = /^bk-([a-z]+)-(p|s)(\d+)$/.exec(o.id) ?? /^bk-([a-z]+)-(n|k)$/.exec(o.id);
    if (!m) continue;
    if (!peta.has(m[1])) peta.set(m[1], { p: [], s: [], n: null, ket: null });
    const g = peta.get(m[1]);
    if (m[2] === "p") g.p.push(Number(m[3]));
    else if (m[2] === "s") g.s.push(Number(m[3]));
    else if (m[2] === "n") g.n = Number(o.isi);
    else g.ket = o.isi;
  }
  for (const g of peta.values()) {
    g.p.sort((x, y) => x - y);
    g.s.sort((x, y) => x - y);
  }
  return peta;
};
const tampak = (objs) => {
  const s = new Set();
  for (const o of objs) if (o.t === "teks" && o.isi && (o.op ?? 1) > 0) for (const b of bilanganDari(o.isi)) s.add(Number(b));
  const c = bacaKolom(objs);
  for (const x of [c.a, c.b, c.hasil]) if (x !== null) s.add(x);
  for (const g of bacaBlok(objs).values()) {
    s.add(g.p.length);
    s.add(g.s.length);
    if (g.n !== null) s.add(g.n);
  }
  return s;
};
const hitungKolomSemua = new Set();

for (const v of VIDEO) {
  for (const a of v.adegan) {
    const totalNilai = [];
    a.ketukan.forEach((kt, i) => {
      const objs = akhirAdegan(a, i);
      const nm = `${v.id}/${a.id}#${i + 1}`;
      const t = kt.suara.toLowerCase();
      const lihat = tampak(objs);
      /* 1) Susun pendek. */
      const c = bacaKolom(objs);
      if (c.ada) {
        stat.susun += 1;
        cek(c.a !== null && c.b !== null, `${nm}: susun pendek punya bilangan atas dan bawah lengkap`);
        if (c.a !== null && c.b !== null) {
          hitungKolomSemua.add(`${c.a}+${c.b}`);
          const sat = c.as + c.bs;
          const simpan = Math.floor(sat / 10);
          cek(c.a + c.b <= 100 && c.at > 0 && c.bt > 0, `${nm}: dua bilangan dua angka dengan jumlah paling besar seratus`);
          if (c.hs !== null) cek(c.hs === sat % 10, `${nm}: angka satuan hasil (${c.hs}) sama dengan sisa jumlah satuan (${sat % 10})`);
          if (c.sim !== null) cek(c.sim === simpan && simpan >= 1, `${nm}: simpanan ${c.sim} sama dengan banyak puluhan dari jumlah satuan (${simpan})`);
          if (c.ht !== null) {
            cek(c.hs !== null, `${nm}: hasil satuan sudah ada sebelum hasil puluhan`);
            cek(simpan === 0 || c.sim !== null, `${nm}: simpanan tampak bila jumlah satuan sepuluh atau lebih`);
            cek(c.ht === c.at + c.bt + simpan, `${nm}: hasil puluhan (${c.ht}) = ${c.at} + ${c.bt} + simpanan ${simpan}`);
          }
          if (c.hasil !== null) cek(c.hasil === c.a + c.b, `${nm}: hasil susun pendek ${c.hasil} sama dengan ${c.a} + ${c.b}`);
          const eqS = ketemu(objs, "eq-s");
          if (eqS) cek(eqS.isi === `${c.as} + ${c.bs} = ${sat}`, `${nm}: catatan satuan "${eqS.isi}" sesuai digit satuan (${c.as} + ${c.bs} = ${sat})`);
          const eqP = ketemu(objs, "eq-p");
          if (eqP) {
            const r = hitungAritm(eqP.isi);
            const harap = [...(simpan > 0 ? [simpan] : []), c.at, c.bt].sort((x, y) => x - y).join();
            cek(!!r && r.ok && [...r.angka].sort((x, y) => x - y).join() === harap && r.hasil === c.at + c.bt + simpan, `${nm}: catatan puluhan "${eqP.isi}" sesuai digit puluhan dan simpanan (${harap})`);
          }
          const sim = ketemu(objs, "ket-sim");
          if (sim) cek(sim.isi === `${simpan} puluhan`, `${nm}: keterangan simpanan "${sim.isi}" sesuai simpanan ${simpan}`);
          const sor = ketemu(objs, "ls-sor");
          if (sor) cek(sor.x < 134 + 20 && sor.w === 30, `${nm}: sorotan kolom`);
        }
      }
      /* 2) Blok bilangan. */
      for (const [g, b] of bacaBlok(objs)) {
        stat.blok += 1;
        cek(b.p.every((q, r) => q === r + 1) && b.s.every((q, r) => q === r + 1), `${nm}: blok ${g} bernomor 1, 2, 3 ... berurutan`);
        cek(b.p.length <= 9 && b.s.length <= 9, `${nm}: blok ${g} paling banyak sembilan batang dan sembilan kotak`);
        if (b.n !== null) cek(b.n === 10 * b.p.length + b.s.length, `${nm}: label blok ${g} (${b.n}) sama dengan ${b.p.length} batang dan ${b.s.length} kotak`);
        if (b.ket !== null) cek(b.ket === `${b.p.length} puluhan, ${b.s.length} satuan`, `${nm}: keterangan blok ${g} "${b.ket}" sama dengan jumlah batang dan kotak`);
      }
      /* 3) Satuan lepas, tukaran sepuluh satuan, dan tabel nilai tempat. */
      {
        const lepasMap = new Map();
        for (const o of objs) {
          const m = /^bs-([a-z]+)-(\d+)$/.exec(o.id);
          if (m) lepasMap.set(m[1], (lepasMap.get(m[1]) ?? 0) + 1);
        }
        const batang = objs.filter((o) => /^ts-p\d+$/.test(o.id)).length;
        let sat = 0;
        for (const [g, n] of lepasMap) {
          stat.lepas += 1;
          sat += n;
          const lab = angkaDi(objs, `bs-${g}-n`);
          if (lab !== null) cek(lab === n, `${nm}: label satuan lepas ${g} (${lab}) sama dengan jumlah kotak (${n})`);
        }
        if (lepasMap.size || batang) totalNilai.push([nm, 10 * batang + sat]);
        const ntMap = new Map();
        for (const o of objs) {
          const m = /^nt-([a-z]+)-(n|t|s)$/.exec(o.id);
          if (m) {
            if (!ntMap.has(m[1])) ntMap.set(m[1], {});
            ntMap.get(m[1])[m[2]] = Number(o.isi);
          }
        }
        for (const [g, r] of ntMap) {
          stat.nt += 1;
          cek(r.n !== undefined && r.t === Math.floor(r.n / 10) && r.s === r.n % 10, `${nm}: tabel nilai tempat ${g}: ${r.n} = ${r.t} puluhan dan ${r.s} satuan`);
        }
      }
      /* 4) Tokoh dan banyaknya; soal "a + b = ?". */
      const tk = objs.filter((o) => /^tk-[a-z]+-n$/.test(o.id));
      const nilaiTk = {};
      for (const o of tk) nilaiTk[/^tk-([a-z]+)-n$/.exec(o.id)[1]] = Number(o.isi);
      const soal = ketemu(objs, "soal");
      let operan = null;
      if (soal) {
        const m = /^(\d+) \+ (\d+)(?: \+ (\d+))? = (\?|\d+)$/.exec(soal.isi);
        cek(!!m, `${nm}: soal "${soal.isi}" berbentuk a + b = ? atau a + b = c`);
        if (m) {
          operan = [Number(m[1]), Number(m[2]), ...(m[3] ? [Number(m[3])] : [])];
          if (m[4] !== "?") cek(operan.reduce((p, q) => p + q, 0) === Number(m[4]), `${nm}: hasil pada soal "${soal.isi}" benar`);
        }
      }
      if (tk.length) {
        stat.tokoh += 1;
        cek(tk.length === 2, `${nm}: dua tokoh bernilai`);
        if (soal && operan && operan.length === 2 && tk.length === 2) cek([...operan].sort((p, q) => p - q).join() === Object.values(nilaiTk).sort((p, q) => p - q).join(), `${nm}: soal "${soal.isi}" memakai banyak kedua tokoh (${JSON.stringify(nilaiTk)})`);
      }
      for (const m of t.matchAll(new RegExp(`\\b(malosi|kira|upe|wei|halim|igil) (?:punya|memetik) (${NUMW})`, "g"))) {
        stat.klaim += 1;
        cek(nilaiTk[m[1]] === nilaiKata(m[2]), `${nm}: "${m[0]}" sama dengan banyak di gambar (${nilaiTk[m[1]]})`);
      }
      /* 5) Pecahan bilangan (pasangan). */
      {
        const pa = angkaDi(objs, "pb-a");
        const pb = angkaDi(objs, "pb-b");
        const b1 = angkaDi(objs, "pb-b1");
        const b2 = angkaDi(objs, "pb-b2");
        if (pa !== null || pb !== null) {
          stat.pecah += 1;
          if (b1 !== null && b2 !== null) {
            cek(pb !== null && b1 + b2 === pb, `${nm}: pecahan ${b1} dan ${b2} berjumlah ${pb}`);
            cek(pa !== null && (pa + b1) % 10 === 0, `${nm}: ${pa} + ${b1} menjadi kelipatan sepuluh`);
          }
          for (const m of t.matchAll(new RegExp(`pecah (${NUMW}) menjadi (${NUMW}) dan (${NUMW})`, "g"))) {
            stat.klaim += 1;
            const [x, y, z] = [nilaiKata(m[1]), nilaiKata(m[2]), nilaiKata(m[3])];
            cek(x === y + z && x === pb && y === b1 && z === b2, `${nm}: "${m[0]}" sama dengan gambar (${pb}: ${b1} dan ${b2})`);
          }
        }
      }
      /* 6) Garis bilangan: mulai dari bilangan lebih besar, loncatan satu-satu. */
      {
        const tanda = new Map();
        for (const o of objs) {
          const m = /^gb-n-(\d+)$/.exec(o.id);
          if (m) tanda.set(Number(m[1]), o.x);
        }
        if (tanda.size) {
          stat.garisBil += 1;
          const nilaiDi = (x) => [...tanda].find(([, tx]) => Math.abs(tx - x) < 0.01)?.[0] ?? null;
          const nilai = [...tanda.keys()].sort((p, q) => p - q);
          cek(nilai.every((q, r) => r === 0 || q === nilai[r - 1] + 1), `${nm}: tanda garis bilangan berurutan satu-satu`);
          const mulai = ketemu(objs, "gb-mulai");
          const awal = mulai ? nilaiDi(mulai.x) : null;
          const lon = objs.filter((o) => /^gb-h-\d+$/.test(o.id)).sort((p, q) => Number(p.id.slice(5)) - Number(q.id.slice(5)));
          cek(lon.every((o, r) => o.id === `gb-h-${r + 1}`), `${nm}: loncatan bernomor berurutan`);
          let posisi = awal;
          lon.forEach((o, r) => {
            cek(nilaiDi(o.x) === posisi && nilaiDi(o.x + o.x2) === posisi + 1, `${nm}: loncatan ${r + 1} dari ${posisi} ke ${posisi + 1}`);
            cek(angkaDi(objs, `gb-c-${r + 1}`) === r + 1, `${nm}: hitungan loncatan ${r + 1}`);
            posisi += 1;
          });
          if (operan && operan.length === 2) {
            const [p, q] = operan;
            cek(awal === Math.max(p, q), `${nm}: mulai dari bilangan yang lebih besar (${awal}; soal ${p} + ${q})`);
            cek(lon.length <= Math.min(p, q), `${nm}: loncatan (${lon.length}) tidak lebih dari bilangan yang lebih kecil (${Math.min(p, q)})`);
            const akhirM = ketemu(objs, "gb-akhir");
            if (akhirM) {
              cek(nilaiDi(akhirM.x) === p + q && lon.length === Math.min(p, q), `${nm}: titik akhir ${nilaiDi(akhirM.x)} = ${p} + ${q} setelah ${Math.min(p, q)} loncatan`);
            }
          } else cek(false, `${nm}: garis bilangan memakai soal a + b`);
          for (const m of t.matchAll(new RegExp(`maju (${NUMW}) langkah`, "g"))) {
            stat.klaim += 1;
            cek(nilaiKata(m[1]) === lon.length, `${nm}: "${m[0]}" sama dengan banyak loncatan (${lon.length})`);
          }
        }
      }
      /* 7) Kalimat di suara: a ditambah b (sama dengan c), diurai, satuan dan puluhan, satuan menjadi, dihitung ulang. */
      for (const m of t.matchAll(new RegExp(`(${NUMW}(?: ditambah ${NUMW})+)(?: sama dengan (${NUMW}))?`, "g"))) {
        stat.klaim += 1;
        const angka = semuaNum(m[1]);
        const hasil = m[2] ? nilaiKata(m[2]) : null;
        if (hasil !== null) cek(angka.reduce((p, q) => p + q, 0) === hasil, `${nm}: "${m[0]}" benar (${angka.join(" + ")} = ${angka.reduce((p, q) => p + q, 0)})`);
        for (const x of [...angka, ...(hasil !== null ? [hasil] : [])]) cek(lihat.has(x), `${nm}: bilangan ${x} dari "${m[0]}" tampak di gambar`);
      }
      for (const m of t.matchAll(new RegExp(`(${NUMW})(?: satuan)? (?:punya|sama dengan|terdiri atas) (${U9}) puluhan dan (${U9}) satuan`, "g"))) {
        stat.klaim += 1;
        cek(nilaiKata(m[1]) === NILAI9[m[2]] * 10 + NILAI9[m[3]], `${nm}: "${m[0]}" benar`);
        cek(lihat.has(nilaiKata(m[1])), `${nm}: bilangan "${m[1]}" tampak di gambar`);
      }
      for (const m of t.matchAll(new RegExp(`(${U9}) puluhan dan (${U9}) satuan, yaitu (${NUMW})`, "g"))) {
        stat.klaim += 1;
        cek(NILAI9[m[1]] * 10 + NILAI9[m[2]] === nilaiKata(m[3]), `${nm}: "${m[0]}" benar`);
        cek(lihat.has(nilaiKata(m[3])), `${nm}: bilangan "${m[3]}" tampak di gambar`);
      }
      for (const m of t.matchAll(new RegExp(`(${NUMW}) (satuan|puluhan) dan (${NUMW}) \\2 menjadi (${NUMW}) \\2`, "g"))) {
        stat.klaim += 1;
        cek(nilaiKata(m[1]) + nilaiKata(m[3]) === nilaiKata(m[4]), `${nm}: "${m[0]}" benar`);
        for (const x of [m[1], m[3], m[4]]) cek(lihat.has(nilaiKata(x)), `${nm}: bilangan "${x}" tampak di gambar`);
      }
      for (const m of t.matchAll(new RegExp(`(${NUMW}) diurai menjadi (${NUMW}) ditambah (${NUMW})`, "g"))) {
        stat.klaim += 1;
        cek(nilaiKata(m[1]) === nilaiKata(m[2]) + nilaiKata(m[3]), `${nm}: "${m[0]}" benar`);
      }
      /* 8) Hitungan tertulis di gambar (a + b = c). */
      for (const o of objs.filter((q) => q.t === "teks" && q.isi)) {
        const r = hitungAritm(o.isi);
        if (!r) continue;
        stat.aritm += 1;
        cek(r.ok, `${nm}: hitungan "${o.isi}" benar`);
        cek(r.ops.every((q) => q === "+"), `${nm}: hanya penjumlahan di "${o.isi}"`);
        if (c.a !== null && c.b !== null && r.angka.length === 2 && r.angka[0] === c.a && r.angka[1] === c.b) cek(r.hasil === (c.a + c.b), `${nm}: hasil "${o.isi}" sama dengan hasil susun pendek`);
      }
      /* 9) Jawaban latihan dan terapan: satu pilihan benar dan disorot, dihitung dari gambar. */
      {
        const cp = [1, 2, 3].map((q) => ({ t: ketemu(objs, `c${q}-t`)?.isi, s: ketemu(objs, `c${q}-k`)?.sorot })).filter((q) => q.t !== undefined);
        if (cp.length) {
          stat.pilihan += 1;
          cek(new Set(cp.map((q) => q.t)).size === cp.length && cp.length === 3, `${nm}: tiga pilihan jawaban berbeda (${cp.map((q) => q.t).join(", ")})`);
          const dipilih = cp.filter((q) => q.s);
          cek(/^betul/.test(t) ? dipilih.length === 1 : dipilih.length === 0, `${nm}: jawaban disorot tepat pada ketukan "Betul!"`);
          cek((ketemu(objs, "tanya")?.isi ?? "").length > 0, `${nm}: pertanyaan tampil bersama pilihan`);
          let jum = null;
          if (c.a !== null && c.b !== null) jum = c.a + c.b;
          else if (operan) jum = operan.reduce((p, q) => p + q, 0);
          else if (angkaDi(objs, "pb-a") !== null && angkaDi(objs, "pb-b") !== null) jum = angkaDi(objs, "pb-a") + angkaDi(objs, "pb-b");
          cek(jum !== null, `${nm}: soal pilihan terbaca dari gambar (susun, soal, atau pecahan)`);
          const benar = cp.filter((q) => Number(q.t) === jum).map((q) => q.t);
          cek(benar.length === 1, `${nm}: tepat satu pilihan benar (${jum}): ${benar}`);
          if (benar.length === 1) {
            stat.jawaban += 1;
            if (dipilih.length === 1) cek(dipilih[0].t === benar[0], `${nm}: jawaban yang disorot "${dipilih[0].t}" sama dengan hitungan ulang "${benar[0]}"`);
          }
        }
      }
    });
    if (totalNilai.length) cek(totalNilai.every(([, n]) => n === totalNilai[0][1]), `${v.id}/${a.id}: nilai total satuan lepas dan batang tukaran tetap (${totalNilai.map(([, n]) => n).join(",")})`);
  }
}

/* ------------------------------ Hitungan adegan khusus ------------------------------ */
{
  // Susun panjang: bilangan diurai (blok dan uraian) dan jumlah uraian = hasil susun pendek.
  const urai = akhirAdegan(adegan(M_VIDEO, "panjang-urai"));
  const gb = bacaBlok(urai);
  for (const [g, id] of [["a", "up-a"], ["b", "up-b"]]) {
    const r = hitungAritm(ketemu(urai, id)?.isi ?? "");
    const b = gb.get(g);
    cek(!!r && !!b && r.ops.length === 1 && r.angka[0] === b.p.length * 10 && r.angka[1] === b.s.length && r.hasil === b.n, `susun panjang: uraian ${id} sesuai blok ${g} (${b?.p.length} batang, ${b?.s.length} kotak)`);
  }
  const jml = akhirAdegan(adegan(M_VIDEO, "panjang-jumlah"));
  const pj = [1, 2, 3, 4].map((q) => hitungAritm(ketemu(jml, `pj-${q}`)?.isi ?? ""));
  cek(pj.every((r) => r && r.ok), "susun panjang: empat baris hitungan benar");
  const sj = /^(\d+) \+ (\d+) = (\?|\d+)$/.exec(ketemu(jml, "soal").isi);
  const [pa, pb] = [Number(sj[1]), Number(sj[2])];
  sama([pj[0].angka, pj[1].angka], [[pa - (pa % 10), pb - (pb % 10)], [pa % 10, pb % 10]], "susun panjang: baris puluhan dan baris satuan diambil dari uraian bilangan");
  cek(pj[2].hasil === pj[1].hasil && pj[2].angka[0] === 10 && pj[2].angka[0] + pj[2].angka[1] === pj[1].hasil, "susun panjang: tiga belas diurai menjadi sepuluh dan tiga");
  sama(pj[3].angka, [pj[0].hasil, pj[1].hasil], "susun panjang: baris terakhir menjumlahkan hasil puluhan dan hasil satuan");
  cek(pj[3].hasil === pa + pb && Number(sj[3]) === pa + pb, `susun panjang: hasil ${pj[3].hasil} sama dengan ${pa} + ${pb} dan sama dengan soal`);
  cek(hitungKolomSemua.has(`${pa}+${pb}`), "susun panjang: soal yang sama dihitung juga dengan susun pendek");
  // Tiga bilangan: dua-dua.
  const tg = akhirAdegan(adegan(M_VIDEO, "tiga-bilangan"));
  const t1 = hitungAritm(ketemu(tg, "tg-1")?.isi ?? "");
  const t2 = hitungAritm(ketemu(tg, "tg-2")?.isi ?? "");
  const st = hitungAritm(ketemu(tg, "soal")?.isi ?? "");
  cek(t1 && t2 && st && t2.angka[0] === t1.hasil && sama2([t1.angka[0], t1.angka[1], t2.angka[1]], st.angka) && st.hasil === t2.hasil, "tiga bilangan: dua bilangan dahulu, hasilnya ditambah bilangan ketiga, sama dengan hasil soal");
  // Pasangan: bilangan kedua dipecah supaya a + b1 kelipatan sepuluh, lalu hasilnya ditambah b2.
  for (const [id, a, b, b1] of [["luar-pasangan", 8, 6, 2], ["luar-pasangan-terapan", 49, 6, 1]]) {
    const ak = akhirAdegan(adegan(U, id));
    const e1 = hitungAritm(ketemu(ak, "eq-1")?.isi ?? "");
    const e2 = hitungAritm(ketemu(ak, "eq-2")?.isi ?? "");
    cek(e1 && e2 && e1.angka[0] === a && e1.angka[1] === b1 && e2.angka[0] === e1.hasil && e2.angka[1] === b - b1 && e2.hasil === a + b, `${id}: ${a} + ${b1} = ${e1?.hasil}, lalu ${e2?.angka[0]} + ${b - b1} = ${a + b}`);
    stat.pecah += 1;
  }
}
function sama2(x, y) {
  return JSON.stringify(x) === JSON.stringify(y);
}

console.log(`Pemeriksaan: ${stat.susun} keadaan susun pendek, ${stat.blok} blok, ${stat.lepas} satuan lepas, ${stat.nt} baris tabel nilai tempat, ${stat.tokoh} keadaan tokoh, ${stat.aritm} hitungan tertulis, ${stat.klaim} klaim di suara, ${stat.pilihan} pilihan, ${stat.jawaban} jawaban, ${stat.garisBil} garis bilangan, ${stat.pecah} pecahan`);
for (const [nama, batas] of [["susun", 40], ["blok", 15], ["lepas", 2], ["nt", 3], ["tokoh", 8], ["aritm", 40], ["klaim", 70], ["pilihan", 8], ["jawaban", 6], ["garisBil", 5], ["pecah", 6]]) cek(stat[nama] >= batas, `uji menjalankan cukup banyak pemeriksaan ${nama} (${stat[nama]} >= ${batas})`);

/* ------------------------------ Aturan pemilik ------------------------------ */
{
  const MANDIRI = /kerja kelompok|berkelompok|secara berkelompok|diskusi kelompok|sekelompok|kelompokmu|kelompok belajar|bersama kelompok|tanya teman|survei|karet gelang|uang tabungan|uang logam|\bpaman\b|\btika\b|\bteman\w*|\bkawan\w*|sekawan|sahabat|depan kelas|bersama kelas|seluruh kelas|\bkelas\b|berpasangan dengan (teman|kawan)|bekerja berpasangan|secara berpasangan|bermain bersama|bertanya kepada|buat ceritamu|buku|menulis di|menuliskan di|tulis di|tuliskan di|menulis|menggambar|gambarlah|gambar sendiri|\bbawa(lah)?\b|membawa|dibawa|\bkertas\b|\bpensil\b|\bpulpen\b|\bspidol\b|\bgunting\b|ambil (benda|pensil|kelereng|bola|sedotan|balon|kerucut|kubus)|\bjari\b|menyuruh|suruh|jengkal|telapak|\bdepa\b|penggaris|\bkoin\b|di sekitar|di rumah|di kelas|centimeter|\bmeter\b|kakimu|tanganmu|badanmu|\braba\w*|\bmeraba|\btubuh|\blengan|lingkari|guru kelas|orang tua|\bayah\b|\bibu guru|bapak guru|\bloker\b|singapura|\bmeja\b|di sekitarmu|\brumah\b|\bpisau\b|\bkelompok\b|dua tangan|tangan (kiri|kanan)|angkat|mengangkat|\bkantin|\blidi\b|kelas tiga|survei|presentasi|mempresentasikan|perpustakaan|alun-alun|upacara|kaleng|gelas|kerikil|toples|manik|\bsiswa\b/i;
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      const semua = [a.judul, a.sumber];
      a.ketukan.forEach((kt, i) => {
        semua.push(kt.suara);
        semua.push(...L.teksTerlihat(L.keadaanStory(a, i, 9999)));
      });
      const kena = semua.filter((t) => MANDIRI.test(t) || /\bLili\b/.test(t));
      cek(kena.length === 0, `${v.id}/${a.id}: narasi mandiri dan digital, tanpa kelompok, teman, kelas, buku, kertas, pensil, kantin, menulis, benda nyata, atau tokoh di luar enam (${kena.slice(0, 2).join(" | ")})`);
    }
  }
}

/* ------------------------------ Sapaan, peta susun, dan tabel susun ------------------------------ */
{
  const sap = adegan(M_VIDEO, "sapaan");
  const DAFTAR = ["Susun pendek", "Susun panjang", "Soal cerita penjumlahan"];
  cek(/Halo anak-anak/.test(sap.ketukan[0].suara) && /Susun pendek/i.test(L.teksTerlihat(akhirAdegan(sap, 1)).join(" | ")), "sapaan materi: tiga hal yang dipelajari tampil");
  sama(L.teksTerlihat(akhirAdegan(sap, 1)).filter((t) => DAFTAR.includes(t)), DAFTAR, "sapaan materi: daftar tiga hal");
  cek(!/\d/.test(sap.ketukan[1].suara) && !/\d/.test(DAFTAR.join(" ")), "sapaan materi: tanpa angka");
  const sapLuar = adegan(U, "sapaan");
  cek(/cara lain/i.test(L.teksTerlihat(akhirAdegan(sapLuar, 1)).join(" | ")) && /metode-luar|Metode luar/.test(sapLuar.sumber), "sapaan metode luar: pengumuman cara lain");
  const ringkasBerkas = new URL("../src/data/kelas3-bab1-ringkas.json", import.meta.url);
  const sumberRingkas = existsSync(ringkasBerkas) ? JSON.parse(readFileSync(ringkasBerkas, "utf8")).subBab?.D : null;
  const sementara = new URL("../.tmp-k3b1s/D.json", import.meta.url);
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
    // Isi tabel dihitung ulang dari soal susun pendek yang ada di video materi: jumlah satuan, simpanan, dan jumlah.
    sama(T.kolom, ["Satuan", "Simpan", "Jumlah"], "tabel susun: kolom satuan, simpan, jumlah");
    for (const b of T.baris) {
      const m = /^(\d+) \+ (\d+)$/.exec(b.label);
      cek(!!m && hitungKolomSemua.has(`${m[1]}+${m[2]}`), `tabel susun: soal ${b.label} ada sebagai susun pendek di video materi`);
      if (!m) continue;
      stat.tabel += 1;
      const [x, y] = [Number(m[1]), Number(m[2])];
      const sat = (x % 10) + (y % 10);
      sama(b.sel, [String(sat), String(Math.floor(sat / 10)), String(x + y)], `tabel susun: baris ${b.label} dihitung ulang dari susun pendek`);
    }
    cek(T.baris.some((b) => b.sel[1] === "0") && T.baris.some((b) => b.sel[1] === "1"), "tabel susun: ada soal tanpa menyimpan dan dengan menyimpan");
    const KATA_LARANG = /buku|halaman|kunci|kerja kelompok|berkelompok|\bteman|kawan|kelas\b|kertas|pensil|\bbawa\b|menggambar|menulis|depan kelas|\bluas\b|keliling|di rumah|survei|karet gelang|uang tabungan|di sekitar|\bpaman\b|\btika\b|\blili\b|loker|ibu guru|singapura|standard addition|number bond|counting on|pisau|koin|\brumah\b|\bayah\b|\bpak\b|\bkantin|\blidi\b|perpustakaan|upacara/i;
    cek(!KATA_LARANG.test(JSON.stringify({ p: A.petaSusun, t: A.tabelSusun })), "peta dan tabel susun: tanpa kata terlarang dan tanpa nama Inggris, kelompok, teman, kelas, buku, kertas, pensil, pisau, loker, Ibu guru");
    cek(peta.every((s) => ![...s.teks, ...(s.ikon ?? "")].some((c) => c.codePointAt(0) > 0x1fa95)), "peta susun: emoji paling tinggi Emoji 12");
  } else cek(false, "peta dan tabel susun: .tmp-k3b1s/D.json atau kelas3-bab1-ringkas.json subBab.D.petaSusun ada");
}

console.log(`Tabel susun dihitung ulang: ${stat.tabel} baris`);
console.log(`${VIDEO.map((v) => `${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, a) => t + a.ketukan.length, 0)} ketukan, ${kataVideo(v)} kata (sekitar ${(kataVideo(v) / 120).toFixed(1)} menit diputar)`).join("\n")}`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
