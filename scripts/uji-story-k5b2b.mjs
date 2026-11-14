// Uji Story Kelas 5 Bab 2 Sub-Bab B (kelipatan persekutuan dan KPK): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas, teks bertumpuk, pemisahan materi dan metode luar,
// tidak membocorkan subbab berikutnya (faktor, FPB, faktor prima terperinci), kutipan buku terhadap teks PDF (bila ada),
// hitungan mandiri (kelipatan, KPK, tanggal jadwal latihan dengan Date), persamaan di gambar, tabel bilangan 1-50, deret kelipatan bersel,
// irisan dua lingkaran, garis hari jadwal, emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k5b2b.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { spawnSync } from "node:child_process";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k5b2b-video.ts");

const stat = { teksPasang: 0, persamaan: 0, deret: 0, tabel: 0, kpk: 0, tanggal: 0, lingkaran: 0, garisHari: 0, daftar: 0, kutipan: 0 };
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
const hampir = (a, b, tol, pesan) => cek(Math.abs(a - b) <= tol, `${pesan}: ${a} != ${b} (toleransi ${tol})`);

cek(typeof L.keadaanStory === "function" && typeof L.posisiKata === "function", "mesin Story tersedia");

/* ------------------------------ Geometri umum ------------------------------ */
const bilangan = (d) => (d.match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number);
/** Titik mutlak bangun dari jalur tertutup lurus (M, L, ..., Z). */
const titikJalur = (o) => {
  const d = o.d ?? "";
  if (!/^M[-\d. L]+ Z$/.test(d)) return null;
  const n = bilangan(d);
  if (n.length < 6 || n.length % 2 !== 0) return null;
  const out = [];
  for (let i = 0; i < n.length; i += 2) out.push([(o.x ?? 0) + n[i], (o.y ?? 0) + n[i + 1]]);
  return out;
};
const jalurDari = (objs, id) => titikJalur(objs.find((o) => o.id === id));

