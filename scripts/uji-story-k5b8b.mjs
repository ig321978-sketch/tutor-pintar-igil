// Uji Story Kelas 5 Bab 8 Sub-Bab B (Piktogram): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, sinkron angka suara dan gambar, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas,
// pemisahan materi dan metode luar, kutipan buku (bila PDF ada), hitungan mandiri (gambar kali kunci, jumlah, selisih),
// emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k5b8b.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { spawnSync } from "node:child_process";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k5b8b-video.ts");

let lulus = 0;
let gagal = 0;
const cek = (kondisi, pesan) => {
  if (kondisi) lulus += 1;
  else {
    gagal += 1;
    console.log("GAGAL:", pesan);
  }
};
const js = (x) => JSON.stringify(x, (_, v) => (typeof v === "bigint" ? `${v}n` : v));
const sama = (a, b, pesan) => cek(js(a) === js(b), `${pesan}: ${js(a)} != ${js(b)}`);

/* Mesin (logika-story) diuji lengkap di scripts/uji-story-k6b4a.mjs. */
cek(typeof L.keadaanStory === "function" && typeof L.posisiKata === "function", "mesin Story tersedia");

/* ------------------------------ Bilangan mandiri (bilangan bulat murni) ------------------------------ */
const angka = (t) => Number(String(t).replace(/\./g, ""));
const bandingSelisih = (a, b) => (angka(a) - angka(b) > 0 ? ">" : angka(a) - angka(b) < 0 ? "<" : "=");

/** Periksa semua hubungan bilangan di teks gambar: hasil kali, hasil bagi (dengan sisa), jumlah, selisih, dan rantai pembanding. Mengembalikan jumlah yang diperiksa. */
function periksaTeks(t, nama) {
  let n = 0;
  let s = t;
  const pola = (re, f) => {
    for (const m of s.matchAll(re)) {
      n += 1;
      f(m);
    }
    s = s.replace(re, " ");
  };
  pola(/(\d[\d.]*) x (\d[\d.]*) = (\d[\d.]*)/g, (m) => cek(angka(m[1]) * angka(m[2]) === angka(m[3]), `${nama}: hasil kali di gambar "${m[0]}" benar`));
  pola(/(\d[\d.]*) : (\d[\d.]*) = (\d[\d.]*) sisa (\d[\d.]*)/g, (m) => cek(Math.floor(angka(m[1]) / angka(m[2])) === angka(m[3]) && angka(m[1]) % angka(m[2]) === angka(m[4]), `${nama}: hasil bagi bersisa di gambar "${m[0]}" benar`));
  pola(/(\d[\d.]*) : (\d[\d.]*) = (\d[\d.]*)/g, (m) => cek(angka(m[1]) === angka(m[2]) * angka(m[3]), `${nama}: hasil bagi di gambar "${m[0]}" benar`));
  pola(/(\d[\d.]*) : (\d[\d.]*) sisa (\d[\d.]*)/g, (m) => cek(angka(m[1]) % angka(m[2]) === angka(m[3]), `${nama}: sisa bagi di gambar "${m[0]}" benar`));
  pola(/(\d[\d.]*) - (\d[\d.]*) = (\d[\d.]*)/g, (m) => cek(angka(m[1]) - angka(m[2]) === angka(m[3]), `${nama}: selisih di gambar "${m[0]}" benar`));
  pola(/(\d[\d.]*) \+ (\d[\d.]*) = (\d[\d.]*)/g, (m) => cek(angka(m[1]) + angka(m[2]) === angka(m[3]), `${nama}: jumlah di gambar "${m[0]}" benar`));
  for (const m of s.matchAll(/\d[\d.]*(?: [<>=] \d[\d.]*)+/g)) {
    const bagian = m[0].split(" ");
    for (let i = 0; i + 2 < bagian.length; i += 2) {
      n += 1;
      cek(bandingSelisih(bagian[i], bagian[i + 2]) === bagian[i + 1], `${nama}: rantai di gambar "${m[0]}" benar`);
    }
  }
  // kunci per jumlah gambar: data 12 atau jumlah panen tomat 60
  for (const m of s.matchAll(/kunci (\d+)(?: kg)?: (\d+) gambar/g)) {
    n += 1;
    cek(12 / Number(m[1]) === Number(m[2]) || 60 / Number(m[1]) === Number(m[2]), `${nama}: jumlah gambar per kunci "${m[0]}" benar`);
  }
  return n;
}

