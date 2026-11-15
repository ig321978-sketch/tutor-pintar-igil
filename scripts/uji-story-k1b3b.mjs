// Uji Story Kelas 1 Bab 3 Sub-Bab B (Berbagai Cara Pengurangan): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Video diputar bergaya guru: suara, teks terlihat, sumber, judul adegan, dan subjudul tanpa penyebutan buku (kata terlarang diperiksa pada adegan yang diputar).
// Memeriksa: pemicu kata, sinkron angka suara dan gambar, suara tanpa digit, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas, teks bertumpuk,
// pemisahan materi dan metode luar (nama Indonesia saja), hanya pengurangan dengan bilangan paling besar sepuluh (tanpa tambah, kali, bagi, atau bilangan lebih dari sepuluh),
// setiap kalimat pengurangan di gambar benar dan tidak negatif, banyak benda (telur, balon, kue, apel, titik bingkai, petak, anak tangga) dihitung ulang dari gambar dan dicocokkan dengan kata bilangan di suara,
// aturan Igil sebagai aplikasi belajar mandiri (tanpa ajakan berkelompok, bermain bersama teman, tampil di depan kelas, menulis atau menggambar di buku, membawa benda nyata, kertas, pensil),
// emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k1b3b.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k1b3b-video.ts");
const U1 = await import("../src/components/modul/story/k1b3b-luar-1.ts");

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
const VIDEO = [V.VIDEO_MATERI_K1B3B, V.VIDEO_LUAR_K1B3B];
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
      cek(!/[=×÷<>\/%+]/.test(kt.suara), `${nama}#${i + 1}: suara tanpa lambang yang sulit dibaca mesin suara`);
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
            const n = bilangan(o.d ?? "");
            const px = n.filter((_, q) => q % 2 === 0).map((q) => x + q);
            const py = n.filter((_, q) => q % 2 === 1).map((q) => y + q);
            cek(px.every((p) => p > -2 && p < 302) && py.every((p) => p > -2 && p < 204), `${nama}#${i + 1}: angka tulisan ${o.id} masuk kanvas`);
          }
        } else if (o.t === "garis" || o.t === "panah") cek(x > -2 && x < 302 && y > -2 && y < 204 && x + (o.x2 ?? 0) > -2 && x + (o.x2 ?? 0) < 302 && y + (o.y2 ?? 0) > -2 && y + (o.y2 ?? 0) < 204, `${nama}#${i + 1}: garis ${o.id} masuk kanvas`);
      }
      {
        const teksAda = akhir.filter((o) => o.t === "teks" && (o.op ?? 1) > 0 && o.isi && !/^[\u{1F000}-\u{1FFFF}]|^[✂✅❌➡↔]$/u.test(o.isi));
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
const M_VIDEO = V.VIDEO_MATERI_K1B3B;
const U = V.VIDEO_LUAR_K1B3B;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const NAMA_LUAR = /Hitung Mundur|Kurang di Bingkai|Mengambil|metode luar|metode dari luar/;
const NAMA_INGGRIS = /Take Away|Counting Back|Counting On|Ten Frame|Subtract|Part-Part|Subtraction/i;
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
const ketukanVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0);
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M_VIDEO);
  const luar = teksVideo(U);
  cek(!NAMA_LUAR.test(materi), "video materi tidak memuat nama metode luar");
  cek(!NAMA_INGGRIS.test(materi) && !NAMA_INGGRIS.test(luar), "tidak ada nama metode berbahasa Inggris di kedua video");
  for (const m of U1.NAMA_METODE_ID) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE_ID, ["Mengambil", "Hitung Mundur", "Kurang di Bingkai"], "nama Indonesia metode luar");
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
      const kena = semua.filter((t) => TERLARANG.test(t) || /soal nomor|Latihan 3\.[1-4]|nomor [1-9]\b(?! ?(?:ke|di))|catatan video|menurut buku/i.test(t));
      cek(kena.length === 0, `${v.id}/${a.id}: tanpa penyebutan buku atau catatan sumber (${kena.slice(0, 2).join(" | ")})`);
      cek(!/Uji Kompetensi|Pengayaan|Ayo Berlatih|Ayo Berdiskusi|Ayo Berefleksi|Ayo Mengingat|Ayo Berkomunikasi|Ayo Berpikir|soal \d|Soal \d|Eksplorasi|Refleksi/.test(semua.join(" | ")), `${v.id}/${a.id}: latihan disajikan sebagai Latihan, tanpa istilah buku`);
    }
  }
  // Aturan pemilik: Igil aplikasi belajar mandiri, interaktif, dan digital. Tanpa kelompok, teman, kawan, depan kelas, buku, menulis atau menggambar di buku, bawa benda, kertas, pensil, dan sejenisnya.
  const BUKAN_MANDIRI =
    /kelompok|teman|kawan|sahabat|depan kelas|bersama-sama|berpasangan|berkelompok|buku|menulis di|tulis di|menuliskan di|menggambar|gambarlah di|bawa|kertas|pensil|pulpen|bolpoin|spidol|krayon|kapur|papan tulis|penghapus|penggaris|siapkan|ambil (?:benda|bola|apel|kue|telur)|bermain bersama|diskusi|bertanya kepada|tanya (?:ke|pada)|guru kelas|orang tua|di rumah|benda nyata|bahan nyata|presentasi|bercerita di/i;
  for (const v of [M_VIDEO, U]) {
    for (const a of v.adegan) {
      const semua = [a.judul, a.sumber];
      a.ketukan.forEach((kt, i) => {
        semua.push(kt.suara);
        for (let p = 0; p < L.kataDari(kt.suara).length; p += 1) semua.push(...L.teksTerlihat(L.keadaanStory(a, i, p)));
      });
      const kena = [...new Set(semua.filter((t) => BUKAN_MANDIRI.test(t)))];
      cek(kena.length === 0, `${v.id}/${a.id}: tanpa ajakan berkelompok, bermain bersama teman, menulis di buku, atau memakai benda nyata (${kena.slice(0, 2).join(" | ")})`);
    }
  }
  cek(M_VIDEO.subjudul === "Materi kurikulum" && U.subjudul === "Tiga metode luar", "subjudul video: Materi kurikulum dan Tiga metode luar");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 46), "video materi: label sumber berbentuk Materi: ... dan pendek");
  cek(U.adegan.every((a) => /Metode luar|Ringkasan/i.test(a.sumber) && a.sumber.length <= 46), "video metode luar: label sumber metode luar atau ringkasan, pendek");
  cek(M_VIDEO.id === "k1b3b-materi" && U.id === "k1b3b-luar", "id video k1b3b-materi dan k1b3b-luar");
  cek(U.judul.endsWith(": Metode dari Luar") && !/menurut/i.test(M_VIDEO.judul), "judul video: materi tanpa 'menurut', luar berakhir ': Metode dari Luar'");
  cek(
    M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,cerita-taman,telur,bagan,balon,mundur-batu,mundur-kira,mundur-lain,nol,bingkai,sepuluh,pilih,latihan-satu,latihan-dua,latihan-tiga,penutup",
    "urutan adegan materi",
  );
  cek(
    U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-ambil,luar-ambil-terapan,luar-mundur,luar-mundur-terapan,luar-bingkai,luar-bingkai-terapan,luar-ringkas",
    "urutan adegan metode luar",
  );
  cek(M_VIDEO.adegan[0].id === "sapaan" && U.adegan[0].id === "sapaan", "tiap video dibuka adegan sapaan");
  cek(M_VIDEO.adegan.filter((a) => /^latihan-/.test(a.id)).length === 3 && M_VIDEO.adegan[M_VIDEO.adegan.length - 1].id === "penutup", "video materi: Latihan 1 sampai 3 lalu penutup");
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-ambil", "luar-ambil-terapan", "luar-mundur", "luar-mundur-terapan", "luar-bingkai", "luar-bingkai-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(U.adegan[1].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  for (const kata of ["Latihan", "Igil", "Malosi", "Kira", "Upe", "Wei", "dikurangi", "tersisa", "sama dengan", "gabungan", "sebagian", "pasangan", "mundur", "bingkai"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  // Hanya pengurangan dengan bilangan paling besar sepuluh: tanpa tambah, kali, bagi, atau bilangan lebih dari sepuluh (kurang, dikurangi, sisa, selisih, dan sama dengan memang isi sub-bab ini).
  const BOCOR = /\bbelas\b|\bpuluh\b|\bratus\b|\bribu\b|sebelas|dua belas|dikali|perkalian|dibagi|hasil bagi|\bkali\b|\bbagi\b|tambah|penjumlahan|menjumlah|jumlahkan/i;
  for (const v of [M_VIDEO, U]) {
    for (const a of v.adegan) cek(!BOCOR.test(teksAdegan(a)), `${v.id}/${a.id}: hanya pengurangan sampai sepuluh, tanpa tambah, kali, bagi, atau bilangan lebih dari sepuluh`);
    for (const a of v.adegan) for (const [i] of a.ketukan.entries()) for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) for (const b of bilanganDari(t)) cek(Number(b) <= 10, `${v.id}/${a.id}#${i + 1}: angka di gambar paling besar sepuluh ("${t}")`);
  }
  cek(ketukanVideo(M_VIDEO) >= 70, `ketukan video materi paling sedikit 70 (${ketukanVideo(M_VIDEO)})`);
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

/* ------------------------------ Banyak benda dan kalimat pengurangan dihitung ulang dari gambar ------------------------------ */
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
const hitungBenda = (objs, awalan) => objs.filter((o) => new RegExp(`^${awalan}\\d+$`).test(o.id)).length;
const kataSuara = (kt) => L.kataDari(kt.suara).map((w) => w.toLowerCase().replace(/[^a-z]/g, ""));
const stat = { hitung: 0, bingkai: 0, petak: 0 };
const adg = (id) => adegan(M_VIDEO, id) ?? adegan(U, id);
const S = (id, ke) => akhirAdegan(adg(id), ke);
const awalKata = (id, ke, kata) => L.keadaanStory(adg(id), ke, L.posisiKata(adg(id).ketukan[ke].suara, kata));
const titikDi = (objs, p) => objs.filter((o) => new RegExp(`^${p}-t\\d+$`).test(o.id)).length;
const sel = (objs, p, a, b) => objs.filter((o) => new RegExp(`^${p}-c\\d+$`).test(o.id) && Number(o.id.split("-c")[1]) >= a && Number(o.id.split("-c")[1]) < b && o.warna === "#93C5FD").length;
const PX = (i) => 30 + 24 * i;
const pusatKotak = (o) => o.x + o.w / 2;
const W_BALON = ["#F87171", "#FACC15"];
{
  // 1) Semua deret hitungan (angka hitungan `${id}n{i}` di atas benda `${id}{i}`): berurutan dan sesuai kata bilangan yang diucapkan berurutan.
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
          label.forEach((lb, q) => {
            const b = ketemu(objs, `${p}${q}`);
            const pusat = b.t === "kotak" ? b.x + b.w / 2 : b.x;
            cek(Math.abs(pusat - lb.x) < 1 && lb.y < (b.t === "kotak" ? b.y : b.y - (b.r ?? 0)), `${nama}: angka ${q + 1} tepat di atas benda ke-${q + 1}`);
            cek(lb.isi === String(q + 1), `${nama}: angka hitungan ke-${q + 1} bertuliskan ${q + 1}`);
          });
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
    const a = adg(id);
    cek(!!a, `adegan ${id} ada`);
    if (!a) return;
    sama(hitungBenda(akhirAdegan(a, ke), awalan), n, `${id}#${ke + 1}: ${n} benda ${awalan} di gambar`);
    cek(a.ketukan.some((kt) => kataSuara(kt).includes(NAMA_ANGKA[n])), `${id}: suara menyebut bilangan "${NAMA_ANGKA[n]}"`);
    stat.hitung += 1;
  };
  const emojiDari = (objs, awalan, e) => objs.filter((o) => new RegExp(`^${awalan}\\d+$`).test(o.id) && o.isi === e).length;
  const redup = (objs, awalan) => objs.filter((o) => new RegExp(`^${awalan}\\d+$`).test(o.id) && (o.op ?? 1) < 1).map((o) => o.id);
  const silangDi = (objs, awalan) => new Set(objs.filter((o) => new RegExp(`^${awalan}\\d+a$`).test(o.id)).map((o) => o.id)).size;
  const TELUR = "\u{1F95A}";
  const GORENG = "\u{1F373}";
  // Telur Kira: enam telur di piring, empat utuh dan dua pecah.
  {
    const c1 = S("cerita-taman", 1);
    banyakDi("cerita-taman", 1, "cu", 6);
    sama([emojiDari(c1, "cu", TELUR), emojiDari(c1, "cu", GORENG)], [4, 2], "cerita: empat telur utuh dan dua telur pecah");
    banyakDi("telur", 0, "te", 6);
    const t1 = S("telur", 1);
    sama([emojiDari(t1, "te", TELUR), emojiDari(t1, "te", GORENG), isiTeks(t1, "lu"), isiTeks(t1, "lp")], [4, 2, "4 utuh", "2 pecah"], "telur: empat utuh dua pecah");
    sama([redup(S("telur", 5), "te").join(), silangDi(S("telur", 5), "cx")], ["te4,te5", 2], "telur: dua telur pecah dicoret dan pergi");
    sama(isiTeks(S("telur", 6), "sk"), "6 − 2 = 4", "telur: 6 − 2 = 4");
    sama(isiTeks(S("telur", 4), "tj"), "4 dan 2 jadi 6", "telur: empat dan dua menjadi enam");
    // Bagan pasangan bilangan: gabungan paling besar.
    const b3 = S("bagan", 2);
    sama([isiTeks(b3, "bwh-t"), isiTeks(b3, "bpa-t"), isiTeks(b3, "bpb-t"), isiTeks(b3, "q1")], ["6", "4", "2", "6 − 2 = 4"], "bagan: gabungan 6, sebagian 4 dan 2, 6 − 2 = 4");
    cek(ketemu(b3, "bwh").r > ketemu(b3, "bpa").r && ketemu(b3, "bwh").y < ketemu(b3, "bpa").y, "bagan: lingkaran gabungan lebih besar dan di atas sebagian");
    sama([isiTeks(S("bagan", 3), "q1"), isiTeks(S("bagan", 3), "q2")], ["6 − 2 = 4", "6 − 4 = 2"], "bagan: satu bagan dua pengurangan");
  }
  // Balon Kira: tujuh balon, lima merah dan dua kuning.
  {
    banyakDi("balon", 0, "bl", 7);
    const b0 = S("balon", 0);
    sama([0, 1, 2, 3, 4, 5, 6].map((i) => ketemu(b0, `bl${i}`).warna), [0, 1, 2, 3, 4, 5, 6].map((i) => W_BALON[i < 5 ? 0 : 1]), "balon: lima merah lalu dua kuning");
    sama(isiTeks(S("balon", 1), "lm") + isiTeks(S("balon", 1), "lk"), "5 merah2 kuning", "balon: label lima merah dan dua kuning");
    sama([redup(S("balon", 3), "bl").join(), isiTeks(S("balon", 3), "s1")], ["bl5,bl6", "7 − 2 = 5"], "balon: dua balon kuning pergi, 7 − 2 = 5");
    sama([redup(S("balon", 4), "bl").join(), isiTeks(S("balon", 4), "s1"), isiTeks(S("balon", 4), "s2")], ["bl0,bl1,bl2,bl3,bl4", "7 − 2 = 5", "7 − 5 = 2"], "balon: lima balon merah pergi, 7 − 5 = 2");
    const b5 = S("balon", 5);
    sama([isiTeks(b5, "cwh-t"), isiTeks(b5, "cpa-t"), isiTeks(b5, "cpb-t"), isiTeks(b5, "r1"), isiTeks(b5, "r2")], ["7", "5", "2", "7 − 5 = 2", "7 − 2 = 5"], "balon: bagan tujuh, lima, dua dan dua pengurangan");
  }
  // Garis bilangan: petak nol sampai sepuluh, jarak sama; lompatan mundur Upe, Kira, Wei, dan Kira lagi.
  {
    for (const [id, ke] of [["mundur-batu", 0], ["mundur-kira", 0], ["mundur-lain", 0], ["latihan-tiga", 0]]) {
      const o = S(id, ke);
      sama([...Array(11).keys()].map((i) => isiTeks(o, `pn${i}`)), [...Array(11).keys()].map(String), `${id}: petak angka nol sampai sepuluh berurutan`);
      const px = [...Array(11).keys()].map((i) => pusatKotak(ketemu(o, `pt${i}`)));
      cek(px.every((x, i) => x === PX(i)), `${id}: jarak petak sama (24)`);
      stat.petak += 1;
    }
    const posisiDi = (id, ke, kata, tokoh) => ketemu(awalKata(id, ke, kata), tokoh).x;
    // Upe: tiga, lompat dua langkah, mendarat satu.
    const mb = adegan(M_VIDEO, "mundur-batu");
    sama(ketemu(akhirAdegan(mb, 1), "up").x, PX(3), "Upe mulai di tiga");
    sama([posisiDi("mundur-batu", 3, "pertama,", "up"), ketemu(awalKata("mundur-batu", 3, "dua."), "up").x, ketemu(S("mundur-batu", 3), "up").x], [PX(3), PX(2), PX(1)], "Upe: tiga, dua, satu (dua langkah ke belakang)");
    sama([isiTeks(S("mundur-batu", 3), "lm0"), isiTeks(S("mundur-batu", 3), "lm1"), isiTeks(S("mundur-batu", 4), "ds")], ["1", "2", "3 − 2 = 1"], "Upe: dua lompatan, 3 − 2 = 1");
    cek(ketemu(S("mundur-batu", 2), "ar").x2 === -2 * 24, "Upe: panah dua langkah ke kiri");
    sama([0, 1, 2].map((i) => isiTeks(S("mundur-batu", 5), `l${i + 1}-t0`)), ["1. tunjuk bilangan awal", "2. lompat ke belakang", "3. mendarat: itu hasilnya"], "tiga langkah menghitung mundur");
    // Kira: lima, tiga langkah ke belakang, mendarat dua.
    const mk = "mundur-kira";
    sama(ketemu(S(mk, 0), "kr").x, PX(5), "Kira mulai di lima");
    sama([ketemu(awalKata(mk, 1, "Empat,"), "kr").x, ketemu(awalKata(mk, 1, "dua."), "kr").x, ketemu(S(mk, 1), "kr").x, isiTeks(S(mk, 1), "lm0"), isiTeks(S(mk, 1), "lm1"), isiTeks(S(mk, 1), "lm2")], [PX(4), PX(2), PX(2), "1", "2", "3"], "Kira: empat, tiga, dua, tiga lompatan");
    sama(isiTeks(S(mk, 2), "ks"), "5 − 3 = 2", "Kira: 5 − 3 = 2");
    sama([0, 1, 2, 3].map((i) => isiTeks(S(mk, 3), `m${i}-t0`)), ["5", "4", "3", "2"], "kartu mundur lima, empat, tiga, dua");
    cek((ketemu(S(mk, 4), "m0-k").op ?? 1) < 1, "Kira: bilangan awal tidak ikut dihitung (kartu lima diredupkan)");
    // Wei: sembilan, empat langkah, mendarat lima; diperiksa dengan bagan.
    const ml = "mundur-lain";
    sama(ketemu(S(ml, 0), "wr").x, PX(9), "Wei mulai di sembilan");
    sama([ketemu(awalKata(ml, 1, "Delapan,"), "wr").x, ketemu(awalKata(ml, 1, "enam,"), "wr").x, ketemu(S(ml, 1), "wr").x, isiTeks(S(ml, 1), "lm3")], [PX(8), PX(6), PX(5), "4"], "Wei: delapan, tujuh, enam, lima, empat lompatan");
    sama(isiTeks(S(ml, 2), "ls"), "9 − 4 = 5", "Wei: 9 − 4 = 5");
    sama([isiTeks(S(ml, 3), "pkwh-t"), isiTeks(S(ml, 3), "pkpa-t"), isiTeks(S(ml, 3), "pkpb-t")], ["9", "5", "4"], "Wei: bagan sembilan, lima, empat untuk memeriksa");
    // Latihan 3: Kira tujuh mundur tiga ke empat.
    const lt = "latihan-tiga";
    sama([ketemu(S(lt, 0), "kr").x, ketemu(awalKata(lt, 1, "lima,"), "kr").x, ketemu(S(lt, 1), "kr").x, isiTeks(S(lt, 2), "es")], [PX(7), PX(5), PX(4), "7 − 3 = 4"], "Latihan 3: tujuh, enam, lima, empat; 7 − 3 = 4");
  }
  // Mobil kosong: tiga orang, semuanya turun; lalu tidak ada yang turun; lalu garis bilangan.
  {
    banyakDi("nol", 0, "or", 3);
    sama([redup(S("nol", 1), "or").length, silangDi(S("nol", 1), "nx"), isiTeks(S("nol", 1), "nl")], [3, 3, "0 orang"], "mobil: tiga orang turun, nol orang di mobil");
    sama([isiTeks(S("nol", 2), "n3"), isiTeks(S("nol", 2), "n0")], ["3 − 3 = 0", "0"], "mobil: 3 − 3 = 0");
    sama([hitungBenda(S("nol", 3), "or"), redup(S("nol", 3), "or").length, isiTeks(S("nol", 3), "n4")], [3, 0, "3 − 0 = 3"], "mobil: tiga orang tetap, 3 − 0 = 3");
    sama([isiTeks(S("nol", 4), "a1-t0"), isiTeks(S("nol", 4), "a2-t0")], ["3 − 0 = 3", "3 − 3 = 0"], "nol: dua hal yang diingat");
    const n5 = S("nol", 5);
    sama([ketemu(awalKata("nol", 5, "Di"), "nu").x, ketemu(n5, "nu").x], [PX(3), PX(0)], "nol: nol langkah tetap di tiga, tiga langkah sampai di nol");
  }
  // Bingkai sepuluh: sepuluh petak, tujuh titik, tiga petak kosong.
  {
    const g = "bingkai";
    sama([S(g, 0).filter((x) => /^bk-c\d+$/.test(x.id)).length, titikDi(S(g, 0), "bk")], [10, 0], "bingkai: sepuluh petak kosong");
    sama(titikDi(S(g, 1), "bk"), 7, "bingkai: tujuh titik merah");
    sama([sel(S(g, 2), "bk", 7, 10), titikDi(S(g, 2), "bk")], [3, 7], "bingkai: tiga petak kosong diberi warna biru");
    sama([isiTeks(S(g, 3), "ds")], ["10 − 7 = 3"], "bingkai: 10 − 7 = 3");
    sama([isiTeks(S(g, 4), "ds"), isiTeks(S(g, 4), "d2")], ["10 − 7 = 3", "10 − 3 = 7"], "bingkai: dua kalimat");
    stat.bingkai += 1;
    const s = "sepuluh";
    sama([titikDi(S(s, 0), "bq"), isiTeks(S(s, 0), "sd"), titikDi(S(s, 1), "bq"), isiTeks(S(s, 1), "sd"), titikDi(S(s, 2), "bq"), isiTeks(S(s, 2), "sd")], [6, "10 − 6 = 4", 4, "10 − 4 = 6", 9, "10 − 9 = 1"], "bingkai: terisi 6, 4, 9 dan kalimatnya");
    sama([0, 1, 2, 3, 4].map((i) => isiTeks(S(s, 3), `pq${i}-t0`)), ["1 dan 9", "2 dan 8", "3 dan 7", "4 dan 6", "5 dan 5"], "pasangan sepuluh");
    sama([isiTeks(S(s, 4), "sgwh-t"), isiTeks(S(s, 4), "sgpa-t"), isiTeks(S(s, 4), "sgpb-t"), isiTeks(S(s, 4), "g1"), isiTeks(S(s, 4), "g2")], ["10", "3", "7", "10 − 3 = 7", "10 − 7 = 3"], "pasangan sepuluh: bagan dan dua pengurangan");
    stat.bingkai += 1;
    sama([titikDi(S("pilih", 3), "pb"), isiTeks(S("pilih", 3), "pj")], [7, "10 − 7 = 3"], "memilih cara: bingkai tujuh titik");
    sama(isiTeks(S("pilih", 1), "pqpb-t"), "?", "memilih cara: bagan dengan sebagian yang dicari");
  }
  // Latihan 1: delapan kue, lima dimakan, tersisa tiga.
  {
    const l = "latihan-satu";
    banyakDi(l, 0, "kq", 8);
    sama([silangDi(S(l, 1), "kx"), [3, 4, 5, 6, 7].every((q) => ketemu(S(l, 1), `kx${q}a`))], [5, true], "Latihan 1: lima kue dicoret");
    sama([redup(S(l, 2), "kq").join(), isiTeks(S(l, 3), "kd")], ["kq3,kq4,kq5,kq6,kq7", "8 − 5 = 3"], "Latihan 1: tersisa tiga, 8 − 5 = 3");
    sama(["o2-t0", "o3-t0", "o4-t0"].map((i) => isiTeks(S(l, 4), i)), ["2", "3", "4"], "Latihan 1: pilihan 2, 3, 4");
    // Latihan 2: bagan delapan, tiga, dicari lima; lalu tiga, tiga, nol.
    const d = "latihan-dua";
    sama([isiTeks(S(d, 0), "ldwh-t"), isiTeks(S(d, 0), "ldpa-t"), isiTeks(S(d, 0), "ldpb-t"), isiTeks(S(d, 1), "ldpb-t"), isiTeks(S(d, 1), "d1")], ["8", "3", "?", "5", "8 − 3 = 5"], "Latihan 2: 8 = 3 dan sebagian yang dicari 5");
    sama([isiTeks(S(d, 2), "d1"), isiTeks(S(d, 2), "d2")], ["8 − 3 = 5", "8 − 5 = 3"], "Latihan 2: dua pengurangan dari delapan");
    sama([isiTeks(S(d, 3), "lewh-t"), isiTeks(S(d, 3), "lepa-t"), isiTeks(S(d, 3), "lepb-t")], ["3", "3", "0"], "Latihan 2: bagan tiga, tiga, nol");
    sama([isiTeks(S(d, 4), "e1"), isiTeks(S(d, 4), "e2")], ["3 − 3 = 0", "3 − 0 = 3"], "Latihan 2: 3 − 3 = 0 dan 3 − 0 = 3");
    // Latihan 3: bingkai lima titik, kartu bilangan nol sampai sepuluh.
    const t = "latihan-tiga";
    sama([titikDi(S(t, 3), "lk"), isiTeks(S(t, 3), "ed")], [5, "10 − 5 = 5"], "Latihan 3: bingkai lima titik, 10 − 5 = 5");
    sama([...Array(11).keys()].map((i) => isiTeks(S(t, 4), `ch${i}-t0`)), [...Array(11).keys()].map(String), "Latihan 3: kartu bilangan nol sampai sepuluh");
    stat.bingkai += 1;
  }
  // Metode luar.
  {
    const am = "luar-ambil";
    banyakDi(am, 1, "ak", 7);
    const a1 = S(am, 1);
    sama([[0, 1, 2, 3].every((i) => ketemu(a1, `ak${i}`).y < 100), [4, 5, 6].every((i) => ketemu(a1, `ak${i}`).y > 130)], [true, true], "Mengambil: tiga apel diseret keluar dari kumpulan, empat tinggal");
    sama([S(am, 2).filter((x) => /^akn\d$/.test(x.id)).length, isiTeks(S(am, 3), "as")], [4, "7 − 3 = 4"], "Mengambil: empat apel dihitung, 7 − 3 = 4");
    const at = "luar-ambil-terapan";
    banyakDi(at, 0, "tr", 8);
    sama([emojiDari(S(at, 0), "tr", TELUR), emojiDari(S(at, 0), "tr", GORENG)], [5, 3], "Mengambil terapan: delapan telur, tiga pecah");
    sama([silangDi(S(at, 1), "tx"), redup(S(at, 1), "tr").join()], [3, "tr5,tr6,tr7"], "Mengambil terapan: tiga telur pecah diambil");
    sama(isiTeks(S(at, 3), "bs"), "8 − 3 = 5", "Mengambil terapan: 8 − 3 = 5");
    const mu = "luar-mundur";
    sama([0, 1, 2, 3].map((i) => isiTeks(S(mu, 1), `m${i}-t0`)), ["8", "7", "6", "5"], "Hitung Mundur: kartu 8, 7, 6, 5");
    sama([isiTeks(S(mu, 1), "sl0"), isiTeks(S(mu, 1), "sl2"), isiTeks(S(mu, 2), "ms")], ["1", "3", "8 − 3 = 5"], "Hitung Mundur: tiga langkah, 8 − 3 = 5");
    const mt = "luar-mundur-terapan";
    const t0 = S(mt, 0);
    const langkah = (o, i) => pusatKotak(ketemu(o, `st${i}`));
    sama([[...Array(10).keys()].map((i) => isiTeks(t0, `sn${i + 1}`)).join(), [...Array(10).keys()].every((i) => i === 0 || ketemu(t0, `st${i + 1}`).y < ketemu(t0, `st${i}`).y)], ["1,2,3,4,5,6,7,8,9,10", true], "tangga: sepuluh anak tangga makin tinggi");
    sama([ketemu(t0, "wt").x, ketemu(awalKata(mt, 1, "delapan."), "wt").x, ketemu(S(mt, 1), "wt").x], [langkah(t0, 9), langkah(t0, 8), langkah(t0, 7)], "tangga: Wei turun dari sembilan ke delapan ke tujuh");
    cek(Math.abs(ketemu(S(mt, 1), "wt").y + 1 - ketemu(S(mt, 1), "st7").y) < 0.01, "tangga: Wei berdiri di atas anak tangga ketujuh");
    sama(isiTeks(S(mt, 2), "ts"), "9 − 2 = 7", "tangga: 9 − 2 = 7");
    const bi = "luar-bingkai";
    sama([titikDi(S(bi, 1), "kb"), titikDi(S(bi, 2), "kb"), sel(S(bi, 2), "kb", 5, 9), isiTeks(S(bi, 3), "fs")], [9, 5, 4, "9 − 4 = 5"], "Kurang di Bingkai: sembilan titik, empat dikosongkan, tersisa lima");
    const bu = "luar-bingkai-terapan";
    sama([titikDi(S(bu, 0), "ub"), titikDi(S(bu, 1), "ub"), sel(S(bu, 1), "ub", 6, 10), isiTeks(S(bu, 3), "gs")], [10, 6, 4, "10 − 4 = 6"], "Kurang di Bingkai terapan: sepuluh titik, empat pergi, tersisa enam");
    stat.bingkai += 2;
  }
}

/* ------------------------------ Setiap kalimat pengurangan di gambar benar, tidak negatif, dan paling besar sepuluh ------------------------------ */
{
  let n = 0;
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      for (let i = 0; i < a.ketukan.length; i += 1) {
        for (const t of L.teksTerlihat(akhirAdegan(a, i))) {
          for (const m of t.matchAll(/(\d+) − (\d+)(?: = (\d+))?/g)) {
            if (m[3] === undefined) continue;
            n += 1;
            cek(Number(m[1]) - Number(m[2]) === Number(m[3]) && Number(m[1]) <= 10 && Number(m[3]) >= 0, `${v.id}/${a.id}#${i + 1}: kalimat "${m[0]}" benar, tidak negatif, dan bilangan awalnya paling besar sepuluh`);
          }
          cek(!/[–×÷<>+]|\d\s-\s\d/.test(t), `${v.id}/${a.id}#${i + 1}: gambar tanpa tanda tambah, kali, bagi, atau pembanding ("${t}")`);
        }
      }
    }
  }
  cek(n >= 30, `kalimat pengurangan lengkap diperiksa (${n})`);
}

