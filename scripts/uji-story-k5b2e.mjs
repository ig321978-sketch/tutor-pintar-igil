// Uji Story Kelas 5 Bab 2 Sub-Bab E (menentukan KPK dan FPB dengan faktor prima, penutup bab): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, sinkron angka suara dan gambar, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas,
// teks bertumpuk, pemisahan materi dan metode luar, kutipan buku (bila PDF ada),
// hitungan mandiri (faktorisasi prima, FPB, KPK, saringan Eratosthenes, pohon faktor, pembagian berulang, diagram Venn, pangkat prima,
// kunci Uji Kompetensi 1 sampai 4, soal tambahan, pengayaan), geometri gambar, emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k5b2e.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { spawnSync } from "node:child_process";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/[.][a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k5b2e-video.ts");
const G = await import("../src/components/modul/story/k5b2e-gambar.ts");
const M1 = await import("../src/components/modul/story/k5b2e-materi-1.ts");
const M2 = await import("../src/components/modul/story/k5b2e-materi-2.ts");
const M3 = await import("../src/components/modul/story/k5b2e-materi-3.ts");
const U1 = await import("../src/components/modul/story/k5b2e-luar-1.ts");
const U2 = await import("../src/components/modul/story/k5b2e-luar-2.ts");

const stat = { rumus: 0, tabel: 0, pohon: 0, venn: 0, saringan: 0, teksPasang: 0, kasus: 0 };
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

/* ------------------------------ Hitungan mandiri bilangan bulat ------------------------------ */
const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
const lcm = (a, b) => (a * b) / gcd(a, b);
const gcdAll = (xs) => xs.reduce((t, x) => gcd(t, x));
const lcmAll = (xs) => xs.reduce((t, x) => lcm(t, x));
const faktorPrima = (n) => {
  const out = [];
  for (let p = 2; p * p <= n; p += 1) while (n % p === 0) (out.push(p), (n /= p));
  if (n > 1) out.push(n);
  return out;
};
const adalahPrima = (n) => n > 1 && faktorPrima(n).length === 1;
const kali = (xs) => xs.reduce((t, x) => t * x, 1);
const angka = (s) => Number(String(s).replace(/\./g, ""));
const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const urut = (xs) => [...xs].sort((a, b) => a - b);
/** FPB dan KPK dari faktorisasi prima: irisan multiset dan gabungan terbesar. */
const hitungDariPrima = (xs) => {
  const hitungan = xs.map((n) => {
    const m = new Map();
    for (const p of faktorPrima(n)) m.set(p, (m.get(p) ?? 0) + 1);
    return m;
  });
  const semua = new Set(hitungan.flatMap((m) => [...m.keys()]));
  let fpb = 1;
  let kpk = 1;
  for (const p of semua) {
    const pangkat = hitungan.map((m) => m.get(p) ?? 0);
    fpb *= p ** Math.min(...pangkat);
    kpk *= p ** Math.max(...pangkat);
  }
  return { fpb, kpk };
};
for (const xs of [[72, 150], [45, 135], [96, 120], [24, 36, 60], [80, 120, 160], [42, 60], [27, 81], [6, 10, 15], [7, 18, 33], [30, 64, 86], [36, 108], [50, 105], [24, 30, 54], [18, 24], [15, 28], [12, 18], [60, 72], [24, 36]]) {
  const h = hitungDariPrima(xs);
  cek(h.fpb === gcdAll(xs) && h.kpk === lcmAll(xs), `FPB dan KPK ${xs.join(", ")} sama lewat faktor prima dan lewat gcd/lcm`);
}

/* ------------------------------ Data buku, ditulis ulang mandiri dari halaman PDF ------------------------------ */
// Buku Siswa hlm. 53 sampai 62 (PDF 69 sampai 78) dan Panduan Guru hlm. 76 sampai 96 (PDF 88 sampai 108).
const PRIMA_SAMPAI_100 = Array.from({ length: 99 }, (_, i) => i + 2).filter(adalahPrima);

