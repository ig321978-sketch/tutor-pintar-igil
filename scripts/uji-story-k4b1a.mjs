// Uji Story Kelas 4 Bab 1 Sub-Bab A (Membaca dan Menulis Bilangan Cacah sampai 10.000, termasuk pembuka bab): dua video (materi kurikulum dan metode luar) dengan mesin animasi Story.
// Naskah ORISINAL IGIL: uji ini tidak lagi menegaskan teks buku (tanpa kutipan, tanpa pencocokan PDF); buku hanya rujukan topik dan rentang angka.
// Memeriksa: pemicu kata, suara tanpa digit, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas, teks bertumpuk, pemisahan materi dan metode luar (nama metode hanya Indonesia),
// kata terlarang (buku, kelompok, teman, kelas, benda fisik, tokoh dan konteks buku lama), tokoh hanya enam, kalimat pendek, gambar lebih banyak daripada teks,
// dan HITUNG ULANG dari struktur adegan: terbilang mandiri (bilangan ke nama), tabel empat tempat, kartu bilangan dan kartu nama, balok digital, kartu angka, nol penjaga tempat,
// pilihan latihan dan kuncinya, bilangan yang disebut di suara tampak di gambar, rentang sampai sepuluh ribu, dan emoji paling tinggi Emoji 12.
// Jalankan: node --no-warnings scripts/uji-story-k4b1a.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k4b1a-video.ts");
const U1 = await import("../src/components/modul/story/k4b1a-luar-1.ts");

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
const VIDEO = [V.VIDEO_MATERI_K4B1A, V.VIDEO_LUAR_K4B1A];
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
const M_VIDEO = V.VIDEO_MATERI_K4B1A;
const U = V.VIDEO_LUAR_K4B1A;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const NAMA_LUAR = /Balok Empat Tingkat|Papan Empat Tempat|Nol Penjaga Tempat|metode luar|metode dari luar/i;
const NAMA_INGGRIS = /Dienes|Place-Value|Place Value|Zero as Placeholder|Say-Write-Show|Digit Cards|Base[- ]Ten|Expanded Form|Number Line|Singapore Math|Van de Walle/i;
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
const picto = (o) => o.t !== "teks" || /^\p{Extended_Pictographic}/u.test(o.isi ?? "");
const stat = { lisan: 0, papan: 0, balok: 0, kartu: 0, pilihan: 0, nama: 0, nol: 0, angka: 0 };
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M_VIDEO);
  const luar = teksVideo(U);
  cek(!NAMA_LUAR.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of U1.NAMA_METODE_ID) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE_ID, ["Balok Empat Tingkat", "Papan Empat Tempat", "Nol Penjaga Tempat"], "nama Indonesia metode luar");
  cek(!NAMA_INGGRIS.test(materi) && !NAMA_INGGRIS.test(luar), "nama metode hanya bahasa Indonesia (tanpa nama Inggris)");
  const TERLARANG = /buku|panduan guru|hlm|halaman|kunci|rubrik|salah ketik|salah cetak|tambahan video|contoh video|temuan|pertemuan|loker|ibu guru|singapura/i;
  const LARANG_ATURAN = /kelompok|\bteman|kawan|\bkelas\b|kertas|karton|gunting|spidol|pensil|penggaris|\bbawa\b|pisau|\bkoin\b|\buang\b|rupiah|benda nyata|sekolah|\brumah\b/i;
  // Konteks dan tokoh buku lama tidak boleh muncul: naskah ini orisinal.
  const KONTEKS_BUKU = /minimarket|Helen|Slamet|Semeru|Mahameru|gunung|label harga|struk|kardus|jarak |mdpl|kemasan/i;
  for (const v of [M_VIDEO, U]) {
    cek(!TERLARANG.test(`${v.judul} ${v.subjudul}`), `${v.id}: judul dan subjudul video tanpa kata terlarang`);
    cek(!/nomor|no\./i.test(v.subjudul) && v.subjudul.length <= 40, `${v.id}: subjudul pendek tanpa nomor halaman`);
    let gambar = 0;
    let kata = 0;
    for (const a of v.adegan) {
      const semua = [a.judul, a.sumber];
      a.ketukan.forEach((kt, i) => {
        semua.push(kt.suara);
        for (let p = 0; p < L.kataDari(kt.suara).length; p += 1) semua.push(...L.teksTerlihat(L.keadaanStory(a, i, p)));
        // Kalimat pendek: tiap kalimat paling banyak 17 kata.
        for (const kal of kt.suara.split(/(?<=[.?!])\s+/)) cek(L.kataDari(kal).length <= 17, `${v.id}/${a.id}#${i + 1}: kalimat pendek (paling banyak 17 kata): "${kal}"`);
        const akhir = L.keadaanStory(a, i, 9999);
        gambar += akhir.filter(picto).length;
        kata += akhir.filter((o) => !picto(o) && o.isi && (o.op ?? 1) > 0).length;
        const lisan = akhir.filter((o) => !picto(o) && o.isi && (o.op ?? 1) > 0);
        cek(lisan.length <= 12, `${v.id}/${a.id}#${i + 1}: paling banyak 12 teks terlihat (ada ${lisan.length})`);
        cek(lisan.every((o) => o.isi.length <= 34), `${v.id}/${a.id}#${i + 1}: tiap teks layar paling banyak 34 huruf`);
      });
      const kena = semua.filter((t) => TERLARANG.test(t) || /soal nomor|nomor [1-9]|catatan video|menurut buku/i.test(t));
      cek(kena.length === 0, `${v.id}/${a.id}: tanpa penyebutan buku atau catatan sumber (${kena.slice(0, 2).join(" | ")})`);
      const larang = semua.filter((t) => LARANG_ATURAN.test(t));
      cek(larang.length === 0, `${v.id}/${a.id}: tanpa kerja kelompok, kelas, teman, kertas, benda fisik nyata (${larang.slice(0, 2).join(" | ")})`);
      const lama = semua.filter((t) => KONTEKS_BUKU.test(t));
      cek(lama.length === 0, `${v.id}/${a.id}: tanpa tokoh atau konteks buku lama (${lama.slice(0, 2).join(" | ")})`);
      cek(!/Uji Kompetensi|Pengayaan|Ayo Berlatih|Ayo Berdiskusi|Ayo Berefleksi|Ayo Mengingat|Ayo Berkomunikasi|Ayo Berpikir|Ayo Berkarya|Ayo Bermain|Ayo Mencoba|Ayo Mengamati|Ayo Beraktivitas|soal \d|Soal \d|Aktivitas|Eksplorasi|Refleksi/.test(semua.join(" | ")), `${v.id}/${a.id}: latihan disajikan sebagai Latihan, tanpa istilah buku`);
      // Tokoh hanya enam tokoh tetap (Malosi, Kira, Upe, Wei, Halim, Igil).
      cek(!/\b(Tika|Lili|Paman|Ibu|Ayah|Bapak|Budi|Ani|Doni|Sinta|Dewi|Rudi|Nina|Andi|Siti|Bu Guru|Pak Guru|Pak|Ahmad|Alfa|Galih|Alen|Meutia|Bandi|Slamet|Helen|Toni|Wicak)\b/.test(semua.join(" | ")), `${v.id}/${a.id}: hanya enam tokoh tetap`);
      cek(semua.every((t) => ![...t].some((c) => c.codePointAt(0) > 0x1fa95)), `${v.id}/${a.id}: emoji paling tinggi Emoji 12`);
    }
    cek(gambar >= kata, `${v.id}: gambar lebih banyak daripada teks (gambar ${gambar}, teks ${kata})`);
  }
  cek(M_VIDEO.subjudul === "Materi kurikulum" && U.subjudul === "Tiga metode luar", "subjudul video: Materi kurikulum dan Tiga metode luar");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 46), "video materi: label sumber berbentuk Materi: ... dan pendek");
  cek(U.adegan.every((a) => /Metode luar|Ringkasan/i.test(a.sumber) && a.sumber.length <= 46), "video metode luar: label sumber metode luar atau ringkasan, pendek");
  cek(M_VIDEO.id === "k4b1a-materi" && U.id === "k4b1a-luar", "id video k4b1a-materi dan k4b1a-luar");
  cek(U.judul.endsWith(": Metode dari Luar") && !/menurut/i.test(M_VIDEO.judul), "judul video: materi tanpa 'menurut', luar berakhir ': Metode dari Luar'");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,cerita-skor,kartu-angka,tabel-tempat,cara-baca,menulis-bilangan,nol-membaca,nol-menulis,seribu-belas,sepuluh-ribu,latihan-satu,latihan-dua,latihan-tiga,latihan-empat,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-balok,luar-balok-terapan,luar-papan,luar-papan-terapan,luar-nol,luar-nol-terapan,luar-ringkas", "urutan adegan metode luar");
  cek(M_VIDEO.adegan[0].id === "sapaan" && U.adegan[0].id === "sapaan", "tiap video dibuka adegan sapaan");
  cek(M_VIDEO.adegan.filter((a) => /^latihan-/.test(a.id)).length === 4 && M_VIDEO.adegan[M_VIDEO.adegan.length - 1].id === "penutup", "video materi: Latihan 1 sampai 4 lalu penutup");
  cek(U.adegan[1].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  cek(U.adegan.length - 3 === 6, "video metode luar: konsep dan penerapan untuk tiga metode (6 adegan di antara pembuka dan ringkasan)");
  for (const kata of ["Latihan", "Kira", "Wei", "Upe", "Halim", "Malosi", "ribuan", "ratusan", "puluhan", "satuan", "angka nol", "seribu", "sebelas", "sepuluh ribu", "lima ribu delapan ratus empat puluh dua", "tujuh ribu empat ratus dua puluh tiga"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  cek(["Upe", "Kira", "Halim"].every((n) => luar.includes(n)), "video metode luar memuat tokoh Upe, Kira, dan Halim");
  // Batas sub-bab: tanpa nilai tempat (sub-bab B), membandingkan, menyusun, operasi hitung, rumus, atau satuan baku.
  const BOCOR = /kilogram|\bgram\b|\bkg\b|dikali|perkalian|pembagian|dibagi|rumus|liter|nilai tempat|membandingkan|lebih besar|lebih kecil|urutkan|bentuk panjang|faktor|kelipatan|×|÷/i;
  for (const v of [M_VIDEO, U]) {
    for (const a of v.adegan) cek(!BOCOR.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa nilai tempat, perbandingan, operasi, satuan baku`);
    for (const a of v.adegan) for (const i of a.ketukan.keys()) for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) for (const b of bilanganDari(t)) cek(Number(b) <= 10000, `${v.id}/${a.id}#${i + 1}: angka di gambar paling besar sepuluh ribu ("${t}")`);
  }
  const ketMateri = M_VIDEO.adegan.reduce((t, ad) => t + ad.ketukan.length, 0);
  cek(totalKetukan >= 80 && ketMateri >= 50, `total ketukan cukup dalam (${totalKetukan}; materi ${ketMateri})`);
  const kataMateri = kataVideo(M_VIDEO);
  cek(kataMateri / 120 >= 5.5 && kataMateri / 120 <= 12, `durasi materi diputar 5,5 sampai 12 menit (${(kataMateri / 120).toFixed(1)} menit)`);
  cek(kataVideo(U) / 120 >= 2.5, `durasi video luar paling sedikit 2,5 menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
}

/* ------------------------------ Kemurnian berkas: tanpa kutipan buku dan tanpa pencocokan PDF ------------------------------ */
{
  const dir = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(dir).filter((f) => /^k4b1a-.*\.ts$/.test(f));
  cek(berkas.length === 9, `sembilan berkas k4b1a-* (ada ${berkas.length}: ${berkas.join(", ")})`);
  for (const f of berkas) {
    const isi = readFileSync(new URL(f, dir), "utf8");
    cek(!/\bkutipan\s*:|kutipan-lokal|__kutipanLokal/.test(isi), `${f}: tanpa kutipan buku`);
    cek(f.endsWith("-video.ts") || f.endsWith("-bantu.ts") || /Matematika untuk SD\/MI Kelas IV/.test(isi), `${f}: memuat rujukan (judul buku, kelas, bab) di komentar`);
  }
}

/* ------------------------------ Terbilang mandiri (bilangan ke nama) ------------------------------ */
const SAT = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];
/** Nama bilangan 0 sampai 10000 dihitung dari angkanya. */
const terbilang = (n) => {
  if (n === 10000) return "sepuluh ribu";
  if (n === 0) return "nol";
  const r = Math.floor(n / 1000);
  const s = Math.floor((n % 1000) / 100);
  const p = Math.floor((n % 100) / 10);
  const u = n % 10;
  const bagian = [];
  if (r) bagian.push(r === 1 ? "seribu" : `${SAT[r]} ribu`);
  if (s) bagian.push(s === 1 ? "seratus" : `${SAT[s]} ratus`);
  if (p === 1) bagian.push(u === 0 ? "sepuluh" : u === 1 ? "sebelas" : `${SAT[u]} belas`);
  else {
    if (p > 1) bagian.push(`${SAT[p]} puluh`);
    if (u) bagian.push(SAT[u]);
  }
  return bagian.join(" ");
};
const rb = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const angkaDari = (t) => Number(String(t).replace(/\./g, ""));
/** Nilai dari nama bilangan (arah sebaliknya, dipakai untuk soal menulis). */
const nilaiNama = (nama) => {
  const w = nama.split(/\s+/);
  let total = 0;
  let cur = 0;
  let tunda = 0;
  for (const x of w) {
    const u = SAT.indexOf(x);
    if (u > 0) tunda = u;
    else if (x === "sepuluh") cur += 10;
    else if (x === "sebelas") cur += 11;
    else if (x === "belas") {
      cur += tunda + 10;
      tunda = 0;
    } else if (x === "puluh") {
      cur += tunda * 10;
      tunda = 0;
    } else if (x === "seratus") cur += 100;
    else if (x === "ratus") {
      cur += tunda * 100;
      tunda = 0;
    } else if (x === "seribu") total += 1000;
    else if (x === "ribu") {
      total += (cur + tunda || 1) * 1000;
      cur = 0;
      tunda = 0;
    }
  }
  return total + cur + tunda;
};
sama([terbilang(5842), terbilang(1350), terbilang(4175), terbilang(4612), terbilang(2711), terbilang(5310), terbilang(6904), terbilang(1409), terbilang(8206), terbilang(5027), terbilang(3490), terbilang(4003), terbilang(3006), terbilang(10000), terbilang(9999), terbilang(1000)], ["lima ribu delapan ratus empat puluh dua", "seribu tiga ratus lima puluh", "empat ribu seratus tujuh puluh lima", "empat ribu enam ratus dua belas", "dua ribu tujuh ratus sebelas", "lima ribu tiga ratus sepuluh", "enam ribu sembilan ratus empat", "seribu empat ratus sembilan", "delapan ribu dua ratus enam", "lima ribu dua puluh tujuh", "tiga ribu empat ratus sembilan puluh", "empat ribu tiga", "tiga ribu enam", "sepuluh ribu", "sembilan ribu sembilan ratus sembilan puluh sembilan", "seribu"], "terbilang mandiri: contoh");
for (let n = 1; n <= 10000; n += 1) {
  if (nilaiNama(terbilang(n)) !== n) cek(false, `terbilang ${n}: dibaca kembali sama (${terbilang(n)})`);
}
cek(true, "terbilang 1 sampai 10000 dibaca kembali sama");

/* ------------------------------ Bilangan yang diucapkan dengan kata tampak di gambar ------------------------------ */
const NAMA_ANGKA = new Set([...SAT, "sepuluh", "sebelas", "seratus", "seribu", "belas", "puluh", "ratus", "ribu"]);
const deretBilangan = (suara) => {
  const hasil = [];
  let run = [];
  const tutup = () => {
    if (run.length && !["puluh", "belas", "ratus", "ribu"].includes(run[0])) {
      const nilai = nilaiNama(run.join(" "));
      if (nilai >= 10) hasil.push({ kata: run.join(" "), nilai });
    }
    run = [];
  };
  for (const mentah of suara.split(/\s+/).filter(Boolean)) {
    const w = mentah.toLowerCase().replace(/[^a-z]/g, "");
    if (NAMA_ANGKA.has(w)) run.push(w);
    else tutup();
    if (/[,.:;?!]$/.test(mentah)) tutup();
  }
  tutup();
  return hasil;
};
for (const v of VIDEO) {
  for (const a of v.adegan) {
    const terlihat = new Set();
    a.ketukan.forEach((kt, i) => {
      for (let p = 0; p < L.kataDari(kt.suara).length; p += 1) for (const o of L.keadaanStory(a, i, p)) if (o.t === "teks" && o.isi) for (const b of bilanganDari(o.isi)) terlihat.add(Number(b));
    });
    const namaTerlihat = [...terlihat].filter((n) => n >= 10).map((n) => ` ${terbilang(n)} `);
    a.ketukan.forEach((kt, i) => {
      for (const d of deretBilangan(kt.suara)) {
        stat.lisan += 1;
        // Bilangan lisan harus tampak sebagai angka di adegan, atau bagian dari nama bilangan yang tampak.
        cek(terlihat.has(d.nilai) || namaTerlihat.some((n) => n.includes(` ${d.kata} `)), `${v.id}/${a.id}#${i + 1}: bilangan lisan "${d.kata}" (${d.nilai}) tampak di gambar adegan`);
      }
    });
  }
}

