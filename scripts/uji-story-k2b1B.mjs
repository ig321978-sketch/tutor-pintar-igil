// Uji Story Kelas 2 Bab 1 Sub-Bab B (Nilai Tempat): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Video diputar bergaya guru: suara, teks terlihat, sumber, judul adegan, dan subjudul tanpa penyebutan buku (kata terlarang diperiksa pada adegan yang diputar).
// Memeriksa: pemicu kata, suara tanpa digit, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas, teks bertumpuk, pemisahan materi dan metode luar (nama metode hanya Indonesia),
// hanya bilangan sampai lima puluh (tanpa kali, bagi, tambah, kurang, bersusun), hitungan satu per satu dan loncat sepuluh (angka berurutan, dekat bendanya, sama dengan bilangan yang diucapkan),
// nama bilangan sepuluh sampai lima puluh yang diucapkan tampak sebagai angka, data di layar dihitung ulang dari gambar (kubus satuan 10 x 10 dan batang puluhan 100 x 10 bersekat sepuluh ruas,
// n = 10 kali batang ditambah kubus, tabel nilai tempat: angka kolom sama dengan banyak batang dan kubus di kolomnya, nilai angka menurut letak, tukar sepuluh satuan dengan satu puluhan tanpa mengubah nilai,
// garis bilangan puluhan: loncatan besar dan kecil, kartu tumpuk: kartu puluhan ditutup kartu satuan), setiap kalimat bilangan di suara
// ("n adalah p puluhan dan s satuan", "angka d di tempat puluhan bernilai ...", "ada N batang", "N lompatan besar") dicocokkan dengan gambar, pilihan jawaban,
// aturan pemilik (belajar mandiri digital: tanpa kerja kelompok, survei teman, depan kelas, buku, menulis atau menggambar di buku, membawa benda nyata),
// emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k2b1B.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k2b1B-video.ts");
const U1 = await import("../src/components/modul/story/k2b1B-luar-1.ts");
const B = await import("../src/components/modul/story/k2b1B-bantu.ts");

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
const VIDEO = [V.VIDEO_MATERI_K2B1B, V.VIDEO_LUAR_K2B1B];
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
const M_VIDEO = V.VIDEO_MATERI_K2B1B;
const U = V.VIDEO_LUAR_K2B1B;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const NAMA_LUAR = /Balok Dienes|Kartu Tumpuk|Garis Bilangan Puluhan|metode luar|metode dari luar/i;
const NAMA_INGGRIS = /Base[- ]ten|Place value|Regrouping|Number line|Golden bead|Dienes blocks|Hundreds chart/i;
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M_VIDEO);
  const luar = teksVideo(U);
  cek(!NAMA_LUAR.test(materi), "video materi tidak memuat nama metode luar (Balok Dienes, Kartu Tumpuk, Garis Bilangan Puluhan)");
  for (const m of U1.NAMA_METODE_ID) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE_ID, ["Balok Dienes", "Kartu Tumpuk", "Garis Bilangan Puluhan"], "nama Indonesia metode luar");
  cek(!NAMA_INGGRIS.test(materi) && !NAMA_INGGRIS.test(luar), "nama metode hanya bahasa Indonesia (tanpa Base-ten blocks, Place value cards, Number line)");
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
      cek(!/\b(Tika|Paman|Ibu|Ayah|Bapak|Budi|Ani|Doni|Sinta|Dewi|Rudi|Nina|Andi|Siti|Zoltan|Maria|Montessori)\b/.test(semua.join(" | ")), `${v.id}/${a.id}: hanya enam tokoh tetap`);
    }
  }
  cek(M_VIDEO.subjudul === "Materi kurikulum" && U.subjudul === "Tiga metode luar", "subjudul video: Materi kurikulum dan Tiga metode luar");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 46), "video materi: label sumber berbentuk Materi: ... dan pendek");
  cek(U.adegan.every((a) => /Metode luar|Ringkasan/i.test(a.sumber) && a.sumber.length <= 46), "video metode luar: label sumber metode luar atau ringkasan, pendek");
  cek(M_VIDEO.id === "k2b1B-materi" && U.id === "k2b1B-luar", "id video k2b1B-materi dan k2b1B-luar");
  cek(U.judul.endsWith(": Metode dari Luar") && !/menurut/i.test(M_VIDEO.judul), "judul video: materi tanpa 'menurut', luar berakhir ': Metode dari Luar'");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,kubus-berserakan,satu-puluhan,tabel-nilai-tempat,dua-puluh-delapan,hitung-sepuluh,nilai-letak,baca-puluhan-satuan,cara-satu,cara-dua,cara-ringkas,tukar-sepuluh,paling-ringkas,latihan-satu,latihan-dua,latihan-tiga,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-dienes,luar-dienes-terapan,luar-kartu,luar-kartu-terapan,luar-garis,luar-garis-terapan,luar-ringkas", "urutan adegan metode luar");
  cek(M_VIDEO.adegan[0].id === "sapaan" && U.adegan[0].id === "sapaan", "tiap video dibuka adegan sapaan");
  cek(M_VIDEO.adegan.filter((a) => /^latihan-/.test(a.id)).length === 3 && M_VIDEO.adegan[M_VIDEO.adegan.length - 1].id === "penutup", "video materi: Latihan 1 sampai 3 lalu penutup");
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-dienes", "luar-dienes-terapan", "luar-kartu", "luar-kartu-terapan", "luar-garis", "luar-garis-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(U.adegan[1].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  for (const kata of ["Latihan", "Igil", "Malosi", "Halim", "Kira", "Wei", "Upe", "nilai tempat", "puluhan", "satuan", "kubus", "batang", "tabel nilai tempat", "kolom", "angka di kiri", "angka di kanan", "ditukar", "nilainya tetap", "paling ringkas", "kurang dari sepuluh", "bernilai", "letak"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  // Hanya bilangan sampai lima puluh dan satuan tidak baku di layar: tanpa kali, bagi, tambah, kurang, bilangan lebih dari dua puluh, bersusun, satuan baku (penggaris, sentimeter, meter), atau rumus.
  const BOCOR = /dikali|perkalian|pembagian|dibagi|ditambah|dikurangi|\bratus\b|\bribu\b|lima puluh (satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan)|(enam|tujuh|delapan|sembilan) puluh|\bluas\b|keliling|rumus|volume|sentimeter|centimeter|\bcm\b|\bmeter\b|penggaris|bersusun|meminjam|pinjam|menyimpan|simpan|×|÷|−/i;
  for (const v of [M_VIDEO, U]) {
    for (const a of v.adegan) cek(!BOCOR.test(teksAdegan(a)), `${v.id}/${a.id}: hanya bilangan sampai lima puluh (tanpa kali, bagi, tambah, kurang, bersusun, satuan baku, bilangan lebih dari lima puluh, rumus)`);
    for (const a of v.adegan) for (const i of a.ketukan.keys()) for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) for (const b of bilanganDari(t)) cek(Number(b) <= 50, `${v.id}/${a.id}#${i + 1}: angka di gambar paling besar lima puluh ("${t}")`);
  }
  cek(totalKetukan >= 70 && M_VIDEO.adegan.reduce((t, ad) => t + ad.ketukan.length, 0) >= 70, `total ketukan cukup dalam (${totalKetukan}; materi ${M_VIDEO.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)})`);
  // Durasi materi diputar 8 sampai 13 menit (dua kata per detik, sapaan termasuk).
  const kataMateri = kataVideo(M_VIDEO);
  cek(kataMateri / 120 >= 8 && kataMateri / 120 <= 13, `durasi materi diputar 8 sampai 13 menit (${(kataMateri / 120).toFixed(1)} menit)`);
  cek(kataVideo(U) / 120 >= 3, `durasi video luar paling sedikit 3 menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
}

/* ------------------------------ Nama bilangan 10 sampai 50 yang diucapkan tampak sebagai angka ------------------------------ */
const NAMA = B.NAMA_BILANGAN;
const tokoh = (s) => {
  const w = s.toLowerCase().split(/\s+/).filter(Boolean);
  const out = w.map((x) => x.replace(/[^a-z]/g, ""));
  out.batas = new Set(w.map((x, i) => (/[,.;:!?]$/.test(x) ? i : -1)).filter((i) => i >= 0));
  return out;
};
/** Nama bilangan 1 sampai 50 yang dimulai pada token `p`: [nilai, panjang] atau null (nama dua kata didahulukan). */
const bacaAngka = (t, p) => {
  for (let n = 50; n >= 1; n -= 1) {
    const pc = NAMA[n].split(" ");
    if (pc.every((c, q) => t[p + q] === c && (q === pc.length - 1 || !t.batas.has(p + q)))) return [n, pc.length];
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
const NAMA_METODE_SUARA = /balok dienes|kartu tumpuk|garis bilangan puluhan/gi;
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
/* ------------------------------ Hitungan, benda, dan bingkai dihitung ulang dari gambar ------------------------------ */
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
const pusatObj = (b) => (b.t === "kotak" ? { x: b.x + b.w / 2, y: b.y + b.h / 2 } : b.t === "garis" ? { x: b.x + (b.x2 ?? 0) / 2, y: b.y + (b.y2 ?? 0) / 2 } : { x: b.x, y: b.y });
const daftarId = (objs, pola) => objs.filter((o) => pola.test(o.id));
const di = (id, ke) => {
  const a = adegan(M_VIDEO, id) ?? adegan(U, id);
  return akhirAdegan(a, ke);
};
const stat = { hitung: 0, aritmetika: 0, benda: 0 };
const labelAngka = (objs, p) => objs.filter((o) => o.t === "teks" && new RegExp(`^${p}n\\d+$`).test(o.id) && /^\d+$/.test(o.isi ?? "")).sort((m, n) => Number(m.id.slice(p.length + 1)) - Number(n.id.slice(p.length + 1)));

{
  // 1) Semua deret angka hitungan `${p}n{i}`: nilai berurutan, dekat bendanya, dan yang baru muncul sama banyak dengan bilangan berurutan yang diucapkan.
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((kt, i) => {
        const objs = akhirAdegan(a, i);
        const sebelum = i > 0 ? akhirAdegan(a, i - 1) : [];
        const awalan = new Set(objs.filter((o) => o.t === "teks" && /^\d+$/.test(o.isi ?? "")).map((o) => /^([a-z]+)n\d+$/.exec(o.id)?.[1]).filter(Boolean));
        for (const p of awalan) {
          const label = labelAngka(objs, p);
          if (label.length === 0) continue;
          stat.hitung += 1;
          const nama = `${v.id}/${a.id}#${i + 1} hitungan ${p}`;
          const indeks = label.map((lb) => Number(lb.id.slice(p.length + 1)));
          cek(indeks.every((n, q) => n === indeks[0] + q), `${nama}: nomor benda berurutan`);
          const nilai = label.map((lb) => Number(lb.isi));
          cek(nilai.every((n, q) => n === nilai[0] + q) && nilai[0] >= 1, `${nama}: angka hitungan berurutan (${nilai.join(",")})`);
          label.forEach((lb) => {
            const b = ketemu(objs, `${p}${lb.id.slice(p.length + 1)}`);
            cek(b && Math.hypot(pusatObj(b).x - lb.x, pusatObj(b).y - lb.y) < 30, `${nama}: angka ${lb.isi} dekat bendanya`);
          });
          const baru = label.filter((lb) => !sebelum.some((o) => o.id === lb.id));
          if (baru.length) cek(rantaiTerpanjang(kt.suara, Number(baru[0].isi)) === baru.length, `${nama}: ${baru.length} angka baru dari ${baru[0].isi} sama dengan banyak bilangan berurutan yang diucapkan (${rantaiTerpanjang(kt.suara, Number(baru[0].isi))})`);
        }
      });
    }
  }

  // 2) Tanpa kalimat hitung (tambah, kurang, kali, bagi) dan tanpa lambang hitung di gambar; yang dihitung hanya ukuran dan perbandingan.
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((kt, i) => {
        const nm = `${v.id}/${a.id}#${i + 1}`;
        cek(!/ditambah|dikurangi|dikali|dibagi|sama dengan/i.test(kt.suara), `${nm}: suara tanpa kalimat hitung (tambah, kurang, kali, bagi)`);
        cek(!/\b(enam|tujuh|delapan|sembilan) puluh\b|\blima puluh (satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan)\b/i.test(kt.suara), `${nm}: suara tanpa bilangan lebih dari lima puluh`);
        for (const t of L.teksTerlihat(akhirAdegan(a, i))) cek(!/\d\s*[+\-−×÷=]\s*\d/.test(t), `${nm} gambar: "${t}" tanpa lambang hitung`);
      });
    }
  }

  // 3) Nilai tempat di layar: kubus satuan, batang puluhan, tabel nilai tempat, garis bilangan puluhan, kartu tumpuk; semua dihitung ulang dari gambar.
  const NBsemua = NAMA.map((n) => n)
    .sort((p, q) => q.length - p.length)
    .join("|");
  const nilaiNB = (s) => NAMA.indexOf(s);
  const B0 = "(?<![a-z])";
  const kelompok = (objs) => {
    const m = new Map();
    const g = (key) => {
      if (!m.has(key)) m.set(key, { key, rods: [], cubes: [], sekat: [] });
      return m.get(key);
    };
    for (const o of objs) {
      let r;
      if (o.t === "kotak" && (r = /^bp([a-z])(\d+)$/.exec(o.id))) g(r[1]).rods.push({ i: Number(r[2]), o });
      else if (o.t === "kotak" && (r = /^bs([a-z])(\d+)$/.exec(o.id))) g(r[1]).cubes.push({ i: Number(r[2]), o });
      else if (o.t === "jalur" && (r = /^bq([a-z])(\d+)$/.exec(o.id))) g(r[1]).sekat.push({ i: Number(r[2]), o });
    }
    return m;
  };
  const angka = (objs, id) => {
    const o = objs.find((q) => q.id === id && q.t === "teks");
    return o && /^\d+$/.test(o.isi ?? "") ? Number(o.isi) : null;
  };
  const tumpang = (a, b) => a.x < b.x + b.w - 0.5 && b.x < a.x + a.w - 0.5 && a.y < b.y + b.h - 0.5 && b.y < a.y + a.h - 0.5;
  const xGB = (n) => 20 + 5.2 * n;
  const xGK = (n, dasar) => 30 + 24 * (n - dasar);
  const dekat = (p, q) => Math.abs(p - q) < 1e-6;
  const stat3 = { kelompok: 0, tabel: 0, garis: 0, kartu: 0, kalimat: 0, puluhan: 0 };

  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((kt, i) => {
        const objs = akhirAdegan(a, i);
        const nm = `${v.id}/${a.id}#${i + 1}`;
        const akhirAd = i === a.ketukan.length - 1;
        const kel = kelompok(objs);
        const semuaKotak = [];
        for (const g of kel.values()) {
          stat3.kelompok += 1;
          const p = g.rods.length;
          const s = g.cubes.length;
          semuaKotak.push(...g.rods.map((x) => x.o), ...g.cubes.map((x) => x.o));
          cek(new Set(g.cubes.map((c) => c.i)).size === s && new Set(g.rods.map((c) => c.i)).size === p, `${nm} kelompok ${g.key}: nomor kubus dan batang unik`);
          cek(g.rods.every((r) => r.o.w === 100 && r.o.h === 10) && g.cubes.every((c) => c.o.w === 10 && c.o.h === 10), `${nm} kelompok ${g.key}: batang 100 x 10 (sepuluh ruas) dan kubus 10 x 10`);
          cek(g.sekat.length === p && g.rods.every((r) => g.sekat.some((q) => q.i === r.i && q.o.x === r.o.x && q.o.y === r.o.y)), `${nm} kelompok ${g.key}: tiap batang punya sekat sepuluh ruas`);
          cek(10 * p + s <= 50, `${nm} kelompok ${g.key}: nilai ${10 * p + s} paling besar lima puluh`);
          const n = angka(objs, `n-${g.key}`);
          if (n !== null) cek(n === 10 * p + s, `${nm} kelompok ${g.key}: label bilangan ${n} sama dengan ${p} batang dan ${s} kubus (${10 * p + s})`);
        }
        for (let m1 = 0; m1 < semuaKotak.length; m1 += 1) for (let m2 = m1 + 1; m2 < semuaKotak.length; m2 += 1) if (tumpang(semuaKotak[m1], semuaKotak[m2])) cek(false, `${nm}: ${semuaKotak[m1].id} menimpa ${semuaKotak[m2].id}`);
        cek(semuaKotak.length <= 50, `${nm}: gambar kubus dan batang paling banyak lima puluh (${semuaKotak.length})`);
        const labelN = objs.filter((o) => o.t === "teks" && /^n-([a-z])$/.test(o.id));
        for (const ln of labelN) cek(kel.has(ln.id.slice(2)), `${nm}: label bilangan ${ln.id} punya kubus atau batang`);

        // Tabel nilai tempat.
        for (const hp of objs.filter((o) => o.t === "teks" && /^t[a-z]-hp$/.test(o.id))) {
          const key = hp.id[1];
          stat3.tabel += 1;
          const g = kel.get(key);
          const p = g?.rods.length ?? 0;
          const s = g?.cubes.length ?? 0;
          const dp = angka(objs, `t${key}-p`);
          const ds = angka(objs, `t${key}-s`);
          const dn = angka(objs, `t${key}-n`);
          cek(isiTeks(objs, `t${key}-hp`) === "Puluhan" && isiTeks(objs, `t${key}-hs`) === "Satuan", `${nm} tabel ${key}: kepala Puluhan (kiri) dan Satuan (kanan)`);
          cek(ketemu(objs, `t${key}-hp`).x < ketemu(objs, `t${key}-hs`).x, `${nm} tabel ${key}: puluhan di kiri, satuan di kanan`);
          if (dp !== null && ds !== null && p + s > 0) cek(dp === p && ds === s, `${nm} tabel ${key}: angka kolom ${dp} dan ${ds} sama dengan ${p} batang dan ${s} kubus`);
          if (dn !== null) cek(dp !== null && ds !== null && dn === 10 * dp + ds, `${nm} tabel ${key}: bilangan ${dn} sama dengan ${dp} puluhan dan ${ds} satuan`);
          const vp = angka(objs, `t${key}-vp`);
          const vs = angka(objs, `t${key}-vs`);
          if (vp !== null) cek(dp !== null && vp === 10 * dp, `${nm} tabel ${key}: nilai angka puluhan ${vp} sama dengan sepuluh kali ${dp}`);
          if (vs !== null) cek(ds !== null && vs === ds, `${nm} tabel ${key}: nilai angka satuan ${vs} sama dengan ${ds}`);
          const bk = ketemu(objs, `t${key}-bk`);
          const bk2 = ketemu(objs, `t${key}-bk2`);
          if (bk && bk2 && g) {
            cek(g.rods.every((r) => r.o.x >= bk.x && r.o.x + r.o.w <= bk.x + bk.w && r.o.y >= bk.y && r.o.y + r.o.h <= bk.y + bk.h), `${nm} tabel ${key}: batang di dalam kolom puluhan`);
            cek(g.cubes.every((c) => c.o.x >= bk2.x && c.o.x + c.o.w <= bk2.x + bk2.w && c.o.y >= bk2.y && c.o.y + c.o.h <= bk2.y + bk2.h), `${nm} tabel ${key}: kubus di dalam kolom satuan`);
          }
        }

        // Loncat sepuluh: angka kelipatan sepuluh di samping batang (pl-{huruf}{i}).
        {
          const pls = objs.filter((o) => o.t === "teks" && /^pl-[a-z]\d+$/.test(o.id)).sort((p1, q1) => Number(p1.id.slice(4)) - Number(q1.id.slice(4)));
          if (pls.length) {
            stat3.puluhan += 1;
            const key = pls[0].id[3];
            cek(pls.every((o, q) => o.id === `pl-${key}${q}` && Number(o.isi) === (q + 1) * 10), `${nm}: angka loncat sepuluh 10, 20, 30 berurutan (${pls.map((o) => o.isi).join(",")})`);
            cek(pls.length <= (kel.get(key)?.rods.length ?? 0), `${nm}: angka loncat sepuluh tidak lebih banyak dari batang`);
            for (const o of pls) {
              const r = ketemu(objs, `bp${key}${o.id.slice(4)}`);
              cek(r && Math.abs(o.y - (r.y + 9)) < 6 && o.x > r.x + r.w, `${nm}: angka ${o.isi} dekat batangnya`);
            }
            const sebelum = i > 0 ? akhirAdegan(a, i - 1) : [];
            const baru = pls.filter((o) => !sebelum.some((q) => q.id === o.id));
            if (baru.length) {
              const t = tokoh(kt.suara);
              let kursor = 0;
              let ok = true;
              for (const o of baru) {
                const pc = NAMA[Number(o.isi)].split(" ");
                let ketemuP = -1;
                for (let q = kursor; q + pc.length <= t.length; q += 1) if (pc.every((c, w) => t[q + w] === c)) { ketemuP = q; break; }
                if (ketemuP < 0) ok = false;
                else kursor = ketemuP + pc.length;
              }
              cek(ok, `${nm}: angka baru ${baru.map((o) => o.isi).join(",")} sama dengan kelipatan sepuluh yang diucapkan berurutan`);
            }
          }
        }

        // Garis bilangan puluhan: loncatan besar (puluhan) dan kecil (satuan), penanda, dan target.
        if (objs.some((o) => o.id === "gb-g")) {
          stat3.garis += 1;
          const hp = objs.filter((o) => /^gb-hp\d+$/.test(o.id)).sort((p1, q1) => Number(p1.id.slice(5)) - Number(q1.id.slice(5)));
          const hs = objs.filter((o) => /^gb-hs\d+$/.test(o.id)).sort((p1, q1) => Number(p1.id.slice(5)) - Number(q1.id.slice(5)));
          cek(hp.every((o, q) => o.id === `gb-hp${q}` && o.t === "panah" && dekat(o.x, xGB(10 * q) + 3) && dekat(o.x2, xGB(10) - xGB(0) - 6) && o.y2 === 0), `${nm}: loncatan besar berurutan, tiap lompatan sepanjang sepuluh`);
          cek(objs.filter((o) => /^gb-q\d+$/.test(o.id)).every((o) => dekat(o.x, xGB(Number(o.id.slice(4))))), `${nm}: garis bagi garis bilangan 0 sampai 50 rata`);
          cek(objs.filter((o) => /^gb-l\d+$/.test(o.id)).every((o) => o.isi === o.id.slice(4) && dekat(o.x, xGB(Number(o.isi)))), `${nm}: angka garis bilangan sama dengan letaknya`);
          const tanda = ketemu(objs, "gb-tanda");
          if (tanda) cek(dekat(tanda.x, xGB(10 * hp.length)), `${nm}: penanda di ${10 * hp.length} setelah ${hp.length} loncatan besar`);
          const zl = objs.filter((o) => /^gk-l\d+$/.test(o.id));
          if (zl.length) {
            const nz = zl.map((o) => Number(o.isi));
            const dasar = Math.min(...nz);
            cek(nz.length === 11 && Math.max(...nz) === dasar + 10 && dasar === 10 * hp.length, `${nm}: garis perbesaran sepuluh bilangan mulai dari ${10 * hp.length} (hasil loncatan besar), dasar ${dasar}`);
            cek(zl.every((o) => dekat(o.x, xGK(Number(o.isi), dasar))), `${nm}: angka garis perbesaran rata`);
            cek(hs.every((o, q) => o.id === `gb-hs${q}` && o.t === "panah" && dekat(o.x, xGK(dasar + q, dasar) + 3) && dekat(o.x2, 18)), `${nm}: loncatan kecil berurutan, tiap lompatan sepanjang satu`);
            const tz = ketemu(objs, "gk-tanda");
            if (tz) cek(dekat(tz.x, xGK(dasar + hs.length, dasar)), `${nm}: penanda perbesaran di ${dasar + hs.length}`);
          } else cek(hs.length === 0, `${nm}: loncatan kecil hanya pada garis perbesaran`);
          const tg = ketemu(objs, "gb-tg");
          if (tg && akhirAd) {
            const mt = /^cari (\d+)$/.exec(tg.isi);
            cek(!!mt && Number(mt[1]) === 10 * hp.length + hs.length, `${nm}: target ${tg.isi} sama dengan ${hp.length} loncatan besar dan ${hs.length} loncatan kecil`);
          }
          for (const mm of kt.suara.toLowerCase().matchAll(new RegExp(`${B0}(${NBsemua}) lompatan (besar|kecil)(?![a-z])`, "g"))) {
            stat3.kalimat += 1;
            cek(nilaiNB(mm[1]) === (mm[2] === "besar" ? hp.length : hs.length), `${nm}: "${mm[1]} lompatan ${mm[2]}" benar (gambar ${mm[2] === "besar" ? hp.length : hs.length})`);
          }
        }

        // Kartu tumpuk: kartu puluhan (angka puluhan dan nol) ditutup kartu satuan.
        {
          const kts = ketemu(objs, "kt-k");
          for (const o of objs.filter((q) => q.t === "teks" && /^kp\d-t$/.test(q.id))) cek(Number(o.isi) === (Number(o.id[2]) + 1) * 10, `${nm}: kartu puluhan ${o.id} bernilai kelipatan sepuluh urut (${o.isi})`);
          for (const o of objs.filter((q) => q.t === "teks" && /^ks\d-t$/.test(q.id))) cek(Number(o.isi) === Number(o.id[2]) + 1, `${nm}: kartu satuan ${o.id} bernilai ${Number(o.id[2]) + 1} (${o.isi})`);
          if (kts) {
            stat3.kartu += 1;
            const dP = objs.find((o) => o.t === "teks" && /^kt-[1-9]$/.test(o.id));
            const ku = ketemu(objs, "ku-k");
            const dS = objs.find((o) => o.t === "teks" && /^ku-\d$/.test(o.id));
            const nol = ketemu(objs, "kt-0");
            cek(dP && dP.isi === dP.id.slice(3) && nol && nol.isi === "0" && nol.x > dP.x, `${nm}: kartu puluhan berisi angka puluhan lalu nol`);
            if (ku && dS) {
              cek(dS.isi === dS.id.slice(3), `${nm}: kartu satuan berisi satu angka`);
              const tumpuk = ku.x === 150 && ku.y === kts.y;
              cek(tumpuk === ((nol.op ?? 1) === 0), `${nm}: nol tertutup tepat ketika kartu satuan ditumpuk`);
              cek(!tumpuk || (dekat(dS.x, ku.x + 25) && dekat(dS.y, ku.y + 36) && nol.x >= ku.x && nol.x <= ku.x + ku.w), `${nm}: kartu satuan menutup angka nol`);
              const kn = angka(objs, "kn");
              if (kn !== null) cek(tumpuk && kn === 10 * Number(dP.isi) + Number(dS.isi), `${nm}: bilangan ${kn} sama dengan kartu ${dP.isi}0 ditutup kartu ${dS.isi}`);
              const tg = objs.find((o) => o.id === "tg");
              if (tg) cek(tg.isi === `target: ${10 * Number(dP.isi) + Number(dS.isi)}`, `${nm}: target ${tg.isi} sama dengan kartu`);
              if (akhirAd) cek(tumpuk, `${nm}: di akhir adegan kartu satuan sudah menutup nol`);
            }
          }
        }

        // Kalimat bilangan di suara dihitung ulang dari gambar yang tampil selama ketukan.
        const kata = L.kataDari(kt.suara);
        const statesP = Array.from({ length: kata.length }, (_, p) => kelompok(L.keadaanStory(a, i, p)));
        const kalimat = kt.suara.toLowerCase().split(/(?<=[.!?])\s+/);
        for (const kal of kalimat) {
          for (const mm of kal.matchAll(new RegExp(`${B0}(${NBsemua}) adalah (${NBsemua}) puluhan dan (${NBsemua}) satuan`, "g"))) {
            stat3.kalimat += 1;
            cek(nilaiNB(mm[1]) === 10 * nilaiNB(mm[2]) + nilaiNB(mm[3]), `${nm}: "${mm[1]} adalah ${mm[2]} puluhan dan ${mm[3]} satuan" benar`);
          }
          for (const mm of kal.matchAll(new RegExp(`${B0}(${NBsemua}) puluhan dan (${NBsemua}) satuan (?:adalah|dibaca|berarti|yaitu|membentuk) (${NBsemua})(?![a-z])`, "g"))) {
            stat3.kalimat += 1;
            cek(10 * nilaiNB(mm[1]) + nilaiNB(mm[2]) === nilaiNB(mm[3]), `${nm}: "${mm[1]} puluhan dan ${mm[2]} satuan ... ${mm[3]}" benar`);
          }
          for (const mm of kal.matchAll(new RegExp(`${B0}angka (${NBsemua}) di (?:tempat )?(puluhan|satuan) bernilai (${NBsemua})(?![a-z])`, "g"))) {
            stat3.kalimat += 1;
            const d = nilaiNB(mm[1]);
            cek(nilaiNB(mm[3]) === d * (mm[2] === "puluhan" ? 10 : 1), `${nm}: "angka ${mm[1]} di tempat ${mm[2]} bernilai ${mm[3]}" benar`);
            const idk = mm[2] === "puluhan" ? "p" : "s";
            cek(objs.some((o) => new RegExp(`^t[a-z]-${idk}$`).test(o.id) && Number(o.isi) === d), `${nm}: angka ${d} ada di kolom ${mm[2]} pada tabel`);
          }
          for (const mm of kal.matchAll(new RegExp(`(?:^|[\\s,])(?:ada|dan) (${NBsemua}) (batang|kubus)(?![a-z])`, "g"))) {
            stat3.kalimat += 1;
            const N = nilaiNB(mm[1]);
            cek(statesP.some((st) => [...st.values()].some((g) => (mm[2] === "batang" ? g.rods.length : g.cubes.length) === N)), `${nm}: "${mm[1]} ${mm[2]}" sama dengan yang tergambar`);
          }
        }
      });
    }
  }
  cek(stat3.kalimat >= 25, `kalimat bilangan dihitung ulang cukup banyak (${stat3.kalimat})`);
  cek(stat3.kelompok >= 80 && stat3.tabel >= 30 && stat3.garis >= 8 && stat3.kartu >= 8 && stat3.puluhan >= 3, `kelompok, tabel, garis bilangan, kartu, dan loncat sepuluh diperiksa cukup banyak (${stat3.kelompok}, ${stat3.tabel}, ${stat3.garis}, ${stat3.kartu}, ${stat3.puluhan})`);
  stat.aritmetika += stat3.kalimat;
  stat.benda += stat3.kelompok + stat3.tabel + stat3.garis + stat3.kartu + stat3.puluhan;

  // 4) Pemeriksaan isi tiap adegan (angka tepat, urutan, pilihan jawaban, dihitung ulang dari gambar).
  {
    const grp = (objs, key) => {
      const g = kelompok(objs).get(key);
      return g ? [g.rods.length, g.cubes.length] : [0, 0];
    };
    const pil = (objs) => [1, 2, 3].map((q) => ({ t: isiTeks(objs, `c${q}-t`), s: ketemu(objs, `c${q}-k`)?.sorot })).filter((c) => c.t !== undefined);
    const dipilih = (objs) => pil(objs).filter((c) => c.s).map((c) => c.t);
    const sorotKubus = (objs, key) => objs.filter((o) => new RegExp(`^bs${key}\\d+$`).test(o.id) && o.sorot).length;
    const digit = (objs, tk) => [isiTeks(objs, `t${tk}-p`), isiTeks(objs, `t${tk}-s`), isiTeks(objs, `t${tk}-n`)];
    const nilaiKartu = (t) => {
      const m = /^(\d+) puluhan dan (\d+) satuan$/.exec(t);
      return m ? [10 * Number(m[1]) + Number(m[2]), Number(m[2])] : null;
    };
    // Kubus Malosi: empat belas berserakan.
    const bs = di("kubus-berserakan", 0);
    sama(grp(bs, "a"), [0, 14], "kubus berserakan: empat belas kubus lepas");
    sama(labelAngka(di("kubus-berserakan", 2), "bsa").map((o) => Number(o.isi)), Array.from({ length: 14 }, (_, q) => q + 1), "kubus berserakan: hitung satu per satu 1 sampai 14");
    sama(isiTeks(di("kubus-berserakan", 3), "n-a"), "14", "kubus berserakan: banyaknya empat belas");
    // Satu puluhan dan empat satuan.
    const sp1 = di("satu-puluhan", 0);
    const baris1 = sp1.filter((o) => /^bsa\d+$/.test(o.id) && o.y === 62);
    sama([grp(sp1, "a"), baris1.length, baris1.every((o, q) => o.x === 60 + q * 10)], [[0, 14], 10, true], "satu puluhan: sepuluh kubus dalam satu baris rapat, empat di baris kedua");
    const sp2 = di("satu-puluhan", 1);
    sama(grp(sp2, "a"), [1, 4], "satu puluhan: sepuluh kubus menjadi satu batang, sisa empat kubus");
    sama([ketemu(sp2, "bpa0").x, ketemu(sp2, "bpa0").y], [60, 62], "satu puluhan: batang menggantikan baris sepuluh kubus di tempat yang sama");
    sama(sorotKubus(di("satu-puluhan", 3), "a"), 4, "satu puluhan: empat kubus sisa disorot sebagai satuan");
    sama(isiTeks(di("satu-puluhan", 5), "n-a"), "14", "satu puluhan: empat belas");
    // Tabel nilai tempat dan bilangan Kira.
    const tn = di("tabel-nilai-tempat", 5);
    sama([grp(tn, "a"), digit(tn, "a")], [[1, 4], ["1", "4", "14"]], "tabel nilai tempat: satu batang, empat kubus; angka 1 dan 4; empat belas");
    const dd = di("dua-puluh-delapan", 5);
    sama([grp(dd, "a"), digit(dd, "a")], [[2, 8], ["2", "8", "28"]], "dua puluh delapan: dua batang, delapan kubus; angka 2 dan 8");
    // Loncat sepuluh: tiga batang, empat kubus, 10 20 30 lalu 31 sampai 34.
    const hs2 = di("hitung-sepuluh", 1);
    sama([grp(hs2, "a"), hs2.filter((o) => /^pl-a\d$/.test(o.id)).map((o) => o.isi)], [[3, 4], ["10", "20", "30"]], "hitung sepuluh: tiga batang, empat kubus; 10, 20, 30");
    sama(labelAngka(di("hitung-sepuluh", 2), "bsa").map((o) => Number(o.isi)), [31, 32, 33, 34], "hitung sepuluh: kubus dihitung 31 sampai 34");
    sama(isiTeks(di("hitung-sepuluh", 3), "n-a"), "34", "hitung sepuluh: tiga puluh empat");
    // Nilai angka menurut letak: 24 lalu 42.
    const nl1 = di("nilai-letak", 0);
    sama([grp(nl1, "a"), digit(nl1, "a")], [[2, 4], ["2", "4", "24"]], "nilai letak: dua puluh empat = 2 batang 4 kubus");
    const nl3 = di("nilai-letak", 2);
    sama([isiTeks(nl3, "ta-vp"), isiTeks(nl3, "ta-vs")], ["20", "4"], "nilai letak: angka 2 bernilai 20, angka 4 bernilai 4");
    const nl4 = di("nilai-letak", 4);
    sama([grp(nl4, "a"), digit(nl4, "a"), isiTeks(nl4, "ta-vp"), isiTeks(nl4, "ta-vs")], [[4, 2], ["4", "2", "42"], "40", "2"], "nilai letak: empat puluh dua = 4 batang 2 kubus; nilai 40 dan 2");
    cek(di("nilai-letak", 5).every((o) => o.id !== "ta-n") && isiTeks(di("nilai-letak", 5), "kl-t0") === "24 berbeda dari 42", "nilai letak: kartu 24 berbeda dari 42");
    // Baca puluhan dan satuan: Igil 37 dan Halim 45.
    const bc = di("baca-puluhan-satuan", 2);
    sama([grp(bc, "a"), dipilih(bc)], [[3, 7], ["3 puluhan 7 satuan"]], "baca: tiga puluh tujuh = 3 batang 7 kubus; kartu 3 puluhan 7 satuan dipilih");
    sama(pil(di("baca-puluhan-satuan", 1)).map((c) => c.t), ["3 puluhan 7 satuan", "7 puluhan 3 satuan"], "baca: dua pilihan, satu tertukar");
    const bc2 = di("baca-puluhan-satuan", 5);
    sama([grp(bc2, "b"), digit(bc2, "b")], [[4, 5], ["4", "5", "45"]], "baca: Halim 4 batang 5 kubus, bilangan 45");
    // Tiga cara menulis dua puluh enam.
    sama([grp(di("cara-satu", 0), "a"), isiTeks(di("cara-satu", 0), "n-a")], [[0, 26], "26"], "cara satu: dua puluh enam kubus lepas");
    sama(digit(di("cara-satu", 2), "a").slice(0, 2), ["0", "26"], "cara satu: nol puluhan dan 26 satuan");
    sama([grp(di("cara-dua", 2), "a"), digit(di("cara-dua", 3), "a").slice(0, 2)], [[1, 16], ["1", "16"]], "cara dua: 1 batang, 16 kubus lepas; angka 1 dan 16");
    sama(sorotKubus(di("cara-dua", 5), "a"), 10, "cara dua: sepuluh kubus lepas yang masih bisa disusun disorot");
    sama([grp(di("cara-ringkas", 1), "a"), digit(di("cara-ringkas", 2), "a").slice(0, 2)], [[2, 6], ["2", "6"]], "cara ringkas: 2 batang, 6 kubus; angka 2 dan 6");
    const tigaCara = ["w1", "w2", "w3"].map((q) => isiTeks(di("cara-ringkas", 5), `${q}-t0`));
    sama(tigaCara, ["0 puluhan dan 26 satuan", "1 puluhan dan 16 satuan", "2 puluhan dan 6 satuan"], "cara ringkas: tiga cara menulis");
    cek(tigaCara.every((t) => nilaiKartu(t)?.[0] === 26) && nilaiKartu(tigaCara[2])[1] < 10 && nilaiKartu(tigaCara[0])[1] >= 10 && nilaiKartu(tigaCara[1])[1] >= 10, "cara ringkas: ketiga cara bernilai 26, hanya cara ketiga dengan satuan kurang dari 10");
    // Menukar sepuluh satuan: nilai tetap dua puluh empat.
    const tk = [0, 1, 2, 3, 4, 5].map((q) => di("tukar-sepuluh", q));
    sama([grp(tk[0], "a"), grp(tk[1], "a"), grp(tk[2], "a"), grp(tk[4], "a")], [[1, 14], [2, 4], [2, 4], [1, 14]], "tukar sepuluh: 1+14, tukar jadi 2+4, buka jadi 1+14");
    cek(tk.every((o) => isiTeks(o, "n-a") === "24"), "tukar sepuluh: nilai tetap dua puluh empat di semua ketukan");
    // Bentuk paling ringkas: 38.
    sama([grp(di("paling-ringkas", 0), "a"), grp(di("paling-ringkas", 1), "a"), isiTeks(di("paling-ringkas", 1), "ta-s")], [[2, 18], [3, 8], "8"], "paling ringkas: 2+18 ditukar jadi 3+8");
    sama(isiTeks(di("paling-ringkas", 4), "n-a"), "38", "paling ringkas: tiga puluh delapan");
    // Latihan.
    const l1 = di("latihan-satu", 0);
    sama(grp(l1, "a"), [3, 5], "latihan 1: tiga batang dan lima kubus di tabel");
    sama(pil(di("latihan-satu", 1)).map((c) => c.t), ["2", "3", "4"], "latihan 1: pilihan puluhan 2, 3, 4");
    sama(dipilih(L.keadaanStory(adegan(M_VIDEO, "latihan-satu"), 2, 0)), ["3"], "latihan 1: puluhan 3 dipilih (tiga batang)");
    const l1b = di("latihan-satu", 3);
    sama([pil(l1b).map((c) => c.t), dipilih(l1b), digit(l1b, "a")], [["4", "5", "6"], ["5"], ["3", "5", "35"]], "latihan 1: satuan 5 dipilih, tabel 3 dan 5, bilangan 35");
    const l2 = di("latihan-dua", 2);
    sama([grp(di("latihan-dua", 0), "a"), pil(l2).map((c) => c.t), dipilih(l2), isiTeks(l2, "n-a")], [[4, 3], ["34", "43", "40"], ["43"], "43"], "latihan 2: 4 batang 3 kubus; kartu 43 dipilih; tiga kartu 34 tertukar");
    const l3a = di("latihan-tiga", 0);
    const l3b = di("latihan-tiga", 1);
    const l3 = di("latihan-tiga", 2);
    sama([grp(l3a, "a"), grp(l3b, "a"), isiTeks(l3a, "n-a")], [[2, 15], [3, 5], "35"], "latihan 3: 2+15 ditukar jadi 3+5, nilai 35");
    const pilL3 = dipilih(l3);
    cek(pilL3.length === 1 && nilaiKartu(pilL3[0])?.[0] === 35 && nilaiKartu(pilL3[0])[1] < 10, `latihan 3: kartu yang dipilih bernilai 35 dengan satuan kurang dari 10 (${pilL3})`);
    sama(pil(l3).map((c) => nilaiKartu(c.t)?.[0]), [35, 35, 45], "latihan 3: pilihan bernilai 35, 35 (belum ringkas), dan 45 (salah)");
    // Metode luar: Balok Dienes.
    const ld2 = di("luar-dienes", 1);
    sama([grp(ld2, "a"), grp(ld2, "b")], [[0, 1], [1, 0]], "luar dienes: satu kubus (satu satuan), satu batang (satu puluhan)");
    sama([grp(di("luar-dienes", 2), "a"), isiTeks(di("luar-dienes", 2), "n-a")], [[2, 3], "23"], "luar dienes: dua batang, tiga kubus, dua puluh tiga");
    const lt = di("luar-dienes-terapan", 0);
    sama(grp(lt, "a"), [3, 5], "luar dienes terapan: tiga batang, lima kubus");
    sama([pil(di("luar-dienes-terapan", 1)).map((c) => c.t), dipilih(di("luar-dienes-terapan", 2)), isiTeks(di("luar-dienes-terapan", 2), "n-a")], [["25", "35", "45"], ["35"], "35"], "luar dienes terapan: kartu 35 dipilih");
    sama([grp(di("luar-dienes-terapan", 3), "a"), isiTeks(di("luar-dienes-terapan", 3), "n-a")], [[2, 15], "35"], "luar dienes terapan: satu batang dibuka, 2+15, nilai tetap 35");
    // Metode luar: Kartu Tumpuk.
    const lk1 = di("luar-kartu", 0);
    sama([lk1.filter((o) => /^kp\d-k$/.test(o.id)).length, lk1.filter((o) => /^ks\d-k$/.test(o.id)).length], [4, 9], "luar kartu: empat kartu puluhan (10 sampai 40) dan sembilan kartu satuan (1 sampai 9)");
    const lk2 = di("luar-kartu", 5);
    sama([isiTeks(lk2, "kt-2"), isiTeks(lk2, "ku-6"), isiTeks(lk2, "kn"), isiTeks(lk2, "tg")], ["2", "6", "26", "target: 26"], "luar kartu: kartu 20 ditutup kartu 6 terbaca 26");
    const lkt = di("luar-kartu-terapan", 4);
    sama([isiTeks(lkt, "kt-3"), isiTeks(lkt, "ku-8"), isiTeks(lkt, "kn"), dipilih(di("luar-kartu-terapan", 2)), pil(di("luar-kartu-terapan", 1)).map((c) => c.t)], ["3", "8", "38", ["38"], ["30", "38", "48"]], "luar kartu terapan: kartu 30 ditutup kartu 8 terbaca 38; kartu 38 dipilih");
    // Metode luar: Garis Bilangan Puluhan.
    const g1 = di("luar-garis", 4);
    sama([g1.filter((o) => /^gb-hp\d+$/.test(o.id)).length, g1.filter((o) => /^gb-hs\d+$/.test(o.id)).length, isiTeks(g1, "gb-tg")], [3, 4, "cari 34"], "luar garis: tiga loncatan besar dan empat loncatan kecil mencari 34");
    const g2 = di("luar-garis-terapan", 5);
    sama([g2.filter((o) => /^gb-hp\d+$/.test(o.id)).length, g2.filter((o) => /^gb-hs\d+$/.test(o.id)).length, isiTeks(g2, "gb-tg")], [4, 7, "cari 47"], "luar garis terapan: empat loncatan besar dan tujuh loncatan kecil mencari 47");
    sama([pil(di("luar-garis-terapan", 2)).map((c) => c.t), dipilih(di("luar-garis-terapan", 3))], [["6", "7", "8"], ["7"]], "luar garis terapan: pilihan 6, 7, 8; tujuh dipilih");
    stat.benda += 60;
  }

  // Aturan pemilik: aplikasi belajar mandiri; tanpa instruksi kelompok, teman, kelas, atau buku.
  {
    const MANDIRI = /kerja kelompok|berkelompok|secara berkelompok|diskusi kelompok|sekelompok|kelompokmu|kelompok belajar|bersama kelompok|tanya teman|survei|karet gelang|uang tabungan|\bpaman\b|\btika\b|\bteman\w*|\bkawan\w*|sekawan|depan kelas|bersama kelas|seluruh kelas|\bkelas\b|berpasangan dengan (teman|kawan)|bekerja berpasangan|secara berpasangan|bermain bersama|bertanya kepada|buat ceritamu|buku|menulis di|menuliskan di|tulis di|tuliskan di|menggambar|gambarlah|gambar sendiri|\bbawa(lah)?\b|membawa|dibawa|\bkertas\b|\bpensil\b|\bpulpen\b|\bspidol\b|ambil (benda|pensil|kelereng|bola|sedotan|balon)|tangan (kiri|kanan)|\bjari\b|menyuruh|suruh|jengkal|telapak|\bdepa\b|penggaris|\bkoin\b|di sekitar|di rumah|di kelas|centimeter|\bmeter\b|kakimu|tanganmu|badanmu|\braba\w*|\bmeraba|\btubuh|\blengan|lingkari|coret|guru kelas|di rumah|orang tua|\bayah\b|\bibu guru|bapak guru|\bloker\b/i;
    for (const v of VIDEO) {
      for (const a of v.adegan) {
        const semua = [a.judul, a.sumber];
        a.ketukan.forEach((kt, i) => {
          semua.push(kt.suara);
          semua.push(...L.teksTerlihat(L.keadaanStory(a, i, 9999)));
        });
        const kena = semua.filter((t) => MANDIRI.test(t));
        cek(kena.length === 0, `${v.id}/${a.id}: narasi mandiri dan digital, tanpa kelompok, teman, kelas, buku, kertas, atau pensil (${kena.slice(0, 2).join(" | ")})`);
      }
    }
  }
}

