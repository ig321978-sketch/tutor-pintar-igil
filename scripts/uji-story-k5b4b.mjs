// Uji Story Kelas 5 Bab 4 Sub-Bab B (keliling segitiga): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, sinkron angka suara dan gambar, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas,
// teks bertumpuk, pemisahan materi dan metode luar, tidak membocorkan materi subbab berikutnya, kutipan buku (bila PDF ada),
// hitungan mandiri (keliling tiap segitiga contoh buku, bentuk dan label sisi di gambar, tanda sisi sama panjang, pita benang, tabel rangkuman),
// emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k5b4b.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { spawnSync } from "node:child_process";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k5b4b-video.ts");

const stat = { segitiga: 0, label: 0, tanda: 0, teksPasang: 0, pita: 0 };
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

/* ------------------------------ Data buku, ditulis ulang mandiri dari halaman PDF ------------------------------ */
// Buku Siswa hlm. 115-117 dan Panduan Guru hlm. 130-137. Urutan sisi sesuai penulisan kunci Panduan Guru.
const BUKU = {
  sembarang1: { sisi: [3, 5, 6], keliling: 14 }, // Panduan Guru hlm. 130: Keliling = 3 + 5 + 6 = 14
  sembarang2: { sisi: [7, 4, 5], keliling: 16 }, // Panduan Guru hlm. 131: Keliling = 7 + 4 + 5 = 16
  samaSisi5: { sisi: [5, 5, 5], keliling: 15 }, // Panduan Guru hlm. 133: Keliling = 3 x 5 = 15
  samaSisi6: { sisi: [6, 6, 6], keliling: 18 }, // Panduan Guru hlm. 134: 6 + 6 + 6 = 3 x 6 = 18
  samaKaki: { sisi: [6, 6, 4], keliling: 16 }, // Panduan Guru hlm. 137: 6 + 6 + 4 = 2 x 6 + 4 = 16
};
const jml = (a) => a.reduce((t, x) => t + x, 0);
const jumlahTeks = (b) => `${b.sisi.join(" + ")} = ${b.keliling}`;
// Hitungan ulang kunci buku.
for (const [nama, b] of Object.entries(BUKU)) sama(jml(b.sisi), b.keliling, `kunci ${nama}: jumlah sisi = keliling`);
sama(3 * 5, BUKU.samaSisi5.keliling, "sama sisi 5: 3 kali 5");
sama(3 * 6, BUKU.samaSisi6.keliling, "sama sisi 6: 3 kali 6");
sama(2 * 6 + 4, BUKU.samaKaki.keliling, "sama kaki: 2 kali 6 ditambah 4");
cek(new Set(BUKU.sembarang1.sisi).size === 3 && new Set(BUKU.sembarang2.sisi).size === 3, "dua segitiga sembarang tidak punya sisi yang sama panjang");
cek(BUKU.samaKaki.sisi[0] === BUKU.samaKaki.sisi[1] && BUKU.samaKaki.sisi[2] !== BUKU.samaKaki.sisi[0], "sama kaki: dua sisi sama, sisi ketiga (alas) berbeda");
for (const b of [BUKU.sembarang1, BUKU.sembarang2, BUKU.samaSisi5, BUKU.samaSisi6, BUKU.samaKaki]) {
  const [p, q, r] = [...b.sisi].sort((m, n) => m - n);
  cek(p + q > r, `ketaksamaan segitiga terpenuhi untuk ${b.sisi.join(", ")}`);
}

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
/** Panjang tiga sisi: alas (titik 0 ke 1), kanan (1 ke 2), kiri (2 ke 0). */
const sisiPiksel = (p) => [0, 1, 2].map((i) => Math.hypot(p[(i + 1) % 3][0] - p[i][0], p[(i + 1) % 3][1] - p[i][1]));
const BENTUK = [BUKU.sembarang1.sisi, BUKU.sembarang2.sisi, BUKU.samaSisi5.sisi, BUKU.samaKaki.sisi].map((s) => {
  const u = [...s].sort((m, n) => m - n);
  return u.map((x) => x / u[0]);
});
const bentukCocok = (sisi) => {
  const u = [...sisi].sort((m, n) => m - n);
  const r = u.map((x) => x / u[0]);
  return BENTUK.some((b) => b.every((x, i) => Math.abs(x - r[i]) < 0.012));
};