/* ------------------------------ Isi dua video ------------------------------ */
const VIDEO = [V.VIDEO_MATERI_K5B2B, V.VIDEO_LUAR_K5B2B];
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
    cek(a.ketukan.length >= 4 && a.ketukan.length <= 14, `${nama}: 4 sampai 14 ketukan (ada ${a.ketukan.length})`);
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
      // ubah dan hapus harus menyasar benda yang ada saat itu (urutan aksi sama dengan urutan penerapan mesin)
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
      // sinkron angka: tiap bilangan dalam suara tampak di gambar pada ketukan ini atau sebelumnya
      for (let p = 0; p < kata.length; p += 1) for (const o of L.keadaanStory(a, i, p)) if (o.t === "teks" && o.isi) for (const b of bilanganDari(o.isi)) terlihat.add(b);
      for (const b of bilanganDari(kt.suara)) cek(terlihat.has(b), `${nama}#${i + 1}: bilangan ${b} di suara tampak di gambar`);
      // gambar mengikuti kata
      const titikAksi = [...new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at)))].sort((m, n) => m - n);
      if (titikAksi.length >= 2) {
        const sid = titikAksi.map((p) => L.sidikKeadaan(L.keadaanStory(a, i, p)));
        cek(new Set(sid).size >= 2, `${nama}#${i + 1}: gambar berubah mengikuti kata dalam kalimat`);
      }
      // gambar masuk kanvas 300 x 208
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
          if (!t && /^[MLQTZ\d.\s-]+$/.test(o.d ?? "")) {
            const n = bilangan(o.d);
            for (let q = 0; q + 1 < n.length; q += 2) cek(x + n[q] > -2 && x + n[q] < 302 && y + n[q + 1] > -2 && y + n[q + 1] < 204, `${nama}#${i + 1}: lintasan ${o.id} masuk kanvas`);
          }
        } else if (o.t === "garis" || o.t === "panah") cek(x > -2 && x < 302 && y > -2 && y < 204 && x + (o.x2 ?? 0) > -2 && x + (o.x2 ?? 0) < 302 && y + (o.y2 ?? 0) > -2 && y + (o.y2 ?? 0) < 204, `${nama}#${i + 1}: garis ${o.id} masuk kanvas`);
      }
      // teks tidak boleh bertumpuk
      {
        const teksAda = akhir.filter((o) => o.t === "teks" && (o.op ?? 1) > 0 && o.isi && !/^[\u{1F000}-\u{1FFFF}☀-➿]/u.test(o.isi));
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

/* ------------------------------ Penolong adegan ------------------------------ */
const seluruhTeks = (v) => v.adegan.map((a) => [a.judul, a.sumber, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const M = V.VIDEO_MATERI_K5B2B;
const U = V.VIDEO_LUAR_K5B2B;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksId = (objs, id) => objs.find((o) => o.id === id)?.isi;
const WARNA = { putih: "#FFFFFF", emas: "#FFC800", hijauPita: "#86EFAC", jingga: "#FDBA74", merahPita: "#F87171" };

/* ------------------------------ Data buku dan hitungan mandiri ------------------------------ */
// Buku Siswa hlm. 38-42 (PDF 54-58), Refleksi hlm. 60 (PDF 76); Panduan Guru hlm. 52-60 (PDF 64-72). Semua dihitung ulang di sini, bukan salinan teks kunci.
const fpb = (a, b) => (b === 0 ? Math.abs(a) : fpb(b, a % b));
const kpk2 = (a, b) => (a / fpb(a, b)) * b;
const kpk = (...n) => n.reduce((t, x) => kpk2(t, x));
const kelipatanN = (n, banyak) => Array.from({ length: banyak }, (_, i) => n * (i + 1));
const prima = (n) => n > 1 && Array.from({ length: Math.max(0, Math.floor(Math.sqrt(n)) - 1) }, (_, i) => i + 2).every((d) => n % d !== 0);
const persekutuan = (a, b, sampai) => Array.from({ length: sampai }, (_, i) => i + 1).filter((n) => n % a === 0 && n % b === 0);
const BULAN = { 7: "Juli", 8: "Agustus", 9: "September", 1: "Januari" };
const tanggal = (bulan, hari, tambah, tahun = 2022) => {
  const d = new Date(Date.UTC(tahun, bulan - 1, hari + tambah));
  return { bulan: d.getUTCMonth() + 1, hari: d.getUTCDate(), tahun: d.getUTCFullYear() };
};
const jadwal = (bulan, hari, langkah, banyak) => Array.from({ length: banyak }, (_, i) => tanggal(bulan, hari, i * langkah));

{
  sama([kpk(2, 3), kpk(4, 5), kpk(6, 8), kpk(5, 7), kpk(3, 4, 5), kpk(2, 5), kpk(3, 4), kpk(3, 5), kpk(3, 5, 7)], [6, 20, 24, 35, 60, 10, 12, 15, 105], "KPK semua pasangan di buku");
  sama(persekutuan(2, 3, 50), kelipatanN(6, 8), "kelipatan persekutuan 2 dan 3 sampai 50 = kelipatan 6");
  sama(persekutuan(4, 5, 45), [20, 40], "kelipatan persekutuan 4 dan 5 sampai 45 = 20 dan 40");
  sama(persekutuan(5, 7, 70), [35, 70], "kelipatan persekutuan 5 dan 7 sampai 70 = 35 dan 70");
  sama(persekutuan(6, 8, 48), [24, 48], "kelipatan persekutuan 6 dan 8 sampai 48 = 24 dan 48");
  sama(persekutuan(3, 4, 60).filter((n) => n % 5 === 0), [60], "kelipatan persekutuan 3, 4, dan 5 sampai 60 hanya 60");
  sama(persekutuan(3, 5, 105).filter((n) => n % 7 === 0), [105], "kelipatan persekutuan 3, 5, dan 7 sampai 105 hanya 105");
  sama(persekutuan(3, 4, 12), [12], "3 dan 4 sama pertama di 12 (Eksplorasi 2.2B)");
  sama(persekutuan(3, 5, 15), [15], "3 dan 5 sama pertama di 15 (Asep dan Lukas)");
  sama(persekutuan(2, 5, 10), [10], "2 dan 5 sama pertama di 10 (Dinda dan Amelia)");
  // Hasil kali bukan selalu KPK (miskonsepsi 2): 6 x 8 = 48 tetapi KPK 24; 5 x 7 = 35 sama dengan KPK karena FPB = 1.
  sama([6 * 8, kpk(6, 8), fpb(6, 8)], [48, 24, 2], "miskonsepsi: 6 x 8 = 48 bukan KPK (24), FPB 2");
  sama([5 * 7, kpk(5, 7), fpb(5, 7)], [35, 35, 1], "miskonsepsi: 5 x 7 = KPK karena FPB 1");
  sama([12 % 3, 12 % 4, 12 % 5 !== 0], [0, 0, true], "miskonsepsi 3: 12 kelipatan 3 dan 4 tetapi bukan 5");
  // Tanggal jadwal latihan (tahun 2022), dihitung dengan Date.
  const nisa = tanggal(8, 3, kpk(3, 4));
  sama([nisa.bulan, nisa.hari], [8, 15], "Nisa dan Yohana: 3 Agustus + 12 hari = 15 Agustus");
  const asep = tanggal(8, 20, kpk(3, 5));
  sama([asep.bulan, asep.hari, 20 + kpk(3, 5), 20 + kpk(3, 5) - 31], [9, 4, 35, 4], "Asep dan Lukas: 20 + 15 = 35, 35 - 31 = 4 September");
  const dinda = tanggal(7, 14, kpk(2, 5));
  sama([dinda.bulan, dinda.hari], [7, 24], "Dinda dan Amelia: 14 Juli + 10 hari = 24 Juli");
  const warung = tanggal(9, 20, kpk(3, 5, 7));
  sama([warung.tahun, warung.bulan, warung.hari], [2023, 1, 3], "Warung: 20 September + 105 hari = 3 Januari 2023");
  // Jadwal pada kalender: Lukas tiap 5 hari dan Asep tiap 3 hari mulai 20 Agustus; pertemuan pertama setelah 20 Agustus.
  const lukas = jadwal(8, 20, 5, 5);
  const asepJ = jadwal(8, 20, 3, 7);
  sama(lukas.map((t) => t.hari), [20, 25, 30, 4, 9], "jadwal Lukas pada kalender");
  sama(asepJ.map((t) => t.hari), [20, 23, 26, 29, 1, 4, 7], "jadwal Asep pada kalender (1 September ada, tidak terlewat)");
  const kunciPanduan = [20, 23, 26, 29, 4, 7]; // daftar Asep di Panduan Guru hlm. 57 melewatkan 1 September
  cek(!kunciPanduan.includes(1) && asepJ.some((t) => t.bulan === 9 && t.hari === 1), "temuan: daftar Asep di Panduan Guru melewatkan 1 September");
  const pertama = asepJ.slice(1).find((t) => lukas.some((u) => u.bulan === t.bulan && u.hari === t.hari));
  sama([pertama.bulan, pertama.hari], [9, 4], "pertemuan pertama Asep dan Lukas lewat kalender = 4 September");
  // Kunci Ayo Berlatih: kelipatan 6 yang benar dan kesalahan ketik di kunci
  sama(kelipatanN(6, 9), [6, 12, 18, 24, 30, 36, 42, 48, 54], "kelipatan 6 yang benar (kunci menulis 32 setelah 24)");
  cek(32 % 6 !== 0 && 30 % 6 === 0, "32 bukan kelipatan 6, 30 kelipatan 6");
  sama(kelipatanN(3, 6), [3, 6, 9, 12, 15, 18], "kelipatan 3 yang benar (kunci melewatkan 9)");
  // Pengulangan siklus: hari 12, 24, 36 kelipatan 12
  sama(kelipatanN(12, 3), [12, 24, 36], "siklus 12 hari berulang");
  // Perhitungan jumlah di tabel 1-50
  const hitung = (n) => Array.from({ length: 50 }, (_, i) => i + 1).filter((x) => x % n === 0).length;
  sama([hitung(2), hitung(3), hitung(6)], [25, 16, 8], "tabel 1-50: kelipatan 2, 3, dan 6");
  // Faktor prima 6, 8, 4, 12 dan KPK dari eksponen terbesar
  const faktorisasi = (n) => {
    const f = {};
    for (let d = 2; n > 1; d += 1) while (n % d === 0) { f[d] = (f[d] ?? 0) + 1; n /= d; }
    return f;
  };
  const kpkPrima = (...n) => {
    const maks = {};
    for (const x of n) for (const [p, e] of Object.entries(faktorisasi(x))) maks[p] = Math.max(maks[p] ?? 0, e);
    return Object.entries(maks).reduce((t, [p, e]) => t * Number(p) ** e, 1);
  };
  sama([kpkPrima(6, 8), kpkPrima(3, 4, 5), kpkPrima(4, 5)], [24, 60, 20], "KPK lewat faktor prima sama dengan KPK lewat daftar");
  sama([faktorisasi(6), faktorisasi(8), faktorisasi(4)], [{ 2: 1, 3: 1 }, { 2: 3 }, { 2: 2 }], "faktorisasi 6, 8, dan 4");
  stat.kpk += 22;
}

/* ------------------------------ Pemeriksa persamaan di gambar ------------------------------ */
const nilaiEkspresi = (s) => {
  const t = s.trim().replace(/×/g, "*").replace(/:/g, "/");
  return Function(`"use strict"; return (${t || "NaN"});`)();
};
{
  let n = 0;
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((_, i) => {
        for (const o of akhirAdegan(a, i)) {
          if (o.t !== "teks" || !o.isi || !/^[\d(][\d\s+×():/-]*(?:=[\d\s+×():/-]+)+$/.test(o.isi.trim())) continue;
          const bagian = o.isi.split("=").map((s) => s.trim()).filter(Boolean);
          if (bagian.length < 2) continue;
          const nilai = bagian.map(nilaiEkspresi);
          n += 1;
          cek(nilai.every((x) => Math.abs(x - nilai[0]) < 1e-9), `${v.id}/${a.id}#${i + 1}: persamaan "${o.isi}" benar (${nilai.join(" ; ")})`);
        }
      });
    }
  }
  cek(n >= 25, `jumlah persamaan yang diperiksa (${n})`);
  stat.persamaan = n;
}

/* ------------------------------ Faktor prima di gambar: tiap faktor prima dan hasil kali benar ------------------------------ */
{
  let n = 0;
  for (const a of [adegan(U, "luar-prima"), adegan(U, "luar-prima-terapan")]) {
    a.ketukan.forEach((_, i) => {
      for (const o of akhirAdegan(a, i)) {
        const m = o.t === "teks" && o.isi ? /^(\d+) = (\d+(?: × \d+)+)$/.exec(o.isi) : null;
        if (!m) continue;
        const f = m[2].split(" × ").map(Number);
        n += 1;
        cek(f.every(prima), `${a.id}#${i + 1}: "${o.isi}" memakai faktor prima saja`);
        cek(f.reduce((t, x) => t * x, 1) === Number(m[1]), `${a.id}#${i + 1}: "${o.isi}" hasil kali benar`);
      }
    });
  }
  // KPK lewat faktor prima: hasil kali yang ditulis sama dengan KPK yang disebut di adegan itu
  const lihat = (a, ke) => akhirAdegan(a, ke).filter((o) => o.t === "teks").map((o) => o.isi);
  cek(lihat(adegan(U, "luar-prima"), 3).includes("2 × 2 × 2 × 3 = 24") && lihat(adegan(U, "luar-prima"), 3).includes("KPK 6 dan 8 = 24"), "prima: 2 x 2 x 2 x 3 = 24 = KPK 6 dan 8");
  cek(lihat(adegan(U, "luar-prima-terapan"), 2).includes("2 × 2 × 3 × 5 = 60") && lihat(adegan(U, "luar-prima-terapan"), 2).includes("KPK 3, 4, dan 5 = 60"), "prima: 2 x 2 x 3 x 5 = 60 = KPK 3, 4, dan 5");
  cek(n >= 5, `jumlah faktorisasi yang diperiksa (${n})`);
  stat.kpk += n;
}

/* ------------------------------ KPK, kelipatan, dan kelipatan persekutuan yang tertulis di gambar ------------------------------ */
{
  let nk = 0;
  let nl = 0;
  let ns = 0;
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((_, i) => {
        for (const o of akhirAdegan(a, i)) {
          if (o.t !== "teks" || !o.isi) continue;
          const m = /^KPK ([\d, dan]+) = (\d+)$/.exec(o.isi);
          if (m) {
            nk += 1;
            const angka = m[1].replace(/dan/g, " ").split(/[,\s]+/).filter(Boolean).map(Number);
            cek(kpk(...angka) === Number(m[2]), `${v.id}/${a.id}#${i + 1}: "${o.isi}" benar (KPK = ${kpk(...angka)})`);
          }
          const l = /^kelipatan (\d+): ([\d, ]+), \.\.\.$/.exec(o.isi);
          if (l) {
            nl += 1;
            const n = Number(l[1]);
            const daftar = l[2].split(", ").map(Number);
            cek(daftar.every((x, q) => x === n * (q + 1)), `${v.id}/${a.id}#${i + 1}: "${o.isi}" benar`);
          }
          const s = /^(\d+) dan (\d+) sama di: ([\d, ]+?)(?:, \.\.\.)?$/.exec(o.isi);
          if (s) {
            ns += 1;
            const [a1, a2] = [Number(s[1]), Number(s[2])];
            const daftar = s[3].split(", ").map(Number);
            cek(daftar.every((x, q) => x === kpk(a1, a2) * (q + 1)), `${v.id}/${a.id}#${i + 1}: "${o.isi}" benar (kelipatan persekutuan ${a1} dan ${a2})`);
          }
          const y = /^yang sama( pertama)?: ([\d, ]+?)(?:, \.\.\.)?$/.exec(o.isi);
          if (y) {
            ns += 1;
            const daftar = y[2].split(", ").map(Number);
            cek(daftar.every((x, q) => x % daftar[0] === 0 && x === daftar[0] * (q + 1)), `${v.id}/${a.id}#${i + 1}: "${o.isi}" berurutan kelipatan bilangan pertamanya`);
          }
        }
      });
    }
  }
  cek(nk >= 18 && nl >= 12 && ns >= 6, `jumlah KPK, daftar kelipatan, dan kelipatan persekutuan yang diperiksa (${nk}, ${nl}, ${ns})`);
  stat.daftar = nl + ns;
  stat.kpk += nk;
}