/* ------------------------------ Sapaan dan peta susun ------------------------------ */
{
  const sap = adegan(M_VIDEO, "sapaan");
  const DAFTAR = ["Puluhan dan satuan", "Tabel nilai tempat", "Menukar satuan dan puluhan"];
  cek(/Halo anak-anak/.test(sap.ketukan[0].suara) && /Puluhan dan satuan/i.test(L.teksTerlihat(akhirAdegan(sap, 1)).join(" | ")), "sapaan materi: tiga hal yang dipelajari tampil");
  sama(L.teksTerlihat(akhirAdegan(sap, 1)).filter((t) => DAFTAR.includes(t)), DAFTAR, "sapaan materi: daftar tiga hal");
  cek(!/\d/.test(sap.ketukan[1].suara) && !/\d/.test(DAFTAR.join(" ")), "sapaan materi: tanpa angka");
  const sapLuar = adegan(U, "sapaan");
  cek(/cara lain/i.test(L.teksTerlihat(akhirAdegan(sapLuar, 1)).join(" | ")) && /metode-luar|Metode luar/.test(sapLuar.sumber), "sapaan metode luar: pengumuman cara lain");
  const sumberRingkas = JSON.parse(readFileSync(new URL("../src/data/kelas2-bab1-ringkas.json", import.meta.url), "utf8")).subBab?.B;
  const sementara = new URL("../.tmp-k2b1s/B.json", import.meta.url);
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
    // Isi tabel dihitung ulang dari gambar batang dan kubus pada video materi: baris bilangan, kolom puluhan, satuan, nilai angka puluhan.
    sama(T.kolom, ["Puluhan", "Satuan", "Nilai kiri"], "tabel susun: kolom puluhan, satuan, nilai kiri");
    const cacah = (objs, key) => [objs.filter((o) => o.t === "kotak" && new RegExp(`^bp${key}\\d+$`).test(o.id)).length, objs.filter((o) => o.t === "kotak" && new RegExp(`^bs${key}\\d+$`).test(o.id)).length];
    const sumberBaris = [cacah(akhirAdegan(adegan(M_VIDEO, "satu-puluhan")), "a"), cacah(akhirAdegan(adegan(M_VIDEO, "dua-puluh-delapan")), "a"), cacah(akhirAdegan(adegan(M_VIDEO, "hitung-sepuluh")), "a"), cacah(akhirAdegan(adegan(M_VIDEO, "baca-puluhan-satuan")), "b")];
    sama(T.baris.map((b) => b.label), sumberBaris.map(([p, s]) => String(10 * p + s)), "tabel susun: baris bilangan sama dengan bilangan pada gambar materi (14, 28, 34, 45)");
    sumberBaris.forEach(([p, s], q) => {
      sama(T.baris[q].sel, [String(p), String(s), String(10 * p)], `tabel susun: baris ${10 * p + s} (${p} puluhan, ${s} satuan, nilai angka kiri ${10 * p}) dihitung ulang dari gambar`);
      cek(s < 10, `tabel susun: baris ${10 * p + s} dalam bentuk paling ringkas (satuan kurang dari sepuluh)`);
    });
    cek(T.baris.every((b) => b.sel.every((s) => s.length <= 8)), "tabel susun: sel pendek supaya margin teks >= 5 px di 405 px");
    cek(new Set(T.baris.map((b) => b.label)).size === T.baris.length, "tabel susun: bilangan tiap baris berbeda");
    cek(sumberBaris.every(([p, s]) => 10 * p + s <= 50), "tabel susun: semua bilangan paling besar lima puluh");
    const KATA_LARANG = /buku|halaman|kunci|kerja kelompok|berkelompok|\bteman|kawan|kelas\b|kertas|pensil|\bbawa\b|menggambar|menulis di|depan kelas|luas|keliling|di rumah|survei|karet gelang|uang tabungan|di sekitar|loker|ibu guru/i;
    cek(!KATA_LARANG.test(JSON.stringify({ p: A.petaSusun, t: A.tabelSusun })), "peta dan tabel susun: tanpa kata terlarang dan tanpa kelompok, teman, kelas, buku, kertas, pensil");
    cek(peta.every((s) => ![...s.teks, ...(s.ikon ?? "")].some((c) => c.codePointAt(0) > 0x1fa95)), "peta susun: emoji paling tinggi Emoji 12");
  } else cek(false, "peta dan tabel susun: .tmp-k2b1s/B.json atau kelas2-bab1-ringkas.json subBab.B.petaSusun ada");
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k2b1B-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k2b1B-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k2b1B sendiri (${impor.join(", ")})`);
  }
  // Emoji dalam data teks gambar juga paling tinggi Emoji 12 (diperiksa pada gambar yang diputar).
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d), `${v.id}/${a.id}: emoji gambar paling tinggi Emoji 12`);
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k2b1b.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|naskah-k1b/.test(pembungkus) && /VIDEO_MATERI_K2B1B/.test(pembungkus) && /VIDEO_LUAR_K2B1B/.test(pembungkus) && /export function VideoK2B1B/.test(pembungkus) && /daftar-video-cerita/.test(pembungkus), "video-k2b1b.tsx: dua video dari mesin Story, tanpa naskah lama");
  cek(!/\r/.test(pembungkus), "video-k2b1b.tsx: akhir baris LF");
  const sendiri = readFileSync(new URL("uji-story-k2b1B.mjs", import.meta.url), "utf8");
  cek(!/\r/.test(sendiri), "uji-story-k2b1B.mjs: akhir baris LF");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit diputar)`);
}
console.log(`Pemeriksaan: ${stat.hitung} deret hitungan, ${jumlahNama} nama bilangan tampak sebagai angka, ${stat.aritmetika} kalimat bilangan, ${stat.benda} pemeriksaan benda dan bingkai`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
