// Uji Story Kelas 1 Bab 8 Sub-Bab B (Diagram Gambar): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Video diputar bergaya guru: suara, teks terlihat, sumber, judul adegan, dan subjudul tanpa penyebutan buku (kata terlarang diperiksa pada adegan yang diputar).
// Memeriksa: pemicu kata, suara tanpa digit, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas, teks bertumpuk, pemisahan materi dan metode luar (nama metode hanya Indonesia),
// hanya bilangan sampai dua puluh (tanpa kali, bagi, bersusun, pinjam, simpan), nama bilangan sepuluh sampai dua puluh yang diucapkan tampak sebagai angka,
// dan HITUNG ULANG DATA dari gambar: diagram gambar (satu gambar = satu data, tegak atau mendatar, gambar rapat dari garis dasar, angka sumbu, angka banyak, keterangan),
// turus (satu goresan = satu benda, goresan kelima miring), tabel menurun dan mendatar (banyak tiap baris, jumlah semua), data identik di semua kelompok yang terlihat,
// setiap kalimat suara ("jagung ada tiga", "paling banyak", "lebih banyak tiga dari", "sama banyak", "jumlah semuanya tiga belas") dan teks gambar (persamaan, selisih, jumlah) cocok dengan data tergambar,
// jawaban latihan benar menurut gambar, aturan pemilik (belajar mandiri digital: tanpa kelompok, teman, survei, depan kelas, buku, benda fisik, karet gelang, uang tabungan),
// emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k1b8B.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k1b8B-video.ts");
const U1 = await import("../src/components/modul/story/k1b8B-luar-1.ts");
const B = await import("../src/components/modul/story/k1b8B-bantu.ts");
const G = await import("../src/components/modul/story/k1b8B-gambar.ts");

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
const VIDEO = [V.VIDEO_MATERI_K1B8B, V.VIDEO_LUAR_K1B8B];
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
const M_VIDEO = V.VIDEO_MATERI_K1B8B;
const U = V.VIDEO_LUAR_K1B8B;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const NAMA_LUAR = /Banding Kategori|metode luar|metode dari luar/i;
const NAMA_INGGRIS = /Tally Marks|Pictograph|Compare Categories|Data collection|Data display|Data literacy/i;
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M_VIDEO);
  const luar = teksVideo(U);
  cek(!NAMA_LUAR.test(materi), "video materi tidak memuat nama metode luar Banding Kategori (Turus dan Diagram Gambar adalah istilah isi sub-bab)");
  for (const m of U1.NAMA_METODE_ID) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE_ID, ["Turus", "Diagram Gambar", "Banding Kategori"], "nama Indonesia metode luar");
  cek(!NAMA_INGGRIS.test(materi) && !NAMA_INGGRIS.test(luar), "nama metode hanya bahasa Indonesia (tanpa Tally Marks, Pictograph, Compare Categories)");
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
      cek(!/Uji Kompetensi|Pengayaan|Ayo Berlatih|Ayo Berdiskusi|Ayo Berefleksi|Ayo Mengingat|Ayo Berkomunikasi|Ayo Berpikir|Ayo Berkarya|Ayo Bermain|Ayo Mencoba|soal \d|Soal \d|Eksplorasi|Refleksi/.test(semua.join(" | ")), `${v.id}/${a.id}: latihan disajikan sebagai Latihan, tanpa istilah buku`);
      // Tokoh hanya enam tokoh tetap (Malosi, Kira, Upe, Wei, Halim, Igil): tanpa nama lain dari data sumber.
      cek(!/\b(Tika|Ibu|Ayah|Bapak|Budi|Ani|Doni|Sinta|Dewi|Rudi|Nina|Andi|Siti)\b/.test(semua.join(" | ")), `${v.id}/${a.id}: hanya enam tokoh tetap`);
    }
  }
  for (const v of [M_VIDEO, U]) cek(!/mewakili banyak data/i.test(teksVideo(v)), `${v.id}: tanpa kalimat janggal "mewakili banyak data" (satu gambar mewakili satu data)`);
  cek(M_VIDEO.subjudul === "Materi kurikulum" && U.subjudul === "Tiga metode luar", "subjudul video: Materi kurikulum dan Tiga metode luar");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 46), "video materi: label sumber berbentuk Materi: ... dan pendek");
  cek(U.adegan.every((a) => /Metode luar|Ringkasan/i.test(a.sumber) && a.sumber.length <= 46), "video metode luar: label sumber metode luar atau ringkasan, pendek");
  cek(M_VIDEO.id === "k1b8B-materi" && U.id === "k1b8B-luar", "id video k1b8B-materi dan k1b8B-luar");
  cek(U.judul.endsWith(": Metode dari Luar") && !/menurut/i.test(M_VIDEO.judul), "judul video: materi tanpa 'menurut', luar berakhir ': Metode dari Luar'");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,data-tercampur,satu-gambar,diagram-tegak,bagian-diagram,baca-tegak,diagram-mendatar,turus,tabel-menurun,tabel-mendatar,tabel-ke-diagram,paling-banyak,lebih-banyak,sama-banyak,jumlah-semua,pilihan-hewan,diagram-hewan,latihan-satu,latihan-dua,latihan-tiga,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-turus,luar-turus-terapan,luar-diagram,luar-diagram-terapan,luar-banding,luar-banding-terapan,luar-ringkas", "urutan adegan metode luar");
  cek(M_VIDEO.adegan[0].id === "sapaan" && U.adegan[0].id === "sapaan", "tiap video dibuka adegan sapaan");
  cek(M_VIDEO.adegan.filter((a) => /^latihan-/.test(a.id)).length === 3 && M_VIDEO.adegan[M_VIDEO.adegan.length - 1].id === "penutup", "video materi: Latihan 1 sampai 3 lalu penutup");
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-turus", "luar-turus-terapan", "luar-diagram", "luar-diagram-terapan", "luar-banding", "luar-banding-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(U.adegan[1].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  for (const kata of ["Latihan", "Igil", "Malosi", "Halim", "Kira", "Wei", "Upe", "diagram gambar", "diagram tegak", "diagram mendatar", "turus", "tabel", "tabel menurun", "tabel mendatar", "baris", "kolom", "judul", "nama kolom", "keterangan", "satu gambar mewakili satu data", "paling banyak", "paling sedikit", "lebih banyak", "lebih sedikit", "sama banyak", "selisih", "jumlah semuanya", "data", "angka", "goresan"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  // Hanya bilangan sampai dua puluh dan data di layar: tanpa kali, bagi, bilangan lebih dari dua puluh, bersusun, pinjam, simpan, satuan baku, atau rumus. Jumlah semua data dan selisih boleh (tanpa kalimat pengurangan bersusun).
  const BOCOR = /dikali|perkalian|pembagian|dibagi|\bratus\b|\bribu\b|dua puluh (satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan)|(tiga|empat|lima|enam|tujuh|delapan|sembilan) puluh|\bluas\b|keliling|rumus|volume|sentimeter|centimeter|\bcm\b|\bmeter\b|\bkm\b|penggaris|bersusun|meminjam|pinjam|menyimpan|simpan|dikurangi|ditambah|×|÷|−/i;
  for (const v of [M_VIDEO, U]) {
    for (const a of v.adegan) cek(!BOCOR.test(teksAdegan(a)), `${v.id}/${a.id}: hanya bilangan sampai dua puluh dan data di layar (tanpa kali, bagi, bersusun, pinjam, satuan baku, rumus, bilangan lebih dari dua puluh)`);
    for (const a of v.adegan) for (const i of a.ketukan.keys()) for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) for (const b of bilanganDari(t)) cek(Number(b) <= 20, `${v.id}/${a.id}#${i + 1}: angka di gambar paling besar dua puluh ("${t}")`);
  }
  cek(totalKetukan >= 70 && M_VIDEO.adegan.reduce((t, ad) => t + ad.ketukan.length, 0) >= 70, `total ketukan cukup dalam (${totalKetukan}; materi ${M_VIDEO.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)})`);
  // Durasi materi diputar 8 sampai 13 menit (dua kata per detik, sapaan termasuk).
  const kataMateri = kataVideo(M_VIDEO);
  cek(kataMateri / 120 >= 8 && kataMateri / 120 <= 13, `durasi materi diputar 8 sampai 13 menit (${(kataMateri / 120).toFixed(1)} menit)`);
  cek(kataVideo(U) / 120 >= 3, `durasi video luar paling sedikit 3 menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
}


/* ------------------------------ Nama bilangan 10 sampai 20 yang diucapkan tampak sebagai angka ------------------------------ */
const NAMA = B.NAMA_BILANGAN;
const tokoh = (s) => s.toLowerCase().split(/\s+/).filter(Boolean).map((w) => w.replace(/[^a-z]/g, ""));
/** Nama bilangan 1 sampai 20 yang dimulai pada token `p`: [nilai, panjang] atau null (nama dua kata didahulukan). */
const bacaAngka = (t, p) => {
  for (let n = 20; n >= 1; n -= 1) {
    const pc = NAMA[n].split(" ");
    if (pc.every((c, q) => t[p + q] === c)) return [n, pc.length];
  }
  return null;
};
/** Panjang deret bilangan berurutan terpanjang yang dimulai dari nilai `v0` dalam suara. */
const rantaiTerpanjang = (suara, v0) => {
  const t = tokoh(suara);
  let terbaik = 0;
  for (let p = 0; p < t.length; p += 1) {
    const r = bacaAngka(t, p);
    if (!r || r[0] !== v0) continue;
    let len = 1;
    let q = p + r[1];
    let v = v0;
    for (;;) {
      const s = bacaAngka(t, q);
      if (!s || s[0] !== v + 1) break;
      len += 1;
      v += 1;
      q += s[1];
    }
    terbaik = Math.max(terbaik, len);
  }
  return terbaik;
};
const NAMA_METODE_SUARA = /banding kategori/gi;
let jumlahNama = 0;
for (const v of VIDEO) {
  for (const a of v.adegan) {
    const terlihat = new Set();
    a.ketukan.forEach((kt, i) => {
      for (let p = 0; p < L.kataDari(kt.suara).length; p += 1) for (const o of L.keadaanStory(a, i, p)) if (o.t === "teks" && o.isi) for (const b of bilanganDari(o.isi)) terlihat.add(b);
      const t = tokoh(kt.suara.replace(NAMA_METODE_SUARA, " "));
      for (let p = 0; p < t.length; p += 1) {
        const r = bacaAngka(t, p);
        if (r && r[0] >= 10) {
          jumlahNama += 1;
          cek(terlihat.has(String(r[0])), `${v.id}/${a.id}#${i + 1}: "${NAMA[r[0]]}" tampak sebagai angka ${r[0]} di gambar`);
        }
      }
    });
  }
}
/* ------------------------------ Data dihitung ulang dari gambar ------------------------------ */
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
const di = (id, ke) => {
  const a = adegan(M_VIDEO, id) ?? adegan(U, id);
  return akhirAdegan(a, ke);
};
const stat = { diagram: 0, turus: 0, tabel: 0, suara: 0, persamaan: 0, khusus: 0 };
const NUMRE = NAMA.slice(1)
  .sort((m, n) => n.length - m.length)
  .join("|");
