// Uji Story Kelas 1 Bab 1 Sub-Bab A Bab 2 (Cerita Penjumlahan): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Video diputar bergaya guru: suara, teks terlihat, sumber, judul adegan, dan subjudul tanpa penyebutan buku (kata terlarang diperiksa pada adegan yang diputar).
// Memeriksa: pemicu kata, sinkron angka suara dan gambar (bilangan yang diucapkan dengan kata tampak sebagai angka), suara tanpa digit, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas,
// teks bertumpuk, pemisahan materi dan metode luar, tidak membocorkan tambah, kurang, perbandingan, atau bilangan lebih dari sepuluh, banyak benda yang digabung (benda, angka hitungan, keping bingkai) dihitung ulang dari gambar dan dicocokkan dengan kata bilangan di suara, kalimat a + b = c yang selalu benar dan jumlahnya paling besar sepuluh, emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k1b2a.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k1b2a-video.ts");
const G = await import("../src/components/modul/story/k1b2a-gambar.ts");
const U1 = await import("../src/components/modul/story/k1b2a-luar-1.ts");

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
const VIDEO = [V.VIDEO_MATERI_K1B2A, V.VIDEO_LUAR_K1B2A];
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
const M_VIDEO = V.VIDEO_MATERI_K1B2A;
const U = V.VIDEO_LUAR_K1B2A;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const NAMA_LUAR = /Counting On|Part-Part-Whole|Ten Frame|Menghitung Maju|Bagian-Utuh|Jumlah di Bingkai|metode luar|metode dari luar/i;
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M_VIDEO);
  const luar = teksVideo(U);
  cek(!NAMA_LUAR.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE, ["Counting On", "Part-Part-Whole", "Ten Frame Add"], "nama metode di berkas luar-1");
  sama(U1.NAMA_METODE_ID, ["Menghitung Maju", "Bagian-Utuh", "Jumlah di Bingkai Sepuluh"], "nama Indonesia metode luar");
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
  cek(M_VIDEO.id === "k1b2a-materi" && U.id === "k1b2a-luar", "id video k1b2a-materi dan k1b2a-luar");
  cek(U.judul.endsWith(": Metode dari Luar") && !/menurut/i.test(M_VIDEO.judul), "judul video: materi tanpa 'menurut', luar berakhir ': Metode dari Luar'");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,cerita-taman,lompat-tali,papan-kalimat,pensil-digabung,mobil-mainan,bebek-kolam,dua-piring,sampai-sepuluh,goresan,latihan-satu,latihan-dua,latihan-tiga,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-maju,luar-maju-terapan,luar-bagian,luar-bagian-terapan,luar-bingkai,luar-bingkai-terapan,luar-ringkas", "urutan adegan metode luar");
  cek(M_VIDEO.adegan[0].id === "sapaan" && U.adegan[0].id === "sapaan", "tiap video dibuka adegan sapaan");
  cek(M_VIDEO.adegan.filter((a) => /^latihan-/.test(a.id)).length === 3 && M_VIDEO.adegan[M_VIDEO.adegan.length - 1].id === "penutup", "video materi: Latihan 1 sampai 3 lalu penutup");
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-maju", "luar-maju-terapan", "luar-bagian", "luar-bagian-terapan", "luar-bingkai", "luar-bingkai-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(U.adegan[1].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  for (const kata of ["Latihan", "Igil", "Malosi", "Kira", "Upe", "Wei", "tambah", "sama dengan", "jumlah", "gabung", "bertambah"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  // Hanya bilangan sampai sepuluh: tanpa kurang, banding, atau bilangan lebih dari sepuluh.
  const BOCOR = /kurang|dikurang|pengurangan|selisih|sisa|lebih (banyak|besar|sedikit|kecil)|bandingkan|membandingkan|\bbelas\b|\bpuluh\b|\bratus\b|\bribu\b|sebelas|dua belas|operasi|hasil bagi|dikali/i;
  for (const v of [M_VIDEO, U]) {
    for (const a of v.adegan) cek(!BOCOR.test(teksAdegan(a)), `${v.id}/${a.id}: hanya bilangan sampai sepuluh, tanpa kurang, banding, atau bilangan lebih dari sepuluh`);
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
  }  // 2) Kalimat "a + b = c" yang tampil di gambar selalu benar dan jumlahnya paling besar sepuluh.
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((kt, i) => {
        for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) {
          const m = /^(\d+) \+ (\d+) = (\d+)$/.exec(t);
          if (m) {
            stat.pasang += 1;
            cek(Number(m[1]) + Number(m[2]) === Number(m[3]) && Number(m[3]) <= 10, `${v.id}/${a.id}#${i + 1}: "${t}" benar dan paling besar sepuluh`);
          }
        }
      });
    }
  }
  const cari = (id) => adegan(M_VIDEO, id) ?? adegan(U, id);
  const di = (id, ke) => akhirAdegan(cari(id), ke);
  const warna = (objs, p) => objs.filter((o) => new RegExp(`^${p}\\d+$`).test(o.id)).map((o) => o.warna);
  const banyak = (objs, p, n, nama) => sama(hitungBenda(objs, p), n, `${nama}: ${n} benda berawalan ${p}`);
  const dalamKotak = (objs, b, kotakId) => {
    const kt = ketemu(objs, kotakId);
    return b.x > kt.x && b.x < kt.x + kt.w && b.y > kt.y && b.y < kt.y + kt.h;
  };
  // Lompat tali: empat anak, datang dua, jadi enam berderet.
  {
    banyak(di("lompat-tali", 0), "an", 4, "lompat tali awal");
    const o = di("lompat-tali", 2);
    banyak(o, "an", 6, "lompat tali setelah datang");
    cek(new Set([0, 1, 2, 3, 4, 5].map((i) => ketemu(o, `an${i}`).x)).size === 6 && [0, 1, 2, 3, 4, 5].every((i) => ketemu(o, `an${i}`).y === 100), "lompat tali: enam anak berderet di tempat berbeda");
    sama([0, 1, 2, 3, 4, 5].map((i) => isiTeks(di("lompat-tali", 3), `ann${i}`)), ["1", "2", "3", "4", "5", "6"], "lompat tali: hitungan satu sampai enam");
    stat.kelompok += 3;
  }
  // Papan: kalimat 4 + 2 = 6 tersusun dari lima bagian.
  {
    const o = di("papan-kalimat", 1);
    sama(["a4", "pl", "a2", "eq", "a6"].map((i) => isiTeks(o, i)), ["4", "+", "2", "=", "6"], "papan: kalimat 4 + 2 = 6");
    stat.kelompok += 1;
  }
  // Pensil: tiga merah dan empat biru, digabung ke kotak.
  {
    const a = di("pensil-digabung", 0);
    const w = warna(a, "pc");
    sama([w.length, w.slice(0, 3).every((c) => c === "#F87171"), w.slice(3).every((c) => c === "#60A5FA")], [7, true, true], "pensil: tiga merah dan empat biru");
    const b = di("pensil-digabung", 3);
    sama(b.filter((o) => /^pc\d+$/.test(o.id) && dalamKotak(b, o, "kb")).length, 7, "pensil: tujuh pensil di dalam kotak");
    stat.kelompok += 2;
  }
  // Mobil: empat kuning dan empat merah.
  {
    const a = di("mobil-mainan", 1);
    const w = warna(a, "mb");
    sama([w.length, w.slice(0, 4).every((c) => c === "#FACC15"), w.slice(4).every((c) => c === "#EF4444")], [8, true, true], "mobil: empat kuning dan empat merah");
    stat.kelompok += 1;
  }
  // Bebek: lima, lalu tujuh di kolam.
  {
    banyak(di("bebek-kolam", 0), "bb", 5, "bebek awal");
    const o = di("bebek-kolam", 2);
    banyak(o, "bb", 7, "bebek setelah datang");
    cek(o.filter((b) => /^bb\d+$/.test(b.id)).every((b) => dalamKotak(o, b, "kol")), "bebek: semua bebek berada di kolam");
    stat.kelompok += 2;
  }
  // Kelereng: lima di piring Upe, tiga di piring Wei, lalu delapan di mangkuk.
  {
    const o = di("dua-piring", 0);
    const kl = o.filter((b) => /^kl\d+$/.test(b.id));
    const dlm = (b, p) => Math.hypot(b.x - ketemu(o, p).x, b.y - ketemu(o, p).y) < ketemu(o, p).r;
    sama([kl.length, kl.filter((b) => dlm(b, "pl")).length, kl.filter((b) => dlm(b, "pr")).length], [8, 5, 3], "kelereng: lima di piring Upe, tiga di piring Wei");
    const m = di("dua-piring", 4);
    sama(m.filter((b) => /^kl\d+$/.test(b.id) && dalamKotak(m, b, "mk")).length, 8, "kelereng: delapan di mangkuk");
    stat.kelompok += 2;
  }
  // Kotak sepuluh: sepuluh petak; enam kuning + dua hijau; enam + empat; lima + lima.
  {
    sama(di("sampai-sepuluh", 0).filter((o) => /^kt-c\d+$/.test(o.id)).length, 10, "kotak sepuluh: sepuluh petak");
    const pecah = (ke) => {
      const w = warna(di("sampai-sepuluh", ke), "kg");
      return [w.length, w.filter((c) => c === "#FACC15").length, w.filter((c) => c === "#16A34A").length].join();
    };
    sama([pecah(1), pecah(2), pecah(3), pecah(5)], ["6,6,0", "8,6,2", "10,6,4", "10,5,5"], "kotak sepuluh: 6, 6 + 2, 6 + 4, 5 + 5");
    stat.kelompok += 4;
  }
  // Goresan: tujuh goresan satu deret setelah digabung.
  {
    banyak(di("goresan", 0), "gs", 7, "goresan");
    const o = di("goresan", 2);
    cek([0, 1, 2, 3, 4, 5, 6].every((i) => ketemu(o, `gs${i}`).y === 60) && new Set([0, 1, 2, 3, 4, 5, 6].map((i) => ketemu(o, `gs${i}`).x)).size === 7, "goresan: tujuh goresan sebaris");
    const n = di("goresan", 0);
    sama([[0, 1, 2, 3].every((i) => ketemu(n, `gs${i}`).y === 60), [4, 5, 6].every((i) => ketemu(n, `gs${i}`).y === 120)], [true, true], "goresan: empat dan tiga terpisah sebelum digabung");
    stat.kelompok += 2;
  }
  // Latihan.
  {
    const a = di("latihan-satu", 0);
    sama([warna(a, "lb").length, warna(a, "lb").slice(3).every((c) => c === W.hijau)], [5, true], "Latihan 1: tiga dan dua bola");
    sama(isiTeks(di("latihan-satu", 2), "o5-t"), "5", "Latihan 1: pilihan lima ada");
    sama(hitungBenda(di("latihan-dua", 0), "lc"), 9, "Latihan 2: sembilan balon");
    sama(["t0", "t1", "t2", "t3", "t4"].map((i) => isiTeks(di("latihan-dua", 2), `${i}-t`)), ["6", "+", "3", "=", "9"], "Latihan 2: kalimat tersusun dari lima kartu");
    sama(hitungBenda(di("latihan-tiga", 0), "kp"), 8, "Latihan 3: delapan kupu-kupu");
    sama(["q7", "q8", "q9"].map((i) => isiTeks(di("latihan-tiga", 2), `${i}-t`)), ["7", "8", "9"], "Latihan 3: tiga pilihan");
    stat.kelompok += 6;
  }
  // Metode luar.
  {
    const m = di("luar-maju", 0);
    sama([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => isiTeks(m, `nm${i + 1}-t`)), ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], "Counting On: deret satu sampai sepuluh");
    const kt = (ke) => ketemu(di("luar-maju", ke), "kt");
    const pusat = (n) => {
      const b = ketemu(di("luar-maju", 3), `nm${n}-k`);
      return b.x + b.w / 2;
    };
    sama([kt(1).x, kt(2).x], [pusat(5), pusat(8)], "Counting On: katak mulai di lima, berhenti di delapan");
    banyak(di("luar-maju-terapan", 0), "ta", 6, "Counting On terapan");
    sama([isiTeks(di("luar-maju-terapan", 1), "m4"), isiTeks(di("luar-maju-terapan", 2), "m5"), isiTeks(di("luar-maju-terapan", 2), "m6")], ["4", "5", "6"], "Counting On terapan: empat, lima, enam");
    const b = di("luar-bagian", 2);
    sama(["ik-ut", "ik-at", "ik-bt"].map((i) => isiTeks(b, i)), ["7", "3", "4"], "Part-Part-Whole: 7, 3, 4");
    const p = di("luar-bagian", 1);
    sama([warna(p, "pr").length, warna(p, "pb").length], [3, 4], "Part-Part-Whole: tiga pensil merah, empat pensil biru");
    const t = di("luar-bagian-terapan", 0);
    const w = warna(t, "lm");
    sama([w.length, w.slice(0, 4).every((c) => c === "#FACC15"), w.slice(4).every((c) => c === "#EF4444")], [8, true, true], "Part-Part-Whole terapan: empat kuning, empat merah");
    sama(["iq-ut", "iq-at", "iq-bt"].map((i) => isiTeks(di("luar-bagian-terapan", 2), i)), ["8", "4", "4"], "Part-Part-Whole terapan: 8, 4, 4");
    const f = (id, ke) => {
      const o = di(id, ke);
      return [o.filter((x) => /^(bk|rk)-c\d+$/.test(x.id)).length, warna(o, "kb").length + warna(o, "rg").length].join();
    };
    sama([f("luar-bingkai", 0), f("luar-bingkai", 1), f("luar-bingkai", 2), f("luar-bingkai-terapan", 0), f("luar-bingkai-terapan", 1)], ["10,0", "10,5", "10,8", "10,7", "10,10"], "Ten Frame Add: sepuluh petak dan keping 5, 5 + 3, 7, 7 + 3");
    const wk = warna(di("luar-bingkai", 2), "kb");
    sama([wk.filter((c) => c === W.merah).length, wk.filter((c) => c === "#38BDF8").length], [5, 3], "Ten Frame Add: lima merah dan tiga biru");
    stat.kelompok += 8;
  }
  // Aturan pemilik: aplikasi belajar mandiri; tanpa instruksi kelompok, teman, kelas, atau buku.
  {
    const MANDIRI = /kelompok|teman sekelas|depan kelas|bersama teman|bersama temanmu|berpasangan|bersama kelas|seluruh kelas|buat ceritamu|ceritamu di buku|di buku|buku tulis|tulis di buku|ambil (benda|pensil|kelereng)|tangan (kiri|kanan)|\bjari\b|bermain bersama|bertanya kepada teman/i;
    for (const v of VIDEO) {
      for (const a of v.adegan) {
        const semua = [a.judul, a.sumber];
        a.ketukan.forEach((kt, i) => {
          semua.push(kt.suara);
          semua.push(...L.teksTerlihat(L.keadaanStory(a, i, 9999)));
        });
        const kena = semua.filter((t) => MANDIRI.test(t));
        cek(kena.length === 0, `${v.id}/${a.id}: narasi mandiri dan digital, tanpa kelompok, teman, kelas, atau buku (${kena.slice(0, 2).join(" | ")})`);
      }
    }
  }
}

