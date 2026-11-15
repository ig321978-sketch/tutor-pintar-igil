// Uji Story Kelas 2 Bab 3 Sub-Bab C (Bangun Ruang): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Video diputar bergaya guru: suara, teks terlihat, sumber, judul adegan, dan subjudul tanpa penyebutan buku (kata terlarang diperiksa pada adegan yang diputar).
// Memeriksa: pemicu kata, suara tanpa digit, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas, teks bertumpuk, pemisahan materi dan metode luar (nama Indonesia saja),
// bilangan paling besar dua puluh, hitungan satu per satu (angka berurutan, dekat bendanya, sama dengan bilangan yang diucapkan),
// dan data geometri yang DIHITUNG ULANG dari struktur gambar (bukan kata kunci):
//   bangun datar (pojok segitiga 3 dan segi empat 4, lingkaran tanpa pojok), tiga muka balok membentuk satu balok (kubus: lebar, tinggi, dalam sama),
//   rusuk (tiap garis menghubungkan dua titik sudut bertetangga; yang tersembunyi putus-putus; lengkap 12), titik sudut (tepat pada sudut; lengkap 8),
//   permukaan datar dan lengkung tiap bangun ruang (kubus 6/0, balok 6/0, tabung 2/1, kerucut 1/1 dengan satu titik puncak, bola 0/1), tabel bangun ruang,
//   kelompok datar dan lengkung, menggelinding (bola menyentuh lereng, putaran = jarak / jari-jari, kubus diam), tumpukan kubus, bola kecil di dalam kotak,
//   cap permukaan (kubus segi empat sama, balok segi empat panjang, tabung dan kerucut lingkaran, bola tanpa cap), bayangan (siluet), Tas Misteri (petunjuk menyaring lima bangun ruang),
//   kartu pilihan (tepat satu yang benar), banyak benda per adegan paling banyak dua puluh, klaim suara tentang banyak sisi, rusuk, titik sudut, permukaan dibandingkan dengan data dan gambar,
// aturan pemilik (belajar mandiri digital: tanpa kerja kelompok, survei teman, buku, menulis atau menggambar di buku, membawa benda nyata),
// peta dan tabel susun, emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k2b3C.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k2b3C-video.ts");
const U1 = await import("../src/components/modul/story/k2b3C-luar-1.ts");
const B = await import("../src/components/modul/story/k2b3C-bantu.ts");
const G = await import("../src/components/modul/story/k2b3C-gambar.ts");

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
const VIDEO = [V.VIDEO_MATERI_K2B3C, V.VIDEO_LUAR_K2B3C];
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
            const n = bilangan(o.d ?? "");
            const px = n.filter((_, q) => q % 2 === 0).map((q) => x + q);
            const py = n.filter((_, q) => q % 2 === 1).map((q) => y + q);
            cek(px.every((p) => p > -2 && p < 302) && py.every((p) => p > -2 && p < 204), `${nama}#${i + 1}: angka tulisan ${o.id} masuk kanvas`);
          }
        } else if (o.t === "garis" || o.t === "panah") cek(x > -2 && x < 302 && y > -2 && y < 204 && x + (o.x2 ?? 0) > -2 && x + (o.x2 ?? 0) < 302 && y + (o.y2 ?? 0) > -2 && y + (o.y2 ?? 0) < 204, `${nama}#${i + 1}: garis ${o.id} masuk kanvas`);
      }
      {
        const teksAda = akhir.filter((o) => o.t === "teks" && (o.op ?? 1) > 0 && o.isi && !/^[\u{1F000}-\u{1FFFF}]|^[✂✅❌⚖❓]$/u.test(o.isi));
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
const M_VIDEO = V.VIDEO_MATERI_K2B3C;
const U = V.VIDEO_LUAR_K2B3C;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const NAMA_LUAR = /Cetak Permukaan|Tas Misteri|Ciri Bangun Ruang|metode luar|metode dari luar/i;
const NAMA_INGGRIS = /Face Print|Mystery Bag|3D Attributes|Montessori|van Hiele|Compose|Decompose|Attribute Sort|Geoboard|Singapore/i;
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M_VIDEO);
  const luar = teksVideo(U);
  cek(!NAMA_LUAR.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of U1.NAMA_METODE_ID) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE_ID, ["Cetak Permukaan", "Tas Misteri", "Ciri Bangun Ruang"], "nama Indonesia metode luar");
  cek(!NAMA_INGGRIS.test(materi) && !NAMA_INGGRIS.test(luar), "nama metode hanya bahasa Indonesia (tanpa nama ganda Inggris)");
  const TERLARANG = /buku|panduan guru|hlm|halaman|(?<!kata )kunci|rubrik|salah ketik|salah cetak|tambahan video|contoh video|temuan|pertemuan/i;
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
      cek(!/Uji Kompetensi|Pengayaan|Ayo Berlatih|Ayo Berdiskusi|Ayo Berefleksi|Ayo Mengingat|Ayo Berkomunikasi|Ayo Berpikir|Ayo Berkarya|Ayo Bermain|Ayo Mencoba|Coba Pikirkan|soal \d|Soal \d|Eksplorasi|Refleksi/.test(semua.join(" | ")), `${v.id}/${a.id}: latihan disajikan sebagai Latihan, tanpa istilah buku`);
      // Tokoh hanya enam tokoh tetap (Malosi, Kira, Upe, Wei, Halim, Igil): tanpa nama lain dari data sumber.
      cek(!/\b(Tika|Lili|Dodi|Nia|Paman|Ibu|Ayah|Bapak|Budi|Ani|Doni|Sinta|Dewi|Rudi|Nina|Andi|Siti)\b/.test(semua.join(" | ")), `${v.id}/${a.id}: hanya enam tokoh tetap`);
    }
  }
  cek(M_VIDEO.subjudul === "Materi kurikulum" && U.subjudul === "Tiga metode luar", "subjudul video: Materi kurikulum dan Tiga metode luar");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 46), "video materi: label sumber berbentuk Materi: ... dan pendek");
  cek(U.adegan.every((a) => /Metode luar|Ringkasan/i.test(a.sumber) && a.sumber.length <= 46), "video metode luar: label sumber metode luar atau ringkasan, pendek");
  cek(M_VIDEO.id === "k2b3C-materi" && U.id === "k2b3C-luar", "id video k2b3C-materi dan k2b3C-luar");
  cek(U.judul.endsWith(": Metode dari Luar") && !/menurut/i.test(M_VIDEO.judul), "judul video: materi tanpa 'menurut', luar berakhir ': Metode dari Luar'");
  sama(M_VIDEO.adegan.map((a) => a.id).join(), "sapaan,benda-layar,bangun-datar,bangun-ruang,bisa-diisi,gelinding,permukaan,mengapa,lima-nama,kubus-sisi,kubus-rusuk,balok,tabung,kerucut,bola,tabel-ruang,cari-ruang,latihan-satu,latihan-dua,latihan-tiga,penutup", "urutan adegan materi");
  sama(U.adegan.map((a) => a.id).join(), "sapaan,luar-pembuka,luar-cetak,luar-cetak-terapan,luar-tas,luar-tas-terapan,luar-ciri,luar-ciri-terapan,luar-ringkas", "urutan adegan metode luar");
  cek(M_VIDEO.adegan[0].id === "sapaan" && U.adegan[0].id === "sapaan", "tiap video dibuka adegan sapaan");
  cek(M_VIDEO.adegan.filter((a) => /^latihan-/.test(a.id)).length === 3 && M_VIDEO.adegan[M_VIDEO.adegan.length - 1].id === "penutup", "video materi: Latihan 1 sampai 3 lalu penutup");
  cek(U.adegan[1].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  for (const kata of ["Latihan", "Igil", "Malosi", "Halim", "Kira", "Wei", "Upe", "bangun datar", "bangun ruang", "permukaan datar", "permukaan lengkung", "menggelinding", "kubus", "balok", "tabung", "kerucut", "bola", "sisi", "rusuk", "titik sudut", "titik puncak", "bisa diisi", "segitiga", "segi empat", "lingkaran"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  // Hanya bilangan sampai dua puluh: tanpa kali, bagi, bilangan lebih dari dua puluh, bersusun, satuan baku, atau rumus.
  const BOCOR = /dikali|perkalian|pembagian|dibagi|\bratus\b|\bribu\b|\b(tiga|empat|lima|enam|tujuh|delapan|sembilan) puluh\b|dua puluh (satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan)|\bluas\b|keliling|rumus|volume|sentimeter|centimeter|\bcm\b|\bmeter\b|penggaris|bersusun|meminjam|pinjam|menyimpan|simpan|×|÷/i;
  for (const v of [M_VIDEO, U]) {
    for (const a of v.adegan) cek(!BOCOR.test(teksAdegan(a)), `${v.id}/${a.id}: hanya bilangan sampai dua puluh (tanpa kali, bagi, bersusun, satuan baku, bilangan lebih dari dua puluh, rumus)`);
    for (const a of v.adegan) for (const i of a.ketukan.keys()) for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) for (const b of bilanganDari(t)) cek(Number(b) <= 20, `${v.id}/${a.id}#${i + 1}: angka di gambar paling besar dua puluh ("${t}")`);
  }
  cek(totalKetukan >= 70 && M_VIDEO.adegan.reduce((t, ad) => t + ad.ketukan.length, 0) >= 70, `total ketukan cukup dalam (${totalKetukan}; materi ${M_VIDEO.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)})`);
  const kataMateri = kataVideo(M_VIDEO);
  cek(kataMateri / 120 >= 8 && kataMateri / 120 <= 13, `durasi materi diputar 8 sampai 13 menit (${(kataMateri / 120).toFixed(1)} menit)`);
  cek(kataVideo(U) / 120 >= 3, `durasi video luar paling sedikit 3 menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
}

/* ------------------------------ Pembaca nama bilangan 1 sampai 50 dalam suara ------------------------------ */
const NAMA = B.NAMA_BILANGAN;
cek(NAMA.length === 51 && NAMA[26] === "dua puluh enam" && NAMA[50] === "lima puluh" && NAMA[14] === "empat belas" && NAMA[11] === "sebelas" && NAMA[40] === "empat puluh", "nama bilangan 0 sampai 50 benar");
const SATUAN = { satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8, sembilan: 9 };
const potong = (s) =>
  s
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => ({ w: w.replace(/[^a-z]/g, ""), akhir: /[,.!?;:]$/.test(w) }))
    .filter((t) => t.w);
/** Nama bilangan yang dimulai pada token p: [nilai, panjang] atau null (kata di seberang tanda baca tidak digabung). */
const bacaBil = (t, p) => {
  const a = t[p].w;
  const lanjut = (q) => q < t.length && !t[q - 1].akhir;
  if (a === "sepuluh") return [10, 1];
  if (a === "sebelas") return [11, 1];
  if (a in SATUAN) {
    const d = SATUAN[a];
    if (d >= 2 && lanjut(p + 1) && t[p + 1].w === "belas") return [10 + d, 2];
    if (d >= 2 && d <= 5 && lanjut(p + 1) && t[p + 1].w === "puluh") {
      if (lanjut(p + 2) && t[p + 2].w in SATUAN) return [d * 10 + SATUAN[t[p + 2].w], 3];
      return [d * 10, 2];
    }
    return [d, 1];
  }
  return null;
};
/** Semua nama bilangan dalam suara: [{v, mulai, panjang}]. */
const semuaBil = (suara) => {
  const t = potong(suara);
  const hasil = [];
  for (let p = 0; p < t.length; ) {
    const r = bacaBil(t, p);
    if (r) {
      hasil.push({ v: r[0], mulai: p, panjang: r[1] });
      p += r[1];
    } else p += 1;
  }
  return hasil;
};
/** Kalimat dengan nama bilangan diganti #nilai#, tanpa tanda baca. */
const normal = (kal) => {
  const t = potong(kal);
  const out = [];
  for (let p = 0; p < t.length; ) {
    const r = bacaBil(t, p);
    if (r) {
      out.push(`#${r[0]}#`);
      p += r[1];
    } else {
      out.push(t[p].w);
      p += 1;
    }
  }
  return out.join(" ");
};
/** Panjang deret bilangan berurutan terpanjang (kenaikan satu, saling bersebelahan) yang dimulai dari nilai v0. */
const rantaiTerpanjang = (suara, v0) => {
  const b = semuaBil(suara);
  let terbaik = 0;
  for (let p = 0; p < b.length; p += 1) {
    if (b[p].v !== v0) continue;
    let len = 1;
    while (p + len < b.length && b[p + len].v === v0 + len && b[p + len].mulai === b[p + len - 1].mulai + b[p + len - 1].panjang) len += 1;
    terbaik = Math.max(terbaik, len);
  }
  return terbaik;
};
cek(JSON.stringify(semuaBil("Dua puluh satu, dua puluh dua. Satu per satu: empat belas, sepuluh, dua puluh.").map((x) => x.v)) === JSON.stringify([21, 22, 1, 1, 14, 10, 20]), "pembaca nama bilangan benar");
cek(normal("Satu puluhan dan empat belas satuan menjadi dua puluhan dan empat satuan.") === "#1# puluhan dan #14# satuan menjadi #2# puluhan dan #4# satuan", "normalisasi kalimat benar");