/* ------------------------------ Geometri sel: tabel bilangan, deret kelipatan, kisi ------------------------------ */
const kelompokSel = (objs) => {
  const g = new Map();
  for (const o of objs) {
    const m = /^(.*)-(\d+)$/.exec(o.id);
    if (!m || o.t !== "kotak") continue;
    if (!g.has(m[1])) g.set(m[1], []);
    g.get(m[1]).push({ ...o, no: Number(m[2]) });
  }
  for (const s of g.values()) s.sort((p, q) => p.no - q.no);
  return g;
};
const warnaSel = (objs, id, q) => objs.find((o) => o.id === `${id}-${q}`)?.warna;
const angkaSel = (objs, id, q) => Number(objs.find((o) => o.id === `${id}t${q}`)?.isi);
const KELOMPOK_TANGGAL = new Set(["lk", "ap"]);
{
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((_, i) => {
        const t = akhirAdegan(a, i);
        const nama = `${v.id}/${a.id}#${i + 1}`;
        for (const [id, sel] of kelompokSel(t)) {
          cek(sel.every((o, q) => o.no === q), `${nama}: sel ${id} bernomor berurutan dari nol`);
          const lebar = sel[0].w;
          const tinggi = sel[0].h;
          cek(sel.every((o) => Math.abs(o.w - lebar) < 0.01 && Math.abs(o.h - tinggi) < 0.01), `${nama}: sel ${id} sama besar`);
          const kolom = sel.filter((o) => Math.abs(o.y - sel[0].y) < 0.01).length;
          cek(sel.length % kolom === 0, `${nama}: sel ${id} membentuk kisi lengkap`);
          cek(sel.every((o, q) => Math.abs(o.x - (sel[0].x + (q % kolom) * lebar)) < 0.01 && Math.abs(o.y - (sel[0].y + Math.floor(q / kolom) * tinggi)) < 0.01), `${nama}: sel ${id} rapat tanpa celah`);
          // tiap sel punya angka (teks) berisi bilangan yang benar
          const angka = sel.map((_, q) => angkaSel(t, id, q));
          cek(angka.every((x) => Number.isInteger(x) && x > 0), `${nama}: tiap sel ${id} punya angka`);
          if (KELOMPOK_TANGGAL.has(id)) {
            stat.deret += 1;
          } else {
            cek(angka.every((x, q) => x === angka[0] * (q + 1)), `${nama}: angka sel ${id} berupa kelipatan berurutan (${angka.join(",")})`);
            stat.deret += 1;
            if (kolom === 10) stat.tabel += 1;
          }
        }
      });
    }
  }
  cek(stat.deret >= 30 && stat.tabel >= 4, `jumlah deret dan tabel yang diperiksa (${stat.deret}, ${stat.tabel})`);
}