const nilaiNama = (s) => NAMA.indexOf(s);
const kataBersih = (t) => t.toLowerCase().replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
const nomorDari = (id, re) => {
  const m = re.exec(id);
  return m ? m.slice(1) : null;
};
const jmlSatuKarakter = (s) => [...(s ?? "")].length === 1;

/** Semua kelompok data yang tergambar pada keadaan `objs`: diagram gambar, turus, dan tabel; tiap kelompok = {tipe, p, kat: [{nama, n}], arah}. */
function kumpulData(objs, nm) {
  const hasil = [];
  const teksObj = (id) => objs.find((o) => o.id === id && o.t === "teks");
  // Diagram gambar: gambar `${p}g{c}_{i}`.
  const gambar = objs.filter((o) => o.t === "teks" && /^[a-z]+?g\d+_\d+$/.test(o.id));
  for (const p of new Set(gambar.map((o) => /^([a-z]+?)g\d+_\d+$/.exec(o.id)[1]))) {
    const milik = gambar.filter((o) => o.id.startsWith(p + "g") && nomorDari(o.id, new RegExp(`^${p}g(\\d+)_(\\d+)$`)));
    const kategori = [...new Set(milik.map((o) => Number(nomorDari(o.id, new RegExp(`^${p}g(\\d+)_(\\d+)$`))[0])))].sort((a, b) => a - b);
    const kat = [];
    let arah = null;
    const ST = G.ST;
    const dasarY = [];
    const dasarX = [];
    for (const c of kategori) {
      const pics = milik
        .filter((o) => Number(nomorDari(o.id, new RegExp(`^${p}g(\\d+)_(\\d+)$`))[0]) === c)
        .sort((a, b) => Number(/_(\d+)$/.exec(a.id)[1]) - Number(/_(\d+)$/.exec(b.id)[1]));
      const n = pics.length;
      cek(pics.every((o, i) => o.id === `${p}g${c}_${i}`), `${nm}: gambar ${p} kategori ${c} bernomor berurutan dari nol`);
      cek(pics.every((o) => o.isi === pics[0].isi && jmlSatuKarakter(o.isi)), `${nm}: gambar ${p} kategori ${c} satu jenis, satu gambar satu data`);
      if (n >= 2) {
        const tegak = pics.every((o) => o.x === pics[0].x);
        const datar = pics.every((o) => o.y === pics[0].y);
        cek(tegak !== datar, `${nm}: gambar ${p} kategori ${c} bersusun lurus (tegak atau mendatar)`);
        arah = arah ?? (tegak ? "tegak" : "datar");
        cek((tegak ? "tegak" : "datar") === arah, `${nm}: semua kolom ${p} searah`);
        if (tegak) cek(pics.every((o, i) => Math.abs(o.y - (pics[0].y - i * ST)) < 0.01), `${nm}: gambar ${p} kategori ${c} bersusun rapat ke atas, satu gambar tiap tingkat`);
        else cek(pics.every((o, i) => Math.abs(o.x - (pics[0].x + i * ST)) < 0.01), `${nm}: gambar ${p} kategori ${c} berjajar rapat ke samping`);
      }
      dasarY.push(pics[0].y);
      dasarX.push(pics[0].x);
      const label = teksObj(`${p}l${c}`);
      cek(!!label, `${nm}: nama kategori ${p}${c} ada`);
      const h = teksObj(`${p}h${c}`);
      if (h) cek(h.isi === String(n), `${nm}: angka banyak ${p}h${c} "${h.isi}" sama dengan ${n} gambar`);
      kat.push({ nama: (label?.isi ?? `?${c}`).toLowerCase(), n, c, pics });
    }
    arah = arah ?? "tegak";
    if (arah === "tegak") cek(new Set(dasarY).size === 1 && new Set(dasarX).size === dasarX.length, `${nm}: kolom ${p} berdiri pada garis dasar yang sama`);
    else cek(new Set(dasarX).size === 1 && new Set(dasarY).size === dasarY.length, `${nm}: baris ${p} mulai dari garis yang sama`);
    // Sumbu angka (bagian diagram: angka), judul dan keterangan (satu gambar = satu data).
    const sumbu = objs.filter((o) => o.t === "teks" && new RegExp(`^${p}y\\d+$`).test(o.id)).sort((a, b) => Number(a.id.slice(p.length + 1)) - Number(b.id.slice(p.length + 1)));
    const maks = Math.max(...kat.map((q) => q.n));
    cek(sumbu.length >= maks && sumbu.every((o, i) => o.isi === String(i + 1)) && maks <= 8, `${nm}: sumbu angka ${p} berurutan dari satu, sampai paling sedikit ${maks}`);
    for (const q of kat)
      for (const o of q.pics) {
        const i = Number(/_(\d+)$/.exec(o.id)[1]);
        const s = sumbu[i];
        if (s) cek(arah === "tegak" ? Math.abs(s.y - (o.y - 2)) < 0.01 : Math.abs(s.x - o.x) < 0.01, `${nm}: angka sumbu ${p}${i + 1} sejajar dengan gambar ke-${i + 1}`);
      }
    const ket = teksObj(`${p}k`);
    cek(!!ket && /^1 gambar = 1 [a-z]+$/.test(ket.isi ?? ""), `${nm}: keterangan "1 gambar = 1 ..." ada pada diagram ${p} (${ket?.isi})`);
    stat.diagram += 1;
    hasil.push({ tipe: "diagram", p, kat, arah });
  }
  // Turus: goresan `${p}s{c}_{i}`.
  const goresan = objs.filter((o) => o.t === "garis" && /^[a-z]+?s\d+_\d+$/.test(o.id));
  for (const p of new Set(goresan.map((o) => /^([a-z]+?)s\d+_\d+$/.exec(o.id)[1]))) {
    const re = new RegExp(`^${p}s(\\d+)_(\\d+)$`);
    const milik = goresan.filter((o) => re.test(o.id));
    const kategori = [...new Set(milik.map((o) => Number(re.exec(o.id)[1])))].sort((a, b) => a - b);
    const kat = [];
    for (const c of kategori) {
      const gs = milik.filter((o) => Number(re.exec(o.id)[1]) === c).sort((a, b) => Number(re.exec(a.id)[2]) - Number(re.exec(b.id)[2]));
      const n = gs.length;
      cek(gs.every((o, i) => o.id === `${p}s${c}_${i}`), `${nm}: goresan ${p} kategori ${c} bernomor berurutan dari nol`);
      const x0 = gs[0].x;
      gs.forEach((o, i) => {
        const g = Math.floor(i / 5);
        const j = i % 5;
        if (j === 4) {
          cek((o.x2 ?? 0) > 0 && (o.y2 ?? 0) < 0 && o.x <= x0 + g * 32 && o.x + o.x2 >= x0 + g * 32 + 18, `${nm}: goresan kelima ${o.id} miring menutup empat goresan tegak`);
        } else {
          cek((o.x2 ?? 0) === 0 && (o.y2 ?? 0) > 0 && Math.abs(o.x - (x0 + g * 32 + j * 6)) < 0.01, `${nm}: goresan ${o.id} tegak dan rapat dalam satu ikat`);
        }
        cek(Math.abs(o.y - (gs[0].y + (j === 4 ? 16 : 0))) < 0.01 || j === 4, `${nm}: goresan ${o.id} sebaris`);
      });
      cek(gs.length % 5 === 0 || gs.slice(Math.floor(n / 5) * 5).every((o) => (o.x2 ?? 0) === 0), `${nm}: goresan sisa (bukan lima penuh) semuanya tegak`);
      const label = objs.find((o) => o.id === `${p}l${c}` && o.t === "teks");
      cek(!!label, `${nm}: nama baris turus ${p}${c} ada`);
      const h = objs.find((o) => o.id === `${p}h${c}` && o.t === "teks");
      if (h) cek(h.isi === String(n), `${nm}: angka turus ${p}h${c} "${h.isi}" sama dengan ${n} goresan`);
      kat.push({ nama: (label?.isi ?? `?${c}`).toLowerCase(), n, c });
    }
    stat.turus += 1;
    hasil.push({ tipe: "turus", p, kat, arah: "-" });
  }
  // Tabel: nama `${p}r{i}`, banyak `${p}c{i}`, jumlah `${p}tot`.
  const nama = objs.filter((o) => o.t === "teks" && /^[a-z]+?r\d+$/.test(o.id) && !/^c\d/.test(o.id));
  for (const p of new Set(nama.map((o) => /^([a-z]+?)r\d+$/.exec(o.id)[1]))) {
    const re = new RegExp(`^${p}r(\\d+)$`);
    const baris = nama.filter((o) => re.test(o.id)).sort((a, b) => Number(re.exec(a.id)[1]) - Number(re.exec(b.id)[1]));
    const kat = [];
    for (const o of baris) {
      const i = Number(re.exec(o.id)[1]);
      const c = objs.find((q) => q.id === `${p}c${i}` && q.t === "teks");
      cek(!!c && /^\d+$/.test(c.isi ?? ""), `${nm}: tabel ${p} baris ${i} punya angka banyak`);
      kat.push({ nama: o.isi.toLowerCase(), n: Number(c?.isi), pos: o });
    }
    const arah = baris.length >= 2 && baris.every((o) => o.y === baris[0].y) ? "mendatar" : "menurun";
    if (baris.length >= 2) cek(arah === "mendatar" ? baris.every((o) => o.y === baris[0].y) && new Set(baris.map((o) => o.x)).size === baris.length : baris.every((o) => o.x === baris[0].x) && new Set(baris.map((o) => o.y)).size === baris.length, `${nm}: tabel ${p} ${arah} tertata lurus`);
    const tot = objs.find((o) => o.id === `${p}tot` && o.t === "teks");
    if (tot) cek(Number(tot.isi) === kat.reduce((t, q) => t + q.n, 0), `${nm}: jumlah tabel ${p} "${tot.isi}" sama dengan jumlah semua baris`);
    stat.tabel += 1;
    hasil.push({ tipe: "tabel", p, kat, arah });
  }
  // Konsistensi: kelompok data yang terlihat bersamaan memuat data yang sama; setiap bilangan paling banyak dua puluh.
  const peta = new Map();
  for (const g of hasil) {
    cek(g.kat.reduce((t, q) => t + q.n, 0) <= 20 && g.kat.every((q) => q.n >= 1 && q.n <= 20), `${nm}: ${g.tipe} ${g.p} banyak benda per kelompok dan jumlah semuanya paling banyak dua puluh`);
    for (const q of g.kat) {
      if (peta.has(q.nama)) cek(peta.get(q.nama) === q.n, `${nm}: data "${q.nama}" sama di semua kelompok yang terlihat (${peta.get(q.nama)} lawan ${q.n} pada ${g.tipe} ${g.p})`);
      else peta.set(q.nama, q.n);
    }
  }
  return hasil;
}

