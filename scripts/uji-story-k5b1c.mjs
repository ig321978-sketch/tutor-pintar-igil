// Uji Story Kelas 5 Bab 1 Sub-Bab C (komposisi dan dekomposisi bilangan): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, sinkron bilangan suara (kata bilangan) dengan gambar, perubahan gambar tiap ketukan, keunikan antaradegan,
// batas kanvas, teks bertumpuk, pemisahan materi dan metode luar, tidak membocorkan Subbab D (operasi hitung), kutipan buku (bila PDF ada),
// hitungan mandiri nilai uang (Asep 38.600, Lukas 63.500, Komang Rp45.600 dengan empat cara), kesalahan tabel Lukas di buku (angka 3 di kolom
// puluh ribuan, seharusnya 6) dicocokkan dengan teks PDF, persamaan di gambar, tabel nilai tempat (banyak lembar kali nilai kolom),
// geometri gambar (lembar dan keping uang, bingkai tabel, tabel cara), emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k5b1c.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { spawnSync } from "node:child_process";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k5b1c-video.ts");


let lulus = 0;
const stat = { teksPasang: 0, persamaan: 0, tabel: 0, uang: 0, angkaSuara: 0, cara: 0, kunci: 0, kutipan: 0 };
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
/* ------------------------------ Geometri umum ------------------------------ */
const bilangan = (d) => (d.match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number);
const titikJalur = (o) => {
  const d = o.d ?? "";
  if (!/^M[-\d. L]+ Z$/.test(d)) return null;
  const n = bilangan(d);
  if (n.length < 6 || n.length % 2 !== 0) return null;
  const out = [];
  for (let i = 0; i < n.length; i += 2) out.push([(o.x ?? 0) + n[i], (o.y ?? 0) + n[i + 1]]);
  return out;
};