let jumlahNama = 0;
for (const v of VIDEO) {
  for (const a of v.adegan) {
    const terlihat = new Set();
    a.ketukan.forEach((kt, i) => {
      for (let p = 0; p < L.kataDari(kt.suara).length; p += 1) for (const o of L.keadaanStory(a, i, p)) if (o.t === "teks" && o.isi) for (const b of bilanganDari(o.isi)) terlihat.add(b);
      for (const r of semuaBil(kt.suara)) {
        if (r.v >= 10) {
          jumlahNama += 1;
          cek(terlihat.has(String(r.v)), `${v.id}/${a.id}#${i + 1}: "${NAMA[r.v]}" tampak sebagai angka ${r.v} di gambar`);
        }
      }
    });
  }
}

/* ------------------------------ Pembaca gambar: bangun datar, bangun ruang, rusuk, titik sudut, cap, bayangan, lereng ------------------------------ */
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
const pusatObj = (b) => (b.t === "kotak" ? { x: b.x + b.w / 2, y: b.y + b.h / 2 } : b.t === "garis" ? { x: b.x + (b.x2 ?? 0) / 2, y: b.y + (b.y2 ?? 0) / 2 } : { x: b.x, y: b.y });
const di = (id, ke) => {
  const a = adegan(M_VIDEO, id) ?? adegan(U, id);
  return akhirAdegan(a, ke);
};
const labelAngka = (objs, p) => objs.filter((o) => o.t === "teks" && new RegExp(`^${p}n\\d+$`).test(o.id) && /^\d+$/.test(o.isi ?? "")).sort((m, n) => Number(m.id.slice(p.length + 1)) - Number(n.id.slice(p.length + 1)));
const stat = { hitung: 0, benda: 0, kalimat: 0, ruang: 0, rusuk: 0, kalimatGeo: 0 };

/** Nilai yang dipegang SENDIRI oleh uji (bukan dibaca dari berkas gambar): data lima bangun ruang. */
const AJARAN = {
  kubus: { datar: 6, lengkung: 0, rusuk: 12, titik: 8 },
  balok: { datar: 6, lengkung: 0, rusuk: 12, titik: 8 },
  tabung: { datar: 2, lengkung: 1, rusuk: null, titik: null },
  kerucut: { datar: 1, lengkung: 1, rusuk: null, titik: 1 },
  bola: { datar: 0, lengkung: 1, rusuk: null, titik: null },
};
const JENIS = Object.keys(AJARAN);
const AW = { kb: "kubus", bl: "balok", tb: "tabung", kr: "kerucut", bo: "bola" };
const SILUET = { kubus: "segi empat sama", balok: "segi empat panjang", tabung: "segi empat panjang", kerucut: "segitiga", bola: "lingkaran" };
const CAP = { kubus: "segi empat sama", balok: "segi empat panjang", tabung: "lingkaran", kerucut: "lingkaran", bola: null };
const BENDA = { dadu: "kubus", kardus: "balok", kaleng: "tabung", topi: "kerucut", kelereng: "bola", bola: "bola" };
const SISI_BANGUN = { segitiga: 3, segiempat: 4 };
cek(JSON.stringify(G.RUANG) === JSON.stringify(AJARAN), "data RUANG di berkas gambar sama dengan data geometri yang benar (kubus 6/12/8, balok 6/12/8, tabung 2 datar 1 lengkung, kerucut 1 datar 1 lengkung 1 puncak, bola 1 lengkung)");
cek(G.SISI_DATAR.segitiga === 3 && G.SISI_DATAR.segiempat === 4 && G.SISI_DATAR.lingkaran === 0, "sisi bangun datar: segitiga 3, segi empat 4, lingkaran 0");
cek(JSON.stringify(Object.keys(G.AWALAN).map((j) => [G.AWALAN[j], j])) === JSON.stringify(Object.entries(AW)), "awalan kunci jenis bangun ruang");

const ctr = (o) => (o.t === "kotak" ? { x: o.x + o.w / 2, y: o.y + o.h / 2 } : { x: o.x, y: o.y });
const pairsJalur = (o) => {
  const n = bilangan(o.d ?? "");
  const out = [];
  for (let i = 0; i + 1 < n.length; i += 2) out.push([(o.x ?? 0) + n[i], (o.y ?? 0) + n[i + 1]]);
  return out;
};
/** Kotak pembatas benda (kotak, bulat, jalur, garis). */
const bbox = (o) => {
  if (o.t === "kotak") return [o.x, o.y, o.x + o.w, o.y + o.h];
  if (o.t === "bulat") return [o.x - o.r, o.y - o.r, o.x + o.r, o.y + o.r];
  if (o.t === "jalur") {
    const p = pairsJalur(o);
    return [Math.min(...p.map((q) => q[0])), Math.min(...p.map((q) => q[1])), Math.max(...p.map((q) => q[0])), Math.max(...p.map((q) => q[1]))];
  }
  return [o.x, o.y, o.x, o.y];
};
const dekat = (a, b, t = 0.06) => Math.abs(a - b) <= t;
const samaTitik = (p, q, t = 0.11) => Math.abs(p[0] - q[0]) <= t && Math.abs(p[1] - q[1]) <= t;
const NAMA_JENIS_RE = /\b(kubus|balok|tabung|kerucut|bola)\b/gi;