/** Persamaan "6 + 4 + 3 = 13" dan "selisih: 3", "jumlah: 13" pada teks gambar. */
function periksaTeksGambar(nm, objs, grup) {
  const jumlahGrup = grup.filter((g) => g.kat.length >= 2).map((g) => g.kat.reduce((t, q) => t + q.n, 0));
  for (const t of L.teksTerlihat(objs)) {
    let m = /^(\d+(?: \+ \d+)+) = (\d+)$/.exec(t);
    if (m) {
      const op = m[1].split(" + ").map(Number);
      stat.persamaan += 1;
      cek(op.reduce((a, b) => a + b, 0) === Number(m[2]) && Number(m[2]) <= 20, `${nm}: persamaan "${t}" benar`);
      if (op.length >= 3) cek(grup.some((g) => JSON.stringify(g.kat.map((q) => q.n).sort()) === JSON.stringify([...op].sort())), `${nm}: operand "${t}" sama dengan banyak tiap kategori pada data yang tergambar`);
      else {
        const sah = (o) => grup.some((g) => g.kat.some((q) => q.n === o) || g.kat.some((_, i) => g.kat.slice(0, i + 1).reduce((a, q) => a + q.n, 0) === o));
        cek(op.every(sah), `${nm}: operand "${t}" berasal dari banyak kategori atau jumlah bagiannya`);
      }
      continue;
    }
    m = /^jumlah: (\d+)$/.exec(t);
    if (m) {
      stat.persamaan += 1;
      cek(jumlahGrup.includes(Number(m[1])), `${nm}: "${t}" sama dengan jumlah semua data (${jumlahGrup.join(",")})`);
      continue;
    }
    m = /^selisih: (\d+)$/.exec(t);
    if (m) {
      stat.persamaan += 1;
      const beda = new Set();
      for (const g of grup) for (const a of g.kat) for (const b of g.kat) if (a !== b) beda.add(Math.abs(a.n - b.n));
      cek(beda.has(Number(m[1])), `${nm}: "${t}" sama dengan selisih dua kategori (${[...beda].join(",")})`);
    }
  }
}