{
  // Tabel 1-50: 50 sel, 10 kolom, warna menurut kelipatan pada tiap ketukan
  const a = adegan(M, "tabel-50");
  const bil = (n) => n - 1;
  const t0 = akhirAdegan(a, 0);
  cek(kelompokSel(t0).get("tb").length === 50, "tabel: 50 sel");
  cek(Array.from({ length: 50 }, (_, q) => angkaSel(t0, "tb", q)).every((x, q) => x === q + 1), "tabel: angka 1 sampai 50 berurutan");
  const warnaDiharapkan = (n, ke) => {
    if (ke >= 3 && n % 6 === 0) return WARNA.merahPita;
    if (ke >= 2 && n % 3 === 0) return WARNA.jingga;
    if (ke >= 1 && n % 2 === 0) return WARNA.hijauPita;
    return WARNA.putih;
  };
  for (const ke of [0, 1, 2, 3]) {
    const t = akhirAdegan(a, ke);
    cek(Array.from({ length: 50 }, (_, n) => warnaSel(t, "tb", bil(n + 1)) === warnaDiharapkan(n + 1, ke)).every(Boolean), `tabel ketukan ${ke + 1}: warna sel sesuai kelipatan 2, 3, dan 6`);
  }
  const banyak = (ke, id) => Number(/(\d+)/.exec(teksId(akhirAdegan(a, ke), id) ?? "")?.[1]);
  sama([banyak(1, "c2"), banyak(2, "c3"), banyak(3, "c7")], [25, 16, 8], "tabel: jumlah bilangan yang disebut");
  sama(teksId(akhirAdegan(a, 3), "c6"), kelipatanN(6, 8).join(", "), "tabel: daftar kelipatan 6 dan 3 yang terwarnai dua kali");
  // Deret 1-12 pada Tepuk Bilangan: baris atas kelipatan 2, baris bawah kelipatan 3, enam dan dua belas keduanya
  const tp = adegan(M, "tepuk-2-3");
  const ra = (ke) => akhirAdegan(tp, ke);
  cek(Array.from({ length: 12 }, (_, q) => warnaSel(ra(2), "ra", q) === ((q + 1) % 2 === 0 ? WARNA.hijauPita : WARNA.putih)).every(Boolean), "tepuk: baris atas diwarnai kelipatan 2");
  cek(Array.from({ length: 12 }, (_, q) => warnaSel(ra(3), "rb", q) === ((q + 1) % 3 === 0 ? WARNA.jingga : WARNA.putih)).every(Boolean), "tepuk: baris bawah diwarnai kelipatan 3");
  cek(Array.from({ length: 12 }, (_, q) => warnaSel(ra(4), "ra", q) === ((q + 1) % 6 === 0 ? WARNA.merahPita : (q + 1) % 2 === 0 ? WARNA.hijauPita : WARNA.putih) && warnaSel(ra(4), "rb", q) === ((q + 1) % 6 === 0 ? WARNA.merahPita : (q + 1) % 3 === 0 ? WARNA.jingga : WARNA.putih)).every(Boolean), "tepuk: enam dan dua belas (kelipatan 2 dan 3) merah pada kedua baris");
  stat.tabel += 2;
}

