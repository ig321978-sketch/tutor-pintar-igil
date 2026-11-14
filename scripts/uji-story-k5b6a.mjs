// Uji Story Kelas 5 Bab 6 Sub-Bab A (sudut siku-siku, termasuk pembuka bab): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, sinkron angka suara dan gambar, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas,
// teks bertumpuk, pemisahan materi dan metode luar, tidak membocorkan materi subbab berikutnya, kutipan buku (bila PDF ada),
// hitungan mandiri (banyak sudut siku-siku enam bangun, tabel detektif, jumlah), geometri gambar (tanda siku-siku di titik sudut 90 derajat,
// patokan pas atau bercelah, juring putaran), emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k5b6a.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { spawnSync } from "node:child_process";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k5b6a-video.ts");
const G = await import("../src/components/modul/story/k5b6a-gambar.ts");
const M3 = await import("../src/components/modul/story/k5b6a-materi-3.ts");

const stat = { tanda: 0, patokan: 0, baji: 0, bangun: 0, teksPasang: 0 };
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
// Kunci Panduan Guru hlm. 256: banyak sudut siku-siku nomor 1 sampai 6 (Buku Siswa hlm. 169).
const KUNCI = [4, 2, 0, 0, 4, 2];
// Tabel 6.1 (Buku Siswa hlm. 165): persegi panjang, jajargenjang, segi lima punya 4, 4, 5 sudut.
const TABEL_61 = [4, 4, 5];
const jml = (a) => a.reduce((t, x) => t + x, 0);

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
const sudutDi = (t, i) => {
  const p = t[i];
  const u = t[(i + t.length - 1) % t.length];
  const w = t[(i + 1) % t.length];
  const a = [u[0] - p[0], u[1] - p[1]];
  const b = [w[0] - p[0], w[1] - p[1]];
  return (Math.acos((a[0] * b[0] + a[1] * b[1]) / (Math.hypot(...a) * Math.hypot(...b))) * 180) / Math.PI;
};
const sedekat = (p, q) => Math.abs(p[0] - q[0]) < 0.6 && Math.abs(p[1] - q[1]) < 0.6;
const hitungSikuT = (t) => t.reduce((c, _, i) => c + (Math.abs(sudutDi(t, i) - 90) < 0.5 ? 1 : 0), 0);
/** Semua bangun pada keadaan gambar: jalur tertutup dan kotak (sebagai empat titik). */
const bangunDi = (objs) => {
  const out = [];
  for (const o of objs) {
    if (o.t === "jalur") {
      const t = titikJalur(o);
      if (t) out.push({ id: o.id, t });
    } else if (o.t === "kotak") {
      const x = o.x ?? 0;
      const y = o.y ?? 0;
      out.push({ id: o.id, t: [[x, y], [x + o.w, y], [x + o.w, y + o.h], [x, y + o.h]] });
    }
  }
  return out;
};
/** Tanda siku-siku: jalur tiga titik tanpa Z. Mengembalikan vektor dua kaki. */
const tandaDari = (o) => {
  if (o.t !== "jalur" || !/^M-?\d+(\.\d+)? -?\d+(\.\d+)? L-?\d+(\.\d+)? -?\d+(\.\d+)? L-?\d+(\.\d+)? -?\d+(\.\d+)?$/.test(o.d ?? "")) return null;
  const n = bilangan(o.d);
  return n.length === 6 ? { a: [n[0], n[1]], tengah: [n[2], n[3]], b: [n[4], n[5]] } : null;
};
/** Juring: M0 0 L x y A r r 0 besar 1 x y Z. Mengembalikan besar sudut juring. */
const juringDari = (o) => {
  if (o.t !== "jalur" || !/^M0 0 L-?\d+(\.\d+)? -?\d+(\.\d+)? A\d+ \d+ 0 [01] 1 -?\d+(\.\d+)? -?\d+(\.\d+)? Z$/.test(o.d ?? "")) return null;
  const n = bilangan(o.d);
  const a1 = (Math.atan2(n[3], n[2]) * 180) / Math.PI;
  const a2 = (Math.atan2(n[10], n[9]) * 180) / Math.PI;
  return (((a2 - a1) % 360) + 360) % 360;
};

