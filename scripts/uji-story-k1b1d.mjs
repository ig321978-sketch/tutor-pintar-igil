// Uji Story Kelas 1 Bab 1 Sub-Bab D (Pasangan Bilangan): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Video diputar bergaya guru: suara, teks terlihat, sumber, judul adegan, dan subjudul tanpa penyebutan buku (kata terlarang diperiksa pada adegan yang diputar).
// Memeriksa: pemicu kata, sinkron angka suara dan gambar (bilangan yang diucapkan dengan kata tampak sebagai angka), suara tanpa digit, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas,
// teks bertumpuk, pemisahan materi dan metode luar, tidak membocorkan tambah, kurang, perbandingan, atau bilangan lebih dari sepuluh, banyak benda yang dipisah dan digabung (benda, angka hitungan,
// titik, keping bingkai) dihitung ulang dari gambar dan dicocokkan dengan kata bilangan di suara, pasangan bilangan yang menjadi bilangan utuh, emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k1b1d.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k1b1d-video.ts");
const G = await import("../src/components/modul/story/k1b1d-gambar.ts");
const U1 = await import("../src/components/modul/story/k1b1d-luar-1.ts");

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

/* ------------------------------ Isi dua video ------------------------------ */
const VIDEO = [V.VIDEO_MATERI_K1B1D, V.VIDEO_LUAR_K1B1D];
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
      cek(!/\d/.test(kt.suara), `${nama}#${i + 1}: suara tanpa digit (angka ditulis dengan kata)`);
      cek(kt.aksi.length >= 1, `${nama}#${i + 1}: ada aksi gambar`);
      for (const ak of kt.aksi) {
        const p = L.posisiKata(kt.suara, ak.at);
        cek(p >= 0, `${nama}#${i + 1}: pemicu "${ak.at}" ditemukan dalam kalimat`);
        if (typeof ak.at === "number") cek(ak.at >= 0 && ak.at < kata.length, `${nama}#${i + 1}: pemicu angka ${ak.at} dalam batas`);
      }
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
      for (let p = 0; p < kata.length; p += 1) for (const o of L.keadaanStory(a, i, p)) if (o.t === "teks" && o.isi) for (const b of bilanganDari(o.isi)) terlihat.add(b);
      for (const b of bilanganDari(kt.suara)) cek(terlihat.has(b), `${nama}#${i + 1}: bilangan ${b} di suara tampak di gambar`);
      const titikAksi = [...new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at)))].sort((m, n) => m - n);
      if (titikAksi.length >= 2) {
        const sid = titikAksi.map((p) => L.sidikKeadaan(L.keadaanStory(a, i, p)));
        cek(new Set(sid).size >= 2, `${nama}#${i + 1}: gambar berubah mengikuti kata dalam kalimat`);
      }
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
          else {
            // Angka tulisan tangan (kurva): titik-titik pada lintasan harus masuk kanvas.
            const n = bilangan(o.d ?? "");
            const px = n.filter((_, q) => q % 2 === 0).map((q) => x + q);
            const py = n.filter((_, q) => q % 2 === 1).map((q) => y + q);
            cek(px.every((p) => p > -2 && p < 302) && py.every((p) => p > -2 && p < 204), `${nama}#${i + 1}: angka tulisan ${o.id} masuk kanvas`);
          }
        } else if (o.t === "garis" || o.t === "panah") cek(x > -2 && x < 302 && y > -2 && y < 204 && x + (o.x2 ?? 0) > -2 && x + (o.x2 ?? 0) < 302 && y + (o.y2 ?? 0) > -2 && y + (o.y2 ?? 0) < 204, `${nama}#${i + 1}: garis ${o.id} masuk kanvas`);
      }
      {
        const teksAda = akhir.filter((o) => o.t === "teks" && (o.op ?? 1) > 0 && o.isi && !/^[\u{1F000}-\u{1FFFF}]|^[✂✅❌]$/u.test(o.isi));
        for (let p = 0; p < teksAda.length; p += 1) {
          for (let q = p + 1; q < teksAda.length; q += 1) {
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
const M_VIDEO = V.VIDEO_MATERI_K1B1D;
const U = V.VIDEO_LUAR_K1B1D;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const NAMA_LUAR = /CPA|SMICPA|SMISCPA|Benda Nyata Dulu|Gambar Representasi|Simbol Matematika|Bruner|metode luar|metode dari luar/i;
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M_VIDEO);
  const luar = teksVideo(U);
  cek(!NAMA_LUAR.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE, ["CPA / SMISCPA Concrete", "CPA Pictorial", "CPA Abstract"], "nama metode di berkas luar-1");
  sama(U1.NAMA_METODE_ID, ["Benda Nyata Dulu", "Gambar Representasi", "Simbol Matematika"], "nama Indonesia metode luar");
  // Video diputar sebagai guru yang mengajar: tidak ada penyebutan sumber buku di suara, teks terlihat, label sumber, judul adegan, dan subjudul.
  const TERLARANG = /buku|panduan guru|hlm|halaman|kunci|rubrik|salah ketik|salah cetak|tambahan video|contoh video|temuan|pertemuan/i;
  for (const v of [M_VIDEO, U]) {
    cek(!TERLARANG.test(`${v.judul} ${v.subjudul}`), `${v.id}: judul dan subjudul video tanpa kata terlarang`);
    cek(!/nomor|no\./i.test(v.subjudul) && v.subjudul.length <= 40, `${v.id}: subjudul pendek tanpa nomor halaman`);
    for (const a of v.adegan) {
      const semua = [a.judul, a.sumber];
      a.ketukan.forEach((kt, i) => {
        semua.push(kt.suara);
        for (let p = 0; p < L.kataDari(kt.suara).length; p += 1) semua.push(...L.teksTerlihat(L.keadaanStory(a, i, p)));
      });
      const kena = semua.filter((t) => TERLARANG.test(t) || /soal nomor|Latihan 3\.[1-4]|nomor [1-9]|catatan video|menurut buku/i.test(t));
      cek(kena.length === 0, `${v.id}/${a.id}: tanpa penyebutan buku atau catatan sumber (${kena.slice(0, 2).join(" | ")})`);
      cek(!/Uji Kompetensi|Pengayaan|Ayo Berlatih|Ayo Berdiskusi|Ayo Berefleksi|Ayo Mengingat|Ayo Berkomunikasi|Ayo Berpikir|Ayo Berkarya|soal \d|Soal \d|Eksplorasi|Refleksi/.test(semua.join(" | ")), `${v.id}/${a.id}: latihan disajikan sebagai Latihan, tanpa istilah buku`);
    }
  }
  cek(M_VIDEO.subjudul === "Materi kurikulum" && U.subjudul === "Tiga metode luar", "subjudul video: Materi kurikulum dan Tiga metode luar");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 46), "video materi: label sumber berbentuk Materi: ... dan pendek");
  cek(U.adegan.every((a) => /Metode luar|Ringkasan/i.test(a.sumber) && a.sumber.length <= 46), "video metode luar: label sumber metode luar atau ringkasan, pendek");
  cek(M_VIDEO.id === "k1b1d-materi" && U.id === "k1b1d-luar", "id video k1b1d-materi dan k1b1d-luar");
  cek(U.judul.endsWith(": Metode dari Luar") && !/menurut/i.test(M_VIDEO.judul), "judul video: materi tanpa 'menurut', luar berakhir ': Metode dari Luar'");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,cerita-taman,kue-kira,bagian-utuh,gabung-bola,ikatan-tujuh,mobil-upe,pasangan-enam,pohon-pasangan,pasangan-lima-tujuh,bingkai-sepuluh,pasangan-sepuluh,sembilan-kue,latihan-satu,latihan-dua,latihan-tiga,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-konkret,luar-konkret-terapan,luar-gambar,luar-gambar-terapan,luar-simbol,luar-simbol-terapan,luar-ringkas", "urutan adegan metode luar");
  cek(M_VIDEO.adegan[0].id === "sapaan" && U.adegan[0].id === "sapaan", "tiap video dibuka adegan sapaan");
  cek(M_VIDEO.adegan.filter((a) => /^latihan-/.test(a.id)).length === 3 && M_VIDEO.adegan[M_VIDEO.adegan.length - 1].id === "penutup", "video materi: Latihan 1 sampai 3 lalu penutup");
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-konkret", "luar-konkret-terapan", "luar-gambar", "luar-gambar-terapan", "luar-simbol", "luar-simbol-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(U.adegan[1].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  for (const kata of ["Latihan", "Igil", "Malosi", "Kira", "Upe", "Wei", "bagian", "utuh", "pasangan", "gabung", "pisah"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  // Hanya bilangan sampai sepuluh: tanpa tambah, kurang, banding, atau bilangan lebih dari sepuluh.
  const BOCOR = /tambah|kurang|lebih (banyak|besar|sedikit|kecil)|bandingkan|membandingkan|\bbelas\b|\bpuluh\b|\bratus\b|\bribu\b|sebelas|dua belas|operasi|hasil bagi|dikali/i;
  for (const v of [M_VIDEO, U]) {
    for (const a of v.adegan) cek(!BOCOR.test(teksAdegan(a)), `${v.id}/${a.id}: hanya bilangan sampai sepuluh, tanpa tambah, kurang, banding, atau bilangan lebih dari sepuluh`);
    for (const a of v.adegan) for (const i of a.ketukan.keys()) for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) for (const b of bilanganDari(t)) cek(Number(b) <= 10, `${v.id}/${a.id}#${i + 1}: angka di gambar paling besar sepuluh ("${t}")`);
  }
  cek(totalKetukan >= 70, `total ketukan cukup dalam (${totalKetukan})`);
  // Durasi materi diputar 8 sampai 13 menit (dua kata per detik, sapaan termasuk).
  const kataMateri = kataVideo(M_VIDEO);
  cek(kataMateri / 120 >= 8 && kataMateri / 120 <= 13, `durasi materi diputar 8 sampai 13 menit (${(kataMateri / 120).toFixed(1)} menit)`);
  cek(kataVideo(U) / 120 >= 3, `durasi video luar paling sedikit 3 menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
}

/* ------------------------------ Bilangan yang diucapkan dengan kata tampak sebagai angka ------------------------------ */
const NAMA_ANGKA = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh"];
for (const v of VIDEO) {
  for (const a of v.adegan) {
    const terlihat = new Set();
    a.ketukan.forEach((kt, i) => {
      for (let p = 0; p < L.kataDari(kt.suara).length; p += 1) for (const o of L.keadaanStory(a, i, p)) if (o.t === "teks" && o.isi) for (const b of bilanganDari(o.isi)) terlihat.add(b);
      if (L.kataDari(kt.suara).some((w) => w.toLowerCase().replace(/[^a-z]/g, "") === "sepuluh")) cek(terlihat.has("10"), `${v.id}/${a.id}#${i + 1}: "sepuluh" tampak sebagai angka 10 di gambar`);
    });
  }
}