/** Semua bangun ruang pada gambar: peta kunci -> {jenis, bagian}. Struktur dibaca dari bagian-bagiannya. */
const bacaRuang = (objs) => {
  const grup = new Map();
  for (const o of objs) {
    const m = /^(kb|bl|tb|kr|bo)([a-z]*)-(fd|fa|fk|bd|ta|sn)$/.exec(o.id);
    if (!m) continue;
    const kunci = `${m[1]}${m[2]}`;
    if (!grup.has(kunci)) grup.set(kunci, { kunci, jenis: AW[m[1]], b: {} });
    grup.get(kunci).b[m[3]] = o;
  }
  return grup;
};
/** Geometri balok dari tiga muka: titik sudut dalam koordinat gambar, lebar, tinggi, geser belakang. */
const geoBox = (g) => {
  const { fd, fa, fk } = g.b;
  if (!fd || !fa || !fk) return null;
  const d = pairsJalur(fd);
  const a = pairsJalur(fa);
  const kk = pairsJalur(fk);
  if (d.length !== 4 || a.length !== 4 || kk.length !== 4) return null;
  const w = d[1][0] - d[0][0];
  const h = d[3][1] - d[0][1];
  const ox = a[3][0] - a[0][0];
  const oy = a[0][1] - a[3][1];
  const [x0, y0] = d[0];
  // Delapan titik sudut dari tiga bit (x, y, z): x ke kanan, y ke bawah, z ke belakang.
  const V = [];
  for (let z = 0; z < 2; z += 1) for (let y = 0; y < 2; y += 1) for (let x = 0; x < 2; x += 1) V.push({ x, y, z, p: [x0 + x * w + z * ox, y0 + y * h - z * oy] });
  const bentukOk =
    samaTitik(a[2], [x0 + w + ox, y0 - oy]) && samaTitik(a[3], [x0 + ox, y0 - oy]) && samaTitik(kk[2], [x0 + w + ox, y0 + h - oy]) && samaTitik(kk[3], [x0 + w + ox, y0 - oy]) &&
    dekat(d[0][1], d[1][1]) && dekat(d[1][0], d[2][0]) && dekat(d[2][1], d[3][1]) && dekat(d[3][0], d[0][0]) && samaTitik(a[0], d[0]) && samaTitik(a[1], d[1]) && samaTitik(kk[0], d[1]) && samaTitik(kk[1], d[2]);
  return { w, h, ox, oy, V, bentukOk, x0, y0 };
};
const rusukBaca = (objs, kunci) => objs.filter((o) => o.t === "garis" && new RegExp(`^${kunci}r\\d+$`).test(o.id));
const titikBaca = (objs, kunci) => objs.filter((o) => o.t === "bulat" && new RegExp(`^${kunci}t\\d+$`).test(o.id));
const chipBaca = (objs, kunci) => objs.filter((o) => o.t === "teks" && new RegExp(`^${kunci}-p\\d+-t0$`).test(o.id)).map((o) => o.isi);
const pusatRuang = (g) => {
  const parts = Object.values(g.b);
  const bb = parts.map(bbox);
  return { x: (Math.min(...bb.map((q) => q[0])) + Math.max(...bb.map((q) => q[2]))) / 2, y: (Math.min(...bb.map((q) => q[1])) + Math.max(...bb.map((q) => q[3]))) / 2, bb };
};
const pusatX = (g) => {
  if (g.jenis === "kubus" || g.jenis === "balok") {
    const b = geoBox(g);
    return b.x0 + (b.w + b.ox) / 2;
  }
  return g.b.bd.x;
};
/** Titik pada garis lereng terdekat dari (px, py): jarak tegak lurus. */
const jarakLereng = (px, py) => {
  const { x0, y0, x1, y1 } = G.LERENG;
  const dx = x1 - x0;
  const dy = y1 - y0;
  return ((px - x0) * dy - (py - y0) * dx) / Math.hypot(dx, dy);
};

/** Pemeriksaan struktur bangun ruang, rusuk, titik sudut pada satu keadaan gambar. */
const periksaRuangDi = (objs, nm) => {
  const grup = bacaRuang(objs);
  for (const g of grup.values()) {
    stat.ruang += 1;
    const n = `${nm} ${g.kunci}`;
    if (g.jenis === "kubus" || g.jenis === "balok") {
      const b = geoBox(g);
      cek(!!b && b.bentukOk, `${n}: tiga muka tampak membentuk satu balok (muka depan segi empat, atas dan kanan berbagi sisinya)`);
      if (b) {
        const dalam = b.ox / 0.4;
        const kubus = dekat(b.w, b.h, 0.01) && dekat(dalam, b.w, 0.01);
        cek(b.ox > 0 && dekat(b.ox, b.oy, 0.01), `${n}: geser belakang searah miring`);
        cek(g.jenis === "kubus" ? kubus : !kubus, `${n}: ${g.jenis}: ${g.jenis === "kubus" ? "rusuk lebar, tinggi, dalam sama panjang" : "lebar, tinggi, dalam tidak semuanya sama"} (lebar ${b.w.toFixed(1)}, tinggi ${b.h.toFixed(1)}, dalam ${dalam.toFixed(1)})`);
        // Rusuk: tiap garis menghubungkan dua titik sudut yang berbeda tepat satu bit; tak ada rusuk kembar; yang tersembunyi (menyentuh titik belakang-bawah-kiri) putus-putus.
        const rs = rusukBaca(objs, g.kunci);
        const dipakai = new Set();
        for (const e of rs) {
          stat.rusuk += 1;
          const ujung1 = [e.x, e.y];
          const ujung2 = [e.x + e.x2, e.y + e.y2];
          const v1 = b.V.findIndex((v) => samaTitik(v.p, ujung1));
          const v2 = b.V.findIndex((v) => samaTitik(v.p, ujung2));
          cek(v1 >= 0 && v2 >= 0 && v1 !== v2, `${n}: ${e.id} menghubungkan dua titik sudut balok`);
          if (v1 >= 0 && v2 >= 0) {
            const bedaBit = ["x", "y", "z"].filter((c) => b.V[v1][c] !== b.V[v2][c]).length;
            cek(bedaBit === 1, `${n}: ${e.id} menghubungkan dua titik sudut yang bertetangga`);
            const kunciRusuk = [v1, v2].sort().join("-");
            cek(!dipakai.has(kunciRusuk), `${n}: ${e.id} bukan rusuk kembar`);
            dipakai.add(kunciRusuk);
            const sembunyi = [v1, v2].some((q) => b.V[q].x === 0 && b.V[q].y === 1 && b.V[q].z === 1);
            cek(!!e.putus === sembunyi, `${n}: ${e.id} ${sembunyi ? "tersembunyi maka putus-putus" : "tampak maka garis penuh"}`);
          }
        }
        const ts = titikBaca(objs, g.kunci);
        const pakaiT = new Set();
        for (const t of ts) {
          const v = b.V.findIndex((q) => samaTitik(q.p, [t.x, t.y]));
          cek(v >= 0 && !pakaiT.has(v), `${n}: ${t.id} tepat pada satu titik sudut balok dan tidak kembar`);
          pakaiT.add(v);
        }
        cek(rs.length <= AJARAN[g.jenis].rusuk && ts.length <= AJARAN[g.jenis].titik, `${n}: paling banyak ${AJARAN[g.jenis].rusuk} rusuk dan ${AJARAN[g.jenis].titik} titik sudut (ada ${rs.length} dan ${ts.length})`);
      }
    } else if (g.jenis === "tabung") {
      const bd = pairsJalur(g.b.bd);
      cek(!!g.b.ta && bd.length >= 8, `${n}: tabung: badan dan tutup`);
      if (g.b.ta) {
        const r = -bd[0][0] + g.b.bd.x;
        const lebarTutup = Math.max(...pairsJalur(g.b.ta).map((p) => p[0])) - g.b.ta.x;
        cek(dekat(r, lebarTutup, 0.2) && dekat(g.b.bd.x, g.b.ta.x) && dekat(g.b.bd.y, g.b.ta.y), `${n}: tutup tabung selebar badan dan setitik pusat`);
      }
    } else if (g.jenis === "kerucut") {
      const bd = pairsJalur(g.b.bd);
      cek(!g.b.ta && bd.length >= 6 && dekat(bd[0][0], g.b.bd.x) && dekat(bd[0][1], g.b.bd.y), `${n}: kerucut: badan dengan ujung runcing di atas`);
    } else if (g.jenis === "bola") {
      cek(g.b.bd?.t === "bulat" && g.b.bd.r > 0, `${n}: bola berupa lingkaran penuh`);
    }
  }
};

/** Bangun datar `dt{key}`: jumlah pojok sama dengan nama, penanda pojok tepat di pojok, label sisi. */
const periksaDatar = (objs, nm) => {
  for (const o of objs) {
    const m = /^dt([a-z]+)$/.exec(o.id);
    if (!m) continue;
    stat.benda += 1;
    const namaT = ketemu(objs, `${o.id}-nm`)?.isi;
    const jenis = o.t === "bulat" ? "lingkaran" : pairsJalur(o).length === 3 ? "segitiga" : pairsJalur(o).length === 4 ? "segiempat" : "?";
    cek(jenis !== "?", `${nm}: ${o.id} segitiga, segi empat, atau lingkaran`);
    if (namaT) cek(namaT === { segitiga: "segitiga", segiempat: "segi empat", lingkaran: "lingkaran" }[jenis], `${nm}: nama "${namaT}" cocok dengan ${jenis} yang digambar`);
    const sisi = jenis === "lingkaran" ? 0 : pairsJalur(o).length;
    const pj = objs.filter((q) => new RegExp(`^${o.id}p\\d+$`).test(q.id));
    if (jenis !== "lingkaran") {
      const p = pairsJalur(o);
      cek(pj.every((q) => p.some((t) => samaTitik(t, [q.x, q.y]))) && pj.length <= sisi, `${nm}: penanda pojok ${o.id} tepat pada pojok (${pj.length} dari ${sisi})`);
      const ln = ketemu(objs, `${o.id}-ln`)?.isi;
      if (ln) cek(ln === `${sisi} sisi` && (pj.length === sisi || pj.length === 0), `${nm}: label "${ln}" sama dengan ${sisi} pojok yang digambar`);
      // segi empat sama sisi (persegi) bila diberi nama segi empat: empat sisi sama panjang.
      if (jenis === "segiempat") cek([0, 1, 2, 3].every((i) => dekat(Math.hypot(p[i][0] - p[(i + 1) % 4][0], p[i][1] - p[(i + 1) % 4][1]), Math.hypot(p[0][0] - p[1][0], p[0][1] - p[1][1]), 0.3)), `${nm}: segi empat ${o.id} sisinya sama panjang`);
    } else {
      const ln = ketemu(objs, `${o.id}-ln`)?.isi;
      if (ln) cek(ln === "lengkung", `${nm}: lingkaran berlabel lengkung`);
    }
  }
};

