// Uji Story Kelas 1 Bab 6 Sub-Bab C (Pengurangan yang Hasilnya Kurang dari 20): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Video diputar bergaya guru: suara, teks terlihat, sumber, judul adegan, dan subjudul tanpa penyebutan buku (kata terlarang diperiksa pada adegan yang diputar).
// Memeriksa: pemicu kata, suara tanpa digit, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas, teks bertumpuk, pemisahan materi dan metode luar (nama metode hanya Indonesia),
// hanya bilangan sampai dua puluh (tanpa kali, bagi, bilangan lebih besar, pinjam atau simpan), setiap kalimat tambah dan kurang di suara dan gambar dihitung ulang (hasil benar, paling besar dua puluh,
// tanpa melewati sepuluh), hitungan mundur (angka sama dengan sisa benda, dekat bendanya, benda yang pergi pudar), garis bilangan (lompatan ke kiri dan ke kanan), kotak sepuluh, bagan pasangan,
// tabel puluhan dan satuan, aturan pemilik (belajar mandiri digital: tanpa kelompok, teman, depan kelas, buku, menulis atau menggambar di buku, membawa benda nyata),
// emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k1b6C.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k1b6C-video.ts");
const U1 = await import("../src/components/modul/story/k1b6C-luar-1.ts");
const B = await import("../src/components/modul/story/k1b6C-bantu.ts");
const G = await import("../src/components/modul/story/k1b6C-gambar.ts");

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
const VIDEO = [V.VIDEO_MATERI_K1B6C, V.VIDEO_LUAR_K1B6C];
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
const M_VIDEO = V.VIDEO_MATERI_K1B6C;
const U = V.VIDEO_LUAR_K1B6C;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const NAMA_LUAR = /Maju dan Mundur|Pasangan sampai (20|dua puluh)|Menjadikan Sepuluh|metode luar|metode dari luar/i;
const NAMA_INGGRIS = /Counting On|Counting Back|Number Bond|Make Ten|Singapore|Counting strategies/i;
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M_VIDEO);
  const luar = teksVideo(U);
  cek(!NAMA_LUAR.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of U1.NAMA_METODE_ID) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE_ID, ["Maju dan Mundur", "Pasangan sampai 20", "Menjadikan Sepuluh"], "nama Indonesia metode luar");
  cek(!NAMA_INGGRIS.test(materi) && !NAMA_INGGRIS.test(luar), "nama metode hanya bahasa Indonesia (tanpa Counting On/Back, Number Bond to 20, Make Ten)");
  // Hanya enam tokoh tetap: Malosi, Kira, Upe, Wei, Halim, Igil (Ibu sebagai pelaku cerita boleh).
  cek(!/\b(Tika|Budi|Ani|Siti|Dewi|Rudi|Andi|Dina|Rina|Bima|Sari)\b/.test(materi + luar), "tokoh hanya Malosi, Kira, Upe, Wei, Halim, Igil (dan Ibu)");
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
  cek(M_VIDEO.id === "k1b6C-materi" && U.id === "k1b6C-luar", "id video k1b6C-materi dan k1b6C-luar");
  cek(U.judul.endsWith(": Metode dari Luar") && !/menurut/i.test(M_VIDEO.judul), "judul video: materi tanpa 'menurut', luar berakhir ': Metode dari Luar'");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,cerita-apel,kata-kurang,mundur-apel,garis-mundur,bolu-kukus,pasangan-bilangan,nilai-tempat,periksa-tambah,satuan-habis,stiker-wei,pilih-cara,keluarga-kalimat,latihan-satu,latihan-dua,latihan-tiga,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-mundur,luar-mundur-terapan,luar-pasangan,luar-pasangan-terapan,luar-sepuluh,luar-sepuluh-terapan,luar-ringkas", "urutan adegan metode luar");
  cek(M_VIDEO.adegan[0].id === "sapaan" && U.adegan[0].id === "sapaan", "tiap video dibuka adegan sapaan");
  cek(M_VIDEO.adegan.filter((a) => /^latihan-/.test(a.id)).length === 3 && M_VIDEO.adegan[M_VIDEO.adegan.length - 1].id === "penutup", "video materi: Latihan 1 sampai 3 lalu penutup");
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-mundur", "luar-mundur-terapan", "luar-pasangan", "luar-pasangan-terapan", "luar-sepuluh", "luar-sepuluh-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(U.adegan[1].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  for (const kata of ["Latihan", "Igil", "Malosi", "Halim", "Kira", "Wei", "Upe", "apel", "bolu kukus", "kelereng", "stiker", "sisa", "menghitung mundur", "pasangan bilangan", "nilai tempat", "garis bilangan", "puluhan", "satuan", "kotak sepuluh", "dikurangi", "ditambah", "periksa"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  // Hanya bilangan sampai dua puluh: tanpa kali, bagi, bilangan lebih dari dua puluh, ukuran, rumus, atau pinjam dan simpan (bersusun).
  const BOCOR = /dikali|perkalian|pembagian|dibagi|\bratus\b|\bribu\b|dua puluh (satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan)|(tiga|empat|lima|enam|tujuh|delapan|sembilan) puluh|\bluas\b|keliling|rumus|volume|sentimeter|\bcm\b|×|÷|−|\bpinjam\w*|\bmeminjam|\bsimpan\w*|\bmenyimpan|bersusun/i;
  for (const v of [M_VIDEO, U]) {
    for (const a of v.adegan) cek(!BOCOR.test(teksAdegan(a)), `${v.id}/${a.id}: hanya bilangan sampai dua puluh (tanpa kali, bagi, bilangan lebih dari dua puluh, ukuran, rumus, pinjam, simpan)`);
    for (const a of v.adegan) for (const i of a.ketukan.keys()) for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) for (const b of bilanganDari(t)) cek(Number(b) <= 20, `${v.id}/${a.id}#${i + 1}: angka di gambar paling besar dua puluh ("${t}")`);
  }
  const ketMateri = M_VIDEO.adegan.reduce((t, ad) => t + ad.ketukan.length, 0);
  cek(totalKetukan >= 70 && ketMateri >= 70 && U.adegan.reduce((t, ad) => t + ad.ketukan.length, 0) >= 30, `total ketukan cukup dalam (${totalKetukan}; materi ${ketMateri})`);
  // Durasi materi diputar 8 sampai 13 menit (dua kata per detik, sapaan termasuk).
  const kataMateri = kataVideo(M_VIDEO);
  cek(kataMateri / 120 >= 8 && kataMateri / 120 <= 13, `durasi materi diputar 8 sampai 13 menit (${(kataMateri / 120).toFixed(1)} menit)`);
  cek(kataVideo(U) / 120 >= 3, `durasi video luar paling sedikit 3 menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
}

/* ------------------------------ Nama bilangan 10 sampai 20 yang diucapkan tampak sebagai angka ------------------------------ */
const NAMA = B.NAMA_BILANGAN;
const tokoh = (s) => s.toLowerCase().split(/\s+/).filter(Boolean).map((w) => w.replace(/[^a-z]/g, ""));
/** Nama bilangan 0 sampai 20 yang dimulai pada token `p`: [nilai, panjang] atau null (nama dua kata didahulukan). */
const bacaAngka = (t, p) => {
  for (let n = 20; n >= 0; n -= 1) {
    const pc = NAMA[n].split(" ");
    if (pc.every((c, q) => t[p + q] === c)) return [n, pc.length];
  }
  return null;
};
/** Deret bilangan berurutan (arah +1 naik atau -1 turun) yang dimulai dari nilai `v0`: panjang terpanjang dan nomor token awal tiap anggotanya. */
const rantai = (suara, v0, arah) => {
  const t = tokoh(suara);
  let terbaik = { len: 0, pos: [] };
  for (let p = 0; p < t.length; p += 1) {
    const r = bacaAngka(t, p);
    if (!r || r[0] !== v0) continue;
    const pos = [p];
    let q = p + r[1];
    let v = v0;
    for (;;) {
      const s = bacaAngka(t, q);
      if (!s || s[0] !== v + arah) break;
      pos.push(q);
      v += arah;
      q += s[1];
    }
    if (pos.length > terbaik.len) terbaik = { len: pos.length, pos };
  }
  return terbaik;
};
/** Urutan nama bilangan yang berubah satu-satu (arah +1 atau -1) mulai dari `v0`, boleh dipisah kata lain: nomor token awal tiap anggotanya. */
const urutanLonggar = (suara, v0, arah) => {
  const t = tokoh(suara);
  const pos = [];
  let nilai = v0;
  for (let p = 0; p < t.length; p += 1) {
    const r = bacaAngka(t, p);
    if (r && r[0] === nilai) {
      pos.push(p);
      nilai += arah;
      p += r[1] - 1;
    }
  }
  return pos;
};
const NAMA_METODE_SUARA = /maju dan mundur|pasangan sampai dua puluh|menjadikan sepuluh/gi;
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

/* ------------------------------ Hitungan, benda, kotak, dan garis dihitung ulang dari gambar ------------------------------ */
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
const pusatObj = (b) => (b.t === "kotak" ? { x: b.x + b.w / 2, y: b.y + b.h / 2 } : { x: b.x, y: b.y });
const dekat = (a, b, r = 0.6) => Math.hypot(a.x - b.x, a.y - b.y) <= r;
const daftarId = (objs, pola) => objs.filter((o) => pola.test(o.id));
const di = (id, ke) => akhirAdegan(adegan(M_VIDEO, id) ?? adegan(U, id), ke);
const pusatSel = (i, x, y, sel = 26) => ({ x: x + (i % 5) * sel + sel / 2, y: y + Math.floor(i / 5) * sel + sel / 2 });
const dalamKotak = (b, x, y, w, h) => b.x > x && b.x < x + w && b.y > y && b.y < y + h;
const penuh = (b) => (b.op ?? 1) >= 0.99;
const stat = { hitung: 0, mundur: 0, aritmetika: 0, benda: 0, garis: 0 };
const labelAngka = (objs, p) => objs.filter((o) => o.t === "teks" && new RegExp(`^${p}n\\d+$`).test(o.id) && /^\d+$/.test(o.isi ?? "")).sort((m, n) => Number(m.id.slice(p.length + 1)) - Number(n.id.slice(p.length + 1)));
const xBil = (n) => 25 + (n - 10) * 25;

{
  // 1) Deret angka menghitung maju `${p}n{i}`: nilai berurutan dari satu, dekat bendanya, dan yang baru muncul sama banyak dengan bilangan berurutan yang diucapkan.
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
          if (baru.length) cek(rantai(kt.suara, Number(baru[0].isi), 1).len === baru.length, `${nama}: ${baru.length} angka baru dari ${baru[0].isi} sama dengan banyak bilangan berurutan yang diucapkan (${rantai(kt.suara, Number(baru[0].isi), 1).len})`);
        }
      });
    }
  }

  // 1b) Deret angka menghitung mundur `${p}m{i}`: benda nomor i yang pergi meninggalkan i benda, jadi angkanya sama dengan nomor benda; benda pudar; angka muncul saat nama bilangannya diucapkan.
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((kt, i) => {
        const objs = akhirAdegan(a, i);
        const sebelum = i > 0 ? akhirAdegan(a, i - 1) : [];
        const awalan = new Set(objs.filter((o) => o.t === "teks" && /^\d+$/.test(o.isi ?? "")).map((o) => /^([a-z]+)m\d+$/.exec(o.id)?.[1]).filter(Boolean));
        for (const p of awalan) {
          const label = objs.filter((o) => o.t === "teks" && new RegExp(`^${p}m\\d+$`).test(o.id) && /^\d+$/.test(o.isi ?? ""));
          if (label.length === 0) continue;
          stat.mundur += 1;
          const nama = `${v.id}/${a.id}#${i + 1} mundur ${p}`;
          const total = daftarId(objs, new RegExp(`^${p}\\d+$`)).length;
          for (const lb of label) {
            const n = Number(lb.id.slice(p.length + 1));
            const b = ketemu(objs, `${p}${n}`);
            cek(Number(lb.isi) === n, `${nama}: angka ${lb.isi} sama dengan sisa benda (nomor ${n})`);
            cek(b && !penuh(b) && Math.hypot(pusatObj(b).x - lb.x, pusatObj(b).y - lb.y) < 30, `${nama}: benda ${n} pudar dan angka ${lb.isi} dekat bendanya`);
          }
          const nilai = label.map((lb) => Number(lb.isi)).sort((m, n) => n - m);
          cek(nilai[0] === total - 1 && nilai.every((n, q) => n === nilai[0] - q), `${nama}: angka mundur berurutan mulai ${total - 1} (${nilai.join(",")})`);
          cek(daftarId(objs, new RegExp(`^${p}\\d+$`)).filter((b) => !penuh(b)).length === label.length, `${nama}: banyak benda pudar sama dengan banyak angka mundur`);
          const baru = label.filter((lb) => !sebelum.some((o) => o.id === lb.id)).sort((m, n) => Number(n.isi) - Number(m.isi));
          if (baru.length) {
            const rp = urutanLonggar(kt.suara, Number(baru[0].isi), -1);
            const r = { len: Math.min(rp.length, baru.length), pos: rp };
            cek(rp.length >= baru.length, `${nama}: ${baru.length} angka baru dari ${baru[0].isi} sama dengan banyak bilangan menurun yang diucapkan (${r.len})`);
            baru.forEach((lb, q) => {
              let w = -1;
              for (let p2 = 0; p2 < L.kataDari(kt.suara).length; p2 += 1) if (ketemu(L.keadaanStory(a, i, p2), lb.id)) {
                w = p2;
                break;
              }
              cek(w === r.pos[q], `${nama}: angka ${lb.isi} muncul tepat saat namanya diucapkan (kata ${w}, harapan ${r.pos[q]})`);
            });
          }
        }
      });
    }
  }

  // 2) Kalimat tambah dan kurang: dihitung ulang di suara dan gambar (hasil benar, paling besar dua puluh, tanpa melewati sepuluh).
  const NN = [...NAMA].sort((m, n) => n.length - m.length).join("|");
  const nilaiNama = (s) => NAMA.indexOf(s.toLowerCase());
  const reOp = new RegExp(`\\b(${NN}) (dikurangi|ditambah) (${NN})\\b(?: (?:sama dengan|menjadi) (${NN})\\b)?`, "gi");
  const bagus = (op, a, b, c) => (op === "-" ? a - b === c && a <= 20 && c >= 0 && (a <= 10 || c >= 10 || b >= 10) : a + b === c && c <= 20);
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((kt, i) => {
        const semua = [...kt.suara.matchAll(reOp)];
        const kata = (kt.suara.match(/\b(dikurangi|ditambah)\b/gi) ?? []).length;
        cek(semua.length === kata && semua.every((m) => m[4] !== undefined), `${v.id}/${a.id}#${i + 1}: setiap kalimat tambah dan kurang di suara memuat hasilnya (${semua.length} dari ${kata})`);
        for (const m of semua) {
          if (m[4] === undefined) continue;
          stat.aritmetika += 1;
          cek(bagus(m[2].toLowerCase() === "dikurangi" ? "-" : "+", nilaiNama(m[1]), nilaiNama(m[3]), nilaiNama(m[4])), `${v.id}/${a.id}#${i + 1} suara: "${m[0]}" benar, paling besar dua puluh, dan tanpa melewati sepuluh`);
        }
        for (let p = 0; p < L.kataDari(kt.suara).length; p += 1) {
          for (const t of L.teksTerlihat(L.keadaanStory(a, i, p))) {
            if (!/ [-+=] /.test(t)) continue;
            let sisa = t;
            sisa = sisa.replace(/(\d+) ([-+]) (\d+) = (\d+)/g, (_, x, op, y, z) => {
              stat.aritmetika += 1;
              cek(bagus(op, Number(x), Number(y), Number(z)), `${v.id}/${a.id}#${i + 1} gambar: "${t}" benar, paling besar dua puluh, tanpa melewati sepuluh`);
              return "";
            });
            sisa = sisa.replace(/(\d+) = (\d+) \+ (\d+)/g, (_, x, y, z) => {
              stat.aritmetika += 1;
              cek(Number(y) + Number(z) === Number(x) && Number(x) <= 20, `${v.id}/${a.id}#${i + 1} gambar: "${t}" benar`);
              return "";
            });
            sisa = sisa.replace(/(\d+) - (\d+) = \?/g, (_, x, y) => {
              cek(Number(x) <= 20 && Number(y) < Number(x), `${v.id}/${a.id}#${i + 1} gambar: soal "${t}" sah`);
              return "";
            });
            cek(!/[-+=]/.test(sisa.replace(/[a-z]-[a-z]/gi, "")), `${v.id}/${a.id}#${i + 1} gambar: kalimat "${t}" dikenali sepenuhnya`);
          }
        }
      });
    }
  }

  // 3) Bagan pasangan: bagian dan utuh dihitung ulang.
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((kt, i) => {
        const objs = akhirAdegan(a, i);
        for (const u of objs.filter((o) => o.t === "teks" && /^[a-z]+ut$/.test(o.id))) {
          const p = u.id.slice(0, -2);
          const [x, y] = [isiTeks(objs, `${p}at`), isiTeks(objs, `${p}bt`)];
          if (!/^\d+$/.test(x ?? "") || !/^\d+$/.test(y ?? "") || !/^\d+$/.test(u.isi)) continue;
          stat.benda += 1;
          cek(Number(x) + Number(y) === Number(u.isi), `${v.id}/${a.id}#${i + 1}: bagan ${p}: ${x} + ${y} sama dengan ${u.isi}`);
        }
      });
    }
  }

  // 4) Garis bilangan: lompatan mundur (ke kiri, di atas garis) dan maju (ke kanan, di bawah garis), katak dan kalimat sesuai.
  for (const idAd of ["garis-mundur", "luar-mundur"]) {
    const a = adegan(M_VIDEO, idAd) ?? adegan(U, idAd);
    const o0 = akhirAdegan(a, 0);
    for (let n = 10; n <= 20; n += 1) cek(isiTeks(o0, `gb-n${n}`) === String(n) && ketemu(o0, `gb-n${n}`).x === xBil(n) && ketemu(o0, `gb-t${n}`).x === xBil(n), `${idAd}: garis bilangan ${n} tepat di tempatnya`);
    a.ketukan.forEach((kt, i) => {
      for (let p = 0; p < L.kataDari(kt.suara).length; p += 1) {
        const objs = L.keadaanStory(a, i, p);
        const katak = ketemu(objs, "kt");
        if (!katak) continue;
        stat.garis += 1;
        const lp = daftarId(objs, /^lp\d+$/).map((o) => ({ n: Number(o.id.slice(2)), o })).sort((m, n) => n.n - m.n);
        const lm = daftarId(objs, /^lm\d+$/).map((o) => ({ n: Number(o.id.slice(2)), o })).sort((m, n) => m.n - n.n);
        cek(lp.every((h, q) => h.n === lp[0].n - q && h.o.x === xBil(h.n + 1) && /Q-12\.5 -22 -25\.0 0$/.test(h.o.d)), `${idAd}#${i + 1} kata ${p}: lompatan mundur berurutan, tiap satu langkah ke kiri`);
        cek(lm.every((h, q) => h.n === lm[0].n + q && h.o.x === xBil(h.n - 1) && /Q12\.5 22 25\.0 0$/.test(h.o.d)), `${idAd}#${i + 1} kata ${p}: lompatan maju berurutan, tiap satu langkah ke kanan`);
        const harap = lm.length ? lm[lm.length - 1].n : lp.length ? lp[lp.length - 1].n : null;
        if (harap !== null) cek(katak.x === xBil(harap), `${idAd}#${i + 1} kata ${p}: katak di ${harap} (x=${katak.x})`);
        else cek(Number.isInteger((katak.x - 25) / 25) && katak.x >= 25 && katak.x <= 275, `${idAd}#${i + 1} kata ${p}: katak tepat di sebuah bilangan`);
      }
      const objs = akhirAdegan(a, i);
      const lp = daftarId(objs, /^lp\d+$/).map((o) => Number(o.id.slice(2))).sort((m, n) => n - m);
      const lm = daftarId(objs, /^lm\d+$/).map((o) => Number(o.id.slice(2))).sort((m, n) => m - n);
      for (const t of L.teksTerlihat(objs)) {
        const k1 = /^(\d+) - (\d+) = (\d+|\?)$/.exec(t);
        if (k1 && lp.length) {
          cek(Number(k1[1]) === lp[0] + 1 && Number(k1[2]) === lp.length && (k1[3] === "?" || Number(k1[3]) === lp[lp.length - 1]), `${idAd}#${i + 1}: "${t}" sesuai ${lp.length} lompatan mundur dari ${lp[0] + 1} sampai ${lp[lp.length - 1]}`);
          stat.garis += 1;
        }
        const k2 = /^(\d+) \+ (\d+) = (\d+)$/.exec(t);
        if (k2 && lm.length) {
          cek(Number(k2[1]) === lm[0] - 1 && Number(k2[2]) === lm.length && Number(k2[3]) === lm[lm.length - 1], `${idAd}#${i + 1}: "${t}" sesuai ${lm.length} lompatan maju`);
          stat.garis += 1;
        }
      }
      // Lompatan baru muncul tepat saat nama bilangan pendaratannya diucapkan.
      const sebelum = i > 0 ? akhirAdegan(a, i - 1) : [];
      const baruLp = daftarId(objs, /^lp\d+$/).filter((o) => !sebelum.some((q) => q.id === o.id)).map((o) => Number(o.id.slice(2))).sort((m, n) => n - m);
      if (baruLp.length) {
        const r = { len: 99, pos: urutanLonggar(kt.suara, baruLp[0], -1) };
        baruLp.forEach((n, q) => {
          let w = -1;
          for (let p = 0; p < L.kataDari(kt.suara).length; p += 1) if (ketemu(L.keadaanStory(a, i, p), `lp${n}`)) {
            w = p;
            break;
          }
          cek(r.len >= baruLp.length && w === r.pos[q], `${idAd}#${i + 1}: lompatan ke ${n} muncul saat namanya diucapkan`);
        });
      }
      const baruLm = daftarId(objs, /^lm\d+$/).filter((o) => !sebelum.some((q) => q.id === o.id)).map((o) => Number(o.id.slice(2))).sort((m, n) => m - n);
      if (baruLm.length) {
        const r = { len: 99, pos: urutanLonggar(kt.suara, baruLm[0], 1) };
        baruLm.forEach((n, q) => {
          let w = -1;
          for (let p = 0; p < L.kataDari(kt.suara).length; p += 1) if (ketemu(L.keadaanStory(a, i, p), `lm${n}`)) {
            w = p;
            break;
          }
          cek(r.len >= baruLm.length && w === r.pos[q], `${idAd}#${i + 1}: lompatan maju ke ${n} muncul saat namanya diucapkan`);
        });
      }
    });
    cek(akhirAdegan(a).filter((o) => /^lp\d+$/.test(o.id)).length >= 3, `${idAd}: ada lompatan mundur`);
  }
  sama([daftarId(di("garis-mundur", 2), /^lp\d+$/).length, daftarId(di("garis-mundur", 5), /^lp\d+$/).length, daftarId(di("luar-mundur", 3), /^lm\d+$/).length], [3, 5, 3], "garis bilangan: tiga, lima, dan tiga lompatan");
  sama([ketemu(di("garis-mundur", 2), "kt").x, ketemu(di("garis-mundur", 5), "kt").x, ketemu(di("luar-mundur", 3), "kt").x], [xBil(12), xBil(14), xBil(17)], "garis bilangan: katak berakhir di 12, 14, dan 17");
}