{
  // Pasangan deret kelipatan: sel bertanda adalah kelipatan persekutuan, dan semua kelipatan persekutuan yang ada di kedua deret ditandai
  const PASANGAN = [["ka", "kb"], ["da", "db"], ["ea", "eb"], ["fa", "fb"], ["p5", "p7"], ["q6", "q8"]];
  let n = 0;
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      for (let ke = 0; ke < a.ketukan.length; ke += 1) {
        const akhir = akhirAdegan(a, ke);
        for (const [g1, g2] of PASANGAN) {
          const s1 = kelompokSel(akhir).get(g1);
          const s2 = kelompokSel(akhir).get(g2);
          if (!s1 || !s2) continue;
          const angka1 = s1.map((_, q) => angkaSel(akhir, g1, q));
          const angka2 = s2.map((_, q) => angkaSel(akhir, g2, q));
          const sama2 = angka1.filter((x) => angka2.includes(x));
          const tandai1 = s1.filter((o) => o.warna !== WARNA.putih).map((o) => angkaSel(akhir, g1, o.no));
          const tandai2 = s2.filter((o) => o.warna !== WARNA.putih).map((o) => angkaSel(akhir, g2, o.no));
          if (tandai1.length === 0 && tandai2.length === 0) continue; // belum ditandai pada ketukan ini
          n += 1;
          const nama = `${v.id}/${a.id}#${ke + 1}`;
          sama(tandai1, sama2, `${nama}: sel ${g1} yang bertanda = kelipatan persekutuan ${angka1[0]} dan ${angka2[0]}`);
          sama(tandai2, sama2, `${nama}: sel ${g2} yang bertanda = kelipatan persekutuan ${angka1[0]} dan ${angka2[0]}`);
          cek(sama2.every((x) => x % angka1[0] === 0 && x % angka2[0] === 0) && sama2.length >= 1, `${nama}: yang sama pada ${g1} dan ${g2} habis dibagi kedua bilangan dasar`);
          cek(sama2[0] === kpk(angka1[0], angka2[0]), `${nama}: bilangan sama pertama pada ${g1} dan ${g2} adalah KPK ${angka1[0]} dan ${angka2[0]}`);
          cek(angka1.includes(kpk(angka1[0], angka2[0])) && angka2.includes(kpk(angka1[0], angka2[0])), `${nama}: deret ${g1} dan ${g2} cukup panjang sampai KPK`);
        }
      }
    }
  }
  cek(n >= 6, `jumlah pasangan deret yang diperiksa (${n})`);
  stat.deret += n;
}

