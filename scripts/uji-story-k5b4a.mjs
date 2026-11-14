// Uji Story Kelas 5 Bab 4 Sub-Bab A (apakah keliling bangun datar itu, termasuk pembuka bab): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, sinkron angka suara dan gambar, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas,
// teks bertumpuk, pemisahan materi dan metode luar, tidak membocorkan materi subbab berikutnya, kutipan buku (bila PDF ada),
// hitungan mandiri (lapangan 100 m kali 50 m, panjang ruas rute lari Nisa, Lukas, Yohana, dan Asep, keliling 300 m,
// dua bangun hlm. 114 dengan keliling 16 dan 19, luas 5000 dan keliling 300 lapangan), emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k5b4a.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { spawnSync } from "node:child_process";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k5b4a-video.ts");
const G = await import("../src/components/modul/story/k5b4a-gambar.ts");

const stat = { rute: 0, bangun: 0, teksPasang: 0, persamaan: 0 };
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
// Buku Siswa hlm. 109 sampai 113: lapangan sepak bola 100 m kali 50 m, rute berlari 300 m. Hlm. 113: keliling = 100 + 50 + 100 + 50 = 300 m.
const PANJANG = 100;
const LEBAR = 50;
const KELILING_LAPANGAN = 2 * (PANJANG + LEBAR);
// Buku Siswa hlm. 114: bangun pertama bersisi 4, 4, 4, 4 (keliling 16 cm); bangun kedua bersisi 4 (atas), 5, 5, 5 (kunci Panduan Guru hlm. 127: 5 + 4 + 5 + 5 = 19 cm).
const SISI_PERTAMA = [4, 4, 4, 4];
const SISI_KEDUA = [4, 5, 5, 5];
const jml = (a) => a.reduce((t, x) => t + x, 0);
sama(KELILING_LAPANGAN, 300, "keliling lapangan 300 m");
sama(jml(SISI_PERTAMA), 16, "keliling bangun pertama 16 cm");
sama(jml(SISI_KEDUA), 19, "keliling bangun kedua 19 cm");

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
const titikTerbuka = (d) => {
  const n = bilangan(d);
  const out = [];
  for (let i = 0; i + 1 < n.length; i += 2) out.push([n[i], n[i + 1]]);
  return out;
};
const sisiPoligon = (p) => p.map((a, i) => Math.hypot(p[(i + 1) % p.length][0] - a[0], p[(i + 1) % p.length][1] - a[1]));
/** Sisi poligon dalam satuan u, dibulatkan ke 0,05 terdekat (titik gambar dibulatkan satu desimal). */
const sisiSatuan = (p, u) => sisiPoligon(p).map((x) => Math.round((x / u) * 20) / 20);
const jalurDari = (objs, id) => titikJalur(objs.find((o) => o.id === id));
/** Ruas lurus penuh pada rute: panjang tiap ruas yang di atas 20 piksel, dihitung mandiri dari data jalur. */
const ruasMandiri = (d) => {
  const t = titikTerbuka(d);
  const out = [];
  for (let i = 1; i < t.length; i += 1) {
    const p = Math.hypot(t[i][0] - t[i - 1][0], t[i][1] - t[i - 1][1]);
    if (p >= 20) out.push(p);
  }
  return out;
};
const ke_meter = (px, skalaPiksel) => Math.round((px / skalaPiksel) * 100) / 100;

