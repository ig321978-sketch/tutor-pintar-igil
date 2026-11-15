// Uji Story Kelas 3 Bab 1 Sub-Bab B (Nilai Tempat): dua video (materi kurikulum dan metode luar) dengan mesin animasi Story baru.
// Video diputar bergaya guru: suara, teks terlihat, sumber, judul adegan, dan subjudul tanpa penyebutan buku (kata terlarang diperiksa pada adegan yang diputar).
// Memeriksa: pemicu kata, suara tanpa digit (bilangan dieja), perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas, teks bertumpuk, pemisahan materi dan metode luar (nama metode hanya Indonesia),
// lingkup (bilangan tiga angka; tanpa seribu, satuan baku, bersusun, pinjam, simpan, bagi, benda nyata),
// dan HITUNG ULANG DATA dari STRUKTUR gambar (bukan dari kata kunci): papan tiga tempat (ratusan hijau, puluhan biru, satuan merah; bilangan = 100 x ratusan + 10 x puluhan + satuan),
// nilai tiap angka (angka x nilai tempat), model blok per tempat (jumlah blok = angka), uraian (jumlah nilai tiap tempat = bilangan), perkalian angka x nilai tempat, tabel berisi angka (bukan nilai),
// setiap bilangan yang dieja di suara (eja dari angka, mis. "dua ratus lima puluh satu") tampak sebagai angka di gambar, kalimat "angka dua ada di ratusan, jadi nilainya dua ratus" dicocokkan dengan papan,
// kartu angka yang diseret ke kotak yang benar, jawaban latihan benar menurut gambar, aturan pemilik (belajar mandiri digital: tanpa kelompok, teman, survei, depan kelas, buku, benda fisik),
// peta dan tabel susun (isi tabel dihitung ulang), emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k3b1B.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k3b1B-video.ts");
const U1 = await import("../src/components/modul/story/k3b1B-luar-1.ts");
const G = await import("../src/components/modul/story/k3b1B-gambar.ts");

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
const VIDEO = [V.VIDEO_MATERI_K3B1B, V.VIDEO_LUAR_K3B1B];
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
const M_VIDEO = V.VIDEO_MATERI_K3B1B;
const U = V.VIDEO_LUAR_K3B1B;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
// Nama dua metode luar yang bukan istilah isi sub-bab: Kartu Angka Montessori dan Bentuk Uraian (Nilai Tempat adalah judul sub-bab, jadi boleh di materi).
const NAMA_LUAR = /Kartu Angka Montessori|Bentuk Uraian|metode luar|metode dari luar/i;
const NAMA_INGGRIS = /Place Value|Montessori Cards|Expanded Form|Dienes|Place-Value Chart|Number Names|Compare Placewise|Number Line/i;
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M_VIDEO);
  const luar = teksVideo(U);
  cek(!NAMA_LUAR.test(materi), "video materi tidak memuat nama metode luar Kartu Angka Montessori dan Bentuk Uraian (Nilai Tempat adalah judul sub-bab)");
  for (const m of U1.NAMA_METODE_ID) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE_ID, ["Nilai Tempat", "Kartu Angka Montessori", "Bentuk Uraian"], "nama Indonesia metode luar");
  cek(!NAMA_INGGRIS.test(materi) && !NAMA_INGGRIS.test(luar), "nama metode hanya bahasa Indonesia (tanpa Place Value, Montessori Cards, Expanded Form, Dienes Blocks)");
  // Video diputar sebagai guru yang mengajar: tidak ada penyebutan sumber buku di suara, teks terlihat, label sumber, judul adegan, dan subjudul.
  const TERLARANG = /buku|panduan guru|hlm|halaman|kunci jawaban|rubrik|salah ketik|salah cetak|tambahan video|contoh video|temuan|pertemuan/i;
  for (const v of [M_VIDEO, U]) {
    cek(!TERLARANG.test(`${v.judul} ${v.subjudul}`), `${v.id}: judul dan subjudul video tanpa kata terlarang`);
    cek(!/nomor|no\./i.test(v.subjudul) && v.subjudul.length <= 40, `${v.id}: subjudul pendek tanpa nomor halaman`);
    for (const a of v.adegan) {
      const semua = [a.judul, a.sumber];
      a.ketukan.forEach((kt, i) => {
        semua.push(kt.suara);
        for (let p = 0; p < L.kataDari(kt.suara).length; p += 1) semua.push(...L.teksTerlihat(L.keadaanStory(a, i, p)));
      });
      const kena = semua.filter((t) => TERLARANG.test(t) || /soal nomor|Latihan 1\.[1-4]|nomor [1-9]|catatan video|menurut buku/i.test(t));
      cek(kena.length === 0, `${v.id}/${a.id}: tanpa penyebutan buku atau catatan sumber (${kena.slice(0, 2).join(" | ")})`);
      cek(!/Uji Kompetensi|Pengayaan|Ayo Berlatih|Ayo Berdiskusi|Ayo Berefleksi|Ayo Mengingat|Ayo Berkomunikasi|Ayo Berpikir|Ayo Berkarya|Ayo Bermain|Ayo Mencoba|soal \d|Soal \d|Eksplorasi|Refleksi/.test(semua.join(" | ")), `${v.id}/${a.id}: latihan disajikan sebagai Latihan, tanpa istilah buku`);
      // Tokoh hanya enam tokoh tetap (Malosi, Kira, Upe, Wei, Halim, Igil): tanpa nama lain dari data sumber.
      cek(!/\b(Tika|Ibu|Ayah|Bapak|Paman|Pak|Budi|Ani|Doni|Sinta|Dewi|Rudi|Nina|Andi|Siti|Zoltan|Maria|Alfa|Galih|Alen|Meutia|Bandi|Pramuka)\b/.test(semua.join(" | ")), `${v.id}/${a.id}: hanya enam tokoh tetap`);
    }
  }
  cek(M_VIDEO.subjudul === "Materi kurikulum" && U.subjudul === "Tiga metode luar", "subjudul video: Materi kurikulum dan Tiga metode luar");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 46), "video materi: label sumber berbentuk Materi: ... dan pendek");
  cek(U.adegan.every((a) => /Metode luar|Ringkasan/i.test(a.sumber) && a.sumber.length <= 46), "video metode luar: label sumber metode luar atau ringkasan, pendek");
  cek(M_VIDEO.id === "k3b1B-materi" && U.id === "k3b1B-luar", "id video k3b1B-materi dan k3b1B-luar");
  cek(U.judul.endsWith(": Metode dari Luar") && !/menurut/i.test(M_VIDEO.judul), "judul video: materi tanpa 'menurut', luar berakhir ': Metode dari Luar'");
  cek(
    M_VIDEO.adegan.map((a) => a.id).join() ===
      "sapaan,tiga-tempat,nilai-251,blok-251,angka-sama,tempat-angka,peran-nol,kartu-kotak,susun,susun-lain,urai,urai-lain,tabel-angka,cara-langkah,latihan-satu,latihan-dua,latihan-tiga,penutup",
    "urutan adegan materi",
  );
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-nilai,luar-nilai-terapan,luar-kartu,luar-kartu-terapan,luar-uraian,luar-uraian-terapan,luar-ringkas", "urutan adegan metode luar");
  cek(M_VIDEO.adegan[0].id === "sapaan" && U.adegan[0].id === "sapaan", "tiap video dibuka adegan sapaan");
  cek(M_VIDEO.adegan.filter((a) => /^latihan-/.test(a.id)).length === 3 && M_VIDEO.adegan[M_VIDEO.adegan.length - 1].id === "penutup", "video materi: Latihan 1 sampai 3 lalu penutup");
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-nilai", "luar-nilai-terapan", "luar-kartu", "luar-kartu-terapan", "luar-uraian", "luar-uraian-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(U.adegan[1].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  for (const kata of ["Latihan", "Igil", "Malosi", "Halim", "Kira", "Wei", "Upe", "nilai tempat", "ratusan", "puluhan", "satuan", "papan", "angka", "tempat", "nilai", "bilangan", "menyusun", "mengurai", "nol", "tabel", "kartu", "blok", "bernilai", "bergantung", "tiga tempat", "kotak"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  // Lingkup: bilangan tiga angka (sampai sembilan ratus sembilan puluh sembilan) dan nilai tempat; tanpa seribu, satuan baku, bersusun, pinjam, simpan, bagi, atau benda nyata.
  const BOCOR = /seribu|\bribu\b|sentimeter|centimeter|\bcm\b|\bmeter\b|\bkm\b|penggaris|tinggi badan|alat ukur|bersusun|meminjam|pinjam|menyimpan|simpan|dikali|perkalian|pembagian|dibagi|keliling|\bluas\b|rumus|volume|kaleng|kerikil|manik|toples|gelas|kantong|×|÷|−/i;
  for (const v of [M_VIDEO, U]) {
    for (const a of v.adegan) cek(!BOCOR.test(teksAdegan(a)), `${v.id}/${a.id}: lingkup nilai tempat tiga angka (tanpa seribu, satuan baku, bersusun, pinjam, simpan, bagi, benda nyata)`);
    for (const a of v.adegan) for (const i of a.ketukan.keys()) for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) for (const b of bilanganDari(t)) cek(Number(b) <= 999, `${v.id}/${a.id}#${i + 1}: angka di gambar paling besar sembilan ratus sembilan puluh sembilan ("${t}")`);
  }
  cek(totalKetukan >= 70 && M_VIDEO.adegan.reduce((t, ad) => t + ad.ketukan.length, 0) >= 70, `total ketukan cukup dalam (${totalKetukan}; materi ${M_VIDEO.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)})`);
  // Durasi materi diputar 8 sampai 13 menit (dua kata per detik, sapaan termasuk).
  const kataMateri = kataVideo(M_VIDEO);
  cek(kataMateri / 120 >= 8 && kataMateri / 120 <= 13, `durasi materi diputar 8 sampai 13 menit (${(kataMateri / 120).toFixed(1)} menit)`);
  cek(kataVideo(U) / 120 >= 3, `durasi video luar paling sedikit 3 menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
}

/* ------------------------------ Bilangan yang diucapkan dibaca dari kata dan dicocokkan dengan gambar ------------------------------ */
const SATUAN = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];
const tokoh = (s) => s.toLowerCase().split(/[.,!?;:]/).map((seg) => seg.split(/\s+/).map((w) => w.replace(/[^a-z]/g, "")).filter(Boolean)).filter((x) => x.length);
const satu = (w) => SATUAN.indexOf(w);
/** Frasa bilangan (sepuluh atau lebih) yang dimulai pada token `p` dalam satu segmen: [nilai, panjang] atau null. Contoh: "dua ratus lima puluh satu" = 251. */
function frasa(t, p) {
  let i = p;
  let total = 0;
  let adaRatus = false;
  if (t[i] === "seratus") {
    total = 100;
    i += 1;
    adaRatus = true;
  } else if (satu(t[i]) >= 1 && t[i + 1] === "ratus") {
    total = satu(t[i]) * 100;
    i += 2;
    adaRatus = true;
  }
  const mulaiTail = i;
  if (t[i] === "sepuluh") {
    total += 10;
    i += 1;
  } else if (t[i] === "sebelas") {
    total += 11;
    i += 1;
  } else if (satu(t[i]) >= 1 && t[i + 1] === "belas") {
    total += 10 + satu(t[i]);
    i += 2;
  } else if (satu(t[i]) >= 2 && t[i + 1] === "puluh") {
    total += satu(t[i]) * 10;
    i += 2;
    if (satu(t[i]) >= 1) {
      total += satu(t[i]);
      i += 1;
    }
  } else if (adaRatus && satu(t[i]) >= 1) {
    total += satu(t[i]);
    i += 1;
  }
  if (i === p || (!adaRatus && i === mulaiTail)) return null;
  return [total, i - p];
}
/** Semua frasa bilangan (sepuluh atau lebih) dalam suara. */
function frasaSuara(suara) {
  const hasil = [];
  for (const seg of tokoh(suara)) {
    for (let p = 0; p < seg.length; ) {
      const f = frasa(seg, p);
      if (f) {
        hasil.push(f[0]);
        p += f[1];
      } else p += 1;
    }
  }
  return hasil;
}
sama([frasaSuara("Dua ratus lima puluh satu."), frasaSuara("Tujuh ratus tiga, nol."), frasaSuara("Enam puluh delapan dan seratus."), frasaSuara("Sembilan belas. Dua, lima, dan satu.")], [[251], [703], [68, 100], [19]], "pembaca nama bilangan: eja ke angka");

/* ------------------------------ Papan, blok, dan persamaan dihitung ulang dari gambar ------------------------------ */
const stat = { papan: 0, blok: 0, persamaan: 0, suara: 0, nilai: 0, khusus: 0 };
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
const NILAI_TEMPAT = [100, 10, 1];
const NAMA_TEMPAT = ["ratusan", "puluhan", "satuan"];
const KATA_ANGKA = SATUAN.slice(1).join("|");

/**
 * Semua papan tiga tempat pada keadaan `objs`: id angka `${p}_d{i}` (satu karakter), kolom `${p}_c{i}`, nama `${p}_h{i}`, nilai `${p}_v{i}`, bilangan utuh `${p}_n`, uraian `${p}_u`, blok `${p}_b{i}_{j}`.
 * Bilangan dihitung ULANG dari angka tiap tempat (100 x ratusan + 10 x puluhan + satuan), bukan dari kata.
 */
function kumpulPapan(objs, nm) {
  const hasil = [];
  const digitObj = objs.filter((o) => o.t === "teks" && /^[a-z0-9]+_d[012]$/.test(o.id));
  const awalan = [...new Set([...digitObj.map((o) => /^([a-z0-9]+)_d/.exec(o.id)[1]), ...objs.filter((o) => /^[a-z0-9]+_c[012]$/.test(o.id)).map((o) => /^([a-z0-9]+)_c/.exec(o.id)[1])])];
  for (const p of awalan) {
    const kol = [0, 1, 2].map((i) => ketemu(objs, `${p}_c${i}`));
    cek(kol.every((c) => c && c.t === "kotak"), `${nm}: papan ${p} punya tiga kolom`);
    if (!kol.every(Boolean)) continue;
    cek(kol[0].x < kol[1].x && kol[1].x < kol[2].x && kol.every((c) => c.y === kol[0].y && c.w === kol[0].w), `${nm}: papan ${p} tiga kolom berjajar dari kiri ke kanan (ratusan, puluhan, satuan)`);
    cek(kol.every((c, i) => c.warna === G.WARNA_TEMPAT[i]), `${nm}: papan ${p} ratusan hijau, puluhan biru, satuan merah`);
    for (let i = 0; i < 3; i += 1) {
      const h = ketemu(objs, `${p}_h${i}`);
      if (h) cek(h.isi === NAMA_TEMPAT[i] && Math.abs(h.x - (kol[i].x + kol[i].w / 2)) < 0.01 && h.y < kol[i].y, `${nm}: nama tempat ${p}_h${i} "${h.isi}" tepat di atas kolom ${NAMA_TEMPAT[i]}`);
    }
    const digit = [0, 1, 2].map((i) => {
      const d = ketemu(objs, `${p}_d${i}`);
      if (!d) return null;
      cek(/^[0-9?]$/.test(d.isi ?? ""), `${nm}: ${p}_d${i} berisi satu angka 0 sampai 9 (isi "${d.isi}")`);
      cek(d.x > kol[i].x && d.x < kol[i].x + kol[i].w && d.y > kol[i].y && d.y < kol[i].y + kol[i].h + 4, `${nm}: angka ${p}_d${i} berada di dalam kolom ${NAMA_TEMPAT[i]}`);
      return d.isi === "?" ? "?" : Number(d.isi);
    });
    // Tempat kosong hanya di kiri (mis. " 73").
    const ada = digit.map((d) => d !== null);
    cek((!ada[0] || (ada[1] && ada[2])) && (!ada[1] || ada[2]), `${nm}: papan ${p}: tempat kosong hanya di sebelah kiri`);
    const tanya = digit.includes("?");
    const n = tanya ? null : digit.reduce((t, d, i) => t + (d ?? 0) * NILAI_TEMPAT[i], 0);
    const pb = { p, digit, n, tanya, kolom: kol };
    // Nilai tiap angka = angka x nilai tempat.
    for (let i = 0; i < 3; i += 1) {
      const v = ketemu(objs, `${p}_v${i}`);
      if (v) {
        stat.nilai += 1;
        cek(digit[i] !== null && digit[i] !== "?" && v.isi === String(digit[i] * NILAI_TEMPAT[i]), `${nm}: nilai ${p}_v${i} "${v.isi}" sama dengan angka ${digit[i]} x ${NILAI_TEMPAT[i]}`);
      }
    }
    const u = ketemu(objs, `${p}_n`);
    if (u && n !== null) cek(u.isi === String(n), `${nm}: bilangan utuh ${p}_n "${u.isi}" sama dengan ${n} dari angka tiap tempat`);
    // Blok per tempat.
    const blokIds = objs.filter((o) => new RegExp(`^${p}_b[012]_\\d+$`).test(o.id));
    if (blokIds.length) {
      stat.blok += 1;
      for (let i = 0; i < 3; i += 1) {
        const bi = blokIds.filter((o) => o.id.startsWith(`${p}_b${i}_`));
        // Blok boleh muncul tempat demi tempat: tiap tempat kosong atau lengkap sama dengan angkanya.
        cek((bi.length === 0 || bi.length === (digit[i] ?? 0)) && bi.every((o, j) => o.id === `${p}_b${i}_${j}`), `${nm}: blok ${p} tempat ${NAMA_TEMPAT[i]} berjumlah ${bi.length}, sama dengan angka ${digit[i] ?? 0}`);
        cek(bi.every((o) => o.x >= kol[i].x - 0.01 && o.x + o.w <= kol[i].x + kol[i].w + 0.01), `${nm}: blok ${p} tempat ${NAMA_TEMPAT[i]} berada di bawah kolomnya`);
      }
    }
    // Uraian "200 + 50 + 1 = 251" atau "500 + 20 + ?": bagian-bagiannya sama dengan nilai tiap tempat.
    const ur = ketemu(objs, `${p}_u`);
    if (ur) {
      stat.persamaan += 1;
      const lengkap = /^(\d+(?: \+ \d+)+) = (\d+)$/.exec(ur.isi);
      const sebagian = /^(\d+(?: \+ \d+)*) \+ \?$/.exec(ur.isi);
      const nilaiNol = [0, 1, 2].filter((i) => digit[i] !== null).map((i) => digit[i] * NILAI_TEMPAT[i]);
      if (lengkap && n !== null) {
        const bagian = lengkap[1].split(" + ").map(Number);
        cek(Number(lengkap[2]) === n && bagian.reduce((a, b) => a + b, 0) === n, `${nm}: uraian ${p}_u "${ur.isi}" berjumlah ${n}`);
        cek(JSON.stringify(bagian.filter((x) => x !== 0)) === JSON.stringify(nilaiNol.filter((x) => x !== 0)), `${nm}: bagian uraian ${p}_u sama dengan nilai tiap tempat (${nilaiNol.join(", ")})`);
      } else if (sebagian && n !== null) {
        const bagian = sebagian[1].split(" + ").map(Number);
        cek(JSON.stringify(bagian) === JSON.stringify(nilaiNol.slice(0, bagian.length)), `${nm}: uraian sebagian ${p}_u "${ur.isi}" memuat nilai tempat pertama`);
      } else cek(false, `${nm}: uraian ${p}_u "${ur.isi}" berbentuk jumlah nilai`);
    }
    // Perkalian "5 x 100 = 500": angka tempat i kali nilai tempat i.
    for (let i = 0; i < 3; i += 1) {
      const e = ketemu(objs, `${p}_e${i}`);
      if (e) {
        stat.persamaan += 1;
        cek(e.isi === `${digit[i]} x ${NILAI_TEMPAT[i]} = ${digit[i] * NILAI_TEMPAT[i]}`, `${nm}: rumus ${p}_e${i} "${e.isi}" sama dengan angka ${digit[i]} x ${NILAI_TEMPAT[i]}`);
      }
    }
    stat.papan += 1;
    hasil.push(pb);
  }
  return hasil;
}

/** Persamaan umum pada teks gambar dihitung ulang. */
function periksaPersamaan(nm, objs) {
  for (const t of L.teksTerlihat(objs)) {
    let m = /^(\d+(?: \+ \d+)+) = (\d+)$/.exec(t);
    if (m) {
      stat.persamaan += 1;
      cek(m[1].split(" + ").map(Number).reduce((a, b) => a + b, 0) === Number(m[2]) && Number(m[2]) <= 999, `${nm}: persamaan "${t}" benar`);
      continue;
    }
    m = /^(\d+) x (\d+) = (\d+)$/.exec(t);
    if (m) {
      stat.persamaan += 1;
      cek(Number(m[1]) * Number(m[2]) === Number(m[3]), `${nm}: perkalian "${t}" benar`);
    }
  }
}

/** Kalimat suara dihitung ulang terhadap papan yang tergambar pada ketukan itu. */
function periksaSuara(nm, suara, papan, tampak) {
  // a) Setiap bilangan sepuluh atau lebih yang dieja harus tampak sebagai angka di gambar.
  for (const f of frasaSuara(suara)) {
    stat.suara += 1;
    cek(tampak.has(String(f)), `${nm} suara: bilangan yang dieja (${f}) tampak sebagai angka di gambar`);
  }
  const segmen = suara.split(/[.!?]/).map((s) => s.toLowerCase().replace(/[^a-z ,]/g, " ").replace(/\s+/g, " ").trim()).filter(Boolean);
  for (const kal of segmen) {
    // b) "dua ada di ratusan": angka yang disebut benar-benar ada di tempat itu pada papan yang tampak.
    for (const m of kal.matchAll(new RegExp(`(?:^| )(${KATA_ANGKA}|nol)(?: ada| berada)? (?:di|pada) (?:tempat )?(ratusan|puluhan|satuan)(?= |,|$)`, "g"))) {
      if (!papan.some((b) => b.digit.some((d) => d !== null))) continue; // kalimat tentang kartu atau nilai, bukan tentang papan
      stat.suara += 1;
      const v = satu(m[1]);
      const i = NAMA_TEMPAT.indexOf(m[2]);
      cek(papan.some((b) => b.digit[i] === v), `${nm} suara: "${m[0].trim()}" cocok dengan angka pada papan (${papan.map((b) => b.digit.join("")).join(" | ")})`);
      // c) "..., jadi nilainya dua ratus" atau "bernilai": nilai yang diucapkan = angka x nilai tempat.
      const sisa = kal.slice(m.index + m[0].length);
      const n = /^,? ?(?:jadi nilainya|bernilai|nilainya) ([a-z ]+)/.exec(sisa);
      if (n) {
        stat.nilai += 1;
        const kata = n[1].trim().split(" ");
        const f = frasa(kata, 0);
        const nilaiUcap = f ? f[0] : satu(kata[0]);
        cek(nilaiUcap === v * NILAI_TEMPAT[i], `${nm} suara: "${m[0].trim()}${n[0]}" nilainya ${nilaiUcap} sama dengan ${v} x ${NILAI_TEMPAT[i]}`);
      }
    }
  }
}

/* ------------------------------ Bilangan tampak: gabungan teks di gambar dan bilangan dari papan ------------------------------ */
const bilTampak = (a, i) => {
  const s = new Set();
  for (let p = 0; p < L.kataDari(a.ketukan[i].suara).length; p += 1) for (const o of L.keadaanStory(a, i, p)) if (o.t === "teks" && o.isi) for (const b of bilanganDari(o.isi)) s.add(b);
  for (const b of kumpulPapanSenyap(L.keadaanStory(a, i, 9999))) s.add(String(b));
  return s;
};
/** Bilangan utuh semua papan (tanpa pemeriksaan, hanya hitung ulang untuk dicocokkan dengan suara). */
const kumpulPapanSenyap = (objs) => {
  const hasil = [];
  const awalan = [...new Set(objs.filter((o) => o.t === "teks" && /^[a-z0-9]+_d[012]$/.test(o.id)).map((o) => /^([a-z0-9]+)_d/.exec(o.id)[1]))];
  for (const p of awalan) {
    const d = [0, 1, 2].map((i) => ketemu(objs, `${p}_d${i}`)?.isi);
    if (d.includes("?")) continue;
    hasil.push(d.reduce((t, x, i) => t + (x === undefined ? 0 : Number(x)) * NILAI_TEMPAT[i], 0));
  }
  return hasil;
};

for (const v of VIDEO) {
  for (const a of v.adegan) {
    a.ketukan.forEach((kt, i) => {
      const nm = `${v.id}/${a.id}#${i + 1}`;
      const objs = akhirAdegan(a, i);
      const papan = kumpulPapan(objs, nm);
      periksaPersamaan(nm, objs);
      periksaSuara(nm, kt.suara, papan, bilTampak(a, i));
    });
  }
}

