// Uji Story Kelas 2 Bab 3 Sub-Bab B (Mengurai dan Menyusun Bangun Datar): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Video diputar bergaya guru: suara, teks terlihat, sumber, judul adegan, dan subjudul tanpa penyebutan buku (kata terlarang diperiksa pada adegan yang diputar).
// Memeriksa: pemicu kata, suara tanpa digit, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas, teks bertumpuk, pemisahan materi dan metode luar (nama metode hanya Indonesia),
// nama bilangan sepuluh sampai dua puluh yang diucapkan tampak sebagai angka, dan data di layar dihitung ulang dari STRUKTUR gambar (titik sudut tiap bangun), bukan dari kata kunci:
// jumlah pojok tiap bangun sama dengan nama bangun (segitiga 3, segi empat 4, segi lima 5, segi enam 6), penanda sisi (satu per sisi, ujung tepat di pojok, angka 1..n) dan hitungan suara,
// keping hasil mengurai menutupi bangun utuh tepat sekali (titik contoh pada kisi: tanpa celah, tanpa tumpang tindih; jumlah luas sama), jumlah dan jenis keping sama dengan tulisan hasil,
// pola n - 2 segitiga dari satu pojok (n - 3 garis) dan n segitiga dari titik tengah, tabel pola, hasil menyusun (persegi, segitiga besar, segi empat miring, segi enam, segi lima, persegi besar),
// tangram tujuh keping (lima segitiga: dua besar, satu sedang, dua kecil; satu persegi; satu jajar genjang; menutupi persegi 80 x 80), pilihan jawaban (kartu yang disorot sama dengan hasil hitung gambar),
// kalimat hitung di suara dan di gambar, aturan pemilik (belajar mandiri digital: tanpa kerja kelompok, survei teman, depan kelas, buku, menulis atau menggambar di buku, membawa benda nyata),
// peta dan tabel susun (tabel dihitung ulang dari gambar), emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k2b3B.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k2b3B-video.ts");
const U1 = await import("../src/components/modul/story/k2b3B-luar-1.ts");
const B = await import("../src/components/modul/story/k2b3B-bantu.ts");

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
const VIDEO = [V.VIDEO_MATERI_K2B3B, V.VIDEO_LUAR_K2B3B];
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
const M_VIDEO = V.VIDEO_MATERI_K2B3B;
const U = V.VIDEO_LUAR_K2B3B;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const NAMA_LUAR = /Susun Bangun|Urai Bangun|Tangram|metode luar|metode dari luar/i;
const NAMA_INGGRIS = /Compose|Decompose|Attribute Sort|Geoboard|Face Print|Mystery Bag|3D Attributes|Tessellation/i;
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M_VIDEO);
  const luar = teksVideo(U);
  cek(!NAMA_LUAR.test(materi), "video materi tidak memuat nama metode luar (Susun Bangun, Urai Bangun, Tangram)");
  for (const m of U1.NAMA_METODE_ID) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE_ID, ["Susun Bangun", "Urai Bangun", "Tangram"], "nama Indonesia metode luar");
  cek(!NAMA_INGGRIS.test(materi) && !NAMA_INGGRIS.test(luar), "nama metode hanya bahasa Indonesia (tanpa Compose, Decompose, Tessellation)");
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
  cek(M_VIDEO.id === "k2b3B-materi" && U.id === "k2b3B-luar", "id video k2b3B-materi dan k2b3B-luar");
  cek(U.judul.endsWith(": Metode dari Luar") && !/menurut/i.test(M_VIDEO.judul), "judul video: materi tanpa 'menurut', luar berakhir ': Metode dari Luar'");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,urai-arti,urai-miring,urai-tengah,beda-cara,dua-garis,hitung-keping,susun-arti,dua-segitiga,susun-segienam,pola-empat,pola-lima,pola-enam,pola-tengah,pola-tabel,urai-susun-balik,latihan-satu,latihan-dua,latihan-tiga,latihan-empat,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-susun,luar-susun-terapan,luar-urai,luar-urai-terapan,luar-tangram,luar-tangram-terapan,luar-ringkas", "urutan adegan metode luar");
  cek(M_VIDEO.adegan[0].id === "sapaan" && U.adegan[0].id === "sapaan", "tiap video dibuka adegan sapaan");
  cek(M_VIDEO.adegan.filter((a) => /^latihan-/.test(a.id)).length === 4 && M_VIDEO.adegan[M_VIDEO.adegan.length - 1].id === "penutup", "video materi: Latihan 1 sampai 4 lalu penutup");
  cek(U.adegan[1].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  for (const kata of ["Latihan", "Igil", "Malosi", "Halim", "Kira", "Wei", "Upe", "mengurai", "menyusun", "keping", "segitiga", "segi empat", "segi lima", "segi enam", "persegi", "garis", "sisi", "pojok", "tabel", "dikurangi", "titik tengah", "berlawanan"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  // Materi penjumlahan dan pengurangan: kalimat hitung boleh; tanpa kali, bagi, bersusun, satuan baku, rumus, dan bilangan di atas dua puluh.
  const BOCOR = /dikali|perkalian|pembagian|dibagi|\bkali\b|\bbagi\b|\bratus\b|\bribu\b|\bluas\b|keliling|rumus|volume|sentimeter|centimeter|\bcm\b|\bmeter\b|penggaris|bersusun|×|÷/i;
  for (const v of [M_VIDEO, U]) {
    for (const a of v.adegan) cek(!BOCOR.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa kali, bagi, bersusun, satuan baku, atau rumus`);
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
const NAMA_METODE_SUARA = /susun bangun|urai bangun|tangram/gi;
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

/* ------------------------------ Geometri, hitungan, dan pilihan dihitung ulang dari struktur gambar ------------------------------ */
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
const stat = { poligon: 0, sisi: 0, tiling: 0, hitung: 0, aritmetika: 0, kalimat: 0, pilihan: 0, pola: 0 };
const baca = (t) => {
  const m = /^(\d+) ([−+]) (\d+) = (\d+)$/.exec(t ?? "");
  return m ? { a: +m[1], op: m[2], b: +m[3], c: +m[4] } : null;
};
const benar = (r) => (r.op === "−" ? r.a - r.b === r.c : r.a + r.b === r.c);
const aktual = (o) => titikJalur(o);
const dasar = (o) => titikJalur(o).map((p) => [p[0] - (o.x ?? 0), p[1] - (o.y ?? 0)]);
const luasP = (pts) => {
  let s = 0;
  for (let i = 0; i < pts.length; i += 1) {
    const j = (i + 1) % pts.length;
    s += pts[i][0] * pts[j][1] - pts[j][0] * pts[i][1];
  }
  return Math.abs(s) / 2;
};
const dalam = (p, pts) => {
  let c = false;
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    const [a, b] = pts[i];
    const [x, y] = pts[j];
    if (b > p[1] !== y > p[1] && p[0] < ((x - a) * (p[1] - b)) / (y - b) + a) c = !c;
  }
  return c;
};
const pusatP = (pts) => [pts.reduce((t, p) => t + p[0], 0) / pts.length, pts.reduce((t, p) => t + p[1], 0) / pts.length];
const polys = (objs) => objs.filter((o) => o.t === "jalur" && titikJalur(o));
const dekat = (p, q, e = 0.2) => Math.abs(p[0] - q[0]) <= e && Math.abs(p[1] - q[1]) <= e;
const jarak = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
const NAMA_KE_N = (s) => (/^segitiga/.test(s) ? 3 : /^(segi empat|persegi)/.test(s) ? 4 : /^segi lima/.test(s) ? 5 : /^segi enam/.test(s) ? 6 : null);
const KATA_N = { tiga: 3, empat: 4, lima: 5, enam: 6, delapan: 8 };
const KATA_JUMLAH = { dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7 };
/** Suara memuat hitungan berurutan satu sampai m (tepat m, tidak lebih). */
const urutan = (suara, m) => {
  const t = tokoh(suara);
  for (let i = 0; i < t.length; i += 1) {
    if (t[i] === NAMA[1] && Array.from({ length: m }, (_, q) => t[i + q] === NAMA[q + 1]).every(Boolean) && t[i + m] !== NAMA[m + 1]) return true;
  }
  return false;
};
/** Titik contoh pada kisi tak beraturan di dalam kotak pembatas titik-titik `semua`. */
const kisi = (semua, langkah = 2.3) => {
  const xs = semua.map((p) => p[0]);
  const ys = semua.map((p) => p[1]);
  const out = [];
  for (let x = Math.min(...xs) + 0.37; x < Math.max(...xs); x += langkah) for (let y = Math.min(...ys) + 0.29; y < Math.max(...ys); y += langkah) out.push([x, y]);
  return out;
};
/** Keping-keping menutup bangun utuh tepat sekali: tiap titik contoh ada di bangun utuh jika dan hanya jika ada di tepat satu keping. */
const menutupi = (utuh, kepingan) => {
  const salah = kisi(utuh).filter((p) => {
    const n = kepingan.filter((k) => dalam(p, k)).length;
    return dalam(p, utuh) ? n !== 1 : n !== 0;
  });
  return salah.length === 0;
};
const jenisN = (n) => (n === 3 ? "segitiga" : n === 4 ? "segi empat" : `${n}`);
const catat = {};

for (const v of VIDEO) {
  for (const a of v.adegan) {
    const nama = `${v.id}/${a.id}`;
    const wholes = new Map();
    const prevS = new Map();
    let prevKn = "";
    a.ketukan.forEach((kt, i) => {
      const o = akhirAdegan(a, i);
      const bangun = polys(o);
      for (const p of bangun) {
        if (/^(ut|ua|ub|ht|ra|rb|rc|bt|bb)$/.test(p.id)) wholes.set(p.id, dasar(p));
        const pts = aktual(p);
        stat.poligon += 1;
        cek(luasP(pts) > 100 && pts.length >= 3 && pts.length <= 8, `${nama}#${i + 1}: bangun ${p.id} sah (${pts.length} titik, luas ${Math.round(luasP(pts))})`);
        // Penanda sisi: satu penanda per sisi, ujungnya tepat di pojok bangun, angkanya berurutan, dan suara menghitung sampai jumlah itu.
        const n = pts.length;
        const garisS = o.filter((m) => m.t === "garis" && m.id.startsWith(`${p.id}s`) && /^\d+$/.test(m.id.slice(p.id.length + 1)));
        if (garisS.length) {
          stat.sisi += 1;
          const nomor = garisS.map((m) => Number(m.id.slice(p.id.length + 1))).sort((x, y) => x - y);
          sama(nomor, Array.from({ length: n }, (_, q) => q), `${nama}#${i + 1}: penanda sisi ${p.id} tepat satu per sisi (bangun ${n} sisi)`);
          for (const m of garisS) {
            const q = Number(m.id.slice(p.id.length + 1));
            cek(dekat([m.x, m.y], pts[q]) && dekat([m.x + m.x2, m.y + m.y2], pts[(q + 1) % n]), `${nama}#${i + 1}: penanda ${m.id} menutup sisi ke-${q + 1} bangun ${p.id}`);
            cek(isiTeks(o, `${p.id}sn${q}`) === String(q + 1), `${nama}#${i + 1}: angka sisi ${p.id}sn${q} bernilai ${q + 1}`);
          }
          if (prevS.get(p.id) !== nomor.join()) cek(urutan(kt.suara, n), `${nama}#${i + 1}: suara menghitung satu sampai ${NAMA[n]} sama dengan ${n} sisi yang digambar`);
          prevS.set(p.id, nomor.join());
        }
      }
      // Nama bangun sama dengan jumlah pojok gambarnya.
      for (const t of o.filter((m) => m.t === "teks" && /-nm$/.test(m.id))) {
        const p = bangun.find((b) => b.id === t.id.slice(0, -3));
        cek(!!p, `${nama}#${i + 1}: nama "${t.isi}" menempel pada bangun yang ada (${t.id})`);
        if (p) cek(NAMA_KE_N(t.isi) === aktual(p).length, `${nama}#${i + 1}: nama "${t.isi}" sama dengan ${aktual(p).length} pojok bangun ${p.id}`);
      }
      // Angka keping: berurutan, tiap angka di dalam kepingnya, suara menghitung sama banyak.
      const kn = o.filter((m) => /^kn\d+$/.test(m.id)).sort((x, y) => Number(x.id.slice(2)) - Number(y.id.slice(2)));
      if (kn.length) {
        sama(kn.map((m) => m.isi), kn.map((_, q) => String(q + 1)), `${nama}#${i + 1}: angka keping berurutan`);
        cek(kn.length <= 20, `${nama}#${i + 1}: paling banyak dua puluh benda`);
        kn.forEach((m, q) => {
          const p = bangun.find((b) => b.id === `kp${q}`);
          cek(!!p && dalam([m.x, m.y - 3], aktual(p)), `${nama}#${i + 1}: angka ${m.isi} berada di dalam keping ke-${q + 1}`);
        });
        if (kn.length >= 2 && prevKn !== kn.map((m) => m.isi).join()) cek(urutan(kt.suara, kn.length), `${nama}#${i + 1}: suara menghitung satu sampai ${NAMA[kn.length]} sama dengan ${kn.length} keping yang digambar`);
      }
      // Pernyataan di suara dicocokkan dengan bangun yang tergambar pada ketukan itu.
      if (a.id !== "pola-tabel") {
        const adaN = new Set(bangun.map((b) => aktual(b).length));
        for (const m of kt.suara.matchAll(/\b(tiga|empat|lima|enam|delapan) sisi\b|bersisi (tiga|empat|lima|enam)\b/g)) {
          const val = KATA_N[m[1] ?? m[2]];
          cek(adaN.has(val), `${nama}#${i + 1}: suara menyebut ${val} sisi dan ada bangun ${val} sisi di gambar`);
        }
        for (const m of kt.suara.matchAll(/bernama (segitiga|segi empat|segi lima|segi enam)/g)) cek(adaN.has(NAMA_KE_N(m[1])), `${nama}#${i + 1}: suara menamai ${m[1]} dan ada bangunnya di gambar`);
      }
      prevKn = kn.map((m) => m.isi).join();
      const nKeping = bangun.filter((b) => /^kp\d+$/.test(b.id)).length;
      for (const m of kt.suara.matchAll(/(?:menjadi|Hasilnya|terbentuk|Ada|Betul,|terpecah menjadi) (dua|tiga|empat|lima|enam|tujuh) keping/g)) cek(KATA_JUMLAH[m[1]] === nKeping, `${nama}#${i + 1}: suara menyebut ${m[1]} keping, di gambar ada ${nKeping} keping`);
    });

    // Keadaan akhir adegan: keping menutupi bangun utuh tepat sekali, jumlah dan jenis keping sama dengan tulisan hasil.
    const fin = akhirAdegan(a);
    const bangun = polys(fin);
    const pcs = bangun.filter((p) => /^kp\d+$/.test(p.id));
    if (pcs.length && wholes.size && a.id !== "urai-susun-balik") {
      const grup = new Map();
      for (const p of pcs) {
        const ca = pusatP(aktual(p));
        const cd = pusatP(dasar(p));
        const id = [...wholes.keys()].find((w) => dalam(ca, wholes.get(w)) || dalam(cd, wholes.get(w)));
        cek(!!id, `${nama}: keping ${p.id} berada dalam salah satu bangun utuh`);
        if (id) grup.set(id, [...(grup.get(id) ?? []), p]);
      }
      for (const [id, ps] of grup) {
        const W0 = wholes.get(id);
        const jumlah = ps.reduce((t, p) => t + luasP(aktual(p)), 0);
        cek(Math.abs(jumlah - luasP(W0)) / luasP(W0) < 0.005, `${nama}: jumlah luas keping (${Math.round(jumlah)}) sama dengan luas bangun ${id} (${Math.round(luasP(W0))})`);
        cek(menutupi(W0, ps.map(aktual)) || menutupi(W0, ps.map(dasar)), `${nama}: keping menutupi bangun ${id} tanpa celah dan tanpa tumpang tindih`);
        stat.tiling += 1;
      }
    }
    // Tulisan hasil (jumlah dan jenis keping).
    const hs = isiTeks(fin, "hs");
    if (hs && pcs.length && !/persegi kecil/.test(hs)) {
      const tri = pcs.filter((p) => aktual(p).length === 3).length;
      const quad = pcs.filter((p) => aktual(p).length === 4).length;
      const mt = /(\d+) segitiga/.exec(hs);
      const mq = /(\d+) segi empat/.exec(hs);
      sama([mt ? +mt[1] : 0, mq ? +mq[1] : 0], [tri, quad], `${nama}: tulisan hasil "${hs}" sama dengan jenis dan jumlah keping yang digambar`);
      const ms = /= (\d+) sisi/.exec(hs);
      if (ms) cek(!!wholes.get("ut") && +ms[1] === wholes.get("ut").length, `${nama}: banyak sisi pada "${hs}" sama dengan pojok bangun utuh`);
      stat.hitung += 1;
    }
  }
}

