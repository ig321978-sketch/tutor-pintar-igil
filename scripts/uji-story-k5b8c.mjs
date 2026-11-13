// Uji Story Kelas 5 Bab 8 Sub-Bab C (Diagram Batang): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, sinkron angka suara dan gambar, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas,
// pemisahan materi dan metode luar, kutipan buku (bila PDF ada), emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k5b8c.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { spawnSync } from "node:child_process";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k5b8c-video.ts");

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

/* Mesin (logika-story) diuji lengkap di scripts/uji-story-k6b4a.mjs. */
cek(typeof L.keadaanStory === "function" && typeof L.posisiKata === "function", "mesin Story tersedia");

/* ------------------------------ Isi dua video ------------------------------ */
const VIDEO = [V.VIDEO_MATERI_K5B8C, V.VIDEO_LUAR_K5B8C];
const bilanganDari = (t) => (t.match(/\d[\d.]*\d|\d/g) ?? []).map((v) => v.replace(/\./g, ""));
const semuaSidik = new Map();
let totalKetukan = 0;
let totalKata = 0;
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
      // sinkron angka: tiap bilangan dalam suara tampak di gambar pada ketukan ini atau sebelumnya
      for (let p = 0; p < kata.length; p += 1) for (const o of L.keadaanStory(a, i, p)) if (o.t === "teks" && o.isi) for (const b of bilanganDari(o.isi)) terlihat.add(b);
      for (const b of bilanganDari(kt.suara)) cek(terlihat.has(b), `${nama}#${i + 1}: bilangan ${b} di suara tampak di gambar`);
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
        } else if (o.t === "kotak") cek(x > -2 && y > -2 && x + (o.w ?? 0) < 302 && y + (o.h ?? 0) < 210 || o.id === "tanah" || o.id === "lantai", `${nama}#${i + 1}: kotak ${o.id} masuk kanvas`);
        else if (o.t === "bulat") cek(x - (o.r ?? 0) > -2 && x + (o.r ?? 0) < 302 && y - (o.r ?? 0) > -2 && y + (o.r ?? 0) < 210, `${nama}#${i + 1}: bulat ${o.id} masuk kanvas`);
      }
    });
  }
}




