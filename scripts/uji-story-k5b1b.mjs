// Uji Story Kelas 5 Bab 1 Sub-Bab B (membandingkan dan mengurutkan bilangan cacah sampai 100.000): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas, teks bertumpuk, pemisahan materi dan metode luar,
// tidak membocorkan subbab berikutnya (komposisi, dekomposisi, operasi hitung), kutipan buku terhadap teks PDF (bila ada),
// hitungan mandiri (harga papan dakon, tabel nilai tempat, kunci Ayo Berlatih, pembulatan ke ribuan, bilangan acuan), perbandingan di gambar,
// tabel nilai tempat dan tabel urutan, garis bilangan dan posisi titik, bilangan bersuara kata yang tampak di gambar, emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k5b1b.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { spawnSync } from "node:child_process";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k5b1b-video.ts");

const stat = { teksPasang: 0, data: 0, banding: 0, tabel: 0, urut: 0, garis: 0, titik: 0, bulat: 0, suara: 0, kutipan: 0 };
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

/* ------------------------------ Isi dua video ------------------------------ */
const VIDEO = [V.VIDEO_MATERI_K5B1B, V.VIDEO_LUAR_K5B1B];
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
const M = V.VIDEO_MATERI_K5B1B;
const U = V.VIDEO_LUAR_K5B1B;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);


/* ------------------------------ Penolong bilangan: eja, lambang, dan pembaca bilangan dalam kata ------------------------------ */
const lambangBil = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const KATA_SATUAN = { nol: 0, satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8, sembilan: 9 };
/** Ubah rangkaian kata bilangan (mis. "lima puluh enam ribu lima ratus") menjadi angka; mengembalikan semua bilangan di kalimat. */
const bilanganDalamKata = (kalimat) => {
  const token = kalimat.toLowerCase().split(/\s+/).filter(Boolean);
  const hasil = [];
  let total = 0;
  let g = 0;
  let sisa = 0;
  let ada = false;
  const tutupRibu = (kali) => {
    total += (g + sisa || 1) * kali;
    g = 0;
    sisa = 0;
  };
  const selesai = () => {
    if (ada) hasil.push(total + g + sisa);
    total = 0;
    g = 0;
    sisa = 0;
    ada = false;
  };
  for (const t of token) {
    const w = t.replace(/[^a-z]/g, "");
    const akhirKalimat = /[,.:;?!]$/.test(t);
    let dikenal = true;
    if (w in KATA_SATUAN) {
      sisa = KATA_SATUAN[w];
      ada = true;
    } else if (w === "sepuluh") {
      g += 10;
      ada = true;
    } else if (w === "sebelas") {
      g += 11;
      ada = true;
    } else if (w === "belas") {
      g += sisa + 10;
      sisa = 0;
    } else if (w === "puluh") {
      g += sisa * 10;
      sisa = 0;
    } else if (w === "ratus") {
      g += (sisa || 1) * 100;
      sisa = 0;
    } else if (w === "seratus") {
      g += 100;
      ada = true;
    } else if (w === "ribu") {
      tutupRibu(1000);
    } else if (w === "seribu") {
      total += 1000;
      ada = true;
    } else dikenal = false;
    if (!dikenal || akhirKalimat) selesai();
  }
  selesai();
  return hasil;
};
sama([56560, 65750, 57000, 75360, 15500, 100000, 1000, 13234].map(lambangBil), ["56.560", "65.750", "57.000", "75.360", "15.500", "100.000", "1.000", "13.234"], "lambang bilangan dengan titik ribuan");
sama(bilanganDalamKata("lima puluh enam ribu lima ratus enam puluh rupiah"), [56560], "pembaca kata bilangan: 56.560");
sama(bilanganDalamKata("tiga belas ribu dua ratus tiga puluh empat, jadi"), [13234], "pembaca kata bilangan: 13.234");
sama(bilanganDalamKata("naik seribu setiap langkah, tujuh belas ribu lima ratus dan sembilan puluh delapan ribu"), [1000, 17500, 98000], "pembaca kata bilangan: seribu, 17.500, 98.000");
sama(bilanganDalamKata("tujuh puluh lima ribu tiga ratus enam puluh dan seratus ribu"), [75360, 100000], "pembaca kata bilangan: 75.360 dan 100.000");