// Lapangan digambar 180 kali 90 piksel: 1,8 piksel per meter dengan perbandingan 2 banding 1 seperti 100 m kali 50 m.
hampir(G.LAP.pw / G.LAP.ph, PANJANG / LEBAR, 1e-9, "perbandingan lapangan 2 banding 1");
hampir(G.LAP.pw / G.LAP.skala, PANJANG, 1e-9, "lebar lapangan 100 m");
hampir(G.LAP.ph / G.LAP.skala, LEBAR, 1e-9, "tinggi lapangan 50 m");
{
  const s = G.LAP.skala;
  // Panjang ruas rute (meter) menurut data jalur: Nisa 100 tiga kali, Lukas 50 enam kali, Yohana 50 enam kali, Asep 100, 50, 100, 50.
  sama(ruasMandiri(G.RUTE.nisa).map((p) => ke_meter(p, s)), [100, 100, 100], "ruas rute Nisa (m)");
  sama(ruasMandiri(G.RUTE.lukas).map((p) => ke_meter(p, s)), [50, 50, 50, 50, 50, 50], "ruas rute Lukas (m)");
  sama(ruasMandiri(G.RUTE.yohana).map((p) => ke_meter(p, s)), [50, 50, 50, 50, 50, 50], "ruas rute Yohana (m)");
  sama(ruasMandiri(G.RUTE.asep).map((p) => ke_meter(p, s)), [100, 50, 100, 50], "ruas rute Asep (m)");
  for (const nama of ["nisa", "lukas", "yohana", "asep"]) {
    sama(jml(ruasMandiri(G.RUTE[nama]).map((p) => ke_meter(p, s))), 300, `rute ${nama} menempuh 300 m`);
    sama(G.ruasRute(G.RUTE[nama]), ruasMandiri(G.RUTE[nama]), `fungsi ruasRute sama dengan hitungan mandiri (${nama})`);
    cek(titikTerbuka(G.RUTE[nama]).every(([x, y]) => x >= 0 && x <= G.LAP.pw && y >= 0 && y <= G.LAP.ph), `rute ${nama} di dalam lapangan`);
    stat.rute += 1;
  }
  // Asep kembali ke titik awal, Nisa dan Yohana tidak. Asep menyusuri tepian tepat satu kali tiap sisi.
  const ujung = (d) => [titikTerbuka(d)[0], titikTerbuka(d).at(-1)];
  sama(ujung(G.RUTE.asep)[0], ujung(G.RUTE.asep)[1], "rute Asep berhenti di titik awal");
  cek(JSON.stringify(ujung(G.RUTE.nisa)[0]) !== JSON.stringify(ujung(G.RUTE.nisa)[1]), "rute Nisa tidak berhenti di titik awal");
  cek(JSON.stringify(ujung(G.RUTE.yohana)[0]) !== JSON.stringify(ujung(G.RUTE.yohana)[1]), "rute Yohana tidak berhenti di titik awal");
  const t = titikTerbuka(G.RUTE.asep);
  sama(t.slice(1).map((p, i) => [Math.sign(p[0] - t[i][0]), Math.sign(p[1] - t[i][1])]), [[1, 0], [0, -1], [-1, 0], [0, 1]], "Asep menyusuri empat sisi berurutan, satu kali tiap sisi");
  // Rute Yohana: satu ruas mendatar ke garis tengah (setengah panjang), lima ruas tegak di garis tengah.
  const y = titikTerbuka(G.RUTE.yohana);
  hampir(y[1][0], G.LAP.pw / 2, 1e-9, "ruas pertama Yohana berakhir di garis tengah");
  cek(y.slice(2).every((p) => p[0] >= G.LAP.pw / 2 && p[0] <= G.LAP.pw / 2 + 20), "ruas Yohana berikutnya di sekitar garis tengah");
  // Nisa hanya di sisi 100 m bawah, Lukas hanya di sisi 50 m kiri.
  cek(titikTerbuka(G.RUTE.nisa).every(([, yy]) => yy >= 70), "rute Nisa menyusuri satu sisi panjang");
  cek(titikTerbuka(G.RUTE.lukas).every(([xx]) => xx <= 40), "rute Lukas menyusuri satu sisi pendek");
}
// Dua bangun hlm. 114 digambar: sisi dari titik gambar dihitung ulang.
for (const u of [12, 14]) {
  const a = G.titikBangunSama(u);
  const sa = sisiPoligon(a).map((p) => Math.round((p / u) * 1000) / 1000);
  sama(sa, SISI_PERTAMA, `bangun pertama (u=${u}): empat sisi sama panjang 4`);
  const b = G.titikBangunDua(u);
  const sb = sisiPoligon(b).map((p) => Math.round((p / u) * 1000) / 1000);
  sama(sb, SISI_KEDUA, `bangun kedua (u=${u}): sisi 4, 5, 5, 5 berurutan dari atas`);
  cek(Math.abs(b[0][1] - b[1][1]) < 1e-9 && Math.abs(b[2][1] - b[3][1]) < 1e-9 && b[2][1] > b[0][1], `bangun kedua (u=${u}): sisi atas dan bawah mendatar`);
  stat.bangun += 2;
}
sama(G.SISI_BANGUN_SAMA, SISI_PERTAMA, "konstanta sisi bangun pertama sama dengan buku");
sama(G.SISI_BANGUN_DUA, SISI_KEDUA, "konstanta sisi bangun kedua sama dengan buku");

