// Uji Story Kelas 1 Bab 4 Sub-Bab A (Mendeskripsikan Benda Berdasarkan Bentuk): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Video diputar bergaya guru: suara, teks terlihat, sumber, judul adegan, dan subjudul tanpa penyebutan buku (kata terlarang diperiksa pada adegan yang diputar).
// Memeriksa: pemicu kata, suara tanpa digit, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas, teks bertumpuk, pemisahan materi dan metode luar (nama metode hanya Indonesia),
// hanya mengenal bentuk lengkung, segitiga, segi empat dengan sisi dan sudut (tanpa rumus, ukuran, luas, keliling, tambah, kurang), banyak sisi dan sudut yang disebut suara dan teks dicocokkan dengan bentuk yang digambar
// (titik sudut bangun, penanda sisi dan sudut tepat di sudut, keranjang, warna, paku), aturan pemilik (belajar mandiri digital: tanpa kelompok, teman, depan kelas, buku, menulis atau menggambar di buku, membawa benda nyata),
// emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k1b4a.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k1b4a-video.ts");
const U1 = await import("../src/components/modul/story/k1b4a-luar-1.ts");

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
const VIDEO = [V.VIDEO_MATERI_K1B4A, V.VIDEO_LUAR_K1B4A];
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
const M_VIDEO = V.VIDEO_MATERI_K1B4A;
const U = V.VIDEO_LUAR_K1B4A;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const NAMA_LUAR = /Kenali Bentuk|Pilah Ciri|Bentuk di Sekitar|metode luar|metode dari luar/i;
const NAMA_INGGRIS = /van Hiele|Attribute|Shape in Environment|Contextual|Attribute blocks/i;
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M_VIDEO);
  const luar = teksVideo(U);
  cek(!NAMA_LUAR.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of U1.NAMA_METODE_ID) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE_ID, ["Kenali Bentuk", "Pilah Ciri", "Bentuk di Sekitar"], "nama Indonesia metode luar");
  cek(!NAMA_INGGRIS.test(materi) && !NAMA_INGGRIS.test(luar), "nama metode hanya bahasa Indonesia (tanpa van Hiele Visual, Attribute Sort, Shape in Environment)");
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
  cek(M_VIDEO.id === "k1b4a-materi" && U.id === "k1b4a-luar", "id video k1b4a-materi dan k1b4a-luar");
  cek(U.judul.endsWith(": Metode dari Luar") && !/menurut/i.test(M_VIDEO.judul), "judul video: materi tanpa 'menurut', luar berakhir ': Metode dari Luar'");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,piknik,tiga-bentuk,benda-lengkung,benda-segitiga,benda-segiempat,dua-segiempat,bentuk-tetap,deskripsi-jendela,keranjang-bentuk,bayangan,papan-paku,warnai-nama,detektif,latihan-satu,latihan-dua,latihan-tiga,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-kenali,luar-kenali-terapan,luar-pilah,luar-pilah-terapan,luar-sekitar,luar-sekitar-terapan,luar-ringkas", "urutan adegan metode luar");
  cek(M_VIDEO.adegan[0].id === "sapaan" && U.adegan[0].id === "sapaan", "tiap video dibuka adegan sapaan");
  cek(M_VIDEO.adegan.filter((a) => /^latihan-/.test(a.id)).length === 3 && M_VIDEO.adegan[M_VIDEO.adegan.length - 1].id === "penutup", "video materi: Latihan 1 sampai 3 lalu penutup");
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-kenali", "luar-kenali-terapan", "luar-pilah", "luar-pilah-terapan", "luar-sekitar", "luar-sekitar-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(U.adegan[1].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  for (const kata of ["Latihan", "Igil", "Malosi", "Kira", "Upe", "Wei", "lengkung", "segitiga", "segi empat", "sisi lurus", "sudut", "lingkaran", "persegi panjang", "miring", "detektif"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  // Hanya mengenal bentuk (lengkung, segitiga, segi empat), sisi, dan sudut: tanpa rumus, ukuran, luas, keliling, tambah, kurang, atau bangun lain; angka di gambar paling besar sepuluh.
  const BOCOR = /\bkurang\w*|\btambah\w*|menambah|\bjumlah\b|\bluas\b|keliling|rumus|sentimeter|\bcm\b|volume|\bbelas\b|\bpuluh\b|\bratus\b|\bribu\b|sebelas|dikali|\bkali\b|dibagi|perkalian|pembagian|operasi|panjang sisi|sisi panjang|ukuran sisi|segi lima|segilima|segi enam|pentagon|trapesium|jajar genjang|belah ketupat|layang|kubus|balok|tabung|kerucut|\+|−|×|÷/i;
  for (const v of [M_VIDEO, U]) {
    for (const a of v.adegan) cek(!BOCOR.test(teksAdegan(a)), `${v.id}/${a.id}: hanya mengenal bentuk, sisi, dan sudut (tanpa rumus, ukuran, luas, keliling, tambah, kurang, atau bangun lain)`);
    for (const a of v.adegan) for (const i of a.ketukan.keys()) for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) for (const b of bilanganDari(t)) cek(Number(b) <= 10, `${v.id}/${a.id}#${i + 1}: angka di gambar paling besar sepuluh ("${t}")`);
  }
  cek(totalKetukan >= 70 && M_VIDEO.adegan.reduce((t, ad) => t + ad.ketukan.length, 0) >= 70, `total ketukan cukup dalam (${totalKetukan}; materi ${M_VIDEO.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)})`);
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


/* ------------------------------ Banyak sisi dan sudut, dan bentuk benda, dihitung ulang dari gambar ------------------------------ */
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
const kataSuara = (kt) => L.kataDari(kt.suara).map((w) => w.toLowerCase().replace(/[^a-z]/g, ""));
const pusatObj = (b) => (b.t === "kotak" ? { x: b.x + b.w / 2, y: b.y + b.h / 2 } : b.t === "garis" ? { x: b.x + (b.x2 ?? 0) / 2, y: b.y + (b.y2 ?? 0) / 2 } : { x: b.x, y: b.y });
let stat = { hitung: 0, sisi: 0, kelompok: 0, kalimat: 0 };
{
  const cari = (id) => adegan(M_VIDEO, id) ?? adegan(U, id);
  const di = (id, ke) => akhirAdegan(cari(id), ke);
  const benda = (objs, p) => objs.filter((o) => new RegExp(`^${p}\\d+$`).test(o.id));
  const labelHitung = (objs, p, n) => sama(Array.from({ length: n }, (_, i) => isiTeks(objs, `${p}n${i}`)), Array.from({ length: n }, (_, i) => String(i + 1)), `hitungan ${p}: satu sampai ${n}`);
  const teksAda = (objs) => L.teksTerlihat(objs);
  const dalamKotak = (objs, b, kotakId) => {
    const kt = ketemu(objs, kotakId);
    const p = pusatObj(b);
    return p.x > kt.x && p.x < kt.x + kt.w && p.y > kt.y && p.y < kt.y + kt.h;
  };
  const titik = (o) => titikJalur(o) ?? [];
  const sisiLurus = (o) => {
    const t = titik(o);
    return t.map((p, i) => Math.hypot(t[(i + 1) % t.length][0] - p[0], t[(i + 1) % t.length][1] - p[1]));
  };

  // 1) Semua deret angka hitungan `${p}n{i}` (teks angka): berurutan 1 sampai m, dekat penanda ke-i, dan sesuai kata bilangan yang diucapkan berurutan.
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((kt, i) => {
        const objs = akhirAdegan(a, i);
        const awalanSemua = new Set(objs.filter((o) => o.t === "teks" && /^\d+$/.test(o.isi ?? "")).map((o) => /^([a-z]+)n0$/.exec(o.id)?.[1]).filter(Boolean));
        for (const p of awalanSemua) {
          const label = objs.filter((o) => new RegExp(`^${p}n\\d+$`).test(o.id));
          const penanda = benda(objs, p);
          if (penanda.length === 0) continue;
          stat.hitung += 1;
          const nama = `${v.id}/${a.id}#${i + 1} hitungan ${p}`;
          cek(label.length <= penanda.length, `${nama}: angka hitungan tidak lebih banyak dari penanda`);
          sama(label.map((lb) => lb.isi), label.map((_, q) => String(q + 1)), `${nama}: angka berurutan satu dan seterusnya`);
          label.forEach((lb, q) => {
            const b = ketemu(objs, `${p}${q}`);
            const c = b ? pusatObj(b) : null;
            cek(c && Math.hypot(c.x - lb.x, c.y - lb.y) < 30, `${nama}: angka ${q + 1} dekat penanda ke-${q + 1}`);
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

  // 2) Teks dan suara yang menyebut banyak sisi atau sudut sebuah bentuk selalu benar: lengkung nol, segitiga tiga, segi empat empat.
  const BENTUK = [["lengkung", 0], ["segitiga", 3], ["segi empat", 4]];
  const KATA_NOL_LIMA = { nol: 0, satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5 };
  const periksaBentuk = (teksIsi, sumber) => {
    const nama = BENTUK.filter(([n]) => new RegExp(`\\b${n}\\b`, "i").test(teksIsi));
    if (nama.length !== 1) return;
    for (const m of teksIsi.matchAll(/(\d+) (sisi|sudut)/g)) {
      stat.kalimat += 1;
      cek(Number(m[1]) === nama[0][1], `${sumber}: "${teksIsi}" menyebut ${m[1]} ${m[2]} untuk ${nama[0][0]}`);
    }
    for (const m of teksIsi.matchAll(/\b(nol|satu|dua|tiga|empat|lima) (sisi|sudut)\b/gi)) {
      stat.kalimat += 1;
      cek(KATA_NOL_LIMA[m[1].toLowerCase()] === nama[0][1], `${sumber}: "${teksIsi}" menyebut ${m[1]} ${m[2]} untuk ${nama[0][0]}`);
    }
  };
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((kt, i) => {
        for (const kal of kt.suara.split(/(?<=[.!?])\s+/)) periksaBentuk(kal, `${v.id}/${a.id}#${i + 1} suara`);
        for (const t of L.teksTerlihat(akhirAdegan(a, i))) {
          periksaBentuk(t, `${v.id}/${a.id}#${i + 1} gambar`);
          const s = /(\d+) sisi/.exec(t);
          const d = /(\d+) sudut/.exec(t);
          if (s && d) cek(s[1] === d[1] && ["0", "3", "4"].includes(s[1]), `${v.id}/${a.id}#${i + 1}: banyak sisi sama dengan banyak sudut ("${t}")`);
        }
      });
    }
  }

  // 3) Bentuk digambar benar: segitiga bertitik tiga, segi empat bertitik empat, penanda sisi dan sudut tepat di sudut gambar.
  const sudutDiGambar = (objs, bangunId, penandaAwal, n) => {
    const t = titik(ketemu(objs, bangunId));
    for (let q = 0; q < n; q += 1) {
      const m = ketemu(objs, `${penandaAwal}d${q}`);
      cek(m && t.some((p) => Math.hypot(p[0] - m.x, p[1] - m.y) < 0.6), `${bangunId}: titik sudut ke-${q + 1} tepat di sudut bangun`);
    }
  };
  const sisiDiGambar = (objs, bangunId, penandaAwal, n) => {
    const t = titik(ketemu(objs, bangunId));
    for (let q = 0; q < n; q += 1) {
      const g = ketemu(objs, `${penandaAwal}s${q}`);
      const ujung = [g.x, g.y, g.x + g.x2, g.y + g.y2];
      const dekat = (x, y) => t.some((p) => Math.hypot(p[0] - x, p[1] - y) < 0.6);
      cek(dekat(ujung[0], ujung[1]) && dekat(ujung[2], ujung[3]), `${bangunId}: garis sisi ke-${q + 1} menghubungkan dua sudut bangun`);
    }
  };
  {
    sama(["gt0", "gt1", "gt2", "gt3", "gt4"].map((i) => titik(ketemu(di("benda-segitiga", 0), i)).length), [3, 3, 3, 3, 3], "benda segitiga: lima benda bersegitiga tiga sudut");
    const a = di("benda-segitiga", 2);
    sama([titik(ketemu(a, "sg")).length, benda(a, "ts").length, ...[0, 1, 2].map((q) => isiTeks(a, `tsn${q}`))], [3, 3, "1", "2", "3"], "benda segitiga: tiga sisi dihitung");
    sisiDiGambar(a, "sg", "t", 3);
    const b = di("benda-segitiga", 3);
    sama([benda(b, "td").length, ...[0, 1, 2].map((q) => isiTeks(b, `tdn${q}`)), benda(b, "ts").length], [3, "1", "2", "3", 0], "benda segitiga: tiga sudut dihitung, sisi dihapus");
    sudutDiGambar(b, "sg", "t", 3);
    labelHitung(a, "ts", 3);
    labelHitung(b, "td", 3);
    stat.sisi += 6;
    const c = di("benda-segiempat", 0);
    sama(["ej", "ep", "eb", "ed", "el"].every((i) => ketemu(c, i)), true, "benda segi empat: lima benda ada");
    const e1 = di("benda-segiempat", 2);
    sama([titik(ketemu(e1, "se")).length, benda(e1, "es").length], [4, 4], "benda segi empat: empat sisi dihitung");
    sisiDiGambar(e1, "se", "e", 4);
    labelHitung(e1, "es", 4);
    const e2 = di("benda-segiempat", 3);
    sama(benda(e2, "ed").length, 4, "benda segi empat: empat sudut dihitung");
    sudutDiGambar(e2, "se", "e", 4);
    labelHitung(e2, "ed", 4);
    const sisi4 = sisiLurus(ketemu(e1, "se"));
    cek(sisi4.length === 4 && Math.abs(sisi4[0] - sisi4[2]) < 0.2 && Math.abs(sisi4[1] - sisi4[3]) < 0.2, "benda segi empat: sisi berhadapan sama");
    stat.sisi += 6;
  }
  // Benda bentuk lengkung: lima benda, ketuk donat, tanpa sudut.
  {
    const a = di("benda-lengkung", 0);
    sama(["jm", "pr", "dn", "ml", "te"].every((i) => ketemu(a, i)), true, "benda lengkung: jam, piring, donat, melon, telur");
    cek(teksAda(di("benda-lengkung", 5)).includes("0 sisi lurus • 0 sudut"), "benda lengkung: nol sisi lurus, nol sudut");
    cek(titik(ketemu(a, "te")).length === 0 && ketemu(a, "te").d.includes("Q"), "benda lengkung: telur digambar dengan kurva, bukan sudut");
    stat.kelompok += 3;
  }
  // Tiga bentuk di papan.
  {
    const a = di("tiga-bentuk", 4);
    sama([ketemu(a, "b1").t, titik(ketemu(a, "b2")).length, titik(ketemu(a, "b3")).length], ["bulat", 3, 4], "papan: bulat, segitiga bertiga titik, segi empat berempat titik");
    sama(["r1a", "r1b", "r2a", "r2b", "r3a", "r3b"].map((i) => isiTeks(a, i)), ["0 sisi lurus", "0 sudut", "3 sisi lurus", "3 sudut", "4 sisi lurus", "4 sudut"], "papan: ciri tiga bentuk");
    stat.kelompok += 2;
  }
  // Dua macam segi empat dan bentuk tetap.
  {
    const a = di("dua-segiempat", 1);
    const q = sisiLurus(ketemu(a, "qs"));
    const p = sisiLurus(ketemu(a, "pp"));
    cek(q.length === 4 && q.every((x) => Math.abs(x - q[0]) < 0.2), "persegi: empat sisi sama");
    cek(p.length === 4 && Math.abs(p[0] - p[2]) < 0.2 && Math.abs(p[1] - p[3]) < 0.2 && Math.abs(p[0] - p[1]) > 10, "persegi panjang: dua pasang sisi, tidak semua sama");
    sama([titik(ketemu(di("bentuk-tetap", 0), "zt")).length, ketemu(di("bentuk-tetap", 1), "zt").rot, ketemu(di("bentuk-tetap", 2), "zt").rot], [3, 180, 40], "segitiga: tegak, dibalik 180 derajat, dimiringkan");
    const z = di("bentuk-tetap", 3);
    const besar = (o) => {
      const t = titik(o);
      return Math.abs(t.reduce((s, pp, i) => s + pp[0] * t[(i + 1) % t.length][1] - t[(i + 1) % t.length][0] * pp[1], 0)) / 2;
    };
    cek(["kc", "sd", "bs"].every((i) => titik(ketemu(z, i)).length === 3) && besar(ketemu(z, "kc")) < besar(ketemu(z, "sd")) && besar(ketemu(z, "sd")) < besar(ketemu(z, "bs")), "bentuk tetap: tiga segitiga kecil, sedang, besar, semuanya bertiga titik");
    const y = di("bentuk-tetap", 4);
    sama([titik(ketemu(y, "se1")).length, titik(ketemu(y, "se2")).length], [4, 4], "segi empat tegak dan miring bertitik empat");
    stat.kelompok += 5;
  }
  // Deskripsi jendela.
  {
    const a = di("deskripsi-jendela", 2);
    labelHitung(a, "js", 4);
    sama(ketemu(a, "jw").t, "kotak", "jendela: segi empat");
    labelHitung(di("deskripsi-jendela", 3), "jd", 4);
    stat.kelompok += 3;
  }
  // Keranjang tiga bentuk.
  {
    const o = di("keranjang-bentuk", 4);
    const masuk = [["k0", "kj0"], ["k3", "kj0"], ["k1", "kj1"], ["k4", "kj1"], ["k2", "kj2"], ["k5", "kj2"]];
    for (const [b, kr] of masuk) cek(dalamKotak(o, ketemu(o, b), kr), `keranjang: ${b} masuk ${kr}`);
    cek(titik(ketemu(o, "k1")).length === 3 && titik(ketemu(o, "k4")).length === 3 && ketemu(o, "k2").t === "kotak" && ketemu(o, "k5").t === "kotak" && ketemu(o, "k0").t === "bulat" && ketemu(o, "k3").t === "bulat", "keranjang: dua lengkung, dua segitiga, dua segi empat sesuai keranjangnya");
    sama(["cb0", "cb1", "cbt"].map((i) => isiTeks(di("keranjang-bentuk", 5), i)), ["1", "2", "2 benda"], "keranjang lengkung: dua benda");
    stat.kelompok += 7;
  }
  // Bayangan.
  {
    cek(isiTeks(di("bayangan", 1), "bt") === "tepi lurus, 4 sudut" && ketemu(di("bayangan", 2), "sh").warna === "#D97706" && isiTeks(di("bayangan", 2), "bt") === "pintu", "bayangan pertama: lurus, empat sudut, ternyata pintu (segi empat)");
    const b = di("bayangan", 3);
    cek(isiTeks(b, "bt") === "tepi melengkung" && ketemu(b, "sh2").d.includes("Q") && isiTeks(di("bayangan", 4), "bt") === "telur", "bayangan kedua: melengkung, ternyata telur (lengkung)");
    stat.kelompok += 2;
  }
  // Papan paku: titik sudut dan karet tepat di paku.
  {
    const paku = benda(di("papan-paku", 0), "pg");
    cek(paku.length === 16, "papan paku: enam belas paku");
    const dipaku = (x, y) => paku.some((p) => Math.hypot(p.x - x, p.y - y) < 0.6);
    const a = di("papan-paku", 1);
    sama([benda(a, "gd").length, benda(a, "gs").length], [3, 3], "papan paku: segitiga dari tiga paku");
    cek(benda(a, "gd").every((m) => dipaku(m.x, m.y)) && benda(a, "gs").every((g) => dipaku(g.x, g.y) && dipaku(g.x + g.x2, g.y + g.y2)), "papan paku: sudut dan karet segitiga tepat di paku");
    labelHitung(a, "gd", 3);
    const b = di("papan-paku", 2);
    sama([benda(b, "gd").length, benda(b, "gs").length], [4, 4], "papan paku: segi empat dari empat paku");
    cek(benda(b, "gd").every((m) => dipaku(m.x, m.y)) && benda(b, "gs").every((g) => dipaku(g.x, g.y) && dipaku(g.x + g.x2, g.y + g.y2)), "papan paku: sudut dan karet segi empat tepat di paku");
    labelHitung(b, "gd", 4);
    sama(isiTeks(di("papan-paku", 3), "gt"), "4 sudut", "papan paku: empat sudut");
    stat.kelompok += 5;
  }
  // Warnai: lengkung kuning, segitiga merah muda, segi empat hijau.
  {
    const o = di("warnai-nama", 4);
    sama(["w0", "w3", "w1", "w4", "w2", "w5"].map((i) => ketemu(o, i).warna), ["#FDE047", "#FDE047", "#F9A8D4", "#F9A8D4", "#86EFAC", "#86EFAC"], "warnai: lengkung kuning, segitiga merah muda, segi empat hijau");
    sama([titik(ketemu(o, "w1")).length, titik(ketemu(o, "w4")).length, titik(ketemu(o, "w2")).length, titik(ketemu(o, "w5")).length], [3, 3, 4, 4], "warnai: dua segitiga dan dua segi empat");
    sama(["wl0", "wl1", "wt"].map((i) => isiTeks(o, i)), ["1", "2", "2 segitiga"], "warnai: dua segitiga merah muda dihitung");
    stat.kelompok += 3;
  }
  // Detektif dan latihan.
  {
    cek(teksAda(di("detektif", 1)).includes("Petunjuk 1: 3 sisi lurus") && teksAda(di("detektif", 1)).includes("Petunjuk 2: 3 sudut"), "detektif pertama: petunjuk tiga sisi lurus dan tiga sudut (segitiga)");
    cek(ketemu(di("detektif", 2), "c2-k").sorot === true && ketemu(di("detektif", 4), "c1-k").sorot === true, "detektif: jawaban benar segitiga lalu lengkung");
    sama([0, 1, 2].map((i) => isiTeks(di("latihan-satu", 2), `c${i + 1}-t0`)), ["Lengkung", "Segitiga", "Segi empat"], "Latihan 1: tiga pilihan nama bentuk");
    cek(ketemu(di("latihan-satu", 3), "c1-k").sorot === true, "Latihan 1: jawaban benar lengkung");
    const b = di("latihan-dua", 1);
    sama(["bj", "bt", "bp", "bs"].map((i) => ketemu(b, i).op ?? 1), [0.25, 0.25, 0.25, 1], "Latihan 2: jam, telur, pintu diredupkan, irisan semangka tetap");
    sama(titik(ketemu(b, "bs")).length, 3, "Latihan 2: irisan semangka bersegitiga tiga");
    const c = di("latihan-tiga", 1);
    sama([titik(ketemu(c, "lm")).length, benda(c, "md").length], [4, 4], "Latihan 3: segi empat miring bersudut empat");
    sudutDiGambar(c, "lm", "m", 4);
    labelHitung(c, "md", 4);
    sama(["o3-t", "o4-t", "o5-t"].map((i) => isiTeks(di("latihan-tiga", 2), i)), ["3", "4", "5"], "Latihan 3: tiga pilihan");
    cek(ketemu(di("latihan-tiga", 3), "o4-k").sorot === true, "Latihan 3: jawaban benar empat");
    stat.kelompok += 9;
  }
  // Metode luar.
  {
    const a = di("luar-kenali", 0);
    sama([ketemu(a, "ka").t, titik(ketemu(a, "kb")).length, titik(ketemu(a, "kc")).length], ["bulat", 3, 4], "Kenali Bentuk: lingkaran, segitiga, segi empat");
    sama(["na", "nb", "nc"].map((i) => isiTeks(di("luar-kenali", 3), i)), ["lingkaran", "segitiga", "segi empat"], "Kenali Bentuk: tiga nama");
    const b = di("luar-kenali-terapan", 3);
    cek(ketemu(b, "bj").t === "bulat" && titik(ketemu(b, "bt")).length === 3 && ketemu(b, "bw").t === "kotak", "Kenali Bentuk terapan: jam bulat, tenda segitiga, jendela segi empat");
    sama(["c1-k", "c2-k", "c3-k"].map((i) => ketemu(di("luar-kenali-terapan", 1), i) !== undefined), [true, true, true], "Kenali Bentuk terapan: tiga pilihan");
    const c = di("luar-pilah", 2);
    cek(dalamKotak(c, ketemu(c, "cd"), "ck1") && dalamKotak(c, ketemu(c, "ct"), "ck2"), "Pilah Ciri: donat di keranjang lengkung, tenda di keranjang sisi lurus");
    const d = di("luar-pilah-terapan", 2);
    for (const [bd, kr] of [["p0", "pk1"], ["p3", "pk1"], ["p1", "pk2"], ["p2", "pk2"], ["p4", "pk2"], ["p5", "pk2"]]) cek(dalamKotak(d, ketemu(d, bd), kr), `Pilah Ciri terapan: ${bd} masuk ${kr}`);
    cek(ketemu(d, "p0").t === "bulat" && ketemu(d, "p3").d.includes("Q") && titik(ketemu(d, "p2")).length === 3 && titik(ketemu(d, "p5")).length === 3, "Pilah Ciri terapan: kelereng dan telur lengkung, tenda dan semangka segitiga");
    const e = di("luar-sekitar", 0);
    cek(ketemu(e, "rj").t === "bulat" && ketemu(e, "rw").t === "kotak" && ketemu(e, "rp").t === "kotak" && titik(ketemu(e, "rt")).length === 3, "Bentuk di Sekitar: jam bulat, jendela dan pintu segi empat, tenda segitiga");
    sama(isiTeks(di("luar-sekitar", 1), "rl"), "lengkung", "Bentuk di Sekitar: jam lengkung");
    sama(isiTeks(di("luar-sekitar", 2), "rl"), "segi empat", "Bentuk di Sekitar: jendela segi empat");
    sama(isiTeks(di("luar-sekitar", 3), "rl"), "segitiga", "Bentuk di Sekitar: tenda segitiga");
    const f = di("luar-sekitar-terapan", 0);
    cek(titik(ketemu(f, "kl")).length === 3 && ketemu(f, "kp").t === "kotak" && ketemu(f, "kc").t === "bulat", "Bentuk di Sekitar terapan: kue lupis segitiga, kue lapis segi empat, kue cucur bulat");
    sama(["t1-t0", "t2-t0", "t3-t0"].map((i) => isiTeks(di("luar-sekitar-terapan", 3), i)), ["segitiga", "segi empat", "lengkung"], "Bentuk di Sekitar terapan: tiga tanda");
    stat.kelompok += 12;
  }
  // Aturan pemilik: aplikasi belajar mandiri; tanpa instruksi kelompok, teman, kelas, atau buku.
  {
    const MANDIRI = /kelompok|\bteman\w*|\bkawan\w*|sekawan|depan kelas|bersama kelas|seluruh kelas|\bkelas\b|berpasangan|bermain bersama|bertanya kepada|buat ceritamu|buku|menulis di|menuliskan di|tulis di|menggambar|gambarlah|\bbawa(lah)?\b|membawa|dibawa|\bkertas\b|\bpensil\b|ambil (benda|pensil|kelereng|bola)|tangan (kiri|kanan)|\bjari\b|menyuruh|suruh|\braba\w*|\bmeraba|\btubuh|\blengan/i;
    for (const v of VIDEO) {
      for (const a of v.adegan) {
        const semua = [a.judul, a.sumber];
        a.ketukan.forEach((kt, i) => {
          semua.push(kt.suara);
          semua.push(...L.teksTerlihat(L.keadaanStory(a, i, 9999)));
        });
        const kena = semua.filter((t) => MANDIRI.test(t));
        cek(kena.length === 0, `${v.id}/${a.id}: narasi mandiri dan digital, tanpa kelompok, teman, kelas, atau buku (${kena.slice(0, 2).join(" | ")})`);
      }
    }
  }
}

/* ------------------------------ Sapaan dan peta susun ------------------------------ */
{
  const sap = adegan(M_VIDEO, "sapaan");
  const DAFTAR = ["Bentuk lengkung", "Bentuk segitiga", "Bentuk segi empat"];
  cek(/Halo anak-anak/.test(sap.ketukan[0].suara) && /Bentuk lengkung/i.test(L.teksTerlihat(akhirAdegan(sap, 1)).join(" | ")), "sapaan materi: tiga hal yang dipelajari tampil");
  sama(L.teksTerlihat(akhirAdegan(sap, 1)).filter((t) => DAFTAR.includes(t)), DAFTAR, "sapaan materi: daftar tiga hal");
  cek(!/\d/.test(sap.ketukan[1].suara), "sapaan materi: tanpa angka");
  cek(!/sebelas|belas|puluh/i.test(sap.ketukan.map((kt) => kt.suara).join(" ")), "sapaan: topik tanpa kata bilangan sebelas atau lebih");
  const sumberRingkas = JSON.parse(readFileSync(new URL("../src/data/kelas1-bab4-ringkas.json", import.meta.url), "utf8")).subBab.A;
  const sementara = new URL("../.tmp-k1b4s/A.json", import.meta.url);
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
    const ANGKA_BENTUK = { Lengkung: "0", Segitiga: "3", "Segi empat": "4", Persegi: "4", "Persegi panjang": "4" };
    cek(T.baris.every((b) => ANGKA_BENTUK[b.label] !== undefined && b.sel[0] === ANGKA_BENTUK[b.label] && b.sel[1] === ANGKA_BENTUK[b.label]), "tabel susun: banyak sisi lurus dan sudut sesuai bentuknya (lengkung 0, segitiga 3, segi empat 4)");
    // Margin teks sel di lebar 405 px: sel pendek (paling banyak delapan huruf) supaya margin teks >= 5 px.
    cek(T.baris.every((b) => b.sel.every((s) => s.length <= 8)), "tabel susun: sel pendek supaya margin teks >= 5 px di 405 px");
    const KATA_LARANG = /buku|halaman|kunci|kelompok|\bteman|kawan|kelas\b|kertas|pensil|\bbawa\b|menggambar|menulis di|depan kelas|kurang|tambah|luas|keliling/i;
    cek(!KATA_LARANG.test(JSON.stringify({ p: A.petaSusun, t: A.tabelSusun })), "peta dan tabel susun: tanpa kata terlarang dan tanpa kelompok, teman, kelas, buku, kertas, pensil");
  } else cek(false, "peta dan tabel susun: .tmp-k1b4s/A.json atau kelas1-bab4-ringkas.json subBab.A.petaSusun ada");
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k1b4a-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k1b4a-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k1b4a sendiri (${impor.join(", ")})`);
  }
  // Emoji dalam data teks gambar juga paling tinggi Emoji 12 (diperiksa pada gambar yang diputar).
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d), `${v.id}/${a.id}: emoji gambar paling tinggi Emoji 12`);
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k1b4a.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|naskah-k1b/.test(pembungkus) && /VIDEO_MATERI_K1B4A/.test(pembungkus) && /VIDEO_LUAR_K1B4A/.test(pembungkus) && /export function VideoK1B4A/.test(pembungkus) && /daftar-video-cerita/.test(pembungkus), "video-k1b4a.tsx: dua video dari mesin Story, tanpa naskah lama");
  cek(!/\r/.test(pembungkus), "video-k1b4a.tsx: akhir baris LF");
  const sendiri = readFileSync(new URL("uji-story-k1b4a.mjs", import.meta.url), "utf8");
  cek(!/\r/.test(sendiri), "uji-story-k1b4a.mjs: akhir baris LF");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit diputar)`);
}
console.log(`Pemeriksaan: ${stat.hitung} deret hitungan, ${stat.kalimat} penyebutan sisi dan sudut, ${stat.kelompok} pemeriksaan benda`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
