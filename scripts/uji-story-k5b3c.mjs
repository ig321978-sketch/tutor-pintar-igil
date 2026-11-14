// Uji Story Kelas 5 Bab 3 Sub-Bab C (pengurangan bilangan pecahan, penutup bab): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, sinkron angka suara dan gambar, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas,
// teks bertumpuk, pemisahan materi dan metode luar, kutipan buku (bila PDF ada),
// hitungan mandiri dengan pecahan eksak (semua rumus di gambar, kunci Uji Kompetensi 1 sampai 10, Ayo Berlatih, eksplorasi 3.3A sampai 3.3C, masalah Yohana dan Komang),
// geometri gambar (kotak pecahan, apel, tabel kunci), emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k5b3c.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { spawnSync } from "node:child_process";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/[.][a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k5b3c-video.ts");
const G = await import("../src/components/modul/story/k5b3c-gambar.ts");
const M1 = await import("../src/components/modul/story/k5b3c-materi-1.ts");
const M3 = await import("../src/components/modul/story/k5b3c-materi-3.ts");

const stat = { rumus: 0, kotak: 0, apel: 0, teksPasang: 0, jumlah: 0 };
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

cek(typeof L.keadaanStory === "function" && typeof L.posisiKata === "function", "mesin Story tersedia");

/* ------------------------------ Pecahan eksak: dihitung mandiri, tanpa membaca hasil dari berkas gambar ------------------------------ */
const gcd = (a, b) => (b === 0 ? Math.abs(a) : gcd(b, a % b));
const f = (n, d = 1) => {
  const g = gcd(n, d) || 1;
  return d < 0 ? [-n / g, -d / g] : [n / g, d / g];
};
const tambah = ([a, b], [c, d]) => f(a * d + c * b, b * d);
const kurang = ([a, b], [c, d]) => f(a * d - c * b, b * d);
const kali = ([a, b], [c, d]) => f(a * c, b * d);
const samaPec = (p, q) => p[0] === q[0] && p[1] === q[1];
const campur = (w, n, d) => f(w * d + n, d);
const teksPec = ([n, d]) => (d === 1 ? String(n) : Math.floor(n / d) > 0 && n % d !== 0 ? `${Math.floor(n / d)} ${n % d}/${d}` : `${n}/${d}`);
const kpk = (a, b) => (a * b) / gcd(a, b);

/** Nilai satu sisi rumus ("5 2/3 − 2 1/3", "1/4 + 1 1/3", "5 × 3 + 2"): bilangan bulat diikuti pecahan menjadi campuran, kali lebih dulu. */
function hitung(sisi) {
  const tok = sisi.split(" ").filter(Boolean);
  const suku = [];
  for (let i = 0; i < tok.length; i += 1) {
    const t = tok[i];
    if (/^\d+$/.test(t) && /^\d+\/\d+$/.test(tok[i + 1] ?? "")) {
      const [n, d] = tok[i + 1].split("/").map(Number);
      suku.push(campur(Number(t), n, d));
      i += 1;
    } else if (/^\d+\/\d+$/.test(t)) suku.push(f(...t.split("/").map(Number)));
    else if (/^\d+$/.test(t)) suku.push(f(Number(t)));
    else if (["+", "−", "×"].includes(t)) suku.push(t);
    else return null;
  }
  // kali dulu
  for (let i = 1; i < suku.length; i += 2) {
    if (suku[i] === "×") {
      const h = kali(suku[i - 1], suku[i + 1]);
      suku.splice(i - 1, 3, h);
      i -= 2;
    }
  }
  let nilai = suku[0];
  for (let i = 1; i < suku.length; i += 2) nilai = suku[i] === "+" ? tambah(nilai, suku[i + 1]) : kurang(nilai, suku[i + 1]);
  return nilai;
}
/** Rumus berantai "a = b = c": semua sisi bernilai sama. Hasil: nilai terakhir atau null bila tidak sama. */
function hitungRantai(ekspresi) {
  const sisi = ekspresi.split(" = ").map(hitung);
  if (sisi.some((s) => s === null || !Number.isFinite(s[0]))) return null;
  return sisi.every((s) => samaPec(s, sisi[0])) ? sisi[sisi.length - 1] : null;
}

