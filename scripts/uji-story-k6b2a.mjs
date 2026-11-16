// Uji Story Kelas 6 Bab 2 Sub-Bab A (Konsep Rasio, termasuk pembuka bab): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, sinkron angka suara dan gambar, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas,
// pemisahan materi dan metode luar, gaya guru tanpa rujukan buku, hitungan mandiri, emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k6b2a.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k6b2a-video.ts");
const M1 = await import("../src/components/modul/story/k6b2a-materi-1.ts");
const M2 = await import("../src/components/modul/story/k6b2a-materi-2.ts");
const M3 = await import("../src/components/modul/story/k6b2a-materi-3.ts");

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
const VIDEO = [V.VIDEO_MATERI_K6B2A, V.VIDEO_LUAR_K6B2A];
const bilanganDari = (t) => (t.match(/\d[\d.]*\d|\d/g) ?? []).map((v) => v.replace(/\./g, ""));
const semuaSidik = new Map();
let totalKetukan = 0;
let totalKata = 0;
for (const v of VIDEO) {
  cek(v.adegan.length >= 5, `${v.id}: paling sedikit 5 adegan (ada ${v.adegan.length})`);
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
  const teksVideo = (v) => JSON.stringify(v.adegan.map((a) => [a.judul, a.sumber, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]));
  const NAMA_METODE = /Part-to-Part|Ordered-Ratio|GCF|Equal-Group|metode luar|metode dari luar/i;
  const M_VIDEO = V.VIDEO_MATERI_K6B2A;
  const U = V.VIDEO_LUAR_K6B2A;
  // Adegan administratif (tujuan dan peta konsep, mengingat kembali, refleksi) tidak lagi diputar di video materi.
  // Adegannya tetap ada di berkas materi, jadi pemeriksaan isi memakai daftar penuh; hanya jumlah dan urutan adegan diuji terhadap video yang diputar.
  const MODUL_MATERI = Object.assign({}, M1, M2, M3);
  const MFULL = { ...M_VIDEO, adegan: [MODUL_MATERI.ADEGAN_PEMBUKA, MODUL_MATERI.ADEGAN_TUJUAN, MODUL_MATERI.ADEGAN_MENGINGAT, MODUL_MATERI.ADEGAN_EKSPLORASI21, MODUL_MATERI.ADEGAN_EKSPLORASI22, MODUL_MATERI.ADEGAN_LATIHAN21, MODUL_MATERI.ADEGAN_REFLEKSI] };
  cek(MFULL.adegan.length === 7 && MFULL.adegan.every(Boolean), "berkas materi memuat tujuh adegan (termasuk yang tidak diputar)");
  const materi = teksVideo(M_VIDEO);
  const luar = teksVideo(U);
  cek(!NAMA_METODE.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of ["Part-to-Part Ratio Language", "Ordered-Ratio Protocol", "GCF Simplify Ratio", "Equal-Group Picture"]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  // Video diputar sebagai guru yang mengajar: tidak ada penyebutan sumber buku di suara, teks terlihat, label sumber, judul adegan, dan subjudul.
  const TERLARANG = /buku|panduan guru|hlm|halaman|kunci|rubrik|salah ketik|salah cetak|tambahan video|contoh video|temuan|pertemuan/i;
  // Sub-Bab A hanya konsep rasio: menulis, membaca (setiap a ada b), menyederhanakan dengan FPB, dan menjaga arah. Tanpa tabel, senilai, satuan,
  // harga, bagian-total, dan waktu (milik Sub-Bab B dan C), juga di gambar dan label. Sama dengan BOCOR_A di scripts/uji-lab-k6b2.mjs.
  const BOCOR_A = /(\btabel|senilai|setara|jembatan|\bbridge|\bsatuan|\bharga|\bpaket|unit rate|\bper jam|\bperjam|\bmenit\b|\bjam\b|\bdurasi|\bwaktu|\bkecepatan|\blaju\b|\bbagian\b|keseluruhan|\btotal\b|\bpart-to-whole|additive|equivalent|time-rate|perbesar|perluas|\bskala\b|\bdikali\b|\bkali\b|\bRp\b|\bkm\b|[×÷]|\d\/\d)/i;
  for (const v of [M_VIDEO, U]) {
    cek(!TERLARANG.test(`${v.judul} ${v.subjudul}`), `${v.id}: judul dan subjudul video tanpa kata terlarang`);
    for (const a of v.adegan) {
      const semua = [a.judul, a.sumber];
      a.ketukan.forEach((kt, i) => {
        semua.push(kt.suara);
        for (let p = 0; p < L.kataDari(kt.suara).length; p += 1) semua.push(...L.teksTerlihat(L.keadaanStory(a, i, p)));
      });
      const kena = semua.filter((t) => TERLARANG.test(t) || /soal nomor|Latihan 2\.[1-3]|nomor [1-4]|catatan video|menurut buku/i.test(t));
      cek(kena.length === 0, `${v.id}/${a.id}: tanpa penyebutan buku atau catatan sumber (${kena.slice(0, 2).join(" | ")})`);
      cek(!/Uji Kompetensi|Pengayaan|Ayo Berlatih|Ayo Berdiskusi|Ayo Berefleksi|Ayo Mengingat|Ayo Berkomunikasi|Ayo Berpikir|soal \d|Soal \d|Eksplorasi|Gambar 2\.|Tabel 2\.|Refleksi/.test(semua.join(" | ")), `${v.id}/${a.id}: latihan disajikan sebagai Latihan, Tantangan, atau Renungan, tanpa nomor gambar atau tabel buku`);
      const bocor = semua.filter((t) => BOCOR_A.test(t));
      cek(bocor.length === 0, `${v.id}/${a.id}: tanpa istilah tabel, senilai, satuan, harga, bagian-total, atau waktu (${bocor.slice(0, 2).join(" | ")})`);
      cek(a.ketukan.every((kt) => !/\d/.test(kt.suara)), `${v.id}/${a.id}: suara tanpa angka digit`);
    }
  }
  cek(M_VIDEO.subjudul === "Materi kurikulum" && U.subjudul === "Empat metode luar", "subjudul video: Materi kurikulum dan Empat metode luar");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 46), "video materi: label sumber berbentuk Materi: ... dan pendek");
  cek(U.adegan.every((a) => /Metode luar|Ringkasan/i.test(a.sumber) && a.sumber.length <= 46), "video metode luar: label sumber metode luar atau ringkasan, pendek");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,pembuka-pohon,eksplorasi21-paket,eksplorasi22-kebun,latihan21-wahana", "urutan adegan materi");
  for (const kata of ["Gerakan Satu Juta Pohon", "Pak Malosi", "jarak", "Artus", "mangga", "jambu", "pucuk merah", "cemara", "FPB", "terhadap", "setiap", "roller coaster", "komidi putar", "bianglala", "rumah hantu", "Banyu", "Latihan", "Hati-hati", "Tantangan", "Renungan"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  // Isi lengkap (termasuk adegan yang tidak diputar) tetap memuat butir tujuan, mengingat, dan refleksi.
  const penuh = teksVideo(MFULL);
  for (const kata of ["Gerakan Satu Juta Pohon", "Pak Malosi", "Tujuan Pembelajaran", "Pertanyaan Pemantik", "Kata Kunci", "peta konsep", "Mengingat Kembali", "faktor", "kelipatan", "pecahan", "Ayo Berefleksi"]) cek(new RegExp(kata, "i").test(penuh), `materi lengkap memuat ${kata}`);
  const ids = U.adegan.map((a) => a.id);
  cek(["luara-bahasa", "luara-bahasa-terapan", "luara-urutan", "luara-urutan-terapan", "luara-fpb", "luara-fpb-terapan", "luara-banding", "luara-banding-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(U.adegan[1].id === "luara-pembuka" && U.adegan[U.adegan.length - 1].id === "luara-ringkas" && M_VIDEO.adegan.length === 5 && U.adegan.length === 11, "5 adegan materi diputar (dengan sapaan) dan 11 adegan metode luar (dengan sapaan)");
  cek(M_VIDEO.adegan[0].id === "sapaan" && U.adegan[0].id === "sapaan", "tiap video dibuka adegan sapaan");
  const suaraLuar = U.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  const suaraMateri = M_VIDEO.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  cek(!/subbab C|rasio bagian terhadap keseluruhan|part to whole/i.test(suaraLuar), "metode luar Sub-Bab A tidak membahas materi Sub-Bab C");
  cek(!/kesamaan rasio|rasio senilai|tabel rasio|rasio satuan/i.test(suaraLuar + suaraMateri), "Sub-Bab A tidak membahas kesamaan rasio atau rasio satuan");
  cek(totalKetukan >= 70, `total ketukan cukup dalam (${totalKetukan})`);
  // Durasi materi diputar 7 sampai 13 menit (dua kata per detik, sapaan termasuk).
  const kataMateri = M_VIDEO.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  cek(kataMateri / 120 >= 7 && kataMateri / 120 <= 13, `durasi materi diputar 7 sampai 13 menit (${(kataMateri / 120).toFixed(1)} menit)`);
}

/* ------------------------------ Angka yang dihitung dalam video, dihitung mandiri ------------------------------ */
{
  const fpb = (a, b) => (b === 0 ? a : fpb(b, a % b));
  // faktor, dihitung satu per satu
  const faktor = (n) => Array.from({ length: n }, (_, i) => i + 1).filter((f) => n % f === 0);
  sama(faktor(10), [1, 2, 5, 10], "faktor 10");
  sama(faktor(15), [1, 3, 5, 15], "faktor 15");
  sama(faktor(10).filter((f) => faktor(15).includes(f)), [1, 5], "faktor persekutuan 10 dan 15");
  sama([1, 2, 3].map((n) => 6 * n), [6, 12, 18], "tiga kelipatan 6");
  cek(10 % 2 === 0, "2 faktor dari 10");
  // penyederhanaan (FPB) dan kesetaraan lewat silang kali
  const sederhana = (a, b) => [a / fpb(a, b), b / fpb(a, b)];
  const setara = (a, b, c, d) => a * d === b * c;
  const kasus = [[10, 15, 5, [2, 3]], [4, 6, 2, [2, 3]], [6, 9, 3, [2, 3]], [24, 18, 6, [4, 3]], [12, 8, 4, [3, 2]], [6, 4, 2, [3, 2]], [6, 15, 3, [2, 5]], [2, 3, 1, [2, 3]], [20, 12, 4, [5, 3]], [32, 24, 8, [4, 3]], [6, 18, 6, [1, 3]], [18, 24, 6, [3, 4]]];
  for (const [a, b, f, h] of kasus) {
    sama([fpb(a, b), sederhana(a, b)], [f, h], `FPB dan rasio sederhana ${a} banding ${b}`);
    cek(setara(a, b, h[0], h[1]), `${a} banding ${b} setara dengan ${h[0]} banding ${h[1]} (silang kali)`);
  }
  cek(sederhana(12, 8).join() === "3,2" && sederhana(6, 4).join() === "3,2", "12 : 8 dibagi 2 menjadi 6 : 4, belum sederhana (FPB 2), lalu 3 : 2");
  // arah: a banding b tidak sama dengan b banding a
  cek(!setara(2, 3, 3, 2) && !setara(4, 3, 3, 4) && !setara(3, 5, 5, 3), "arah rasio: a banding b tidak sama dengan b banding a");
  sama([sederhana(6, 4), sederhana(18, 24)], [[3, 2], [3, 4]], "rasio balik: 6 : 4 = 3 : 2 dan 18 : 24 = 3 : 4");
  // Latihan bersama: 20 bibit mangga dan 12 bibit jambu
  sama([fpb(20, 12), sederhana(20, 12), sederhana(12, 20)], [4, [5, 3], [3, 5]], "mangga : jambu = 20 : 12 = 5 : 3 dan jambu : mangga = 3 : 5");
  cek(20 > 12 && 20 / 4 === 5 && 12 / 4 === 3, "mangga lebih banyak; 20 dibagi 4 = 5 dan 12 dibagi 4 = 3");
  cek(setara(20, 12, 12, 20) === false && setara(5, 3, 3, 5) === false, "arah mangga : jambu berbeda dari jambu : mangga");
  // Kebun: 4 pucuk merah, 6 cemara; coba bersama 6 pucuk merah dan 9 cemara
  sama(sederhana(4, 6), [2, 3], "pucuk merah : cemara = 2 : 3");
  sama([fpb(6, 9), sederhana(6, 9)], [3, [2, 3]], "6 : 9 = 2 : 3 dengan FPB 3");
  // Latihan 1: roller coaster 24, komidi putar 18, bianglala 32, rumah hantu 6
  sama([fpb(24, 18), sederhana(24, 18)], [6, [4, 3]], "roller coaster : komidi putar = 4 : 3");
  sama([fpb(32, 24), sederhana(32, 24)], [8, [4, 3]], "bianglala : roller coaster = 4 : 3");
  sama([fpb(6, 18), sederhana(6, 18)], [6, [1, 3]], "rumah hantu : komidi putar = 1 : 3");
  sama([fpb(18, 24), sederhana(18, 24)], [6, [3, 4]], "komidi putar : roller coaster = 3 : 4");
  // Latihan 2: 6 gelas teh dan 15 gelas jeruk
  sama([fpb(6, 15), sederhana(6, 15), sederhana(15, 6)], [3, [2, 5], [5, 2]], "teh : jeruk = 2 : 5 dan jeruk : teh = 5 : 2");
  cek(setara(6, 15, 2, 5), "6 : 15 setara dengan 2 : 5 (silang kali)");
  // Metode luar 4: kelompok yang sama; banyak kelompok = FPB
  cek(fpb(4, 6) === 2 && 4 / 2 === 2 && 6 / 2 === 3, "4 merah dan 6 biru: 2 kelompok, tiap kelompok 2 merah dan 3 biru");
  cek(fpb(20, 12) === 4 && fpb(24, 18) === 6, "banyak kelompok sama dengan FPB: 4 kelompok bibit dan 6 kelompok pengunjung");
  cek(fpb(12, 8) === 4 && sederhana(12, 8).join() === "3,2", "12 : 8 dengan FPB 4 menjadi 3 : 2");
  // Semua persamaan yang tampak di gambar: periksa aritmetikanya satu per satu.
  let cacah = 0;
  const angka = (s) => Number(s.replace(/\./g, ""));
  for (const v of VIDEO) for (const a of v.adegan) a.ketukan.forEach((kt, i) => {
    for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) {
      let m;
      if ((m = t.match(/^(\d[\d.]*) x (\d+) = (\d[\d.]*)$/))) { cacah += 1; cek(angka(m[1]) * angka(m[2]) === angka(m[3]), `${a.id}: perkalian di gambar "${t}"`); }
      if ((m = t.match(/^(\d+) - (\d+) = (\d+)$/))) { cacah += 1; cek(angka(m[1]) - angka(m[2]) === angka(m[3]), `${a.id}: pengurangan di gambar "${t}"`); }
      if ((m = t.match(/^(\d+) : (\d+)\s+=\s+(\d+) : (\d+)$/))) { cacah += 1; cek(setara(+m[1], +m[2], +m[3], +m[4]), `${a.id}: kesetaraan rasio di gambar "${t}"`); }
      if ((m = t.match(/^FPB dari (\d+) dan (\d+) adalah (\d+)$/))) { cacah += 1; cek(fpb(+m[1], +m[2]) === +m[3], `${a.id}: FPB di gambar "${t}"`); }
      if ((m = t.match(/^(\d+) dibagi (\d+) = (\d+)$/))) { cacah += 1; cek(+m[1] / +m[2] === +m[3], `${a.id}: pembagian di gambar "${t}"`); }
    }
  });
  cek(cacah >= 12, `persamaan di gambar yang diperiksa mandiri (${cacah})`);
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k6b2a-.*)\.(ts|tsx)$/.test(f));
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
    if (f !== "mesin-story.tsx") cek(!/from "react"/.test(s), `${f}: logika dan data tanpa React`);
  }
  
  // larangan berbagi visual: berkas k6b2aa tidak mengimpor gambar atau adegan bab lain
  for (const f of berkas.filter((x) => x.startsWith("k6b2a-"))) {
    const s = readFileSync(new URL(f, folder), "utf8");
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|kutipan-lokal|sapaan|k6b2a-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k6b2a sendiri (${impor.join(", ")})`);
  }
  // mesin tidak memakai kit visual lama
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k6b2a.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_A62/.test(pembungkus) && /VIDEO_MATERI_K6B2A/.test(pembungkus) && /VIDEO_LUAR_K6B2A/.test(pembungkus), "video-k6b2aa: memakai dua video baru, bukan naskah dan visual lama");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n * 0.5 / 60).toFixed(1)} menit suara)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