/* ------------------------------ Pemeriksaan khusus tiap adegan (dihitung ulang dari struktur gambar) ------------------------------ */
{
  const di = (id, ke) => akhirAdegan(adegan(M_VIDEO, id) ?? adegan(U, id), ke);
  const pap = (id, ke, p) => kumpulPapan(di(id, ke), `${id}#${ke + 1}`).find((b) => b.p === p);
  const sorotId = (objs) => objs.filter((o) => o.sorot).map((o) => o.id).sort();
  const sorotPilihan = (objs) => {
    const i = [1, 2, 3].find((q) => ketemu(objs, `c${q}-k`)?.sorot);
    return i ? isiTeks(objs, `c${i}-t`) : null;
  };
  const pilihanIsi = (objs) => [1, 2, 3].map((q) => isiTeks(objs, `c${q}-t`)).filter((x) => x !== undefined);
  const tengah = (v, id, ke, kata) => {
    const a = adegan(v, id);
    return L.keadaanStory(a, ke, L.posisiKata(a.ketukan[ke].suara, kata));
  };
  const nilaiTeks = (objs, p) => [0, 1, 2].map((i) => isiTeks(objs, `${p}_v${i}`));
  const dalamKolom = (objs, idKartu, b, i) => {
    const kk = ketemu(objs, `${idKartu}-k`);
    const pusat = kk.x + kk.w / 2;
    return pusat > b.kolom[i].x && pusat < b.kolom[i].x + b.kolom[i].w && kk.y >= b.kolom[i].y - 1 && kk.y + kk.h <= b.kolom[i].y + b.kolom[i].h + 1;
  };


  // Tiga tempat: papan empat ratus tujuh puluh dua; angka disorot satu per satu menurut kata.
  {
    const b = pap("tiga-tempat", 3, "pa");
    sama([b.digit, b.n], [[4, 7, 2], 472], "tiga tempat: papan 472 dihitung dari angka tiap tempat");
    sama([pap("tiga-tempat", 0, "pa").digit, pap("tiga-tempat", 2, "pa").digit], [[null, null, null], [null, null, null]], "tiga tempat: papan masih kosong sebelum bilangan diletakkan");
    sama(sorotId(tengah(M_VIDEO, "tiga-tempat", 4, "tujuh")), ["pa_d1"], "tiga tempat: angka tujuh (puluhan) disorot saat kata tujuh");
    sama(sorotId(di("tiga-tempat", 4)), ["pa_d2"], "tiga tempat: akhirnya angka dua (satuan) disorot");
    cek(L.teksTerlihat(di("tiga-tempat", 5)).includes("tempat menentukan nilai"), "tiga tempat: tempat menentukan nilai tertulis");
    stat.khusus += 5;
  }
  // Nilai tiap angka pada 251.
  {
    const b = pap("nilai-251", 4, "pb");
    sama([b.digit, b.n, nilaiTeks(di("nilai-251", 3), "pb")], [[2, 5, 1], 251, ["200", "50", "1"]], "nilai 251: angka 2, 5, 1 bernilai 200, 50, 1");
    sama([1, 2, 3].map((ke) => sorotId(di("nilai-251", ke))), [["pb_d0"], ["pb_d1"], ["pb_d2"]], "nilai 251: angka disorot ratusan, puluhan, satuan satu per satu");
    sama(isiTeks(di("nilai-251", 4), "pb_n"), "251", "nilai 251: bilangan utuh 251");
    stat.khusus += 3;
  }
  // Model blok: 2 blok besar, 5 batang, 1 kotak kecil; nilai satu blok 100, satu batang 10, satu kotak 1.
  {
    const b = pap("blok-251", 5, "pc");
    const o = di("blok-251", 5);
    sama([b.digit, b.n, nilaiTeks(o, "pc"), isiTeks(o, "lb0"), isiTeks(o, "lb1"), isiTeks(o, "lb2")], [[2, 5, 1], 251, ["200", "50", "1"], "1 blok = 100", "1 batang = 10", "1 kotak = 1"], "blok 251: dua blok besar, lima batang, satu kotak kecil, nilai satuannya 100, 10, 1");
    sama([0, 1, 2].map((i) => o.filter((q) => new RegExp(`^pc_b${i}_`).test(q.id)).length), [2, 5, 1], "blok 251: jumlah blok per tempat 2, 5, 1");
    sama([[1, 0], [2, 1], [3, 2]].map(([ke, i]) => di("blok-251", ke).filter((q) => new RegExp(`^pc_b${i}_`).test(q.id)).length), [2, 5, 1], "blok 251: blok muncul tempat demi tempat");
    stat.khusus += 4;
  }
  // Angka sama, nilai berbeda: 600, 60, 6.
  {
    const o = di("angka-sama", 4);
    const a = pap("angka-sama", 4, "qa");
    const b = pap("angka-sama", 4, "qb");
    const c = pap("angka-sama", 4, "qc");
    sama([a.digit, b.digit, c.digit, [a.n, b.n, c.n]], [[6, 0, 0], [null, 6, 0], [null, null, 6], [600, 60, 6]], "angka sama: bilangan 600, 60, dan 6 dihitung dari angka tiap tempat");
    sama([isiTeks(o, "qa_v0"), isiTeks(o, "qb_v1"), isiTeks(o, "qc_v2")], ["600", "60", "6"], "angka sama: angka enam bernilai 600, 60, 6");
    sama(sorotId(o), ["qa_d0", "qb_d1", "qc_d2"], "angka sama: ketiga angka enam disorot bersama");
    cek(["qa_d0", "qb_d1", "qc_d2"].every((id) => isiTeks(o, id) === "6"), "angka sama: angka yang disorot semuanya enam");
    sama([1, 2, 3].map((ke) => sorotId(di("angka-sama", ke))), [["qa_d0"], ["qb_d1"], ["qc_d2"]], "angka sama: enam di ratusan, puluhan, satuan disorot bergantian");
    stat.khusus += 5;
  }
  // Angka delapan ada di mana: 981, 845, 108, 800.
  {
    const harap = [[9, 8, 1], [9, 8, 1], [8, 4, 5], [1, 0, 8], [8, 0, 0]];
    const tempat = [null, 1, 0, 2, 0];
    harap.forEach((d, ke) => {
      const b = pap("tempat-angka", ke, "te");
      sama([b.digit, b.n], [d, d[0] * 100 + d[1] * 10 + d[2]], `tempat angka #${ke + 1}: papan menunjukkan ${d.join("")}`);
      if (tempat[ke] !== null) {
        const o = di("tempat-angka", ke);
        sama(sorotId(o), [`te_d${tempat[ke]}`], `tempat angka #${ke + 1}: angka delapan disorot pada tempat ${NAMA_TEMPAT[tempat[ke]]}`);
        sama(isiTeks(o, `te_d${tempat[ke]}`), "8", `tempat angka #${ke + 1}: angka yang disorot adalah delapan`);
      }
    });
    stat.khusus += 5;
  }
  // Peran nol: 805 lawan 85 (nol dibuang, angka bergeser).
  {
    const a = pap("peran-nol", 3, "nl");
    const b = pap("peran-nol", 3, "nm");
    sama([a.digit, a.n, b.digit, b.n], [[8, 0, 5], 805, [null, 8, 5], 85], "peran nol: 805 menjadi 85 bila nol dibuang");
    sama([sorotId(di("peran-nol", 1)), isiTeks(di("peran-nol", 1), "nl_d1")], [["nl_d1"], "0"], "peran nol: angka nol di puluhan disorot");
    sama(isiTeks(di("peran-nol", 2), "nl_v1"), "0", "peran nol: nilai angka nol di puluhan adalah nol");
    cek(L.teksTerlihat(di("peran-nol", 4)).includes("nol menjaga tempat"), "peran nol: nol menjaga tempat tertulis");
    stat.khusus += 4;
  }
  // Kartu angka diseret ke tiga kotak: 3 ke ratusan, 4 ke puluhan, 6 ke satuan.
  {
    const kb = (ke) => pap("kartu-kotak", ke, "kb");
    const o1 = di("kartu-kotak", 1);
    sama(["kc0", "kc1", "kc2"].map((c) => isiTeks(o1, `${c}-t`)), ["4", "6", "3"], "kartu kotak: tiga kartu di baki bertuliskan 4, 6, 3");
    cek(["kc0", "kc1", "kc2"].every((c) => [0, 1, 2].every((i) => !dalamKolom(o1, c, kb(1), i))), "kartu kotak: kartu di baki belum masuk kotak");
    const tujuan = [["kc2", 0, 2], ["kc0", 1, 3], ["kc1", 2, 4]];
    for (const [c, i, ke] of tujuan) {
      const o = di("kartu-kotak", ke);
      cek(dalamKolom(o, c, kb(ke), i), `kartu kotak: kartu ${c} masuk kotak ${NAMA_TEMPAT[i]} pada ketukan ${ke + 1}`);
      cek([0, 1, 2].filter((j) => j !== i).every((j) => !dalamKolom(o, c, kb(ke), j)), `kartu kotak: kartu ${c} hanya masuk satu kotak`);
    }
    const o4 = di("kartu-kotak", 4);
    sama([isiTeks(o4, "kc2-t"), isiTeks(o4, "kc0-t"), isiTeks(o4, "kc1-t")], ["3", "4", "6"], "kartu kotak: kartu 3, 4, 6 menempati ratusan, puluhan, satuan");
    const b = kb(5);
    sama([b.digit, b.n, ["kc0", "kc1", "kc2"].some((c) => ketemu(di("kartu-kotak", 5), `${c}-k`))], [[3, 4, 6], 346, false], "kartu kotak: kartu berganti angka pada papan, terbentuk 346");
    stat.khusus += 8;
  }
  // Menyusun 200 + 50 + 1 = 251.
  {
    const o = di("susun", 4);
    const b = pap("susun", 4, "sa");
    sama([b.digit, b.n, isiTeks(o, "sa_u"), isiTeks(o, "sa_n")], [[2, 5, 1], 251, "200 + 50 + 1 = 251", "251"], "susun: 200 + 50 + 1 = 251");
    sama([0, 1, 2].map((i) => isiTeks(o, `sa_cn${i}`)), b.digit.map((d, i) => `${d} ${NAMA_TEMPAT[i]}`), "susun: dua ratusan, lima puluhan, satu satuan sama dengan angka pada papan");
    sama(nilaiTeks(di("susun", 2), "sa"), ["200", "50", "1"], "susun: nilai 200, 50, 1");
    stat.khusus += 3;
  }
  // Kira menyusun dari kartu nilai 600, 80, 4.
  {
    const o = di("susun-lain", 3);
    const b = pap("susun-lain", 3, "sb");
    const kartuNilai = [0, 1, 2].map((i) => Number(isiTeks(o, `kv${i}-t`)));
    sama([kartuNilai, b.digit, b.n, isiTeks(o, "sb_u"), isiTeks(o, "sb_n")], [[600, 80, 4], [6, 8, 4], 684, "600 + 80 + 4 = 684", "684"], "susun lain: kartu 600, 80, 4 menjadi 684");
    cek(kartuNilai.every((v, i) => v === b.digit[i] * NILAI_TEMPAT[i]), "susun lain: nilai tiap kartu sama dengan angka x nilai tempat pada papan");
    stat.khusus += 2;
  }
  // Mengurai 602 dan 723.
  {
    const a = pap("urai", 4, "ua");
    sama([a.digit, a.n, nilaiTeks(di("urai", 3), "ua"), isiTeks(di("urai", 4), "ua_u")], [[6, 0, 2], 602, ["600", "0", "2"], "600 + 0 + 2 = 602"], "urai: 602 = 600 + 0 + 2");
    cek(L.teksTerlihat(di("urai", 5)).includes("602 ⇄ 600 + 0 + 2"), "urai: dua arah antara bilangan dan uraian");
    const b = pap("urai-lain", 3, "ub");
    sama([b.digit, b.n, nilaiTeks(di("urai-lain", 2), "ub"), isiTeks(di("urai-lain", 3), "ub_u")], [[7, 2, 3], 723, ["700", "20", "3"], "700 + 20 + 3 = 723"], "urai lain: 723 = 700 + 20 + 3");
    stat.khusus += 4;
  }
  // Tabel diisi dengan angka, bukan nilai.
  {
    const b = pap("tabel-angka", 4, "tb");
    const o = di("tabel-angka", 4);
    const salah = [0, 1, 2].map((i) => Number(isiTeks(o, `sl${i}-t`)));
    sama([b.digit, b.n, salah], [[9, 8, 7], 987, [900, 80, 7]], "tabel angka: tabel 987 diisi 9, 8, 7; contoh salah 900, 80, 7");
    cek(salah.every((v, i) => v === b.digit[i] * NILAI_TEMPAT[i]) && b.digit.every((d) => d < 10), "tabel angka: isi salah adalah nilai (angka x nilai tempat), isi benar adalah angka tunggal");
    cek(isiTeks(o, "sx") === "❌" && L.teksTerlihat(o).includes("tabel hanya berisi angka"), "tabel angka: tanda salah dan aturan tertulis");
    stat.khusus += 3;
  }
  // Empat langkah: 524.
  {
    const b = pap("cara-langkah", 4, "ca");
    const o = di("cara-langkah", 3);
    sama([b.digit, b.n, [0, 1, 2].map((i) => isiTeks(o, `ca_e${i}`)), isiTeks(di("cara-langkah", 4), "ca_u")], [[5, 2, 4], 524, ["5 x 100 = 500", "2 x 10 = 20", "4 x 1 = 4"], "500 + 20 + 4 = 524"], "cara langkah: 524, tiga perkalian, jumlah untuk mengecek");
    sama([1, 2, 3, 4].map((ke) => isiTeks(di("cara-langkah", ke), "st-t0")), ["1. letakkan di papan", "2. lihat tempat tiap angka", "3. kalikan dengan nilai tempat", "4. jumlahkan untuk mengecek"], "cara langkah: empat langkah berurutan");
    sama(L.teksTerlihat(di("cara-langkah", 0)).filter((t) => /^\d\. /.test(t)).length, 4, "cara langkah: empat langkah tampil di awal");
    stat.khusus += 3;
  }
  // Latihan 1: nilai angka tujuh pada 372.
  {
    const b = pap("latihan-satu", 0, "la");
    const o = di("latihan-satu", 2);
    sama([b.digit, b.n, pilihanIsi(di("latihan-satu", 1)), sorotPilihan(o)], [[3, 7, 2], 372, ["7", "70", "700"], String(b.digit[1] * NILAI_TEMPAT[1])], "latihan 1: nilai angka tujuh pada 372 adalah 70");
    sama([isiTeks(o, "la_v1"), isiTeks(di("latihan-satu", 3), "la_v0")], ["70", "300"], "latihan 1: nilai tujuh 70 dan nilai tiga 300");
    stat.khusus += 2;
  }
  // Latihan 2: 400 + 30 + 9.
  {
    const o = di("latihan-dua", 2);
    const kartuNilai = [0, 1, 2].map((i) => Number(isiTeks(o, `lk${i}-t`)));
    const jumlah = kartuNilai.reduce((a, b) => a + b, 0);
    sama([kartuNilai, pilihanIsi(o), sorotPilihan(o), isiTeks(o, "lb_u")], [[400, 30, 9], ["349", "439", "934"], String(jumlah), `${kartuNilai.join(" + ")} = ${jumlah}`], "latihan 2: 400 + 30 + 9 = 439 dan jawaban yang disorot benar");
    cek(jumlah === 439 && pilihanIsi(o).filter((x) => Number(x) === jumlah).length === 1, "latihan 2: hanya satu pilihan yang sama dengan jumlah");
    sama(isiTeks(di("latihan-dua", 3), "lb_n"), "439", "latihan 2: bilangan 439");
    stat.khusus += 3;
  }
  // Latihan 3: angka puluhan pada 608 adalah nol.
  {
    const a = pap("latihan-tiga", 0, "lc");
    sama([a.digit, isiTeks(di("latihan-tiga", 0), "lc_n")], [[6, "?", 8], "608"], "latihan 3: tabel 608 dengan puluhan masih tanda tanya");
    const o2 = di("latihan-tiga", 2);
    const b = pap("latihan-tiga", 2, "lc");
    sama([b.digit, b.n, pilihanIsi(o2), sorotPilihan(o2)], [[6, 0, 8], 608, ["0", "6", "8"], String(Math.floor(608 / 10) % 10)], "latihan 3: angka puluhan 608 adalah nol dan jawaban yang disorot benar");
    const tanpaNol = Number(String(608).replace("0", ""));
    cek(L.teksTerlihat(di("latihan-tiga", 3)).includes(`tanpa nol: ${tanpaNol}`) && tanpaNol === 68, "latihan 3: tanpa nol bilangannya menjadi 68");
    stat.khusus += 3;
  }
  // Metode luar 1: Nilai Tempat.
  {
    const o = di("luar-nilai", 4);
    const b = pap("luar-nilai", 4, "ln");
    sama([b.digit, b.n, nilaiTeks(o, "ln")], [[4, 3, 8], 438, ["400", "30", "8"]], "luar nilai: 438, angka 4, 3, 8 bernilai 400, 30, 8");
    const t = pap("luar-nilai-terapan", 0, "lt");
    const o2 = di("luar-nilai-terapan", 2);
    sama([t.digit, t.n, pilihanIsi(o2), sorotPilihan(o2), isiTeks(o2, "lt_v1")], [[3, 6, 5], 365, ["6", "60", "600"], String(t.digit[1] * 10), "60"], "luar nilai terapan: angka enam pada 365 bernilai 60");
    sama(sorotId(di("luar-nilai-terapan", 3)), ["lt_c0"], "luar nilai terapan: kolom ratusan disorot untuk contoh enam ratus");
    stat.khusus += 4;
  }
  // Metode luar 2: Kartu Angka Montessori.
  {
    const o1 = di("luar-kartu", 1);
    const kartuTeks = Array.from({ length: 10 }, (_, i) => isiTeks(o1, `kd${i}-t`));
    sama(kartuTeks, ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], "luar kartu: sepuluh kartu nol sampai sembilan");
    const kb = (ke) => pap("luar-kartu", ke, "km");
    cek(dalamKolom(di("luar-kartu", 2), "kd2", kb(2), 0), "luar kartu: kartu 2 masuk kotak ratusan");
    cek(dalamKolom(di("luar-kartu", 3), "kd1", kb(3), 1) && dalamKolom(di("luar-kartu", 3), "kd9", kb(3), 2), "luar kartu: kartu 1 ke puluhan dan kartu 9 ke satuan");
    const o4 = di("luar-kartu", 4);
    const b = kb(5);
    sama([b.digit, b.n, nilaiTeks(o4, "km"), isiTeks(di("luar-kartu", 5), "km_n"), Array.from({ length: 10 }, (_, i) => ketemu(o4, `kd${i}-k`)).some(Boolean)], [[2, 1, 9], 219, ["200", "10", "9"], "219", false], "luar kartu: kartu 2, 1, 9 membentuk 219 bernilai 200, 10, 9");
    const k0 = di("luar-kartu-terapan", 0);
    const kt = pap("luar-kartu-terapan", 2, "kt");
    const o2 = di("luar-kartu-terapan", 2);
    sama([[0, 1, 2].map((i) => isiTeks(k0, `ka${i}-t`)), kt.digit, kt.n, pilihanIsi(di("luar-kartu-terapan", 1)), sorotPilihan(o2)], [["4", "0", "7"], [4, 0, 7], 407, ["407", "470", "47"], String(kt.n)], "luar kartu terapan: kartu 4, 0, 7 membentuk 407 dan jawaban benar");
    stat.khusus += 5;
  }
  // Metode luar 3: Bentuk Uraian.
  {
    const o = di("luar-uraian", 4);
    const b = pap("luar-uraian", 4, "ur");
    sama([b.digit, b.n, nilaiTeks(o, "ur"), isiTeks(o, "ur_u")], [[3, 4, 5], 345, ["300", "40", "5"], "300 + 40 + 5 = 345"], "luar uraian: 345 = 300 + 40 + 5");
    const t = pap("luar-uraian-terapan", 0, "ut");
    const o0 = di("luar-uraian-terapan", 0);
    const o2 = di("luar-uraian-terapan", 2);
    sama([t.digit, t.n, [isiTeks(o0, "ut_v0"), isiTeks(o0, "ut_v1")], isiTeks(o0, "ut_u"), pilihanIsi(o2), sorotPilihan(o2), isiTeks(o2, "ut_u")], [[5, 2, 8], 528, ["500", "20"], "500 + 20 + ?", ["8", "80", "800"], String(t.digit[2]), "500 + 20 + 8 = 528"], "luar uraian terapan: 500 + 20 + 8 = 528, bagian yang kurang 8");
    stat.khusus += 2;
  }
  // Pembuka dan ringkasan metode luar.
  {
    cek(isiTeks(di("luar-pembuka", 4), "om-t") === "999" && L.teksTerlihat(di("luar-pembuka", 1)).some((t) => /Kartu Angka Montessori/.test(t)), "luar pembuka: bilangan terbesar 999 dan tiga nama metode");
    const pb = pap("luar-pembuka", 3, "po");
    sama([pb.digit, [0, 1, 2].map((i) => isiTeks(di("luar-pembuka", 3), `po_h${i}`))], [[null, null, null], NAMA_TEMPAT], "luar pembuka: papan tiga tempat kosong dengan nama tempat");
    const r = L.teksTerlihat(di("luar-ringkas", 3)).join(" | ");
    cek(U1.NAMA_METODE_ID.every((m) => r.includes(m)), "luar ringkasan: ketiga nama metode tampil");
    stat.khusus += 3;
  }
}