/* ------------------------------ Isi dua video ------------------------------ */
const VIDEO = [V.VIDEO_MATERI_K5B4B, V.VIDEO_LUAR_K5B4B];
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
          const isi = o.isi ?? "";
          const sel = isi.match(/^(\d+)((?: \+ \d+)+)$/);
          if (sel) stat.bangun += 0;
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


/* ------------------------------ Pemisahan materi dan metode luar ------------------------------ */
const seluruhTeks = (v) => v.adegan.map((a) => [a.judul, a.sumber, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const M = V.VIDEO_MATERI_K5B4B;
const U = V.VIDEO_LUAR_K5B4B;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const nilaiId = (objs, id) => objs.find((o) => o.id === id)?.isi;
const objId = (objs, id) => objs.find((o) => o.id === id);
{
  const teksVideo = (v) => JSON.stringify(seluruhTeks(v));
  const NAMA_METODE = /Side Sum|Equilateral Shortcut|Measure Then Sum|String Unrolling|metode luar|metode dari luar/i;
  const materi = teksVideo(M);
  const luar = teksVideo(U);
  cek(!NAMA_METODE.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of ["Side Sum", "Equilateral Shortcut", "Measure Then Sum", "String Unrolling"]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  cek(M.adegan.every((a) => /(Buku Siswa|Panduan Guru) hlm\./.test(a.sumber)), "video materi: tiap adegan mencatat halaman buku");
  cek(U.adegan.every((a) => /metode luar|Ringkasan/i.test(a.sumber)), "video metode luar: tiap adegan bersumber metode luar atau ringkasan");
  for (const kata of ["Subbab B", "Keliling Segitiga", "Eksplorasi 4.2A", "Eksplorasi 4.2B", "Eksplorasi 4.2C", "Ayo Menemukan", "Ayo Berlatih", "Cara Asep", "Cara Nisa", "segitiga sembarang", "segitiga sama sisi", "segitiga sama kaki", "penggaris", "Tabel 4.4", "Tabel 4.5", "Refleksi", "hands-on", "Apersepsi", "pemanasan", "alas", "panjang sisi", "papan tulis", "projector", "4 JP", "Catatan guru"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-sisi", "luar-sisi-terapan", "luar-pintas", "luar-pintas-terapan", "luar-ukur", "luar-ukur-terapan", "luar-benang", "luar-benang-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk empat metode");
  cek(M.adegan.length === 11 && U.adegan.length === 10, "11 adegan materi dan 10 adegan metode luar");
  // Subbab B tidak membocorkan materi subbab berikutnya (segi empat, segi banyak, bangun gabungan).
  const BOCOR = /persegi|jajar ?genjang|trapesium|belah ketupat|layang|segi empat|segi lima|segi enam|segi delapan|segi banyak|segi-n|gabungan|dekomposisi/i;
  const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
  for (const a of M.adegan) cek(!BOCOR.test(teksAdegan(a)), `materi ${a.id} tidak membocorkan materi subbab berikutnya`);
  for (const a of U.adegan) cek(!BOCOR.test(teksAdegan(a)), `metode luar ${a.id} tidak membocorkan materi subbab berikutnya`);
  // Subbab A (Eksplorasi 4.1, lapangan sepak bola) dan Refleksi nomor 1, 2, 6 sampai 20 bukan milik subbab ini; Uji Kompetensi, pengayaan, remedial milik subbab lain.
  cek(!/Eksplorasi 4\.1|lapangan sepak bola|Uji Kompetensi|pengayaan|remedial|Refleksi nomor (satu|dua|enam|tujuh|delapan|sembilan|sepuluh|sebelas|dua belas)/i.test(materi + luar), "tidak memakai isi subbab lain");
  cek(!/Eksplorasi 4\.3/.test(luar) && M.adegan.filter((a) => /Eksplorasi 4\.3/.test(teksAdegan(a))).map((a) => a.id).join() === "persiapan", "Eksplorasi 4.3 hanya muncul sebagai catatan salah tulis Panduan Guru pada adegan persiapan");
  cek(totalKetukan >= 80, `total ketukan cukup dalam (${totalKetukan})`);
}

/* ------------------------------ Semua persamaan di gambar dihitung ulang ------------------------------ */
{
  let n = 0;
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((_, i) => {
        for (const o of akhirAdegan(a, i)) {
          if (o.t !== "teks" || !o.isi) continue;
          const m = o.isi.match(/^([\d\s+×()/]+(?:=\s*[\d\s+×()/]+)+)/);
          if (!m) continue;
          const nilai = m[1].split("=").map((s) => Function(`"use strict"; return (${s.trim().replace(/×/g, "*") || "NaN"});`)());
          n += 1;
          cek(nilai.every((x) => Math.abs(x - nilai[0]) < 1e-9), `${v.id}/${a.id}#${i + 1}: persamaan "${o.isi}" benar (${nilai.join(" ; ")})`);
        }
      });
    }
  }
  cek(n >= 25, `jumlah persamaan yang diperiksa (${n})`);
}

/* ------------------------------ Bentuk segitiga, label sisi, dan tanda sisi sama panjang di gambar ------------------------------ */
{
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((_, i) => {
        const t = akhirAdegan(a, i);
        const nama = `${v.id}/${a.id}#${i + 1}`;
        const segitiga = new Map();
        for (const o of t) {
          const p = o.t === "jalur" ? titikJalur(o) : null;
          if (p && p.length === 3) {
            const s = sisiPiksel(p);
            segitiga.set(o.id, s);
            stat.segitiga += 1;
            cek(bentukCocok(s), `${nama}: bentuk segitiga ${o.id} sama dengan salah satu segitiga buku (sisi ${s.map((x) => x.toFixed(1)).join(", ")})`);
          }
        }
        // Label "N cm": perbandingan panjang piksel terhadap angka label sama untuk semua sisi berlabel.
        for (const [id, s] of segitiga) {
          const label = [0, 1, 2].map((q) => nilaiId(t, `${id}-l${q}`)).map((x) => (x && /^\d+ cm$/.test(x) ? Number(x.split(" ")[0]) : null));
          const ada = label.map((x, q) => (x === null ? null : s[q] / x)).filter((x) => x !== null);
          stat.label += ada.length;
          if (ada.length >= 2) cek(ada.every((x) => Math.abs(x - ada[0]) < 0.02 * ada[0] + 0.02), `${nama}: label sisi ${id} sesuai panjang gambar (${label.join(", ")})`);
          // Tanda sisi sama panjang: sisi bertanda sama panjang, paling sedikit dua.
          const tanda = [0, 1, 2].filter((q) => objId(t, `${id}-m${q}`));
          if (tanda.length) {
            stat.tanda += tanda.length;
            cek(tanda.length >= 2, `${nama}: ${id} bertanda paling sedikit dua sisi`);
            cek(tanda.every((q) => Math.abs(s[q] - s[tanda[0]]) < 0.15), `${nama}: sisi bertanda pada ${id} sama panjang`);
            for (const q of [0, 1, 2].filter((x) => !tanda.includes(x))) cek(Math.abs(s[q] - s[tanda[0]]) > 0.5, `${nama}: sisi tak bertanda pada ${id} berbeda panjang`);
          }
        }
      });
    }
  }
  cek(stat.segitiga > 60 && stat.label > 50 && stat.tanda > 20, `jumlah segitiga, label, dan tanda yang diperiksa (${stat.segitiga}, ${stat.label}, ${stat.tanda})`);
}

/* ------------------------------ Hitungan isi, dihitung mandiri ------------------------------ */
const labelSisi = (t, id) => [0, 1, 2].map((q) => nilaiId(t, `${id}-l${q}`));
const sel = (t, id, r, c) => nilaiId(t, `${id}-t${r}${c}`);
const sisiTabel = (s) => s.split(", ").map(Number);
const kelilingJenis = (jenis, sisi) => (jenis === "sama sisi" ? 3 * sisi[0] : jenis === "sama kaki" ? 2 * sisi[0] + sisi[2] : jml(sisi));
{
  // Pembuka: Subbab B mendapat 4 JP (Panduan Guru hlm. 128) dan tiga jenis segitiga.
  {
    const t = akhirAdegan(adegan(M, "pembuka-b"), 1);
    sama(nilaiId(t, "wk-t0"), "waktu: 4 JP", "waktu Subbab B 4 JP");
    sama(["j1-t0", "j2-t0", "j3-t0"].map((id) => nilaiId(t, id)), ["segitiga sembarang", "segitiga sama sisi", "segitiga sama kaki"], "tiga jenis segitiga menurut tujuan Subbab B");
  }
  // Eksplorasi 4.2A segitiga pertama: sisi 3, 5, 6; keliling 14.
  {
    const a = adegan(M, "eks-a-ukur");
    sama(labelSisi(akhirAdegan(a, 0), "ta"), ["... cm", "... cm", "... cm"], "segitiga pertama awalnya belum berangka");
    const t = akhirAdegan(a, 1);
    sama([nilaiId(t, "ta-l1"), nilaiId(t, "ta-l2"), nilaiId(t, "ta-l0")], ["3 cm", "5 cm", "6 cm"], "label sisi segitiga pertama menurut kunci (kanan 3, kiri 5, alas 6)");
    sama(nilaiId(akhirAdegan(a, 3), "hs"), jumlahTeks(BUKU.sembarang1), "jumlah segitiga pertama");
    sama(nilaiId(akhirAdegan(a, 4), "kl"), `keliling = ${BUKU.sembarang1.keliling} cm`, "keliling segitiga pertama");
  }
  // Segitiga kedua: sisi 5, 4, 7 (kiri, kanan, alas); keliling 16.
  {
    const a = adegan(M, "eks-a-dua");
    const t = akhirAdegan(a, 0);
    sama([nilaiId(t, "tb-l2"), nilaiId(t, "tb-l1"), nilaiId(t, "tb-l0")], ["5 cm", "4 cm", "7 cm"], "label sisi segitiga kedua");
    sama(nilaiId(akhirAdegan(a, 1), "hs"), jumlahTeks(BUKU.sembarang2), "jumlah segitiga kedua");
    sama(nilaiId(akhirAdegan(a, 1), "kl"), `keliling = ${BUKU.sembarang2.keliling} cm`, "keliling segitiga kedua");
    const t3 = akhirAdegan(a, 2);
    sama([nilaiId(t3, "r1"), nilaiId(t3, "r2")], [jumlahTeks(BUKU.sembarang1), jumlahTeks(BUKU.sembarang2)], "dua hasil dijajarkan");
    const poli = [jalurDari(t3, "s1"), jalurDari(t3, "s2")].map((p) => sisiPiksel(p).sort((m, n) => m - n));
    for (const [q, b] of [BUKU.sembarang1, BUKU.sembarang2].entries()) {
      const u = [...b.sisi].sort((m, n) => m - n);
      sama(poli[q].map((x) => Math.round(x / 12)), u, `segitiga ${q + 1} yang dijajarkan berukuran ${u.join(", ")} (skala 12)`);
    }
    for (const kt of ["f1", "f2", "f3", "f4"]) cek(!!akhirAdegan(a, 3).find((o) => o.id === `${kt}-k`), `alur Tabel 4.4 memuat langkah ${kt}`);
  }
  // Menggeneralisasi: tiga segitiga dijajarkan menunjukkan pola yang sama.
  {
    const a = adegan(M, "eks-a-umum");
    sama(labelSisi(akhirAdegan(a, 0), "tc"), ["sisi 2", "sisi 3", "sisi 1"], "tiga sisi diberi nama sisi 1, 2, 3 (alas, kanan, kiri)");
    const t = akhirAdegan(a, 1);
    sama([nilaiId(t, "fm1"), nilaiId(t, "fm2"), nilaiId(t, "fm3")], ["Keliling = panjang sisi 1", "+ panjang sisi 2", "+ panjang sisi 3"], "rumus umum segitiga sembarang");
    const t3 = akhirAdegan(a, 2);
    sama([nilaiId(t3, "h1"), nilaiId(t3, "h2")], [jumlahTeks(BUKU.sembarang1), jumlahTeks(BUKU.sembarang2)], "pola dua contoh");
  }
  // Segitiga sama sisi 5 cm: sisi bertanda, 5 + 5 + 5 = 3 kali 5 = 15.
  {
    const t = akhirAdegan(adegan(M, "eks-b-sama-sisi"), 1);
    sama(labelSisi(t, "tg"), ["5 cm", "5 cm", "5 cm"], "tiga sisi 5 cm");
    sama([0, 1, 2].filter((q) => objId(t, `tg-m${q}`)).length, 3, "tiga tanda sisi sama panjang");
    const a = adegan(M, "eks-b-asep-nisa");
    const t1 = akhirAdegan(a, 2);
    sama([nilaiId(t1, "as"), nilaiId(t1, "nk")], [jumlahTeks(BUKU.samaSisi5), "3 × 5 = 15"], "Cara Asep dan Cara Nisa");
    sama(nilaiId(akhirAdegan(a, 3), "pe"), "5 + 5 + 5 = 3 × 5 = 15", "penjumlahan berulang sama dengan perkalian");
    sama(sisiPiksel(jalurDari(akhirAdegan(a, 0), "ta")).map((x) => Math.round(x / 14)), [5, 5, 5], "segitiga Cara Asep 5 cm (skala 14)");
  }
  // Sama sisi 6 cm dan rumus umum.
  {
    const a = adegan(M, "eks-b-umum");
    sama(labelSisi(akhirAdegan(a, 0), "tg"), ["6 cm", "6 cm", "6 cm"], "sama sisi 6 cm");
    sama(nilaiId(akhirAdegan(a, 0), "eq"), "6 + 6 + 6 = 3 × 6 = 18", "sama sisi 6: jumlah dan kali");
    const t = akhirAdegan(a, 1);
    sama([[1, 5], [2, 6]].map(([r, s]) => [sel(t, "tb", r, 0), sel(t, "tb", r, 1), `${3 * s} cm`]), [["5 cm", "15 cm", "15 cm"], ["6 cm", "18 cm", "18 cm"]], "tabel sisi 5 dan 6 sama dengan tiga kali sisi");
    sama(nilaiId(akhirAdegan(a, 2), "rm-t1"), "3 × panjang sisi", "rumus sama sisi");
    const t4 = akhirAdegan(a, 4);
    sama([nilaiId(t4, "c1-t0"), nilaiId(t4, "c2-t0")], ["Keliling = sisi 1 + sisi 2 + sisi 3", "Keliling = panjang sisi × 3"], "dua bentuk kesimpulan sama sisi");
  }
  // Sama kaki 6, 6, 4: dua sisi bertanda, alas 4.
  {
    const a = adegan(M, "eks-c-sama-kaki");
    sama(labelSisi(akhirAdegan(a, 1), "tk"), ["4 cm", "6 cm", "6 cm"], "label sama kaki: alas 4, kanan 6, kiri 6");
    const t2 = akhirAdegan(a, 2);
    sama([0, 1, 2].map((q) => !!objId(t2, `tk-m${q}`)), [false, true, true], "tanda hanya pada dua sisi 6 cm");
    sama(nilaiId(t2, "al"), "alas = 4 cm", "alas 4 cm");
    sama(sisiPiksel(jalurDari(t2, "tk")).map((x) => Math.round(x / 18)), [4, 6, 6], "ukuran gambar sama kaki 4, 6, 6 (skala 18)");
    const t3 = akhirAdegan(a, 3);
    sama([sisiPiksel(jalurDari(t3, "m1")), sisiPiksel(jalurDari(t3, "m2"))].map((s) => s.map((x) => Math.round(x / 14))), [[4, 6, 6], [4, 6, 6]], "segitiga miring dan tegak sama ukurannya");
    const b = adegan(M, "eks-c-cara");
    const tb = akhirAdegan(b, 0);
    sama(nilaiId(tb, "e1"), jumlahTeks(BUKU.samaKaki), "Cara 1: 6 + 6 + 4 = 16");
    sama(labelSisi(tb, "tk"), ["4 cm", "6 cm", "6 cm"], "label sama kaki di Cara 1");
    sama(nilaiId(akhirAdegan(b, 1), "e2"), "2 × 6 + 4 = 12 + 4 = 16", "Cara Nisa");
    sama(nilaiId(akhirAdegan(b, 3), "ct"), "2 × 6 + 4 = 16", "contoh rumus sama kaki");
  }
  // Rangkuman dan Refleksi 3, 4, 5.
  {
    const a = adegan(M, "refleksi-b");
    const t = akhirAdegan(a, 0);
    sama([1, 2, 3].map((r) => [sel(t, "rg", r, 0), sel(t, "rg", r, 1)]), [["sembarang", "sisi 1 + sisi 2 + sisi 3"], ["sama sisi", "3 × panjang sisi"], ["sama kaki", "2 × sisi sama + alas"]], "tabel rangkuman tiga jenis");
    const t2 = akhirAdegan(a, 1);
    const baris = [1, 2, 3, 4, 5].map((r) => [sel(t2, "ct", r, 0), sisiTabel(sel(t2, "ct", r, 1)), Number(sel(t2, "ct", r, 2).split(" ")[0])]);
    sama(baris.map((b) => b[0]), ["sembarang", "sembarang", "sama sisi", "sama sisi", "sama kaki"], "jenis tiap baris contoh");
    for (const [jenis, sisi, k] of baris) sama(kelilingJenis(jenis, sisi), k, `keliling ${jenis} ${sisi.join(", ")} = ${k}`);
    sama(baris.map((b) => b[2]), [14, 16, 15, 18, 16], "lima keliling contoh");
    sama(sisiTabel(sel(t2, "ct", 1, 1)).concat(sisiTabel(sel(t2, "ct", 2, 1))), BUKU.sembarang1.sisi.concat(BUKU.sembarang2.sisi), "sisi sembarang di tabel sama kunci");
    const t5 = akhirAdegan(a, 3);
    sama(["f3-t0", "f4-t0", "f5-t0"].map((id) => nilaiId(t5, id)?.[0]), ["3", "4", "5"], "tiga butir refleksi bernomor 3, 4, 5");
    sama(["y1", "y2", "y3"].map((id) => nilaiId(akhirAdegan(a, 4), id)), ["14 cm", "15 cm", "16 cm"], "tiga contoh penutup");
  }
}
{
  // Side Sum: jumlah berjalan 0, 3, 8, 14 dan segitiga kedua 16.
  {
    const a = adegan(U, "luar-sisi-terapan");
    sama([0, 1, 2].map((i) => nilaiId(akhirAdegan(a, i), "rs")), ["0", "8", "14"], "jumlah berjalan Side Sum");
    sama(nilaiId(L.keadaanStory(a, 1, 4), "rs"), "3", "jumlah setelah sisi pertama");
    const t = akhirAdegan(a, 2);
    sama([nilaiId(t, "t2"), nilaiId(t, "t3")], ["3 + 5 = 8", "8 + 6 = 14"], "dua langkah penjumlahan");
    sama(labelSisi(akhirAdegan(a, 0), "ta"), ["6 cm", "3 cm", "5 cm"], "label segitiga pertama (alas, kanan, kiri)");
    const t4 = akhirAdegan(a, 3);
    sama([nilaiId(t4, "u1"), nilaiId(t4, "u2"), nilaiId(t4, "u3")], ["7 + 4 = 11", "11 + 5 = 16", "keliling = 16 cm"], "segitiga kedua");
    sama(labelSisi(t4, "tb"), ["7 cm", "4 cm", "5 cm"], "label segitiga kedua");
    const t5 = akhirAdegan(a, 4);
    for (const r of [1, 2]) sama(jml(sisiTabel(sel(t5, "hb", r, 0))), Number(sel(t5, "hb", r, 1).split(" ")[0]), `tabel Side Sum baris ${r} dijumlahkan ulang`);
    sama([1, 2].map((r) => sel(t5, "hb", r, 0)), ["3, 5, 6", "7, 4, 5"], "sisi di tabel sesuai buku");
  }
  // Equilateral Shortcut: contoh salah pakai 3 x 3 = 9 padahal 14.
  {
    const a = adegan(U, "luar-pintas");
    const t = akhirAdegan(a, 3);
    sama(nilaiId(t, "z1"), "3 × 3 = 9", "contoh salah pakai pintasan");
    sama(nilaiId(t, "z3"), "3 + 5 + 6 = 14", "hitungan benar segitiga sembarang");
    cek(3 * 3 !== 14, "pintasan salah memang menghasilkan jawaban berbeda");
    sama(sisiPiksel(jalurDari(t, "z")).map((x) => Math.round(x / 14)), [6, 3, 5], "segitiga contoh salah pakai berukuran 6, 3, 5 (skala 14)");
    const t2 = akhirAdegan(a, 2);
    sama([0, 1, 2].filter((q) => objId(t2, `y1-m${q}`)).length + [0, 1, 2].filter((q) => objId(t2, `y2-m${q}`)).length, 3, "pintasan hanya untuk segitiga bertanda tiga sisi sama");
    sama(nilaiId(akhirAdegan(a, 1), "q3"), "5 + 5 + 5 = 3 × 5", "alasan pintasan");
  }
  {
    const a = adegan(U, "luar-pintas-terapan");
    sama([0, 1].map((i) => [nilaiId(akhirAdegan(a, i), "eq"), nilaiId(akhirAdegan(a, i), "kl")]), [["3 × 5 = 15", "keliling = 15 cm"], ["3 × 6 = 18", "keliling = 18 cm"]], "pintasan pada sisi 5 dan 6");
    sama(labelSisi(akhirAdegan(a, 0), "tg"), ["5 cm", "5 cm", "5 cm"], "label pintasan sisi 5");
    sama(labelSisi(akhirAdegan(a, 1), "th"), ["6 cm", "6 cm", "6 cm"], "label pintasan sisi 6");
    const t = akhirAdegan(a, 3);
    sama([nilaiId(t, "eq"), nilaiId(t, "bd"), nilaiId(t, "kl")], ["2 × 6 + 4 = 16", jumlahTeks(BUKU.samaKaki), "keliling = 16 cm"], "pintasan sama kaki dan pembanding");
    sama(labelSisi(t, "tk"), ["4 cm", "6 cm", "6 cm"], "label sama kaki pada pintasan");
  }
  // Measure Then Sum: garis sisi dibaca dari penggaris: skala 18 piksel per cm.
  {
    const a = adegan(U, "luar-ukur-terapan");
    sama(objId(akhirAdegan(a, 0), "sg").x2 / 18, 6, "sisi pertama terbaca 6 pada penggaris");
    sama(objId(L.keadaanStory(a, 1, 3), "sg").x2 / 18, 5, "sisi kedua terbaca 5");
    sama(objId(akhirAdegan(a, 1), "sg").x2 / 18, 3, "sisi ketiga terbaca 3");
    const t = akhirAdegan(a, 1);
    sama([1, 2, 3].map((r) => sel(t, "tb", r, 1)), ["6", "5", "3"], "tabel hasil ukur");
    sama(nilaiId(akhirAdegan(a, 2), "sm"), `${[6, 5, 3].join(" + ")} = ${jml([6, 5, 3])}`, "jumlah hasil ukur");
    sama(jml([6, 5, 3]), BUKU.sembarang1.keliling, "hasil ukur dijumlahkan sama dengan kunci buku");
    sama([6, 5, 3].sort((m, n) => m - n), [...BUKU.sembarang1.sisi].sort((m, n) => m - n), "hasil ukur adalah sisi 3, 5, 6 menurut kunci");
    // Ujung kanan sisi bertepatan dengan angka yang ditulis di bawah penggaris.
    const n0 = objId(akhirAdegan(a, 0), "n0");
    hampir(objId(akhirAdegan(a, 0), "nu").x - n0.x, 6 * 18, 0.5, "label ujung kanan tepat pada 6 cm");
    hampir(objId(akhirAdegan(a, 1), "nu").x - n0.x, 3 * 18, 0.5, "label ujung kanan tepat pada 3 cm");
  }
  // String Unrolling: pita benang berjumlah panjang segitiga.
  {
    const a = adegan(U, "luar-benang-terapan");
    const lebarPita = (t, awalan) => t.filter((o) => o.t === "kotak" && awalan.some((p) => o.id.startsWith(`${p}-`))).reduce((n, o) => n + (o.w ?? 0), 0);
    const kunci = [BUKU.sembarang1, BUKU.samaSisi5, BUKU.samaKaki];
    sama([0, 1, 2].map((i) => lebarPita(akhirAdegan(a, i), ["pb", "pc", "pd"]) / 12), kunci.map((b) => b.keliling), "panjang benang lurus segitiga 1, 2, 3");
    for (const i of [0, 1, 2]) {
      stat.pita += 1;
      const t = akhirAdegan(a, i);
      const ks = ["pb", "pc", "pd"].map((p) => t.find((o) => o.id === `${p}-0`));
      cek(Math.abs(ks[0].x + ks[0].w - ks[1].x) < 0.01 && Math.abs(ks[1].x + ks[1].w - ks[2].x) < 0.01, `benang segitiga ${i + 1}: potongan menyambung rapat`);
      sama(ks.map((o) => o.w / 12), kunci[i].sisi, `potongan benang segitiga ${i + 1} sama dengan sisinya`);
      sama(["pl0", "pl1", "pl2"].map((id) => Number(nilaiId(t, id))), kunci[i].sisi, `angka potongan benang segitiga ${i + 1}`);
      sama(nilaiId(t, "pt"), `panjang lurus = ${kunci[i].keliling} cm`, `total benang segitiga ${i + 1}`);
    }
    const t4 = akhirAdegan(a, 3);
    sama(["x", "y", "z"].map((p) => lebarPita(t4, [p]) / 10), [14, 15, 16], "tiga benang dibandingkan");
    sama(["tx", "ty", "tz"].map((id) => nilaiId(t4, id)), ["14 cm", "15 cm", "16 cm"], "angka tiga benang");
  }
  // Ringkasan: tabel sesuai kunci.
  {
    const t = akhirAdegan(adegan(U, "luar-ringkas"), 2);
    const baris = [1, 2, 3, 4, 5].map((r) => [sel(t, "ct", r, 0), sisiTabel(sel(t, "ct", r, 1)), Number(sel(t, "ct", r, 2).split(" ")[0])]);
    for (const [jenis, sisi, k] of baris) sama(kelilingJenis(jenis, sisi), k, `ringkasan: keliling ${jenis} ${sisi.join(", ")}`);
    sama(baris.map((b) => b[2]), [14, 16, 15, 18, 16], "ringkasan sama dengan kunci buku");
  }
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
  // Buku Siswa hlm. 115-117 = PDF 131-133, Refleksi hlm. 129 = PDF 145; Panduan Guru hlm. 116 = PDF 128, hlm. 128-138 = PDF 140-150.
  const bagian = existsSync(bs) && existsSync(bg) ? [ambil(bs, 131, 133), ambil(bs, 145, 145), ambil(bg, 128, 128), ambil(bg, 140, 150)] : [null];
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
    cek(n >= 60, `jumlah kutipan buku yang diperiksa (${n})`);
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k5b4b-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|k5b4b-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k5b4b sendiri (${impor.join(", ")})`);
  }
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k5b4b.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_B54|video-k4b2-umum|naskah-k5b4/.test(pembungkus) && /VIDEO_MATERI_K5B4B/.test(pembungkus) && /VIDEO_LUAR_K5B4B/.test(pembungkus) && /export function VideoK5B4B/.test(pembungkus) && /DaftarVideoCerita/.test(pembungkus) && /keVideoSiap/.test(pembungkus), "video-k5b4b: memakai dua video baru, bukan naskah lama");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${((n * 0.5) / 60).toFixed(1)} menit suara)`);
}
console.log(`Pemeriksaan: ${stat.segitiga} segitiga, ${stat.label} label sisi, ${stat.tanda} tanda sisi sama, ${stat.pita} pita benang, ${stat.teksPasang} pasangan teks`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