/* ------------------------------ Sapaan dan peta susun ------------------------------ */
{
  const sap = adegan(M_VIDEO, "sapaan");
  const DAFTAR = ["Menggabungkan benda", "Benda yang bertambah", "Menulis kalimat tambah"];
  cek(/Halo anak-anak/.test(sap.ketukan[0].suara) && /Menggabungkan benda/i.test(L.teksTerlihat(akhirAdegan(sap, 1)).join(" | ")), "sapaan materi: tiga hal yang dipelajari tampil");
  sama(L.teksTerlihat(akhirAdegan(sap, 1)).filter((t) => DAFTAR.includes(t)), DAFTAR, "sapaan materi: daftar tiga hal");
  cek(!/\d/.test(sap.ketukan[1].suara), "sapaan materi: tanpa angka");
  cek(!/sebelas|belas|puluh/i.test(sap.ketukan.map((kt) => kt.suara).join(" ")), "sapaan: topik tanpa kata bilangan sebelas atau lebih");
  const sumberRingkas = JSON.parse(readFileSync(new URL("../src/data/kelas1-bab2-ringkas.json", import.meta.url), "utf8")).subBab.A;
  const sementara = new URL("../.tmp-k1b2s/A.json", import.meta.url);
  const A = sumberRingkas?.petaSusun && sumberRingkas?.tabelSusun ? sumberRingkas : existsSync(sementara) ? JSON.parse(readFileSync(sementara, "utf8")) : null;
  if (A) {
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
    cek(T.baris.every((b) => Number(b.sel[0]) + Number(b.sel[1]) === Number(b.sel[2]) && Number(b.sel[2]) <= 10), "tabel susun: kolom pertama + kedua = jumlah, paling besar sepuluh");
    cek(!/buku|halaman|kunci|kelompok|teman|kelas/i.test(JSON.stringify({ p: A.petaSusun, t: A.tabelSusun })), "peta dan tabel susun: tanpa kata terlarang dan tanpa kelompok, teman, kelas");
  } else cek(false, "peta dan tabel susun: .tmp-k1b2s/A.json atau kelas1-bab2-ringkas.json subBab.A.petaSusun ada");
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k1b2a-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k1b2a-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k1b2a sendiri (${impor.join(", ")})`);
  }
  // Emoji dalam data teks gambar juga paling tinggi Emoji 12 (diperiksa pada gambar yang diputar).
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d), `${v.id}/${a.id}: emoji gambar paling tinggi Emoji 12`);
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k1b2a.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|naskah-k1b/.test(pembungkus) && /VIDEO_MATERI_K1B2A/.test(pembungkus) && /VIDEO_LUAR_K1B2A/.test(pembungkus) && /export function VideoK1B2A/.test(pembungkus) && /daftar-video-cerita/.test(pembungkus), "video-k1b2a.tsx: dua video dari mesin Story, tanpa naskah lama");
  cek(!/\r/.test(pembungkus), "video-k1b2a.tsx: akhir baris LF");
  const sendiri = readFileSync(new URL("uji-story-k1b2a.mjs", import.meta.url), "utf8");
  cek(!/\r/.test(sendiri), "uji-story-k1b2a.mjs: akhir baris LF");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit diputar)`);
}
console.log(`Pemeriksaan: ${stat.hitung} deret hitungan, ${stat.pasang} kalimat tambah, ${stat.kelompok} pemeriksaan benda`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