/** Kalimat hitungan dan baca-data pada suara dihitung ulang terhadap data yang tergambar. */
function periksaSuara(nm, suara, grup) {
  const semuaLabel = [...new Set(grup.flatMap((g) => g.kat.map((q) => kataBersih(q.nama))))].filter((s) => /^[a-z ]+$/.test(s) && s.length >= 2);
  if (!semuaLabel.length) return;
  const LBL = semuaLabel.sort((a, b) => b.length - a.length).join("|");
  const dengan = (label) => grup.filter((g) => g.kat.some((q) => kataBersih(q.nama) === label));
  const banyak = (g, label) => g.kat.find((q) => kataBersih(q.nama) === label)?.n;
  // a) "jagung ada tiga" / "wortel empat": banyak yang diucapkan sama dengan banyak yang tergambar.
  for (const kal of suara.split(/[.?!]/).map(kataBersih).filter(Boolean)) {
    const re = new RegExp(`(?:^| )(${LBL}) (?:ada )?(${NUMRE})(?= |$)`, "g");
    for (const m of kal.matchAll(re)) {
      const v = nilaiNama(m[2]);
      const sisa = kal.slice(m.index + m[0].length);
      const lanjut = new RegExp(`^ (${NUMRE})(?= |$)`).exec(sisa);
      if (lanjut && nilaiNama(lanjut[1]) === v + 1) continue;
      stat.suara += 1;
      for (const g of dengan(m[1])) cek(banyak(g, m[1]) === v, `${nm} suara: "${m[0].trim()}" sama dengan ${banyak(g, m[1])} pada ${g.tipe} ${g.p}`);
    }
  }
  const segmen = suara.split(/[.!,]/).map(kataBersih).filter(Boolean);
  for (const kal of segmen) {
    // b) "paling banyak" dan "paling sedikit": benar-benar maksimum atau minimum, tanpa kembar.
    for (const m of kal.matchAll(new RegExp(`paling (banyak|sedikit)(?: [a-z]+)?(?: adalah| ialah| yaitu)? (${LBL})(?= |$)`, "g"))) cekEkstrem(nm, m[0], m[2], m[1], dengan, banyak, grup);
    for (const m of kal.matchAll(new RegExp(`(?:^| )(${LBL}) paling (banyak|sedikit)(?= |$)`, "g"))) cekEkstrem(nm, m[0].trim(), m[1], m[2], dengan, banyak, grup);
    // c) "bola lebih banyak tiga dari boneka" (selisih) atau tanpa bilangan (arah saja).
    for (const m of kal.matchAll(new RegExp(`(?:^| )(${LBL}) lebih (banyak|sedikit) (${NUMRE}) (?:gambar |anak |buah )?(?:dari|daripada) (${LBL})(?= |$)`, "g"))) {
      stat.suara += 1;
      const v = nilaiNama(m[3]);
      const g = dengan(m[1]).find((q) => banyak(q, m[4]) !== undefined);
      cek(!!g && (m[2] === "banyak" ? banyak(g, m[1]) - banyak(g, m[4]) : banyak(g, m[4]) - banyak(g, m[1])) === v, `${nm} suara: "${m[0].trim()}" cocok dengan data`);
    }
    for (const m of kal.matchAll(new RegExp(`(?:^| )(${LBL}) lebih (banyak|sedikit) (?:dari|daripada) (${LBL})(?= |$)`, "g"))) {
      stat.suara += 1;
      const g = dengan(m[1]).find((q) => banyak(q, m[3]) !== undefined);
      cek(!!g && (m[2] === "banyak" ? banyak(g, m[1]) > banyak(g, m[3]) : banyak(g, m[1]) < banyak(g, m[3])), `${nm} suara: "${m[0].trim()}" cocok dengan data`);
    }
    // d) "apel dan jeruk sama banyak".
    for (const m of kal.matchAll(new RegExp(`(?:^| )(${LBL}) dan (${LBL}) sama banyak`, "g"))) {
      stat.suara += 1;
      const g = dengan(m[1]).find((q) => banyak(q, m[2]) !== undefined);
      cek(!!g && banyak(g, m[1]) === banyak(g, m[2]), `${nm} suara: "${m[0].trim()}" benar-benar sama banyak`);
    }
    // e) "jumlah semuanya tiga belas".
    for (const m of kal.matchAll(new RegExp(`(?:jumlah semuanya|semuanya ada|semua ada)(?: adalah)? (${NUMRE})(?= |$)`, "g"))) {
      stat.suara += 1;
      const v = nilaiNama(m[1]);
      cek(grup.some((g) => g.kat.length >= 2 && g.kat.reduce((t, q) => t + q.n, 0) === v), `${nm} suara: "${m[0]}" sama dengan jumlah semua data (${grup.map((g) => g.kat.reduce((t, q) => t + q.n, 0)).join(",")})`);
    }
  }
}
function cekEkstrem(nm, kutip, label, jenis, dengan, banyak, grup) {
  stat.suara += 1;
  const daftar = dengan(label).filter((g) => g.kat.length >= 2);
  cek(daftar.length > 0, `${nm} suara: "${kutip}" menyebut kategori yang tergambar`);
  for (const g of daftar) {
    const n = banyak(g, label);
    const semua = g.kat.map((q) => q.n);
    const ekstrem = jenis === "banyak" ? Math.max(...semua) : Math.min(...semua);
    cek(n === ekstrem && semua.filter((x) => x === ekstrem).length === 1, `${nm} suara: "${kutip}" benar-benar paling ${jenis} tanpa kembar (${g.kat.map((q) => `${q.nama} ${q.n}`).join(", ")})`);
  }
}

