// Uji Story Kelas 1 Bab 4 Sub-Bab B (Mengelompokkan Benda): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Video diputar bergaya guru: suara, teks terlihat, sumber, judul adegan, dan subjudul tanpa penyebutan buku (kata terlarang diperiksa pada adegan yang diputar).
// Memeriksa: pemicu kata, sinkron angka suara dan gambar, suara tanpa digit, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas, teks bertumpuk,
// pemisahan materi dan metode luar (nama Indonesia saja), hanya mengenal bentuk dan mengelompokkan (tanpa tambah, kurang, kali, bagi, rumus, atau bilangan lebih dari sepuluh),
// bentuk, warna, ukuran, dan tempat benda (nampan, keranjang, rak, kotak lemari) dihitung ulang dari gambar dan dicocokkan dengan suara dan tabel,
// aturan Igil sebagai aplikasi belajar mandiri (tanpa ajakan kelompok belajar, bermain bersama teman, tampil di depan kelas, menulis atau menggambar di buku, membawa benda nyata, kertas, pensil),
// emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k1b4b.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k1b4b-video.ts");
const U1 = await import("../src/components/modul/story/k1b4b-luar-1.ts");

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
const VIDEO = [V.VIDEO_MATERI_K1B4B, V.VIDEO_LUAR_K1B4B];
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
const M_VIDEO = V.VIDEO_MATERI_K1B4B;
const U = V.VIDEO_LUAR_K1B4B;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const NAMA_LUAR = /Kenali Bentuk|Pilah Ciri|Bentuk di Sekitar|metode luar|metode dari luar/;
const NAMA_INGGRIS = /van Hiele|Attribute|Shape in Environment|Contextual|Take Away|Counting|Ten Frame|Subtract|Sort\b/i;
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
  sama(U1.NAMA_METODE_ID, ["Kenali Bentuk", "Pilah Ciri", "Bentuk di Sekitar"], "nama Indonesia metode luar");
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
  // Catatan: "kelompok" di sub-bab ini adalah ISTILAH ISI (mengelompokkan benda, kelompok lengkung, nama kelompok). Yang dilarang adalah ajakan membuat kelompok belajar (berkelompok, kerja kelompok, buat kelompok, dan sejenisnya).
  const BUKAN_MANDIRI =
    /berkelompok|kerja kelompok|belajar kelompok|buat(?:lah)? kelompok|membuat kelompok|bentuk(?:lah)? kelompok|sekelompok|dalam kelompok|teman|kawan|sahabat|depan kelas|bersama-sama|berpasangan|buku|menulis|tulis|menuliskan|menggambar|gambarlah|b(?:mem|di)?bawa(?:lah|kan)?b|kertas|pensil|pulpen|bolpoin|spidol|krayon|kapur|papan tulis|penghapus|penggaris|siapkan|ambil (?:benda|bola|apel|kue|telur|mainan|buah)|bermain bersama|diskusi|bertanya kepada|tanya (?:ke|pada)|guru kelas|orang tua|di rumah|benda nyata|bahan nyata|presentasi|bercerita di|bercerita kepada|ceritakan kepada|ceritakan pada/i;
  for (const v of [M_VIDEO, U]) {
    for (const a of v.adegan) {
      const kena = [...new Set(semuaTeksAdegan(a).filter((t) => BUKAN_MANDIRI.test(t)))];
      cek(kena.length === 0, `${v.id}/${a.id}: tanpa ajakan berkelompok, bermain bersama teman, menulis di buku, atau memakai benda nyata (${kena.slice(0, 2).join(" | ")})`);
    }
  }
  cek(M_VIDEO.subjudul === "Materi kurikulum" && U.subjudul === "Tiga metode luar", "subjudul video: Materi kurikulum dan Tiga metode luar");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 46), "video materi: label sumber berbentuk Materi: ... dan pendek");
  cek(U.adegan.every((a) => /Metode luar|Ringkasan/i.test(a.sumber) && a.sumber.length <= 46), "video metode luar: label sumber metode luar atau ringkasan, pendek");
  cek(M_VIDEO.id === "k1b4b-materi" && U.id === "k1b4b-luar", "id video k1b4b-materi dan k1b4b-luar");
  cek(U.judul.endsWith(": Metode dari Luar") && !/menurut/i.test(M_VIDEO.judul), "judul video: materi tanpa 'menurut', luar berakhir ': Metode dari Luar'");
  cek(
    M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,cerita-meja,satu-aturan,bentuk,periksa,nama,warna,ganti,besar-kecil,mainan,rapi,langkah,latihan-satu,latihan-dua,latihan-tiga,penutup",
    "urutan adegan materi",
  );
  cek(
    U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-kenali,luar-kenali-terapan,luar-pilah,luar-pilah-terapan,luar-sekitar,luar-sekitar-terapan,luar-ringkas",
    "urutan adegan metode luar",
  );
  cek(M_VIDEO.adegan[0].id === "sapaan" && U.adegan[0].id === "sapaan", "tiap video dibuka adegan sapaan");
  cek(M_VIDEO.adegan.filter((a) => /^latihan-/.test(a.id)).length === 3 && M_VIDEO.adegan[M_VIDEO.adegan.length - 1].id === "penutup", "video materi: Latihan 1 sampai 3 lalu penutup");
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-kenali", "luar-kenali-terapan", "luar-pilah", "luar-pilah-terapan", "luar-sekitar", "luar-sekitar-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(U.adegan[1].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  for (const kata of ["Latihan", "Igil", "Malosi", "Kira", "Upe", "Wei", "Halim", "Tika", "aturan", "cocok", "nama", "anggota", "lengkung", "segitiga", "segi empat", "warna", "ukuran", "besar", "kecil", "kelompok", "hitung"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  // Hanya mengenal bentuk dan mengelompokkan: tanpa tambah, kurang, kali, bagi, rumus, ukuran panjang, luas, keliling, atau bilangan lebih dari sepuluh.
  const BOCOR = /\bbelas\b|\bpuluh\b|\bratus\b|\bribu\b|sebelas|dikali|perkalian|dibagi|hasil bagi|\bkali\b|\bbagi\b|tambah|penjumlahan|menjumlah|jumlah|kurang|dikurangi|pengurangan|\bsisa\b|selisih|sama dengan|rumus|\bluas\b|keliling|panjang|sentimeter|\bmeter\b|kilogram/i;
  for (const v of [M_VIDEO, U]) {
    for (const a of v.adegan) cek(!BOCOR.test(teksAdegan(a)), `${v.id}/${a.id}: hanya mengenal bentuk dan mengelompokkan, tanpa tambah, kurang, kali, bagi, rumus, atau bilangan lebih dari sepuluh`);
    for (const a of v.adegan) for (const [i] of a.ketukan.entries()) for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) for (const b of bilanganDari(t)) cek(Number(b) <= 10, `${v.id}/${a.id}#${i + 1}: angka di gambar paling besar sepuluh ("${t}")`);
  }
  cek(ketukanVideo(M_VIDEO) >= 70, `ketukan video materi paling sedikit 70 (${ketukanVideo(M_VIDEO)})`);
  cek(ketukanVideo(U) >= 30, `ketukan video luar paling sedikit 30 (${ketukanVideo(U)})`);
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

/* ------------------------------ Banyak benda, bentuk, warna, dan tempat benda dihitung ulang dari gambar ------------------------------ */
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
const hitungBenda = (objs, awalan) => objs.filter((o) => new RegExp(`^${awalan}\\d+$`).test(o.id)).length;
const kataSuara = (kt) => L.kataDari(kt.suara).map((w) => w.toLowerCase().replace(/[^a-z]/g, ""));
const stat = { hitung: 0, tempat: 0, tanda: 0, bentuk: 0 };
const adg = (id) => adegan(M_VIDEO, id) ?? adegan(U, id);
const S = (id, ke) => akhirAdegan(adg(id), ke);
const pusat = (o) => (o.t === "kotak" ? { x: o.x + o.w / 2, y: o.y + o.h / 2 } : o.t === "teks" ? { x: o.x, y: o.y - (o.u ?? 10) * 0.35 } : { x: o.x, y: o.y });
const didalam = (objs, id, kotakId) => {
  const b = ketemu(objs, kotakId);
  const p = pusat(ketemu(objs, id));
  return p.x > b.x && p.x < b.x + b.w && p.y > b.y && p.y < b.y + b.h;
};
const WB = { coklat: "#B45309", hijau: "#4ADE80", merah: "#F87171", kuning: "#FACC15", biru: "#60A5FA" };
const jenis = (o) => (o.t === "bulat" ? "lengkung" : o.t === "jalur" ? "segitiga" : o.t === "kotak" ? "segiempat" : "?");
const CENTANG = "\u{2705}";
const SILANG = "\u{274C}";
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
            const pc = b.t === "kotak" ? b.x + b.w / 2 : b.x;
            cek(Math.abs(pc - lb.x) < 1 && lb.y < (b.t === "kotak" ? b.y : b.y - (b.r ?? 0)), `${nama}: angka ${q + 1} tepat di atas benda ke-${q + 1}`);
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
  // 2) Pembantu: banyak benda yang disebut sama dengan jumlah benda di gambar; benda di dalam atau di luar tempatnya.
  const banyakDi = (id, ke, awalan, n) => {
    const a = adg(id);
    cek(!!a, `adegan ${id} ada`);
    if (!a) return;
    sama(hitungBenda(akhirAdegan(a, ke), awalan), n, `${id}#${ke + 1}: ${n} benda ${awalan} di gambar`);
    cek(a.ketukan.some((kt) => kataSuara(kt).includes(NAMA_ANGKA[n])), `${id}: suara menyebut bilangan "${NAMA_ANGKA[n]}"`);
    stat.hitung += 1;
  };
  const dalam = (id, ke, benda, kotakId, ket) => {
    const o = S(id, ke);
    cek(benda.every((b) => ketemu(o, b) && didalam(o, b, kotakId)), `${id}#${ke + 1}: ${ket} ada di dalam ${kotakId}`);
    stat.tempat += benda.length;
  };
  const luarnya = (id, ke, benda, kotakId, ket) => {
    const o = S(id, ke);
    cek(benda.every((b) => ketemu(o, b) && !didalam(o, b, kotakId)), `${id}#${ke + 1}: ${ket} ada di luar ${kotakId}`);
    stat.tempat += benda.length;
  };
  const bentukIni = (id, ke, daftar) => {
    const o = S(id, ke);
    for (const [bid, jns] of daftar) {
      cek(ketemu(o, bid) && jenis(ketemu(o, bid)) === jns, `${id}#${ke + 1}: ${bid} berbentuk ${jns}`);
      stat.bentuk += 1;
    }
  };
  const warnaIni = (id, ke, daftar) => {
    const o = S(id, ke);
    for (const [bid, w] of daftar) cek(ketemu(o, bid)?.warna === w, `${id}#${ke + 1}: ${bid} berwarna ${w}`);
  };
  const KUE = [["cucur", "lengkung", WB.coklat], ["talam", "lengkung", WB.hijau], ["risol", "segitiga", WB.coklat], ["lupis", "segitiga", WB.hijau], ["lapis", "segiempat", WB.hijau], ["bolu", "segiempat", WB.coklat]];
  const ID_BENTUK = ["kl0", "kl1", "ks0", "ks1", "kp0", "kp1"];
  // Enam kue: dua lengkung, dua segitiga, dua segi empat; tiga cokelat dan tiga hijau.
  {
    bentukIni("cerita-meja", 1, KUE.map((q, n) => [`ce${n}`, q[1]]));
    warnaIni("cerita-meja", 1, KUE.map((q, n) => [`ce${n}`, q[2]]));
    banyakDi("cerita-meja", 1, "ce", 6);
    sama(isiTeks(S("cerita-meja", 1), "c6"), "6 kue", "cerita: enam kue");
    sama(KUE.filter((q) => q[2] === WB.coklat).length + KUE.filter((q) => q[2] === WB.hijau).length, 6, "cerita: tiga cokelat dan tiga hijau");
    sama(L.teksTerlihat(S("cerita-meja", 3)).filter((t) => ["Memilih satu aturan", "Memeriksa tiap benda", "Menghitung anggota"].includes(t)), ["Memilih satu aturan", "Memeriksa tiap benda", "Menghitung anggota"], "cerita: tiga hal sama dengan daftar sapaan");
    const lama = S("satu-aturan", 0);
    cek(didalam(lama, "ap0", "ap-n") && didalam(lama, "ap2", "ap-n") && !didalam(lama, "ap1", "ap-n") && !didalam(lama, "ap3", "ap-n"), "satu aturan: hanya dua lingkaran yang masuk nampan");
    bentukIni("satu-aturan", 0, [["ap0", "lengkung"], ["ap2", "lengkung"], ["ap1", "segitiga"], ["ap3", "segiempat"]]);
  }
  // Kue menurut bentuk: tiga nampan, masing-masing dua kue yang bentuknya sesuai.
  {
    bentukIni("bentuk", 0, KUE.map((q, g) => [ID_BENTUK[g], q[1]]));
    sama([isiTeks(S("bentuk", 1), "tp0-t"), isiTeks(S("bentuk", 2), "tp1-t"), isiTeks(S("bentuk", 3), "tp2-t")], ["lengkung", "segitiga", "segi empat"], "bentuk: nama tiga nampan");
    dalam("bentuk", 1, ["kl0", "kl1"], "tp0", "kue lengkung");
    dalam("bentuk", 2, ["ks0", "ks1"], "tp1", "kue segitiga");
    dalam("bentuk", 3, ["kp0", "kp1"], "tp2", "kue segi empat");
    const b3 = S("bentuk", 3);
    cek([0, 1, 2].every((n) => ID_BENTUK.filter((id) => didalam(b3, id, `tp${n}`)).length === 2), "bentuk: tiap nampan berisi tepat dua kue");
    sama([0, 1, 2].map((n) => isiTeks(S("bentuk", 4), `bj${n}`)), ["2 kue", "2 kue", "2 kue"], "bentuk: setiap nampan dua kue");
    // Periksa: kue lupis (segitiga) tidak cocok di nampan lengkung, lalu dikeluarkan.
    bentukIni("periksa", 0, [["pa0", "lengkung"], ["pa1", "lengkung"], ["pa2", "segitiga"]]);
    dalam("periksa", 0, ["pa0", "pa1", "pa2"], "pn", "tiga kue");
    sama([isiTeks(S("periksa", 1), "pc0"), isiTeks(S("periksa", 2), "pc1"), isiTeks(S("periksa", 3), "pc2")], [CENTANG, CENTANG, SILANG], "periksa: cucur dan talam cocok, lupis tidak cocok");
    stat.tanda += 3;
    dalam("periksa", 4, ["pa0", "pa1"], "pn", "kue lengkung");
    luarnya("periksa", 4, ["pa2"], "pn", "kue lupis");
    // Nama kelompok dan banyak anggota.
    banyakDi("nama", 2, "kl", 2);
    sama([isiTeks(S("nama", 0), "tp0-t"), isiTeks(S("nama", 1), "tp1-t"), isiTeks(S("nama", 1), "tp2-t")], ["lengkung", "segitiga", "segi empat"], "nama: nama tiga kelompok");
    dalam("nama", 4, ID_BENTUK.slice(0, 2), "tp0", "kue lengkung");
    dalam("nama", 4, ID_BENTUK.slice(2, 4), "tp1", "kue segitiga");
    dalam("nama", 4, ID_BENTUK.slice(4, 6), "tp2", "kue segi empat");
    sama([isiTeks(S("nama", 3), "nl"), isiTeks(S("nama", 3), "nl1"), isiTeks(S("nama", 3), "nl2")], ["2 kue", "2 kue", "2 kue"], "nama: tiap kelompok dua anggota");
    sama([ID_BENTUK.length, isiTeks(S("nama", 4), "n6")], [6, "semua: 6 kue"], "nama: semua kue tetap enam");
  }
  // Kue menurut warna: tiga cokelat dan tiga hijau; kue talam masuk lengkung menurut bentuk dan hijau menurut warna.
  {
    warnaIni("warna", 0, [["kc0", WB.coklat], ["kc1", WB.coklat], ["kc2", WB.coklat], ["kh0", WB.hijau], ["kh1", WB.hijau], ["kh2", WB.hijau]]);
    bentukIni("warna", 0, [["kc0", "lengkung"], ["kc1", "segitiga"], ["kc2", "segiempat"], ["kh0", "lengkung"], ["kh1", "segiempat"], ["kh2", "segitiga"]]);
    banyakDi("warna", 3, "kc", 3);
    banyakDi("warna", 4, "kh", 3);
    sama([isiTeks(S("warna", 1), "wp0-t"), isiTeks(S("warna", 2), "wp1-t")], ["cokelat", "hijau"], "warna: nama dua nampan");
    dalam("warna", 1, ["kc0", "kc1", "kc2"], "wp0", "kue cokelat");
    dalam("warna", 2, ["kh0", "kh1", "kh2"], "wp1", "kue hijau");
    const w2 = S("warna", 2);
    cek(["kc0", "kc1", "kc2"].every((id) => !didalam(w2, id, "wp1")) && ["kh0", "kh1", "kh2"].every((id) => !didalam(w2, id, "wp0")), "warna: tiap kue hanya di nampan warnanya");
    sama([isiTeks(S("warna", 5), "w2"), isiTeks(S("warna", 5), "w3")], ["warna: 2 nampan", "bentuk: 3 nampan"], "warna: dua nampan menurut warna, tiga menurut bentuk");
    // Kue talam: bentuk lengkung, warna hijau, sama seperti kh0 di adegan warna dan kl1 di adegan bentuk.
    sama([ketemu(S("ganti", 0), "gt").t, ketemu(S("ganti", 0), "gt").warna], ["bulat", WB.hijau], "ganti: kue talam lengkung dan hijau");
    sama([isiTeks(S("ganti", 1), "gl-t1"), isiTeks(S("ganti", 1), "gr-t1")], ["kelompok lengkung", "kelompok hijau"], "ganti: kue talam di dua kelompok");
  }
  // Buah besar dan kecil: dua besar, empat kecil; ukuran besar lebih besar dari kecil.
  {
    banyakDi("besar-kecil", 0, "bb", 2);
    banyakDi("besar-kecil", 3, "bk", 4);
    const f0 = S("besar-kecil", 0);
    cek([0, 1].every((i) => [0, 1, 2, 3].every((j) => ketemu(f0, `bb${i}`).u > ketemu(f0, `bk${j}`).u)), "buah: buah besar lebih besar daripada buah kecil");
    dalam("besar-kecil", 2, ["bb0", "bb1"], "kb", "semangka dan melon");
    dalam("besar-kecil", 3, ["bk0", "bk1", "bk2", "bk3"], "kk", "empat buah kecil");
    luarnya("besar-kecil", 3, ["bb0", "bb1"], "kk", "buah besar");
  }
  // Kotak mainan Tika: aturan bentuk bulat (lengkung); tanda cocok sesuai bentuk.
  {
    bentukIni("mainan", 0, [["m0", "lengkung"], ["m1", "segiempat"], ["m2", "segitiga"], ["m3", "lengkung"]]);
    warnaIni("mainan", 0, [["m0", WB.merah], ["m1", WB.biru], ["m2", WB.hijau], ["m3", WB.kuning]]);
    const m0 = S("mainan", 0);
    cek(ketemu(m0, "m0").r > ketemu(m0, "m3").r, "mainan: bola merah lebih besar daripada bola kuning");
    const m4 = S("mainan", 4);
    sama(["m0", "m1", "m2", "m3"].map((id, i) => isiTeks(m4, `md${i}`) === (jenis(ketemu(m0, id)) === "lengkung" ? CENTANG : SILANG)), [true, true, true, true], "mainan: tanda cocok sama dengan bentuk bulat atau bukan");
    stat.tanda += 4;
    dalam("mainan", 5, ["m0", "m3"], "mp", "dua bola");
    luarnya("mainan", 5, ["m1", "m2"], "mp", "kotak hadiah dan topi pesta");
    sama(isiTeks(S("mainan", 5), "m2t"), "2 anggota", "mainan: dua anggota kelompok bulat");
  }
  // Kamar Kira: sembilan mainan, merah tiga, kuning dua, biru empat; tiap rak berisi satu warna.
  {
    banyakDi("rapi", 0, "mm", 3);
    banyakDi("rapi", 0, "my", 2);
    banyakDi("rapi", 0, "mb", 4);
    warnaIni("rapi", 0, [["mm0", WB.merah], ["mm1", WB.merah], ["mm2", WB.merah], ["my0", WB.kuning], ["my1", WB.kuning], ["mb0", WB.biru], ["mb1", WB.biru], ["mb2", WB.biru], ["mb3", WB.biru]]);
    dalam("rapi", 1, ["mm0", "mm1", "mm2"], "rk0", "mainan merah");
    dalam("rapi", 2, ["my0", "my1"], "rk1", "mainan kuning");
    dalam("rapi", 3, ["mb0", "mb1", "mb2", "mb3"], "rk2", "mainan biru");
    sama([isiTeks(S("rapi", 1), "rk0-t"), isiTeks(S("rapi", 2), "rk1-t"), isiTeks(S("rapi", 3), "rk2-t")], ["merah", "kuning", "biru"], "rapi: nama tiga rak");
    const r4 = S("rapi", 4);
    sama([isiTeks(r4, "rc0"), isiTeks(r4, "rc1"), isiTeks(r4, "rc2")], ["3 mainan", "2 mainan", "4 mainan"], "rapi: banyak mainan di tiap rak");
    const RAK = { mm: "rk0", my: "rk1", mb: "rk2" };
    cek(Object.entries(RAK).every(([p, rk]) => Array.from({ length: hitungBenda(r4, p) }, (_, i) => `${p}${i}`).every((id) => ["rk0", "rk1", "rk2"].every((r) => didalam(r4, id, r) === (r === rk)))), "rapi: tiap mainan hanya di rak warnanya");
    stat.tempat += 9;
  }
  // Latihan 1: tiga bentuk lengkung dari enam; Latihan 2: tebak aturan; Latihan 3: lemari warna dan bentuk.
  {
    const t0 = S("latihan-satu", 0);
    sama([hitungBenda(t0, "tb"), hitungBenda(t0, "tx")], [3, 3], "Latihan 1: tiga bentuk lengkung dan tiga bentuk lurus");
    bentukIni("latihan-satu", 0, [["tb0", "lengkung"], ["tb1", "lengkung"], ["tb2", "lengkung"]]);
    cek(["tx0", "tx1", "tx2"].every((id) => jenis(ketemu(t0, id)) !== "lengkung"), "Latihan 1: bentuk yang lain tidak lengkung");
    const t1 = S("latihan-satu", 1);
    cek([0, 1, 2].every((i) => isiTeks(t1, `mk${i}`) === CENTANG && ketemu(t1, `mk${i}`).x === ketemu(t1, `tb${i}`).x), "Latihan 1: tanda cocok tepat di atas tiga bentuk lengkung");
    stat.tanda += 3;
    banyakDi("latihan-satu", 3, "tb", 3);
    const t4 = S("latihan-satu", 4);
    sama([isiTeks(t4, "o2-t0"), isiTeks(t4, "o3-t0"), isiTeks(t4, "o4-t0"), ketemu(t4, "o3-k").sorot], ["2", "3", "4", true], "Latihan 1: pilihan 2, 3, 4 dan jawaban 3 disorot");
    // Latihan 2
    dalam("latihan-dua", 0, ["d0", "d1", "d2"], "dm", "tiga lingkaran");
    dalam("latihan-dua", 0, ["d3", "d4"], "dt", "segitiga dan segi empat");
    bentukIni("latihan-dua", 0, [["d0", "lengkung"], ["d1", "lengkung"], ["d2", "lengkung"], ["d3", "segitiga"], ["d4", "segiempat"]]);
    const d0 = S("latihan-dua", 0);
    cek(new Set(["d0", "d1", "d2"].map((id) => ketemu(d0, id).warna)).size === 3 && new Set(["d0", "d1", "d2"].map((id) => ketemu(d0, id).r)).size === 3, "Latihan 2: benda yang masuk berbeda warna dan berbeda ukuran, hanya bentuknya sama");
    sama([ketemu(S("latihan-dua", 3), "p1-k").sorot, isiTeks(S("latihan-dua", 3), "p1-t0")], [true, "bentuk"], "Latihan 2: jawaban aturan rahasia adalah bentuk");
    dalam("latihan-dua", 4, ["d5", "d6", "d7"], "dn", "tiga benda merah");
    dalam("latihan-dua", 4, ["d8", "d9"], "do", "benda biru dan kuning");
    warnaIni("latihan-dua", 4, [["d5", WB.merah], ["d6", WB.merah], ["d7", WB.merah], ["d8", WB.biru], ["d9", WB.kuning]]);
    bentukIni("latihan-dua", 4, [["d5", "lengkung"], ["d6", "segitiga"], ["d7", "segiempat"]]);
    // Latihan 3
    const SEL = { mr0: "lc0", mr1: "lc1", mh0: "lc2", mh1: "lc3" };
    for (const [id, sel] of Object.entries(SEL)) dalam("latihan-tiga", 3, [id], sel, `mainan ${id}`);
    bentukIni("latihan-tiga", 3, [["mr0", "lengkung"], ["mh0", "lengkung"], ["mr1", "segitiga"], ["mh1", "segitiga"]]);
    warnaIni("latihan-tiga", 3, [["mr0", WB.merah], ["mr1", WB.merah], ["mh0", WB.hijau], ["mh1", WB.hijau]]);
    const e3 = S("latihan-tiga", 3);
    sama([ketemu(e3, "lc0").warna, ketemu(e3, "lc1").warna, ketemu(e3, "lc2").warna, ketemu(e3, "lc3").warna], ["#FECACA", "#FECACA", "#DCFCE7", "#DCFCE7"], "Latihan 3: baris atas merah dan baris bawah hijau");
    sama([isiTeks(e3, "lr0"), isiTeks(e3, "lr1"), isiTeks(e3, "lh0"), isiTeks(e3, "lh1")], ["merah", "hijau", "bulat", "segitiga"], "Latihan 3: nama baris dan kolom lemari");
    banyakDi("latihan-tiga", 4, "mh", 2);
  }
  // Metode luar.
  {
    bentukIni("luar-kenali", 0, [["kq0", "lengkung"], ["kq1", "segitiga"], ["kq2", "segiempat"]]);
    const k1 = S("luar-kenali", 1);
    sama([isiTeks(k1, "kn0"), isiTeks(k1, "kn1"), isiTeks(k1, "kn2"), isiTeks(k1, "kt1"), isiTeks(k1, "kt2")], ["lingkaran", "segitiga", "segi empat", "3 sisi lurus", "4 sisi lurus"], "Kenali Bentuk: nama bentuk, tiga sisi segitiga dan empat sisi segi empat");
    sama([pusat(ketemu(k1, "kq0")).x, pusat(ketemu(k1, "kq1")).x, pusat(ketemu(k1, "kq2")).x], [ketemu(k1, "kn0").x, ketemu(k1, "kn1").x, ketemu(k1, "kn2").x], "Kenali Bentuk: nama tepat di bawah bentuknya");
    const q = "luar-kenali-terapan";
    bentukIni(q, 0, [["ja", "lengkung"], ["pi", "segiempat"], ["tp", "segitiga"]]);
    const q3 = S(q, 3);
    sama([isiTeks(q3, "qt0"), isiTeks(q3, "qt1"), isiTeks(q3, "qt2"), isiTeks(q3, "qm0"), isiTeks(q3, "qm1")], ["lingkaran", "segi empat", "segitiga", CENTANG, CENTANG], "Kenali Bentuk terapan: jam lingkaran, pintu segi empat, topi segitiga");
    sama([pusat(ketemu(q3, "ja")).x, pusat(ketemu(q3, "pi")).x, pusat(ketemu(q3, "tp")).x], [ketemu(q3, "qt0").x, ketemu(q3, "qt1").x, ketemu(q3, "qt2").x], "Kenali Bentuk terapan: nama tepat di bawah bendanya");
    stat.tanda += 2;
    const pl = "luar-pilah";
    dalam(pl, 1, ["pl0"], "ka", "lingkaran");
    dalam(pl, 1, ["pl1", "pl2"], "kb", "segitiga dan segi empat");
    bentukIni(pl, 1, [["pl0", "lengkung"], ["pl1", "segitiga"], ["pl2", "segiempat"]]);
    const pt = "luar-pilah-terapan";
    banyakDi(pt, 1, "pe", 2);
    banyakDi(pt, 1, "pr", 3);
    dalam(pt, 1, ["pe0", "pe1"], "ka", "bentuk lengkung");
    dalam(pt, 1, ["pr0", "pr1", "pr2"], "kb", "bentuk bersisi lurus");
    bentukIni(pt, 1, [["pe0", "lengkung"], ["pe1", "lengkung"], ["pr0", "segitiga"], ["pr1", "segiempat"], ["pr2", "segitiga"]]);
    const se = "luar-sekitar";
    bentukIni(se, 2, [["ea", "lengkung"], ["eb", "segiempat"], ["ec", "segitiga"]]);
    const s3 = S(se, 2);
    sama([isiTeks(s3, "et0"), isiTeks(s3, "et1"), isiTeks(s3, "et2")], ["lingkaran", "segi empat", "segitiga"], "Bentuk di Sekitar: jam, jendela, topi");
    sama([pusat(ketemu(s3, "ea")).x, pusat(ketemu(s3, "eb")).x, pusat(ketemu(s3, "ec")).x], [ketemu(s3, "et0").x, ketemu(s3, "et1").x, ketemu(s3, "et2").x], "Bentuk di Sekitar: nama tepat di bawah bendanya");
    const st = "luar-sekitar-terapan";
    bentukIni(st, 0, [["rs0", "segiempat"], ["rs1", "segiempat"], ["rs2", "segiempat"], ["ra0", "lengkung"], ["ra1", "segitiga"]]);
    banyakDi(st, 3, "rs", 3);
    const s1 = S(st, 1);
    cek(["mc0", "mc1", "mc2"].every((id, i) => isiTeks(s1, id) === CENTANG && Math.abs(ketemu(s1, id).x - pusat(ketemu(s1, `rs${i}`)).x) < 1), "Bentuk di Sekitar terapan: tiga benda segi empat ditandai cocok");
    const s2 = S(st, 2);
    cek(["mx0", "mx1"].every((id, i) => isiTeks(s2, id) === SILANG && Math.abs(ketemu(s2, id).x - pusat(ketemu(s2, `ra${i}`)).x) < 1), "Bentuk di Sekitar terapan: jam dan topi ditandai tidak cocok");
    stat.tanda += 5;
  }
}

/* ------------------------------ Sapaan dan peta susun ------------------------------ */
{
  const BUKAN_MANDIRI_PETA = /teman|kawan|depan kelas|buku|menulis|menggambar|bawa|kertas|pensil|berkelompok|kerja kelompok/i;
  const HAL = ["Memilih satu aturan", "Memeriksa tiap benda", "Menghitung anggota"];
  const sap = adegan(M_VIDEO, "sapaan");
  cek(/Halo anak-anak/.test(sap.ketukan[0].suara) && /Memilih satu aturan/i.test(L.teksTerlihat(akhirAdegan(sap, 1)).join(" | ")), "sapaan materi: tiga hal yang dipelajari tampil");
  sama(L.teksTerlihat(akhirAdegan(sap, 1)).filter((t) => HAL.includes(t)), HAL, "sapaan materi: daftar tiga hal");
  cek(!/\d/.test(sap.ketukan[1].suara), "sapaan materi: tanpa angka");
  const sapLuar = adegan(U, "sapaan");
  cek(/Halo anak-anak/.test(sapLuar.ketukan[0].suara) && /cara lain/.test(sapLuar.ketukan[1].suara), "sapaan metode luar: pengumuman cara lain");
  // Peta dan tabel: dari berkas data bila sudah digabung, bila belum dari berkas sementara .tmp-k1b4s/B.json.
  let ringkas = null;
  try {
    ringkas = JSON.parse(readFileSync(new URL("../src/data/kelas1-bab4-ringkas.json", import.meta.url), "utf8")).subBab?.B;
  } catch {
    ringkas = null;
  }
  const sementara = new URL("../.tmp-k1b4s/B.json", import.meta.url);
  const A = ringkas?.petaSusun && ringkas?.tabelSusun ? ringkas : existsSync(sementara) ? JSON.parse(readFileSync(sementara, "utf8")) : null;
  cek(!!A, "peta dan tabel susun: ada di kelas1-bab4-ringkas.json (subBab.B) atau .tmp-k1b4s/B.json");
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
    cek(/\?$/.test(A.petaSusun.pusat.judul) && A.petaSusun.pusat.judul.length <= 40, "peta susun: pusat berupa pertanyaan masalah sub-bab");
    const T = A.tabelSusun;
    cek(T.baris.length >= 3 && T.baris.length <= 5 && T.kolom.length >= 3 && T.kolom.length <= 4, "tabel susun: 3 sampai 5 baris dan 3 sampai 4 kolom");
    cek(T.baris.every((b) => b.sel.every((s) => s.length <= 26 && (s.match(/\d+/g) ?? []).length <= 1)), "tabel susun: sel <= 26 huruf dan paling banyak satu angka per sel");
    cek(T.baris.every((b) => b.label.split(/\s+/).every((w) => w.length <= 8)), "tabel susun: kata terpanjang kolom label <= 8 huruf");
    cek(T.baris.every((b) => b.sel.every((s) => s.length <= 10)), "tabel susun: sel pendek (<= 10 huruf) supaya margin teks sel >= 5 px di lebar 405 px");
    cek(!/\d/.test(T.suara) && !/\d/.test(T.petunjuk), "tabel susun: suara dan petunjuk tanpa digit");
    // Isi tabel cocok dengan adegan: tiap baris = benda, aturan, nama kelompok, banyak anggota (kata).
    const BANYAK = {
      "Kue talam": ["Bentuk", "Lengkung", NAMA_ANGKA[hitungBenda(S("nama", 4), "kl")]],
      "Kue lupis": ["Warna", "Hijau", NAMA_ANGKA[hitungBenda(S("warna", 4), "kh")]],
      Anggur: ["Ukuran", "Kecil", NAMA_ANGKA[hitungBenda(S("besar-kecil", 3), "bk")]],
    };
    for (const b of T.baris) {
      const t = BANYAK[b.label];
      cek(!!t, `tabel susun: baris "${b.label}" dikenal`);
      if (t) sama(b.sel.map((s) => s.toLowerCase()), t.map((s) => s.toLowerCase()), `tabel susun: baris ${b.label} cocok dengan adegan (aturan, kelompok, banyak)`);
    }
    sama(T.kolom, ["Aturan", "Nama", "Anggota"], "tabel susun: kolom aturan, nama kelompok, banyak anggota");
    const semuaTeks = JSON.stringify({ p: A.petaSusun, t: A.tabelSusun });
    cek(!BUKAN_MANDIRI_PETA.test(semuaTeks), "peta dan tabel susun: tanpa teman, kawan, depan kelas, buku, menulis di, menggambar, bawa, kertas, pensil, atau tambah");
    cek(!/van Hiele|Attribute|Shape in Environment|Take Away|Counting|Ten Frame/i.test(semuaTeks), "peta dan tabel susun: tanpa nama metode berbahasa Inggris");
    cek(!/tambah|kurang|\+/i.test(semuaTeks), "peta dan tabel susun: tanpa tambah atau kurang");
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k1b4b-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k1b4b-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k1b4b sendiri (${impor.join(", ")})`);
  }
  // Emoji dalam data teks gambar juga paling tinggi Emoji 12 (diperiksa pada gambar yang diputar).
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d), `${v.id}/${a.id}: emoji gambar paling tinggi Emoji 12`);
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k1b4b.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|naskah-k1b1/.test(pembungkus) && /VIDEO_MATERI_K1B4B/.test(pembungkus) && /VIDEO_LUAR_K1B4B/.test(pembungkus) && /export function VideoK1B4B/.test(pembungkus) && /daftar-video-cerita/.test(pembungkus), "video-k1b4b.tsx: dua video dari mesin Story, tanpa naskah lama");
  cek(!/\r/.test(pembungkus), "video-k1b4b.tsx: akhir baris LF");
  const sendiri = readFileSync(new URL("uji-story-k1b4b.mjs", import.meta.url), "utf8");
  cek(!/\r/.test(sendiri), "uji-story-k1b4b.mjs: akhir baris LF");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit diputar)`);
}
console.log(`Pemeriksaan: ${stat.hitung} deret hitungan, ${stat.tempat} benda di tempatnya, ${stat.bentuk} bentuk, ${stat.tanda} tanda cocok`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