/** Cap, bayangan: bentuk dibaca dari struktur gambar. */
const bentukDatarDari = (o) => {
  if (o.t === "bulat") return "lingkaran";
  if (o.t === "kotak") return dekat(o.w, o.h, 0.01) ? "segi empat sama" : "segi empat panjang";
  if (o.t === "jalur" && pairsJalur(o).length === 3) return "segitiga";
  return "?";
};
const periksaCapBayang = (objs, nm) => {
  for (const o of objs) {
    let m = /^cp(kb|bl|tb|kr)([a-z]*)$/.exec(o.id);
    if (m) {
      stat.benda += 1;
      cek(bentukDatarDari(o) === CAP[AW[m[1]]], `${nm}: cap ${AW[m[1]]} berbentuk ${CAP[AW[m[1]]]} (digambar ${bentukDatarDari(o)})`);
    }
    m = /^by(kb|bl|tb|kr|bo)([a-z]*)$/.exec(o.id);
    if (m) {
      stat.benda += 1;
      cek(bentukDatarDari(o) === SILUET[AW[m[1]]], `${nm}: bayangan ${AW[m[1]]} berbentuk ${SILUET[AW[m[1]]]} (digambar ${bentukDatarDari(o)})`);
    }
  }
};
/** Label nama jenis di bawah bangun ruang (id nm-xx atau jn{i}) harus tepat di bawah bangun ruang dengan jenis itu; nama benda sehari-hari (ob-xx, bn{i}, ct-xx) cocok jenisnya. */
const periksaLabel = (objs, nm) => {
  const grup = [...bacaRuang(objs).values()];
  const cari = (jenis, x) => grup.filter((g) => g.jenis === jenis && Math.abs(pusatX(g) - x) < 1.2);
  for (const o of objs) {
    if (o.t !== "teks") continue;
    let m = /^nm-(kb|bl|tb|kr|bo)$/.exec(o.id);
    if (m) {
      stat.benda += 1;
      cek(o.isi === AW[m[1]] && cari(AW[m[1]], o.x).length === 1, `${nm}: label "${o.isi}" tepat di bawah ${AW[m[1]]}`);
    }
    m = /^jn(\d)$/.exec(o.id);
    if (m) {
      stat.benda += 1;
      cek(o.isi === JENIS[Number(m[1])] && cari(o.isi, o.x).length === 1, `${nm}: nama bentuk "${o.isi}" tepat di bawah ${JENIS[Number(m[1])]}`);
    }
    m = /^(ob|ct)-(kb|bl|tb|kr|bo)$/.exec(o.id) || /^bn(\d)$/.exec(o.id);
    if (m) {
      stat.benda += 1;
      const jenis = BENDA[o.isi];
      cek(!!jenis && cari(jenis, o.x).length === 1, `${nm}: benda "${o.isi}" berbentuk ${jenis} dan tepat di bawah ${jenis}`);
    }
  }
};
/** Chip dan kartu nama permukaan: banyaknya sama dengan data jenisnya bila lengkap. */
const periksaChip = (objs, nm, akhir) => {
  for (const g of bacaRuang(objs).values()) {
    const c = chipBaca(objs, g.kunci);
    if (c.length) {
      stat.benda += 1;
      const d = c.filter((t) => t === "datar").length;
      const l = c.filter((t) => t === "lengkung").length;
      cek(c.every((t) => t === "datar" || t === "lengkung") && d <= AJARAN[g.jenis].datar && l <= AJARAN[g.jenis].lengkung, `${nm} ${g.kunci}: chip permukaan tidak melebihi data (${d} datar, ${l} lengkung)`);
      if (akhir) cek(d === AJARAN[g.jenis].datar && l === AJARAN[g.jenis].lengkung, `${nm} ${g.kunci}: chip permukaan akhir adegan ${d} datar dan ${l} lengkung sama dengan data ${g.jenis}`);
    }
  }
};

/** Kalimat dalam suara dengan "segi empat" disatukan supaya "empat" tidak terbaca sebagai bilangan. */
const kalimatGeo = (kal) => normal(kal.replace(/segi empat/gi, "segiempat").replace(/titik sudut/gi, "titiksudut").replace(/titik puncak/gi, "titikpuncak").replace(/permukaan datar/gi, "permukaandatar").replace(/permukaan lengkung/gi, "permukaanlengkung"));
const kataJenis = (kal) => [...new Set([...kal.toLowerCase().matchAll(NAMA_JENIS_RE)].map((m) => m[1]))];
/** Banyak yang disebut suara untuk satu jenis: [{jenis, sifat, n}]. */
const klaimSuara = (kal) => {
  const n = ` ${kalimatGeo(kal)} `;
  const out = [];
  const pola = [
    [/#(\d+)# (sisi|rusuk|titiksudut|titikpuncak|permukaandatar|permukaanlengkung)(?: |$)/g, 1, 2],
    [/ (sisi|rusuk|titiksudut|titikpuncak) (kubus|balok|tabung|kerucut|bola) ada #(\d+)#/g, 3, 1],
  ];
  for (const [re, iN, iS] of pola) for (const m of n.matchAll(re)) out.push({ n: Number(m[iN]), sifat: m[iS] });
  for (const m of n.matchAll(/tidak punya (permukaandatar|permukaanlengkung|rusuk|titiksudut)/g)) out.push({ n: 0, sifat: m[1] });
  return out;
};
const SIFAT_KUNCI = { sisi: "datar", permukaandatar: "datar", permukaanlengkung: "lengkung", rusuk: "rusuk", titiksudut: "titik", titikpuncak: "titik" };

/* ------------------------------ Pemeriksaan tiap keadaan gambar ------------------------------ */
{
  const itemMaks = (objs) => {
    const kunci = new Set([...bacaRuang(objs).keys()]);
    const dt = objs.filter((o) => /^dt[a-z]+$/.test(o.id)).length;
    const isi = objs.filter((o) => /^isi\d+$/.test(o.id)).length;
    const lain = objs.filter((o) => /^(rl|tg)[a-z]+$/.test(o.id) || /^cp(kb|bl|tb|kr)/.test(o.id) || /^by(kb|bl|tb|kr|bo)/.test(o.id)).length;
    return kunci.size + dt + isi + lain;
  };
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      const maks = { rusuk: new Map(), titik: new Map() };
      const seen = [];
      a.ketukan.forEach((kt, i) => {
        const nm = `${v.id}/${a.id}#${i + 1}`;
        const objs = akhirAdegan(a, i);
        const akhir = i === a.ketukan.length - 1;
        cek(itemMaks(objs) <= 20, `${nm}: jumlah benda bergambar paling banyak dua puluh (${itemMaks(objs)})`);
        periksaRuangDi(objs, nm);
        periksaDatar(objs, nm);
        periksaCapBayang(objs, nm);
        periksaLabel(objs, nm);
        periksaChip(objs, nm, akhir);
        // Hitungan rusuk dan titik sudut per bangun ruang (maksimum selama adegan).
        for (const g of bacaRuang(objs).values()) {
          if (g.jenis === "kubus" || g.jenis === "balok") {
            maks.rusuk.set(g.kunci, Math.max(maks.rusuk.get(g.kunci) ?? 0, rusukBaca(objs, g.kunci).length));
            maks.titik.set(g.kunci, Math.max(maks.titik.get(g.kunci) ?? 0, titikBaca(objs, g.kunci).length));
          }
        }
        // Klaim suara tentang banyak sisi, rusuk, titik sudut, permukaan dihitung ulang dari data dan dari gambar yang tampak.
        for (const kal of kt.suara.split(/(?<=[.!?])\s+/)) {
          if (/(segitiga|segi empat) dibatasi/i.test(kal)) continue;
          const namaDalam = kataJenis(kal);
          const konteks = [...new Set([...bacaRuang(objs).values()].map((g) => g.jenis))];
          for (const kl of klaimSuara(kal)) {
            stat.kalimatGeo += 1;
            const sifat = SIFAT_KUNCI[kl.sifat];
            const targets = namaDalam.length ? namaDalam : konteks;
            cek(targets.length >= 1, `${nm}: klaim "${kal}" punya bangun ruang yang jelas`);
            for (const j of targets) {
              const benar = AJARAN[j][sifat] ?? 0;
              cek(kl.n === benar, `${nm}: "${kal}" menyebut ${kl.n} ${kl.sifat} untuk ${j}, seharusnya ${benar}`);
              // Bila ada gambarnya (rusuk, titik sudut, chip, kartu sisi), banyak yang tampak harus sama dengan yang disebut.
              for (const g of [...bacaRuang(objs).values()].filter((q) => q.jenis === j)) {
                if (sifat === "rusuk" && g.jenis !== "tabung" && rusukBaca(objs, g.kunci).length > 0 && /^(?!.*putus)/.test(kal)) cek(rusukBaca(objs, g.kunci).length === kl.n, `${nm}: ${kl.n} rusuk disebut, ${rusukBaca(objs, g.kunci).length} rusuk ${g.kunci} tampak`);
                if (sifat === "titik" && (g.jenis === "kubus" || g.jenis === "balok") && titikBaca(objs, g.kunci).length > 0) cek(titikBaca(objs, g.kunci).length === kl.n, `${nm}: ${kl.n} titik sudut disebut, ${titikBaca(objs, g.kunci).length} titik ${g.kunci} tampak`);
                const c = chipBaca(objs, g.kunci);
                if (c.length && (kl.sifat === "sisi" || kl.sifat === "permukaandatar")) cek(c.filter((t) => t === "datar").length === kl.n, `${nm}: ${kl.n} permukaan datar disebut, ${c.filter((t) => t === "datar").length} chip datar ${g.kunci}`);
                const kartuSisi = objs.filter((o) => new RegExp(`^${g.kunci}-s\\d+-k$`).test(o.id)).length;
                if (kartuSisi && kl.sifat === "sisi") cek(kartuSisi === kl.n, `${nm}: ${kl.n} sisi disebut, ${kartuSisi} kartu nama sisi tampak`);
              }
            }
          }
        }
        // Teks ringkas di gambar ("6 sisi", "12 rusuk", "8 titik sudut", "2 datar, 1 lengkung", "1 datar, 1 lengkung, 1 puncak") dicocokkan dengan data.
        const jenisAda = [...new Set([...bacaRuang(objs).values()].map((g) => g.jenis))];
        for (const t of objs.filter((o) => o.t === "teks" && !/^dt/.test(o.id) && (o.op ?? 1) > 0 && o.isi).map((o) => o.isi)) {
          let mm = /^(\d+) (sisi|rusuk|titik sudut)$/.exec(t);
          if (mm) {
            stat.benda += 1;
            const s = { sisi: "datar", rusuk: "rusuk", "titik sudut": "titik" }[mm[2]];
            const boxes = jenisAda.filter((j) => j === "kubus" || j === "balok");
            cek(boxes.length >= 1 && boxes.every((j) => AJARAN[j][s] === Number(mm[1])), `${nm}: teks "${t}" cocok dengan data kubus atau balok yang tampak (${boxes.join()})`);
          }
          mm = /^(\d+) datar, (\d+) lengkung(?:, (\d+) puncak)?$/.exec(t);
          if (mm) {
            stat.benda += 1;
            const lengk = jenisAda.filter((j) => j === "tabung" || j === "kerucut");
            cek(lengk.length === 1 && AJARAN[lengk[0]].datar === Number(mm[1]) && AJARAN[lengk[0]].lengkung === Number(mm[2]) && (mm[3] === undefined || AJARAN[lengk[0]].titik === Number(mm[3])), `${nm}: teks "${t}" cocok dengan data ${lengk.join()}`);
          }
        }
        seen.push(objs);
      });
      for (const [kunci, n] of maks.rusuk) if (n > 0) cek(n === 12, `${v.id}/${a.id}: rusuk ${kunci} yang digambar lengkap dua belas (ada ${n})`);
      for (const [kunci, n] of maks.titik) if (n > 0) cek(n === 8, `${v.id}/${a.id}: titik sudut ${kunci} yang digambar lengkap delapan (ada ${n})`);
    }
  }
}

