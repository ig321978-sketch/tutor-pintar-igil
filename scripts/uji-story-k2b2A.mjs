// Uji Story Kelas 2 Bab 2 Sub-Bab A (Berbagai Cara Melakukan Penjumlahan): dua video (materi kurikulum dan metode luar) dengan mesin animasi Story.
// Video diputar bergaya guru: suara, teks terlihat, sumber, judul adegan, dan subjudul tanpa penyebutan buku (kata terlarang diperiksa pada adegan yang diputar).
// Memeriksa: pemicu kata, suara tanpa digit, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas, teks bertumpuk, pemisahan materi dan metode luar (nama metode hanya Indonesia),
// bilangan sampai dua puluh (tanpa kali, bagi, bersusun, meminjam), nama bilangan sepuluh sampai dua puluh yang diucapkan tampak sebagai angka, dan HITUNG ULANG dari struktur adegan:
// setiap kalimat hitung di suara dan gambar (a + b = c, c - b = a, hasil <= 20), langkah jalur bilangan (angka langkah n tepat di atas petak awal + n, titik akhir benar),
// bingkai sepuluh (petak unik, benda ke-i di petak i mod 10), batang puluhan dan kubus satuan (nilai = 10 x batang + kubus; sepuluh kubus ditukar satu batang), tabel nilai tempat
// (baris = 10 x batang + kubus; angka puluhan dan satuan), bagan pasangan (bagian + bagian = utuh), pilihan jawaban (satu disorot dan benar), aturan pemilik (belajar mandiri digital),
// emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k2b2A.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k2b2A-video.ts");
const U1 = await import("../src/components/modul/story/k2b2A-luar-1.ts");
const B = await import("../src/components/modul/story/k2b2A-bantu.ts");

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
const VIDEO = [V.VIDEO_MATERI_K2B2A, V.VIDEO_LUAR_K2B2A];
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
const M_VIDEO = V.VIDEO_MATERI_K2B2A;
const U = V.VIDEO_LUAR_K2B2A;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const NAMA_LUAR = /Menghitung Maju|Pasangan Bilangan|Balok Dienes|Menyimpan|metode luar|metode dari luar/i;
const NAMA_INGGRIS = /Counting On|Count On|Number Bond|Regroup|Dienes \/|Ten Frame|Number Line|Place Value|Singapore Math/i;
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M_VIDEO);
  const luar = teksVideo(U);
  cek(!NAMA_LUAR.test(materi), "video materi tidak memuat nama metode luar (maju di jalur bilangan, pecah, dan tabel nilai tempat adalah istilah materi)");
  for (const m of U1.NAMA_METODE_ID) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE_ID, ["Menghitung Maju", "Pasangan Bilangan", "Balok Dienes dan Menyimpan"], "nama Indonesia metode luar (namaId data)");
  cek(!NAMA_INGGRIS.test(materi) && !NAMA_INGGRIS.test(luar), "nama metode hanya bahasa Indonesia (tanpa Counting On, Number Bond, Dienes / Regroup)");
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
  cek(M_VIDEO.id === "k2b2A-materi" && U.id === "k2b2A-luar", "id video k2b2A-materi dan k2b2A-luar");
  cek(U.judul.endsWith(": Metode dari Luar") && !/menurut/i.test(M_VIDEO.judul), "judul video: materi tanpa 'menurut', luar berakhir ': Metode dari Luar'");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,cerita-jambu,maju-jalur,pecah-sepuluh,tabel-nilai-tempat,tiga-satu-hasil,tukar-urutan,sahabat-sepuluh,tukar-sepuluh,tukar-tabel,buka-puluhan,pilih-cara,latihan-satu,latihan-dua,latihan-tiga,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-maju,luar-maju-terapan,luar-pasangan,luar-pasangan-terapan,luar-dienes,luar-dienes-terapan,luar-ringkas", "urutan adegan metode luar");
  cek(M_VIDEO.adegan[0].id === "sapaan" && U.adegan[0].id === "sapaan", "tiap video dibuka adegan sapaan");
  cek(M_VIDEO.adegan.filter((a) => /^latihan-/.test(a.id)).length === 3 && M_VIDEO.adegan[M_VIDEO.adegan.length - 1].id === "penutup", "video materi: Latihan 1 sampai 3 lalu penutup");
  cek(U.adegan[1].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  cek(U.adegan.length - 3 === 6, "video metode luar: konsep dan penerapan untuk tiga metode (6 adegan di antara pembuka dan ringkasan)");
  for (const kata of ["Latihan", "Igil", "Halim", "Kira", "Wei", "Upe", "jambu", "apel", "jalur bilangan", "maju", "pecah", "sepuluh", "tabel nilai tempat", "puluhan", "satuan", "batang", "kubus", "tukar", "sahabat sepuluh", "dikurangi", "periksa", "ditambah"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  // Penjumlahan dan pengurangan sampai dua puluh: tanpa kali, bagi, bersusun, meminjam, satuan baku, bilangan lebih dari dua puluh.
  const BOCOR = /dikali|perkalian|pembagian|dibagi|\bkali\b|\bbagi\b|\bratus\b|\bribu\b|\b(dua|tiga|empat|lima|enam|tujuh|delapan|sembilan) puluh (satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan)\b|\b(tiga|empat|lima|enam|tujuh|delapan|sembilan) puluh\b|\bluas\b|keliling|rumus|volume|sentimeter|centimeter|\bcm\b|\bmeter\b|penggaris|bersusun|meminjam|pinjam|×|÷|−/i;
  for (const v of [M_VIDEO, U]) {
    for (const a of v.adegan) cek(!BOCOR.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa kali, bagi, bersusun, meminjam, satuan baku, bilangan lebih dari dua puluh, rumus`);
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
/** Nama bilangan 1 sampai 20 yang dimulai pada token `p`: [nilai, panjang] atau null (nama lebih panjang didahulukan; nama banyak kata tidak menyeberangi tanda baca). */
const bacaAngka = (t, p) => {
  for (let n = 20; n >= 1; n -= 1) {
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
const NAMA_METODE_SUARA = /menghitung maju|pasangan bilangan|balok dienes dan menyimpan/gi;
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
const di = (id, ke) => {
  const a = adegan(M_VIDEO, id) ?? adegan(U, id);
  return akhirAdegan(a, ke);
};
const stat = { hitung: 0, aritmetika: 0, benda: 0, kalimat: 0 };
const NB = B.NAMA_BILANGAN;

/** Ubah nama bilangan (nol sampai dua puluh) dalam suara menjadi angka; nama banyak kata tidak menyeberangi tanda baca. */
const keAngka = (suara) => {
  const t = suara.toLowerCase().split(/\s+/).filter(Boolean).map((w) => ({ w: w.replace(/[^a-z]/g, ""), p: /[,.;:!?]$/.test(w), s: w.match(/[,.;:!?]+$/)?.[0] ?? "" }));
  const out = [];
  for (let i = 0; i < t.length; ) {
    let ok = false;
    for (let n = 20; n >= 0 && !ok; n -= 1) {
      const pc = NB[n].split(" ");
      if (pc.every((c, q) => t[i + q]?.w === c && (q === pc.length - 1 || !t[i + q].p))) {
        out.push(`${n}${t[i + pc.length - 1].s}`);
        i += pc.length;
        ok = true;
      }
    }
    if (!ok) {
      out.push(`${t[i].w}${t[i].s}`);
      i += 1;
    }
  }
  return out.join(" ");
};
const hasil = (a, op, b) => (op === "ditambah" || op === "+" ? a + b : a - b);

// 1) Kalimat hitung di suara: setiap "ditambah" atau "dikurangi" berada dalam kalimat lengkap yang benar; puluhan dan satuan dihitung ulang.
for (const v of VIDEO) {
  for (const a of v.adegan) {
    a.ketukan.forEach((kt, i) => {
      const nm = `${v.id}/${a.id}#${i + 1}`;
      const s = keAngka(kt.suara).replace(/[,.;:!?]+(?= |$)/g, "").replace(/\s+/g, " ");
      let operator = 0;
      for (const m of s.matchAll(/(\d+) (ditambah|dikurangi) (\d+)(?: (ditambah|dikurangi) (\d+))? sama dengan (\d+|berapa)/g)) {
        operator += m[4] ? 2 : 1;
        stat.kalimat += 1;
        let r = hasil(Number(m[1]), m[2], Number(m[3]));
        if (m[4]) r = hasil(r, m[4], Number(m[5]));
        if (m[6] !== "berapa") cek(r === Number(m[6]), `${nm}: suara "${m[0]}" harus ${r}`);
        cek(r >= 0 && r <= 20 && Number(m[1]) <= 20, `${nm}: hasil "${m[0]}" antara nol dan dua puluh`);
      }
      const semuaOp = (s.match(/\b(ditambah|dikurangi)\b/g) ?? []).length;
      cek(semuaOp === operator, `${nm}: setiap ditambah/dikurangi ada dalam kalimat lengkap "N ditambah M sama dengan K" (${semuaOp} operator, ${operator} lengkap): ${s}`);
      for (const m of s.matchAll(/(\d+) terdiri dari (\d+) puluhan dan (\d+) satuan/g)) {
        stat.aritmetika += 1;
        cek(Number(m[1]) === 10 * Number(m[2]) + Number(m[3]), `${nm}: "${m[0]}" tidak cocok`);
      }
      for (const m of s.matchAll(/(\d+) puluhan dan (\d+) satuan (?:itu|yaitu) (\d+)/g)) {
        stat.aritmetika += 1;
        cek(10 * Number(m[1]) + Number(m[2]) === Number(m[3]), `${nm}: "${m[0]}" tidak cocok`);
      }
      for (const m of s.matchAll(/(\d+) (puluhan|satuan) sama dengan (\d+)(?: (puluhan|satuan))?/g)) {
        stat.aritmetika += 1;
        const [, x, u1, y, u2] = m;
        if (u1 === "puluhan" && !u2) cek(10 * Number(x) === Number(y), `${nm}: "${m[0]}" tidak cocok`);
        else if (u1 === "puluhan" && u2 === "satuan") cek(10 * Number(x) === Number(y), `${nm}: "${m[0]}" tidak cocok`);
        else if (u1 === "satuan" && u2 === "puluhan") cek(Number(x) === 10 * Number(y), `${nm}: "${m[0]}" tidak cocok`);
        else cek(false, `${nm}: pola tukar "${m[0]}" tidak dikenal`);
      }
    });
  }
}

// 2) Teks hitung di gambar: penjumlahan atau pengurangan lengkap yang benar, hasil antara nol dan dua puluh; tanda sama dengan lain hanya "1 puluhan = 10 satuan".
for (const v of VIDEO) {
  for (const a of v.adegan) {
    a.ketukan.forEach((kt, i) => {
      const nm = `${v.id}/${a.id}#${i + 1}`;
      for (const t of L.teksTerlihat(akhirAdegan(a, i))) {
        const m = /^(\d+) ([+-]) (\d+)(?: ([+-]) (\d+))? = (\d+|\?)$/.exec(t);
        if (m) {
          stat.aritmetika += 1;
          let r = hasil(Number(m[1]), m[2], Number(m[3]));
          if (m[4]) r = hasil(r, m[4], Number(m[5]));
          if (m[6] !== "?") cek(r === Number(m[6]), `${nm} gambar: "${t}" harus ${r}`);
          cek(r >= 0 && r <= 20, `${nm} gambar: hasil "${t}" antara nol dan dua puluh`);
        } else if (/\d\s*[+\-−×÷=]\s*[\d?]/.test(t)) cek(t === "1 puluhan = 10 satuan", `${nm} gambar: "${t}" lambang hitung tidak sah`);
      }
    });
  }
}

// 3) Benda: banyaknya, bingkai (petak unik, benda ke-i kelompok a di petak i), batang puluhan, kubus satuan, tabel nilai tempat, bagan pasangan, jalur bilangan.
const hitungRe = (objs, re) => objs.filter((o) => re.test(o.id)).length;
const kelompok = (objs, key) => objs.filter((o) => o.t === "teks" && new RegExp(`^e${key}\\d+$`).test(o.id)).sort((p, q) => Number(p.id.slice(2)) - Number(q.id.slice(2)));
const bingkai = (objs) => objs.filter((o) => o.t === "kotak" && /^fr[a-z]\d+$/.test(o.id));
const petakDari = (o, objs) => {
  const cy = o.y - (o.u ?? 18) * 0.35;
  for (const f of bingkai(objs)) {
    const c = f.w / 5;
    if (o.x > f.x && o.x < f.x + f.w && cy > f.y && cy < f.y + 2 * c) return { f: Number(f.id.slice(3)), p: Math.floor((o.x - f.x) / c) + 5 * Math.floor((cy - f.y) / c) };
  }
  return null;
};
/** Banyak benda (semua kelompok, atau satu kelompok) tiap kotak sepuluh: { nomorKotak: banyak }. */
const perBingkai = (objs, key) => {
  const out = {};
  for (const g of key ? [key] : ["a", "b"]) for (const o of kelompok(objs, g)) {
    const p = petakDari(o, objs);
    if (p) out[p.f] = (out[p.f] ?? 0) + 1;
  }
  return out;
};
const nilaiBalok = (objs, key) => 10 * hitungRe(objs, new RegExp(`^p${key}\\d+-k$`)) + hitungRe(objs, new RegExp(`^s${key}\\d+$`));
const nilaiBaris = (objs, r) => 10 * hitungRe(objs, new RegExp(`^tb${r}p\\d+$`)) + hitungRe(objs, new RegExp(`^tb${r}s\\d+$`));
const pilih = (objs) => [1, 2, 3].map((q) => ({ t: isiTeks(objs, `c${q}-t`), s: ketemu(objs, `c${q}-k`)?.sorot })).filter((c) => c.t !== undefined);
const dipilih = (objs) => pilih(objs).filter((c) => c.s).map((c) => c.t);
const bagan = (objs) => ({ u: isiTeks(objs, "bd-u"), a: isiTeks(objs, "bd-a"), b: isiTeks(objs, "bd-b") });
/** Deret angka langkah pada jalur: [nilai petak awal, banyak langkah, nilai petak akhir]. Tiap angka langkah n tepat di atas petak bernilai awal + n. */
const langkah = (objs, nm) => {
  const petakTeks = objs.filter((o) => o.t === "teks" && /^nl\d+$/.test(o.id)).sort((p, q) => Number(p.id.slice(2)) - Number(q.id.slice(2)));
  const nilaiPetak = petakTeks.map((o) => Number(o.isi));
  if (petakTeks.length) cek(nilaiPetak.every((n, q) => n === nilaiPetak[0] + q), `${nm}: jalur bilangan naik satu demi satu (${nilaiPetak.join(",")})`);
  const lb = objs.filter((o) => o.t === "teks" && /^nln\d+$/.test(o.id)).sort((p, q) => Number(p.id.slice(3)) - Number(q.id.slice(3)));
  if (lb.length === 0) return null;
  cek(lb.every((o, q) => Number(o.isi) === q + 1 && Number(o.id.slice(3)) === q + 1), `${nm}: angka langkah berurutan dari satu`);
  const petakDi = (o) => petakTeks.find((q) => Math.abs(q.x - o.x) < 1.5);
  const awal = Number(petakDi(lb[0])?.isi) - 1;
  lb.forEach((o, q) => {
    const p = petakDi(o);
    cek(p && Number(p.isi) === awal + q + 1, `${nm}: angka langkah ${o.isi} tepat di atas petak ${awal + q + 1} (ada ${p?.isi})`);
    cek(p && o.y < p.y, `${nm}: angka langkah ${o.isi} di atas petaknya`);
  });
  cek(nilaiPetak.includes(awal), `${nm}: petak awal ${awal} ada di jalur`);
  stat.hitung += 1;
  return [awal, lb.length, awal + lb.length];
};

{
  // Aturan umum tiap keadaan gambar.
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((kt, i) => {
        const objs = akhirAdegan(a, i);
        const nm = `${v.id}/${a.id}#${i + 1}`;
        const grup = { a: kelompok(objs, "a"), b: kelompok(objs, "b") };
        for (const [key, g] of Object.entries(grup)) {
          if (g.length === 0) continue;
          stat.benda += 1;
          cek(g.every((o, q) => o.id === `e${key}${q}`), `${nm}: benda kelompok ${key} bernomor berurutan dari nol`);
          cek(g.every((o) => o.isi === g[0].isi && o.u === g[0].u), `${nm}: satu jenis benda tiap kelompok ${key}`);
          if (bingkai(objs).length) {
            const petak = g.map((o) => petakDari(o, objs));
            cek(petak.every(Boolean), `${nm}: tiap benda kelompok ${key} berada di petak bingkai`);
            if (key === "a") cek(petak.every((p, q) => p && p.f === Math.floor(q / 10) && p.p === q % 10), `${nm}: benda ke-i kelompok a di petak i mod 10 pada kotak i div 10`);
          }
        }
        if (bingkai(objs).length) {
          const semua = [...grup.a, ...grup.b].map((o) => petakDari(o, objs)).filter(Boolean).map((p) => `${p.f}-${p.p}`);
          cek(new Set(semua).size === semua.length, `${nm}: tak ada dua benda di petak yang sama`);
        }
        cek(grup.a.length + grup.b.length <= 20, `${nm}: gambar benda paling banyak dua puluh (${grup.a.length + grup.b.length})`);
        cek(hitungRe(objs, /^p[a-z]\d+-k$/) + hitungRe(objs, /^s[a-z]\d+$/) <= 20 && hitungRe(objs, /^tb\dp\d+$/) + hitungRe(objs, /^tb\ds\d+$/) <= 30, `${nm}: batang dan kubus paling banyak dua puluh`);
        for (const key of ["a", "b"]) {
          const ln = isiTeks(objs, `e${key}-ln`);
          if (ln !== undefined) cek(grup[key].length > 0 && Number(ln) === grup[key].length, `${nm}: angka banyaknya ${ln} sama dengan ${grup[key].length} benda digambar`);
        }
        const va = isiTeks(objs, "va");
        if (va !== undefined) {
          stat.benda += 1;
          cek(Number(va) === nilaiBalok(objs, "a"), `${nm}: nilai ${va} sama dengan 10 x batang + kubus (${nilaiBalok(objs, "a")})`);
        }
        for (const r of [0, 1, 2]) {
          const lb = isiTeks(objs, `tb${r}-lb`);
          if (lb !== undefined) {
            stat.benda += 1;
            cek(Number(lb) === nilaiBaris(objs, r), `${nm}: baris tabel ${r + 1} berlabel ${lb} sama dengan 10 x batang + kubus (${nilaiBaris(objs, r)})`);
          }
          const dp = isiTeks(objs, `tb${r}-dp`);
          const ds = isiTeks(objs, `tb${r}-ds`);
          if (dp !== undefined) cek(Number(dp) === hitungRe(objs, new RegExp(`^tb${r}p\\d+$`)), `${nm}: angka puluhan baris ${r + 1} sama dengan banyak batang`);
          if (ds !== undefined) cek(Number(ds) === hitungRe(objs, new RegExp(`^tb${r}s\\d+$`)), `${nm}: angka satuan baris ${r + 1} sama dengan banyak kubus`);
        }
        const bg = bagan(objs);
        if (bg.u !== undefined) {
          stat.benda += 1;
          cek(/^\d+$/.test(bg.u) && /^\d+$/.test(bg.a) && /^\d+$/.test(bg.b) && Number(bg.a) + Number(bg.b) === Number(bg.u), `${nm}: bagan ${bg.a} + ${bg.b} sama dengan ${bg.u}`);
        }
        const pil = pilih(objs);
        if (pil.length) {
          cek(pil.length === 3 && new Set(pil.map((c) => c.t)).size === 3 && pil.every((c) => /^\d+$/.test(c.t) && Number(c.t) <= 20), `${nm}: tiga pilihan jawaban berbeda paling besar dua puluh (${pil.map((c) => c.t).join(",")})`);
          cek(dipilih(objs).length <= 1, `${nm}: paling banyak satu jawaban disorot`);
        }
        langkah(objs, nm);
      });
    }
  }

  // 4) Isi tiap adegan dihitung ulang.
  const eq = (objs, id) => isiTeks(objs, `${id}-t0`);
  const ln = (objs) => [isiTeks(objs, "ea-ln"), isiTeks(objs, "eb-ln")];
  const per = (objs, key) => Object.entries(perBingkai(objs, key)).sort((p, q) => Number(p[0]) - Number(q[0])).map(([, n]) => n);
  const banyak = (objs, key) => kelompok(objs, key).length;
  {
    // Materi: jambu Upe dan Kira (12 + 6).
    const j = di("cerita-jambu", 2);
    sama([banyak(j, "a"), banyak(j, "b"), per(j, "a"), per(j, "b"), ln(j)], [12, 6, [10, 2], [6], ["12", "6"]], "cerita jambu: 12 jambu Upe (10, 2) dan 6 jambu Kira");
    sama(eq(di("cerita-jambu", 3), "eq"), "12 + 6 = ?", "cerita jambu: pertanyaan 12 + 6");
    // Maju di jalur bilangan.
    const m = di("maju-jalur", 2);
    sama([langkah(m, "maju-jalur"), [0, 10].map((q) => isiTeks(m, `nl${q}`))], [[12, 6, 18], ["10", "20"]], "maju di jalur: dari 12 enam langkah sampai 18 pada jalur 10 sampai 20");
    const m4 = di("maju-jalur", 3);
    sama([eq(m4, "eq"), m4.filter((o) => o.sorot && /^nl\d+-k$/.test(o.id)).map((o) => isiTeks(m4, o.id.replace("-k", "")))], ["12 + 6 = 18", ["18"]], "maju di jalur: 12 + 6 = 18, petak 18 disorot");
    sama(eq(di("maju-jalur", 4), "lc"), "6 loncatan", "maju di jalur: enam loncatan");
    // Pecah jadi sepuluh dan sisa.
    const p = di("pecah-sepuluh", 4);
    sama([Object.values(bagan(p)), per(p, "a"), per(p, "b"), eq(p, "eq")], [["12", "10", "2"], [10, 2], [6], "12 + 6 = 18"], "pecah sepuluh: 12 = 10 + 2; 12 jambu (10, 2) dan 6 jambu; 12 + 6 = 18");
    sama([eq(di("pecah-sepuluh", 2), "q1"), eq(di("pecah-sepuluh", 3), "q2")], ["2 + 6 = 8", "10 + 8 = 18"], "pecah sepuluh: 2 + 6 = 8 lalu 10 + 8 = 18");
    // Tabel nilai tempat.
    const t = di("tabel-nilai-tempat", 5);
    sama([0, 1, 2].map((r) => nilaiBaris(t, r)), [12, 6, 18], "tabel nilai tempat: baris 12, 6, dan hasil 18");
    sama([0, 1, 2].map((r) => [hitungRe(t, new RegExp(`^tb${r}p\\d+$`)), hitungRe(t, new RegExp(`^tb${r}s\\d+$`))]), [[1, 2], [0, 6], [1, 8]], "tabel nilai tempat: (puluhan, satuan) 12 = (1, 2); 6 = (0, 6); 18 = (1, 8)");
    const t4 = di("tabel-nilai-tempat", 3);
    sama([hitungRe(t4, /^tb2s\d+$/), hitungRe(t4, /^tb0s\d+$/) + hitungRe(t4, /^tb1s\d+$/), eq(t4, "q1")], [8, 8, "2 + 6 = 8"], "tabel nilai tempat: satuan 2 + 6 = 8 kubus");
    sama(eq(t, "eq"), "12 + 6 = 18", "tabel nilai tempat: 12 + 6 = 18");
    // Tiga cara, satu hasil, dan pemeriksaan.
    const h = di("tiga-satu-hasil", 2);
    sama(["m1", "m2", "m3"].map((id) => isiTeks(h, `${id}-t1`)), ["12 + 6 = 18", "12 + 6 = 18", "12 + 6 = 18"], "tiga cara: hasil sama 18");
    sama([eq(di("tiga-satu-hasil", 4), "p1"), eq(di("tiga-satu-hasil", 5), "p2")], ["18 - 6 = 12", "18 - 12 = 6"], "pemeriksaan: operasi lawan 18 - 6 = 12 dan 18 - 12 = 6");
    // Urutan boleh ditukar.
    const u = di("tukar-urutan", 2);
    sama([eq(u, "e1"), eq(u, "e2"), eq(u, "m1"), eq(u, "m2")], ["12 + 6 = 18", "6 + 12 = 18", "mulai 12: 6 loncatan", "mulai 6: 12 loncatan"], "tukar urutan: 12 + 6 = 6 + 12 = 18; loncatan 6 dan 12");
    for (const id of ["m1", "m2"]) {
      const mm = /^mulai (\d+): (\d+) loncatan$/.exec(eq(u, id));
      cek(mm && Number(mm[1]) + Number(mm[2]) === 18, `tukar urutan: ${id} awal + loncatan sama dengan 18`);
    }
    // Sahabat sepuluh.
    for (const [ke, a, b] of [[1, 4, 6], [2, 7, 3], [3, 5, 5]]) {
      const s = di("sahabat-sepuluh", ke);
      sama([banyak(s, "a"), banyak(s, "b"), per(s), eq(s, "eq")], [a, b, [10], `${a} + ${b} = 10`], `sahabat sepuluh: ${a} dan ${b} memenuhi satu bingkai`);
    }
    sama(["s1", "s2"].map((id) => eq(di("sahabat-sepuluh", 4), id)), ["9 + 1 = 10", "8 + 2 = 10"], "sahabat sepuluh: 9 + 1 dan 8 + 2");
    // Tukar sepuluh satuan jadi satu puluhan (18 + 2).
    const x1 = di("tukar-sepuluh", 0);
    sama([hitungRe(x1, /^pa\d+-k$/), hitungRe(x1, /^sa\d+$/), isiTeks(x1, "va")], [1, 8, "18"], "tukar sepuluh: 1 batang dan 8 kubus = 18");
    const x2 = di("tukar-sepuluh", 1);
    sama([hitungRe(x2, /^pa\d+-k$/), hitungRe(x2, /^sa\d+$/), eq(x2, "q2")], [1, 10, "18 + 2 = ?"], "tukar sepuluh: tambah 2 kubus jadi 10 satuan");
    sama(eq(di("tukar-sepuluh", 2), "q3"), "8 + 2 = 10", "tukar sepuluh: 8 + 2 = 10");
    const x4 = di("tukar-sepuluh", 3);
    sama([hitungRe(x4, /^pa\d+-k$/), hitungRe(x4, /^sa\d+$/), nilaiBalok(x4, "a")], [2, 0, 20], "tukar sepuluh: sepuluh kubus jadi satu batang (2 batang, 0 kubus)");
    sama([isiTeks(di("tukar-sepuluh", 4), "va"), eq(di("tukar-sepuluh", 5), "eq")], ["20", "18 + 2 = 20"], "tukar sepuluh: 20 dan 18 + 2 = 20");
    // Tukar di tabel (13 + 7).
    const y2 = di("tukar-tabel", 1);
    sama([nilaiBaris(y2, 0), nilaiBaris(y2, 1)], [13, 7], "tukar tabel: baris 13 dan 7");
    const y3 = di("tukar-tabel", 2);
    sama([hitungRe(y3, /^tb2p\d+$/), hitungRe(y3, /^tb2s\d+$/), eq(y3, "q1"), hitungRe(y3, /^tb0s\d+$/) + hitungRe(y3, /^tb1s\d+$/)], [1, 10, "3 + 7 = 10", 10], "tukar tabel: satuan 3 + 7 = 10 kubus, puluhan masih satu");
    const y4 = di("tukar-tabel", 3);
    sama([hitungRe(y4, /^tb2p\d+$/), hitungRe(y4, /^tb2s\d+$/), nilaiBaris(y4, 2)], [2, 0, 20], "tukar tabel: sepuluh kubus ditukar satu batang (2 batang, 0 kubus = 20)");
    const y5 = di("tukar-tabel", 4);
    sama([isiTeks(y5, "tb2-dp"), isiTeks(y5, "tb2-ds"), isiTeks(y5, "tb2-lb"), eq(y5, "eq"), nilaiBaris(y5, 0) + nilaiBaris(y5, 1)], ["2", "0", "20", "13 + 7 = 20", 20], "tukar tabel: 2 puluhan 0 satuan = 20; 13 + 7 = 20");
    // Membuka satu puluhan.
    const b1 = di("buka-puluhan", 0);
    sama([hitungRe(b1, /^pa\d+-k$/), hitungRe(b1, /^sa\d+$/), isiTeks(b1, "va")], [1, 0, "10"], "buka puluhan: 1 batang = 10");
    const b2 = di("buka-puluhan", 1);
    sama([hitungRe(b2, /^pa\d+-k$/), hitungRe(b2, /^sa\d+$/)], [0, 10], "buka puluhan: batang dibuka jadi 10 kubus");
    sama([isiTeks(di("buka-puluhan", 2), "va"), eq(di("buka-puluhan", 3), "eq")], ["10", "1 puluhan = 10 satuan"], "buka puluhan: nilai tetap 10; 1 puluhan = 10 satuan");
    // Memilih cara.
    const c = di("pilih-cara", 3);
    sama(["c1", "c2", "c3"].map((id) => isiTeks(c, `${id}-t1`)), ["14 + 3 = 17", "7 + 8 = 15", "13 + 7 = 20"], "pilih cara: contoh tiap cara");
    // Latihan 1: 14 + 3 di jalur.
    const l1 = di("latihan-satu", 3);
    sama([langkah(di("latihan-satu", 1), "latihan-satu"), pilih(l1).map((q) => q.t), dipilih(l1), eq(l1, "eq")], [[14, 3, 17], ["16", "17", "18"], ["17"], "14 + 3 = 17"], "latihan 1: 14 maju 3 langkah sampai 17; jawaban 17 dipilih");
    // Latihan 2: 11 + 7 dengan memecah.
    const l2 = di("latihan-dua", 3);
    sama([Object.values(bagan(di("latihan-dua", 1))), eq(di("latihan-dua", 1), "q1"), pilih(di("latihan-dua", 2)).map((q) => q.t), dipilih(di("latihan-dua", 2)), eq(l2, "q2"), eq(l2, "eq")], [["11", "10", "1"], "1 + 7 = 8", ["17", "18", "19"], ["18"], "10 + 8 = 18", "11 + 7 = 18"], "latihan 2: 11 = 10 + 1; 1 + 7 = 8; 10 + 8 = 18; jawaban 18 dipilih");
    // Latihan 3: 16 + 4 di tabel.
    const l3a = di("latihan-tiga", 0);
    sama([nilaiBaris(l3a, 0), nilaiBaris(l3a, 1)], [16, 4], "latihan 3: baris 16 dan 4");
    const l3b = di("latihan-tiga", 1);
    sama([hitungRe(l3b, /^tb2p\d+$/), hitungRe(l3b, /^tb2s\d+$/)], [2, 0], "latihan 3: 6 + 4 = 10 satuan ditukar jadi 1 puluhan (2 puluhan, 0 satuan)");
    const l3 = di("latihan-tiga", 3);
    sama([pilih(di("latihan-tiga", 2)).map((q) => q.t), dipilih(di("latihan-tiga", 2)), eq(l3, "eq")], [["10", "19", "20"], ["20"], "16 + 4 = 20"], "latihan 3: jawaban 20 dipilih; 16 + 4 = 20");
    // Metode luar: Menghitung Maju.
    const am = di("luar-maju", 2);
    sama([langkah(am, "luar-maju"), [0, 10].map((q) => isiTeks(am, `nl${q}`))], [[9, 4, 13], ["8", "18"]], "luar maju: dari 9 empat langkah sampai 13 pada jalur 8 sampai 18");
    sama([eq(di("luar-maju", 3), "eq"), eq(di("luar-maju", 4), "lc")], ["4 + 9 = 13", "4 loncatan, bukan 9"], "luar maju: 4 + 9 = 13; mulai dari yang besar hanya 4 loncatan");
    const bt = di("luar-maju-terapan", 3);
    sama([langkah(di("luar-maju-terapan", 2), "luar-maju-terapan"), pilih(bt).map((q) => q.t), dipilih(bt), eq(di("luar-maju-terapan", 4), "eq")], [[14, 3, 17], ["16", "17", "18"], ["17"], "3 + 14 = 17"], "luar maju terapan: mulai 14 maju 3 sampai 17; jawaban 17 dipilih");
    // Metode luar: Pasangan Bilangan.
    const q1 = di("luar-pasangan", 1);
    sama([banyak(q1, "a"), banyak(q1, "b"), per(q1), eq(q1, "eq")], [8, 5, [8, 5], "8 + 5 = ?"], "luar pasangan: 8 apel merah (kotak 1) dan 5 apel biru (kotak 2)");
    sama(Object.values(bagan(di("luar-pasangan", 2))), ["5", "2", "3"], "luar pasangan: 5 dipecah 2 dan 3");
    const q4 = di("luar-pasangan", 3);
    sama([per(q4), eq(q4, "q1")], [[10, 3], "8 + 2 = 10"], "luar pasangan: 2 apel biru pindah, kotak pertama penuh 10, sisa 3");
    sama([eq(di("luar-pasangan", 4), "q2"), eq(di("luar-pasangan", 5), "eq")], ["10 + 3 = 13", "8 + 5 = 13"], "luar pasangan: 10 + 3 = 13; 8 + 5 = 13");
    const r1 = di("luar-pasangan-terapan", 0);
    sama([banyak(r1, "a"), banyak(r1, "b"), per(r1)], [7, 5, [7, 5]], "luar pasangan terapan: 7 apel merah dan 5 apel biru");
    sama(Object.values(bagan(di("luar-pasangan-terapan", 1))), ["5", "3", "2"], "luar pasangan terapan: 5 dipecah 3 dan 2");
    const r3 = di("luar-pasangan-terapan", 2);
    sama([per(r3), eq(r3, "q1")], [[10, 2], "7 + 3 = 10"], "luar pasangan terapan: 3 apel biru pindah, kotak pertama penuh, sisa 2");
    const r4 = di("luar-pasangan-terapan", 3);
    sama([eq(r4, "q2"), pilih(r4).map((q) => q.t), dipilih(r4), eq(di("luar-pasangan-terapan", 4), "eq")], ["10 + 2 = ?", ["11", "12", "13"], ["12"], "7 + 5 = 12"], "luar pasangan terapan: 10 + 2 = 12 dipilih; 7 + 5 = 12");
    // Metode luar: Balok Dienes dan Menyimpan.
    const e2 = di("luar-dienes", 1);
    sama([hitungRe(e2, /^sa\d+$/), e2.filter((o) => /^sa\d+$/.test(o.id) && o.warna === "#FFC800").length, eq(e2, "eq")], [15, 9, "9 + 6 = ?"], "luar dienes: 9 kubus kuning dan 6 merah muda = 15 kubus");
    sama(isiTeks(di("luar-dienes", 2), "va"), "15", "luar dienes: nilai 15");
    const e4 = di("luar-dienes", 3);
    sama([hitungRe(e4, /^pa\d+-k$/), hitungRe(e4, /^sa\d+$/), isiTeks(e4, "va")], [1, 5, "15"], "luar dienes: 10 kubus disimpan jadi 1 batang, sisa 5 kubus, nilai tetap 15");
    sama(eq(di("luar-dienes", 5), "eq"), "9 + 6 = 15", "luar dienes: 9 + 6 = 15");
    const g1 = di("luar-dienes-terapan", 0);
    sama([hitungRe(g1, /^sa\d+$/), g1.filter((o) => /^sa\d+$/.test(o.id) && o.warna === "#FFC800").length], [14, 6], "luar dienes terapan: 6 kubus kuning dan 8 merah muda = 14 kubus");
    const g3 = di("luar-dienes-terapan", 2);
    sama([hitungRe(g3, /^pa\d+-k$/), hitungRe(g3, /^sa\d+$/), isiTeks(g3, "va")], [1, 4, "14"], "luar dienes terapan: 1 batang dan 4 kubus = 14");
    const g4 = di("luar-dienes-terapan", 3);
    sama([pilih(g4).map((q) => q.t), dipilih(g4), eq(di("luar-dienes-terapan", 4), "eq")], [["13", "14", "15"], ["14"], "6 + 8 = 14"], "luar dienes terapan: jawaban 14 dipilih; 6 + 8 = 14");
    stat.benda += 80;
  }

  // Aturan pemilik: aplikasi belajar mandiri; tanpa instruksi kelompok, teman, kelas, buku, atau benda nyata.
  {
    const MANDIRI = /kerja kelompok|berkelompok|secara berkelompok|diskusi kelompok|sekelompok|kelompokmu|kelompok belajar|bersama kelompok|tanya teman|survei|karet gelang|uang tabungan|\bpaman\b|\btika\b|\bteman\w*|\bkawan\w*|sekawan|depan kelas|bersama kelas|seluruh kelas|\bkelas\b|berpasangan dengan (teman|kawan)|bekerja berpasangan|secara berpasangan|bermain bersama|bertanya kepada|buat ceritamu|buku|menulis di|menuliskan di|tulis di|tuliskan di|menggambar|gambarlah|gambar sendiri|\bbawa(lah)?\b|membawa|dibawa|\bkertas\b|\bpensil\b|\bpulpen\b|\bspidol\b|ambil (benda|pensil|kelereng|bola|sedotan|balon)|tangan (kiri|kanan)|\bjari\b|menyuruh|suruh|jengkal|telapak|\bdepa\b|penggaris|\bkoin\b|di sekitar|di rumah|di kelas|centimeter|\bmeter\b|kakimu|tanganmu|badanmu|\braba\w*|\bmeraba|\btubuh|\blengan|lingkari|coret|guru kelas|orang tua|\bayah\b|\bibu guru|bapak guru|\bloker\b|singapura|\bkelompokkan lah/i;
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
  const DAFTAR = ["Maju di jalur bilangan", "Pecah bilangan jadi bagian", "Tukar satuan jadi puluhan"];
  cek(/Halo anak-anak/.test(sap.ketukan[0].suara) && /Maju di jalur bilangan/i.test(L.teksTerlihat(akhirAdegan(sap, 1)).join(" | ")), "sapaan materi: tiga hal yang dipelajari tampil");
  sama(L.teksTerlihat(akhirAdegan(sap, 1)).filter((t) => DAFTAR.includes(t)), DAFTAR, "sapaan materi: daftar tiga hal");
  cek(!/\d/.test(sap.ketukan[1].suara) && !/\d/.test(DAFTAR.join(" ")), "sapaan materi: tanpa angka");
  const sapLuar = adegan(U, "sapaan");
  cek(/cara lain/i.test(L.teksTerlihat(akhirAdegan(sapLuar, 1)).join(" | ")) && /metode-luar|Metode luar/.test(sapLuar.sumber), "sapaan metode luar: pengumuman cara lain");
  const ringkasBerkas = new URL("../src/data/kelas2-bab2-ringkas.json", import.meta.url);
  const sumberRingkas = existsSync(ringkasBerkas) ? JSON.parse(readFileSync(ringkasBerkas, "utf8")).subBab?.A : null;
  const sementara = new URL("../.tmp-k2b2s/A.json", import.meta.url);
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
    // Isi tabel dihitung ulang dari kalimat penjumlahan yang tampil di video materi.
    sama(T.kolom, ["Hasil", "Satuan", "Puluhan"], "tabel susun: kolom hasil, satuan, puluhan");
    const tampil = new Set();
    for (const a of M_VIDEO.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const t of L.teksTerlihat(akhirAdegan(a, i))) tampil.add(t);
    for (const b of T.baris) {
      const m = /^(\d+) \+ (\d+)$/.exec(b.label);
      cek(!!m, `tabel susun: label "${b.label}" berbentuk a + b`);
      if (!m) continue;
      const jumlah = Number(m[1]) + Number(m[2]);
      cek(tampil.has(`${b.label} = ${jumlah}`), `tabel susun: "${b.label} = ${jumlah}" tampil pada video materi`);
      cek(b.sel[0] === String(jumlah) && b.sel[1] === String(jumlah % 10) && b.sel[2] === String(Math.floor(jumlah / 10)) && jumlah <= 20, `tabel susun: baris ${b.label} (hasil ${jumlah}, satuan ${jumlah % 10}, puluhan ${Math.floor(jumlah / 10)}) dihitung ulang`);
    }
    cek(T.baris.every((b) => b.sel.every((s) => s.length <= 8)), "tabel susun: sel pendek supaya margin teks >= 5 px di 405 px");
    cek(T.baris.every((b) => b.sel.every((s) => Number(s) <= 20)), "tabel susun: semua bilangan paling besar dua puluh");
    const KATA_LARANG = /buku|halaman|kunci|kerja kelompok|berkelompok|\bteman|kawan|kelas\b|kertas|pensil|\bbawa\b|menggambar|menulis di|depan kelas|luas|keliling|di rumah|survei|karet gelang|uang tabungan|di sekitar|\bpaman\b|\btika\b|loker|ibu guru|singapura|bersusun|meminjam|counting|number bond|dienes \/|regroup/i;
    cek(!KATA_LARANG.test(JSON.stringify({ p: A.petaSusun, t: A.tabelSusun })), "peta dan tabel susun: tanpa kata terlarang dan tanpa nama Inggris, bersusun, kelompok, teman, kelas, buku, kertas, pensil, loker, Ibu guru");
    cek(peta.every((s) => ![...s.teks, ...(s.ikon ?? "")].some((c) => c.codePointAt(0) > 0x1fa95)), "peta susun: emoji paling tinggi Emoji 12");
  } else cek(false, "peta dan tabel susun: .tmp-k2b2s/A.json atau kelas2-bab2-ringkas.json subBab.A.petaSusun ada");
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k2b2A-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k2b2A-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k2b2A sendiri (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d), `${v.id}/${a.id}: emoji gambar paling tinggi Emoji 12`);
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k2b2a.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|naskah-k1b|naskah-k2b2/.test(pembungkus) && /VIDEO_MATERI_K2B2A/.test(pembungkus) && /VIDEO_LUAR_K2B2A/.test(pembungkus) && /export function VideoK2B2A/.test(pembungkus) && /daftar-video-cerita/.test(pembungkus), "video-k2b2a.tsx: dua video dari mesin Story, tanpa naskah lama");
  cek(!/\r/.test(pembungkus), "video-k2b2a.tsx: akhir baris LF");
  const sendiri = readFileSync(new URL("uji-story-k2b2A.mjs", import.meta.url), "utf8");
  cek(!/\r/.test(sendiri), "uji-story-k2b2A.mjs: akhir baris LF");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit diputar)`);
}
console.log(`Pemeriksaan: ${stat.hitung} deret langkah jalur, ${jumlahNama} nama bilangan tampak sebagai angka, ${stat.kalimat} kalimat hitung di suara, ${stat.aritmetika} pemeriksaan aritmetika, ${stat.benda} pemeriksaan benda dan bingkai`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