{
  // 5) Cerita apel, hitung mundur dengan apel, dan periksa dengan menambah.
  {
    const c0 = di("cerita-apel", 0);
    cek(daftarId(c0, /^ap\d+$/).length === 15 && isiTeks(c0, "ap-t0") === "15 apel", "cerita apel: lima belas apel");
    const c1 = di("cerita-apel", 1);
    cek(["ap12", "ap13", "ap14"].every((id) => ketemu(c1, id).sorot === true) && isiTeks(c1, "ud-t0") === "3 apel dimakan ulat" && daftarId(c1, /^ap\d+$/).filter((o) => o.sorot).length === 3, "cerita apel: tiga apel disorot sebagai yang dimakan ulat");
    const c2 = di("cerita-apel", 2);
    cek(daftarId(c2, /^ap\d+$/).filter((o) => !penuh(o)).length === 3 && daftarId(c2, /^ap\d+$/).filter(penuh).length === 12, "cerita apel: sisa dua belas apel yang masih bagus");
    cek(isiTeks(di("cerita-apel", 3), "hk-t0") === "15 - 3 = ?", "cerita apel: soal lima belas dikurangi tiga");
    const m = adegan(M_VIDEO, "mundur-apel");
    const m0 = akhirAdegan(m, 0);
    cek(daftarId(m0, /^ma\d+$/).length === 15 && daftarId(m0, /^ma\d+$/).every((o) => penuh(o)), "hitung mundur: lima belas apel penuh di awal");
    const m2 = akhirAdegan(m, 2);
    sama(["ma12", "ma13", "ma14"].map((id) => !penuh(ketemu(m2, id))), [true, true, true], "hitung mundur: tiga apel yang pergi pudar");
    sama(["mam14", "mam13", "mam12"].map((id) => isiTeks(m2, id)), ["14", "13", "12"], "hitung mundur: empat belas, tiga belas, dua belas");
    const m4 = akhirAdegan(m, 4);
    sama(labelAngka(m4, "ma").map((lb) => [lb.id, lb.isi]), Array.from({ length: 12 }, (_, i) => [`man${i}`, String(i + 1)]), "hitung mundur: sisa dihitung satu sampai dua belas");
    cek(daftarId(m4, /^ma\d+$/).filter(penuh).length === 12, "hitung mundur: dua belas apel masih penuh");
    sama(isiTeks(akhirAdegan(m, 3), "mj-t0"), "15 - 3 = 12", "hitung mundur: kalimat lima belas dikurangi tiga");
    stat.benda += 7;

    const p = adegan(M_VIDEO, "periksa-tambah");
    const kr = { x: 24, y: 52, w: 196, h: 104 };
    const p0 = akhirAdegan(p, 0);
    cek(daftarId(p0, /^pa\d+$/).filter((b) => dalamKotak(b, kr.x, kr.y, kr.w, kr.h)).length === 12 && daftarId(p0, /^pa\d+$/).filter((b) => b.x > 240).length === 3, "periksa: dua belas apel di keranjang, tiga di kanan");
    sama([isiTeks(akhirAdegan(p, 1), "pl"), isiTeks(akhirAdegan(p, 1), "pr")], ["12", "3"], "periksa: label dua belas dan tiga");
    const p2 = akhirAdegan(p, 2);
    cek(daftarId(p2, /^pa\d+$/).length === 15 && daftarId(p2, /^pa\d+$/).every((b) => dalamKotak(b, kr.x, kr.y, kr.w, kr.h)), "periksa: tiga apel kembali, lima belas apel di keranjang");
    cek(new Set(daftarId(p2, /^pa\d+$/).map((b) => `${b.x},${b.y}`)).size === 15, "periksa: lima belas apel di tempat berbeda");
    sama(isiTeks(akhirAdegan(p, 3), "pl"), "15", "periksa: label menjadi lima belas");
    // Tiap apel kembali tepat saat bilangannya disebut.
    {
      const kt = p.ketukan[2];
      const t = tokoh(kt.suara);
      const urut = [t.indexOf("satu"), t.indexOf("dua"), t.lastIndexOf("tiga")];
      urut.forEach((w, q) => {
        const sebelum = daftarId(L.keadaanStory(p, 2, w - 1), /^pa\d+$/).filter((b) => dalamKotak(b, kr.x, kr.y, kr.w, kr.h)).length;
        const sesudah = daftarId(L.keadaanStory(p, 2, w), /^pa\d+$/).filter((b) => dalamKotak(b, kr.x, kr.y, kr.w, kr.h)).length;
        cek(sebelum === 12 + q && sesudah === 13 + q, `periksa: apel ke-${q + 1} kembali tepat saat bilangannya disebut`);
      });
    }
    stat.benda += 5;
  }

  // 6) Kotak sepuluh: bolu kukus, satuan habis, latihan 2, dan metode luar.
  {
    const A = { x: 85, y: 50, w: 130, h: 52 };
    const b0 = di("bolu-kukus", 0);
    cek(daftarId(b0, /^bk-c\d$/).length === 10 && daftarId(b0, /^bo\d+$/).length === 13 && isiTeks(b0, "bt-t0") === "13 bolu", "bolu: kotak sepuluh dan tiga belas bolu");
    for (let i = 0; i < 10; i += 1) cek(dekat(ketemu(b0, `bo${i}`), pusatSel(i, A.x, A.y)), `bolu: bolu ${i + 1} tepat di petak ${i + 1}`);
    cek(daftarId(b0, /^bo\d+$/).filter((b) => !dalamKotak(b, A.x, A.y, A.w, A.h)).length === 3, "bolu: tiga bolu lepas di luar kotak");
    const b1 = di("bolu-kukus", 1);
    const perut = ketemu(b1, "pr");
    const dimakan = daftarId(b1, /^bo\d+$/).filter((b) => dalamKotak(b, perut.x, perut.y, perut.w, perut.h));
    cek(dimakan.length === 2 && dimakan.every((b) => ["bo10", "bo11"].includes(b.id)), "bolu: dua bolu lepas masuk ke perut Malosi");
    cek(daftarId(b1, /^bo\d+$/).filter((b) => !dalamKotak(b, perut.x, perut.y, perut.w, perut.h)).length === 11, "bolu: sebelas bolu tersisa (13 dikurangi 2)");
    cek(daftarId(b1, /^bo\d+$/).slice(0, 10).every((b, i) => dekat(b, pusatSel(i, A.x, A.y))), "bolu: kotak sepuluh tidak disentuh");
    sama([isiTeks(di("bolu-kukus", 2), "b3-t0"), isiTeks(di("bolu-kukus", 3), "b4-t0"), isiTeks(di("bolu-kukus", 4), "b5-t0")], ["3 - 2 = 1", "10 + 1 = 11", "13 - 2 = 11"], "bolu: tiga kalimat bilangan");
    const b5 = di("bolu-kukus", 5);
    cek(isiTeks(b5, "c10") === "10" && isiTeks(b5, "c11") === "11" && dekat({ x: ketemu(b5, "c11").x, y: ketemu(b5, "c11").y + 14 }, ketemu(b5, "bo12"), 0.6), "bolu: sepuluh di kotak, sebelas di bolu lepas yang tinggal");
    // Gerak bolu tepat saat suara menyebut perut.
    const sb = adegan(M_VIDEO, "bolu-kukus").ketukan[1];
    const wPerut = L.posisiKata(sb.suara, "perut");
    cek(dalamKotak(ketemu(L.keadaanStory(adegan(M_VIDEO, "bolu-kukus"), 1, wPerut), "bo10"), perut.x, perut.y, perut.w, perut.h) && !dalamKotak(ketemu(L.keadaanStory(adegan(M_VIDEO, "bolu-kukus"), 1, wPerut - 1), "bo10"), perut.x, perut.y, perut.w, perut.h), "bolu: bolu bergerak saat kata perut");
    stat.benda += 20;

    const H = { x: 85, y: 48, w: 130, h: 52 };
    const h0 = di("satuan-habis", 0);
    cek(daftarId(h0, /^hl\d+$/).length === 16 && isiTeks(h0, "hk-t0") === "16 kelereng", "satuan habis: enam belas kelereng");
    for (let i = 0; i < 10; i += 1) cek(dekat(ketemu(h0, `hl${i}`), pusatSel(i, H.x, H.y)), `satuan habis: kelereng ${i + 1} tepat di petak`);
    cek(daftarId(h0, /^hl\d+$/).filter((b) => !dalamKotak(b, H.x, H.y, H.w, H.h)).length === 6, "satuan habis: enam kelereng lepas");
    const h1 = di("satuan-habis", 1);
    cek(daftarId(h1, /^hl\d+$/).filter((b) => b.x > 230).length === 6 && daftarId(h1, /^hl\d+$/).filter((b) => dalamKotak(b, H.x, H.y, H.w, H.h)).length === 10, "satuan habis: enam kelereng lepas pindah ke Kira, sepuluh tinggal di kotak");
    cek(daftarId(h1, /^hl\d+$/).filter((b) => b.x <= 230).length === 10, "satuan habis: tinggal sepuluh kelereng (16 dikurangi 6)");
    sama([isiTeks(di("satuan-habis", 1), "h2-t0"), isiTeks(di("satuan-habis", 3), "h4-t0")], ["6 - 6 = 0", "16 - 6 = 10"], "satuan habis: kalimat bilangan");
    stat.benda += 17;

    const D = { x: 85, y: 40, w: 130, h: 52 };
    const d0 = di("latihan-dua", 0);
    cek(daftarId(d0, /^lb\d+$/).length === 19 && isiTeks(d0, "lb") === "19 bolu", "latihan 2: sembilan belas bolu");
    for (let i = 0; i < 10; i += 1) cek(dekat(ketemu(d0, `lb${i}`), pusatSel(i, D.x, D.y)), `latihan 2: bolu ${i + 1} tepat di petak`);
    cek(daftarId(d0, /^lb\d+$/).filter((b) => !dalamKotak(b, D.x, D.y, D.w, D.h)).length === 9, "latihan 2: sembilan bolu lepas");
    const ld = adegan(M_VIDEO, "latihan-dua");
    const d1 = akhirAdegan(ld, 1);
    cek(daftarId(d1, /^lb\d+$/).filter((b) => b.y === 152).length === 6 && daftarId(d1, /^lb\d+$/).filter((b) => b.y !== 152).length === 13, "latihan 2: enam bolu ke Malosi, tersisa tiga belas");
    {
      const t = tokoh(ld.ketukan[1].suara);
      const mulai = t.indexOf("perut");
      for (let n = 1; n <= 6; n += 1) {
        const w = t.indexOf(NAMA[n], mulai);
        const pindah = daftarId(L.keadaanStory(ld, 1, w), /^lb\d+$/).filter((b) => b.y === 152).length;
        const sebelum = daftarId(L.keadaanStory(ld, 1, w - 1), /^lb\d+$/).filter((b) => b.y === 152).length;
        cek(pindah === n && sebelum === n - 1, `latihan 2: bolu ke-${n} pindah tepat saat bilangan ${NAMA[n]} disebut`);
      }
    }
    sama([isiTeks(di("latihan-dua", 2), "d3-t0"), isiTeks(di("latihan-dua", 3), "d4-t0"), isiTeks(di("latihan-dua", 3), "d5-t0")], ["9 - 6 = 3", "10 + 3 = 13", "19 - 6 = 13"], "latihan 2: kalimat bilangan");
    stat.benda += 24;

    const S = { x: 85, y: 54, w: 130, h: 52 };
    const s0 = di("luar-sepuluh", 0);
    cek(daftarId(s0, /^sb-c\d$/).length === 10 && daftarId(s0, /^sl\d+$/).length === 10 && daftarId(s0, /^sl\d+$/).every((b, i) => dekat(b, pusatSel(i, S.x, S.y))), "luar sepuluh: sepuluh bolu tepat di petak");
    const s1 = di("luar-sepuluh", 1);
    cek(daftarId(s1, /^sl\d+$/).length === 14 && isiTeks(s1, "b14") === "14 bolu" && daftarId(s1, /^sl\d+$/).filter((b) => !dalamKotak(b, S.x, S.y, S.w, S.h)).length === 4, "luar sepuluh: empat belas bolu, empat di luar kotak");
    const s2 = di("luar-sepuluh", 2);
    cek(daftarId(s2, /^sl\d+$/).filter((b) => b.x > 240).length === 2 && daftarId(s2, /^sl\d+$/).filter((b) => b.x <= 240).length === 12, "luar sepuluh: dua bolu pergi, dua belas tersisa");
    sama([isiTeks(di("luar-sepuluh", 3), "sa-t0"), isiTeks(di("luar-sepuluh", 3), "sc-t0"), isiTeks(di("luar-sepuluh", 4), "sd-t0")], ["4 - 2 = 2", "10 + 2 = 12", "14 - 2 = 12"], "luar sepuluh: kalimat bilangan");
    const a0 = di("luar-sepuluh-terapan", 0);
    cek(daftarId(a0, /^al\d+$/).length === 18 && daftarId(a0, /^al\d+$/).slice(0, 10).every((b, i) => dekat(b, pusatSel(i, 85, 54))) && daftarId(a0, /^al\d+$/).filter((b) => !dalamKotak(b, 85, 54, 130, 52)).length === 8 && isiTeks(a0, "a18") === "18 apel", "luar sepuluh terapan: delapan belas apel, delapan lepas");
    const a1 = di("luar-sepuluh-terapan", 1);
    cek(daftarId(a1, /^al\d+$/).filter((b) => b.y > 190).length === 7 && daftarId(a1, /^al\d+$/).filter((b) => b.y <= 190).length === 11, "luar sepuluh terapan: tujuh apel pergi, sebelas tersisa");
    sama([isiTeks(di("luar-sepuluh-terapan", 2), "f1-t0"), isiTeks(di("luar-sepuluh-terapan", 2), "f2-t0"), isiTeks(di("luar-sepuluh-terapan", 2), "f3-t0")], ["8 - 7 = 1", "10 + 1 = 11", "18 - 7 = 11"], "luar sepuluh terapan: kalimat bilangan");
    const a3 = di("luar-sepuluh-terapan", 3);
    sama([["c1-t", "c2-t", "c3-t"].map((i) => isiTeks(a3, i)), ketemu(a3, "c2-k").sorot, daftarId(a3, /^c\d-k$/).filter((o) => o.sorot).length], [["10", "11", "12"], true, 1], "luar sepuluh terapan: sebelas dipilih");
    stat.benda += 14;
  }

  // 7) Nilai tempat, bagan pasangan, dan tabel puluhan satuan.
  {
    const nilai = (id, ke, p) => {
      const o = di(id, ke);
      return { puluhan: isiTeks(o, `${p}dp`), satuan: isiTeks(o, `${p}ds`), atas: isiTeks(o, `${p}at`), apelPenuh: daftarId(o, new RegExp(`^${p}ap\\d$`)).filter(penuh).length, apel: daftarId(o, new RegExp(`^${p}ap\\d$`)).length };
    };
    sama(nilai("nilai-tempat", 1, "na"), { puluhan: "1", satuan: "5", atas: "15", apelPenuh: 5, apel: 5 }, "nilai tempat: lima belas = satu puluhan dan lima satuan");
    const n3 = nilai("nilai-tempat", 3, "na");
    sama([n3.satuan, n3.apelPenuh, n3.puluhan], ["2", 2, "1"], "nilai tempat: satuan dua (dua apel tersisa), puluhan tetap satu");
    const n4 = nilai("nilai-tempat", 4, "na");
    sama([n4.atas, n4.satuan, n4.puluhan, isiTeks(di("nilai-tempat", 4), "nj-t0")], ["12", "2", "1", "15 - 3 = 12"], "nilai tempat: satu puluhan dua satuan dibaca dua belas");
    const n5 = nilai("nilai-tempat", 5, "nb");
    sama([n5.atas, n5.satuan, n5.puluhan, n5.apel, n5.apelPenuh], ["16", "6", "1", 6, 2], "nilai tempat: enam belas = satu puluhan dan enam satuan (empat apel pergi sudah pudar)");
    const n6 = nilai("nilai-tempat", 6, "nb");
    sama([n6.atas, n6.satuan, n6.puluhan, n6.apelPenuh, isiTeks(di("nilai-tempat", 6), "nm-t0")], ["12", "2", "1", 2, "16 - 4 = 12"], "nilai tempat: enam belas dikurangi empat sama dengan dua belas");
    cek(daftarId(di("nilai-tempat", 4), /^naap\d$/).every((b) => dalamKotak(b, 160, 76, 80, 60)) && daftarId(di("nilai-tempat", 6), /^nbap\d$/).every((b) => dalamKotak(b, 160, 76, 80, 60)), "nilai tempat: apel satuan di dalam kotak satuan");
    // Bagan pasangan: sepuluh dan satuan.
    const pb = adegan(M_VIDEO, "pasangan-bilangan");
    sama([isiTeks(akhirAdegan(pb, 1), "pbut"), isiTeks(akhirAdegan(pb, 1), "pbat"), isiTeks(akhirAdegan(pb, 1), "pbbt")], ["15", "10", "5"], "pasangan: lima belas dipisah sepuluh dan lima");
    sama([isiTeks(akhirAdegan(pb, 2), "pe-t0"), isiTeks(akhirAdegan(pb, 3), "pn2t"), isiTeks(akhirAdegan(pb, 4), "pj-t0"), isiTeks(akhirAdegan(pb, 5), "pk-t0")], ["5 - 3 = 2", "2", "10 + 2 = 12", "15 - 3 = 12"], "pasangan: lima dikurangi tiga, sepuluh ditambah dua");
    sama([["qbut", "qbat", "qbbt"].map((i) => isiTeks(akhirAdegan(pb, 6), i)), ["qe-t0", "qj-t0", "qk-t0"].map((i) => isiTeks(akhirAdegan(pb, 7), i))], [["18", "10", "8"], ["8 - 4 = 4", "10 + 4 = 14", "18 - 4 = 14"]], "pasangan: delapan belas dipisah sepuluh dan delapan");
    const kel = adegan(M_VIDEO, "keluarga-kalimat");
    sama(["fa", "fb", "fc", "fd"].map((i) => isiTeks(akhirAdegan(kel, 4), `${i}-t0`)), ["15 - 3 = 12", "15 - 12 = 3", "12 + 3 = 15", "3 + 12 = 15"], "keluarga kalimat: empat kalimat dari tiga bilangan");
    sama(["kfut", "kfat", "kfbt"].map((i) => isiTeks(akhirAdegan(kel, 1), i)), ["15", "3", "12"], "keluarga kalimat: bagan tiga bilangan");
    stat.benda += 14;
  }

  // 8) Stiker Wei dan Kira.
  {
    const st = adegan(M_VIDEO, "stiker-wei");
    const w0 = akhirAdegan(st, 0);
    sama([daftarId(w0, /^wi\d+$/).length, daftarId(w0, /^kr\d+$/).length, daftarId(w0, /^kg\d+$/).length, isiTeks(w0, "nw")], [17, 12, 5, "Wei: 17"], "stiker: Wei tujuh belas, Kira dua belas, lima tempat kosong");
    cek(daftarId(w0, /^kg\d+$/).every((b) => dekat(pusatObj(b), pusatObj(ketemu(w0, `wi${b.id.slice(2)}`)).x === pusatObj(b).x ? { x: pusatObj(b).x, y: pusatObj(b).y } : { x: -999, y: 0 }, 0.01)), "stiker: tempat kosong Kira sejajar dengan lima stiker terakhir Wei");
    const w2 = akhirAdegan(st, 2);
    cek(daftarId(w2, /^wi\d+$/).filter(penuh).length === 12 && daftarId(w2, /^wi\d+$/).filter((b) => !penuh(b)).length === 5 && daftarId(w2, /^wi\d+$/).filter(penuh).length === daftarId(w2, /^kr\d+$/).length, "stiker: setelah lima mundur, stiker Wei sama banyak dengan stiker Kira");
    sama(["wim16", "wim15", "wim14", "wim13", "wim12"].map((i) => isiTeks(w2, i)), ["16", "15", "14", "13", "12"], "stiker: mundur lima dari tujuh belas");
    sama([isiTeks(akhirAdegan(st, 3), "w4-t0"), isiTeks(akhirAdegan(st, 4), "w5-t0")], ["17 - 5 = 12", "12 + 5 = 17"], "stiker: kalimat bilangan");
    const w5 = akhirAdegan(st, 5);
    sama([["c1-t", "c2-t", "c3-t"].map((i) => isiTeks(w5, i)), ketemu(w5, "c2-k").sorot, isiTeks(w5, "q0-t0")], [["12", "13", "14"], true, "Wei 16 stiker, Kira 3 lebih sedikit"], "stiker: tiga belas dipilih (16 dikurangi 3)");
    sama(isiTeks(akhirAdegan(st, 6), "q7-t0"), "16 - 3 = 13", "stiker: kalimat penutup");
    stat.benda += 7;
  }

  // 9) Latihan 1 dan 3, dan metode luar yang berhitung mundur atau memilih.
  {
    const l = adegan(M_VIDEO, "latihan-satu");
    const l0 = akhirAdegan(l, 0);
    cek(daftarId(l0, /^ly\d+$/).length === 17 && isiTeks(l0, "lt-t0") === "17 kelereng" && daftarId(l0, /^ly\d+$/).filter((o) => o.sorot).map((o) => o.id).join() === "ly13,ly14,ly15,ly16", "latihan 1: tujuh belas kelereng, empat disorot");
    const l1 = akhirAdegan(l, 1);
    sama(["lym16", "lym15", "lym14", "lym13"].map((i) => isiTeks(l1, i)), ["16", "15", "14", "13"], "latihan 1: hitung mundur enam belas sampai tiga belas");
    cek(daftarId(l1, /^ly\d+$/).filter(penuh).length === 13, "latihan 1: tiga belas kelereng tersisa");
    const l2 = akhirAdegan(l, 2);
    sama([["c1-t", "c2-t", "c3-t"].map((i) => isiTeks(l2, i)), ketemu(l2, "c2-k").sorot, daftarId(l2, /^c\d-k$/).filter((o) => o.sorot).length], [["12", "13", "14"], true, 1], "latihan 1: tiga belas dipilih");
    sama(isiTeks(akhirAdegan(l, 3), "lj-t0"), "17 - 4 = 13", "latihan 1: kalimat bilangan");
    const t = adegan(M_VIDEO, "latihan-tiga");
    sama([isiTeks(akhirAdegan(t, 0), "ta"), isiTeks(akhirAdegan(t, 0), "tdp"), isiTeks(akhirAdegan(t, 0), "tds")], ["18 - 4 = ?", "?", "?"], "latihan 3: soal delapan belas dikurangi empat, kotak kosong");
    sama([["c1-t", "c2-t", "c3-t"].map((i) => isiTeks(akhirAdegan(t, 1), i)), ketemu(akhirAdegan(t, 1), "c2-k").sorot, isiTeks(akhirAdegan(t, 1), "tds")], [["3", "4", "5"], true, "4"], "latihan 3: satuan delapan dikurangi empat sama dengan empat");
    sama([["c1-t", "c2-t", "c3-t"].map((i) => isiTeks(akhirAdegan(t, 2), i)), ketemu(akhirAdegan(t, 2), "c2-k").sorot, isiTeks(akhirAdegan(t, 2), "tdp")], [["0", "1", "2"], true, "1"], "latihan 3: puluhan tetap satu");
    sama([isiTeks(akhirAdegan(t, 3), "ta"), isiTeks(akhirAdegan(t, 3), "tj-t0")], ["18 - 4 = 14", "14 = 10 + 4"], "latihan 3: empat belas = satu puluhan dan empat satuan");
    const pc = adegan(M_VIDEO, "pilih-cara");
    sama([[0, 1, 2].map((i) => isiTeks(akhirAdegan(pc, 0), `cr${i}-t0`)), isiTeks(akhirAdegan(pc, 2), "pa-t0"), isiTeks(akhirAdegan(pc, 3), "pb-t0"), isiTeks(akhirAdegan(pc, 4), "pc-t0")], [["Mundur", "Pasangan", "Nilai tempat"], "17 - 2 = 15", "19 - 6 = 13", "15 - 3 = 12"], "pilih cara: tiga cara dan tiga contoh");

    // Metode luar: balon, bagan, dan pilihan.
    const lb = adegan(U, "luar-mundur-terapan");
    const b0 = akhirAdegan(lb, 0);
    cek(daftarId(b0, /^lb\d+$/).length === 18 && daftarId(b0, /^lb\d+$/).filter((o) => o.sorot).map((o) => o.id).join() === "lb13,lb14,lb15,lb16,lb17" && isiTeks(b0, "bn-t0") === "18 balon, 5 terbang", "luar mundur terapan: delapan belas balon, lima terbang");
    const b1 = akhirAdegan(lb, 1);
    sama(["lbm17", "lbm16", "lbm15", "lbm14", "lbm13"].map((i) => isiTeks(b1, i)), ["17", "16", "15", "14", "13"], "luar mundur terapan: mundur lima dari delapan belas");
    cek(daftarId(b1, /^lb\d+$/).filter(penuh).length === 13, "luar mundur terapan: tiga belas balon tersisa");
    sama(isiTeks(akhirAdegan(lb, 2), "bj-t0"), "18 - 5 = 13", "luar mundur terapan: kalimat bilangan");
    const b3 = akhirAdegan(lb, 3);
    sama([["c1-t", "c2-t", "c3-t"].map((i) => isiTeks(b3, i)), ketemu(b3, "c2-k").sorot, daftarId(b3, /^c\d-k$/).filter((o) => o.sorot).length], [["12", "13", "14"], true, 1], "luar mundur terapan: tiga belas dipilih");
    const lp = adegan(U, "luar-pasangan");
    sama([["pgut", "pgat", "pgbt"].map((i) => isiTeks(akhirAdegan(lp, 1), i)), isiTeks(akhirAdegan(lp, 3), "pj-t0"), isiTeks(akhirAdegan(lp, 4), "pk-t0")], [["15", "3", "12"], "15 - 3 = 12", "12 + 3 = 15"], "luar pasangan: lima belas = tiga + dua belas");
    const lt = adegan(U, "luar-pasangan-terapan");
    sama([["ptut", "ptat", "ptbt"].map((i) => isiTeks(akhirAdegan(lt, 0), i)), ["c1-t", "c2-t", "c3-t"].map((i) => isiTeks(akhirAdegan(lt, 2), i)), ketemu(akhirAdegan(lt, 2), "c2-k").sorot], [["16", "5", "?"], ["10", "11", "12"], true], "luar pasangan terapan: enam belas, lima, dan pilihan sebelas");
    sama([["ptut", "ptat", "ptbt"].map((i) => isiTeks(akhirAdegan(lt, 3), i)), isiTeks(akhirAdegan(lt, 3), "pm-t0"), isiTeks(akhirAdegan(lt, 3), "pn-t0")], [["16", "5", "11"], "5 + 11 = 16", "16 - 5 = 11"], "luar pasangan terapan: lima ditambah sebelas sama dengan enam belas");
    stat.benda += 28;
  }

  // Aturan pemilik: aplikasi belajar mandiri; tanpa instruksi kelompok, teman, kelas, atau buku.
  {
    const MANDIRI = /kelompok|\bteman\w*|\bkawan\w*|sekawan|depan kelas|bersama kelas|seluruh kelas|\bkelas\b|berpasangan|bermain bersama|bertanya kepada|buat ceritamu|buku|menulis di|menuliskan di|tulis di|tuliskan di|menggambar|gambarlah|gambar sendiri|\bbawa(lah)?\b|membawa|dibawa|\bkertas\b|\bpensil\b|\bpulpen\b|\bspidol\b|ambil (benda|pensil|kelereng|bola|sedotan|balon)|tangan (kiri|kanan)|\bjari\b|menyuruh|suruh|\braba\w*|\bmeraba|\btubuh|\blengan|lingkari|coret|guru kelas|di rumah|orang tua|\bayah\b|\bibu guru|bapak guru/i;
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
  const DAFTAR = ["Menghitung mundur", "Memisah puluhan dan satuan", "Memeriksa dengan menambah"];
  cek(/Halo anak-anak/.test(sap.ketukan[0].suara) && /Menghitung mundur/i.test(L.teksTerlihat(akhirAdegan(sap, 1)).join(" | ")), "sapaan materi: tiga hal yang dipelajari tampil");
  sama(L.teksTerlihat(akhirAdegan(sap, 1)).filter((t) => DAFTAR.includes(t)), DAFTAR, "sapaan materi: daftar tiga hal");
  cek(!/\d/.test(sap.ketukan[1].suara) && !/\d/.test(DAFTAR.join(" ")), "sapaan materi: tanpa angka");
  const sapLuar = adegan(U, "sapaan");
  cek(/cara lain/i.test(L.teksTerlihat(akhirAdegan(sapLuar, 1)).join(" | ")) && /metode-luar|Metode luar/.test(sapLuar.sumber), "sapaan metode luar: pengumuman cara lain");
  const sumberRingkas = JSON.parse(readFileSync(new URL("../src/data/kelas1-bab6-ringkas.json", import.meta.url), "utf8")).subBab.C;
  const sementara = new URL("../.tmp-k1b6s/C.json", import.meta.url);
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
    cek(A.petaSusun.pusat.judul.length > 8 && /\?$/.test(A.petaSusun.pusat.judul), "peta susun: pusat berupa masalah (pertanyaan) sub-bab");
    const T = A.tabelSusun;
    cek(T.baris.length >= 3 && T.baris.length <= 5 && T.kolom.length >= 3 && T.kolom.length <= 4, "tabel susun: 3 sampai 5 baris dan 3 sampai 4 kolom");
    cek(T.baris.every((b) => b.sel.every((s) => s.length <= 26 && (s.match(/\d+/g) ?? []).length <= 1)), "tabel susun: sel <= 26 huruf dan paling banyak satu angka per sel");
    cek(T.baris.every((b) => b.label.split(/\s+/).every((w) => w.length <= 8)), "tabel susun: kata terpanjang kolom label <= 8 huruf");
    cek(!/\d/.test(T.suara) && !/\d/.test(T.petunjuk), "tabel susun: suara dan petunjuk tanpa digit");
    // Isi tabel dihitung ulang: awal dikurangi pergi sama dengan sisa, tanpa melewati sepuluh, paling besar dua puluh.
    sama(T.kolom, ["Awal", "Pergi", "Sisa"], "tabel susun: kolom Awal, Pergi, Sisa");
    cek(T.baris.every((b) => {
      const [x, y, z] = b.sel.map(Number);
      return x - y === z && x <= 20 && z >= 10;
    }), "tabel susun: awal dikurangi pergi sama dengan sisa (paling besar 20, tanpa melewati sepuluh)");
    cek([0, 1, 2].every((j) => new Set(T.baris.map((b) => b.sel[j])).size === T.baris.length), "tabel susun: isi tiap kolom berbeda-beda");
    // Margin teks sel di lebar 405 px: sel pendek (paling banyak delapan huruf) supaya margin teks >= 5 px.
    cek(T.baris.every((b) => b.sel.every((s) => s.length <= 8)), "tabel susun: sel pendek supaya margin teks >= 5 px di 405 px");
    const KATA_LARANG = /buku|halaman|kunci|kelompok|\bteman|kawan|kelas\b|kertas|pensil|\bbawa\b|menggambar|menulis di|depan kelas|luas|keliling|di rumah|pinjam|simpan/i;
    cek(!KATA_LARANG.test(JSON.stringify({ p: A.petaSusun, t: A.tabelSusun })), "peta dan tabel susun: tanpa kata terlarang dan tanpa kelompok, teman, kelas, buku, kertas, pensil");
    cek(peta.every((s) => ![...s.teks, ...(s.ikon ?? "")].some((c) => c.codePointAt(0) > 0x1fa95)) && ![...A.petaSusun.pusat.ikon].some((c) => c.codePointAt(0) > 0x1fa95), "peta susun: emoji paling tinggi Emoji 12");
  } else cek(false, "peta dan tabel susun: .tmp-k1b6s/C.json atau kelas1-bab6-ringkas.json subBab.C.petaSusun ada");
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k1b6C-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k1b6C-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k1b6C sendiri (${impor.join(", ")})`);
  }
  // Emoji dalam data teks gambar juga paling tinggi Emoji 12 (diperiksa pada gambar yang diputar).
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d), `${v.id}/${a.id}: emoji gambar paling tinggi Emoji 12`);
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k1b6c.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|naskah-k1b/.test(pembungkus) && /VIDEO_MATERI_K1B6C/.test(pembungkus) && /VIDEO_LUAR_K1B6C/.test(pembungkus) && /export function VideoK1B6C/.test(pembungkus) && /daftar-video-cerita/.test(pembungkus), "video-k1b6c.tsx: dua video dari mesin Story, tanpa naskah lama");
  cek(!/\r/.test(pembungkus), "video-k1b6c.tsx: akhir baris LF");
  const sendiri = readFileSync(new URL("uji-story-k1b6C.mjs", import.meta.url), "utf8");
  cek(!/\r/.test(sendiri), "uji-story-k1b6C.mjs: akhir baris LF");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit diputar)`);
}
console.log(`Pemeriksaan: ${stat.hitung} deret hitung maju, ${stat.mundur} deret hitung mundur, ${jumlahNama} nama bilangan tampak sebagai angka, ${stat.aritmetika} kalimat tambah dan kurang, ${stat.garis} pemeriksaan garis bilangan, ${stat.benda} pemeriksaan benda, kotak, dan bagan`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
