// Uji Story Kelas 1 Bab 3 Sub-Bab A (Cerita Pengurangan: berkurang dan tersisa): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Video diputar bergaya guru: suara, teks terlihat, sumber, judul adegan, dan subjudul tanpa penyebutan buku (kata terlarang diperiksa pada adegan yang diputar).
// Memeriksa: pemicu kata, sinkron angka suara dan gambar, suara tanpa digit, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas, teks bertumpuk, pemisahan materi dan metode luar (nama metode hanya Indonesia),
// hanya pengurangan dengan bilangan sampai sepuluh (tanpa kali, bagi, atau bilangan lebih dari sepuluh), banyak benda (benda, angka hitungan, keping, coretan) dihitung ulang dari gambar dan dicocokkan dengan kata bilangan di suara,
// kalimat a - b = c dan a + b = c yang selalu benar, aturan pemilik (belajar mandiri digital: tanpa kelompok, teman, depan kelas, buku, menulis atau menggambar di buku, membawa benda nyata), emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k1b3a.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k1b3a-video.ts");
const U1 = await import("../src/components/modul/story/k1b3a-luar-1.ts");

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
const VIDEO = [V.VIDEO_MATERI_K1B3A, V.VIDEO_LUAR_K1B3A];
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
const M_VIDEO = V.VIDEO_MATERI_K1B3A;
const U = V.VIDEO_LUAR_K1B3A;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const NAMA_LUAR = /Mengambil|Hitung Mundur|Kurang di Bingkai|metode luar|metode dari luar/i;
const NAMA_INGGRIS = /Take Away|Counting Back|Ten Frame|Subtract|Counting On/i;
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M_VIDEO);
  const luar = teksVideo(U);
  cek(!NAMA_LUAR.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of U1.NAMA_METODE_ID) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE_ID, ["Mengambil", "Hitung Mundur", "Kurang di Bingkai"], "nama Indonesia metode luar");
  cek(!NAMA_INGGRIS.test(materi) && !NAMA_INGGRIS.test(luar), "nama metode hanya bahasa Indonesia (tanpa Take Away, Counting Back, Ten Frame Subtract)");
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
  cek(M_VIDEO.id === "k1b3a-materi" && U.id === "k1b3a-luar", "id video k1b3a-materi dan k1b3a-luar");
  cek(U.judul.endsWith(": Metode dari Luar") && !/menurut/i.test(M_VIDEO.judul), "judul video: materi tanpa 'menurut', luar berakhir ': Metode dari Luar'");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,cerita-taman,tutup-mata,papan-kurang,kue-ibu,mobil-kosong,kupu-terbang,kelereng-kira,sisa-nol,bingkai-coret,goresan-coret,periksa-gabung,latihan-satu,latihan-dua,latihan-tiga,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-ambil,luar-ambil-terapan,luar-mundur,luar-mundur-terapan,luar-bingkai,luar-bingkai-terapan,luar-ringkas", "urutan adegan metode luar");
  cek(M_VIDEO.adegan[0].id === "sapaan" && U.adegan[0].id === "sapaan", "tiap video dibuka adegan sapaan");
  cek(M_VIDEO.adegan.filter((a) => /^latihan-/.test(a.id)).length === 3 && M_VIDEO.adegan[M_VIDEO.adegan.length - 1].id === "penutup", "video materi: Latihan 1 sampai 3 lalu penutup");
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-ambil", "luar-ambil-terapan", "luar-mundur", "luar-mundur-terapan", "luar-bingkai", "luar-bingkai-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(U.adegan[1].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  for (const kata of ["Latihan", "Igil", "Malosi", "Kira", "Upe", "Wei", "kurang", "sama dengan", "sisa", "berkurang", "tersisa", "pergi", "mula-mula"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  // Hanya bilangan sampai sepuluh: tanpa kurang, banding, atau bilangan lebih dari sepuluh.
  const BOCOR = /lebih (besar|kecil)|bandingkan|membandingkan|\bbelas\b|\bpuluh\b|\bratus\b|\bribu\b|sebelas|dua belas|operasi|hasil bagi|dibagi|dikali|\bkali\b|perkalian|pembagian/i;
  for (const v of [M_VIDEO, U]) {
    for (const a of v.adegan) cek(!BOCOR.test(teksAdegan(a)), `${v.id}/${a.id}: hanya bilangan sampai sepuluh, tanpa kali, bagi, banding, atau bilangan lebih dari sepuluh`);
    for (const a of v.adegan) for (const i of a.ketukan.keys()) for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) for (const b of bilanganDari(t)) cek(Number(b) <= 10, `${v.id}/${a.id}#${i + 1}: angka di gambar paling besar sepuluh ("${t}")`);
  }
  cek(totalKetukan >= 70 && M_VIDEO.adegan.reduce((t, ad) => t + ad.ketukan.length, 0) >= 70, `total ketukan cukup dalam (${totalKetukan}; materi ${M_VIDEO.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)})`);
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
  }  // 2) Kalimat "a - b = c" dan "a + b = c" yang tampil di gambar selalu benar, bilangannya paling besar sepuluh.
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((kt, i) => {
        for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) {
          const m = /^(\d+) ([−+]) (\d+) = (\d+)$/.exec(t);
          if (m) {
            stat.pasang += 1;
            const [p, q, r] = [Number(m[1]), Number(m[3]), Number(m[4])];
            cek((m[2] === "−" ? p - q === r && r >= 0 : p + q === r) && Math.max(p, q, r) <= 10, `${v.id}/${a.id}#${i + 1}: "${t}" benar dan paling besar sepuluh`);
          }
        }
      });
    }
  }
  const cari = (id) => adegan(M_VIDEO, id) ?? adegan(U, id);
  const di = (id, ke) => akhirAdegan(cari(id), ke);
  const banyak = (objs, p, n, nama) => sama(hitungBenda(objs, p), n, `${nama}: ${n} benda berawalan ${p}`);
  const dalamKotak = (objs, b, kotakId) => {
    const kt = ketemu(objs, kotakId);
    return b.x > kt.x && b.x < kt.x + kt.w && b.y > kt.y && b.y < kt.y + kt.h;
  };
  const dalamBulat = (objs, b, bulatId) => Math.hypot(b.x - ketemu(objs, bulatId).x, b.y - ketemu(objs, bulatId).y) < ketemu(objs, bulatId).r;
  const benda = (objs, p) => objs.filter((o) => new RegExp(`^${p}\\d+$`).test(o.id));
  const labelHitung = (objs, p, n) => sama(Array.from({ length: n }, (_, i) => isiTeks(objs, `${p}n${i}`)), Array.from({ length: n }, (_, i) => String(i + 1)), `hitungan ${p}: satu sampai ${n}`);
  const teksAda = (objs) => L.teksTerlihat(objs);
  // Tutup mata: enam anak, dua pulang ke rumah, sisa empat.
  {
    banyak(di("tutup-mata", 0), "an", 6, "tutup mata awal");
    labelHitung(di("tutup-mata", 1), "an", 6);
    const o = di("tutup-mata", 4);
    const anak = benda(o, "an");
    sama([anak.length, anak.filter((b) => dalamKotak(o, b, "rumah")).length, anak.filter((b) => !dalamKotak(o, b, "rumah")).length], [6, 2, 4], "tutup mata: enam anak, dua di rumah, empat tinggal");
    sama(["an4", "an5"].map((i) => dalamKotak(o, ketemu(o, i), "rumah")), [true, true], "tutup mata: yang pulang adalah anak terakhir");
    labelHitung(di("tutup-mata", 5), "an", 4);
    cek(["Mula-mula: 6 anak", "Berkurang: 2 anak"].every((t) => teksAda(o).includes(t)) && teksAda(di("tutup-mata", 5)).includes("Sisa: 4 anak"), "tutup mata: mula-mula 6, berkurang 2, sisa 4");
    sama(["b1", "b2", "b3"].map((i) => isiTeks(di("tutup-mata", 6), `${i}-t0`)), ["Mula-mula: 6 anak", "Berkurang: 2 anak", "Sisa: 4 anak"], "tutup mata: tiga bagian cerita");
    stat.kelompok += 7;
  }
  // Papan: kalimat 6 - 2 = 4 tersusun dari lima bagian.
  {
    const o = di("papan-kurang", 1);
    sama(["a6", "mn", "a2", "eq", "a4"].map((i) => isiTeks(o, i)), ["6", "−", "2", "=", "4"], "papan: kalimat 6 - 2 = 4");
    stat.kelompok += 1;
  }
  // Kue Ibu: enam kue, satu diseret ke Upe, sisa lima.
  {
    const a = di("kue-ibu", 0);
    sama([hitungBenda(a, "ke"), benda(a, "ke").every((b) => dalamBulat(a, b, "pr"))], [6, true], "kue: enam kue di piring");
    labelHitung(di("kue-ibu", 1), "ke", 6);
    const b = di("kue-ibu", 2);
    cek(Math.abs(ketemu(b, "ke5").x - ketemu(b, "up").x) < 6, "kue: kue terakhir diseret ke Upe");
    const c = di("kue-ibu", 3);
    sama([hitungBenda(c, "ke"), teksAda(c).includes("Berkurang: 1 kue")], [5, true], "kue: sisa lima kue, berkurang satu");
    const d = di("kue-ibu", 4);
    labelHitung(d, "ke", 5);
    cek(benda(d, "ke").every((x) => dalamBulat(d, x, "pr")), "kue: lima kue yang tinggal di piring");
    stat.kelompok += 5;
  }
  // Mobil: tiga orang di dalam, semuanya turun, sisa nol.
  {
    const a = di("mobil-kosong", 0);
    sama([hitungBenda(a, "or"), benda(a, "or").every((b) => dalamKotak(a, b, "bs"))], [3, true], "mobil: tiga orang di dalam mobil");
    labelHitung(di("mobil-kosong", 1), "or", 3);
    const b = di("mobil-kosong", 2);
    cek(benda(b, "or").length === 3 && benda(b, "or").every((x) => !dalamKotak(b, x, "bs") && x.x > ketemu(b, "bs").x + ketemu(b, "bs").w), "mobil: ketiga orang sudah turun, di luar mobil");
    sama(isiTeks(di("mobil-kosong", 3), "nol"), "0", "mobil: sisa nol tampak");
    stat.kelompok += 4;
  }
  // Kupu-kupu: enam, dua terbang, sisa empat.
  {
    const a = di("kupu-terbang", 0);
    banyak(a, "kp", 6, "kupu-kupu awal");
    labelHitung(di("kupu-terbang", 1), "kp", 6);
    const b = di("kupu-terbang", 2);
    const jauh = (x) => x.y < 60 || x.x > 240;
    sama([benda(b, "kp").filter((x) => jauh(x) && x.id >= "kp4").length, benda(b, "kp").filter((x) => !jauh(x)).length], [2, 4], "kupu-kupu: dua terbang, empat tinggal");
    labelHitung(di("kupu-terbang", 4), "kp", 4);
    stat.kelompok += 4;
  }
  // Kelereng Kira: lima di piring, satu ke kantong, sisa empat; pilihan jawaban.
  {
    const a = di("kelereng-kira", 0);
    sama([hitungBenda(a, "kl"), benda(a, "kl").every((b) => dalamBulat(a, b, "pl"))], [5, true], "kelereng Kira: lima kelereng di piring");
    sama(["o3-t", "o4-t", "o5-t"].map((i) => isiTeks(di("kelereng-kira", 1), i)), ["3", "4", "5"], "kelereng Kira: tiga pilihan jawaban");
    const b = di("kelereng-kira", 2);
    cek(dalamKotak(b, ketemu(b, "kl4"), "kt") && benda(b, "kl").slice(0, 4).every((x) => dalamBulat(b, x, "pl")), "kelereng Kira: satu kelereng di kantong, empat di piring");
    labelHitung(di("kelereng-kira", 3), "kl", 4);
    stat.kelompok += 4;
  }
  // Sisa nol: lima balon terbang satu per satu; tujuh balon tidak berkurang.
  {
    const a = di("sisa-nol", 0);
    sama([hitungBenda(a, "bn"), isiTeks(a, "sn")], [5, "5"], "sisa nol: lima balon, penghitung lima");
    const b = di("sisa-nol", 1);
    sama([hitungBenda(b, "bn"), isiTeks(b, "sn")], [0, "0"], "sisa nol: semua balon terbang, penghitung nol");
    banyak(di("sisa-nol", 3), "bm", 7, "tidak berkurang: tujuh balon");
    stat.kelompok += 3;
  }
  // Bingkai sepuluh dicoret: delapan keping, tiga dicoret, sisa lima.
  {
    sama(di("bingkai-coret", 0).filter((o) => /^bk-c\d+$/.test(o.id)).length, 10, "bingkai: sepuluh petak");
    banyak(di("bingkai-coret", 1), "kg", 8, "bingkai: delapan keping");
    const o = di("bingkai-coret", 2);
    sama(o.filter((x) => /^cr[567][ab]$/.test(x.id)).length, 6, "bingkai: tiga keping dicoret (enam garis)");
    cek([5, 6, 7].every((i) => Math.abs(ketemu(o, `cr${i}a`).x + 14 - ketemu(o, `kg${i}`).x) < 1), "bingkai: coretan tepat di atas keping ke-6, ke-7, ke-8");
    labelHitung(di("bingkai-coret", 4), "kg", 5);
    stat.kelompok += 5;
  }
  // Goresan dicoret: tujuh goresan, empat dicoret, sisa tiga.
  {
    banyak(di("goresan-coret", 0), "gs", 7, "goresan awal");
    const o = di("goresan-coret", 1);
    sama([3, 4, 5, 6].map((i) => Math.abs(ketemu(o, `sl${i}`).x + 10 - ketemu(o, `gs${i}`).x) < 1), [true, true, true, true], "goresan: empat goresan terakhir dicoret");
    cek(!o.some((x) => /^sl[012]$/.test(x.id)), "goresan: tiga goresan pertama tidak dicoret");
    labelHitung(di("goresan-coret", 3), "gs", 3);
    stat.kelompok += 3;
  }
  // Periksa dengan menggabung: sisa empat + yang pergi dua = enam.
  {
    const o = di("periksa-gabung", 2);
    sama(["ik-ut", "ik-at", "ik-bt", "rj-t0"].map((i) => isiTeks(o, i)), ["6", "4", "2", "4 + 2 = 6"], "periksa: 6, 4, 2, dan 4 + 2 = 6");
    stat.kelompok += 1;
  }
  // Latihan.
  {
    banyak(di("latihan-satu", 0), "lk", 7, "Latihan 1: tujuh kelereng");
    labelHitung(di("latihan-satu", 1), "lk", 7);
    banyak(di("latihan-satu", 2), "lk", 5, "Latihan 1: lima kelereng tersisa");
    sama(["o4-t", "o5-t", "o6-t"].map((i) => isiTeks(di("latihan-satu", 4), i)), ["4", "5", "6"], "Latihan 1: tiga pilihan");
    banyak(di("latihan-dua", 0), "lc", 8, "Latihan 2: delapan balon");
    banyak(di("latihan-dua", 2), "lc", 5, "Latihan 2: lima balon tersisa");
    sama(["t0", "t1", "t2", "t3", "t4"].map((i) => isiTeks(di("latihan-dua", 4), `${i}-t`)), ["8", "−", "3", "=", "5"], "Latihan 2: kalimat tersusun dari lima kartu");
    const d = di("latihan-tiga", 1);
    sama([benda(d, "bo").length, benda(d, "bo").filter((x) => x.op === 0.25).length], [7, 3], "Latihan 3: tujuh bola, tiga yang pergi diredupkan");
    labelHitung(di("latihan-tiga", 2), "pg", 3);
    sama(["o2", "o3", "o4"].map((i) => isiTeks(di("latihan-tiga", 3), `${i}-t`)), ["2", "3", "4"], "Latihan 3: tiga pilihan");
    stat.kelompok += 9;
  }
  // Metode luar: Mengambil.
  {
    const a = di("luar-ambil", 0);
    sama([hitungBenda(a, "am"), benda(a, "am").every((b) => dalamBulat(a, b, "ap"))], [7, true], "Mengambil: tujuh kelereng di piring");
    labelHitung(di("luar-ambil", 1), "am", 7);
    const b = di("luar-ambil", 2);
    cek(benda(b, "am").slice(5).every((x) => dalamKotak(b, x, "kt-k")) && benda(b, "am").slice(0, 5).every((x) => dalamBulat(b, x, "ap")), "Mengambil: dua kelereng di kantong, lima di piring");
    labelHitung(di("luar-ambil", 3), "am", 5);
    const c = di("luar-ambil-terapan", 0);
    banyak(c, "ab", 9, "Mengambil terapan: sembilan bola");
    labelHitung(di("luar-ambil-terapan", 1), "ab", 9);
    const d = di("luar-ambil-terapan", 2);
    cek(benda(d, "ab").slice(5).every((x) => dalamKotak(d, x, "kr")) && benda(d, "ab").slice(0, 5).every((x) => !dalamKotak(d, x, "kr")), "Mengambil terapan: empat bola di keranjang, lima di lapangan");
    labelHitung(di("luar-ambil-terapan", 3), "ab", 5);
    stat.kelompok += 7;
  }
  // Metode luar: Hitung Mundur.
  {
    const m = di("luar-mundur", 0);
    sama([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => isiTeks(m, `nm${i + 1}-t`)), ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], "Hitung Mundur: deret satu sampai sepuluh");
    const pusat = (n) => {
      const b = ketemu(di("luar-mundur", 3), `nm${n}-k`);
      return b.x + b.w / 2;
    };
    const kt = (ke) => ketemu(di("luar-mundur", ke), "kt");
    sama([kt(1).x, kt(2).x], [pusat(8), pusat(5)], "Hitung Mundur: katak mulai di delapan, berhenti di lima");
    sama(["ml0", "ml1", "ml2"].map((i) => isiTeks(di("luar-mundur", 2), i)), ["−1", "−2", "−3"], "Hitung Mundur: tiga langkah mundur");
    const a = di("luar-mundur-terapan", 0);
    sama([hitungBenda(a, "ba"), isiTeks(a, "ct")], [9, "9"], "Hitung Mundur terapan: sembilan balon");
    const b = di("luar-mundur-terapan", 1);
    sama([hitungBenda(b, "ba"), isiTeks(b, "ct")], [6, "6"], "Hitung Mundur terapan: tinggal enam balon");
    labelHitung(di("luar-mundur-terapan", 2), "ba", 6);
    stat.kelompok += 6;
  }
  // Metode luar: Kurang di Bingkai.
  {
    const f = (id, ke) => {
      const o = di(id, ke);
      return [o.filter((x) => /^(bk|rk)-c\d+$/.test(x.id)).length, benda(o, "kb").length + benda(o, "rg").length].join();
    };
    sama([f("luar-bingkai", 0), f("luar-bingkai", 1), f("luar-bingkai", 3), f("luar-bingkai-terapan", 0), f("luar-bingkai-terapan", 2)], ["10,0", "10,7", "10,4", "10,10", "10,6"], "Kurang di Bingkai: sepuluh petak dan keping 7, 4, 10, 6");
    sama(di("luar-bingkai", 2).filter((x) => /^cr[456][ab]$/.test(x.id)).length, 6, "Kurang di Bingkai: tiga keping dicoret");
    sama(di("luar-bingkai-terapan", 1).filter((x) => /^cs[6789][ab]$/.test(x.id)).length, 8, "Kurang di Bingkai terapan: empat kelereng dicoret");
    stat.kelompok += 5;
  }
  // Aturan pemilik: aplikasi belajar mandiri; tanpa instruksi kelompok, teman, kelas, atau buku.
  {
    const MANDIRI = /kelompok|\bteman\w*|\bkawan\w*|sekawan|depan kelas|bersama kelas|seluruh kelas|berpasangan|bermain bersama|bertanya kepada|buat ceritamu|buku|menulis di|menuliskan di|tulis di|menggambar|gambarlah|\bbawa(lah)?\b|membawa|dibawa|\bkertas\b|\bpensil\b|ambil (benda|pensil|kelereng|bola)|tangan (kiri|kanan)|\bjari\b|menyuruh|suruh/i;
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
  const DAFTAR = ["Benda yang berkurang", "Benda yang tersisa", "Menyusun kalimat kurang"];
  cek(/Halo anak-anak/.test(sap.ketukan[0].suara) && /Benda yang berkurang/i.test(L.teksTerlihat(akhirAdegan(sap, 1)).join(" | ")), "sapaan materi: tiga hal yang dipelajari tampil");
  sama(L.teksTerlihat(akhirAdegan(sap, 1)).filter((t) => DAFTAR.includes(t)), DAFTAR, "sapaan materi: daftar tiga hal");
  cek(!/\d/.test(sap.ketukan[1].suara), "sapaan materi: tanpa angka");
  cek(!/sebelas|belas|puluh/i.test(sap.ketukan.map((kt) => kt.suara).join(" ")), "sapaan: topik tanpa kata bilangan sebelas atau lebih");
  const sumberRingkas = JSON.parse(readFileSync(new URL("../src/data/kelas1-bab3-ringkas.json", import.meta.url), "utf8")).subBab.A;
  const sementara = new URL("../.tmp-k1b3s/A.json", import.meta.url);
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
    cek(A.petaSusun.pusat.judul.length > 8 && /\?$/.test(A.petaSusun.pusat.judul), "peta susun: pusat berupa masalah (pertanyaan) cerita");
    const T = A.tabelSusun;
    cek(T.baris.length >= 3 && T.baris.length <= 5 && T.kolom.length >= 3 && T.kolom.length <= 4, "tabel susun: 3 sampai 5 baris dan 3 sampai 4 kolom");
    cek(T.baris.every((b) => b.sel.every((s) => s.length <= 26 && (s.match(/\d+/g) ?? []).length <= 1)), "tabel susun: sel <= 26 huruf dan paling banyak satu angka per sel");
    cek(T.baris.every((b) => b.label.split(/\s+/).every((w) => w.length <= 8)), "tabel susun: kata terpanjang kolom label <= 8 huruf");
    cek(!/\d/.test(T.suara) && !/\d/.test(T.petunjuk), "tabel susun: suara dan petunjuk tanpa digit");
    cek(T.baris.every((b) => Number(b.sel[0]) - Number(b.sel[1]) === Number(b.sel[2]) && Number(b.sel[2]) >= 0 && Number(b.sel[0]) <= 10), "tabel susun: kolom pertama - kedua = sisa, paling besar sepuluh");
    // Margin teks sel di lebar 405 px: sel berisi satu angka cukup lebar; teks sel tidak lebih dari delapan huruf.
    cek(T.baris.every((b) => b.sel.every((s) => s.length <= 8)), "tabel susun: sel pendek supaya margin teks >= 5 px di 405 px");
    const KATA_LARANG = /buku|halaman|kunci|kelompok|\bteman|kawan|kelas\b|kertas|pensil|\bbawa\b|menggambar|menulis di|depan kelas/i;
    cek(!KATA_LARANG.test(JSON.stringify({ p: A.petaSusun, t: A.tabelSusun })), "peta dan tabel susun: tanpa kata terlarang dan tanpa kelompok, teman, kelas, buku, kertas, pensil");
  } else cek(false, "peta dan tabel susun: .tmp-k1b3s/A.json atau kelas1-bab3-ringkas.json subBab.A.petaSusun ada");
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k1b3a-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k1b3a-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k1b3a sendiri (${impor.join(", ")})`);
  }
  // Emoji dalam data teks gambar juga paling tinggi Emoji 12 (diperiksa pada gambar yang diputar).
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d), `${v.id}/${a.id}: emoji gambar paling tinggi Emoji 12`);
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k1b3a.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|naskah-k1b/.test(pembungkus) && /VIDEO_MATERI_K1B3A/.test(pembungkus) && /VIDEO_LUAR_K1B3A/.test(pembungkus) && /export function VideoK1B3A/.test(pembungkus) && /daftar-video-cerita/.test(pembungkus), "video-k1b3a.tsx: dua video dari mesin Story, tanpa naskah lama");
  cek(!/\r/.test(pembungkus), "video-k1b3a.tsx: akhir baris LF");
  const sendiri = readFileSync(new URL("uji-story-k1b3a.mjs", import.meta.url), "utf8");
  cek(!/\r/.test(sendiri), "uji-story-k1b3a.mjs: akhir baris LF");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit diputar)`);
}
console.log(`Pemeriksaan: ${stat.hitung} deret hitungan, ${stat.pasang} kalimat tambah dan kurang, ${stat.kelompok} pemeriksaan benda`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
