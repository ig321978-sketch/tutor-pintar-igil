// Uji Story Kelas 1 Bab 5 Sub-Bab B (Menghitung Maju dan Mundur): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Video diputar bergaya guru: suara, teks terlihat, sumber, judul adegan, dan subjudul tanpa penyebutan buku (kata terlarang diperiksa pada adegan yang diputar).
// Memeriksa: pemicu kata, sinkron angka suara dan gambar (bilangan sepuluh sampai dua puluh tampak tepat saat diucapkan), suara tanpa digit, perubahan gambar tiap ketukan,
// keunikan antaradegan, batas kanvas, teks bertumpuk, pemisahan materi dan metode luar (nama Indonesia saja), hanya bilangan sampai dua puluh (tanpa kali, bagi, rumus),
// tangga, garis bilangan, kisi, ulat, es krim, lampu roket, kelereng, dan dua bingkai sepuluh dihitung ulang dari gambar dan dicocokkan dengan suara dan tabel,
// aturan Igil sebagai aplikasi belajar mandiri (tanpa ajakan kelompok belajar, bermain bersama teman, tampil di depan kelas, menulis atau menggambar di buku, membawa benda nyata, kertas, pensil),
// emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k1b5b.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k1b5b-video.ts");
const U1 = await import("../src/components/modul/story/k1b5b-luar-1.ts");

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
const VIDEO = [V.VIDEO_MATERI_K1B5B, V.VIDEO_LUAR_K1B5B];
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
const M_VIDEO = V.VIDEO_MATERI_K1B5B;
const U = V.VIDEO_LUAR_K1B5B;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const NAMA_LUAR = /(?:^|[^a-z])hitung sampai (?:20|dua puluh)|sepuluh dan satuan|dua bingkai sepuluh|metode luar|metode dari luar/i;
const NAMA_INGGRIS = /Count to|Counting|Ten and Ones|Double Ten Frame|Ten Frame|Place value|Counting On/i;
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
const ketukanVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0);
const semuaTeksAdegan = (a) => {
  const semua = [a.judul, a.sumber];
  a.ketukan.forEach((kt, i) => {
    semua.push(kt.suara);
    for (let p = 0; p < L.kataDari(kt.suara).length; p += 1) semua.push(...L.teksTerlihat(L.keadaanStory(a, i, p)));
  });
  return semua;
};
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M_VIDEO);
  const luar = teksVideo(U);
  cek(!NAMA_LUAR.test(materi), "video materi tidak memuat nama metode luar");
  cek(!NAMA_INGGRIS.test(materi) && !NAMA_INGGRIS.test(luar), "tidak ada nama metode berbahasa Inggris di kedua video");
  for (const m of U1.NAMA_METODE_ID) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE_ID, ["Hitung sampai 20", "Sepuluh dan Satuan", "Dua Bingkai Sepuluh"], "nama Indonesia metode luar");
  // Video diputar sebagai guru yang mengajar: tidak ada penyebutan sumber buku di suara, teks terlihat, label sumber, judul adegan, dan subjudul.
  const TERLARANG = /buku|panduan guru|hlm|halaman|kunci|rubrik|salah ketik|salah cetak|tambahan video|contoh video|temuan|pertemuan/i;
  for (const v of [M_VIDEO, U]) {
    cek(!TERLARANG.test(`${v.judul} ${v.subjudul}`), `${v.id}: judul dan subjudul video tanpa kata terlarang`);
    cek(!/nomor|no\./i.test(v.subjudul) && v.subjudul.length <= 40, `${v.id}: subjudul pendek tanpa nomor halaman`);
    for (const a of v.adegan) {
      const semua = semuaTeksAdegan(a);
      const kena = semua.filter((t) => TERLARANG.test(t) || /soal nomor|Latihan 3\.[1-4]|nomor [1-9]\b(?! ?(?:ke|di))|catatan video|menurut buku/i.test(t));
      cek(kena.length === 0, `${v.id}/${a.id}: tanpa penyebutan buku atau catatan sumber (${kena.slice(0, 2).join(" | ")})`);
      cek(!/Uji Kompetensi|Pengayaan|Ayo Berlatih|Ayo Berdiskusi|Ayo Berefleksi|Ayo Mengingat|Ayo Berkomunikasi|Ayo Berpikir|Ayo Mencoba|soal \d|Soal \d|Eksplorasi|Refleksi/.test(semua.join(" | ")), `${v.id}/${a.id}: latihan disajikan sebagai Latihan, tanpa istilah buku`);
    }
  }
  // Aturan pemilik: Igil aplikasi belajar mandiri, interaktif, dan digital. Tanpa ajakan kelompok belajar, teman, kawan, depan kelas, buku, menulis atau menggambar di buku, bawa benda, kertas, pensil, dan sejenisnya.
  const BUKAN_MANDIRI =
    /berkelompok|kerja kelompok|belajar kelompok|buat(?:lah)? kelompok|membuat kelompok|bentuk(?:lah)? kelompok|sekelompok|dalam kelompok|kelompok|teman|kawan|sahabat|depan kelas|bersama-sama|berpasangan|buku|menulis|tulis|menuliskan|menggambar|gambarlah|\b(?:mem|di)?bawa(?:lah|kan)?\b|kertas|pensil|pulpen|bolpoin|spidol|krayon|kapur|papan tulis|penghapus|penggaris|siapkan|ambil (?:benda|bola|apel|kue|telur|mainan|buah|kelereng)|bermain bersama|diskusi|bertanya kepada|tanya (?:ke|pada)|guru kelas|orang tua|di rumah|benda nyata|bahan nyata|presentasi|bercerita di|bercerita kepada|ceritakan kepada|ceritakan pada/i;
  for (const v of [M_VIDEO, U]) {
    for (const a of v.adegan) {
      const kena = [...new Set(semuaTeksAdegan(a).filter((t) => BUKAN_MANDIRI.test(t)))];
      cek(kena.length === 0, `${v.id}/${a.id}: tanpa ajakan berkelompok, bermain bersama teman, menulis di buku, atau memakai benda nyata (${kena.slice(0, 2).join(" | ")})`);
    }
  }
  cek(M_VIDEO.subjudul === "Materi kurikulum" && U.subjudul === "Tiga metode luar", "subjudul video: Materi kurikulum dan Tiga metode luar");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 46), "video materi: label sumber berbentuk Materi: ... dan pendek");
  cek(U.adegan.every((a) => /Metode luar|Ringkasan/i.test(a.sumber) && a.sumber.length <= 46), "video metode luar: label sumber metode luar atau ringkasan, pendek");
  cek(M_VIDEO.id === "k1b5b-materi" && U.id === "k1b5b-luar", "id video k1b5b-materi dan k1b5b-luar");
  cek(U.judul.endsWith(": Metode dari Luar") && !/menurut/i.test(M_VIDEO.judul), "judul video: materi tanpa 'menurut', luar berakhir ': Metode dari Luar'");
  cek(
    M_VIDEO.adegan.map((a) => a.id).join() ===
      "sapaan,cerita-kelereng,maju-tangga,mundur-tangga,satu-lebih,ulat-hilang,sampai-dua-puluh,mundur-dua-puluh,garis-dua-arah,kisi,kisi-hilang,es-krim,mesin-deret,tetangga,latihan-satu,latihan-dua,latihan-tiga,penutup",
    "urutan adegan materi",
  );
  cek(
    U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-hitung,luar-hitung-terapan,luar-satuan,luar-satuan-terapan,luar-bingkai,luar-bingkai-terapan,luar-ringkas",
    "urutan adegan metode luar",
  );
  cek(M_VIDEO.adegan[0].id === "sapaan" && U.adegan[0].id === "sapaan", "tiap video dibuka adegan sapaan");
  cek(M_VIDEO.adegan.filter((a) => /^latihan-/.test(a.id)).length === 3 && M_VIDEO.adegan[M_VIDEO.adegan.length - 1].id === "penutup", "video materi: Latihan 1 sampai 3 lalu penutup");
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-hitung", "luar-hitung-terapan", "luar-satuan", "luar-satuan-terapan", "luar-bingkai", "luar-bingkai-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(U.adegan[1].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  for (const kata of ["Latihan", "Igil", "Malosi", "Kira", "Upe", "Wei", "Halim", "Tika", "maju", "mundur", "hilang", "sebelum", "sesudah", "di antara", "satu lebih", "satu kurang", "garis bilangan", "kisi", "dua puluh", "sepuluh", "langkah", "tangga"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  // Hanya bilangan sampai dua puluh; tanpa kali, bagi, rumus, ukuran; tambah dan kurang hanya sebagai "satu lebih" dan "satu kurang".
  const BOCOR = /\bratus\b|\bribu\b|dikali|perkalian|(?<!setiap )\bkali\b(?! ini)|dibagi|hasil bagi|\bbagi\b|tambah|penjumlahan|menjumlah|jumlah|dikurangi|pengurangan|selisih|sama dengan|rumus|\bluas\b|keliling|panjang|sentimeter|\bmeter\b|kilogram|(?<!satu )kurang(?! satu)|(?:tiga|empat|lima|enam|tujuh|delapan|sembilan) puluh|dua puluh (?:satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan)/i;
  for (const v of [M_VIDEO, U]) {
    for (const a of v.adegan) cek(!BOCOR.test(teksAdegan(a)), `${v.id}/${a.id}: hanya bilangan sampai dua puluh, tanpa kali, bagi, rumus, tambah, atau kurang di luar satu lebih dan satu kurang`);
    for (const a of v.adegan) for (const [i] of a.ketukan.entries()) for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) for (const b of bilanganDari(t)) cek(Number(b) <= 20, `${v.id}/${a.id}#${i + 1}: angka di gambar paling besar dua puluh ("${t}")`);
  }
  cek(ketukanVideo(M_VIDEO) >= 70, `ketukan video materi paling sedikit 70 (${ketukanVideo(M_VIDEO)})`);
  cek(ketukanVideo(U) >= 30, `ketukan video luar paling sedikit 30 (${ketukanVideo(U)})`);
  cek(totalKetukan >= 70, `total ketukan cukup dalam (${totalKetukan})`);
  // Durasi materi diputar 8 sampai 13 menit (dua kata per detik, sapaan termasuk).
  const kataMateri = kataVideo(M_VIDEO);
  cek(kataMateri / 120 >= 8 && kataMateri / 120 <= 13, `durasi materi diputar 8 sampai 13 menit (${(kataMateri / 120).toFixed(1)} menit)`);
  cek(kataVideo(U) / 120 >= 3, `durasi video luar paling sedikit 3 menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
}

/* ------------------------------ Bilangan yang diucapkan dengan kata tampak sebagai angka, tepat pada kata itu ------------------------------ */
const NAMA_ANGKA = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh"];
const katanya = (suara) => L.kataDari(suara).map((w) => w.toLowerCase().replace(/[^a-z]/g, ""));
/** Bilangan 10 sampai 20 yang diucapkan beserta nomor kata terakhirnya. */
const bilanganUcap = (suara) => {
  const kata = katanya(suara);
  const out = [];
  for (let p = 0; p < kata.length; p += 1) {
    const w = kata[p];
    if (w === "sepuluh") out.push([10, p]);
    else if (w === "sebelas") out.push([11, p]);
    else if (w === "belas" && NAMA_ANGKA.indexOf(kata[p - 1]) >= 2) out.push([10 + NAMA_ANGKA.indexOf(kata[p - 1]), p]);
    else if (w === "puluh" && kata[p - 1] === "dua") out.push([20, p]);
  }
  return out;
};
for (const v of VIDEO) {
  for (const a of v.adegan) {
    a.ketukan.forEach((kt, i) => {
      for (const [n, p] of bilanganUcap(kt.suara)) {
        const ada = L.keadaanStory(a, i, p).some((o) => o.t === "teks" && o.isi && bilanganDari(o.isi).includes(String(n)));
        cek(ada, `${v.id}/${a.id}#${i + 1}: bilangan ${n} tampak sebagai angka tepat pada kata yang mengucapkannya`);
      }
    });
  }
}

