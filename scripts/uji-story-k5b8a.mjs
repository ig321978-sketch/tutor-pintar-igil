// Uji Story Kelas 5 Bab 8 Sub-Bab A (mengumpulkan data, termasuk pembuka bab): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, sinkron angka suara dan gambar, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas,
// pemisahan materi dan metode luar, kutipan buku (bila PDF ada), hitungan mandiri (donat, sayuran, turus, nilai ulangan, sepatu),
// emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k5b8a.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { spawnSync } from "node:child_process";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k5b8a-video.ts");

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

/* ------------------------------ Data buku, ditulis ulang mandiri dari halaman PDF ------------------------------ */
// Tabel 8.1 (hlm. 237): cokelat, keju, stroberi, kacang tiap hari Senin sampai Sabtu.
const DONAT_BUKU = [
  [3, 6, 4, 4],
  [4, 4, 6, 3],
  [5, 3, 4, 2],
  [5, 4, 5, 1],
  [6, 3, 3, 0],
  [7, 5, 4, 0],
];
const RASA = ["cokelat", "keju", "stroberi", "kacang"];
// Catatan sayuran favorit enam belas siswa (hlm. 241).
const SISWA = [
  ["Asep", ["kangkung", "wortel", "bayam"]],
  ["Nisa", ["bayam", "sawi"]],
  ["Yohana", ["wortel", "kol", "sawi"]],
  ["Lukas", ["buncis", "wortel", "tomat"]],
  ["Komang", ["kangkung", "tomat"]],
  ["Ahmad", ["kol", "wortel"]],
  ["Meli", ["kangkung", "buncis"]],
  ["Tiara", ["bayam"]],
  ["Randi", ["sawi", "tomat"]],
  ["Kinanti", ["bayam", "kol", "wortel"]],
  ["Anggi", ["buncis", "wortel", "bayam"]],
  ["Tomi", ["wortel", "tomat"]],
  ["Robert", ["sawi", "kangkung", "bayam"]],
  ["Ucok", ["sawi", "buncis", "tomat"]],
  ["Lina", ["wortel", "kangkung"]],
  ["Farah", ["kangkung", "bayam", "tomat"]],
];
const SAYUR = ["bayam", "kangkung", "wortel", "tomat", "buncis", "sawi", "kol"];
// Nilai ulangan SD Mekarsari (hlm. 247).
const NILAI_BUKU = [80, 40, 80, 70, 40, 50, 80, 90, 60, 60, 70, 70, 80, 70, 100, 60, 80, 90, 70, 80, 60, 70, 60, 90, 80];
// Diagram batang Gambar 8.2 (hlm. 239).
const CARA = [6, 8, 4, 6];

const hitung = (daftar, kunci) => daftar.filter((x) => x === kunci).length;
const frekSayur = SAYUR.map((s) => SISWA.filter(([, p]) => p.includes(s)).length);
const NILAI_URUT = [40, 50, 60, 70, 80, 90, 100];
const frekNilai = NILAI_URUT.map((n) => hitung(NILAI_BUKU, n));
const jml = (a) => a.reduce((t, x) => t + x, 0);