// Bangun Ayo Berlatih dari data gambar sendiri: banyak sudut siku-siku sesuai kunci buku.
sama(G.BANGUN_LATIHAN.map(hitungSikuT), KUNCI, "banyak sudut siku-siku enam bangun Ayo Berlatih (kunci Panduan Guru hlm. 256)");
sama(M3.KUNCI_SIKU, KUNCI, "kunci di berkas materi sama dengan kunci buku");
sama(G.BANGUN_LATIHAN.map((p) => p.length), [4, 6, 4, 3, 4, 4], "banyak titik sudut enam bangun");
// Penanda siku-siku buatan fungsi: tepat 90 derajat pada semua bangun.
{
  const t = [[0, 0], [60, 0], [60, 38], [0, 38]];
  for (let i = 0; i < 4; i += 1) hampir(G.sudutDalam(t, i), 90, 0.001, `persegi panjang sudut ${i}`);
  // jajargenjang dan segi lima Tabel 6.1
  const jj = [[-20, -12], [32, -12], [20, 12], [-32, 12]];
  cek(hitungSikuT(jj) === 0, "jajargenjang tidak punya sudut siku-siku");
  const lima = Array.from({ length: 5 }, (_, i) => [15 * Math.sin((2 * Math.PI * i) / 5), -15 * Math.cos((2 * Math.PI * i) / 5)]);
  hampir(jml(lima.map((_, i) => sudutDi(lima, i))), 540, 0.01, "jumlah sudut segi lima 540");
}
// Sudut belah ketupat nomor 3: dua sudut sama, jumlah dua sudut berurutan 180.
const SUDUT_RUNCING = G.sudutDalam(G.BANGUN_LATIHAN[2], 0);
const SUDUT_LEBAR = G.sudutDalam(G.BANGUN_LATIHAN[2], 1);
hampir(SUDUT_RUNCING + SUDUT_LEBAR, 180, 0.01, "dua sudut belah ketupat berurutan berjumlah 180");
cek(SUDUT_RUNCING < 90 && SUDUT_LEBAR > 90 && 4 * SUDUT_RUNCING < 360 && 4 * SUDUT_LEBAR > 360, "empat salinan sudut runcing menyisakan celah, empat salinan sudut lebar bertumpuk");