for (const v of VIDEO) {
  for (const a of v.adegan) {
    a.ketukan.forEach((kt, i) => {
      const nm = `${v.id}/${a.id}#${i + 1}`;
      const objs = akhirAdegan(a, i);
      const grup = kumpulData(objs, nm);
      periksaTeksGambar(nm, objs, grup);
      periksaSuara(nm, kt.suara, grup);
    });
  }
}

/* ------------------------------ Pemeriksaan khusus tiap adegan (dihitung ulang dari gambar) ------------------------------ */
{
  const grupDi = (id, ke, p) => kumpulData(di(id, ke), `${id}#${ke + 1}`).find((g) => g.p === p);
  const peta = (g) => g.kat.map((q) => `${q.nama}:${q.n}`).join(",");
  const emoCount = (objs, re) => {
    const hit = new Map();
    for (const o of objs) if (re.test(o.id)) hit.set(o.isi, (hit.get(o.isi) ?? 0) + 1);
    return hit;
  };
  const SAYUR = "jagung:3,wortel:4,brokoli:3,kol:2";
  const MAINAN = "bola:6,mobil:4,boneka:3";
  const kunci = (m) => JSON.stringify([...m.entries()].sort());
  // Sayur tercampur: dua belas benda; setelah dikumpulkan, tiap baris sejenis dan banyaknya 3, 4, 3, 2.
  {
    const o = di("data-tercampur", 3);
    const sc = o.filter((q) => /^sc\d+$/.test(q.id));
    const baris = new Map();
    for (const q of sc) baris.set(q.y, [...(baris.get(q.y) ?? []), q]);
    sama([...baris.values()].map((b) => `${new Set(b.map((x) => x.isi)).size}:${b.length}`), ["1:3", "1:4", "1:3", "1:2"], "sayur tercampur: empat baris sejenis berisi 3, 4, 3, 2 benda");
    sama(sc.length, 12, "sayur tercampur: dua belas benda");
    cek([...baris.values()].every((b) => new Set(b.map((q) => q.x)).size === b.length), "sayur tercampur: benda dalam baris tidak bertumpuk");
    stat.khusus += 4;
  }
  // Satu gambar mewakili satu anak: baris gambar jagung dan baris anak sama banyak.
  {
    const o = di("satu-gambar", 2);
    sama([0, 1, 2].map((r) => [ketemu(o, `jg${r}`) ? 1 : 0, ketemu(o, `an${r}`) ? 1 : 0].join("-")), ["1-1", "1-1", "1-1"], "satu gambar: tiga pasang jagung dan anak (satu gambar satu anak)");
    const salah = di("satu-gambar", 3);
    cek(["ax", "ay"].every((id) => ketemu(salah, id)) && ketemu(salah, "jx") && ketemu(salah, "sl")?.isi === "❌", "satu gambar: contoh salah (satu gambar dua anak) bertanda silang");
    stat.khusus += 2;
  }
  // Diagram tegak dan mendatar sayur: data sama.
  {
    const tegak = grupDi("diagram-tegak", 4, "sa");
    const datar = grupDi("diagram-mendatar", 2, "sd");
    sama([peta(tegak), tegak.arah, peta(datar), datar.arah], [SAYUR, "tegak", SAYUR, "datar"], "diagram tegak dan mendatar sayur: data sama, arah beda");
    const bag = di("bagian-diagram", 5);
    cek(bag.some((o) => o.id === "sajd") && bag.some((o) => o.id === "sak" && o.sorot) && SAYUR.split(",").length === 4 && bag.filter((o) => /^sal\d$/.test(o.id)).length === 4, "bagian diagram: judul, nama kolom, gambar, angka, keterangan semuanya ada");
    const baca = di("baca-tegak", 1);
    sama([baca.filter((o) => /^sag1_\d+$/.test(o.id) && o.sorot).length, isiTeks(baca, "sah1")], [4, "4"], "baca diagram tegak: wortel empat gambar dihitung dan ditulis empat");
    stat.khusus += 4;
  }
  // Turus: jawaban di layar = banyak goresan; tabel menurun, tabel mendatar, dan diagram memuat data yang sama.
  {
    const j = emoCount(di("turus", 0), /^jb\d+$/);
    const t = grupDi("turus", 6, "tu");
    sama([kunci(j), peta(t)], [kunci(new Map([[G.MAINAN[0].emo, 6], [G.MAINAN[1].emo, 4], [G.MAINAN[2].emo, 3]])), MAINAN], "turus: jawaban di layar (enam, empat, tiga) sama dengan goresan");
    sama([[...j.values()].reduce((a, b) => a + b, 0), L.teksTerlihat(di("turus", 0)).includes("13 jawaban")], [13, true], "turus: tiga belas jawaban ditulis 13 jawaban");
    sama(isiTeks(di("turus", 6), "jm"), "6 + 4 + 3 = 13", "turus: persamaan jumlah semua");
    const menurun = grupDi("tabel-menurun", 4, "tm");
    const mendatar = grupDi("tabel-mendatar", 3, "tn");
    const diagram = grupDi("tabel-ke-diagram", 4, "mt");
    const paling = grupDi("paling-banyak", 0, "mt");
    sama([peta(menurun), menurun.arah, peta(mendatar), mendatar.arah, peta(diagram), peta(paling), diagram.arah], [MAINAN, "menurun", MAINAN, "mendatar", MAINAN, MAINAN, "tegak"], "tabel menurun, tabel mendatar, diagram tegak: data identik dengan turus");
    cek(!!ketemu(di("tabel-menurun", 4), "tmtot") && !!ketemu(di("tabel-mendatar", 3), "tntot"), "tabel: jumlah semua tertulis");
    stat.khusus += 6;
  }
  // Paling banyak, lebih banyak, selisih, sama banyak, jumlah semua.
  {
    sama([ketemu(di("paling-banyak", 1), "mtg0_0").sorot, ketemu(di("paling-banyak", 2), "mtg2_0").sorot, ketemu(di("paling-banyak", 2), "mtg0_0").sorot ?? false], [true, true, false], "paling banyak: bola disorot, lalu boneka disorot (bola tak lagi)");
    const l3 = di("lebih-banyak", 2);
    sama(l3.filter((o) => o.sorot).map((o) => o.id), ["mtg0_3", "mtg0_4", "mtg0_5"], "lebih banyak: tiga gambar bola yang tak berpasangan disorot");
    sama([isiTeks(di("lebih-banyak", 3), "sl-t0"), isiTeks(di("lebih-banyak", 4), "sm-t0")], ["selisih: 3", "selisih: 1"], "selisih bola-boneka tiga dan mobil-boneka satu");
    const s = grupDi("sama-banyak", 1, "bu");
    sama(peta(s), "apel:4,jeruk:4,pisang:2", "sama banyak: apel empat, jeruk empat, pisang dua");
    const j5 = di("jumlah-semua", 4);
    sama([j5.filter((o) => /^mtg\d_\d+$/.test(o.id)).length, j5.filter((o) => /^mtg\d_\d+$/.test(o.id) && o.sorot).length, isiTeks(j5, "cn")], [13, 13, "13"], "jumlah semua: tiga belas gambar dihitung satu per satu sampai 13");
    sama([isiTeks(di("jumlah-semua", 2), "j1"), isiTeks(di("jumlah-semua", 2), "j2")], ["6 + 4 = 10", "10 + 3 = 13"], "jumlah semua: gabungan bertahap sepuluh lalu tiga belas");
    stat.khusus += 6;
  }
  // Pilihan hewan di layar (pengganti survei): pilihan enam tokoh sama dengan goresan.
  {
    const o = di("pilihan-hewan", 2);
    const pilih = new Map();
    for (let i = 0; i < 6; i += 1) pilih.set(ketemu(o, `pe${i}`).isi, (pilih.get(ketemu(o, `pe${i}`).isi) ?? 0) + 1);
    const t = grupDi("pilihan-hewan", 3, "hw");
    sama([kunci(pilih), peta(t)], [kunci(new Map([[G.HEWAN[0].emo, 3], [G.HEWAN[1].emo, 2], [G.HEWAN[2].emo, 1]])), "kucing:3,kelinci:2,ikan:1"], "pilihan hewan: tiga kucing, dua kelinci, satu ikan sama dengan goresan");
    sama(["Malosi", "Kira", "Upe", "Wei", "Halim", "Igil"].map((n, i) => isiTeks(o, `pn${i}`) === n), [true, true, true, true, true, true], "pilihan hewan: enam tokoh tetap");
    const dh = grupDi("diagram-hewan", 4, "hx");
    sama([peta(dh), dh.arah], ["kucing:3,kelinci:2,ikan:1", "datar"], "diagram hewan: sama dengan turus");
    stat.khusus += 3;
  }
  // Latihan: jawaban yang disorot benar menurut gambar.
  {
    const sorotPilihan = (objs) => {
      const i = [1, 2, 3].find((q) => ketemu(objs, `c${q}-k`)?.sorot);
      return i ? isiTeks(objs, `c${i}-t`) : null;
    };
    const l1 = di("latihan-satu", 2);
    const g1 = grupDi("latihan-satu", 2, "lk");
    sama([sorotPilihan(l1), String(g1.kat.find((q) => q.nama === "donat").n), g1.arah], ["4", "4", "tegak"], "latihan 1: jawaban empat donat sama dengan gambar");
    const l2 = di("latihan-dua", 2);
    const g2 = grupDi("latihan-dua", 2, "lb");
    const min2 = g2.kat.reduce((a, b) => (a.n <= b.n ? a : b));
    sama([sorotPilihan(l2), min2.nama, g2.arah], ["ayam", "ayam", "datar"], "latihan 2: ayam paling sedikit sama dengan gambar");
    const l3 = di("latihan-tiga", 2);
    const g3 = grupDi("latihan-tiga", 2, "lt");
    sama([sorotPilihan(l3), String(g3.kat.reduce((t, q) => t + q.n, 0)), g3.arah, isiTeks(di("latihan-tiga", 3), "lttot")], ["12", "12", "menurun", "12"], "latihan 3: jumlah semuanya dua belas sama dengan tabel");
    sama(["c1-t", "c2-t", "c3-t"].map((q) => isiTeks(l3, q)), ["11", "12", "13"], "latihan 3: pilihan sebelas, dua belas, tiga belas");
    stat.khusus += 4;
  }
  // Metode luar.
  {
    const j = emoCount(di("luar-turus", 0), /^bz\d+$/);
    const t = grupDi("luar-turus", 5, "tw");
    sama([kunci(j), peta(t), L.teksTerlihat(di("luar-turus", 0)).includes("15 bola")], [kunci(new Map([[U1.WARNA[0].emo, 7], [U1.WARNA[1].emo, 5], [U1.WARNA[2].emo, 3]])), "merah:7,biru:5,hijau:3", true], "luar turus: lima belas bola di layar sama dengan goresan 7, 5, 3");
    const ta = di("luar-turus-terapan", 3);
    const gx = grupDi("luar-turus-terapan", 3, "tx");
    const pil = [1, 2, 3].find((q) => ketemu(ta, `c${q}-k`)?.sorot);
    sama([isiTeks(ta, `c${pil}-t`), String(gx.kat[0].n), isiTeks(ta, "txh0")], ["8", "8", "8"], "luar turus terapan: delapan goresan, jawaban delapan");
    const d = grupDi("luar-diagram", 2, "dw");
    sama([peta(d), d.arah], ["merah:7,biru:5,hijau:3", "datar"], "luar diagram: sama dengan turus (7, 5, 3)");
    const dt = di("luar-diagram-terapan", 2);
    const du = grupDi("luar-diagram-terapan", 2, "du");
    sama([isiTeks(dt, "c1-t"), ketemu(dt, "c1-k").sorot, du.kat.reduce((a, b) => (a.n >= b.n ? a : b)).nama, du.arah], ["burung", true, "burung", "tegak"], "luar diagram terapan: burung paling banyak");
    const bk = grupDi("luar-banding", 0, "bk");
    sama(peta(bk), "merah:7,biru:5,hijau:3", "luar banding: sama dengan turus");
    sama([di("luar-banding", 2).filter((o) => o.sorot).map((o) => o.id), di("luar-banding", 3).filter((o) => o.sorot).map((o) => o.id)], [["bkg0_5", "bkg0_6", "bkg1_3", "bkg1_4"], ["bkg0_3", "bkg0_4", "bkg0_5", "bkg0_6"]], "luar banding: lebihnya dua, dua, dan empat gambar disorot");
    const bt = di("luar-banding-terapan", 2);
    const gt = grupDi("luar-banding-terapan", 2, "bt");
    sama([isiTeks(bt, "c1-t"), ketemu(bt, "c1-k").sorot, peta(gt)], ["sapi dan kuda", true, "sapi:4,kuda:4,domba:2"], "luar banding terapan: sapi dan kuda sama banyak");
    stat.khusus += 7;
  }
}


