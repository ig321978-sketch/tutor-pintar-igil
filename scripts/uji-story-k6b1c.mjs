// Uji Story Kelas 6 Bab 1 Sub-Bab C (Bilangan Desimal): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, sinkron angka suara dan gambar, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas,
// pemisahan materi dan metode luar, kutipan buku (bila PDF ada), emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k6b1c.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { spawnSync } from "node:child_process";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k6b1c-video.ts");

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
const VIDEO = [V.VIDEO_MATERI_K6B1C, V.VIDEO_LUAR_K6B1C];
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
      cek(!/[=×÷<>\/%]/.test(kt.suara), `${nama}#${i + 1}: suara tanpa lambang yang sulit dibaca mesin suara`);
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
{
  const semuaTeks = (v) => v.adegan.flatMap((a) => a.ketukan.flatMap((kt, i) => [...Array(L.kataDari(kt.suara).length).keys()].flatMap((p) => L.teksTerlihat(L.keadaanStory(a, i, p)))));
  const teksVideo = (v) => JSON.stringify(v.adegan.map((a) => [a.judul, a.sumber, a.ketukan.map((kt) => kt.suara)])) + semuaTeks(v).join("|");
  const NAMA_METODE = /Equivalent Fraction|Tenths|Hundredths|Grid Tenths|Place-Value|Compare-and-Order|metode luar/i;
  const METODE_LAIN = /Area Model|Straight-Arrow|Whole-as-Fraction|Commutative|Partition Division|Reciprocal|Cross-Arrow|Measurement Division/i;
  const materi = teksVideo(V.VIDEO_MATERI_K6B1C);
  const luar = teksVideo(V.VIDEO_LUAR_K6B1C);
  cek(!NAMA_METODE.test(materi), "video materi tidak memuat nama metode luar");
  cek(!METODE_LAIN.test(materi) && !METODE_LAIN.test(luar), "tidak memakai nama metode Sub-Bab A atau B");
  for (const m of ["Equivalent Fraction to Tenths and Hundredths", "Grid Tenths-Hundredths Link", "Decimal Place-Value Chart", "Decimal Compare-and-Order"]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  cek(V.VIDEO_MATERI_K6B1C.adegan.every((a) => /Buku Siswa/.test(a.sumber) && /hlm\./.test(a.sumber)), "video materi: tiap adegan mencatat halaman buku");
  cek(V.VIDEO_LUAR_K6B1C.adegan.every((a) => /metode luar|Ringkasan/i.test(a.sumber)), "video metode luar: tiap adegan bersumber metode luar atau ringkasan");
  for (const kata of ["Agam", "timbangan", "Ayo Berefleksi", "Mengingat Kembali", "Eksplorasi 1\\.5", "Eksplorasi 1\\.6", "Latihan 1\\.3", "Uji Kompetensi", "Pengayaan", "persepuluhan", "perseratusan", "Panduan Guru", "Arman", "Didi", "Bayu", "Rina", "Dias", "Pak Made", "Rania", "Dini", "Rani", "Pak Arman", "Gambar 1\\.9", "0,75", "5,8", "0,0886", "Sulawesi Tengah", "Musa", "Andi", "2,49"]) cek(new RegExp(kata, "i").test(materi), `video materi memuat ${kata}`);
  const ids = V.VIDEO_LUAR_K6B1C.adegan.map((a) => a.id);
  cek(["luarc-senilai", "luarc-senilai-terapan", "luarc-kisi", "luarc-kisi-terapan", "luarc-tempat", "luarc-tempat-terapan", "luarc-urut", "luarc-urut-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(V.VIDEO_MATERI_K6B1C.adegan.length === 10 && V.VIDEO_LUAR_K6B1C.adegan.length === 10, "10 adegan materi dan 10 adegan metode luar");
  cek(totalKetukan >= 100, `total ketukan cukup dalam (${totalKetukan})`);
  cek(!/fraction|tenths|place-value|compare|grid/i.test(JSON.stringify(V.VIDEO_MATERI_K6B1C.adegan.map((a) => a.ketukan.map((kt) => kt.suara)))), "suara materi tanpa istilah metode luar");
}

/* ------------------------------ Angka yang dihitung dalam video, dihitung mandiri ------------------------------ */
{
  const semuaTeks = (v) => v.adegan.flatMap((a) => a.ketukan.flatMap((kt, i) => [...Array(L.kataDari(kt.suara).length).keys()].flatMap((p) => L.teksTerlihat(L.keadaanStory(a, i, p)))));
  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
  const sederhana = (a, b) => [a / gcd(a, b), b / gcd(a, b)];
  /** Pembagian bersusun bilangan bulat: n angka di belakang koma; sisa terakhir 0 bila berhenti. */
  const bagiSusun = (a, b, n) => {
    let sisa = a % b;
    const angka = [Math.floor(a / b)];
    for (let i = 0; i < n; i += 1) {
      sisa *= 10;
      angka.push(Math.floor(sisa / b));
      sisa %= b;
    }
    return { teks: `${angka[0]},${angka.slice(1).join("")}`, sisa };
  };
  const des = (t) => Math.round(Number(t.replace(",", ".")) * 1e4); // skala 10.000, hanya untuk perbandingan
  // Pecahan ke desimal (Eksplorasi 1.5, Pembahasan, Latihan 1.3 nomor 1, Uji Kompetensi nomor 5, Pengayaan)
  sama([bagiSusun(1, 2, 2), bagiSusun(1, 5, 2), bagiSusun(1, 10, 2), bagiSusun(1, 4, 2), bagiSusun(3, 4, 2), bagiSusun(4, 5, 1), bagiSusun(29, 5, 2)], [{ teks: "0,50", sisa: 0 }, { teks: "0,20", sisa: 0 }, { teks: "0,10", sisa: 0 }, { teks: "0,25", sisa: 0 }, { teks: "0,75", sisa: 0 }, { teks: "0,8", sisa: 0 }, { teks: "5,80", sisa: 0 }], "pecahan ke desimal dengan pembagian bersusun");
  cek(des("0,5") === des("0,50") && des("0,2") === des("0,20") && des("0,1") === des("0,10") && des("2,9") === des("2,90"), "0,5 sama dengan 0,50; 0,2 sama dengan 0,20; 0,1 sama dengan 0,10; 2,9 sama dengan 2,90");
  cek(bagiSusun(1, 3, 6).teks === "0,333333" && bagiSusun(1, 3, 6).sisa === 1 && bagiSusun(1, 6, 6).teks === "0,166666" && bagiSusun(1, 6, 6).sisa === 4, "1 per 3 dan 1 per 6 tidak berhenti (sisa tidak nol)");
  // Pengali ke penyebut 10 atau 100
  cek(10 / 5 === 2 && 100 / 4 === 25 && 3 * 25 === 75 && 4 * 25 === 100 && 4 * 2 === 8 && 5 * 2 === 10 && 1 * 5 === 5 && 2 * 5 === 10 && 1 * 50 === 50 && 2 * 50 === 100, "pengali 25, 2, 5, dan 50 benar");
  cek(sederhana(25, 100).join() === "1,4" && sederhana(2, 10).join() === "1,5" && sederhana(10, 100).join() === "1,10", "25 per 100 menjadi 1 per 4; 2 per 10 menjadi 1 per 5; 10 per 100 menjadi 1 per 10");
  sama([2, 4, 5, 20, 25, 50].map((p) => 100 % p), [0, 0, 0, 0, 0, 0], "penyebut 2, 4, 5, 20, 25, 50 membagi 100");
  cek(100 % 3 !== 0 && 10 % 3 !== 0 && 100 % 6 !== 0, "penyebut 3 dan 6 tidak membagi 10 atau 100");
  // Kisi: petak dan kolom
  cek(10 * 10 === 100 && 3 * 10 + 7 === 37 && 2 * 10 + 5 === 25 && 7 * 10 + 5 === 75 && 5 * 10 === 50 && 2 * 10 === 20 && 3 * 10 === 30, "kisi: 37, 25, 75, 50, 20, dan 30 petak");
  // Bentuk panjang dan nilai tempat
  cek(2 * 100 + 4 * 10 + 9 === 249 && des("2,49") === 24900 && Math.abs(2 + 0.4 + 0.09 - 2.49) < 1e-12 && Math.abs(10 + 0 + 0.9 - 10.9) < 1e-12 && Math.abs(20 + 8 + 0.6 - 28.6) < 1e-12, "bentuk panjang 2,49, 10,9, dan 28,6");
  cek(des("2,49") < des("2,9") && des("2,49") < des("2,90"), "2,49 lebih kecil dari 2,9 (siswa keliru)");
  // Eksplorasi 1.6: urutkan jarak
  const jarak = { Alma: "2,3", Budi: "10,9", Anita: "1,9", Fadilah: "4,7", Musa: "11,3", Rini: "2,6", Rido: "3,6", Dias: "3,1", Fatim: "2,8", Andi: "1,5" };
  const urut = Object.entries(jarak).sort((p, q) => des(p[1]) - des(q[1]));
  sama(urut.map((p) => p[0]), ["Andi", "Anita", "Alma", "Rini", "Fatim", "Dias", "Rido", "Fadilah", "Budi", "Musa"], "urutan nama dari terdekat (kunci Buku Panduan Guru)");
  sama([urut[0], urut[9]], [["Andi", "1,5"], ["Musa", "11,3"]], "terdekat Andi 1,5 dan terjauh Musa 11,3");
  sama(["2,3", "0,9", "1,9", "2,6", "3,6"].sort((p, q) => des(p) - des(q)), ["0,9", "1,9", "2,3", "2,6", "3,6"], "urutan contoh pembahasan");
  // Latihan 1.3 nomor 2 dan 3
  sama(Object.entries({ "Sumatra Selatan": "37,2", "Sumatra Utara": "33,3", "Nusa Tenggara Timur": "36,6", "Sulawesi Tengah": "38,5", "Kalimantan Utara": "36,8" }).sort((p, q) => des(q[1]) - des(p[1])).map((p) => p[0]), ["Sulawesi Tengah", "Sumatra Selatan", "Kalimantan Utara", "Nusa Tenggara Timur", "Sumatra Utara"], "urutan suhu dari tertinggi");
  sama(Object.entries({ Arman: "3,7", Didi: "2,9", Bayu: "3,6" }).sort((p, q) => des(q[1]) - des(p[1])).map((p) => p[0]), ["Arman", "Bayu", "Didi"], "lompat jauh: Arman terjauh, Didi terdekat");
  // Latihan 1.3 nomor 4: miligram ke gram harus disamakan dulu
  const gram = { Protein: 1.3, "Lemak total": 5.4, Karbohidrat: 28.6, "Serat pangan": 2.7, Natrium: 88.6 / 1000 };
  sama(Object.entries(gram).sort((p, q) => p[1] - q[1]).map((p) => p[0]), ["Natrium", "Protein", "Serat pangan", "Lemak total", "Karbohidrat"], "gizi dari terkecil setelah miligram diubah ke gram");
  cek(Math.abs(88.6 / 1000 - 0.0886) < 1e-12 && 88.6 > 28.6, "88,6 mg sama dengan 0,0886 g; angka 88,6 lebih besar dari 28,6 bila satuan diabaikan");
  // Uji Kompetensi
  sama([(630 / 5) * 2, (100 / 4) * 3, (50 * 3) / 2], [252, 75, 75], "Uji Kompetensi 1, 2, dan 3");
  sama(sederhana(5 * 1, 8 * 4), [5, 32], "Uji Kompetensi 4: 5 per 8 dibagi 4 sama dengan 5 per 32");
  cek((5 * 5 + 4) / 5 === 5.8 && 29 * 20 === 580 && 5 * 20 === 100, "Uji Kompetensi 5: 5 4/5 sama dengan 29 per 5 sama dengan 580 per 100 sama dengan 5,8");
  // Pengayaan
  sama([sederhana(1 * 1, 2 * 3), 3 / 2, 3 * (3 / 2), 4 * (1 / 6), sederhana(4, 6)], [[1, 6], 1.5, 4.5, 4 / 6, [2, 3]], "Pengayaan: 1/6, 3/2, 9/2, 4/6, 2/3");
  cek(1 / 2 / (3 / 4) === (1 / 2) * (4 / 3) && Math.abs((1 / 2) * (4 / 3) - 2 / 3) < 1e-12, "1/2 dibagi 3/4 sama dengan 1/2 kali 4/3 sama dengan 2/3");
  // Persamaan yang tampak di gambar
  let cacah = 0;
  const angka = (s) => Number(s.replace(/\./g, "").replace(",", "."));
  for (const v of VIDEO) for (const a of v.adegan) a.ketukan.forEach((kt, i) => {
    for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) {
      let m;
      if ((m = t.match(/^(\d+) : (\d+) = (\d+)$/))) { cacah += 1; cek(+m[1] / +m[2] === +m[3], `${a.id}: pembagian di gambar "${t}"`); }
      if ((m = t.match(/^(\d+) x (\d+) = (\d+)( km| porsi)?$/))) { cacah += 1; cek(+m[1] * +m[2] === +m[3], `${a.id}: perkalian di gambar "${t}"`); }
      if ((m = t.match(/^(\d+,\d+) = (\d+,\d+)$/))) { cacah += 1; cek(des(m[1]) === des(m[2]), `${a.id}: kesamaan desimal di gambar "${t}"`); }
      if ((m = t.match(/^(\d+,\d+) = (\d+) \+ (\d+,\d+) \+ (\d+,\d+)$/))) { cacah += 1; cek(Math.abs(angka(m[1]) - (angka(m[2]) + angka(m[3]) + angka(m[4]))) < 1e-9, `${a.id}: bentuk panjang di gambar "${t}"`); }
      if ((m = t.match(/^(\d+,\d+) = (\d+) \+ (\d+) \+ (\d+,\d+)$/))) { cacah += 1; cek(Math.abs(angka(m[1]) - (angka(m[2]) + angka(m[3]) + angka(m[4]))) < 1e-9, `${a.id}: bentuk panjang di gambar "${t}"`); }
    }
  });
  cek(cacah >= 10, `persamaan di gambar yang diperiksa mandiri (${cacah})`);
  // Hasil hitungan tampak di gambar
  const gambar = semuaTeks(V.VIDEO_MATERI_K6B1C).join(" | ");
  for (const h of ["0,5", "0,50", "0,2", "0,20", "0,25", "0,75", "5,8", "252", "75", "5/32", "0,0886", "88,6 mg = 0,0886 g", "11,3", "1,5", "9/2", "2/3", "1/6", "0,3333..."]) cek(gambar.includes(h), `gambar video materi memuat hasil "${h}"`);
  const gambarLuar = semuaTeks(V.VIDEO_LUAR_K6B1C).join(" | ");
  for (const h of ["100 : 4 = 25", "3 x 25", "4 x 2", "75", "0,75", "0,8", "0,37", "0,0886", "28,6000", "2,90", "2,49 = 2 + 0,4 + 0,09", "28,6 = 20 + 8 + 0,6", "10,9 = 10 + 0 + 0,9"]) cek(gambarLuar.includes(h), `gambar video metode luar memuat hasil "${h}"`);
}

/* ------------------------------ Kutipan buku (bila PDF tersedia) ------------------------------ */
{
  const pdf = new URL("../bahan-sd/Matematika-BS-KLS-VI.pdf", import.meta.url);
  const ada = existsSync(pdf);
  const cobaPdf = ada ? spawnSync("pdftotext", ["-f", "43", "-l", "58", "-raw", pdf.pathname.replace(/^\/([A-Za-z]:)/, "$1"), "-"], { encoding: "utf8", maxBuffer: 1 << 26 }) : null;
  if (!ada || !cobaPdf || cobaPdf.status !== 0) console.log("PDF atau pdftotext tidak tersedia: pemeriksaan kutipan buku dilewati");
  else {
    const bersih = (t) => t.toLowerCase().replace(/-\s*\n\s*/g, "-").replace(/\s+/g, " ").trim();
    const buku = bersih(cobaPdf.stdout);
    let n = 0;
    for (const a of V.VIDEO_MATERI_K6B1C.adegan) for (const kt of a.kutipan ?? []) {
      n += 1;
      cek(buku.includes(bersih(kt)), `kutipan buku ${a.id}: "${kt}" ada di teks PDF`);
    }
    cek(n >= 20, `jumlah kutipan buku yang diperiksa (${n})`);
    cek(V.VIDEO_MATERI_K6B1C.adegan.every((a) => (a.kutipan ?? []).length >= 3), "tiap adegan materi memuat paling sedikit 3 kutipan");
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k6b1c-.*)\.(ts|tsx)$/.test(f));
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
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|k6b1c-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas k6b1c sendiri (${impor.join(", ")})`);
  }
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k6b1c.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_C61/.test(pembungkus) && /VIDEO_MATERI_K6B1C/.test(pembungkus) && /VIDEO_LUAR_K6B1C/.test(pembungkus) && /export function VideoK6B1C\(/.test(pembungkus), "video-k6b1c: memakai dua video baru, bukan naskah dan visual lama");
}

for (const v of VIDEO) {
  const kata = v.adegan.reduce((n, a) => n + a.ketukan.reduce((m, kt) => m + L.kataDari(kt.suara).length, 0), 0);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((n, a) => n + a.ketukan.length, 0)} ketukan, ${kata} kata (sekitar ${(kata * 0.5 / 60).toFixed(1)} menit suara)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