/* ------------------------------ Isi gambar dihitung ulang dan dicocokkan dengan suara ------------------------------ */
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
const adg = (id) => adegan(M_VIDEO, id) ?? adegan(U, id);
const S = (id, ke) => akhirAdegan(adg(id), ke);
const hitungAwalan = (objs, re) => objs.filter((o) => re.test(o.id)).length;
const CENTANG = "\u{2705}";
const stat = { deret: 0, hitung: 0, urut: 0, tokoh: 0 };
const pusatKotak = (o) => ({ x: o.x + o.w / 2, y: o.y + o.h / 2 });
const glX = (n, dari = 10, sampai = 20) => 24 + ((n - dari) * 252) / (sampai - dari);
const tgX = (i) => 15 + i * 45 + 22.5;
{
  // 1) Cerita: enam baris kelereng 10 sampai 15, tiap baris satu lebih banyak dan angkanya cocok.
  {
    const c = S("cerita-kelereng", 2);
    for (let r = 0; r < 6; r += 1) {
      sama(hitungAwalan(c, new RegExp(`^km${r}x\\d+$`)), 10 + r, `cerita: baris ${r + 1} berisi ${10 + r} kelereng`);
      sama(isiTeks(c, `kb${r}`), String(10 + r), `cerita: angka baris ${r + 1}`);
      stat.hitung += 1;
    }
    sama([0, 1, 2, 3, 4, 5].map((r) => ketemu(c, `km${r}x0`).y).every((y, i, arr) => i === 0 || y > arr[i - 1]), true, "cerita: baris tersusun dari atas ke bawah");
    // Urutan kata bilangan: baris muncul tepat pada bilangannya.
    const k2 = adg("cerita-kelereng").ketukan[1];
    const pos = katanya(k2.suara);
    for (const [r, kataAkhir] of [[0, "sepuluh"], [1, "sebelas"]]) {
      const p = pos.indexOf(kataAkhir);
      const sebelum = L.keadaanStory(adg("cerita-kelereng"), 1, p - 1);
      const sesudah = L.keadaanStory(adg("cerita-kelereng"), 1, p);
      cek(!ketemu(sebelum, `kb${r}`) && !!ketemu(sesudah, `kb${r}`), `cerita: baris ${r + 1} muncul tepat saat ${kataAkhir} diucapkan`);
    }
  }
  // 2) Tangga: anak tangga 10 sampai 15 naik ke kanan; tokoh berada di anak tangga bilangan yang sedang disebut.
  for (const [id, urutan] of [["maju-tangga", [1, 2, 5]], ["mundur-tangga", [0, 1, 2, 5]]]) {
    const a = adg(id);
    const t = akhirAdegan(a, 0);
    const langkah = [0, 1, 2, 3, 4, 5].map((i) => ({ x: ketemu(t, `tgt${i}`).x, y: ketemu(t, `tg${i}`).y, isi: ketemu(t, `tgt${i}`).isi }));
    sama(langkah.map((q) => q.isi), ["10", "11", "12", "13", "14", "15"], `${id}: anak tangga bertanda 10 sampai 15`);
    cek(langkah.every((q, i) => i === 0 || (q.x > langkah[i - 1].x && q.y < langkah[i - 1].y)), `${id}: tangga naik ke kanan`);
    stat.deret += 1;
    for (const ke of urutan) {
      const kt = a.ketukan[ke];
      for (const [n, p] of bilanganUcap(kt.suara)) {
        const objs = L.keadaanStory(a, ke, p);
        const tk = ketemu(objs, "tk");
        const sasaran = langkah.find((q) => q.isi === String(n));
        cek(!!tk && !!sasaran && Math.abs(tk.x - sasaran.x) < 1, `${id}#${ke + 1}: tokoh ada di anak tangga ${n} saat ${n} diucapkan`);
        stat.tokoh += 1;
      }
    }
  }
  {
    // Maju: Malosi 10 -> 15. Mundur: Kira 15 -> 10 (urutan bilangan yang diucapkan).
    const maju = bilanganUcap(adg("maju-tangga").ketukan[5].suara).map((q) => q[0]);
    const mundur = bilanganUcap(adg("mundur-tangga").ketukan[5].suara).map((q) => q[0]);
    sama(maju, [10, 11, 12, 13, 14, 15], "maju-tangga: ucapan maju sepuluh sampai lima belas");
    sama(mundur, [15, 14, 13, 12, 11, 10], "mundur-tangga: ucapan mundur lima belas sampai sepuluh");
    stat.urut += 2;
  }
  // 3) Garis bilangan: kodok berada di bilangan yang diucapkan; angka garis cocok letaknya.
  const kodokSinkron = (id, daftarKe, dari, sampai) => {
    const a = adg(id);
    const akhir = akhirAdegan(a);
    for (let n = dari; n <= sampai; n += 1) {
      const lb = ketemu(akhir, `glt${n}`) ?? ketemu(akhir, `lat${n}`);
      if (lb && /^\d+$/.test(lb.isi)) {
        cek(lb.isi === String(n) && Math.abs(lb.x - glX(n, dari, sampai)) < 0.5, `${id}: angka ${n} tepat di tandanya`);
        stat.deret += 1;
      }
    }
    for (const ke of daftarKe) {
      for (const [n, p] of bilanganUcap(a.ketukan[ke].suara)) {
        const kd = ketemu(L.keadaanStory(a, ke, p), "kd");
        cek(!!kd && Math.abs(kd.x - glX(n, dari, sampai)) < 0.5, `${id}#${ke + 1}: kodok di bilangan ${n} saat ${n} diucapkan`);
        stat.tokoh += 1;
      }
    }
  };
  kodokSinkron("sampai-dua-puluh", [1, 2, 5], 10, 20);
  kodokSinkron("mundur-dua-puluh", [0, 1, 2, 5], 10, 20);
  kodokSinkron("garis-dua-arah", [1, 3, 5], 10, 20);
  kodokSinkron("latihan-tiga", [1, 2, 3], 12, 19);
  sama(bilanganUcap(adg("sampai-dua-puluh").ketukan[5].suara).map((q) => q[0]), [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], "sampai-dua-puluh: ucapan maju sepuluh sampai dua puluh");
  // Garis dua arah: tiga langkah maju dari 13 ke 16, tiga langkah mundur kembali ke 13 (panah satu langkah).
  {
    const a = adg("garis-dua-arah");
    const m = akhirAdegan(a, 1);
    cek(["pj0", "pj1", "pj2"].every((id, i) => Math.abs(ketemu(m, id).x - glX(13 + i)) < 0.5 && Math.abs(ketemu(m, id).x2 - 25.2) < 0.5), "garis dua arah: tiga panah maju, satu langkah tiap panah");
    sama(["pj0t", "pj1t", "pj2t"].map((id) => isiTeks(m, id)), ["1", "2", "3"], "garis dua arah: langkah maju bernomor 1, 2, 3");
    const n = akhirAdegan(a, 3);
    cek(["pk0", "pk1", "pk2"].every((id, i) => Math.abs(ketemu(n, id).x - glX(16 - i)) < 0.5 && Math.abs(ketemu(n, id).x2 + 25.2) < 0.5), "garis dua arah: tiga panah mundur, satu langkah tiap panah");
    sama([Math.round(ketemu(akhirAdegan(a, 0), "kd").x), Math.round(ketemu(m, "kd").x), Math.round(ketemu(n, "kd").x)], [Math.round(glX(13)), Math.round(glX(16)), Math.round(glX(13))], "garis dua arah: kodok 13, 16, kembali 13");
    const e = akhirAdegan(a, 5);
    sama(Math.round(ketemu(e, "kd").x), Math.round(glX(17)), "coba sendiri: dari lima belas maju dua langkah berhenti di tujuh belas");
  }
  // 4) Kisi: sel ke-n bertanda n pada baris dan kolom yang benar; kisi hilang terisi lengkap.
  {
    const kisi = S("kisi", 0);
    for (let n = 1; n <= 20; n += 1) {
      const t = ketemu(kisi, `kit${n}`);
      const kk = ketemu(kisi, `kik${n}`);
      cek(t?.isi === String(n) && kk && Math.abs(kk.x - (50 + ((n - 1) % 5) * 40)) < 0.5 && Math.abs(kk.y - (36 + Math.floor((n - 1) / 5) * 38)) < 0.5, `kisi: sel ${n} bertanda ${n} dan di tempat yang benar`);
      stat.deret += 1;
    }
    const awal = S("kisi-hilang", 0);
    const kosong = [4, 9, 13, 18];
    cek(kosong.every((n) => isiTeks(awal, `kjt${n}`) === "?") && hitungAwalan(awal, /^kjk\d+$/) === 20, "kisi hilang: empat kotak kosong dari dua puluh");
    const akhir = S("kisi-hilang", 4);
    cek(Array.from({ length: 20 }, (_, i) => isiTeks(akhir, `kjt${i + 1}`) === String(i + 1)).every(Boolean), "kisi hilang: semua sel terisi 1 sampai 20 pada akhir");
    stat.deret += 20;
    for (const [ke, n] of [[1, 4], [2, 9], [3, 13], [4, 18]]) cek(isiTeks(S("kisi-hilang", ke), `kjt${n}`) === String(n) && kosong.filter((q) => q > n).every((q) => isiTeks(S("kisi-hilang", ke), `kjt${q}`) === "?"), `kisi hilang: ketukan ${ke + 1} mengisi bilangan ${n} dan yang lebih besar masih kosong`);
  }
  // 5) Ulat bilangan: deret berselisih satu; yang hilang sesuai jawaban.
  {
    const t = S("ulat-hilang", 2);
    sama([0, 1, 2, 3].map((i) => isiTeks(t, `ult${i}`)), ["10", "11", "12", "13"], "ulat: deret maju 10, 11, 12, 13");
    const u = S("ulat-hilang", 4);
    sama([0, 1, 2, 3].map((i) => isiTeks(u, `umt${i}`)), ["15", "14", "13", "12"], "ulat: deret mundur 15, 14, 13, 12");
    const w = adg("ulat-hilang").ketukan[5];
    const awal = akhirAdegan(adg("ulat-hilang"), 5);
    sama([isiTeks(awal, "unt0"), isiTeks(awal, "unt2")], ["17", "19"], "ulat terakhir: 17 dan 19 dengan satu kotak di antaranya");
    const kartuJawab = ketemu(awal, "uk1-t0");
    const lingkar = ketemu(awal, "un1");
    cek(kartuJawab.isi === "18" && Math.abs(kartuJawab.x - lingkar.x) < 1, "ulat terakhir: kartu 18 diseret ke bulatan kosong di antara 17 dan 19");
    cek(w.suara.includes("delapan belas") && w.suara.includes("tujuh belas") && w.suara.includes("sembilan belas"), "ulat terakhir: suara menyebut tujuh belas, delapan belas, sembilan belas");
    stat.deret += 3;
  }
  // 6) Menyusun es krim: urutan awal tertukar, akhir berurutan 16 sampai 20.
  {
    const urut = (objs) => [16, 17, 18, 19, 20].map((v) => [v, ketemu(objs, `ec${v}-k`).x]).sort((p, q) => p[1] - q[1]).map((p) => p[0]);
    sama(urut(S("es-krim", 0)), [18, 16, 20, 17, 19], "es krim: urutan awal tertukar");
    sama(urut(S("es-krim", 2)), [16, 17, 18, 19, 20], "es krim: berurutan maju setelah ditukar");
    cek(urut(S("es-krim", 1)).join() === "16,18,20,17,19", "es krim: penukaran pertama membawa 16 ke paling kiri");
    cek([16, 17, 18, 19, 20].every((v) => Math.abs(ketemu(S("es-krim", 2), `ei${v}`).x - pusatKotak(ketemu(S("es-krim", 2), `ec${v}-k`)).x) < 0.5 && Math.abs(ketemu(S("es-krim", 2), `ec${v}-t0`).x - pusatKotak(ketemu(S("es-krim", 2), `ec${v}-k`)).x) < 0.5), "es krim: kartu, angka, dan es krim bergerak bersama");
    stat.urut += 1;
  }
  // 7) Mesin deret dan tetangga bilangan.
  {
    const m = S("mesin-deret", 5);
    sama([0, 1, 2, 3].map((i) => isiTeks(m, `ra${i}-t0`)), ["13", "14", "15", "16"], "mesin deret: maju 13, 14, 15, 16");
    sama([0, 1, 2, 3].map((i) => isiTeks(m, `rb${i}-t0`)), ["18", "17", "16", "15"], "mesin deret: mundur 18, 17, 16, 15");
    const t1 = S("tetangga", 1);
    sama([0, 1, 2].map((i) => isiTeks(t1, `ts${i}-t0`)), ["14", "15", "16"], "tetangga: 14 sebelum, 15, 16 sesudah");
    sama([0, 1, 2].map((i) => isiTeks(S("tetangga", 3), `tu${i}-t0`)), ["12", "13", "14"], "tetangga: 13 di antara 12 dan 14");
    const q = S("tetangga", 4);
    sama([isiTeks(q, "sa-t0"), isiTeks(q, "sb0-t0"), isiTeks(q, "sb1-t0"), isiTeks(q, "sb2-t0")], ["18", "17", "19", "20"], "tetangga: tebak sebelum 18, pilihan 17, 19, 20");
    {
      const tz = adg("tetangga");
      const p17 = bilanganUcap(tz.ketukan[5].suara).find((r) => r[0] === 17)[1];
      cek(ketemu(L.keadaanStory(tz, 5, p17), "sb0-k").sorot === true && isiTeks(S("tetangga", 4), "sb0-t0") === "17", "tetangga: jawaban 17 disorot saat tujuh belas diucapkan");
    }
    const e = S("satu-lebih", 5);
    sama([isiTeks(e, "sa-t0"), isiTeks(e, "so1-t0"), isiTeks(e, "so0-t0")], ["15", "16", "14"], "satu lebih: dari 15, satu lebih 16, satu kurang 14");
    sama([isiTeks(S("satu-lebih", 0), "tl-t0"), isiTeks(S("satu-lebih", 0), "tc-t0"), isiTeks(S("satu-lebih", 0), "tr-t0")], ["12", "13", "14"], "satu lebih: 12, 13, 14");
    stat.deret += 4;
  }
  // 8) Latihan.
  {
    const s = S("latihan-satu", 2);
    sama([0, 1, 2, 3].map((i) => isiTeks(s, `sut${i}`) || "kosong"), ["14", "15", "kosong", "17"], "latihan 1: deret 14, 15, kosong, 17");
    const kt = ketemu(s, "sk1-t0");
    cek(kt.isi === "16" && Math.abs(kt.x - ketemu(s, "su2").x) < 1, "latihan 1: kartu 16 di badan ulat yang kosong");
    const o = S("latihan-dua", 0);
    sama([0, 1, 2, 3, 4].map((i) => isiTeks(o, `lmt${i}`)), ["15", "14", "13", "12", "11"], "latihan 2: lampu 15 sampai 11");
    const o3 = S("latihan-dua", 2);
    cek([0, 1, 2].every((i) => ketemu(o3, `lm${i}`).warna === "#CBD5E1") && [3, 4].every((i) => ketemu(o3, `lm${i}`).warna !== "#CBD5E1"), "latihan 2: tiga lampu pertama padam");
    const o4 = S("latihan-dua", 3);
    cek([0, 1, 2, 3, 4].every((i) => ketemu(o4, `lm${i}`).warna === "#CBD5E1") && ketemu(o4, "rk").y < ketemu(o, "rk").y, "latihan 2: semua lampu padam dan roket naik");
    // Lampu padam sesuai bilangan yang diucapkan.
    const a2 = adg("latihan-dua");
    for (const [n, p] of bilanganUcap(a2.ketukan[2].suara)) {
      const lm = 15 - n;
      cek(ketemu(L.keadaanStory(a2, 2, p), `lm${lm}`).warna === "#CBD5E1", `latihan 2: lampu ${n} padam saat ${n} diucapkan`);
      stat.tokoh += 1;
    }
    for (const [n, p] of bilanganUcap(a2.ketukan[3].suara)) {
      cek(ketemu(L.keadaanStory(a2, 3, p), `lm${15 - n}`).warna === "#CBD5E1", `latihan 2: lampu ${n} padam saat ${n} diucapkan`);
      stat.tokoh += 1;
    }
    const g = S("latihan-tiga", 0);
    cek(isiTeks(g, "lat14") === "?" && isiTeks(g, "lat17") === "?" && isiTeks(g, "lat12") === "12" && isiTeks(g, "lat19") === "19", "latihan 3: garis 12 sampai 19 dengan tanda tanya di 14 dan 17");
    const g2 = S("latihan-tiga", 2);
    cek(isiTeks(g2, "lat14") === "14" && isiTeks(g2, "lat17") === "17", "latihan 3: tanda tanya terjawab 14 dan 17");
    const g5 = S("latihan-tiga", 4);
    sama([isiTeks(g5, "gp0-t0"), isiTeks(g5, "gp1-t0"), isiTeks(g5, "gp2-t0"), Math.round(ketemu(akhirAdegan(adg("latihan-tiga"), 3), "kd").x)], ["15", "16", "17", Math.round(glX(16, 12, 19))], "latihan 3: kodok berhenti di 16 dan pilihan 15, 16, 17");
  }
  // 9) Metode luar: banyak kelereng, penguraian sepuluh dan sisa, dan dua bingkai sepuluh dihitung ulang.
  {
    const q = adg("luar-hitung-terapan");
    const banyak = (ke) => hitungAwalan(akhirAdegan(q, ke), /^qm\d+$/);
    sama([banyak(0), banyak(1), banyak(2), banyak(3), banyak(4)], [10, 13, 15, 12, 12], "Hitung sampai 20 terapan: banyak kelereng 10, 13, 15, 12, 12");
    for (const ke of [0, 1, 2, 3, 4]) {
      const objs = akhirAdegan(q, ke);
      sama(isiTeks(objs, "qd"), String(banyak(ke)), `Hitung sampai 20 terapan#${ke + 1}: angka sama dengan banyak kelereng`);
      stat.hitung += 1;
    }
    cek(bilanganUcap(q.ketukan[1].suara).map((r) => r[0]).join() === "11,12,13" && bilanganUcap(q.ketukan[3].suara).map((r) => r[0]).join() === "14,13,12", "Hitung sampai 20 terapan: ucapan maju 11 sampai 13 dan mundur 14 sampai 12");
    const sd = S("luar-satuan", 1);
    cek(isiTeks(sd, "sc-t0") === "14" && isiTeks(sd, "sd-t0") === "10" && isiTeks(sd, "se-t0") === "4" && 10 + 4 === 14, "Sepuluh dan Satuan: 14 adalah 10 dan 4");
    const sf = S("luar-satuan", 2);
    cek(isiTeks(sf, "sf0") === "13: 10 dan 3" && isiTeks(sf, "sf1") === "12: 10 dan 2", "Sepuluh dan Satuan: 13 adalah 10 dan 3, 12 adalah 10 dan 2");
    const tu = S("luar-satuan-terapan", 4);
    sama([0, 1, 2, 3].map((i) => isiTeks(tu, `tut${i}`)), ["10", "11", "12", "13"], "Sepuluh dan Satuan terapan: deret terisi 10, 11, 12, 13");
    sama([isiTeks(S("luar-satuan-terapan", 2), "tw1"), isiTeks(S("luar-satuan-terapan", 2), "tw2"), isiTeks(S("luar-satuan-terapan", 2), "tw3")], ["sisa 1", "sisa 2", "sisa 3"], "Sepuluh dan Satuan terapan: sisa 1, 2, 3");
    stat.deret += 3;
    // Dua bingkai: angka = keping bingkai pertama + keping bingkai kedua, di semua ketukan yang menampilkan angka.
    const jumlahKeping = (objs) => hitungAwalan(objs, /^fab\d+$/) + hitungAwalan(objs, /^fbb\d+$/);
    for (const [id, penanda] of [["luar-bingkai", ["fm"]], ["luar-bingkai-terapan", ["rl"]]]) {
      const a = adg(id);
      a.ketukan.forEach((_, ke) => {
        const objs = akhirAdegan(a, ke);
        const lb = penanda.map((p) => ketemu(objs, p)).find(Boolean);
        if (lb) {
          sama(lb.isi, String(jumlahKeping(objs)), `${id}#${ke + 1}: angka sama dengan banyak keping di dua bingkai`);
          stat.hitung += 1;
        }
      });
    }
    sama([jumlahKeping(S("luar-bingkai", 1)), jumlahKeping(S("luar-bingkai", 2)), jumlahKeping(S("luar-bingkai", 3))], [10, 15, 20], "Dua Bingkai Sepuluh: 10, 15, 20 keping");
    sama([15, 14, 11, 10].map((_, i) => jumlahKeping(S("luar-bingkai-terapan", [0, 1, 2, 3][i]))), [15, 14, 11, 10], "Dua Bingkai Sepuluh terapan: 15, 14, 11, 10 keping");
    const rr = adg("luar-bingkai-terapan");
    for (const [n, p] of bilanganUcap(rr.ketukan[2].suara)) cek(isiTeks(L.keadaanStory(rr, 2, p), "rl") === String(n), `Dua Bingkai Sepuluh terapan: angka ${n} saat ${n} diucapkan`);
    stat.hitung += 3;
  }
}