/* ------------------------------ Jadwal di kalender (Asep dan Lukas), kartu tanggal, dan garis hari ------------------------------ */
{
  const a = adegan(M, "diskusi-asep-lukas");
  const t = akhirAdegan(a, 5);
  const lk = kelompokSel(t).get("lk").map((_, q) => angkaSel(t, "lk", q));
  const ap = kelompokSel(t).get("ap").map((_, q) => angkaSel(t, "ap", q));
  sama(lk, jadwal(8, 20, 5, 5).map((x) => x.hari), "diskusi: sel jadwal Lukas = hari-hari latihan dari kalender");
  sama(ap, jadwal(8, 20, 3, 7).map((x) => x.hari), "diskusi: sel jadwal Asep = hari-hari latihan dari kalender");
  // sel yang ditandai emas: 4 September (indeks 3 pada Lukas dan 5 pada Asep)
  cek(warnaSel(t, "lk", 3) === WARNA.emas && warnaSel(t, "ap", 5) === WARNA.emas && lk[3] === 4 && ap[5] === 4, "diskusi: 4 September ditandai pada kedua jadwal");
  cek([0, 1, 2, 4].every((q) => warnaSel(t, "lk", q) === WARNA.putih) && [0, 1, 2, 3, 4, 6].every((q) => warnaSel(t, "ap", q) === WARNA.putih), "diskusi: hanya 4 September yang ditandai");
  cek(teksId(t, "bt") === "bersama lagi: 4 September", "diskusi: teks pertemuan pertama 4 September");
  stat.tanggal += 4;
}

{
  // Kartu dan teks tanggal: tiap tanggal hasil hitungan mandiri tampak di video
  const semua = JSON.stringify([seluruhTeks(M), seluruhTeks(U)]);
  const ada = (s) => semua.includes(s);
  const target = [
    [`${tanggal(8, 3, 12).hari} ${BULAN[tanggal(8, 3, 12).bulan]}`, "15 Agustus"],
    [`${tanggal(8, 20, 15).hari} ${BULAN[tanggal(8, 20, 15).bulan]}`, "4 September"],
    [`${tanggal(7, 14, 10).hari} ${BULAN[tanggal(7, 14, 10).bulan]}`, "24 Juli"],
    [`${tanggal(9, 20, 105).hari} ${BULAN[tanggal(9, 20, 105).bulan]} ${tanggal(9, 20, 105).tahun}`, "3 Januari 2023"],
  ];
  for (const [hitung, tulis] of target) {
    sama(hitung, tulis, "tanggal hasil hitungan sama dengan tulisan");
    cek(ada(tulis), `tanggal ${tulis} tampak di video`);
    stat.tanggal += 1;
  }
  // Suara menyebut tanggal yang sama
  const suara = JSON.stringify([M, U].flatMap((v) => v.adegan.flatMap((a) => a.ketukan.map((kt) => kt.suara))));
  for (const s of ["lima belas Agustus", "empat September", "dua puluh empat Juli", "tiga Januari"]) cek(suara.includes(s), `suara menyebut "${s}"`);
}

{
  // Garis hari Meeting Cycle: tanda tiap hari, titik Nisa tiap 3 hari, titik Yohana tiap 4 hari, bertemu di hari 12
  const a = adegan(U, "luar-siklus");
  const t = akhirAdegan(a);
  const X0 = 24;
  const LANGKAH = 21;
  for (let d = 0; d <= 12; d += 1) {
    const tanda = t.find((o) => o.id === `gh-b${d}`);
    cek(!!tanda && Math.abs(tanda.x - (X0 + d * LANGKAH)) < 0.01, `siklus: tanda hari ${d} pada x ${X0 + d * LANGKAH}`);
    cek(teksId(t, `gh-n${d}`) === String(d), `siklus: angka hari ${d}`);
  }
  const hariDot = (pre) => t.filter((o) => o.id.startsWith(pre) && o.t === "bulat").map((o) => ({ d: Number(o.id.slice(pre.length)), o }));
  const nisa = hariDot("gn");
  const yohana = hariDot("gy");
  sama(nisa.map((x) => x.d), [3, 6, 9, 12], "siklus: titik Nisa pada hari kelipatan 3 sampai 12");
  sama(yohana.map((x) => x.d), [4, 8, 12], "siklus: titik Yohana pada hari kelipatan 4 sampai 12");
  cek([...nisa, ...yohana].every((x) => Math.abs(x.o.x - (X0 + x.d * LANGKAH)) < 0.01), "siklus: tiap titik tepat di atas tanda harinya");
  sama(nisa.map((x) => x.d).filter((d) => yohana.some((y) => y.d === d)), [12], "siklus: Nisa dan Yohana bertemu pertama di hari 12 (KPK 3 dan 4)");
  const gv = t.find((o) => o.id === "gv");
  cek(!!gv && Math.abs(gv.x - (X0 + 12 * LANGKAH)) < 0.01 && gv.x2 === 0, "siklus: garis penanda tegak lurus tepat di hari 12");
  stat.garisHari += 6;
}

