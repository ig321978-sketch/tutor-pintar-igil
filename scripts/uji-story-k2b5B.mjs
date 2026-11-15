// Uji Story Kelas 2 Bab 5 Sub-Bab B (Setengah dari Kumpulan Benda): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Video diputar bergaya guru: suara, teks terlihat, sumber, judul adegan, dan subjudul tanpa penyebutan buku (kata terlarang diperiksa pada adegan yang diputar).
// Memeriksa: pemicu kata, suara tanpa digit, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas, teks bertumpuk, pemisahan materi dan metode luar (nama metode hanya Indonesia),
// nama bilangan sepuluh sampai dua puluh yang diucapkan tampak sebagai angka, dan data di layar dihitung ulang dari STRUKTUR gambar (bukan kata kunci):
// tiap benda (kelereng, bintang, ikan, bola, kartu) digambar sesuai simbolnya dan berada di kotak tempatnya (meja, kiri, kanan) pada kolom dan baris yang benar; angka di tiap tempat sama dengan banyak benda;
// tanda sama banyak atau bukan dihitung dari kiri, kanan, dan meja; jumlah seluruh benda tetap selama dibagi; angka dan jenis benda yang disebut suara sama dengan gambar di akhir anak kalimat;
// "setengah dari X adalah Y" dicocokkan dengan benda di gambar (dua bagian sama banyak, pasangan, atau baris pola); tidak sama banyak, bukan setengah, bisa atau tidak bisa dibagi dua sama banyak,
// genap dan ganjil, tersisa, pasang, nama pemilik, kiri dan kanan bergantian, serta penjumlahan dihitung ulang; kartu pilihan tepat satu yang cocok dan yang disorot sama dengan hasil hitung;
// pola setengah (4, 6, 8, 10 menjadi 2, 3, 4, 5, selisih dua dan satu), kartu bilangan genap dan ganjil, dan tabel bagian, sisa, jenis dihitung ulang dari bilangannya;
// jumlah benda per adegan paling banyak sepuluh; aturan pemilik (belajar mandiri digital: tanpa kerja kelompok, survei teman, depan kelas, buku, menulis atau menggambar di buku, membawa benda nyata);
// peta dan tabel susun (tabel dihitung ulang dari gambar); emoji paling tinggi Emoji 12; dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k2b5B.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k2b5B-video.ts");
const U1 = await import("../src/components/modul/story/k2b5B-luar-1.ts");
const B = await import("../src/components/modul/story/k2b5B-bantu.ts");

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
const VIDEO = [V.VIDEO_MATERI_K2B5B, V.VIDEO_LUAR_K2B5B];
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
const M_VIDEO = V.VIDEO_MATERI_K2B5B;
const U = V.VIDEO_LUAR_K2B5B;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const NAMA_LUAR = /Setengah Kumpulan|Bagi Rata Kumpulan|Cek Genap|metode luar|metode dari luar/i;
const NAMA_INGGRIS = /Half of Set|Fair Share Set|Even Check|Set fractions|Division link|Number sense|Halving Whole|Equal Parts|Fold Test|Quartering|Half of Half|Fold Twice/i;
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M_VIDEO);
  const luar = teksVideo(U);
  cek(!NAMA_LUAR.test(materi), "video materi tidak memuat nama metode luar (Setengah Kumpulan, Bagi Rata Kumpulan, Cek Genap)");
  for (const m of U1.NAMA_METODE_ID) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE_ID, ["Setengah Kumpulan", "Bagi Rata Kumpulan", "Cek Genap"], "nama Indonesia metode luar");
  cek(!NAMA_INGGRIS.test(materi) && !NAMA_INGGRIS.test(luar), "nama metode hanya bahasa Indonesia (tanpa Half of Set, Fair Share Set, Even Check)");
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
      cek(!/Uji Kompetensi|Pengayaan|Ayo Berlatih|Ayo Berdiskusi|Ayo Berefleksi|Ayo Mengingat|Ayo Berkomunikasi|Ayo Berpikir|Ayo Berkarya|Ayo Bermain|soal \d|Soal \d|Eksplorasi|Refleksi/.test(semua.join(" | ")), `${v.id}/${a.id}: latihan disajikan sebagai Latihan, tanpa istilah buku`);
      // Tokoh hanya enam tokoh tetap (Malosi, Kira, Upe, Wei, Halim, Igil): tanpa nama lain dari data sumber.
      cek(!/\b(Tika|Lili|Paman|Ibu|Ayah|Bapak|Budi|Ani|Doni|Sinta|Dewi|Rudi|Nina|Andi|Siti|Zoltan|Maria|Montessori)\b/.test(semua.join(" | ")), `${v.id}/${a.id}: hanya enam tokoh tetap`);
    }
  }
  cek(M_VIDEO.subjudul === "Materi kurikulum" && U.subjudul === "Tiga metode luar", "subjudul video: Materi kurikulum dan Tiga metode luar");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 46), "video materi: label sumber berbentuk Materi: ... dan pendek");
  cek(U.adegan.every((a) => /Metode luar|Ringkasan/i.test(a.sumber) && a.sumber.length <= 46), "video metode luar: label sumber metode luar atau ringkasan, pendek");
  cek(M_VIDEO.id === "k2b5B-materi" && U.id === "k2b5B-luar", "id video k2b5B-materi dan k2b5B-luar");
  cek(U.judul.endsWith(": Metode dari Luar") && !/menurut/i.test(M_VIDEO.judul), "judul video: materi tanpa 'menurut', luar berakhir ': Metode dari Luar'");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,kumpulan,bagi-empat,ikan-enam,bukan-setengah,bintang-delapan,kartu-sepuluh,pola-setengah,ganjil-lima,ganjil-tujuh,genap-ganjil,tabel,pasangan-delapan,pasangan-tujuh,periksa-gabung,setengah-utuh,latihan-satu,latihan-dua,latihan-tiga,latihan-empat,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-setengah,luar-setengah-terapan,luar-bagirata,luar-bagirata-terapan,luar-cek,luar-cek-terapan,luar-ringkas", "urutan adegan metode luar");
  cek(M_VIDEO.adegan[0].id === "sapaan" && U.adegan[0].id === "sapaan", "tiap video dibuka adegan sapaan");
  cek(M_VIDEO.adegan.filter((a) => /^latihan-/.test(a.id)).length === 4 && M_VIDEO.adegan[M_VIDEO.adegan.length - 1].id === "penutup", "video materi: Latihan 1 sampai 4 lalu penutup");
  cek(U.adegan[1].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  for (const kata of ["Latihan", "Igil", "Malosi", "Halim", "Kira", "Wei", "Upe", "setengah", "kumpulan benda", "sama banyak", "dua bagian", "genap", "ganjil", "tersisa", "kelereng", "ikan", "bintang", "bola", "kartu", "tabel", "bukan setengah", "pola", "pasang", "gabung", "bilangan"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  // Materi penjumlahan dan pengurangan: kalimat hitung boleh; tanpa kali, bagi, bersusun, satuan baku, rumus, dan bilangan di atas dua puluh.
  const BOCOR = /dikali|perkalian|\bkali\b|\bratus\b|\bribu\b|\bluas\b|keliling|rumus|volume|sentimeter|centimeter|\bcm\b|\bmeter\b|penggaris|bersusun|×|÷/i;
  for (const v of [M_VIDEO, U]) {
    for (const a of v.adegan) cek(!BOCOR.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa kali, bersusun, satuan baku, atau rumus`);
    for (const a of v.adegan) for (const i of a.ketukan.keys()) for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) for (const b of bilanganDari(t)) cek(Number(b) <= 20, `${v.id}/${a.id}#${i + 1}: angka di gambar paling besar dua puluh ("${t}")`);
    for (const a of v.adegan) for (const kt of a.ketukan) cek(!/\b(dua puluh (satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan)|tiga puluh|empat puluh|lima puluh|seratus)\b/i.test(kt.suara), `${v.id}/${a.id}: suara hanya bilangan sampai dua puluh`);
  }
  cek(totalKetukan >= 70 && M_VIDEO.adegan.reduce((t, ad) => t + ad.ketukan.length, 0) >= 70, `total ketukan cukup dalam (${totalKetukan}; materi ${M_VIDEO.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)})`);
  // Durasi materi diputar 8 sampai 13 menit (dua kata per detik, sapaan termasuk).
  const kataMateri = kataVideo(M_VIDEO);
  cek(kataMateri / 120 >= 8 && kataMateri / 120 <= 13, `durasi materi diputar 8 sampai 13 menit (${(kataMateri / 120).toFixed(1)} menit)`);
  cek(kataVideo(U) / 120 >= 3, `durasi video luar paling sedikit 3 menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
}

/* ------------------------------ Nama bilangan 10 sampai 20 yang diucapkan tampak sebagai angka ------------------------------ */
const NAMA = B.NAMA_BILANGAN;
const tokoh = (s) => {
  const w = s.toLowerCase().split(/\s+/).filter(Boolean);
  const out = w.map((x) => x.replace(/[^a-z]/g, ""));
  out.batas = new Set(w.map((x, i) => (/[,.;:!?]$/.test(x) ? i : -1)).filter((i) => i >= 0));
  return out;
};
/** Nama bilangan 0 sampai 20 yang dimulai pada token `p`: [nilai, panjang] atau null (nama dua kata didahulukan). */
const bacaAngka = (t, p) => {
  for (let n = 20; n >= 0; n -= 1) {
    const pc = NAMA[n].split(" ");
    if (pc.every((c, q) => t[p + q] === c && (q === pc.length - 1 || !t.batas.has(p + q)))) return [n, pc.length];
  }
  return null;
};
const NAMA_METODE_SUARA = /setengah kumpulan|bagi rata kumpulan|cek genap/gi;
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


/* ------------------------------ Kumpulan benda dihitung ulang dari struktur gambar ------------------------------ */
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
const adeganId = (id) => adegan(M_VIDEO, id) ?? adegan(U, id);
const NUMV = { nol: 0, satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8, sembilan: 9, sepuluh: 10 };
const NOUN = ["kelereng", "bintang", "ikan", "bola", "kartu"];
const RE_BENDA = /^(mj|pa|pb)_(\d+)_(kelereng|bintang|ikan|bola|kartu)$/;
const stat = { gambar: 0, tempatBenda: 0, jml: 0, tanda: 0, bendaSuara: 0, setengahSuara: 0, samaBanyak: 0, genapGanjil: 0, jumlahSisa: 0, jumlahPasang: 0, nama: 0, giliran: 0, jumlahTambah: 0, kartuPilihan: 0, pola: 0, tabelBaris: 0, kartuBil: 0, pasangan: 0, kartuHasil: 0, tabelSuara: 0 };
const pusatObj = (o) => {
  if (o.t === "kotak") return [(o.x ?? 0) + (o.w ?? 0) / 2, (o.y ?? 0) + (o.h ?? 0) / 2];
  return [o.x ?? 0, o.y ?? 0];
};
/** Titik tengah benda sesuai simbolnya (teks bintang dan ikan: alas tulisan digeser dari tengah). */
const tengahBenda = (o, s) => {
  const [x, y] = pusatObj(o);
  if (s === "bintang") return [x, y - 18 * 0.42];
  if (s === "ikan") return [x, y - 18 * 0.4];
  return [x, y];
};
const gambarSesuai = (o, s) => {
  if (s === "kelereng") return o.t === "bulat" && o.warna === "#3B82F6" && o.r === 9;
  if (s === "bola") return o.t === "bulat" && o.warna === "#F97316" && o.r === 9;
  if (s === "bintang") return o.t === "teks" && o.isi === "★";
  if (s === "ikan") return o.t === "teks" && o.isi === "\u{1F41F}";
  if (s === "kartu") return o.t === "kotak" && o.w === 14 && o.h === 20;
  return false;
};
const dalamKotak = (k, [x, y]) => x >= k.x && x <= k.x + k.w && y >= k.y && y <= k.y + k.h;
/** Ringkasan benda pada satu keadaan gambar: banyak tiap tempat, jenis benda, pasangan di meja, benda meja tanpa pasangan. */
const ringkas = (objs) => {
  const c = { mj: 0, pa: 0, pb: 0 };
  const arr = { mj: [], pa: [], pb: [] };
  const simbol = new Set();
  for (const o of objs) {
    const m = RE_BENDA.exec(o.id);
    if (!m) continue;
    c[m[1]] += 1;
    simbol.add(m[3]);
    arr[m[1]].push({ n: Number(m[2]), s: m[3], o });
  }
  const pairs = objs.filter((o) => /^ps\d+$/.test(o.id));
  const dipasang = arr.mj.filter((e) => pairs.some((pr) => dalamKotak(pr, tengahBenda(e.o, e.s)))).length;
  return { c, arr, simbol: [...simbol], total: c.mj + c.pa + c.pb, pairs, unpaired: c.mj - dipasang };
};
const hitungSet = (R) => new Set([R.total, R.c.mj, R.c.pa, R.c.pb, ...(R.pairs.length ? [R.pairs.length, 2, R.unpaired] : [])]);
const catatTabel = {};
const SIFAT = (n) => (n % 2 === 0 ? "Genap" : "Ganjil");
const TANPA_KONSERVASI = new Set(["setengah-utuh", "latihan-empat"]);
const JAWABAN = {
  "latihan-satu": (R) => String(R.total / 2),
  "luar-setengah-terapan": (R) => String(R.total / 2),
  "latihan-dua": (R) => (R.c.pa === R.c.pb ? "setengah" : "bukan setengah"),
  "latihan-tiga": (R) => (R.total % 2 === 0 ? "bisa dibagi dua" : "tersisa satu"),
  "latihan-empat": (R) => String(2 * R.c.pa),
  "luar-bagirata-terapan": (R) => (R.c.pa === R.c.pb ? "bagi rata" : "belum rata"),
  "luar-cek-terapan": (R) => (R.total % 2 === 0 ? "genap" : "ganjil"),
};
const akhirSegmen = (tok, p) => {
  for (let q = p; q < tok.length; q += 1) if (/[,.;:!?]$/.test(tok[q])) return q;
  return tok.length - 1;
};
const barisSebelumnya = (a, i) => (i === 0 ? ringkas([]) : ringkas(L.keadaanStory(a, i - 1, 9999)));

for (const v of VIDEO) {
  for (const a of v.adegan) {
    a.ketukan.forEach((kt, i) => {
      const nama = `${v.id}/${a.id}#${i + 1}`;
      const o = akhirAdegan(a, i);
      const R = ringkas(o);
      const R0 = barisSebelumnya(a, i);
      const tok = kt.suara.split(/\s+/).filter(Boolean);
      const t = tok.map((w) => w.toLowerCase().replace(/[^a-z]/g, ""));
      const kalimat = kt.suara.split(/(?<=[.!?])\s+/).map((s) => s.trim()).filter(Boolean);
      const stateKe = (p) => ringkas(L.keadaanStory(a, i, p));

      /* ---- gambar benda: simbol, tempat, posisi, angka, tanda ---- */
      cek(R.total <= 10, `${nama}: paling banyak sepuluh benda (${R.total})`);
      for (const g of ["mj", "pa", "pb"]) {
        const W = ketemu(o, `${g}-w`);
        const daftar = R.arr[g].sort((x, y) => x.n - y.n);
        if (daftar.length) cek(!!W, `${nama}: tempat ${g} punya kotak`);
        cek(new Set(daftar.map((e) => e.n)).size === daftar.length, `${nama}: nomor benda ${g} unik`);
        for (const e of daftar) {
          stat.gambar += 1;
          cek(gambarSesuai(e.o, e.s), `${nama}: gambar ${e.o.id} sesuai simbol ${e.s}`);
          if (!W) continue;
          const [cx, cy] = tengahBenda(e.o, e.s);
          stat.tempatBenda += 1;
          cek(dalamKotak(W, [cx, cy]), `${nama}: ${e.o.id} berada di dalam kotak ${g}`);
          if (g !== "mj") cek(Math.abs(cx - (W.x + 25 + (e.n % 3) * 40)) < 0.4 && Math.abs(cy - (W.y + 22 + Math.floor(e.n / 3) * 30)) < 0.4, `${nama}: ${e.o.id} pada kolom dan baris yang benar di ${g}`);
        }
        if (g === "mj" && daftar.length) {
          const p0 = tengahBenda(daftar[0].o, daftar[0].s);
          for (const e of daftar) {
            const [cx, cy] = tengahBenda(e.o, e.s);
            cek(Math.abs(cy - p0[1]) < 0.4 && Math.abs(cx - p0[0] - (e.n - daftar[0].n) * 26) < 0.4, `${nama}: benda meja ${e.o.id} berderet sejajar dengan jarak sama`);
          }
        }
        for (let p = 0; p < daftar.length; p += 1) for (let q = p + 1; q < daftar.length; q += 1) {
          const m = tengahBenda(daftar[p].o, daftar[p].s);
          const n2 = tengahBenda(daftar[q].o, daftar[q].s);
          cek(Math.hypot(m[0] - n2[0], m[1] - n2[1]) >= 17, `${nama}: ${daftar[p].o.id} dan ${daftar[q].o.id} tidak bertumpuk`);
        }
        const jml = isiTeks(o, `${g}-jml`);
        if (jml !== undefined) {
          stat.jml += 1;
          cek(jml === String(daftar.length), `${nama}: angka ${g} (${jml}) sama dengan banyak benda (${daftar.length})`);
        }
      }
      const tn = isiTeks(o, "tanda");
      if (tn !== undefined) {
        stat.tanda += 1;
        const sama2 = R.c.pa === R.c.pb && R.c.pa > 0 && R.c.mj === 0;
        cek(tn === (sama2 ? "✅" : "❌"), `${nama}: tanda ${tn} sesuai hitungan (kiri ${R.c.pa}, kanan ${R.c.pb}, meja ${R.c.mj})`);
      }
      if (!TANPA_KONSERVASI.has(a.id) && R0.c.pa + R0.c.pb > 0 && !kt.aksi.some((ak) => ak.bersih)) cek(R.total === R0.total, `${nama}: jumlah seluruh benda tetap (${R0.total} menjadi ${R.total})`);

      /* ---- pasangan di meja ---- */
      for (const pr of R.pairs) {
        stat.pasangan += 1;
        const j = Number(pr.id.slice(2));
        const dalam = R.arr.mj.filter((e) => dalamKotak(pr, tengahBenda(e.o, e.s))).map((e) => e.n).sort((x, y) => x - y);
        sama(dalam, [2 * j, 2 * j + 1], `${nama}: kotak ${pr.id} memeluk tepat dua benda meja ke-${2 * j} dan ke-${2 * j + 1}`);
      }

      /* ---- tulisan di gambar: persamaan, kartu hasil, pita, pola, tabel, kartu bilangan ---- */
      for (const tx of L.teksTerlihat(o)) {
        let m;
        if ((m = /^(\d+) \+ (\d+) = (\d+)$/.exec(tx))) {
          stat.kartuHasil += 1;
          cek(Number(m[1]) + Number(m[2]) === Number(m[3]), `${nama}: persamaan "${tx}" benar`);
          if (R.c.pa > 0 && R.c.pb > 0) cek(Number(m[1]) === R.c.pa && Number(m[2]) === R.c.pb && Number(m[3]) === R.total, `${nama}: persamaan "${tx}" sama dengan kiri ${R.c.pa}, kanan ${R.c.pb}, seluruhnya ${R.total}`);
        } else if ((m = /^setengah dari (\d+) = (\d+)$/.exec(tx))) {
          stat.kartuHasil += 1;
          cek(2 * Number(m[2]) === Number(m[1]), `${nama}: kartu "${tx}" benar`);
          if (R.total > 0) cek(Number(m[1]) === R.total && (R.pairs.length ? R.pairs.length === Number(m[2]) : R.c.pa === Number(m[2]) && R.c.pb === Number(m[2])), `${nama}: kartu "${tx}" sama dengan benda di gambar (kiri ${R.c.pa}, kanan ${R.c.pb})`);
        } else if ((m = /^(\d+) tidak punya setengah utuh$/.exec(tx))) {
          stat.kartuHasil += 1;
          cek(Number(m[1]) % 2 === 1 && Number(m[1]) === R.total, `${nama}: kartu "${tx}" benar (seluruhnya ${R.total})`);
        } else if ((m = /^(\d+) pasang = (\d+) bola$/.exec(tx))) {
          stat.kartuHasil += 1;
          cek(2 * Number(m[1]) === Number(m[2]) && R.pairs.length === Number(m[1]) && R.total === Number(m[2]), `${nama}: pita "${tx}" sama dengan pasangan di gambar (${R.pairs.length} pasang, ${R.total} benda)`);
        } else if ((m = /^(\d+) pasang \+ (\d+) sisa = (\d+)$/.exec(tx))) {
          stat.kartuHasil += 1;
          cek(2 * Number(m[1]) + Number(m[2]) === Number(m[3]) && R.pairs.length === Number(m[1]) && R.unpaired === Number(m[2]) && R.total === Number(m[3]), `${nama}: pita "${tx}" sama dengan pasangan di gambar (${R.pairs.length} pasang, sisa ${R.unpaired}, ${R.total} benda)`);
        } else if ((m = /^gabung kembali: (\d+) ikan$/.exec(tx))) {
          stat.kartuHasil += 1;
          cek(Number(m[1]) === R.total, `${nama}: kartu "${tx}" sama dengan seluruh benda (${R.total})`);
        }
      }
      {
        // Pola setengah: tiap baris setengahnya tepat setengah dari seluruhnya; pola selisih sama dengan label.
        const baris = [1, 2, 3, 4].map((j) => ({ n: isiTeks(o, `p${j}-n`), s: isiTeks(o, `p${j}-s`) }));
        for (const b of baris) if (b.n !== undefined && b.s !== undefined) {
          stat.pola += 1;
          cek(2 * Number(b.s) === Number(b.n), `${nama}: baris pola ${b.n} dan ${b.s}: setengah dari ${b.n} adalah ${Number(b.n) / 2}`);
        }
        for (const j of [1, 2, 3]) {
          const dn = isiTeks(o, `d${j}-n`);
          const ds = isiTeks(o, `d${j}-s`);
          if (dn !== undefined) {
            stat.pola += 1;
            cek(baris[j - 1].n !== undefined && baris[j].n !== undefined && Number(baris[j].n) - Number(baris[j - 1].n) === Number(dn.replace("+", "")), `${nama}: selisih ${dn} antara baris ${j} dan ${j + 1} (seluruhnya)`);
          }
          if (ds !== undefined) {
            stat.pola += 1;
            cek(baris[j - 1].s !== undefined && baris[j].s !== undefined && Number(baris[j].s) - Number(baris[j - 1].s) === Number(ds.replace("+", "")), `${nama}: selisih ${ds} antara baris ${j} dan ${j + 1} (setengahnya)`);
          }
        }
        // Tabel bagian, sisa, dan jenis dihitung dari bilangan tiap baris.
        for (const j of [1, 2, 3, 4]) {
          const n = isiTeks(o, `t${j}-n`);
          if (n === undefined) continue;
          const s = isiTeks(o, `t${j}-s`);
          const r = isiTeks(o, `t${j}-r`);
          const jn = isiTeks(o, `t${j}-j`);
          const N = Number(n);
          if (s !== undefined) cek(s === String(Math.floor(N / 2)), `${nama}: baris tabel ${n}: bagian ${s} sama dengan ${Math.floor(N / 2)}`);
          if (r !== undefined) cek(r === String(N % 2), `${nama}: baris tabel ${n}: sisa ${r} sama dengan ${N % 2}`);
          if (jn !== undefined) cek(jn === SIFAT(N), `${nama}: baris tabel ${n}: jenis ${jn} sama dengan ${SIFAT(N)}`);
          if (s !== undefined && r !== undefined && jn !== undefined) {
            stat.tabelBaris += 1;
            catatTabel[`t${j}`] = [s, r, jn, n];
          }
        }
        // Kartu bilangan: kolom kiri genap (bisa dibagi dua), kolom kanan ganjil (tersisa satu).
        for (const n of [2, 3, 4, 5, 6, 7, 8, 9, 10]) {
          const kk = ketemu(o, `g${n}-k`);
          if (!kk) continue;
          stat.kartuBil += 1;
          cek(isiTeks(o, `g${n}-t`) === String(n), `${nama}: kartu bilangan ${n} bertulis ${n}`);
          cek((kk.x + kk.w / 2 < 150) === (n % 2 === 0), `${nama}: kartu bilangan ${n} di kolom ${n % 2 === 0 ? "kiri (genap)" : "kanan (ganjil)"}`);
        }
        const g1 = ketemu(o, "gh1");
        const g2 = ketemu(o, "gh2");
        if (g1) cek(g1.isi === "Bisa dibagi dua" && g1.x < 150, `${nama}: judul kolom kiri Bisa dibagi dua`);
        if (g2) cek(g2.isi === "Tersisa satu" && g2.x > 150, `${nama}: judul kolom kanan Tersisa satu`);
      }

      /* ---- kartu pilihan: tepat satu kartu cocok dengan hasil hitung dan yang disorot adalah jawaban ---- */
      {
        const kartuTeks = [1, 2, 3].map((q) => isiTeks(o, `c${q}-t`)).filter((x) => x !== undefined);
        if (kartuTeks.length) {
          stat.kartuPilihan += 1;
          const f = JAWABAN[a.id];
          cek(!!f, `${nama}: adegan dengan kartu pilihan punya rumus jawaban`);
          if (f) {
            const benar = f(R);
            cek(kartuTeks.filter((x) => x === benar).length === 1, `${nama}: tepat satu kartu pilihan sama dengan hasil hitung "${benar}" (${kartuTeks.join(" | ")})`);
            const sorot = [1, 2, 3].filter((q) => ketemu(o, `c${q}-k`)?.sorot);
            if (sorot.length) cek(sorot.length === 1 && isiTeks(o, `c${sorot[0]}-t`) === benar, `${nama}: kartu yang disorot adalah jawaban "${benar}"`);
          }
        }
      }

      /* ---- suara dihitung ulang terhadap gambar ---- */
      // (1) angka sebelum nama benda sama dengan banyak benda pada gambar di akhir anak kalimat; jenis benda sama.
      for (let p = 0; p + 1 < t.length; p += 1) {
        if (NUMV[t[p]] === undefined || !NOUN.includes(t[p + 1])) continue;
        const S = stateKe(akhirSegmen(tok, p + 1));
        stat.bendaSuara += 1;
        cek(S.total > 0, `${nama}: benda "${t[p]} ${t[p + 1]}" yang disebut suara tampak di gambar`);
        cek(hitungSet(S).has(NUMV[t[p]]), `${nama}: "${t[p]} ${t[p + 1]}" sama dengan banyak benda pada gambar (seluruhnya ${S.total}, meja ${S.c.mj}, kiri ${S.c.pa}, kanan ${S.c.pb}, pasang ${S.pairs.length}, sisa ${S.unpaired})`);
        cek(S.simbol.length === 1 && S.simbol[0] === t[p + 1], `${nama}: jenis benda "${t[p + 1]}" sama dengan gambar (${S.simbol.join()})`);
      }
      // (2) setengah dari X adalah Y.
      for (let p = 0; p + 4 < t.length; p += 1) {
        if (t[p] !== "setengah" || t[p + 1] !== "dari" || NUMV[t[p + 2]] === undefined) continue;
        let q = p + 3;
        if (NOUN.includes(t[q])) q += 1;
        if (t[q] !== "adalah" || NUMV[t[q + 1]] === undefined) continue;
        const X = NUMV[t[p + 2]];
        const Y = NUMV[t[q + 1]];
        const S = stateKe(akhirSegmen(tok, q + 1));
        stat.setengahSuara += 1;
        cek(2 * Y === X, `${nama}: setengah dari ${X} memang ${X / 2}, bukan ${Y}`);
        if (S.total > 0) {
          cek(S.total === X, `${nama}: setengah dari ${X}: seluruh benda di gambar ${S.total}`);
          cek(S.pairs.length ? S.pairs.length === Y : S.c.pa === Y && S.c.pb === Y, `${nama}: setengah dari ${X} adalah ${Y}: gambar menunjukkan kiri ${S.c.pa}, kanan ${S.c.pb}, pasang ${S.pairs.length}`);
        } else {
          const ada = [1, 2, 3, 4].some((j) => isiTeks(L.keadaanStory(a, i, akhirSegmen(tok, q + 1)), `p${j}-n`) === String(X) && isiTeks(L.keadaanStory(a, i, akhirSegmen(tok, q + 1)), `p${j}-s`) === String(Y));
          cek(ada, `${nama}: setengah dari ${X} adalah ${Y} tampak pada baris pola di gambar`);
        }
      }
      // (3) sama banyak atau tidak, dan bukan setengah, dibandingkan dengan dua tempat di gambar.
      for (const s of kalimat) {
        const kecil = s.toLowerCase();
        if (kecil.endsWith("?")) continue;
        if (/tidak sama banyak/.test(kecil)) {
          stat.samaBanyak += 1;
          cek(R.c.pa + R.c.pb > 0 && R.c.pa !== R.c.pb, `${nama}: "tidak sama banyak" benar: kiri ${R.c.pa}, kanan ${R.c.pb}`);
        } else if (/\bkedua(nya| bagian| tempat)? sama banyak/.test(kecil)) {
          stat.samaBanyak += 1;
          cek(R.c.pa === R.c.pb && R.c.pa > 0, `${nama}: "sama banyak" benar: kiri ${R.c.pa}, kanan ${R.c.pb}`);
        }
        if (/bukan setengah/.test(kecil) && R.c.pa + R.c.pb > 0) {
          stat.samaBanyak += 1;
          cek(R.c.pa !== R.c.pb, `${nama}: "bukan setengah" benar: kiri ${R.c.pa}, kanan ${R.c.pb}`);
        }
        const ganjilKata = /tidak (bisa|dapat) dibagi dua sama banyak/.test(kecil);
        const genapKata = !ganjilKata && /(bisa|dapat) dibagi dua sama banyak/.test(kecil);
        if ((ganjilKata || genapKata) && R.total > 0) {
          stat.genapGanjil += 1;
          cek(ganjilKata ? R.total % 2 === 1 : R.total % 2 === 0, `${nama}: ${ganjilKata ? "tidak bisa" : "bisa"} dibagi dua sama banyak sesuai ${R.total} benda`);
        }
      }
      // (4) genap atau ganjil untuk bilangan yang disebut.
      for (let p = 0; p < t.length; p += 1) {
        if (t[p] !== "genap" && t[p] !== "ganjil") continue;
        const akhirKalimat = tok.findIndex((w, q) => q >= p && /[.!?]$/.test(w));
        if (akhirKalimat >= 0 && tok[akhirKalimat].endsWith("?")) continue;
        const daftar = [];
        if (t[p + 1] === "seperti") {
          for (let q = p + 2; q < t.length && (NUMV[t[q]] !== undefined || t[q] === "dan"); q += 1) if (t[q] !== "dan") daftar.push(NUMV[t[q]]);
        } else if (t[p - 1] === "bilangan" && t[p - 2] === "adalah") {
          for (let q = p - 3; q >= 0 && (NUMV[t[q]] !== undefined || t[q] === "dan"); q -= 1) if (t[q] !== "dan") daftar.push(NUMV[t[q]]);
        } else if (t[p - 1] === "itu" && NUMV[t[p - 2]] !== undefined) daftar.push(NUMV[t[p - 2]]);
        if (!daftar.length) continue;
        stat.genapGanjil += 1;
        cek(daftar.every((n) => (n % 2 === 0) === (t[p] === "genap")), `${nama}: bilangan ${daftar.join(", ")} memang ${t[p]}`);
      }
      // (5) tersisa N sama dengan benda meja yang belum dipasangkan atau dipindah.
      for (let p = 0; p + 1 < t.length; p += 1) {
        if (t[p] !== "tersisa" || NUMV[t[p + 1]] === undefined) continue;
        const S = stateKe(p + 1);
        if (S.total === 0) continue;
        stat.jumlahSisa += 1;
        cek((S.pairs.length ? S.unpaired : S.c.mj) === NUMV[t[p + 1]], `${nama}: tersisa ${t[p + 1]} sama dengan benda yang belum dibagi (meja ${S.c.mj}, tanpa pasangan ${S.unpaired})`);
      }
      // (6) satu, dua, ... pasang sama dengan kotak pasangan yang sudah tampil.
      for (let p = 0; p + 1 < t.length; p += 1) {
        if (NUMV[t[p]] === undefined || t[p + 1] !== "pasang") continue;
        const S = stateKe(p + 1);
        stat.jumlahPasang += 1;
        cek(S.pairs.length === NUMV[t[p]], `${nama}: "${t[p]} pasang" sama dengan kotak pasangan di gambar (${S.pairs.length})`);
      }
      // (7) nama pemilik: "Upe mendapat dua kelereng" sama dengan benda di tempat berlabel Upe.
      for (let p = 0; p + 3 < t.length; p += 1) {
        if (!["malosi", "kira", "upe", "wei", "halim", "igil"].includes(t[p])) continue;
        let q = p + 1;
        if (t[q] === "juga") q += 1;
        if (!["mendapat", "punya", "memiliki", "mempunyai"].includes(t[q]) || NUMV[t[q + 1]] === undefined || !NOUN.includes(t[q + 2])) continue;
        const S = stateKe(akhirSegmen(tok, q + 2));
        const g = ["pa", "pb"].find((x) => isiTeks(L.keadaanStory(a, i, akhirSegmen(tok, q + 2)), `${x}-nm`)?.toLowerCase() === t[p]);
        if (!g) continue;
        stat.nama += 1;
        cek(S.c[g] === NUMV[t[q + 1]], `${nama}: ${t[p]} mendapat ${t[q + 1]} ${t[q + 2]} sama dengan benda di tempat ${t[p]} (${S.c[g]})`);
      }
      // (8) kiri, kanan, kiri, kanan, ... : banyak kata kiri dan kanan sama dengan benda yang pindah ke tempat itu.
      {
        const nKiri = t.filter((w) => w === "kiri").length;
        const nKanan = t.filter((w) => w === "kanan").length;
        if (nKiri + nKanan >= 4 && R0.c.pa + R0.c.pb === 0) {
          stat.giliran += 1;
          cek(R.c.pa === nKiri && R.c.pb === nKanan, `${nama}: ${nKiri} kali kiri dan ${nKanan} kali kanan sama dengan benda di kiri (${R.c.pa}) dan kanan (${R.c.pb})`);
        }
        const labA = isiTeks(o, "pa-nm")?.toLowerCase();
        const labB = isiTeks(o, "pb-nm")?.toLowerCase();
        const untuk = (nm) => t.filter((w, p) => w === "untuk" && t[p + 1] === nm).length;
        if (labA && labB && labA !== "kiri" && untuk(labA) + untuk(labB) > 0) {
          stat.giliran += 1;
          cek(R.c.pa === R0.c.pa + untuk(labA) && R.c.pb === R0.c.pb + untuk(labB), `${nama}: untuk ${labA} ${untuk(labA)} kali dan untuk ${labB} ${untuk(labB)} kali sama dengan tambahan benda (kiri ${R0.c.pa} menjadi ${R.c.pa}, kanan ${R0.c.pb} menjadi ${R.c.pb})`);
        }
      }
      // (9) a tambah b sama dengan c, dan persamaan di gambar bila ada.
      for (let p = 0; p + 5 < t.length; p += 1) {
        if (!["tambah", "ditambah"].includes(t[p + 1]) || t[p + 3] !== "sama" || t[p + 4] !== "dengan") continue;
        const [x, y, z] = [NUMV[t[p]], NUMV[t[p + 2]], NUMV[t[p + 5]]];
        if (x === undefined || y === undefined || z === undefined) continue;
        stat.jumlahTambah += 1;
        cek(x + y === z, `${nama}: ${t[p]} tambah ${t[p + 2]} sama dengan ${t[p + 5]} benar`);
        const eq = isiTeks(o, "ps-eq");
        if (eq !== undefined) cek(eq === `${x} + ${y} = ${z}`, `${nama}: persamaan di gambar "${eq}" sama dengan suara (${x} + ${y} = ${z})`);
      }
      // (10) tabel: "Baris pertama: empat. Tiap bagian dua, sisanya nol, jadi genap."
      {
        const m = /baris (pertama|kedua|ketiga|keempat): (\w+)\. tiap bagian (\w+), sisanya (\w+), jadi (genap|ganjil)/i.exec(kt.suara);
        if (m) {
          stat.tabelSuara += 1;
          const j = ["pertama", "kedua", "ketiga", "keempat"].indexOf(m[1].toLowerCase()) + 1;
          const [n, s, r] = [NUMV[m[2].toLowerCase()], NUMV[m[3].toLowerCase()], NUMV[m[4].toLowerCase()]];
          sama([isiTeks(o, `t${j}-n`), isiTeks(o, `t${j}-s`), isiTeks(o, `t${j}-r`), isiTeks(o, `t${j}-j`)], [String(n), String(s), String(r), SIFAT(n)], `${nama}: baris tabel ke-${j} sama dengan suara`);
          cek(s === Math.floor(n / 2) && r === n % 2 && m[5].toLowerCase() === SIFAT(n).toLowerCase(), `${nama}: ${n} dibagi dua: bagian ${s}, sisa ${r}, ${m[5]} benar`);
        }
      }
    });
  }
}
{
  // Tabel pada gambar: baris, bagian, sisa, dan jenis hasil hitung.
  sama(["t1", "t2", "t3", "t4"].map((id) => catatTabel[id]), [["2", "0", "Genap", "4"], ["3", "0", "Genap", "6"], ["3", "1", "Ganjil", "7"], ["5", "0", "Genap", "10"]], "tabel bilangan: bagian, sisa, jenis, dan bilangan hasil hitung");
  // Adegan inti: banyak benda akhir tiap adegan dihitung ulang.
  const akhir = (id, ke) => ringkas(akhirAdegan(adeganId(id), ke));
  const urut = (R) => [R.c.mj, R.c.pa, R.c.pb];
  sama(urut(akhir("bagi-empat", 4)), [0, 2, 2], "empat kelereng: meja kosong, dua dan dua");
  sama(urut(akhir("ikan-enam", 4)), [0, 3, 3], "enam ikan: tiga dan tiga");
  sama(urut(akhir("bukan-setengah", 2)), [0, 4, 2], "enam ikan: empat dan dua bukan setengah");
  sama(urut(akhir("bukan-setengah", 4)), [0, 3, 3], "enam ikan setelah dipindah: tiga dan tiga");
  sama(urut(akhir("bintang-delapan", 3)), [0, 4, 4], "delapan bintang: empat dan empat");
  sama(urut(akhir("kartu-sepuluh", 4)), [0, 5, 5], "sepuluh kartu: lima dan lima");
  sama(urut(akhir("ganjil-lima", 2)), [1, 2, 2], "lima kelereng: dua, dua, tersisa satu");
  sama(urut(akhir("ganjil-lima", 4)), [0, 3, 2], "lima kelereng: tiga dan dua tidak sama banyak");
  sama(urut(akhir("ganjil-tujuh", 3)), [1, 3, 3], "tujuh bola: tiga, tiga, tersisa satu");
  sama([akhir("pasangan-delapan", 3).pairs.length, akhir("pasangan-delapan", 3).unpaired], [4, 0], "delapan bola: empat pasang, tanpa sisa");
  sama([akhir("pasangan-tujuh", 3).pairs.length, akhir("pasangan-tujuh", 3).unpaired], [3, 1], "tujuh bintang: tiga pasang dan satu sisa");
  sama(urut(akhir("periksa-gabung", 3)), [0, 3, 3], "periksa dengan menggabung: tiga dan tiga");
  sama(urut(akhir("setengah-utuh", 3)), [0, 5, 5], "setengah ke utuh: lima dan lima");
  sama(urut(akhir("latihan-satu", 4)), [0, 3, 3], "latihan satu: enam bola, tiga dan tiga");
  sama(urut(akhir("latihan-dua", 0)), [0, 5, 3], "latihan dua: lima dan tiga");
  sama(urut(akhir("latihan-dua", 3)), [0, 4, 4], "latihan dua setelah dipindah: empat dan empat");
  sama(urut(akhir("latihan-tiga", 2)), [1, 4, 4], "latihan tiga: sembilan ikan, empat, empat, sisa satu");
  sama(urut(akhir("latihan-empat", 3)), [0, 4, 4], "latihan empat: empat dan empat");
  sama(urut(akhir("luar-setengah", 3)), [0, 4, 4], "metode luar: delapan bola, empat dan empat");
  sama(urut(akhir("luar-setengah-terapan", 3)), [0, 3, 3], "metode luar: enam kartu, tiga dan tiga");
  sama(urut(akhir("luar-bagirata", 3)), [0, 3, 3], "metode luar: enam ikan, tiga dan tiga");
  sama(urut(akhir("luar-bagirata-terapan", 0)), [0, 3, 5], "metode luar: tiga dan lima belum rata");
  sama(urut(akhir("luar-bagirata-terapan", 3)), [0, 4, 4], "metode luar: setelah dipindah empat dan empat");
  sama([akhir("luar-cek-terapan", 0).total, akhir("luar-cek-terapan", 3).total], [9, 8], "metode luar: sembilan bintang lalu delapan bintang");
  const po = (id, ke) => [1, 2, 3, 4].map((j) => [isiTeks(akhirAdegan(adeganId(id), ke), `p${j}-n`), isiTeks(akhirAdegan(adeganId(id), ke), `p${j}-s`)]);
  sama(po("pola-setengah", 4), [["4", "2"], ["6", "3"], ["8", "4"], ["10", "5"]], "pola setengah dari empat, enam, delapan, sepuluh adalah dua, tiga, empat, lima");
  sama(po("penutup", 1), [["4", "2"], ["6", "3"], ["8", "4"], ["10", "5"]], "ringkasan: pola setengah yang sama");
}

{
  // Aturan pemilik: aplikasi belajar mandiri; tanpa instruksi kelompok, teman, kelas, buku, atau benda nyata.
  const MANDIRI = /kerja kelompok|berkelompok|secara berkelompok|diskusi kelompok|sekelompok|kelompokmu|kelompok belajar|bersama kelompok|\bkelompok\b|tanya teman|survei|karet gelang|uang tabungan|\bpaman\b|\btika\b|\blili\b|\bteman\w*|\bkawan\w*|sekawan|depan kelas|bersama kelas|seluruh kelas|\bkelas\b|berpasangan dengan (teman|kawan)|bekerja berpasangan|secara berpasangan|bermain bersama|bertanya kepada|buat ceritamu|buku|menulis di|menuliskan di|tulis di|tuliskan di|menggambar|gambarlah|gambar sendiri|\bbawa(lah)?\b|membawa|dibawa|\bkertas\b|\bpensil\b|\bpulpen\b|\bspidol\b|\bgunting\w*|ambil (benda|pensil|kelereng|bola|sedotan|balon|kerucut|kubus)|tangan (kiri|kanan)|\bjari\b|menyuruh|suruh|jengkal|telapak|\bdepa\b|penggaris|\bkoin\b|di sekitar|di rumah|di kelas|centimeter|\bmeter\b|kakimu|tanganmu|badanmu|\braba\w*|\bmeraba|\btubuh|\blengan|lingkari|coret|guru kelas|orang tua|\bayah\b|\bibu guru|bapak guru|\bloker\b|\bpaku\b|karet/i;
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      const semua = [a.judul, a.sumber];
      a.ketukan.forEach((kt, i) => {
        semua.push(kt.suara);
        semua.push(...L.teksTerlihat(L.keadaanStory(a, i, 9999)));
      });
      const kena = semua.filter((t) => MANDIRI.test(t));
      cek(kena.length === 0, `${v.id}/${a.id}: narasi mandiri dan digital, tanpa kelompok, teman, kelas, buku, kertas, atau benda nyata (${kena.slice(0, 2).join(" | ")})`);
    }
  }
}