/* ------------------------------ Data buku, ditulis ulang mandiri dari halaman PDF ------------------------------ */
// Buku Siswa hlm. 91 sampai 104 dan Panduan Guru hlm. 107 sampai 112 (PDF 119 sampai 124).
const YOHANA_PEC = kurang(f(2, 3), f(1, 2)); // Masalah Yohana
const LUKAS_PEC = kurang(f(2, 3), f(1, 3)); // Eksplorasi 3.3A
const JARAK = kurang(campur(5, 2, 3), campur(2, 1, 3)); // Eksplorasi 3.3C: 5 2/3 - 2 1/3 km
const TALI = kurang(campur(4, 1, 2), campur(2, 1, 3)); // Masalah Komang: 4 1/2 - 2 1/3 m
const LATIHAN = { a: tambah(f(1, 4), f(3, 4)), b: kurang(f(2, 7), f(1, 7)), c: tambah(f(4, 5), f(1, 4)), d: kurang(f(1, 3), f(1, 5)), e: tambah(f(3, 5), f(1, 3)), f: kurang(f(4, 6), f(2, 4)), dua: tambah(campur(1, 1, 2), campur(2, 1, 2)), tiga: kurang(campur(2, 1, 4), campur(2, 1, 5)) };
// Uji Kompetensi: soal 1 sampai 4 menghitung, soal 5 sampai 10 benar atau salah.
const UK = { 1: tambah(f(2, 5), f(1, 5)), 2: tambah(f(1, 20), f(1, 6)), 3: kurang(f(3, 10), f(1, 8)), 4: kurang(campur(1, 1, 8), f(1, 8)) };
const PERNYATAAN = [
  [5, kurang(campur(1, 1, 8), f(1, 2)), f(5, 8)],
  [6, kurang(f(6), campur(3, 1, 8)), campur(3, 7, 8)],
  [7, tambah(f(1, 4), campur(1, 1, 3)), campur(1, 5, 6)],
  [8, tambah(f(4, 7), f(2, 7)), f(6, 7)],
  [9, tambah(campur(2, 1, 5), campur(1, 5, 8)), campur(3, 33, 40)],
  [10, kurang(campur(2, 1, 3), campur(1, 5, 6)), f(1, 3)],
];
// Kunci Panduan Guru hlm. 110: 1 = 3/5, 2 = 13/60, 3 = 7/40, 4 = 1, 5 Benar, 6 Salah, 7 Salah, 8 Benar, 9 Benar, 10 Salah.
const KUNCI_BUKU = ["3/5", "13/60", "7/40", "1", "Benar", "Salah", "Salah", "Benar", "Benar", "Salah"];
const KUNCI_TABEL_BUKU = ["3/5", "13/60", "7/40", "1", "B", "S", "S", "B", "B", "S"];
const hitungKunci = [UK[1], UK[2], UK[3], UK[4], ...PERNYATAAN.map(([, nilai, klaim]) => (samaPec(nilai, klaim) ? "Benar" : "Salah"))].map((x) => (Array.isArray(x) ? teksPec(x) : x));

const VIDEO = [V.VIDEO_MATERI_K5B3C, V.VIDEO_LUAR_K5B3C];
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
    });
  }
}