/* ------------------------------ Data buku dan hitungan mandiri ------------------------------ */
// Buku Siswa hlm. 10-15 (PDF 26-31) dan Refleksi hlm. 26 (PDF 42); Panduan Guru hlm. 25-29 (PDF 37-41). Semua dihitung ulang di sini, bukan salinan teks kunci.
const HARGA = { a: 56560, b: 65750, c: 57000, d: 75360 };
const tempat = (n) => String(n).padStart(5, "0").split("").map(Number);
const bulatRibuan = (n) => Math.floor(n / 1000) * 1000 + (n % 1000 >= 500 ? 1000 : 0);
const banding = (x, y) => (x < y ? "<" : x > y ? ">" : "=");
/** Banding dari kiri: tempat pertama yang berbeda, dari puluh ribuan (0) sampai satuan (4); -1 bila sama. */
const bedaPertama = (x, y) => tempat(x).findIndex((d, i) => d !== tempat(y)[i]);
{
  // Eksplorasi 1.2: urutan harga papan dakon
  const murah = Object.entries(HARGA).sort((p, q) => p[1] - q[1]).map((e) => e[0]);
  const mahal = Object.entries(HARGA).sort((p, q) => q[1] - p[1]).map((e) => e[0]);
  sama(murah, ["a", "c", "b", "d"], "urutan termurah: a, c, b, d");
  sama(mahal, ["d", "b", "c", "a"], "urutan termahal: d, b, c, a");
  // Puluh ribuan tiap papan: a 5, b 6, c 5, d 7; paling kecil 5 dimiliki a dan c
  sama(Object.values(HARGA).map((h) => tempat(h)[0]), [5, 6, 5, 7], "puluh ribuan papan a, b, c, d");
  sama(Object.entries(HARGA).filter(([, h]) => tempat(h)[0] === 5).map((e) => e[0]), ["a", "c"], "puluh ribuan paling kecil (5) dimiliki papan a dan c");
  sama([tempat(HARGA.a)[1], tempat(HARGA.c)[1]], [6, 7], "ribuan papan a = 6, papan c = 7");
  cek(HARGA.c > HARGA.a && bedaPertama(HARGA.a, HARGA.c) === 1, "papan a dan c berbeda pertama di ribuan, c lebih besar");
  sama(tempat(HARGA.a), [5, 6, 5, 6, 0], "tabel nilai tempat papan a");
  sama(tempat(HARGA.b), [6, 5, 7, 5, 0], "tabel nilai tempat papan b");
  sama(tempat(HARGA.c), [5, 7, 0, 0, 0], "tabel nilai tempat papan c");
  sama(tempat(HARGA.d), [7, 5, 3, 6, 0], "tabel nilai tempat papan d");
  // Ayo Berlatih nomor 1 (yang lebih kecil) dan kunci Panduan Guru hlm. 28
  const lebihKecil = (x, y) => Math.min(x, y);
  sama([lebihKecil(56475, 43217), lebihKecil(78897, 87897), lebihKecil(97768, 89876)], [43217, 78897, 89876], "kunci nomor 1: 43.217, 78.897, 89.876");
  sama([bedaPertama(56475, 43217), bedaPertama(78897, 87897), bedaPertama(97768, 89876)], [0, 0, 0], "nomor 1: ketiganya berbeda pertama di puluh ribuan");
  // Ayo Berlatih nomor 2 (tanda) dan kunci
  const pasangan2 = [[76675, 67765], [86567, 86576], [45867, 55876], [13234, 13234]];
  sama(pasangan2.map(([x, y]) => banding(x, y)), [">", "<", "<", "="], "kunci nomor 2: > < < =");
  sama(pasangan2.map(([x, y]) => bedaPertama(x, y)), [0, 3, 0, -1], "nomor 2: tempat beda pertama (puluh ribuan, puluhan, puluh ribuan, tidak ada)");
  // Ayo Berlatih nomor 3 (barisan)
  const barisan = (awal, langkah, banyak) => Array.from({ length: banyak }, (_, i) => awal + i * langkah);
  sama(barisan(15500, 1000, 5), [15500, 16500, 17500, 18500, 19500], "kunci 3a: naik 1.000");
  sama(barisan(30000, 20000, 4), [30000, 50000, 70000, 90000], "kunci 3b: naik 20.000");
  sama(barisan(85350, 50, 5), [85350, 85400, 85450, 85500, 85550], "kunci 3c: naik 50");
  // Miskonsepsi: angka belakang terbesar tidak menentukan
  cek(tempat(43217)[4] > tempat(56475)[4] && 56475 > 43217, "miskonsepsi: satuan 7 > 5 tetapi 56.475 > 43.217");
  // Pembulatan ke ribuan terdekat (Rounding Estimate Compare)
  sama([56475, 43217, 56560, 57000, 65750, 75360, 97768, 89876].map(bulatRibuan), [56000, 43000, 57000, 57000, 66000, 75000, 98000, 90000], "pembulatan ke ribuan terdekat");
  sama([56560, 57000].map(bulatRibuan), [57000, 57000], "papan a dan c berbulat sama (perkiraan belum cukup)");
  sama(banding(98000, 90000), ">", "98.000 > 90.000");
  // Bilangan acuan
  sama([HARGA.a < 60000, HARGA.b > 60000, 76675 > 70000, 67765 < 70000, 45867 < 50000, 55876 > 50000], [true, true, true, true, true, true], "bilangan acuan memisahkan pasangan");
  cek(86567 > 80000 && 86576 > 80000 && Math.abs(86576 - 86567) < 100, "pasangan kedua nomor 2: sama-sama di atas acuan 80.000, berdekatan sekali");
  // Posisi pada garis bilangan: urutan sama dengan urutan harga
  sama(Object.entries(HARGA).sort((p, q) => p[1] - q[1]).map((e) => e[0]).join(""), "acbd", "urutan di garis bilangan: a, c, b, d");
  stat.data += 40;
}