const adeganId = (id) => adegan(M_VIDEO, id) ?? adegan(U, id);
const di = (id, ke) => {
  const a = adeganId(id);
  if (!a) throw new Error(`adegan ${id} tidak ada`);
  return akhirAdegan(a, ke);
};

{
  // Beda cara: dua persegi, kiri miring (dua segitiga) dan kanan tengah (dua segi empat).
  const o = di("beda-cara");
  const k = (id) => aktual(ketemu(o, id));
  sama([k("kp0").length, k("kp1").length, k("kp2").length, k("kp3").length, isiTeks(o, "ha"), isiTeks(o, "hb")], [3, 3, 4, 4, "2 segitiga", "2 segi empat"], "beda cara: kiri dua segitiga, kanan dua segi empat sama dengan tulisan");
  cek(Math.abs(luasP(k("kp0")) + luasP(k("kp1")) - luasP(k("kp2")) - luasP(k("kp3"))) < 1, "beda cara: persegi kiri dan kanan sama luasnya setelah diurai");
  cek(menutupi(aktual(ketemu(o, "ua")), [k("kp0"), k("kp1")]) && menutupi(aktual(ketemu(o, "ub")), [k("kp2"), k("kp3")]), "beda cara: tiap persegi tertutup oleh keping hasilnya");
  stat.hitung += 2;
}
{
  // Dua garis pada persegi panjang: tak bersilangan (tiga keping) dan bersilangan (empat keping, titik potong sungguh di dalam).
  const a = adeganId("dua-garis");
  const o1 = akhirAdegan(a, 1);
  const o3 = akhirAdegan(a, 3);
  const jenis = (o) => polys(o).filter((p) => /^kp\d+$/.test(p.id)).map((p) => aktual(p).length).sort().join();
  sama([jenis(o1), isiTeks(o1, "hs"), jenis(o3), isiTeks(o3, "hs")], ["3,3,4", "2 segitiga + 1 segi empat", "3,3,4,4", "2 segitiga + 2 segi empat"], "dua garis: jenis keping cara satu dan cara dua");
  const g = (o, id) => ketemu(o, id);
  const [g0, g1] = [g(akhirAdegan(a, 2), "ug0"), g(akhirAdegan(a, 2), "ug1")];
  const A0 = [g0.x, g0.y];
  const A1 = [g0.x + g0.x2, g0.y + g0.y2];
  const B0 = [g1.x, g1.y];
  const B1 = [g1.x + g1.x2, g1.y + g1.y2];
  const ccw = (p, q, r) => (q[0] - p[0]) * (r[1] - p[1]) - (q[1] - p[1]) * (r[0] - p[0]);
  cek(ccw(A0, A1, B0) * ccw(A0, A1, B1) < 0 && ccw(B0, B1, A0) * ccw(B0, B1, A1) < 0, "dua garis: pada cara dua kedua garis memang saling bersilangan");
  const [h0, h1] = [g(o1, "ug0"), g(o1, "ug1")];
  const X0 = [h0.x, h0.y];
  const X1 = [h0.x + h0.x2, h0.y + h0.y2];
  const Y0 = [h1.x, h1.y];
  const Y1 = [h1.x + h1.x2, h1.y + h1.y2];
  cek(!(ccw(X0, X1, Y0) * ccw(X0, X1, Y1) < 0 && ccw(Y0, Y1, X0) * ccw(Y0, Y1, X1) < 0), "dua garis: pada cara satu kedua garis tidak bersilangan");
  stat.hitung += 2;
}
{
  // Perahu: dua segitiga dan satu segi empat; kepingan disorot sesuai ucapan.
  const a = adeganId("hitung-keping");
  const o = akhirAdegan(a, 2);
  sama(["kp0", "kp1", "kp2"].map((id) => !!ketemu(o, id)?.sorot), [true, true, false], "perahu: dua keping bertiga sisi disorot saat kata dua keping");
  const o4 = akhirAdegan(a, 3);
  sama(["kp0", "kp1", "kp2"].map((id) => [aktual(ketemu(o4, id)).length, !!ketemu(o4, id)?.sorot]), [[3, false], [3, false], [4, true]], "perahu: keping bersisi empat disorot saat kata satu keping");
}
{
  // Pola n − 2 dari satu pojok dan n dari titik tengah.
  for (const [id, n] of [["pola-empat", 4], ["pola-lima", 5], ["pola-enam", 6]]) {
    const a = adeganId(id);
    const o = akhirAdegan(a);
    const ut = aktual(ketemu(o, "ut"));
    const pcs = polys(o).filter((p) => /^kp\d+$/.test(p.id)).map(aktual);
    const garisU = o.filter((m) => /^ug\d+$/.test(m.id));
    sama([ut.length, pcs.length, garisU.length], [n, n - 2, n - 3], `${id}: segi ${n} diurai dari satu pojok menjadi n − 2 segitiga dengan n − 3 garis`);
    cek(pcs.every((p) => p.length === 3 && p.some((q) => dekat(q, ut[0]))), `${id}: semua keping segitiga dan semuanya berpangkal pada pojok pertama`);
    cek(garisU.every((m) => dekat([m.x, m.y], ut[0]) && ut.some((q, j) => j >= 2 && j <= n - 2 && dekat([m.x + m.x2, m.y + m.y2], q))), `${id}: tiap garis dari pojok pertama ke pojok yang tidak bersebelahan`);
    const r = baca(isiTeks(o, "rm"));
    sama([r?.a, r?.b, r?.c, r?.op], [n, 2, n - 2, "−"], `${id}: kalimat ${n} − 2 = ${n - 2}`);
    catat[id] = [ut.length, pcs.length];
    stat.pola += 1;
  }
  {
    const o = di("latihan-tiga", 0);
    const ut = aktual(ketemu(o, "ut"));
    const garisU = o.filter((m) => /^ug\d+$/.test(m.id));
    cek(ut.length === 6 && garisU.length === 3 && garisU.every((m) => dekat([m.x, m.y], ut[0]) && ut.some((q, j) => j >= 2 && j <= 4 && dekat([m.x + m.x2, m.y + m.y2], q))), "latihan tiga: segi enam dengan tiga garis dari satu pojok");
    const f = akhirAdegan(adeganId("latihan-tiga"));
    const pcs = polys(f).filter((p) => /^kp\d+$/.test(p.id)).map(aktual);
    const r = baca(isiTeks(f, "rm"));
    cek(pcs.length === 4 && pcs.every((p) => p.length === 3 && p.some((q) => dekat(q, ut[0]))) && r.a === 6 && r.c === pcs.length, "latihan tiga: empat segitiga dari satu pojok, 6 − 2 = 4");
    stat.pola += 1;
  }
  {
    const a = adeganId("pola-tengah");
    for (const [ke, n] of [[3, 6], [4, 5]]) {
      const o = akhirAdegan(a, ke);
      const ut = aktual(ketemu(o, "ut"));
      const tt = ketemu(o, "tt");
      const pcs = polys(o).filter((p) => /^kp\d+$/.test(p.id)).map(aktual);
      cek(ut.length === n && !!tt && pcs.length === n, `pola tengah: segi ${n} dari titik tengah menjadi ${n} keping`);
      const c = [tt.x, tt.y];
      cek(pcs.every((p) => p.length === 3 && dekat(p[0], c, 0.3) && ut.filter((q) => p.slice(1).some((r) => dekat(q, r))).length === 2), `pola tengah: tiap keping segitiga berpangkal di titik tengah dengan dua pojok bersebelahan (segi ${n})`);
      cek(pcs.length === ut.length, "pola tengah: banyak segitiga sama dengan banyak sisi");
    }
    const o2 = akhirAdegan(a, 1);
    const ut2 = aktual(ketemu(o2, "ut"));
    const g2 = o2.filter((m) => /^ug\d+$/.test(m.id));
    const tt2 = ketemu(o2, "tt");
    cek(g2.length === ut2.length && g2.every((m) => dekat([m.x, m.y], [tt2.x, tt2.y], 0.3) && ut2.some((q) => dekat([m.x + m.x2, m.y + m.y2], q))), "pola tengah: satu garis dari titik tengah ke setiap pojok (enam garis)");
    catat["pola-tengah"] = [6, 6];
    stat.pola += 1;
  }
  {
    // Tabel pola dihitung ulang: bangun, sisi, banyak segitiga (sisi dikurangi dua), dan sama dengan hasil gambar pola lima dan enam.
    const o = akhirAdegan(adeganId("pola-tabel"));
    const baris = [0, 1, 2, 3].map((r) => [isiTeks(o, `tb-r${r}c0`), +isiTeks(o, `tb-r${r}c1`), +isiTeks(o, `tb-r${r}c2`)]);
    cek(baris.every(([nm, s, t]) => NAMA_KE_N(nm) === s && t === s - 2), "tabel pola: tiap baris nama = sisi dan segitiga = sisi − 2");
    sama(baris.map((b) => b[1]), [3, 4, 5, 6], "tabel pola: sisi 3, 4, 5, 6");
    sama([baris[1][1], baris[1][2], baris[2][1], baris[2][2], baris[3][1], baris[3][2]], [...catat["pola-empat"], ...catat["pola-lima"], ...catat["pola-enam"]], "tabel pola: baris segi empat, segi lima, dan segi enam sama dengan gambar pola empat, lima, dan enam");
    stat.pola += 1;
  }
}
{
  // Mengurai dan menyusun berlawanan: dua keping dari satu persegi, dan dua keping menyusun persegi yang sama besar.
  const o = di("urai-susun-balik");
  const bt = aktual(ketemu(o, "bt"));
  const bb = aktual(ketemu(o, "bb"));
  const pr = (a, b) => [ketemu(o, `kp${a}`), ketemu(o, `kp${b}`)];
  const ok = [pr(0, 1), pr(2, 3)].every(([p, q]) => {
    const semua = [...dasar(p), ...dasar(q)];
    const kotakP = [[Math.min(...semua.map((x) => x[0])), Math.min(...semua.map((x) => x[1]))], [Math.max(...semua.map((x) => x[0])), Math.min(...semua.map((x) => x[1]))], [Math.max(...semua.map((x) => x[0])), Math.max(...semua.map((x) => x[1]))], [Math.min(...semua.map((x) => x[0])), Math.max(...semua.map((x) => x[1]))]];
    return p && q && dasar(p).length === 3 && dasar(q).length === 3 && Math.abs(luasP(kotakP) - luasP(bt)) < 1 && menutupi(kotakP, [dasar(p), dasar(q)]);
  });
  cek(ok && Math.abs(luasP(bt) - luasP(bb)) < 1 && bt.length === 4 && bb.length === 4, "urai dan susun berlawanan: dua segitiga menutupi satu persegi, di atas dan di bawah, dan luas persegi sama");
  stat.tiling += 2;
}
{
  // Tiga cara menempel dua segitiga siku-siku sama: persegi, segitiga besar, segi empat miring.
  const o = di("dua-segitiga");
  const hasil = ["ra", "rb", "rc"].map((id) => aktual(ketemu(o, id)).length);
  sama(hasil, [4, 3, 4], "dua segitiga: hasil tiga cara berpojok 4, 3, 4 (persegi, segitiga besar, segi empat miring)");
  sama(["ra-nm", "rb-nm", "rc-nm"].map((id) => isiTeks(o, id)), ["persegi", "segitiga besar", "segi empat miring"], "dua segitiga: nama tiga hasil");
  const luasPasang = [0, 1, 2].map((q) => luasP(aktual(ketemu(o, `kp${q * 2}`))) + luasP(aktual(ketemu(o, `kp${q * 2 + 1}`))));
  cek(luasPasang.every((l) => Math.abs(l - luasPasang[0]) < 1) && luasPasang[0] > 0, "dua segitiga: tiga hasil sama luas (dua segitiga yang sama)");
  const ukuran = (id) => { const p = aktual(ketemu(o, id)); return [jarak(p[0], p[1]), jarak(p[1], p[2]), jarak(p[2], p[0])].sort((x, y) => x - y).map((x) => Math.round(x)).join(); };
  cek([0, 1, 2, 3, 4, 5].every((q) => ukuran(`kp${q}`) === ukuran("kp0")), "dua segitiga: keenam keping segitiga sama besar dan sebangun");
  // Persegi dan segitiga siku-siku: dua kaki sama panjang; sisi miring sungguh sisi tempel pada hasil persegi.
  cek(luasP(aktual(ketemu(o, "ra"))) === luasP(aktual(ketemu(o, "kp0"))) * 2, "dua segitiga: persegi seluas dua segitiga");
  stat.tiling += 3;
}
{
  // Segi enam dari dua segitiga dan satu segi empat (dua susunan), dan rumah dari persegi dan segitiga.
  const a = adeganId("susun-segienam");
  const o = akhirAdegan(a, 2);
  const hex = aktual(ketemu(o, "ht"));
  const pc = ["kp0", "kp1", "kp2"].map((id) => aktual(ketemu(o, id)).length);
  cek(hex.length === 6 && pc.join() === "4,3,3" && menutupi(hex, ["kp0", "kp1", "kp2"].map((id) => aktual(ketemu(o, id)))), "segi enam: satu segi empat dan dua segitiga menutupi bangun berpojok enam");
  const o5 = akhirAdegan(a);
  const hex2 = aktual(ketemu(o5, "ht"));
  cek(hex2.length === 6 && menutupi(hex2, ["kp0", "kp1", "kp2"].map((id) => aktual(ketemu(o5, id)))), "segi enam: susunan kedua (segitiga di atas dan bawah) juga berpojok enam dengan keping yang sama");
  const sama3 = (id) => aktual(ketemu(o, id)).length;
  cek(sama3("kp0") === 4 && Math.abs(luasP(hex) - luasP(aktual(ketemu(o, "kp0"))) - luasP(aktual(ketemu(o, "kp1"))) - luasP(aktual(ketemu(o, "kp2")))) < 1, "segi enam: luas susunan sama dengan jumlah luas tiga keping");
  const ukuran = (p) => luasP(aktual(p));
  cek(Math.abs(ukuran(ketemu(o, "kp1")) - ukuran(ketemu(o, "kp2"))) < 1 && Math.abs(ukuran(ketemu(o, "kp1")) - ukuran(ketemu(o5, "kp1"))) < 1 && Math.abs(ukuran(ketemu(o, "kp0")) - ukuran(ketemu(o5, "kp0"))) < 1, "segi enam: dua segitiga sama besar dan sama pada kedua susunan (kepingnya sama)");
  const rumah = di("luar-susun-terapan");
  cek(aktual(ketemu(rumah, "ht")).length === 5 && [4, 3].join() === ["kp0", "kp1"].map((id) => aktual(ketemu(rumah, id)).length).join(), "rumah: persegi dan segitiga menyusun bangun berpojok lima");
  stat.tiling += 3;
}
{
  // Empat persegi kecil menjadi satu persegi besar (luar-susun).
  const o = di("luar-susun");
  const pcs = [0, 1, 2, 3].map((q) => aktual(ketemu(o, `kp${q}`)));
  const ht = aktual(ketemu(o, "ht"));
  cek(pcs.every((p) => p.length === 4 && Math.abs(luasP(p) - luasP(pcs[0])) < 1) && ht.length === 4 && Math.abs(luasP(ht) - 4 * luasP(pcs[0])) < 1 && menutupi(ht, pcs), "luar susun: empat persegi kecil sama besar menutupi satu persegi besar");
  const hs = /^(\d+) persegi kecil, (\d+) persegi besar$/.exec(isiTeks(o, "hs"));
  sama([+hs[1], +hs[2]], [pcs.length, 1], "luar susun: tulisan hasil sama dengan gambar");
  stat.tiling += 1;
}
{
  // Bangun L dan T: dua keping segi empat dari satu garis; garis mengenai pojok yang menekuk dan sisi seberang.
  for (const [id, ke, nSisi, tulis] of [["luar-urai", 2, 6, "L"], ["luar-urai-terapan", 2, 8, "T"]]) {
    const a = adeganId(id);
    const o = akhirAdegan(a, ke);
    const ut = aktual(ketemu(o, "ut"));
    const g = ketemu(o, "ug0");
    const tepi = (p) => ut.some((q, j) => { const r = ut[(j + 1) % ut.length]; return Math.abs(ccwP(q, r, p)) < 0.3 && p[0] >= Math.min(q[0], r[0]) - 0.2 && p[0] <= Math.max(q[0], r[0]) + 0.2 && p[1] >= Math.min(q[1], r[1]) - 0.2 && p[1] <= Math.max(q[1], r[1]) + 0.2; });
    cek(ut.length === nSisi && tepi([g.x, g.y]) && tepi([g.x + g.x2, g.y + g.y2]), `luar ${tulis}: bangun berpojok ${nSisi} dan garis pembagi menghubungkan dua titik di tepinya`);
    const f = akhirAdegan(a);
    const pcs = polys(f).filter((p) => /^kp\d+$/.test(p.id));
    cek(pcs.length === 2 && pcs.every((p) => dasar(p).length === 4), `luar ${tulis}: terurai menjadi dua keping segi empat`);
    cek(isiTeks(f, "hs") === "2 segi empat", `luar ${tulis}: tulisan hasil 2 segi empat`);
    stat.hitung += 1;
  }
}
function ccwP(p, q, r) {
  return ((q[0] - p[0]) * (r[1] - p[1]) - (q[1] - p[1]) * (r[0] - p[0])) / (jarak(p, q) || 1);
}
{
  // Tangram: tujuh keping pada persegi; lima segitiga (dua besar, satu sedang, dua kecil), satu persegi, satu jajar genjang.
  const a = adeganId("luar-tangram");
  const o = akhirAdegan(a, 0);
  const pcs = polys(o).filter((p) => /^kp\d+$/.test(p.id)).sort((x, y) => Number(x.id.slice(2)) - Number(y.id.slice(2)));
  const pts = pcs.map(aktual);
  sama(pts.map((p) => p.length), [3, 3, 3, 4, 4, 3, 3], "tangram: tujuh keping, lima bertiga pojok dan dua berempat pojok");
  const luas = pts.map(luasP);
  sama(luas.map((l) => Math.round(l)).sort((x, y) => x - y), [400, 400, 800, 800, 800, 1600, 1600], "tangram: luas keping 1, 1, 2, 2, 2, 4, 4 satuan");
  const semua = pts.flat();
  const kotakT = [[Math.min(...semua.map((q) => q[0])), Math.min(...semua.map((q) => q[1]))], [Math.max(...semua.map((q) => q[0])), Math.min(...semua.map((q) => q[1]))], [Math.max(...semua.map((q) => q[0])), Math.max(...semua.map((q) => q[1]))], [Math.min(...semua.map((q) => q[0])), Math.max(...semua.map((q) => q[1]))]];
  cek(Math.abs(luasP(kotakT) - 6400) < 1 && Math.abs(luas.reduce((t, l) => t + l, 0) - 6400) < 1 && menutupi(kotakT, pts), "tangram: tujuh keping menutupi satu persegi 80 x 80 tepat sekali");
  const sisiP = (p) => p.map((q, j) => jarak(q, p[(j + 1) % p.length]));
  const persegiKecil = sisiP(pts[4]);
  cek(persegiKecil.every((s) => Math.abs(s - persegiKecil[0]) < 0.6) && Math.abs(jarak(pts[4][0], pts[4][2]) - jarak(pts[4][1], pts[4][3])) < 0.6, "tangram: keping keempat (bernomor lima) adalah persegi (empat sisi sama dan diagonal sama)");
  const jj = sisiP(pts[3]);
  cek(Math.abs(jj[0] - jj[2]) < 0.6 && Math.abs(jj[1] - jj[3]) < 0.6 && Math.abs(jj[0] - jj[1]) > 5 && Math.abs(jarak(pts[3][0], pts[3][2]) - jarak(pts[3][1], pts[3][3])) > 5, "tangram: keping lainnya jajar genjang (sisi berhadapan sama, bukan persegi)");
  const o4 = akhirAdegan(a, 3);
  const urutKp = ["kp0", "kp1", "kp2", "kp5", "kp6", "kp4", "kp3"];
  const sorotPada = (kata) => urutKp.map((id) => !!ketemu(L.keadaanStory(a, 3, L.posisiKata(a.ketukan[3].suara, kata)), id)?.sorot);
  sama(sorotPada("segitiga,"), [true, true, true, true, true, false, false], "tangram: lima segitiga disorot saat kata segitiga");
  sama(sorotPada("persegi,"), [false, false, false, false, false, true, false], "tangram: persegi kecil disorot saat kata persegi");
  sama(urutKp.map((id) => !!ketemu(o4, id)?.sorot), [false, false, false, false, false, false, true], "tangram: jajar genjang disorot saat kata segi empat yang miring");
  const o5 = akhirAdegan(a);
  const label = ["uk0", "uk1", "uk2", "uk3", "uk4"].map((id) => isiTeks(o5, id));
  sama(label, ["besar", "besar", "sedang", "kecil", "kecil"], "tangram: label ukuran segitiga");
  const kelasLuas = [0, 1, 2, 5, 6].map((i) => Math.round(luas[i]));
  sama(kelasLuas, [1600, 1600, 800, 400, 400], "tangram: besar = dua kali sedang = empat kali kecil");
  sama(isiTeks(o5, "hs"), "5 segitiga + 2 segi empat", "tangram: tulisan hasil");
  cek(pts.filter((p) => p.length === 3).length === 5 && pts.filter((p) => p.length === 4).length === 2, "tangram: lima segitiga dan dua segi empat sama dengan tulisan");
  // Terapan: dua segitiga besar menyusun satu segitiga; tujuh keping menyusun persegi.
  const t = adeganId("luar-tangram-terapan");
  const o2 = akhirAdegan(t, 2);
  const ht = aktual(ketemu(o2, "ht"));
  cek(ht.length === 3 && luasP(ht) === 3200 && menutupi(ht, ["kp0", "kp1"].map((id) => aktual(ketemu(o2, id)))), "tangram terapan: dua segitiga besar menutupi satu segitiga yang lebih besar (3 pojok, luas dua kali)");
  const o4t = akhirAdegan(t, 3);
  const sq = aktual(ketemu(o4t, "ht"));
  const pk = polys(o4t).filter((p) => /^kp\d+$/.test(p.id)).map(aktual);
  cek(sq.length === 4 && pk.length === 7 && Math.abs(luasP(sq) - 6400) < 1 && menutupi(sq, pk), "tangram terapan: tujuh keping menutupi persegi besar");
  stat.tiling += 3;
}
{
  // Pilihan jawaban: kartu yang disorot sama dengan hasil hitung dari gambar, dan kartu lain tidak.
  const opsi = (o) => [1, 2, 3].map((q) => isiTeks(o, `c${q}-t`));
  const pilih = (o) => [1, 2, 3].findIndex((q) => ketemu(o, `c${q}-k`)?.sorot);
  const periksa = (id, ke, ukur, nilai, pesan) => {
    const o = di(id, ke);
    const p = opsi(o);
    const dipilih = pilih(o);
    const betul = p.map((t) => ukur(t, o));
    cek(dipilih >= 0 && betul.filter(Boolean).length === 1 && betul[dipilih], `${id}: ${pesan} (pilihan ${p.join(" | ")}, dipilih ${p[dipilih]})`);
    cek(nilai(o), `${id}: hasil hitung dari gambar mendukung pilihan`);
    stat.pilihan += 1;
  };
  const kepingDi = (o) => polys(o).filter((q) => /^kp\d+$/.test(q.id));
  periksa("latihan-satu", 2, (t, o) => { const m = /^(\d+) (segitiga|segi empat)$/.exec(t); const f = kepingDi(o); return !!m && f.length === +m[1] && f.every((q) => aktual(q).length === (m[2] === "segitiga" ? 3 : 4)); }, (o) => kepingDi(o).length === 2, "tepat satu pilihan sama dengan keping yang terbentuk");
  periksa("latihan-dua", 2, (t, o) => +/^(\d+) keping$/.exec(t)[1] === kepingDi(o).length, (o) => kepingDi(o).length === 4, "tepat satu pilihan sama dengan banyak keping");
  periksa("latihan-tiga", 2, (t, o) => +/^(\d+) segitiga$/.exec(t)[1] === kepingDi(o).length, (o) => kepingDi(o).length === aktual(ketemu(o, "ut")).length - 2, "tepat satu pilihan sama dengan n − 2");
  periksa("latihan-empat", 2, (t, o) => NAMA_KE_N(t) === aktual(ketemu(o, "ht")).length, (o) => aktual(ketemu(o, "ht")).length === 4, "tepat satu pilihan sama dengan pojok hasil susunan");
  periksa("luar-susun-terapan", 3, (t, o) => +/^(\d+) sisi$/.exec(t)[1] === aktual(ketemu(o, "ht")).length, (o) => aktual(ketemu(o, "ht")).length === 5, "tepat satu pilihan sama dengan sisi hasil susunan");
  periksa("luar-urai-terapan", 4, (t, o) => +/^(\d+) keping$/.exec(t)[1] === kepingDi(o).length, (o) => kepingDi(o).length === 2, "tepat satu pilihan sama dengan banyak keping");
  periksa("luar-tangram-terapan", 2, (t, o) => NAMA_KE_N(t) === aktual(ketemu(o, "ht")).length, (o) => aktual(ketemu(o, "ht")).length === 3, "tepat satu pilihan sama dengan pojok hasil susunan");
  // Kartu tidak lagi disorot pada ketukan berikutnya (latihan 1 sampai 4).
  for (const id of ["latihan-satu", "latihan-dua", "latihan-tiga", "latihan-empat"]) cek(pilih(di(id)) === -1, `${id}: sorotan kartu dipadamkan pada ketukan terakhir`);
}
{
  // Kalimat hitung (pengurangan n − 2): di gambar benar, dan kalimat di suara cocok dengan gambar adegannya.
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      const tampak = new Set();
      a.ketukan.forEach((kt, i) => {
        for (let p = 0; p < L.kataDari(kt.suara).length; p += 1) for (const o of L.keadaanStory(a, i, p)) if (o.t === "teks" && o.isi) tampak.add(o.isi);
      });
      a.ketukan.forEach((kt, i) => {
        for (const tx of L.teksTerlihat(akhirAdegan(a, i))) {
          const r = baca(tx);
          if (r) {
            stat.aritmetika += 1;
            cek(benar(r), `${v.id}/${a.id}#${i + 1}: kalimat hitung di gambar benar ("${tx}")`);
          }
        }
        const t = tokoh(kt.suara);
        for (let p = 0; p < t.length; p += 1) {
          const x = bacaAngka(t, p);
          if (!x) continue;
          const q = p + x[1];
          if (t[q] !== "dikurangi" && t[q] !== "ditambah") continue;
          const y = bacaAngka(t, q + 1);
          if (!y) continue;
          const s = q + 1 + y[1];
          if (!(t[s] === "sama" && t[s + 1] === "dengan")) continue;
          const z = bacaAngka(t, s + 2);
          if (!z) continue;
          const op = t[q] === "dikurangi" ? "−" : "+";
          stat.kalimat += 1;
          cek((op === "−" ? x[0] - y[0] : x[0] + y[0]) === z[0], `${v.id}/${a.id}#${i + 1}: kalimat hitung di suara benar (${x[0]} ${op} ${y[0]} = ${z[0]})`);
          cek(tampak.has(`${x[0]} ${op} ${y[0]} = ${z[0]}`), `${v.id}/${a.id}#${i + 1}: kalimat "${x[0]} ${op} ${y[0]} = ${z[0]}" di suara tampak di gambar`);
        }
      });
    }
  }
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
  const DAFTAR = ["Mengurai satu bangun", "Menyusun beberapa bangun", "Pola segitiga"];
  cek(/Halo anak-anak/.test(sap.ketukan[0].suara) && /Mengurai satu bangun/i.test(L.teksTerlihat(akhirAdegan(sap, 1)).join(" | ")), "sapaan materi: tiga hal yang dipelajari tampil");
  sama(L.teksTerlihat(akhirAdegan(sap, 1)).filter((t) => DAFTAR.includes(t)), DAFTAR, "sapaan materi: daftar tiga hal");
  cek(!/\d/.test(sap.ketukan[1].suara) && !/\d/.test(DAFTAR.join(" ")), "sapaan materi: tanpa angka");
  const sapLuar = adegan(U, "sapaan");
  cek(/cara lain/i.test(L.teksTerlihat(akhirAdegan(sapLuar, 1)).join(" | ")) && /metode-luar|Metode luar/.test(sapLuar.sumber), "sapaan metode luar: pengumuman cara lain");
  let sumberRingkas = null;
  try {
    sumberRingkas = JSON.parse(readFileSync(new URL("../src/data/kelas2-bab3-ringkas.json", import.meta.url), "utf8")).subBab?.B;
  } catch {
    sumberRingkas = null;
  }
  const sementara = new URL("../.tmp-k2b3s/B.json", import.meta.url);
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
    // Isi tabel dihitung ulang dari gambar pada video materi: sisi, banyak segitiga (sisi dikurangi dua), banyak garis dari satu pojok (sisi dikurangi tiga).
    sama(T.kolom, ["Sisi", "Segitiga", "Garis"], "tabel susun: kolom sisi, segitiga, garis");
    const tp = akhirAdegan(adegan(M_VIDEO, "pola-tabel"));
    const dariScene = [0, 1, 2, 3].map((r) => ({ nama: isiTeks(tp, `tb-r${r}c0`), n: Number(isiTeks(tp, `tb-r${r}c1`)) }));
    sama(T.baris.map((b) => b.label.toLowerCase()), dariScene.map((d) => d.nama), "tabel susun: bangun tiap baris sama dengan tabel pola pada gambar materi (segitiga, segi empat, segi lima, segi enam)");
    T.baris.forEach((b, q) => {
      const n = dariScene[q].n;
      sama(b.sel, [String(n), String(n - 2), String(Math.max(n - 3, 0))], `tabel susun: baris ${b.label} (sisi ${n}) dihitung ulang`);
    });
    const garisAsli = { lima: adeganId("pola-lima"), enam: adeganId("pola-enam") };
    sama([akhirAdegan(garisAsli.lima).filter((m) => /^ug\d+$/.test(m.id)).length, akhirAdegan(garisAsli.enam).filter((m) => /^ug\d+$/.test(m.id)).length], [Number(T.baris[2].sel[2]), Number(T.baris[3].sel[2])], "tabel susun: banyak garis segi lima dan segi enam sama dengan garis pada gambar");
    cek(T.baris.every((b) => b.sel.every((s) => s.length <= 8)), "tabel susun: sel pendek supaya margin teks >= 5 px di 405 px");
    cek(new Set(T.baris.map((b) => b.label)).size === T.baris.length, "tabel susun: bangun tiap baris berbeda");
    const KATA_LARANG = /buku|halaman|kunci|kerja kelompok|\bkelompok|\bteman|kawan|kelas\b|kertas|pensil|\bbawa\b|menggambar|menulis di|depan kelas|luas|keliling|di rumah|survei|karet gelang|uang tabungan|di sekitar|loker|ibu guru|bersusun|\bkali\b|dibagi|gunting|\bpaku\b/i;
    cek(!KATA_LARANG.test(JSON.stringify({ p: A.petaSusun, t: A.tabelSusun })), "peta dan tabel susun: tanpa kata terlarang dan tanpa kelompok, teman, kelas, buku, kertas, pensil");
    cek(peta.every((s) => ![...s.teks, ...(s.ikon ?? "")].some((c) => c.codePointAt(0) > 0x1fa95)), "peta susun: emoji paling tinggi Emoji 12");
  } else cek(false, "peta dan tabel susun: .tmp-k2b3s/B.json atau kelas2-bab3-ringkas.json subBab.B.petaSusun ada");
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k2b3B-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k2b3B-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k2b3B sendiri (${impor.join(", ")})`);
  }
  // Emoji dalam data teks gambar juga paling tinggi Emoji 12 (diperiksa pada gambar yang diputar).
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d), `${v.id}/${a.id}: emoji gambar paling tinggi Emoji 12`);
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k2b3b.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|naskah-k1b|naskah-k2b3|data-k2b3|video-k2b3-umum/.test(pembungkus) && /VIDEO_MATERI_K2B3B/.test(pembungkus) && /VIDEO_LUAR_K2B3B/.test(pembungkus) && /export function VideoK2B3B/.test(pembungkus) && /daftar-video-cerita/.test(pembungkus), "video-k2b3b.tsx: dua video dari mesin Story, tanpa naskah lama");
  cek(!/\r/.test(pembungkus), "video-k2b3b.tsx: akhir baris LF");
  const sendiri = readFileSync(new URL("uji-story-k2b3B.mjs", import.meta.url), "utf8");
  cek(!/\r/.test(sendiri), "uji-story-k2b3B.mjs: akhir baris LF");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit diputar)`);
}
console.log(`Pemeriksaan: ${stat.poligon} bangun diperiksa, ${stat.sisi} penanda sisi, ${stat.tiling} penutupan bangun oleh keping, ${stat.hitung} tulisan hasil, ${stat.pola} pola segitiga, ${stat.pilihan} pilihan jawaban, ${stat.aritmetika} kalimat hitung di gambar, ${stat.kalimat} kalimat hitung di suara, ${jumlahNama} nama bilangan tampak sebagai angka`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
