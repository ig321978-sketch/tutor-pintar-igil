// Uji Story Kelas 2 Bab 7 Sub-Bab B (Membandingkan Bilangan): dua video (materi kurikulum dan metode luar) dengan mesin animasi Story baru.
// Video diputar bergaya guru: suara, teks terlihat, sumber, judul adegan, dan subjudul tanpa penyebutan buku (kata terlarang diperiksa pada adegan yang diputar).
// Memeriksa: pemicu kata, suara tanpa digit, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas, teks bertumpuk, pemisahan materi dan metode luar (nama metode hanya Indonesia),
// nama bilangan (sampai seratus) yang diucapkan tampak sebagai angka, dan data di layar dihitung ulang dari STRUKTUR gambar (bukan kata kunci):
// garis bilangan (angka berurutan dengan jarak sama, penanda di bilangan yang dicocokkan dengan label, lompatan maju atau mundur: selisih dan arah dihitung dari letak penanda, hasil "58 maju 2 = 60");
// kantong puluhan dan kelereng satuan (jumlah batang kali sepuluh ditambah kelereng lepas sama dengan bilangan, keterangan puluhan dan satuan); banding dua bilangan (puluhan dulu, lalu satuan; tanda, kata, dan alasan dihitung ulang);
// kartu urut (urutan menurut letak kartu, paling besar dan paling kecil, urutan ke berapa); dua kartu angka (bilangan terbesar dan terkecil dari semua susunan); teka-teki Kira (55 dikurangi 43 dari batang dan kelereng yang dicoret);
// kartu pilihan tepat satu yang cocok dan yang disorot sama dengan hasil hitung; kalimat suara dihitung ulang (lebih besar dari, lebih kecil dari, sama dengan; lebihnya dan kurangnya; maju dan mundur; puluhan dan satuan);
// aturan pemilik (belajar mandiri digital: tanpa kerja kelompok, survei teman, depan kelas, buku, menulis atau menggambar di buku, membawa benda nyata);
// peta dan tabel susun (tabel dihitung ulang dari pasangan bilangan di gambar); emoji paling tinggi Emoji 12; dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k2b7B.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k2b7B-video.ts");
const U1 = await import("../src/components/modul/story/k2b7B-luar-1.ts");
const B = await import("../src/components/modul/story/k2b7B-bantu.ts");

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
const VIDEO = [V.VIDEO_MATERI_K2B7B, V.VIDEO_LUAR_K2B7B];
// Bilangan yang tampak di gambar. Jam digital "HH.MM" dipecah menjadi jam dan menit (dua bilangan), bukan satu bilangan besar.
const bilanganDari = (t) => {
  const out = [];
  for (const m of t.matchAll(/\d\d\.\d\d|\d+/g)) {
    if (m[0].includes(".")) out.push(...m[0].split(".").map((x) => String(Number(x))));
    else out.push(m[0]);
  }
  return out;
};
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
const M_VIDEO = V.VIDEO_MATERI_K2B7B;
const U = V.VIDEO_LUAR_K2B7B;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const NAMA_LUAR = /Banding Puluhan Dulu|Garis Bilangan 100|Tanda Banding|metode luar|metode dari luar/i;
const NAMA_INGGRIS = /Compare Tens First|Number Line to 100|Symbols < > =|Count to 100|Tens and Ones|Hundred Chart|Place value compare/i;
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M_VIDEO);
  const luar = teksVideo(U);
  cek(!NAMA_LUAR.test(materi), `video materi tidak memuat nama metode luar (Banding Puluhan Dulu, Garis Bilangan 100, Tanda Banding): ${NAMA_LUAR.exec(materi)?.index} ${materi.slice(Math.max(0, (NAMA_LUAR.exec(materi)?.index ?? 0) - 50), (NAMA_LUAR.exec(materi)?.index ?? 0) + 50)}`);
  for (const m of U1.NAMA_METODE_ID) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE_ID, ["Banding Puluhan Dulu", "Garis Bilangan 100", "Tanda Banding"], "nama Indonesia metode luar");
  cek(!NAMA_INGGRIS.test(materi) && !NAMA_INGGRIS.test(luar), "nama metode hanya bahasa Indonesia (tanpa Compare Tens First, Number Line to 100, Symbols < > =)");
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
  cek(M_VIDEO.id === "k2b7B-materi" && U.id === "k2b7B-luar", "id video k2b7B-materi dan k2b7B-luar");
  cek(U.judul.endsWith(": Metode dari Luar") && !/menurut/i.test(M_VIDEO.judul), "judul video: materi tanpa 'menurut', luar berakhir ': Metode dari Luar'");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,garis-bilangan,maju,mundur,teka-teki-lebih,teka-teki-kurang,banding-puluhan,puluhan-sama,tiga-kata,tanda-buaya,banding-garis,tiga-bilangan,urut-tiga,urut-lima,dua-kartu,teka-teki-kira,latihan-satu,latihan-dua,latihan-tiga,latihan-empat,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-puluhan,luar-puluhan-terapan,luar-garis,luar-garis-terapan,luar-tanda,luar-tanda-terapan,luar-ringkas", "urutan adegan metode luar");
  cek(M_VIDEO.adegan[0].id === "sapaan" && U.adegan[0].id === "sapaan", "tiap video dibuka adegan sapaan");
  cek(M_VIDEO.adegan.filter((a) => /^latihan-/.test(a.id)).length === 4 && M_VIDEO.adegan[M_VIDEO.adegan.length - 1].id === "penutup", "video materi: Latihan 1 sampai 4 lalu penutup");
  cek(U.adegan[1].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  for (const kata of ["Latihan", "Igil", "Malosi", "Halim", "Kira", "Wei", "Upe", "garis bilangan", "lebih besar dari", "lebih kecil dari", "sama dengan", "puluhan", "satuan", "kantong", "paling besar", "paling kecil", "maju", "mundur", "lebihnya", "kurangnya", "urutan", "kanan", "kiri"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  // Materi bilangan sampai seratus: tanpa kali, bagi, bersusun, satuan baku panjang, dan rumus.
  const BOCOR = /dikali|perkalian|kali|ribu|luas|keliling|rumus|volume|sentimeter|centimeter|cm|meter|penggaris|bersusun|×|÷/i;
  for (const v of [M_VIDEO, U]) {
    for (const a of v.adegan) cek(!BOCOR.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa kali, bersusun, satuan baku, atau rumus`);
    for (const a of v.adegan) for (const i of a.ketukan.keys()) for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) for (const b of bilanganDari(t)) cek(Number(b) <= 100, `${v.id}/${a.id}#${i + 1}: angka di gambar paling besar seratus ("${t}")`);
  }
  cek(totalKetukan >= 70 && M_VIDEO.adegan.reduce((t, ad) => t + ad.ketukan.length, 0) >= 70, `total ketukan cukup dalam (${totalKetukan}; materi ${M_VIDEO.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)})`);
  // Durasi materi diputar 8 sampai 13 menit (dua kata per detik, sapaan termasuk).
  const kataMateri = kataVideo(M_VIDEO);
  cek(kataMateri / 120 >= 8 && kataMateri / 120 <= 13, `durasi materi diputar 8 sampai 13 menit (${(kataMateri / 120).toFixed(1)} menit)`);
  cek(kataVideo(U) / 120 >= 3, `durasi video luar paling sedikit 3 menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
}

/* ------------------------------ Nama bilangan 10 sampai 100 yang diucapkan tampak sebagai angka ------------------------------ */
const NAMA = B.NAMA_BILANGAN;
const tokoh = (s) => {
  const w = s.toLowerCase().split(/\s+/).filter(Boolean);
  const out = w.map((x) => x.replace(/[^a-z]/g, ""));
  out.batas = new Set(w.map((x, i) => (/[,.;:!?]$/.test(x) ? i : -1)).filter((i) => i >= 0));
  return out;
};
/** Nama bilangan 0 sampai 100 yang dimulai pada token `p`: [nilai, panjang] atau null (nama dua kata didahulukan). */
const bacaAngka = (t, p) => {
  for (let n = 100; n >= 0; n -= 1) {
    const pc = NAMA[n].split(" ");
    if (pc.every((c, q) => t[p + q] === c && (q === pc.length - 1 || !t.batas.has(p + q)))) return [n, pc.length];
  }
  return null;
};
const NAMA_METODE_SUARA = /zzzz/gi;
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



/* ------------------------------ Data dihitung ulang dari STRUKTUR gambar ------------------------------ */
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
const adeganId = (id) => adegan(M_VIDEO, id) ?? adegan(U, id);
const stat = { garis: 0, penanda: 0, lompat: 0, kumpulan: 0, banding: 0, tanda: 0, kartuUrut: 0, kartuAngka: 0, kira: 0, pilihan: 0, suaraBanding: 0, suaraLebih: 0, suaraMaju: 0, suaraKet: 0, pasangan: 0 };
const akhirnya = (s) => {
  const m = /(\d+)\D*$/.exec(s ?? "");
  return m ? Number(m[1]) : null;
};
/** Banding dua bilangan: puluhan dulu, bila sama baru satuan. -1: a lebih kecil, 0: sama, 1: a lebih besar. */
const bandingUji = (a, b) => {
  const dp = Math.floor(a / 10) - Math.floor(b / 10);
  if (dp !== 0) return dp < 0 ? -1 : 1;
  const ds = (a % 10) - (b % 10);
  return ds === 0 ? 0 : ds < 0 ? -1 : 1;
};
const TANDA_UJI = { "-1": "<", 0: "=", 1: ">" };
const KATA_UJI = { "<": "lebih kecil dari", ">": "lebih besar dari", "=": "sama dengan" };
const URUTAN_UJI = ["pertama", "kedua", "ketiga", "keempat", "kelima"];
const ket = (n) => `${Math.floor(n / 10)} puluhan ${n % 10} satuan`;
const aktif = (o) => (o.op ?? 1) >= 1;
const dekat = (a, b, e = 0.25) => Math.abs(a - b) <= e;
const PASANGAN = new Map();

/** Garis bilangan pada satu keadaan gambar: letak angka menentukan nilai di tiap letak x. */
const bacaGaris = (objs) => {
  const lab = objs
    .filter((o) => /^gb-t\d+$/.test(o.id))
    .map((o) => ({ v: Number(o.id.slice(4)), o }))
    .sort((p, q) => p.v - q.v);
  if (lab.length < 2) return null;
  const G = { lab, v0: lab[0].v, x0: lab[0].o.x, langkah: lab[1].v - lab[0].v, dx: lab[1].o.x - lab[0].o.x };
  G.nilai = (x) => G.v0 + ((x - G.x0) / G.dx) * G.langkah;
  G.xDari = (v) => G.x0 + ((v - G.v0) / G.langkah) * G.dx;
  G.vAkhir = lab[lab.length - 1].v;
  return G;
};
const bacaPasangan = (o) => {
  const a = ketemu(o, "bd-a-t");
  const b = ketemu(o, "bd-b-t");
  if (a && b) return [Number(a.isi), Number(b.isi)];
  const p = ketemu(o, "a-n");
  const q = ketemu(o, "b-n");
  if (p && q) return [Number(p.isi), Number(q.isi)];
  return null;
};
const bacaUrut = (o) =>
  o
    .filter((x) => /^ur\d+-n$/.test(x.id))
    .map((n) => {
      const i = n.id.slice(2, -2);
      return { i, n, v: Number(n.isi), k: ketemu(o, `ur${i}-k`), c: ketemu(o, `ur${i}-c`), r: ketemu(o, `ur${i}-r`), ord: ketemu(o, `ur${i}-o`) };
    });
const namaPenanda = (o, s) => (isiTeks(o, `gb-mt${s}`) ?? "").split(" di ")[0].toLowerCase();
const JAWABAN = {
  "latihan-satu": (o) => {
    const [a, b] = bacaPasangan(o);
    return KATA_UJI[TANDA_UJI[bandingUji(a, b)]];
  },
  "latihan-dua": (o) => {
    const [a, b] = bacaPasangan(o);
    return String(bandingUji(a, b) > 0 ? a : b);
  },
  "luar-puluhan-terapan": (o) => {
    const [a, b] = bacaPasangan(o);
    return String(bandingUji(a, b) > 0 ? a : b);
  },
  "latihan-tiga": (o) => {
    const G = bacaGaris(o);
    let v = Math.round(G.nilai(ketemu(o, "gb-m").x));
    const mm = /^(maju|mundur) (\d+)$/.exec(isiTeks(o, "gb-soal") ?? "");
    if (mm) v += (mm[1] === "maju" ? 1 : -1) * Number(mm[2]);
    return String(v);
  },
  "latihan-empat": (o) => String(Math.min(...bacaUrut(o).map((c) => c.v))),
  "luar-garis-terapan": (o) => {
    const G = bacaGaris(o);
    return G.nilai(ketemu(o, "gb-m").x) > G.nilai(ketemu(o, "gb-m2").x) ? namaPenanda(o, "") : namaPenanda(o, "2");
  },
  "luar-tanda-terapan": (o) => {
    const [a, b] = bacaPasangan(o);
    return TANDA_UJI[bandingUji(a, b)];
  },
};
/** Daftar bilangan yang diucapkan (nama bilangan terpanjang dari kiri) dengan posisi token. */
const angkaDalam = (t) => {
  const out = [];
  for (let p = 0; p < t.length; ) {
    const r = bacaAngka(t, p);
    if (r) {
      out.push({ v: r[0], s: p, e: p + r[1] });
      p += r[1];
    } else p += 1;
  }
  return out;
};
const antara = (t, x, y) => (t.batas.has(x.e - 1) ? null : t.slice(x.e, y.s).join(" "));

for (const v of VIDEO) {
  for (const a of v.adegan) {
    a.ketukan.forEach((kt, i) => {
      const nama = `${v.id}/${a.id}#${i + 1}`;
      const o = akhirAdegan(a, i);
      const t = tokoh(kt.suara);

      /* ---- garis bilangan ---- */
      const G = bacaGaris(o);
      if (G) {
        stat.garis += 1;
        cek(G.lab.every((p, q) => p.o.isi === String(p.v) && (q === 0 || (p.v - G.lab[q - 1].v === G.langkah && dekat(p.o.x - G.lab[q - 1].o.x, G.dx, 0.15)))), `${nama}: angka garis bilangan berurutan dengan jarak sama`);
        cek([1, 10].includes(G.langkah) && G.dx > 20 && G.v0 >= 0 && G.vAkhir <= 100, `${nama}: garis bilangan melompat satu atau sepuluh dan berada pada nol sampai seratus`);
        cek(G.lab.every((p) => { const kk = ketemu(o, `gb-k${p.v}`); return kk && dekat(kk.x, p.o.x, 0.01); }), `${nama}: tiap angka punya tanda garis di letak yang sama`);
        const gl = ketemu(o, "gb-l");
        cek(gl && gl.x < G.lab[0].o.x && gl.x + gl.x2 > G.lab[G.lab.length - 1].o.x, `${nama}: garis bilangan membentang melewati semua angka`);
        const nilaiDi = {};
        for (const s of ["", "2"]) {
          const m = ketemu(o, `gb-m${s}`);
          if (!m) continue;
          const val = G.nilai(m.x);
          stat.penanda += 1;
          cek(dekat(val, Math.round(val), 0.06) && Math.round(val) >= G.v0 && Math.round(val) <= G.vAkhir, `${nama}: penanda ${s || "1"} berada di bilangan bulat pada garis (nilai ${val.toFixed(2)})`);
          nilaiDi[s] = Math.round(val);
          const lb = isiTeks(o, `gb-mt${s}`);
          if (lb !== undefined) cek(akhirnya(lb) === Math.round(val), `${nama}: label "${lb}" sama dengan bilangan di letak penanda (${Math.round(val)})`);
        }
        const bay = ketemu(o, "gb-bayang");
        const op = isiTeks(o, "gb-op");
        const hs = isiTeks(o, "gb-hs");
        if (op !== undefined) {
          stat.lompat += 1;
          const mm = /^(maju|mundur) (\d+)$/.exec(op);
          cek(!!mm && !!bay && nilaiDi[""] !== undefined, `${nama}: lompatan punya bentuk, bayangan awal, dan penanda`);
          if (mm && bay && nilaiDi[""] !== undefined) {
            const v0 = Math.round(G.nilai(bay.x));
            const v1 = nilaiDi[""];
            cek(v1 - v0 === (mm[1] === "maju" ? 1 : -1) * Number(mm[2]) && Number(mm[2]) > 0, `${nama}: ${mm[1]} ${mm[2]} dari ${v0} sampai ${v1} sesuai letak penanda`);
            const ar = ketemu(o, "gb-ar");
            cek(ar && dekat(ar.x, bay.x, 0.3) && dekat(ar.x + ar.x2, ketemu(o, "gb-m").x, 0.3), `${nama}: panah lompatan dari bayangan ke penanda`);
          }
        }
        if (hs !== undefined) {
          const mm = /^(\d+) (maju|mundur) (\d+) = (\d+)$/.exec(hs);
          cek(!!mm, `${nama}: hasil lompatan berbentuk "58 maju 2 = 60" (${hs})`);
          if (mm) {
            const [, a0, arah, n, r] = mm;
            cek(Number(arah === "maju" ? Number(a0) + Number(n) : Number(a0) - Number(n)) === Number(r), `${nama}: ${hs} benar secara hitungan`);
            cek(bay && Math.round(G.nilai(bay.x)) === Number(a0) && nilaiDi[""] === Number(r), `${nama}: ${hs} sesuai letak bayangan dan penanda`);
            cek(op === `${arah} ${n}`, `${nama}: hasil ${hs} sesuai tulisan lompatan ${op}`);
          }
        }
        // soal belum dijawab
        const sl = isiTeks(o, "gb-soal");
        if (sl !== undefined) cek(/^(maju|mundur) \d+$/.test(sl), `${nama}: soal lompatan berbentuk "maju 3"`);
      }

      /* ---- kantong puluhan dan kelereng satuan ---- */
      for (const id of ["a", "b", "kr"]) {
        const lab = ketemu(o, `${id}-n`);
        if (!lab) continue;
        stat.kumpulan += 1;
        const bars = o.filter((x) => new RegExp(`^${id}-p\\d+$`).test(x.id));
        const ones = o.filter((x) => new RegExp(`^${id}-s\\d+$`).test(x.id));
        const bAkt = bars.filter(aktif).length;
        const sAkt = ones.filter(aktif).length;
        const n = Number(lab.isi);
        cek(bAkt * 10 + sAkt === n, `${nama}: kumpulan ${id}: ${bAkt} kantong x sepuluh + ${sAkt} lepas = ${bAkt * 10 + sAkt}, bilangan ${n}`);
        cek(bars.every((x, q) => x.id === `${id}-p${q + 1}` && x.w === 9 && x.h === 28 && x.y === bars[0].y && (q === 0 || dekat(x.x - bars[q - 1].x, 11, 0.01))), `${nama}: kumpulan ${id}: batang kantong berurutan dan sama ukuran`);
        cek(ones.every((x, q) => x.id === `${id}-s${q + 1}` && x.y === ones[0].y && (q === 0 || dekat(x.x - ones[q - 1].x, 8.6, 0.15))), `${nama}: kumpulan ${id}: kelereng lepas berurutan`);
        cek(ones.length <= 9, `${nama}: kumpulan ${id}: kelereng lepas paling banyak sembilan`);
        cek(bars.concat(ones).filter((x) => !aktif(x)).every((x) => x.warna === "#CBD5E1"), `${nama}: kumpulan ${id}: yang dicoret berwarna abu`);
        cek(bars.every((x) => x.x >= 0 && x.x + x.w <= 300), `${nama}: kumpulan ${id}: batang masuk kanvas`);
        const cp = ketemu(o, `${id}-c`);
        if (cp) {
          const mm = /^(\d+) puluhan (\d+) satuan$/.exec(cp.isi);
          cek(!!mm && Number(mm[1]) === bAkt && Number(mm[2]) === sAkt, `${nama}: keterangan ${id} "${cp.isi}" sama dengan ${bAkt} kantong dan ${sAkt} lepas`);
        }
        if (id === "kr") {
          const q = /^\? \+ (\d+) = (\d+)$/.exec(isiTeks(o, "kr-q") ?? "");
          const total = bars.length * 10 + ones.length;
          const dicoret = (bars.length - bAkt) * 10 + (ones.length - sAkt);
          if (q) {
            stat.kira += 1;
            cek(total === Number(q[2]), `${nama}: Kira: kantong dan kelereng seluruhnya ${total} sama dengan hasil ${q[2]}`);
          }
          const ja = isiTeks(o, "kr-a");
          if (ja !== undefined && q) {
            const aj = akhirnya(ja);
            cek(aj === n && dicoret === Number(q[1]) && aj + Number(q[1]) === Number(q[2]), `${nama}: Kira: ${q[2]} dikurangi ${q[1]} (dicoret ${dicoret}) tinggal ${n}, jawaban ${aj}`);
          }
        }
      }

      /* ---- banding dua bilangan ---- */
      {
        const pas = bacaPasangan(o);
        const tanda = ketemu(o, "bd-s");
        if (tanda || ketemu(o, "bd-kata") || ketemu(o, "bd-ls")) cek(!!pas, `${nama}: hasil banding punya dua bilangan`);
        if (pas) {
          const [x, y] = pas;
          const sign = TANDA_UJI[bandingUji(x, y)];
          cek(x >= 0 && y >= 0 && x <= 100 && y <= 100, `${nama}: bilangan banding paling besar seratus`);
          if (tanda) {
            stat.banding += 1;
            PASANGAN.set(`${x}|${y}`, [x, y]);
            cek(tanda.isi === sign, `${nama}: tanda antara ${x} dan ${y} adalah ${sign} (ada ${tanda.isi})`);
            const kata = isiTeks(o, "bd-kata");
            if (kata !== undefined) cek(kata === KATA_UJI[sign], `${nama}: kata untuk ${x} dan ${y} adalah "${KATA_UJI[sign]}" (ada "${kata}")`);
            const ls = isiTeks(o, "bd-ls");
            if (ls !== undefined) {
              const benar = Math.floor(x / 10) !== Math.floor(y / 10) ? "lihat puluhan dulu" : x % 10 !== y % 10 ? "puluhan sama: lihat satuan" : "puluhan dan satuan sama";
              cek(ls === benar, `${nama}: alasan untuk ${x} dan ${y} adalah "${benar}" (ada "${ls}")`);
            }
          }
          for (const [id, n] of [["a", x], ["b", y]]) {
            const kc = isiTeks(o, `bd-${id}-c`);
            if (kc !== undefined) cek(kc === ket(n), `${nama}: keterangan kartu ${id} "${kc}" sama dengan "${ket(n)}"`);
          }
        }
        const kt = isiTeks(o, "bd-kt");
        if (kt !== undefined) {
          const mm = /^(\d+) (lebih besar dari|lebih kecil dari|sama dengan) (\d+)$/.exec(kt);
          cek(!!mm && KATA_UJI[TANDA_UJI[bandingUji(Number(mm[1]), Number(mm[3]))]] === mm[2], `${nama}: kalimat banding "${kt}" benar`);
          if (mm && G) {
            const [p, q] = [Number(mm[1]), Number(mm[3])];
            const xa = (n) => [["", ketemu(o, "gb-m")], ["2", ketemu(o, "gb-m2")]].map(([, m]) => (m && Math.round(G.nilai(m.x)) === n ? m.x : null)).find((z) => z !== null);
            cek(xa(p) !== undefined && xa(q) !== undefined && Math.sign(xa(p) - xa(q)) === bandingUji(p, q), `${nama}: letak kiri atau kanan di garis cocok dengan "${kt}"`);
          }
        }
      }
      // tiga tanda: tanda dan kata berpasangan
      for (const [q, sign, kata] of [[1, ">", "lebih besar"], [2, "<", "lebih kecil"], [3, "=", "sama dengan"]]) {
        const s1 = isiTeks(o, `tn${q}-s`);
        if (s1 !== undefined) {
          stat.tanda += 1;
          cek(s1 === sign && isiTeks(o, `tn${q}-l`) === kata, `${nama}: tanda ${s1} berpasangan dengan "${isiTeks(o, `tn${q}-l`)}"`);
        }
      }

      /* ---- kartu urut dan tempat urut ---- */
      {
        const cs = bacaUrut(o);
        if (cs.length) {
          const vs = cs.map((c) => c.v);
          const slots = o.filter((x) => /^sl\d+-k$/.test(x.id)).map((x) => ({ j: Number(x.id.slice(2, -2)), k: x })).sort((p, q) => p.j - q.j);
          const urutNaik = [...vs].sort((p, q) => p - q);
          cek(new Set(vs).size === vs.length && vs.every((x) => x >= 0 && x <= 100), `${nama}: kartu urut berisi bilangan berbeda sampai seratus`);
          for (const c of cs) {
            stat.kartuUrut += 1;
            cek(c.k && c.n.x > c.k.x && c.n.x < c.k.x + c.k.w && c.n.y > c.k.y && c.n.y < c.k.y + c.k.h && dekat(c.n.x, c.k.x + c.k.w / 2, 0.2), `${nama}: bilangan ${c.v} berada di tengah kartunya`);
            if (c.c) cek(c.c.isi === ket(c.v), `${nama}: keterangan kartu ${c.v} adalah "${ket(c.v)}" (ada "${c.c.isi}")`);
            if (c.r) {
              const kecil = /paling kecil|terkecil/.test(c.r.isi);
              const besar = /paling besar|terbesar/.test(c.r.isi);
              cek((kecil && c.v === urutNaik[0]) || (besar && c.v === urutNaik[urutNaik.length - 1]), `${nama}: penanda "${c.r.isi}" pada ${c.v} benar (terkecil ${urutNaik[0]}, terbesar ${urutNaik[urutNaik.length - 1]})`);
            }
            if (c.ord) cek(c.ord.isi === URUTAN_UJI[urutNaik.indexOf(c.v)], `${nama}: urutan ke berapa untuk ${c.v} adalah ${URUTAN_UJI[urutNaik.indexOf(c.v)]} (ada ${c.ord.isi})`);
          }
          for (const s of slots) cek(s.k && isiTeks(o, `sl${s.j}-t`) === URUTAN_UJI[s.j - 1], `${nama}: nama tempat urut ke-${s.j}`);
          const diTempat = cs
            .map((c) => ({ c, s: slots.find((s) => dekat(s.k.x, c.k.x, 0.05) && dekat(s.k.y, c.k.y, 0.05)) }))
            .filter((p) => p.s)
            .sort((p, q) => p.s.j - q.s.j);
          cek(diTempat.every((p, q) => q === 0 || p.c.v > diTempat[q - 1].c.v), `${nama}: kartu di tempat urut tersusun dari kecil ke besar (${diTempat.map((p) => p.c.v).join(", ")})`);
          const uj = isiTeks(o, "ur-j");
          if (uj !== undefined) cek(uj === "dari paling kecil" && (slots.length === 0 || diTempat.length === cs.length), `${nama}: judul urutan "dari paling kecil" hanya bila semua kartu sudah di tempatnya`);
        }
      }

      /* ---- dua kartu angka ---- */
      {
        const bes = isiTeks(o, "kd-bes-n");
        const kec = isiTeks(o, "kd-kec-n");
        const d1 = isiTeks(o, "kd1-n");
        const d2 = isiTeks(o, "kd2-n");
        if (bes !== undefined || kec !== undefined) {
          stat.kartuAngka += 1;
          cek(d1 !== undefined && d2 !== undefined, `${nama}: dua kartu angka ada`);
          const susun = [Number(d1 + d2), Number(d2 + d1)];
          for (const [r, benar, kata] of [[bes, Math.max(...susun), "terbesar"], [kec, Math.min(...susun), "terkecil"]]) {
            if (r === undefined) continue;
            cek(Number(r) === benar, `${nama}: susunan ${kata} dari kartu ${d1} dan ${d2} adalah ${benar} (ada ${r})`);
            const cap = isiTeks(o, `kd-${kata === "terbesar" ? "bes" : "kec"}-c`);
            if (cap !== undefined) cek(cap === ket(benar), `${nama}: keterangan ${kata} adalah "${ket(benar)}" (ada "${cap}")`);
          }
          cek(bes === undefined || kec === undefined || Number(bes) > Number(kec), `${nama}: bilangan terbesar lebih besar dari yang terkecil`);
          const lbB = ketemu(o, "kd-bes-l");
          const lbK = ketemu(o, "kd-kec-l");
          if (lbB) cek(lbB.isi === "terbesar" && bes !== undefined, `${nama}: label terbesar ada pada hasil terbesar`);
          if (lbK) cek(lbK.isi === "terkecil" && kec !== undefined, `${nama}: label terkecil ada pada hasil terkecil`);
        }
      }

      /* ---- kartu pilihan: tepat satu cocok dengan hasil hitung dan yang disorot adalah jawaban ---- */
      {
        const kartuTeks = [1, 2, 3].map((q) => isiTeks(o, `c${q}-t`)).filter((x) => x !== undefined);
        if (kartuTeks.length) {
          stat.pilihan += 1;
          const f = JAWABAN[a.id];
          cek(!!f, `${nama}: adegan dengan kartu pilihan punya rumus jawaban`);
          if (f) {
            const benar = f(o);
            cek(kartuTeks.filter((x) => x.toLowerCase() === benar).length === 1, `${nama}: tepat satu kartu pilihan sama dengan hasil hitung "${benar}" (${kartuTeks.join(" | ")})`);
            const sorot = [1, 2, 3].filter((q) => ketemu(o, `c${q}-k`)?.sorot);
            if (sorot.length) cek(sorot.length === 1 && isiTeks(o, `c${sorot[0]}-t`).toLowerCase() === benar, `${nama}: kartu yang disorot adalah jawaban "${benar}"`);
          }
        }
      }

      /* ---- kalimat suara dihitung ulang ---- */
      const an = angkaDalam(t);
      for (let q = 0; q + 1 < an.length; q += 1) {
        const x = an[q];
        const y = an[q + 1];
        const mid = antara(t, x, y);
        // (1) "X lebih besar dari Y", "X lebih kecil dari Y", "X sama dengan Y"
        for (const [sign, kata] of Object.entries(KATA_UJI)) {
          if (mid === kata) {
            stat.suaraBanding += 1;
            cek(TANDA_UJI[bandingUji(x.v, y.v)] === sign, `${nama}: suara "${NAMA[x.v]} ${kata} ${NAMA[y.v]}" benar`);
          }
        }
        // (2) "X lebihnya dari Y adalah Z" dan "X kurangnya dari Y adalah Z"
        if ((mid === "lebihnya dari" || mid === "kurangnya dari") && q + 2 < an.length && antara(t, y, an[q + 2]) === "adalah") {
          stat.suaraLebih += 1;
          const z = an[q + 2].v;
          cek(z === (mid === "lebihnya dari" ? y.v + x.v : y.v - x.v), `${nama}: suara "${NAMA[x.v]} ${mid} ${NAMA[y.v]} adalah ${NAMA[z]}" benar`);
        }
        // (4) "X puluhan dan Y satuan" tampak sebagai keterangan di gambar
        if (mid === "puluhan dan" && t[y.e] === "satuan") {
          stat.suaraKet += 1;
          const ada = L.teksTerlihat(o).some((s) => new RegExp(`(^|\\D)${x.v} puluhan ${y.v} satuan`).test(s));
          cek(ada, `${nama}: suara "${NAMA[x.v]} puluhan dan ${NAMA[y.v]} satuan" tampak sebagai "${x.v} puluhan ${y.v} satuan" di gambar`);
        }
      }
      // (3) "maju N" dan "mundur N" sama dengan tulisan lompatan atau soal di gambar
      for (let p = 0; p + 1 < t.length; p += 1) {
        if (t[p] !== "maju" && t[p] !== "mundur") continue;
        const r = bacaAngka(t, p + 1);
        const tulisan = isiTeks(o, "gb-op") ?? isiTeks(o, "gb-soal");
        if (!r || tulisan === undefined) continue;
        stat.suaraMaju += 1;
        cek(tulisan === `${t[p]} ${r[0]}`, `${nama}: suara "${t[p]} ${NAMA[r[0]]}" sama dengan tulisan "${tulisan}" di gambar`);
      }
    });
  }
}

/* ------------------------------ Fakta isi yang dikunci ------------------------------ */
{
  const nilaiMarker = (ad, ke, s = "") => {
    const o = akhirAdegan(adeganId(ad), ke);
    return Math.round(bacaGaris(o).nilai(ketemu(o, `gb-m${s}`).x));
  };
  const lompat = (ad) => {
    const o = akhirAdegan(adeganId(ad));
    return [Math.round(bacaGaris(o).nilai(ketemu(o, "gb-bayang").x)), Math.round(bacaGaris(o).nilai(ketemu(o, "gb-m").x))];
  };
  sama(lompat("maju"), [58, 60], "kupu-kupu maju dua langkah dari 58 sampai 60");
  sama(lompat("mundur"), [75, 72], "lebah mundur tiga langkah dari 75 sampai 72");
  sama(lompat("teka-teki-lebih"), [76, 78], "dua lebihnya dari 76 adalah 78");
  sama(lompat("teka-teki-kurang"), [67, 66], "satu kurangnya dari 67 adalah 66");
  sama(lompat("luar-garis"), [70, 40], "metode garis: mundur tiga puluh dari 70 sampai 40");
  sama(lompat("latihan-tiga"), [66, 69], "latihan: tiga lebihnya dari 66 adalah 69");
  cek(nilaiMarker("garis-bilangan", 3) === 58, "garis bilangan: kupu-kupu di 58 (antara 57 dan 59)");
  sama(bacaPasangan(akhirAdegan(adeganId("banding-puluhan"))), [56, 65], "Halim 56 dan Malosi 65");
  sama(bacaPasangan(akhirAdegan(adeganId("puluhan-sama"))), [54, 58], "Wei 54 dan Upe 58");
  sama(bacaPasangan(akhirAdegan(adeganId("luar-puluhan"))), [83, 79], "metode puluhan: 83 dan 79");
  const urutAkhir = (id) => {
    const o = akhirAdegan(adeganId(id));
    return bacaUrut(o).filter((c) => /^sl/.test(c.i) === false).map((c) => ({ v: c.v, x: c.k.x, y: c.k.y })).sort((p, q) => (p.y === q.y ? p.x - q.x : p.y - q.y)).filter((c) => c.y >= 100).map((c) => c.v);
  };
  sama(urutAkhir("urut-tiga"), [57, 76, 83], "urutan tiga bilangan dari yang paling kecil");
  sama(urutAkhir("urut-lima"), [56, 60, 65, 71, 79], "urutan lima bilangan dari yang paling kecil");
  sama(bacaUrut(akhirAdegan(adeganId("tiga-bilangan"))).map((c) => c.v).sort((p, q) => p - q), [57, 76, 83], "tiga bilangan: 57, 76, 83");
  {
    const o = akhirAdegan(adeganId("dua-kartu"));
    sama([isiTeks(o, "kd-bes-n"), isiTeks(o, "kd-kec-n")], ["73", "37"], "kartu tiga dan tujuh: terbesar 73, terkecil 37");
  }
  {
    const o = akhirAdegan(adeganId("teka-teki-kira"));
    cek(isiTeks(o, "kr-a") === "Bilangan Kira: 12" && isiTeks(o, "kr-q") === "? + 43 = 55", "teka-teki Kira: 55 dikurangi 43 adalah 12");
  }
  const kataBantu = [stat.garis, stat.penanda, stat.lompat, stat.kumpulan, stat.banding, stat.tanda, stat.kartuUrut, stat.kartuAngka, stat.kira, stat.pilihan, stat.suaraBanding, stat.suaraLebih, stat.suaraMaju, stat.suaraKet];
  cek(kataBantu.every((n) => n > 0), `semua jenis pemeriksaan struktur terpakai (${kataBantu.join(", ")})`);
}

{
  // Aturan pemilik: aplikasi belajar mandiri; tanpa instruksi kelompok, teman, kelas, buku, atau benda nyata.
  const MANDIRI = /kerja kelompok|berkelompok|secara berkelompok|diskusi kelompok|sekelompok|kelompokmu|kelompok belajar|bersama kelompok|\bkelompok\b|tanya teman|survei|karet gelang|uang tabungan|\bpaman\b|\btika\b|\blili\b|\bteman\w*|\bkawan\w*|sekawan|depan kelas|bersama kelas|seluruh kelas|\bkelas\b|berpasangan dengan (teman|kawan)|bekerja berpasangan|secara berpasangan|bermain bersama|bertanya kepada|buat ceritamu|buku|menulis di|menuliskan di|tulis di|tuliskan di|menggambar|gambarlah|gambar sendiri|\bbawa(lah)?\b|membawa|dibawa|\bkertas\b|\bpensil\b|\bpulpen\b|\bspidol\b|\bgunting\w*|ambil (benda|pensil|kelereng|bola|sedotan|balon|kerucut|kubus)|tangan (kiri|kanan)|\bjari\b|menyuruh|suruh|jengkal|telapak|\bdepa\b|penggaris|\bkoin\b|di sekitar|di rumah|di kelas|centimeter|\bmeter\b|kakimu|tanganmu|badanmu|\braba\w*|\bmeraba|\btubuh|\blengan|lingkari|coret|guru kelas|orang tua|\bayah\b|\bibu guru|bapak guru|\bloker\b|\bpaku\b|karet|\brumah\b|\bpak\b|\bibu\b|\blidi\b|kantong plastik|kue cubit|rambutan|\bbetawi\b|sahabat|\bkelompok/i;
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
  const DAFTAR = ["Maju dan mundur di garis", "Membandingkan dua bilangan", "Mengurutkan bilangan"];
  cek(/Halo anak-anak/.test(sap.ketukan[0].suara) && /Maju dan mundur di garis/i.test(L.teksTerlihat(akhirAdegan(sap, 1)).join(" | ")), "sapaan materi: tiga hal yang dipelajari tampil");
  sama(L.teksTerlihat(akhirAdegan(sap, 1)).filter((t) => DAFTAR.includes(t)), DAFTAR, "sapaan materi: daftar tiga hal");
  cek(!/\d/.test(sap.ketukan[1].suara) && !/\d/.test(DAFTAR.join(" ")), "sapaan materi: tanpa angka");
  const sapLuar = adegan(U, "sapaan");
  cek(/cara lain/i.test(L.teksTerlihat(akhirAdegan(sapLuar, 1)).join(" | ")) && /metode-luar|Metode luar/.test(sapLuar.sumber), "sapaan metode luar: pengumuman cara lain");
  let sumberRingkas = null;
  try {
    sumberRingkas = JSON.parse(readFileSync(new URL("../src/data/kelas2-bab7-ringkas.json", import.meta.url), "utf8")).subBab?.B;
  } catch {
    sumberRingkas = null;
  }
  const sementara = new URL("../.tmp-k2b7s/B.json", import.meta.url);
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
    // Isi tabel dihitung ulang dari pasangan bilangan yang tampil di gambar (puluhan dulu, lalu satuan).
    sama(T.kolom, ["Penentu", "Terbesar", "Pertama"], "tabel susun: kolom penentu, terbesar, pertama");
    for (const b of T.baris) {
      const m = /^(\d+) dan (\d+)$/.exec(b.label);
      cek(!!m, `tabel susun: label "${b.label}" berbentuk "56 dan 65"`);
      if (!m) continue;
      const [x, y] = [Number(m[1]), Number(m[2])];
      cek(PASANGAN.has(`${x}|${y}`), `tabel susun: pasangan ${x} dan ${y} tampil dengan tanda di gambar video`);
      stat.pasangan += 1;
      const c = bandingUji(x, y);
      const penentu = Math.floor(x / 10) !== Math.floor(y / 10) ? "Puluhan" : "Satuan";
      const terbesar = String(c > 0 ? x : y);
      const pertama = c < 0 ? "Kecil" : c > 0 ? "Besar" : "Sama";
      sama(b.sel, [penentu, terbesar, pertama], `tabel susun: baris ${b.label} dihitung ulang`);
    }
    cek(T.baris.every((b) => b.sel.every((s) => s.length <= 8)), "tabel susun: sel pendek supaya margin teks >= 5 px di 405 px");
    cek(new Set(T.baris.map((b) => b.label)).size === T.baris.length, "tabel susun: label tiap baris berbeda");
    const KATA_LARANG = /buku|halaman|kunci|kerja kelompok|\bkelompok|\bteman|kawan|kelas\b|kertas|pensil|\bbawa\b|menggambar|menulis di|depan kelas|luas|keliling|di rumah|\brumah\b|survei|karet gelang|uang tabungan|di sekitar|loker|ibu guru|bersusun|\bkali\b|gunting|\bpaku\b|\bpak\b|\bayah\b|\bibu\b|lidi|kantong plastik/i;
    cek(!KATA_LARANG.test(JSON.stringify({ p: A.petaSusun, t: A.tabelSusun })), "peta dan tabel susun: tanpa kata terlarang dan tanpa kelompok, teman, kelas, buku, kertas, pensil");
    cek(!/Compare Tens First|Number Line to 100|Symbols < > =|Count to 100|Tens and Ones|Hundred Chart/i.test(JSON.stringify(A)), "peta dan tabel susun: tanpa nama metode berbahasa Inggris");
    cek(peta.every((s) => ![...s.teks, ...(s.ikon ?? "")].some((c) => c.codePointAt(0) > 0x1fa95)), "peta susun: emoji paling tinggi Emoji 12");
  } else cek(false, "peta dan tabel susun: .tmp-k2b7s/B.json atau kelas2-bab7-ringkas.json subBab.B.petaSusun ada");
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k2b7B-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k2b7B-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k2b7B sendiri (${impor.join(", ")})`);
  }
  // Emoji dalam data teks gambar juga paling tinggi Emoji 12 (diperiksa pada gambar yang diputar).
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d), `${v.id}/${a.id}: emoji gambar paling tinggi Emoji 12`);
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k2b7b.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|naskah-k1b|naskah-k2b7|data-k2b7|video-k2b7-umum/.test(pembungkus) && /VIDEO_MATERI_K2B7B/.test(pembungkus) && /VIDEO_LUAR_K2B7B/.test(pembungkus) && /export function VideoK2B7B/.test(pembungkus) && /daftar-video-cerita/.test(pembungkus), "video-k2b7b.tsx: dua video dari mesin Story, tanpa naskah lama");
  cek(!/\r/.test(pembungkus), "video-k2b7b.tsx: akhir baris LF");
  const sendiri = readFileSync(new URL("uji-story-k2b7B.mjs", import.meta.url), "utf8");
  cek(!/\r/.test(sendiri), "uji-story-k2b7B.mjs: akhir baris LF");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit diputar)`);
}
console.log(`Pemeriksaan: ${stat.garis} garis bilangan, ${stat.penanda} penanda, ${stat.lompat} lompatan, ${stat.kumpulan} kumpulan kantong dan kelereng, ${stat.banding} hasil banding, ${stat.tanda} tanda, ${stat.kartuUrut} kartu urut, ${stat.kartuAngka} susunan kartu angka, ${stat.kira} teka-teki Kira, ${stat.pilihan} kartu pilihan, ${stat.suaraBanding} kalimat banding di suara, ${stat.suaraLebih} lebihnya atau kurangnya di suara, ${stat.suaraMaju} maju atau mundur di suara, ${stat.suaraKet} puluhan dan satuan di suara, ${stat.pasangan} baris tabel, ${jumlahNama} nama bilangan tampak sebagai angka`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);