/* ------------------------------ Pemeriksa perbandingan di gambar ------------------------------ */
const angkaDari = (s) => Number(s.replace(/\./g, ""));
{
  let n = 0;
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((_, i) => {
        for (const o of akhirAdegan(a, i)) {
          if (o.t !== "teks" || !o.isi) continue;
          for (const m of o.isi.matchAll(/\d[\d.]*(?:\s*[<>=]\s*\d[\d.]*)+/g)) {
            const bagian = m[0].split(/\s*([<>=])\s*/);
            for (let q = 0; q + 2 < bagian.length; q += 2) {
              const x = angkaDari(bagian[q]);
              const y = angkaDari(bagian[q + 2]);
              n += 1;
              cek(banding(x, y) === bagian[q + 1], `${v.id}/${a.id}#${i + 1}: perbandingan "${m[0]}" benar (${bagian[q]} ${bagian[q + 1]} ${bagian[q + 2]})`);
            }
          }
        }
      });
    }
  }
  cek(n >= 20, `jumlah perbandingan di gambar yang diperiksa (${n})`);
  stat.banding = n;
}

/* ------------------------------ Tabel nilai tempat: tiap baris sama dengan bilangan yang dibaca ------------------------------ */
const barisTabel = (objs) => {
  const kelompok = new Map();
  for (const o of objs) {
    const m = /^(\w+)-r(\d+)t([0-4])$/.exec(o.id);
    if (m && o.t === "teks") {
      const kunci = `${m[1]}|${m[2]}`;
      if (!kelompok.has(kunci)) kelompok.set(kunci, { id: m[1], baris: Number(m[2]), digit: {}, nama: objs.find((p) => p.id === `${m[1]}-r${m[2]}n`)?.isi });
      kelompok.get(kunci).digit[Number(m[3])] = o.isi;
    }
  }
  return [...kelompok.values()].filter((g) => Object.keys(g.digit).length === 5).map((g) => ({ ...g, bilangan: Number([0, 1, 2, 3, 4].map((j) => g.digit[j]).join("")) }));
};
{
  let n = 0;
  const DAFTAR = new Set([56560, 65750, 57000, 75360, 56475, 43217, 86567, 86576, 13234]);
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((_, i) => {
        for (const g of barisTabel(akhirAdegan(a, i))) {
          n += 1;
          cek(DAFTAR.has(g.bilangan), `${v.id}/${a.id}#${i + 1}: baris tabel ${g.id}/${g.baris} = ${g.bilangan} termasuk bilangan buku`);
          if (g.nama in HARGA) cek(HARGA[g.nama] === g.bilangan, `${v.id}/${a.id}#${i + 1}: baris papan ${g.nama} di tabel ${g.id} = ${HARGA[g.nama]}`);
        }
      });
    }
  }
  // Tabel nilai tempat harga papan dakon di adegan "tabel-nilai-tempat" ketukan terakhir memuat keempat papan
  const tt = barisTabel(akhirAdegan(adegan(M, "tabel-nilai-tempat")));
  sama(tt.map((g) => g.bilangan), [56560, 65750, 57000, 75360], "tabel nilai tempat: empat papan berurutan a, b, c, d");
  cek(n >= 25, `jumlah baris tabel nilai tempat yang diperiksa (${n})`);
  stat.tabel = n;
}