/* ------------------------------ Isi dua video ------------------------------ */
const VIDEO = [V.VIDEO_MATERI_K5B4A, V.VIDEO_LUAR_K5B4A];
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
        const teksAda = akhir.filter((o) => o.t === "teks" && (o.op ?? 1) > 0 && o.isi && !/^[\u{1F000}-\u{1FFFF}]|^[✂✅❌]$/u.test(o.isi));
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
const M = V.VIDEO_MATERI_K5B4A;
const U = V.VIDEO_LUAR_K5B4A;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const nilaiId = (objs, id) => objs.find((o) => o.id === id)?.isi;
{
  const teksVideo = (v) => JSON.stringify(seluruhTeks(v));
  const NAMA_METODE = /Path Length|Fencing Context|Perimeter vs Area|Closed Loop|metode luar|metode dari luar/i;
  const materi = teksVideo(M);
  const luar = teksVideo(U);
  cek(!NAMA_METODE.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of ["Path Length", "Fencing Context", "Perimeter vs Area", "Closed Loop Test"]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  cek(M.adegan.every((a) => /(Buku Siswa|Panduan Guru) hlm\./.test(a.sumber)), "video materi: tiap adegan mencatat halaman buku");
  cek(U.adegan.every((a) => /metode luar|Ringkasan/i.test(a.sumber)), "video metode luar: tiap adegan bersumber metode luar atau ringkasan");
  for (const kata of ["Bab 4", "Kata Kunci", "Peta Konsep", "Skema Pembelajaran", "Ayo Berpikir Kritis", "Benteng Baluwarti", "Etnomatematika", "Eksplorasi 4.1A", "Eksplorasi 4.1B", "Nisa", "Lukas", "Yohana", "Asep", "Pak Guru", "bolak-balik", "mengelilingi", "titik start", "penggaris", "jumlahan panjang sisi-sisi", "pagar", "bingkai"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-path", "luar-path-terapan", "luar-fencing", "luar-fencing-terapan", "luar-area", "luar-area-terapan", "luar-loop", "luar-loop-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk empat metode");
  cek(M.adegan.length === 11 && U.adegan.length === 10, "11 adegan materi dan 10 adegan metode luar");
  // Subbab A tidak membocorkan materi subbab berikutnya (nama bangun lain, rumus, bangun gabungan). Pembuka bab dan peta konsep boleh menyebut nama bangun sebagai daftar.
  const BOCOR = /segitiga|jajar ?genjang|trapesium|belah ketupat|layang|rumus|gabungan|dekomposisi|segi lima|segi enam|segi delapan|beraturan|persegi panjang|segi empat/i;
  const boleh = ["pembuka-bab", "peta-konsep"];
  const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
  for (const a of M.adegan.filter((x) => !boleh.includes(x.id))) cek(!BOCOR.test(teksAdegan(a)), `materi ${a.id} tidak membocorkan materi subbab berikutnya`);
  for (const a of U.adegan) cek(!BOCOR.test(teksAdegan(a)), `metode luar ${a.id} tidak membocorkan materi subbab berikutnya`);
  // Subbab A tidak memuat Refleksi (tidak ada di Buku Siswa untuk bab ini), Uji Kompetensi, pengayaan, remedial, dan penilaian milik subbab E.
  cek(!/Uji Kompetensi|pengayaan|remedial|Refleksi|miskonsepsi|Kunci Jawaban/i.test(materi + luar), "tidak memakai Uji Kompetensi, pengayaan, remedial, Refleksi, dan kunci milik subbab E");
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
          stat.persamaan += 1;
          cek(nilai.every((x) => Math.abs(x - nilai[0]) < 1e-9), `${v.id}/${a.id}#${i + 1}: persamaan "${o.isi}" benar (${nilai.join(" ; ")})`);
        }
      });
    }
  }
  cek(n >= 15, `jumlah persamaan yang diperiksa (${n})`);
}