/* ------------------------------ Irisan dua lingkaran (LCM Concept) ------------------------------ */
{
  const pasang = [["luar-irisan", "i", 2, 3, 1], ["luar-irisan-terapan", "j", 4, 5, 2]];
  for (const [id, pre, p, q, ke] of pasang) {
    const a = adegan(U, id);
    const t = akhirAdegan(a, ke);
    const A = t.find((o) => o.id === `${pre}A`);
    const B = t.find((o) => o.id === `${pre}B`);
    cek(A && B && A.r === B.r && Math.abs(A.y - B.y) < 0.01, `${id}: dua lingkaran sama besar sejajar`);
    const jarak = Math.abs(B.x - A.x);
    cek(jarak > 0 && jarak < 2 * A.r, `${id}: kedua lingkaran beririsan (jarak ${jarak} < ${2 * A.r})`);
    // angka-angka di tiap daerah: kiri saja, kanan saja, irisan
    const daftar = (awal) => t.filter((o) => o.t === "teks" && o.id.startsWith(awal) && /^[\d, ]+$/.test(o.isi ?? "")).flatMap((o) => o.isi.split(/, ?/).filter(Boolean).map(Number));
    const kiri = daftar(`${pre}L`);
    const kanan = daftar(`${pre}R`);
    const tengah = daftar(`${pre}M`);
    cek(kiri.length >= 4 && kanan.length >= 4 && tengah.length >= 2, `${id}: ketiga daerah berisi bilangan (${kiri.length}, ${kanan.length}, ${tengah.length})`);
    cek(kiri.every((x) => x % p === 0 && x % q !== 0), `${id}: daerah kiri hanya kelipatan ${p} yang bukan kelipatan ${q} (${kiri.join(",")})`);
    cek(kanan.every((x) => x % q === 0 && x % p !== 0), `${id}: daerah kanan hanya kelipatan ${q} yang bukan kelipatan ${p} (${kanan.join(",")})`);
    cek(tengah.every((x, i) => x === kpk(p, q) * (i + 1)), `${id}: irisan berisi kelipatan persekutuan ${p} dan ${q} berurutan (${tengah.join(",")})`);
    // letak teks: kiri di sebelah kiri irisan, kanan di sebelah kanan
    const x = (awal) => t.filter((o) => o.id.startsWith(awal) && o.t === "teks" && /^[\d, ]+$/.test(o.isi)).map((o) => o.x);
    cek(x(`${pre}L`).every((v) => v < B.x - B.r) && x(`${pre}R`).every((v) => v > A.x + A.r) && x(`${pre}M`).every((v) => v > B.x - B.r && v < A.x + A.r), `${id}: bilangan terletak di daerah yang benar`);
    stat.lingkaran += 1;
  }
  // Kelipatan dari KPK di irisan: 12 = 2 x 6, 18 = 3 x 6, 40 = 2 x 20, 60 = 3 x 20, 80 = 4 x 20 (diperiksa lewat pemeriksa persamaan)
}