/* ------------------------------ Tabel urutan (No., Papan, Harga): naik atau turun dan nomor berurutan ------------------------------ */
{
  let n = 0;
  const baca = (objs, id) => {
    const out = [];
    for (let i = 0; i < 4; i += 1) {
      const no = objs.find((o) => o.id === `${id}-r${i}t0`)?.isi;
      const papan = objs.find((o) => o.id === `${id}-r${i}t1`)?.isi;
      const harga = objs.find((o) => o.id === `${id}-r${i}t2`)?.isi;
      if (no !== undefined) out.push({ no: Number(no), papan, harga: angkaDari(harga) });
    }
    return out;
  };
  const a = adegan(M, "urut-harga");
  const akhir = akhirAdegan(a);
  const tm = baca(akhir, "tm");
  const th = baca(akhir, "th");
  sama(tm.map((r) => r.papan), ["a", "c", "b", "d"], "tabel termurah: papan a, c, b, d");
  sama(th.map((r) => r.papan), ["d", "b", "c", "a"], "tabel termahal: papan d, b, c, a");
  cek(tm.every((r, i) => r.no === i + 1 && r.harga === HARGA[r.papan]) && th.every((r, i) => r.no === i + 1 && r.harga === HARGA[r.papan]), "tabel urutan: nomor berurutan dan harga cocok dengan papan");
  cek(tm.every((r, i) => i === 0 || r.harga > tm[i - 1].harga), "tabel termurah: harga naik");
  cek(th.every((r, i) => i === 0 || r.harga < th[i - 1].harga), "tabel termahal: harga turun");
  // Tabel nama baris sama dengan di Ayo Bermain
  const bermain = baca(akhirAdegan(adegan(M, "ayo-bermain"), 2), "tb");
  sama(bermain.map((r) => [r.papan, r.harga]), [["a", 56560], ["b", 65750], ["c", 57000], ["d", 75360]], "tabel Ayo Bermain: papan a sampai d");
  n = tm.length + th.length + bermain.length;
  stat.urut = n;
}