/* ------------------------------ Sapaan, peta susun, dan tabel susun ------------------------------ */
{
  const sap = adegan(M_VIDEO, "sapaan");
  const DAFTAR = ["Bagi dua sama banyak", "Pola setengah bilangan", "Mengenal genap dan ganjil"];
  cek(/Halo anak-anak/.test(sap.ketukan[0].suara) && /Bagi dua sama banyak/i.test(L.teksTerlihat(akhirAdegan(sap, 1)).join(" | ")), "sapaan materi: tiga hal yang dipelajari tampil");
  sama(L.teksTerlihat(akhirAdegan(sap, 1)).filter((t) => DAFTAR.includes(t)), DAFTAR, "sapaan materi: daftar tiga hal");
  cek(!/\d/.test(sap.ketukan[1].suara) && !/\d/.test(DAFTAR.join(" ")), "sapaan materi: tanpa angka");
  const sapLuar = adegan(U, "sapaan");
  cek(/cara lain/i.test(L.teksTerlihat(akhirAdegan(sapLuar, 1)).join(" | ")) && /metode-luar|Metode luar/.test(sapLuar.sumber), "sapaan metode luar: pengumuman cara lain");
  let sumberRingkas = null;
  try {
    sumberRingkas = JSON.parse(readFileSync(new URL("../src/data/kelas2-bab5-ringkas.json", import.meta.url), "utf8")).subBab?.B;
  } catch {
    sumberRingkas = null;
  }
  const sementara = new URL("../.tmp-k2b5s/B.json", import.meta.url);
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
    // Isi tabel dihitung ulang dari gambar pada video materi: tiap baris satu bilangan; bagian, sisa, dan jenis dihitung dari bilangan itu.
    sama(T.kolom, ["Bagian", "Sisa", "Jenis"], "tabel susun: kolom bagian, sisa, jenis");
    const NAMA_BIL = ["Nol", "Satu", "Dua", "Tiga", "Empat", "Lima", "Enam", "Tujuh", "Delapan", "Sembilan", "Sepuluh"];
    sama(T.baris.map((b) => b.label), ["t1", "t2", "t3", "t4"].map((id) => NAMA_BIL[Number(catatTabel[id][3])]), "tabel susun: label baris sama dengan bilangan pada tabel di gambar materi");
    sama(T.baris.map((b) => b.sel), ["t1", "t2", "t3", "t4"].map((id) => catatTabel[id].slice(0, 3)), "tabel susun: bagian, sisa, dan jenis sama dengan hasil hitung dari bilangan di gambar");
    sama(T.baris.map((q) => q.sel.length), [3, 3, 3, 3], "tabel susun: tiga sel tiap baris");
    cek(T.baris.every((b) => b.sel.every((s) => s.length <= 8)), "tabel susun: sel pendek supaya margin teks >= 5 px di 405 px");
    cek(new Set(T.baris.map((b) => b.label)).size === T.baris.length, "tabel susun: label tiap baris berbeda");
    const KATA_LARANG = /buku|halaman|kunci|kerja kelompok|\bkelompok|\bteman|kawan|kelas\b|kertas|pensil|\bbawa\b|menggambar|menulis di|depan kelas|luas|keliling|di rumah|survei|karet gelang|uang tabungan|di sekitar|loker|ibu guru|bersusun|\bkali\b|gunting|\bpaku\b/i;
    cek(!KATA_LARANG.test(JSON.stringify({ p: A.petaSusun, t: A.tabelSusun })), "peta dan tabel susun: tanpa kata terlarang dan tanpa kelompok, teman, kelas, buku, kertas, pensil");
    cek(peta.every((s) => ![...s.teks, ...(s.ikon ?? "")].some((c) => c.codePointAt(0) > 0x1fa95)), "peta susun: emoji paling tinggi Emoji 12");
  } else cek(false, "peta dan tabel susun: .tmp-k2b5s/B.json atau kelas2-bab5-ringkas.json subBab.B.petaSusun ada");
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k2b5B-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k2b5B-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k2b5B sendiri (${impor.join(", ")})`);
  }
  // Emoji dalam data teks gambar juga paling tinggi Emoji 12 (diperiksa pada gambar yang diputar).
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d), `${v.id}/${a.id}: emoji gambar paling tinggi Emoji 12`);
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k2b5b.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|naskah-k1b|naskah-k2b5|data-k2b5|video-k2b5-umum/.test(pembungkus) && /VIDEO_MATERI_K2B5B/.test(pembungkus) && /VIDEO_LUAR_K2B5B/.test(pembungkus) && /export function VideoK2B5B/.test(pembungkus) && /daftar-video-cerita/.test(pembungkus), "video-k2b5b.tsx: dua video dari mesin Story, tanpa naskah lama");
  cek(!/\r/.test(pembungkus), "video-k2b5b.tsx: akhir baris LF");
  const sendiri = readFileSync(new URL("uji-story-k2b5B.mjs", import.meta.url), "utf8");
  cek(!/\r/.test(sendiri), "uji-story-k2b5B.mjs: akhir baris LF");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit diputar)`);
}
console.log(`Pemeriksaan: ${stat.gambar} benda digambar sesuai simbol, ${stat.tempatBenda} benda di kotak tempatnya, ${stat.jml} angka tempat, ${stat.tanda} tanda sama banyak, ${stat.pasangan} kotak pasangan, ${stat.bendaSuara} angka-benda di suara, ${stat.setengahSuara} setengah dari X adalah Y, ${stat.samaBanyak} sama banyak atau bukan, ${stat.genapGanjil} genap atau ganjil, ${stat.jumlahSisa} tersisa, ${stat.jumlahPasang} jumlah pasang, ${stat.nama} nama pemilik, ${stat.giliran} giliran kiri kanan, ${stat.jumlahTambah} penjumlahan, ${stat.kartuHasil} kartu hasil, ${stat.kartuPilihan} kartu pilihan, ${stat.pola} baris pola, ${stat.tabelBaris} baris tabel (${stat.tabelSuara} di suara), ${stat.kartuBil} kartu bilangan, ${jumlahNama} nama bilangan tampak sebagai angka`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