/* ------------------------------ Aturan pemilik: belajar mandiri, digital, tanpa benda fisik ------------------------------ */
{
  // "karet" sebagai nama permainan (lompat karet) boleh; yang dilarang karet gelang. "lili" adalah nama bunga.
  const MANDIRI = /kerja kelompok|berkelompok|secara berkelompok|diskusi kelompok|sekelompok|kelompokmu|kelompok belajar|bersama kelompok|\bkelompok\b|tanya teman|survei|karet gelang|uang tabungan|tabungan|\bpaman\b|\btika\b|\bteman\w*|\bkawan\w*|sekawan|depan kelas|bersama kelas|seluruh kelas|\bkelas\b|kelas dua|berpasangan dengan (teman|kawan)|bekerja berpasangan|secara berpasangan|bermain bersama|bertanya kepada|buat ceritamu|buku|menulis di|menuliskan di|tulis di|tuliskan di|menggambar|gambarlah|gambar sendiri|\bbawa(lah)?\b|membawa|dibawa|\bkertas\b|\bpensil\b|\bpulpen\b|\bspidol\b|\bgunting\w*|ambil (benda|pensil|kelereng|bola|sedotan|balon|kerucut|kubus)|tangan (kiri|kanan)|\bjari\b|menyuruh|suruh|jengkal|telapak|\bdepa\b|penggaris|\bkoin\b|di sekitar|di rumah|di kelas|centimeter|\bmeter\b|kakimu|tanganmu|badanmu|\braba\w*|\bmeraba|\btubuh|\blengan|lingkari|coret|guru kelas|orang tua|\bayah\b|\bibu guru|bapak guru|\bloker\b|\bpaku\b|\brumah\b|\bpak\b|\bibu\b|\blidi\b|kantong plastik|kue cubit|rambutan|\bbetawi\b|sahabat|\bkantin\b|mempresentasikan|presentasi|\bpara teman|seperti lidi/i;
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      const semua = [a.judul, a.sumber];
      a.ketukan.forEach((kt, i) => {
        semua.push(kt.suara);
        semua.push(...L.teksTerlihat(L.keadaanStory(a, i, 9999)));
      });
      const kena = semua.filter((t) => MANDIRI.test(t));
      cek(kena.length === 0, `${v.id}/${a.id}: narasi mandiri dan digital, tanpa kelompok, teman, kelas, buku, kertas, pensil, benda fisik, atau satuan baku (${kena.slice(0, 2).join(" | ")})`);
    }
  }
}