/* ------------------------------ Isi dua video ------------------------------ */
const VIDEO = [V.VIDEO_MATERI_K5B8B, V.VIDEO_LUAR_K5B8B];
const bilanganDari = (t) => (t.match(/\d[\d.]*\d|\d/g) ?? []).map((v) => v.replace(/\./g, ""));
const semuaSidik = new Map();
let totalKetukan = 0;
let totalKata = 0;
let diperiksa = 0;
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
      cek(!/[=×÷<>\/%+]/.test(kt.suara), `${nama}#${i + 1}: suara tanpa lambang yang sulit dibaca mesin suara`);
      cek(/[.?!]$/.test(kt.suara.trim()), `${nama}#${i + 1}: suara berakhir tanda baca`);
      cek(kt.aksi.length >= 1, `${nama}#${i + 1}: ada aksi gambar`);
      // pemicu kata
      for (const ak of kt.aksi) {
        const p = L.posisiKata(kt.suara, ak.at);
        cek(p >= 0, `${nama}#${i + 1}: pemicu "${ak.at}" ditemukan dalam kalimat`);
        if (typeof ak.at === "number") cek(ak.at >= 0 && ak.at < kata.length, `${nama}#${i + 1}: pemicu angka ${ak.at} dalam batas`);
      }
      // ubah dan hapus harus menyasar benda yang ada saat itu
      {
        const peta = new Set(L.keadaanStory(a, i - 1, 9999).map((o) => o.id));
        if (i === 0) peta.clear();
        const urut = [...kt.aksi].map((ak) => ({ ak, p: L.posisiKata(kt.suara, ak.at) })).sort((m, n) => m.p - n.p);
        for (const { ak } of urut) {
          if (ak.bersih) peta.clear();
          for (const id of ak.hapus === undefined ? [] : [].concat(ak.hapus)) {
            cek(peta.has(id), `${nama}#${i + 1}: hapus "${id}" menyasar benda yang ada`);
            peta.delete(id);
          }
          for (const o of ak.tambah === undefined ? [] : [].concat(ak.tambah)) peta.add(o.id);
          for (const u of ak.ubah === undefined ? [] : [].concat(ak.ubah)) cek(peta.has(u.id), `${nama}#${i + 1}: ubah "${u.id}" menyasar benda yang ada`);
        }
      }
      // keadaan akhir ketukan
      const akhir = L.keadaanStory(a, i, 9999);
      const sidik = L.sidikKeadaan(akhir);
      cek(sebelumnya === null || sidik !== sebelumnya, `${nama}#${i + 1}: gambar berubah dibanding ketukan sebelumnya`);
      sebelumnya = sidik;
      const kunci = `${v.id}/${a.id}`;
      if (i === a.ketukan.length - 1) {
        const lama = semuaSidik.get(sidik);
        cek(!lama, `${nama}: gambar akhir adegan tidak sama dengan adegan lain (${lama ?? ""})`);
        semuaSidik.set(sidik, kunci);
      }
      // id benda unik dalam satu keadaan
      cek(new Set(akhir.map((o) => o.id)).size === akhir.length, `${nama}#${i + 1}: id benda unik`);
      // sinkron angka: tiap bilangan dalam suara tampak di gambar pada ketukan ini atau sebelumnya
      for (let p = 0; p < kata.length; p += 1) for (const o of L.keadaanStory(a, i, p)) if (o.t === "teks" && o.isi) for (const b of bilanganDari(o.isi)) terlihat.add(b);
      for (const b of bilanganDari(kt.suara)) cek(terlihat.has(b), `${nama}#${i + 1}: bilangan ${b} di suara tampak di gambar`);
      // hubungan bilangan yang tampak di gambar dihitung mandiri
      for (const o of akhir) if (o.t === "teks" && (o.op ?? 1) > 0 && o.isi) diperiksa += periksaTeks(o.isi, `${nama}#${i + 1}`);
      // gambar mengikuti kata: bila ada aksi pada lebih dari satu kata, keadaan harus bertambah di sepanjang kalimat
      const titik = [...new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at)))].sort((m, n) => m - n);
      if (titik.length >= 2) {
        const sid = titik.map((p) => L.sidikKeadaan(L.keadaanStory(a, i, p)));
        cek(new Set(sid).size >= 2, `${nama}#${i + 1}: gambar berubah mengikuti kata dalam kalimat`);
      }
      // gambar masuk kanvas 300 x 208
      for (const o of akhir) {
        const x = o.x ?? 0;
        const y = o.y ?? 0;
        if (o.t === "teks") {
          const lebar = (o.isi ?? "").length * (o.u ?? 10) * 0.56;
          const kiri = (o.anchor ?? "middle") === "middle" ? x - lebar / 2 : (o.anchor ?? "middle") === "end" ? x - lebar : x;
          cek(y > 0 && y < 210 && kiri > -4 && kiri + lebar < 304, `${nama}#${i + 1}: teks "${o.isi}" masuk kanvas (x=${x}, y=${y}, lebar=${Math.round(lebar)})`);
        } else if (o.t === "kotak") cek(x > -2 && y > -2 && x + (o.w ?? 0) < 302 && y + (o.h ?? 0) < 210, `${nama}#${i + 1}: kotak ${o.id} masuk kanvas`);
        else if (o.t === "bulat") cek(x - (o.r ?? 0) > -2 && x + (o.r ?? 0) < 302 && y - (o.r ?? 0) > -2 && y + (o.r ?? 0) < 210, `${nama}#${i + 1}: bulat ${o.id} masuk kanvas`);
        else if (o.t === "jalur") cek(x > -2 && x < 302 && y > -2 && y < 210, `${nama}#${i + 1}: jalur ${o.id} berpusat di kanvas`);
      }
    });
  }
}