/* ------------------------------ Hitungan isi, dihitung mandiri ------------------------------ */
const angkaKiri = (isi) => (isi.split("=")[0].match(/\d+/g) ?? []).map(Number);
{
  // Pembuka: tujuan 4.1 dan 4.2.
  // Peta konsep: isi cabang, sembilan kata kunci (Buku Siswa hlm. 106), skema 2, 4, 4, 2, 4 JP (Panduan Guru hlm. 116).
  {
    const a = adegan(M, "peta-konsep");
    const t2 = akhirAdegan(a, 1);
    sama([3, 7, 3].map((n, c) => [...Array(n).keys()].filter((i) => nilaiId(t2, `l${c + 1}-${i}`)).length), [3, 7, 3], "jumlah isi tiga cabang peta konsep");
    sama([...Array(9).keys()].map((i) => nilaiId(akhirAdegan(a, 2), `ch${i}-t0`)), ["bangun datar", "bangun gabungan", "belah ketupat", "jajargenjang", "layang-layang", "persegi", "persegi panjang", "trapesium", "keliling"], "sembilan kata kunci bab 4");
    sama([0, 1, 2, 3, 4].map((i) => nilaiId(akhirAdegan(a, 4), `sk${i}-t1`)), ["2 JP", "4 JP", "4 JP", "2 JP", "4 JP"], "waktu lima subbab (Panduan Guru hlm. 116)");
    sama(["sa", "sb", "sc", "sd", "se"].map((p) => nilaiId(akhirAdegan(a, 3), `${p}-t0`)?.[0]), ["A", "B", "C", "D", "E"], "lima subbab A sampai E");
  }
  // Eksplorasi 4.1A: 300 m, lapangan 100 m kali 50 m (hlm. 109 sampai 111).
  {
    const t = akhirAdegan(adegan(M, "eks-41a-soal"), 2);
    sama([nilaiId(t, "lp-dp"), nilaiId(t, "lp-dl")], [`${PANJANG} m`, `${LEBAR} m`], "ukuran lapangan pada gambar soal");
    const lp = t.find((o) => o.id === "lp-lp");
    hampir(lp.w / lp.h, PANJANG / LEBAR, 1e-9, "lapangan soal berperbandingan 2 banding 1");
    sama(nilaiId(akhirAdegan(adegan(M, "eks-41a-soal"), 0), "t3-t0"), "berlari sejauh 300 m", "jarak yang diminta Pak Guru");
    sama([0, 1, 2, 3].map((i) => nilaiId(akhirAdegan(adegan(M, "eks-41a-soal"), 3), `gk${i}-t0`)), ["Kelompok 1", "Kelompok 2", "Kelompok 3", "Kelompok 4"], "empat kelompok (Panduan Guru hlm. 121)");
  }
  // Rute Nisa, Lukas, Yohana, Asep: persamaan di gambar sama dengan panjang ruas rute yang digambar.
  {
    const a = adegan(M, "rute-nisa-lukas");
    const t = akhirAdegan(a, 0);
    sama(angkaKiri(nilaiId(t, "ne")), ruasMandiri(G.RUTE.nisa).map((p) => ke_meter(p, G.LAP.skala)), "persamaan Nisa = ruas rute Nisa");
    sama(jalurTerbuka(t, "nr"), G.RUTE.nisa, "garis rute Nisa memakai data rute");
    const t3 = akhirAdegan(a, 2);
    sama(angkaKiri(nilaiId(t3, "le")), ruasMandiri(G.RUTE.lukas).map((p) => ke_meter(p, G.LAP.skala)), "persamaan Lukas = ruas rute Lukas");
    sama(jalurTerbuka(t3, "lr"), G.RUTE.lukas, "garis rute Lukas memakai data rute");
    sama(nilaiId(akhirAdegan(a, 3), "n6"), "6 kali", "Lukas bolak-balik 6 kali");
    sama(ruasMandiri(G.RUTE.lukas).length, 6, "rute Lukas 6 ruas");
    const b = adegan(M, "rute-yohana-asep");
    sama(angkaKiri(nilaiId(akhirAdegan(b, 0), "ye")), ruasMandiri(G.RUTE.yohana).map((p) => ke_meter(p, G.LAP.skala)), "persamaan Yohana = ruas rute Yohana");
    sama(angkaKiri(nilaiId(akhirAdegan(b, 2), "ae")), ruasMandiri(G.RUTE.asep).map((p) => ke_meter(p, G.LAP.skala)), "persamaan Asep = ruas rute Asep");
    sama(jalurTerbuka(akhirAdegan(b, 0), "yr"), G.RUTE.yohana, "garis rute Yohana memakai data rute");
    sama(jalurTerbuka(akhirAdegan(b, 2), "ar"), G.RUTE.asep, "garis rute Asep memakai data rute");
    stat.rute += 4;
  }
  // Tabel pilihan rute: hanya Asep yang mengelilingi.
  {
    const t = akhirAdegan(adegan(M, "pilih-keliling"), 1);
    sama([1, 2, 3, 4].map((r) => [nilaiId(t, `rt${r}-t0${0}`), nilaiId(t, `rt${r}-t0${2}`)]), [["Nisa", "tidak"], ["Lukas", "tidak"], ["Yohana", "tidak"], ["Asep", "ya"]], "tabel rute: hanya Asep mengelilingi");
    const t4 = akhirAdegan(adegan(M, "pilih-keliling"), 3);
    sama(["m1", "m2", "m3", "m4"].map((id) => nilaiId(t4, id)), ["1 kali", "1 kali", "1 kali", "1 kali"], "tiap sisi lapangan dilalui 1 kali");
  }
  // Eksplorasi 4.1B: penjumlahan bertahap 100, 100 + 50, ..., 300 sama dengan jumlah sisi lapangan (hlm. 113).
  {
    const a = adegan(M, "eks-41b");
    const t = akhirAdegan(a, 2);
    sama(nilaiId(t, "ke"), "100 + 50 + 100 + 50 = 300", "jumlah sisi lapangan hlm. 113");
    sama(angkaKiri(nilaiId(t, "ke")), [PANJANG, LEBAR, PANJANG, LEBAR], "sisi lapangan 100, 50, 100, 50");
    sama(nilaiId(t, "kh"), "keliling lapangan = 300 m", "keliling lapangan");
    const t0 = akhirAdegan(a, 0);
    sama(["lt", "lb", "ll", "lr"].map((id) => nilaiId(t0, id)), ["100 m", "100 m", "50 m", "50 m"], "empat label sisi lapangan");
  }
  // Mengukur dengan penggaris: dua bangun hlm. 114.
  {
    const a = adegan(M, "ukur-penggaris");
    const t0 = akhirAdegan(a, 0);
    const pb = jalurDari(t0, "bs");
    const pd = jalurDari(t0, "bd");
    sama(sisiSatuan(pb, 12), SISI_PERTAMA, "bangun pertama pada gambar: sisi 4, 4, 4, 4");
    sama(sisiSatuan(pd, 12), SISI_KEDUA, "bangun kedua pada gambar: sisi 4, 5, 5, 5");
    const t1 = akhirAdegan(a, 1);
    sama(["s1", "s2", "s3", "s4"].map((id) => nilaiId(t1, id)), ["4 cm", "4 cm", "4 cm", "4 cm"], "label empat sisi bangun pertama");
    sama([nilaiId(t1, "se"), nilaiId(t1, "sh")], ["4 + 4 + 4 + 4 = 16", "keliling 16 cm"], "keliling bangun pertama 16 cm (kunci Buku Siswa hlm. 114)");
    const t2 = akhirAdegan(a, 2);
    const p2 = jalurDari(t2, "b2");
    sama(sisiSatuan(p2, 14), SISI_KEDUA, "bangun kedua diperbesar: sisi 4, 5, 5, 5");
    sama(["t1", "t2", "t3", "t4"].map((id) => nilaiId(t2, id)), ["4 cm", "5 cm", "5 cm", "5 cm"], "label empat sisi bangun kedua");
    sama(nilaiId(t2, "kb-t0"), "Keliling = … + … + … + … = …", "bagian kosong Buku Siswa hlm. 114");
    const t3 = akhirAdegan(a, 3);
    sama([nilaiId(t3, "te"), nilaiId(t3, "th")], ["5 + 4 + 5 + 5 = 19", "keliling 19 cm"], "keliling bangun kedua 19 cm (kunci Panduan Guru hlm. 127)");
    sama(angkaKiri(nilaiId(t3, "te")).sort(), [...SISI_KEDUA].sort(), "angka kunci memuat sisi 4, 5, 5, 5");
  }
  // Ringkasan angka materi.
  {
    const t = akhirAdegan(adegan(M, "kesimpulan-keliling"), 3);
    const baris = [1, 2, 3].map((r) => [nilaiId(t, `rg${r}-t00`), nilaiId(t, `rg${r}-t01`), nilaiId(t, `rg${r}-t02`)]);
    sama(baris, [["Lapangan", "100, 50, 100, 50", "300 m"], ["Bangun pertama", "4, 4, 4, 4", "16 cm"], ["Bangun kedua", "4, 5, 5, 5", "19 cm"]], "tabel ringkasan materi");
    for (const b of baris) sama(jml(b[1].split(",").map(Number)), Number(b[2].split(" ")[0]), `jumlah sisi = keliling (${b[0]})`);
  }
  // Metode luar: Path Length pada lapangan.
  {
    const a = adegan(U, "luar-path-terapan");
    sama([0, 1, 2, 3].map((i) => nilaiId(akhirAdegan(a, i), "ct")), ["jalur: 0 m", "100", "150 + 100 = 250", "250 + 50 = 300"], "hitungan jalur berjalan");
    const t = akhirAdegan(a, 3);
    const s = ["s1", "s2", "s3", "s4"].map((id) => t.find((o) => o.id === id));
    sama(s.map((o) => Math.round(Math.hypot(o.x2, o.y2) / G.LAP.skala)), [100, 50, 100, 50], "empat sisi yang ditelusuri dalam meter");
    sama(jml(s.map((o) => Math.round(Math.hypot(o.x2, o.y2) / G.LAP.skala))), 300, "jalur satu putaran 300 m");
    // Ujung sisi sebelumnya bertemu pangkal sisi berikutnya dan kembali ke awal.
    for (let i = 0; i < 4; i += 1) {
      const j = (i + 1) % 4;
      sama([s[i].x + s[i].x2, s[i].y + s[i].y2], [s[j].x, s[j].y], `sisi ${i + 1} bersambung ke sisi ${j + 1}`);
    }
    sama(nilaiId(t, "kh"), "keliling lapangan = 300 m", "keliling lapangan di Path Length");
  }
  // Fencing Context: bingkai dan pagar.
  {
    const a = adegan(U, "luar-fencing-terapan");
    const t1 = akhirAdegan(a, 0);
    sama(sisiSatuan(jalurDari(t1, "bs"), 12), SISI_PERTAMA, "bingkai pertama: sisi 4, 4, 4, 4");
    sama([nilaiId(t1, "se"), nilaiId(t1, "sh")], ["4 + 4 + 4 + 4 = 16", "kayu 16 cm"], "kayu bingkai pertama 16 cm");
    const t2 = akhirAdegan(a, 1);
    sama(sisiSatuan(jalurDari(t2, "bd"), 12), SISI_KEDUA, "bingkai kedua: sisi 4, 5, 5, 5");
    sama([nilaiId(t2, "te"), nilaiId(t2, "th")], ["5 + 4 + 5 + 5 = 19", "kayu 19 cm"], "kayu bingkai kedua 19 cm");
    const t3 = akhirAdegan(a, 2);
    sama(nilaiId(t3, "pe"), "100 + 50 + 100 + 50 = 300", "panjang pagar lapangan");
    const t4 = akhirAdegan(a, 3);
    sama([1, 2, 3].map((r) => `fk${r}`).map((id) => [nilaiId(t4, `${id}-t00`), nilaiId(t4, `${id}-t01`), nilaiId(t4, `${id}-t02`)]), [["Bingkai pertama", "16", "cm"], ["Bingkai kedua", "19", "cm"], ["Pagar lapangan", "300", "m"]], "tabel bahan yang dibeli");
  }
  // Perimeter vs Area: lapangan, keliling 300 m dan luas 5000 m2 (hitungan mandiri).
  {
    const a = adegan(U, "luar-area-terapan");
    sama(nilaiId(akhirAdegan(a, 0), "ke"), "100 + 50 + 100 + 50 = 300 m", "keliling lapangan di Perimeter vs Area");
    sama(angkaKiri(nilaiId(akhirAdegan(a, 0), "ke")), [PANJANG, LEBAR, PANJANG, LEBAR], "sisi lapangan di Perimeter vs Area");
    const t = akhirAdegan(a, 2);
    const m = nilaiId(t, "lk-t0").match(/^Luas: (\d+) × (\d+) = (\d+) m²$/);
    cek(m !== null && Number(m[1]) === PANJANG && Number(m[2]) === LEBAR && Number(m[3]) === PANJANG * LEBAR && PANJANG * LEBAR === 5000, "luas lapangan 100 × 50 = 5000 m²");
    sama(nilaiId(t, "kl-t0"), "Keliling: 100 + 50 + 100 + 50 = 300 m", "keliling pada kartu");
    sama([nilaiId(akhirAdegan(a, 3), "r1-t0"), nilaiId(akhirAdegan(a, 3), "r2-t0")], ["300 m", "5000 m²"], "dua angka tidak dijumlahkan");
    const u = akhirAdegan(adegan(U, "luar-area"), 1);
    sama([nilaiId(u, "u1-t2"), nilaiId(u, "u2-t2")], ["cm, m", "cm², m²"], "satuan keliling dan luas");
  }
  // Closed Loop Test: empat rute, hanya Asep yang memenuhi dua syarat.
  {
    const a = adegan(U, "luar-loop-terapan");
    const t = akhirAdegan(a, 3);
    const rute = { mn: G.RUTE.nisa, ml: G.RUTE.lukas, my: G.RUTE.yohana, ma: G.RUTE.asep };
    for (const [id, d] of Object.entries(rute)) {
      const o = t.find((x) => x.id === `${id}-r`);
      const lapOb = t.find((x) => x.id === `${id}-lp`);
      const skala = lapOb.w / G.LAP.pw;
      sama(ruasMandiri(o.d).map((p) => ke_meter(p, G.LAP.skala * skala)), ruasMandiri(d).map((p) => ke_meter(p, G.LAP.skala)), `rute mini ${id}: panjang ruas sama dengan rute asli`);
      sama(jml(ruasMandiri(o.d).map((p) => ke_meter(p, G.LAP.skala * skala))), 300, `rute mini ${id} menempuh 300 m`);
      hampir(lapOb.w / lapOb.h, 2, 1e-9, `lapangan mini ${id} berperbandingan 2 banding 1`);
    }
    sama([nilaiId(t, "mn-v2"), nilaiId(t, "ml-v2"), nilaiId(t, "my-v2")], ["Nisa: bukan keliling", "Lukas: bukan keliling", "Yohana: bukan keliling"], "tiga rute gagal uji");
    sama(nilaiId(t, "ma-v2"), "100 + 50 + 100 + 50 = 300", "rute Asep lulus uji dengan jumlah 300");
    sama(nilaiId(t, "hk"), "semua 300 m", "keempat rute sama-sama 300 m");
  }
  // Ringkasan: kunci.
  {
    const t = akhirAdegan(adegan(U, "luar-ringkas"), 2);
    sama([0, 1, 2].map((c) => nilaiId(t, `kn-t1${c}`)), ["300 m", "16 cm", "19 cm"], "kunci di ringkasan: 300 m, 16 cm, 19 cm");
  }
}
function jalurTerbuka(objs, id) {
  return objs.find((o) => o.id === id)?.d;
}