/* ------------------------------ Gambar dihitung ulang: tabel, kartu bilangan dan nama, balok, kartu angka, nol ------------------------------ */
const digitPapan = (objs, id = "pp") => [0, 1, 2, 3].map((i) => ketemu(objs, `${id}-dt${i}`)?.isi);
const namaDari = (objs, id) => {
  const baris = [];
  for (let i = 0; i < 4; i += 1) {
    const t = ketemu(objs, `${id}-t${i}`)?.isi;
    if (t !== undefined) baris.push(t);
  }
  return baris.length ? baris.join(" ") : null;
};
const VALID_DIGIT = /^[0-9]$/;
for (const v of VIDEO) {
  for (const a of v.adegan) {
    a.ketukan.forEach((kt, i) => {
      const nama = `${v.id}/${a.id}#${i + 1}`;
      for (let p = 0; p < L.kataDari(kt.suara).length; p += 1) {
        const objs = L.keadaanStory(a, i, p);
        // Bilangan di layar selalu bertitik ribuan (kecuali digit di papan): tanpa "5842" telanjang.
        for (const o of objs) if (o.t === "teks" && /^\d{4,5}$/.test(o.isi ?? "")) cek(false, `${nama}: bilangan "${o.isi}" harus memakai titik ribuan`);
      }
      const objs = L.keadaanStory(a, i, 9999);
      // Papan empat tempat: empat angka (tanpa awalan nol) sama dengan kartu bilangan dan kartu nama.
      const dg = digitPapan(objs);
      const lengkap = dg.every((d) => d !== undefined && VALID_DIGIT.test(d));
      const bl = ketemu(objs, "bl-t0")?.isi;
      const nm = namaDari(objs, "nm");
      if (lengkap) {
        stat.papan += 1;
        const n = Number(dg.join(""));
        cek(dg[0] !== "0", `${nama}: papan tidak diawali nol (${dg.join("")})`);
        cek(n >= 1000 && n <= 9999, `${nama}: papan bilangan empat angka (${n})`);
        if (bl !== undefined) cek(bl === rb(n), `${nama}: kartu bilangan ${bl} sama dengan papan ${dg.join("")}`);
        if (nm !== null) {
          stat.nama += 1;
          cek(nm === terbilang(n), `${nama}: kartu nama "${nm}" sama dengan terbilang(${n}) = "${terbilang(n)}"`);
        }
        // Nol penjaga tempat: tanpa nol bilangan jadi pendek.
        const sl = ketemu(objs, "sl-t0")?.isi;
        if (sl !== undefined) {
          stat.nol += 1;
          cek(sl === dg.filter((d) => d !== "0").join(""), `${nama}: bilangan tanpa nol "${sl}" sama dengan papan tanpa angka nol`);
        }
      } else {
        // Papan belum lengkap: angka yang sudah ada harus digit tunggal atau tanda tanya.
        for (const d of dg) cek(d === undefined || VALID_DIGIT.test(d) || d === "?", `${nama}: isi papan digit atau tanda tanya ("${d}")`);
        const sl = ketemu(objs, "sl-t0")?.isi;
        if (sl !== undefined) {
          stat.nol += 1;
          cek(sl === dg.filter((d) => d !== undefined && d !== "0" && d !== "?").join(""), `${nama}: bilangan tanpa nol "${sl}" sama dengan angka papan selain nol`);
        }
      }
      // Pasangan kartu bilangan dan kartu nama lain.
      for (const [b, n] of [["bl", "nm"], ["bm", "nn"]]) {
        const tb = ketemu(objs, `${b}-t0`)?.isi;
        const tn = namaDari(objs, n);
        if (tb !== undefined && tn !== null) {
          stat.nama += 1;
          cek(tn === terbilang(angkaDari(tb)), `${nama}: kartu ${b}/${n} "${tb}" = "${tn}", seharusnya "${terbilang(angkaDari(tb))}"`);
        }
      }
      for (const b of ["bl", "bm"]) {
        const tb = ketemu(objs, `${b}-t0`)?.isi;
        if (tb !== undefined && /^[\d.]+$/.test(tb)) {
          stat.angka += 1;
          cek(rb(angkaDari(tb)) === tb && angkaDari(tb) >= 1000 && angkaDari(tb) <= 10000, `${nama}: kartu bilangan ${tb} berbentuk titik ribuan, sampai sepuluh ribu`);
        }
      }
      // Balok digital: nilai dari jumlah balok yang terlihat sama dengan kartu bilangan dan label lajur.
      const hit = (j) => objs.filter((o) => new RegExp(`^bk-${j}\\d+$`).test(o.id) && (o.op ?? 1) >= 0.5).length;
      const [bp, bu, bb, bo] = ["p", "u", "b", "o"].map(hit);
      if (bp + bu + bb + bo > 0) {
        stat.balok += 1;
        cek([bp, bu, bb, bo].every((x) => x <= 9), `${nama}: tiap jenis balok paling banyak sembilan (${[bp, bu, bb, bo]})`);
        const nilai = bp * 1000 + bu * 100 + bb * 10 + bo;
        if (bl !== undefined) cek(bl === rb(nilai), `${nama}: kartu bilangan ${bl} sama dengan nilai balok ${nilai}`);
        const lab = ["bt0", "bt1", "bt2", "bt3"].map((id) => ketemu(objs, `${id}`)?.isi);
        [[bp, "peti"], [bu, "dus"], [bb, "bungkus"], [bo, "benda"]].forEach(([c, nm2], q) => {
          if (lab[q] !== undefined) cek(lab[q] === `${c} ${nm2}`, `${nama}: label lajur "${lab[q]}" sama dengan ${c} ${nm2}`);
        });
      }
      // Contoh nilai satu balok: peti seribu, dus seratus, bungkus sepuluh, benda satu; tiap tingkat sepuluh kali tingkat di bawahnya.
      const sv = ["sv0", "sv1", "sv2", "sv3"].map((id) => ketemu(objs, id)?.isi);
      if (sv.every((x) => x !== undefined)) {
        stat.balok += 1;
        sama(sv.map(angkaDari), [1000, 100, 10, 1], `${nama}: nilai satu peti, dus, bungkus, benda`);
        sama(sv.map(angkaDari).slice(0, 3).map((x, q) => x / angkaDari(sv[q + 1])), [10, 10, 10], `${nama}: tiap tingkat sepuluh kali tingkat di bawahnya`);
      }
    });
  }
}
{
  // Kartu angka: kartu pilihan, susunan, dan kartu bilangan.
  const a = adegan(M_VIDEO, "kartu-angka");
  const o1 = akhirAdegan(a, 0);
  sama([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => ketemu(o1, `kd${d}-t`)?.isi), ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], "kartu angka: sepuluh kartu nol sampai sembilan");
  const o2 = akhirAdegan(a, 1);
  const pilih = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].filter((d) => ketemu(o2, `kd${d}-k`)?.sorot);
  const o3 = akhirAdegan(a, 2);
  const susun = [0, 1, 2, 3].map((q) => ketemu(o3, `ks${q}-t`)?.isi);
  const o4 = akhirAdegan(a, 3);
  stat.kartu += 1;
  sama(pilih, [2, 4, 5, 8], "kartu angka: empat kartu terpilih (dua, empat, lima, delapan)");
  sama([...susun].map(Number).sort((x, y) => x - y), pilih, "kartu angka: susunan memakai empat kartu terpilih");
  cek(ketemu(o4, "bl-t0")?.isi === rb(Number(susun.join(""))), "kartu angka: kartu bilangan sama dengan susunan kartu");
  // Skor Kira: bilangan terkecil dan terbesar empat angka.
  const c = akhirAdegan(adegan(M_VIDEO, "cerita-skor"));
  sama([ketemu(c, "tk-t1")?.isi, ketemu(c, "tb-t1")?.isi], ["1.000", "9.999"], "skor: bilangan empat angka terkecil dan terbesar");
  const s = akhirAdegan(adegan(M_VIDEO, "cerita-skor"), 1);
  cek(ketemu(s, "bl-t0")?.isi === rb(Number(susun.join(""))), "skor Kira sama dengan bilangan dari kartu angka");
}
{
  // Cara membaca: nama tiap tempat dihitung ulang dari angka papan.
  const o = akhirAdegan(adegan(M_VIDEO, "cara-baca"), 2);
  const dg = digitPapan(o).map(Number);
  const nilai = dg.map((d, q) => d * [1000, 100, 10, 1][q]);
  sama(["n1", "n2", "n3", "n4"].map((id) => ketemu(o, `${id}-t0`)?.isi), nilai.map(terbilang), "cara membaca: nama tiap tempat dihitung dari angka papan");
  sama(["n1", "n2", "n3", "n4"].map((id) => ketemu(o, `${id}-t0`)?.isi).join(" "), terbilang(Number(dg.join(""))), "cara membaca: gabungan nama tempat sama dengan nama bilangan");
}
{
  // Menulis: nama lebih dulu, lalu papan terisi angka per tempat sesuai nama.
  const a = adegan(M_VIDEO, "menulis-bilangan");
  const o = akhirAdegan(a);
  const n = nilaiNama(namaDari(o, "nm"));
  sama(digitPapan(o).join(""), String(n), "menulis: papan sama dengan nilai nama bilangan");
  cek(ketemu(o, "bl-t0")?.isi === rb(n), "menulis: kartu bilangan sama dengan nilai nama bilangan");
}
{
  // Nol: tiga contoh membaca memakai nol di ratusan, puluhan, dan satuan; angka nol tidak ada pada nama.
  const a = adegan(M_VIDEO, "nol-membaca");
  const urut = [[0, 5027, 1], [2, 8206, 2], [4, 3490, 3]];
  for (const [ke, n, tempatNol] of urut) {
    const o = akhirAdegan(a, ke);
    sama(digitPapan(o).join(""), String(n), `nol membaca: papan ketukan ${ke + 1}`);
    cek(digitPapan(o)[tempatNol] === "0", `nol membaca: angka nol ada di tempat ke-${tempatNol + 1}`);
    cek(!/nol/.test(terbilang(n)), `nol membaca: nama ${n} tidak menyebut nol`);
    if (ke >= 2 || ke === 0) cek(ketemu(o, "bl-t0")?.isi === rb(n), `nol membaca: kartu bilangan ${rb(n)}`);
  }
  const b = adegan(M_VIDEO, "nol-menulis");
  const ob = akhirAdegan(b);
  const nn = nilaiNama("empat ribu tiga");
  sama(digitPapan(ob).join(""), String(nn), "nol menulis: papan sama dengan nilai nama");
  cek(ketemu(akhirAdegan(b, 3), "bl-t0")?.isi === rb(nn) && ketemu(ob, "sl-t0")?.isi === "43", "nol menulis: kartu 4.003 dan salah tulis 43");
  const lo = adegan(U, "luar-nol");
  const ol = akhirAdegan(lo);
  sama(digitPapan(ol).join(""), "3006", "nol penjaga: papan tiga ribu enam");
  cek(ketemu(ol, "bl-t0")?.isi === "3.006" && ketemu(ol, "sl-t0")?.isi === "36", "nol penjaga: 3.006 dan salah tulis 36");
}
{
  // Sebelas, sepuluh, dan belas: nama dihitung ulang dari angka puluhan dan satuan.
  const a = adegan(M_VIDEO, "seribu-belas");
  const o = akhirAdegan(a, 3);
  cek(ketemu(o, "bl-t0")?.isi === "2.711" && namaDari(o, "nm") === terbilang(2711) && /sebelas$/.test(terbilang(2711)), "sebelas: dua ribu tujuh ratus sebelas");
  cek(ketemu(o, "bm-t0")?.isi === "5.310" && namaDari(o, "nn") === terbilang(5310) && /sepuluh$/.test(terbilang(5310)), "sepuluh: lima ribu tiga ratus sepuluh");
  const b = akhirAdegan(a, 2);
  cek(digitPapan(b).join("") === "4612" && /dua belas$/.test(namaDari(b, "nm")) && ketemu(b, "pp-d2")?.sorot && ketemu(b, "pp-d3")?.sorot, "belas: puluhan satu dan satuan dua dibaca dua belas");
  cek(/^seribu/.test(namaDari(akhirAdegan(a, 0), "nm")) && /seratus/.test(namaDari(akhirAdegan(a, 1), "nm")), "satu di ribuan dibaca seribu, di ratusan dibaca seratus");
  // Sepuluh ribu: lima angka.
  const r = akhirAdegan(adegan(M_VIDEO, "sepuluh-ribu"));
  cek(ketemu(r, "bl-t0")?.isi === "10.000" && angkaDari("10.000") === 9999 + 1 && terbilang(10000) === "sepuluh ribu", "sepuluh ribu: 9.999 ditambah satu");
}