/* ------------------------------ Garis bilangan: jarak tanda sama, angka naik, titik pada posisi yang benar ------------------------------ */
{
  let nGaris = 0;
  let nTitik = 0;
  const kelompokGaris = (objs) => {
    const peta = new Map();
    for (const o of objs) {
      const m = /^(\w+)-(b|n)(\d+)$/.exec(o.id);
      if (!m || !(o.t === "garis" || o.t === "teks")) continue;
      if (!peta.has(m[1])) peta.set(m[1], { tanda: [], angka: [] });
      peta.get(m[1])[m[2] === "b" ? "tanda" : "angka"][Number(m[3])] = o;
    }
    return [...peta.entries()].map(([id, g]) => ({ id, ...g }));
  };
  // Titik yang harus berada pada posisi bilangannya (bulat berid dan bilangannya)
  const TITIK = {
    "luar-garis": { gb: { d1: 43217, d2: 56475 } },
    "luar-garis-terapan": { gt: { pa: 56560, pc: 57000, pb: 65750, pd: 75360 } },
    "luar-acuan": { ga: { pa: 56560, pb: 65750 } },
    "luar-acuan-terapan": { gc: { p1: 76675, p2: 67765 }, gd: { q1: 45867, q2: 55876 }, ge: { r1: 86567 } },
  };
  for (const a of U.adegan) {
    a.ketukan.forEach((_, i) => {
      const objs = akhirAdegan(a, i);
      for (const g of kelompokGaris(objs)) {
        nGaris += 1;
        const nilai = g.angka.map((o) => angkaDari(o.isi));
        const langkah = nilai[1] - nilai[0];
        cek(nilai.every((x, q) => q === 0 || x - nilai[q - 1] === langkah) && langkah > 0, `${a.id}#${i + 1}: garis ${g.id} angka naik rata (${nilai.join(", ")})`);
        const xs = g.tanda.map((o) => o.x);
        const jarak = xs[1] - xs[0];
        cek(xs.every((x, q) => q === 0 || Math.abs(x - xs[q - 1] - jarak) < 1e-6), `${a.id}#${i + 1}: garis ${g.id} jarak tanda sama`);
        cek(g.angka.every((o, q) => Math.abs(o.x - g.tanda[q].x) < 1e-6), `${a.id}#${i + 1}: garis ${g.id} angka tepat di bawah tanda`);
        const dari = nilai[0];
        const sampai = nilai[nilai.length - 1];
        const x0 = xs[0];
        const xAkhir = xs[xs.length - 1];
        for (const [idTitik, bil] of Object.entries(TITIK[a.id]?.[g.id] ?? {})) {
          const titik = objs.find((o) => o.id === idTitik);
          if (!titik) continue;
          nTitik += 1;
          const harapan = x0 + ((bil - dari) / (sampai - dari)) * (xAkhir - x0);
          hampir(titik.x, harapan, 0.05, `${a.id}#${i + 1}: titik ${idTitik} (${bil}) pada posisinya di garis ${g.id}`);
          cek(bil >= dari && bil <= sampai, `${a.id}#${i + 1}: bilangan ${bil} berada dalam rentang garis ${g.id}`);
        }
      }
    });
  }
  // Acuan: garis merah tepat pada bilangan acuan
  const acuan = (a, id, bil, dari, sampai) => {
    const objs = akhirAdegan(a, 1);
    const g = kelompokGaris(objs).find((x) => x.id === id);
    const x0 = g.tanda[0].x;
    const xAkhir = g.tanda[g.tanda.length - 1].x;
    hampir(objs.find((o) => o.id === (a.id === "luar-acuan" ? "ac" : "ac"))?.x ?? -999, x0 + ((bil - dari) / (sampai - dari)) * (xAkhir - x0), 0.05, `${a.id}: garis acuan ${bil} pada posisinya`);
  };
  acuan(adegan(U, "luar-acuan"), "ga", 60000, 40000, 80000);
  const ter = adegan(U, "luar-acuan-terapan");
  hampir(akhirAdegan(ter, 0).find((o) => o.id === "ac").x, 150, 0.05, "acuan 70.000 di tengah garis 60.000 sampai 80.000");
  hampir(akhirAdegan(ter, 2).find((o) => o.id === "ad").x, 150, 0.05, "acuan 50.000 di tengah garis 40.000 sampai 60.000");
  cek(nGaris >= 10 && nTitik >= 15, `jumlah garis (${nGaris}) dan titik (${nTitik}) yang diperiksa`);
  stat.garis = nGaris;
  stat.titik = nTitik;
}