/* ------------------------------ Aturan pemilik: belajar mandiri, digital, tanpa benda fisik ------------------------------ */
{
  const MANDIRI = /kelompok|\bteman\w*|\bkawan\w*|sekawan|depan kelas|bersama kelas|seluruh kelas|\bkelas\b|berpasangan dengan (teman|kawan)|bekerja berpasangan|secara berpasangan|bermain bersama|bertanya kepada|buat ceritamu|buku|menulis di|menuliskan di|tulis di|tuliskan di|menggambar|gambarlah|gambar sendiri|\bbawa(lah)?\b|membawa|dibawa|\bkertas\b|\bpensil\b|\bpulpen\b|\bspidol\b|ambil (benda|pensil|kelereng|bola|sedotan|balon|klip|stik)|tangan (kiri|kanan)|\bjari\b|menyuruh|suruh|\braba\w*|\bmeraba|\btubuh|\blengan|lingkari|coret|survei|tanya teman|menabung|di kelas|guru kelas|di rumah|orang tua|\bayah\b|\bibu guru|bapak guru/i;
  // Benda fisik dari data sumber diganti aksi layar: tanpa jengkal, telapak kaki, depa, penggaris, koin, penjepit kertas, atau benda di sekitar.
  const FISIK = /jengkal|telapak|\bdepa\b|penggaris|\bkoin\b|penjepit|di sekitar|sekitarmu|di sekitar kita|kakimu|tanganmu|badanmu|tinggi badan|mengukur sendiri|ukur sendiri|\bmeja belajar|karet gelang|uang tabungan|tabungan|centimeter|sentimeter|\bmeter\b/i;
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      const semua = [a.judul, a.sumber];
      a.ketukan.forEach((kt, i) => {
        semua.push(kt.suara);
        semua.push(...L.teksTerlihat(L.keadaanStory(a, i, 9999)));
      });
      const kena = semua.filter((t) => MANDIRI.test(t) || FISIK.test(t));
      cek(kena.length === 0, `${v.id}/${a.id}: narasi mandiri dan digital, tanpa kelompok, teman, kelas, buku, kertas, pensil, benda fisik, atau satuan baku (${kena.slice(0, 2).join(" | ")})`);
    }
  }
}

