// Uji Story Kelas 1 Bab 1 Sub-Bab B (Membandingkan Banyak Benda): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Video diputar bergaya guru: suara, teks terlihat, sumber, judul adegan, dan subjudul tanpa penyebutan buku (kata terlarang diperiksa pada adegan yang diputar).
// Memeriksa: pemicu kata, sinkron angka suara dan gambar (bilangan yang diucapkan dengan kata tampak sebagai angka), suara tanpa digit, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas,
// teks bertumpuk, pemisahan materi dan metode luar, tidak membocorkan tambah, kurang, atau bilangan lebih dari sepuluh, banyak benda yang dibandingkan (kelompok, pasangan, sisa, bingkai, garis bilangan)
// dihitung ulang dari gambar dan dicocokkan dengan kata bilangan di suara, angka tulisan tangan, emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k1b1b.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k1b1b-video.ts");
const U1 = await import("../src/components/modul/story/k1b1b-luar-1.ts");

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
const VIDEO = [V.VIDEO_MATERI_K1B1B, V.VIDEO_LUAR_K1B1B];
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
const M_VIDEO = V.VIDEO_MATERI_K1B1B;
const U = V.VIDEO_LUAR_K1B1B;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const NAMA_LUAR = /Number Names|Ten Frame|Number Line|Nama Bilangan|Bingkai Sepuluh|Garis Bilangan|metode luar|metode dari luar/i;
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M_VIDEO);
  const luar = teksVideo(U);
  cek(!NAMA_LUAR.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE, ["Number Names", "Ten Frame", "Number Line Mini"], "nama metode di berkas luar-1");
  sama(U1.NAMA_METODE_ID, ["Nama Bilangan", "Bingkai Sepuluh", "Garis Bilangan Kecil"], "nama Indonesia metode luar");
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
      cek(!/Uji Kompetensi|Pengayaan|Ayo Berlatih|Ayo Berdiskusi|Ayo Berefleksi|Ayo Mengingat|Ayo Berkomunikasi|Ayo Berpikir|soal \d|Soal \d|Eksplorasi|Refleksi/.test(semua.join(" | ")), `${v.id}/${a.id}: latihan disajikan sebagai Latihan, tanpa istilah buku`);
    }
  }
  cek(M_VIDEO.subjudul === "Materi kurikulum" && U.subjudul === "Tiga metode luar", "subjudul video: Materi kurikulum dan Tiga metode luar");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 46), "video materi: label sumber berbentuk Materi: ... dan pendek");
  cek(U.adegan.every((a) => /Metode luar|Ringkasan/i.test(a.sumber) && a.sumber.length <= 46), "video metode luar: label sumber metode luar atau ringkasan, pendek");
  cek(M_VIDEO.id === "k1b1b-materi" && U.id === "k1b1b-luar", "id video k1b1b-materi dan k1b1b-luar");
  cek(U.judul.endsWith(": Metode dari Luar") && !/menurut/i.test(M_VIDEO.judul), "judul video: materi tanpa 'menurut', luar berakhir ': Metode dari Luar'");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,cerita-taman,pasangkan,lebih-banyak,lebih-sedikit,tertipu,tanda-banyak,tanda-sedikit,tanda-sama,nol,latihan-satu,latihan-dua,latihan-tiga,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-nama,luar-nama-terapan,luar-bingkai,luar-bingkai-terapan,luar-garis,luar-garis-terapan,luar-ringkas", "urutan adegan metode luar");
  cek(M_VIDEO.adegan[0].id === "sapaan" && U.adegan[0].id === "sapaan", "tiap video dibuka adegan sapaan");
  cek(M_VIDEO.adegan.filter((a) => /^latihan-/.test(a.id)).length === 3 && M_VIDEO.adegan[M_VIDEO.adegan.length - 1].id === "penutup", "video materi: Latihan 1 sampai 3 lalu penutup");
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-nama", "luar-nama-terapan", "luar-bingkai", "luar-bingkai-terapan", "luar-garis", "luar-garis-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(U.adegan[1].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  for (const kata of ["Latihan", "Igil", "Malosi", "Kira", "Upe", "Wei", "nol", "pasang", "bersisa", "buaya"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  // Hanya bilangan 0 sampai 10: tanpa tambah, kurang, atau bilangan lebih dari sepuluh (membandingkan memang isi sub-bab ini).
  const BOCOR = /tambah|kurang|jumlah|\bbelas\b|\bpuluh\b|\bratus\b|\bribu\b|sebelas|dua belas|operasi|hasil bagi|dikali/i;
  for (const v of [M_VIDEO, U]) {
    for (const a of v.adegan) cek(!BOCOR.test(teksAdegan(a)), `${v.id}/${a.id}: hanya bilangan nol sampai sepuluh, tanpa tambah, kurang, atau bilangan lebih dari sepuluh`);
    for (const a of v.adegan) for (const [i, kt] of a.ketukan.entries()) for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) for (const b of bilanganDari(t)) cek(Number(b) <= 10, `${v.id}/${a.id}#${i + 1}: angka di gambar paling besar sepuluh ("${t}")`);
  }
  cek(totalKetukan >= 70, `total ketukan cukup dalam (${totalKetukan})`);
  // Durasi materi diputar 7 sampai 13 menit (dua kata per detik, sapaan termasuk).
  const kataMateri = kataVideo(M_VIDEO);
  cek(kataMateri / 120 >= 7 && kataMateri / 120 <= 13, `durasi materi diputar 7 sampai 13 menit (${(kataMateri / 120).toFixed(1)} menit)`);
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
let stat = { hitung: 0, titik: 0, tulis: 0 };
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
  // 2) Banyak benda yang disebut sama dengan jumlah benda di gambar akhir ketukan.
  const banyakDi = (id, ke, awalan, n) => {
    const a = adegan(M_VIDEO, id) ?? adegan(U, id);
    cek(!!a, `adegan ${id} ada`);
    if (!a) return;
    sama(hitungBenda(akhirAdegan(a, ke), awalan), n, `${id}#${ke + 1}: ${n} benda ${awalan} di gambar`);
    cek(a.ketukan.some((kt) => kataSuara(kt).includes(NAMA_ANGKA[n])), `${id}: suara menyebut bilangan "${NAMA_ANGKA[n]}"`);
  };
  const pusatX = (o) => (o.t === "kotak" ? o.x + o.w / 2 : o.x);
  const garisPasang = (objs, p) => objs.filter((o) => new RegExp(`^${p}g\\d+$`).test(o.id));
  const titikX = (objs, p) => objs.filter((o) => new RegExp(`^${p}\\d+$`).test(o.id)).map((o) => o.x);
  // Pasangan: tiap garis menghubungkan benda ke-i baris atas dengan benda ke-i baris bawah.
  const cekPasang = (id, ke, pa, pb, g, nPasang, nA, nB) => {
    const a = adegan(M_VIDEO, id);
    const o = akhirAdegan(a, ke);
    sama([hitungBenda(o, pa), hitungBenda(o, pb), garisPasang(o, g).length], [nA, nB, nPasang], `${id}#${ke + 1}: ${nA} benda atas, ${nB} benda bawah, ${nPasang} garis pasangan`);
    const gs = garisPasang(o, g);
    cek(gs.every((q, i) => Math.abs(q.x - pusatX(ketemu(o, `${pa}${i}`))) < 1 && Math.abs(q.x + q.x2 - pusatX(ketemu(o, `${pb}${i}`))) < 1), `${id}#${ke + 1}: tiap garis menghubungkan benda ke-i atas dengan benda ke-i bawah`);
    cek(gs.every((q) => q.y > ketemu(o, `${pa}0`).y && q.y + q.y2 < ketemu(o, `${pb}0`).y + 1), `${id}#${ke + 1}: garis pasangan di antara dua baris`);
    stat.hitung += 1;
  };
  banyakDi("pasangkan", 0, "sp", 3);
  banyakDi("pasangkan", 1, "br", 3);
  cekPasang("pasangkan", 2, "sp", "br", "pg", 3, 3, 3);
  banyakDi("lebih-banyak", 0, "ks", 6);
  banyakDi("lebih-banyak", 1, "bl", 4);
  cekPasang("lebih-banyak", 1, "ks", "bl", "bg", 4, 6, 4);
  banyakDi("lebih-sedikit", 0, "kk", 5);
  banyakDi("lebih-sedikit", 0, "km", 8);
  cekPasang("lebih-sedikit", 1, "kk", "km", "sg", 5, 5, 8);
  banyakDi("tertipu", 0, "ub", 5);
  banyakDi("tertipu", 1, "wb", 5);
  cekPasang("tertipu", 3, "ub", "wb", "tg", 5, 5, 5);
  banyakDi("nol", 0, "np", 3);
  banyakDi("latihan-satu", 0, "pk", 4);
  banyakDi("latihan-satu", 0, "pm", 5);
  cekPasang("latihan-satu", 1, "pk", "pm", "lg", 4, 4, 5);
  banyakDi("latihan-tiga", 0, "ga", 4);
  banyakDi("latihan-tiga", 0, "gb", 4);
  cekPasang("latihan-tiga", 1, "ga", "gb", "gg", 4, 4, 4);
  // Barisan Upe rapat dan barisan Wei renggang: panjang berbeda, banyak sama.
  {
    const o = akhirAdegan(adegan(M_VIDEO, "tertipu"), 1);
    const xa = titikX(o, "ub");
    const xb = titikX(o, "wb");
    cek(Math.max(...xb) - Math.min(...xb) > 2 * (Math.max(...xa) - Math.min(...xa)), "tertipu: barisan Wei jauh lebih panjang daripada barisan Upe");
  }
  // Kursi dan balon: dua kursi sisa tanpa balon.
  {
    const o = akhirAdegan(adegan(M_VIDEO, "lebih-banyak"), 2);
    sama([isiTeks(o, "sz4"), isiTeks(o, "sz5"), !!ketemu(o, "bg4")], ["sisa", "sisa", false], "kursi dan balon: dua kursi sisa tanpa balon");
  }
  // Kelereng: sisa tiga dihitung satu, dua, tiga.
  {
    const o = akhirAdegan(adegan(M_VIDEO, "lebih-sedikit"), 3);
    sama([0, 1, 2].map((i) => isiTeks(o, `sz${i}`)), ["1", "2", "3"], "kelereng: sisa tiga dihitung 1, 2, 3");
    sama(akhirAdegan(adegan(M_VIDEO, "lebih-sedikit"), 5).filter((x) => x.t === "teks" && /^[58]$/.test(x.isi)).map((x) => x.isi).sort(), ["5", "8"], "kelereng: lima dan delapan");
  }
  // Tanda: arah mulut sesuai bilangan yang lebih banyak.
  {
    const tb = akhirAdegan(adegan(M_VIDEO, "tanda-banyak"), 2);
    cek(Number(isiTeks(tb, "t7")) > Number(isiTeks(tb, "t4")) && isiTeks(tb, "tn") === ">" && ketemu(tb, "t7").x < ketemu(tb, "t4").x, "tanda lebih besar: tujuh di kiri lebih besar dari empat, tanda >");
    const tu = akhirAdegan(adegan(M_VIDEO, "tanda-banyak"), 4);
    cek(Number(isiTeks(tu, "u5")) > Number(isiTeks(tu, "u4")) && isiTeks(tu, "un") === ">" && ketemu(tu, "u5").x < ketemu(tu, "u4").x, "tanda lebih besar: lima di kiri lebih besar dari empat, tanda >");
    const ts = akhirAdegan(adegan(M_VIDEO, "tanda-sedikit"), 1);
    cek(Number(isiTeks(ts, "s4")) < Number(isiTeks(ts, "s8")) && isiTeks(ts, "sn") === "<" && ketemu(ts, "s4").x < ketemu(ts, "s8").x, "tanda lebih kecil: empat di kiri lebih kecil dari delapan, tanda <");
    const tm = akhirAdegan(adegan(M_VIDEO, "tanda-sama"), 1);
    cek(isiTeks(tm, "m6") === isiTeks(tm, "m6b") && !!ketemu(tm, "ma") && !!ketemu(tm, "mb") && ketemu(tm, "ma").x2 === ketemu(tm, "mb").x2, "tanda sama dengan: dua bilangan sama, dua garis sama panjang");
    const tw = akhirAdegan(adegan(M_VIDEO, "tanda-sama"), 3);
    sama([isiTeks(tw, "w1"), isiTeks(tw, "w2")], ["5 > 4", "4 < 5"], "dua cara menulis: 5 > 4 dan 4 < 5");
    const tb2 = akhirAdegan(adegan(M_VIDEO, "tanda-sama"), 4);
    sama(["x1-t0", "x2-t0", "x3-t0"].map((i) => isiTeks(tb2, i)), ["> lebih banyak", "< lebih sedikit", "= sama banyak"], "tiga tanda: lebih besar, lebih kecil, sama dengan beserta artinya");
  }
  // Nol: tiga apel di keranjang pertama, nol di keranjang kedua.
  {
    const n = akhirAdegan(adegan(M_VIDEO, "nol"), 3);
    const k1 = ketemu(n, "ks1");
    const k2 = ketemu(n, "ks2");
    const dalam = (b, kr) => b.x > kr.x && b.x < kr.x + kr.w;
    const apel = n.filter((o) => /^np\d+$/.test(o.id));
    sama([apel.filter((b) => dalam(b, k1)).length, apel.filter((b) => dalam(b, k2)).length, isiTeks(n, "nl"), isiTeks(n, "nb-t0")], [3, 0, "0", "0 < 3"], "nol: tiga apel di keranjang pertama, nol di kedua, 0 < 3");
  }
  // Latihan: jawaban tanda benar.
  {
    sama(isiTeks(akhirAdegan(adegan(M_VIDEO, "latihan-satu"), 4), "lt"), "5 > 4", "Latihan 1: 5 > 4");
    sama([isiTeks(akhirAdegan(adegan(M_VIDEO, "latihan-dua"), 2), "d1"), isiTeks(akhirAdegan(adegan(M_VIDEO, "latihan-dua"), 4), "d2")], ["7 > 3", "2 < 9"], "Latihan 2: 7 > 3 dan 2 < 9");
    sama(isiTeks(akhirAdegan(adegan(M_VIDEO, "latihan-tiga"), 4), "g4"), "4 = 4", "Latihan 3: 4 = 4");
  }
  // Metode luar: tulisan, bingkai, dan garis bilangan.
  {
    const na = adegan(U, "luar-nama");
    const tulisN = (ke) => akhirAdegan(na, ke).filter((o) => /^w\d+$/.test(o.id));
    sama([tulisN(1).length, tulisN(3).length], [1, 1], "Number Names: lambang empat dan lima ditulis");
    cek(tulisN(3).every((o) => o.gambar === true), "Number Names: tulisan tergambar bertahap");
    const nt = akhirAdegan(adegan(U, "luar-nama-terapan"), 2);
    sama([isiTeks(nt, "n4-t"), isiTeks(nt, "n5-t"), isiTeks(nt, "nt")], ["4", "5", "5 > 4"], "Number Names terapan: 4, 5, dan 5 > 4");
    const bk = akhirAdegan(adegan(U, "luar-bingkai"), 2);
    sama([bk.filter((x) => /^bk-c\d+$/.test(x.id)).length, bk.filter((x) => /^bk-t\d+$/.test(x.id)).length, isiTeks(bk, "b10"), isiTeks(bk, "b6")], [10, 6, "10", "6"], "Ten Frame: sepuluh kotak, enam titik");
    const bt = akhirAdegan(adegan(U, "luar-bingkai-terapan"), 0);
    sama([bt.filter((x) => /^bu-c\d+$/.test(x.id)).length, bt.filter((x) => /^bw-c\d+$/.test(x.id)).length, bt.filter((x) => /^bu-t\d+$/.test(x.id)).length, bt.filter((x) => /^bw-t\d+$/.test(x.id)).length], [10, 10, 6, 4], "Ten Frame terapan: dua bingkai sepuluh kotak, enam dan empat titik");
    const g = akhirAdegan(adegan(U, "luar-garis"), 0);
    sama([...Array(11).keys()].map((i) => isiTeks(g, `gl${i}`)), [...Array(11).keys()].map(String), "Number Line Mini: angka nol sampai sepuluh berurutan");
    const gx = [...Array(11).keys()].map((i) => ketemu(g, `gk${i}`).x);
    cek(gx.every((x, i) => i === 0 || x - gx[i - 1] === 26), "Number Line Mini: jarak tanda sama");
    const gt = adegan(U, "luar-garis-terapan");
    const akh = akhirAdegan(gt, 1);
    sama(ketemu(akh, "ktk").x, ketemu(akh, "gk8").x, "Number Line Mini terapan: katak berhenti di angka delapan");
    cek(ketemu(akhirAdegan(gt, 0), "ktk").x === ketemu(akhirAdegan(gt, 0), "gk5").x, "Number Line Mini terapan: katak mulai di angka lima");
  }
}

/* ------------------------------ Sapaan dan peta susun ------------------------------ */
{
  const sap = adegan(M_VIDEO, "sapaan");
  cek(/Halo anak-anak/.test(sap.ketukan[0].suara) && /Memasangkan benda/i.test(L.teksTerlihat(akhirAdegan(sap, 1)).join(" | ")), "sapaan materi: tiga hal yang dipelajari tampil");
  sama(L.teksTerlihat(akhirAdegan(sap, 1)).filter((t) => ["Memasangkan benda", "Mengenal banyak dan sedikit", "Memilih tanda yang tepat"].includes(t)), ["Memasangkan benda", "Mengenal banyak dan sedikit", "Memilih tanda yang tepat"], "sapaan materi: daftar tiga hal");
  cek(!/\d/.test(sap.ketukan[1].suara), "sapaan materi: tanpa angka");
  if (true) {
    const A = JSON.parse(readFileSync(new URL("../src/data/kelas1-bab1-ringkas.json", import.meta.url), "utf8")).subBab.B;
    const peta = A.petaSusun.simpul;
    const anak = (id) => peta.filter((s) => s.induk === id).map((s) => s.teks);
    const akar = peta.filter((s) => s.induk === null);
    cek(akar.length === 3, "peta susun: tiga cabang dari pusat");
    sama(anak(akar[0].id), ["Memasangkan benda", "Mengenal banyak dan sedikit", "Memilih tanda yang tepat"], "peta susun: cabang pertama sama dengan daftar sapaan");
    sama([anak(akar[1].id).length, anak(akar[2].id).length, peta.length], [3, 2, 11], "peta susun: 3 cara, 2 hasil, 11 simpul");
    cek(peta.every((s) => s.teks.length <= 28) && new Set(peta.map((s) => s.teks)).size === peta.length, "peta susun: teks <= 28 huruf dan unik");
    cek(!/\d/.test(A.petaSusun.pusat.suara) && !/\d/.test(A.petaSusun.petunjuk) && peta.every((s) => !/\d/.test(s.petunjuk ?? "")), "peta susun: suara dan petunjuk tanpa digit");
    const T = A.tabelSusun;
    cek(T.baris.length >= 3 && T.baris.length <= 5 && T.kolom.length >= 3 && T.kolom.length <= 4, "tabel susun: 3 sampai 5 baris dan 3 sampai 4 kolom");
    cek(T.baris.every((b) => b.sel.every((s) => s.length <= 26 && (s.match(/\d+/g) ?? []).length <= 1)), "tabel susun: sel <= 26 huruf dan paling banyak satu angka per sel");
    cek(T.baris.every((b) => b.label.split(/\s+/).every((w) => w.length <= 8)), "tabel susun: kata terpanjang kolom label <= 8 huruf");
    cek(!/\d/.test(T.suara) && !/\d/.test(T.petunjuk), "tabel susun: suara dan petunjuk tanpa digit");
  } else cek(false, "peta dan tabel susun: .tmp-k1b1as/B.json ada");
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k1b1b-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k1b1b-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k1b1b sendiri (${impor.join(", ")})`);
  }
  // Emoji dalam data teks gambar juga paling tinggi Emoji 12 (diperiksa pada gambar yang diputar).
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d), `${v.id}/${a.id}: emoji gambar paling tinggi Emoji 12`);
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k1b1b.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|naskah-k1b1/.test(pembungkus) && /VIDEO_MATERI_K1B1B/.test(pembungkus) && /VIDEO_LUAR_K1B1B/.test(pembungkus) && /export function VideoK1B1B/.test(pembungkus) && /daftar-video-cerita/.test(pembungkus), "video-k1b1b.tsx: dua video dari mesin Story, tanpa naskah lama");
  cek(!/\r/.test(pembungkus), "video-k1b1b.tsx: akhir baris LF");
  const sendiri = readFileSync(new URL("uji-story-k1b1b.mjs", import.meta.url), "utf8");
  cek(!/\r/.test(sendiri), "uji-story-k1b1b.mjs: akhir baris LF");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit diputar)`);
}
console.log(`Pemeriksaan: ${stat.hitung} deret hitungan, ${stat.titik} kartu titik, ${stat.tulis} angka tulisan`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