/* ------------------------------ Sapaan dan peta susun ------------------------------ */
{
  const HAL = ["Pasangan bilangan", "Hitung mundur", "Pengurangan di bingkai"];
  const sap = adegan(M_VIDEO, "sapaan");
  cek(/Halo anak-anak/.test(sap.ketukan[0].suara) && /Pasangan bilangan/i.test(L.teksTerlihat(akhirAdegan(sap, 1)).join(" | ")), "sapaan materi: tiga hal yang dipelajari tampil");
  sama(L.teksTerlihat(akhirAdegan(sap, 1)).filter((t) => HAL.includes(t)), HAL, "sapaan materi: daftar tiga hal");
  cek(!/\d/.test(sap.ketukan[1].suara), "sapaan materi: tanpa angka");
  const cerita = adegan(M_VIDEO, "cerita-taman");
  sama(L.teksTerlihat(akhirAdegan(cerita, 3)).filter((t) => HAL.includes(t)), HAL, "cerita taman: tiga hal sama dengan daftar sapaan");
  // Peta dan tabel: dari berkas data bila sudah digabung, bila belum dari berkas sementara .tmp-k1b3s/B.json.
  const ringkas = JSON.parse(readFileSync(new URL("../src/data/kelas1-bab3-ringkas.json", import.meta.url), "utf8")).subBab?.B;
  const sementara = new URL("../.tmp-k1b3s/B.json", import.meta.url);
  const A = ringkas?.petaSusun && ringkas?.tabelSusun ? ringkas : existsSync(sementara) ? JSON.parse(readFileSync(sementara, "utf8")) : null;
  cek(!!A, "peta dan tabel susun: ada di kelas1-bab3-ringkas.json (subBab.B) atau .tmp-k1b3s/B.json");
  if (A) {
    const peta = A.petaSusun.simpul;
    const anak = (id) => peta.filter((s) => s.induk === id).map((s) => s.teks);
    const akar = peta.filter((s) => s.induk === null);
    cek(akar.length === 3, "peta susun: tiga cabang dari pusat");
    sama(anak(akar[0].id), HAL, "peta susun: cabang pertama sama dengan daftar sapaan");
    sama([anak(akar[1].id).length, anak(akar[2].id).length, peta.length], [3, 2, 11], "peta susun: 3 cara, 2 hasil, 11 simpul");
    cek(peta.every((s) => s.teks.length <= 28) && new Set(peta.map((s) => s.teks)).size === peta.length, "peta susun: teks <= 28 huruf dan unik");
    cek(peta.map((s) => s.nomor).sort((m, n) => m - n).join() === [...Array(11).keys()].map((i) => i + 1).join(), "peta susun: nomor 1 sampai 11");
    cek(!/\d/.test(A.petaSusun.pusat.suara) && !/\d/.test(A.petaSusun.petunjuk) && peta.every((s) => !/\d/.test(s.petunjuk ?? "")), "peta susun: suara dan petunjuk tanpa digit");
    cek(akar.map((s) => s.teks).join() === "Tiga hal yang dipelajari,Cara melakukannya,Hasil yang diharapkan", "peta susun: tiga cabang berurutan hal, cara, hasil");
    const T = A.tabelSusun;
    cek(T.baris.length >= 3 && T.baris.length <= 5 && T.kolom.length >= 3 && T.kolom.length <= 4, "tabel susun: 3 sampai 5 baris dan 3 sampai 4 kolom");
    cek(T.baris.every((b) => b.sel.every((s) => s.length <= 26 && (s.match(/\d+/g) ?? []).length <= 1)), "tabel susun: sel <= 26 huruf dan paling banyak satu angka per sel");
    cek(T.baris.every((b) => b.label.split(/\s+/).every((w) => w.length <= 8)), "tabel susun: kata terpanjang kolom label <= 8 huruf");
    cek(T.baris.every((b) => b.sel.every((s) => s.length <= 10)), "tabel susun: sel pendek (<= 10 huruf) supaya margin teks sel >= 5 px di lebar 405 px");
    cek(!/\d/.test(T.suara) && !/\d/.test(T.petunjuk), "tabel susun: suara dan petunjuk tanpa digit");
    // Pengurangan pada tabel benar, hanya sampai sepuluh.
    for (const b of T.baris) {
      const m = /^(\d+) kurang (\d+)$/.exec(b.label);
      cek(!!m, `tabel susun: label baris "${b.label}" berbentuk soal pengurangan`);
      if (m) {
        cek(b.sel.some((s) => s === String(Number(m[1]) - Number(m[2]))) && Number(m[1]) <= 10 && Number(m[1]) >= Number(m[2]), `tabel susun: baris ${b.label} memuat sisa yang benar`);
        cek(b.sel.some((s) => s.toLowerCase() === NAMA_ANGKA[Number(m[1])]), `tabel susun: baris ${b.label} memuat bilangan awal dengan kata`);
        cek(b.sel.some((s) => ["Pasangan", "Mundur", "Bingkai"].includes(s)), `tabel susun: baris ${b.label} memuat nama cara`);
      }
    }
    const semuaTeks = JSON.stringify({ p: A.petaSusun, t: A.tabelSusun });
    cek(!/kelompok|teman|kawan|depan kelas|berpasangan|buku|menulis di|menggambar|bawa|kertas|pensil|tambah|\+/i.test(semuaTeks), "peta dan tabel susun: tanpa kelompok, teman, kawan, depan kelas, buku, menulis di, menggambar, bawa, kertas, pensil, atau tambah");
    cek(!/Take Away|Counting|Ten Frame/i.test(semuaTeks), "peta dan tabel susun: tanpa nama metode berbahasa Inggris");
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k1b3b-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k1b3b-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k1b3b sendiri (${impor.join(", ")})`);
  }
  // Emoji dalam data teks gambar juga paling tinggi Emoji 12 (diperiksa pada gambar yang diputar).
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d), `${v.id}/${a.id}: emoji gambar paling tinggi Emoji 12`);
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k1b3b.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|naskah-k1b1/.test(pembungkus) && /VIDEO_MATERI_K1B3B/.test(pembungkus) && /VIDEO_LUAR_K1B3B/.test(pembungkus) && /export function VideoK1B3B/.test(pembungkus) && /daftar-video-cerita/.test(pembungkus), "video-k1b3b.tsx: dua video dari mesin Story, tanpa naskah lama");
  cek(!/\r/.test(pembungkus), "video-k1b3b.tsx: akhir baris LF");
  const sendiri = readFileSync(new URL("uji-story-k1b3b.mjs", import.meta.url), "utf8");
  cek(!/\r/.test(sendiri), "uji-story-k1b3b.mjs: akhir baris LF");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit diputar)`);
}
console.log(`Pemeriksaan: ${stat.hitung} deret hitungan, ${stat.petak} garis bilangan, ${stat.bingkai} bingkai`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
