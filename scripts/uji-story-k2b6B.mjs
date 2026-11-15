// Uji Story Kelas 2 Bab 6 Sub-Bab B (Waktu): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Video diputar bergaya guru: suara, teks terlihat, sumber, judul adegan, dan subjudul tanpa penyebutan buku (kata terlarang diperiksa pada adegan yang diputar).
// Memeriksa: pemicu kata, suara tanpa digit, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas, teks bertumpuk, pemisahan materi dan metode luar (nama metode hanya Indonesia),
// nama bilangan sepuluh sampai dua puluh yang diucapkan tampak sebagai angka, dan data di layar dihitung ulang dari STRUKTUR gambar (bukan kata kunci):
// jam analog: tiap jam punya muka, dua belas angka (atau empat), poros di pusat, jarum pendek dan jarum panjang yang digambar ke atas lalu diputar; sudut jarum panjang = 6 x menit
// dan sudut jarum pendek = 30 x jam + menit / 2 dihitung ulang, dicocokkan dengan "pukul berapa" yang disebut suara, "jarum pendek (panjang) di angka X", dan jam digital HH.MM;
// pukul tepat (menit nol); bagian hari menurut jam (pagi 5-10, siang 11-14, sore 15-17, malam 18 sampai 4) untuk jam dinding dan jam digital 24 jam; baris kegiatan Kira, urutan kegiatan menurut waktu;
// lama kegiatan: label menit atau jam, lebar batang = dua kali menit, "lebih lama" dan "lebih sebentar" dan "paling" dihitung dari lama di gambar, selisih jam mulai dan selesai;
// kartu pilihan tepat satu yang cocok dan yang disorot sama dengan hasil hitung; aturan pemilik (belajar mandiri digital: tanpa kerja kelompok, survei teman, depan kelas, buku, menulis atau menggambar di buku, membawa benda nyata);
// peta dan tabel susun (tabel dihitung ulang dari gambar jadwal); emoji paling tinggi Emoji 12; dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k2b6B.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k2b6B-video.ts");
const U1 = await import("../src/components/modul/story/k2b6B-luar-1.ts");
const B = await import("../src/components/modul/story/k2b6B-bantu.ts");

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
const VIDEO = [V.VIDEO_MATERI_K2B6B, V.VIDEO_LUAR_K2B6B];
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
const M_VIDEO = V.VIDEO_MATERI_K2B6B;
const U = V.VIDEO_LUAR_K2B6B;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const NAMA_LUAR = /Membaca Jam|Lama Kegiatan|Urutan Waktu Sehari|metode luar|metode dari luar/i;
const NAMA_INGGRIS = /Clock Reading|Duration Sense|Day Sequence|Compare Mass|Nonstandard Mass|Heavier Lighter|Time pedagogy|Time sense|Temporal order/i;
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M_VIDEO);
  const luar = teksVideo(U);
  cek(!NAMA_LUAR.test(materi), `video materi tidak memuat nama metode luar (Membaca Jam, Lama Kegiatan, Urutan Waktu Sehari): ${NAMA_LUAR.exec(materi)?.index} ${materi.slice(Math.max(0, (NAMA_LUAR.exec(materi)?.index ?? 0) - 50), (NAMA_LUAR.exec(materi)?.index ?? 0) + 50)}`);
  for (const m of U1.NAMA_METODE_ID) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE_ID, ["Membaca Jam", "Lama Kegiatan", "Urutan Waktu Sehari"], "nama Indonesia metode luar");
  cek(!NAMA_INGGRIS.test(materi) && !NAMA_INGGRIS.test(luar), "nama metode hanya bahasa Indonesia (tanpa Clock Reading, Duration Sense, Day Sequence)");
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
  cek(M_VIDEO.id === "k2b6B-materi" && U.id === "k2b6B-luar", "id video k2b6B-materi dan k2b6B-luar");
  cek(U.judul.endsWith(": Metode dari Luar") && !/menurut/i.test(M_VIDEO.judul), "judul video: materi tanpa 'menurut', luar berakhir ': Metode dari Luar'");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,bagian-jam,pukul-tepat,jam-digital,tiga-jam,empat-bagian,pagi,siang-sore,malam,bagian-digital,jadwal,urut-kegiatan,lama-jam,lama-dua-jam,banding,lama-banyak,latihan-satu,latihan-dua,latihan-tiga,latihan-empat,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-jam,luar-jam-terapan,luar-lama,luar-lama-terapan,luar-urutan,luar-urutan-terapan,luar-ringkas", "urutan adegan metode luar");
  cek(M_VIDEO.adegan[0].id === "sapaan" && U.adegan[0].id === "sapaan", "tiap video dibuka adegan sapaan");
  cek(M_VIDEO.adegan.filter((a) => /^latihan-/.test(a.id)).length === 4 && M_VIDEO.adegan[M_VIDEO.adegan.length - 1].id === "penutup", "video materi: Latihan 1 sampai 4 lalu penutup");
  cek(U.adegan[1].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  for (const kata of ["Latihan", "Igil", "Malosi", "Halim", "Kira", "Wei", "Upe", "jarum pendek", "jarum panjang", "pukul", "tepat", "jam digital", "pagi", "siang", "sore", "malam", "bagian", "kegiatan", "lebih lama", "lebih sebentar", "menit", "urutan", "angka", "titik"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  // Materi waktu: tanpa kali, bagi, bersusun, satuan baku panjang, rumus, dan bilangan di atas dua puluh.
  const BOCOR = /dikali|perkalian|\bkali\b|\bratus\b|\bribu\b|\bluas\b|keliling|rumus|volume|sentimeter|centimeter|\bcm\b|\bmeter\b|penggaris|bersusun|×|÷/i;
  for (const v of [M_VIDEO, U]) {
    for (const a of v.adegan) cek(!BOCOR.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa kali, bersusun, satuan baku, atau rumus`);
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
const NAMA_METODE_SUARA = /membaca jam|lama kegiatan|urutan waktu sehari/gi;
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


/* ------------------------------ Waktu dihitung ulang dari STRUKTUR gambar ------------------------------ */
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
const adeganId = (id) => adegan(M_VIDEO, id) ?? adegan(U, id);
const stat = { jam: 0, angka: 0, jarumSuara: 0, pukulSuara: 0, digitalSuara: 0, digital: 0, kegiatan: 0, bagian: 0, lama: 0, bandingSuara: 0, durasiSuara: 0, rentang: 0, kartuPilihan: 0, urutan: 0, jadwalSuara: 0 };
const mod360 = (x) => ((x % 360) + 360) % 360;
const selisihSudut = (a, b) => {
  const d = mod360(a - b);
  return Math.min(d, 360 - d);
};
const BAGIAN = ["pagi", "siang", "sore", "malam"];
const NAMA_BAGIAN = ["Pagi", "Siang", "Sore", "Malam"];
/** Bagian hari dari jam 24 (0 sampai 23): pagi 5-10, siang 11-14, sore 15-17, malam 18 sampai 4. */
const bagianDari24 = (h) => (h >= 5 && h <= 10 ? "pagi" : h >= 11 && h <= 14 ? "siang" : h >= 15 && h <= 17 ? "sore" : "malam");
/** Jam dinding (1 sampai 12) yang sah untuk tiap bagian hari. */
const SAH = { pagi: [5, 6, 7, 8, 9, 10], siang: [11, 12, 1, 2], sore: [3, 4, 5], malam: [6, 7, 8, 9, 10, 11] };
const ke24 = (h12, b) => {
  if (!SAH[b]?.includes(h12)) return null;
  if (b === "pagi") return h12;
  if (b === "siang") return h12 >= 11 ? h12 : h12 + 12;
  return h12 + 12;
};
// Kegiatan Kira sehari (sumber data: jam dan bagian hari sesuai data kelas2-bab6, tokoh Kira).
const JADWAL_UJI = [
  ["sarapan", 6, "pagi"],
  ["belajar", 7, "pagi"],
  ["makan siang", 12, "siang"],
  ["bermain", 4, "sore"],
  ["tidur", 9, "malam"],
];
const NAMA_KEGIATAN = JADWAL_UJI.map((j) => j[0]);
const RENTANG = { siang: [11, 2], sore: [3, 5] };

/** Semua jam analog pada satu keadaan gambar, dihitung dari jarum: sudut jarum panjang = 6 x menit; sudut jarum pendek = 30 x jam + menit / 2. */
const bacaJam = (objs) => {
  const hasil = [];
  for (const w of objs.filter((o) => /^j\d+-w$/.test(o.id))) {
    const id = w.id.slice(0, -2);
    const p = ketemu(objs, `${id}-p`);
    const m = ketemu(objs, `${id}-m`);
    const hub = ketemu(objs, `${id}-h`);
    const c = { id, w, p, m, hub, utuh: false, h: null, menit: null, angka: objs.filter((o) => new RegExp(`^${id}-a\\d+$`).test(o.id)) };
    if (p && m) {
      const menit = mod360(m.rot ?? 0) / 6;
      const ang = mod360(p.rot ?? 0);
      const hh = Math.round((ang - menit / 2) / 30);
      c.utuh = Math.abs(menit - Math.round(menit)) < 0.001 && selisihSudut(ang, 30 * hh + menit / 2) < 0.01;
      c.menit = Math.round(menit);
      c.h = ((hh % 12) + 12) % 12;
    }
    hasil.push(c);
  }
  return hasil;
};
const jam12 = (c) => (c.h === 0 ? 12 : c.h);
const bacaDigital = (objs) => {
  const m = /^(\d\d)\.(\d\d)$/.exec(isiTeks(objs, "dg-t") ?? "");
  return m ? { jam: Number(m[1]), menit: Number(m[2]) } : null;
};
const bacaLama = (objs) =>
  objs
    .filter((o) => /^lm\d+-nm$/.test(o.id))
    .map((o) => {
      const j = o.id.slice(2).split("-")[0];
      const t = isiTeks(objs, `lm${j}-t`);
      const mm = /^(\d+) (menit|jam)$/.exec(t ?? "");
      const bar = ketemu(objs, `lm${j}-b`);
      return { j, nama: o.isi, label: t, menit: mm ? Number(mm[1]) * (mm[2] === "jam" ? 60 : 1) : null, satuan: mm?.[2], bar, y: o.y, nm: o };
    });
const bacaKegiatan = (objs) =>
  objs
    .filter((o) => /^kg\d+-nm$/.test(o.id))
    .map((o) => {
      const j = Number(o.id.slice(2).split("-")[0]);
      const jm = isiTeks(objs, `kg${j}-jm`);
      const mm = /^pukul (\d+) (pagi|siang|sore|malam)$/.exec(jm ?? "");
      const kk = ketemu(objs, `kg${j}-k`);
      return { j, nama: o.isi, jm, h12: mm ? Number(mm[1]) : null, bagian: mm?.[2], h24: mm ? ke24(Number(mm[1]), mm[2]) : null, kotak: kk, y: kk?.y };
    });
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const akhirSegmen = (tok, p) => {
  for (let q = p; q < tok.length; q += 1) if (/[,.;:!?]$/.test(tok[q])) return q;
  return tok.length - 1;
};
const JAWABAN = {
  "latihan-satu": (o) => String(jam12(bacaJam(o).find((c) => c.utuh))),
  "luar-jam-terapan": (o) => String(jam12(bacaJam(o).find((c) => c.utuh))),
  "latihan-dua": (o) => bagianDari24(bacaDigital(o).jam),
  "latihan-tiga": (o) => {
    const [a, b] = ["j1", "j2"].map((id) => bacaJam(o).find((c) => c.id === id));
    return String((((b.h === 0 ? 12 : b.h) - (a.h === 0 ? 12 : a.h)) + 12) % 12);
  },
  "latihan-empat": (o) => bacaLama(o).sort((x, y) => y.menit - x.menit)[0].nama.toLowerCase(),
  "luar-lama-terapan": (o) => bacaLama(o).sort((x, y) => y.menit - x.menit)[0].nama.toLowerCase(),
  "luar-urutan-terapan": (o) => bacaKegiatan(o).sort((x, y) => x.h24 - y.h24)[0].nama.toLowerCase(),
};
const catat = { jamAkhir: {} };

for (const v of VIDEO) {
  for (const a of v.adegan) {
    a.ketukan.forEach((kt, i) => {
      const nama = `${v.id}/${a.id}#${i + 1}`;
      const o = akhirAdegan(a, i);
      const tok = kt.suara.split(/\s+/).filter(Boolean);
      const t = tokoh(kt.suara);
      const kalimat = kt.suara.split(/(?<=[.!?])\s+/).map((s) => s.trim()).filter(Boolean);
      const stateKe = (p) => L.keadaanStory(a, i, p);
      const jamO = bacaJam(o);
      const D = bacaDigital(o);

      /* ---- jam analog: muka, angka, jarum, poros ---- */
      for (const c of jamO) {
        stat.jam += 1;
        cek(c.hub && c.hub.x === c.w.x && c.hub.y === c.w.y, `${nama}: poros ${c.id} di pusat muka jam`);
        const r = c.w.r;
        cek([0, 4, 12].includes(c.angka.length), `${nama}: ${c.id} punya dua belas angka, empat angka (12, 3, 6, 9), atau belum ada angka (${c.angka.length})`);
        for (const g of c.angka) {
          const n = Number(g.id.split("-a")[1]);
          const u = g.u ?? 10;
          const dx = g.x - c.w.x;
          const dy = g.y - u * 0.35 - c.w.y;
          const sudut = mod360((Math.atan2(dx, -dy) * 180) / Math.PI);
          stat.angka += 1;
          cek(g.isi === String(n) && selisihSudut(sudut, n * 30) < 0.8, `${nama}: angka ${n} di muka ${c.id} berada pada sudut ${n * 30} derajat (ada ${sudut.toFixed(1)}, isi ${g.isi})`);
          cek(Math.hypot(dx, dy) < r - 4 && Math.hypot(dx, dy) > r * 0.55, `${nama}: angka ${n} di muka ${c.id} di dalam muka jam dekat tepinya`);
        }
        for (const [nm, h] of [["p", c.p], ["m", c.m]]) {
          if (!h) continue;
          cek(h.t === "garis" && h.x === c.w.x && h.y === c.w.y && h.x2 === 0 && h.y2 < 0, `${nama}: jarum ${c.id}-${nm} berpangkal di pusat dan digambar ke atas lalu diputar`);
          cek(-h.y2 < r - 2, `${nama}: jarum ${c.id}-${nm} tidak keluar dari muka jam`);
        }
        if (c.p && c.m) {
          cek(-c.p.y2 < -c.m.y2, `${nama}: jarum pendek ${c.id} lebih pendek dari jarum panjang`);
          cek(c.utuh, `${nama}: hubungan kedua jarum ${c.id} benar (jarum pendek ${c.p.rot} derajat, jarum panjang ${c.m.rot} derajat)`);
        }
        if (c.utuh) catat.jamAkhir[`${a.id}#${i + 1}#${c.id}`] = [jam12(c), c.menit];
      }
      if (jamO.filter((c) => c.utuh).length && D) {
        const c = jamO.find((x) => x.utuh);
        cek(D.jam % 12 === c.h && D.menit === c.menit, `${nama}: jam digital ${isiTeks(o, "dg-t")} sama dengan jam analog (${jam12(c)}.${c.menit})`);
      }
      if (D) {
        stat.digital += 1;
        const k = ketemu(o, "dg-k");
        const tt = ketemu(o, "dg-t");
        cek(k && tt && tt.x > k.x && tt.x < k.x + k.w && tt.y > k.y && tt.y < k.y + k.h, `${nama}: tulisan jam digital di dalam kotaknya`);
        cek(D.menit === 0, `${nama}: jam digital pukul tepat (menit nol)`);
      }

      /* ---- kegiatan, bagian hari, lama kegiatan pada gambar ---- */
      for (const g of bacaKegiatan(o)) {
        stat.kegiatan += 1;
        const e = JADWAL_UJI[g.j];
        cek(e && g.nama.toLowerCase() === e[0] && g.h12 === e[1] && g.bagian === e[2], `${nama}: baris kegiatan ${g.j} "${g.nama}, ${g.jm}" sesuai data (${e})`);
        cek(g.h24 !== null && bagianDari24(g.h24) === g.bagian, `${nama}: ${g.nama} pukul ${g.h12} ${g.bagian} cocok dengan bagian hari (jam ke-${g.h24})`);
      }
      for (const j of [0, 1, 2, 3]) {
        const nm = ketemu(o, `bh${j}-nm`);
        if (nm) {
          const d = /^(\d\d)\.(\d\d)$/.exec(isiTeks(o, `bh${j}-dg`) ?? "");
          stat.bagian += 1;
          cek(nm.isi === NAMA_BAGIAN[j] && d && bagianDari24(Number(d[1])) === BAGIAN[j] && d[2] === "00", `${nm.isi}: kartu jam digital ${d?.[0]} termasuk ${BAGIAN[j]} sesuai aturan jam`);
        }
        const bn = ketemu(o, `bg${j}-nm`);
        if (bn) {
          stat.bagian += 1;
          cek(bn.isi === NAMA_BAGIAN[j], `${nama}: kolom ${j} bernama ${NAMA_BAGIAN[j]}`);
          const kg = isiTeks(o, `bg${j}-kg`);
          if (kg) {
            const e = JADWAL_UJI.find((x) => x[0] === kg.toLowerCase());
            cek(e && e[2] === BAGIAN[j], `${nama}: kegiatan ${kg} di kolom ${NAMA_BAGIAN[j]} sesuai jamnya`);
          }
        }
      }
      {
        const kol = [0, 1, 2, 3].map((j) => ketemu(o, `bg${j}-k`)).filter(Boolean);
        for (let q = 1; q < kol.length; q += 1) cek(kol[q].x > kol[q - 1].x, `${nama}: kolom bagian hari berurutan pagi, siang, sore, malam dari kiri ke kanan`);
      }
      const lama = bacaLama(o);
      for (const r of lama) {
        stat.lama += 1;
        cek(r.menit !== null, `${nama}: label lama "${r.label}" berbentuk angka dan satuan`);
        if (r.menit === null) continue;
        cek(r.satuan === (r.menit >= 60 ? "jam" : "menit") && (r.satuan === "menit" ? r.menit < 60 : r.menit % 60 === 0), `${nama}: label lama ${r.label} memakai satuan yang pas`);
        if (r.bar) cek(r.bar.w === r.menit * 2, `${nama}: lebar batang ${r.nama} (${r.bar.w}) sama dengan dua kali ${r.menit} menit`);
      }
      if (lama.length >= 2 && lama.every((r) => r.bar)) {
        const urut = [...lama].sort((x, y) => x.menit - y.menit);
        cek(urut.every((r, q) => q === 0 || r.bar.w > urut[q - 1].bar.w), `${nama}: batang yang lebih lama lebih panjang`);
      }
      // dua jam (mulai dan selesai) dan selisihnya dengan batang lama.
      {
        const a1 = jamO.find((c) => c.id === "j1" && c.utuh);
        const a2 = jamO.find((c) => c.id === "j2" && c.utuh);
        const bar = lama.find((r) => r.j === "1" && r.satuan === "jam");
        if (a1 && a2 && bar && ["lama-jam", "lama-dua-jam"].includes(a.id)) {
          const beda = (jam12(a2) - jam12(a1) + 12) % 12;
          cek(beda === bar.menit / 60, `${nama}: lama dari jam ${jam12(a1)} sampai jam ${jam12(a2)} adalah ${beda} jam, batang berlabel ${bar.label}`);
        }
        if (a1 && a2 && bar && a.id === "latihan-tiga") {
          const beda = (jam12(a2) - jam12(a1) + 12) % 12;
          cek(beda === bar.menit / 60, `${nama}: lama dari jam ${jam12(a1)} sampai jam ${jam12(a2)} adalah ${beda} jam, batang berlabel ${bar.label}`);
        }
      }

      /* ---- kartu pilihan: tepat satu kartu cocok dengan hasil hitung dan yang disorot adalah jawaban ---- */
      {
        const kartuTeks = [1, 2, 3].map((q) => isiTeks(o, `c${q}-t`)).filter((x) => x !== undefined);
        if (kartuTeks.length) {
          stat.kartuPilihan += 1;
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

      /* ---- suara dihitung ulang terhadap gambar ---- */
      // (1) "jarum pendek di angka X" dan "jarum panjang di angka X".
      for (let p = 0; p + 4 < t.length; p += 1) {
        if (t[p] !== "jarum" || !/^(pendek|panjang)/.test(t[p + 1]) || t[p + 2] !== "di" || t[p + 3] !== "angka") continue;
        const r = bacaAngka(t, p + 4);
        if (!r) continue;
        const S = bacaJam(stateKe(akhirSegmen(tok, p + 4 + r[1] - 1)));
        const pendek = t[p + 1].startsWith("pendek");
        stat.jarumSuara += 1;
        cek(S.some((c) => (pendek ? c.p : c.m) && selisihSudut((pendek ? c.p : c.m).rot, (r[0] % 12) * 30) < 0.5), `${nama}: jarum ${pendek ? "pendek" : "panjang"} di angka ${NAMA[r[0]]} sesuai jarum di gambar`);
      }
      // (2) "pukul X (tepat | bagian hari)": jam di gambar, menit nol, dan bagian hari yang sah; kegiatan Kira sesuai data.
      for (let p = 0; p + 1 < t.length; p += 1) {
        if (t[p] !== "pukul") continue;
        const r = bacaAngka(t, p + 1);
        if (!r || r[0] < 1 || r[0] > 12) continue;
        const n = r[0];
        const lanjut = /[.,;:!?]$/.test(tok[p + r[1]]) ? undefined : t[p + 1 + r[1]];
        const q = akhirSegmen(tok, p + r[1]);
        const st = stateKe(q);
        const S = bacaJam(st).filter((c) => c.utuh);
        const Dq = bacaDigital(st);
        stat.pukulSuara += 1;
        if (S.length) cek(S.some((c) => jam12(c) === n && c.menit === 0), `${nama}: pukul ${NAMA[n]} sesuai jarum pada jam di gambar (jam: ${S.map((c) => jam12(c) + "." + c.menit).join(", ")})`);
        else if (Dq) cek(Dq.jam % 12 === n % 12 && Dq.menit === 0, `${nama}: pukul ${NAMA[n]} sama dengan jam digital ${isiTeks(st, "dg-t")}`);
        if (BAGIAN.includes(lanjut)) {
          const h = ke24(n, lanjut);
          cek(h !== null, `${nama}: pukul ${NAMA[n]} ${lanjut} adalah waktu yang sah untuk ${lanjut}`);
          if (h !== null) cek(bagianDari24(h) === lanjut, `${nama}: pukul ${NAMA[n]} ${lanjut} (jam ke-${h}) termasuk ${lanjut}`);
          if (Dq && S.length === 0) cek(Dq.jam === h, `${nama}: pukul ${NAMA[n]} ${lanjut} sama dengan jam digital ${isiTeks(st, "dg-t")}`);
          // Nama kegiatan tepat sebelum "pukul" (boleh dengan "mulai"): sesuai data.
          let b = p - 1;
          if (t[b] === "mulai") b -= 1;
          const nmKg = t[b - 1] === "makan" && t[b] === "siang" ? "makan siang" : NAMA_KEGIATAN.includes(t[b]) ? t[b] : null;
          if (nmKg) {
            stat.jadwalSuara += 1;
            const e = JADWAL_UJI.find((x) => x[0] === nmKg);
            cek(e[1] === n && e[2] === lanjut, `${nama}: ${nmKg} pukul ${NAMA[n]} ${lanjut} sama dengan data (${e})`);
          }
        }
      }
      // (3) jam digital dibaca: "<jam> titik nol nol" sama dengan tulisan di gambar; "termasuk <bagian hari>" sesuai jam.
      for (let p = 2; p + 2 < t.length; p += 1) {
        if (t[p] !== "titik" || t[p + 1] !== "nol" || t[p + 2] !== "nol") continue;
        let H = null;
        if (t[p - 2] === "nol" && NAMA.indexOf(t[p - 1]) >= 1 && NAMA.indexOf(t[p - 1]) <= 9) H = NAMA.indexOf(t[p - 1]);
        else {
          const r2 = bacaAngka(t, p - 2);
          const r1 = bacaAngka(t, p - 1);
          if (r2 && r2[1] === 2) H = r2[0];
          else if (r1 && r1[1] === 1) H = r1[0];
        }
        if (H === null) continue;
        const st = stateKe(akhirSegmen(tok, p + 2));
        const Dq = bacaDigital(st);
        const kartuDg = [0, 1, 2, 3].map((j) => isiTeks(st, `bh${j}-dg`)).filter(Boolean);
        stat.digitalSuara += 1;
        const teksDg = `${String(H).padStart(2, "0")}.00`;
        cek((Dq && Dq.jam === H && Dq.menit === 0) || kartuDg.includes(teksDg), `${nama}: jam digital yang dibaca ${teksDg} tampak di gambar (${isiTeks(st, "dg-t") ?? kartuDg.join(",")})`);
        if (t[p + 3] === "termasuk") cek(bagianDari24(H) === t[p + 4], `${nama}: ${teksDg} termasuk ${bagianDari24(H)}, bukan ${t[p + 4]}`);
      }
      // (4) "<kegiatan> di <bagian> hari" sesuai data.
      for (let p = 0; p + 3 < t.length; p += 1) {
        const dua = t[p] === "makan" && t[p + 1] === "siang";
        const nmKg = dua ? "makan siang" : NAMA_KEGIATAN.includes(t[p]) ? t[p] : null;
        if (!nmKg) continue;
        const s = p + (dua ? 2 : 1);
        if (t[s] !== "di" || !BAGIAN.includes(t[s + 1]) || t[s + 2] !== "hari") continue;
        stat.jadwalSuara += 1;
        cek(JADWAL_UJI.find((x) => x[0] === nmKg)[2] === t[s + 1], `${nama}: ${nmKg} di ${t[s + 1]} hari sama dengan data`);
      }
      // (5) rentang bagian hari: pagi pukul lima sampai pukul sepuluh; siang pukul sebelas sampai pukul dua; sore pukul tiga sampai pukul lima; malam mulai pukul enam malam.
      for (let p = 0; p + 4 < t.length; p += 1) {
        if (!BAGIAN.includes(t[p]) || t[p + 1] !== "dimulai" || t[p + 2] !== "sekitar" || t[p + 3] !== "pukul") continue;
        const a1 = bacaAngka(t, p + 4);
        if (!a1) continue;
        stat.rentang += 1;
        const dan = t[p + 4 + a1[1]] === "dan" && t[p + 5 + a1[1]] === "berakhir" && t[p + 6 + a1[1]] === "sekitar" && t[p + 7 + a1[1]] === "pukul";
        const b1 = dan ? bacaAngka(t, p + 8 + a1[1]) : null;
        if (t[p] === "malam") {
          cek(t[p + 4 + a1[1]] === "malam" && a1[0] === 6 && bagianDari24(ke24(6, "malam")) === "malam" && bagianDari24(17) === "sore", `${nama}: malam dimulai pukul enam malam (jam ke-18) sesuai aturan jam`);
          continue;
        }
        const AWAL = { pagi: [5, 10], siang: [11, 2], sore: [3, 5] }[t[p]];
        cek(!!b1 && a1[0] === AWAL[0] && b1[0] === AWAL[1], `${nama}: ${t[p]} dari pukul ${NAMA[a1[0]]} sampai pukul ${b1 ? NAMA[b1[0]] : "?"} sesuai aturan jam`);
        const h0 = ke24(AWAL[0], t[p]);
        const h1 = ke24(AWAL[1], t[p]);
        cek(h0 !== null && h1 !== null && bagianDari24(h0) === t[p] && bagianDari24(h1) === t[p] && bagianDari24(h0 - 1) !== t[p] && bagianDari24(h1 + 1) !== t[p], `${nama}: ujung rentang ${t[p]} (jam ke-${h0} sampai ${h1}) tepat batas bagian hari`);
      }
      for (const [id, b] of [["sg-t0", "siang"], ["sr-t0", "sore"]]) {
        const tx = isiTeks(o, id);
        if (tx === undefined) continue;
        stat.rentang += 1;
        const mm = /^(Siang|Sore): pukul (\d+) sampai (\d+)$/.exec(tx);
        cek(!!mm && mm[1].toLowerCase() === b && RENTANG[b][0] === Number(mm[2]) && RENTANG[b][1] === Number(mm[3]), `${nama}: kartu "${tx}" sesuai rentang ${b}`);
      }
      // (6) lama kegiatan: "<kegiatan> lebih lama/sebentar dari <kegiatan>", "<kegiatan> paling lama/sebentar", dan "<n> menit" atau "<n> jam".
      if (lama.length) {
        const kata = lama.map((r) => r.nama.toLowerCase()).sort((x, y) => y.length - x.length).map(escapeRe).join("|");
        const nilai = (nm) => lama.find((r) => r.nama.toLowerCase() === nm).menit;
        for (const s of kalimat) {
          if (s.endsWith("?")) continue;
          const kecil = s.toLowerCase().replace(/[^a-z\s]/g, " ").replace(/\s+/g, " ");
          for (const mm of kecil.matchAll(new RegExp(`(${kata}) lebih (lama|sebentar) dari (${kata})`, "g"))) {
            stat.bandingSuara += 1;
            const [x, y] = [nilai(mm[1]), nilai(mm[3])];
            cek(mm[2] === "lama" ? x > y : x < y, `${nama}: ${mm[1]} lebih ${mm[2]} dari ${mm[3]} sesuai lama di gambar (${x} dan ${y} menit)`);
          }
          for (const mm of kecil.matchAll(new RegExp(`(${kata}) paling (lama|sebentar)`, "g"))) {
            if (lama.length < 2) continue;
            stat.bandingSuara += 1;
            const x = nilai(mm[1]);
            const lain = lama.filter((r) => r.nama.toLowerCase() !== mm[1]).map((r) => r.menit);
            cek(mm[2] === "lama" ? lain.every((y) => x > y) : lain.every((y) => x < y), `${nama}: ${mm[1]} paling ${mm[2]} di antara kegiatan di gambar (${x} dibanding ${lain.join(", ")} menit)`);
          }
        }
      }
      for (let p = 0; p + 1 < t.length; p += 1) {
        const r = bacaAngka(t, p);
        if (!r || r[0] < 1) continue;
        const satuan = /[.,;:!?]$/.test(tok[p + r[1] - 1]) ? undefined : t[p + r[1]];
        if (satuan !== "menit" && satuan !== "jam") continue;
        const st = stateKe(akhirSegmen(tok, p + r[1]));
        const boleh = new Set();
        for (const x of bacaLama(st)) if (x.satuan === satuan) boleh.add(satuan === "jam" ? x.menit / 60 : x.menit);
        const [c1, c2] = ["j1", "j2"].map((id) => bacaJam(st).find((c) => c.id === id && c.utuh));
        if (satuan === "jam" && c1 && c2) boleh.add((jam12(c2) - jam12(c1) + 12) % 12);
        stat.durasiSuara += 1;
        cek(boleh.has(r[0]), `${nama}: "${NAMA[r[0]]} ${satuan}" sama dengan lama di gambar (${[...boleh].join(", ") || "tidak ada"})`);
      }
    });
  }
}

{
  // Adegan inti: jam, kegiatan, dan lama dihitung ulang (nilai yang diharapkan dari data, bukan dari kata kunci).
  const jamDi = (id, ke, jid) => {
    const c = bacaJam(akhirAdegan(adeganId(id), ke)).find((x) => x.id === jid);
    return c && c.utuh ? [jam12(c), c.menit] : null;
  };
  sama(jamDi("bagian-jam", 4, "j1"), [5, 0], "bagian jam: pukul lima tepat");
  sama([1, 2, 3].map((q) => jamDi("pukul-tepat", q, "j1")), [[6, 0], [7, 0], [12, 0]], "pukul tepat: enam, tujuh, dua belas");
  sama([1, 3, 4].map((q) => jamDi("jam-digital", q, "j1")), [[5, 0], [6, 0], [12, 0]], "jam digital: lima, enam, dua belas");
  sama([1, 2].map((q) => bacaDigital(akhirAdegan(adeganId("jam-digital"), q))?.jam), [5, 5], "jam digital: 05.00");
  sama([3, 4].map((q) => bacaDigital(akhirAdegan(adeganId("jam-digital"), q))?.jam), [6, 12], "jam digital: 06.00 dan 12.00");
  sama([jamDi("tiga-jam", 4, "j1"), jamDi("tiga-jam", 4, "j2"), jamDi("tiga-jam", 4, "j3")], [[5, 0], [2, 0], [7, 0]], "tiga jam: pukul lima, dua, tujuh");
  sama([jamDi("lama-dua-jam", 2, "j1"), jamDi("lama-dua-jam", 2, "j2")], [[3, 0], [5, 0]], "lama Halim berlari: pukul tiga sampai pukul lima");
  sama([jamDi("pagi", 2, "j1"), jamDi("pagi", 2, "j2")], [[6, 0], [7, 0]], "pagi: sarapan pukul enam, belajar pukul tujuh");
  sama([jamDi("pagi", 4, "j1"), jamDi("pagi", 4, "j2")], [[5, 0], [10, 0]], "pagi: dari pukul lima sampai pukul sepuluh");
  sama([jamDi("siang-sore", 1, "j1"), jamDi("siang-sore", 3, "j2")], [[12, 0], [4, 0]], "siang dan sore: pukul dua belas dan pukul empat");
  sama([jamDi("malam", 2, "j1"), jamDi("malam", 3, "j1")], [[9, 0], [6, 0]], "malam: pukul sembilan lalu pukul enam");
  sama([0, 1, 2, 3].map((j) => isiTeks(akhirAdegan(adeganId("bagian-digital"), 4), `bh${j}-dg`)), ["06.00", "12.00", "16.00", "19.00"], "kartu jam digital pagi, siang, sore, malam");
  sama(jamDi("latihan-satu", 2, "j1"), [8, 0], "latihan satu: pukul delapan");
  sama(bacaDigital(akhirAdegan(adeganId("latihan-satu"), 3)), { jam: 8, menit: 0 }, "latihan satu: jam digital 08.00");
  sama([bacaDigital(akhirAdegan(adeganId("latihan-dua"), 0))?.jam, bacaDigital(akhirAdegan(adeganId("latihan-dua"), 3))?.jam], [16, 13], "latihan dua: 16.00 lalu 13.00");
  sama([jamDi("latihan-tiga", 2, "j1"), jamDi("latihan-tiga", 2, "j2")], [[9, 0], [11, 0]], "latihan tiga: pukul sembilan sampai sebelas");
  sama([jamDi("lama-jam", 2, "j1"), jamDi("lama-jam", 2, "j2")], [[6, 0], [7, 0]], "lama olahraga: pukul enam sampai tujuh");
  sama([jamDi("luar-jam", 4, "j1"), bacaDigital(akhirAdegan(adeganId("luar-jam"), 4))?.jam], [[3, 0], 3], "metode luar jam: pukul tiga tepat dan 03.00");
  sama([jamDi("luar-jam-terapan", 2, "j1"), jamDi("luar-jam-terapan", 3, "j1")], [[10, 0], [11, 0]], "metode luar jam terapan: pukul sepuluh lalu sebelas");
  // Jadwal Kira: urut menurut jam 24 dari atas ke bawah.
  const baris = (id, ke) => bacaKegiatan(akhirAdegan(adeganId(id), ke)).sort((x, y) => x.y - y.y);
  const jd = baris("jadwal", 4);
  sama(jd.map((g) => g.nama.toLowerCase()), NAMA_KEGIATAN, "jadwal: lima kegiatan dari atas ke bawah");
  sama(jd.map((g) => g.h24), [6, 7, 12, 16, 21], "jadwal: jam ke-24 tiap kegiatan menaik");
  cek(jd.every((g, q) => q === 0 || g.h24 > jd[q - 1].h24), "jadwal: kegiatan berurutan menurut waktu");
  const u0 = baris("urut-kegiatan", 0);
  cek(u0.some((g, q) => q > 0 && g.h24 < u0[q - 1].h24), "urut kegiatan: mula-mula acak (tidak berurutan)");
  const u4 = baris("urut-kegiatan", 4);
  sama(u4.map((g) => g.h24), [6, 12, 16, 21], "urut kegiatan: akhirnya berurutan menurut waktu (6, 12, 16, 21)");
  const lb = bacaLama(akhirAdegan(adeganId("lama-banyak"), 4)).sort((x, y) => x.y - y.y);
  sama(lb.map((r) => r.menit), [1, 15, 60, 480], "lama beberapa kegiatan: satu menit, lima belas menit, satu jam, delapan jam");
  sama(lb.map((r) => r.label), ["1 menit", "15 menit", "1 jam", "8 jam"], "lama beberapa kegiatan: label");
  const bd = bacaLama(akhirAdegan(adeganId("banding"), 4)).sort((x, y) => x.j - y.j);
  sama(bd.map((r) => [r.nama, r.menit]), [["Olahraga", 60], ["Mandi", 15]], "banding: olahraga satu jam, mandi lima belas menit");
  const lr = bacaLama(akhirAdegan(adeganId("luar-lama"), 4)).sort((x, y) => x.j - y.j);
  sama(lr.map((r) => r.menit), [1, 15, 60], "metode luar lama: satu menit, lima belas menit, satu jam");
  const ur = [0, 1, 2, 3].map((j) => [isiTeks(akhirAdegan(adeganId("luar-urutan"), 2), `bg${j}-nm`), isiTeks(akhirAdegan(adeganId("luar-urutan"), 2), `bg${j}-kg`)]);
  sama(ur, [["Pagi", "Sarapan"], ["Siang", "Makan siang"], ["Sore", "Bermain"], ["Malam", "Tidur"]], "metode luar urutan: kegiatan di kolom bagian hari");
  sama(bacaKegiatan(akhirAdegan(adeganId("luar-urutan-terapan"), 0)).map((g) => g.h24).sort((x, y) => x - y), [7, 16], "metode luar urutan terapan: belajar jam ke-7, bermain jam ke-16");
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
  const DAFTAR = ["Jam analog dan digital", "Bagian hari dan kegiatan", "Lama dan urutan kegiatan"];
  cek(/Halo anak-anak/.test(sap.ketukan[0].suara) && /Jam analog dan digital/i.test(L.teksTerlihat(akhirAdegan(sap, 1)).join(" | ")), "sapaan materi: tiga hal yang dipelajari tampil");
  sama(L.teksTerlihat(akhirAdegan(sap, 1)).filter((t) => DAFTAR.includes(t)), DAFTAR, "sapaan materi: daftar tiga hal");
  cek(!/\d/.test(sap.ketukan[1].suara) && !/\d/.test(DAFTAR.join(" ")), "sapaan materi: tanpa angka");
  const sapLuar = adegan(U, "sapaan");
  cek(/cara lain/i.test(L.teksTerlihat(akhirAdegan(sapLuar, 1)).join(" | ")) && /metode-luar|Metode luar/.test(sapLuar.sumber), "sapaan metode luar: pengumuman cara lain");
  let sumberRingkas = null;
  try {
    sumberRingkas = JSON.parse(readFileSync(new URL("../src/data/kelas2-bab6-ringkas.json", import.meta.url), "utf8")).subBab?.B;
  } catch {
    sumberRingkas = null;
  }
  const sementara = new URL("../.tmp-k2b6s/B.json", import.meta.url);
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
    // Isi tabel dihitung ulang dari gambar jadwal pada video materi: nama, pukul, dan bagian hari tiap kegiatan; urutan dihitung dari jam ke-24.
    sama(T.kolom, ["Pukul", "Bagian", "Urutan"], "tabel susun: kolom pukul, bagian, urutan");
    const g = bacaKegiatan(akhirAdegan(adegan(M_VIDEO, "jadwal"), 4)).sort((x, y) => x.y - y.y);
    const urutan = ["Pertama", "Kedua", "Ketiga", "Keempat", "Kelima"];
    const peringkat = (h24) => [...g].sort((x, y) => x.h24 - y.h24).findIndex((x) => x.h24 === h24);
    sama(T.baris.map((b) => b.label), g.map((x) => x.nama), "tabel susun: label baris sama dengan kegiatan pada gambar jadwal");
    sama(
      T.baris.map((b) => b.sel),
      g.map((x) => [String(x.h12), x.bagian[0].toUpperCase() + x.bagian.slice(1), urutan[peringkat(x.h24)]]),
      "tabel susun: pukul, bagian hari, dan urutan sama dengan hasil hitung dari gambar jadwal",
    );
    cek(T.baris.every((b) => b.sel.every((s) => s.length <= 8)), "tabel susun: sel pendek supaya margin teks >= 5 px di 405 px");
    cek(new Set(T.baris.map((b) => b.label)).size === T.baris.length, "tabel susun: label tiap baris berbeda");
    const KATA_LARANG = /buku|halaman|kunci|kerja kelompok|\bkelompok|\bteman|kawan|kelas\b|kertas|pensil|\bbawa\b|menggambar|menulis di|depan kelas|luas|keliling|di rumah|survei|karet gelang|uang tabungan|di sekitar|loker|ibu guru|bersusun|\bkali\b|gunting|\bpaku\b/i;
    cek(!KATA_LARANG.test(JSON.stringify({ p: A.petaSusun, t: A.tabelSusun })), "peta dan tabel susun: tanpa kata terlarang dan tanpa kelompok, teman, kelas, buku, kertas, pensil");
    cek(!/Clock Reading|Duration Sense|Day Sequence|Compare Mass/i.test(JSON.stringify(A)), "peta dan tabel susun: tanpa nama metode berbahasa Inggris");
    cek(peta.every((s) => ![...s.teks, ...(s.ikon ?? "")].some((c) => c.codePointAt(0) > 0x1fa95)), "peta susun: emoji paling tinggi Emoji 12");
  } else cek(false, "peta dan tabel susun: .tmp-k2b6s/B.json atau kelas2-bab6-ringkas.json subBab.B.petaSusun ada");
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k2b6B-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k2b6B-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k2b6B sendiri (${impor.join(", ")})`);
  }
  // Emoji dalam data teks gambar juga paling tinggi Emoji 12 (diperiksa pada gambar yang diputar).
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d), `${v.id}/${a.id}: emoji gambar paling tinggi Emoji 12`);
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k2b6b.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|naskah-k1b|naskah-k2b6|data-k2b6|video-k2b6-umum/.test(pembungkus) && /VIDEO_MATERI_K2B6B/.test(pembungkus) && /VIDEO_LUAR_K2B6B/.test(pembungkus) && /export function VideoK2B6B/.test(pembungkus) && /daftar-video-cerita/.test(pembungkus), "video-k2b6b.tsx: dua video dari mesin Story, tanpa naskah lama");
  cek(!/\r/.test(pembungkus), "video-k2b6b.tsx: akhir baris LF");
  const sendiri = readFileSync(new URL("uji-story-k2b6B.mjs", import.meta.url), "utf8");
  cek(!/\r/.test(sendiri), "uji-story-k2b6B.mjs: akhir baris LF");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit diputar)`);
}
console.log(`Pemeriksaan: ${stat.jam} jam analog (jarum, poros, angka, hubungan kedua jarum), ${stat.angka} angka pada muka jam, ${stat.digital} jam digital, ${stat.jarumSuara} jarum di suara, ${stat.pukulSuara} pukul di suara, ${stat.digitalSuara} jam digital dibaca, ${stat.jadwalSuara} kegiatan di suara, ${stat.kegiatan} baris kegiatan, ${stat.bagian} kartu bagian hari, ${stat.rentang} rentang bagian hari, ${stat.lama} baris lama, ${stat.bandingSuara} lebih lama atau lebih sebentar di suara, ${stat.durasiSuara} menit atau jam di suara, ${stat.kartuPilihan} kartu pilihan, ${jumlahNama} nama bilangan tampak sebagai angka`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);