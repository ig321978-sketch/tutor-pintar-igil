// Uji Story Kelas 2 Bab 4 Sub-Bab B (Pola): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Video diputar bergaya guru: suara, teks terlihat, sumber, judul adegan, dan subjudul tanpa penyebutan buku (kata terlarang diperiksa pada adegan yang diputar).
// Memeriksa: pemicu kata, suara tanpa digit, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas, teks bertumpuk, pemisahan materi dan metode luar (nama metode hanya Indonesia),
// nama bilangan sepuluh sampai dua puluh yang diucapkan tampak sebagai angka, dan data di layar dihitung ulang dari STRUKTUR gambar (urutan benda tiap barisan, bukan kata kunci):
// tiap benda digambar sesuai simbolnya (bentuk, warna, gerakan, suara) dan berderet sejajar dengan jarak sama; satuan terpendek tiap barisan dihitung uji dan sama dengan kurung satuan,
// satuan yang disebut suara, tabel (satuan, kode, banyak satuan), dan kode huruf; barisan bukan pola benar-benar tidak berulang teratur (semua sama atau acak); benda hilang dan lanjutan pola
// dihitung dari satuan pola; kartu pilihan (benda berikutnya, satuan pola, pola atau bukan) tepat satu yang cocok dan yang disorot sama dengan hasil hitung; urutan benda yang disebut suara sama
// dengan barisan di gambar; nama anak dan warna topi cocok; jumlah benda per adegan paling banyak dua puluh; aturan pemilik (belajar mandiri digital: tanpa kerja kelompok, survei teman, depan kelas, buku,
// menulis atau menggambar di buku, membawa benda nyata); peta dan tabel susun (tabel dihitung ulang dari gambar); emoji paling tinggi Emoji 12; dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k2b4B.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k2b4B-video.ts");
const U1 = await import("../src/components/modul/story/k2b4B-luar-1.ts");
const B = await import("../src/components/modul/story/k2b4B-bantu.ts");

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
const VIDEO = [V.VIDEO_MATERI_K2B4B, V.VIDEO_LUAR_K2B4B];
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
const M_VIDEO = V.VIDEO_MATERI_K2B4B;
const U = V.VIDEO_LUAR_K2B4B;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const NAMA_LUAR = /Pola Berulang|Pola AB dan ABC|Buat Pola|metode luar|metode dari luar/i;
const NAMA_INGGRIS = /Spatial Language|Map View|Landmark Reference|Repeating Pattern|AB Patterns|ABC Patterns|Create Pattern|Early algebra|Constructivism/i;
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M_VIDEO);
  const luar = teksVideo(U);
  cek(!NAMA_LUAR.test(materi), "video materi tidak memuat nama metode luar (Pola Berulang, Pola AB dan ABC, Buat Pola)");
  for (const m of U1.NAMA_METODE_ID) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE_ID, ["Pola Berulang", "Pola AB dan ABC", "Buat Pola"], "nama Indonesia metode luar");
  cek(!NAMA_INGGRIS.test(materi) && !NAMA_INGGRIS.test(luar), "nama metode hanya bahasa Indonesia (tanpa Repeating Pattern, AB / ABC Patterns, Create Pattern)");
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
  cek(M_VIDEO.id === "k2b4B-materi" && U.id === "k2b4B-luar", "id video k2b4B-materi dan k2b4B-luar");
  cek(U.judul.endsWith(": Metode dari Luar") && !/menurut/i.test(M_VIDEO.judul), "judul video: materi tanpa 'menurut', luar berakhir ': Metode dari Luar'");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,pola-arti,pola-satuan,satuan-tiga,pola-bentuk,pola-warna,pola-gerakan,pola-suara,kode-huruf,kode-abc,bukan-sama,bukan-acak,lanjut-contoh,lanjut-warna,isi-hilang,rancang-pola,pola-tabel,latihan-satu,latihan-dua,latihan-tiga,latihan-empat,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-berulang,luar-berulang-terapan,luar-ab,luar-ab-terapan,luar-buat,luar-buat-terapan,luar-ringkas", "urutan adegan metode luar");
  cek(M_VIDEO.adegan[0].id === "sapaan" && U.adegan[0].id === "sapaan", "tiap video dibuka adegan sapaan");
  cek(M_VIDEO.adegan.filter((a) => /^latihan-/.test(a.id)).length === 4 && M_VIDEO.adegan[M_VIDEO.adegan.length - 1].id === "penutup", "video materi: Latihan 1 sampai 4 lalu penutup");
  cek(U.adegan[1].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  for (const kata of ["Latihan", "Igil", "Malosi", "Halim", "Kira", "Wei", "Upe", "pola", "satuan pola", "berulang", "teratur", "kode", "huruf", "bukan pola", "melanjutkan", "mengisi", "merancang", "tabel", "bintang", "bunga", "hati", "segitiga", "lingkaran", "persegi", "merah", "biru", "kuning", "hijau", "keras", "pelan", "diam", "membungkuk", "berdiri", "tangan naik"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
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
const NAMA_METODE_SUARA = /pola berulang|pola ab dan abc|buat pola/gi;
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


/* ------------------------------ Barisan pola dihitung ulang dari struktur gambar ------------------------------ */
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
const adeganId = (id) => adegan(M_VIDEO, id) ?? adegan(U, id);
const stat = { barisan: 0, gambarItem: 0, huruf: 0, kode: 0, kurung: 0, tanda: 0, kosong: 0, kartu: 0, larikSimbol: 0, larikHuruf: 0, satuanSuara: 0, banyakSatuan: 0, jenis: 0, nama: 0, tabel: 0 };
const WARNA_ISI = { merah: "#EF4444", biru: "#3B82F6", kuning: "#FACC15", hijau: "#22C55E" };
const GERAK_EMOJI = { berdiri: "\u{1F9CD}", membungkuk: "\u{1F647}", naik: "\u{1F64B}" };
const GLIF = { hati: "♥", bintang: "★", bunga: "✿" };
const SIMBOL = [...Object.keys(WARNA_ISI), ...Object.keys(GERAK_EMOJI), ...Object.keys(GLIF), "lingkaran", "persegi", "segitiga", "keras", "pelan", "diam"];
const RE_ITEM = /^([a-z0-9]+)_(\d+)_([a-z]+)$/;
const ANGKA_KATA = { satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6 };
const pusatObj = (o) => {
  if (o.t === "kotak") return [(o.x ?? 0) + (o.w ?? 0) / 2, (o.y ?? 0) + (o.h ?? 0) / 2];
  if (o.t === "jalur") {
    const t = titikJalur(o);
    return [t.reduce((s, p) => s + p[0], 0) / t.length, t.reduce((s, p) => s + p[1], 0) / t.length];
  }
  return [o.x ?? 0, o.y ?? 0];
};
/** Periode terkecil barisan (benda kosong = null boleh): satuan yang berulang paling sedikit dua kali, dengan paling sedikit dua jenis benda; null bila bukan pola. */
const periode = (seq) => {
  const n = seq.length;
  const dikenal = seq.filter(Boolean);
  if (new Set(dikenal).size < 2) return null;
  for (let u = 1; u <= Math.floor(n / 2); u += 1) {
    const kelas = Array.from({ length: u }, () => new Set());
    seq.forEach((s, i) => s && kelas[i % u].add(s));
    if (kelas.every((c) => c.size === 1)) return u;
  }
  return null;
};
const isiKosongHitung = (seq, p) => seq.map((s, i) => s ?? seq.find((x, j) => x && j % p === i % p) ?? null);
const kodeHitung = (seq) => {
  const lihat = [];
  return seq.map((s) => {
    if (!lihat.includes(s)) lihat.push(s);
    return String.fromCharCode(65 + lihat.indexOf(s));
  });
};
const gambarSesuai = (o, s, semua) => {
  if (s === "lingkaran") return o.t === "bulat";
  if (s === "persegi") return o.t === "kotak" && o.w === o.h && o.w > 0;
  if (s === "segitiga") return o.t === "jalur" && titikJalur(o)?.length === 3;
  if (GLIF[s]) return o.t === "teks" && o.isi === GLIF[s];
  if (WARNA_ISI[s]) return o.t === "bulat" && o.warna === WARNA_ISI[s];
  if (GERAK_EMOJI[s]) return o.t === "teks" && o.isi === GERAK_EMOJI[s];
  if (s === "keras" || s === "pelan") {
    const lain = semua.filter((q) => RE_ITEM.test(q.id) && q.id.split("_")[2] === s);
    const besar = semua.filter((q) => RE_ITEM.test(q.id) && q.id.split("_")[2] === "keras");
    const kecil = semua.filter((q) => RE_ITEM.test(q.id) && q.id.split("_")[2] === "pelan");
    const rata = lain.every((q) => q.r === o.r);
    const urut = !besar.length || !kecil.length || besar[0].r > kecil[0].r;
    return o.t === "bulat" && o.warna !== "none" && rata && urut;
  }
  if (s === "diam") return o.t === "bulat" && o.warna === "none" && o.putus === true;
  if (s === "kosong") return o.t === "kotak" && o.warna === "none" && o.putus === true && o.w === o.h;
  return false;
};
const barisanDari = (objs) => {
  const peta = new Map();
  for (const o of objs) {
    const m = RE_ITEM.exec(o.id);
    if (!m) continue;
    if (!peta.has(m[1])) peta.set(m[1], []);
    peta.get(m[1]).push({ n: Number(m[2]), s: m[3], o });
  }
  const out = new Map();
  for (const [b, arr] of peta) {
    arr.sort((p, q) => p.n - q.n);
    out.set(b, { b, arr, seq: arr.map((e) => (e.s === "kosong" ? null : e.s)), x: arr.map((e) => pusatObj(e.o)[0]) });
  }
  return out;
};
const ringkasToken = (suara) => {
  const asli = suara.replace(/tangan naik/gi, "naik").split(/\s+/).filter(Boolean);
  return asli.map((w) => ({ w: w.replace(/[^A-Za-z]/g, ""), akhir: /[.?!]$/.test(w) }));
};
/** Larik simbol berurutan (dua kata penghubung boleh "dan"), dipotong oleh kata lain atau tanda akhir kalimat. */
const larikDari = (suara, sah) => {
  const t = ringkasToken(suara);
  const hasil = [];
  let cur = [];
  const tutup = () => {
    if (cur.length) hasil.push(cur);
    cur = [];
  };
  for (const { w, akhir } of t) {
    if (sah(w)) {
      cur.push(w);
      if (akhir) tutup();
    } else if (w.toLowerCase() === "dan" && cur.length) {
      // penghubung
    } else tutup();
  }
  tutup();
  return hasil;
};

const catatTabel = {};
for (const v of VIDEO) {
  for (const a of v.adegan) {
    const nama = `${v.id}/${a.id}`;
    let sebelum = new Map();
    a.ketukan.forEach((kt, i) => {
      const o = akhirAdegan(a, i);
      const bar = barisanDari(o);
      const jumlahItem = [...bar.values()].reduce((t, b) => t + b.arr.length, 0);
      cek(jumlahItem <= 20, `${nama}#${i + 1}: paling banyak dua puluh benda per adegan (${jumlahItem})`);
      const kurungDi = (b) => o.filter((m) => m.id.startsWith(`${b}-sat`) && /^\d+$/.test(m.id.slice(b.length + 4)));
      for (const B of bar.values()) {
        stat.barisan += 1;
        // Urutan, jarak sama, dan gambar sesuai simbol.
        sama(B.arr.map((e) => e.n), B.arr.map((_, q) => q), `${nama}#${i + 1}: benda barisan ${B.b} bernomor 0, 1, 2, ... tanpa lompat`);
        for (let q = 1; q < B.x.length; q += 1) cek(B.x[q] > B.x[q - 1] && Math.abs(B.x[q] - B.x[q - 1] - (B.x[1] - B.x[0])) < 0.3, `${nama}#${i + 1}: benda barisan ${B.b} berderet sejajar dengan jarak sama`);
        for (const e of B.arr) {
          stat.gambarItem += 1;
          cek(gambarSesuai(e.o, e.s, o), `${nama}#${i + 1}: gambar ${e.o.id} sesuai simbol ${e.s}`);
        }
        const p = periode(B.seq);
        const n = B.seq.length;
        if (B.seq.includes(null)) {
          stat.kosong += 1;
          if (B.seq.some(Boolean)) cek(p !== null, `${nama}#${i + 1}: benda hilang pada barisan ${B.b} dapat dihitung dari satuan pola`);
        }
        const penuh = p === null ? null : isiKosongHitung(B.seq, p);
        // Huruf kode.
        const L = o.filter((m) => m.id.startsWith(`${B.b}-L`) && /^\d+$/.test(m.id.slice(B.b.length + 2)));
        if (L.length) {
          const kode = penuh ? kodeHitung(penuh) : kodeHitung(B.seq.map((s) => s ?? "?"));
          for (const m of L) {
            const q = Number(m.id.slice(B.b.length + 2));
            stat.huruf += 1;
            cek(q < n && B.seq[q] !== null && m.isi === kode[q] && Math.abs(m.x - B.x[q]) < 0.3, `${nama}#${i + 1}: huruf ${m.id} bernilai ${kode[q]} dan tepat di bawah bendanya`);
          }
        }
        const teksKode = isiTeks(o, `${B.b}-kode`);
        if (teksKode !== undefined) {
          stat.kode += 1;
          cek(!B.seq.includes(null) && teksKode === kodeHitung(B.seq).join(" "), `${nama}#${i + 1}: tulisan kode "${teksKode}" sama dengan kode barisan ${B.b} (${kodeHitung(B.seq.map((s) => s ?? "?")).join(" ")})`);
        }
        // Kurung satuan: tiap kurung memeluk tepat satu satuan terpendek.
        const K = kurungDi(B.b);
        if (K.length) {
          cek(p !== null || (K.length === 1 && n <= 4), `${nama}#${i + 1}: barisan ${B.b} yang diberi kurung satuan memang pola (atau satuan pertama yang baru dipilih, belum diulang)`);
          for (const m of K) {
            const j = Number(m.id.slice(B.b.length + 4));
            stat.kurung += 1;
            const dalam = B.x.map((xx, q) => (xx > m.x && xx < m.x + m.w ? q : -1)).filter((q) => q >= 0);
            if (p !== null) sama(dalam, Array.from({ length: p }, (_, q) => j * p + q), `${nama}#${i + 1}: kurung ${m.id} memeluk satuan ke-${j + 1} (${p} benda)`);
            else cek(dalam.length === n, `${nama}#${i + 1}: kurung ${m.id} pada barisan yang belum berulang memeluk semua benda`);
            cek(m.putus === true && (j + 1) * (p ?? 1) <= n, `${nama}#${i + 1}: kurung ${m.id} putus-putus dan satuannya lengkap`);
          }
        }
        const tn = isiTeks(o, `${B.b}-tanda`);
        if (tn !== undefined) {
          stat.tanda += 1;
          cek(tn === (p !== null ? "✅" : "❌"), `${nama}#${i + 1}: tanda barisan ${B.b} (${tn}) sesuai hitungan: ${p !== null ? "pola" : "bukan pola"}`);
        }
        // Tabel: satuan, kode, banyak satuan dihitung ulang.
        if (/^t\d$/.test(B.b)) {
          const sat = isiTeks(o, `${B.b}-sat`);
          const kd = isiTeks(o, `${B.b}-kd`);
          const ul = isiTeks(o, `${B.b}-ul`);
          if (sat !== undefined) {
            stat.tabel += 1;
            cek(p !== null && sat === String(p) && n % p === 0 && ul === String(n / p) && kd === kodeHitung(B.seq).slice(0, p).join(""), `${nama}#${i + 1}: baris tabel ${B.b}: satuan ${sat}, kode ${kd}, banyak satuan ${ul} sama dengan hitungan (satuan ${p})`);
            catatTabel[B.b] = [String(p), kodeHitung(B.seq).slice(0, p).join(""), String(n / p), isiTeks(o, `${B.b}-lb`)];
          }
        }
      }
      // Satuan, banyak satuan, dan jenis benda yang diucapkan cocok dengan barisan yang berubah pada ketukan ini.
      const ubahBaris = [...bar.values()].filter((B) => {
        const lama = sebelum.get(B.b);
        const kur = kurungDi(B.b).length;
        return !lama || lama.n !== B.arr.length || lama.kur !== kur;
      });
      const pBaris = (B) => periode(B.seq);
      {
        const angka = [...kt.suara.matchAll(/(?:terdiri dari|satuannya) (satu|dua|tiga|empat|lima|enam) (?:benda|bunyi|gerakan)/gi)].map((m) => ANGKA_KATA[m[1].toLowerCase()]);
        if (angka.length) {
          stat.satuanSuara += angka.length;
          const dgn = ubahBaris.filter((B) => pBaris(B) !== null).sort((x, y) => x.b.localeCompare(y.b));
          const semuaP = [...bar.values()].map(pBaris).filter((x) => x !== null);
          if (dgn.length === angka.length) sama(angka, dgn.map(pBaris), `${nama}#${i + 1}: satuan yang disebut suara sama dengan satuan terpendek barisan yang berubah`);
          else cek(angka.every((x) => semuaP.includes(x)), `${nama}#${i + 1}: satuan yang disebut suara (${angka.join()}) sama dengan satuan terpendek salah satu barisan (${semuaP.join()})`);
        }
      }
      {
        const angka = [...kt.suara.matchAll(/ada (satu|dua|tiga|empat|lima|enam) satuan/gi)].map((m) => ANGKA_KATA[m[1].toLowerCase()]);
        for (const x of angka) {
          stat.banyakSatuan += 1;
          const calon = (ubahBaris.length ? ubahBaris : [...bar.values()]).map((B) => {
            const p = pBaris(B);
            const kur = kurungDi(B.b).length;
            return p === null ? -1 : kur > 0 ? kur : B.seq.length / p;
          });
          cek(calon.includes(x), `${nama}#${i + 1}: banyak satuan yang disebut suara (${x}) sama dengan satuan pada gambar (${calon.join()})`);
        }
      }
      {
        const angka = [...kt.suara.matchAll(/\b(dua|tiga) jenis/gi)].map((m) => ANGKA_KATA[m[1].toLowerCase()]);
        for (const x of angka) {
          stat.jenis += 1;
          const calon = [...bar.values()].filter((B) => B.seq.filter(Boolean).length >= 4).map((B) => new Set(B.seq.filter(Boolean)).size);
          cek(calon.includes(x), `${nama}#${i + 1}: jumlah jenis benda yang disebut suara (${x}) sama dengan barisan di gambar (${calon.join()})`);
        }
      }
      // Larik simbol di suara (tiga atau lebih) sama dengan awal barisan di gambar (benda hilang diisi dari satuan pola).
      {
        const calonSeq = [...bar.values()].map((B) => {
          const p = periode(B.seq);
          return p === null ? B.seq : isiKosongHitung(B.seq, p);
        });
        for (const lr of larikDari(kt.suara, (w) => SIMBOL.includes(w.toLowerCase()))) {
          if (lr.length < 3) continue;
          stat.larikSimbol += 1;
          const kecil = lr.map((x) => x.toLowerCase());
          cek(calonSeq.some((s) => kecil.length <= s.length && kecil.every((x, q) => s[q] === x)), `${nama}#${i + 1}: urutan "${kecil.join(", ")}" di suara sama dengan awal salah satu barisan di gambar`);
        }
        for (const lr of larikDari(kt.suara, (w) => /^[ABC]$/.test(w))) {
          if (lr.length < 3) continue;
          stat.larikHuruf += 1;
          const ada = calonSeq.some((s) => !s.includes(null) && lr.length <= s.length && lr.every((x, q) => kodeHitung(s)[q] === x));
          cek(ada, `${nama}#${i + 1}: kode huruf "${lr.join(", ")}" di suara sama dengan awal kode salah satu barisan di gambar`);
        }
      }
      // Nama anak dan warna topi: urutan sama dengan barisan.
      {
        const nm = o.filter((m) => /^nm\d+$/.test(m.id)).sort((x, y) => x.x - y.x);
        if (nm.length) {
          const ba = bar.get("ba");
          const urutNama = nm.map((m) => m.isi);
          const t = ringkasToken(kt.suara);
          let nama1 = null;
          for (const { w } of t) {
            if (urutNama.includes(w)) nama1 = w;
            else if (nama1 && ["merah", "biru", "kuning", "hijau"].includes(w.toLowerCase())) {
              stat.nama += 1;
              const q = urutNama.indexOf(nama1);
              cek(!!ba && ba.seq[q] === w.toLowerCase() && Math.abs(nm[q].x - ba.x[q]) < 0.3, `${nama}#${i + 1}: ${nama1} memakai topi ${w} sama dengan benda ke-${q + 1} di gambar`);
              nama1 = null;
            }
          }
        }
      }
      // Kartu pilihan: kartu yang disorot sama dengan hasil hitung dari barisan, dan kartu jawaban tepat satu.
      {
        const kartuTeks = [1, 2, 3].map((q) => isiTeks(o, `c${q}-t`)).filter((x) => x !== undefined);
        if (kartuTeks.length) {
          const ba = bar.get("ba");
          const p = ba ? periode(ba.seq) : null;
          const sorotKartu = [1, 2, 3].filter((q) => ketemu(o, `c${q}-k`)?.sorot);
          const tepat = (x) => {
            if (!ba) return false;
            if (SIMBOL.includes(x)) {
              const blank = ba.arr.findIndex((e) => e.s === "kosong");
              if (blank >= 0 && p !== null) return isiKosongHitung(ba.seq, p)[blank] === x;
              const dipilih = ba.arr.filter((e) => e.o.sorot);
              if (dipilih.length === 1) {
                const q = dipilih[0].n;
                const tanpa = ba.seq.map((s, j) => (j === q ? null : s));
                const pp = periode(tanpa);
                return pp !== null && isiKosongHitung(tanpa, pp)[q] === x && dipilih[0].s === x;
              }
              return false;
            }
            if (/^[A-C]( [A-C])*$/.test(x)) return p !== null && kodeHitung(ba.seq).slice(0, p).join(" ") === x;
            if (x === "pola" || x === "bukan pola") return (p !== null) === (x === "pola");
            return false;
          };
          stat.kartu += 1;
          cek(kartuTeks.filter(tepat).length === 1, `${nama}#${i + 1}: tepat satu kartu pilihan sama dengan hasil hitung (${kartuTeks.join(" | ")})`);
          if (sorotKartu.length) {
            cek(sorotKartu.length === 1 && tepat(isiTeks(o, `c${sorotKartu[0]}-t`)), `${nama}#${i + 1}: kartu yang disorot adalah jawaban hasil hitung`);
          }
        }
      }
      sebelum = new Map([...bar.values()].map((B) => [B.b, { n: B.arr.length, kur: kurungDi(B.b).length }]));
    });
  }
}
{
  // Tabel pola: urutan baris, label, dan nilai sama dengan tabel susun (dihitung dari gambar).
  sama(["t1", "t2", "t3", "t4"].map((b) => catatTabel[b]?.[3]), ["Warna", "Bentuk", "Suara", "Gerakan"], "tabel pola: empat baris warna, bentuk, suara, gerakan");
  sama(["t1", "t2", "t3", "t4"].map((b) => catatTabel[b]?.slice(0, 3)), [["2", "AB", "3"], ["3", "AAB", "2"], ["2", "AB", "2"], ["2", "AB", "2"]], "tabel pola: satuan, kode, banyak satuan hasil hitung");
}
{
  // Adegan inti: barisan penting dihitung ulang (contoh dari data sumber).
  const tampil = (id, ke, b) => barisanDari(akhirAdegan(adeganId(id), ke)).get(b);
  const sat = (id, ke, b) => periode(tampil(id, ke, b).seq);
  sama(sat("pola-satuan", 3, "ba"), 2, "merah biru merah biru merah biru: satuan dua benda");
  sama(sat("satuan-tiga", 0, "ba"), 3, "hati hati segitiga: satuan tiga benda");
  sama(sat("pola-bentuk", 4, "bb"), 4, "hati hati segitiga segitiga: satuan empat benda");
  sama(sat("lanjut-contoh", 0, "ba"), 3, "A A B A A B A A: satuan tiga benda");
  sama(isiKosongHitung(tampil("lanjut-contoh", 0, "ba").seq.concat([null]), 3)[8], "bunga", "A A B A A B A A berikutnya B (bunga)");
  cek(periode(tampil("bukan-sama", 2, "ba").seq) === null && periode(tampil("bukan-acak", 2, "ba").seq) === null && periode(tampil("latihan-tiga", 2, "ba").seq) === null, "tiga barisan bukan pola (semua sama, acak, acak) memang tidak punya satuan yang berulang");
  cek(periode(tampil("latihan-tiga", 3, "ba").seq) === 3, "latihan tiga: barisan baru berpola dengan satuan tiga");
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
  const DAFTAR = ["Pola dan satuan pola", "Melanjutkan dan mengisi pola", "Merancang pola sendiri"];
  cek(/Halo anak-anak/.test(sap.ketukan[0].suara) && /Pola dan satuan pola/i.test(L.teksTerlihat(akhirAdegan(sap, 1)).join(" | ")), "sapaan materi: tiga hal yang dipelajari tampil");
  sama(L.teksTerlihat(akhirAdegan(sap, 1)).filter((t) => DAFTAR.includes(t)), DAFTAR, "sapaan materi: daftar tiga hal");
  cek(!/\d/.test(sap.ketukan[1].suara) && !/\d/.test(DAFTAR.join(" ")), "sapaan materi: tanpa angka");
  const sapLuar = adegan(U, "sapaan");
  cek(/cara lain/i.test(L.teksTerlihat(akhirAdegan(sapLuar, 1)).join(" | ")) && /metode-luar|Metode luar/.test(sapLuar.sumber), "sapaan metode luar: pengumuman cara lain");
  let sumberRingkas = null;
  try {
    sumberRingkas = JSON.parse(readFileSync(new URL("../src/data/kelas2-bab4-ringkas.json", import.meta.url), "utf8")).subBab?.B;
  } catch {
    sumberRingkas = null;
  }
  const sementara = new URL("../.tmp-k2b4s/B.json", import.meta.url);
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
    // Isi tabel dihitung ulang dari gambar pada video materi: satuan, kode huruf, dan banyak satuan tiap jenis pola (barisan enam benda).
    sama(T.kolom, ["Satuan", "Kode", "Ulang"], "tabel susun: kolom satuan, kode, ulang");
    sama(T.baris.map((b) => b.label), ["Warna", "Bentuk", "Suara", "Gerakan"], "tabel susun: jenis pola tiap baris sama dengan tabel pola pada gambar materi");
    sama(T.baris.map((b) => b.sel), ["t1", "t2", "t3", "t4"].map((id) => catatTabel[id].slice(0, 3)), "tabel susun: satuan, kode, dan banyak satuan sama dengan hasil hitung dari barisan di gambar");
    sama(T.baris.map((q) => q.sel.length), [3, 3, 3, 3], "tabel susun: tiga sel tiap baris");
    cek(T.baris.every((b) => b.sel.every((s) => s.length <= 8)), "tabel susun: sel pendek supaya margin teks >= 5 px di 405 px");
    cek(new Set(T.baris.map((b) => b.label)).size === T.baris.length, "tabel susun: jenis pola tiap baris berbeda");
    const KATA_LARANG = /buku|halaman|kunci|kerja kelompok|\bkelompok|\bteman|kawan|kelas\b|kertas|pensil|\bbawa\b|menggambar|menulis di|depan kelas|luas|keliling|di rumah|survei|karet gelang|uang tabungan|di sekitar|loker|ibu guru|bersusun|\bkali\b|dibagi|gunting|\bpaku\b/i;
    cek(!KATA_LARANG.test(JSON.stringify({ p: A.petaSusun, t: A.tabelSusun })), "peta dan tabel susun: tanpa kata terlarang dan tanpa kelompok, teman, kelas, buku, kertas, pensil");
    cek(peta.every((s) => ![...s.teks, ...(s.ikon ?? "")].some((c) => c.codePointAt(0) > 0x1fa95)), "peta susun: emoji paling tinggi Emoji 12");
  } else cek(false, "peta dan tabel susun: .tmp-k2b4s/B.json atau kelas2-bab4-ringkas.json subBab.B.petaSusun ada");
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k2b4B-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k2b4B-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k2b4B sendiri (${impor.join(", ")})`);
  }
  // Emoji dalam data teks gambar juga paling tinggi Emoji 12 (diperiksa pada gambar yang diputar).
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d), `${v.id}/${a.id}: emoji gambar paling tinggi Emoji 12`);
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k2b4b.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|naskah-k1b|naskah-k2b4|data-k2b4|video-k2b4-umum/.test(pembungkus) && /VIDEO_MATERI_K2B4B/.test(pembungkus) && /VIDEO_LUAR_K2B4B/.test(pembungkus) && /export function VideoK2B4B/.test(pembungkus) && /daftar-video-cerita/.test(pembungkus), "video-k2b4b.tsx: dua video dari mesin Story, tanpa naskah lama");
  cek(!/\r/.test(pembungkus), "video-k2b4b.tsx: akhir baris LF");
  const sendiri = readFileSync(new URL("uji-story-k2b4B.mjs", import.meta.url), "utf8");
  cek(!/\r/.test(sendiri), "uji-story-k2b4B.mjs: akhir baris LF");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit diputar)`);
}
console.log(`Pemeriksaan: ${stat.barisan} barisan, ${stat.gambarItem} benda digambar sesuai simbol, ${stat.huruf} huruf kode, ${stat.kode} tulisan kode, ${stat.kurung} kurung satuan, ${stat.tanda} tanda pola, ${stat.kosong} barisan dengan benda hilang, ${stat.kartu} kartu pilihan, ${stat.larikSimbol} urutan benda di suara, ${stat.larikHuruf} urutan huruf di suara, ${stat.satuanSuara} satuan di suara, ${stat.banyakSatuan} banyak satuan di suara, ${stat.jenis} jumlah jenis di suara, ${stat.nama} nama dan topi, ${stat.tabel} baris tabel, ${jumlahNama} nama bilangan tampak sebagai angka`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
