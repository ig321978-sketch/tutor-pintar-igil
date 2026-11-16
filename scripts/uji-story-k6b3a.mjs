// Uji Story Kelas 6 Bab 3 Sub-Bab A (Mengonstruksi dan Mengurai, termasuk pembuka bab): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, sinkron angka suara dan gambar, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas,
// pemisahan materi dan metode luar, gaya guru tanpa rujukan buku, hitungan mandiri, emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k6b3a.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k6b3a-video.ts");
const M1 = await import("../src/components/modul/story/k6b3a-materi-1.ts");
const M2 = await import("../src/components/modul/story/k6b3a-materi-2.ts");
const M3 = await import("../src/components/modul/story/k6b3a-materi-3.ts");

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
const VIDEO = [V.VIDEO_MATERI_K6B3A, V.VIDEO_LUAR_K6B3A];
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
  const NAMA_METODE = /Layer Counting|Hidden Support|Rotational Equivalence|Minimal Footprint|metode luar/i;
  const M_VIDEO = V.VIDEO_MATERI_K6B3A;
  const U = V.VIDEO_LUAR_K6B3A;
  // Adegan administratif (tujuan, pertanyaan pemantik, peta konsep, dan mengingat kembali) tidak lagi diputar di video materi.
  // Adegannya tetap ada di berkas materi, jadi pemeriksaan isi memakai daftar penuh; hanya jumlah dan urutan adegan diuji terhadap video yang diputar.
  const MODUL_MATERI = Object.assign({}, M1, M2, M3);
  const MFULL = { ...M_VIDEO, adegan: [MODUL_MATERI.ADEGAN_PEMBUKA, MODUL_MATERI.ADEGAN_TUJUAN, MODUL_MATERI.ADEGAN_KONTAINER, MODUL_MATERI.ADEGAN_EKSPLORASI31, MODUL_MATERI.ADEGAN_BALOK, MODUL_MATERI.ADEGAN_LATIHAN31, MODUL_MATERI.ADEGAN_PAK_HASAN] };
  cek(MFULL.adegan.length === 7 && MFULL.adegan.every(Boolean), "berkas materi memuat tujuh adegan (termasuk yang tidak diputar)");
  const materi = teksVideo(M_VIDEO);
  const luar = teksVideo(U);
  cek(!NAMA_METODE.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of ["Layer Counting", "Hidden Support Rule", "Rotational Equivalence Check", "Minimal Footprint Packing"]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  // Video diputar sebagai guru yang mengajar: tidak ada penyebutan sumber buku di suara, teks terlihat, label sumber, judul adegan, dan subjudul.
  const TERLARANG = /buku|panduan guru|hlm|halaman|kunci|rubrik|salah ketik|salah cetak|tambahan video|contoh video|temuan|pertemuan/i;
  // Sub-Bab A hanya susun, urai, lapisan, penyangga, dan total. Tanpa gambar dari beberapa arah, matriks tinggi, siluet, proyeksi (Sub-Bab B)
  // dan koordinat, huruf, jarak, jalur (Sub-Bab C), juga di gambar dan label. Sama dengan BOCOR_A di scripts/uji-lab-k6b3.mjs.
  const BOCOR_A = /(\btampak|\bsiluet|proyeksi|\bmatriks|\bmaksimum|\bmaks\b|orthographic|occlusion|height-matrix|\bperspektif|arah pandang|dari atas|dari depan|dari samping|\bdepan\b|\bsamping\b|\bkoordinat|\blokasi|\bjarak|manhattan|\bjalur|\bdenah|\bgrid\b|\bdiagonal|shortest|naming|huruf)/i;
  const BOCOR_PETAK = /(\bpetak [A-H]\b|\b[A-H][1-9]\b)/;
  for (const v of [M_VIDEO, U]) {
    cek(!TERLARANG.test(`${v.judul} ${v.subjudul}`), `${v.id}: judul dan subjudul video tanpa kata terlarang`);
    for (const a of v.adegan) {
      const semua = [a.judul, a.sumber];
      a.ketukan.forEach((kt, i) => {
        semua.push(kt.suara);
        for (let p = 0; p < L.kataDari(kt.suara).length; p += 1) semua.push(...L.teksTerlihat(L.keadaanStory(a, i, p)));
      });
      const kena = semua.filter((t) => TERLARANG.test(t) || /soal nomor|Latihan 3\.[1-4]|nomor [1-9]|catatan video|menurut buku/i.test(t));
      cek(kena.length === 0, `${v.id}/${a.id}: tanpa penyebutan buku atau catatan sumber (${kena.slice(0, 2).join(" | ")})`);
      cek(!/Uji Kompetensi|Pengayaan|Ayo Berlatih|Ayo Berdiskusi|Ayo Berefleksi|Ayo Mengingat|Ayo Berkomunikasi|Ayo Berpikir|soal \d|Soal \d|Eksplorasi|Gambar 3\.|Tabel 3\.|Refleksi/.test(semua.join(" | ")), `${v.id}/${a.id}: latihan disajikan sebagai Latihan, Tantangan, atau Renungan, tanpa nomor gambar atau tabel buku`);
      const bocor = semua.filter((t) => BOCOR_A.test(t) || BOCOR_PETAK.test(t));
      cek(bocor.length === 0, `${v.id}/${a.id}: tanpa istilah tampak, matriks, koordinat, huruf, jarak, atau jalur (${bocor.slice(0, 2).join(" | ")})`);
      cek(a.ketukan.every((kt) => !/\d/.test(kt.suara)), `${v.id}/${a.id}: suara tanpa angka digit`);
    }
  }
  cek(M_VIDEO.subjudul === "Materi kurikulum" && U.subjudul === "Empat metode luar", "subjudul video: Materi kurikulum dan Empat metode luar");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 46), "video materi: label sumber berbentuk Materi: ... dan pendek");
  cek(U.adegan.every((a) => /Metode luar|Ringkasan/i.test(a.sumber) && a.sumber.length <= 46), "video metode luar: label sumber metode luar atau ringkasan, pendek");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,pembuka-fort,kontainer,eksplorasi-31,dua-balok,latihan-31,pak-hasan", "urutan adegan materi");
  for (const kata of ["Fort Rotterdam", "Makassar", "Igil", "Kira", "kontainer", "Royal Caravan", "arsitek", "prisma segitiga", "batu bata", "penyangga", "dua balok", "Pak Halim", "Latihan", "Hati-hati", "Tantangan", "Renungan"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  // Isi lengkap (termasuk adegan yang tidak diputar) tetap memuat butir tujuan, pertanyaan pemantik, peta konsep, dan mengingat kembali.
  const penuh = teksVideo(MFULL);
  for (const kata of ["Fort Rotterdam", "Pertanyaan pemantik", "peta konsep", "mengingat kembali", "12 rusuk", "Pak Halim", "Renungan"]) cek(new RegExp(kata, "i").test(penuh), `materi lengkap memuat ${kata}`);
  const ids = U.adegan.map((a) => a.id);
  cek(["luara-lapis", "luara-lapis-terapan", "luara-sangga", "luara-putar", "luara-jejak", "luara-jejak-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(U.adegan[1].id === "luara-pembuka" && U.adegan[U.adegan.length - 1].id === "luara-ringkas" && M_VIDEO.adegan.length === 7 && U.adegan.length === 9, "7 adegan materi diputar (dengan sapaan) dan 9 adegan metode luar (dengan sapaan)");
  cek(M_VIDEO.adegan[0].id === "sapaan" && U.adegan[0].id === "sapaan", "tiap video dibuka adegan sapaan");
  const suaraLuar = U.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  const suaraMateri = M_VIDEO.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  cek(!/subbab B|subbab C|visualisasi spasial|sistem berpetak/i.test(suaraLuar + suaraMateri), "Sub-Bab A tidak membahas materi Sub-Bab B atau C");
  cek(totalKetukan >= 70, `total ketukan cukup dalam (${totalKetukan})`);
  // Durasi materi diputar 7 sampai 13 menit (dua kata per detik, sapaan termasuk).
  const kataMateri = M_VIDEO.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  cek(kataMateri / 120 >= 7 && kataMateri / 120 <= 13, `durasi materi diputar 7 sampai 13 menit (${(kataMateri / 120).toFixed(1)} menit)`);
  // Persamaan sederhana yang tampak di gambar: periksa aritmetikanya satu per satu.
  let cacah = 0;
  const angka = (t) => Number(t.replace(/\./g, ""));
  for (const v of [M_VIDEO, U]) {
    for (const a of v.adegan) {
      a.ketukan.forEach((kt, i) => {
        for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) {
          const m = t.match(/(\d[\d.]*(?:\s?[+x:]\s?\d[\d.]*)+)\s*=\s*(\d[\d.]*)(?![\d,])/);
          if (!m) continue;
          const bagian = m[1].split(/\s?([+x:])\s?/);
          let nilai = angka(bagian[0]);
          for (let n = 1; n < bagian.length; n += 2) {
            const q = angka(bagian[n + 1]);
            nilai = bagian[n] === "+" ? nilai + q : bagian[n] === "x" ? nilai * q : nilai / q;
          }
          cacah += 1;
          cek(nilai === angka(m[2]), `${v.id}/${a.id}: persamaan di gambar "${t}"`);
        }
      });
    }
  }
  cek(cacah >= 10, `persamaan di gambar yang diperiksa mandiri (${cacah})`);
}

/* ------------------------------ Angka yang dihitung dalam video, dihitung mandiri ------------------------------ */
{
  const Lu = await import("../src/components/modul/story/k6b3a-luar-1.ts");
  const hitungSel = (sel, f) => sel.filter(f).length;
  // Tangga: banyak kubus per lapisan dan jumlah tinggi kolom.
  const T = Lu.dariTinggi(Lu.TANGGA);
  sama([0, 1, 2].map((h) => hitungSel(T, (s) => s[2] === h)), [6, 3, 1], "lapisan tangga bawah, tengah, atas");
  sama([T.length, Lu.TANGGA.flat().reduce((a, b) => a + b, 0)], [10, 10], "tangga: jumlah per lapisan dan jumlah tinggi kolom sama");
  sama(Lu.TANGGA.flat().filter((t) => t > 0), [3, 2, 1, 2, 1, 1], "tinggi kolom tangga yang disebut");
  // Piramida tiga lapisan.
  sama([0, 1, 2].map((h) => hitungSel(Lu.PIRAMIDA, (s) => s[2] === h)), [9, 4, 1], "piramida: 3 x 3, 2 x 2, 1");
  sama(Lu.PIRAMIDA.length, 14, "piramida 14 kubus");
  // Latihan 3: lapisan bawah 6 (4 terlihat + 2 penyangga) dan lapisan atas 2.
  sama([4 + 2, 2, 4 + 2 + 2], [6, 2, 8], "Latihan 3: 6 + 2 = 8, juga 6 terlihat + 2 tersembunyi");
  // Menara sudut: kubus tersembunyi bila tetangga di sisi i+, j+, dan h+ semuanya terisi.
  const MENARA = [[0, 0, 0], [0, 0, 1], [0, 0, 2], [1, 0, 0], [0, 1, 0]];
  const ada = (a, b, c) => MENARA.some((s) => s[0] === a && s[1] === b && s[2] === c);
  const tersembunyi = MENARA.filter(([i, j, h]) => ada(i + 1, j, h) && ada(i, j + 1, h) && ada(i, j, h + 1));
  sama([MENARA.length, tersembunyi.length, MENARA.length - tersembunyi.length], [5, 1, 4], "menara sudut: 5 kubus, 1 tersembunyi, 4 terlihat");
  // Bentuk bebas dari n kubus (sama bila dapat diputar), dicacah satu per satu.
  const putar = [];
  const perm = [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]];
  const paritas = (p) => {
    let n = 0;
    for (let i = 0; i < 3; i += 1) for (let j = i + 1; j < 3; j += 1) if (p[i] > p[j]) n += 1;
    return n % 2 === 0 ? 1 : -1;
  };
  for (const p of perm) for (const sx of [1, -1]) for (const sy of [1, -1]) for (const sz of [1, -1]) if (paritas(p) * sx * sy * sz === 1) putar.push((c) => [sx * c[p[0]], sy * c[p[1]], sz * c[p[2]]]);
  sama(putar.length, 24, "ada 24 putaran kubus");
  const kanon = (sel) => {
    let terbaik = null;
    for (const r of putar) {
      const t = sel.map(r);
      const m = [0, 1, 2].map((a) => Math.min(...t.map((c) => c[a])));
      const g = t.map((c) => c.map((v, a) => v - m[a])).sort((x, y) => x[0] - y[0] || x[1] - y[1] || x[2] - y[2]);
      const kunci = JSON.stringify(g);
      if (terbaik === null || kunci < terbaik) terbaik = kunci;
    }
    return terbaik;
  };
  const tinggiDi = (sel) => [...new Set(putar.map((r) => { const t = sel.map(r).map((c) => c[2]); return Math.max(...t) - Math.min(...t) + 1; }))].sort();
  const tumbuh = (set) => {
    const hasil = new Map();
    for (const sel of set) for (const [i, j, h] of sel) for (const [a, b, c] of [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]]) {
      const baru = [i + a, j + b, h + c];
      if (sel.some((s) => s[0] === baru[0] && s[1] === baru[1] && s[2] === baru[2])) continue;
      const gabung = [...sel, baru];
      hasil.set(kanon(gabung), gabung);
    }
    return [...hasil.values()];
  };
  const dua = tumbuh([[[0, 0, 0]]]);
  const tiga = tumbuh(dua);
  sama([dua.length, tiga.length], [1, 2], "dua kubus: 1 bentuk; tiga kubus: 2 bentuk berbeda");
  sama(tiga.map(tinggiDi).map((a) => a.join("-")).sort(), ["1-2", "1-3"], "tinggi yang mungkin: bentuk siku 1 atau 2 lantai, bentuk lurus 1 atau 3 lantai");
  cek(kanon([[0, 0, 0], [1, 0, 0], [2, 0, 0]]) !== kanon([[0, 0, 0], [1, 0, 0], [0, 1, 0]]), "lurus dan siku tidak dapat saling diputar");
  cek(kanon([[0, 0, 0], [1, 0, 0], [2, 0, 0]]) === kanon([[0, 0, 0], [0, 0, 1], [0, 0, 2]]), "tiga berjejer sama dengan menara tiga lantai");
  cek(kanon([[0, 0, 0], [1, 0, 0], [0, 1, 0]]) === kanon([[0, 0, 0], [1, 0, 0], [0, 0, 1]]), "siku berbaring sama dengan siku berdiri");
  cek(kanon([[0, 0, 0], [1, 0, 0]]) === kanon([[0, 0, 0], [0, 0, 1]]) && kanon([[0, 0, 0], [1, 0, 0]]) === kanon([[0, 0, 0], [0, 1, 0]]), "dua kubus: a, b, dan c sama");
  // Dua balok 2 x 1 x 1: sisi 2 x 1 bertemu (kotak 2 x 2 x 1) lawan sisi 1 x 1 bertemu (balok 4 x 1 x 1).
  const kotak2 = [[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0]];
  const balok4 = [[0, 0, 0], [1, 0, 0], [2, 0, 0], [3, 0, 0]];
  cek(kanon(kotak2) !== kanon(balok4) && kotak2.length === balok4.length, "dua balok: dua susunan berbeda dengan jumlah kubus sama");
  // Tantangan Pak Halim: 30 kardus 20 x 30 x 50, tinggi gudang 310 cm.
  const dim = [20, 30, 50];
  const volume = 30 * dim[0] * dim[1] * dim[2];
  sama([dim[0] * dim[1] * dim[2], volume], [30000, 900000], "volume satu kardus dan 30 kardus");
  const hasil = dim.map((t) => {
    const lain = dim.filter((v) => v !== t);
    const perTumpukan = Math.floor(310 / t);
    const tumpukan = Math.ceil(30 / perTumpukan);
    return [t, perTumpukan, tumpukan, lain[0] * lain[1], tumpukan * lain[0] * lain[1]];
  });
  sama(hasil, [[20, 15, 2, 1500, 3000], [30, 10, 3, 1000, 3000], [50, 6, 5, 600, 3000]], "tiga cara menegakkan kardus: semuanya 3.000 cm persegi");
  sama([volume / 300, 3000 / 10000], [3000, 0.3], "jejak 900.000 dibagi 300, dan 0,3 meter persegi");
  cek(310 >= 6 * 50 && 6 * 50 === 300 && 300 % 20 === 0 && 300 % 30 === 0 && 300 % 50 === 0, "300 habis dibagi 20, 30, dan 50");
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k6b3a-.*)\.(ts|tsx)$/.test(f));
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
  
  // larangan berbagi visual: berkas k6b3aa tidak mengimpor gambar atau adegan bab lain
  for (const f of berkas.filter((x) => x.startsWith("k6b3a-"))) {
    const s = readFileSync(new URL(f, folder), "utf8");
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|kutipan-lokal|sapaan|k6b3a-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k6b3a sendiri (${impor.join(", ")})`);
  }
  // mesin tidak memakai kit visual lama
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k6b3a.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_A63/.test(pembungkus) && /VIDEO_MATERI_K6B3A/.test(pembungkus) && /VIDEO_LUAR_K6B3A/.test(pembungkus), "video-k6b3aa: memakai dua video baru, bukan naskah dan visual lama");
}

console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