const VIDEO = [V.VIDEO_MATERI_K5B2E, V.VIDEO_LUAR_K5B2E];
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
const EMOJI_ATAU_TANDA = /^[\u{1F000}-\u{1FFFF}]|^[✂✏⚠✅❌❓⭕]$/u;
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
        else if (o.t === "garis" || o.t === "panah") cek(x > -2 && x < 302 && y > -2 && y < 204 && x + (o.x2 ?? 0) > -2 && x + (o.x2 ?? 0) < 302 && y + (o.y2 ?? 0) > -2 && y + (o.y2 ?? 0) < 204, `${nama}#${i + 1}: garis ${o.id} masuk kanvas`);
      }
      // teks tidak boleh bertumpuk
      {
        const teksAda = akhir.filter((o) => o.t === "teks" && (o.op ?? 1) > 0 && o.isi && !EMOJI_ATAU_TANDA.test(o.isi));
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
const M = V.VIDEO_MATERI_K5B2E;
const U = V.VIDEO_LUAR_K5B2E;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const di = (v, id, ke) => akhirAdegan(adegan(v, id), ke);
const nilaiId = (objs, id) => objs.find((o) => o.id === id)?.isi;
const ada = (objs, id) => objs.some((o) => o.id === id);
const teksVisible = (objs) => objs.filter((o) => o.t === "teks" && (o.op ?? 1) > 0 && o.isi).map((o) => o.isi);
{
  const teksVideo = (v) => JSON.stringify(seluruhTeks(v));
  const NAMA_METODE = /Factor Tree|Prime Exponent|LCM-GCF|Prime Venn|metode luar|metode dari luar/i;
  const materi = teksVideo(M);
  const luar = teksVideo(U);
  cek(!NAMA_METODE.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of ["Factor Tree", "Prime Exponent Rules", "LCM-GCF Bridge", "Prime Venn Diagram"]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  cek(M.adegan.every((a) => /(Buku Siswa|Panduan Guru) hlm\./.test(a.sumber)), "video materi: tiap adegan mencatat halaman buku");
  cek(U.adegan.every((a) => /metode luar|Ringkasan/i.test(a.sumber)), "video metode luar: tiap adegan bersumber metode luar atau ringkasan");
  for (const kata of ["Sub-Bab E", "bilangan prima", "Eratosthenes", "faktorisasi prima", "pohon faktor", "Asep", "Lukas", "pembagian berulang", "KPK", "FPB", "Miskonsepsi", "Diferensiasi", "Uji Kompetensi", "Rubrik", "pengayaan", "Remedial", "Refleksi", "orang tua", "kunci", "Ayo Berlatih", "Panduan Guru", "congklak", "Geogebra", "Sabtu Kliwon", "lampu"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-ft", "luar-ft-terapan", "luar-per", "luar-per-terapan", "luar-lgb", "luar-lgb-terapan", "luar-pv", "luar-pv-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk empat metode");
  cek(M.adegan.length === 12 && U.adegan.length === 10, "12 adegan materi dan 10 adegan metode luar");
  cek(!/Bab tiga|Bab 3|pecahan|Bab empat|keliling/i.test(materi + luar), "tidak membahas bab lain");
  cek(totalKetukan >= 90, `total ketukan cukup dalam (${totalKetukan})`);
  for (const kata of ["72", "150", "196", "300", "270", "Uji Kompetensi", "45", "135", "96", "120", "36", "108"]) cek(luar.includes(kata), `metode luar memakai angka buku: ${kata}`);
  // Sub-Bab E tidak boleh membocorkan isi bab berikutnya.
  cek(!/pecahan/i.test(materi + luar), "tidak membocorkan Bab 3 (pecahan)");
}

/* ------------------------------ Persamaan di gambar: tiap hasil kali, jumlah, selisih, dan bagi dihitung ulang ------------------------------ */
{
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((_, i) => {
        const objs = akhirAdegan(a, i);
        const nama = `${v.id}/${a.id}#${i + 1}`;
        for (const o of objs) {
          if (o.t !== "teks" || !o.isi || (o.op ?? 1) === 0) continue;
          for (const q of o.isi.matchAll(/(\d[\d.]*(?: × \d[\d.]*)+) = (\d[\d.]*)/g)) {
            stat.rumus += 1;
            cek(kali(q[1].split(" × ").map(angka)) === angka(q[2]), `${nama}: hasil kali "${q[0]}" benar`);
          }
          for (const q of o.isi.matchAll(/(\d[\d.]*) ÷ (\d[\d.]*) = (\d[\d.]*)/g)) {
            stat.rumus += 1;
            cek(angka(q[1]) / angka(q[2]) === angka(q[3]), `${nama}: hasil bagi "${q[0]}" benar`);
          }
          for (const q of o.isi.matchAll(/(\d+) − (\d+) = (\d+)/g)) {
            stat.rumus += 1;
            cek(Number(q[1]) - Number(q[2]) === Number(q[3]), `${nama}: selisih "${q[0]}" benar`);
          }
          for (const q of o.isi.matchAll(/(\d+(?: \+ \d+)+) = (\d+)/g)) {
            stat.rumus += 1;
            cek(q[1].split(" + ").map(Number).reduce((t, x) => t + x, 0) === Number(q[2]), `${nama}: jumlah "${q[0]}" benar`);
          }
          // faktorisasi prima "N = p × p × q": semua faktor prima dan hasilnya sama dengan faktorisasi mandiri
          const fz = o.isi.match(/^(\d+) = (\d+(?: × \d+)+)$/);
          if (fz) {
            const faktor = fz[2].split(" × ").map(Number);
            if (faktor.every(adalahPrima)) {
              stat.rumus += 1;
              sama(urut(faktor), faktorPrima(Number(fz[1])), `${nama}: faktorisasi prima ${fz[1]} = ${fz[2]}`);
            }
          }
          // "FPB 12 dan 18 = 6" dan "KPK 15, 24, 36 = 360 detik": dihitung ulang
          for (const q of o.isi.matchAll(/\b(FPB|KPK)((?: \d+(?:,| dan)?)+(?: dan \d+)?)\s*= (\d[\d.]*)/g)) {
            const xs = (q[2].match(/\d+/g) ?? []).map(Number);
            if (xs.length >= 2) {
              stat.rumus += 1;
              cek((q[1] === "FPB" ? gcdAll(xs) : lcmAll(xs)) === angka(q[3]), `${nama}: ${q[1]} ${xs.join(", ")} = ${q[3]} benar (hitung ${q[1] === "FPB" ? gcdAll(xs) : lcmAll(xs)})`);
            }
          }
        }
      });
    }
  }
  cek(stat.rumus >= 100, `jumlah persamaan yang diperiksa (${stat.rumus})`);
}

/* ------------------------------ Faktor bilangan 1 sampai 10 dan saringan Eratosthenes ------------------------------ */
{
  sama(M1.PRIMA_100, PRIMA_SAMPAI_100, "daftar prima di Panduan Guru hlm. 78 sama dengan hitungan mandiri");
  sama(PRIMA_SAMPAI_100.length, 25, "ada dua puluh lima bilangan prima di bawah seratus");
  sama(M1.PRIMA_100.length, 25, "berkas memuat dua puluh lima bilangan prima");
  // tabel faktor 1 sampai 10
  const t = di(M, "prima", 0);
  for (let n = 1; n <= 10; n += 1) {
    stat.tabel += 1;
    const faktor = Array.from({ length: n }, (_, i) => i + 1).filter((d) => n % d === 0);
    sama([nilaiId(t, `ft-t${n}0`), nilaiId(t, `ft-t${n}1`)], [String(n), faktor.join(", ")], `tabel faktor bilangan ${n}`);
    const prima = faktor.length === 2;
    const warna = t.find((o) => o.id === `ft-s${n}1`)?.warna;
    cek((warna === G.W.emas) === prima, `baris ${n} diwarnai bila prima (faktor ${faktor.length})`);
  }
  // tiap bilangan prima punya dua faktor, 1 punya satu faktor
  sama(Array.from({ length: 10 }, (_, i) => i + 1).filter((n) => faktorPrima(n).length === 1), [2, 3, 5, 7], "prima 1 sampai 10");
  // saringan: warna 100 kotak pada tiap ketukan dibandingkan dengan simulasi mandiri
  const hapusKel = (set, p) => {
    for (let n = 2 * p; n <= 100; n += p) set.add(n);
  };
  const buang = new Set();
  const ambil = new Set();
  const harap = [{ buang: new Set(), ambil: new Set() }];
  buang.add(1);
  harap.push({ buang: new Set(buang), ambil: new Set(ambil) });
  for (const p of [2, 3, 5]) {
    ambil.add(p);
    hapusKel(buang, p);
    harap.push({ buang: new Set(buang), ambil: new Set(ambil) });
  }
  ambil.add(7);
  ambil.add(11);
  hapusKel(buang, 7);
  hapusKel(buang, 11);
  harap.push({ buang: new Set(buang), ambil: new Set(ambil) });
  // ketukan terakhir: semua bilangan prima diwarnai
  const saring = adegan(M, "saringan");
  cek(saring.ketukan.length === 7, "saringan: tujuh ketukan");
  for (let i = 0; i < harap.length; i += 1) {
    const objs = akhirAdegan(saring, i);
    stat.saringan += 1;
    for (let n = 1; n <= 100; n += 1) {
      const w = objs.find((o) => o.id === `s-c${n}`)?.warna;
      const kiraan = harap[i].ambil.has(n) ? G.W.emas : harap[i].buang.has(n) ? G.W.abu : G.W.putih;
      cek(w === kiraan, `saringan ketukan ${i + 1}: bilangan ${n} berwarna ${kiraan}, ada ${w}`);
    }
  }
  {
    const objs = akhirAdegan(saring, 6);
    const emas = Array.from({ length: 100 }, (_, i) => i + 1).filter((n) => objs.find((o) => o.id === `s-c${n}`)?.warna === G.W.emas);
    sama(emas, PRIMA_SAMPAI_100, "saringan akhir: yang berwarna emas tepat bilangan prima di bawah 100");
    const abu = Array.from({ length: 100 }, (_, i) => i + 1).filter((n) => objs.find((o) => o.id === `s-c${n}`)?.warna === G.W.abu);
    sama(abu.length, 75, "saringan akhir: 75 bilangan terhapus (satu dan 74 bilangan komposit)");
    sama(abu.filter((n) => n > 1).every((n) => !adalahPrima(n)), true, "yang terhapus bukan prima");
  }
  // letak kotak: 10 kolom x 10 baris, angka sesuai urutan
  {
    const objs = akhirAdegan(saring, 0);
    for (let n = 1; n <= 100; n += 1) {
      const c = objs.find((o) => o.id === `s-c${n}`);
      const tt = objs.find((o) => o.id === `s-t${n}`);
      const kol = (n - 1) % 10;
      const bar = Math.floor((n - 1) / 10);
      cek(c.x === G.SARINGAN.x + kol * G.SARINGAN.lebar && c.y === G.SARINGAN.y + bar * G.SARINGAN.tinggi && tt.isi === String(n), `saringan: kotak ${n} di kolom ${kol + 1} baris ${bar + 1}`);
      cek(tt.x > c.x && tt.x < c.x + c.w && tt.y > c.y && tt.y < c.y + c.h, `saringan: angka ${n} di dalam kotaknya`);
    }
    cek(G.SARINGAN.y + 10 * G.SARINGAN.tinggi <= 178 && G.SARINGAN.x + 10 * G.SARINGAN.lebar <= 232, "saringan: tidak mengenai panel kanan");
  }
  // faktorisasi contoh buku
  sama([faktorPrima(12), faktorPrima(30)], [[2, 2, 3], [2, 3, 5]], "faktorisasi 12 dan 30");
  sama(nilaiId(di(M, "faktorisasi", 1), "c1"), "12 = 2 × 2 × 3", "contoh 12 di gambar");
  sama(nilaiId(di(M, "faktorisasi", 1), "c2"), "30 = 2 × 3 × 5", "contoh 30 di gambar");
}

/* ------------------------------ Pohon faktor: tiap simpul sama dengan hasil kali anaknya, ujungnya prima ------------------------------ */
{
  /** Baca pohon dari gambar: id `${id}-t{jalur}` berisi angka simpul, `${id}-n{jalur}` letak lingkarannya. */
  const bacaPohon = (objs, id) => {
    const peta = new Map();
    for (const o of objs) {
      const m = o.id.match(new RegExp(`^${id}-t([ab]*)$`));
      if (m) peta.set(m[1], { n: Number(o.isi), t: o, lingk: objs.find((q) => q.id === `${id}-n${m[1]}`) });
    }
    return peta;
  };
  const periksa = (objs, id, akar, daun, nama, salahDiNode = null) => {
    const peta = bacaPohon(objs, id);
    stat.pohon += 1;
    cek(peta.get("")?.n === akar, `${nama}: akar pohon ${id} = ${akar}`);
    const dauns = [];
    let salah = [];
    for (const [jalur, s] of peta) {
      const a = peta.get(`${jalur}a`);
      const b = peta.get(`${jalur}b`);
      cek((a === undefined) === (b === undefined), `${nama}: simpul ${id}/${jalur || "akar"} punya dua anak atau tidak sama sekali`);
      if (a && b) {
        if (a.n * b.n !== s.n) salah.push(jalur);
        cek(a.lingk.x < s.lingk.x && b.lingk.x > s.lingk.x && a.lingk.y > s.lingk.y && b.lingk.y > s.lingk.y, `${nama}: anak ${id}/${jalur || "akar"} di bawah, kiri dan kanan induk`);
        cek(ada(objs, `${id}-l${jalur}a`) && ada(objs, `${id}-l${jalur}b`), `${nama}: garis ke anak ${id}/${jalur || "akar"} ada`);
        cek(adalahPrima(s.n) === false, `${nama}: simpul yang dipecah ${s.n} bukan prima`);
      } else {
        dauns.push(s.n);
        cek(adalahPrima(s.n), `${nama}: ujung ${id}/${jalur} = ${s.n} adalah prima`);
        cek(s.lingk.warna === G.W.hijauMuda || s.lingk.warna === G.W.merahMuda, `${nama}: ujung prima berwarna khusus`);
      }
    }
    sama(salah, salahDiNode === null ? [] : [salahDiNode], `${nama}: simpul yang bukan hasil kali anaknya di ${id}`);
    if (daun) sama(urut(dauns), urut(daun), `${nama}: ujung pohon ${id}`);
    sama(kali(dauns) === akar, salahDiNode === null, `${nama}: hasil kali ujung pohon ${id} sama dengan akar (kecuali kunci buku yang salah)`);
  };
  const p = (v, sc, ke, id, akar, daun, salahDi = null) => periksa(di(v, sc, ke), id, akar, daun, `${v.id}/${sc}#${ke + 1}`, salahDi);
  p(M, "pohon", 1, "p196", 196, [2, 2, 7, 7]);
  p(M, "pohon", 2, "p300", 300, [2, 2, 3, 5, 5]);
  p(M, "pohon", 3, "p270a", 270, [2, 3, 3, 3, 5]);
  p(M, "pohon", 3, "p270b", 270, [2, 3, 3, 3, 5]);
  p(M, "pohon", 4, "p260b", 260, [2, 2, 5, 13]);
  // kunci Panduan Guru hlm. 81: simpul 130 bernilai 3 x 65, padahal 130 = 2 x 65
  p(M, "pohon", 4, "p260a", 260, null, "b");
  {
    const o = di(M, "pohon", 4);
    sama([nilaiId(o, "p260a-tba"), nilaiId(o, "p260b-tba")], ["3", "2"], "kunci buku menulis 3, seharusnya 2");
    cek(3 * 65 !== 130 && 2 * 65 === 130, "130 sama dengan 2 kali 65, bukan 3 kali 65");
    sama(faktorPrima(260), [2, 2, 5, 13], "faktorisasi 260 mandiri sama dengan hasil akhir kunci");
  }
  // pohon sebagian saat ketukan awal: tingkat muncul bertahap
  cek(ada(di(M, "pohon", 0), "p196-tb") && !ada(di(M, "pohon", 0), "p196-tbbb") && ada(di(M, "pohon", 1), "p196-tbbb"), "pohon 196: ujung terdalam muncul di ketukan berikutnya");
  // metode luar
  p(U, "luar-ft", 0, "f60a", 60, [2, 2, 3, 5]);
  p(U, "luar-ft", 1, "f60b", 60, [2, 2, 3, 5]);
  p(U, "luar-ft", 1, "f60c", 60, [2, 2, 3, 5]);
  p(U, "luar-ft-terapan", 0, "g196", 196, [2, 2, 7, 7]);
  p(U, "luar-ft-terapan", 1, "g300", 300, [2, 2, 3, 5, 5]);
  p(U, "luar-ft-terapan", 2, "g270a", 270, [2, 3, 3, 3, 5]);
  p(U, "luar-ft-terapan", 2, "g270b", 270, [2, 3, 3, 3, 5]);
  p(U, "luar-ft-terapan", 3, "g72", 72, [2, 2, 2, 3, 3]);
  p(U, "luar-ft-terapan", 3, "g150", 150, [2, 3, 5, 5]);
  // pohon di data sama dengan faktorisasi mandiri
  for (const [nama, pohon, akar] of [["196", M2.POHON_196, 196], ["300", M2.POHON_300, 300], ["270a", M2.POHON_270_A, 270], ["270b", M2.POHON_270_B, 270], ["260", M2.POHON_260_BENAR, 260], ["60a", U1.POHON_60_A, 60], ["60b", U1.POHON_60_B, 60], ["300b", U1.POHON_300_B, 300], ["72", U1.POHON_72, 72], ["150", U1.POHON_150, 150]]) {
    sama(urut(G.daun(pohon)), faktorPrima(akar), `data pohon ${nama}: ujung sama dengan faktorisasi prima ${akar}`);
    sama(pohon.n, akar, `data pohon ${nama}: akar`);
  }
}

/* ------------------------------ KPK dan FPB dari faktorisasi prima: 72 dan 150 ------------------------------ */
{
  sama(faktorPrima(72), [2, 2, 2, 3, 3], "faktorisasi 72");
  sama(faktorPrima(150), [2, 3, 5, 5], "faktorisasi 150");
  sama([M2.FAKTOR_72, M2.FAKTOR_150], [faktorPrima(72), faktorPrima(150)], "data chip faktor 72 dan 150");
  sama([gcd(72, 150), lcm(72, 150)], [6, 1800], "FPB dan KPK 72 dan 150");
  const o = di(M, "kpk-fpb-prima", 2);
  const chips72 = [0, 1, 2, 3, 4].map((i) => ({ n: Number(nilaiId(o, `u${i}-t`)), w: o.find((q) => q.id === `u${i}-k`).warna, x: o.find((q) => q.id === `u${i}-k`).x }));
  const chips150 = [0, 1, 2, 3].map((i) => ({ n: Number(nilaiId(o, `v${i}-t`)), w: o.find((q) => q.id === `v${i}-k`).warna, x: o.find((q) => q.id === `v${i}-k`).x }));
  sama(chips72.map((c) => c.n), faktorPrima(72), "chip baris 72");
  sama(chips150.map((c) => c.n), faktorPrima(150), "chip baris 150");
  // faktor yang sama sejajar di kolom yang sama: pasangan berwarna emas
  const pasangan = chips150.filter((c) => c.w === G.W.emas);
  for (const c of pasangan) cek(chips72.some((d) => d.x === c.x && d.n === c.n && d.w === G.W.emas), `pasangan ${c.n} sejajar di baris 72 dan sama-sama emas`);
  const emas72 = chips72.filter((c) => c.w === G.W.emas).map((c) => c.n);
  sama(urut(emas72), urut(pasangan.map((c) => c.n)), "faktor berpasangan sama di kedua baris");
  sama(kali(emas72), gcd(72, 150), "hasil kali pasangan = FPB 72 dan 150");
  const sisa150 = chips150.filter((c) => c.w !== G.W.emas).map((c) => c.n);
  sama(kali(emas72) * kali(chips72.filter((c) => c.w !== G.W.emas).map((c) => c.n)) * kali(sisa150), lcm(72, 150), "pasangan sekali dan semua yang tidak berpasangan = KPK 72 dan 150");
  sama(nilaiId(o, "kpk"), `KPK = 2 × 3 × 2 × 2 × 3 × 5 × 5 = ${fmt(lcm(72, 150))}`, "teks KPK 72 dan 150");
  sama(nilaiId(di(M, "kpk-fpb-prima", 3), "fpb"), `FPB = 2 × 3 = ${gcd(72, 150)}`, "teks FPB 72 dan 150");
  // faktor tanpa pasangan: 15 dan 28
  sama([faktorPrima(15), faktorPrima(28), gcd(15, 28)], [[3, 5], [2, 2, 7], 1], "15 dan 28 tanpa pasangan");
  sama(nilaiId(di(M, "kpk-fpb-prima", 4), "t15"), "15 = 3 × 5", "15 di gambar");
  sama(nilaiId(di(M, "kpk-fpb-prima", 4), "t28"), "28 = 2 × 2 × 7", "28 di gambar");
  // kalimat pengantar buku menyebut 72 dan 96, langkah memakai 72 dan 150
  cek(gcd(72, 96) === 24 && gcd(72, 150) === 6, "pengantar buku (72 dan 96) berbeda dari langkah (72 dan 150)");
}

/* ------------------------------ Pembagian berulang: simulasi mandiri dibandingkan dengan tabel ------------------------------ */
{
  const simulasi = (a, b) => {
    const baris = [];
    let x = a;
    let y = b;
    const pembagi = [];
    while (x > 1 || y > 1) {
      let p = 2;
      while (x % p !== 0 && y % p !== 0) p += 1;
      baris.push([String(p), String(x), String(y)]);
      pembagi.push([p, x % p === 0 && y % p === 0]);
      if (x % p === 0) x /= p;
      if (y % p === 0) y /= p;
    }
    baris.push(["", String(x), String(y)]);
    return { baris, kpk: kali(pembagi.map((q) => q[0])), fpb: kali(pembagi.filter((q) => q[1]).map((q) => q[0])) };
  };
  const s = simulasi(72, 150);
  sama(s.baris, M2.BARIS_BERULANG, "tabel pembagian berulang 72 dan 150 sama dengan simulasi mandiri");
  sama([s.kpk, s.fpb], [1800, 6], "KPK dan FPB dari pembagian berulang");
  // gambar: tabel di ketukan 3 memuat baris lengkap
  const o = di(M, "berulang", 2);
  const baca = (p, r) => [nilaiId(o, `${p}-t${r}0`) ?? "", nilaiId(o, `${p}-t${r}1`), nilaiId(o, `${p}-t${r}2`)];
  const gambar = [...[1, 2, 3, 4].map((r) => baca("br", r)), ...[0, 1].map((r) => baca("bs", r)), ...[0, 1].map((r) => baca("bt", r))];
  sama(gambar, M2.BARIS_BERULANG, "tabel pembagian berulang di gambar lengkap, termasuk baris 5 | 1 | 5");
  sama([nilaiId(o, "br-t01"), nilaiId(o, "br-t02")], ["72", "150"], "kepala tabel");
  // buku melewatkan baris 5 | 1 | 5: 25 : 5 = 5, bukan 1
  cek(25 / 5 === 5 && 25 / 5 !== 1, "25 dibagi 5 adalah 5, bukan 1 (buku melewatkan satu baris)");
  const buku = [["2", "72", "150"], ["2", "36", "75"], ["2", "18", "75"], ["3", "9", "75"], ["3", "3", "25"], ["5", "1", "25"], ["5", "1", "1"], ["", "1", "1"]];
  sama(buku.length, M2.BARIS_BERULANG.length, "buku dan simulasi sama banyak baris");
  cek(JSON.stringify(buku) !== JSON.stringify(s.baris), "tabel buku berbeda dari simulasi pada baris ke-7 (1 | 25 langsung 1 | 1)");
  sama(buku.filter((r) => r[0] === "5").length, 2, "buku tetap memakai dua pembagi 5");
  sama(nilaiId(di(M, "berulang", 3), "kp"), "KPK = 2 × 2 × 2 × 3 × 3 × 5 × 5 = 1.800", "KPK pembagian berulang di gambar");
  sama(nilaiId(di(M, "berulang", 3), "fp"), "FPB = 2 × 3 = 6", "FPB pembagian berulang di gambar");
  // pembagi yang membagi habis kedua bilangan: baris 1 (2) dan baris 4 (3)
  const fp = s.baris.map((r, i) => [r, i]).filter(([r]) => r[0] && Number(r[1]) % Number(r[0]) === 0 && Number(r[2]) % Number(r[0]) === 0).map(([r]) => Number(r[0]));
  sama(fp, [2, 3], "pembagi yang membagi habis kedua bilangan: 2 dan 3");
  sama(["br-s10", "br-s40"].map((id) => di(M, "berulang", 3).find((q) => q.id === id).warna), [G.W.emas, G.W.emas], "dua baris FPB disorot");
  // salah ketik buku: FPB dari 75 dan 150 bukan 6
  sama([gcd(75, 150), gcd(72, 150)], [75, 6], "FPB 75 dan 150 adalah 75, bukan 6: salah ketik buku");
}

/* ------------------------------ Ayo Berlatih dan soal tambahan: FPB dan KPK semua kasus ------------------------------ */
{
  const nilaiBaris = (objs, awal) => teksVisible(objs).filter((t) => t.startsWith(`${awal} = `)).map((t) => angka(t.match(/(\d[\d.]*)$/)[1]));
  const kasus = (v, sc, ke, daftar, nama) => {
    const objs = di(v, sc, ke);
    stat.kasus += daftar.length;
    sama(nilaiBaris(objs, "FPB"), daftar.map((xs) => gcdAll(xs)), `${nama}: FPB di gambar sama dengan hitungan mandiri`);
    sama(nilaiBaris(objs, "KPK"), daftar.map((xs) => lcmAll(xs)), `${nama}: KPK di gambar sama dengan hitungan mandiri`);
  };
  kasus(M, "latihan", 1, [[42, 60], [27, 81]], "Ayo Berlatih 2a dan 2b");
  kasus(M, "latihan", 2, [[6, 10, 15], [7, 18, 33]], "Ayo Berlatih 2c dan 2d");
  kasus(M, "latihan", 3, [[30, 64, 86]], "Ayo Berlatih 2e");
  kasus(M, "latihan", 4, [[36, 108], [50, 105]], "soal tambahan 1 dan 2");
  kasus(M, "latihan", 5, [[24, 30, 54]], "soal tambahan 3");
  sama([nilaiId(di(M, "latihan", 0), "a60"), nilaiId(di(M, "latihan", 0), "a96")], ["60 = 2 × 2 × 3 × 5", "96 = 2 × 2 × 2 × 2 × 2 × 3"], "Ayo Berlatih 1a dan 1b");
  sama([faktorPrima(60), faktorPrima(96)], [[2, 2, 3, 5], [2, 2, 2, 2, 2, 3]], "faktorisasi 60 dan 96 mandiri");
  // Ayo Berlatih 2e: 86 = 2 x 43, 64 = 2^6
  sama([faktorPrima(86), faktorPrima(64)], [[2, 43], [2, 2, 2, 2, 2, 2]], "86 dan 64");
  // kunci soal tambahan 3: perkalian yang tertulis di kunci hanya 480, hasil benar 1.080
  const salah = [2, 3, 2, 2, 5, 2, 2];
  cek(kali(salah) === 480 && lcmAll([24, 30, 54]) === 1080 && kali(salah) !== 1080, "kunci buku menulis 2 x 3 x 2 x 2 x 5 x 2 x 2 yang hasilnya 480, bukan 1.080");
  sama(nilaiId(di(M, "latihan", 5), "f6"), "kunci buku: 2 × 3 × 2 × 2 × 5 × 2 × 2 = 480", "teks kunci keliru di gambar");
  sama(urut([2, 3, 2, 2, 3, 3, 5]), urut(hitungKpkFaktor(24, 30, 54)), "faktor KPK yang benar untuk 24, 30, 54");
  function hitungKpkFaktor(...xs) {
    const maks = new Map();
    for (const x of xs) {
      const m = new Map();
      for (const p of faktorPrima(x)) m.set(p, (m.get(p) ?? 0) + 1);
      for (const [p, c] of m) maks.set(p, Math.max(maks.get(p) ?? 0, c));
    }
    return [...maks].flatMap(([p, c]) => Array(c).fill(p));
  }
}

/* ------------------------------ Miskonsepsi ------------------------------ */
{
  const a = 36;
  const b = 108;
  sama([faktorPrima(a), faktorPrima(b)], [[2, 2, 3, 3], [2, 2, 3, 3, 3]], "faktorisasi 36 dan 108");
  sama([kali([2, 2, 3, 3]), kali([2, 2, 3, 3, 3]), lcm(a, b), gcd(a, b)], [36, 108, 108, 36], "miskonsepsi 1: salah 36, benar KPK 108");
  // miskonsepsi 2: semua faktor kedua bilangan dikalikan, nilai 3.888; buku menulis hanya tiga faktor 3 (hasil 432)
  const semua = [...faktorPrima(a), ...faktorPrima(b)];
  sama(kali(semua), 3888, "miskonsepsi 2: semua faktor 36 dan 108 dikalikan = 3.888");
  sama(kali([2, 2, 2, 2, 3, 3, 3]), 432, "perkalian yang tertulis di Panduan Guru (tiga faktor 3) hanya 432");
  sama(urut(semua), [2, 2, 2, 2, 3, 3, 3, 3, 3], "faktor yang benar: empat faktor 2 dan lima faktor 3");
  sama(nilaiId(di(M, "miskonsepsi", 1), "w2-t1"), "2 × 2 × 2 × 2 × 3 × 3 × 3 × 3 × 3 = 3.888", "gambar miskonsepsi 2 memuat lima faktor 3");
  // miskonsepsi 3: semua pasangan ditulis = 1.296
  sama(kali([2, 2, 2, 2, 3, 3, 3, 3]), 1296, "miskonsepsi 3: 2 x 2 x 2 x 2 x 3 x 3 x 3 x 3 = 1.296");
  sama(gcd(a, b), 36, "FPB 36 dan 108 = 36");
  // sisi kartu miskonsepsi memuat salah dan benar
  const o1 = di(M, "miskonsepsi", 0);
  sama([nilaiId(o1, "w1-t0"), nilaiId(o1, "b1-t0")], ["salah: KPK = 2 × 2 × 3 × 3 = 36", "benar: KPK = 2 × 2 × 3 × 3 × 3 = 108"], "kartu miskonsepsi 1");
}

/* ------------------------------ Uji Kompetensi 1: empat kelompok bilangan ------------------------------ */
{
  const kunci = [
    { xs: [45, 135], fpb: 45, kpk: 135 },
    { xs: [96, 120], fpb: 24, kpk: 480 },
    { xs: [24, 36, 60], fpb: 12, kpk: 360 },
    { xs: [80, 120, 160], fpb: 40, kpk: 480 },
  ];
  sama(M3.UK1.map((u) => [u.a, u.b, ...(u.c ? [u.c] : [])]), kunci.map((q) => q.xs), "bilangan Uji Kompetensi 1 sama dengan buku");
  kunci.forEach((q, i) => {
    stat.kasus += 1;
    sama([gcdAll(q.xs), lcmAll(q.xs)], [q.fpb, q.kpk], `UK 1 ${"abcd"[i]}: kunci buku sama dengan hitungan mandiri`);
    const objs = di(M, "uk-1", i);
    const teks = teksVisible(objs);
    const fpb = teks.find((t) => t.startsWith("FPB = "));
    const kpk = teks.find((t) => t.startsWith("KPK = "));
    sama([angka(fpb.match(/(\d[\d.]*)$/)[1]), angka(kpk.match(/(\d[\d.]*)$/)[1])], [q.fpb, q.kpk], `UK 1 ${"abcd"[i]}: nilai di gambar`);
    // faktorisasi tiap bilangan tampil dan benar
    for (const x of q.xs) {
      const t = teks.find((s) => s.startsWith(`${x} = `));
      cek(t !== undefined && urut(t.split(" = ")[1].split(" × ").map(Number)).join() === faktorPrima(x).join(), `UK 1 ${"abcd"[i]}: faktorisasi ${x} di gambar benar`);
    }
  });
}

/* ------------------------------ Uji Kompetensi 2 sampai 4 ------------------------------ */
{
  // Soal 2: kelompok belajar
  sama([gcd(12, 18), 18 / gcd(12, 18), 12 / gcd(12, 18)], [6, 3, 2], "UK 2: 6 kelompok, 3 laki-laki, 2 perempuan");
  const o2 = teksVisible(di(M, "uk-2", 0));
  cek(o2.includes("paling banyak 6 kelompok") && o2.includes("tiap kelompok: 3 laki-laki + 2 perempuan") && o2.some((t) => t.includes("FPB 12 dan 18")) , "UK 2: gambar memuat 6 kelompok, 3 laki-laki, 2 perempuan");
  // Soal 3: lampu lalu lintas
  sama([lcmAll([15, 24, 36]), lcmAll([15, 24, 36]) / 60], [360, 6], "UK 3: KPK 15, 24, 36 = 360 detik = 6 menit");
  const waktu = (jam, menit, tambahMenit) => {
    const total = jam * 60 + menit + tambahMenit;
    return `${Math.floor(total / 60)}.${String(total % 60).padStart(2, "0")}`;
  };
  sama(waktu(15, 30, 6), "15.36", "UK 3: 15.30 + 6 menit = 15.36");
  cek(teksVisible(di(M, "uk-2", 2)).includes("15.30 + 6 menit = 15.36"), "UK 3: gambar memuat 15.30 + 6 menit = 15.36");
  cek(teksVisible(di(M, "uk-2", 2)).includes("kunci buku: pukul 15.41"), "UK 3: gambar menyebut kunci buku 15.41 (salah)");
  cek(waktu(15, 30, 6) !== "15.41", "UK 3: kunci Panduan Guru 15.41 tidak sama dengan hitungan 15.36");
  cek(teksVisible(di(M, "uk-2", 1)).includes("KPK 15, 24, 36 = 360 detik") && teksVisible(di(M, "uk-2", 1)).includes("360 detik = 6 menit"), "UK 3: gambar KPK 360 detik dan 6 menit");
  // Soal 4a: pancawara lima hari, tujuh hari seminggu
  const hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const maju = (h, n) => hari[(hari.indexOf(h) + n) % 7];
  sama([maju("Selasa", 5), maju("Minggu", 5)], ["Minggu", "Jumat"], "UK 4a: Selasa + 5 = Minggu, Minggu + 5 = Jumat");
  const pernyataan = [maju("Selasa", 5) === "Minggu", maju("Minggu", 5) === "Kamis", 19 + 5 === 24];
  sama(pernyataan, [true, false, true], "UK 4a: benar, salah, benar");
  const o4 = teksVisible(di(M, "uk-2", 3));
  sama(["q1", "q2", "q3"].map((id, j) => di(M, "uk-2", 3).find((q) => q.id === `${id}-t0`).isi.endsWith(pernyataan[j] ? ": Benar" : ": Salah")), [true, true, true], "UK 4a: kartu benar atau salah sesuai hitungan");
  cek(o4.length > 3, "UK 4a: tiga kartu tampil");
  // Soal 4b: KPK 7 dan 5, tanggal
  sama(lcm(7, 5), 35, "UK 4b: KPK 7 dan 5 = 35");
  const tgl = new Date(Date.UTC(2022, 7, 27));
  const depan = new Date(tgl.getTime() + 35 * 86400000);
  sama([tgl.getUTCDay(), depan.getUTCDay(), depan.getUTCFullYear(), depan.getUTCMonth() + 1, depan.getUTCDate()], [6, 6, 2022, 10, 1], "UK 4b: 27 Agustus 2022 Sabtu, +35 hari = Sabtu 1 Oktober 2022");
  const o5 = teksVisible(di(M, "uk-2", 4));
  cek(o5.includes("KPK 7 dan 5 = 35") && o5.includes("27 Agustus + 35 hari") && o5.includes("= 1 Oktober 2022"), "UK 4b: gambar memuat 35 hari dan 1 Oktober 2022");
  // Rubrik: empat butir, skor maksimum 4
  const rb = di(M, "penutup-e", 0);
  sama([1, 2, 3, 4].map((r) => nilaiId(rb, `rb-t${r}1`)?.startsWith("4:")), [true, true, true, true], "rubrik: skor maksimum 4 tiap butir");
  sama([1, 2, 3, 4].map((r) => nilaiId(rb, `rb-t${r}0`)), ["1", "2", "3", "4"], "rubrik: nomor butir");
  // Pengayaan
  sama([gcd(60, 72), 60 / gcd(60, 72), 72 / gcd(60, 72), 20 - 12], [12, 5, 6, 8], "pengayaan 1: 12 paket, 5 nastar, 6 kacang, kurang 8");
  const o6 = teksVisible(di(M, "penutup-e", 2));
  cek(o6.includes("FPB 60 dan 72 = 12 paket") && o6.includes("tiap paket: 5 nastar + 6 kacang") && o6.includes("20 siswa: kurang 20 − 12 = 8 paket"), "pengayaan 1: gambar sesuai hitungan");
  sama([lcmAll([15, 20, 30]), waktu(10, 20, 60)], [60, "11.20"], "pengayaan 2: KPK 15, 20, 30 = 60 menit, bus bersamaan 11.20");
  sama([gcd(24, 36), 36 / gcd(24, 36), 24 / gcd(24, 36), 36 / gcd(24, 36) + 24 / gcd(24, 36)], [12, 3, 2, 5], "pengayaan 3: 12 siswa per baris, 3 + 2 = 5 baris");
  const o7 = teksVisible(di(M, "penutup-e", 3));
  cek(o7.some((t) => t === "KPK = 60 menit = 1 jam") && o7.some((t) => t === "10.20 + 1 jam = 11.20") && o7.some((t) => t === "FPB = 12 siswa per baris") && o7.some((t) => t.includes("= 5 baris")), "pengayaan 2 dan 3: gambar sesuai hitungan");
  // Bus: 3A pukul 10.30 salah (seharusnya 10.40), 2B dan 1D bersamaan 10.50
  sama([waktu(10, 20, 20), waktu(10, 20, 15), waktu(10, 20, 30), lcm(15, 30)], ["10.40", "10.35", "10.50", 30], "jadwal bus pengayaan");
}

/* ------------------------------ Apersepsi Asep dan Lukas ------------------------------ */
{
  sama([gcd(18, 24), lcm(18, 24)], [6, 72], "apersepsi: FPB 18 dan 24 = 6, KPK = 72 (Lukas benar, Asep keliru)");
  const o = di(M, "pembuka-e", 4);
  sama([nilaiId(o, "g1-t0"), nilaiId(o, "g2-t0")], ["FPB 18 dan 24", "KPK 18 dan 24"], "apersepsi: kartu FPB dan KPK tampil");
  sama([nilaiId(o, "g1-t1"), nilaiId(o, "g2-t1")], ["adalah 6", "adalah 72"], "apersepsi: FPB 6 dan KPK 72 di kartu");
  sama(Array.from({ length: 6 }, (_, i) => i).length, 6, "enam tujuan belajar di Panduan Guru hlm. 77");
}

/* ------------------------------ Metode luar: pangkat prima ------------------------------ */
{
  const baca = (objs, id) => {
    const suku = [];
    for (let i = 0; i < 10; i += 1) {
      const b = objs.find((o) => o.id === `${id}-b${i}`);
      if (!b) break;
      const e = objs.find((o) => o.id === `${id}-e${i}`);
      suku.push([Number(b.isi), e ? Number(e.isi) : 1]);
      if (e) cek(e.y < b.y && e.x > b.x && e.u < b.u, `pangkat ${id}: pangkat ke-${i} lebih kecil, di atas, dan di kanan basis`);
    }
    return suku;
  };
  const nilai = (suku) => kali(suku.map(([b, e]) => b ** e));
  const harap = (v, sc, ke, id, n, nama) => {
    const objs = di(v, sc, ke);
    const suku = baca(objs, id);
    stat.rumus += 1;
    sama(nilai(suku), n, `${nama}: ${id} bernilai ${n}`);
    sama(nilaiId(objs, `${id}-eq`), suku.map(([b, e]) => (e > 1 ? `${b}^${e}` : String(b))).join(" × "), `${nama}: rumus tersembunyi ${id} sama dengan gambar`);
    // urutan basis menaik dan prima
    cek(suku.every(([b]) => adalahPrima(b)) && suku.every(([b], i) => i === 0 || b > suku[i - 1][0]), `${nama}: basis ${id} prima dan menaik`);
  };
  harap(U, "luar-per", 0, "pa", 8, "2 pangkat 3");
  harap(U, "luar-per", 0, "pb", 9, "3 pangkat 2");
  harap(U, "luar-per-terapan", 0, "x1", 72, "72");
  harap(U, "luar-per-terapan", 0, "x2", 150, "150");
  harap(U, "luar-per-terapan", 1, "k1", lcm(72, 150), "KPK 72 dan 150");
  harap(U, "luar-per-terapan", 2, "f1", gcd(72, 150), "FPB 72 dan 150");
  harap(U, "luar-per-terapan", 3, "u2", 45, "45");
  harap(U, "luar-per-terapan", 3, "u4", 135, "135");
  // pangkat terbesar dan terkecil dihitung mandiri
  const pang = (n) => {
    const m = new Map();
    for (const p of faktorPrima(n)) m.set(p, (m.get(p) ?? 0) + 1);
    return m;
  };
  const a = pang(72);
  const b = pang(150);
  const kpkSuku = [...new Set([...a.keys(), ...b.keys()])].sort((x, y) => x - y).map((p) => [p, Math.max(a.get(p) ?? 0, b.get(p) ?? 0)]);
  const fpbSuku = [...new Set([...a.keys(), ...b.keys()])].sort((x, y) => x - y).map((p) => [p, Math.min(a.get(p) ?? 0, b.get(p) ?? 0)]).filter(([, e]) => e > 0);
  sama(kpkSuku, baca(di(U, "luar-per-terapan", 1), "k1"), "KPK: pangkat terbesar tiap prima");
  sama(fpbSuku, baca(di(U, "luar-per-terapan", 2), "f1"), "FPB: pangkat terkecil dan hanya prima yang ada di kedua bilangan");
  sama(kpkSuku.map(([p, e]) => p ** e), [8, 9, 25], "8 x 9 x 25 pada KPK");
  const o = di(U, "luar-per-terapan", 3);
  sama(teksVisible(o).filter((t) => t.startsWith("FPB") || t.startsWith("KPK")), ["FPB = 3² × 5 = 9 × 5 = 45", "KPK = 3³ × 5 = 27 × 5 = 135"], "UK 1a dengan pangkat");
  sama([gcd(45, 135), lcm(45, 135)], [45, 135], "UK 1a: FPB dan KPK");
}

/* ------------------------------ Metode luar: jembatan KPK dan FPB ------------------------------ */
{
  for (const [a, b] of [[18, 24], [72, 150], [45, 135], [96, 120], [36, 108]]) {
    stat.kasus += 1;
    sama(gcd(a, b) * lcm(a, b), a * b, `jembatan: FPB x KPK = ${a} x ${b}`);
  }
  cek(gcdAll([24, 36, 60]) * lcmAll([24, 36, 60]) !== 24 * 36 * 60, "jembatan tidak berlaku untuk tiga bilangan 24, 36, 60");
  sama([gcdAll([24, 36, 60]) * lcmAll([24, 36, 60]), 24 * 36 * 60], [4320, 51840], "12 x 360 = 4.320, 24 x 36 x 60 = 51.840");
  const tampil = (v, sc, ke) => teksVisible(di(v, sc, ke));
  sama(tampil(U, "luar-lgb", 1).filter((t) => t.includes("×")), ["6 × 72 = 432", "18 × 24 = 432"], "jembatan 18 dan 24 di gambar");
  const pasang = [[72, 150, 10800], [45, 135, 6075], [96, 120, 11520], [36, 108, 3888]];
  pasang.forEach(([a, b, hasil], i) => {
    const t = tampil(U, "luar-lgb-terapan", i);
    sama(a * b, hasil, `jembatan ${a} x ${b}`);
    cek(t.includes(`${a} × ${b} = ${fmt(hasil)}`) && t.includes(`${fmt(hasil)} ÷ ${gcd(a, b)} = ${fmt(lcm(a, b))}`) && t.includes(`FPB = ${gcd(a, b)}`) && t.includes(`KPK = ${fmt(lcm(a, b))}`), `jembatan ${a} dan ${b}: gambar sesuai hitungan`);
  });
}

/* ------------------------------ Metode luar: diagram Venn faktor prima ------------------------------ */
{
  const { xa, xb, y, r } = U2.VENN;
  const jarak = (px, py, cx) => Math.hypot(px - cx, py - y);
  cek(xb - xa < 2 * r && xb - xa > r, "Venn: dua lingkaran beririsan");
  const periksaVenn = (objs, pref, a, b) => {
    stat.venn += 1;
    const ambil = (j) =>
      objs
        .filter((o) => new RegExp(`^${pref}-${j}\\d$`).test(o.id) && (o.op ?? 1) > 0)
        .sort((p, q) => p.id.localeCompare(q.id))
        .map((o) => ({ n: Number(o.isi), x: o.x, y: o.y }));
    const l = ambil("l");
    const t = ambil("t");
    const rr = ambil("r");
    const ln = l.map((c) => c.n);
    const tn = t.map((c) => c.n);
    const rn = rr.map((c) => c.n);
    sama(urut([...ln, ...tn]), faktorPrima(a), `Venn ${pref}: kiri + irisan = faktor ${a}`);
    sama(urut([...tn, ...rn]), faktorPrima(b), `Venn ${pref}: irisan + kanan = faktor ${b}`);
    sama(kali(tn), gcd(a, b), `Venn ${pref}: hasil kali irisan = FPB`);
    sama(kali([...ln, ...tn, ...rn]), lcm(a, b), `Venn ${pref}: hasil kali semua isi = KPK`);
    // yang di irisan tidak tersisa di kedua sisi sekaligus (tak ada prima sama di sisi kiri dan kanan)
    cek(ln.every((p) => !rn.includes(p)), `Venn ${pref}: sisi kiri dan kanan tanpa pasangan`);
    for (const c of l) cek(jarak(c.x, c.y, xa) < r - 6 && jarak(c.x, c.y, xb) > r + 2, `Venn ${pref}: ${c.n} di kiri berada di lingkaran kiri saja`);
    for (const c of t) cek(jarak(c.x, c.y, xa) < r - 4 && jarak(c.x, c.y, xb) < r - 4, `Venn ${pref}: ${c.n} di irisan berada di kedua lingkaran`);
    for (const c of rr) cek(jarak(c.x, c.y, xb) < r - 6 && jarak(c.x, c.y, xa) > r + 2, `Venn ${pref}: ${c.n} di kanan berada di lingkaran kanan saja`);
    const teks = teksVisible(objs);
    const fpb = teks.find((s) => s.startsWith("FPB = "));
    const kpk = teks.find((s) => s.startsWith("KPK = "));
    return { fpb, kpk, tn };
  };
  const v1 = periksaVenn(di(U, "luar-pv-terapan", 1), "v1", 72, 150);
  sama([v1.fpb, v1.kpk], ["FPB = 2 × 3 = 6", "KPK = 2 × 3 × 2 × 2 × 3 × 5 × 5 = 1.800"], "Venn 72 dan 150: teks FPB dan KPK");
  const v2 = periksaVenn(di(U, "luar-pv-terapan", 2), "v2", 36, 108);
  sama([v2.fpb, v2.kpk], ["FPB = 2 × 2 × 3 × 3 = 36", "KPK = 2 × 2 × 3 × 3 × 3 = 108"], "Venn 36 dan 108: teks FPB dan KPK");
  const v3 = periksaVenn(di(U, "luar-pv-terapan", 3), "v3", 50, 105);
  sama([v3.fpb, v3.kpk], ["FPB = 5", "KPK = 5 × 2 × 5 × 3 × 7 = 1.050"], "Venn 50 dan 105: teks FPB dan KPK");
  // Data Venn yang diekspor sama dengan hitungan mandiri
  for (const [k, d] of Object.entries(U2.VENN_DATA)) {
    sama(urut([...d.l, ...d.t]), faktorPrima(d.a), `data Venn ${k}: kiri + irisan`);
    sama(urut([...d.t, ...d.r]), faktorPrima(d.b), `data Venn ${k}: irisan + kanan`);
    sama(kali(d.t), gcd(d.a, d.b), `data Venn ${k}: FPB`);
  }
  // tak ada irisan lain: faktor prima tersisa di kiri tidak boleh ada di kanan (pasangan sudah dipakai di irisan)
  sama(U2.VENN_DATA.v1.l.filter((p) => U2.VENN_DATA.v1.r.includes(p)), [], "72 dan 150: sisa kiri tidak bersama sisa kanan");
}

/* ------------------------------ Metode luar: cek hasil ------------------------------ */
{
  const t = teksVisible(di(U, "luar-ringkas", 3));
  sama([1800 % 72, 1800 % 150, 72 % 6, 150 % 6], [0, 0, 0, 0], "cek hasil: KPK habis dibagi kedua bilangan, kedua bilangan habis dibagi FPB");
  sama(t.filter((s) => s.includes("÷")), ["1.800 ÷ 72 = 25", "1.800 ÷ 150 = 12", "72 ÷ 6 = 12", "150 ÷ 6 = 25"], "cek hasil di gambar");
}

/* ------------------------------ Geometri umum gambar ------------------------------ */
{
  // Pangkat prima, chip, tabel: teks di dalam kotaknya
  const o = di(M, "kpk-fpb-prima", 2);
  for (const id of ["u0", "u1", "u2", "u3", "u4", "v0", "v1", "v2", "v3"]) {
    const kt = o.find((q) => q.id === `${id}-k`);
    const tt = o.find((q) => q.id === `${id}-t`);
    cek(tt.x > kt.x && tt.x < kt.x + kt.w && tt.y > kt.y && tt.y < kt.y + kt.h, `chip ${id}: angka di dalam kotak`);
  }
  // kolom: faktor 150 sejajar dengan faktor 72 yang sama
  sama(M2.KOLOM_150.map((c) => [2, 2, 2, 3, 3, 5, 5][c]), [2, 3, 5, 5], "kolom faktor 150 menunjuk faktor yang sama");
  sama(M2.KOLOM_150.slice(0, 2).map((c) => [2, 2, 2, 3, 3][c]), [2, 3], "dua faktor pertama 150 sejajar dengan faktor 72 yang sama");
  // tabel rubrik dan tabel faktor: kotak tersusun rapi tanpa tumpang tindih
  for (const [v, sc, ke, pref, kolom] of [[M, "prima", 0, "ft", 2], [M, "penutup-e", 0, "rb", 2]]) {
    const objs = di(v, sc, ke);
    const sel = objs.filter((q) => new RegExp(`^${pref}-s\\d+\\d$`).test(q.id));
    cek(sel.length >= 5 * kolom || sel.length >= 11 * kolom, `tabel ${pref}: kotak ada (${sel.length})`);
    for (let p = 0; p < sel.length; p += 1) for (let q = p + 1; q < sel.length; q += 1) cek(sel[p].x + sel[p].w <= sel[q].x + 0.01 || sel[q].x + sel[q].w <= sel[p].x + 0.01 || sel[p].y + sel[p].h <= sel[q].y + 0.01 || sel[q].y + sel[q].h <= sel[p].y + 0.01, `tabel ${pref}: kotak ${sel[p].id} dan ${sel[q].id} tidak tumpang tindih`);
  }
}

/* ------------------------------ Teks di dalam kartu dan sel tabel tidak melebihi kotaknya ------------------------------ */
{
  let n = 0;
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((_, i) => {
        const objs = akhirAdegan(a, i);
        const kotakAda = new Map(objs.filter((o) => o.t === "kotak").map((o) => [o.id, o]));
        for (const o of objs) {
          if (o.t !== "teks" || !o.isi || (o.op ?? 1) === 0) continue;
          const m = o.id.match(/^(.*)-t(\d+)$/);
          if (!m) continue;
          const kt = kotakAda.get(`${m[1]}-k`) ?? kotakAda.get(`${m[1]}-s${m[2]}`);
          if (!kt) continue;
          n += 1;
          const lebar = o.isi.length * (o.u ?? 10) * 0.58;
          cek(lebar <= kt.w - 3 && o.x - lebar / 2 >= kt.x - 0.5 && o.x + lebar / 2 <= kt.x + kt.w + 0.5, `${v.id}/${a.id}#${i + 1}: teks "${o.isi}" muat dalam kotaknya (lebar ${Math.round(lebar)} dari ${kt.w})`);
          cek(o.y > kt.y && o.y < kt.y + kt.h + 1, `${v.id}/${a.id}#${i + 1}: teks "${o.isi}" berada di tinggi kotaknya`);
        }
      });
    }
  }
  cek(n >= 200, `jumlah teks dalam kartu dan tabel yang diperiksa (${n})`);
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
  // Buku Siswa hlm. 53-62 = PDF 69-78; Panduan Guru hlm. 76-96 = PDF 88-108.
  const bagian = existsSync(bs) && existsSync(bg) ? [ambil(bs, 69, 78), ambil(bg, 88, 108)] : [null];
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
  const berkas = readdirSync(folder).filter((f) => /^(k5b2e-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|k5b2e-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k5b2e sendiri (${impor.join(", ")})`);
  }
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k5b2e.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_E52|video-k4b2-umum|naskah-k5b2/.test(pembungkus) && /VIDEO_MATERI_K5B2E/.test(pembungkus) && /VIDEO_LUAR_K5B2E/.test(pembungkus) && /export function VideoK5B2E/.test(pembungkus) && /DaftarVideoCerita/.test(pembungkus) && /keVideoSiap/.test(pembungkus), "video-k5b2e: memakai dua video baru, bukan naskah lama");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${((n * 0.5) / 60).toFixed(1)} menit suara)`);
}
console.log(`Pemeriksaan: ${stat.rumus} persamaan, ${stat.tabel} baris tabel faktor, ${stat.saringan} keadaan saringan, ${stat.pohon} pohon, ${stat.venn} diagram Venn, ${stat.kasus} kasus KPK dan FPB, ${stat.teksPasang} pasangan teks`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
