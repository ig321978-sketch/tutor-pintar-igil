// Uji Story Kelas 2 Bab 1 Sub-Bab C (Membandingkan Dua Bilangan atau Lebih): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Video diputar bergaya guru: suara, teks terlihat, sumber, judul adegan, dan subjudul tanpa penyebutan buku (kata terlarang diperiksa pada adegan yang diputar).
// Memeriksa: pemicu kata, suara tanpa digit, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas, teks bertumpuk, pemisahan materi dan metode luar (nama metode hanya Indonesia),
// hanya bilangan sampai lima puluh (tanpa kali, bagi, tambah, kurang, bersusun), hitungan satu per satu (angka berurutan, dekat bendanya, sama dengan bilangan yang diucapkan),
// nama bilangan sepuluh sampai lima puluh yang diucapkan tampak sebagai angka, dan data di layar dihitung ulang dari gambar:
//   permen per kelompok (sepuluh-sepuluh), blok bilangan (batang puluhan dan kubus satuan: n = 10p + s), tabel nilai tempat (angka = 10 x puluhan + satuan),
//   garis bilangan (angka berurutan, penanda pada tandanya, loncatan: awal, akhir, banyak langkah), tanda perbandingan yang tampak (benar menurut puluhan dulu lalu satuan),
//   tukar sepuluh satuan = satu puluhan, urutan kartu, pasangan batang dan kubus, pilihan jawaban;
// setiap kalimat perbandingan di suara (lebih besar, lebih kecil, lebih banyak, lebih sedikit, sama dengan, n puluhan dan s satuan, tukar, loncatan, urutan) dihitung ulang,
// aturan pemilik (belajar mandiri digital: tanpa kerja kelompok, survei teman, buku, menulis atau menggambar di buku, membawa benda nyata),
// emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k2b1C.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k2b1C-video.ts");
const U1 = await import("../src/components/modul/story/k2b1C-luar-1.ts");
const B = await import("../src/components/modul/story/k2b1C-bantu.ts");

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
const VIDEO = [V.VIDEO_MATERI_K2B1C, V.VIDEO_LUAR_K2B1C];
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
const M_VIDEO = V.VIDEO_MATERI_K2B1C;
const U = V.VIDEO_LUAR_K2B1C;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const NAMA_LUAR = /Garis Bilangan|Pasangkan Balok|Mulut Buaya|metode luar|metode dari luar/i;
const NAMA_INGGRIS = /Number Line|Place Value|Base Ten|Alligator|Greater Than|Less Than|Compare|Pairing|Ten Frame|Estimation|Benchmark/i;
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M_VIDEO);
  const luar = teksVideo(U);
  cek(!NAMA_LUAR.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of U1.NAMA_METODE_ID) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE_ID, ["Garis Bilangan", "Pasangkan Balok", "Mulut Buaya"], "nama Indonesia metode luar");
  cek(!NAMA_INGGRIS.test(materi) && !NAMA_INGGRIS.test(luar), "nama metode hanya bahasa Indonesia (tanpa nama ganda Inggris)");
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
      cek(!/Uji Kompetensi|Pengayaan|Ayo Berlatih|Ayo Berdiskusi|Ayo Berefleksi|Ayo Mengingat|Ayo Berkomunikasi|Ayo Berpikir|Ayo Berkarya|Ayo Bermain|Ayo Mencoba|Coba Pikirkan|soal \d|Soal \d|Eksplorasi|Refleksi/.test(semua.join(" | ")), `${v.id}/${a.id}: latihan disajikan sebagai Latihan, tanpa istilah buku`);
      // Tokoh hanya enam tokoh tetap (Malosi, Kira, Upe, Wei, Halim, Igil): tanpa nama lain dari data sumber.
      cek(!/\b(Tika|Lili|Dodi|Nia|Paman|Ibu|Ayah|Bapak|Budi|Ani|Doni|Sinta|Dewi|Rudi|Nina|Andi|Siti)\b/.test(semua.join(" | ")), `${v.id}/${a.id}: hanya enam tokoh tetap`);
    }
  }
  cek(M_VIDEO.subjudul === "Materi kurikulum" && U.subjudul === "Tiga metode luar", "subjudul video: Materi kurikulum dan Tiga metode luar");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 46), "video materi: label sumber berbentuk Materi: ... dan pendek");
  cek(U.adegan.every((a) => /Metode luar|Ringkasan/i.test(a.sumber) && a.sumber.length <= 46), "video metode luar: label sumber metode luar atau ringkasan, pendek");
  cek(M_VIDEO.id === "k2b1C-materi" && U.id === "k2b1C-luar", "id video k2b1C-materi dan k2b1C-luar");
  cek(U.judul.endsWith(": Metode dari Luar") && !/menurut/i.test(M_VIDEO.judul), "judul video: materi tanpa 'menurut', luar berakhir ': Metode dari Luar'");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,stoples-kira,hitung-permen,tebakan-dekat,tebak-bandingkan,dua-bilangan,tabel-nilai-tempat,puluhan-dulu,puluhan-sama,tukar-puluhan,jangan-satuan,tanda-banding,urutkan-kartu,latihan-satu,latihan-dua,latihan-tiga,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-garis,luar-garis-terapan,luar-balok,luar-balok-terapan,luar-buaya,luar-buaya-terapan,luar-ringkas", "urutan adegan metode luar");
  cek(M_VIDEO.adegan[0].id === "sapaan" && U.adegan[0].id === "sapaan", "tiap video dibuka adegan sapaan");
  cek(M_VIDEO.adegan.filter((a) => /^latihan-/.test(a.id)).length === 3 && M_VIDEO.adegan[M_VIDEO.adegan.length - 1].id === "penutup", "video materi: Latihan 1 sampai 3 lalu penutup");
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-garis", "luar-garis-terapan", "luar-balok", "luar-balok-terapan", "luar-buaya", "luar-buaya-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(U.adegan[1].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  for (const kata of ["Latihan", "Igil", "Malosi", "Halim", "Kira", "Wei", "Upe", "permen", "stoples", "tebakan", "menebak", "menghitung", "jalur bilangan", "langkah", "tabel nilai tempat", "puluhan", "satuan", "lebih besar", "lebih kecil", "sama dengan", "tanda", "tukar", "urutkan", "paling kecil", "paling besar", "sepuluh", "sama-sama"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  // Hanya bilangan sampai lima puluh: tanpa kali, bagi, tambah, kurang, bilangan lebih dari lima puluh, bersusun, satuan baku, atau rumus.
  const BOCOR = /dikali|perkalian|pembagian|dibagi|ditambah|dikurangi|\bratus\b|\bribu\b|\b(enam|tujuh|delapan|sembilan) puluh\b|lima puluh (satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan)|\bluas\b|keliling|rumus|volume|sentimeter|centimeter|\bcm\b|\bmeter\b|penggaris|bersusun|meminjam|pinjam|menyimpan|simpan|×|÷|−/i;
  for (const v of [M_VIDEO, U]) {
    for (const a of v.adegan) cek(!BOCOR.test(teksAdegan(a)), `${v.id}/${a.id}: hanya bilangan sampai lima puluh (tanpa kali, bagi, tambah, kurang, bersusun, satuan baku, bilangan lebih dari lima puluh, rumus)`);
    for (const a of v.adegan) for (const i of a.ketukan.keys()) for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) for (const b of bilanganDari(t)) cek(Number(b) <= 50, `${v.id}/${a.id}#${i + 1}: angka di gambar paling besar lima puluh ("${t}")`);
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

/* ------------------------------ Pembaca gambar: benda, blok, tabel, garis bilangan ------------------------------ */
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
const pusatObj = (b) => (b.t === "kotak" ? { x: b.x + b.w / 2, y: b.y + b.h / 2 } : b.t === "garis" ? { x: b.x + (b.x2 ?? 0) / 2, y: b.y + (b.y2 ?? 0) / 2 } : { x: b.x, y: b.y });
const di = (id, ke) => {
  const a = adegan(M_VIDEO, id) ?? adegan(U, id);
  return akhirAdegan(a, ke);
};
const stat = { hitung: 0, benda: 0, kalimat: 0 };
const labelAngka = (objs, p) => objs.filter((o) => o.t === "teks" && new RegExp(`^${p}n\\d+$`).test(o.id) && /^\d+$/.test(o.isi ?? "")).sort((m, n) => Number(m.id.slice(p.length + 1)) - Number(n.id.slice(p.length + 1)));

/** Kelompok benda `e{huruf}` (permen): benda, nama, banyaknya. */
const bacaKelompok = (objs) => {
  const grup = new Map();
  const g = (key) => {
    if (!grup.has(key)) grup.set(key, { key, items: [], nm: null, ln: null });
    return grup.get(key);
  };
  for (const o of objs) {
    let m;
    if (o.t === "teks" && (m = /^e([a-z])(\d+)$/.exec(o.id))) g(m[1]).items.push({ i: Number(m[2]), o });
    else if (o.t === "teks" && (m = /^e([a-z])-nm$/.exec(o.id))) g(m[1]).nm = o;
    else if (o.t === "teks" && (m = /^e([a-z])-ln$/.exec(o.id))) g(m[1]).ln = o;
  }
  for (const x of grup.values()) x.items.sort((p, q) => p.i - q.i);
  return [...grup.values()];
};
/** Blok bilangan `b{kunci}`: batang puluhan, kubus satuan, nama, angka. */
const bacaBlok = (objs) => {
  const grup = new Map();
  const g = (key) => {
    if (!grup.has(key)) grup.set(key, { key, bars: [], cubes: [], nm: null, ln: null });
    return grup.get(key);
  };
  for (const o of objs) {
    let m;
    if (o.t === "kotak" && (m = /^b([a-z])-p(\d+)$/.exec(o.id))) g(m[1]).bars.push({ i: Number(m[2]), o });
    else if (o.t === "kotak" && (m = /^b([a-z])-s(\d+)$/.exec(o.id))) g(m[1]).cubes.push({ i: Number(m[2]), o });
    else if (o.t === "teks" && (m = /^b([a-z])-nm$/.exec(o.id))) g(m[1]).nm = o;
    else if (o.t === "teks" && (m = /^b([a-z])-ln$/.exec(o.id))) g(m[1]).ln = o;
  }
  for (const x of grup.values()) {
    x.bars.sort((p, q) => p.i - q.i);
    x.cubes.sort((p, q) => p.i - q.i);
    x.p = x.bars.length;
    x.s = x.cubes.length;
    x.nilai = 10 * x.p + x.s;
  }
  return [...grup.values()];
};
/** Baris tabel nilai tempat `nt{huruf}`: angka, puluhan, satuan. */
const bacaTabelNT = (objs) => {
  const grup = new Map();
  for (const o of objs) {
    const m = /^nt([a-z])-(n|p|s)$/.exec(o.id);
    if (o.t === "teks" && m) {
      if (!grup.has(m[1])) grup.set(m[1], { key: m[1] });
      grup.get(m[1])[m[2]] = o;
    }
  }
  return [...grup.values()].map((r) => ({ key: r.key, n: r.n ? Number(r.n.isi) : null, p: r.p ? Number(r.p.isi) : null, s: r.s ? Number(r.s.isi) : null, o: r }));
};
/** Garis bilangan `gb{kunci}`: tanda (x tiap bilangan), penanda, loncatan. */
const bacaGaris = (objs) => {
  const grup = new Map();
  const g = (key) => {
    if (!grup.has(key)) grup.set(key, { key, tanda: new Map(), label: new Map(), penanda: [], hop: [], hopNo: new Map() });
    return grup.get(key);
  };
  for (const o of objs) {
    let m;
    if (o.t === "garis" && (m = /^gb([a-z])-k(\d+)$/.exec(o.id))) g(m[1]).tanda.set(Number(m[2]), o.x);
    else if (o.t === "teks" && (m = /^gb([a-z])-t(\d+)$/.exec(o.id))) g(m[1]).label.set(Number(m[2]), { x: o.x, isi: o.isi });
    else if (o.t === "bulat" && (m = /^gb([a-z])-m(\d+)$/.exec(o.id))) g(m[1]).penanda.push({ n: Number(m[2]), o });
    else if (o.t === "panah" && (m = /^gb([a-z])-h(\d+)$/.exec(o.id))) g(m[1]).hop.push({ i: Number(m[2]), o });
    else if (o.t === "teks" && (m = /^gb([a-z])-hn(\d+)$/.exec(o.id))) g(m[1]).hopNo.set(Number(m[2]), o.isi);
  }
  for (const x of grup.values()) x.hop.sort((p, q) => p.i - q.i);
  return [...grup.values()];
};
const nilaiDiX = (gr, x) => {
  for (const [n, tx] of gr.tanda) if (Math.abs(tx - x) < 0.01) return n;
  return null;
};
/** Ringkasan loncatan sebuah garis: awal, akhir, banyak, dan keabsahan rantai. */
const ringkasHop = (gr) => {
  if (gr.hop.length === 0) return null;
  const awal = nilaiDiX(gr, gr.hop[0].o.x);
  let sekarang = awal;
  let arah = 0;
  let sah = awal !== null;
  gr.hop.forEach((h, q) => {
    if (h.i !== q) sah = false;
    const dari = nilaiDiX(gr, h.o.x);
    const ke = nilaiDiX(gr, h.o.x + h.o.x2);
    if (dari !== sekarang || ke === null || Math.abs(ke - dari) !== 1 || h.o.y2 !== 0) sah = false;
    else {
      const a = ke - dari;
      if (arah === 0) arah = a;
      if (a !== arah) sah = false;
    }
    if (gr.hopNo.get(h.i) !== String(q + 1)) sah = false;
    sekarang = ke;
  });
  return { awal, akhir: sekarang, n: gr.hop.length, arah, sah };
};
/** Rangkaian perbandingan yang tampak, mis. "32 > 26" atau "12 < 21 < 25 < 35". */
const ekspresi = (objs) => objs.filter((o) => o.t === "teks" && /^\d+( [<>=] \d+)+$/.test(o.isi ?? ""));
const benarEkspresi = (s) => {
  const t = s.split(" ");
  for (let q = 0; q + 2 < t.length + 0; q += 2) {
    const a = Number(t[q]);
    const b = Number(t[q + 2]);
    if (t[q + 1] === "<" ? !(a < b) : t[q + 1] === ">" ? !(a > b) : a !== b) return false;
  }
  return true;
};
const NAMA_TOKOH = "kira|upe|wei|halim|igil|malosi";

{
  // 1) Deret angka hitungan `${p}n{i}`: nilai berurutan, dekat bendanya, dan yang baru muncul sama banyak dengan bilangan berurutan yang diucapkan.
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

  // 2) Tanpa kalimat hitung (tambah, kurang, kali, bagi) dan tanpa lambang hitung di gambar; yang dibandingkan hanya bilangan.
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((kt, i) => {
        const nm = `${v.id}/${a.id}#${i + 1}`;
        cek(!/ditambah|dikurangi|dikali|dibagi/i.test(kt.suara), `${nm}: suara tanpa kalimat hitung (tambah, kurang, kali, bagi)`);
        cek(!/\b(enam|tujuh|delapan|sembilan) puluh\b/i.test(kt.suara) && semuaBil(kt.suara).every((r) => r.v <= 50), `${nm}: suara tanpa bilangan lebih dari lima puluh`);
        for (const t of L.teksTerlihat(akhirAdegan(a, i))) cek(!/\d\s*[+\-−×÷]\s*\d/.test(t), `${nm} gambar: "${t}" tanpa lambang hitung`);
      });
    }
  }

  // 3) Data di layar dihitung ulang dari gambar pada tiap ketukan.
  const NB = NAMA.slice(1).sort((p, q) => q.length - p.length).join("|");
  void NB;
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((kt, i) => {
        const objs = akhirAdegan(a, i);
        const nm = `${v.id}/${a.id}#${i + 1}`;
        const kel = bacaKelompok(objs);
        const bl = bacaBlok(objs);
        const nt = bacaTabelNT(objs);
        const gr = bacaGaris(objs);

        // Benda (permen).
        let totalItem = 0;
        for (const g of kel) {
          if (g.items.length) {
            stat.benda += 1;
            const e0 = g.items[0].o;
            cek(g.items.every((s, q) => s.i === q), `${nm} e${g.key}: nomor benda berurutan dari nol`);
            cek(g.items.every((s) => s.o.isi === e0.isi && s.o.u === e0.u), `${nm} e${g.key}: satu jenis benda`);
            cek(g.items.length <= 50, `${nm} e${g.key}: banyak benda paling banyak lima puluh (${g.items.length})`);
            totalItem += g.items.length;
            let rapat = true;
            for (let p = 0; p < g.items.length; p += 1) for (let q = p + 1; q < g.items.length; q += 1) if (Math.hypot(g.items[p].o.x - g.items[q].o.x, g.items[p].o.y - g.items[q].o.y) < 17) rapat = false;
            cek(rapat, `${nm} e${g.key}: benda tidak saling menimpa`);
          }
          if (g.ln && g.items.length) cek(Number(g.ln.isi) === g.items.length, `${nm} e${g.key}: angka banyaknya ${g.ln.isi} sama dengan ${g.items.length} benda yang digambar`);
        }
        cek(totalItem <= 50, `${nm}: jumlah benda paling banyak lima puluh (${totalItem})`);

        // Blok bilangan: n = 10p + s.
        for (const b of bl) {
          stat.benda += 1;
          cek(b.bars.every((s, q) => s.i === q) && b.cubes.every((s, q) => s.i === q), `${nm} b${b.key}: nomor batang dan kubus berurutan dari nol`);
          cek(b.p <= 5 && b.s <= 14 && b.nilai <= 50 && b.nilai >= 1, `${nm} b${b.key}: ${b.p} puluhan ${b.s} satuan = ${b.nilai} (paling banyak lima puluh)`);
          if (b.ln) cek(/^\d+$/.test(b.ln.isi) && Number(b.ln.isi) === b.nilai, `${nm} b${b.key}: angka ${b.ln.isi} sama dengan 10 x ${b.p} + ${b.s} = ${b.nilai}`);
          if (b.p >= 1) {
            const x0 = b.bars[0].o.x;
            const y0 = b.bars[0].o.y;
            cek(b.bars.every((s) => s.o.x === x0 + 13 * s.i && s.o.y === y0 && s.o.w === 10 && s.o.h === 40), `${nm} b${b.key}: batang puluhan sama besar dan berjajar rata`);
            cek(b.cubes.every((s) => s.o.x === x0 + 13 * b.p + 6 + (s.i % 5) * 11 && s.o.y === y0 + Math.floor(s.i / 5) * 11 && s.o.w === 9), `${nm} b${b.key}: kubus satuan tersusun lima kolom di sebelah batang`);
          }
        }

        // Tabel nilai tempat: angka = 10 x puluhan + satuan.
        for (const r of nt) {
          stat.benda += 1;
          if (r.p !== null) cek(r.p >= 0 && r.p <= 5, `${nm} nt${r.key}: puluhan ${r.p} paling banyak lima`);
          if (r.s !== null) cek(r.s >= 0 && r.s <= 14, `${nm} nt${r.key}: satuan ${r.s} paling banyak empat belas`);
          if (r.n !== null && r.p !== null && r.s !== null) cek(r.n === 10 * r.p + r.s, `${nm} nt${r.key}: angka ${r.n} sama dengan 10 x ${r.p} + ${r.s}`);
        }

        // Garis bilangan: tanda berurutan, label sama dengan tanda, penanda pada tandanya, loncatan sah.
        for (const g of gr) {
          stat.benda += 1;
          const ns = [...g.tanda.keys()].sort((p, q) => p - q);
          if (ns.length) {
            cek(ns.every((n, q) => n === ns[0] + q), `${nm} gb${g.key}: tanda berurutan satu-satu`);
            const jarak = ns.slice(1).map((n, q) => g.tanda.get(n) - g.tanda.get(ns[q]));
            cek(jarak.every((d) => Math.abs(d - jarak[0]) < 0.01 && d > 0), `${nm} gb${g.key}: jarak antartanda sama`);
            cek(ns.every((n) => g.label.get(n)?.isi === String(n) && Math.abs(g.label.get(n).x - g.tanda.get(n)) < 0.01), `${nm} gb${g.key}: angka di bawah tanda sama dengan nilainya`);
            cek(ns[0] >= 0 && ns[ns.length - 1] <= 50, `${nm} gb${g.key}: garis bilangan 0 sampai 50`);
          }
          for (const m of g.penanda) cek(g.tanda.has(m.n) && Math.abs(g.tanda.get(m.n) - m.o.x) < 0.01, `${nm} gb${g.key}: penanda ${m.n} tepat pada tandanya`);
          const rh = ringkasHop(g);
          if (rh) cek(rh.sah && rh.n <= 10, `${nm} gb${g.key}: loncatan berurutan satu langkah, searah, angka 1 sampai ${rh.n}`);
        }

        // Rangkaian perbandingan yang tampak benar.
        for (const e of ekspresi(objs)) {
          stat.benda += 1;
          cek(benarEkspresi(e.isi), `${nm}: perbandingan "${e.isi}" benar`);
        }

        // Kalimat perbandingan di suara dihitung ulang.
        const kalimat = kt.suara.split(/(?<=[.!?])\s+/);
        const peta = new Map();
        for (const g of kel) if (g.nm) peta.set(g.nm.isi.toLowerCase(), g.ln ? Number(g.ln.isi) : g.items.length);
        for (const kal of kalimat) {
          let n = ` ${normal(kal)} `;
          const NUM = "#(\\d+)#";
          const ambil = (re, f) => {
            n = n.replace(new RegExp(re, "g"), (...m) => {
              stat.kalimat += 1;
              f(m);
              return " ";
            });
          };
          // Tukar sepuluh satuan menjadi satu puluhan; tukar puluhan dan satuan.
          ambil(`${NUM} puluhan(?: dan)? ${NUM} satuan (?:ditukar )?menjadi ${NUM} puluhan(?: dan)? ${NUM} satuan`, (m) => {
            const [p1, s1, p2, s2] = [m[1], m[2], m[3], m[4]].map(Number);
            cek(10 * p1 + s1 === 10 * p2 + s2 && s2 < 10, `${nm}: tukar ${p1} puluhan ${s1} satuan menjadi ${p2} puluhan ${s2} satuan bernilai sama dan satuan baru kurang dari sepuluh`);
          });
          ambil(`${NUM} satuan (?:ditukar )?menjadi ${NUM} puluhan`, (m) => cek(Number(m[1]) === 10 * Number(m[2]), `${nm}: ${m[1]} satuan ditukar menjadi ${m[2]} puluhan (harus sepuluh satuan = satu puluhan)`));
          ambil(`${NUM} puluhan(?: dan)? ${NUM} satuan sama dengan ${NUM}`, (m) => cek(10 * Number(m[1]) + Number(m[2]) === Number(m[3]), `${nm}: ${m[1]} puluhan ${m[2]} satuan sama dengan ${m[3]}`));
          // Bilangan adalah puluhan dan satuan.
          ambil(`${NUM} adalah ${NUM} puluhan(?: dan ${NUM} satuan)?`, (m) => cek(Number(m[1]) === 10 * Number(m[2]) + Number(m[3] ?? 0), `${nm}: ${m[1]} adalah ${m[2]} puluhan dan ${m[3] ?? 0} satuan`));
          ambil(`${NUM} (?:juga |hanya )?punya ${NUM} puluhan`, (m) => cek(Math.floor(Number(m[1]) / 10) === Number(m[2]), `${nm}: ${m[1]} punya ${m[2]} puluhan (harus ${Math.floor(Number(m[1]) / 10)})`));
          // Tokoh punya sekian puluhan dan satuan, atau sekian permen: cocok dengan blok bernama tokoh itu.
          ambil(`(${NAMA_TOKOH}) punya ${NUM} puluhan(?: dan ${NUM} satuan)?`, (m) => {
            const b = bl.find((x) => x.nm?.isi.toLowerCase() === m[1]);
            cek(!!b && b.p === Number(m[2]) && b.s === Number(m[3] ?? 0), `${nm}: ${m[1]} punya ${m[2]} puluhan ${m[3] ?? 0} satuan cocok dengan blok (${b ? `${b.p} puluhan ${b.s} satuan` : "tidak ada"})`);
          });
          ambil(`(${NAMA_TOKOH}) punya ${NUM} permen`, (m) => {
            const b = bl.find((x) => x.nm?.isi.toLowerCase() === m[1]);
            cek(!!b && b.nilai === Number(m[2]) && (!b.ln || Number(b.ln.isi) === b.nilai), `${nm}: ${m[1]} punya ${m[2]} permen cocok dengan blok (${b ? b.nilai : "tidak ada"})`);
          });
          // Loncatan di garis bilangan.
          ambil(`dari ${NUM} (maju|mundur) ke ${NUM} ada ${NUM} langkah`, (m) => {
            const [a1, b1, k1] = [m[1], m[3], m[4]].map(Number);
            cek(Math.abs(a1 - b1) === k1 && (m[2] === "maju" ? b1 > a1 : b1 < a1), `${nm}: dari ${a1} ${m[2]} ke ${b1} ada ${k1} langkah`);
            const cocok = gr.map(ringkasHop).filter(Boolean).some((h) => h.awal === a1 && h.akhir === b1 && h.n === k1 && h.sah);
            cek(cocok, `${nm}: loncatan di garis bilangan dari ${a1} ke ${b1} sebanyak ${k1} tergambar`);
          });
          // Kiri dan kanan pada garis bilangan.
          ambil(`${NUM} ada di sebelah (kanan|kiri) ${NUM}`, (m) => {
            const [a1, b1] = [Number(m[1]), Number(m[3])];
            const g = gr.find((x) => x.penanda.some((q) => q.n === a1) && x.penanda.some((q) => q.n === b1));
            cek(!!g, `${nm}: penanda ${a1} dan ${b1} tergambar pada satu garis bilangan`);
            if (g) cek(m[2] === "kanan" ? g.tanda.get(a1) > g.tanda.get(b1) : g.tanda.get(a1) < g.tanda.get(b1), `${nm}: ${a1} di sebelah ${m[2]} ${b1} benar pada garis bilangan`);
            cek(m[2] === "kanan" ? a1 > b1 : a1 < b1, `${nm}: ${a1} di sebelah ${m[2]} ${b1} sesuai nilainya`);
          });
          // Lebih besar, lebih kecil, lebih banyak, lebih sedikit.
          ambil(`${NUM}(?: puluhan| satuan| langkah)? lebih (besar|kecil|banyak|sedikit) (?:daripada|dari) ${NUM}`, (m) => {
            const [a1, b1] = [Number(m[1]), Number(m[3])];
            cek(m[2] === "besar" || m[2] === "banyak" ? a1 > b1 : a1 < b1, `${nm}: ${a1} lebih ${m[2]} dari ${b1} benar`);
          });
          ambil(`${NUM}(?: puluhan| satuan| langkah)? sama dengan ${NUM}`, (m) => cek(Number(m[1]) === Number(m[2]), `${nm}: ${m[1]} sama dengan ${m[2]} benar`));
          // Urutan.
          const mu = /dari yang paling (kecil|besar)(.*)$/.exec(n);
          if (mu) {
            const nil = [...mu[2].matchAll(/#(\d+)#/g)].map((q) => Number(q[1]));
            if (nil.length >= 3) {
              stat.kalimat += 1;
              cek(nil.every((x, q) => q === 0 || (mu[1] === "kecil" ? x > nil[q - 1] : x < nil[q - 1])), `${nm}: urutan dari yang paling ${mu[1]} (${nil.join(", ")}) benar`);
            }
          }
          // Ada N benda bernama.
          for (const [nama, banyak] of peta) {
            const mm = new RegExp(`ada ${NUM} ${nama}(?![a-z])`).exec(` ${normal(kal)} `);
            if (mm) {
              stat.kalimat += 1;
              cek(Number(mm[1]) === banyak, `${nm}: "ada ${mm[1]} ${nama}" benar (data ${banyak})`);
            }
          }
        }
      });
    }
  }
  cek(stat.kalimat >= 60, `kalimat perbandingan dihitung ulang cukup banyak (${stat.kalimat})`);
  cek(stat.benda >= 150, `benda, blok, tabel, garis, dan perbandingan diperiksa cukup banyak (${stat.benda})`);

  // 4) Pemeriksaan isi tiap adegan (angka tepat, urutan, pilihan jawaban, dihitung ulang dari gambar).
  {
    const cnt = (objs, key) => objs.filter((o) => new RegExp(`^e${key}\\d+$`).test(o.id)).length;
    const pilih = (objs) => [1, 2, 3].map((q) => ({ t: isiTeks(objs, `c${q}-t`), s: ketemu(objs, `c${q}-k`)?.sorot })).filter((c) => c.t !== undefined);
    const dipilih = (objs) => pilih(objs).filter((c) => c.s).map((c) => c.t);
    const blokNm = (objs, nama) => bacaBlok(objs).find((b) => b.nm?.isi === nama);
    const sorotId = (objs, pola) => objs.filter((o) => pola.test(o.id) && o.sorot).length;
    const ekspr = (objs, id = "ex") => isiTeks(objs, id);
    const tanda = (a, b) => (a > b ? ">" : a < b ? "<" : "=");
    const urutKartu = (objs, n = 4) => Array.from({ length: n }, (_, i) => ({ nilai: Number(isiTeks(objs, `od${i}-t`)), x: ketemu(objs, `od${i}-k`).x })).sort((p, q) => p.x - q.x).map((c) => c.nilai);
    const sorotKartu = (objs, n = 4) => Array.from({ length: n }, (_, i) => i).filter((i) => ketemu(objs, `od${i}-k`).sorot).map((i) => Number(isiTeks(objs, `od${i}-t`)));

    // Stoples Kira: dua puluh enam permen; tebakan Malosi dua puluh dan Halim tiga puluh.
    const st = di("stoples-kira", 4);
    sama([cnt(st, "a"), isiTeks(st, "gm-t1"), isiTeks(st, "gh-t1")], [26, "20", "30"], "stoples: 26 permen; tebakan 20 dan 30");
    // Hitung sepuluh-sepuluh.
    const ht2 = di("hitung-permen", 2);
    const ptsBaris = (objs, dari, sampai) => objs.filter((o) => new RegExp("^ea\\d+$").test(o.id) && Number(o.id.slice(2)) >= dari && Number(o.id.slice(2)) <= sampai);
    for (const [r, dari, sampai] of [[0, 0, 9], [1, 10, 19]]) {
      const fr = ketemu(ht2, `pf${r}-k`);
      const it = ptsBaris(ht2, dari, sampai);
      cek(it.length === 10 && it.every((o) => o.x > fr.x && o.x < fr.x + fr.w && o.y - 14 > fr.y && o.y < fr.y + fr.h + 6), `hitung permen: bingkai ${r + 1} memuat tepat sepuluh permen`);
      cek(it.every((o, q) => o.y === it[0].y && o.x === it[0].x + 25 * q), `hitung permen: sepuluh permen baris ${r + 1} berjajar rata`);
    }
    sama([isiTeks(ht2, "pf0-ln"), isiTeks(ht2, "pf1-ln")], ["10", "20"], "hitung permen: angka sepuluh dan dua puluh pada bingkai");
    const sisa = ptsBaris(ht2, 20, 25);
    cek(sisa.length === 6 && !ht2.some((o) => o.id === "pf2-k") && sisa.every((o) => o.y > ketemu(ht2, "pf1-k").y + ketemu(ht2, "pf1-k").h), "hitung permen: enam permen sisa di luar bingkai, di baris ketiga");
    const ht4 = di("hitung-permen", 4);
    sama(labelAngka(ht4, "ea").map((o) => o.isi), ["21", "22", "23", "24", "25", "26"], "hitung permen: sisa dihitung dua puluh satu sampai dua puluh enam");
    sama([cnt(di("hitung-permen", 5), "a"), isiTeks(di("hitung-permen", 5), "ea-ln"), isiTeks(di("hitung-permen", 5), "ea-nm")], [26, "26", "Permen"], "hitung permen: dua puluh enam permen (10 + 10 + 6)");
    // Jarak tebakan di garis bilangan.
    const td = di("tebakan-dekat", 8);
    const grTd = bacaGaris(td);
    const hm = ringkasHop(grTd.find((g) => g.key === "m"));
    const hh = ringkasHop(grTd.find((g) => g.key === "h"));
    sama([hm.awal, hm.akhir, hm.n, hm.sah, hh.awal, hh.akhir, hh.n, hh.sah], [20, 26, 6, true, 30, 26, 4, true], "tebakan dekat: Malosi 20 ke 26 enam langkah; Halim 30 ke 26 empat langkah");
    cek(hh.n < hm.n && isiTeks(di("tebakan-dekat", 8), "lm") === "6 langkah" && isiTeks(td, "lh") === "4 langkah", "tebakan dekat: Halim lebih dekat (empat langkah kurang dari enam)");
    sama(grTd.map((g) => [g.key, g.penanda.map((q) => q.n).sort((p, q) => p - q)]), [["m", [20, 26]], ["h", [26, 30]]], "tebakan dekat: penanda tebakan dan hitungan pada kedua jalur");
    // Tebakan dibandingkan.
    sama([ekspr(di("tebak-bandingkan", 1)), ekspr(di("tebak-bandingkan", 2)), ekspr(di("tebak-bandingkan", 3))], [`20 ${tanda(20, 26)} 26`, `30 ${tanda(30, 26)} 26`, `26 ${tanda(26, 26)} 26`], "tebak bandingkan: tebakan Malosi kecil, tebakan Halim besar, hitungan sama");
    sama(["gm-t", "hc-t", "gh-t"].map((q) => isiTeks(di("tebak-bandingkan", 0), q)), ["20", "26", "30"], "tebak bandingkan: kartu 20, 26, 30");
    // Kira 26 dan Upe 32.
    const db = di("dua-bilangan", 0);
    sama([blokNm(db, "Kira")?.p, blokNm(db, "Kira")?.s, blokNm(db, "Kira")?.ln?.isi, blokNm(db, "Upe")?.p, blokNm(db, "Upe")?.s, blokNm(db, "Upe")?.ln?.isi], [2, 6, "26", 3, 2, "32"], "dua bilangan: Kira 2 puluhan 6 satuan (26), Upe 3 puluhan 2 satuan (32)");
    // Tabel nilai tempat.
    const tn = bacaTabelNT(di("tabel-nilai-tempat", 2));
    sama(tn.map((r) => [r.n, r.p, r.s]), [[26, 2, 6], [32, 3, 2]], "tabel nilai tempat: 26 dan 32");
    const tn4 = bacaBlok(di("tabel-nilai-tempat", 3));
    sama(tn4.map((b) => [b.p, b.s, b.ln?.isi]), [[1, 0, "10"], [0, 1, "1"]], "tabel nilai tempat: satu batang sepuluh dan satu kubus satu");
    // Puluhan dulu.
    sama(bacaTabelNT(di("puluhan-dulu", 0)).map((r) => [r.n, r.p, r.s]), [[26, 2, 6], [32, 3, 2]], "puluhan dulu: 26 dan 32");
    sama([ekspr(di("puluhan-dulu", 2)), ekspr(di("puluhan-dulu", 3)), ekspr(di("puluhan-dulu", 5))], ["3 > 2", "32 > 26", "26 < 32"], "puluhan dulu: 3 > 2, 32 > 26, 26 < 32");
    // Puluhan sama.
    sama(bacaTabelNT(di("puluhan-sama", 0)).map((r) => [r.n, r.p, r.s]), [[24, 2, 4], [29, 2, 9]], "puluhan sama: 24 dan 29");
    sama([ekspr(di("puluhan-sama", 3)), ekspr(di("puluhan-sama", 4))], ["9 > 4", "29 > 24"], "puluhan sama: 9 > 4 lalu 29 > 24");
    // Tukar sepuluh satuan: Halim 2 puluhan 3 satuan (23), Igil 1 puluhan 14 satuan (24).
    const x0 = di("tukar-puluhan", 0);
    sama([blokNm(x0, "Halim").p, blokNm(x0, "Halim").s, blokNm(x0, "Igil").p, blokNm(x0, "Igil").s, blokNm(x0, "Igil").nilai], [2, 3, 1, 14, 24], "tukar: Halim 2 puluhan 3 satuan; Igil 1 puluhan 14 satuan (bernilai 24)");
    const x1 = di("tukar-puluhan", 1);
    const fr = ketemu(x1, "fr-k");
    const kubIgil = bacaBlok(x1).find((b) => b.nm?.isi === "Igil").cubes.map((c) => c.o);
    const dalam = kubIgil.filter((c) => c.x > fr.x && c.x + c.w < fr.x + fr.w && c.y > fr.y && c.y + c.h < fr.y + fr.h);
    cek(dalam.length === 10 && isiTeks(x1, "fr-t") === "10", "tukar: bingkai memuat tepat sepuluh kubus satuan Igil");
    const x2 = di("tukar-puluhan", 2);
    sama([blokNm(x2, "Igil").p, blokNm(x2, "Igil").s, bacaBlok(x2).filter((b) => b.nm?.isi === "Igil").length, x2.some((o) => o.id === "fr-k")], [2, 4, 1, false], "tukar: sesudah tukar Igil 2 puluhan 4 satuan, bingkai hilang");
    const x6 = di("tukar-puluhan", 6);
    sama([blokNm(x6, "Halim").ln?.isi, blokNm(x6, "Igil").ln?.isi, ekspr(x6)], ["23", "24", "24 > 23"], "tukar: Halim 23, Igil 24, 24 > 23");
    // Jangan satuan dulu: 19 dan 21.
    sama(bacaTabelNT(di("jangan-satuan", 1)).map((r) => [r.n, r.p, r.s]), [[19, 1, 9], [21, 2, 1]], "jangan satuan dulu: 19 dan 21");
    sama([ekspr(di("jangan-satuan", 2)), ekspr(di("jangan-satuan", 3)), ekspr(di("jangan-satuan", 4))], ["9 > 1", "2 > 1", "21 > 19"], "jangan satuan dulu: satuan 9 > 1 tetapi puluhan 2 > 1 menentukan: 21 > 19");
    // Tanda.
    const tg = di("tanda-banding", 3);
    sama([0, 1, 2].map((i) => isiTeks(tg, `tg${i}-t`)), [">", "<", "="], "tanda: lebih besar, lebih kecil, sama dengan");
    sama([ekspr(di("tanda-banding", 1)), ekspr(di("tanda-banding", 2)), ekspr(di("tanda-banding", 3))], ["32 > 26", "26 < 32", "26 = 26"], "tanda: tiga perbandingan");
    sama([sorotId(di("tanda-banding", 1), /^tg0-/), sorotId(di("tanda-banding", 2), /^tg1-/), sorotId(di("tanda-banding", 3), /^tg2-/)], [2, 2, 2], "tanda: kartu tanda yang bersesuaian disorot");
    sama([ekspr(di("tanda-banding", 4), "xa"), ekspr(di("tanda-banding", 4), "xb")], ["32 > 26", "26 < 32"], "tanda: dua cara menulis perbandingan yang sama");
    // Urutkan kartu Malosi: 25, 12, 35, 21.
    sama(urutKartu(di("urutkan-kartu", 0)), [25, 12, 35, 21], "urutkan: kartu Malosi 25, 12, 35, 21");
    sama([sorotKartu(di("urutkan-kartu", 1)), sorotKartu(di("urutkan-kartu", 2)), sorotKartu(di("urutkan-kartu", 3)).sort((p, q) => p - q)], [[12], [35], [21, 25]], "urutkan: paling kecil 12, paling besar 35, sisa 21 dan 25");
    sama([urutKartu(di("urutkan-kartu", 5)), urutKartu(di("urutkan-kartu", 6))], [[12, 21, 25, 35], [35, 25, 21, 12]], "urutkan: dari yang paling kecil, lalu dari yang paling besar");
    sama([ekspr(di("urutkan-kartu", 5)), ekspr(di("urutkan-kartu", 6))], ["12 < 21 < 25 < 35", "35 > 25 > 21 > 12"], "urutkan: rangkaian perbandingan");
    // Latihan 1: Wei 38 dan Halim 35.
    const l1 = di("latihan-satu", 3);
    sama([blokNm(l1, "Wei").nilai, blokNm(l1, "Halim").nilai, dipilih(l1), pilih(l1).map((c) => c.t)], [38, 35, ["Wei"], ["Wei", "Halim", "Sama banyak"]], "latihan 1: Wei 38 lebih banyak dari Halim 35; jawaban Wei dipilih");
    sama(ekspr(di("latihan-satu", 4)), "38 > 35", "latihan 1: 38 > 35");
    // Latihan 2: Kira 35, Upe 2 puluhan 12 satuan (32).
    const m0 = di("latihan-dua", 0);
    sama([blokNm(m0, "Kira").nilai, blokNm(m0, "Upe").p, blokNm(m0, "Upe").s, blokNm(m0, "Upe").nilai], [35, 2, 12, 32], "latihan 2: Kira 35; Upe 2 puluhan 12 satuan (32)");
    const m1 = di("latihan-dua", 1);
    cek(isiTeks(m1, "fr-t") === "10" && bacaBlok(m1).find((b) => b.nm?.isi === "Upe").cubes.filter((c) => c.o.x > ketemu(m1, "fr-k").x && c.o.x + c.o.w < ketemu(m1, "fr-k").x + ketemu(m1, "fr-k").w && c.o.y > ketemu(m1, "fr-k").y && c.o.y + c.o.h < ketemu(m1, "fr-k").y + ketemu(m1, "fr-k").h).length === 10, "latihan 2: bingkai memuat tepat sepuluh kubus Upe");
    const m2 = di("latihan-dua", 2);
    sama([blokNm(m2, "Upe").p, blokNm(m2, "Upe").s, blokNm(m2, "Upe").nilai, bacaBlok(m2).filter((b) => b.nm?.isi === "Upe").length], [3, 2, 32, 1], "latihan 2: sesudah tukar Upe 3 puluhan 2 satuan (tetap 32)");
    const m5 = di("latihan-dua", 5);
    sama([dipilih(m5), ekspr(m5), pilih(m5).map((c) => c.t)], [["Kira"], "35 > 32", ["Kira", "Upe", "Sama banyak"]], "latihan 2: Kira 35 lebih banyak dari Upe 32; jawaban Kira dipilih");
    // Latihan 3: kartu Igil 34, 45, 32, 37.
    sama(urutKartu(di("latihan-tiga", 0)), [34, 45, 32, 37], "latihan 3: kartu Igil 34, 45, 32, 37");
    const n1 = di("latihan-tiga", 1);
    const opsi = pilih(n1).map((c) => c.t);
    const benar = [...[34, 45, 32, 37]].sort((p, q) => p - q).join(", ");
    cek(opsi.filter((t) => t === benar).length === 1 && opsi.length === 3 && new Set(opsi).size === 3 && opsi.every((t) => [...t.split(", ").map(Number)].sort((p, q) => p - q).join(",") === "32,34,37,45"), `latihan 3: tiga pilihan urutan, tepat satu yang benar menurut hitungan (${benar})`);
    sama([sorotKartu(di("latihan-tiga", 2)), sorotKartu(di("latihan-tiga", 3)).sort((p, q) => p - q)], [[45], [32, 34, 37]], "latihan 3: 45 paling besar (4 puluhan); sisa 32, 34, 37 (3 puluhan)");
    const n4 = di("latihan-tiga", 4);
    sama([urutKartu(n4), ekspr(n4)], [[32, 34, 37, 45], "32 < 34 < 37 < 45"], "latihan 3: kartu terurut dari yang paling kecil");
    sama(dipilih(di("latihan-tiga", 5)), [benar], "latihan 3: pilihan pertama (urutan benar) dipilih");
    // Metode luar.
    const lg = di("luar-garis", 4);
    const glg = bacaGaris(lg)[0];
    sama([glg.penanda.map((q) => q.n).sort((p, q) => p - q), ekspr(lg)], [[23, 28], "23 < 28"], "luar garis: penanda 23 dan 28; 23 < 28");
    sama(bacaGaris(di("luar-garis", 0))[0].tanda.size, 11, "luar garis: sebelas tanda dari 20 sampai 30");
    const lt0 = di("luar-garis-terapan", 0);
    sama([bacaGaris(lt0)[0].penanda.map((q) => q.n).sort((p, q) => p - q), pilih(lt0).map((c) => c.t)], [[38, 41], ["41", "38", "Sama"]], "luar garis terapan: penanda 38 dan 41; pilihan 41, 38, Sama");
    sama(dipilih(di("luar-garis-terapan", 2)), [String(Math.min(41, 38))], "luar garis terapan: bilangan yang lebih kecil (38) dipilih");
    sama(ekspr(di("luar-garis-terapan", 2)), "38 < 41", "luar garis terapan: 38 < 41");
    const lt3 = di("luar-garis-terapan", 3);
    const gt3 = bacaGaris(lt3)[0];
    sama([...gt3.penanda].sort((p, q) => gt3.tanda.get(p.n) - gt3.tanda.get(q.n)).map((q) => q.n), [39, 42, 44], "luar garis terapan: dibaca dari kiri ke kanan 39, 42, 44");
    sama(ekspr(di("luar-garis-terapan", 4)), "39 < 42 < 44", "luar garis terapan: urutan dari yang paling kecil");
    // Pasangkan balok: 24 dan 29.
    const lb = di("luar-balok", 0);
    sama([blokNm(lb, "Kira").nilai, blokNm(lb, "Halim").nilai, blokNm(lb, "Kira").p, blokNm(lb, "Halim").p], [24, 29, 2, 2], "luar balok: Kira 24 dan Halim 29, puluhan sama");
    const pasang = (objs, ka, kb, awal, hitungJumlah) => {
      const A = bacaBlok(objs).find((b) => b.key === ka);
      const Bk = bacaBlok(objs).find((b) => b.key === kb);
      const garisP = objs.filter((o) => new RegExp(`^${awal}\\d+$`).test(o.id)).sort((p, q) => Number(p.id.slice(2)) - Number(q.id.slice(2)));
      const unsurA = awal === "pr" ? A.bars : A.cubes;
      const unsurB = awal === "pr" ? Bk.bars : Bk.cubes;
      cek(garisP.length === hitungJumlah, `${awal}: ${garisP.length} garis pasangan (harus ${hitungJumlah})`);
      garisP.forEach((g, q) => {
        const a1 = unsurA[q].o;
        const b1 = unsurB[q].o;
        const cx = a1.x + a1.w / 2;
        cek(Math.abs(g.x - cx) < 0.01 && Math.abs(b1.x + b1.w / 2 - cx) < 0.01 && g.x2 === 0 && g.y > a1.y + a1.h - 0.01 && g.y + g.y2 < b1.y + 0.01, `${awal}${q}: garis pasangan lurus dari ke-${q + 1} atas ke ke-${q + 1} bawah`);
      });
      return garisP.length;
    };
    cek(pasang(di("luar-balok", 1), "a", "b", "pr", Math.min(2, 2)) === 2, "luar balok: dua pasang batang puluhan (semua berpasangan)");
    cek(pasang(di("luar-balok", 3), "a", "b", "qr", Math.min(4, 9)) === 4, "luar balok: empat pasang kubus satuan");
    const lb4 = di("luar-balok", 4);
    sama([sorotId(lb4, /^bb-s\d+$/), [4, 5, 6, 7, 8].every((q) => ketemu(lb4, `bb-s${q}`).sorot)], [9 - 4, true], "luar balok: lima kubus tanpa pasangan (9 - 4) disorot, yaitu kubus ke-5 sampai ke-9 Halim");
    sama(ekspr(di("luar-balok", 5)), "29 > 24", "luar balok: 29 > 24");
    const lc = di("luar-balok-terapan", 0);
    sama([blokNm(lc, "Wei").nilai, blokNm(lc, "Halim").nilai, blokNm(lc, "Wei").p, blokNm(lc, "Halim").p], [41, 38, 4, 3], "luar balok terapan: Wei 41 (4 puluhan), Halim 38 (3 puluhan)");
    cek(pasang(di("luar-balok-terapan", 1), "a", "b", "pr", Math.min(4, 3)) === 3, "luar balok terapan: tiga pasang batang puluhan");
    const lc2 = di("luar-balok-terapan", 2);
    sama([sorotId(lc2, /^ba-p\d+$/), ketemu(lc2, "ba-p3").sorot], [4 - 3, true], "luar balok terapan: satu batang puluhan Wei tanpa pasangan disorot (4 - 3)");
    sama(ekspr(di("luar-balok-terapan", 3)), "41 > 38", "luar balok terapan: 41 > 38");
    // Mulut buaya: tanda dan letak buaya (mulut terbuka ke bilangan yang lebih besar).
    const lz = (ke) => di("luar-buaya", ke);
    sama([ekspr(lz(2)), ekspr(lz(3)), ekspr(lz(4))], ["32 > 26", "26 < 32", "26 = 26"], "luar buaya: 32 > 26, 26 < 32, 26 = 26");
    cek(ketemu(lz(1), "bu").x < 150 && ketemu(lz(2), "bu").x < 150, "luar buaya: untuk 32 > 26 buaya di bawah bilangan kiri (yang lebih besar)");
    cek(ketemu(lz(3), "bu").x > 150, "luar buaya: untuk 26 < 32 buaya di bawah bilangan kanan (yang lebih besar)");
    cek(ketemu(lz(4), "bu").x === 150, "luar buaya: untuk 26 = 26 buaya di tengah (tidak memilih)");
    sama([isiTeks(lz(1), "sg")], [">"], "luar buaya: tanda lebih besar tampil");
    // Mulut buaya terapan: 19 dan 21; 41 dan 41.
    const ly0 = di("luar-buaya-terapan", 0);
    sama(pilih(ly0).map((c) => c.t), [">", "<", "="], "luar buaya terapan: pilihan > < =");
    sama(isiTeks(ly0, "ex"), "19 ? 21", "luar buaya terapan: soal 19 dan 21");
    const ly1 = di("luar-buaya-terapan", 1);
    sama([dipilih(ly1), ekspr(ly1)], [[tanda(19, 21)], `19 ${tanda(19, 21)} 21`], "luar buaya terapan: tanda untuk 19 dan 21 adalah <");
    const ly4 = di("luar-buaya-terapan", 4);
    sama([dipilih(ly4), ekspr(ly4)], [[tanda(41, 41)], `41 ${tanda(41, 41)} 41`], "luar buaya terapan: tanda untuk 41 dan 41 adalah =");
    sama(U.adegan[U.adegan.length - 1].ketukan.length >= 4, true, "luar ringkas: ringkasan tiga metode");

  }

  // Aturan pemilik: aplikasi belajar mandiri; tanpa instruksi kelompok, teman, kelas, buku, benda nyata.
  {
    const MANDIRI = /kerja kelompok|berkelompok|secara berkelompok|diskusi kelompok|sekelompok|kelompokmu|kelompok belajar|bersama kelompok|tanya teman|survei|karet gelang|uang tabungan|\bpaman\b|\btika\b|\bteman\w*|\bkawan\w*|sekawan|depan kelas|bersama kelas|seluruh kelas|\bkelas\b|berpasangan dengan (teman|kawan)|bekerja berpasangan|secara berpasangan|bermain bersama|bertanya kepada|buat ceritamu|buku|menulis di|menuliskan di|tulis di|tuliskan di|menggambar|gambarlah|gambar sendiri|\bbawa(lah)?\b|membawa|dibawa|\bkertas\b|\bpensil\b|\bpulpen\b|\bspidol\b|ambil (benda|pensil|kelereng|bola|sedotan|balon|permen)|tangan (kiri|kanan)|\bjari\b|menyuruh|suruh|jengkal|telapak|\bdepa\b|penggaris|\bkoin\b|di sekitar|di rumah|di kelas|centimeter|\bmeter\b|kakimu|tanganmu|badanmu|\braba\w*|\bmeraba|\btubuh|\blengan|lingkari|coret|guru kelas|orang tua|\bayah\b|\bibu guru|bapak guru|\bloker\b|bagikan|membagikan|membagi|permen sungguhan|permen asli|stoples asli|balok sungguhan|uang/i;
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
  const DAFTAR = ["Menebak dan menghitung", "Puluhan dulu, lalu satuan", "Mengurutkan bilangan"];
  cek(/Halo anak-anak/.test(sap.ketukan[0].suara) && /Menebak dan menghitung/i.test(L.teksTerlihat(akhirAdegan(sap, 1)).join(" | ")), "sapaan materi: tiga hal yang dipelajari tampil");
  sama(L.teksTerlihat(akhirAdegan(sap, 1)).filter((t) => DAFTAR.includes(t)), DAFTAR, "sapaan materi: daftar tiga hal");
  cek(!/\d/.test(sap.ketukan[1].suara) && !/\d/.test(DAFTAR.join(" ")), "sapaan materi: tanpa angka");
  const sapLuar = adegan(U, "sapaan");
  cek(/cara lain/i.test(L.teksTerlihat(akhirAdegan(sapLuar, 1)).join(" | ")) && /metode-luar|Metode luar/.test(sapLuar.sumber), "sapaan metode luar: pengumuman cara lain");
  const sumberRingkas = JSON.parse(readFileSync(new URL("../src/data/kelas2-bab1-ringkas.json", import.meta.url), "utf8")).subBab?.C;
  const sementara = new URL("../.tmp-k2b1s/C.json", import.meta.url);
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
    // Isi tabel dihitung ulang dari pasangan bilangan pada adegan materi: kolom lihat (puluhan atau satuan), besar, dan kecil.
    sama(T.kolom, ["Lihat", "Besar", "Kecil"], "tabel susun: kolom lihat, besar, kecil");
    const dariTabel = (id, ke) => bacaTabelNT(akhirAdegan(adegan(M_VIDEO, id), ke)).map((r) => r.n);
    const dariBlok = (id, ke) => bacaBlok(akhirAdegan(adegan(M_VIDEO, id), ke)).map((b) => b.nilai);
    const pasangan = [dariTabel("puluhan-dulu", 0), dariTabel("puluhan-sama", 0), dariTabel("jangan-satuan", 1), dariBlok("latihan-satu", 0)];
    sama(pasangan, [[26, 32], [24, 29], [19, 21], [38, 35]], "tabel susun: pasangan bilangan dari adegan puluhan dulu, puluhan sama, jangan satuan dulu, dan latihan satu");
    cek(T.baris.length === pasangan.length, "tabel susun: satu baris untuk tiap pasangan");
    pasangan.forEach(([a1, b1]) => {
      const b = T.baris.find((x) => x.label === `${a1} dan ${b1}`);
      const lihat = Math.floor(a1 / 10) === Math.floor(b1 / 10) ? "satuan" : "puluhan";
      cek(!!b && b.sel[0] === lihat && b.sel[1] === String(Math.max(a1, b1)) && b.sel[2] === String(Math.min(a1, b1)), `tabel susun: baris "${a1} dan ${b1}" (lihat ${lihat}, besar ${Math.max(a1, b1)}, kecil ${Math.min(a1, b1)}) dihitung ulang`);
    });
    cek(T.baris.every((b) => b.sel.every((s) => s.length <= 8)), "tabel susun: sel pendek supaya margin teks >= 5 px di 405 px");
    cek(T.baris.every((b) => Number(b.sel[1]) <= 50 && Number(b.sel[2]) <= 50), "tabel susun: bilangan paling besar lima puluh");
    const KATA_LARANG = /buku|halaman|kunci|kerja kelompok|berkelompok|\bteman|kawan|kelas\b|kertas|pensil|\bbawa\b|menggambar|menulis di|depan kelas|luas|keliling|di rumah|survei|karet gelang|uang tabungan|di sekitar|\bpaman\b|\btika\b|loker|ibu guru/i;
    cek(!KATA_LARANG.test(JSON.stringify({ p: A.petaSusun, t: A.tabelSusun })), "peta dan tabel susun: tanpa kata terlarang dan tanpa kelompok, teman, kelas, buku, kertas, pensil");
    cek(peta.every((s) => ![...s.teks, ...(s.ikon ?? "")].some((c) => c.codePointAt(0) > 0x1fa95)), "peta susun: emoji paling tinggi Emoji 12");
  } else cek(false, "peta dan tabel susun: .tmp-k2b1s/C.json atau kelas2-bab1-ringkas.json subBab.C.petaSusun ada");
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k2b1C-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k2b1C-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k2b1C sendiri (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d), `${v.id}/${a.id}: emoji gambar paling tinggi Emoji 12`);
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k2b1c.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|naskah-k1b/.test(pembungkus) && /VIDEO_MATERI_K2B1C/.test(pembungkus) && /VIDEO_LUAR_K2B1C/.test(pembungkus) && /export function VideoK2B1C/.test(pembungkus) && /daftar-video-cerita/.test(pembungkus), "video-k2b1c.tsx: dua video dari mesin Story, tanpa naskah lama");
  cek(!/\r/.test(pembungkus), "video-k2b1c.tsx: akhir baris LF");
  const sendiri = readFileSync(new URL("uji-story-k2b1C.mjs", import.meta.url), "utf8");
  cek(!/\r/.test(sendiri), "uji-story-k2b1C.mjs: akhir baris LF");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit diputar)`);
}
console.log(`Pemeriksaan: ${stat.hitung} deret hitungan, ${jumlahNama} nama bilangan tampak sebagai angka, ${stat.kalimat} kalimat perbandingan, ${stat.benda} pemeriksaan benda, blok, tabel, garis, dan perbandingan`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