/* ------------------------------ Pemisahan materi dan metode luar ------------------------------ */
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map((a) => [a.judul, a.sumber, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]));
  const NAMA_METODE = /Pictograph Scale Legend|Unit Symbol Consistency|Pictograph Error Hunt|Frequency-to-Pictograph|Scale Legend|Error Hunt|metode luar|metode dari luar/i;
  const SUB_LAIN = /diagram batang|sumbu|skala batang|batang ganda|Sub-Bab A|Sub-Bab C|komposisi|dekomposisi|susun|urai/i;
  const materi = teksVideo(V.VIDEO_MATERI_K5B8B);
  const luar = teksVideo(V.VIDEO_LUAR_K5B8B);
  cek(!NAMA_METODE.test(materi), "video materi tidak memuat nama metode luar");
  cek(!SUB_LAIN.test(luar.replace(/Sub-Bab B/g, "")), "video metode luar tidak membahas materi Sub-Bab A atau C");
  cek(!SUB_LAIN.test(materi.replace(/Sub-Bab B/g, "")), "video materi tidak membahas Sub-Bab A atau C");
  for (const m of ["Pictograph Scale Legend", "Unit Symbol Consistency", "Pictograph Error Hunt", "Frequency-to-Pictograph Conversion"]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  cek(V.VIDEO_MATERI_K5B8B.adegan.every((a) => /Buku Siswa/.test(a.sumber) && /hlm\./.test(a.sumber)), "video materi: tiap adegan mencatat halaman buku");
  cek(V.VIDEO_LUAR_K5B8B.adegan.every((a) => /metode (dari )?luar|Ringkasan/i.test(a.sumber)), "video metode luar: tiap adegan bersumber metode luar atau ringkasan");
  for (const kata of ["Sub-Bab B", "Anggi", "kue apem", "Pak Chandra", "tomat", "Eksplorasi 8\\.2A", "Eksplorasi 8\\.2B", "Tabel 8\\.6", "Tabel 8\\.7", "Gambar 8\\.3", "Ayo Berdiskusi", "Ayo Berlatih", "Refleksi", "Panduan Guru", "kunci", "198", "59\\.400", "teka-teki", "piktogram adalah penyajian data"]) cek(new RegExp(kata, "i").test(materi), `video materi memuat ${kata}`);
  const ids = V.VIDEO_LUAR_K5B8B.adegan.map((a) => a.id);
  cek(["luarb-legenda", "luarb-legenda-terapan", "luarb-simbol", "luarb-simbol-terapan", "luarb-cari", "luarb-cari-terapan", "luarb-ubah", "luarb-ubah-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(V.VIDEO_MATERI_K5B8B.adegan.length === 12 && V.VIDEO_LUAR_K5B8B.adegan.length === 10, "12 adegan materi dan 10 adegan metode luar");
  cek(totalKetukan >= 90, `total ketukan cukup dalam (${totalKetukan})`);
  cek(diperiksa >= 60, `hubungan bilangan di gambar yang diperiksa mandiri (${diperiksa})`);
}

/* ------------------------------ Bilangan yang dipakai dalam video, dihitung mandiri ------------------------------ */
{
  const APEM = [["Senin", 40], ["Selasa", 35], ["Rabu", 30], ["Kamis", 37], ["Jumat", 27], ["Sabtu", 29]];
  const TOMAT = [10, 14, 20, 12, 4];
  // teka-teki Eksplorasi 8.2A
  sama(100 / 2, 50, "satu jeruk mewakili 50");
  sama(3 * 50, 150, "tiga jeruk mewakili 150 (kunci Buku Panduan Guru)");
  sama([60 / 3, 40 / 5], [20, 8], "satu tomat 20 dan satu wortel 8");
  sama(20 + 2 * 8, 36, "tomat dan dua wortel 36 (kunci)");
  sama(20 + 8, 28, "satu tomat dan satu wortel 28");
  const susun100 = [];
  for (let t = 0; t <= 5; t += 1) for (let w = 0; w <= 12; w += 1) if (t * 20 + w * 8 === 100) susun100.push([t, w]);
  sama(susun100, [[1, 10], [3, 5], [5, 0]], "hanya tiga susunan tomat dan wortel utuh untuk 100");
  // piktogram apem
  const potong = (n) => [Math.floor(n / 4), n % 4];
  sama(APEM.map(([, n]) => potong(n)), [[10, 0], [8, 3], [7, 2], [9, 1], [6, 3], [7, 1]], "gambar utuh dan sisa tiap hari");
  sama(APEM.map(([, n]) => potong(n)[0] * 4 + potong(n)[1]), APEM.map(([, n]) => n), "utuh kali 4 ditambah sisa sama dengan data");
  sama(APEM.reduce((t, [, n]) => t + n, 0), 198, "total penjualan apem 198");
  sama((1500 - 1200) * 198, 59400, "keuntungan ibu Anggi 59.400");
  sama(9 * 4, 36, "Kamis digambar 9 utuh baru 36");
  cek(9 * 4 !== 37 && 37 - 36 === 1, "Kamis kurang satu kue (seperempat gambar)");
  // panen tomat
  sama(TOMAT.reduce((a, b) => a + b, 0), 60, "total panen tomat 60 kg");
  sama(TOMAT.map((n) => n / 2), [5, 7, 10, 6, 2], "gambar tomat dengan kunci 2 kg");
  sama(TOMAT.every((n) => n % 2 === 0), true, "semua data tomat genap");
  sama(TOMAT.slice(1).map((n, i) => n - TOMAT[i]), [4, 6, -8, -8], "perubahan panen: naik minggu 2 dan 3, turun 8 pada minggu 4 dan 5");
  sama(Math.max(...TOMAT) - Math.min(...TOMAT), 16, "selisih tertinggi dan terendah 16");
  sama((Math.max(...TOMAT) / 2 - Math.min(...TOMAT) / 2) * 2, 16, "selisih lewat gambar: 8 gambar kali 2 kilogram");
  // kunci yang pas untuk tomat
  sama([1, 2, 4, 5].map((c) => TOMAT.map((n) => n / c)), [[10, 14, 20, 12, 4], [5, 7, 10, 6, 2], [2.5, 3.5, 5, 3, 1], [2, 2.8, 4, 2.4, 0.8]], "gambar per kunci 1, 2, 4, 5");
  sama([1, 2, 4, 5].map((c) => 60 / c), [60, 30, 15, 12], "jumlah gambar per kunci 1, 2, 4, 5");
  sama(TOMAT.filter((n) => n % 4 === 2).length, 2, "kunci 4: dua data bersisa setengah");
  sama(14 % 5, 4, "kunci 5: 14 bersisa 4");
  sama([1, 2, 3, 4].map((c) => 12 / c), [12, 6, 4, 3], "data 12 dengan kunci 1 sampai 4");
  sama([4 * 7, 4 * 8], [28, 32], "7 dan 8 utuh kali 4");

  // gambar dibaca dari keadaan: baris apem (utuh x 4 + potongan) dan baris tomat sama dengan data
  const baris = (a, ket, pre, kg) => {
    const objs = L.keadaanStory(a, ket, 9999);
    const utuh = objs.filter((o) => new RegExp(`^${pre}u\\d+$`).test(o.id)).length;
    const q = objs.filter((o) => new RegExp(`^${pre}q[1-3]$`).test(o.id)).map((o) => Number(o.id.slice(-1)))[0] ?? 0;
    const setengah = objs.some((o) => o.id === `${pre}h`);
    return kg ? utuh * 2 + (setengah ? 1 : 0) : utuh * 4 + q;
  };
  const adegan = (v, id) => v.adegan.find((x) => x.id === id);
  const M = V.VIDEO_MATERI_K5B8B;
  const U = V.VIDEO_LUAR_K5B8B;
  const akhirKe = (a) => a.ketukan.length - 1;
  let cocok = 0;
  const harap = (a, ket, pre, n, kg = false) => {
    cocok += 1;
    sama(baris(a, ket, pre, kg), n, `${a.id}#${ket + 1}: baris ${pre} di gambar bernilai ${n}`);
  };
  {
    const a = adegan(M, "apem-piktogram");
    harap(a, akhirKe(a), "sn", 40);
    harap(a, akhirKe(a), "sl", 35);
    harap(a, akhirKe(a), "rb", 30);
    const b = adegan(M, "apem-salah");
    harap(b, 1, "sn", 40);
    harap(b, 1, "km", 36);
    harap(b, 2, "km", 37);
    harap(b, 3, "jm", 27);
    harap(b, 4, "sb", 29);
    [40, 35, 30, 37, 27, 29].forEach((n, i) => harap(b, akhirKe(b), `l${i}`, n));
    harap(adegan(M, "kesalahan-refleksi"), 0, "sn", 40);
    const tp = adegan(M, "tomat-piktogram");
    TOMAT.forEach((n, i) => harap(tp, akhirKe(tp), `t${i}`, n, true));
    const c = adegan(U, "luarb-cari-terapan");
    harap(c, 0, "sn", 40);
    harap(c, 1, "km", 36);
    harap(c, akhirKe(c), "km", 37);
    harap(adegan(U, "luarb-simbol-terapan"), 1, "rb", 30);
    harap(adegan(U, "luarb-simbol-terapan"), 3, "sl", 35);
    harap(adegan(U, "luarb-ubah"), akhirKe(adegan(U, "luarb-ubah")), "jm", 27);
    harap(adegan(U, "luarb-ubah-terapan"), 1, "sb", 29);
    harap(adegan(U, "luarb-ubah-terapan"), 2, "tm", 14, true);
  }
  cek(cocok >= 20, `baris piktogram yang dicocokkan dengan data (${cocok})`);
  // nilai potongan: id potongan menyatakan seperempat, setengah, tiga perempat; tidak ada potongan yang tumpang tindih dengan gambar utuh
  for (const v of VIDEO) for (const a of v.adegan) a.ketukan.forEach((_, i) => {
    const objs = L.keadaanStory(a, i, 9999);
    for (const o of objs) {
      const m = /^([a-z]+\d?)q([1-3])$/.exec(o.id);
      if (m && o.t === "jalur") cek(/A[\d.]+ [\d.]+ 0 [01] 1/.test(o.d ?? ""), `${a.id}#${i + 1}: ${o.id} berupa irisan lingkaran`);
    }
  });
  // tabel penjualan apem dan tabel panen tomat di gambar sama dengan data buku
  {
    const a = adegan(M, "apem-tabel");
    const objs = L.keadaanStory(a, akhirKe(a), 9999);
    const nilai = (id) => objs.find((o) => o.id === id)?.isi;
    sama(APEM.map((_, r) => nilai(`ta-t${r + 1}0`)), APEM.map(([h]) => h), "tabel apem: nama hari");
    sama(APEM.map((_, r) => nilai(`ta-t${r + 1}1`)), APEM.map(([, n]) => String(n)), "tabel apem: banyak penjualan");
    const b = adegan(M, "tomat-data");
    const objb = L.keadaanStory(b, 2, 9999);
    const nb = (id) => objb.find((o) => o.id === id)?.isi;
    sama(TOMAT.map((_, r) => nb(`tt-t${r + 1}0`)), ["1", "2", "3", "4", "5"], "tabel tomat: minggu");
    sama(TOMAT.map((_, r) => nb(`tt-t${r + 1}1`)), TOMAT.map(String), "tabel tomat: hasil panen");
  }
}

/* ------------------------------ Kutipan buku (bila PDF tersedia) ------------------------------ */
{
  const pdf = new URL("../bahan-sd/Matematika-BS-KLS-V.pdf", import.meta.url);
  const ada = existsSync(pdf);
  const cobaPdf = ada ? spawnSync("pdftotext", ["-f", "264", "-l", "284", "-raw", pdf.pathname.replace(/^\/([A-Za-z]:)/, "$1"), "-"], { encoding: "utf8", maxBuffer: 1 << 26 }) : null;
  if (!ada || !cobaPdf || cobaPdf.status !== 0) console.log("PDF atau pdftotext tidak tersedia: pemeriksaan kutipan buku dilewati");
  else {
    const bersih = (t) => t.toLowerCase().replace(/-\s*\n\s*/g, "-").replace(/\s+/g, " ").trim();
    const buku = bersih(cobaPdf.stdout);
    let n = 0;
    for (const a of V.VIDEO_MATERI_K5B8B.adegan) for (const kt of a.kutipan ?? []) {
      n += 1;
      cek(buku.includes(bersih(kt)), `kutipan buku ${a.id}: "${kt}" ada di teks PDF`);
    }
    cek(n >= 30, `jumlah kutipan buku yang diperiksa (${n})`);
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k5b8b-.*)\.(ts|tsx)$/.test(f));
  cek(berkas.length >= 8, `berkas story ditemukan (${berkas.length})`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    const buruk = [...s].filter((c) => {
      const k = c.codePointAt(0);
      return k > 0x1fa95 || k === 0x1f7f0 || k === 0x200d;
    });
    cek(buruk.length === 0, `${f}: tanpa emoji di atas Emoji 12 dan tanpa ZWJ (${buruk.map((c) => c.codePointAt(0).toString(16)).join()})`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: UTF-8 tanpa BOM dan akhir baris LF`);
    cek(!/fetch\(|XMLHttpRequest|openai|anthropic|gemini|correct_index|explanation/i.test(s), `${f}: tanpa jaringan, model bahasa, atau kunci jawaban`);
    cek(!/from "react"/.test(s), `${f}: logika dan data tanpa React`);
    // larangan berbagi visual: berkas k5b8b hanya mengimpor logika dan berkas k5b8b sendiri
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|k5b8b-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k5b8b sendiri (${impor.join(", ")})`);
  }
  // mesin tidak memakai kit visual lama
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k5b8b.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_A58|SUB_B58|naskah-k5b8/.test(pembungkus) && /VIDEO_MATERI_K5B8B/.test(pembungkus) && /VIDEO_LUAR_K5B8B/.test(pembungkus) && /export function VideoK5B8B/.test(pembungkus), "video-k5b8b: memakai dua video baru, bukan naskah dan visual lama");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${((n * 0.5) / 60).toFixed(1)} menit suara)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
