// Uji Story Kelas 2 Bab 2 Sub-Bab C (Soal Cerita Penjumlahan dan Pengurangan): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Video diputar bergaya guru: suara, teks terlihat, sumber, judul adegan, dan subjudul tanpa penyebutan buku (kata terlarang diperiksa pada adegan yang diputar).
// Memeriksa: pemicu kata, suara tanpa digit, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas, teks bertumpuk, pemisahan materi dan metode luar (nama metode hanya Indonesia),
// hanya bilangan sampai dua puluh (tanpa kali, bagi, bersusun), hitungan satu per satu (angka berurutan, dekat bendanya, sama dengan bilangan yang diucapkan),
// nama bilangan sepuluh sampai dua puluh yang diucapkan tampak sebagai angka, dan data di layar dihitung ulang dari struktur gambar (bukan kata kunci):
//   benda per kelompok (paling banyak dua puluh per adegan), pasangan satu-satu (garis lurus, sisa tanpa pasangan = selisih), petak kosong (kurangnya),
//   jalur bilangan (angka berurutan, penanda pada tandanya, loncatan: awal, akhir, banyak langkah, arah), batang cerita (lebar = banyak x satuan, selisih di ujung batang pendek),
//   kotak bagian dan utuh (bagian + bagian = utuh), kartu pilihan jawaban (tepat satu yang benar), kartu kata kunci di wadah tambah atau kurang;
// setiap kalimat hitung di suara (a ditambah b sama dengan c; a dikurangi b sama dengan c) dihitung ulang dan harus tampak sebagai kalimat hitung di gambar,
// kalimat hitung di gambar dihitung ulang (termasuk bilangan awal yang dicari dengan operasi lawan dan hasil pemeriksaan), operasi dipilih sesuai kata kunci cerita,
// aturan pemilik (belajar mandiri digital: tanpa kerja kelompok, survei teman, buku, menulis atau menggambar di buku, membawa benda nyata),
// emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k2b2C.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k2b2C-video.ts");
const U1 = await import("../src/components/modul/story/k2b2C-luar-1.ts");
const B = await import("../src/components/modul/story/k2b2C-bantu.ts");

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
const VIDEO = [V.VIDEO_MATERI_K2B2C, V.VIDEO_LUAR_K2B2C];
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
const M_VIDEO = V.VIDEO_MATERI_K2B2C;
const U = V.VIDEO_LUAR_K2B2C;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const NAMA_LUAR = /Cerita Bagian–Utuh|Model Batang Cerita|Pilih Operasi|metode luar|metode dari luar/i;
const NAMA_INGGRIS = /Part[–-]Part[–-]Whole|Bar Model|Choose Operation|Counting|Singapore|CUBES|Word-problem|Number Line|Ten Frame/i;
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M_VIDEO);
  const luar = teksVideo(U);
  cek(!NAMA_LUAR.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of U1.NAMA_METODE_ID) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE_ID, ["Cerita Bagian–Utuh", "Model Batang Cerita", "Pilih Operasi"], "nama Indonesia metode luar");
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
  cek(M_VIDEO.id === "k2b2C-materi" && U.id === "k2b2C-luar", "id video k2b2C-materi dan k2b2C-luar");
  cek(U.judul.endsWith(": Metode dari Luar") && !/menurut/i.test(M_VIDEO.judul), "judul video: materi tanpa 'menurut', luar berakhir ': Metode dari Luar'");
  sama(M_VIDEO.adegan.map((a) => a.id).join(), "sapaan,burung-dahan,kata-kunci,donat-kira,empat-langkah,donat-solusi,donat-jumlah,tambah-apel,kurang-kue,kata-lebihnya,kata-kurangnya,kata-selisih,jeruk-awal,kelereng-awal,tiga-boneka,buat-soal,latihan-satu,latihan-dua,latihan-tiga,penutup", "urutan adegan materi");
  sama(U.adegan.map((a) => a.id).join(), "sapaan,luar-pembuka,luar-bagian,luar-bagian-terapan,luar-batang,luar-batang-terapan,luar-operasi,luar-operasi-terapan,luar-ringkas", "urutan adegan metode luar");
  cek(M_VIDEO.adegan[0].id === "sapaan" && U.adegan[0].id === "sapaan", "tiap video dibuka adegan sapaan");
  cek(M_VIDEO.adegan.filter((a) => /^latihan-/.test(a.id)).length === 3 && M_VIDEO.adegan[M_VIDEO.adegan.length - 1].id === "penutup", "video materi: Latihan 1 sampai 3 lalu penutup");
  cek(U.adegan[1].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  for (const kata of ["Latihan", "Igil", "Malosi", "Halim", "Kira", "Wei", "Upe", "kata kunci", "lebihnya", "kurangnya", "selisih", "jumlah", "diketahui", "ditanya", "solusi", "kesimpulan", "operasi lawan", "bilangan awal", "tiga bilangan", "soal cerita", "tambah", "kurang", "sama dengan", "jalur bilangan", "pasangkan"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
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
const UB = 12;
const BX = 30;
/** Batang cerita `bm{kunci}` dengan selisihnya `bd{kunci}`. */
const bacaBatang = (objs) => {
  const grup = new Map();
  const g = (key) => {
    if (!grup.has(key)) grup.set(key, { key, k: null, ln: null, nm: null, dk: null, dln: null });
    return grup.get(key);
  };
  for (const o of objs) {
    let m;
    if (o.t === "kotak" && (m = /^bm([a-z])-k$/.exec(o.id))) g(m[1]).k = o;
    else if (o.t === "teks" && (m = /^bm([a-z])-ln$/.exec(o.id))) g(m[1]).ln = o;
    else if (o.t === "teks" && (m = /^bm([a-z])-nm$/.exec(o.id))) g(m[1]).nm = o;
    else if (o.t === "kotak" && (m = /^bd([a-z])-k$/.exec(o.id))) g(m[1]).dk = o;
    else if (o.t === "teks" && (m = /^bd([a-z])-ln$/.exec(o.id))) g(m[1]).dln = o;
  }
  return [...grup.values()].filter((x) => x.k).map((x) => ({ ...x, n: x.k.w / UB, isi: x.ln?.isi, nama: x.nm?.isi, ext: x.dk ? { dari: (x.dk.x - BX) / UB, n: x.dk.w / UB, isi: x.dln?.isi, y: x.dk.y } : null }));
};
/** Kotak bagian dan utuh: nilai di `pwu-t`, `pwa-t`, `pwb-t`. */
const bacaPW = (objs) => {
  const v = (k) => ketemu(objs, `pw${k}-t`)?.isi;
  const ada = objs.some((o) => o.id === "pwu-k");
  return ada ? { u: v("u"), a: v("a"), b: v("b") } : null;
};
/** Kalimat hitung yang tampak, mis. "12 − 5 = 7" atau "? + 5 = 14". */
const RE_HITUNG = /^(\d+|\?) ([+−]) (\d+|\?) = (\d+|\?)$/;
const kalimatHitung = (objs) => objs.filter((o) => o.t === "teks" && RE_HITUNG.test(o.isi ?? "")).map((o) => ({ id: o.id, isi: o.isi }));
/** Hitung ulang satu kalimat hitung (boleh satu bilangan "?"): kembalikan [benar, nilai yang dicari]. */
const hitungUlang = (s) => {
  const m = RE_HITUNG.exec(s);
  const [a, op, b, c] = [m[1], m[2], m[3], m[4]];
  const x = (t) => (t === "?" ? null : Number(t));
  const [A, B, C] = [x(a), x(b), x(c)];
  const f = (p, q) => (op === "+" ? p + q : p - q);
  if (A !== null && B !== null && C !== null) return [f(A, B) === C, null];
  if (C === null) return [false, null];
  if (A === null && B !== null) return [true, op === "+" ? C - B : C + B];
  if (B === null && A !== null) return [true, op === "+" ? C - A : A - C];
  return [false, null];
};
const hasilKalimat = (s) => {
  const m = RE_HITUNG.exec(s);
  return Number(m[4]);
};
/** Kartu pilihan jawaban c1..c3: teks dan sorot. */
const pilihan = (objs) => [1, 2, 3].map((q) => ({ t: ketemu(objs, `c${q}-t`)?.isi, s: !!ketemu(objs, `c${q}-k`)?.sorot })).filter((c) => c.t !== undefined);
const dipilih = (objs) => pilihan(objs).filter((c) => c.s).map((c) => c.t);
const banyak = (objs, key) => objs.filter((o) => new RegExp(`^e${key}\\d+$`).test(o.id)).length;
const sorotId = (objs, pola) => objs.filter((o) => pola.test(o.id) && o.sorot).map((o) => o.id);
const petakAda = (objs) => objs.filter((o) => /^pk\d+$/.test(o.id)).length;
const NAMA_TOKOH = "kira|upe|wei|halim|igil|malosi";
void NAMA_TOKOH;
const objsPasang = (objs) => {
  const pr = objs.filter((o) => o.t === "garis" && /^pr\d+$/.test(o.id)).length;
  const na = banyak(objs, "a");
  const nb = banyak(objs, "b");
  return [pr, na, nb, Math.min(na, nb)];
};

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

  // 2) Tanpa kali dan bagi; bilangan di suara paling besar dua puluh; kalimat hitung di gambar dan suara dihitung ulang.
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((kt, i) => {
        const nm = `${v.id}/${a.id}#${i + 1}`;
        const objs = akhirAdegan(a, i);
        const sebelum = i > 0 ? akhirAdegan(a, i - 1) : [];
        cek(!/dikali|dibagi|perkalian|pembagian/i.test(kt.suara), `${nm}: suara tanpa kali dan bagi`);
        cek(semuaBil(kt.suara).every((r) => r.v <= 20), `${nm}: suara tanpa bilangan lebih dari dua puluh`);

        // Kalimat hitung di gambar.
        for (const e of kalimatHitung(objs)) {
          stat.benda += 1;
          const [ok, cari] = hitungUlang(e.isi);
          cek(ok, `${nm}: kalimat hitung "${e.isi}" dihitung ulang benar`);
          if (cari !== null) cek(cari >= 0 && cari <= 20, `${nm}: bilangan yang dicari ${cari} dalam 0 sampai 20`);
          else cek(hasilKalimat(e.isi) <= 20 && hasilKalimat(e.isi) >= 0, `${nm}: hasil "${e.isi}" dalam 0 sampai 20`);
        }
        for (const t of L.teksTerlihat(objs)) cek(!/\d\s*[×÷]\s*\d/.test(t), `${nm} gambar: "${t}" tanpa kali dan bagi`);

        // Kalimat hitung di suara: dihitung ulang dan tampak di gambar.
        for (const kal of kt.suara.split(/(?<=[.!?])\s+/)) {
          const n = ` ${normal(kal)} `;
          for (const mm of n.matchAll(/#(\d+)# (ditambah|dikurangi) #(\d+)# sama dengan #(\d+)#/g)) {
            stat.kalimat += 1;
            const [a1, b1, c1] = [Number(mm[1]), Number(mm[3]), Number(mm[4])];
            const op = mm[2] === "ditambah" ? "+" : "−";
            cek(op === "+" ? a1 + b1 === c1 : a1 - b1 === c1, `${nm}: "${a1} ${mm[2]} ${b1} sama dengan ${c1}" benar`);
            cek(a1 <= 20 && b1 <= 20 && c1 <= 20 && c1 >= 0, `${nm}: kalimat hitung ${a1} ${op} ${b1} = ${c1} paling besar dua puluh`);
            cek(L.teksTerlihat(objs).includes(`${a1} ${op} ${b1} = ${c1}`), `${nm}: kalimat hitung di suara "${a1} ${op} ${b1} = ${c1}" tampak di gambar`);
          }
        }

        // Benda: satu jenis, nomor berurutan, tidak menimpa, paling banyak dua puluh per adegan, angka banyaknya sama.
        let totalItem = 0;
        for (const g of bacaKelompok(objs)) {
          if (g.items.length) {
            stat.benda += 1;
            const e0 = g.items[0].o;
            cek(g.items.every((s, q) => s.i === q), `${nm} e${g.key}: nomor benda berurutan dari nol`);
            cek(g.items.every((s) => s.o.isi === e0.isi && s.o.u === e0.u), `${nm} e${g.key}: satu jenis benda`);
            totalItem += g.items.length;
            let rapat = true;
            for (let p = 0; p < g.items.length; p += 1) for (let q = p + 1; q < g.items.length; q += 1) if (Math.hypot(g.items[p].o.x - g.items[q].o.x, g.items[p].o.y - g.items[q].o.y) < 17) rapat = false;
            cek(rapat, `${nm} e${g.key}: benda tidak saling menimpa`);
          }
          if (g.ln && g.items.length && /^\d+$/.test(g.ln.isi)) cek(Number(g.ln.isi) === g.items.length, `${nm} e${g.key}: angka banyaknya ${g.ln.isi} sama dengan ${g.items.length} benda yang digambar`);
        }
        cek(totalItem <= 20, `${nm}: jumlah gambar benda paling banyak dua puluh (${totalItem})`);

        // Pasangan satu-satu: garis lurus dari benda ke-i baris atas ke benda ke-i baris bawah.
        const pr = objs.filter((o) => o.t === "garis" && /^pr\d+$/.test(o.id)).sort((p, q) => Number(p.id.slice(2)) - Number(q.id.slice(2)));
        if (pr.length) {
          stat.benda += 1;
          const na = banyak(objs, "a");
          const nb = banyak(objs, "b");
          cek(pr.length === Math.min(na, nb), `${nm}: ${pr.length} garis pasangan (harus ${Math.min(na, nb)} = yang lebih sedikit dari ${na} dan ${nb})`);
          pr.forEach((g, q) => {
            const ai = ketemu(objs, `ea${q}`);
            const bi = ketemu(objs, `eb${q}`);
            cek(ai && bi && Math.abs(g.x - ai.x) < 0.01 && Math.abs(g.x - bi.x) < 0.01 && g.x2 === 0 && g.y > ai.y - 12 && g.y + g.y2 < bi.y && ai.y < bi.y, `${nm}: garis pasangan ${q} lurus dari benda ke-${q + 1} atas ke benda ke-${q + 1} bawah`);
          });
        }

        // Batang cerita.
        const bt = bacaBatang(objs);
        for (const b of bt) {
          stat.benda += 1;
          cek(b.k.x === BX && Number.isInteger(b.n) && b.n >= 1 && b.n <= 20, `${nm} bm${b.key}: batang dimulai di kiri dan lebarnya kelipatan satuan, 1 sampai 20 (${b.n})`);
          if (/^\d+$/.test(b.isi ?? "")) cek(Number(b.isi) === b.n, `${nm} bm${b.key}: angka ${b.isi} sama dengan panjang batang ${b.n}`);
          if (b.ext) {
            cek(Number.isInteger(b.ext.n) && Number.isInteger(b.ext.dari) && String(b.ext.n) === b.ext.isi, `${nm} bd${b.key}: angka selisih ${b.ext.isi} sama dengan lebarnya ${b.ext.n}`);
            if (bt.length === 2) {
              const [p1, q1] = [bt[0], bt[1]].sort((x, y) => x.n - y.n);
              cek(b.ext.dari === p1.n && b.ext.dari + b.ext.n === q1.n, `${nm} bd${b.key}: selisih ${b.ext.n} dari ${p1.n} sampai ${q1.n} = ${q1.n - p1.n} (batang pendek ${p1.n}, batang panjang ${q1.n})`);
            }
          }
        }

        // Kotak bagian dan utuh: bagian + bagian = utuh.
        const pw = bacaPW(objs);
        if (pw) {
          stat.benda += 1;
          const [u1, a1, b1] = [pw.u, pw.a, pw.b].map((t) => (/^\d+$/.test(t ?? "") ? Number(t) : null));
          if (u1 !== null && a1 !== null && b1 !== null) cek(a1 + b1 === u1 && u1 <= 20, `${nm}: bagian ${a1} + bagian ${b1} = utuh ${u1}`);
        }

        // Jalur bilangan: tanda berurutan, label sama dengan tanda, penanda pada tandanya, loncatan sah.
        for (const g of bacaGaris(objs)) {
          stat.benda += 1;
          const ns = [...g.tanda.keys()].sort((p, q) => p - q);
          if (ns.length) {
            cek(ns.every((n, q) => n === ns[0] + q), `${nm} gb${g.key}: tanda berurutan satu-satu`);
            const jarak = ns.slice(1).map((n, q) => g.tanda.get(n) - g.tanda.get(ns[q]));
            cek(jarak.every((d) => Math.abs(d - jarak[0]) < 0.01 && d > 0), `${nm} gb${g.key}: jarak antartanda sama`);
            cek(ns.every((n) => g.label.get(n)?.isi === String(n) && Math.abs(g.label.get(n).x - g.tanda.get(n)) < 0.01), `${nm} gb${g.key}: angka di bawah tanda sama dengan nilainya`);
            cek(ns[0] >= 0 && ns[ns.length - 1] <= 20, `${nm} gb${g.key}: jalur bilangan 0 sampai 20`);
          }
          for (const m of g.penanda) cek(g.tanda.has(m.n) && Math.abs(g.tanda.get(m.n) - m.o.x) < 0.01, `${nm} gb${g.key}: penanda ${m.n} tepat pada tandanya`);
          const rh = ringkasHop(g);
          if (rh) {
            cek(rh.sah && rh.n <= 10, `${nm} gb${g.key}: loncatan berurutan satu langkah, searah, angka 1 sampai ${rh.n}`);
            const lama = bacaGaris(sebelum).find((x) => x.key === g.key);
            const baruHop = g.hop.length - (lama ? lama.hop.length : 0);
            if (baruHop > 0) cek(rantaiTerpanjang(kt.suara, 1) === baruHop, `${nm} gb${g.key}: ${baruHop} loncatan baru sama dengan banyak bilangan berurutan yang diucapkan (${rantaiTerpanjang(kt.suara, 1)})`);
          }
        }

        // Kartu pilihan jawaban.
        const pl = pilihan(objs);
        if (pl.length) {
          stat.benda += 1;
          cek((pl.length === 2 || pl.length === 3) && new Set(pl.map((c) => c.t)).size === pl.length, `${nm}: ${pl.length} pilihan jawaban berbeda`);
        }
      });
    }
  }
  cek(stat.kalimat >= 20, `kalimat hitung di suara dihitung ulang cukup banyak (${stat.kalimat})`);
  cek(stat.benda >= 150, `benda, batang, kotak, jalur, kalimat hitung, dan pilihan diperiksa cukup banyak (${stat.benda})`);

  // 3) Pemeriksaan isi tiap adegan (dihitung ulang dari struktur gambar, bukan dari kata kunci).
  {
    const kal = (objs, id = "ex") => isiTeks(objs, id);
    const jum = (objs, ...ks) => ks.reduce((t, kk) => t + banyak(objs, kk), 0);
    const op = (objs, id = "ex") => RE_HITUNG.exec(kal(objs, id) ?? "")?.[2];
    const suaraAdegan = (id) => (adegan(M_VIDEO, id) ?? adegan(U, id))?.ketukan.map((x) => x.suara).join(" ") ?? "";
    const adaKata = (id, re) => cek(re.test(suaraAdegan(id)), `${id}: suara memuat ${re} (kata kunci cerita)`);

    // Burung hijau dan merah.
    const b1 = di("burung-dahan", 1);
    const [nh, nm0] = [banyak(b1, "a"), banyak(b1, "b")];
    sama([nh, nm0, isiTeks(b1, "ea-ln"), isiTeks(b1, "eb-ln"), isiTeks(b1, "ea-nm"), isiTeks(b1, "eb-nm")], [4, 5, "4", "5", "Hijau", "Merah"], "burung: 4 hijau dan 5 merah");
    sama(objsPasang(di("burung-dahan", 2)), [4, 4, 5, 4], "burung: 4 pasang dari 4 hijau dan 5 merah");
    const b3 = di("burung-dahan", 3);
    sama([sorotId(b3, /^eb\d+$/), nm0 - nh], [["eb4"], 1], "burung: satu burung merah tanpa pasangan (5 - 4) disorot");
    const b4 = di("burung-dahan", 4);
    sama([isiTeks(b4, "kk-t0"), isiTeks(b4, "kl-t0")], [`burung hijau ${nm0 - nh} kurangnya`, `burung merah ${nm0 - nh} lebihnya`], "burung: hijau 1 kurangnya, merah 1 lebihnya");

    // Empat kata kunci.
    sama([kal(di("kata-kunci", 2)), kal(di("kata-kunci", 3))], [`${nh} + ${nm0} = ${nh + nm0}`, `${nm0} − ${nh} = ${nm0 - nh}`], "kata kunci: jumlah 4 + 5 = 9 (tambah) dan selisih 5 − 4 = 1 (kurang)");
    const kk1 = di("kata-kunci", 1);
    sama([isiTeks(kk1, "kj-t0"), isiTeks(kk1, "kk-t0"), isiTeks(kk1, "ks-t0"), isiTeks(kk1, "kt-t0")], ["lebihnya", "kurangnya", "selisih", "jumlah"], "kata kunci: empat kata kunci");
    sama([isiTeks(di("kata-kunci", 2), "tb-t0"), isiTeks(di("kata-kunci", 3), "kr-t0")], ["tambah (+)", "kurang (−)"], "kata kunci: jumlah memilih tambah, selisih memilih kurang");

    // Donat Kira: 12 donat.
    const dk = di("donat-kira", 1);
    sama([banyak(dk, "a"), isiTeks(dk, "ea-ln"), labelAngka(dk, "ea").length], [12, "12", 12], "donat Kira: 12 donat dihitung satu per satu");
    cek(/5 kurangnya/.test(isiTeks(di("donat-kira", 2), "mk-t0")), "donat Kira: Malosi 5 kurangnya");

    // Solusi donat: 12 - 5 = 7 dengan petak kosong; periksa 7 + 5 = 12.
    const ds0 = di("donat-solusi", 0);
    const ds1 = di("donat-solusi", 1);
    const ds2 = di("donat-solusi", 2);
    const ds3 = di("donat-solusi", 3);
    const kira = banyak(ds0, "a");
    sama([kira, petakAda(ds1), banyak(ds1, "b")], [12, 12, 0], "solusi donat: Kira 12 donat; baris Malosi 12 petak");
    sama([banyak(ds2, "b"), petakAda(ds2), kira - petakAda(ds2)], [7, 5, 7], "solusi donat: 7 donat Malosi dan 5 petak kosong (12 - 5 = 7)");
    cek(ds2.filter((o) => /^eb\d+$/.test(o.id)).every((o) => ketemu(ds2, `ea${o.id.slice(2)}`).x === o.x), "solusi donat: donat Malosi sejajar dengan donat Kira pada baris di atasnya");
    cek(ds2.filter((o) => /^pk\d+$/.test(o.id)).every((o) => Number(o.id.slice(2)) >= 7 && Math.abs(o.x + 10 - ketemu(ds2, `ea${o.id.slice(2)}`).x) < 1), "solusi donat: petak kosong menempati donat ke-8 sampai ke-12 baris Malosi");
    sama([kal(ds2), op(ds2), isiTeks(ds2, "eb-ln")], ["12 − 5 = 7", "−", "7"], "solusi donat: 12 − 5 = 7 (kurangnya: kurang)");
    sama(kal(ds3, "xk"), "7 + 5 = 12", "solusi donat: periksa dengan operasi lawan 7 + 5 = 12");
    cek(sorotId(ds1, /^pk\d+$/).length === 5, "solusi donat: lima petak kosong disorot");
    adaKata("donat-solusi", /kurangnya/);

    // Jumlah donat: 7 + 12 = 19.
    const dj1 = di("donat-jumlah", 1);
    sama([banyak(dj1, "a"), banyak(dj1, "b"), jum(dj1, "a", "b")], [12, 7, 19], "jumlah donat: 12 donat Kira dan 7 donat Malosi, 19 semuanya");
    sama(labelAngka(di("donat-jumlah", 2), "eb").map((o) => o.isi), ["13", "14", "15", "16", "17", "18", "19"], "jumlah donat: hitung maju dari 12 ke 19 (7 donat Malosi)");
    sama([kal(di("donat-jumlah", 3)), op(di("donat-jumlah", 3))], ["7 + 12 = 19", "+"], "jumlah donat: 7 + 12 = 19");
    sama(isiTeks(di("donat-jumlah", 4), "kj-t0"), "Jadi, jumlah donat 19 buah.", "jumlah donat: kesimpulan 19 buah");
    sama(isiTeks(di("donat-jumlah", 0), "ks-t0"), "Jadi, donat Malosi ada 7 buah.", "jumlah donat: kesimpulan donat Malosi 7 buah");

    // Dapat lagi: 8 + 6 = 14 di jalur bilangan.
    const ta = di("tambah-apel", 3);
    const gta = bacaGaris(ta)[0];
    const hta = ringkasHop(gta);
    sama([banyak(ta, "a"), banyak(ta, "b"), hta.awal, hta.akhir, hta.n, hta.arah, hta.sah, kal(ta)], [8, 6, 8, 14, 6, 1, true, "8 + 6 = 14"], "dapat lagi: 8 apel, 6 lagi; loncat maju dari 8 sebanyak 6 sampai 14; 8 + 6 = 14");
    sama(gta.penanda.map((q) => q.n).sort((p, q) => p - q), [8, 14], "dapat lagi: penanda 8 dan 14");
    sama(isiTeks(di("tambah-apel", 1), "tb-t0"), "tambah (+)", "dapat lagi: memilih tambah");
    adaKata("tambah-apel", /dapat lagi|dapat enam apel lagi/);

    // Dimakan: 15 - 7 = 8.
    const kk0 = di("kurang-kue", 0);
    sama([banyak(kk0, "a"), banyak(kk0, "b"), jum(kk0, "a", "b"), sorotId(kk0, /^eb\d+$/).length], [8, 7, 15, 7], "dimakan: 15 kue (8 dan 7 yang dimakan disorot)");
    const kk2 = di("kurang-kue", 2);
    const hk = ringkasHop(bacaGaris(kk2)[0]);
    sama([hk.awal, hk.akhir, hk.n, hk.arah, hk.sah], [15, 8, 7, -1, true], "dimakan: loncat mundur dari 15 sebanyak 7 sampai 8");
    const kk3 = di("kurang-kue", 3);
    sama([kal(kk3), banyak(kk3, "a"), banyak(kk3, "b"), jum(kk0, "a", "b") - banyak(kk0, "b")], ["15 − 7 = 8", 8, 0, 8], "dimakan: sisa 8 kue (15 - 7)");
    sama([kal(di("kurang-kue", 4)), isiTeks(di("kurang-kue", 1), "kr-t0")], ["8 + 7 = 15", "kurang (−)"], "dimakan: periksa 8 + 7 = 15; memilih kurang");
    sama([isiTeks(di("kurang-kue", 5), "t0-t0"), isiTeks(di("kurang-kue", 5), "u0-t0")], ["tambah (+)", "kurang (−)"], "dimakan: ringkasan tambah dan kurang");
    cek(["dapat lagi", "digabung"].every((t) => di("kurang-kue", 5).some((o) => o.isi === t && o.x < 150)) && ["dimakan", "diberikan", "hilang"].every((t) => di("kurang-kue", 5).some((o) => o.isi === t && o.x > 150)), "dimakan: dapat lagi dan digabung di sisi tambah; dimakan, diberikan, hilang di sisi kurang");
    adaKata("kurang-kue", /makan/);

    // Lebihnya: Wei 8, Igil 3 lebihnya: tambah (yang dicari lebih banyak).
    const le0 = di("kata-lebihnya", 0);
    const le1 = di("kata-lebihnya", 1);
    const le2 = di("kata-lebihnya", 2);
    sama([banyak(le0, "a"), banyak(le1, "b"), petakAda(le1)], [8, 8, 3], "lebihnya: Wei 8; baris Igil 8 benda dan 3 petak tambahan");
    sama([banyak(le2, "b"), banyak(le2, "b") - banyak(le2, "a"), petakAda(le2), isiTeks(le2, "eb-ln"), kal(le2), op(le2)], [11, 3, 0, "11", "8 + 3 = 11", "+"], "lebihnya: Igil 11 = 8 + 3, lebih banyak maka tambah");
    cek(banyak(le2, "b") > banyak(le2, "a") && op(le2) === "+", "lebihnya: yang dicari lebih banyak, operasi tambah");
    sama(kal(di("kata-lebihnya", 3), "xk"), "11 − 3 = 8", "lebihnya: periksa 11 − 3 = 8");
    adaKata("kata-lebihnya", /lebihnya/);

    // Kurangnya: Upe 8, Halim 4 lebih banyak (kurangnya Upe): tambah.
    const ku1 = di("kata-kurangnya", 1);
    const ku2 = di("kata-kurangnya", 2);
    sama([banyak(ku1, "a"), banyak(ku1, "b"), petakAda(ku1)], [8, 8, 4], "kurangnya: Upe 8; baris Halim 8 benda dan 4 petak tambahan");
    sama([banyak(ku2, "b"), banyak(ku2, "b") - banyak(ku2, "a"), isiTeks(ku2, "eb-ln"), kal(ku2), op(ku2), jum(ku2, "a", "b")], [12, 4, "12", "8 + 4 = 12", "+", 20], "kurangnya: Halim 12 = 8 + 4; yang dicari lebih banyak maka tambah (kata kurangnya tidak selalu kurang)");
    cek(banyak(ku2, "b") > banyak(ku2, "a") && op(ku2) === "+", "kurangnya: yang dicari (Halim) lebih banyak, operasi tambah");
    adaKata("kata-kurangnya", /kurangnya/);

    // Selisih: Kira 11, Wei 7: 11 - 7 = 4.
    const se1 = di("kata-selisih", 1);
    const se2 = di("kata-selisih", 2);
    sama([banyak(se1, "a"), banyak(se1, "b"), objsPasang(se1)[0], objsPasang(se1)[3]], [11, 7, 7, 7], "selisih: Kira 11, Wei 7; 7 pasang");
    sama([sorotId(se2, /^ea\d+$/), banyak(se2, "a") - banyak(se2, "b")], [["ea7", "ea8", "ea9", "ea10"], 4], "selisih: empat stiker Kira tanpa pasangan (11 - 7) disorot");
    sama([isiTeks(se2, "sl"), kal(di("kata-selisih", 3)), kal(di("kata-selisih", 4), "xk")], ["selisih 4", "11 − 7 = 4", "7 + 4 = 11"], "selisih: selisih 4; 11 − 7 = 4; periksa 7 + 4 = 11");
    adaKata("kata-selisih", /selisih/);

    // Jeruk Halim: bilangan awal.
    const je0 = di("jeruk-awal", 0);
    const je1 = di("jeruk-awal", 1);
    const je2 = di("jeruk-awal", 2);
    const je3 = di("jeruk-awal", 3);
    const je4 = di("jeruk-awal", 4);
    const basket = (objs) => objs.filter((o) => /^e[ab]\d+$/.test(o.id) && o.x < 180).length;
    sama([banyak(je0, "b"), basket(je0), banyak(je1, "a"), isiTeks(je1, "ea-ln"), basket(je1)], [4, 0, 12, "12", 12], "jeruk: 4 jeruk diberikan kepada Kira; sisa 12 di keranjang");
    sama([kal(je2), hitungUlang(kal(je2))[1]], ["? − 4 = 12", 16], "jeruk: ? − 4 = 12 berarti jeruk semula 16");
    sama([basket(je3), je3.filter((o) => /^eb\d+$/.test(o.id) && o.x < 180).length], [16, 4], "jeruk: 4 jeruk kembali ke keranjang sehingga 16");
    sama([kal(je4), isiTeks(je4, "tot"), basket(je4), hitungUlang("? − 4 = 12")[1]], ["12 + 4 = 16", "semula: 16", 16, 16], "jeruk: 12 + 4 = 16 sama dengan isi keranjang dan jawaban ? − 4 = 12");
    adaKata("jeruk-awal", /bilangan awal/);

    // Kelereng Wei: ? + 5 = 14, awal 9.
    const kw = di("kelereng-awal", 1);
    sama([kal(kw), hitungUlang(kal(kw))[1]], ["? + 5 = 14", 9], "kelereng: ? + 5 = 14 berarti awal 9");
    const kw2 = di("kelereng-awal", 2);
    const hw = ringkasHop(bacaGaris(kw2)[0]);
    sama([hw.awal, hw.akhir, hw.n, hw.arah, hw.sah], [14, 9, 5, -1, true], "kelereng: loncat mundur dari 14 sebanyak 5 sampai 9");
    const kw3 = di("kelereng-awal", 3);
    sama([kal(kw3), isiTeks(kw3, "c0-t0"), bacaGaris(kw3)[0].penanda.map((q) => q.n).sort((p, q) => p - q)], ["14 − 5 = 9", "awal: 9", [9, 14]], "kelereng: 14 − 5 = 9; awal 9");
    sama(kal(di("kelereng-awal", 4)), "9 + 5 = 14", "kelereng: periksa 9 + 5 = 14");

    // Boneka tiga sahabat: 5 + 7 + 8 = 20.
    const tb = di("tiga-boneka", 0);
    sama([banyak(tb, "a"), banyak(tb, "b"), banyak(tb, "c"), jum(tb, "a", "b", "c"), isiTeks(tb, "ea-ln"), isiTeks(tb, "eb-ln"), isiTeks(tb, "ec-ln")], [5, 7, 8, 20, "5", "7", "8"], "boneka: Kira 5, Wei 7, Halim 8 (20 boneka)");
    const tb1 = di("tiga-boneka", 1);
    const br1 = ketemu(tb1, "br");
    const dalam = (objs, br, key) => objs.filter((o) => new RegExp(`^e${key}\\d+$`).test(o.id) && o.y - 16 > br.y && o.y < br.y + br.h).length;
    sama([dalam(tb1, br1, "a"), dalam(tb1, br1, "b"), dalam(tb1, br1, "c")], [5, 7, 0], "boneka: kotak putus-putus memuat boneka Kira dan Wei saja");
    sama(kal(di("tiga-boneka", 2)), `${banyak(tb, "a")} + ${banyak(tb, "b")} = ${banyak(tb, "a") + banyak(tb, "b")}`, "boneka: 5 + 7 = 12");
    const tb3 = di("tiga-boneka", 3);
    const br3 = ketemu(tb3, "br");
    sama([dalam(tb3, br3, "a"), dalam(tb3, br3, "b"), dalam(tb3, br3, "c"), kal(tb3, "xk")], [5, 7, 8, `${banyak(tb, "a") + banyak(tb, "b")} + ${banyak(tb, "c")} = ${jum(tb, "a", "b", "c")}`], "boneka: dua puluh = 12 + 8 dan semua boneka dalam kotak");

    // Membuat soal cerita: lebihnya memilih tambah.
    const bs1 = di("buat-soal", 1);
    sama(["p0", "p1", "p2", "p3"].map((q) => isiTeks(bs1, `${q}-v`)), ["Wei dan Igil", "kue", "lebihnya", "8 dan 4"], "buat soal: pilihan tokoh, benda, kata kunci, bilangan");
    const bs2 = di("buat-soal", 2);
    sama([isiTeks(bs2, "sk-t0"), isiTeks(bs2, "sk-t1"), isiTeks(bs2, "sk-t2")], ["Wei punya 8 kue.", "Igil punya 4 kue lebihnya dari Wei.", "Berapa kue Igil?"], "buat soal: soal tersusun dari pilihan");
    const [bA, bB] = (isiTeks(bs1, "p3-v").match(/\d+/g) ?? []).map(Number);
    const kataKunci = isiTeks(bs1, "p2-v");
    sama([kal(di("buat-soal", 3)), op(di("buat-soal", 3)), kataKunci === "lebihnya" ? "+" : "−"], [`${bA} + ${bB} = ${bA + bB}`, "+", "+"], "buat soal: kata kunci lebihnya memilih tambah; 8 + 4 = 12");
    cek(bA + bB <= 20, "buat soal: hasil paling banyak dua puluh");
    sama(isiTeks(di("buat-soal", 4), "mx-t1"), "paling banyak 20", "buat soal: batas dua puluh");

    // Latihan 1: Upe 7 balon, Igil 4 lebihnya: 11.
    const l1a = di("latihan-satu", 0);
    sama([banyak(l1a, "a"), banyak(l1a, "b"), petakAda(l1a)], [7, 7, 4], "latihan 1: Upe 7; baris Igil 7 benda dan 4 petak tambahan");
    const l1b = di("latihan-satu", 1);
    cek(pilihan(l1b).map((c) => c.t).join() === "3,11,12", "latihan 1: pilihan 3, 11, 12");
    const l1c = di("latihan-satu", 2);
    sama([banyak(l1c, "b"), kal(l1c), op(l1c), isiTeks(l1c, "eb-ln")], [11, "7 + 4 = 11", "+", "11"], "latihan 1: Igil 11 = 7 + 4 (lebihnya: tambah)");
    const l1d = di("latihan-satu", 3);
    sama(dipilih(l1d), [String(banyak(l1c, "b"))], "latihan 1: jawaban benar (7 + 4 = 11) dipilih");
    cek(pilihan(l1d).filter((c) => c.t === "11").length === 1, "latihan 1: tepat satu pilihan yang benar");

    // Latihan 2: Malosi 17, memberikan 8, sisa 9.
    const l2a = di("latihan-dua", 0);
    const dalamM = (objs, key) => objs.filter((o) => new RegExp(`^e${key}\\d+$`).test(o.id) && o.x < 192).length;
    const dalamW = (objs, key) => objs.filter((o) => new RegExp(`^e${key}\\d+$`).test(o.id) && o.x > 204).length;
    sama([banyak(l2a, "a"), banyak(l2a, "b"), jum(l2a, "a", "b"), dalamM(l2a, "a") + dalamM(l2a, "b"), isiTeks(l2a, "tot")], [9, 8, 17, 17, "17 kelereng"], "latihan 2: 17 kelereng Malosi (9 dan 8 yang akan diberikan)");
    cek(pilihan(di("latihan-dua", 1)).map((c) => c.t).join() === "8,9,10", "latihan 2: pilihan 25, 9, 8");
    const l2c = di("latihan-dua", 2);
    sama([dalamM(l2c, "a"), dalamM(l2c, "b"), dalamW(l2c, "b")], [9, 0, 8], "latihan 2: 8 kelereng pindah ke Wei; 9 tersisa pada Malosi");
    const l2d = di("latihan-dua", 3);
    sama([kal(l2d), op(l2d), isiTeks(l2d, "ea-ln"), dipilih(l2d), dalamM(l2d, "a")], ["17 − 8 = 9", "−", "9", ["9"], 9], "latihan 2: 17 − 8 = 9 (diberikan: kurang); sisa 9 dipilih");

    // Latihan 3: 6 + 4 + 9 = 19.
    const l3a = di("latihan-tiga", 0);
    sama([banyak(l3a, "a"), banyak(l3a, "b"), banyak(l3a, "c"), jum(l3a, "a", "b", "c")], [6, 4, 9, 19], "latihan 3: Upe 6, Wei 4, Igil 9 (19 stiker)");
    cek(pilihan(di("latihan-tiga", 1)).map((c) => c.t).join() === "18,20,19", "latihan 3: pilihan 18, 20, 19");
    const l3c = di("latihan-tiga", 2);
    const br3a = ketemu(l3c, "br");
    sama([kal(l3c), dalam(l3c, br3a, "a"), dalam(l3c, br3a, "b"), dalam(l3c, br3a, "c")], [`${banyak(l3a, "a")} + ${banyak(l3a, "b")} = ${banyak(l3a, "a") + banyak(l3a, "b")}`, 6, 4, 0], "latihan 3: pasangan sepuluh 6 + 4 = 10 dalam kotak");
    const l3d = di("latihan-tiga", 3);
    sama([kal(l3d), dipilih(l3d), String(jum(l3a, "a", "b", "c"))], ["10 + 9 = 19", ["19"], "19"], "latihan 3: 10 + 9 = 19 dan pilihan ketiga (19) dipilih");

    // Metode luar: Cerita Bagian-Utuh.
    sama([bacaPW(di("luar-bagian", 1)).a, bacaPW(di("luar-bagian", 1)).b], ["8", "5"], "luar bagian: dua bagian 8 dan 5");
    const lp3 = di("luar-bagian", 3);
    sama([bacaPW(lp3).u, kal(lp3), op(lp3)], ["13", "8 + 5 = 13", "+"], "luar bagian: utuh 13 = 8 + 5");
    sama(kal(di("luar-bagian", 4)), "13 − 5 = 8", "luar bagian: periksa 13 − 5 = 8");
    const lq0 = di("luar-bagian-terapan", 0);
    sama([bacaPW(lq0).u, bacaPW(lq0).a, bacaPW(lq0).b], ["15", "6", "?"], "luar bagian terapan: utuh 15, satu bagian 6, bagian lain dicari");
    const lq3 = di("luar-bagian-terapan", 3);
    sama([bacaPW(lq3).b, kal(lq3), op(lq3), dipilih(lq3), hitungUlang("? + 6 = 15")[1]], ["9", "15 − 6 = 9", "−", ["9"], 9], "luar bagian terapan: bagian lain 9 = 15 − 6 (mencari bagian: kurang)");
    cek(pilihan(lq3).map((c) => c.t).join() === "9,11,10", "luar bagian terapan: pilihan 9, 21, 10");
    sama(kal(di("luar-bagian-terapan", 4)), "9 + 6 = 15", "luar bagian terapan: periksa 9 + 6 = 15");

    // Metode luar: Model Batang Cerita.
    const lb2 = bacaBatang(di("luar-batang", 2));
    const bH = lb2.find((b) => b.key === "h");
    const bW = lb2.find((b) => b.key === "w");
    sama([bH.n, bH.isi, bW.n, bW.isi, bW.ext.dari, bW.ext.n, bH.n - bW.n], [13, "13", 7, "?", 7, 6, 6], "luar batang: Halim 13; Wei lebih pendek 6 (batang Wei 7)");
    const lb3 = di("luar-batang", 3);
    sama([bacaBatang(lb3).find((b) => b.key === "w").isi, kal(lb3), op(lb3)], ["7", "13 − 6 = 7", "−"], "luar batang: batang Wei 7 = 13 − 6");
    sama(kal(di("luar-batang", 4), "xk"), "7 + 6 = 13", "luar batang: periksa 7 + 6 = 13");
    const lc1 = bacaBatang(di("luar-batang-terapan", 1));
    const bM = lc1.find((b) => b.key === "m");
    const bK = lc1.find((b) => b.key === "k");
    sama([bM.n, bK.n, bK.isi, bK.ext.dari, bK.ext.n, bM.n + bK.ext.n], [11, 15, "?", 11, 4, 15], "luar batang terapan: Malosi 11; batang Kira lebih panjang 4 (15)");
    cek(pilihan(di("luar-batang-terapan", 2)).map((c) => c.t).join() === "7,15,16", "luar batang terapan: pilihan 7, 15, 16");
    const lc3 = di("luar-batang-terapan", 3);
    sama([bacaBatang(lc3).find((b) => b.key === "k").isi, kal(lc3), op(lc3), dipilih(lc3)], ["15", "11 + 4 = 15", "+", ["15"]], "luar batang terapan: Kira 15 = 11 + 4 (batang lebih panjang: tambah); pilihan kedua");
    sama(kal(di("luar-batang-terapan", 4)), "15 − 4 = 11", "luar batang terapan: periksa 15 − 4 = 11");

    // Metode luar: Pilih Operasi.
    const lo = di("luar-operasi", 3);
    const TAMBAH = ["digabung", "dapat lagi", "semua dihitung"];
    const KURANG = ["diberikan", "dimakan", "hilang", "tersisa", "selisih"];
    const kartuOp = (objs, awal) => objs.filter((o) => o.t === "teks" && new RegExp(`^${awal}\\d-t0$`).test(o.id));
    sama(kartuOp(lo, "ct").map((o) => o.isi), TAMBAH, "luar operasi: kartu kata kunci tambah");
    sama(kartuOp(lo, "ck").map((o) => o.isi), KURANG, "luar operasi: kartu kata kunci kurang");
    cek(kartuOp(lo, "ct").every((o) => o.x < 150) && kartuOp(lo, "ck").every((o) => o.x > 150), "luar operasi: kartu tambah di wadah kiri, kartu kurang di wadah kanan");
    sama([isiTeks(lo, "bh0"), isiTeks(lo, "bh1")], ["tambah (+)", "kurang (−)"], "luar operasi: wadah tambah dan wadah kurang");
    const lt0 = di("luar-operasi-terapan", 0);
    sama([banyak(lt0, "a"), banyak(lt0, "b"), jum(lt0, "a", "b"), isiTeks(lt0, "cm")], [8, 5, 13, `dimakan: ${banyak(lt0, "b")}`], "luar operasi terapan: 13 mangga, 5 dimakan");
    const lt1 = di("luar-operasi-terapan", 1);
    sama(pilihan(lt1).map((c) => c.t), ["tambah (+)", "kurang (−)"], "luar operasi terapan: pilihan tambah atau kurang");
    const lt2 = di("luar-operasi-terapan", 2);
    sama([dipilih(lt2), kal(lt2), op(lt2), sorotId(lt2, /^eb\d+$/).length], [["kurang (−)"], "13 − 5 = 8", "−", 5], "luar operasi terapan: memakan memilih kurang; 13 − 5 = 8");
    adaKata("luar-operasi-terapan", /memakan/);
    const lt3 = di("luar-operasi-terapan", 3);
    sama([banyak(lt3, "a"), banyak(lt3, "b"), jum(lt3, "a", "b"), pilihan(lt3).map((c) => c.t)], [9, 8, 17, ["tambah (+)", "kurang (−)"]], "luar operasi terapan: 9 stiker dan 8 stiker lagi (17)");
    const lt4 = di("luar-operasi-terapan", 4);
    sama([dipilih(lt4), kal(lt4), op(lt4)], [["tambah (+)"], "9 + 8 = 17", "+"], "luar operasi terapan: dapat lagi memilih tambah; 9 + 8 = 17");
    sama(U.adegan[U.adegan.length - 1].ketukan.length >= 4, true, "luar ringkas: ringkasan tiga metode");
  }

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
  const DAFTAR = ["Kata kunci soal cerita", "Empat langkah penyelesaian", "Soal cerita yang lebih seru"];
  cek(/Halo anak-anak/.test(sap.ketukan[0].suara) && /Kata kunci soal cerita/i.test(L.teksTerlihat(akhirAdegan(sap, 1)).join(" | ")), "sapaan materi: tiga hal yang dipelajari tampil");
  sama(L.teksTerlihat(akhirAdegan(sap, 1)).filter((t) => DAFTAR.includes(t)), DAFTAR, "sapaan materi: daftar tiga hal");
  cek(!/\d/.test(sap.ketukan[1].suara) && !/\d/.test(DAFTAR.join(" ")), "sapaan materi: tanpa angka");
  const sapLuar = adegan(U, "sapaan");
  cek(/cara lain/i.test(L.teksTerlihat(akhirAdegan(sapLuar, 1)).join(" | ")) && /metode-luar|Metode luar/.test(sapLuar.sumber), "sapaan metode luar: pengumuman cara lain");
  const sumberRingkas = existsSync(new URL("../src/data/kelas2-bab2-ringkas.json", import.meta.url)) ? JSON.parse(readFileSync(new URL("../src/data/kelas2-bab2-ringkas.json", import.meta.url), "utf8")).subBab?.C : null;
  const sementara = new URL("../.tmp-k2b2s/C.json", import.meta.url);
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
    // Isi tabel dihitung ulang dari adegan materi: tanda yang dipilih, hasil, dan tanda untuk memeriksa (operasi lawan).
    sama(T.kolom, ["Tanda", "Hasil", "Cek"], "tabel susun: kolom tanda, hasil, cek");
    const ex = (id, ke, eid = "ex") => RE_HITUNG.exec(isiTeks(akhirAdegan(adegan(M_VIDEO, id), ke), eid));
    const nama = (op) => (op === "+" ? "tambah" : "kurang");
    const lawan = (op) => (op === "+" ? "kurang" : "tambah");
    const burung = akhirAdegan(adegan(M_VIDEO, "burung-dahan"), 1);
    const jmlBurung = banyak(burung, "a") + banyak(burung, "b");
    const donat = ex("donat-solusi", 2);
    const jeruk = ex("jeruk-awal", 4);
    const boneka = ex("tiga-boneka", 3, "xk");
    const baris = [
      ["Burung", "tambah", String(jmlBurung), "kurang"],
      ["Donat", nama(donat[2]), donat[4], lawan(donat[2])],
      ["Jeruk awal", nama(jeruk[2]), jeruk[4], lawan(jeruk[2])],
      ["Boneka", nama(boneka[2]), boneka[4], lawan(boneka[2])],
    ];
    cek(T.baris.length === baris.length, "tabel susun: satu baris untuk tiap cerita");
    baris.forEach(([label, tanda, hasil, cekTanda]) => {
      const b = T.baris.find((x) => x.label === label);
      cek(!!b && b.sel[0] === tanda && b.sel[1] === hasil && b.sel[2] === cekTanda, `tabel susun: baris "${label}" (tanda ${tanda}, hasil ${hasil}, cek ${cekTanda}) dihitung ulang`);
    });
    cek(T.baris.every((b) => b.sel.every((s) => s.length <= 8)), "tabel susun: sel pendek supaya margin teks >= 5 px di 405 px");
    cek(T.baris.every((b) => Number(b.sel[1]) <= 20), "tabel susun: hasil paling besar dua puluh");
    const KATA_LARANG = /buku|halaman|(?<!kata )kunci|kerja kelompok|berkelompok|\bteman|kawan|kelas\b|kertas|pensil|\bbawa\b|menggambar|menulis di|depan kelas|luas|keliling|di rumah|survei|karet gelang|uang tabungan|di sekitar|\bpaman\b|\btika\b|\blili\b|loker|ibu guru/i;
    cek(!KATA_LARANG.test(JSON.stringify({ p: A.petaSusun, t: A.tabelSusun })), "peta dan tabel susun: tanpa kata terlarang dan tanpa kelompok, teman, kelas, buku, kertas, pensil");
    cek(peta.every((s) => ![...s.teks, ...(s.ikon ?? "")].some((c) => c.codePointAt(0) > 0x1fa95)), "peta susun: emoji paling tinggi Emoji 12");
  } else cek(false, "peta dan tabel susun: .tmp-k2b2s/C.json atau kelas2-bab2-ringkas.json subBab.C.petaSusun ada");
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k2b2C-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k2b2C-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k2b2C sendiri (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d), `${v.id}/${a.id}: emoji gambar paling tinggi Emoji 12`);
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k2b2c.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|naskah-k1b/.test(pembungkus) && /VIDEO_MATERI_K2B2C/.test(pembungkus) && /VIDEO_LUAR_K2B2C/.test(pembungkus) && /export function VideoK2B2C/.test(pembungkus) && /daftar-video-cerita/.test(pembungkus), "video-k2b2c.tsx: dua video dari mesin Story, tanpa naskah lama");
  cek(!/\r/.test(pembungkus), "video-k2b2c.tsx: akhir baris LF");
  const sendiri = readFileSync(new URL("uji-story-k2b2C.mjs", import.meta.url), "utf8");
  cek(!/\r/.test(sendiri), "uji-story-k2b2C.mjs: akhir baris LF");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit diputar)`);
}
console.log(`Pemeriksaan: ${stat.hitung} deret hitungan, ${jumlahNama} nama bilangan tampak sebagai angka, ${stat.kalimat} kalimat hitung, ${stat.benda} pemeriksaan benda, blok, tabel, garis, dan perbandingan`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);