/* ------------------------------ Kata bilangan di suara ------------------------------ */
const SATUAN = { nol: 0, satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8, sembilan: 9 };
// Nilai deretan kata bilangan (sampai 999), atau null bila bukan bilangan utuh yang sah.
const nilaiKata = (ws) => {
  let i = 0;
  let total = 0;
  const n = ws.length;
  if (n === 0) return null;
  if (ws[i] === "seratus") {
    total += 100;
    i += 1;
  } else if (i + 1 < n && ws[i] in SATUAN && ws[i + 1] === "ratus") {
    total += SATUAN[ws[i]] * 100;
    i += 2;
  }
  if (i === n) return total || null;
  if (ws[i] === "sepuluh") {
    total += 10;
    i += 1;
  } else if (ws[i] === "sebelas") {
    total += 11;
    i += 1;
  } else if (i + 1 < n && ws[i] in SATUAN && ws[i + 1] === "belas") {
    total += SATUAN[ws[i]] + 10;
    i += 2;
  } else if (i + 1 < n && ws[i] in SATUAN && ws[i + 1] === "puluh") {
    total += SATUAN[ws[i]] * 10;
    i += 2;
    if (i < n && ws[i] in SATUAN && SATUAN[ws[i]] > 0) {
      total += SATUAN[ws[i]];
      i += 1;
    }
  } else if (ws[i] in SATUAN) {
    total += SATUAN[ws[i]];
    i += 1;
  }
  return i === n ? total : null;
};
/** Semua bilangan yang diucapkan dalam kalimat suara (kata bilangan terpanjang yang sah, berhenti di tanda baca). */
const angkaSuara = (suara) => {
  const tok = suara.split(/\s+/).filter(Boolean).map((w) => ({ w: w.toLowerCase().replace(/[^a-z]/g, ""), brk: /[,.:;?!]$/.test(w) }));
  const hasil = [];
  let i = 0;
  while (i < tok.length) {
    let ketemu = false;
    for (let len = Math.min(5, tok.length - i); len >= 1; len -= 1) {
      const seg = tok.slice(i, i + len);
      if (seg.slice(0, -1).some((x) => x.brk)) continue;
      const v = nilaiKata(seg.map((x) => x.w));
      if (v !== null) {
        hasil.push(v);
        i += len;
        ketemu = true;
        break;
      }
    }
    if (!ketemu) i += 1;
  }
  return hasil;
};
sama(angkaSuara("dua puluh empat, tiga puluh enam, dan sembilan puluh enam"), [24, 36, 96], "pemeriksa kata bilangan: puluhan");
sama(angkaSuara("satu kali dua belas sama dengan dua belas"), [1, 12, 12], "pemeriksa kata bilangan: belasan");
sama(angkaSuara("Eksplorasi dua titik tiga A, empat dengan enam"), [2, 3, 4, 6], "pemeriksa kata bilangan: dipisah tanda baca dan kata lain");
/* ------------------------------ Isi dua video ------------------------------ */
const VIDEO = [V.VIDEO_MATERI_K5B1C, V.VIDEO_LUAR_K5B1C];
const digitDari = (t) => (t.match(/\d+/g) ?? []).map(Number);
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
      cek(!/[=×÷<>/%]/.test(kt.suara), `${nama}#${i + 1}: suara tanpa lambang yang sulit dibaca mesin suara`);
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
      // sinkron bilangan: tiap bilangan (kata bilangan atau angka) di suara tampak di gambar pada ketukan ini atau sebelumnya dalam adegan
      for (let p = 0; p < kata.length; p += 1) for (const o of L.keadaanStory(a, i, p)) if (o.t === "teks" && o.isi) for (const b of digitDari(o.isi)) terlihat.add(b);
      for (const b of [...angkaSuara(kt.suara), ...digitDari(kt.suara)]) {
        stat.angkaSuara += 1;
        cek(terlihat.has(b), `${nama}#${i + 1}: bilangan ${b} di suara tampak di gambar`);
      }
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
/* ------------------------------ Penolong adegan ------------------------------ */
const M = V.VIDEO_MATERI_K5B1C;
const U = V.VIDEO_LUAR_K5B1C;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const benda = (objs, id) => objs.find((o) => o.id === id);
const isiId = (objs, id) => benda(objs, id)?.isi;
const seluruhTeks = (v) => v.adegan.map((a) => [a.judul, a.sumber, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
/** Semua keadaan akhir ketukan: [video, adegan, nomor ketukan (dari nol), benda[]]. */
const semuaKeadaan = [];
for (const v of VIDEO) for (const a of v.adegan) a.ketukan.forEach((_, i) => semuaKeadaan.push([v, a, i, akhirAdegan(a, i)]));

/* ------------------------------ Data buku, dibaca dari PDF bila ada ------------------------------ */
const bs = new URL("../bahan-sd/Matematika-BS-KLS-V.pdf", import.meta.url);
const bg = new URL("../bahan-sd/Matematika-BG-KLS-V.pdf", import.meta.url);
const jalurBerkas = (u) => u.pathname.replace(/^\/([A-Za-z]:)/, "$1");
const ambilPdf = (berkas, dari, sampai) => {
  const r = spawnSync("pdftotext", ["-enc", "UTF-8", "-f", String(dari), "-l", String(sampai), "-raw", jalurBerkas(berkas), "-"], { encoding: "utf8", maxBuffer: 1 << 26 });
  return r.status === 0 ? r.stdout : null;
};
const rapikan = (t) => t.toLowerCase().replace(/-\s*\n\s*/g, "-").replace(/\s+/g, " ").trim();
const adaPdf = existsSync(bs) && existsSync(bg);
const teksBS = adaPdf ? [ambilPdf(bs, 31, 33), ambilPdf(bs, 42, 42)] : [null];
const teksBG = adaPdf ? [ambilPdf(bg, 41, 43)] : [null];
const pdfSiap = adaPdf && [...teksBS, ...teksBG].every((t) => t !== null);
if (!pdfSiap) console.log("PDF atau pdftotext tidak tersedia: pemeriksaan teks PDF dilewati");
const bukuRaw = pdfSiap ? rapikan([...teksBS, ...teksBG].join("\n")) : "";
const bsRaw = pdfSiap ? rapikan(teksBS.join("\n")) : "";

/* ------------------------------ Hitungan mandiri nilai uang ------------------------------ */
const NILAI_KOL = [10000, 1000, 100, 10, 1];
const nilaiUang = (p, r, s) => p * 10000 + r * 1000 + s * 100;
const titik = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const angkaTitik = (s) => Number(String(s).replace(/\./g, ""));
sama([nilaiUang(3, 8, 6), nilaiUang(6, 3, 5)], [38600, 63500], "uang Asep dan uang Lukas dihitung mandiri");
sama(titik(38600), "38.600", "penulisan titik ribuan");
// Semua cara Komang membayar Rp45.600 dengan paling banyak 5 lembar sepuluh ribuan, 15 lembar seribuan, dan 16 keping seratusan
const CARA = [];
for (let p = 0; p <= 5; p += 1) for (let r = 0; r <= 15; r += 1) for (let s = 0; s <= 16; s += 1) if (nilaiUang(p, r, s) === 45600) CARA.push([p, r, s]);
sama(CARA.length, 4, "uang Komang: tepat empat cara membayar Rp45.600");
sama(CARA, [[3, 14, 16], [3, 15, 6], [4, 4, 16], [4, 5, 6]], "uang Komang: keempat cara (urut p, r, s)");
cek(nilaiUang(5, 0, 0) === 50000 && 50000 > 45600, "lima lembar sepuluh ribuan (50.000) melebihi 45.600");
cek(nilaiUang(4, 3, 0) === 43000 && 45600 - 43000 === 2600 && 2600 / 100 === 26 && 26 > 16, "empat lembar sepuluh ribuan dan tiga seribuan: sisa 2.600 butuh 26 keping, melebihi 16");
cek(nilaiUang(3, 3, 5) === 33500 && nilaiUang(6, 3, 5) === 63500, "tabel Lukas di buku (3 puluh ribuan) menghasilkan 33.500, cerita (6 lembar) menghasilkan 63.500");
stat.kunci += 8;

if (pdfSiap) {
  cek(bsRaw.includes("asep mempunyai uang pecahan sepuluh ribuan sebanyak 3 lembar, seribuan sebanyak 8 lembar, dan seratusan sebanyak 6 lembar."), "buku: uang Asep 3, 8, 6");
  cek(bsRaw.includes("lukas mempunyai uang pecahan sepuluh ribuan sebanyak 6 lembar, seribuan sebanyak 3 lembar, dan seratusan sebanyak 5 lembar."), "buku: uang Lukas 6, 3, 5");
  cek(bsRaw.includes("senilai rp45.600,00") && bsRaw.includes("sepuluh ribuan sebanyak 5 lembar, seribuan sebanyak 15 lembar, dan seratusan sebanyak 16 keping"), "buku: uang Komang 5, 15, 16 untuk Rp45.600");
  cek(bsRaw.includes("komposisi uang asep puluh ribuan ribuan ratusan puluhan satuan 3 30.000 ... ... ..."), "buku: tabel Asep terisi 3 dan 30.000");
  // kesalahan buku: tabel Lukas terisi 3 di kolom puluh ribuan padahal Lukas punya 6 lembar
  cek(bsRaw.includes("komposisi uang lukas puluh ribuan ribuan ratusan puluhan satuan 3 ... 3.000 ... ... ..."), "buku: tabel Lukas terisi 3 (puluh ribuan) dan 3.000 (ribuan), 3 itu salah");
  cek(bsRaw.includes("cara 1 cara 2 cara 3 cara 4"), "buku: tabel Cara 1 sampai Cara 4");
  cek(!/cara 1 [0-9]/.test(bsRaw) && !/cara 4 [0-9]/.test(bsRaw), "buku: tabel Cara 1 sampai 4 kosong, tanpa kunci");
  cek(!/kunci jawaban/.test(rapikan(teksBG.join("\n"))), "Panduan Guru hlm. 29-31 tidak memuat kunci jawaban Eksplorasi 1.3");
  cek(bsRaw.includes("6 aku dapat menyusun/komposisi bilangan cacah sampai 100.000.") && bsRaw.includes("7 aku dapat menguraikan/dekomposisi bilangan cacah sampai 100.000."), "buku: Refleksi nomor 6 dan 7");
  stat.kunci += 8;
}

/* ------------------------------ Persamaan di gambar ------------------------------ */
{
  let n = 0;
  const lihat = new Set();
  for (const [v, a, i, objs] of semuaKeadaan) {
    for (const o of objs) {
      if (o.t !== "teks" || !o.isi) continue;
      const nama = `${v.id}/${a.id}#${i + 1}`;
      const kunci = `${v.id}/${a.id}/${o.isi}`;
      if (lihat.has(kunci)) continue;
      lihat.add(kunci);
      let g = /^([\d.]+)((?: \+ [\d.]+)+)(?: = ([\d.]+))?$/.exec(o.isi);
      if (g && g[3] !== undefined) {
        n += 1;
        const bagian = [g[1], ...g[2].split(" + ").filter(Boolean)].map(angkaTitik);
        sama(bagian.reduce((p, q) => p + q, 0), angkaTitik(g[3]), `${nama}: persamaan "${o.isi}"`);
        continue;
      }
      g = /^([\d.]+) = ([\d.]+)((?: \+ [\d.]+)+)$/.exec(o.isi);
      if (g) {
        n += 1;
        const bagian = [g[2], ...g[3].split(" + ").filter(Boolean)].map(angkaTitik);
        sama(bagian.reduce((p, q) => p + q, 0), angkaTitik(g[1]), `${nama}: uraian "${o.isi}"`);
        continue;
      }
      g = /^(\d+) (lembar|keping) ([\d.]+) = ([\d.]+)$/.exec(o.isi);
      if (g) {
        n += 1;
        sama(Number(g[1]) * angkaTitik(g[3]), angkaTitik(g[4]), `${nama}: "${o.isi}"`);
        cek((g[2] === "keping") === (g[3] === "100"), `${nama}: "${o.isi}" satuan uang sesuai (seratusan berupa keping)`);
        continue;
      }
      g = /^(\d+) lembar: ([\d.]+)(?:,.*)?$/.exec(o.isi);
      if (g && /^(4|5) lembar/.test(o.isi)) {
        n += 1;
        sama(Number(g[1]) * 10000, angkaTitik(g[2]), `${nama}: "${o.isi}"`);
        continue;
      }
      g = /^([\d.]+) lebih besar dari ([\d.]+)$/.exec(o.isi);
      if (g) {
        n += 1;
        cek(angkaTitik(g[1]) > angkaTitik(g[2]), `${nama}: "${o.isi}"`);
        continue;
      }
      g = /^(?:jumlah|uang \w+:) ([\d.]+)$/.exec(o.isi);
      if (g) {
        n += 1;
        cek([38600, 63500, 45600].includes(angkaTitik(g[1])), `${nama}: "${o.isi}" salah satu total buku`);
      }
    }
  }
  cek(n >= 20, `jumlah persamaan yang diperiksa (${n})`);
  stat.persamaan = n;
}

/* ------------------------------ Tabel nilai tempat dan tabel cara ------------------------------ */
const bacaTabel = (objs, id) => {
  const peta = new Map();
  for (const o of objs) {
    const m = new RegExp(`^${id}-v(\\d+)-(\\d+)$`).exec(o.id);
    if (m) peta.set(`${m[1]}-${m[2]}`, o);
  }
  return peta;
};
{
  const NILAI_TABEL = ["ta", "tl", "ud", "ul", "uk"];
  const CARA_TABEL = ["tc", "tt", "ot"];
  const TOTAL_TABEL = { ud: "38.600", ul: "63.500", uk: "45.600" };
  for (const [v, a, i, objs] of semuaKeadaan) {
    const nama = `${v.id}/${a.id}#${i + 1}`;
    for (const id of [...NILAI_TABEL, ...CARA_TABEL]) {
      const sel = bacaTabel(objs, id);
      for (const [kunci, o] of sel) {
        const [r, c] = kunci.split("-").map(Number);
        stat.tabel += 1;
        const bingkai = objs.find((b) => b.id === `${id}-c${r}-${c}`);
        cek(!!bingkai, `${nama}: sel ${id}-${r}-${c} punya bingkai`);
        if (bingkai) {
          hampir(o.x, bingkai.x + bingkai.w / 2, 0.15, `${nama}: isi ${id}-${r}-${c} di tengah sel`);
          cek(o.y > bingkai.y && o.y < bingkai.y + bingkai.h + 1, `${nama}: isi ${id}-${r}-${c} di dalam sel`);
        }
      }
      if (NILAI_TABEL.includes(id)) {
        for (let c = 0; c < 5; c += 1) {
          const ba = sel.get(`0-${c}`);
          const nl = sel.get(`1-${c}`);
          if (ba && nl) cek(Number(ba.isi) * NILAI_KOL[c] === angkaTitik(nl.isi), `${nama}: tabel ${id} kolom ${c + 1}: ${ba.isi} x ${NILAI_KOL[c]} = ${nl.isi}`);
        }
        const kunciTotal = TOTAL_TABEL[id];
        if (kunciTotal && [0, 1, 2, 3, 4].every((c) => sel.get(`0-${c}`))) {
          sama([0, 1, 2, 3, 4].map((c) => sel.get(`0-${c}`).isi).join(""), kunciTotal.replace(".", ""), `${nama}: angka tabel ${id} sama dengan ${kunciTotal}`);
          const hb = objs.find((b) => b.id === "hb");
          if (hb) sama(hb.isi, kunciTotal, `${nama}: judul bilangan tabel ${id}`);
        }
        if ([0, 1, 2, 3, 4].every((c) => sel.get(`1-${c}`))) {
          const jumlah = [0, 1, 2, 3, 4].reduce((s, c) => s + angkaTitik(sel.get(`1-${c}`).isi), 0);
          cek(jumlah === angkaTitik(TOTAL_TABEL[id] ?? (id === "ta" ? "38.600" : "63.500")), `${nama}: nilai tiap kolom tabel ${id} berjumlah ${jumlah}`);
        }
      }
      if (CARA_TABEL.includes(id)) {
        for (let r = 0; r < 4; r += 1) {
          if (![0, 1, 2, 3, 4].every((c) => sel.get(`${r}-${c}`))) continue;
          const baris = [0, 1, 2, 3, 4].map((c) => Number(sel.get(`${r}-${c}`).isi));
          stat.cara += 1;
          cek(nilaiUang(baris[0], baris[1], baris[2]) + baris[3] * 10 + baris[4] === 45600, `${nama}: ${id} baris ${r + 1} (${baris.join(", ")}) bernilai 45.600`);
          cek(baris[3] === 0 && baris[4] === 0 && baris[0] <= 5 && baris[1] <= 15 && baris[2] <= 16, `${nama}: ${id} baris ${r + 1} tidak melebihi uang Komang`);
        }
      }
    }
  }
  // Keadaan akhir tabel cara: tepat empat baris berbeda yang sama dengan hasil hitung mandiri
  for (const [vid, aid] of [["k5b1c-materi", "cara-komang"], ["k5b1c-luar", "luar-tukar-terapan"], ["k5b1c-luar", "luar-uang-terapan"]]) {
    const vv = vid === "k5b1c-materi" ? M : U;
    const a = adegan(vv, aid);
    const objs = akhirAdegan(a);
    const id = { "cara-komang": "tc", "luar-tukar-terapan": "tt", "luar-uang-terapan": "ot" }[aid];
    const sel = bacaTabel(objs, id);
    const baris = [0, 1, 2, 3].map((r) => [0, 1, 2].map((c) => Number(sel.get(`${r}-${c}`)?.isi)));
    sama([...baris].sort(), [...CARA].sort(), `${aid}: akhir adegan memuat keempat cara hasil hitung mandiri`);
    cek(new Set(baris.map((b) => b.join())).size === 4, `${aid}: keempat cara berbeda`);
    // label Cara 1 sampai Cara 4 di kolom kiri
    sama([0, 1, 2, 3].map((r) => objs.find((o) => o.id === `${id}-lt${r}`)?.isi), ["Cara 1", "Cara 2", "Cara 3", "Cara 4"], `${aid}: label baris`);
  }
  // Cara menukar: Cara 2 dari Cara 1 (1 ribuan jadi 10 ratusan), Cara 3 dari Cara 1 (1 puluh ribuan jadi 10 ribuan), Cara 4 dari Cara 3
  {
    const sel = bacaTabel(akhirAdegan(adegan(U, "luar-tukar-terapan")), "tt");
    const b = (r) => [0, 1, 2].map((c) => Number(sel.get(`${r}-${c}`).isi));
    sama(b(1), [b(0)[0], b(0)[1] - 1, b(0)[2] + 10], "menukar: Cara 2 = Cara 1 dengan 1 ribuan jadi 10 ratusan");
    sama(b(2), [b(0)[0] - 1, b(0)[1] + 10, b(0)[2]], "menukar: Cara 3 = Cara 1 dengan 1 puluh ribuan jadi 10 ribuan");
    sama(b(3), [b(2)[0], b(2)[1] - 1, b(2)[2] + 10], "menukar: Cara 4 = Cara 3 dengan 1 ribuan jadi 10 ratusan");
    const t = adegan(U, "luar-tukar-terapan");
    sama([isiId(akhirAdegan(t, 1), "nu"), isiId(akhirAdegan(t, 2), "nu"), isiId(akhirAdegan(t, 3), "nu")], ["1 ribuan jadi 10 ratusan: ratusan 6 jadi 16", "1 puluh ribuan jadi 10 ribuan: ribuan 5 jadi 15", "1 ribuan jadi 10 ratusan: ribuan 14, ratusan 16"], "menukar: catatan penukaran");
    cek(6 + 10 === 16 && 5 + 10 === 15 && 15 - 1 === 14, "menukar: 6 + 10 = 16, 5 + 10 = 15, 15 - 1 = 14");
  }
  stat.kunci += 10;
}

/* ------------------------------ Geometri uang: lembar dan keping ------------------------------ */
{
  const JENIS = { ap: "p", ar: "r", as: "s", lp: "p", lr: "r", ls: "s", ua: "p", ub: "r", uc: "s", ma: "p", mb: "r", mc: "s", sx: "p", sy: "r", sz: "s", fa: "s", fb: "r", fc: "p", fd: "r", xp: "p", xr: "r", xs: "s" };
  const WARNA = { p: "#C4B5FD", r: "#86EFAC", s: "#E2E8F0" };
  for (const [v, a, i, objs] of semuaKeadaan) {
    const nama = `${v.id}/${a.id}#${i + 1}`;
    const kel = new Map();
    for (const o of objs) {
      const m = /^([a-z]{2})(?:-(\d+))?$/.exec(o.id);
      if (!m || !(m[1] in JENIS) || (o.t !== "kotak" && o.t !== "bulat")) continue;
      const kunci = m[1];
      if (!kel.has(kunci)) kel.set(kunci, []);
      kel.get(kunci).push({ ...o, no: m[2] === undefined ? 0 : Number(m[2]) });
    }
    for (const [kunci, item] of kel) {
      item.sort((p, q) => p.no - q.no);
      const jenis = JENIS[kunci];
      stat.uang += item.length;
      cek(item.every((o, q) => o.no === q), `${nama}: uang ${kunci} bernomor berurutan`);
      cek(item.every((o) => o.warna === WARNA[jenis]), `${nama}: uang ${kunci} berwarna ${jenis}`);
      cek(item.every((o) => (jenis === "s" ? o.t === "bulat" && o.r === 4.4 : o.t === "kotak" && o.w === 16 && o.h === 8)), `${nama}: uang ${kunci} berukuran sesuai jenisnya`);
      const ys = item.map((o) => (o.t === "bulat" ? o.y - 4 : o.y));
      cek(ys.every((y) => y === ys[0]), `${nama}: uang ${kunci} sebaris`);
      if (item.length >= 3) cek(item.every((o, q) => q < 2 || Math.abs(o.x - item[q - 1].x - (item[1].x - item[0].x)) < 0.15), `${nama}: uang ${kunci} sama jarak`);
      if (item.length >= 2) cek(item[1].x - item[0].x >= 16.5 - 0.01, `${nama}: uang ${kunci} tidak bertumpuk`);
    }
  }
  const hitungItem = (objs, pre) => objs.filter((o) => new RegExp(`^${pre}-\\d+$`).test(o.id)).length;
  // Eksplorasi 1.3: uang Asep (ketukan 2) dan Lukas (ketukan 3)
  {
    const e = adegan(M, "eks-13-uang");
    const asep = akhirAdegan(e, 1);
    sama([hitungItem(asep, "ap"), hitungItem(asep, "ar"), hitungItem(asep, "as")], [3, 8, 6], "uang Asep: 3 lembar, 8 lembar, 6 lembar digambar");
    sama([isiId(asep, "tp"), isiId(asep, "tr"), isiId(asep, "ts")], ["10.000: 3 lembar", "1.000: 8 lembar", "100: 6 lembar"], "uang Asep: label jumlah");
    const lukas = akhirAdegan(e, 2);
    sama([hitungItem(lukas, "lp"), hitungItem(lukas, "lr"), hitungItem(lukas, "ls")], [6, 3, 5], "uang Lukas: 6, 3, 5 digambar");
    sama([isiId(lukas, "tp"), isiId(lukas, "tr"), isiId(lukas, "ts")], ["10.000: 6 lembar", "1.000: 3 lembar", "100: 5 lembar"], "uang Lukas: label jumlah");
    sama([isiId(akhirAdegan(e, 3), "sa-t1"), isiId(akhirAdegan(e, 3), "sl-t1")], ["3, 8, 6", "6, 3, 5"], "ringkasan Asep dan Lukas");
  }
  // Money Composition: uang Asep disusun dari yang terbesar
  {
    const u = adegan(U, "luar-uang");
    const asep = akhirAdegan(u, 1);
    sama([hitungItem(asep, "xp"), hitungItem(asep, "xr"), hitungItem(asep, "xs")], [3, 8, 6], "Money Composition: 3, 8, 6 uang digambar");
    sama([isiId(asep, "xtp"), isiId(asep, "xtr"), isiId(asep, "xts")], ["10.000: 3 lembar", "1.000: 8 lembar", "100: 6 keping"], "Money Composition: label");
    cek(benda(asep, "xp-0").y < benda(asep, "xr-0").y && benda(asep, "xr-0").y < benda(asep, "xs-0").y, "Money Composition: baris dari pecahan terbesar di atas");
    const nilai = akhirAdegan(u, 2);
    sama([isiId(nilai, "v1-t0"), isiId(nilai, "v2-t0"), isiId(nilai, "v3-t0"), isiId(nilai, "v4")], ["3 lembar 10.000 = 30.000", "8 lembar 1.000 = 8.000", "6 keping 100 = 600", "jumlah 38.600"], "Money Composition: nilai uang Asep");
    sama([isiId(akhirAdegan(u, 3), "w1-t0"), isiId(akhirAdegan(u, 3), "w2-t0"), isiId(akhirAdegan(u, 3), "w3-t0"), isiId(akhirAdegan(u, 3), "w4")], ["6 lembar 10.000 = 60.000", "3 lembar 1.000 = 3.000", "5 keping 100 = 500", "jumlah 63.500"], "Money Composition: nilai uang Lukas");
  }
  // Flexible Grouping: sepuluh keping seratusan = satu lembar seribuan; satu sepuluh ribuan = sepuluh seribuan
  {
    const t = adegan(U, "luar-tukar");
    const a = akhirAdegan(t, 1);
    sama([hitungItem(a, "fa"), a.some((o) => o.id === "fb"), 10 * 100, 1 * 1000], [10, true, 1000, 1000], "Flexible Grouping: 10 keping seratusan = 1 lembar seribuan");
    sama([isiId(a, "fl"), isiId(a, "fm")], ["10 keping 100", "1 lembar 1.000"], "Flexible Grouping: label ratusan dan ribuan");
    const b = akhirAdegan(t, 2);
    sama([b.some((o) => o.id === "fc"), hitungItem(b, "fd"), 10 * 1000, 1 * 10000], [true, 10, 10000, 10000], "Flexible Grouping: 1 lembar sepuluh ribuan = 10 lembar seribuan");
    sama([isiId(b, "fn"), isiId(b, "fo")], ["1 lembar 10.000", "10 lembar 1.000"], "Flexible Grouping: label sepuluh ribuan dan seribuan");
  }
  stat.kunci += 14;
}

/* ------------------------------ Isi bergambar tiap adegan, dihitung mandiri ------------------------------ */
{
  // Komposisi uang Asep dan Lukas
  const ka = akhirAdegan(adegan(M, "komposisi-asep"));
  const sa = bacaTabel(ka, "ta");
  sama([0, 1, 2, 3, 4].map((c) => sa.get(`0-${c}`).isi), ["3", "8", "6", "0", "0"], "komposisi Asep: banyak lembar");
  sama([0, 1, 2, 3, 4].map((c) => sa.get(`1-${c}`).isi), ["30.000", "8.000", "600", "0", "0"], "komposisi Asep: nilai tiap kolom");
  sama([isiId(ka, "sm"), isiId(ka, "ha-t0")], ["30.000 + 8.000 + 600 = 38.600", "uang Asep: 38.600"], "komposisi Asep: jumlah 38.600");
  const kl = adegan(M, "komposisi-lukas");
  const l0 = bacaTabel(akhirAdegan(kl, 0), "tl");
  sama([l0.get("0-0")?.isi, l0.get("1-1")?.isi, l0.get("1-0"), l0.get("0-1")], ["3", "3.000", undefined, undefined], "komposisi Lukas: tabel buku terisi 3 dan 3.000");
  cek(isiId(akhirAdegan(kl, 1), "cat") === "buku menulis 3, seharusnya 6" && isiId(akhirAdegan(kl, 1), "tl-v0-0") === "6", "komposisi Lukas: angka 3 di buku dikoreksi menjadi 6");
  const lf = bacaTabel(akhirAdegan(kl, 4), "tl");
  sama([0, 1, 2, 3, 4].map((c) => lf.get(`0-${c}`).isi), ["6", "3", "5", "0", "0"], "komposisi Lukas: banyak lembar");
  sama([0, 1, 2, 3, 4].map((c) => lf.get(`1-${c}`).isi), ["60.000", "3.000", "500", "0", "0"], "komposisi Lukas: nilai tiap kolom");
  sama([isiId(akhirAdegan(kl, 4), "sm"), isiId(akhirAdegan(kl, 4), "hl-t0")], ["60.000 + 3.000 + 500 = 63.500", "uang Lukas: 63.500"], "komposisi Lukas: jumlah 63.500");
  sama([isiId(akhirAdegan(kl, 5), "k1-t1"), isiId(akhirAdegan(kl, 5), "k2-t1")], ["38.600", "63.500"], "komposisi: dua bilangan Asep dan Lukas");
  // Ayo Berdiskusi
  const d = adegan(M, "diskusi-komang");
  const dk = akhirAdegan(d, 1);
  sama([isiId(dk, "dp2-t0"), isiId(dk, "dp2-t1"), isiId(dk, "dr2-t0"), isiId(dk, "dr2-t1"), isiId(dk, "ds2-t0"), isiId(dk, "ds2-t1")], ["10.000", "5 lembar", "1.000", "15 lembar", "100", "16 keping"], "uang Komang: 5, 15, 16");
  sama(isiId(akhirAdegan(d, 0), "dh-t0"), "harga Rp45.600", "harga peralatan Komang");
  // Cara Komang: reasoning limit lima lembar
  const c = adegan(M, "cara-komang");
  sama([isiId(akhirAdegan(c, 0), "c1-t0"), isiId(akhirAdegan(c, 0), "c1-t1"), isiId(akhirAdegan(c, 0), "c3")], ["5 lembar 10.000", "jadi 50.000", "50.000 lebih besar dari 45.600"], "cara Komang: lima lembar melebihi harga");
  sama([isiId(akhirAdegan(c, 1), "e1"), isiId(akhirAdegan(c, 1), "e2"), 45600 - 40000], ["4 lembar: 40.000", "sisa 5.600", 5600], "cara Komang: empat lembar, sisa 5.600");
  sama([2, 3, 4, 5].map((q) => isiId(akhirAdegan(c, q), "e1")), ["40.000 + 5.000 + 600 = 45.600", "40.000 + 4.000 + 1.600 = 45.600", "30.000 + 15.000 + 600 = 45.600", "30.000 + 14.000 + 1.600 = 45.600"], "cara Komang: empat jumlah");
  // Metode luar: Expanded Form
  for (const [aid, bil, ur] of [["luar-uraian", "38.600", "38.600 = 30.000 + 8.000 + 600"], ["luar-uraian-terapan", "45.600", "45.600 = 40.000 + 5.000 + 600"]]) {
    const o = akhirAdegan(adegan(U, aid));
    sama(isiId(o, "ur"), ur, `${aid}: bentuk uraian ${bil}`);
  }
  sama(isiId(akhirAdegan(adegan(U, "luar-uraian-terapan"), 2), "ur"), "63.500 = 60.000 + 3.000 + 500", "Expanded Form: uang Lukas");
  // Standard Form Return
  {
    const l = adegan(U, "luar-lazim");
    sama([isiId(akhirAdegan(l, 1), "lr"), isiId(akhirAdegan(l, 2), "ls"), isiId(akhirAdegan(l, 2), "lt")], ["30.000 + 15.000 + 600", "45.000 + 600", "45.600"], "Standard Form Return: Cara 3");
    cek(30000 + 15000 === 45000 && 45000 + 600 === 45600, "Standard Form Return: 30.000 + 15.000 = 45.000, ditambah 600 = 45.600");
    const t = adegan(U, "luar-lazim-terapan");
    sama([isiId(akhirAdegan(t, 0), "pr"), isiId(akhirAdegan(t, 1), "pu"), isiId(akhirAdegan(t, 1), "pv")], ["40.000 + 4.000 + 1.600", "44.000 + 1.600", "45.600"], "Standard Form Return: Cara 2");
    cek(40000 + 4000 === 44000 && 44000 + 1600 === 45600, "Standard Form Return: 40.000 + 4.000 = 44.000, ditambah 1.600 = 45.600");
    sama([isiId(akhirAdegan(t, 2), "pw"), isiId(akhirAdegan(t, 2), "px")], ["30.000 + 8.000 + 600", "38.600"], "Standard Form Return: uang Asep kembali 38.600");
    const q = akhirAdegan(t, 3);
    sama([isiId(q, "q2"), isiId(q, "q3"), isiId(q, "q4-t0"), nilaiUang(3, 3, 5)], ["30.000 + 3.000 + 500", "33.500", "cerita Lukas: 63.500", 33500], "Standard Form Return: tabel Lukas yang salah menghasilkan 33.500");
  }
  // Batas uang Komang
  {
    const t = adegan(U, "luar-uang-terapan");
    const o = akhirAdegan(t, 3);
    sama([isiId(o, "b1-t0"), isiId(o, "b2-t0"), isiId(o, "b3-t0"), isiId(o, "b4-t0")], ["4 lembar 10.000", "3 lembar 1.000, sisa 2.600", "perlu 26 keping 100", "Komang hanya punya 16 keping"], "batas uang Komang: butuh 26 keping, hanya 16");
    sama([isiId(akhirAdegan(t, 0), "o2-t0"), isiId(akhirAdegan(t, 0), "o3-t0"), isiId(akhirAdegan(t, 1), "o4-t0"), isiId(akhirAdegan(t, 1), "o5-t0")], ["5 lembar: 50.000, terlalu banyak", "4 lembar: 40.000, boleh", "sisa 5.600", "1.000: ada 15 lembar"], "uang Komang: sepuluh ribuan dan seribuan");
    sama([isiId(akhirAdegan(t, 2), "o7-t0"), 5600 - 5000, (5600 - 5000) / 100], ["sisa 600 = 6 keping 100", 600, 6], "uang Komang: sisa 600 = 6 keping");
  }
  // Ringkasan
  {
    const r = adegan(U, "luar-ringkas");
    sama([isiId(akhirAdegan(r, 2), "s1-t1"), isiId(akhirAdegan(r, 2), "s2-t1"), isiId(akhirAdegan(r, 2), "s3-t1")], ["38.600", "63.500", "45.600"], "ringkasan: tiga bilangan buku");
    sama(isiId(akhirAdegan(r, 4), "t1-t1"), "seharusnya 6", "ringkasan: catatan tabel Lukas");
  }
  stat.kunci += 25;
}

/* ------------------------------ Pemisahan materi dan metode luar ------------------------------ */
{
  const teksVideo = (v) => JSON.stringify(seluruhTeks(v));
  const NAMA_METODE = /Expanded Form|Flexible Grouping|Standard Form Return|Money Composition|metode luar|metode dari luar/i;
  const materi = teksVideo(M);
  const luar = teksVideo(U);
  cek(!NAMA_METODE.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of ["Expanded Form", "Flexible Grouping", "Standard Form Return", "Money Composition"]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  cek(M.adegan.every((a) => /(Buku Siswa|Panduan Guru) hlm\./.test(a.sumber)), "video materi: tiap adegan mencatat halaman buku");
  cek(U.adegan.every((a) => /metode luar|Ringkasan/i.test(a.sumber)), "video metode luar: tiap adegan bersumber metode luar atau ringkasan");
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-uraian", "luar-uraian-terapan", "luar-tukar", "luar-tukar-terapan", "luar-lazim", "luar-lazim-terapan", "luar-uang", "luar-uang-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk empat metode");
  cek(M.adegan.length === 13 && U.adegan.length === 10, "13 adegan materi dan 10 adegan metode luar");
  // Subbab C tidak membocorkan Subbab D (operasi hitung: Eksplorasi 1.4, uang Nisa untuk bakti sosial, algoritma bersusun)
  const BOCOR = /operasi hitung|penjumlahan|pengurangan|perkalian|pembagian|bakti sosial|Eksplorasi 1\.4|bersusun|algoritma|meminjam|menyimpan|57\.500|22\.000|panti asuhan|Uji Kompetensi|pengayaan|remedial|Perkiraan Dulu|Estimate First|Regrouping/i;
  const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
  for (const a of M.adegan) cek(!BOCOR.test(teksAdegan(a)), `materi ${a.id} tidak membocorkan Subbab D`);
  for (const a of U.adegan) cek(!BOCOR.test(teksAdegan(a)), `metode luar ${a.id} tidak membocorkan Subbab D`);
  // Hanya Refleksi nomor enam dan tujuh yang milik subbab ini
  cek(!/Refleksi nomor (satu|dua|tiga|empat|lima|delapan|[1-58])\b/i.test(materi + luar), "tidak memakai Refleksi nomor lain");
  cek(/nomor enam dan nomor tujuh/i.test(materi) && /Refleksi nomor 6 dan 7/.test(materi), "materi memuat Refleksi nomor 6 dan 7");
  cek(totalKetukan >= 80, `total ketukan cukup dalam (${totalKetukan})`);
}

/* ------------------------------ Kutipan buku (bila PDF tersedia) ------------------------------ */
{
  if (pdfSiap) {
    let n = 0;
    for (const a of M.adegan) {
      for (const kt of a.kutipan ?? []) {
        n += 1;
        cek(bukuRaw.includes(rapikan(kt)), `kutipan buku ${a.id}: "${kt}" ada di teks PDF`);
      }
    }
    cek(n >= 40, `jumlah kutipan buku yang diperiksa (${n})`);
    stat.kutipan = n;
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k5b1c-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|k5b1c-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k5b1c sendiri (${impor.join(", ")})`);
  }
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k5b1c.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_C51|video-k4b2-umum|naskah-k5b1/.test(pembungkus) && /VIDEO_MATERI_K5B1C/.test(pembungkus) && /VIDEO_LUAR_K5B1C/.test(pembungkus) && /export function VideoK5B1C/.test(pembungkus) && /DaftarVideoCerita/.test(pembungkus) && /keVideoSiap/.test(pembungkus), "video-k5b1c.tsx: memakai dua video Story baru, tanpa naskah lama, ekspor VideoK5B1C tetap");
  cek(!pembungkus.includes("\r"), "video-k5b1c.tsx: akhir baris LF");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${((n * 0.5) / 60).toFixed(1)} menit suara)`);
}
console.log(`Pemeriksaan: ${stat.persamaan} persamaan, ${stat.angkaSuara} bilangan suara, ${stat.tabel} sel tabel, ${stat.cara} baris cara, ${stat.uang} lembar dan keping uang, ${stat.kunci} hitungan kunci, ${stat.kutipan} kutipan, ${stat.teksPasang} pasangan teks`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