/* ------------------------------ Kutipan buku (bila PDF tersedia) ------------------------------ */
{
  const bs = new URL("../bahan-sd/Matematika-BS-KLS-V.pdf", import.meta.url);
  const bg = new URL("../bahan-sd/Matematika-BG-KLS-V.pdf", import.meta.url);
  const jalur = (u) => u.pathname.replace(/^\/([A-Za-z]:)/, "$1");
  const ambil = (berkas, dari, sampai) => {
    const r = spawnSync("pdftotext", ["-f", String(dari), "-l", String(sampai), "-raw", jalur(berkas), "-"], { encoding: "utf8", maxBuffer: 1 << 26 });
    return r.status === 0 ? r.stdout : null;
  };
  // Buku Siswa hlm. 105-114 = PDF 121-130; Panduan Guru hlm. 113-127 = PDF 125-139.
  const bagian = existsSync(bs) && existsSync(bg) ? [ambil(bs, 121, 130), ambil(bg, 125, 139)] : [null];
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
    // Buku Siswa bab ini tidak memuat Refleksi pada hlm. 105-114 (Refleksi tidak dikerjakan di Sub-Bab A).
    cek(!/refleksi/.test(bersih(bagian[0])), "Buku Siswa hlm. 105-114 tidak memuat Refleksi");
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k5b4a-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|k5b4a-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k5b4a sendiri (${impor.join(", ")})`);
  }
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k5b4a.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_A54|video-k4b2-umum|naskah-k5b4/.test(pembungkus) && /VIDEO_MATERI_K5B4A/.test(pembungkus) && /VIDEO_LUAR_K5B4A/.test(pembungkus) && /export function VideoK5B4A/.test(pembungkus) && /DaftarVideoCerita/.test(pembungkus) && /keVideoSiap/.test(pembungkus), "video-k5b4a: memakai dua video baru, bukan naskah lama");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${((n * 0.5) / 60).toFixed(1)} menit suara)`);
}
console.log(`Pemeriksaan: ${stat.rute} rute, ${stat.bangun} bangun, ${stat.persamaan} persamaan, ${stat.teksPasang} pasangan teks`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