/* ------------------------------ Banyak benda dihitung ulang dari gambar ------------------------------ */
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
const hitungBenda = (objs, awalan) => objs.filter((o) => new RegExp(`^${awalan}\\d+$`).test(o.id)).length;
const kataSuara = (kt) => L.kataDari(kt.suara).map((w) => w.toLowerCase().replace(/[^a-z]/g, ""));
let stat = { hitung: 0, pasang: 0, kelompok: 0 };
const W = G.W;
{

  // 1) Semua deret hitungan (angka hitungan `${id}n{i}` di atas benda `${id}{i}`): angka berurutan 1 sampai m dan sesuai kata bilangan yang diucapkan berurutan.
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((kt, i) => {
        const objs = akhirAdegan(a, i);
        const awalanSemua = new Set(objs.map((o) => /^([a-z]+)n0$/.exec(o.id)?.[1]).filter(Boolean));
        for (const p of awalanSemua) {
          const label = objs.filter((o) => new RegExp(`^${p}n\\d+$`).test(o.id));
          const nBenda = hitungBenda(objs, p);
          if (nBenda === 0) continue;
          stat.hitung += 1;
          const nama = `${v.id}/${a.id}#${i + 1} hitungan ${p}`;
          cek(label.length <= nBenda, `${nama}: angka hitungan tidak lebih banyak dari benda`);
          // angka hitungan ada di atas benda yang sama (x pusat benda sama dengan x angka)
          label.forEach((lb, q) => {
            const b = ketemu(objs, `${p}${q}`);
            const pusat = b.t === "kotak" ? b.x + b.w / 2 : b.x;
            cek(Math.abs(pusat - lb.x) < 1 && lb.y < (b.t === "kotak" ? b.y : b.y - (b.r ?? 0)), `${nama}: angka ${q + 1} tepat di atas benda ke-${q + 1}`);
          });
          // bila kata bilangan berurutan satu, dua, ... diucapkan di ketukan ini, angka terakhir yang tampak sama dengan kata bilangan terakhir dalam deret
          const kata = kataSuara(kt);
          const posSatu = kata.indexOf("satu");
          const labelBaru = kt.aksi.some((ak) => ak.tambah && [].concat(ak.tambah).some((o) => new RegExp("^" + p + "n\\d+$").test(o.id)));
          if (posSatu >= 0 && labelBaru) {
            let n = 0;
            while (posSatu + n < kata.length && n + 1 < NAMA_ANGKA.length && kata[posSatu + n] === NAMA_ANGKA[n + 1]) n += 1;
            cek(n >= 1, `${nama}: deret kata dimulai dari satu`);
            cek(label.length === n, `${nama}: banyak angka hitungan (${label.length}) sama dengan banyak kata bilangan berurutan (${n})`);
          }
        }
      });
    }
  }
  // 2) Tulisan "a dan b jadi c" dan "c jadi a dan b" yang tampil di gambar selalu benar.
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((kt, i) => {
        for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) {
          let m = /^(\d+) dan (\d+) jadi (\d+)$/.exec(t);
          if (m) {
            stat.pasang += 1;
            cek(Number(m[1]) + Number(m[2]) === Number(m[3]), `${v.id}/${a.id}#${i + 1}: "${t}" benar`);
          }
          m = /^(\d+) jadi (\d+) dan (\d+)$/.exec(t);
          if (m) {
            stat.pasang += 1;
            cek(Number(m[1]) === Number(m[2]) + Number(m[3]), `${v.id}/${a.id}#${i + 1}: "${t}" benar`);
          }
          m = /^(\d+) dan (\d+)$/.exec(t);
          if (m) stat.pasang += 1;
        }
      });
    }
  }
  const cari = (id) => adegan(M_VIDEO, id) ?? adegan(U, id);
  const di = (id, ke) => akhirAdegan(cari(id), ke);
  const warnaTitik = (objs, p) => objs.filter((o) => new RegExp(`^${p}\\d+$`).test(o.id)).map((o) => o.warna);
  const banyak = (objs, p, n, nama) => sama(hitungBenda(objs, p), n, `${nama}: ${n} benda berawalan ${p}`);
  const dalamKotak = (objs, b, kotakId) => {
    const kt = ketemu(objs, kotakId);
    return b.x > kt.x && b.x < kt.x + kt.w && b.y > kt.y && b.y < kt.y + kt.h;
  };
  // Lima kue Kira: dua donat dan tiga bolu; dipisah ke dua piring; digabung lagi.
  {
    const a = di("kue-kira", 0);
    banyak(a, "kue", 5, "kue Kira");
    sama([0, 1, 2, 3, 4].map((i) => ketemu(a, `kue${i}`).isi === "\u{1F369}"), [true, true, false, false, false], "dua donat dan tiga kue bolu");
    const b = di("kue-kira", 4);
    const kiri = [0, 1, 2, 3, 4].filter((i) => Math.hypot(ketemu(b, `kue${i}`).x - ketemu(b, "pl").x, ketemu(b, `kue${i}`).y - ketemu(b, "pl").y) < ketemu(b, "pl").r);
    const kanan = [0, 1, 2, 3, 4].filter((i) => Math.hypot(ketemu(b, `kue${i}`).x - ketemu(b, "pr").x, ketemu(b, `kue${i}`).y - ketemu(b, "pr").y) < ketemu(b, "pr").r);
    sama([kiri.join(), kanan.join(), isiTeks(b, "l2"), isiTeks(b, "l3")], ["0,1", "2,3,4", "2", "3"], "kue Kira: dua di piring kiri, tiga di piring kanan");
    const c = di("kue-kira", 6);
    sama([isiTeks(c, "k6-t0"), [0, 1, 2, 3, 4].every((i) => ketemu(c, `kue${i}`).y < 100)], ["2 dan 3 jadi 5", true], "kue Kira: digabung lagi menjadi lima");
    stat.kelompok += 3;
  }
  // Ikatan lima, dua, tiga; tujuh, tiga, empat.
  {
    const o = di("bagian-utuh", 5);
    sama([isiTeks(o, "ik-ut"), isiTeks(o, "ik-at"), isiTeks(o, "ik-bt")], ["5", "2", "3"], "ikatan bagian dan utuh: 5, 2, 3");
    const t = di("ikatan-tujuh", 4);
    sama([isiTeks(t, "it-ut"), isiTeks(t, "it-at"), isiTeks(t, "it-bt")], ["7", "3", "4"], "ikatan tujuh: 7, 3, 4");
    stat.kelompok += 2;
  }
  // Bola Upe dan Wei: tiga hijau, empat merah, semua di keranjang.
  {
    const a = di("gabung-bola", 1);
    sama([hitungBenda(a, "bh"), hitungBenda(a, "br"), warnaTitik(a, "bh").every((w) => w === W.hijau), warnaTitik(a, "br").every((w) => w === W.merah)], [3, 4, true, true], "bola Upe tiga hijau dan bola Wei empat merah");
    const b = di("gabung-bola", 3);
    const dalam = b.filter((o) => /^(bh|br)\d+$/.test(o.id) && dalamKotak(b, o, "kb")).length;
    sama([dalam, isiTeks(b, "gk-t0")], [7, "3 dan 4 jadi satu"], "bola digabung: tujuh di keranjang");
    stat.kelompok += 2;
  }
  // Delapan mobil: garis pemisah membagi a dan b mobil sesuai angka di bawahnya.
  {
    sama(hitungBenda(di("mobil-upe", 0), "mb"), 8, "delapan mobil");
    const hasil = [];
    for (const [ke, a, b] of [[2, 3, 5], [3, 2, 6], [4, 1, 7], [5, 4, 4]]) {
      const o = di("mobil-upe", ke);
      const dv = ketemu(o, "dv");
      const mobil = o.filter((x) => /^mb\d+$/.test(x.id));
      hasil.push([mobil.filter((m) => m.x < dv.x).length, mobil.filter((m) => m.x > dv.x).length, isiTeks(o, "tl"), isiTeks(o, "tr")].join());
      cek(a + b === 8, `mobil: ${a} dan ${b} jadi delapan`);
    }
    sama(hasil, ["3,5,3,5", "2,6,2,6", "1,7,1,7", "4,4,4,4"], "mobil: pasangan delapan sesuai garis pemisah");
    sama([isiTeks(di("mobil-upe", 5), "p1"), isiTeks(di("mobil-upe", 5), "p4")], ["3 dan 5", "4 dan 4"], "daftar pasangan delapan");
    stat.kelompok += 2;
  }
  // Enam kancing: biru sebanyak angka pertama.
  {
    sama(hitungBenda(di("pasangan-enam", 0), "kc"), 6, "enam kancing");
    for (const [ke, a, b] of [[1, 1, 5], [2, 2, 4], [3, 3, 3], [4, 4, 2]]) {
      const o = di("pasangan-enam", ke);
      const w = warnaTitik(o, "kc");
      sama([w.filter((c) => c === "#38BDF8").length, w.filter((c) => c === "#FACC15").length, isiTeks(o, "pe")], [a, b, `${a} dan ${b}`], `kancing: ${a} dan ${b}`);
    }
    stat.kelompok += 4;
  }
  // Pohon pasangan: delapan = lima + tiga; lima = dua + tiga; tiga = dua + satu; kelereng dipisah lima dan tiga.
  {
    const p = di("pohon-pasangan", 0);
    banyak(p, "kl", 8, "kelereng Malosi");
    const q = di("pohon-pasangan", 1);
    const dv = ketemu(q, "dv");
    sama([q.filter((o) => /^kl\d+$/.test(o.id) && o.x < dv.x).length, q.filter((o) => /^kl\d+$/.test(o.id) && o.x > dv.x).length], [5, 3], "kelereng dipisah lima dan tiga");
    const t = di("pohon-pasangan", 6);
    const n = (id) => Number(isiTeks(t, `${id}t`));
    sama([n("t8") === n("t5") + n("t3"), n("t5") === n("t2a") + n("t3a"), n("t3") === n("t2b") + n("t1b"), n("t8")], [true, true, true, 8], "pohon pasangan dua tingkat benar");
    stat.kelompok += 3;
  }
  // Pasangan lima dan tujuh: titik dua warna dan tulisan "a dan b".
  {
    const titikPasang = (id, ke, p, label, a, b) => {
      const o = di(id, ke);
      const w = warnaTitik(o, p);
      sama([w.filter((c) => c === W.biru).length, w.filter((c) => c === W.merah).length, isiTeks(o, label)], [a, b, `${a} dan ${b}`], `${id}: ${a} dan ${b} (${p})`);
      stat.kelompok += 1;
    };
    titikPasang("pasangan-lima-tujuh", 0, "qa", "qat", 1, 4);
    titikPasang("pasangan-lima-tujuh", 1, "qb", "qbt", 2, 3);
    titikPasang("pasangan-lima-tujuh", 3, "qc", "qct", 2, 5);
    titikPasang("pasangan-lima-tujuh", 4, "qd", "qdt", 3, 4);
    titikPasang("latihan-tiga", 0, "ma", "na", 3, 4);
    titikPasang("latihan-tiga", 0, "mb", "nb", 2, 5);
    titikPasang("latihan-tiga", 0, "mc", "nc", 1, 5);
    const lt = di("latihan-tiga", 0);
    sama([hitungBenda(lt, "ma"), hitungBenda(lt, "mb"), hitungBenda(lt, "mc")], [7, 7, 6], "Latihan 3: tujuh, tujuh, dan enam titik");
  }
  // Bingkai sepuluh: sepuluh sel, enam kuning, empat biru.
  {
    const o = di("bingkai-sepuluh", 4);
    sama([o.filter((x) => /^bf-c\d+$/.test(x.id)).length, hitungBenda(o, "ky"), hitungBenda(o, "bi"), isiTeks(o, "s10")], [10, 6, 4, "10"], "bingkai sepuluh: 10 sel, 6 kuning, 4 biru");
    sama([warnaTitik(o, "ky").every((w) => w === "#FACC15"), warnaTitik(o, "bi").every((w) => w === "#38BDF8")], [true, true], "keping kuning dan biru berwarna benar");
    // keping muncul satu per satu mengikuti kata bilangan
    const a3 = adegan(M_VIDEO, "bingkai-sepuluh").ketukan[2];
    const ke6 = L.kataDari(a3.suara).length - 1;
    const objs = L.keadaanStory(adegan(M_VIDEO, "bingkai-sepuluh"), 2, ke6);
    sama(hitungBenda(objs, "ky"), 6, "enam keping kuning sudah ada saat kata enam");
    const sebelum = L.keadaanStory(adegan(M_VIDEO, "bingkai-sepuluh"), 2, L.posisiKata(a3.suara, "empat"));
    cek(hitungBenda(sebelum, "ky") < 6, "keping bertambah satu per satu mengikuti hitungan");
    stat.kelompok += 1;
  }
  // Semua pasangan sepuluh: keping kuning sebanyak angka pertama, daftar lima pasangan.
  {
    sama(hitungBenda(di("pasangan-sepuluh", 0), "pd"), 10, "sepuluh keping");
    for (const [ke, a, b] of [[1, 1, 9], [2, 2, 8], [3, 3, 7], [4, 4, 6], [5, 5, 5]]) {
      const o = di("pasangan-sepuluh", ke);
      const w = warnaTitik(o, "pd");
      sama([w.filter((c) => c === "#FACC15").length, w.filter((c) => c === "#38BDF8").length, isiTeks(o, "pe")], [a, b, `${a} dan ${b}`], `pasangan sepuluh: ${a} dan ${b}`);
      stat.kelompok += 1;
    }
    const z = di("pasangan-sepuluh", 6);
    sama([0, 1, 2, 3, 4].map((i) => isiTeks(z, `dl${i}`)), ["1 dan 9", "2 dan 8", "3 dan 7", "4 dan 6", "5 dan 5"], "daftar lima pasangan sepuluh");
  }
  // Sembilan kue mangkuk: enam di piring kiri, tiga di piring kanan.
  {
    banyak(di("sembilan-kue", 0), "km", 9, "kue mangkuk");
    const o = di("sembilan-kue", 3);
    const kue = o.filter((x) => /^km\d+$/.test(x.id));
    sama([kue.filter((c) => dalamKotak(o, c, "pk1")).length, kue.filter((c) => dalamKotak(o, c, "pk2")).length, isiTeks(o, "u6"), isiTeks(o, "u3")], [6, 3, "6", "3"], "kue mangkuk: enam di kiri, tiga di kanan");
    stat.kelompok += 1;
  }
  // Latihan 1: dua dan lima layang-layang; Latihan 2: empat kuning dan enam biru.
  {
    const o = di("latihan-satu", 0);
    sama([hitungBenda(o, "ly"), ketemu(o, "ly1").x < 100, ketemu(o, "ly2").x > 100], [7, true, true], "Latihan 1: dua layang-layang Kira dan lima milik Upe");
    const l = di("latihan-dua", 1);
    sama([hitungBenda(l, "lk"), hitungBenda(l, "lb"), l.filter((x) => /^lf-c\d+$/.test(x.id)).length], [4, 6, 10], "Latihan 2: empat kuning, enam biru, sepuluh sel");
    sama(isiTeks(di("latihan-dua", 2), "m3-t0"), "4 dan 6 jadi 10", "Latihan 2: jawaban");
    stat.kelompok += 2;
  }
  // Metode luar 1: enam kelereng ke dua mangkuk.
  {
    const a = adegan(U, "luar-konkret-terapan");
    banyak(akhirAdegan(a, 0), "ke", 6, "kelereng metode luar");
    for (const [ke, p, q] of [[3, 2, 4], [4, 3, 3]]) {
      const o = akhirAdegan(a, ke);
      const kel = o.filter((x) => /^ke\d+$/.test(x.id));
      sama([kel.filter((c) => dalamKotak(o, c, "mk1")).length, kel.filter((c) => dalamKotak(o, c, "mk2")).length, isiTeks(o, "a2"), isiTeks(o, "a4")], [p, q, String(p), String(q)], `kelereng: ${p} dan ${q}`);
    }
    // metode luar 2: sepuluh bulatan, enam biru dan empat kuning, ikatan sepuluh enam empat; metode luar 3: lima pasangan sepuluh.
    const g = akhirAdegan(adegan(U, "luar-gambar"), 1);
    banyak(g, "gd", 5, "bulatan gambar");
    const gi = akhirAdegan(adegan(U, "luar-gambar"), 2);
    sama([isiTeks(gi, "gi-ut"), isiTeks(gi, "gi-at"), isiTeks(gi, "gi-bt")], ["5", "2", "3"], "metode gambar: ikatan 5, 2, 3");
    const t = akhirAdegan(adegan(U, "luar-gambar-terapan"), 3);
    const w = warnaTitik(t, "pg");
    sama([w.length, w.filter((c) => c === "#38BDF8").length, w.filter((c) => c === "#FACC15").length, isiTeks(t, "pk-ut"), isiTeks(t, "pk-at"), isiTeks(t, "pk-bt")], [10, 6, 4, "10", "6", "4"], "metode gambar terapan: sepuluh bulatan, ikatan 10, 6, 4");
    const s = akhirAdegan(adegan(U, "luar-simbol-terapan"), 3);
    const pas = [0, 1, 2, 3, 4].map((i) => isiTeks(s, `sp${i}`).split(" dan ").map(Number));
    cek(pas.every(([x, y]) => x + y === 10) && new Set(pas.map((q) => q.join())).size === 5, "metode simbol: lima pasangan sepuluh yang berbeda");
    stat.kelompok += 4;
  }
}