/* ------------------------------ Pemisahan materi dan metode luar ------------------------------ */
const semuaTeks = (v) => v.adegan.flatMap((a) => a.ketukan.flatMap((kt, i) => [...Array(L.kataDari(kt.suara).length).keys()].flatMap((p) => L.teksTerlihat(L.keadaanStory(a, i, p)))));
const adeganDari = (v, id) => v.adegan.find((a) => a.id === id);
const akhirDari = (v, id) => {
  const a = adeganDari(v, id);
  return L.keadaanStory(a, a.ketukan.length - 1, 9999);
};
const benda = (keadaan, id) => keadaan.find((o) => o.id === id);
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map((a) => [a.judul, a.sumber, a.ketukan.map((kt) => kt.suara)])) + semuaTeks(v).join("|");
  const NAMA_METODE = /Bar Chart Reading|Axis Scale|Comparative Bar|Double Bar|Merge Table|metode luar/i;
  const METODE_LAIN = /Data Collection Cycle|Tally Mark Protocol|Frequency Table Construction|Pictograph Scale Legend|Unit Symbol Consistency|Pictograph Error Hunt/i;
  const materi = teksVideo(V.VIDEO_MATERI_K5B8C);
  const luar = teksVideo(V.VIDEO_LUAR_K5B8C);
  cek(!NAMA_METODE.test(materi), "video materi tidak memuat nama metode luar");
  cek(!METODE_LAIN.test(materi) && !METODE_LAIN.test(luar), "tidak memakai nama metode Sub-Bab A atau B");
  for (const m of ["Bar Chart Reading Protocol", "Axis Scale Consistency", "Comparative Bar Analysis", "Double Bar Merge Table"]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  cek(V.VIDEO_MATERI_K5B8C.adegan.every((a) => /Buku Siswa/.test(a.sumber) && /hlm\./.test(a.sumber)), "video materi: tiap adegan mencatat halaman buku");
  cek(V.VIDEO_LUAR_K5B8C.adegan.every((a) => /metode luar|Ringkasan/i.test(a.sumber)), "video metode luar: tiap adegan bersumber metode luar atau ringkasan");
  for (const kata of ["Eksplorasi 8\\.3A", "Eksplorasi 8\\.3B", "Eksplorasi 8\\.3C", "Eksplorasi 8\\.3D", "Eksplorasi 8\\.3E", "Sea Games", "Pak Bajuri", "Aktivitas 2", "Ayo Berlatih", "Refleksi", "Uji Kompetensi", "Panduan Guru", "Pengayaan", "2\\.684\\.000", "122", "103\\.000", "47\\.000", "1\\.620", "255", "260", "34,10", "30,70", "13,10", "3,40", "1\\.493", "557", "267"]) cek(new RegExp(kata).test(materi + semuaTeks(V.VIDEO_MATERI_K5B8C).join("|")), `video materi memuat ${kata}`);
  for (const kata of ["kalori", "240", "perpustakaan", "260", "nilai ulangan", "Komang", "Robert", "naik 40", "turun 25", "legenda", "skala"]) cek(new RegExp(kata, "i").test(luar), `video metode luar memuat contoh ${kata}`);
  const ids = V.VIDEO_LUAR_K5B8C.adegan.map((a) => a.id);
  cek(["luar-bcrp", "luar-bcrp-terapan", "luar-asc", "luar-asc-terapan", "luar-cba", "luar-cba-terapan", "luar-dbmt", "luar-dbmt-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(ids[0] === "luar-pembuka" && ids.at(-1) === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  cek(V.VIDEO_MATERI_K5B8C.adegan.length === 11 && V.VIDEO_LUAR_K5B8C.adegan.length === 10, "11 adegan materi dan 10 adegan metode luar");
  cek(totalKetukan >= 100, `total ketukan cukup dalam (${totalKetukan})`);
  cek(!/bar chart|axis scale|comparative|merge table/i.test(JSON.stringify(V.VIDEO_MATERI_K5B8C.adegan.map((a) => a.ketukan.map((kt) => kt.suara)))), "suara materi tanpa istilah metode luar");
  // Sub-Bab C boleh menyentuh A dan B, tetapi tidak memakai materi bab lain
  cek(!/(desimal|persepuluhan|perseratusan|keliling|sudut|peluang|rasio|faktor|kelipatan)/i.test(materi + luar), "tidak menyentuh materi bab lain");
}

/* ------------------------------ Angka yang dihitung dalam video, dihitung mandiri ------------------------------ */
{
  const jumlah = (a) => a.reduce((s, v) => s + v, 0);
  const gambarMateri = semuaTeks(V.VIDEO_MATERI_K5B8C).join(" | ");
  const gambarLuar = semuaTeks(V.VIDEO_LUAR_K5B8C).join(" | ");

  /* Eksplorasi 8.3A: skala persegi panjang (petak dibaca dari gambar buku) */
  sama([10 / 5, 18 / 9, 95 / 9.5, 40 / 4, 64 / 8, 48 / 6], [2, 2, 10, 10, 8, 8], "Eksplorasi 8.3A: nilai satu petak konsisten tiap soal");
  sama([200 * 0.5, 120 * 0.5, 140 * 0.5, 80 * 0.5], [100, 60, 70, 40], "Eksplorasi 8.3A nomor 2: skala gambar 0,5 piksel per satuan");

  /* Sea Games */
  const medali = { 2013: 65, 2015: 47, 2017: 38, 2019: 72, 2021: 69 };
  const tahun = Object.keys(medali).map(Number);
  const nilaiM = tahun.map((t) => medali[t]);
  sama([medali[2013] - medali[2015], medali[2015] - medali[2017], medali[2019] - medali[2017], medali[2019] - medali[2021]], [18, 9, 34, 3], "Sea Games: turun 2015, turun 2017, naik 2019, turun 2021");
  cek(medali[2015] - medali[2013] < 0 && medali[2019] - medali[2017] > 0, "Sea Games: tidak selalu menurun (pernyataan Nisa salah)");
  cek(medali[2013] - medali[2015] > medali[2019] - medali[2021], "Sea Games: penurunan 2015 lebih banyak daripada 2021 (Asep benar)");
  sama([tahun[nilaiM.indexOf(Math.max(...nilaiM))], tahun[nilaiM.indexOf(Math.min(...nilaiM))]], [2019, 2017], "Sea Games: emas terbanyak 2019 dan tersedikit 2017");
  sama([72 + 84 + 111], [267], "Sea Games 2019: total medali");
  cek(38 > 36 && 38 < 40 && 40 - 36 === 4, "Sea Games: 38 di antara garis kecil 36 dan 40 (langkah 4)");
  sama([20 / 5, 4 * 5], [4, 20], "garis kecil: lima selang antara dua garis besar bernilai 20");

  /* Panen lele */
  const lele = [32, 28, 21, 16, 25];
  sama([jumlah(lele), jumlah(lele) * 22000, jumlah(lele) / 4, lele[0] - lele[3], lele[0] + lele[3]], [122, 2684000, 30.5, 16, 48], "lele: total, pendapatan, seperempat, selisih, dan jumlah kunci Panduan Guru");
  cek(lele[0] - lele[3] < jumlah(lele) / 4, "lele: selisih kolam 1 dan kolam 4 kurang dari seperempat total (pernyataan salah)");
  cek(lele[0] + lele[3] > jumlah(lele) / 4, "lele: kunci Panduan Guru menjumlahkan sehingga tampak lebih dari seperempat");
  sama([lele.indexOf(Math.max(...lele)) + 1], [1], "lele: batang terpanjang kolam 1");

  /* Siswa laki-laki dan perempuan */
  const laki = [14, 11, 16, 12, 15];
  const perempuan = [10, 13, 12, 16, 14];
  const th = [2017, 2018, 2019, 2020, 2021];
  sama([laki[2] - perempuan[2], laki.some((n, i) => n === perempuan[i]), laki[4] + perempuan[4]], [4, false, 29], "siswa: selisih 2019, tidak ada tahun sama, jumlah 2021");
  sama([th.filter((_, i) => laki[i] > perempuan[i]), th.filter((_, i) => perempuan[i] > laki[i])], [[2017, 2019, 2021], [2018, 2020]], "siswa: tahun laki-laki lebih banyak dan perempuan lebih banyak");
  const total = laki.map((n, i) => n + perempuan[i]);
  sama([total, th[total.indexOf(Math.max(...total))]], [[24, 24, 28, 28, 29], 2021], "siswa: jumlah per tahun, terbanyak 2021");
  sama([laki[0] === perempuan[4], perempuan[2] === laki[3], laki[2] === perempuan[3]], [true, true, true], "siswa: banyak sama antartahun");
  cek(Math.max(...laki) <= 18 && Math.max(...perempuan) <= 18, "siswa: skala 18 cukup untuk kedua diagram");

  /* Kalori */
  sama([50 / 100 * 130, 50 / 100 * 260, 65 + 130 + 60, 3 * 130, 2 * 260, 390 + 520 + 60 + 300 + 350], [65, 130, 255, 390, 520, 1620], "kalori: Asep dan Lukas");
  cek(1620 < 2100, "kalori: Lukas di bawah kebutuhan harian anak laki-laki");

  /* Nilai ulangan */
  const nilai = { Lukas: [65, 80], Nisa: [70, 85], Komang: [50, 90], Asep: [90, 75], Yohana: [85, 80], Robert: [90, 65] };
  const selisih = Object.entries(nilai).map(([n, [a, b]]) => [n, b - a]);
  sama(selisih, [["Lukas", 15], ["Nisa", 15], ["Komang", 40], ["Asep", -15], ["Yohana", -5], ["Robert", -25]], "nilai ulangan: selisih tiap anak");
  sama([selisih.reduce((m, s) => (s[1] > m[1] ? s : m))[0], selisih.reduce((m, s) => (s[1] < m[1] ? s : m))[0], selisih.filter((s) => s[1] < 0).length], ["Komang", "Robert", 3], "nilai ulangan: naik tertinggi, turun terbanyak, tiga yang turun");
  cek(Math.max(...Object.values(nilai).flat()) === 90 && 90 <= 100, "nilai ulangan: skala sampai 100 cukup");

  /* Pengunjung perpustakaan */
  const hari = { Senin: 42, Selasa: 60, Rabu: 50, Kamis: 36, Jumat: 24, Sabtu: 48 };
  const urut = Object.entries(hari).sort((a, b) => a[1] - b[1]).map((e) => e[0]);
  sama([Math.max(...Object.values(hari)), Math.min(...Object.values(hari)), 60 - 24, jumlah(Object.values(hari)), hari.Kamis - hari.Jumat, hari.Selasa / 4, hari.Jumat / 4], [60, 24, 36, 260, 12, 15, 6], "perpustakaan: tertinggi, terendah, selisih, jumlah, penurunan, kartu piktogram");
  sama(urut, ["Jumat", "Kamis", "Senin", "Sabtu", "Rabu", "Selasa"], "perpustakaan: urutan dari paling sedikit");

  /* Tabungan Nisa */
  const lingkaran = [4.25, 6, 5.25, 4.5, 5.75];
  const tabung = lingkaran.map((n) => n * 4000);
  sama([tabung, jumlah(tabung), tabung[1] - tabung[4], 150000 - jumlah(tabung), jumlah(tabung) < 150000, tabung[3]], [[17000, 24000, 21000, 18000, 23000], 103000, 1000, 47000, true, 18000], "tabungan Nisa");
  sama([tabung.indexOf(Math.max(...tabung)) + 1], [2], "tabungan Nisa: paling banyak minggu 2");

  /* Pengguna internet (dalam persen seperseratus agar bilangan bulat) */
  const usia = { "13-17": [570, 680], "18-24": [1590, 1480], "25-34": [1930, 1480], "35-44": [740, 570], "45-54": [320, 240], "55-64": [100, 70], "65+": [150, 90] };
  const totalU = Object.fromEntries(Object.entries(usia).map(([u, [a, b]]) => [u, a + b]));
  sama(totalU, { "13-17": 1250, "18-24": 3070, "25-34": 3410, "35-44": 1310, "45-54": 560, "55-64": 170, "65+": 240 }, "internet: total tiap kelompok umur");
  sama(Object.entries(totalU).sort((a, b) => a[1] - b[1]).map((e) => e[0]), ["55-64", "65+", "45-54", "13-17", "35-44", "18-24", "25-34"], "internet: urutan dari paling rendah");
  sama([totalU["25-34"] - totalU["18-24"], usia["35-44"][0] + usia["35-44"][1]], [340, 1310], "internet: selisih 25-34 dan 18-24, total 35-44");
  cek(usia["25-34"][0] > usia["25-34"][1] && 1930 < 3410 && usia["55-64"][1] <= Math.min(...Object.values(usia).flat()), "internet: pernyataan i salah, iii salah (19,30 hanya laki-laki), ii benar");
  cek(totalU["18-24"] === 3070, "internet: pernyataan iv benar (30,70)");

  /* Pengayaan menu */
  const menu = [[300, 100, 120, 60], [204, 100, 25, 105], [204, 70, 150, 55]];
  sama([menu.map(jumlah), jumlah(menu.flat()), 2050 - jumlah(menu.flat())], [[580, 434, 479], 1493, 557], "pengayaan: menu contoh");

  // Tinggi batang pada gambar sebanding dengan datanya
  const rasio = (gambar, ids, kunci, nilaiData, nama) => {
    const ukuran = ids.map((id) => benda(gambar, id)?.[kunci]);
    cek(ukuran.every((u) => typeof u === "number" && u > 0), `${nama}: semua batang ada`);
    cek(ukuran.every((u, i) => Math.abs(u / nilaiData[i] - ukuran[0] / nilaiData[0]) < 0.01), `${nama}: ukuran batang sebanding dengan data`);
  };
  const mat = V.VIDEO_MATERI_K5B8C;
  const lu = V.VIDEO_LUAR_K5B8C;
  rasio(akhirDari(mat, "vertikal-83b"), [0, 1, 2, 3, 4].map((i) => `sb${i}-k`), "h", nilaiM, "Sea Games tegak");
  rasio(akhirDari(mat, "horizontal-83c"), [0, 1, 2, 3, 4].map((i) => `h${i}-k`), "w", nilaiM, "Sea Games mendatar");
  rasio(L.keadaanStory(adeganDari(mat, "lele"), 2, 9999), [0, 1, 2, 3, 4].map((i) => `l${i}-k`), "w", lele, "lele");
  rasio(L.keadaanStory(adeganDari(mat, "gabung-83e"), 2, 9999), [0, 1, 2, 3, 4].map((i) => `g${i}a-k`), "h", laki, "siswa laki-laki");
  rasio(L.keadaanStory(adeganDari(mat, "gabung-83e"), 2, 9999), [0, 1, 2, 3, 4].map((i) => `g${i}b-k`), "h", perempuan, "siswa perempuan");
  rasio(akhirDari(mat, "latihan-data"), [0, 1, 2, 3, 4, 5].map((i) => `n${i}a-k`), "h", Object.values(nilai).map((v) => v[0]), "nilai ulangan ke-1");
  rasio(akhirDari(mat, "latihan-data"), [0, 1, 2, 3, 4, 5].map((i) => `n${i}b-k`), "h", Object.values(nilai).map((v) => v[1]), "nilai ulangan ke-2");
  const uji12 = adeganDari(mat, "uji-12");
  rasio(L.keadaanStory(uji12, 1, 9999), [0, 1, 2, 3, 4, 5].map((i) => `u${i}-k`), "h", Object.values(hari), "pengunjung perpustakaan");
  rasio(L.keadaanStory(uji12, 5, 9999), [0, 1, 2, 3, 4].map((i) => `ba${i}-k`), "h", tabung, "tabungan diagram A");
  rasio(akhirDari(lu, "luar-cba-terapan"), [0, 1, 2, 3, 4, 5].map((i) => `u${i}-k`), "h", Object.values(hari).slice().sort((a, b) => a - b), "perpustakaan terurut");
  rasio(akhirDari(lu, "luar-bcrp-terapan"), [0, 1, 2, 3].map((i) => `kb${i}-k`), "w", [130, 260, 240, 60], "kalori metode luar");
  rasio(L.keadaanStory(adeganDari(lu, "luar-dbmt-terapan"), 2, 9999), [0, 1, 2, 3, 4, 5].map((i) => `n${i}a-k`), "h", Object.values(nilai).map((v) => v[0]), "nilai ulangan metode luar");
  // Jumlah lingkaran piktogram tabungan: tiap lingkaran penuh mewakili Rp4.000
  {
    const pik = L.keadaanStory(uji12, 3, 9999);
    const penuh = (i) => pik.filter((o) => o.id.startsWith(`tl${i}-`) && o.t === "bulat").length;
    const bagian = (i) => pik.filter((o) => o.id.startsWith(`tl${i}-`) && o.t === "jalur").length;
    sama([0, 1, 2, 3, 4].map(penuh), [4, 6, 5, 4, 5], "piktogram tabungan: lingkaran penuh tiap minggu");
    sama([0, 1, 2, 3, 4].map(bagian), [1, 0, 1, 1, 1], "piktogram tabungan: potongan lingkaran tiap minggu");
  }

  // Persamaan yang tampak di gambar diperiksa dengan evaluasi mandiri
  let cacah = 0;
  const nilaiSisi = (s) => {
    if (!/^[\d.\s+x-]+$/.test(s) || s.trim() === "") return null;
    const ekspr = s.replace(/(\d{1,3}(?:\.\d{3})+)/g, (m) => m.replace(/\./g, "")).replace(/x/g, "*");
    if (/\./.test(ekspr)) return null;
    return Function(`"use strict"; return (${ekspr});`)();
  };
  for (const v of VIDEO) for (const a of v.adegan) a.ketukan.forEach((kt, i) => {
    for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) {
      if (t.split("=").length !== 2) continue;
      const [kiri, kanan] = t.split("=").map((m) => m.trim());
      const p = nilaiSisi(kiri);
      const q = nilaiSisi(kanan);
      if (p === null || q === null || kiri === "" || kanan === "") continue;
      cacah += 1;
      cek(p === q, `${a.id}: persamaan di gambar "${t}" (${p} lawan ${q})`);
    }
  });
  cek(cacah >= 20, `persamaan di gambar yang diperiksa mandiri (${cacah})`);
  // Persamaan desimal koma (persen) diperiksa dalam seperseratus
  const desimal = (s) => Math.round(Number(s.replace(",", ".")) * 100);
  {
    const sem = [...semuaTeks(V.VIDEO_MATERI_K5B8C)];
    let n = 0;
    for (const t of sem) {
      const m = t.match(/^(?:[\d-]+: )?(\d+,\d+) ([+-]) (\d+,\d+) = (\d+,\d+)/);
      if (!m) continue;
      n += 1;
      const hasil = m[2] === "+" ? desimal(m[1]) + desimal(m[3]) : desimal(m[1]) - desimal(m[3]);
      cek(hasil === desimal(m[4]), `persamaan desimal "${t}"`);
    }
    cek(n >= 3, `persamaan desimal persen diperiksa (${n})`);
  }
  // Hasil hitungan tampak di gambar
  for (const h of ["65", "47", "38", "72", "69", "267", "18", "122", "2.684.000", "30,5", "16", "48", "255", "1.620", "29", "40", "25", "260", "103.000", "47.000", "34,10", "30,70", "13,10", "3,40", "1.493", "557"]) cek(gambarMateri.includes(h), `gambar video materi memuat hasil "${h}"`);
  for (const h of ["240", "130", "260", "36", "12", "40", "25", "15", "5", "90"]) cek(gambarLuar.includes(h), `gambar video metode luar memuat hasil "${h}"`);
}

/* ------------------------------ Kutipan buku (bila PDF tersedia) ------------------------------ */
{
  const pdf = new URL("../bahan-sd/Matematika-BS-KLS-V.pdf", import.meta.url);
  const ada = existsSync(pdf);
  const cobaPdf = ada ? spawnSync("pdftotext", ["-f", "251", "-l", "288", "-raw", pdf.pathname.replace(/^\/([A-Za-z]:)/, "$1"), "-"], { encoding: "utf8", maxBuffer: 1 << 26 }) : null;
  if (!ada || !cobaPdf || cobaPdf.status !== 0) console.log("PDF atau pdftotext tidak tersedia: pemeriksaan kutipan buku dilewati");
  else {
    const bersih = (t) => t.toLowerCase().replace(/-\s*\n\s*/g, "-").replace(/\s+/g, " ").trim();
    const buku = bersih(cobaPdf.stdout);
    let n = 0;
    for (const a of V.VIDEO_MATERI_K5B8C.adegan) for (const kt of a.kutipan ?? []) {
      n += 1;
      cek(buku.includes(bersih(kt)), `kutipan buku ${a.id}: "${kt}" ada di teks PDF`);
    }
    cek(n >= 30, `jumlah kutipan buku yang diperiksa (${n})`);
    cek(V.VIDEO_MATERI_K5B8C.adegan.every((a) => (a.kutipan ?? []).length >= 3), "tiap adegan materi memuat paling sedikit 3 kutipan");
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k5b8c-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|k5b8c-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas k5b8c sendiri (${impor.join(", ")})`);
  }
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k5b8c.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_C58/.test(pembungkus) && /VIDEO_MATERI_K5B8C/.test(pembungkus) && /VIDEO_LUAR_K5B8C/.test(pembungkus) && /export function VideoK5B8C\(/.test(pembungkus), "video-k5b8c: memakai dua video baru, bukan naskah dan visual lama");
}

for (const v of VIDEO) {
  const kata = v.adegan.reduce((n, a) => n + a.ketukan.reduce((m, kt) => m + L.kataDari(kt.suara).length, 0), 0);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((n, a) => n + a.ketukan.length, 0)} ketukan, ${kata} kata (sekitar ${(kata * 0.5 / 60).toFixed(1)} menit suara)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