/* ------------------------------ Pemisahan materi dan metode luar ------------------------------ */
{
  const teksVideo = (v) => JSON.stringify(seluruhTeks(v));
  const NAMA_METODE = /Common Multiples List|LCM Concept|Prime Factor Preview|Meeting Cycle|Daftar Kelipatan Bersama|KPK dari Irisan|Siklus Bertemu|metode luar|metode dari luar/i;
  const materi = teksVideo(M);
  const luar = teksVideo(U);
  cek(!NAMA_METODE.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of ["Common Multiples List", "LCM Concept", "Prime Factor Preview", "Meeting Cycle"]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  cek(M.adegan.every((a) => /(Buku Siswa|Panduan Guru) hlm\./.test(a.sumber)), "video materi: tiap adegan mencatat halaman buku");
  cek(U.adegan.every((a) => /metode luar|Ringkasan/i.test(a.sumber)), "video metode luar: tiap adegan bersumber metode luar atau ringkasan");
  for (const kata of ["Subbab B", "Kelipatan Persekutuan", "Eksplorasi 2.2A", "Eksplorasi 2.2B", "Tepuk Bilangan", "Latihan Renang", "Ayo Berdiskusi", "Ayo Berlatih", "Warung Kelontong", "kelipatan persekutuan terkecil", "Dinda", "Amelia", "Asep", "Lukas", "Nisa", "Yohana"]) cek(materi.includes(kata), `video materi memuat "${kata}"`);
  const idsM = M.adegan.map((a) => a.id);
  const idsU = U.adegan.map((a) => a.id);
  sama(idsM, ["pembuka-b", "persiapan-b", "tepuk-2-3", "tabel-50", "definisi-kpk", "cara-kpk-4-5", "renang-nisa-yohana", "diskusi-asep-lukas", "berlatih-b", "miskonsepsi-b", "penutup-b"], "urutan adegan video materi");
  sama(idsU, ["luar-pembuka", "luar-daftar", "luar-daftar-terapan", "luar-irisan", "luar-irisan-terapan", "luar-prima", "luar-prima-terapan", "luar-siklus", "luar-siklus-terapan", "luar-ringkas"], "urutan adegan video metode luar");
  cek(M.adegan.length === 11 && U.adegan.length === 10, "11 adegan materi dan 10 adegan metode luar");
  // Subbab B tidak membocorkan subbab berikutnya: faktor (C), FPB (D), faktor prima terperinci (E)
  const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
  const BOCOR_KERAS = /pohon faktor|faktor persekutuan|persekutuan terbesar|pasangan faktor|habis dibagi|faktorisasi|saringan|eratosthenes|congklak/i;
  const BOCOR_FAKTOR = /faktor|prima/i;
  const BOCOR_FPB = /FPB/;
  const BOLEH_FPB_MATERI = new Set(["pembuka-b", "miskonsepsi-b", "penutup-b"]); // kutipan harfiah tujuan, miskonsepsi 1, dan Refleksi 7 di buku
  const BOLEH_FAKTOR_LUAR = new Set(["luar-pembuka", "luar-prima", "luar-prima-terapan", "luar-ringkas"]); // metode luar ketiga berupa pratinjau ringan
  for (const a of M.adegan) {
    cek(!BOCOR_KERAS.test(teksAdegan(a)) && !BOCOR_FAKTOR.test(teksAdegan(a)), `materi ${a.id} tidak membocorkan faktor, FPB, atau faktor prima (Subbab C sampai E)`);
    if (!BOLEH_FPB_MATERI.has(a.id)) cek(!BOCOR_FPB.test(teksAdegan(a)), `materi ${a.id} tidak menyebut FPB`);
  }
  for (const a of U.adegan) {
    cek(!BOCOR_KERAS.test(teksAdegan(a)) && !BOCOR_FPB.test(teksAdegan(a)), `metode luar ${a.id} tidak membocorkan isi Subbab C sampai E`);
    if (!BOLEH_FAKTOR_LUAR.has(a.id)) cek(!BOCOR_FAKTOR.test(teksAdegan(a)), `metode luar ${a.id} tidak menyebut faktor atau prima`);
  }
  // Pratinjau faktor prima hanya pengantar: tidak ada algoritma pohon faktor atau pembagian berulang
  cek(!/pembagian berulang|pohon|tabel faktor/i.test(luar), "pratinjau faktor prima tidak memuat pohon faktor atau pembagian berulang");
  cek(/pratinjau/i.test(JSON.stringify(adegan(U, "luar-prima"))) && /nanti/i.test(JSON.stringify(adegan(U, "luar-prima"))), "pratinjau faktor prima menyatakan materi lengkapnya nanti");
  // Isi subbab lain, Uji Kompetensi, dan Refleksi nomor lain bukan milik subbab ini.
  cek(!/Uji Kompetensi|pengayaan|remedial|Refleksi nomor (satu|empat|lima|enam|delapan|sembilan|[14-6890])/i.test(materi + luar), "tidak memakai isi subbab lain atau Refleksi nomor lain");
  cek(/Refleksi nomor 2, 3, dan 7/.test(materi), "Refleksi nomor 2, 3, dan 7 (menurut Panduan Guru hlm. 59)");
  cek(totalKetukan >= 80, `total ketukan cukup dalam (${totalKetukan})`);
}

/* ------------------------------ Kutipan buku (bila PDF tersedia) ------------------------------ */
{
  const bs = new URL("../bahan-sd/Matematika-BS-KLS-V.pdf", import.meta.url);
  const bg = new URL("../bahan-sd/Matematika-BG-KLS-V.pdf", import.meta.url);
  const jalur = (u) => u.pathname.replace(/^\/([A-Za-z]:)/, "$1");
  const ambil = (berkas, dari, sampai) => {
    const r = spawnSync("pdftotext", ["-enc", "UTF-8", "-f", String(dari), "-l", String(sampai), "-raw", jalur(berkas), "-"], { encoding: "utf8", maxBuffer: 1 << 26 });
    return r.status === 0 ? r.stdout : null;
  };
  // Buku Siswa hlm. 38-42 = PDF 54-58, Refleksi hlm. 60 = PDF 76; Panduan Guru hlm. 52-60 = PDF 64-72.
  const bagian = existsSync(bs) && existsSync(bg) ? [ambil(bs, 54, 58), ambil(bs, 76, 76), ambil(bg, 64, 72)] : [null];
  if (bagian.some((b) => b === null)) console.log("PDF atau pdftotext tidak tersedia: pemeriksaan kutipan buku dilewati");
  else {
    const bersih = (t) => t.toLowerCase().replace(/-\s*\n\s*/g, "-").replace(/\s+/g, " ").trim();
    const buku = bersih(bagian.join("\n"));
    let n = 0;
    for (const a of M.adegan) {
      for (const kt of a.kutipan ?? []) {
        n += 1;
        cek(buku.includes(bersih(kt)), `kutipan buku ${a.id}: "${kt}" ada di teks PDF`);
      }
    }
    cek(n >= 90, `jumlah kutipan buku yang diperiksa (${n})`);
    stat.kutipan = n;
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k5b2b-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|k5b2b-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k5b2b sendiri (${impor.join(", ")})`);
  }
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k5b2b.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_B52|video-k4b2-umum|naskah-k5b2/.test(pembungkus) && /VIDEO_MATERI_K5B2B/.test(pembungkus) && /VIDEO_LUAR_K5B2B/.test(pembungkus) && /export function VideoK5B2B/.test(pembungkus) && /DaftarVideoCerita/.test(pembungkus) && !pembungkus.includes("\r"), "video-k5b2b.tsx: dua video Story baru, tanpa naskah lama, ekspor VideoK5B2B tetap");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${((n * 0.5) / 60).toFixed(1)} menit suara)`);
}
console.log(`Pemeriksaan: ${stat.persamaan} persamaan, ${stat.kpk} KPK dan faktorisasi, ${stat.daftar} daftar kelipatan, ${stat.deret} deret/tabel bersel, ${stat.tabel} tabel, ${stat.lingkaran} irisan lingkaran, ${stat.garisHari} garis hari, ${stat.tanggal} tanggal, ${stat.kutipan ?? 0} kutipan, ${stat.teksPasang} pasang teks`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