/* ------------------------------ Sapaan dan peta susun ------------------------------ */
{
  const BUKAN_MANDIRI_PETA = /teman|kawan|depan kelas|buku|menulis|menggambar|bawa|kertas|pensil|berkelompok|kerja kelompok|kelompok/i;
  const HAL = ["Menghitung maju", "Menghitung mundur", "Mencari bilangan hilang"];
  const sap = adegan(M_VIDEO, "sapaan");
  cek(/Halo anak-anak/.test(sap.ketukan[0].suara) && /Menghitung maju/i.test(L.teksTerlihat(akhirAdegan(sap, 1)).join(" | ")), "sapaan materi: tiga hal yang dipelajari tampil");
  sama(L.teksTerlihat(akhirAdegan(sap, 1)).filter((t) => HAL.includes(t)), HAL, "sapaan materi: daftar tiga hal");
  cek(!/\d/.test(sap.ketukan[1].suara), "sapaan materi: tanpa angka");
  const sapLuar = adegan(U, "sapaan");
  cek(/Halo anak-anak/.test(sapLuar.ketukan[0].suara) && /cara lain/.test(sapLuar.ketukan[1].suara), "sapaan metode luar: pengumuman cara lain");
  // Peta dan tabel: dari berkas data bila sudah digabung, bila belum dari berkas sementara .tmp-k1b5s/B.json.
  let ringkas = null;
  try {
    ringkas = JSON.parse(readFileSync(new URL("../src/data/kelas1-bab5-ringkas.json", import.meta.url), "utf8")).subBab?.B;
  } catch {
    ringkas = null;
  }
  const sementara = new URL("../.tmp-k1b5s/B.json", import.meta.url);
  const A = ringkas?.petaSusun && ringkas?.tabelSusun ? ringkas : existsSync(sementara) ? JSON.parse(readFileSync(sementara, "utf8")) : null;
  cek(!!A, "peta dan tabel susun: ada di kelas1-bab5-ringkas.json (subBab.B) atau .tmp-k1b5s/B.json");
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
    cek(/\?$/.test(A.petaSusun.pusat.judul) && A.petaSusun.pusat.judul.length <= 40 && /maju dan mundur/.test(A.petaSusun.pusat.judul), "peta susun: pusat berupa pertanyaan masalah sub-bab");
    const T = A.tabelSusun;
    cek(T.baris.length >= 3 && T.baris.length <= 5 && T.kolom.length >= 3 && T.kolom.length <= 4, "tabel susun: 3 sampai 5 baris dan 3 sampai 4 kolom");
    cek(T.baris.every((b) => b.sel.every((s) => s.length <= 26 && (s.match(/\d+/g) ?? []).length <= 1)), "tabel susun: sel <= 26 huruf dan paling banyak satu angka per sel");
    cek(T.baris.every((b) => b.label.split(/\s+/).every((w) => w.length <= 8)), "tabel susun: kata terpanjang kolom label <= 8 huruf");
    cek(T.baris.every((b) => b.sel.every((s) => s.length <= 10)), "tabel susun: sel pendek (<= 10 huruf) supaya margin teks sel >= 5 px di lebar 405 px");
    cek(!/\d/.test(T.suara) && !/\d/.test(T.petunjuk), "tabel susun: suara dan petunjuk tanpa digit");
    // Isi tabel cocok dengan adegan: tiap baris = tokoh, arah, bilangan mulai, bilangan akhir.
    const tg = akhirAdegan(adegan(M_VIDEO, "maju-tangga"), 0);
    const tgm = akhirAdegan(adegan(M_VIDEO, "mundur-tangga"), 0);
    const da = adegan(M_VIDEO, "garis-dua-arah");
    const lamp = akhirAdegan(adegan(M_VIDEO, "latihan-dua"), 0);
    const BARIS = {
      Malosi: ["Maju", isiTeks(tg, "tgt0"), isiTeks(tg, "tgt5")],
      Kira: ["Mundur", isiTeks(tgm, "tgt5"), isiTeks(tgm, "tgt0")],
      Kodok: ["Maju", "13", String(Math.round((ketemu(akhirAdegan(da, 2), "kd").x - 24) / 25.2) + 10)],
      Roket: ["Mundur", isiTeks(lamp, "lmt0"), isiTeks(lamp, "lmt4")],
    };
    for (const b of T.baris) {
      const t = BARIS[b.label];
      cek(!!t, `tabel susun: baris "${b.label}" dikenal`);
      if (t) sama(b.sel, t, `tabel susun: baris ${b.label} cocok dengan adegan (arah, mulai, sampai)`);
    }
    sama(T.kolom, ["Arah", "Mulai", "Sampai"], "tabel susun: kolom arah, mulai, sampai");
    const semuaTeks = JSON.stringify({ p: A.petaSusun, t: A.tabelSusun });
    cek(!BUKAN_MANDIRI_PETA.test(semuaTeks), "peta dan tabel susun: tanpa teman, kawan, depan kelas, buku, menulis di, menggambar, bawa, kertas, pensil, atau kelompok");
    cek(!/Count to|Counting|Ten and Ones|Double Ten Frame|Ten Frame|Place value/i.test(semuaTeks), "peta dan tabel susun: tanpa nama metode berbahasa Inggris");
    cek(!/tambah|kurang|\+/i.test(semuaTeks.replace(/satu kurang/gi, "")), "peta dan tabel susun: tanpa tambah atau kurang");
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k1b5b-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k1b5b-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k1b5b sendiri (${impor.join(", ")})`);
  }
  // Emoji dalam data teks gambar juga paling tinggi Emoji 12 (diperiksa pada gambar yang diputar).
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d), `${v.id}/${a.id}: emoji gambar paling tinggi Emoji 12`);
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k1b5b.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|naskah-k1b1/.test(pembungkus) && /VIDEO_MATERI_K1B5B/.test(pembungkus) && /VIDEO_LUAR_K1B5B/.test(pembungkus) && /export function VideoK1B5B/.test(pembungkus) && /daftar-video-cerita/.test(pembungkus), "video-k1b5b.tsx: dua video dari mesin Story, tanpa naskah lama");
  cek(!/\r/.test(pembungkus), "video-k1b5b.tsx: akhir baris LF");
  const sendiri = readFileSync(new URL("uji-story-k1b5b.mjs", import.meta.url), "utf8");
  cek(!/\r/.test(sendiri), "uji-story-k1b5b.mjs: akhir baris LF");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit diputar)`);
}
console.log(`Pemeriksaan: ${stat.deret} deret, ${stat.hitung} hitungan benda, ${stat.urut} urutan ucapan, ${stat.tokoh} tokoh atau lampu sesuai kata`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