/* ------------------------------ Pembulatan di gambar: asal, hasil, dan angka ratusan ------------------------------ */
{
  let n = 0;
  for (const a of [adegan(U, "luar-bulat"), adegan(U, "luar-bulat-terapan")]) {
    a.ketukan.forEach((_, i) => {
      const objs = akhirAdegan(a, i);
      for (const o of objs) {
        const m = /^(\w+)a-t0$/.exec(o.id);
        if (!m) continue;
        const hasil = objs.find((p) => p.id === `${m[1]}b-t0`)?.isi;
        const catatan = objs.find((p) => p.id === `${m[1]}c`)?.isi;
        if (!hasil) continue;
        n += 1;
        const asal = angkaDari(o.isi);
        cek(bulatRibuan(asal) === angkaDari(hasil), `${a.id}#${i + 1}: ${o.isi} dibulatkan ke ribuan terdekat = ${lambangBil(bulatRibuan(asal))} (tertulis ${hasil})`);
        cek(catatan === `ratusan ${Math.floor((asal % 1000) / 100)}`, `${a.id}#${i + 1}: catatan "${catatan}" cocok dengan angka ratusan ${o.isi}`);
      }
    });
  }
  cek(n >= 12, `jumlah baris pembulatan yang diperiksa (${n})`);
  stat.bulat = n;
}

/* ------------------------------ Sinkron suara dan gambar: bilangan yang diucapkan dengan kata tampak di gambar ------------------------------ */
{
  let n = 0;
  const BOLEH_TAK_TAMPAK = new Set([10000]); // "tiap tanda sepuluh ribu" hanya selisih tanda garis
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      const tampak = new Set();
      a.ketukan.forEach((kt, i) => {
        for (let p = 0; p < L.kataDari(kt.suara).length; p += 1) {
          const objs = L.keadaanStory(a, i, p);
          for (const o of objs) if (o.t === "teks" && o.isi) for (const m of o.isi.matchAll(/\d{1,3}(?:\.\d{3})+|\d{4,}/g)) tampak.add(angkaDari(m[0]));
          for (const g of barisTabel(objs)) tampak.add(g.bilangan);
        }
        for (const bil of bilanganDalamKata(kt.suara)) {
          if (bil < 1000 || BOLEH_TAK_TAMPAK.has(bil)) continue;
          n += 1;
          cek(tampak.has(bil), `${v.id}/${a.id}#${i + 1}: bilangan ${lambangBil(bil)} di suara tampak di gambar`);
        }
      });
    }
  }
  cek(n >= 80, `jumlah bilangan bersuara yang dicocokkan dengan gambar (${n})`);
  stat.suara = n;
}