/* ------------------------------ Pilihan latihan dan kunci ------------------------------ */
const periksaPilihan = (v, idAdegan, keBuka, benar, adalahBenar, nama) => {
  const a = adegan(v, idAdegan);
  const objs = akhirAdegan(a, keBuka);
  const kartu = [1, 2, 3].map((i) => ketemu(objs, `c${i}-t`)?.isi);
  stat.pilihan += 1;
  cek(kartu.every((t) => typeof t === "string") && new Set(kartu).size === 3, `${nama}: tiga pilihan berbeda (${kartu.join(" | ")})`);
  cek(kartu.filter((t) => t && adalahBenar(t)).length === 1, `${nama}: tepat satu pilihan benar (${kartu.join(" | ")})`);
  const sorot = akhirAdegan(a, keBuka + 1).filter((o) => o.sorot).map((o) => o.id);
  cek(sorot.includes(`${benar}-k`) && sorot.filter((id) => /^c\d-k$/.test(id)).length === 1, `${nama}: satu pilihan disorot (${sorot})`);
  cek(adalahBenar(ketemu(objs, `${benar}-t`)?.isi ?? ""), `${nama}: pilihan yang disorot adalah jawaban benar`);
  return objs;
};
{
  // Latihan 1: baca 6.904 (kartu bilangan di layar), pilih namanya.
  const o = periksaPilihan(M_VIDEO, "latihan-satu", 1, "c2", (t) => t === terbilang(6904), "latihan-satu");
  cek(ketemu(o, "bl-t0")?.isi === rb(6904), "latihan-satu: bilangan di layar 6.904");
  // Latihan 2: nama lima belas... delapan ribu lima puluh enam, pilih angkanya (nilai dihitung dari nama).
  const a2 = akhirAdegan(adegan(M_VIDEO, "latihan-dua"), 0);
  const n2 = nilaiNama(namaDari(a2, "nm"));
  cek(n2 === 8056 && terbilang(n2) === namaDari(a2, "nm"), "latihan-dua: nama di layar bernilai 8.056");
  periksaPilihan(M_VIDEO, "latihan-dua", 1, "c1", (t) => angkaDari(t) === n2, "latihan-dua");
  // Latihan 3: baca 1.409 (seribu, nol di puluhan).
  const o3 = periksaPilihan(M_VIDEO, "latihan-tiga", 1, "c3", (t) => t === terbilang(1409), "latihan-tiga");
  cek(ketemu(o3, "bl-t0")?.isi === rb(1409), "latihan-tiga: bilangan di layar 1.409");
  cek(ketemu(o3, "c1-t")?.isi.startsWith("satu ribu"), "latihan-tiga: pengecoh memakai 'satu ribu' (salah)");
  // Latihan 4: tiga ribu empat ratus, pilih angkanya.
  const a4 = akhirAdegan(adegan(M_VIDEO, "latihan-empat"), 0);
  const n4 = nilaiNama(namaDari(a4, "nm"));
  cek(n4 === 3400, "latihan-empat: nama di layar bernilai 3.400");
  periksaPilihan(M_VIDEO, "latihan-empat", 1, "c2", (t) => angkaDari(t) === n4, "latihan-empat");
  // Papan Kira: papan 2.091, pilih namanya.
  const q = adegan(U, "luar-papan-terapan");
  const oq = akhirAdegan(q, 1);
  const nq = Number(digitPapan(oq).join(""));
  cek(nq === 2091, "papan terapan: papan Kira berisi 2.091");
  periksaPilihan(U, "luar-papan-terapan", 1, "c2", (t) => t === terbilang(nq), "papan terapan");
  // Nol penjaga: lima ribu tiga, pilih angkanya.
  const y = akhirAdegan(adegan(U, "luar-nol-terapan"), 0);
  const ny = nilaiNama(namaDari(y, "nm"));
  cek(ny === 5003, "nol terapan: nama di layar bernilai 5.003");
  periksaPilihan(U, "luar-nol-terapan", 1, "c3", (t) => angkaDari(t) === ny, "nol terapan");
  cek(digitPapan(akhirAdegan(adegan(U, "luar-nol-terapan"))).join("") === "5003", "nol terapan: papan akhir 5.003");
}
{
  // Balok terapan: empat peti, nol dus, enam bungkus, tiga benda.
  const o = akhirAdegan(adegan(U, "luar-balok-terapan"));
  const hit = (j) => o.filter((x) => new RegExp(`^bk-${j}\\d+$`).test(x.id)).length;
  sama([hit("p"), hit("u"), hit("b"), hit("o")], [4, 0, 6, 3], "balok terapan: empat peti, nol dus, enam bungkus, tiga benda");
  cek(ketemu(o, "bl-t0")?.isi === "4.063" && namaDari(o, "nm") === "empat ribu enam puluh tiga", "balok terapan: 4.063 dibaca empat ribu enam puluh tiga");
}
cek(stat.papan >= 20 && stat.nama >= 18 && stat.balok >= 5 && stat.pilihan >= 6 && stat.lisan >= 40 && stat.nol >= 3 && stat.angka >= 12, `cakupan hitung ulang cukup (${JSON.stringify(stat)})`);

console.log(`Hitung ulang: ${JSON.stringify(stat)}`);
console.log(`${VIDEO.map((v) => `${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, a) => t + a.ketukan.length, 0)} ketukan, ${kataVideo(v)} kata (sekitar ${(kataVideo(v) / 120).toFixed(1)} menit diputar)`).join("\n")}`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