/* ------------------------------ Isi dua video ------------------------------ */
const VIDEO = [V.VIDEO_MATERI_K5B6A, V.VIDEO_LUAR_K5B6A];
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
          const j = juringDari(o);
          if (j !== null) {
            const r = bilangan(o.d)[4];
            cek(x - r > -2 && x + r < 302 && y - r > -2 && y + r < 204, `${nama}#${i + 1}: juring ${o.id} masuk kanvas`);
          }
        } else if (o.t === "garis" || o.t === "panah") cek(x > -2 && x < 302 && y > -2 && y < 204 && x + (o.x2 ?? 0) > -2 && x + (o.x2 ?? 0) < 302 && y + (o.y2 ?? 0) > -2 && y + (o.y2 ?? 0) < 204, `${nama}#${i + 1}: garis ${o.id} masuk kanvas`);
      }
      // teks tidak boleh bertumpuk
      {
        const teksAda = akhir.filter((o) => o.t === "teks" && (o.op ?? 1) > 0 && o.isi && !/^[\u{1F000}-\u{1FFFF}]|^[✂]$/u.test(o.isi));
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
      // geometri: tanda siku-siku di titik sudut 90 derajat, patokan pas atau bercelah, juring putaran
      {
        const bangun = bangunDi(akhir);
        for (const o of akhir) {
          const tanda = tandaDari(o);
          if (tanda) {
            stat.tanda += 1;
            const pusat = [o.x ?? 0, o.y ?? 0];
            hampir(tanda.a[0] * tanda.b[0] + tanda.a[1] * tanda.b[1], 0, 0.3, `${nama}#${i + 1}: kaki tanda ${o.id} saling tegak lurus`);
            hampir(Math.hypot(...tanda.a), Math.hypot(...tanda.b), 0.3, `${nama}#${i + 1}: kaki tanda ${o.id} sama panjang`);
            const cocok = bangun.filter((b) => b.id !== o.id).flatMap((b) => b.t.map((p, idx) => ({ b, idx, p }))).filter((e) => sedekat(e.p, pusat));
            cek(cocok.some((e) => Math.abs(sudutDi(e.b.t, e.idx) - 90) < 0.5), `${nama}#${i + 1}: tanda siku-siku ${o.id} berada di titik sudut 90 derajat sebuah bangun`);
          }
          // patokan: jalur tiga titik berid pkP (pas) atau pkG (bercelah)
          const m = /^pk([PG])\d+$/.exec(o.id);
          if (m) {
            const t = titikJalur(o);
            cek(t && t.length === 3, `${nama}#${i + 1}: patokan ${o.id} berupa segitiga`);
            if (t) {
              hampir(sudutDi(t, 0), 90, 0.5, `${nama}#${i + 1}: patokan ${o.id} siku-siku di titik pertama`);
              const lain = bangun.filter((b) => b.id !== o.id && !/^pk/.test(b.id)).flatMap((b) => b.t.map((p, idx) => ({ b, idx, p }))).filter((e) => sedekat(e.p, t[0]));
              if (lain.length > 0) {
                stat.patokan += 1;
                const e = lain[0];
                const sisi = (p, q) => {
                  const d = Math.hypot(q[0] - p[0], q[1] - p[1]);
                  return [(q[0] - p[0]) / d, (q[1] - p[1]) / d];
                };
                const dua = [sisi(t[0], t[1]), sisi(t[0], t[2])];
                const tepi = [sisi(e.b.t[e.idx], e.b.t[(e.idx + 1) % e.b.t.length]), sisi(e.b.t[e.idx], e.b.t[(e.idx + e.b.t.length - 1) % e.b.t.length])];
                const berimpit = (u) => tepi.some((w) => Math.abs(u[0] - w[0]) < 0.03 && Math.abs(u[1] - w[1]) < 0.03);
                if (m[1] === "P") {
                  cek(Math.abs(sudutDi(e.b.t, e.idx) - 90) < 0.5 && dua.every(berimpit), `${nama}#${i + 1}: patokan ${o.id} pas (kedua kaki berimpit dengan sisi bangun siku-siku ${e.b.id})`);
                } else cek(Math.abs(sudutDi(e.b.t, e.idx) - 90) > 3 && !dua.every(berimpit), `${nama}#${i + 1}: patokan ${o.id} bercelah pada bangun ${e.b.id} yang bukan siku-siku`);
              }
            }
          }
          // juring putaran
          const j = juringDari(o);
          if (j !== null) {
            stat.baji += 1;
            if (/^(q|w|wb)\d$/.test(o.id)) hampir(j, 90, 0.6, `${nama}#${i + 1}: juring ${o.id} seperempat putaran`);
            else if (/^(g|wg)\d$/.test(o.id)) hampir(j, SUDUT_RUNCING, 0.6, `${nama}#${i + 1}: juring ${o.id} sama dengan sudut runcing belah ketupat`);
            else if (/^h\d$/.test(o.id)) hampir(j, SUDUT_LEBAR, 0.6, `${nama}#${i + 1}: juring ${o.id} sama dengan sudut lebar belah ketupat`);
            else cek(/^q0$/.test(o.id), `${nama}#${i + 1}: juring ${o.id} tidak dikenal`);
          }
        }
        // empat juring satu kelompok menutup satu putaran (empat kali seperempat) atau tidak
        for (const awalan of ["q", "w", "wb", "g", "wg", "h"]) {
          const kel = akhir.filter((o) => new RegExp(`^${awalan}\\d$`).test(o.id) && juringDari(o) !== null);
          if (kel.length === 4) {
            const total = jml(kel.map(juringDari));
            if (["q", "w", "wb"].includes(awalan)) hampir(total, 360, 0.6, `${nama}#${i + 1}: empat juring ${awalan} menutup satu putaran`);
            if (["g", "wg"].includes(awalan)) cek(total < 340, `${nama}#${i + 1}: empat juring ${awalan} menyisakan celah (${total})`);
            if (awalan === "h") cek(total > 380, `${nama}#${i + 1}: empat juring h saling menumpuk (${total})`);
          }
        }
      }
    });
  }
}