/* ------------------------------ Pemisahan materi dan metode luar ------------------------------ */
{
  const teksVideo = (v) => JSON.stringify(seluruhTeks(v));
  const NAMA_METODE = /Leftmost Compare|Number Line Order|Benchmark Numbers|Rounding Estimate Compare|banding dari kiri|Bilangan Acuan|metode luar|metode dari luar/i;
  const materi = teksVideo(M);
  const luar = teksVideo(U);
  cek(!NAMA_METODE.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of ["Leftmost Compare", "Number Line Order", "Benchmark Numbers", "Rounding Estimate Compare"]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  cek(M.adegan.every((a) => /(Buku Siswa|Panduan Guru) hlm\./.test(a.sumber)), "video materi: tiap adegan mencatat halaman buku");
  cek(U.adegan.every((a) => /metode luar|Ringkasan/i.test(a.sumber)), "video metode luar: tiap adegan bersumber metode luar atau ringkasan");
  for (const kata of ["Subbab B", "Membandingkan dan Mengurutkan", "Eksplorasi 1.2", "Masalah Lukas", "Ayo Bermain", "Ayo Menyimak Percakapan", "Ayo Berpikir Kritis", "Ayo Berlatih", "papan dakon", "Lukas", "Komang", "termurah", "termahal", "Miskonsepsi", "Diferensiasi", "Refleksi nomor 4 dan 5"]) cek(materi.includes(kata), `video materi memuat "${kata}"`);
  const idsM = M.adegan.map((a) => a.id);
  const idsU = U.adegan.map((a) => a.id);
  sama(idsM, ["pembuka-b", "persiapan-b", "masalah-lukas", "ayo-bermain", "tabel-nilai-tempat", "percakapan", "urut-harga", "berpikir-kritis", "pelaksanaan-guru", "berlatih-1-2", "berlatih-3", "penutup-b"], "urutan adegan video materi");
  sama(idsU, ["luar-pembuka", "luar-kiri", "luar-kiri-terapan", "luar-garis", "luar-garis-terapan", "luar-acuan", "luar-acuan-terapan", "luar-bulat", "luar-bulat-terapan", "luar-ringkas"], "urutan adegan video metode luar");
  cek(M.adegan.length === 12 && U.adegan.length === 10, "12 adegan materi dan 10 adegan metode luar");
  // Subbab B tidak membocorkan Subbab C (komposisi dan dekomposisi) dan Subbab D (operasi hitung)
  const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
  const BOCOR = /komposisi|dekomposisi|penjumlahan|pengurangan|perkalian|pembagian|ditambah|dikurangi|dikali|dibagi|bentuk uraian|menguraikan|uang asep|uang lukas|lembar|keping|operasi/i;
  for (const a of [...M.adegan, ...U.adegan]) cek(!BOCOR.test(teksAdegan(a)), `${a.id} tidak membocorkan komposisi, dekomposisi, atau operasi hitung (Subbab C dan D)`);
  // Isi subbab lain, Uji Kompetensi, dan Refleksi nomor lain bukan milik subbab ini.
  cek(!/Uji Kompetensi|pengayaan|remedial|Refleksi nomor (satu|dua|tiga|enam|tujuh|delapan|[1-37-9])/i.test(materi + luar), "tidak memakai isi subbab lain, Uji Kompetensi, atau Refleksi nomor lain");
  cek(/Refleksi, nomor empat dan lima/.test(materi), "Refleksi nomor 4 dan 5 (menurut Buku Siswa hlm. 26)");
  cek(totalKetukan >= 90, `total ketukan cukup dalam (${totalKetukan})`);
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
  // Buku Siswa hlm. 10-15 = PDF 26-31, Refleksi hlm. 26 = PDF 42; Panduan Guru hlm. 25-29 = PDF 37-41.
  const bagian = existsSync(bs) && existsSync(bg) ? [ambil(bs, 26, 31), ambil(bs, 42, 42), ambil(bg, 37, 41)] : [null];
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
    cek(n >= 80, `jumlah kutipan buku yang diperiksa (${n})`);
    stat.kutipan = n;
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k5b1b-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|k5b1b-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k5b1b sendiri (${impor.join(", ")})`);
  }
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k5b1b.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_B51|video-k4b2-umum|naskah-k5b1/.test(pembungkus) && /VIDEO_MATERI_K5B1B/.test(pembungkus) && /VIDEO_LUAR_K5B1B/.test(pembungkus) && /export function VideoK5B1B/.test(pembungkus) && /DaftarVideoCerita/.test(pembungkus) && !pembungkus.includes("\r"), "video-k5b1b.tsx: dua video Story baru, tanpa naskah lama, ekspor VideoK5B1B tetap");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${((n * 0.5) / 60).toFixed(1)} menit suara)`);
}
console.log(`Pemeriksaan: ${stat.data} hitungan buku, ${stat.banding} perbandingan, ${stat.tabel} baris tabel nilai tempat, ${stat.urut} baris tabel urutan, ${stat.garis} garis bilangan, ${stat.titik} titik, ${stat.bulat} baris pembulatan, ${stat.suara} bilangan bersuara, ${stat.kutipan ?? 0} kutipan, ${stat.teksPasang} pasang teks`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