/* ------------------------------ Sapaan dan peta susun ------------------------------ */
{
  const sap = adegan(M_VIDEO, "sapaan");
  const DAFTAR = ["Membaca diagram gambar", "Membuat tabel dan diagram", "Membandingkan data diagram"];
  cek(/Halo anak-anak/.test(sap.ketukan[0].suara) && /Membaca diagram gambar/i.test(L.teksTerlihat(akhirAdegan(sap, 1)).join(" | ")), "sapaan materi: tiga hal yang dipelajari tampil");
  sama(L.teksTerlihat(akhirAdegan(sap, 1)).filter((t) => DAFTAR.includes(t)), DAFTAR, "sapaan materi: daftar tiga hal");
  cek(!/\d/.test(sap.ketukan[1].suara) && !/\d/.test(DAFTAR.join(" ")), "sapaan materi: tanpa angka");
  const sapLuar = adegan(U, "sapaan");
  cek(/cara lain/i.test(L.teksTerlihat(akhirAdegan(sapLuar, 1)).join(" | ")) && /metode-luar|Metode luar/.test(sapLuar.sumber), "sapaan metode luar: pengumuman cara lain");
  const sumberRingkas = JSON.parse(readFileSync(new URL("../src/data/kelas1-bab8-ringkas.json", import.meta.url), "utf8")).subBab?.B;
  const sementara = new URL("../.tmp-k1b8s/B.json", import.meta.url);
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
    cek(T.baris.every((b) => b.sel.every((s) => s.length <= 26 && (s.match(/\d+/g) ?? []).length <= 1)), "tabel susun: sel <= 26 huruf dan paling banyak satu angka per sel");
    cek(T.baris.every((b) => b.label.split(/\s+/).every((w) => w.length <= 8)), "tabel susun: kata terpanjang kolom label <= 8 huruf");
    cek(!/\d/.test(T.suara) && !/\d/.test(T.petunjuk), "tabel susun: suara dan petunjuk tanpa digit");
    // Isi tabel dihitung ulang: tiap baris satu buah; turus (empat goresan tegak dan satu miring), gambar, dan angka menyatakan banyak yang sama; jumlah semua paling banyak dua puluh.
    sama(T.kolom, ["Turus", "Gambar", "Angka"], "tabel susun: kolom turus, gambar, angka");
    cek(T.baris.every((b) => {
      const [tr, gb, an] = b.sel;
      const nTurus = (tr.match(/\|/g) ?? []).length + (tr.includes("/") ? 1 : 0);
      const mg = /^(\d+) gambar$/.exec(gb);
      return /^[|/]+$/.test(tr) && !!mg && /^\d+$/.test(an) && nTurus === Number(an) && Number(mg[1]) === Number(an) && Number(an) >= 1;
    }), "tabel susun: turus, gambar, dan angka tiap baris menyatakan banyak yang sama");
    cek(T.baris.every((b) => (b.sel[0].match(/\|/g) ?? []).length === Math.min(4, Number(b.sel[2])) && (Number(b.sel[2]) >= 5) === b.sel[0].includes("/")), "tabel susun: turus lima berbentuk empat goresan tegak dan satu miring");
    cek(T.baris.reduce((t, b) => t + Number(b.sel[2]), 0) <= 20 && new Set(T.baris.map((b) => b.sel[2])).size === T.baris.length, "tabel susun: jumlah semua paling banyak dua puluh dan banyak tiap baris berbeda");
    // Margin teks sel di lebar 405 px: sel pendek (paling banyak delapan huruf) supaya margin teks >= 5 px.
    cek(T.baris.every((b) => b.sel.every((s) => s.length <= 8)), "tabel susun: sel pendek supaya margin teks >= 5 px di 405 px");
    const KATA_LARANG = /buku|halaman|kunci|kelompok|\bteman|kawan|kelas\b|kertas|pensil|\bbawa\b|menggambar|menulis di|depan kelas|luas|keliling|di rumah|survei|karet gelang|tabungan|menabung|koin|penjepit|sentimeter|centimeter|\bmeter\b/i;
    cek(!KATA_LARANG.test(JSON.stringify({ p: A.petaSusun, t: A.tabelSusun })), "peta dan tabel susun: tanpa kata terlarang dan tanpa kelompok, teman, survei, kelas, buku, kertas, pensil, benda fisik");
    cek(peta.every((s) => ![...s.teks, ...(s.ikon ?? "")].some((c) => c.codePointAt(0) > 0x1fa95)), "peta susun: emoji paling tinggi Emoji 12");
  } else cek(false, "peta dan tabel susun: .tmp-k1b8s/B.json atau kelas1-bab8-ringkas.json subBab.B.petaSusun ada");
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k1b8B-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k1b8B-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k1b8B sendiri (${impor.join(", ")})`);
  }
  // Emoji dalam data teks gambar juga paling tinggi Emoji 12 (diperiksa pada gambar yang diputar).
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d), `${v.id}/${a.id}: emoji gambar paling tinggi Emoji 12`);
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k1b8b.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|naskah-k1b/.test(pembungkus) && /VIDEO_MATERI_K1B8B/.test(pembungkus) && /VIDEO_LUAR_K1B8B/.test(pembungkus) && /export function VideoK1B8B/.test(pembungkus) && /daftar-video-cerita/.test(pembungkus), "video-k1b8b.tsx: dua video dari mesin Story, tanpa naskah lama");
  cek(!/\r/.test(pembungkus), "video-k1b8b.tsx: akhir baris LF");
  const sendiri = readFileSync(new URL("uji-story-k1b8B.mjs", import.meta.url), "utf8");
  cek(!/\r/.test(sendiri), "uji-story-k1b8B.mjs: akhir baris LF");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit diputar)`);
}
console.log(`Pemeriksaan: ${stat.diagram} diagram, ${stat.turus} turus, ${stat.tabel} tabel dihitung ulang, ${stat.suara} kalimat suara dicocokkan dengan data, ${stat.persamaan} persamaan atau selisih di gambar, ${stat.khusus} pemeriksaan khusus, ${jumlahNama} nama bilangan tampak sebagai angka`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