// Cek mandiri terhadap angka kunci buku (Tabel 8.4 dan kunci Buku Panduan Guru).
sama(frekSayur, [7, 6, 8, 6, 4, 5, 3], "frekuensi sayuran dari enam belas siswa sama dengan Tabel 8.4 dan kunci Buku Panduan Guru");
cek(jml(frekSayur) === 39 && SISWA.length === 16 && SISWA.every(([, p]) => p.length >= 1 && p.length <= 3), "39 pilihan dari 16 siswa, tiap siswa 1 sampai 3 sayuran");
sama(frekNilai, [2, 1, 5, 6, 7, 3, 1], "frekuensi nilai ulangan");
cek(NILAI_BUKU.length === 25 && jml(frekNilai) === 25, "25 nilai, jumlah frekuensi 25");
cek(Math.max(...NILAI_BUKU) === 100 && hitung(NILAI_BUKU, 100) === 1, "nilai tertinggi 100, satu siswa");
cek(NILAI_BUKU.filter((n) => n < 70).length === 8, "remedi: nilai kurang dari 70 ada 8 siswa");
const totalDonat = RASA.map((_, c) => jml(DONAT_BUKU.map((b) => b[c])));
sama(totalDonat, [30, 25, 26, 10], "jumlah donat per rasa selama enam hari");
cek(jml(totalDonat) === 91, "seluruh donat 91");
// Peristiwa yang dicatat buku: kacang tidak selalu paling sedikit (Senin kacang 4, cokelat 3); cokelat tidak naik setiap hari (Rabu dan Kamis sama).
cek(DONAT_BUKU[0][3] > DONAT_BUKU[0][0] && DONAT_BUKU[3][0] === DONAT_BUKU[2][0], "catatan buku: Senin kacang lebih banyak dari cokelat, Kamis cokelat sama dengan Rabu");
// Ukuran sepatu contoh buatan sendiri.
const SEPATU = [32, 33, 33, 34, 34, 34, 35, 35, 36, 33];
const UKURAN = [32, 33, 34, 35, 36];
const frekSepatu = UKURAN.map((u) => hitung(SEPATU, u));
sama(frekSepatu, [1, 3, 3, 2, 1], "frekuensi ukuran sepatu contoh");
cek(jml(frekSepatu) === SEPATU.length && SEPATU.length === 10, "contoh sepatu: jumlah frekuensi 10");

/* ------------------------------ Isi dua video ------------------------------ */
const VIDEO = [V.VIDEO_MATERI_K5B8A, V.VIDEO_LUAR_K5B8A];
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
      // id benda unik dalam satu keadaan
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
          cek(y > 0 && y < 210 && kiri > -4 && kiri + lebar < 304, `${nama}#${i + 1}: teks "${o.isi}" masuk kanvas (x=${x}, y=${y}, lebar=${Math.round(lebar)})`);
          // persamaan murni angka di gambar diperiksa mandiri (penjumlahan dan perkalian)
          const isi = o.isi ?? "";
          if (/^[\d\s×=+]+$/.test(isi) && isi.includes("=") && isi.split("=").length === 2) {
            const [kiriP, kananP] = isi.split("=").map((s) => s.trim());
            const nilai = (s) => (/^\d+(\s*[×+]\s*\d+)*$/.test(s) ? s.split(/\s*([×+])\s*/).reduce((t, bagian, idx, arr) => (/^\d+$/.test(bagian) ? (idx === 0 ? Number(bagian) : arr[idx - 1] === "×" ? t * Number(bagian) : t + Number(bagian)) : t), 0) : NaN);
            cek(nilai(kiriP) === nilai(kananP), `${nama}#${i + 1}: persamaan di gambar "${isi}" salah hitung`);
          }
          // selisih di gambar
          const sel = isi.match(/^(\d+) - (\d+) = (\d+)$/);
          if (sel) cek(Number(sel[1]) - Number(sel[2]) === Number(sel[3]), `${nama}#${i + 1}: selisih di gambar "${isi}" salah hitung`);
        } else if (o.t === "kotak") cek(x > -2 && y > -2 && x + (o.w ?? 0) < 302 && y + (o.h ?? 0) < 210, `${nama}#${i + 1}: kotak ${o.id} masuk kanvas`);
        else if (o.t === "bulat") cek(x - (o.r ?? 0) > -2 && x + (o.r ?? 0) < 302 && y - (o.r ?? 0) > -2 && y + (o.r ?? 0) < 210, `${nama}#${i + 1}: bulat ${o.id} masuk kanvas`);
      }
      // turus: banyak goresan sama dengan frekuensi di sebelahnya, tiap kelompok lima punya satu goresan miring
      {
        const kelompok = new Map();
        for (const o of akhir) {
          const m = o.id.match(/^(.*)-g(\d+)$/);
          if (m && o.t === "garis") {
            const g = kelompok.get(m[1]) ?? { n: 0, miring: 0, idx: [] };
            g.n += 1;
            if ((o.x2 ?? 0) !== 0) g.miring += 1;
            g.idx.push(Number(m[2]));
            kelompok.set(m[1], g);
          }
        }
        for (const [awalan, g] of kelompok) {
          cek(g.miring === Math.floor(g.n / 5) || /^tg$/.test(awalan), `${nama}#${i + 1}: turus ${awalan}: ${g.n} goresan punya ${g.miring} goresan miring`);
          sama([...g.idx].sort((p, q) => p - q), Array.from({ length: g.n }, (_, q) => q), `${nama}#${i + 1}: nomor goresan ${awalan} berurutan`);
          // goresan miring tepat pada urutan kelima, kesepuluh, dan seterusnya
          for (const o of akhir) {
            const m = o.id.match(/^(.*)-g(\d+)$/);
            if (m && m[1] === awalan && o.t === "garis") cek(((o.x2 ?? 0) !== 0) === ((Number(m[2]) + 1) % 5 === 0), `${nama}#${i + 1}: goresan ${o.id} miring hanya pada kelipatan lima`);
          }
          let pendamping = null;
          if (/-r\d+t$/.test(awalan)) pendamping = awalan.replace(/t$/, "f");
          else if (/^nt\d+-t$/.test(awalan)) pendamping = awalan.replace(/-t$/, "-f");
          if (pendamping) {
            const teksP = akhir.find((o) => o.id === pendamping)?.isi;
            cek(teksP === String(g.n), `${nama}#${i + 1}: turus ${awalan} berisi ${g.n} goresan, frekuensi tertulis ${teksP}`);
          }
        }
      }
    });
  }
}