/* ------------------------------ Deret hitungan, tanpa kali dan bagi, bilangan sampai dua puluh ------------------------------ */
{
  // 1) Deret angka hitungan `${p}n{i}`: berurutan, dekat bendanya, sebanyak bilangan berurutan yang diucapkan.
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
  // 2) Tanpa kali, bagi, rumus; bilangan di suara paling besar dua puluh.
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((kt, i) => {
        const nm = `${v.id}/${a.id}#${i + 1}`;
        cek(!/dikali|dibagi|perkalian|pembagian|ditambah|dikurangi/i.test(kt.suara), `${nm}: suara tanpa kali, bagi, dan hitung campuran (bab bentuk)`);
        cek(semuaBil(kt.suara).every((r) => r.v <= 20), `${nm}: suara tanpa bilangan lebih dari dua puluh`);
        for (const t of L.teksTerlihat(akhirAdegan(a, i))) cek(!/\d\s*[×÷+−]\s*\d/.test(t), `${nm} gambar: "${t}" tanpa kali, bagi, tambah, kurang`);
      });
    }
  }
}

/* ------------------------------ Gelinding, tumpukan, kelompok, kotak isi, tabel, tas, kartu pilihan ------------------------------ */
const pilihanAda = (objs) => [1, 2, 3].map((q) => ({ t: ketemu(objs, `c${q}-t`)?.isi, s: !!ketemu(objs, `c${q}-k`)?.sorot, x: ketemu(objs, `c${q}-k`) ? ctr(ketemu(objs, `c${q}-k`)).x : null })).filter((c) => c.t !== undefined);
const dipilih = (objs) => pilihanAda(objs).filter((c) => c.s).map((c) => c.t);
{
  const suaraAdegan = (id) => (adegan(M_VIDEO, id) ?? adegan(U, id))?.ketukan.map((x) => x.suara).join(" ") ?? "";
  // Kartu pilihan jawaban: dua atau tiga pilihan berbeda di tiap keadaan.
  for (const v of VIDEO) for (const a of v.adegan) a.ketukan.forEach((_, i) => {
    const pl = pilihanAda(akhirAdegan(a, i));
    if (pl.length) {
      stat.benda += 1;
      cek((pl.length === 2 || pl.length === 3) && new Set(pl.map((c) => c.t)).size === pl.length, `${v.id}/${a.id}#${i + 1}: ${pl.length} pilihan jawaban berbeda`);
    }
  });

  // Menggelinding: bola bergerak menyusuri lereng dengan putaran sesuai jarak; kubus diam; tabung berbaring bergerak tanpa memutar.
  for (const id of ["gelinding", "mengapa"]) {
    const a = adegan(M_VIDEO, id);
    let sebelum = null;
    a.ketukan.forEach((kt, i) => {
      const objs = akhirAdegan(a, i);
      const bola = objs.find((o) => /^rl[a-z]+$/.test(o.id));
      const tabung = objs.find((o) => /^tg[a-z]+$/.test(o.id));
      const nm = `${id}#${i + 1}`;
      if (bola) {
        stat.benda += 1;
        const r = bilangan(bola.d)[0];
        cek(Math.abs(Math.abs(jarakLereng(bola.x, bola.y)) - r) < 0.7, `${nm}: bola menyentuh lereng (jarak ${Math.abs(jarakLereng(bola.x, bola.y)).toFixed(2)}, jari-jari ${r})`);
        if (sebelum?.bola && (sebelum.bola.x !== bola.x || sebelum.bola.y !== bola.y)) {
          const jarak = Math.hypot(bola.x - sebelum.bola.x, bola.y - sebelum.bola.y);
          const putar = (bola.rot ?? 0) - (sebelum.bola.rot ?? 0);
          cek(bola.x > sebelum.bola.x && bola.y > sebelum.bola.y, `${nm}: bola menggelinding menuruni lereng`);
          cek(Math.abs(putar - (jarak / r) * (180 / Math.PI)) < 1, `${nm}: putaran bola ${putar.toFixed(1)} derajat sesuai jarak ${jarak.toFixed(1)} dan jari-jari ${r} (${((jarak / r) * (180 / Math.PI)).toFixed(1)})`);
        }
      }
      if (tabung) {
        stat.benda += 1;
        const t = pairsJalur(tabung);
        const ry = Math.max(...t.map((p) => p[1])) - tabung.y;
        cek(Math.abs(Math.abs(jarakLereng(tabung.x, tabung.y)) - ry) < 0.7 && (tabung.rot ?? 0) === 0, `${nm}: tabung berbaring menempel lereng tanpa berputar (jarak ${Math.abs(jarakLereng(tabung.x, tabung.y)).toFixed(2)}, tinggi/2 ${ry.toFixed(2)})`);
        if (sebelum?.tabung && sebelum.tabung.x !== tabung.x) cek(tabung.x > sebelum.tabung.x && tabung.y > sebelum.tabung.y, `${nm}: tabung berbaring meluncur menuruni lereng`);
      }
      const kubus = bacaRuang(objs).get("kba");
      if (kubus && sebelum?.kubusPos) cek(JSON.stringify([kubus.b.fd.x, kubus.b.fd.y]) === JSON.stringify(sebelum.kubusPos), `${nm}: dadu (kubus) tetap diam di tempatnya`);
      sebelum = { bola, tabung, kubusPos: kubus ? [kubus.b.fd.x, kubus.b.fd.y] : sebelum?.kubusPos };
    });
  }
  {
    const a = adegan(M_VIDEO, "gelinding");
    const awal = akhirAdegan(a, 0);
    const akh = akhirAdegan(a, a.ketukan.length - 1);
    const b0 = awal.find((o) => /^rl/.test(o.id));
    const b1 = akh.find((o) => /^rl/.test(o.id));
    const t0 = awal.find((o) => /^tg/.test(o.id));
    const t1 = akh.find((o) => /^tg/.test(o.id));
    cek(b1.x - b0.x > 60 && t1.x - t0.x > 20, "gelinding: bola dan tabung berbaring bergeser jauh");
    cek(JSON.stringify(akh.find((o) => o.id === "kba-fd")) === JSON.stringify(awal.find((o) => o.id === "kba-fd")), "gelinding: dadu tidak bergeser");
    cek(bacaRuang(akh).get("kba").jenis === "kubus" && AJARAN.kubus.lengkung === 0 && AJARAN.tabung.lengkung > 0 && AJARAN.bola.lengkung > 0, "gelinding: yang menggelinding (bola, tabung) punya permukaan lengkung, yang diam (kubus) tidak");
    const kt = di("gelinding", 4);
    sama([isiTeks(kt, "gl-t0"), isiTeks(kt, "gd-t0")], ["menggelinding: bola, kaleng", "diam: dadu"], "gelinding: ringkasan bola dan kaleng menggelinding, dadu diam");
  }

  // Tumpukan dadu: tiga kubus bertumpuk lurus, muka depan atas tepat di atas muka depan bawah.
  {
    const akh = di("mengapa", 2);
    const kb = ["kba", "kbb", "kbc"].map((k0) => bacaRuang(akh).get(k0));
    cek(kb.every((g) => g && g.jenis === "kubus"), "tumpukan: tiga kubus");
    const geo = kb.map((g) => geoBox(g));
    cek(geo.every((g) => g.bentukOk && dekat(g.x0, geo[0].x0) && dekat(g.w, geo[0].w)), "tumpukan: tiga kubus segaris dan sama ukuran");
    cek(dekat(geo[0].y0 - geo[1].y0, geo[0].h, 0.3) && dekat(geo[1].y0 - geo[2].y0, geo[1].h, 0.3), "tumpukan: tiap kubus tepat di atas kubus di bawahnya (tinggi satu kubus)");
  }

  // Kelompok permukaan: kubus dan balok di kotak datar; tabung, kerucut, bola di kotak lengkung.
  {
    const akh = di("permukaan", 4);
    const rg = { datar: ketemu(akh, "rgd-k"), lengkung: ketemu(akh, "rgl-k") };
    const grup = [...bacaRuang(akh).values()];
    cek(grup.length === 5 && new Set(grup.map((g) => g.jenis)).size === 5, "permukaan: lima bangun ruang berbeda");
    for (const g of grup) {
      const x = pusatX(g);
      const wilayah = x > rg.datar.x && x < rg.datar.x + rg.datar.w ? "datar" : x > rg.lengkung.x && x < rg.lengkung.x + rg.lengkung.w ? "lengkung" : null;
      stat.benda += 1;
      cek(wilayah !== null && (wilayah === "datar" ? AJARAN[g.jenis].lengkung === 0 : AJARAN[g.jenis].lengkung > 0), `permukaan: ${g.jenis} berada di kotak ${wilayah} dan sesuai datanya (lengkung ${AJARAN[g.jenis].lengkung})`);
    }
  }

  // Kotak isi: bola kecil di dalam kotak, angka berurutan sama dengan banyaknya.
  {
    const akh = di("bangun-ruang", 1);
    const kt = ketemu(akh, "kt-kotak");
    const bola = akh.filter((o) => /^isi\d+$/.test(o.id));
    cek(bola.length === 5 && bola.every((o) => o.x - o.r > kt.x && o.x + o.r < kt.x + kt.w && o.y - o.r > kt.y && o.y + o.r < kt.y + kt.h), "kotak isi: lima bola kecil semuanya di dalam kotak");
    let rapat = true;
    for (let p = 0; p < bola.length; p += 1) for (let q = p + 1; q < bola.length; q += 1) if (Math.hypot(bola[p].x - bola[q].x, bola[p].y - bola[q].y) < 2 * bola[p].r - 0.5) rapat = false;
    cek(rapat, "kotak isi: bola kecil tidak saling menimpa");
  }

  // Kartu nama sisi kubus: enam kartu bernomor 1..6 mengikuti urutan yang diucapkan; tiga tampak lebih dulu.
  {
    const a = adegan(M_VIDEO, "kubus-sisi");
    const akh = di("kubus-sisi", 2);
    const kartuSisi = akh.filter((o) => /^kba-s\d+-t0$/.test(o.id)).sort((p, q) => Number(p.id.slice(5, -3)) - Number(q.id.slice(5, -3))).map((o) => o.isi);
    const NAMA6 = ["depan", "atas", "kanan", "belakang", "bawah", "kiri"];
    sama(kartuSisi, NAMA6.map((n, i) => `${i + 1} ${n}`), "kubus sisi: enam kartu nama sisi bernomor 1 sampai 6");
    cek(kartuSisi.length === AJARAN.kubus.datar && new Set(NAMA6).size === 6, "kubus sisi: banyak kartu sama dengan jumlah sisi kubus (6)");
    const dari = [...(` ${normal(a.ketukan[2].suara)} `).matchAll(/#(\d)# (depan|atas|kanan|belakang|bawah|kiri)/g)].map((m) => `${m[1]} ${m[2]}`);
    sama(dari, kartuSisi, "kubus sisi: urutan nama sisi yang diucapkan sama dengan kartunya");
    const geo = geoBox(bacaRuang(akh).get("kba"));
    cek(geo.bentukOk && dekat(geo.w, geo.h, 0.01), "kubus sisi: muka depan kubus persegi (segi empat sama besar)");
    // Tiga sisi tampak disorot bergantian: depan, atas, kanan.
    const s3 = a.ketukan[2];
    const urutSorot = [];
    for (let p = 0; p < L.kataDari(s3.suara).length; p += 1) {
      const st = L.keadaanStory(a, 2, p);
      const so = st.filter((o) => /^kba-f[dak]$/.test(o.id) && o.sorot).map((o) => o.id.slice(-2));
      if (so.length === 1 && urutSorot[urutSorot.length - 1] !== so[0]) urutSorot.push(so[0]);
    }
    sama(urutSorot, ["fd", "fa", "fk"], "kubus sisi: muka depan, atas, kanan disorot bergantian sesuai kata");
  }

  // Tabel bangun ruang: tiap baris dihitung ulang dari data.
  {
    const akh = di("tabel-ruang", 4);
    for (let i = 0; i < 5; i += 1) {
      const nama = isiTeks(akh, `tr${i}-n`);
      stat.benda += 1;
      const j = AJARAN[nama];
      cek(!!j && nama === JENIS[i] && isiTeks(akh, `tr${i}-d`) === String(j.datar) && isiTeks(akh, `tr${i}-l`) === String(j.lengkung), `tabel: baris ${nama}: datar ${isiTeks(akh, `tr${i}-d`)}, lengkung ${isiTeks(akh, `tr${i}-l`)} sama dengan data`);
    }
    sama([isiTeks(akh, "th-d"), isiTeks(akh, "th-l")], ["datar", "lengkung"], "tabel: judul kolom datar dan lengkung");
  }

  // Cetak Permukaan: tiap baris (bangun ruang, panah, cap, nama cap) sejajar; bentuk cap dibaca dari gambar.
  {
    const a = adegan(U, "luar-cetak");
    const akh = akhirAdegan(a);
    const grup = [...bacaRuang(akh).values()];
    cek(grup.length === 5, "cetak: lima bangun ruang");
    const baris = grup.map((g) => ({ g, y: pusatRuang(g).y })).sort((p, q) => p.y - q.y);
    baris.forEach(({ g, y }, i) => {
      stat.benda += 1;
      const cp = akh.find((o) => new RegExp(`^cp${G.AWALAN[g.jenis]}a$`).test(o.id));
      const pn = akh.find((o) => o.id === `pn${i}`);
      const nama = isiTeks(akh, `cn${i}`);
      cek(g.jenis === JENIS[i] || ["kubus", "balok", "tabung", "kerucut", "bola"][i] === g.jenis, `cetak: baris ${i + 1} berisi ${g.jenis} sesuai urutan`);
      cek(pn && Math.abs(pn.y - y) < 4.5, `cetak: panah baris ${i + 1} sejajar ${g.jenis} (selisih ${pn ? Math.abs(pn.y - y).toFixed(1) : "?"})`);
      if (CAP[g.jenis]) cek(cp && Math.abs(ctr(cp).y - pn.y) < 0.5 && bentukDatarDari(cp) === CAP[g.jenis] && nama === CAP[g.jenis], `cetak: ${g.jenis} menghasilkan cap ${CAP[g.jenis]} sejajar dengan bangun ruangnya (nama "${nama}")`);
      else cek(!cp && nama === "tidak ada cap" && AJARAN[g.jenis].datar === 0, `cetak: ${g.jenis} tanpa permukaan datar tidak menghasilkan cap`);
      // Hanya bangun ruang yang punya permukaan datar menghasilkan cap.
      cek(!!CAP[g.jenis] === AJARAN[g.jenis].datar > 0, `cetak: cap ada bila ${g.jenis} punya permukaan datar`);
    });
    const kt = di("luar-cetak-terapan", 2);
    const cp = kt.find((o) => /^cptbq$/.test(o.id));
    const pl = pilihanAda(kt);
    cek(!!cp && bentukDatarDari(cp) === "lingkaran" && pl.length === 3 && pl.filter((c) => c.t === bentukDatarDari(cp)).length === 1, "cetak terapan: cap kaleng lingkaran dan tepat satu pilihan yang benar");
    const kb = di("luar-cetak-terapan", 3);
    sama(dipilih(kb), [bentukDatarDari(kb.find((o) => /^cptbq$/.test(o.id)))], "cetak terapan: pilihan yang disorot sama dengan bentuk cap yang digambar");
  }

  // Tas Misteri: petunjuk dan bayangan menyaring lima bangun ruang; yang disebut tersisa dan yang muncul dari tas dihitung ulang.
  for (const id of ["luar-tas", "luar-tas-terapan", "latihan-dua"]) {
    const a = adegan(M_VIDEO, id) ?? adegan(U, id);
    const syarat = (teks0) => {
      if (/semua permukaan datar/.test(teks0)) return (j) => AJARAN[j].lengkung === 0;
      if (/bayangan segi empat sama/.test(teks0)) return (j) => SILUET[j] === "segi empat sama";
      if (/satu ujung runcing|ujungnya runcing/.test(teks0)) return (j) => AJARAN[j].titik === 1;
      if (/alas(nya)? lingkaran/.test(teks0)) return (j) => AJARAN[j].datar > 0 && AJARAN[j].lengkung > 0;
      return null;
    };
    const klu = [];
    let bayang = null;
    a.ketukan.forEach((kt, i) => {
      const objs = akhirAdegan(a, i);
      const nm = `${id}#${i + 1}`;
      for (const pid of ["pt0-t0", "pt1-t0"]) {
        const t = isiTeks(objs, pid);
        if (t && !klu.includes(t)) {
          cek(!!syarat(t), `${nm}: petunjuk "${t}" dikenal uji`);
          klu.push(t);
          stat.benda += 1;
        }
      }
      const by = objs.find((o) => /^by(kb|bl|tb|kr|bo)/.test(o.id));
      if (by) bayang = bentukDatarDari(by);
      const aturan = klu.map(syarat).filter(Boolean);
      const lolos = JENIS.filter((j) => aturan.every((f2) => f2(j)) && (bayang === null || SILUET[j] === bayang));
      const gagal = JENIS.filter((j) => !aturan.every((f2) => f2(j)));
      const bk = isiTeks(objs, "bk0");
      if (bk) {
        stat.benda += 1;
        if (/^bukan: /.test(bk)) sama(bk.slice(7).split(", ").sort(), [...gagal].sort(), `${nm}: daftar "bukan" sama dengan bangun ruang yang gagal petunjuk`);
        else if (/^cocok: /.test(bk)) sama([bk.slice(7)], lolos, `${nm}: "cocok" sama dengan satu-satunya bangun ruang yang lolos petunjuk dan bayangan`);
      }
      // Bangun ruang yang tampil dari tas dan kartu yang disorot sama dengan satu-satunya yang lolos.
      const muncul = [...bacaRuang(objs).values()];
      if (id !== "latihan-dua" && i === a.ketukan.length - 1) {
        sama(muncul.map((g) => g.jenis), lolos, `${nm}: bangun ruang yang keluar dari tas sama dengan satu-satunya yang lolos (${lolos.join()})`);
        sama(lolos.length, 1, `${nm}: tinggal satu kemungkinan`);
      }
      const pl = pilihanAda(objs);
      if (pl.length && dipilih(objs).length) {
        const cocokPil = pl.map((c) => c.t).filter((t) => aturan.every((f2) => f2(t)) && (bayang === null || SILUET[t] === bayang));
        sama(dipilih(objs), cocokPil, `${nm}: kartu yang disorot adalah satu-satunya nama yang lolos semua petunjuk`);
        cek(cocokPil.length === 1, `${nm}: tepat satu pilihan yang benar (${cocokPil.join()})`);
        cek(pl.every((c) => JENIS.includes(c.t)), `${nm}: pilihan berupa nama bangun ruang`);
      }
    });
  }

  // Latihan satu: pilihan sejajar dengan bangun ruangnya; yang disorot satu-satunya yang menggelinding (lengkung).
  {
    const objs = di("latihan-satu", 2);
    const grup = [...bacaRuang(objs).values()];
    const pl = pilihanAda(objs);
    sama(pl.map((c) => c.t), ["bola", "kubus", "balok"], "latihan satu: tiga pilihan bola, kubus, balok");
    for (const c of pl) {
      stat.benda += 1;
      const g = grup.filter((q) => q.jenis === c.t);
      cek(g.length === 1 && Math.abs(pusatX(g[0]) - c.x) < 3, `latihan satu: kartu ${c.t} tepat di bawah ${c.t}`);
    }
    const menggelinding = pl.map((c) => c.t).filter((j) => AJARAN[j].lengkung > 0);
    sama([menggelinding, dipilih(objs)], [["bola"], ["bola"]], "latihan satu: satu-satunya yang menggelinding (permukaan lengkung) adalah bola dan itu yang disorot");
    const kt = di("latihan-satu", 3);
    cek(kt.filter((o) => o.isi === "❌").length === 2 && kt.filter((o) => o.isi === "✅").length === 1, "latihan satu: satu centang (bola) dan dua silang (kubus, balok)");
  }

  // Latihan tiga: banyak rusuk balok dihitung dari gambar; pilihan yang disorot sama.
  {
    const kt1 = di("latihan-tiga", 1);
    const kt3 = di("latihan-tiga", 3);
    const g = bacaRuang(kt1).get("bla");
    const jumlah = rusukBaca(kt1, "bla").length;
    sama([g.jenis, jumlah, AJARAN.balok.rusuk], ["balok", 12, 12], "latihan tiga: balok dengan dua belas rusuk digambar lengkap");
    const pl = pilihanAda(kt3);
    sama(pl.map((c) => c.t), ["6", "12", "8"], "latihan tiga: pilihan 6, 12, 8");
    sama(dipilih(kt3), [String(jumlah)], "latihan tiga: pilihan yang disorot sama dengan banyak rusuk yang digambar");
    cek(pl.filter((c) => c.t === String(jumlah)).length === 1, "latihan tiga: tepat satu pilihan benar");
  }

  // Bangun datar di adegan datar: segitiga 3, segi empat 4.
  {
    const o = di("bangun-datar", 1);
    sama([pairsJalur(ketemu(o, "dta")).length, pairsJalur(ketemu(o, "dtb")).length, ketemu(o, "dtc").t, o.filter((q) => /^dta p\d$|^dtap\d$/.test(q.id)).length, o.filter((q) => /^dtbp\d$/.test(q.id)).length, isiTeks(o, "dta-ln"), isiTeks(o, "dtb-ln")], [3, 4, "bulat", 3, 4, "3 sisi", "4 sisi"], "datar: segitiga 3 pojok, segi empat 4 pojok, lingkaran tanpa pojok");
    const kal = adegan(M_VIDEO, "bangun-datar").ketukan[1].suara;
    const n = ` ${kalimatGeo(kal)} `;
    sama([...n.matchAll(/(segitiga|segiempat) dibatasi #(\d+)# sisi/g)].map((m) => [m[1], Number(m[2])]), [["segitiga", 3], ["segiempat", 4]], "datar: suara menyebut tiga sisi segitiga dan empat sisi segi empat");
    cek(kal.includes("garis lengkung"), "datar: lingkaran dibatasi garis lengkung");
  }

  // Cari bangun ruang: lima benda dan nama bentuknya tepat di bawahnya.
  {
    const akh = di("cari-ruang", 3);
    const grup = [...bacaRuang(akh).values()];
    sama(grup.map((g) => g.jenis).sort(), [...JENIS].sort(), "cari ruang: lima bangun ruang berbeda");
    sama([0, 1, 2, 3, 4].map((i) => isiTeks(akh, `jn${i}`)), JENIS, "cari ruang: nama bentuk untuk lima benda");
    sama([0, 1, 2, 3, 4].map((i) => isiTeks(akh, `bn${i}`)), ["dadu", "kardus", "kaleng", "topi", "kelereng"], "cari ruang: lima nama benda");
  }

  // Ciri Bangun Ruang konsep dan terapan: kubus dan balok masing-masing dengan 6 chip, 12 rusuk, 8 titik sudut.
  for (const [id, key, jenis] of [["luar-ciri", "kba", "kubus"], ["luar-ciri-terapan", "bla", "balok"]]) {
    const a = adegan(U, id);
    const akh = akhirAdegan(a);
    const g = bacaRuang(akh).get(key);
    sama([g.jenis, chipBaca(akh, key).length, rusukBaca(akh, key).length, titikBaca(akh, key).length], [jenis, AJARAN[jenis].datar, AJARAN[jenis].rusuk, AJARAN[jenis].titik], `${id}: ${jenis} dengan 6 chip sisi, 12 rusuk, 8 titik sudut (dihitung dari gambar)`);
    sama([isiTeks(akh, "cs"), isiTeks(akh, "cr"), isiTeks(akh, "ct")], [`${AJARAN[jenis].datar} sisi`, `${AJARAN[jenis].rusuk} rusuk`, `${AJARAN[jenis].titik} titik sudut`], `${id}: ringkasan sisi, rusuk, titik sudut`);
  }

  // Rusuk dan titik sudut kubus (materi): dihitung satu per satu sampai 12 dan 8.
  {
    const a = adegan(M_VIDEO, "kubus-rusuk");
    const r = akhirAdegan(a, 1);
    sama([rusukBaca(r, "kba").length, labelAngka(r, "kbar").map((o) => o.isi)], [12, ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]], "kubus rusuk: dua belas rusuk dihitung satu per satu");
    const t = akhirAdegan(a, 4);
    sama([titikBaca(t, "kba").length, labelAngka(t, "kbat").map((o) => o.isi)], [8, ["1", "2", "3", "4", "5", "6", "7", "8"]], "kubus rusuk: delapan titik sudut dihitung satu per satu");
    const tampak = rusukBaca(r, "kba").filter((e) => !e.putus).length;
    sama([tampak, rusukBaca(r, "kba").filter((e) => e.putus).length], [9, 3], "kubus rusuk: sembilan rusuk tampak dan tiga tersembunyi (putus-putus)");
  }

  // Kerucut: satu puncak di ujung runcing; tabung dan kerucut punya chip yang sesuai.
  {
    const akh = di("kerucut", 3);
    const g = bacaRuang(akh).get("kra");
    const pu = ketemu(akh, "kra-pu");
    cek(pu && dekat(pu.x, g.b.bd.x) && dekat(pu.y, g.b.bd.y), "kerucut: titik puncak tepat di ujung runcing kerucut");
    cek(AJARAN.kerucut.titik === 1 && akh.filter((o) => /^kra-pu$/.test(o.id)).length === 1, "kerucut: tepat satu titik puncak");
  }
}


/* ------------------------------ Aturan pemilik ------------------------------ */
{
  // Aturan pemilik: aplikasi belajar mandiri; tanpa instruksi kelompok, teman, kelas, buku, benda nyata.
  {
    const MANDIRI = /kerja kelompok|berkelompok|secara berkelompok|diskusi kelompok|sekelompok|kelompokmu|kelompok belajar|bersama kelompok|tanya teman|survei|karet gelang|uang tabungan|\bpaman\b|\btika\b|\blili\b|\bteman\w*|\bkawan\w*|sekawan|depan kelas|bersama kelas|seluruh kelas|\bkelas\b|berpasangan dengan (teman|kawan)|bekerja berpasangan|secara berpasangan|bermain bersama|bertanya kepada|buat ceritamu|buku|menulis di|menuliskan di|tulis di|tuliskan di|menggambar|gambarlah|gambar sendiri|\bbawa(lah)?\b|membawa|dibawa|\bkertas\b|\bpensil\b|\bpulpen\b|\bspidol\b|ambil (benda|pensil|kelereng|bola|sedotan|balon|permen)|tangan (kiri|kanan)|\bjari\b|menyuruh|suruh|jengkal|telapak|\bdepa\b|penggaris|\bkoin\b|di sekitar|di rumah|di kelas|centimeter|\bmeter\b|kakimu|tanganmu|badanmu|\braba\w*|\bmeraba|\btubuh|\blengan|lingkari|coret|guru kelas|orang tua|\bayah\b|\bibu guru|bapak guru|\bloker\b|bagikan|membagikan|membagi|permen sungguhan|permen asli|stoples asli|balok sungguhan|\buang\b/i;
    for (const v of VIDEO) {
      for (const a of v.adegan) {
        const semua = [a.judul, a.sumber];
        a.ketukan.forEach((kt, i) => {
          semua.push(kt.suara);
          semua.push(...L.teksTerlihat(L.keadaanStory(a, i, 9999)));
        });
        const kena = semua.filter((t) => MANDIRI.test(t));
        cek(kena.length === 0, `${v.id}/${a.id}: narasi mandiri dan digital, tanpa kelompok, teman, kelas, buku, kertas, pensil, loker, atau benda nyata (${kena.slice(0, 2).join(" | ")})`);
      }
    }
  }
}

/* ------------------------------ Sapaan dan peta susun ------------------------------ */
{
  const sap = adegan(M_VIDEO, "sapaan");
  const DAFTAR = ["Bangun datar dan ruang", "Permukaan datar dan lengkung", "Lima bangun ruang"];
  cek(/Halo anak-anak/.test(sap.ketukan[0].suara) && /Bangun datar dan ruang/i.test(L.teksTerlihat(akhirAdegan(sap, 1)).join(" | ")), "sapaan materi: tiga hal yang dipelajari tampil");
  sama(L.teksTerlihat(akhirAdegan(sap, 1)).filter((t) => DAFTAR.includes(t)), DAFTAR, "sapaan materi: daftar tiga hal");
  cek(!/\d/.test(sap.ketukan[1].suara) && !/\d/.test(DAFTAR.join(" ")), "sapaan materi: tanpa angka");
  const sapLuar = adegan(U, "sapaan");
  cek(/cara lain/i.test(L.teksTerlihat(akhirAdegan(sapLuar, 1)).join(" | ")) && /metode-luar|Metode luar/.test(sapLuar.sumber), "sapaan metode luar: pengumuman cara lain");
  const sumberRingkas = existsSync(new URL("../src/data/kelas2-bab3-ringkas.json", import.meta.url)) ? JSON.parse(readFileSync(new URL("../src/data/kelas2-bab3-ringkas.json", import.meta.url), "utf8")).subBab?.C : null;
  const sementara = new URL("../.tmp-k2b3s/C.json", import.meta.url);
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
    cek(/datar|ruang/i.test(A.petaSusun.pusat.judul), "peta susun: pusat tentang bangun datar atau bangun ruang");
    const T = A.tabelSusun;
    cek(T.baris.length >= 3 && T.baris.length <= 5 && T.kolom.length >= 3 && T.kolom.length <= 4, "tabel susun: 3 sampai 5 baris dan 3 sampai 4 kolom");
    cek(T.baris.every((b) => b.sel.every((s) => s.length <= 26 && (s.match(/\d+/g) ?? []).length <= 1)), "tabel susun: sel <= 26 huruf dan paling banyak satu angka per sel");
    cek(T.baris.every((b) => b.label.split(/\s+/).every((w) => w.length <= 8)), "tabel susun: kata terpanjang kolom label <= 8 huruf");
    cek(!/\d/.test(T.suara) && !/\d/.test(T.petunjuk), "tabel susun: suara dan petunjuk tanpa digit");
    // Isi tabel dihitung ulang dari data bangun ruang dan dari adegan tabel materi: permukaan datar, permukaan lengkung, menggelinding (lengkung berarti menggelinding).
    sama(T.kolom, ["Datar", "Lengkung", "Gelinding"], "tabel susun: kolom datar, lengkung, gelinding");
    sama(T.baris.map((b) => b.label), ["Kubus", "Balok", "Tabung", "Kerucut", "Bola"], "tabel susun: baris lima bangun ruang");
    const akhTabel = di("tabel-ruang", 4);
    T.baris.forEach((b, i) => {
      const j = AJARAN[b.label.toLowerCase()];
      stat.benda += 1;
      cek(!!j && b.sel[0] === String(j.datar) && b.sel[1] === String(j.lengkung) && b.sel[2] === (j.lengkung > 0 ? "ya" : "tidak"), `tabel susun: baris ${b.label} (datar ${b.sel[0]}, lengkung ${b.sel[1]}, gelinding ${b.sel[2]}) dihitung ulang dari data`);
      cek(isiTeks(akhTabel, `tr${i}-d`) === b.sel[0] && isiTeks(akhTabel, `tr${i}-l`) === b.sel[1], `tabel susun: baris ${b.label} sama dengan tabel di adegan materi`);
    });
    cek(T.baris.every((b) => b.sel.every((s) => s.length <= 8)), "tabel susun: sel pendek supaya margin teks >= 5 px di 405 px");
    const KATA_LARANG = /buku|halaman|(?<!kata )kunci|kerja kelompok|berkelompok|\bteman|kawan|kelas\b|kertas|pensil|\bbawa\b|menggambar|menulis di|depan kelas|luas|keliling|di rumah|survei|karet gelang|uang tabungan|di sekitar|\bpaman\b|\btika\b|\blili\b|loker|ibu guru/i;
    cek(!KATA_LARANG.test(JSON.stringify({ p: A.petaSusun, t: A.tabelSusun })), "peta dan tabel susun: tanpa kata terlarang dan tanpa kelompok, teman, kelas, buku, kertas, pensil");
    cek(peta.every((s) => ![...s.teks, ...(s.ikon ?? "")].some((c) => c.codePointAt(0) > 0x1fa95)), "peta susun: emoji paling tinggi Emoji 12");
  } else cek(false, "peta dan tabel susun: .tmp-k2b3s/C.json atau kelas2-bab3-ringkas.json subBab.C.petaSusun ada");
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k2b3C-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k2b3C-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k2b3C sendiri (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d), `${v.id}/${a.id}: emoji gambar paling tinggi Emoji 12`);
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k2b3c.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|naskah-k1b/.test(pembungkus) && /VIDEO_MATERI_K2B3C/.test(pembungkus) && /VIDEO_LUAR_K2B3C/.test(pembungkus) && /export function VideoK2B3C/.test(pembungkus) && /daftar-video-cerita/.test(pembungkus), "video-k2b3c.tsx: dua video dari mesin Story, tanpa naskah lama");
  cek(!/\r/.test(pembungkus), "video-k2b3c.tsx: akhir baris LF");
  const sendiri = readFileSync(new URL("uji-story-k2b3C.mjs", import.meta.url), "utf8");
  cek(!/\r/.test(sendiri), "uji-story-k2b3C.mjs: akhir baris LF");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit diputar)`);
}
console.log(`Pemeriksaan: ${stat.hitung} deret hitungan, ${jumlahNama} nama bilangan tampak sebagai angka, ${stat.kalimatGeo} klaim suara geometri, ${stat.ruang} pembacaan bangun ruang, ${stat.rusuk} rusuk, ${stat.benda} pemeriksaan bangun datar, cap, bayangan, tabel, label, dan pilihan`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
