// Uji Story Kelas 1 Bab 6 Sub-Bab A (Mengenal Konsep Lebih dari, Kurang dari, dan Selisih): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Video diputar bergaya guru: suara, teks terlihat, sumber, judul adegan, dan subjudul tanpa penyebutan buku (kata terlarang diperiksa pada adegan yang diputar).
// Memeriksa: pemicu kata, suara tanpa digit, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas, teks bertumpuk, pemisahan materi dan metode luar (nama metode hanya Indonesia),
// hanya bilangan sampai dua puluh (tanpa kali, bagi, bersusun, pinjam, simpan, bilangan lebih besar), hitungan satu per satu (angka berurutan, dekat bendanya, sama dengan bilangan yang diucapkan),
// nama bilangan sepuluh sampai dua puluh yang diucapkan tampak sebagai angka, setiap kalimat tambah, kurang, dan perbandingan (suara dan gambar) dihitung ulang, garis pasangan, batang kotak, bingkai, garis bilangan dan lompatan,
// aturan pemilik (belajar mandiri digital: tanpa kelompok, teman, depan kelas, buku, menulis atau menggambar di buku, membawa benda nyata),
// emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k1b6A.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k1b6A-video.ts");
const U1 = await import("../src/components/modul/story/k1b6A-luar-1.ts");
const B = await import("../src/components/modul/story/k1b6A-bantu.ts");
const G = await import("../src/components/modul/story/k1b6A-gambar.ts");

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
const VIDEO = [V.VIDEO_MATERI_K1B6A, V.VIDEO_LUAR_K1B6A];
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
const M_VIDEO = V.VIDEO_MATERI_K1B6A;
const U = V.VIDEO_LUAR_K1B6A;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const NAMA_LUAR = /Maju dan Mundur|Pasangan sampai (20|dua puluh)|Menjadikan Sepuluh|metode luar|metode dari luar/i;
const NAMA_INGGRIS = /Counting|Number Bond|Make Ten|Count On|Count Back|Bond to/i;
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M_VIDEO);
  const luar = teksVideo(U);
  cek(!NAMA_LUAR.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of U1.NAMA_METODE_ID) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE_ID, ["Maju dan Mundur", "Pasangan sampai 20", "Menjadikan Sepuluh"], "nama Indonesia metode luar");
  cek(!NAMA_INGGRIS.test(materi) && !NAMA_INGGRIS.test(luar), "nama metode hanya bahasa Indonesia (tanpa Counting On/Back, Number Bond, Make Ten)");
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
      cek(!/\b(Tika|Ibu|Ayah|Bapak|Budi|Ani|Doni|Sinta|Dewi|Rudi|Nina|Andi|Siti)\b/.test(semua.join(" | ")), `${v.id}/${a.id}: hanya enam tokoh tetap`);
    }
  }
  cek(M_VIDEO.subjudul === "Materi kurikulum" && U.subjudul === "Tiga metode luar", "subjudul video: Materi kurikulum dan Tiga metode luar");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 46), "video materi: label sumber berbentuk Materi: ... dan pendek");
  cek(U.adegan.every((a) => /Metode luar|Ringkasan/i.test(a.sumber) && a.sumber.length <= 46), "video metode luar: label sumber metode luar atau ringkasan, pendek");
  cek(M_VIDEO.id === "k1b6A-materi" && U.id === "k1b6A-luar", "id video k1b6A-materi dan k1b6A-luar");
  cek(U.judul.endsWith(": Metode dari Luar") && !/menurut/i.test(M_VIDEO.judul), "judul video: materi tanpa 'menurut', luar berakhir ': Metode dari Luar'");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,membuat-donat,pasangkan-satu,kata-pembanding,bunga-kupu,beda-selisih,model-batang,garis-bilangan,cerita-lebihnya,cerita-kurangnya,detektif,kalimat-benar,latihan-satu,latihan-dua,latihan-tiga,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-maju,luar-maju-terapan,luar-pasangan,luar-pasangan-terapan,luar-sepuluh,luar-sepuluh-terapan,luar-ringkas", "urutan adegan metode luar");
  cek(M_VIDEO.adegan[0].id === "sapaan" && U.adegan[0].id === "sapaan", "tiap video dibuka adegan sapaan");
  cek(M_VIDEO.adegan.filter((a) => /^latihan-/.test(a.id)).length === 3 && M_VIDEO.adegan[M_VIDEO.adegan.length - 1].id === "penutup", "video materi: Latihan 1 sampai 3 lalu penutup");
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-maju", "luar-maju-terapan", "luar-pasangan", "luar-pasangan-terapan", "luar-sepuluh", "luar-sepuluh-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(U.adegan[1].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  for (const kata of ["Latihan", "Igil", "Malosi", "Halim", "Kira", "Wei", "Upe", "donat", "kelereng", "lebih dari", "kurang dari", "lebihnya", "kurangnya", "selisih", "beda", "dikurangi", "ditambah", "garis bilangan", "detektif", "satu per satu"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  // Hanya bilangan sampai dua puluh: tanpa kali, bagi, bilangan lebih dari dua puluh, bersusun, pinjam, simpan, ukuran, atau rumus. Tambah dan kurang BOLEH (hasil dihitung ulang di bawah).
  const BOCOR = /dikali|perkalian|pembagian|dibagi|\bratus\b|\bribu\b|dua puluh (satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan)|(tiga|empat|lima|enam|tujuh|delapan|sembilan) puluh|\bluas\b|keliling|rumus|volume|sentimeter|\bcm\b|bersusun|meminjam|pinjam|menyimpan|simpan|×|÷|−/i;
  for (const v of [M_VIDEO, U]) {
    for (const a of v.adegan) cek(!BOCOR.test(teksAdegan(a)), `${v.id}/${a.id}: hanya bilangan sampai dua puluh (tanpa kali, bagi, bersusun, pinjam, simpan, bilangan lebih dari dua puluh, ukuran, rumus)`);
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
/* ------------------------------ Hitungan, benda, dan bingkai dihitung ulang dari gambar ------------------------------ */
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
const pusatObj = (b) => (b.t === "kotak" ? { x: b.x + b.w / 2, y: b.y + b.h / 2 } : b.t === "garis" ? { x: b.x + (b.x2 ?? 0) / 2, y: b.y + (b.y2 ?? 0) / 2 } : { x: b.x, y: b.y });
const dekat = (a, b, r = 0.6) => Math.hypot(a.x - b.x, a.y - b.y) <= r;
const daftarId = (objs, pola) => objs.filter((o) => pola.test(o.id));
const di = (id, ke) => {
  const a = adegan(M_VIDEO, id) ?? adegan(U, id);
  return akhirAdegan(a, ke);
};
const diKata = (id, ke, kata) => {
  const a = adegan(M_VIDEO, id) ?? adegan(U, id);
  return L.keadaanStory(a, ke, kata);
};
const pusatSel = (i, x, y, sel = 26) => ({ x: x + (i % 5) * sel + sel / 2, y: y + Math.floor(i / 5) * sel + sel / 2 });
const pusatDua = (i, y) => (i < 10 ? pusatSel(i, 14, y) : pusatSel(i - 10, 156, y));
const dalamKotak = (b, x, y, w, h) => b.x > x && b.x < x + w && b.y > y && b.y < y + h;
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

  // 2) Kalimat tambah, kurang, dan perbandingan: dihitung ulang di suara dan gambar (hasil benar, paling besar dua puluh).
  const N = NAMA.slice(1).sort((m, n) => n.length - m.length).join("|");
  const nil = (s) => NAMA.indexOf(s.toLowerCase());
  const reTambah = new RegExp(`\\b(${N}) ditambah (${N}) (?:sama dengan|menjadi) (${N})\\b`, "gi");
  const reKurang = new RegExp(`\\b(${N}) dikurangi (${N}) sama dengan (${N})\\b`, "gi");
  const reBanding = new RegExp(`\\b(${N})(?: [a-z]+)? (lebih|kurang) dari (${N})\\b`, "gi");
  const reSelisih = new RegExp(`\\bselisih (${N}) dan (${N}) adalah (${N})\\b`, "gi");
  const rePasangan = new RegExp(`\\b(${N}) dan (${N}) adalah pasangan yang membentuk dua puluh`, "gi");
  let jumlahTambah = 0;
  let jumlahKurang = 0;
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((kt, i) => {
        const nm = `${v.id}/${a.id}#${i + 1}`;
        for (const m of kt.suara.matchAll(reTambah)) {
          stat.aritmetika += 1;
          cek(nil(m[1]) + nil(m[2]) === nil(m[3]) && nil(m[3]) <= 20, `${nm} suara: "${m[0]}" benar`);
        }
        for (const m of kt.suara.matchAll(reKurang)) {
          stat.aritmetika += 1;
          cek(nil(m[1]) - nil(m[2]) === nil(m[3]) && nil(m[2]) <= nil(m[1]) && nil(m[1]) <= 20, `${nm} suara: "${m[0]}" benar`);
        }
        for (const m of kt.suara.matchAll(reBanding)) {
          stat.aritmetika += 1;
          cek(m[2].toLowerCase() === "lebih" ? nil(m[1]) > nil(m[3]) : nil(m[1]) < nil(m[3]), `${nm} suara: "${m[0]}" benar`);
        }
        for (const m of kt.suara.matchAll(reSelisih)) {
          stat.aritmetika += 1;
          cek(Math.abs(nil(m[1]) - nil(m[2])) === nil(m[3]), `${nm} suara: "${m[0]}" benar`);
        }
        for (const m of kt.suara.matchAll(rePasangan)) {
          stat.aritmetika += 1;
          cek(nil(m[1]) + nil(m[2]) === 20, `${nm} suara: "${m[0]}" berjumlah dua puluh`);
        }
        const banyakTambah = (kt.suara.match(/ditambah/gi) ?? []).length;
        const banyakKurang = (kt.suara.match(/dikurangi/gi) ?? []).length;
        jumlahTambah += banyakTambah;
        jumlahKurang += banyakKurang;
        cek((kt.suara.match(reTambah) ?? []).length === banyakTambah, `${nm}: setiap kalimat 'ditambah' dikenali dan dihitung ulang`);
        cek((kt.suara.match(reKurang) ?? []).length === banyakKurang, `${nm}: setiap kalimat 'dikurangi' dikenali dan dihitung ulang`);
        // Suara bilangan yang diucapkan tidak boleh lebih dari dua puluh.
        cek(!/\b(tiga|empat|lima|enam|tujuh|delapan|sembilan) puluh\b/i.test(kt.suara), `${nm}: suara tanpa bilangan lebih dari dua puluh`);
        for (const t of L.teksTerlihat(akhirAdegan(a, i))) {
          const j = /^(\d+) \+ (\d+) = (\d+)$/.exec(t);
          if (j) {
            stat.aritmetika += 1;
            cek(Number(j[1]) + Number(j[2]) === Number(j[3]) && Number(j[3]) <= 20, `${nm} gambar: "${t}" benar`);
          }
          const u = /^(\d+) - (\d+) = (\d+)$/.exec(t);
          if (u) {
            stat.aritmetika += 1;
            cek(Number(u[1]) - Number(u[2]) === Number(u[3]) && Number(u[2]) <= Number(u[1]) && Number(u[1]) <= 20, `${nm} gambar: "${t}" benar`);
          }
          const b = /^(\d+) (lebih|kurang) dari (\d+)$/.exec(t);
          if (b) {
            stat.aritmetika += 1;
            cek(b[2] === "lebih" ? Number(b[1]) > Number(b[3]) : Number(b[1]) < Number(b[3]), `${nm} gambar: "${t}" benar`);
          }
        }
      });
    }
  }
  cek(jumlahTambah >= 6 && jumlahKurang >= 6, `kalimat tambah dan kurang cukup banyak (${jumlahTambah} tambah, ${jumlahKurang} kurang)`);

  // 3) Garis bilangan: setiap angka dan garis kecil tepat di tempatnya; lompatan satu langkah, berantai, dan banyaknya sama dengan selisih.
  const nBil = (x) => (x - 20) / 24 + 4;
  const rantai = (objs, pola) => {
    const l = objs.filter((o) => o.t === "jalur" && pola.test(o.id)).sort((p, q) => Number(p.id.replace(/\D/g, "")) - Number(q.id.replace(/\D/g, "")));
    const langkah = l.map((o) => {
      const ke = /Q(-?[\d.]+) (-?[\d.]+) (-?[\d.]+) 0$/.exec(o.d);
      const dx = Number(ke[3]);
      return { dari: nBil(o.x), arah: dx > 0 ? 1 : -1, ok: Math.abs(dx) === 24 && Math.abs(Number(ke[1]) * 2) === Math.abs(dx) && Number.isInteger(nBil(o.x)) };
    });
    const sambung = langkah.every((s, q) => s.ok && (q === 0 || (s.arah === langkah[0].arah && s.dari === langkah[q - 1].dari + s.arah)));
    return { n: l.length, sambung, dari: langkah[0]?.dari, ke: langkah.length ? langkah[langkah.length - 1].dari + langkah[0].arah : undefined, arah: langkah[0]?.arah };
  };
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((kt, i) => {
        const objs = akhirAdegan(a, i);
        for (const o of objs.filter((q) => /^gb-n\d+$/.test(q.id))) {
          const n = Number(o.id.slice(4));
          cek(o.isi === String(n) && o.x === 20 + (n - 4) * 24 && ketemu(objs, `gb-t${n}`).x === o.x, `${v.id}/${a.id}#${i + 1}: garis bilangan, ${n} tepat di tempatnya`);
        }
      });
    }
  }
  {
    const cekRantai = (id, ke, pola, dari, sampai, ket) => {
      const r = rantai(di(id, ke), pola);
      const beda = Math.abs(sampai - dari);
      cek(r.n === beda && r.sambung && r.dari === dari && r.ke === sampai && r.arah === (sampai > dari ? 1 : -1), `${id}#${ke + 1}: ${ket}: ${beda} lompatan berantai dari ${dari} ke ${sampai} (ada ${r.n}, sambung ${r.sambung}, ${r.dari}->${r.ke})`);
      stat.benda += 1;
    };
    const G = adegan(M_VIDEO, "garis-bilangan");
    cekRantai("garis-bilangan", 2, /^l\d+$/, 7, 9, "Wei tujuh, Kira sembilan");
    sama([ketemu(di("garis-bilangan", 0), "lw").x, ketemu(di("garis-bilangan", 0), "lk").x], [92, 140], "garis bilangan: Wei di tujuh, Kira di sembilan");
    sama(isiTeks(di("garis-bilangan", 3), "sd-t0"), "selisih: 2", "garis bilangan: selisih dua");
    sama(isiTeks(di("garis-bilangan", 4), "pg-t0"), "9 - 7 = 2", "garis bilangan: sembilan dikurangi tujuh");
    cekRantai("garis-bilangan", 5, /^m\d+$/, 4, 8, "Upe empat, Malosi delapan");
    sama([ketemu(di("garis-bilangan", 5), "lu").x, ketemu(di("garis-bilangan", 5), "lm").x, isiTeks(di("garis-bilangan", 5), "se-t0")], [20, 116, "selisih: 4"], "garis bilangan: Upe di empat, Malosi di delapan, selisih empat");
    // Lompatan muncul sesuai kata yang diucapkan (hitungan "satu langkah" per kata bilangan).
    const t3 = tokoh(G.ketukan[2].suara);
    cek(L.keadaanStory(G, 2, t3.indexOf("delapan")).filter((o) => /^l\d+$/.test(o.id)).length === 1 && L.keadaanStory(G, 2, t3.indexOf("dua")).filter((o) => /^l\d+$/.test(o.id)).length === 2, "garis bilangan: lompatan pertama saat 'delapan', kedua saat 'sembilan'");
    cekRantai("luar-maju", 2, /^mj\d+$/, 6, 9, "maju dari enam ke sembilan");
    cekRantai("luar-maju", 3, /^mn\d+$/, 9, 6, "mundur dari sembilan ke enam");
    sama([isiTeks(di("luar-maju", 2), "sd-t0"), isiTeks(di("luar-maju", 4), "ma-t0"), isiTeks(di("luar-maju", 4), "mb-t0")], ["selisih: 3", "6 + 3 = 9", "9 - 3 = 6"], "luar maju: selisih tiga, tambah dan kurang");
    cekRantai("luar-maju-terapan", 1, /^mt\d+$/, 8, 12, "maju dari delapan ke dua belas");
    sama([isiTeks(di("luar-maju-terapan", 2), "mc-t0"), ["c1-t", "c2-t", "c3-t"].map((q) => isiTeks(di("luar-maju-terapan", 3), q)), ketemu(di("luar-maju-terapan", 3), "c2-k").sorot], ["12 - 8 = 4", ["3", "4", "5"], true], "luar maju terapan: selisih empat dipilih");
    cekRantai("luar-sepuluh", 1, /^sa\d+$/, 8, 10, "dari delapan ke sepuluh");
    cekRantai("luar-sepuluh", 2, /^sb\d+$/, 10, 14, "dari sepuluh ke empat belas");
    sama([isiTeks(di("luar-sepuluh", 3), "sj-t0")], ["2 + 4 = 6"], "luar sepuluh: dua ditambah empat");
    cekRantai("luar-sepuluh-terapan", 1, /^ta\d+$/, 6, 10, "dari enam ke sepuluh");
    cekRantai("luar-sepuluh-terapan", 2, /^tb\d+$/, 10, 13, "dari sepuluh ke tiga belas");
    sama(isiTeks(di("luar-sepuluh-terapan", 3), "tj-t0"), "4 + 3 = 7", "luar sepuluh terapan: empat ditambah tiga");
    // Selisih = jumlah dua jarak lewat sepuluh.
    cek(14 - 8 === 2 + 4 && 13 - 6 === 4 + 3, "menjadikan sepuluh: selisih sama dengan jumlah dua jarak");
  }

  // 4) Pasangan satu-satu: tiap garis menyambung benda di baris atas dan bawah yang segaris; yang tidak berpasangan sama dengan selisih.
  {
    const pasang = [
      ["pasangkan-satu", 6, "pr", "d", "e", 7, 6],
      ["bunga-kupu", 5, "pq", "bg", "kp", 5, 7],
      ["cerita-lebihnya", 4, "lq", "kr", "ha", 5, 7],
      ["latihan-satu", 4, "la", "m", "b", 8, 7],
    ];
    for (const [id, ke, g, atas, bawah, na, nb] of pasang) {
      const o = di(id, ke);
      const A = daftarId(o, new RegExp(`^${atas}\\d+$`));
      const Bb = daftarId(o, new RegExp(`^${bawah}\\d+$`));
      const gs = daftarId(o, new RegExp(`^${g}\\d+$`));
      sama([A.length, Bb.length, gs.length], [na, nb, Math.min(na, nb)], `${id}: banyak benda atas, bawah, dan garis pasangan`);
      cek(A.every((b) => b.y === A[0].y) && Bb.every((b) => b.y === Bb[0].y) && A[0].y < Bb[0].y, `${id}: dua baris rapi`);
      const pasanganOk = gs.every((l) => {
        const i = Number(l.id.slice(g.length));
        const p = A.find((b) => b.id === `${atas}${i}`);
        const q = Bb.find((b) => b.id === `${bawah}${i}`);
        return p && q && l.x === p.x && l.x === q.x && l.x2 === 0 && l.y > p.y && l.y + l.y2 < q.y;
      });
      cek(pasanganOk, `${id}: tiap garis pasangan lurus dari benda atas ke benda bawah yang segaris`);
      const tanpaPasangan = Math.max(na, nb) - gs.length;
      sama(tanpaPasangan, Math.abs(na - nb), `${id}: benda tanpa pasangan sama dengan selisih`);
      stat.benda += 4;
    }
    // Kartu selisih mengikuti banyak benda tanpa pasangan.
    const q = di("bunga-kupu", 5);
    sama(["q1-t0", "q2-t0", "q3-t0"].map((i) => isiTeks(q, i)), ["lebihnya: 2", "kurangnya: 2", "beda: 2"], "bunga kupu: lebihnya, kurangnya, dan beda sama dengan dua");
    sama([isiTeks(di("bunga-kupu", 3), "lb-t0"), isiTeks(di("bunga-kupu", 3), "lj-t0"), isiTeks(di("bunga-kupu", 4), "ps-t0")], ["7 lebih dari 5", "lebihnya: 2", "7 - 5 = 2"], "bunga kupu: perbandingan dan pengurangan");
    sama(daftarId(di("bunga-kupu", 2), /^kp\d$/).filter((b) => b.sorot).map((b) => b.id), ["kp5", "kp6"], "bunga kupu: dua kupu-kupu tanpa pasangan disorot");
    const p = di("pasangkan-satu", 6);
    sama([isiTeks(p, "jb-t0"), isiTeks(p, "jk-t0")], ["7 lebih dari 6", "6 kurang dari 7"], "pasangkan: tujuh lebih dari enam, enam kurang dari tujuh");
    sama(ketemu(di("pasangkan-satu", 3), "d6").sorot, true, "pasangkan: donat terakhir Halim disorot");
    // Donat: hitungan membuat tujuh dan enam.
    const d = di("membuat-donat", 4);
    sama([daftarId(d, /^d\d+$/).length, daftarId(d, /^e\d+$/).length, labelAngka(d, "d").length, labelAngka(d, "e").length], [7, 6, 7, 6], "donat: tujuh donat Halim dan enam donat Kira dihitung satu per satu");
    sama([isiTeks(d, "ca-t0"), isiTeks(d, "cb-t0")], ["donat Halim: 7", "donat Kira: 6"], "donat: kartu banyak donat");
    // Lebihnya: Halim lima ditambah dua lebihnya.
    const l = di("cerita-lebihnya", 2);
    sama(daftarId(l, /^ha\d$/).filter((b) => b.garis === "#FFC800").map((b) => b.id), ["ha5", "ha6"], "cerita lebihnya: dua kelereng lebihnya bergaris emas");
    sama([isiTeks(di("cerita-lebihnya", 3), "pj-t0"), isiTeks(di("cerita-lebihnya", 4), "hj-t0")], ["5 + 2 = 7", "7 lebih dari 5"], "cerita lebihnya: lima ditambah dua, tujuh lebih dari lima");
    // Kurangnya: Wei sebelas balon, Upe tiga kurangnya.
    const w0 = di("cerita-kurangnya", 0);
    cek(daftarId(w0, /^wb\d+$/).length === 11 && daftarId(w0, /^wb\d+$/).every((b, i) => b.x === 30 + i * 24 && b.y === 70), "cerita kurangnya: sebelas balon Wei rapi");
    const w2 = di("cerita-kurangnya", 2);
    cek(daftarId(w2, /^sl\d+$/).length === 11 && daftarId(w2, /^sl\d+$/).every((s, i) => s.x === 30 + i * 24 - 10), "cerita kurangnya: sebelas tempat sejajar balon Wei");
    sama(daftarId(w2, /^sl\d+$/).filter((s) => s.garis === "#DC2626").map((s) => s.id), ["sl8", "sl9", "sl10"], "cerita kurangnya: tiga tempat terakhir kosong");
    const w4 = di("cerita-kurangnya", 4);
    cek(daftarId(w4, /^up\d+$/).length === 8 && daftarId(w4, /^up\d+$/).every((b, i) => Math.abs(b.x - (30 + i * 24)) < 0.01), "cerita kurangnya: delapan balon Upe mengisi tempat dari kiri");
    sama(isiTeks(di("cerita-kurangnya", 3), "pk-t0"), "11 - 3 = 8", "cerita kurangnya: sebelas dikurangi tiga");
    stat.benda += 12;
  }

  // 5) Batang kotak: kotak emas atau kotak yang diwarnai sama dengan selisih.
  {
    const a = adegan(M_VIDEO, "model-batang");
    const m2 = akhirAdegan(a, 2);
    sama([daftarId(m2, /^ba-c\d+$/).length, daftarId(m2, /^bb-c\d+$/).length, daftarId(m2, /^ba-c\d+$/).filter((c) => c.warna === "#FFC800").length], [7, 5, 2], "model batang: tujuh, lima, dan dua kotak emas");
    cek(daftarId(m2, /^ba-c\d+$/).filter((c) => c.warna === "#FFC800").every((c) => Number(c.id.slice(4)) >= 5), "model batang: kotak emas melebihi batang kedua");
    const m3 = akhirAdegan(a, 3);
    sama(daftarId(m3, /^bx\d$/).map((c) => c.x), [150, 168], "model batang: dua kotak kosong melengkapi batang kedua");
    sama(isiTeks(m3, "sk"), "kurangnya: 2 kotak", "model batang: kurangnya dua");
    sama(isiTeks(akhirAdegan(a, 4), "mp-t0"), "7 - 5 = 2", "model batang: tujuh dikurangi lima");
    const b = adegan(M_VIDEO, "latihan-dua");
    const b3 = akhirAdegan(b, 2);
    sama([daftarId(b3, /^ba-c\d+$/).length, daftarId(b3, /^bb-c\d+$/).length, daftarId(b3, /^bx\d$/).length], [9, 5, 4], "latihan 2: sembilan, lima, dan empat kotak yang diwarnai");
    cek(daftarId(b3, /^bx\d$/).every((c, i) => c.x === 60 + (5 + i) * 18 && c.y === ketemu(b3, "bb-c0").y), "latihan 2: kotak diwarnai menyambung batang kedua sampai sama panjang");
    sama([isiTeks(b3, "sk"), isiTeks(b3, "mp-t0")], ["selisih: 4 kotak", "9 - 5 = 4"], "latihan 2: selisih empat");
    // Hitungan kotak muncul satu per satu mengikuti kata bilangan.
    const t2 = tokoh(b.ketukan[1].suara);
    [["satu", 1], ["dua", 2], ["tiga", 3], ["empat", 4]].forEach(([kata, n]) => cek(L.keadaanStory(b, 1, t2.lastIndexOf(kata)).filter((o) => /^bx\d$/.test(o.id)).length === n, `latihan 2: saat "${kata}" ada ${n} kotak diwarnai`));
    stat.benda += 9;
  }

  // 6) Dua bingkai dan titik: pasangan yang membentuk dua puluh.
  {
    const a = adegan(U, "luar-pasangan");
    const o1 = akhirAdegan(a, 1);
    const t1 = daftarId(o1, /^pb-t\d+$/);
    cek(t1.length === 12 && t1.every((d) => dekat(d, pusatDua(Number(d.id.slice(4)), 50)) && d.warna === (Number(d.id.slice(4)) < 10 ? "#DC2626" : "#1C01A5")), "luar pasangan: dua belas titik tepat di petak, sepuluh merah dan dua biru");
    sama([isiTeks(akhirAdegan(a, 0), "bl"), isiTeks(o1, "bl")], ["20", "12"], "luar pasangan: pencacah dua puluh lalu dua belas");
    const o2 = akhirAdegan(a, 2);
    const kosong = daftarId(o2, /^pb[ab]-c\d$/).filter((c) => c.sorot);
    sama([kosong.length, 20 - t1.length, kosong.every((c) => c.id.startsWith("pbb-") && Number(c.id.slice(5)) >= 2)], [8, 8, true], "luar pasangan: delapan petak kosong disorot");
    sama(isiTeks(akhirAdegan(a, 3), "pj-t0"), "12 + 8 = 20", "luar pasangan: dua belas ditambah delapan");
    const b = adegan(U, "luar-pasangan-terapan");
    const q1 = akhirAdegan(b, 0);
    const t5 = daftarId(q1, /^qb-t\d+$/);
    cek(t5.length === 15 && t5.every((d) => dekat(d, pusatDua(Number(d.id.slice(4)), 50))) && isiTeks(q1, "bl") === "15", "luar pasangan terapan: lima belas titik tepat di petak");
    const q2 = akhirAdegan(b, 1);
    sama([daftarId(q2, /^qb[ab]-c\d$/).filter((c) => c.sorot).length, 20 - 15], [5, 5], "luar pasangan terapan: lima petak kosong disorot");
    sama(isiTeks(akhirAdegan(b, 2), "qj-t0"), "15 + 5 = 20", "luar pasangan terapan: lima belas ditambah lima");
    const q4 = akhirAdegan(b, 3);
    sama([["c1-t", "c2-t", "c3-t"].map((i) => isiTeks(q4, i)), ketemu(q4, "c2-k").sorot], [["4", "5", "6"], true], "luar pasangan terapan: selisih lima dipilih");
    stat.benda += 8;
  }

  // 7) Selisih, kata pembanding, detektif, dan latihan.
  {
    const s = adegan(M_VIDEO, "beda-selisih");
    sama([isiTeks(akhirAdegan(s, 1), "na-t"), isiTeks(akhirAdegan(s, 1), "nb-t"), isiTeks(akhirAdegan(s, 2), "bd-t0"), isiTeks(akhirAdegan(s, 2), "sl-t0"), isiTeks(akhirAdegan(s, 4), "hs-t0")], ["7", "6", "beda: 1", "selisih: 1", "7 - 6 = 1"], "beda selisih: tujuh dan enam berbeda satu");
    const k6 = akhirAdegan(adegan(M_VIDEO, "kata-pembanding"), 4);
    sama(["wa-e", "wb-e", "wc-e", "wd-e"].map((i) => isiTeks(k6, i)), ["7 lebih dari 6", "6 kurang dari 7", "lebihnya: 1", "kurangnya: 1"], "kata pembanding: contoh tiap kata");
    const d = adegan(M_VIDEO, "detektif");
    sama([isiTeks(akhirAdegan(d, 1), "ta-t"), isiTeks(akhirAdegan(d, 1), "tb-t"), isiTeks(akhirAdegan(d, 2), "td-t0"), isiTeks(akhirAdegan(d, 2), "te-t0"), isiTeks(akhirAdegan(d, 3), "tf-t0")], ["9", "6", "9 lebih dari 6", "6 kurang dari 9", "9 - 6 = 3"], "detektif: sembilan dan enam");
    const kb = adegan(M_VIDEO, "kalimat-benar");
    sama([isiTeks(akhirAdegan(kb, 0), "va-t"), isiTeks(akhirAdegan(kb, 0), "vb-t"), isiTeks(akhirAdegan(kb, 2), "vy-t0"), isiTeks(akhirAdegan(kb, 3), "vz-t0"), isiTeks(akhirAdegan(kb, 3), "vs-t0"), isiTeks(akhirAdegan(kb, 4), "vt-t0"), isiTeks(akhirAdegan(kb, 4), "vu-t0")], ["8", "5", "8 lebih dari 5", "5 kurang dari 8", "8 - 5 = 3", "lebihnya: 3", "kurangnya: 3"], "kalimat benar: delapan dan lima, selisih tiga");
    sama(ketemu(akhirAdegan(kb, 2), "vw-k").sorot, true, "kalimat benar: kata lebih dari dipilih");
    const l1 = adegan(M_VIDEO, "latihan-satu");
    const a2 = akhirAdegan(l1, 2);
    sama([["c1-t", "c2-t", "c3-t"].map((i) => isiTeks(a2, i)), ketemu(akhirAdegan(l1, 3), "c1-k").sorot, isiTeks(akhirAdegan(l1, 3), "lt")], [["1", "2", "3"], true, "8 - 7 = 1"], "latihan 1: lebihnya satu dipilih");
    sama([daftarId(a2, /^m\d+$/).filter((b) => b.warna === "#EF4444").length, daftarId(a2, /^b\d+$/).filter((b) => b.warna === "#3B82F6").length], [8, 7], "latihan 1: delapan kelereng merah dan tujuh biru");
    const l3 = adegan(M_VIDEO, "latihan-tiga");
    const c3 = akhirAdegan(l3, 2);
    sama([daftarId(c3, /^ma\d+$/).length, isiTeks(akhirAdegan(l3, 1), "hp-t0"), ["c1-t", "c2-t", "c3-t"].map((i) => isiTeks(c3, i)), ketemu(c3, "c2-k").sorot], [6, "6 + 2 = 8", ["7", "8", "9"], true], "latihan 3: enam ditambah dua dipilih delapan");
    stat.benda += 6;
  }

  // Aturan pemilik: aplikasi belajar mandiri; tanpa instruksi kelompok, teman, kelas, atau buku.
  {
    const MANDIRI = /kelompok|\bteman\w*|\bkawan\w*|sekawan|depan kelas|bersama kelas|seluruh kelas|\bkelas\b|berpasangan dengan (teman|kawan)|bekerja berpasangan|secara berpasangan|bermain bersama|bertanya kepada|buat ceritamu|buku|menulis di|menuliskan di|tulis di|tuliskan di|menggambar|gambarlah|gambar sendiri|\bbawa(lah)?\b|membawa|dibawa|\bkertas\b|\bpensil\b|\bpulpen\b|\bspidol\b|ambil (benda|pensil|kelereng|bola|sedotan|balon)|tangan (kiri|kanan)|\bjari\b|menyuruh|suruh|\braba\w*|\bmeraba|\btubuh|\blengan|lingkari|coret|guru kelas|di rumah|orang tua|\bayah\b|\bibu guru|bapak guru/i;
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
  const DAFTAR = ["Memasangkan benda satu-satu", "Lebihnya dan kurangnya", "Mencari selisih bilangan"];
  cek(/Halo anak-anak/.test(sap.ketukan[0].suara) && /Memasangkan benda/i.test(L.teksTerlihat(akhirAdegan(sap, 1)).join(" | ")), "sapaan materi: tiga hal yang dipelajari tampil");
  sama(L.teksTerlihat(akhirAdegan(sap, 1)).filter((t) => DAFTAR.includes(t)), DAFTAR, "sapaan materi: daftar tiga hal");
  cek(!/\d/.test(sap.ketukan[1].suara) && !/\d/.test(DAFTAR.join(" ")), "sapaan materi: tanpa angka");
  const sapLuar = adegan(U, "sapaan");
  cek(/cara lain/i.test(L.teksTerlihat(akhirAdegan(sapLuar, 1)).join(" | ")) && /metode-luar|Metode luar/.test(sapLuar.sumber), "sapaan metode luar: pengumuman cara lain");
  const sumberRingkas = JSON.parse(readFileSync(new URL("../src/data/kelas1-bab6-ringkas.json", import.meta.url), "utf8")).subBab?.A;
  const sementara = new URL("../.tmp-k1b6s/A.json", import.meta.url);
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
    // Isi tabel dihitung ulang: label dua bilangan ("Tujuh dan enam"), sel = bilangan besar, bilangan kecil, selisih.
    cek(T.baris.every((b) => {
      const m = /^(.+) dan (.+)$/.exec(b.label.toLowerCase());
      if (!m) return false;
      const x = NAMA.indexOf(m[1]);
      const y = NAMA.indexOf(m[2]);
      return x > y && y >= 1 && x <= 20 && b.sel[0] === String(x) && b.sel[1] === String(y) && b.sel[2] === String(x - y);
    }), "tabel susun: bilangan besar, bilangan kecil, dan selisih sesuai dua bilangan pada label");
    sama(T.kolom, ["Besar", "Kecil", "Selisih"], "tabel susun: kolom besar, kecil, selisih");
    // Margin teks sel di lebar 405 px: sel pendek (paling banyak delapan huruf) supaya margin teks >= 5 px.
    cek(T.baris.every((b) => b.sel.every((s) => s.length <= 8)), "tabel susun: sel pendek supaya margin teks >= 5 px di 405 px");
    const KATA_LARANG = /buku|halaman|kunci|kelompok|\bteman|kawan|kelas\b|kertas|pensil|\bbawa\b|menggambar|menulis di|depan kelas|luas|keliling|di rumah/i;
    cek(!KATA_LARANG.test(JSON.stringify({ p: A.petaSusun, t: A.tabelSusun })), "peta dan tabel susun: tanpa kata terlarang dan tanpa kelompok, teman, kelas, buku, kertas, pensil");
    cek(peta.every((s) => ![...s.teks, ...(s.ikon ?? "")].some((c) => c.codePointAt(0) > 0x1fa95)), "peta susun: emoji paling tinggi Emoji 12");
  } else cek(false, "peta dan tabel susun: .tmp-k1b6s/A.json atau kelas1-bab6-ringkas.json subBab.A.petaSusun ada");
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k1b6A-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k1b6A-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k1b6A sendiri (${impor.join(", ")})`);
  }
  // Emoji dalam data teks gambar juga paling tinggi Emoji 12 (diperiksa pada gambar yang diputar).
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d), `${v.id}/${a.id}: emoji gambar paling tinggi Emoji 12`);
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k1b6a.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|naskah-k1b/.test(pembungkus) && /VIDEO_MATERI_K1B6A/.test(pembungkus) && /VIDEO_LUAR_K1B6A/.test(pembungkus) && /export function VideoK1B6A/.test(pembungkus) && /daftar-video-cerita/.test(pembungkus), "video-k1b6a.tsx: dua video dari mesin Story, tanpa naskah lama");
  cek(!/\r/.test(pembungkus), "video-k1b6a.tsx: akhir baris LF");
  const sendiri = readFileSync(new URL("uji-story-k1b6A.mjs", import.meta.url), "utf8");
  cek(!/\r/.test(sendiri), "uji-story-k1b6A.mjs: akhir baris LF");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit diputar)`);
}
console.log(`Pemeriksaan: ${stat.hitung} deret hitungan, ${jumlahNama} nama bilangan tampak sebagai angka, ${stat.aritmetika} kalimat bilangan, ${stat.benda} pemeriksaan benda dan bingkai`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