/* ------------------------------ Pemisahan materi dan metode luar ------------------------------ */
const seluruhTeks = (v) => v.adegan.map((a) => [a.judul, a.sumber, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const M = V.VIDEO_MATERI_K5B8A;
const U = V.VIDEO_LUAR_K5B8A;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const nilaiId = (objs, id) => objs.find((o) => o.id === id)?.isi;
{
  const teksVideo = (v) => JSON.stringify(seluruhTeks(v));
  const NAMA_METODE = /Collection Cycle|Tally Mark|Frequency Table Construction|Decision Reading|Data-to-Decision|Protocol|Construction|metode luar|metode dari luar/i;
  const materi = teksVideo(M);
  const luar = teksVideo(U);
  cek(!NAMA_METODE.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of ["Data Collection Cycle", "Tally Mark Protocol", "Frequency Table Construction", "Data-to-Decision Reading"]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  cek(M.adegan.every((a) => /Buku Siswa/.test(a.sumber) && /hlm\./.test(a.sumber)), "video materi: tiap adegan mencatat halaman buku");
  cek(U.adegan.every((a) => /metode (dari )?luar|Ringkasan/i.test(a.sumber)), "video metode luar: tiap adegan bersumber metode luar atau ringkasan");
  for (const kata of ["Bab 8", "Anggi", "Tabel 8.1", "Tujuan", "Peta Konsep", "Kata Kunci", "Mengingat Kembali", "Gambar 8.2", "Eksplorasi 8.1A", "sayuran", "Tabel 8.2", "Tabel 8.3", "turus", "frekuensi", "Tahukah kalian", "Ayo Berdiskusi", "Tabel 8.4", "Eksplorasi 8.1B", "sepatu", "Ayo Berlatih", "Mekarsari", "Tabel 8.5", "remedi", "Refleksi", "Panduan Guru"]) cek(new RegExp(kata.replace(/\./g, "\\."), "i").test(materi), `video materi memuat ${kata}`);
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-siklus", "luar-siklus-terapan", "luar-turus", "luar-turus-terapan", "luar-tabel", "luar-tabel-terapan", "luar-keputusan", "luar-keputusan-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(M.adegan.length === 11 && U.adegan.length === 10, "11 adegan materi dan 10 adegan metode luar");
  // Subbab A tidak mengajarkan piktogram dan diagram batang (itu Subbab B dan C); hanya pembuka, tujuan, mengingat, dan refleksi boleh menyebutnya.
  const BUKAN_SUBBAB_A = /piktogram|diagram|grafik/i;
  cek(!BUKAN_SUBBAB_A.test(luar), "metode luar Subbab A tidak membahas piktogram atau diagram");
  const bolehMenyebut = ["pembuka-donat", "tujuan-peta", "mengingat", "refleksi"];
  const materiTanpa = JSON.stringify(M.adegan.filter((a) => !bolehMenyebut.includes(a.id)).map((a) => [a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]));
  cek(!BUKAN_SUBBAB_A.test(materiTanpa), "materi Subbab A di luar pembuka, tujuan, mengingat, dan refleksi tidak membahas piktogram atau diagram");
  cek(totalKetukan >= 90, `total ketukan cukup dalam (${totalKetukan})`);
}

/* ------------------------------ Hitungan isi, dihitung mandiri ------------------------------ */
{
  // Tabel 8.1 donat Anggi (pembuka) dan baris kacang serta cokelat.
  {
    const t = akhirAdegan(adegan(M, "pembuka-donat"), 3);
    const HARI = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    HARI.forEach((h, r) => {
      sama(nilaiId(t, `t-t${r + 1}0`), h, `Tabel 8.1 baris ${r + 1}: nama hari`);
      DONAT_BUKU[r].forEach((v, c) => sama(nilaiId(t, `t-t${r + 1}${c + 1}`), String(v), `Tabel 8.1 ${h} rasa ${RASA[c]}`));
    });
    sama(["Cokelat", "Keju", "Stroberi", "Kacang"].map((n, c) => nilaiId(t, `t-t0${c + 1}`)), ["Cokelat", "Keju", "Stroberi", "Kacang"], "Tabel 8.1 kepala kolom");
    const d = akhirAdegan(adegan(M, "tabel-donat"), 1);
    sama([0, 1, 2, 3, 4, 5].map((i) => nilaiId(d, `kc-v${i}`)), DONAT_BUKU.map((b) => String(b[3])), "baris kacang di adegan baca tabel");
    sama([0, 1, 2, 3, 4, 5].map((i) => nilaiId(d, `ck-v${i}`)), DONAT_BUKU.map((b) => String(b[0])), "baris cokelat di adegan baca tabel");
    cek(DONAT_BUKU.map((b) => b[3]).every((v, i, a) => i === 0 || v <= a[i - 1]) && DONAT_BUKU[5][3] === 0, "kacang tidak pernah naik dan akhirnya 0");
    // jumlah tiap rasa di metode luar
    const k = akhirAdegan(adegan(U, "luar-keputusan-terapan"));
    RASA.forEach((r, i) => {
      sama([0, 1, 2, 3, 4, 5].map((j) => nilaiId(k, `dr${i}-v${j}`)), DONAT_BUKU.map((b) => String(b[i])), `metode luar: baris ${r}`);
      sama(nilaiId(k, `dr${i}-h`), String(totalDonat[i]), `metode luar: jumlah ${r}`);
    });
    cek(nilaiId(akhirAdegan(adegan(U, "luar-keputusan-terapan"), 2), "st") === "30 + 25 + 26 + 10 = 91" && nilaiId(k, "sl") === "30 - 10 = 20", "metode luar: total 91 dan selisih 20");
    cek(Math.max(...totalDonat) === totalDonat[0] && Math.min(...totalDonat) === totalDonat[3], "cokelat terbanyak dan kacang tersedikit");
  }
  // Ayo Mengingat Kembali: Gambar 8.2.
  {
    const g = akhirAdegan(adegan(M, "mengingat"), 3);
    sama(["b0", "b1", "b2", "b3"].map((id) => nilaiId(g, `${id}-v`)), CARA.map(String), "Gambar 8.2: tinggi batang");
    const tinggi = (id) => g.find((o) => o.id === `${id}-k`)?.h;
    sama(["b0", "b1", "b2", "b3"].map(tinggi), CARA.map((n) => n * 8), "Gambar 8.2: tinggi kotak sebanding dengan nilai");
    cek(CARA[0] === 6 && Math.max(...CARA) === CARA[1], "jalan kaki 6, paling banyak naik sepeda 8");
  }
  // Catatan sayuran: kartu siswa pertama dan kedelapan.
  {
    const s = akhirAdegan(adegan(M, "sayuran-data"), 1);
    for (let i = 0; i < 8; i += 1) {
      sama(nilaiId(s, `sw${i}-n`), SISWA[i][0], `kartu siswa ${i + 1}: nama`);
      sama(SISWA[i][1].map((_, j) => String(nilaiId(s, `sw${i}-s${j}`)).toLowerCase()), SISWA[i][1], `kartu siswa ${SISWA[i][0]}: sayuran`);
    }
    cek(nilaiId(adegan(M, "sayuran-data") && akhirAdegan(adegan(M, "sayuran-data"), 1), "n1")?.startsWith("16 anak"), "adegan sayuran: 16 anak");
  }
  // Tabel 8.2 (centang) dan 8.3 (garis).
  {
    const c = akhirAdegan(adegan(M, "centang-garis"), 0);
    [["Bayam", 7], ["Kangkung", 6], ["Wortel", 8]].forEach(([n, v], r) => {
      sama(nilaiId(c, `c-t${r + 1}0`), n, `Tabel 8.2 baris ${r + 1}`);
      sama((nilaiId(c, `c-t${r + 1}1`).match(/✓/g) ?? []).length, v, `Tabel 8.2 centang ${n}`);
      sama(nilaiId(c, `c-t${r + 1}2`), String(v), `Tabel 8.2 jumlah ${n}`);
      cek(frekSayur[SAYUR.indexOf(n.toLowerCase())] === v, `Tabel 8.2 ${n}: ${v} sama dengan hitungan mandiri`);
    });
  }
  // Frekuensi bayam dan nama siswa.
  {
    const t = akhirAdegan(adegan(M, "turus-frekuensi"), 5);
    const nama = SISWA.filter(([, p]) => p.includes("bayam")).map(([n]) => n);
    sama(`${nilaiId(t, "by1")} ${nilaiId(t, "by2")}`, nama.join(", ").replace("Kinanti, Anggi", "Kinanti, Anggi"), "daftar siswa yang menyukai bayam (urutan catatan buku)");
    cek(nama.length === 7 && /7 orang/.test(nilaiId(t, "by7")), "bayam: 7 siswa");
    cek(L.teksTerlihat(akhirAdegan(adegan(M, "turus-frekuensi"), 2)).includes("5 garis") && L.teksTerlihat(akhirAdegan(adegan(M, "turus-frekuensi"), 2)).includes("4 garis tegak") && L.teksTerlihat(akhirAdegan(adegan(M, "turus-frekuensi"), 2)).includes("1 garis miring"), "kelompok lima: 5 garis, 4 tegak, 1 miring");
  }
  // Ayo Berdiskusi: Tabel 8.4, nama siswa, dan total.
  {
    const d = adegan(M, "ayo-berdiskusi");
    const t = akhirAdegan(d, 2);
    SAYUR.forEach((s, i) => {
      sama(nilaiId(t, `tf-r${i + 1}n`), s[0].toUpperCase() + s.slice(1), `Tabel 8.4 baris ${i + 1}: nama`);
      sama(nilaiId(t, `tf-r${i + 1}f`), String(frekSayur[i]), `Tabel 8.4 ${s}: frekuensi`);
    });
    const namaDari = (s) => SISWA.filter(([, p]) => p.includes(s)).map(([n]) => n).join(", ");
    sama(nilaiId(akhirAdegan(d, 1), "nm"), namaDari("tomat"), "nama siswa yang menyukai tomat");
    sama(nilaiId(akhirAdegan(d, 2), "nb"), namaDari("buncis"), "nama siswa yang menyukai buncis");
    sama(nilaiId(akhirAdegan(d, 2), "ns"), namaDari("sawi"), "nama siswa yang menyukai sawi");
    sama(nilaiId(akhirAdegan(d, 2), "nk"), namaDari("kol"), "nama siswa yang menyukai kol");
    const j = akhirAdegan(d, 3);
    sama(nilaiId(j, "jm"), `${frekSayur.join(" + ")} = ${jml(frekSayur)}`, "jumlah frekuensi sayuran");
    // pernyataan: wortel paling banyak (tepat), tomat lebih dari bayam (salah), buncis paling sedikit (salah)
    cek(Math.max(...frekSayur) === frekSayur[2] && frekSayur[3] < frekSayur[0] && Math.min(...frekSayur) === frekSayur[6] && frekSayur[4] > frekSayur[6], "tiga pernyataan Ayo Berdiskusi: tepat, salah, salah");
    cek(/wortel 8/.test(nilaiId(akhirAdegan(d, 5), "v1")) && /tomat 6, bayam 7/.test(nilaiId(akhirAdegan(d, 6), "v2")) && /kol 3, buncis 4/.test(nilaiId(akhirAdegan(d, 7), "v3")), "alasan tiga pernyataan memakai angka yang benar");
  }
  // Eksplorasi 8.1B: contoh sepatu buatan sendiri.
  {
    const t = akhirAdegan(adegan(M, "ekspl-81b"), 5);
    UKURAN.forEach((u, r) => {
      sama(nilaiId(t, `sp-r${r + 1}n`), String(u), `contoh sepatu baris ${r + 1}: ukuran`);
      sama(nilaiId(t, `sp-r${r + 1}f`), String(frekSepatu[r]), `contoh sepatu ukuran ${u}: frekuensi`);
    });
    const akhirSepatu = akhirAdegan(adegan(M, "ekspl-81b"), 6);
    sama(nilaiId(akhirSepatu, "jm"), `${frekSepatu.join(" + ")} = ${SEPATU.length}`, "contoh sepatu: jumlah frekuensi sama dengan 10 anak");
    cek(frekSepatu[1] === frekSepatu[2] && frekSepatu[1] === Math.max(...frekSepatu), "contoh sepatu: ukuran 33 dan 34 paling banyak");
  }
  // Ayo Berlatih: data, Tabel 8.5, tertinggi, dan remedi.
  {
    const l = adegan(M, "latihan");
    const g = akhirAdegan(l, 0);
    const dataGambar = [];
    for (let r = 0; r < 3; r += 1) for (let c = 0; c < 10; c += 1) {
      const v = nilaiId(g, `dn${r}-${c}`);
      if (v !== undefined) dataGambar.push(Number(v));
    }
    sama(dataGambar, NILAI_BUKU, "25 nilai di gambar sama dengan buku");
    const t = akhirAdegan(l, 3);
    NILAI_URUT.forEach((n, r) => {
      sama(nilaiId(t, `tl-r${r + 1}n`), String(n), `Tabel 8.5 baris ${r + 1}: nilai`);
      sama(nilaiId(t, `tl-r${r + 1}f`), String(frekNilai[r]), `Tabel 8.5 nilai ${n}: frekuensi`);
    });
    sama(nilaiId(akhirAdegan(l, 4), "eq"), `${frekNilai.join(" + ")} = 25`, "jumlah frekuensi nilai ulangan");
    sama(nilaiId(akhirAdegan(l, 6), "rm"), "2 + 1 + 5 = 8", "remedi 2 ditambah 1 ditambah 5");
    // metode luar menyusun tabel yang sama
    const tn = akhirAdegan(adegan(U, "luar-tabel-terapan"), 1);
    NILAI_URUT.forEach((n, r) => sama([nilaiId(tn, `tn-r${r + 1}n`), nilaiId(tn, `tn-r${r + 1}f`)], [String(n), String(frekNilai[r])], `metode luar Tabel 8.5 nilai ${n}`));
    sama(nilaiId(akhirAdegan(adegan(U, "luar-tabel-terapan"), 2), "tj"), `${frekNilai.join(" + ")} = 25`, "metode luar: jumlah frekuensi 25");
    // turus nilai ulangan di metode luar: kelompok penuh dan sisa
    const nt = akhirAdegan(adegan(U, "luar-turus-terapan"));
    const barisNt = [["80", 7], ["70", 6], ["60", 5], ["90", 3], ["40", 2], ["50", 1], ["100", 1]];
    barisNt.forEach(([n, f], i) => {
      sama(nilaiId(nt, `nt${i}-n`), `nilai ${n}`, `turus terapan baris ${i + 1}`);
      sama(frekNilai[NILAI_URUT.indexOf(Number(n))], f, `turus terapan nilai ${n}: frekuensi sama dengan hitungan mandiri`);
    });
    const penuh = barisNt.map(([, f]) => Math.floor(f / 5));
    const sisa = barisNt.map(([, f]) => f % 5);
    cek(jml(penuh) * 5 === 15 && jml(sisa) === 10 && jml(penuh) * 5 + jml(sisa) === 25, "turus terapan: 15 dari kelompok penuh ditambah 10 sisa sama dengan 25");
    sama([nilaiId(nt, "h1"), nilaiId(nt, "h2")], ["5 + 5 + 5 = 15", "15 + 10 = 25"], "turus terapan: persamaan akhir");
  }
  // Sayuran di metode luar (siklus terapan).
  {
    const s = akhirAdegan(adegan(U, "luar-siklus-terapan"));
    SAYUR.forEach((n, i) => sama(nilaiId(s, `sy${i}`), `${n} ${frekSayur[i]}`, `siklus terapan: ${n}`));
    sama(nilaiId(s, "ek"), `${frekSayur.join(" + ")} = 39`, "siklus terapan: jumlah 39");
  }
  // Tally Mark Protocol: 12 goresan, 2 kelompok lima dan sisa 2.
  {
    const t = akhirAdegan(adegan(U, "luar-turus"), 2);
    const garisT = t.filter((o) => /^tc-g\d+$/.test(o.id));
    cek(garisT.length === 12 && garisT.filter((o) => (o.x2 ?? 0) !== 0).length === 2, "12 goresan punya 2 goresan miring (2 kelompok lima)");
    cek(Math.floor(12 / 5) === 2 && 12 % 5 === 2 && 5 + 5 + 2 === 12, "12 sama dengan 5 ditambah 5 ditambah 2");
    sama(nilaiId(t, "kt3"), "5 + 5 + 2 = 12", "aturan ketiga: persamaan");
  }
  // Frequency Table Construction (konsep): turus dan frekuensi sama, jumlah 10.
  {
    const t = akhirAdegan(adegan(U, "luar-tabel"), 2);
    sama([1, 2, 3].map((r) => nilaiId(t, `fc-r${r}f`)), ["5", "3", "2"], "konsep tabel frekuensi: frekuensi");
    sama(nilaiId(t, "s3"), "5 + 3 + 2 = 10", "konsep tabel frekuensi: jumlah");
  }
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
    for (const a of M.adegan) for (const kt of a.kutipan ?? []) {
      n += 1;
      cek(buku.includes(bersih(kt)), `kutipan buku ${a.id}: "${kt}" ada di teks PDF`);
    }
    cek(n >= 60, `jumlah kutipan buku yang diperiksa (${n})`);
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k5b8a-.*)\.(ts|tsx)$/.test(f));
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
    // larangan berbagi visual: berkas k5b8a hanya mengimpor logika dan berkas k5b8a sendiri
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|k5b8a-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k5b8a sendiri (${impor.join(", ")})`);
  }
  // mesin tidak memakai kit visual lama
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k5b8a.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_A58|video-k4b2-umum/.test(pembungkus) && /VIDEO_MATERI_K5B8A/.test(pembungkus) && /VIDEO_LUAR_K5B8A/.test(pembungkus) && /export function VideoK5B8A/.test(pembungkus), "video-k5b8a: memakai dua video baru, bukan naskah dan visual lama");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${((n * 0.5) / 60).toFixed(1)} menit suara)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
