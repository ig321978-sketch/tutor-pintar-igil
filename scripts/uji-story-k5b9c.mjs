// Uji Story Kelas 5 Bab 9 Sub-Bab C (Komposisi dan Dekomposisi Bilangan sampai 1.000.000): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, sinkron angka suara dan gambar, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas,
// pemisahan materi dan metode luar, kutipan buku (bila PDF ada), emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k5b9c.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { spawnSync } from "node:child_process";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k5b9c-video.ts");

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
const VIDEO = [V.VIDEO_MATERI_K5B9C, V.VIDEO_LUAR_K5B9C];
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
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map((a) => [a.judul, a.sumber, a.ketukan.map((kt) => kt.suara)])) + semuaTeks(v).join("|");
  const NAMA_METODE = /Part-Whole|Expanded Form|Flexible Decomposition|Denomination|metode luar/i;
  const METODE_LAIN = /Place Value Chart Protocol|Number-Name|Digit-Place Value|Leftmost Place|Digit-by-Digit|Ordering Protocol/i;
  const materi = teksVideo(V.VIDEO_MATERI_K5B9C);
  const luar = teksVideo(V.VIDEO_LUAR_K5B9C);
  cek(!NAMA_METODE.test(materi), "video materi tidak memuat nama metode luar");
  cek(!METODE_LAIN.test(materi) && !METODE_LAIN.test(luar), "tidak memakai nama metode Sub-Bab A atau B");
  for (const m of ["Part-Whole Place Model", "Expanded Form Composition", "Flexible Decomposition", "Money Denomination Composition"]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  cek(V.VIDEO_MATERI_K5B9C.adegan.every((a) => /Buku Siswa/.test(a.sumber) && /hlm\./.test(a.sumber)), "video materi: tiap adegan mencatat halaman buku");
  cek(V.VIDEO_LUAR_K5B9C.adegan.every((a) => /metode luar|Ringkasan/i.test(a.sumber)), "video metode luar: tiap adegan bersumber metode luar atau ringkasan");
  for (const kata of ["Yosep", "Komang", "Eksplorasi 9\\.3A", "Eksplorasi 9\\.3B", "jam tangan", "Refleksi", "Uji Kompetensi", "Panduan Guru", "345\\.600", "623\\.000", "493\\.000", "461\\.800", "327\\.100", "505\\.401", "857\\.259", "550\\.303", "933\\.403", "203\\.035", "354\\.500", "234\\.600", "567\\.000", "599\\.198", "Pengayaan"]) cek(new RegExp(kata).test(materi), `video materi memuat ${kata}`);
  for (const kata of ["Yosep", "345\\.600", "599\\.198", "623\\.000", "327\\.100", "505\\.401", "203\\.035", "493\\.000"]) cek(new RegExp(kata).test(luar), `video metode luar memuat contoh ${kata}`);
  const ids = V.VIDEO_LUAR_K5B9C.adegan.map((a) => a.id);
  cek(["luarc-sebagian", "luarc-sebagian-terapan", "luarc-bentuk", "luarc-bentuk-terapan", "luarc-fleksibel", "luarc-fleksibel-terapan", "luarc-uang", "luarc-uang-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(V.VIDEO_MATERI_K5B9C.adegan.length === 10 && V.VIDEO_LUAR_K5B9C.adegan.length === 10, "10 adegan materi dan 10 adegan metode luar");
  cek(totalKetukan >= 100, `total ketukan cukup dalam (${totalKetukan})`);
  cek(!/part-whole|expanded|flexible|denomination|place model/i.test(JSON.stringify(V.VIDEO_MATERI_K5B9C.adegan.map((a) => a.ketukan.map((kt) => kt.suara)))), "suara materi tanpa istilah metode luar");
  // Sub-Bab C boleh menyentuh A dan B, tetapi tidak memakai materi bab lain (operasi hitung, pecahan, desimal, bangun datar)
  cek(!/(desimal|persepuluhan|perseratusan|luas|keliling|sudut|peluang|rasio)/i.test(materi + luar), "tidak menyentuh materi bab lain");
}

/* ------------------------------ Angka yang dihitung dalam video, dihitung mandiri ------------------------------ */
{
  // Ejaan bilangan sampai 999.999 (dipakai untuk memeriksa kalimat bacaan di suara dan gambar)
  const SAT = ["", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];
  const ejaKecil = (n) => {
    if (n < 10) return SAT[n];
    if (n === 10) return "sepuluh";
    if (n === 11) return "sebelas";
    if (n < 20) return `${SAT[n - 10]} belas`;
    if (n < 100) return `${SAT[Math.floor(n / 10)]} puluh${n % 10 ? " " + SAT[n % 10] : ""}`;
    const r = Math.floor(n / 100);
    const sisa = n % 100;
    return `${r === 1 ? "seratus" : SAT[r] + " ratus"}${sisa ? " " + ejaKecil(sisa) : ""}`;
  };
  const eja = (n) => {
    if (n < 1000) return ejaKecil(n);
    const rb = Math.floor(n / 1000);
    return `${rb === 1 ? "seribu" : ejaKecil(rb) + " ribu"}${n % 1000 ? " " + ejaKecil(n % 1000) : ""}`;
  };
  sama([eja(550303), eja(933403), eja(327100), eja(505401), eja(857259), eja(149641), eja(345675), eja(567000), eja(493000), eja(623000)], [
    "lima ratus lima puluh ribu tiga ratus tiga",
    "sembilan ratus tiga puluh tiga ribu empat ratus tiga",
    "tiga ratus dua puluh tujuh ribu seratus",
    "lima ratus lima ribu empat ratus satu",
    "delapan ratus lima puluh tujuh ribu dua ratus lima puluh sembilan",
    "seratus empat puluh sembilan ribu enam ratus empat puluh satu",
    "tiga ratus empat puluh lima ribu enam ratus tujuh puluh lima",
    "lima ratus enam puluh tujuh ribu",
    "empat ratus sembilan puluh tiga ribu",
    "enam ratus dua puluh tiga ribu",
  ], "ejaan bilangan (hitungan mandiri)");
  const seluruh = [...VIDEO.flatMap((v) => v.adegan.flatMap((a) => a.ketukan.map((kt) => kt.suara))), ...VIDEO.flatMap((v) => semuaTeks(v))].join(" | ");
  for (const n of [550303, 327100, 505401, 857259, 149641, 345675, 567000]) {
    cek(seluruh.includes(eja(n)), `bacaan ${n} (${eja(n)}) tertulis di suara atau gambar`);
  }
  cek(L.kataDari(seluruh).join(" ").includes("sembilan ratus ribu tiga puluh tiga ribu empat ratus tiga"), "soal 1b dibacakan: sembilan ratus ribu tiga puluh tiga ribu empat ratus tiga");

  /* Uang Yosep dan Komang (Eksplorasi 9.3A) */
  const jumlah = (pasang) => pasang.reduce((n, [nilai, lembar]) => n + nilai * lembar, 0);
  const yosep = jumlah([[100000, 5], [20000, 4], [10000, 3], [5000, 1], [2000, 4]]);
  const komang = jumlah([[100000, 4], [20000, 3], [10000, 2], [5000, 1], [2000, 4]]);
  sama([yosep, komang, yosep - komang, yosep > komang], [623000, 493000, 130000, true], "uang Yosep dan Komang");
  sama([5 * 100000, 4 * 20000, 3 * 10000, 5000, 4 * 2000, 80000 + 30000, 5000 + 8000], [500000, 80000, 30000, 5000, 8000, 110000, 13000], "nilai tiap kelompok uang Yosep");
  sama([4 * 100000, 3 * 20000, 2 * 10000, 60000 + 20000, 5000 + 8000], [400000, 60000, 20000, 80000, 13000], "nilai tiap kelompok uang Komang");
  const digit = (n) => String(n).padStart(6, "0").split("");
  sama([digit(623000).join(""), digit(493000).join("")], ["623000", "493000"], "tabel nilai tempat Yosep dan Komang");

  /* Jam tangan: tepat empat cara, dicari dengan enumerasi mandiri */
  const DEN = [[100000, 2], [50000, 3], [20000, 4], [10000, 2], [5000, 2], [500, 3], [100, 3]];
  const semuaCara = [];
  const cari = (i, sisa, pilih) => {
    if (i === DEN.length) { if (sisa === 0) semuaCara.push(pilih.join(",")); return; }
    for (let n = 0; n <= DEN[i][1]; n += 1) if (n * DEN[i][0] <= sisa) cari(i + 1, sisa - n * DEN[i][0], [...pilih, n]);
  };
  cari(0, 345600, []);
  const totalUang = DEN.reduce((n, [nilai, banyak]) => n + nilai * banyak, 0);
  sama([semuaCara.length, totalUang, totalUang > 345600], [4, 461800, true], "jam tangan: empat cara dan uang Ibu cukup");
  // Baris tabel Cara 1 sampai 4 pada gambar harus sama dengan hasil enumerasi
  const aJam = V.VIDEO_MATERI_K5B9C.adegan.find((a) => a.id === "jam-cara");
  const akhirJam = L.keadaanStory(aJam, 4, 9999);
  const barisGambar = [1, 2, 3, 4].map((r) => [0, 1, 2, 3, 4, 5, 6, 7].map((c) => akhirJam.find((o) => o.id === `cr${r - 1}-t${c}`)?.isi ?? "?"));
  sama(barisGambar.map((b) => b[0]), ["Cara 1", "Cara 2", "Cara 3", "Cara 4"], "tabel jam-cara: judul baris");
  sama(barisGambar.map((b) => b.slice(1).join(",")).sort(), [...semuaCara].sort(), "tabel jam-cara: empat baris sama dengan enumerasi mandiri");
  cek(345600 === 345000 + 600 && 600 === 500 + 100 && 6 * 100 !== 3 * 100, "345.600 sama dengan 345.000 ditambah 600; 600 hanya 500 + 100 (seratus hanya tiga keping)");
  sama(semuaCara.every((c) => c.split(",").slice(-3).join(",") === "1,1,1"), true, "semua cara memakai satu keping 500 dan satu keping 100");
  // Penerapan uang: pecahan terbesar dahulu, dengan persediaan
  let sisaUang = 345600;
  const ambil = [];
  for (const [nilai, banyak] of DEN) {
    const n = Math.min(banyak, Math.floor(sisaUang / nilai));
    ambil.push(n);
    sisaUang -= n * nilai;
  }
  sama([ambil.join(","), sisaUang], ["2,2,2,0,1,1,1", 0], "pecahan terbesar dahulu menghasilkan Cara 4");
  sama([50000, 2 * 20000 + 10000], [50000, 50000], "tukar lima puluh ribu dengan dua dua puluh ribu dan satu sepuluh ribu");
  sama(["1,3,4,1,1,1,1", "2,1,4,1,1,1,1"].every((c) => semuaCara.includes(c)) && semuaCara.includes("2,2,1,2,1,1,1"), true, "Cara 1, 2, dan 3 ada pada enumerasi");
  sama([2 * 100000 + 1 * 50000 + 4 * 20000 + 1 * 10000 + 1 * 5000 + 500 + 100], [345600], "Cara 2 menjadi 345.600");

  /* Bagian nilai tempat 599.198 dan 623.000 */
  sama([500000 + 90000 + 9000 + 100 + 90 + 8, 600000 + 20000 + 3000, 500000 + 120000 + 3000, 500000 + 110000 + 13000, 400000 + 90000 + 3000], [599198, 623000, 623000, 623000, 493000], "bagian nilai tempat");
  sama([500000 + 120000 + 13000, 633000 === 623000], [633000, false], "contoh penukaran yang salah mengubah jumlah");
  sama([300000 + 20000 + 7000 + 100, 500000 + 5000 + 400 + 1, 200000 + 3000 + 30 + 5, 200000 + 3000 + 300 + 5], [327100, 505401, 203035, 203305], "Uji Kompetensi 3a, 3b, dan soal 4e");
  sama([900000 + 33000 + 403, 550000 + 303], [933403, 550303], "Uji Kompetensi 1a dan 1b");
  sama([800000 + 50000 + 7000 + 200 + 50 + 9], [857259], "Uji Kompetensi 3c");
  // Uji Kompetensi nomor 4: benar atau salah, dihitung mandiri
  const naik = [676785, 786897, 789876, 789867].every((v, i, a) => i === 0 || a[i - 1] < v);
  sama([275000 > 256000, naik, 900025 < 900052, 900025 > 900052, 203035 === 203305, 678987 === 600000 + 70000 + 8000 + 800 + 80 + 7, 678987 === 600000 + 70000 + 8000 + 900 + 80 + 7], [true, false, true, false, false, false, true], "Uji Kompetensi 4a sampai 4e");
  // Uji Kompetensi nomor 5
  sama([450000 - (4 * 100000 + 4 * 10000 + 3 * 1000), 250000 - 15400, 354500 - 345600, Math.max(345600, 354500), 354500 > 345600], [7000, 234600, 8900, 354500, true], "Uji Kompetensi 5");

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
  cek(cacah >= 40, `persamaan di gambar yang diperiksa mandiri (${cacah})`);
  // Hasil hitungan tampak di gambar
  const gambar = semuaTeks(V.VIDEO_MATERI_K5B9C).join(" | ");
  for (const h of ["623.000", "493.000", "130.000", "110.000", "13.000", "461.800", "345.600", "8.900", "7.000", "234.600", "354.500", "567.000", "443.000", "203.035", "203.305", "550.303", "933.403", "327.100", "505.401", "857.259"]) cek(gambar.includes(h), `gambar video materi memuat hasil "${h}"`);
  const gambarLuar = semuaTeks(V.VIDEO_LUAR_K5B9C).join(" | ");
  for (const h of ["599.198", "500.000 + 90.000 + 9.000 + 100 + 90 + 8 = 599.198", "623.000", "633.000", "110.000 = 100.000 + 10.000", "345.600", "Sisa: 0", "2 x 20.000 = 40.000", "50.000 = 2 x 20.000 + 10.000", "327.100", "505.401", "203.035"]) cek(gambarLuar.includes(h), `gambar video metode luar memuat hasil "${h}"`);
}

/* ------------------------------ Kutipan buku (bila PDF tersedia) ------------------------------ */
{
  const pdf = new URL("../bahan-sd/Matematika-BS-KLS-V.pdf", import.meta.url);
  const ada = existsSync(pdf);
  const cobaPdf = ada ? spawnSync("pdftotext", ["-f", "289", "-l", "312", "-raw", pdf.pathname.replace(/^\/([A-Za-z]:)/, "$1"), "-"], { encoding: "utf8", maxBuffer: 1 << 26 }) : null;
  if (!ada || !cobaPdf || cobaPdf.status !== 0) console.log("PDF atau pdftotext tidak tersedia: pemeriksaan kutipan buku dilewati");
  else {
    const bersih = (t) => t.toLowerCase().replace(/-\s*\n\s*/g, "-").replace(/\s+/g, " ").trim();
    const buku = bersih(cobaPdf.stdout);
    let n = 0;
    for (const a of V.VIDEO_MATERI_K5B9C.adegan) for (const kt of a.kutipan ?? []) {
      n += 1;
      cek(buku.includes(bersih(kt)), `kutipan buku ${a.id}: "${kt}" ada di teks PDF`);
    }
    cek(n >= 30, `jumlah kutipan buku yang diperiksa (${n})`);
    cek(V.VIDEO_MATERI_K5B9C.adegan.every((a) => (a.kutipan ?? []).length >= 3), "tiap adegan materi memuat paling sedikit 3 kutipan");
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k5b9c-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|k5b9c-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas k5b9c sendiri (${impor.join(", ")})`);
  }
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k5b9c.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_C59/.test(pembungkus) && /VIDEO_MATERI_K5B9C/.test(pembungkus) && /VIDEO_LUAR_K5B9C/.test(pembungkus) && /export function VideoK5B9C\(/.test(pembungkus), "video-k5b9c: memakai dua video baru, bukan naskah dan visual lama");
}

for (const v of VIDEO) {
  const kata = v.adegan.reduce((n, a) => n + a.ketukan.reduce((m, kt) => m + L.kataDari(kt.suara).length, 0), 0);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((n, a) => n + a.ketukan.length, 0)} ketukan, ${kata} kata (sekitar ${(kata * 0.5 / 60).toFixed(1)} menit suara)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