/* ------------------------------ Pemisahan materi dan metode luar ------------------------------ */
const seluruhTeks = (v) => v.adegan.map((a) => [a.judul, a.sumber, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const M = V.VIDEO_MATERI_K5B6A;
const U = V.VIDEO_LUAR_K5B6A;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const nilaiId = (objs, id) => objs.find((o) => o.id === id)?.isi;
const objId = (objs, id) => objs.find((o) => o.id === id);
{
  const teksVideo = (v) => JSON.stringify(seluruhTeks(v));
  const NAMA_METODE = /Benchmark|Angle Detective|Quarter-Turn|Right Angle|Paper Fold|metode luar|metode dari luar/i;
  const materi = teksVideo(M);
  const luar = teksVideo(U);
  cek(!NAMA_METODE.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of ["Right Angle Benchmark", "Paper Fold Benchmark", "Angle Detective", "Quarter-Turn Test"]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  cek(M.adegan.every((a) => /(Buku Siswa|Panduan Guru) hlm\./.test(a.sumber)), "video materi: tiap adegan mencatat halaman buku");
  cek(U.adegan.every((a) => /metode (dari )?luar|Ringkasan/i.test(a.sumber)), "video metode luar: tiap adegan bersumber metode luar atau ringkasan");
  for (const kata of ["Bab 6", "Tujuan Pembelajaran", "Peta Konsep", "Kata Kunci", "Sudut di Sekitar Kita", "Ayo Mengingat Kembali", "Tabel 6.1", "bingkai", "penggaris siku-siku", "tukang kayu", "Eksplorasi 6.1", "Detektif Sudut", "lipat", "Tabel 6.2", "Ayo Berlatih", "Miskonsepsi", "Diferensiasi", "Refleksi", "Gambar 6.1", "Gambar 6.2", "persegi panjang", "jajar genjang", "segi lima", "kelompok"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-benchmark", "luar-benchmark-terapan", "luar-lipat", "luar-lipat-terapan", "luar-detektif", "luar-detektif-terapan", "luar-putaran", "luar-putaran-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk empat metode");
  cek(M.adegan.length === 11 && U.adegan.length === 10, "11 adegan materi dan 10 adegan metode luar");
  // Subbab A tidak membocorkan materi subbab berikutnya (definisi sudut, bagian sudut, jenis, busur, derajat, melukis). Hanya pembuka bab,
  // peta konsep, catatan panduan guru tentang busur, dan daftar subbab boleh menyebut kata-kata itu sebagai judul, bukan penjelasan.
  const BOCOR = /lancip|tumpul|busur|derajat|°|titik sudut|kaki sudut|sudut lurus|sudut nol|sudut refleks|melukis|menggambar sudut|mengukur/i;
  const boleh = ["pembuka-bab", "peta-konsep", "bingkai-siku"];
  const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
  for (const a of M.adegan.filter((x) => !boleh.includes(x.id))) cek(!BOCOR.test(teksAdegan(a)), `materi ${a.id} tidak membocorkan materi subbab berikutnya`);
  for (const a of U.adegan) cek(!BOCOR.test(teksAdegan(a)), `metode luar ${a.id} tidak membocorkan materi subbab berikutnya`);
  // Yang boleh disebut di bingkai-siku hanya kalimat Panduan Guru bahwa busur belum dikenalkan.
  {
    const b = adegan(M, "bingkai-siku");
    const per = b.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(b, i, 9999))]);
    const sebut = per.filter(([s]) => /busur/i.test(s));
    cek(sebut.length === 1 && /belum dikenalkan/.test(sebut[0][0]), "bingkai-siku: busur hanya disebut sebagai belum dikenalkan");
  }
  // Uji Kompetensi, proyek tata kota, pengayaan rasi bintang, dan Refleksi nomor 2 sampai 6 milik subbab lain.
  cek(!/Uji Kompetensi|tata kota|rasi bintang|Refleksi nomor (dua|tiga|empat|lima|enam)|keramik|jam analog/i.test(materi + luar), "tidak memakai butir Uji Kompetensi, proyek, pengayaan, dan Refleksi 2 sampai 6 milik subbab lain");
  cek(totalKetukan >= 80, `total ketukan cukup dalam (${totalKetukan})`);
}

/* ------------------------------ Hitungan isi, dihitung mandiri ------------------------------ */
{
  // Tabel 6.1 (Ayo Mengingat Kembali): banyak titik sudut tiap bangun sama dengan angka di tabel.
  {
    const a = adegan(M, "mengingat-kembali");
    const t = akhirAdegan(a, 1);
    const pts = ["b1", "b2", "b3"].map((id) => titikJalur(objId(t, id)));
    sama(pts.map((p) => p.length), TABEL_61, "banyak titik sudut tiga bangun Tabel 6.1");
    sama(["tb-t13", "tb-t23", "tb-t33"].map((id) => nilaiId(t, id)), TABEL_61.map(String), "isi kolom banyak sudut Tabel 6.1");
    sama(["tb-t12", "tb-t22", "tb-t32"].map((id) => nilaiId(t, id)), ["Persegi Panjang", "Jajar Genjang", "Segi Lima"], "isi kolom nama bangun Tabel 6.1");
    // persegi panjang: 4 sudut siku-siku; jajargenjang: tidak; segi lima beraturan: 108 derajat
    sama(pts.map(hitungSikuT), [4, 0, 0], "sudut siku-siku pada tiga bangun Tabel 6.1");
    hampir(sudutDi(pts[2], 0), 108, 0.1, "segi lima beraturan: tiap sudut 108 derajat");
    // dua sisi jajargenjang sejajar
    const p = pts[1];
    hampir((p[1][0] - p[0][0]) * (p[2][1] - p[3][1]) - (p[1][1] - p[0][1]) * (p[2][0] - p[3][0]), 0, 0.01, "sisi atas dan bawah jajargenjang sejajar");
  }
  // Pembuka: enam tujuan dan sebelas kata kunci.
  {
    const a = adegan(M, "pembuka-bab");
    const t = akhirAdegan(a, 1);
    cek(["r1-t0", "r2-t0", "r3-t0"].every((id) => nilaiId(t, id)) && !nilaiId(t, "r4-t0"), "tujuan 1 sampai 3 tampil lebih dulu");
    const t2 = akhirAdegan(a, 2);
    sama([1, 2, 3, 4, 5, 6].map((i) => nilaiId(t2, `r${i}-t0`)?.[0]), ["1", "2", "3", "4", "5", "6"], "enam tujuan bernomor 1 sampai 6");
    const kk = akhirAdegan(a, 3);
    sama([...Array(11).keys()].map((i) => nilaiId(kk, `ch${i}-t0`)), ["sudut", "sudut siku-siku", "kaki sudut", "titik sudut", "sudut lancip", "sudut tumpul", "sudut lurus", "sudut nol", "sudut refleks", "busur", "derajat"], "sebelas kata kunci (Buku Siswa hlm. 164)");
  }
  // Enam bangun Ayo Berlatih: bangun di gambar, jawaban, tanda, dan silang konsisten dengan hitungan mandiri.
  {
    const l1 = adegan(M, "latihan-1");
    const l2 = adegan(M, "latihan-2");
    const t1 = akhirAdegan(l1);
    const t2 = akhirAdegan(l2, 3);
    const semua = new Map();
    for (let i = 0; i < 6; i += 1) {
      const sumber = i < 3 ? t1 : t2;
      const o = objId(sumber, `bg${i + 1}`);
      cek(!!o, `latihan: bangun ${i + 1} tampil`);
      if (!o) continue;
      const t = titikJalur(o);
      semua.set(i, t);
      sama(t.map((p) => p.map((n) => Math.round(n * 10) / 10)), G.BANGUN_LATIHAN[i].map((p, _, arr) => p).length === t.length ? t.map((p) => p.map((n) => Math.round(n * 10) / 10)) : null, `bangun ${i + 1} berpoligon`);
      const siku = hitungSikuT(t);
      sama(siku, KUNCI[i], `bangun ${i + 1} di gambar: banyak sudut siku-siku`);
      const tanda = sumber.filter((x) => new RegExp(`^m${i + 1}-\\d$`).test(x.id)).length;
      const silang = sumber.filter((x) => new RegExp(`^x${i + 1}-\\d$`).test(x.id)).length;
      sama(tanda, KUNCI[i], `bangun ${i + 1}: banyak tanda siku-siku yang digambar`);
      sama(tanda + silang, t.length, `bangun ${i + 1}: tiap titik sudut bertanda siku-siku atau silang`);
      sama(nilaiId(sumber, `jw${i + 1}`) ?? nilaiId(sumber, `ph${i + 1}`), String(KUNCI[i]), `bangun ${i + 1}: jawaban di gambar sesuai kunci`);
      stat.bangun += 1;
    }
    // tabel kunci
    for (const [a, id, ke] of [[l2, "kn", 4], [adegan(U, "luar-pembuka"), "kj", 2], [adegan(U, "luar-ringkas"), "kn", 3]]) {
      const t = akhirAdegan(a, ke);
      sama([1, 2, 3, 4, 5, 6].map((c) => nilaiId(t, `${id}-t1${c}`)), KUNCI.map(String), `tabel kunci ${a.id}`);
      sama([1, 2, 3, 4, 5, 6].map((c) => nilaiId(t, `${id}-t0${c}`)), ["1", "2", "3", "4", "5", "6"], `nomor tabel kunci ${a.id}`);
    }
  }
  // Catatan detektif: nama bangun, banyak pojok pas, kesimpulan, dan jumlah.
  {
    const t = akhirAdegan(adegan(U, "luar-detektif-terapan"));
    const nama = ["Persegi panjang", "Segi enam", "Belah ketupat", "Segitiga", "Persegi miring", "Segi empat"];
    for (let r = 1; r <= 6; r += 1) {
      sama([nilaiId(t, `d${r}-t00`), nilaiId(t, `d${r}-t01`), nilaiId(t, `d${r}-t02`), nilaiId(t, `d${r}-t03`)], [String(r), nama[r - 1], String(KUNCI[r - 1]), KUNCI[r - 1] > 0 ? "Ya" : "Tidak"], `catatan detektif baris ${r}`);
    }
    const rumus = nilaiId(t, "d7-t01");
    sama(rumus.split(" + ").map(Number), KUNCI, "rumus jumlah mengikuti kunci");
    sama(String(jml(rumus.split(" + ").map(Number))), nilaiId(t, "d7-t02"), "jumlah sudut siku-siku enam bangun");
    sama(nilaiId(t, "d7-t02"), "12", "jumlah sama dengan dua belas");
  }
  // Hasil uji putaran: nomor 1, 5, 3.
  {
    const t = akhirAdegan(adegan(U, "luar-putaran-terapan"));
    sama([nilaiId(t, "h1-t0"), nilaiId(t, "h5-t0"), nilaiId(t, "h3-t0")], [`Nomor 1: lolos, ${KUNCI[0]} sudut siku-siku`, `Nomor 5: lolos, ${KUNCI[4]} sudut siku-siku`, `Nomor 3: tidak, ${KUNCI[2]} sudut siku-siku`], "hasil uji putaran sesuai kunci");
  }
  // Contoh isian Tabel 6.2 buatan sendiri.
  {
    const t = akhirAdegan(adegan(M, "eksplorasi-periksa"), 4);
    sama([nilaiId(t, "n1"), nilaiId(t, "n2"), nilaiId(t, "n3")], ["pojok buku", "pojok bingkai", "puncak atap segitiga"], "contoh isian Tabel 6.2");
    cek(objId(t, "c1").x < objId(t, "c3").x && objId(t, "c3").x > 242 && objId(t, "c1").x < 242, "centang pojok buku di kolom ya dan puncak atap di kolom tidak");
  }
  // Empat posisi sudut siku-siku pada miskonsepsi berbeda arah.
  {
    const t = akhirAdegan(adegan(M, "miskonsepsi"), 3);
    const arah = [1, 2, 3, 4].map((n) => {
      const p = titikJalur(objId(t, `ms${n}`));
      hampir(sudutDi(p, 0), 90, 0.5, `miskonsepsi: segitiga ${n} siku-siku di titik pertama`);
      return [Math.round(p[1][0] - p[0][0]), Math.round(p[1][1] - p[0][1])].join(",");
    });
    cek(new Set(arah).size === 4, `empat posisi sudut siku-siku berbeda arah (${arah.join(" | ")})`);
  }
  // Skema pembelajaran: empat subbab masing-masing 4 JP (Panduan Guru hlm. 250).
  {
    const t = akhirAdegan(adegan(M, "mengingat-kembali"));
    sama([0, 1, 2, 3].map((i) => nilaiId(t, `sk${i}-t1`)), ["4 JP", "4 JP", "4 JP", "4 JP"], "empat subbab masing-masing 4 JP");
  }
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
  // Buku Siswa hlm. 163-169 = PDF 179-185, Refleksi hlm. 187 = PDF 203; Panduan Guru hlm. 249-257 = PDF 261-269.
  const bagian = existsSync(bs) && existsSync(bg) ? [ambil(bs, 179, 185), ambil(bs, 203, 203), ambil(bg, 261, 269)] : [null];
  if (bagian.some((b) => b === null)) console.log("PDF atau pdftotext tidak tersedia: pemeriksaan kutipan buku dilewati");
  else {
    const bersih = (t) => t.toLowerCase().replace(/-\s*\n\s*/g, "-").replace(/\s+/g, " ").trim();
    const buku = bersih(bagian.join("\n"));
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
  const berkas = readdirSync(folder).filter((f) => /^(k5b6a-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|k5b6a-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k5b6a sendiri (${impor.join(", ")})`);
  }
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k5b6a.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_A56|video-k4b2-umum/.test(pembungkus) && /VIDEO_MATERI_K5B6A/.test(pembungkus) && /VIDEO_LUAR_K5B6A/.test(pembungkus) && /export function VideoK5B6A/.test(pembungkus) && /DaftarVideoCerita/.test(pembungkus) && /keVideoSiap/.test(pembungkus), "video-k5b6a: memakai dua video baru, bukan naskah lama");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${((n * 0.5) / 60).toFixed(1)} menit suara)`);
}
console.log(`Pemeriksaan geometri: ${stat.tanda} tanda siku-siku, ${stat.patokan} patokan, ${stat.baji} juring, ${stat.bangun} bangun Ayo Berlatih, ${stat.teksPasang} pasangan teks`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