/* ------------------------------ Sapaan dan peta susun ------------------------------ */
{
  const sap = adegan(M_VIDEO, "sapaan");
  const DAFTAR = ["Memisahkan satu bilangan", "Menggabungkan dua bagian", "Mencari pasangan bilangan"];
  cek(/Halo anak-anak/.test(sap.ketukan[0].suara) && /Memisahkan satu bilangan/i.test(L.teksTerlihat(akhirAdegan(sap, 1)).join(" | ")), "sapaan materi: tiga hal yang dipelajari tampil");
  sama(L.teksTerlihat(akhirAdegan(sap, 1)).filter((t) => DAFTAR.includes(t)), DAFTAR, "sapaan materi: daftar tiga hal");
  cek(!/\d/.test(sap.ketukan[1].suara), "sapaan materi: tanpa angka");
  cek(!/sepuluh|sebelas|belas|puluh/i.test(sap.ketukan.map((kt) => kt.suara).join(" ")), "sapaan: topik tanpa kata bilangan sepuluh atau lebih");
  if (true) {
    const A = JSON.parse(readFileSync(new URL("../src/data/kelas1-bab1-ringkas.json", import.meta.url), "utf8")).subBab.D;
    const peta = A.petaSusun.simpul;
    const anak = (id) => peta.filter((s) => s.induk === id).map((s) => s.teks);
    const akar = peta.filter((s) => s.induk === null);
    cek(akar.length === 3, "peta susun: tiga cabang dari pusat");
    sama(anak(akar[0].id), DAFTAR, "peta susun: cabang pertama sama dengan daftar sapaan");
    sama([anak(akar[1].id).length, anak(akar[2].id).length, peta.length], [3, 2, 11], "peta susun: 3 cara, 2 hasil, 11 simpul");
    cek(peta.every((s) => s.teks.length <= 28) && new Set(peta.map((s) => s.teks)).size === peta.length, "peta susun: teks <= 28 huruf dan unik");
    cek(!/\d/.test(A.petaSusun.pusat.suara) && !/\d/.test(A.petaSusun.petunjuk) && peta.every((s) => !/\d/.test(s.petunjuk ?? "")), "peta susun: suara dan petunjuk tanpa digit");
    const T = A.tabelSusun;
    cek(T.baris.length >= 3 && T.baris.length <= 5 && T.kolom.length >= 3 && T.kolom.length <= 4, "tabel susun: 3 sampai 5 baris dan 3 sampai 4 kolom");
    cek(T.baris.every((b) => b.sel.every((s) => s.length <= 26 && (s.match(/\d+/g) ?? []).length <= 1)), "tabel susun: sel <= 26 huruf dan paling banyak satu angka per sel");
    cek(T.baris.every((b) => b.label.split(/\s+/).every((w) => w.length <= 8)), "tabel susun: kata terpanjang kolom label <= 8 huruf");
    cek(!/\d/.test(T.suara) && !/\d/.test(T.petunjuk), "tabel susun: suara dan petunjuk tanpa digit");
    cek(!/buku|halaman|kunci/i.test(JSON.stringify(A)), "peta dan tabel susun: tanpa kata terlarang");
  } else cek(false, "peta dan tabel susun: .tmp-k1b1as/D.json ada");
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k1b1d-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k1b1d-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k1b1d sendiri (${impor.join(", ")})`);
  }
  // Emoji dalam data teks gambar juga paling tinggi Emoji 12 (diperiksa pada gambar yang diputar).
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d), `${v.id}/${a.id}: emoji gambar paling tinggi Emoji 12`);
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k1b1d.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|naskah-k1b1/.test(pembungkus) && /VIDEO_MATERI_K1B1D/.test(pembungkus) && /VIDEO_LUAR_K1B1D/.test(pembungkus) && /export function VideoK1B1D/.test(pembungkus) && /daftar-video-cerita/.test(pembungkus), "video-k1b1d.tsx: dua video dari mesin Story, tanpa naskah lama");
  cek(!/\r/.test(pembungkus), "video-k1b1d.tsx: akhir baris LF");
  const sendiri = readFileSync(new URL("uji-story-k1b1d.mjs", import.meta.url), "utf8");
  cek(!/\r/.test(sendiri), "uji-story-k1b1d.mjs: akhir baris LF");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit diputar)`);
}
console.log(`Pemeriksaan: ${stat.hitung} deret hitungan, ${stat.pasang} tulisan pasangan, ${stat.kelompok} kelompok benda`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