/* ------------------------------ Sapaan, peta susun, dan tabel susun ------------------------------ */
{
  const sap = adegan(M_VIDEO, "sapaan");
  const DAFTAR = ["Tempat dan nilai angka", "Menyusun bilangan", "Mengurai bilangan"];
  cek(/Halo anak-anak/.test(sap.ketukan[0].suara) && /Tempat dan nilai angka/i.test(L.teksTerlihat(akhirAdegan(sap, 1)).join(" | ")), "sapaan materi: tiga hal yang dipelajari tampil");
  sama(L.teksTerlihat(akhirAdegan(sap, 1)).filter((t) => DAFTAR.includes(t)), DAFTAR, "sapaan materi: daftar tiga hal");
  cek(!/\d/.test(sap.ketukan[1].suara) && !/\d/.test(DAFTAR.join(" ")), "sapaan materi: tanpa angka");
  const sapLuar = adegan(U, "sapaan");
  cek(/cara lain/i.test(L.teksTerlihat(akhirAdegan(sapLuar, 1)).join(" | ")) && /metode-luar|Metode luar/.test(sapLuar.sumber), "sapaan metode luar: pengumuman cara lain");
  let sumberRingkas = null;
  try {
    sumberRingkas = JSON.parse(readFileSync(new URL("../src/data/kelas3-bab1-ringkas.json", import.meta.url), "utf8")).subBab?.B;
  } catch {
    sumberRingkas = null;
  }
  const sementara = new URL("../.tmp-k3b1s/B.json", import.meta.url);
  const A = sumberRingkas?.petaSusun && sumberRingkas?.tabelSusun ? sumberRingkas : existsSync(sementara) ? JSON.parse(readFileSync(sementara, "utf8")) : null;
  if (A) {
    const peta = A.petaSusun.simpul;
    const anak = (id) => peta.filter((s) => s.induk === id).map((s) => s.teks);
    const akar = peta.filter((s) => s.induk === null);
    cek(akar.length === 3, "peta susun: tiga cabang dari pusat");
    sama(anak(akar[0].id), DAFTAR, "peta susun: cabang pertama sama dengan daftar sapaan");
    sama([anak(akar[1].id).length, anak(akar[2].id).length, peta.length], [3, 2, 11], "peta susun: 3 cara, 2 hasil, 11 simpul");
    sama(peta.map((s) => s.nomor), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], "peta susun: nomor 1 sampai 11");
    cek(peta.every((s) => s.teks.length <= 28) && new Set(peta.map((s) => s.teks)).size === peta.length, "peta susun: teks <= 28 huruf dan unik");
    cek(!/\d/.test(A.petaSusun.pusat.suara) && !/\d/.test(A.petaSusun.petunjuk) && peta.every((s) => !/\d/.test(s.petunjuk ?? "")), "peta susun: suara dan petunjuk tanpa digit");
    cek(A.petaSusun.pusat.judul.length > 8 && A.petaSusun.pusat.judul.length <= 28 && /\?$/.test(A.petaSusun.pusat.judul), "peta susun: pusat berupa masalah (pertanyaan) sub-bab, <= 28 huruf");
    const T = A.tabelSusun;
    cek(T.baris.length >= 3 && T.baris.length <= 5 && T.kolom.length >= 3 && T.kolom.length <= 4, "tabel susun: 3 sampai 5 baris dan 3 sampai 4 kolom");
    cek(T.baris.every((b) => b.sel.length === T.kolom.length && b.sel.every((s) => s.length <= 26 && (s.match(/\d+/g) ?? []).length <= 1)), "tabel susun: sel <= 26 huruf dan paling banyak satu angka per sel");
    cek(T.baris.every((b) => b.label.split(/\s+/).every((w) => w.length <= 8)), "tabel susun: kata terpanjang kolom label <= 8 huruf");
    cek(!/\d/.test(T.suara) && !/\d/.test(T.petunjuk), "tabel susun: suara dan petunjuk tanpa digit");
    // Isi tabel dihitung ulang: tiap baris satu bilangan tiga angka; sel berisi ANGKA tiap tempat (bukan nilainya).
    sama(T.kolom, ["Ratusan", "Puluhan", "Satuan"], "tabel susun: kolom ratusan, puluhan, satuan");
    for (const b of T.baris) {
      const n = Number(b.label);
      cek(/^\d{3}$/.test(b.label) && n >= 100 && n <= 999, `tabel susun: label ${b.label} bilangan tiga angka`);
      const harap = [Math.floor(n / 100), Math.floor(n / 10) % 10, n % 10].map(String);
      sama(b.sel, harap, `tabel susun: ${b.label} diisi angka tiap tempat (bukan nilai)`);
      cek(b.sel.every((s) => s.length === 1), `tabel susun: sel ${b.label} berisi satu angka`);
      stat.khusus += 1;
    }
    const semuaAngka = T.baris.flatMap((b) => b.sel);
    cek(new Set(semuaAngka).size === semuaAngka.length, "tabel susun: semua angka sel berbeda supaya tab tidak ambigu");
    cek(new Set(T.baris.map((b) => b.label)).size === T.baris.length && T.baris.some((b) => b.label === "251") && T.baris.some((b) => b.label === "987"), "tabel susun: label berbeda dan memuat 251 dan 987 dari video");
    cek(T.baris.every((b) => b.sel.every((s) => s.length <= 8)), "tabel susun: sel pendek supaya margin teks >= 5 px di 405 px");
    const KATA_LARANG = /buku|halaman|kunci jawaban|kerja kelompok|\bkelompok|\bteman|kawan|kelas\b|kertas|pensil|\bbawa\b|menggambar|menulis di|depan kelas|luas|keliling|di rumah|\brumah\b|survei|karet gelang|uang tabungan|di sekitar|loker|ibu guru|bersusun|gunting|\bpaku\b|\bpak\b|\bayah\b|\bibu\b|lidi|kantong plastik|kantin|tabungan|menabung|koin|penjepit|sentimeter|centimeter|\bmeter\b|kaleng|kerikil|manik|toples|gelas|sahabat/i;
    cek(!KATA_LARANG.test(JSON.stringify({ p: A.petaSusun, t: A.tabelSusun })), "peta dan tabel susun: tanpa kata terlarang dan tanpa kelompok, teman, kelas, buku, kertas, pensil");
    cek(!/Place Value|Montessori Cards|Expanded Form|Dienes|Place-Value Chart|Number Names|Compare Placewise/i.test(JSON.stringify(A)), "peta dan tabel susun: tanpa nama metode berbahasa Inggris");
    cek(![...JSON.stringify({ p: A.petaSusun, t: A.tabelSusun })].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d), "peta dan tabel susun: tanpa emoji di atas Emoji 12 dan tanpa ZWJ");
  } else cek(false, "peta dan tabel susun: .tmp-k3b1s/B.json atau kelas3-bab1-ringkas.json subBab.B.petaSusun ada");
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k3b1B-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k3b1B-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k3b1B sendiri (${impor.join(", ")})`);
  }
  // Emoji dalam data teks gambar juga paling tinggi Emoji 12 (diperiksa pada gambar yang diputar).
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d), `${v.id}/${a.id}: emoji gambar paling tinggi Emoji 12`);
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k3b1b.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|naskah-k3b1|data-k3b1|kit-k3b1|video-k3b1-umum|naskah-k1b/.test(pembungkus) && /VIDEO_MATERI_K3B1B/.test(pembungkus) && /VIDEO_LUAR_K3B1B/.test(pembungkus) && /export function VideoK3B1B/.test(pembungkus) && /daftar-video-cerita/.test(pembungkus), "video-k3b1b.tsx: dua video dari mesin Story, tanpa naskah lama");
  cek(!/\r/.test(pembungkus), "video-k3b1b.tsx: akhir baris LF");
  const sendiri = readFileSync(new URL("uji-story-k3b1B.mjs", import.meta.url), "utf8");
  cek(!/\r/.test(sendiri), "uji-story-k3b1B.mjs: akhir baris LF");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit diputar)`);
}
console.log(`Pemeriksaan: ${stat.papan} papan, ${stat.blok} model blok, ${stat.nilai} nilai tempat, ${stat.persamaan} persamaan atau uraian, ${stat.suara} kalimat suara dicocokkan dengan gambar, ${stat.khusus} pemeriksaan khusus`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);

