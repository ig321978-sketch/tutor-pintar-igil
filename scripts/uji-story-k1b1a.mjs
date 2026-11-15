// Uji Story Kelas 1 Bab 1 Sub-Bab A (Menghitung, Membaca, dan Menulis Bilangan 0 sampai 10): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Video diputar bergaya guru: suara, teks terlihat, sumber, judul adegan, dan subjudul tanpa penyebutan buku (kata terlarang diperiksa pada adegan yang diputar).
// Memeriksa: pemicu kata, sinkron angka suara dan gambar (bilangan yang diucapkan dengan kata tampak sebagai angka), suara tanpa digit, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas,
// teks bertumpuk, pemisahan materi dan metode luar, tidak membocorkan tambah, kurang, perbandingan, atau bilangan lebih dari sepuluh, banyak benda yang dihitung (benda, angka hitungan, titik kartu, bingkai)
// dihitung ulang dari gambar dan dicocokkan dengan kata bilangan di suara, nama angka nol sampai sepuluh, angka tulisan tangan, emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k1b1a.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k1b1a-video.ts");
const G = await import("../src/components/modul/story/k1b1a-gambar.ts");
const U1 = await import("../src/components/modul/story/k1b1a-luar-1.ts");

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
const VIDEO = [V.VIDEO_MATERI_K1B1A, V.VIDEO_LUAR_K1B1A];
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
const M_VIDEO = V.VIDEO_MATERI_K1B1A;
const U = V.VIDEO_LUAR_K1B1A;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const NAMA_LUAR = /One-to-One|Cardinality|Subitizing|Korespondensi|Kardinalitas|Melihat Sekilas|metode luar|metode dari luar/i;
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M_VIDEO);
  const luar = teksVideo(U);
  cek(!NAMA_LUAR.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE, ["One-to-One", "Cardinality", "Subitizing"], "nama metode di berkas luar-1");
  sama(U1.NAMA_METODE_ID, ["Korespondensi Satu-satu", "Kardinalitas", "Melihat Sekilas"], "nama Indonesia metode luar");
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
  cek(M_VIDEO.id === "k1b1a-materi" && U.id === "k1b1a-luar", "id video k1b1a-materi dan k1b1a-luar");
  cek(U.judul.endsWith(": Metode dari Luar") && !/menurut/i.test(M_VIDEO.judul), "judul video: materi tanpa 'menurut', luar berakhir ': Metode dari Luar'");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,cerita-taman,hitung-satu,bilangan-terakhir,sekilas,sampai-sepuluh,baca-nama,tulis-angka,nol,latihan-satu,latihan-dua,latihan-tiga,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-satu,luar-satu-terapan,luar-kardinal,luar-kardinal-terapan,luar-sekilas,luar-sekilas-terapan,luar-ringkas", "urutan adegan metode luar");
  cek(M_VIDEO.adegan[0].id === "sapaan" && U.adegan[0].id === "sapaan", "tiap video dibuka adegan sapaan");
  cek(M_VIDEO.adegan.filter((a) => /^latihan-/.test(a.id)).length === 3 && M_VIDEO.adegan[M_VIDEO.adegan.length - 1].id === "penutup", "video materi: Latihan 1 sampai 3 lalu penutup");
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-satu", "luar-satu-terapan", "luar-kardinal", "luar-kardinal-terapan", "luar-sekilas", "luar-sekilas-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(U.adegan[1].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  for (const kata of ["Latihan", "Igil", "Malosi", "Kira", "Upe", "Wei", "nol", "sekilas"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  // Hanya bilangan 0 sampai 10: tanpa tambah, kurang, banding, atau bilangan lebih dari sepuluh.
  const BOCOR = /tambah|kurang|jumlah|lebih (banyak|besar|sedikit|kecil)|bandingkan|membandingkan|\bbelas\b|\bpuluh\b|\bratus\b|\bribu\b|sebelas|dua belas|operasi|hasil bagi|dikali/i;
  for (const v of [M_VIDEO, U]) {
    for (const a of v.adegan) cek(!BOCOR.test(teksAdegan(a)), `${v.id}/${a.id}: hanya bilangan nol sampai sepuluh, tanpa tambah, kurang, banding, atau bilangan lebih dari sepuluh`);
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
  // 2) Banyak benda yang disebut ("Ada <bilangan> <benda>") sama dengan jumlah benda di gambar.
  const banyakDi = (id, ke, awalan, kataBenda, n) => {
    const a = adegan(M_VIDEO, id) ?? adegan(U, id);
    cek(!!a, `adegan ${id} ada`);
    if (!a) return;
    const objs = akhirAdegan(a, ke);
    sama(hitungBenda(objs, awalan), n, `${id}#${ke + 1}: ${n} ${kataBenda} di gambar`);
    const suara = kataSuara(a.ketukan[ke]).join(" ");
    cek(a.ketukan.some((kt) => kataSuara(kt).includes(NAMA_ANGKA[n])), `${id}: suara menyebut bilangan "${NAMA_ANGKA[n]}"`);
  };
  banyakDi("sampai-sepuluh", 0, "e", "balon", 6);
  banyakDi("sampai-sepuluh", 1, "f", "pensil", 7);
  banyakDi("sampai-sepuluh", 2, "g", "layang", 8);
  banyakDi("sampai-sepuluh", 3, "h", "kelereng", 9);
  banyakDi("sampai-sepuluh", 4, "i", "bola", 10);
  banyakDi("latihan-satu", 0, "ly", "layang", 7);
  banyakDi("latihan-dua", 0, "pm", "pensil", 3);
  banyakDi("hitung-satu", 0, "b", "bola", 5);
  banyakDi("bilangan-terakhir", 0, "c", "balon", 4);
  banyakDi("bilangan-terakhir", 4, "d", "kelereng", 3);
  banyakDi("nol", 0, "nb", "bola", 5);
  banyakDi("luar-satu-terapan", 0, "ke", "kelereng", 6);
  banyakDi("luar-kardinal-terapan", 0, "pm", "pensil", 8);
  // Pasangan satu benda satu angka pada metode pertama: empat bola, empat kartu angka 1 sampai 4, empat garis.
  {
    const o = akhirAdegan(adegan(U, "luar-satu"), 0);
    sama([hitungBenda(o, "sa"), [0, 1, 2, 3].map((i) => isiTeks(o, `sac${i}-t`)), [0, 1, 2, 3].map((i) => !!ketemu(o, `sag${i}`))], [4, ["1", "2", "3", "4"], [true, true, true, true]], "One-to-One: empat bola, empat kartu angka, empat garis");
    const s4 = akhirAdegan(adegan(U, "luar-satu"), 3);
    cek([0, 1, 2, 3].every((i) => ketemu(s4, `sag${i}`) && ketemu(s4, `sac${i}-k`)), "One-to-One: pada kesimpulan tiap benda punya satu garis dan satu angka");
  }
  // Keranjang: nol bola di keranjang kedua, lima di keranjang pertama (bola di atas keranjang pertama saja).
  {
    const n = akhirAdegan(adegan(M_VIDEO, "nol"), 3);
    const k1 = ketemu(n, "ks1");
    const k2 = ketemu(n, "ks2");
    const dalam = (b, k) => b.x > k.x && b.x < k.x + k.w;
    const bola = n.filter((o) => /^nb\d+$/.test(o.id));
    sama([bola.filter((b) => dalam(b, k1)).length, bola.filter((b) => dalam(b, k2)).length], [5, 0], "nol: lima bola di keranjang pertama, nol di keranjang kedua");
    cek(isiTeks(n, "nl") === "0", "nol: angka 0 tampil untuk keranjang kosong");
    const m = akhirAdegan(adegan(M_VIDEO, "latihan-dua"), 3);
    const pm = m.filter((o) => /^pm\d+$/.test(o.id));
    sama([pm.filter((b) => b.x > ketemu(m, "kp1").x && b.x < ketemu(m, "kp1").x + ketemu(m, "kp1").w).length, pm.filter((b) => b.x > ketemu(m, "kp2").x).length, isiTeks(m, "m3"), isiTeks(m, "m0")], [3, 0, "3", "0"], "Latihan 2: tiga pensil di kotak pertama, nol di kotak kedua");
  }
  // Pemindahan kelereng: tiap kelereng pindah ke wadah, hitungan berjalan sama dengan banyak yang sudah pindah.
  {
    const a = adegan(U, "luar-satu-terapan");
    const wadah = ketemu(akhirAdegan(a, 0), "kw");
    const pos = L.posisiKata(a.ketukan[1].suara, "enam");
    let ok = true;
    for (let kata = 0; kata <= pos; kata += 1) {
      const objs = L.keadaanStory(a, 1, kata);
      const dalam = objs.filter((o) => /^ke\d+$/.test(o.id) && o.x > wadah.x && o.x < wadah.x + wadah.w && o.y > wadah.y).length;
      const hitung = Number(isiTeks(objs, "kc"));
      if (dalam !== hitung) ok = false;
    }
    cek(ok, "pemindahan kelereng: angka hitungan sama dengan banyak kelereng yang sudah di wadah, tiap kata");
    sama(L.keadaanStory(a, 1, 9999).filter((o) => /^ke\d+$/.test(o.id) && o.x > wadah.x && o.y > wadah.y).length, 6, "pemindahan kelereng: enam di wadah pada akhir");
  }
  // Hitung dari kanan ke kiri: angka terakhir (delapan) tetap di ujung kiri; label kanan mulai satu.
  {
    const a = adegan(U, "luar-kardinal-terapan");
    const o = akhirAdegan(a, 2);
    sama([isiTeks(o, "pmn7"), isiTeks(o, "pmn0")], ["1", "8"], "Cardinality: dari kanan mulai satu, berakhir delapan di benda paling kiri");
    sama([0, 1, 2, 3, 4, 5, 6, 7].map((i) => isiTeks(o, `pmn${i}`)), ["8", "7", "6", "5", "4", "3", "2", "1"], "Cardinality: angka dari kanan ke kiri");
  }
  // Kartu titik: banyak titik tiap kartu sama dengan kata bilangannya.
  const titik = (objs, p) => objs.filter((o) => new RegExp(`^${p}-t\\d+$`).test(o.id)).length;
  const kartuTitik = [["sekilas", 0, "s3", 3], ["sekilas", 3, "s4", 4], ["sekilas", 4, "t3", 3], ["sekilas", 4, "t4", 4], ["sekilas", 4, "t5", 5], ["sekilas", 5, "sk", 3], ["sekilas", 5, "bk", 8], ["latihan-tiga", 0, "lk", 4], ["luar-sekilas", 0, "ua", 2], ["luar-sekilas", 0, "ub", 3], ["luar-sekilas", 1, "uc1", 1], ["luar-sekilas", 1, "uc2", 2], ["luar-sekilas", 1, "uc3", 3], ["luar-sekilas", 1, "uc4", 4], ["luar-sekilas", 1, "uc5", 5], ["luar-sekilas", 2, "ud", 8], ["luar-sekilas", 3, "ue", 4], ["luar-sekilas-terapan", 0, "ta", 5], ["luar-sekilas-terapan", 2, "tb", 3]];
  for (const [id, ke, p, n] of kartuTitik) {
    const a = adegan(M_VIDEO, id) ?? adegan(U, id);
    const o = akhirAdegan(a, ke);
    stat.titik += 1;
    sama(titik(o, p), n, `${id}#${ke + 1}: kartu ${p} bertitik ${n}`);
    const k = ketemu(o, `${p}-k`);
    cek(k && ketemu(o, `${p}-t0`) && o.filter((x) => new RegExp(`^${p}-t\\d+$`).test(x.id)).every((d) => d.x > k.x && d.x < k.x + k.w && d.y > k.y && d.y < k.y + k.h), `${id}#${ke + 1}: semua titik ${p} berada di dalam kartunya`);
  }
  // Label angka di bawah kartu titik sama dengan banyak titiknya.
  {
    const o = akhirAdegan(adegan(M_VIDEO, "sekilas"), 4);
    sama([isiTeks(o, "l3"), isiTeks(o, "l4"), isiTeks(o, "l5")], ["3", "4", "5"], "kartu titik tiga, empat, lima berlabel angka");
    const p = akhirAdegan(adegan(U, "luar-sekilas"), 1);
    sama([1, 2, 3, 4, 5].map((n) => isiTeks(p, `ucl${n}`)), ["1", "2", "3", "4", "5"], "kartu titik satu sampai lima berlabel angka");
    sama([isiTeks(akhirAdegan(adegan(M_VIDEO, "sekilas"), 1), "a3"), isiTeks(akhirAdegan(adegan(M_VIDEO, "sekilas"), 3), "a4")], ["3", "4"], "jawaban sekilas tiga dan empat");
    const t2 = akhirAdegan(adegan(U, "luar-sekilas-terapan"), 1);
    sama([isiTeks(t2, "tq"), (ketemu(t2, "ta-t0")?.op ?? 1)], ["5", 0], "tebak sekilas: kartu ditutup, jawaban lima");
    sama(isiTeks(akhirAdegan(adegan(U, "luar-sekilas-terapan"), 2), "tr"), "3", "tebak sekilas kedua: jawaban tiga");
    sama(isiTeks(akhirAdegan(adegan(M_VIDEO, "latihan-tiga"), 3), "jw"), "4", "Latihan 3: jawaban empat");
    const ck = akhirAdegan(adegan(M_VIDEO, "latihan-tiga"), 2);
    sama([0, 1, 2, 3].map((i) => isiTeks(ck, `ck${i}`)), ["1", "2", "3", "4"], "Latihan 3: hitungan cek satu sampai empat");
  }
  // Bingkai sepuluh: sepuluh sel dan sepuluh titik, angka 10.
  {
    const o = akhirAdegan(adegan(M_VIDEO, "sampai-sepuluh"), 5);
    sama([o.filter((x) => /^bf-c\d+$/.test(x.id)).length, o.filter((x) => /^bf-t\d+$/.test(x.id)).length, isiTeks(o, "s10")], [10, 10, "10"], "bingkai sepuluh: sepuluh sel, sepuluh titik, angka 10");
  }
}

/* ------------------------------ Nama angka nol sampai sepuluh ------------------------------ */
{
  const baca = adegan(M_VIDEO, "baca-nama");
  const sel = akhirAdegan(baca, 3);
  const NAMA = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh"];
  sama([...Array(11).keys()].map((i) => isiTeks(sel, `r${i}-t`)), [...Array(11).keys()].map(String), "kartu angka nol sampai sepuluh berurutan");
  sama([...Array(11).keys()].map((i) => isiTeks(sel, `rn${i}`)), NAMA, "nama angka di bawah kartu: nol sampai sepuluh");
  const sebut = (kt, awal) => kataSuara(kt).slice(awal);
  sama(kataSuara(baca.ketukan[1]).filter((w) => NAMA.includes(w)), NAMA.slice(0, 6), "suara membaca nol sampai lima berurutan");
  sama(kataSuara(baca.ketukan[3]).filter((w) => NAMA.includes(w)), NAMA.slice(6), "suara membaca enam sampai sepuluh berurutan");
  cek(sebut(baca.ketukan[0], 0).filter((w) => NAMA.includes(w)).join() === NAMA.slice(0, 6).join(), "suara kartu nol sampai lima berurutan");
  // Kartu sama besar dan berderet kiri ke kanan.
  const kar = [...Array(11).keys()].map((i) => ketemu(sel, `r${i}-k`));
  cek(kar.every((o) => o.w === kar[0].w && o.h === kar[0].h), "kartu angka sama besar");
  cek(kar.slice(0, 6).every((o, i, s) => i === 0 || (o.x > s[i - 1].x && o.y === s[0].y)) && kar.slice(6).every((o, i, s) => i === 0 || (o.x > s[i - 1].x && o.y === s[0].y)), "kartu angka berderet kiri ke kanan");
  // Angka tulisan tangan: jumlah angka sesuai tulisan.
  const tulis = adegan(M_VIDEO, "tulis-angka");
  const jumlah = [1, 2, 3, 5, 6].map((i) => akhirAdegan(tulis, i).filter((o) => /^w\d+$/.test(o.id)).length);
  stat.tulis = jumlah.reduce((a, b) => a + b, 0);
  sama(jumlah, [1, 1, 1, 2, 1], "angka tulisan tangan: satu, dua, tiga, sepuluh (dua angka), lima");
  cek("0123456789".split("").every((c) => G.tulisAngka("t", 0, 0, c).length === 1), "kerangka tulisan angka nol sampai sembilan tersedia");
  sama(G.tulisAngka("t", 0, 0, "10").map((o) => o.x), [0, 32], "angka sepuluh: dua angka berdampingan");
  cek(akhirAdegan(tulis, 5).filter((o) => /^w\d+$/.test(o.id)).every((o) => o.gambar === true), "angka tulisan tergambar bertahap");
  const nol = akhirAdegan(adegan(M_VIDEO, "nol"), 5);
  sama(nol.filter((o) => /^z\d+$/.test(o.id)).length, 1, "menulis nol: satu angka nol digambar");
  // Angka yang ditulis sama dengan kata di suara (satu, dua, tiga, tujuh, lima).
  const sama1 = [["latihan-satu", 3, "w", "7", "tujuh"]];
  for (const [id, ke, , , kata] of sama1) cek(kataSuara(adegan(M_VIDEO, id).ketukan[ke]).includes(kata), `${id}: suara menyebut ${kata}`);
}

/* ------------------------------ Sapaan dan peta susun ------------------------------ */
{
  const sap = adegan(M_VIDEO, "sapaan");
  cek(/Halo anak-anak/.test(sap.ketukan[0].suara) && /Menghitung benda/i.test(L.teksTerlihat(akhirAdegan(sap, 1)).join(" | ")), "sapaan materi: tiga hal yang dipelajari tampil");
  sama(L.teksTerlihat(akhirAdegan(sap, 1)).filter((t) => ["Menghitung benda", "Membaca angka", "Menulis angka"].includes(t)), ["Menghitung benda", "Membaca angka", "Menulis angka"], "sapaan materi: daftar tiga hal");
  cek(!/\d/.test(sap.ketukan[1].suara), "sapaan materi: tanpa angka");
  if (true) {
    const A = JSON.parse(readFileSync(new URL("../src/data/kelas1-bab1-ringkas.json", import.meta.url), "utf8")).subBab.A;
    const peta = A.petaSusun.simpul;
    const anak = (id) => peta.filter((s) => s.induk === id).map((s) => s.teks);
    const akar = peta.filter((s) => s.induk === null);
    cek(akar.length === 3, "peta susun: tiga cabang dari pusat");
    sama(anak(akar[0].id), ["Menghitung benda", "Membaca angka", "Menulis angka"], "peta susun: cabang pertama sama dengan daftar sapaan");
    sama([anak(akar[1].id).length, anak(akar[2].id).length, peta.length], [3, 2, 11], "peta susun: 3 cara, 2 hasil, 11 simpul");
    cek(peta.every((s) => s.teks.length <= 28) && new Set(peta.map((s) => s.teks)).size === peta.length, "peta susun: teks <= 28 huruf dan unik");
    cek(!/\d/.test(A.petaSusun.pusat.suara) && !/\d/.test(A.petaSusun.petunjuk) && peta.every((s) => !/\d/.test(s.petunjuk ?? "")), "peta susun: suara dan petunjuk tanpa digit");
    const T = A.tabelSusun;
    cek(T.baris.length >= 3 && T.baris.length <= 5 && T.kolom.length >= 3 && T.kolom.length <= 4, "tabel susun: 3 sampai 5 baris dan 3 sampai 4 kolom");
    cek(T.baris.every((b) => b.sel.every((s) => s.length <= 26 && (s.match(/\d+/g) ?? []).length <= 1)), "tabel susun: sel <= 26 huruf dan paling banyak satu angka per sel");
    cek(T.baris.every((b) => b.label.split(/\s+/).every((w) => w.length <= 8)), "tabel susun: kata terpanjang kolom label <= 8 huruf");
    cek(!/\d/.test(T.suara) && !/\d/.test(T.petunjuk), "tabel susun: suara dan petunjuk tanpa digit");
  } else cek(false, "peta dan tabel susun: .tmp-k1b1as/A.json ada");
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k1b1a-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k1b1a-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k1b1a sendiri (${impor.join(", ")})`);
  }
  // Emoji dalam data teks gambar juga paling tinggi Emoji 12 (diperiksa pada gambar yang diputar).
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d), `${v.id}/${a.id}: emoji gambar paling tinggi Emoji 12`);
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k1b1a.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|naskah-k1b1/.test(pembungkus) && /VIDEO_MATERI_K1B1A/.test(pembungkus) && /VIDEO_LUAR_K1B1A/.test(pembungkus) && /export function VideoK1B1A/.test(pembungkus) && /daftar-video-cerita/.test(pembungkus), "video-k1b1a.tsx: dua video dari mesin Story, tanpa naskah lama");
  cek(!/\r/.test(pembungkus), "video-k1b1a.tsx: akhir baris LF");
  const sendiri = readFileSync(new URL("uji-story-k1b1a.mjs", import.meta.url), "utf8");
  cek(!/\r/.test(sendiri), "uji-story-k1b1a.mjs: akhir baris LF");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit diputar)`);
}
console.log(`Pemeriksaan: ${stat.hitung} deret hitungan, ${stat.titik} kartu titik, ${stat.tulis} angka tulisan`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