/* ------------------------------ Pemisahan materi dan metode luar ------------------------------ */
const seluruhTeks = (v) => v.adegan.map((a) => [a.judul, a.sumber, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const M = V.VIDEO_MATERI_K5B3C;
const U = V.VIDEO_LUAR_K5B3C;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const di = (v, id, ke) => akhirAdegan(adegan(v, id), ke);
const nilaiId = (objs, id) => objs.find((o) => o.id === id)?.isi;
const ada = (objs, id) => objs.some((o) => o.id === id);
{
  const teksVideo = (v) => JSON.stringify(seluruhTeks(v));
  const NAMA_METODE = /Like Denominator|Common Denominator|Residual Area|Add-Up Check|metode luar|metode dari luar/i;
  const materi = teksVideo(M);
  const luar = teksVideo(U);
  cek(!NAMA_METODE.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of ["Like Denominator Subtract", "Common Denominator Subtract", "Residual Area Model", "Add-Up Check"]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  cek(M.adegan.every((a) => /(Buku Siswa|Panduan Guru) hlm\./.test(a.sumber)), "video materi: tiap adegan mencatat halaman buku");
  cek(U.adegan.every((a) => /metode luar|Ringkasan/i.test(a.sumber)), "video metode luar: tiap adegan bersumber metode luar atau ringkasan");
  for (const kata of ["Sub-Bab C", "Eksplorasi tiga titik tiga", "Masalah Yohana", "Lukas", "Asep", "Komang", "Nisa", "apel", "kilometer", "KPK", "Miskonsepsi", "Diferensiasi", "Uji Kompetensi", "Rubrik", "pengayaan", "Remedial", "Refleksi", "orang tua", "kunci", "Ayo Berlatih", "fasilitator", "penyebut"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-lds", "luar-lds-terapan", "luar-cds", "luar-cds-terapan", "luar-ram", "luar-ram-terapan", "luar-aup", "luar-aup-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk empat metode");
  cek(M.adegan.length === 12 && U.adegan.length === 10, "12 adegan materi dan 10 adegan metode luar");
  cek(!/Sub-Bab D|Bab empat|Bab 4/i.test(materi + luar), "tidak membahas bab lain");
  cek(totalKetukan >= 90, `total ketukan cukup dalam (${totalKetukan})`);
  for (const kata of ["Yohana", "apel", "Komang", "Uji Kompetensi", "Ayo Berlatih"]) cek(luar.toLowerCase().includes(kata.toLowerCase()), `metode luar memakai angka buku: ${kata}`);
}

/* ------------------------------ Rumus pecahan di gambar: tiap rumus dihitung ulang, dan tulisan bertumpuk dicocokkan dengan rumusnya ------------------------------ */
{
  const susun = (objs, p) => {
    const bagian = [];
    for (let i = 0; i < 40; i += 1) {
      if (ada(objs, `${p}-${i}`)) bagian.push(nilaiId(objs, `${p}-${i}`));
      else if (ada(objs, `${p}-${i}n`)) bagian.push(`${ada(objs, `${p}-${i}b`) ? `${nilaiId(objs, `${p}-${i}b`)} ` : ""}${nilaiId(objs, `${p}-${i}n`)}/${nilaiId(objs, `${p}-${i}d`)}`);
      else break;
    }
    return bagian.join(" ");
  };
  let m2 = 0;
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((_, i) => {
        const objs = akhirAdegan(a, i);
        for (const o of objs) {
          if (o.t === "teks" && o.id.endsWith("-eq")) {
            const p = o.id.slice(0, -3);
            stat.rumus += 1;
            cek(hitungRantai(o.isi) !== null, `${v.id}/${a.id}#${i + 1}: rumus "${o.isi}" benar (semua sisi bernilai sama)`);
            cek(susun(objs, p) === o.isi, `${v.id}/${a.id}#${i + 1}: gambar rumus ${p} sama dengan rumusnya ("${susun(objs, p)}" lawan "${o.isi}")`);
          }
          if (o.t !== "teks" || !o.isi || (o.op ?? 1) === 0) continue;
          for (const q of o.isi.matchAll(/(\d+(?: [+] \d+)+) = (\d+)/g)) {
            m2 += 1;
            stat.jumlah += 1;
            cek(q[1].split(" + ").map(Number).reduce((t, x) => t + x, 0) === Number(q[2]), `${v.id}/${a.id}#${i + 1}: jumlah "${q[0]}" benar`);
          }
          for (const q of o.isi.matchAll(/(\d+) − (\d+) = (\d+)/g)) {
            m2 += 1;
            cek(Number(q[1]) - Number(q[2]) === Number(q[3]), `${v.id}/${a.id}#${i + 1}: selisih "${q[0]}" benar`);
          }
          for (const q of o.isi.matchAll(/(\d+) × (\d+) = (\d+)/g)) {
            m2 += 1;
            cek(Number(q[1]) * Number(q[2]) === Number(q[3]), `${v.id}/${a.id}#${i + 1}: hasil kali "${q[0]}" benar`);
          }
          for (const q of o.isi.matchAll(/KPK(?: dari)? (\d+) dan (\d+) = (\d+)/g)) {
            m2 += 1;
            cek(kpk(Number(q[1]), Number(q[2])) === Number(q[3]), `${v.id}/${a.id}#${i + 1}: KPK "${q[0]}" benar`);
          }
          for (const q of o.isi.matchAll(/kelipatan (\d+): ([\d, ]+)/g)) {
            m2 += 1;
            const n = Number(q[1]);
            const daftar = q[2].split(",").map((x) => Number(x.trim())).filter((x) => x > 0);
            cek(daftar.every((x, j) => x === n * (j + 1)), `${v.id}/${a.id}#${i + 1}: kelipatan ${n} berurutan (${daftar.join(",")})`);
          }
        }
      });
    }
  }
  cek(stat.rumus >= 60, `jumlah rumus berantai yang diperiksa (${stat.rumus})`);
  cek(m2 >= 12, `jumlah persamaan tersisip yang diperiksa (${m2})`);
}

/* ------------------------------ Hasil rumus dibandingkan dengan hitungan mandiri ------------------------------ */
{
  const akhirRumus = (v, id, ke, p) => {
    const objs = di(v, id, ke);
    const eq = nilaiId(objs, `${p}-eq`);
    return eq === undefined ? null : hitungRantai(eq);
  };
  const harap = (v, id, ke, p, nilai, nama) => {
    const h = akhirRumus(v, id, ke, p);
    cek(h !== null && samaPec(h, nilai), `${nama}: hasil akhir ${p} di ${id}#${ke + 1} = ${h && teksPec(h)} (harapan ${teksPec(nilai)})`);
  };
  harap(M, "pembuka-c", 3, "r1", f(3, 5), "penjumlahan pemanasan");
  harap(M, "pembuka-c", 3, "r2", kurang(f(3, 5), f(2, 5)), "pengurangan pemanasan");
  // Eksplorasi 3.3A
  harap(M, "eks-3a", 3, "r", LUKAS_PEC, "3.3A Cara Asep");
  sama(teksPec(LUKAS_PEC), "1/3", "kekurangan kertas Lukas");
  // Eksplorasi 3.3B
  harap(M, "eks-3b", 3, "r", kurang(f(6, 8), f(2, 8)), "3.3B sisa apel Lukas");
  harap(M, "eks-3b", 4, "c1r", kurang(f(8, 8), f(6, 8)), "3.3B sisa apel Asep");
  harap(M, "eks-3b", 4, "c2r", kurang(f(6, 8), f(2, 8)), "3.3B langkah buku");
  // Eksplorasi 3.3C
  harap(M, "eks-3c", 2, "ra", f(17), "3.3C 5 x 3 + 2");
  harap(M, "eks-3c", 2, "rb", campur(5, 2, 3), "3.3C 5 2/3 = 17/3");
  harap(M, "eks-3c", 2, "rc", f(7), "3.3C 2 x 3 + 1");
  harap(M, "eks-3c", 2, "rd", campur(2, 1, 3), "3.3C 2 1/3 = 7/3");
  harap(M, "eks-3c", 3, "re", JARAK, "3.3C 17/3 - 7/3");
  harap(M, "eks-3c", 3, "rf", JARAK, "3.3C 10/3 = 3 1/3");
  harap(M, "eks-3c", 4, "ka", f(3), "3.3C Cara Komang 5 - 2");
  harap(M, "eks-3c", 4, "kb", f(1, 3), "3.3C Cara Komang 2/3 - 1/3");
  harap(M, "eks-3c", 4, "kc", JARAK, "3.3C Cara Komang gabungan");
  sama(teksPec(JARAK), "3 1/3", "jarak yang masih ditempuh Asep");
  // Masalah Yohana
  harap(M, "beda-penyebut", 1, "r", f(2, 3), "Yohana 2/3 = 4/6");
  harap(M, "beda-penyebut", 2, "r2", f(1, 2), "Yohana 1/2 = 3/6");
  harap(M, "beda-penyebut", 4, "rb", YOHANA_PEC, "Yohana selisih");
  harap(M, "beda-penyebut", 5, "g3", YOHANA_PEC, "Yohana selisih tetap benar");
  sama(teksPec(YOHANA_PEC), "1/6", "kekurangan kertas Yohana");
  sama([kpk(2, 3), kpk(3, 6)], [6, 6], "KPK 2 dan 3 sama 6, KPK 3 dan 6 juga 6");
  // Masalah Komang
  harap(M, "komang-tali", 1, "ya", campur(4, 1, 2), "Komang 4 1/2 = 9/2");
  harap(M, "komang-tali", 1, "yb", campur(2, 1, 3), "Komang 2 1/3 = 7/3");
  harap(M, "komang-tali", 2, "yc", f(9, 2), "Komang 9/2 = 27/6");
  harap(M, "komang-tali", 2, "yd", f(7, 3), "Komang 7/3 = 14/6");
  harap(M, "komang-tali", 3, "ye", TALI, "Komang 27/6 - 14/6");
  harap(M, "komang-tali", 3, "yf", TALI, "Komang 13/6 = 2 1/6");
  harap(M, "komang-tali", 4, "la", f(2), "Komang bulat 4 - 2");
  harap(M, "komang-tali", 4, "lb", kurang(f(1, 2), f(1, 3)), "Komang pecahan");
  harap(M, "komang-tali", 4, "lc", TALI, "Komang gabungan");
  sama(teksPec(TALI), "2 1/6", "tali yang dibeli Komang");
  sama(teksPec(kurang(campur(4, 1, 2), campur(2, 1, 3))), teksPec(tambah(f(2), kurang(f(1, 2), f(1, 3)))), "Cara Yohana sama dengan Cara Lukas");
  // Ayo Berlatih
  harap(M, "ayo-berlatih", 0, "ra", LATIHAN.a, "Ayo Berlatih 1a");
  harap(M, "ayo-berlatih", 0, "rb", LATIHAN.b, "Ayo Berlatih 1b");
  harap(M, "ayo-berlatih", 1, "rc", LATIHAN.c, "Ayo Berlatih 1c");
  harap(M, "ayo-berlatih", 1, "rd", LATIHAN.c, "Ayo Berlatih 1c disederhanakan");
  harap(M, "ayo-berlatih", 2, "re", LATIHAN.d, "Ayo Berlatih 1d");
  harap(M, "ayo-berlatih", 3, "rf", LATIHAN.e, "Ayo Berlatih 1e");
  harap(M, "ayo-berlatih", 3, "rg", LATIHAN.f, "Ayo Berlatih 1f");
  harap(M, "ayo-berlatih", 4, "rh", LATIHAN.dua, "Ayo Berlatih 2");
  harap(M, "ayo-berlatih", 4, "ri", LATIHAN.tiga, "Ayo Berlatih 3");
  sama([teksPec(LATIHAN.a), teksPec(LATIHAN.b), teksPec(LATIHAN.c), teksPec(LATIHAN.d), teksPec(LATIHAN.e), teksPec(LATIHAN.f), teksPec(LATIHAN.dua), teksPec(LATIHAN.tiga)], ["1", "1/7", "1 1/20", "2/15", "14/15", "1/6", "4", "1/20"], "jawaban Ayo Berlatih");
  // Miskonsepsi: contoh kesalahan (pembilang dan penyebut sama-sama dikurangkan) tidak sama dengan hasil benar.
  harap(M, "miskonsepsi", 2, "m2r", YOHANA_PEC, "miskonsepsi: hasil benar");
  cek(!samaPec(f(2 - 1, 3 - 2), YOHANA_PEC), "miskonsepsi: contoh kesalahan 1/1 berbeda dari hasil benar");
  sama([nilaiId(di(M, "miskonsepsi", 2), "m1r-4n"), nilaiId(di(M, "miskonsepsi", 2), "m1r-4d")], ["1", "1"], "contoh kesalahan tertulis 1/1");
  // Uji Kompetensi 1 sampai 4
  harap(M, "uk-1", 0, "r", UK[1], "UK 1");
  harap(M, "uk-1", 1, "r", UK[2], "UK 2");
  harap(M, "uk-1", 2, "r", UK[3], "UK 3");
  harap(M, "uk-1", 3, "r", UK[4], "UK 4");
  // Uji Kompetensi 5 sampai 10: nilai ruas kiri dan keputusan benar atau salah
  harap(M, "uk-2", 0, "q", PERNYATAAN[0][1], "UK 5");
  harap(M, "uk-2", 1, "q", PERNYATAAN[1][1], "UK 6");
  harap(M, "uk-2", 2, "q", PERNYATAAN[2][1], "UK 7");
  harap(M, "uk-2", 3, "q8", PERNYATAAN[3][1], "UK 8");
  harap(M, "uk-2", 3, "q9", PERNYATAAN[4][1], "UK 9");
  harap(M, "uk-2", 4, "q", PERNYATAAN[5][1], "UK 10");
  // Status benar atau salah di kartu tiap butir sama dengan hitungan mandiri.
  const status = (nilai, klaim) => (samaPec(nilai, klaim) ? "BENAR" : "SALAH");
  for (const [ke, idx] of [[0, 0], [1, 1], [2, 2], [4, 5]]) cek(nilaiId(di(M, "uk-2", ke), "qs-t0")?.includes(status(PERNYATAAN[idx][1], PERNYATAAN[idx][2])), `kartu status UK ${PERNYATAAN[idx][0]} = ${status(PERNYATAAN[idx][1], PERNYATAAN[idx][2])}`);
  cek(PERNYATAAN.slice(3, 5).every(([, a, b]) => samaPec(a, b)) && nilaiId(di(M, "uk-2", 3), "qs-t0")?.includes("BENAR"), "kartu status UK 8 dan 9 BENAR");
  // Kunci buku sama dengan hitungan mandiri (kunci Panduan Guru hlm. 110 benar semua).
  sama(hitungKunci, KUNCI_BUKU, "kunci Uji Kompetensi dihitung mandiri sama dengan kunci buku");
  sama(M3.KUNCI_TABEL, KUNCI_TABEL_BUKU, "tabel kunci di berkas sama dengan kunci buku");
  const tk = di(M, "uk-2", 5);
  sama(Array.from({ length: 10 }, (_, i) => nilaiId(tk, `kn-t1${i + 1}`)), KUNCI_TABEL_BUKU, "tabel kunci yang tampil di gambar");
  sama(Array.from({ length: 10 }, (_, i) => nilaiId(tk, `kn-t0${i + 1}`)), ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], "nomor soal di tabel kunci");
  harap(M, "uk-2", 6, "rr", f(10 * 10), "rubrik sepuluh soal kali sepuluh");
  sama(PERNYATAAN.length + 4, 10, "sepuluh soal Uji Kompetensi");
  // Refleksi: tabel empat pernyataan dua kolom pilihan.
  {
    const t = di(M, "penutup", 0);
    sama([1, 2, 3, 4].map((r) => (nilaiId(t, `rf-t${r}0`) ?? "").replace(/^\d /, "")), ["Aku dapat mengurutkan pecahan", "Aku dapat membandingkan pecahan", "Aku dapat menentukan penjumlahan", "Aku dapat menentukan pengurangan"], "empat pernyataan Refleksi");
    sama([nilaiId(t, "rf-t01"), nilaiId(t, "rf-t02")], ["Ya", "Tidak"], "kolom Ya dan Tidak");
  }
  // Metode luar
  harap(U, "luar-lds", 0, "lr", kurang(f(4, 5), f(1, 5)), "LDS contoh 4/5 - 1/5");
  harap(U, "luar-lds", 2, "p3r", f(1, 2), "LDS penyederhanaan 4/8");
  harap(U, "luar-lds-terapan", 0, "tr", LUKAS_PEC, "LDS kertas Lukas");
  harap(U, "luar-lds-terapan", 1, "ar", LATIHAN.b, "LDS Ayo Berlatih b");
  harap(U, "luar-lds-terapan", 2, "ur", UK[4], "LDS UK 4");
  harap(U, "luar-lds-terapan", 2, "us", UK[4], "LDS UK 4 dengan pecahan biasa");
  harap(U, "luar-lds-terapan", 3, "pr", kurang(f(6, 8), f(2, 8)), "LDS apel Lukas");
  harap(U, "luar-cds-terapan", 0, "r", YOHANA_PEC, "CDS Yohana");
  harap(U, "luar-cds-terapan", 1, "r", UK[3], "CDS UK 3");
  harap(U, "luar-cds-terapan", 2, "r", LATIHAN.d, "CDS Ayo Berlatih d");
  harap(U, "luar-cds-terapan", 3, "r", TALI, "CDS tali Komang awal");
  harap(U, "luar-cds-terapan", 3, "s", TALI, "CDS tali Komang samakan penyebut");
  harap(U, "luar-cds-terapan", 4, "r", TALI, "CDS tali Komang hasil");
  harap(U, "luar-ram", 1, "rr", YOHANA_PEC, "RAM contoh 4/6 - 3/6");
  harap(U, "luar-ram-terapan", 0, "yr", f(2, 3), "RAM arsir dua per tiga");
  harap(U, "luar-ram-terapan", 1, "yr", YOHANA_PEC, "RAM Yohana");
  harap(U, "luar-ram-terapan", 3, "sr", kurang(f(6, 8), f(2, 8)), "RAM apel");
  harap(U, "luar-aup", 1, "c1", kurang(f(5, 6), f(1, 6)), "AUP contoh pengurangan");
  harap(U, "luar-aup", 1, "c2", f(5, 6), "AUP contoh penjumlahan balik");
  // Add-Up Check: selisih + pengurang = bilangan awal, dihitung mandiri dari data buku.
  harap(U, "luar-aup-terapan", 0, "r", tambah(YOHANA_PEC, f(1, 2)), "AUP Yohana");
  cek(samaPec(tambah(YOHANA_PEC, f(1, 2)), f(2, 3)), "AUP Yohana: 1/6 + 1/2 = 2/3 (bilangan awal)");
  harap(U, "luar-aup-terapan", 1, "r", tambah(JARAK, campur(2, 1, 3)), "AUP jarak Asep");
  cek(samaPec(tambah(JARAK, campur(2, 1, 3)), campur(5, 2, 3)), "AUP jarak: 3 1/3 + 2 1/3 = 5 2/3 (jarak awal)");
  const enam = kurang(f(6), campur(3, 1, 8));
  cek(!samaPec(tambah(campur(3, 7, 8), campur(3, 1, 8)), f(6)) && samaPec(tambah(campur(3, 7, 8), campur(3, 1, 8)), f(7)), "AUP UK 6: 3 7/8 + 3 1/8 = 7, bukan 6");
  cek(samaPec(tambah(enam, campur(3, 1, 8)), f(6)), "AUP UK 6: selisih sebenarnya 2 7/8 dan 2 7/8 + 3 1/8 = 6");
  harap(U, "luar-aup-terapan", 2, "r", f(7), "AUP UK 6");
  const sepuluh = kurang(campur(2, 1, 3), campur(1, 5, 6));
  harap(U, "luar-aup-terapan", 3, "r", campur(2, 1, 6), "AUP UK 10");
  cek(samaPec(tambah(f(1, 3), campur(1, 5, 6)), campur(2, 1, 6)) && !samaPec(tambah(f(1, 3), campur(1, 5, 6)), campur(2, 1, 3)), "AUP UK 10: 1/3 + 1 5/6 = 2 1/6, bukan 2 1/3");
  cek(samaPec(sepuluh, f(1, 2)), "UK 10: selisih sebenarnya 1/2");
  // Ringkasan
  {
    const t = di(U, "luar-ringkas", 2);
    sama([1, 2, 3, 4].map((r) => nilaiId(t, `hs-t${r}1`)), [teksPec(YOHANA_PEC), `${teksPec(JARAK)} km`, `${teksPec(TALI)} m`, teksPec(UK[3])], "tabel hasil di ringkasan");
  }
  cek(teksPec(f(21, 20)) === "1 1/20" && teksPec(f(13, 6)) === "2 1/6", "pembantu teksPec");
}

/* ------------------------------ Geometri gambar: kotak pecahan dan apel ------------------------------ */
{
  const kotakPec = (objs, p) => {
    const sel = objs.filter((o) => new RegExp(`^${p}-c\\d+$`).test(o.id));
    const warna = sel.map((o) => o.warna);
    const silang = new Set(objs.filter((o) => new RegExp(`^${p}-x\\d+a$`).test(o.id)).map((o) => Number(o.id.match(/x(\d+)a/)[1])));
    stat.kotak += 1;
    return { d: sel.length, warna, diarsir: warna.filter((w) => w !== G.W.putih).length, silang: silang.size, sisa: warna.filter((w, i) => w !== G.W.putih && !silang.has(i)).length, lebar: sel.map((o) => o.w), tinggi: sel.map((o) => o.h) };
  };
  const samaBesar = (s, nama) => cek(new Set(s.lebar).size === 1 && new Set(s.tinggi).size === 1, `${nama}: kotak sama besar`);
  const idxApel = (objs, p, w) => Array.from({ length: 8 }, (_, i) => (objs.find((o) => o.id === `${p}-a${i}`)?.warna === w ? i : -1)).filter((i) => i >= 0);
  // Himpunan apel
  sama([M1.LUKAS.length, M1.YOHANA.length, M1.ASEP.length], [6, 2, 2], "enam apel Lukas, dua apel Yohana, dua apel sisa Asep");
  cek(M1.YOHANA.every((i) => M1.LUKAS.includes(i)) && M1.ASEP.every((i) => !M1.LUKAS.includes(i)) && [...M1.LUKAS, ...M1.ASEP].length === 8, "Yohana bagian dari Lukas, Asep sisanya, jumlah delapan apel");
  sama(8 - 6, 2, "8 apel dikurangi 6 apel sisa Asep");
  // Masalah Yohana: kertas tiga bagian, dua diarsir
  {
    const s = kotakPec(di(M, "masalah-yohana", 0), "kt");
    sama([s.d, s.diarsir], [3, 2], "kertas Yohana: tiga kotak, dua diarsir");
    samaBesar(s, "kertas Yohana");
  }
  // Eksplorasi 3.3A
  {
    const t1 = kotakPec(di(M, "eks-3a", 1), "k1");
    sama([t1.d, t1.diarsir], [3, 2], "3.3A langkah 1: tiga kotak, dua diarsir");
    sama(nilaiId(di(M, "eks-3a", 1), "n"), "3 kotak, 2 diarsir", "keterangan langkah 1");
    const t2 = kotakPec(di(M, "eks-3a", 2), "k1");
    const t2b = kotakPec(di(M, "eks-3a", 2), "k2");
    sama([t2.d, t2.diarsir, t2b.d, t2b.diarsir], [3, 2, 3, 1], "3.3A langkah 2: kotak harus dan sudah dilukis");
    cek(samaPec(f(t2.diarsir - t2b.diarsir, t2.d), LUKAS_PEC), "3.3A: 2 kotak dikurangi 1 kotak dari 3 kotak = kekurangan Lukas");
    cek(di(M, "eks-3a", 2).find((o) => o.id === "k1-c1").sorot === true, "kotak yang tersisa disorot");
    samaBesar(t2, "3.3A kertas");
  }
  // Eksplorasi 3.3B: delapan apel
  {
    const t0 = di(M, "eks-3b", 0);
    stat.apel += 1;
    sama(idxApel(t0, "ap", G.W.hijau), M1.LUKAS.filter((i) => !M1.YOHANA.includes(i)), "3.3B: apel hijau ke Lukas dan belum diteruskan");
    sama(idxApel(t0, "ap", M1.BIRU_MUDA), M1.YOHANA, "3.3B: apel biru ke Yohana");
    sama(idxApel(t0, "ap", G.W.merah), M1.ASEP, "3.3B: apel merah sisa Asep");
    sama(idxApel(di(M, "eks-3b", 1), "ap", G.W.hijau), M1.LUKAS, "3.3B langkah 1: enam apel diarsir");
    sama(idxApel(di(M, "eks-3b", 2), "ap", M1.BIRU_MUDA), M1.YOHANA, "3.3B langkah 2: dua apel diarsir");
    sama(idxApel(di(M, "eks-3b", 3), "ap", G.W.hijau), [1, 2, 5, 6], "3.3B langkah 3: empat apel sisa Lukas");
    sama(idxApel(di(M, "eks-3b", 3), "ap", G.W.hijau).length, M1.LUKAS.length - M1.YOHANA.length, "3.3B: 6 - 2 = 4 apel");
    sama(idxApel(di(M, "eks-3b", 4), "ap", G.W.emas), M1.ASEP, "catatan guru: dua apel sisa Asep disorot emas");
    const ap = t0.filter((o) => /^ap-a\d$/.test(o.id));
    sama(new Set(ap.map((o) => o.x)).size, 4, "apel: empat kolom");
    sama(new Set(ap.map((o) => o.y)).size, 2, "apel: dua baris");
  }
  // Pengurangan berpenyebut berbeda: enam kotak
  {
    const s = kotakPec(di(M, "beda-penyebut", 1), "n");
    sama([s.d, s.diarsir], [6, 4], "Nisa: enam kotak, empat diarsir (2/3 = 4/6)");
    cek(samaPec(f(s.diarsir, s.d), f(2, 3)), "4 dari 6 kotak sama dengan 2/3");
    samaBesar(s, "Nisa enam kotak");
    const u = di(M, "beda-penyebut", 2);
    const w = Array.from({ length: 6 }, (_, i) => u.find((o) => o.id === `n-c${i}`).warna);
    sama(w, [G.W.hijau, G.W.hijau, G.W.hijau, G.W.emas, G.W.putih, G.W.putih], "Nisa: tiga kotak sudah dilukis, satu belum, dua kosong");
    cek(samaPec(f(3, 6), f(1, 2)) && samaPec(f(4 - 3, 6), YOHANA_PEC), "3 dari 6 sama dengan 1/2 dan 4 kotak - 3 kotak = 1/6");
  }
  // Uji Kompetensi 1: bar lima kotak, dua + satu
  {
    const s = kotakPec(di(M, "uk-1", 0), "p");
    sama([s.d, s.diarsir], [5, 3], "UK 1: lima kotak, tiga diarsir");
    cek(samaPec(f(s.diarsir, s.d), UK[1]), "UK 1: 3 dari 5 kotak = jumlah 2/5 + 1/5");
    sama(s.warna.slice(0, 3), [G.W.langit, G.W.langit, G.W.hijau], "UK 1: Sleman dua kotak, Kulonprogo satu kotak");
  }
  // Metode luar
  {
    const s = kotakPec(di(U, "luar-pembuka", 2), "g");
    sama([s.d, s.diarsir, s.silang], [6, 6, 2], "pembuka: enam potongan, dua dicoret");
    const lds = kotakPec(di(U, "luar-lds", 0), "lk");
    sama([lds.d, lds.diarsir, lds.silang, lds.sisa], [5, 4, 1, 3], "LDS: 5 kotak, 4 diarsir, 1 dicoret, 3 tersisa");
    cek(samaPec(f(lds.sisa, lds.d), kurang(f(4, 5), f(1, 5))), "LDS: sisa 3 dari 5 = 4/5 - 1/5");
    const tk = kotakPec(di(U, "luar-lds-terapan", 0), "tk");
    cek(tk.d === 3 && samaPec(f(tk.sisa, tk.d), LUKAS_PEC), "LDS kertas Lukas: sisa 1 dari 3 kotak");
    const ay = kotakPec(di(U, "luar-lds-terapan", 1), "ay");
    cek(ay.d === 7 && samaPec(f(ay.sisa, ay.d), LATIHAN.b), "LDS Ayo Berlatih b: sisa 1 dari 7 kotak");
    const ram = kotakPec(di(U, "luar-ram", 0), "rm");
    sama([ram.d, ram.diarsir, ram.silang, ram.sisa], [4, 4, 2, 2], "RAM: 4 kotak, 2 dicoret, 2 tersisa");
    const rn = kotakPec(di(U, "luar-ram", 1), "rn");
    cek(rn.d === 6 && rn.diarsir === 4 && rn.silang === 3 && samaPec(f(rn.sisa, rn.d), YOHANA_PEC), "RAM: 4 kotak diarsir, 3 dicoret, sisa 1/6");
    const y1 = kotakPec(di(U, "luar-ram-terapan", 0), "yk");
    cek(y1.d === 6 && samaPec(f(y1.diarsir, y1.d), f(2, 3)), "RAM Yohana: 4 dari 6 kotak = 2/3");
    const y2 = kotakPec(di(U, "luar-ram-terapan", 1), "yk");
    cek(y2.d === 6 && y2.silang === 3 && samaPec(f(y2.sisa, y2.d), YOHANA_PEC), "RAM Yohana: dicoret 3, sisa 1 dari 6 kotak");
    sama(idxApel(di(U, "luar-ram-terapan", 3), "ap2", G.W.hijau), [1, 2, 5, 6], "RAM apel: empat apel sisa Lukas");
    sama(idxApel(di(U, "luar-ram-terapan", 3), "ap2", G.W.abu), M1.YOHANA, "RAM apel: dua apel diteruskan");
    sama(idxApel(di(U, "luar-lds-terapan", 3), "ap", G.W.hijau), [1, 2, 5, 6], "LDS apel: empat apel sisa Lukas");
    stat.apel += 3;
    const cb = kotakPec(di(U, "luar-cds", 1), "cb");
    sama([cb.d, cb.diarsir], [6, 3], "CDS: enam potongan sama besar");
  }
  // Kartu hasil sama dengan hitungan
  cek(nilaiId(di(M, "komang-tali", 3), "yg-t0") === `Komang membeli ${teksPec(TALI)} m tali`, "kartu hasil Komang");
  cek(nilaiId(di(M, "eks-3c", 3), "rg-t0") === `Asep masih harus menempuh ${teksPec(JARAK)} km`, "kartu hasil Asep");
  cek(nilaiId(di(M, "beda-penyebut", 4), "yk-t0") === `Yohana kurang ${teksPec(YOHANA_PEC)} bagian kertas`, "kartu hasil Yohana");
  cek(nilaiId(di(U, "luar-cds-terapan", 4), "k-t0") === `tali yang dibeli: ${teksPec(TALI)} m`, "kartu hasil Komang di metode luar");
}

/* ------------------------------ Kutipan buku (bila PDF tersedia) ------------------------------ */
{
  const bs = new URL("../bahan-sd/Matematika-BS-KLS-V.pdf", import.meta.url);
  const bg = new URL("../bahan-sd/Matematika-BG-KLS-V.pdf", import.meta.url);
  const jalur = (u) => u.pathname.replace(/^\/([A-Za-z]:)/, "$1");
  const ambil = (berkas, dari, sampai) => {
    const r = spawnSync("pdftotext", ["-f", String(dari), "-l", String(sampai), "-raw", "-enc", "UTF-8", jalur(berkas), "-"], { encoding: "utf8", maxBuffer: 1 << 26 });
    return r.status === 0 ? r.stdout : null;
  };
  // Buku Siswa hlm. 91-104 = PDF 107-120; Panduan Guru hlm. 107-112 = PDF 119-124.
  const bagian = existsSync(bs) && existsSync(bg) ? [ambil(bs, 107, 120), ambil(bg, 119, 124)] : [null];
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
    cek(n >= 90, `jumlah kutipan buku yang diperiksa (${n})`);
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k5b3c-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|k5b3c-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k5b3c sendiri (${impor.join(", ")})`);
  }
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k5b3c.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_C53|video-k4b2-umum|naskah-k5b3/.test(pembungkus) && /VIDEO_MATERI_K5B3C/.test(pembungkus) && /VIDEO_LUAR_K5B3C/.test(pembungkus) && /export function VideoK5B3C/.test(pembungkus) && /DaftarVideoCerita/.test(pembungkus) && /keVideoSiap/.test(pembungkus), "video-k5b3c: memakai dua video baru, bukan naskah lama");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${((n * 0.5) / 60).toFixed(1)} menit suara)`);
}
console.log(`Pemeriksaan: ${stat.rumus} rumus berantai, ${stat.kotak} kotak pecahan, ${stat.apel} deretan apel, ${stat.jumlah} jumlah di gambar, ${stat.teksPasang} pasangan teks`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
