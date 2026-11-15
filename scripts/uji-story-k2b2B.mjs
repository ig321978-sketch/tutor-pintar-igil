// Uji Story Kelas 2 Bab 2 Sub-Bab B (Berbagai Cara Melakukan Pengurangan): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Video diputar bergaya guru: suara, teks terlihat, sumber, judul adegan, dan subjudul tanpa penyebutan buku (kata terlarang diperiksa pada adegan yang diputar).
// Memeriksa: pemicu kata, suara tanpa digit, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas, teks bertumpuk, pemisahan materi dan metode luar (nama metode hanya Indonesia),
// hanya bilangan sampai dua puluh (tanpa kali dan bagi; kalimat tambah dan kurang BOLEH), nama bilangan sepuluh sampai dua puluh yang diucapkan tampak sebagai angka,
// dan data di layar dihitung ulang dari gambar: jambu dan garis pasangan (selisih), jalur bilangan (lompatan bersambung, arah, banyak langkah, titik awal dan akhir, rumus),
// kubus satuan 10 x 10 dan batang puluhan 100 x 10 bersekat sepuluh ruas (nilai kiri tambah kanan sama dengan nilai awal, diberikan dan sisa sama dengan rumus), tabel nilai tempat tiga baris
// (satuan dan puluhan dikurangi, mengurai satu puluhan tanpa mengubah nilai), bagan pasangan bilangan (bagian tambah bagian sama dengan utuh), kapan perlu mengurai (satuan atas dan bawah),
// memeriksa dengan penjumlahan, keluarga bilangan, dan setiap kalimat hitung di suara ("N dikurangi M sama dengan K") dicocokkan dengan aritmetika dan dengan gambar adegannya,
// pilihan jawaban, aturan pemilik (belajar mandiri digital: tanpa kerja kelompok, survei teman, depan kelas, buku, menulis atau menggambar di buku, membawa benda nyata),
// peta dan tabel susun, emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k2b2B.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k2b2B-video.ts");
const U1 = await import("../src/components/modul/story/k2b2B-luar-1.ts");
const B = await import("../src/components/modul/story/k2b2B-bantu.ts");

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
const VIDEO = [V.VIDEO_MATERI_K2B2B, V.VIDEO_LUAR_K2B2B];
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
const M_VIDEO = V.VIDEO_MATERI_K2B2B;
const U = V.VIDEO_LUAR_K2B2B;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const NAMA_LUAR = /Menghitung Naik|Mengambil|Meminjam|metode luar|metode dari luar/i;
const NAMA_INGGRIS = /Counting Up|Counting On|Take Away|Regroup|Borrow|Subtraction|Base-ten|Number line|Number bond/i;
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M_VIDEO);
  const luar = teksVideo(U);
  cek(!NAMA_LUAR.test(materi), "video materi tidak memuat nama metode luar (Menghitung Naik, Mengambil, Meminjam)");
  for (const m of U1.NAMA_METODE_ID) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE_ID, ["Menghitung Naik", "Mengambil", "Meminjam"], "nama Indonesia metode luar");
  cek(!NAMA_INGGRIS.test(materi) && !NAMA_INGGRIS.test(luar), "nama metode hanya bahasa Indonesia (tanpa Counting Up, Take Away, Regroup Borrow)");
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
  cek(M_VIDEO.id === "k2b2B-materi" && U.id === "k2b2B-luar", "id video k2b2B-materi dan k2b2B-luar");
  cek(U.judul.endsWith(": Metode dari Luar") && !/menurut/i.test(M_VIDEO.judul), "judul video: materi tanpa 'menurut', luar berakhir ': Metode dari Luar'");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,selisih-jambu,pasangkan-jambu,arti-kurang,mundur-besar,mundur-kecil,papan-ambil,tabel-kurang,pasangan-bilangan,tidak-cukup,urai-papan,urai-tabel,kapan-urai,periksa-jumlah,keluarga-bilangan,latihan-satu,latihan-dua,latihan-tiga,latihan-empat,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-naik,luar-naik-terapan,luar-ambil,luar-ambil-terapan,luar-pinjam,luar-pinjam-terapan,luar-ringkas", "urutan adegan metode luar");
  cek(M_VIDEO.adegan[0].id === "sapaan" && U.adegan[0].id === "sapaan", "tiap video dibuka adegan sapaan");
  cek(M_VIDEO.adegan.filter((a) => /^latihan-/.test(a.id)).length === 4 && M_VIDEO.adegan[M_VIDEO.adegan.length - 1].id === "penutup", "video materi: Latihan 1 sampai 4 lalu penutup");
  cek(U.adegan[1].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  for (const kata of ["Latihan", "Igil", "Malosi", "Halim", "Kira", "Wei", "Upe", "selisih", "jalur bilangan", "tabel nilai tempat", "pasangan bilangan", "mengurai", "puluhan", "satuan", "dikurangi", "ditambah", "memeriksa", "jambu", "kubus", "batang", "tidak cukup", "paling mudah"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
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
const NAMA_METODE_SUARA = /menghitung naik|mengambil|meminjam/gi;
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

/* ------------------------------ Hitungan, benda, jalur, dan bagan dihitung ulang dari gambar ------------------------------ */
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
const di = (id, ke) => {
  const a = adegan(M_VIDEO, id) ?? adegan(U, id);
  if (!a) throw new Error(`adegan ${id} tidak ada`);
  return akhirAdegan(a, ke);
};
const stat = { hitung: 0, aritmetika: 0, benda: 0, jalur: 0, kalimat: 0 };
const baca = (t) => {
  const m = /^(\d+) ([−+]) (\d+) = (\d+)$/.exec(t ?? "");
  return m ? { a: +m[1], op: m[2], b: +m[3], c: +m[4] } : null;
};
const benar = (r) => (r.op === "−" ? r.a - r.b === r.c : r.a + r.b === r.c);
const noId = (o, p) => Number(o.id.slice(p.length));
const urutId = (objs, pola, p) => objs.filter((o) => pola.test(o.id)).sort((m, n) => noId(m, p) - noId(n, p));
const tengah = (a) => a.ketukan.length - 1;

{
  // 0) Semua kalimat hitung yang tampak di gambar (a − b = c atau a + b = c) benar secara aritmetika.
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((kt, i) => {
        for (const t of L.teksTerlihat(akhirAdegan(a, i))) {
          const r = baca(t);
          if (r) {
            stat.aritmetika += 1;
            cek(benar(r), `${v.id}/${a.id}#${i + 1}: kalimat hitung di gambar benar ("${t}")`);
            cek(r.a <= 20 && r.b <= 20 && r.c <= 20, `${v.id}/${a.id}#${i + 1}: semua bilangan kalimat hitung paling besar dua puluh`);
          } else if (/^\d+ [−+] \d+ = /.test(t ?? "") && !/\?$/.test(t)) cek(false, `${v.id}/${a.id}#${i + 1}: bentuk kalimat hitung tidak dikenal ("${t}")`);
        }
      });
    }
  }
  // 1) Kalimat hitung di suara ("N dikurangi M sama dengan K", "N ditambah M sama dengan K") benar dan sama dengan kalimat di gambar adegan itu.
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      const tampak = new Set();
      a.ketukan.forEach((kt, i) => {
        for (let p = 0; p < L.kataDari(kt.suara).length; p += 1) for (const o of L.keadaanStory(a, i, p)) if (o.t === "teks" && o.isi) tampak.add(o.isi);
      });
      a.ketukan.forEach((kt, i) => {
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
          const nilai = op === "−" ? x[0] - y[0] : x[0] + y[0];
          stat.kalimat += 1;
          cek(nilai === z[0], `${v.id}/${a.id}#${i + 1}: kalimat hitung di suara benar (${x[0]} ${op} ${y[0]} = ${z[0]})`);
          cek(tampak.has(`${x[0]} ${op} ${y[0]} = ${z[0]}`), `${v.id}/${a.id}#${i + 1}: kalimat "${x[0]} ${op} ${y[0]} = ${z[0]}" di suara tampak di gambar`);
        }
      });
    }
  }
  // 2) Angka hitungan di atas jambu: nama bilangan di suara memunculkan angka yang sama pada kata yang tepat.
  {
    const a = adegan(M_VIDEO, "pasangkan-jambu");
    const kt = a.ketukan[1];
    const objs = akhirAdegan(a, 1);
    const hit = urutId(objs, /^jn\d+$/, "jn");
    cek(hit.length === 12 && hit.every((o, q) => o.isi === String(q + 1)), "pasangkan: angka hitungan 1 sampai 12 berurutan");
    const jm = urutId(objs, /^jm\d+$/, "jm");
    cek(hit.every((o, q) => Math.abs(o.x - jm[q].x) < 0.01 && o.y < jm[q].y && jm[q].y - o.y < 16), "pasangkan: angka hitungan tepat di atas jambunya");
    const t = tokoh(kt.suara);
    kt.aksi.forEach((ak, q) => {
      const p = L.posisiKata(kt.suara, ak.at);
      cek(t[p] === NAMA[q + 1].split(" ")[0], `pasangkan: kata ke-${p} ("${t[p]}") memunculkan angka ${q + 1}`);
      stat.hitung += 1;
    });
  }
  // 3) Jambu dan pasangannya: dua baris, garis pasangan satu-satu, sisa tak berpasangan = selisih = hasil pengurangan.
  {
    const s1 = di("selisih-jambu", 1);
    const cacahJ = (objs, p) => objs.filter((o) => o.t === "bulat" && new RegExp(`^j${p}\\d+$`).test(o.id)).length;
    sama([cacahJ(s1, "m"), cacahJ(s1, "k"), isiTeks(s1, "lm"), isiTeks(s1, "lk")], [12, 18, "Malosi: 12", "Kira: 18"], "selisih jambu: 12 jambu Malosi dan 18 jambu Kira sama dengan label");
    const p = di("pasangkan-jambu", tengah(adegan(M_VIDEO, "pasangkan-jambu")));
    const jm = urutId(p, /^jm\d+$/, "jm");
    const jk = urutId(p, /^jk\d+$/, "jk");
    const ps = urutId(p, /^ps\d+$/, "ps");
    sama([jm.length, jk.length, ps.length], [12, 18, 12], "pasangkan: 12 jambu, 18 jambu, 12 garis pasangan");
    cek(ps.every((g, q) => g.x === jm[q].x && g.x === jk[q].x && (g.x2 ?? 0) === 0 && g.y >= jm[q].y && g.y + g.y2 <= jk[q].y && jm[q].y < jk[q].y), "pasangkan: tiap garis menghubungkan jambu ke-i baris atas dan jambu ke-i baris bawah");
    cek(jm.every((o, q) => jk[q] && Math.abs(o.x - jk[q].x) < 0.01), "pasangkan: jambu kedua baris sejajar kolomnya");
    const tanpa = jk.filter((o) => !ps.some((g) => g.x === o.x)).length;
    const r = baca(isiTeks(p, "rm"));
    const sel = isiTeks(p, "sel");
    sama([tanpa, sel, r.a, r.b, r.c], [6, "selisih: 6", jk.length, jm.length, tanpa], "pasangkan: jambu tak berpasangan = selisih = 18 − 12 = 6");
    stat.benda += 4;
  }
  // 4) Arti tanda kurang: bilangan besar, kecil, dan hasil.
  {
    const a4 = di("arti-kurang", 1);
    const r = baca(isiTeks(a4, "rm"));
    const n = (id) => Number(/^\d+/.exec(isiTeks(a4, id))[0]);
    sama([n("ab-t0"), n("ac-t0"), n("ah-t0"), r.a, r.b, r.c], [18, 12, 6, 18, 12, 6], "arti kurang: bilangan besar 18, bilangan kecil 12, hasil 6 sama dengan rumus");
    cek(n("ab-t0") > n("ac-t0") && n("ah-t0") < n("ab-t0"), "arti kurang: bilangan besar lebih besar, hasil lebih kecil dari bilangan besar");
    stat.benda += 2;
  }
  // 5) Jalur bilangan: lompatan bersambung, arah, banyak langkah, titik awal dan akhir, rumus.
  const xKeNilai = (x) => (x - 14) / 13.5;
  const jalur = (objs) => {
    const hop = urutId(objs, /^gb-h\d+$/, "gb-h").map((o) => ({ dari: xKeNilai(o.x), ke: xKeNilai(o.x + o.x2), id: o.id, y: o.y, y2: o.y2 }));
    const aw = ketemu(objs, "gb-awal");
    const ak = ketemu(objs, "gb-akhir");
    return { hop, awal: aw ? xKeNilai(aw.x) : null, akhir: ak ? xKeNilai(ak.x) : null };
  };
  const lurus = (n) => Math.abs(n - Math.round(n)) < 1e-6;
  const periksaJalur = (nama, objs, arah, langkahDiharap, a, b, c) => {
    const j = jalur(objs);
    const bulat = j.hop.every((h) => lurus(h.dari) && lurus(h.ke)) && lurus(j.awal) && lurus(j.akhir);
    cek(bulat, `${nama}: lompatan dan penanda tepat di bilangan bulat jalur`);
    const langkahH = j.hop.map((h) => Math.round(Math.abs(h.ke - h.dari)));
    sama(langkahH, langkahDiharap, `${nama}: banyak langkah tiap lompatan`);
    cek(j.hop.every((h) => h.y === j.hop[0].y && h.y2 === 0), `${nama}: lompatan sejajar jalur`);
    cek(j.hop.every((h, q) => q === 0 || Math.abs(h.dari - j.hop[q - 1].ke) < 1e-6), `${nama}: lompatan bersambung`);
    cek(j.hop.every((h) => (arah === "mundur" ? h.ke < h.dari : h.ke > h.dari)), `${nama}: semua lompatan ${arah}`);
    const awalHop = Math.round(j.hop[0].dari);
    const akhirHop = Math.round(j.hop[j.hop.length - 1].ke);
    const jumlah = langkahH.reduce((s, n) => s + n, 0);
    cek(Math.round(j.awal) === awalHop && Math.round(j.akhir) === akhirHop, `${nama}: penanda awal dan akhir di ujung lompatan`);
    if (arah === "mundur") sama([awalHop, jumlah, akhirHop], [a, b, c], `${nama}: mundur dari ${a} sebanyak ${b} sampai ${c}`);
    else sama([akhirHop, awalHop, jumlah], [a, b, c], `${nama}: naik dari ${b} sampai ${a}, banyak langkah ${c}`);
    const r = baca(isiTeks(objs, "rm"));
    sama([r?.a, r?.b, r?.c], [a, b, c], `${nama}: rumus sama dengan jalur`);
    for (const h of urutId(objs, /^gb-s\d+$/, "gb-s")) {
      const q = noId(h, "gb-s");
      cek(h.isi === String(arah === "naik" && langkahH.every((n) => n === 1) ? q + 1 : langkahH[q]), `${nama}: angka langkah ${h.id} (${h.isi}) sama dengan lompatannya`);
    }
    stat.jalur += 1;
  };
  periksaJalur("mundur besar", di("mundur-besar", 4), "mundur", [10, 2], 18, 12, 6);
  periksaJalur("mundur kecil", di("mundur-kecil", 3), "mundur", [1, 1, 1, 1], 15, 4, 11);
  periksaJalur("latihan satu", di("latihan-satu", 2), "mundur", [1, 1, 1, 1], 16, 4, 12);
  periksaJalur("luar naik", di("luar-naik", 4), "naik", [1, 1, 1, 1, 1, 1], 18, 12, 6);
  periksaJalur("luar naik terapan 15 − 8", di("luar-naik-terapan", 3), "naik", [2, 5], 15, 8, 7);
  periksaJalur("luar naik terapan 11 − 6", di("luar-naik-terapan", 5), "naik", [5], 11, 6, 5);
  {
    // Hitungan jalur: lompatan muncul tepat saat nama bilangan tujuannya diucapkan.
    for (const [id, ke, nama] of [["mundur-kecil", 1, "mundur kecil"], ["luar-naik", 2, "luar naik"]]) {
      const a = adegan(M_VIDEO, id) ?? adegan(U, id);
      const kt = a.ketukan[ke];
      const t = tokoh(kt.suara);
      let banyak = 0;
      for (const ak of kt.aksi) {
        const o = [].concat(ak.tambah ?? []).find((x) => /^gb-h\d+$/.test(x.id));
        if (!o) continue;
        const tujuan = Math.round(xKeNilai(o.x + o.x2));
        const p = L.posisiKata(kt.suara, ak.at);
        cek(t[p] === NAMA[tujuan].split(" ")[0], `${nama}: lompatan ${o.id} muncul saat "${NAMA[tujuan]}" diucapkan (kata "${t[p]}")`);
        banyak += 1;
        stat.hitung += 1;
      }
      cek(banyak >= 4, `${nama}: ada lompatan pada tiap nama bilangan`);
    }
    const a = adegan(U, "luar-naik");
    const kt = a.ketukan[3];
    const t = tokoh(kt.suara);
    kt.aksi.forEach((ak, q) => {
      const p = L.posisiKata(kt.suara, ak.at);
      cek(t[p] === NAMA[q + 1].split(" ")[0], `luar naik: angka langkah ${q + 1} muncul saat nama bilangannya diucapkan (kata "${t[p]}")`);
      stat.hitung += 1;
    });
  }
  // 6) Papan kubus dan batang: ukuran, sekat, nilai kiri dan kanan.
  const papan = (objs) => {
    const cnt = (f) => [objs.filter((o) => o.t === "kotak" && /^bp[a-z]\d+$/.test(o.id) && f(o)).length, objs.filter((o) => o.t === "kotak" && /^bs[a-z]\d+$/.test(o.id) && f(o)).length];
    return { kiri: cnt((o) => o.y < 100), kanan: cnt((o) => o.y >= 106) };
  };
  const nilaiP = ([b, s]) => 10 * b + s;
  const bentukPapan = (nama, objs) => {
    for (const o of objs.filter((x) => x.t === "kotak" && /^bs[a-z]\d+$/.test(x.id))) cek(o.w === 10 && o.h === 10, `${nama}: kubus ${o.id} berukuran 10 x 10`);
    for (const o of objs.filter((x) => x.t === "kotak" && /^bp[a-z]\d+$/.test(x.id))) {
      cek(o.w === 100 && o.h === 10, `${nama}: batang ${o.id} berukuran 100 x 10`);
      const sekat = ketemu(objs, o.id.replace("bp", "bq"));
      cek(sekat && sekat.x === o.x && sekat.y === o.y && (sekat.d.match(/M/g) ?? []).length === 9, `${nama}: batang ${o.id} bersekat sepuluh ruas dan sekatnya ikut`);
    }
    const pos = objs.filter((x) => /^bs[a-z]\d+$/.test(x.id)).map((x) => `${x.x},${x.y}`);
    cek(new Set(pos).size === pos.length, `${nama}: tidak ada dua kubus di tempat yang sama`);
    stat.benda += 2;
  };
  const periksaPapan = (nama, awal, akhir, objsAwal, objsAkhir, kiri, kanan, rm) => {
    bentukPapan(`${nama} (awal)`, objsAwal);
    bentukPapan(`${nama} (akhir)`, objsAkhir);
    sama(papan(objsAwal).kiri, awal.kiri, `${nama}: isi papan awal`);
    sama(nilaiP(papan(objsAwal).kiri), awal.nilai, `${nama}: nilai papan awal`);
    sama(isiTeks(objsAwal, "n-a"), String(awal.nilai), `${nama}: label nilai awal`);
    sama([papan(objsAkhir).kiri, papan(objsAkhir).kanan], [kiri, kanan], `${nama}: papan akhir (milik tokoh dan kotak penerima)`);
    cek(nilaiP(kiri) + nilaiP(kanan) === awal.nilai, `${nama}: nilai kiri tambah kanan sama dengan nilai awal (${nilaiP(kiri)} + ${nilaiP(kanan)} = ${awal.nilai})`);
    const r = baca(isiTeks(objsAkhir, "rm"));
    sama([r?.a, r?.b, r?.c], [awal.nilai, nilaiP(kanan), nilaiP(kiri)], `${nama}: rumus sama dengan papan (diberikan ${nilaiP(kanan)}, sisa ${nilaiP(kiri)})`);
    if (rm !== undefined) sama(isiTeks(objsAkhir, "n-a"), String(nilaiP(kiri)), `${nama}: label sisa sama dengan papan`);
  };
  {
    const pa = adegan(M_VIDEO, "papan-ambil");
    periksaPapan("papan ambil 18 − 12", { kiri: [1, 8], nilai: 18 }, null, di("papan-ambil", 0), akhirAdegan(pa), [0, 6], [1, 2], 1);
    const tc = adegan(M_VIDEO, "tidak-cukup");
    const tcAwal = akhirAdegan(tc, 0);
    sama([papan(tcAwal).kiri, isiTeks(tcAwal, "n-a"), isiTeks(tcAwal, "rm")], [[1, 2], "12", "12 − 8 = ?"], "tidak cukup: 1 batang dan 2 kubus, nilai 12, soal 12 − 8");
    const tcAkhir = akhirAdegan(tc);
    const m = /^(\d+) kurang dari (\d+)$/.exec(isiTeks(tcAkhir, "tc-t0"));
    cek(m && Number(m[1]) === papan(tcAwal).kiri[1] && Number(m[2]) === 8 && Number(m[1]) < Number(m[2]), "tidak cukup: kartu '2 kurang dari 8' cocok dengan satuan di papan (2 kubus) dan bilangan yang diberikan (8)");
    stat.benda += 3;
    const ua = adegan(M_VIDEO, "urai-papan");
    const u0 = akhirAdegan(ua, 0);
    bentukPapan("urai papan (dibuka)", u0);
    sama([papan(u0).kiri, papan(u0).kanan, isiTeks(u0, "n-a")], [[0, 12], [0, 0], "12"], "urai papan: satu batang dibuka menjadi sepuluh kubus, 12 kubus lepas, nilai tetap 12");
    const u1 = akhirAdegan(ua, 1);
    const m1 = baca(isiTeks(u1, "m1"));
    sama([m1?.a, m1?.b, m1?.c], [2, 10, 12], "urai papan: 2 + 10 = 12 (satuan semula 2, sepuluh kubus dari batang)");
    periksaPapan("urai papan 12 − 8", { kiri: [1, 2], nilai: 12 }, null, di("tidak-cukup", 0), akhirAdegan(ua), [0, 4], [0, 8], 1);
    const l2 = adegan(M_VIDEO, "latihan-dua");
    const l20 = akhirAdegan(l2, 0);
    sama([papan(l20).kiri, isiTeks(l20, "n-a"), isiTeks(l20, "rm")], [[1, 4], "14", "14 − 9 = ?"], "latihan dua: 1 batang 4 kubus, nilai 14, soal 14 − 9");
    const l22 = akhirAdegan(l2, 2);
    sama(papan(l22).kiri, [0, 14], "latihan dua: batang dibuka, 14 kubus lepas");
    const pil = akhirAdegan(l2, 1).filter((o) => /^c\d-t$/.test(o.id)).map((o) => o.isi);
    const benarIdx = papan(l20).kiri[1] < 9 ? pil.findIndex((t) => /^Urai/.test(t)) : pil.findIndex((t) => /^Langsung/.test(t));
    sama([pil, benarIdx, L.keadaanStory(l2, 2, 1).find((o) => o.id === `c${benarIdx + 1}-k`)?.sorot], [["Langsung kurangi", "Urai satu puluhan"], 1, true], "latihan dua: satuan 4 kurang dari 9, jawaban benar 'Urai satu puluhan' dipilih");
    periksaPapan("latihan dua 14 − 9", { kiri: [1, 4], nilai: 14 }, null, l20, akhirAdegan(l2), [0, 5], [0, 9], 1);
    const lp = adegan(U, "luar-pinjam");
    const lp0 = akhirAdegan(lp, 0);
    sama([papan(lp0).kiri, isiTeks(lp0, "n-a"), isiTeks(lp0, "bk-t0")], [[1, 3], "13", "1 puluhan jadi 10 satuan"], "luar pinjam: 1 batang 3 kubus, nilai 13, keterangan 1 puluhan jadi 10 satuan");
    const lp3 = akhirAdegan(lp, 3);
    sama([papan(lp3).kiri, papan(lp3).kanan], [[0, 13], [0, 0]], "luar pinjam: batang dibuka, 13 kubus lepas");
    const m3 = /^(\d+) kurang dari (\d+)$/.exec(isiTeks(akhirAdegan(lp, 2), "tc-t0"));
    cek(m3 && Number(m3[1]) === papan(lp0).kiri[1] && Number(m3[1]) < Number(m3[2]), "luar pinjam: 3 kurang dari 5 cocok dengan 3 kubus satuan");
    periksaPapan("luar pinjam 13 − 5", { kiri: [1, 3], nilai: 13 }, null, lp0, akhirAdegan(lp), [0, 8], [0, 5], 1);
    const lq = adegan(U, "luar-pinjam-terapan");
    const lq0 = akhirAdegan(lq, 0);
    sama([papan(lq0).kiri, isiTeks(lq0, "n-a"), isiTeks(lq0, "rm")], [[1, 6], "16", "16 − 9 = ?"], "luar pinjam terapan: 1 batang 6 kubus, nilai 16, soal 16 − 9");
    sama(papan(akhirAdegan(lq, 2)).kiri, [0, 16], "luar pinjam terapan: batang dibuka, 16 kubus lepas");
    const lqc = akhirAdegan(lq, 1).filter((o) => /^c\d-t$/.test(o.id)).map((o) => o.isi);
    sama([lqc, L.keadaanStory(lq, 2, 1).find((o) => o.id === "c1-k")?.sorot], [["Satu puluhan", "Satu satuan"], true], "luar pinjam terapan: jawaban 'Satu puluhan' dipilih (6 kurang dari 9)");
    periksaPapan("luar pinjam terapan 16 − 9", { kiri: [1, 6], nilai: 16 }, null, lq0, akhirAdegan(lq), [0, 7], [0, 9], 1);
  }
  // 7) Jambu di kisi dan kotak penerima.
  const kisiJ = (objs) => ({ kiri: objs.filter((o) => o.t === "bulat" && /^ja\d+$/.test(o.id) && o.y < 100).length, kanan: objs.filter((o) => o.t === "bulat" && /^ja\d+$/.test(o.id) && o.y >= 106).length });
  {
    const a1 = adegan(U, "luar-ambil");
    const x0 = akhirAdegan(a1, 1);
    sama([kisiJ(x0), isiTeks(x0, "n-a"), isiTeks(x0, "rm")], [{ kiri: 15, kanan: 0 }, "15", "15 − 4 = ?"], "luar ambil: 15 jambu, nilai 15, soal 15 − 4");
    const x1 = akhirAdegan(a1);
    sama([kisiJ(x1), isiTeks(x1, "n-a"), isiTeks(x1, "rm")], [{ kiri: 11, kanan: 4 }, "11", "15 − 4 = 11"], "luar ambil: 4 jambu pindah, sisa 11");
    const t = tokoh(a1.ketukan[2].suara);
    a1.ketukan[2].aksi.forEach((ak, q) => {
      const p = L.posisiKata(a1.ketukan[2].suara, ak.at);
      cek(t[p] === NAMA[q + 1].split(" ")[0], `luar ambil: jambu pindah ke-${q + 1} saat nama bilangan diucapkan`);
      stat.hitung += 1;
    });
    const a2 = adegan(U, "luar-ambil-terapan");
    const y0 = akhirAdegan(a2, 0);
    sama([kisiJ(y0), isiTeks(y0, "n-a"), isiTeks(y0, "rm")], [{ kiri: 18, kanan: 0 }, "18", "18 − 6 = ?"], "luar ambil terapan: 18 jambu, soal 18 − 6");
    const y1 = akhirAdegan(a2, 2);
    const pil = akhirAdegan(a2, 1).filter((o) => /^c\d-t$/.test(o.id)).map((o) => o.isi);
    sama([kisiJ(y1), isiTeks(y1, "n-a"), pil], [{ kiri: 12, kanan: 6 }, "12", ["10", "12", "14"]], "luar ambil terapan: 6 jambu pindah, sisa 12 (pilihan 10, 12, 14)");
    sama(pil[1], String(18 - 6), "luar ambil terapan: kartu yang benar bernilai 12");
    sama(ketemu(akhirAdegan(a2), "rm").isi, "18 − 6 = 12", "luar ambil terapan: rumus akhir");
    const jj = [x0, x1, y0, y1].map((o) => o.filter((b) => /^ja\d+$/.test(b.id)).map((b) => `${b.x},${b.y}`));
    cek(jj.every((l) => new Set(l).size === l.length), "luar ambil: tidak ada dua jambu di tempat yang sama");
    stat.benda += 3;
  }
  // 8) Tabel nilai tempat tiga baris.
  const tabel = (objs) => {
    const v = (r, c) => Number(isiTeks(objs, `tk-r${r}c${c}`));
    return [0, 1, 2].map((r) => [v(r, 1), v(r, 2)]);
  };
  {
    const tk = adegan(M_VIDEO, "tabel-kurang");
    const t = akhirAdegan(tk);
    const [r0, r1, r2] = tabel(t);
    const nil = (r) => 10 * r[0] + r[1];
    const lab = (r) => Number(/\d+/.exec(isiTeks(t, `tk-r${r}c0`))[0]);
    sama([nil(r0), nil(r1), nil(r2), lab(0), lab(1)], [18, 12, 6, 18, 12], "tabel kurang: baris 18 (1 puluhan 8 satuan), 12 (1 puluhan 2 satuan), hasil 6; label sama dengan isi");
    cek(nil(r0) - nil(r1) === nil(r2), "tabel kurang: baris pertama dikurangi baris kedua sama dengan baris hasil");
    sama([r0[1] - r1[1], r0[0] - r1[0]], [r2[1], r2[0]], "tabel kurang: satuan dikurangi satuan dan puluhan dikurangi puluhan sama dengan hasil");
    sama([baca(isiTeks(t, "m1")), baca(isiTeks(t, "m2")), baca(isiTeks(t, "rm"))], [{ a: 8, op: "−", b: 2, c: 6 }, { a: 1, op: "−", b: 1, c: 0 }, { a: 18, op: "−", b: 12, c: 6 }], "tabel kurang: kalimat satuan, puluhan, dan hasil sama dengan sel tabel");
    const ut = adegan(M_VIDEO, "urai-tabel");
    const u0 = akhirAdegan(ut, 0);
    const u1 = akhirAdegan(ut, 1);
    const u4 = akhirAdegan(ut);
    const [s0, s1] = tabel(u0);
    sama([10 * s0[0] + s0[1], 10 * s1[0] + s1[1]], [12, 8], "urai tabel: baris 12 (1 puluhan 2 satuan) dan 8 (0 puluhan 8 satuan)");
    const [d0, d1] = tabel(u1);
    sama([d0, 10 * d0[0] + d0[1], d1], [[0, 12], 12, [0, 8]], "urai tabel: satu puluhan diurai, baris atas 0 puluhan 12 satuan, nilai tetap 12");
    cek(d0[1] === s0[1] + 10 && d0[0] === s0[0] - 1, "urai tabel: puluhan berkurang satu dan satuan bertambah sepuluh");
    cek(d0[1] >= d1[1] && s0[1] < s1[1], "urai tabel: satuan semula (2) kurang dari 8, setelah diurai (12) cukup");
    const [e0, e1, e2] = tabel(u4);
    sama([e0, e1, e2], [[0, 12], [0, 8], [0, 4]], "urai tabel: hasil 0 puluhan 4 satuan");
    cek(e0[1] - e1[1] === e2[1] && e0[0] - e1[0] === e2[0], "urai tabel: kurang satuan dan puluhan sama dengan hasil");
    sama([baca(isiTeks(u4, "m1")), baca(isiTeks(u4, "m2")), baca(isiTeks(u4, "rm"))], [{ a: 12, op: "−", b: 8, c: 4 }, { a: 0, op: "−", b: 0, c: 0 }, { a: 12, op: "−", b: 8, c: 4 }], "urai tabel: kalimat satuan, puluhan, dan hasil sama dengan sel tabel");
    stat.benda += 6;
  }
  // 9) Bagan pasangan bilangan.
  {
    const bag = (objs, h) => ["u", "a", "b"].map((s) => Number(isiTeks(objs, `${h}${s}-t`)));
    const kuatBagan = (nama, objs, h, utuh, bagianA, bagianB) => {
      const [u, a, b] = bag(objs, h);
      sama([u, a, b], [utuh, bagianA, bagianB], `${nama}: bagan ${h}`);
      cek(a + b === u, `${nama}: bagian ${a} dan ${b} membentuk ${u}`);
      const ku = ketemu(objs, `${h}u-k`);
      const ka = ketemu(objs, `${h}a-k`);
      const kb = ketemu(objs, `${h}b-k`);
      const ga = ketemu(objs, `${h}-ga`);
      const gb = ketemu(objs, `${h}-gb`);
      cek(ga.x === ku.x + ku.w / 2 && ga.y === ku.y + ku.h && ga.x + ga.x2 === ka.x + ka.w / 2 && ga.y + ga.y2 === ka.y, `${nama}: garis kiri menghubungkan kartu utuh dan bagian pertama`);
      cek(gb.x === ku.x + ku.w / 2 && gb.y === ku.y + ku.h && gb.x + gb.x2 === kb.x + kb.w / 2 && gb.y + gb.y2 === kb.y, `${nama}: garis kanan menghubungkan kartu utuh dan bagian kedua`);
      stat.benda += 2;
    };
    const p = adegan(M_VIDEO, "pasangan-bilangan");
    const pe = akhirAdegan(p);
    kuatBagan("pasangan 19 − 15", pe, "a", 19, 10, 9);
    kuatBagan("pasangan 19 − 15", pe, "b", 15, 10, 5);
    sama([baca(isiTeks(pe, "m1")), baca(isiTeks(pe, "m2")), baca(isiTeks(pe, "m3")), baca(isiTeks(pe, "rm"))], [{ a: 10, op: "−", b: 10, c: 0 }, { a: 9, op: "−", b: 5, c: 4 }, { a: 0, op: "+", b: 4, c: 4 }, { a: 19, op: "−", b: 15, c: 4 }], "pasangan 19 − 15: puluhan dikurangi puluhan, satuan dikurangi satuan, digabung, hasil");
    const l3 = adegan(M_VIDEO, "latihan-tiga");
    const le = akhirAdegan(l3);
    kuatBagan("latihan tiga 17 − 12", le, "a", 17, 10, 7);
    kuatBagan("latihan tiga 17 − 12", le, "b", 12, 10, 2);
    sama([baca(isiTeks(le, "m1")), baca(isiTeks(le, "m2")), baca(isiTeks(le, "m3")), baca(isiTeks(le, "rm"))], [{ a: 10, op: "−", b: 10, c: 0 }, { a: 7, op: "−", b: 2, c: 5 }, { a: 0, op: "+", b: 5, c: 5 }, { a: 17, op: "−", b: 12, c: 5 }], "latihan tiga 17 − 12: puluhan, satuan, gabungan, hasil");
    const pilih = akhirAdegan(l3, 1).filter((o) => /^c\d-t$/.test(o.id)).map((o) => o.isi);
    sama([pilih, L.keadaanStory(l3, 2, 1).find((o) => o.id === "c2-k")?.sorot], [["4", "5", "6"], true], "latihan tiga: pilihan 4, 5, 6; kartu 5 (7 − 2) dipilih");
  }
  // 10) Kapan perlu mengurai.
  {
    const a = adegan(M_VIDEO, "kapan-urai");
    const o = akhirAdegan(a);
    for (const id of ["kc0", "kc1", "kc2"]) {
      const r = /^(\d+) − (\d+)$/.exec(isiTeks(o, `${id}-t0`));
      const bandingkan = /^(\d+) (lebih|kurang) dari (\d+)$/.exec(isiTeks(o, `${id}-t1`));
      const tindakan = isiTeks(o, `${id}-t2`);
      const hasil = /^hasil: (\d+)$/.exec(isiTeks(o, `${id}-t3`));
      const A = Number(r[1]);
      const Bn = Number(r[2]);
      const atas = A % 10;
      const bawah = Bn % 10;
      cek(Number(bandingkan[1]) === atas && Number(bandingkan[3]) === bawah, `kapan urai ${id}: satuan atas ${atas} dan bawah ${bawah} sama dengan kartu`);
      cek((bandingkan[2] === "lebih") === atas > bawah, `kapan urai ${id}: perbandingan satuan benar`);
      cek(tindakan === (atas >= bawah ? "langsung kurangi" : "urai dulu"), `kapan urai ${id}: tindakan sesuai (${tindakan})`);
      cek(Number(hasil[1]) === A - Bn, `kapan urai ${id}: hasil ${A} − ${Bn} = ${hasil[1]}`);
    }
    sama(["kc0", "kc1", "kc2"].map((id) => isiTeks(o, `${id}-t0`)), ["18 − 12", "12 − 8", "20 − 6"], "kapan urai: tiga contoh 18 − 12, 12 − 8, 20 − 6");
    stat.benda += 3;
  }
  // 11) Memeriksa dengan penjumlahan dan keluarga bilangan.
  {
    const a = adegan(M_VIDEO, "periksa-jumlah");
    const o = akhirAdegan(a, 2);
    const jp = o.filter((b) => /^jp\d+$/.test(b.id)).length;
    const jq = o.filter((b) => /^jq\d+$/.test(b.id)).length;
    const r = baca(isiTeks(o, "rm"));
    const m1 = baca(isiTeks(o, "m1"));
    sama([jp, jq, m1?.a, m1?.b, m1?.c, r?.a, r?.b, r?.c], [4, 8, 4, 8, 12, 12, 8, 4], "periksa: 4 jambu hijau dan 8 jambu biru, 4 + 8 = 12, cocok dengan 12 − 8 = 4");
    const xs = o.filter((b) => /^j[pq]\d+$/.test(b.id)).map((b) => b.x);
    cek(new Set(xs).size === 12, "periksa: 12 jambu di tempat berbeda dalam satu baris");
    const o4 = akhirAdegan(a);
    const salah = baca(isiTeks(o4, "m2"));
    cek(salah.a === 5 && salah.c !== r.a && salah.a + salah.b === salah.c && r.c !== salah.a, "periksa: jawaban Upe (5) ditambah 8 tidak sama dengan 12, jadi belum benar");
    const kb = isiTeks(o4, "sal-t0");
    cek(kb === `${salah.c} bukan ${r.a}: hitung ulang`, "periksa: kartu 13 bukan 12 sama dengan hitungan");
    const k = akhirAdegan(adegan(M_VIDEO, "keluarga-bilangan"));
    sama(["fa", "fb", "fu"].map((id) => isiTeks(k, `${id}-t`)), ["6", "12", "18"], "keluarga: 6, 12, 18");
    const f = ["f1", "f2", "f3", "f4"].map((id) => baca(isiTeks(k, id)));
    cek(f.every((x) => x && [6, 12, 18].includes(x.a) && [6, 12, 18].includes(x.b) && [6, 12, 18].includes(x.c) && benar(x)), "keluarga: empat kalimat memakai tiga bilangan 6, 12, 18");
    sama(f.map((x) => `${x.a}${x.op}${x.b}=${x.c}`), ["6+12=18", "12+6=18", "18−6=12", "18−12=6"], "keluarga: dua penjumlahan dan dua pengurangan");
    const l1 = adegan(M_VIDEO, "latihan-satu");
    const pl = akhirAdegan(l1, 1).filter((b) => /^c\d-t$/.test(b.id)).map((b) => b.isi);
    sama([pl, ketemu(akhirAdegan(l1, 2), "c2-k")?.sorot, Number(pl[1])], [["11", "12", "13"], true, 16 - 4], "latihan satu: pilihan 11, 12, 13; kartu 12 (16 − 4) dipilih");
    const l4 = adegan(M_VIDEO, "latihan-empat");
    const o44 = akhirAdegan(l4);
    const r4 = baca(isiTeks(o44, "rm"));
    const pil4 = [1, 2, 3].map((i) => isiTeks(o44, `c${i}-t`));
    const diterima = pil4.filter((t) => { const q = baca(t); return q && q.op === "+" && q.c === r4.a && new Set([q.a, q.b]).size === 2 && [q.a, q.b].sort().join() === [r4.b, r4.c].sort().join(); });
    sama([diterima, ketemu(o44, "c2-k")?.sorot, pil4.every((t) => baca(t) && benar(baca(t)))], [["4 + 7 = 11"], true, true], "latihan empat: hanya satu penjumlahan yang memeriksa 11 − 7 = 4, dan itu yang dipilih");
    stat.benda += 6;
  }
  // Aturan pemilik: aplikasi belajar mandiri; tanpa instruksi kelompok, teman, kelas, atau buku.
  {
    const MANDIRI = /kerja kelompok|berkelompok|secara berkelompok|diskusi kelompok|sekelompok|kelompokmu|kelompok belajar|bersama kelompok|\bkelompok\b|tanya teman|survei|karet gelang|uang tabungan|\bpaman\b|\btika\b|\blili\b|\bteman\w*|\bkawan\w*|sekawan|depan kelas|bersama kelas|seluruh kelas|\bkelas\b|berpasangan dengan (teman|kawan)|bekerja berpasangan|secara berpasangan|bermain bersama|bertanya kepada|buat ceritamu|buku|menulis di|menuliskan di|tulis di|tuliskan di|menggambar|gambarlah|gambar sendiri|\bbawa(lah)?\b|membawa|dibawa|\bkertas\b|\bpensil\b|\bpulpen\b|\bspidol\b|ambil (benda|pensil|kelereng|bola|sedotan|balon)|tangan (kiri|kanan)|\bjari\b|menyuruh|suruh|jengkal|telapak|\bdepa\b|penggaris|\bkoin\b|di sekitar|di rumah|di kelas|centimeter|\bmeter\b|kakimu|tanganmu|badanmu|\braba\w*|\bmeraba|\btubuh|\blengan|lingkari|coret|guru kelas|orang tua|\bayah\b|\bibu guru|bapak guru|\bloker\b/i;
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

/* ------------------------------ Sapaan, peta susun, dan tabel susun ------------------------------ */
{
  const sap = adegan(M_VIDEO, "sapaan");
  const DAFTAR = ["Mencari selisih", "Tiga cara mengurangi", "Memeriksa hasil"];
  cek(/Halo anak-anak/.test(sap.ketukan[0].suara) && /Mencari selisih/i.test(L.teksTerlihat(akhirAdegan(sap, 1)).join(" | ")), "sapaan materi: tiga hal yang dipelajari tampil");
  sama(L.teksTerlihat(akhirAdegan(sap, 1)).filter((t) => DAFTAR.includes(t)), DAFTAR, "sapaan materi: daftar tiga hal");
  cek(!/\d/.test(sap.ketukan[1].suara) && !/\d/.test(DAFTAR.join(" ")), "sapaan materi: tanpa angka");
  const sapLuar = adegan(U, "sapaan");
  cek(/cara lain/i.test(L.teksTerlihat(akhirAdegan(sapLuar, 1)).join(" | ")) && /metode-luar|Metode luar/.test(sapLuar.sumber), "sapaan metode luar: pengumuman cara lain");
  let sumberRingkas = null;
  try {
    sumberRingkas = JSON.parse(readFileSync(new URL("../src/data/kelas2-bab2-ringkas.json", import.meta.url), "utf8")).subBab?.B;
  } catch {
    sumberRingkas = null;
  }
  const sementara = new URL("../.tmp-k2b2s/B.json", import.meta.url);
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
    // Isi tabel dihitung ulang dari gambar pada video materi: hasil pengurangan, perlu urai atau tidak, dan cara.
    sama(T.kolom, ["Hasil", "Urai?", "Cara"], "tabel susun: kolom hasil, urai, cara");
    const rm = (id, ke) => baca(isiTeks(di(id, ke), "rm"));
    const kc = akhirAdegan(adegan(M_VIDEO, "kapan-urai"));
    const hasilKapan = Number(/\d+/.exec(isiTeks(kc, "kc2-t3"))[0]);
    const sumber = [
      { r: rm("mundur-besar", 4), cara: "Jalur" },
      { r: rm("urai-tabel", 4), cara: "Tabel" },
      { r: rm("latihan-tiga", 3), cara: "Pasangan" },
      { r: { a: 20, b: 6, c: hasilKapan }, cara: "Tabel" },
    ];
    sama(T.baris.map((b) => b.label), sumber.map(({ r }) => `${r.a} kurang ${r.b}`), "tabel susun: baris soal sama dengan soal pada gambar materi (18, 12, 17, 20)");
    sumber.forEach(({ r, cara }, q) => {
      const urai = r.a % 10 < r.b % 10 ? "Ya" : "Tidak";
      sama(T.baris[q].sel, [String(r.c), urai, cara], `tabel susun: baris ${r.a} kurang ${r.b} (hasil ${r.c}, satuan ${r.a % 10} dan ${r.b % 10}) dihitung ulang dari gambar`);
      cek(r.a - r.b === r.c, `tabel susun: ${r.a} − ${r.b} = ${r.c}`);
    });
    cek(T.baris.every((b) => b.sel.every((s) => s.length <= 8)), "tabel susun: sel pendek supaya margin teks >= 5 px di 405 px");
    cek(new Set(T.baris.map((b) => b.label)).size === T.baris.length, "tabel susun: soal tiap baris berbeda");
    const KATA_LARANG = /buku|halaman|kunci|kerja kelompok|\bkelompok|\bteman|kawan|kelas\b|kertas|pensil|\bbawa\b|menggambar|menulis di|depan kelas|luas|keliling|di rumah|survei|karet gelang|uang tabungan|di sekitar|loker|ibu guru|bersusun|\bkali\b|dibagi/i;
    cek(!KATA_LARANG.test(JSON.stringify({ p: A.petaSusun, t: A.tabelSusun })), "peta dan tabel susun: tanpa kata terlarang dan tanpa kelompok, teman, kelas, buku, kertas, pensil");
    cek(peta.every((s) => ![...s.teks, ...(s.ikon ?? "")].some((c) => c.codePointAt(0) > 0x1fa95)), "peta susun: emoji paling tinggi Emoji 12");
  } else cek(false, "peta dan tabel susun: .tmp-k2b2s/B.json atau kelas2-bab2-ringkas.json subBab.B.petaSusun ada");
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k2b2B-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k2b2B-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k2b2B sendiri (${impor.join(", ")})`);
  }
  // Emoji dalam data teks gambar juga paling tinggi Emoji 12 (diperiksa pada gambar yang diputar).
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d), `${v.id}/${a.id}: emoji gambar paling tinggi Emoji 12`);
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k2b2b.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|naskah-k1b/.test(pembungkus) && /VIDEO_MATERI_K2B2B/.test(pembungkus) && /VIDEO_LUAR_K2B2B/.test(pembungkus) && /export function VideoK2B2B/.test(pembungkus) && /daftar-video-cerita/.test(pembungkus), "video-k2b2b.tsx: dua video dari mesin Story, tanpa naskah lama");
  cek(!/\r/.test(pembungkus), "video-k2b2b.tsx: akhir baris LF");
  const sendiri = readFileSync(new URL("uji-story-k2b2B.mjs", import.meta.url), "utf8");
  cek(!/\r/.test(sendiri), "uji-story-k2b2B.mjs: akhir baris LF");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit diputar)`);
}
console.log(`Pemeriksaan: ${stat.hitung} hitungan pada kata, ${jumlahNama} nama bilangan tampak sebagai angka, ${stat.aritmetika} kalimat hitung di gambar, ${stat.kalimat} kalimat hitung di suara, ${stat.jalur} jalur bilangan, ${stat.benda} pemeriksaan benda`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
