// Uji Story Kelas 3 Bab 2 Sub-Bab B (Kalimat Matematika Pengurangan): dua video (materi kurikulum dan metode luar) dengan mesin animasi Story baru.
// Video diputar bergaya guru: suara, teks terlihat, sumber, judul adegan, dan subjudul tanpa penyebutan buku.
// Memeriksa: pemicu kata, suara tanpa digit (bilangan dieja), perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas, teks bertumpuk,
// pemisahan materi dan metode luar (nama metode hanya Indonesia), lingkup (bilangan sampai seratus; tanpa bersusun, pinjam, simpan, kali, bagi),
// gambar lebih banyak daripada teks, dan HITUNG ULANG dari STRUKTUR gambar: setiap kalimat hitung yang tampak (a - b = c, a + b = c, dengan titik-titik atau tanda tanya)
// benar atau punya satu jawaban 0 sampai 100; bagan (batang atas = jumlah dua batang bawah, lebar batang sebanding); tabel (awal - dikurangkan = sisa);
// bungkus sepuluh (jumlah bungkus dan butir cocok dengan bilangan); jawaban latihan yang disorot sama dengan penyelesaian kalimat;
// setiap bilangan puluhan atau lebih yang diucapkan tampak sebagai angka di gambar; aturan pemilik; peta dan tabel susun; emoji paling tinggi Emoji 12; kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k3b2B.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k3b2B-video.ts");
const U1 = await import("../src/components/modul/story/k3b2B-luar-1.ts");

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
const EMOJI = /^[\u{1F000}-\u{1FFFF}]|^[✂✅❌➕❓]$/u;
const adaEmoji = (s) => /[\u{1F000}-\u{1FFFF}✅❌➕❓]/u.test(s);

/* ------------------------------ Isi dua video ------------------------------ */
const VIDEO = [V.VIDEO_MATERI_K3B2B, V.VIDEO_LUAR_K3B2B];
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
        } else if (o.t === "garis" || o.t === "panah") cek(x > -2 && x < 302 && y > -2 && y < 204 && x + (o.x2 ?? 0) > -2 && x + (o.x2 ?? 0) < 302 && y + (o.y2 ?? 0) > -2 && y + (o.y2 ?? 0) < 204, `${nama}#${i + 1}: garis ${o.id} masuk kanvas`);
      }
      {
        const teksAda = akhir.filter((o) => o.t === "teks" && (o.op ?? 1) > 0 && o.isi && !EMOJI.test(o.isi));
        for (let p = 0; p < teksAda.length; p += 1) {
          for (let q = p + 1; q < teksAda.length; q += 1) {
            const m = kotakTeks(teksAda[p]);
            const n = kotakTeks(teksAda[q]);
            const lx = Math.min(m[2], n[2]) - Math.max(m[0], n[0]);
            const ly = Math.min(m[3], n[3]) - Math.max(m[1], n[1]);
            cek(!(lx > 1 && ly > 1), `${nama}#${i + 1}: teks "${teksAda[p].isi}" (${teksAda[p].id}) bertumpuk dengan "${teksAda[q].isi}" (${teksAda[q].id})`);
          }
        }
        // Emoji tidak boleh menimpa teks lain.
        const emojiAda = akhir.filter((o) => o.t === "teks" && o.isi && EMOJI.test(o.isi));
        for (const e of emojiAda) {
          const m = [(e.x ?? 0) - (e.u ?? 10) * 0.55, (e.y ?? 0) - (e.u ?? 10) * 0.8, (e.x ?? 0) + (e.u ?? 10) * 0.55, (e.y ?? 0) + (e.u ?? 10) * 0.15];
          for (const t of teksAda) {
            const n = kotakTeks(t);
            const lx = Math.min(m[2], n[2]) - Math.max(m[0], n[0]);
            const ly = Math.min(m[3], n[3]) - Math.max(m[1], n[1]);
            cek(!(lx > 3 && ly > 3), `${nama}#${i + 1}: emoji ${e.id} menimpa teks "${t.isi}" (${t.id})`);
          }
        }
      }
    });
    // Gambar lebih banyak daripada teks: pada keadaan akhir adegan (selain sapaan), huruf teks sedikit dan benda gambar cukup.
    if (a.id !== "sapaan") {
      const akhirAd = L.keadaanStory(a, a.ketukan.length - 1, 9999);
      const huruf = akhirAd.filter((o) => o.t === "teks" && o.id !== "jud" && o.isi && !EMOJI.test(o.isi)).reduce((t, o) => t + (o.isi.match(/[A-Za-z]/g) ?? []).length, 0);
      const gambar = akhirAd.filter((o) => o.t !== "teks" || EMOJI.test(o.isi ?? "")).length;
      cek(huruf <= 110, `${nama}: teks pada gambar akhir paling banyak 110 huruf (ada ${huruf})`);
      cek(gambar >= 3, `${nama}: paling sedikit 3 benda gambar pada keadaan akhir (ada ${gambar})`);
    }
  }
}

/* ------------------------------ Pemisahan materi dan metode luar ------------------------------ */
const M_VIDEO = V.VIDEO_MATERI_K3B2B;
const U = V.VIDEO_LUAR_K3B2B;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const NAMA_LUAR = /Operasi Kebalikan|Bungkus Sepuluh|Bagan Bilangan Awal dan Bagian|metode luar|metode dari luar/i;
const NAMA_INGGRIS = /Bar Model|Part-Whole|Inverse Operation|Fact Family|Number Bond|Ten Frame|Bundle|Number Line|Missing Number/i;
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M_VIDEO);
  const luar = teksVideo(U);
  cek(!NAMA_LUAR.test(materi), "video materi tidak memuat nama tiga metode luar");
  for (const m of U1.NAMA_METODE_ID) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE_ID, ["Bagan Bilangan Awal dan Bagian", "Operasi Kebalikan", "Bungkus Sepuluh"], "nama Indonesia metode luar");
  cek(!NAMA_INGGRIS.test(materi) && !NAMA_INGGRIS.test(luar), "nama metode hanya bahasa Indonesia");
  const TERLARANG = /buku|panduan guru|hlm|halaman|kunci jawaban|rubrik|salah ketik|salah cetak|tambahan video|contoh video|temuan|pertemuan/i;
  for (const v of [M_VIDEO, U]) {
    cek(!TERLARANG.test(`${v.judul} ${v.subjudul}`), `${v.id}: judul dan subjudul video tanpa kata terlarang`);
    cek(!/nomor|no\./i.test(v.subjudul) && v.subjudul.length <= 40, `${v.id}: subjudul pendek tanpa nomor halaman`);
    for (const a of v.adegan) {
      const semua = [a.judul, a.sumber];
      a.ketukan.forEach((kt, i) => {
        semua.push(kt.suara);
        for (let p = 0; p < L.kataDari(kt.suara).length; p += 1) semua.push(...L.teksTerlihat(L.keadaanStory(a, i, p)));
      });
      const kena = semua.filter((t) => TERLARANG.test(t) || /soal nomor|Latihan 1\.[1-4]|nomor [1-9]|catatan video|menurut buku/i.test(t));
      cek(kena.length === 0, `${v.id}/${a.id}: tanpa penyebutan buku atau catatan sumber (${kena.slice(0, 2).join(" | ")})`);
      cek(!/Uji Kompetensi|Pengayaan|Ayo Berlatih|Ayo Berdiskusi|Ayo Berefleksi|Ayo Mengingat|Ayo Berkomunikasi|Ayo Berpikir|Ayo Berkarya|Ayo Bermain|Ayo Mencoba|soal \d|Soal \d|Eksplorasi|Refleksi/.test(semua.join(" | ")), `${v.id}/${a.id}: latihan disajikan sebagai Latihan, tanpa istilah buku`);
      cek(!/\b(Tika|Ibu|Ayah|Bapak|Paman|Pak|Budi|Ani|Doni|Sinta|Dewi|Rudi|Nina|Andi|Siti|Zoltan|Maria|Alfa|Galih|Alen|Meutia|Bandi|Pramuka|Slamet|Lili|Dina|Rina)\b/.test(semua.join(" | ")), `${v.id}/${a.id}: hanya enam tokoh tetap`);
    }
  }
  cek(M_VIDEO.subjudul === "Materi kurikulum" && U.subjudul === "Tiga metode luar", "subjudul video: Materi kurikulum dan Tiga metode luar");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 46), "video materi: label sumber berbentuk Materi: ... dan pendek");
  cek(U.adegan.every((a) => /Metode luar|Ringkasan/i.test(a.sumber) && a.sumber.length <= 46), "video metode luar: label sumber metode luar atau ringkasan, pendek");
  cek(M_VIDEO.id === "k3b2B-materi" && U.id === "k3b2B-luar", "id video k3b2B-materi dan k3b2B-luar");
  cek(U.judul.endsWith(": Metode dari Luar") && !/menurut/i.test(M_VIDEO.judul), "judul video: materi tanpa 'menurut', luar berakhir ': Metode dari Luar'");
  cek(
    M_VIDEO.adegan.map((a) => a.id).join() ===
      "sapaan,dua-anak,tabel-permen,kalimat-mtk,tengah-kecil,depan-kecil,ayam-dijual,tabel-ayam,bagan-ayam,periksa-ayam,ayam-awal,kalimat-awal,bagan-awal,dua-arah,contoh-tengah,contoh-depan,kemungkinan,latihan-satu,latihan-dua,latihan-tiga,cara-langkah,penutup",
    "urutan adegan materi",
  );
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-bagan,luar-bagan-terapan,luar-kebalikan,luar-kebalikan-terapan,luar-bungkus,luar-bungkus-terapan,luar-ringkas", "urutan adegan metode luar");
  cek(M_VIDEO.adegan.filter((a) => /^latihan-/.test(a.id)).length === 3 && M_VIDEO.adegan[M_VIDEO.adegan.length - 1].id === "penutup", "video materi: Latihan 1 sampai 3 lalu penutup");
  for (const kata of ["Latihan", "Igil", "Halim", "Kira", "kalimat Matematika", "titik-titik", "bilangan awal", "dikurangkan", "sisa", "tabel", "bagan", "tambah", "kurang", "periksa", "kemungkinan", "mula-mula", "di tengah", "di depan", "selisih"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  const BOCOR = /bersusun|meminjam|pinjam|menyimpan|simpan|dikali|perkalian|pembagian|dibagi|keliling|\bluas\b|rumus|volume|seribu|\bribu\b|sentimeter|centimeter|\bcm\b|\bmeter\b|\bkm\b|penggaris|×|÷|pecahan/i;
  for (const v of [M_VIDEO, U]) {
    for (const a of v.adegan) cek(!BOCOR.test(teksAdegan(a)), `${v.id}/${a.id}: lingkup pengurangan sampai seratus (tanpa bersusun, pinjam, simpan, kali, bagi, satuan baku)`);
    for (const a of v.adegan) for (const i of a.ketukan.keys()) for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) for (const b of bilanganDari(t)) cek(Number(b) <= 100, `${v.id}/${a.id}#${i + 1}: angka di gambar paling besar seratus ("${t}")`);
  }
  const ketMateri = M_VIDEO.adegan.reduce((t, ad) => t + ad.ketukan.length, 0);
  cek(totalKetukan >= 70 && ketMateri >= 70, `total ketukan cukup dalam (${totalKetukan}; materi ${ketMateri})`);
  const kataMateri = kataVideo(M_VIDEO);
  cek(kataMateri / 120 >= 8 && kataMateri / 120 <= 13, `durasi materi diputar 8 sampai 13 menit (${(kataMateri / 120).toFixed(1)} menit)`);
  cek(kataVideo(U) / 120 >= 3, `durasi video luar paling sedikit 3 menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
}

/* ------------------------------ Bilangan yang diucapkan tampak sebagai angka di gambar ------------------------------ */
const SATUAN = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];
const tokoh = (s) => s.toLowerCase().split(/[.,!?;:]/).map((seg) => seg.split(/\s+/).map((w) => w.replace(/[^a-z]/g, "")).filter(Boolean)).filter((x) => x.length);
const satu = (w) => SATUAN.indexOf(w);
/** Frasa bilangan (sepuluh atau lebih) yang dimulai pada token `p` dalam satu segmen: [nilai, panjang] atau null. */
function frasa(t, p) {
  let i = p;
  let total = 0;
  let adaRatus = false;
  if (t[i] === "seratus") {
    total = 100;
    i += 1;
    adaRatus = true;
  } else if (satu(t[i]) >= 1 && t[i + 1] === "ratus") {
    total = satu(t[i]) * 100;
    i += 2;
    adaRatus = true;
  }
  const mulaiTail = i;
  if (t[i] === "sepuluh") {
    total += 10;
    i += 1;
  } else if (t[i] === "sebelas") {
    total += 11;
    i += 1;
  } else if (satu(t[i]) >= 1 && t[i + 1] === "belas") {
    total += 10 + satu(t[i]);
    i += 2;
  } else if (satu(t[i]) >= 2 && t[i + 1] === "puluh") {
    total += satu(t[i]) * 10;
    i += 2;
    if (satu(t[i]) >= 1) {
      total += satu(t[i]);
      i += 1;
    }
  } else if (adaRatus && satu(t[i]) >= 1) {
    total += satu(t[i]);
    i += 1;
  }
  if (i === p || (!adaRatus && i === mulaiTail)) return null;
  return [total, i - p];
}
function frasaSuara(suara) {
  const hasil = [];
  // Nama metode "Bungkus Sepuluh" bukan bilangan yang harus tampak.
  for (const seg of tokoh(suara.replace(/bungkus sepuluh/gi, "bungkus"))) {
    for (let p = 0; p < seg.length; ) {
      const f = frasa(seg, p);
      if (f) {
        hasil.push(f[0]);
        p += f[1];
      } else p += 1;
    }
  }
  return hasil;
}
sama([frasaSuara("Dua ratus lima puluh satu."), frasaSuara("Tujuh ratus tiga, nol."), frasaSuara("Enam puluh delapan dan seratus."), frasaSuara("Sembilan belas. Dua, lima, dan satu."), frasaSuara("Bungkus Sepuluh dan berisi sepuluh.")], [[251], [703], [68, 100], [19], [10]], "pembaca nama bilangan: eja ke angka");
let jumlahSuaraBilangan = 0;
for (const v of VIDEO) {
  for (const a of v.adegan) {
    const terlihat = new Set();
    a.ketukan.forEach((kt, i) => {
      for (let p = 0; p < L.kataDari(kt.suara).length; p += 1) for (const o of L.keadaanStory(a, i, p)) if (o.t === "teks" && o.isi) for (const b of bilanganDari(o.isi)) terlihat.add(b);
      for (const n of frasaSuara(kt.suara)) {
        jumlahSuaraBilangan += 1;
        cek(terlihat.has(String(n)), `${v.id}/${a.id}#${i + 1}: bilangan ${n} yang diucapkan tampak sebagai angka di gambar`);
      }
    });
  }
}

/* ------------------------------ Kalimat hitung, bagan, tabel, bungkus dihitung ulang dari gambar ------------------------------ */
const stat = { kalimat: 0, bagan: 0, tabel: 0, bungkus: 0, jawaban: 0 };
const kunci = (objs, id) => objs.find((o) => o.id === id);
const TIDAK = /[…?]/;
/** Urai kalimat "a - b = c" atau "a + b = c" (satu bilangan boleh diganti titik-titik atau tanda tanya). Kembali {op, a, b, c} dengan null untuk yang tak diketahui, atau undefined bila bukan kalimat hitung. */
function uraiKalimat(t) {
  const m = /^\s*(\d+|…|\?)\s*([−+])\s*(\d+|…|\?)\s*=\s*(\d+|…|\?)\s*$/.exec(t);
  if (!m) return undefined;
  const n = (s) => (/^\d+$/.test(s) ? Number(s) : null);
  return { op: m[2], a: n(m[1]), b: n(m[3]), c: n(m[4]) };
}
/** Penyelesaian kalimat (bilangan yang cocok) atau undefined bila tak mungkin; null bila lengkap tanpa titik. */
function selesaikan(q) {
  const { op, a, b, c } = q;
  const kosong = [a, b, c].filter((x) => x === null).length;
  if (kosong === 0) return op === "−" ? (a - b === c ? null : undefined) : a + b === c ? null : undefined;
  if (kosong !== 1) return undefined;
  let r;
  if (op === "−") r = a === null ? c + b : b === null ? a - c : a - b;
  else r = a === null ? c - b : b === null ? c - a : a + b;
  return r >= 0 && r <= 100 ? r : undefined;
}
const jenisAdegan = new Map();
for (const v of VIDEO) {
  for (const a of v.adegan) {
    const nm0 = `${v.id}/${a.id}`;
    const semuaKalimat = [];
    a.ketukan.forEach((kt, i) => {
      const nm = `${nm0}#${i + 1}`;
      const objs = akhirAdegan(a, i);
      // Kalimat hitung yang tampak.
      for (const o of objs.filter((q) => q.t === "teks" && q.isi)) {
        const q = uraiKalimat(o.isi);
        if (q) {
          stat.kalimat += 1;
          const r = selesaikan(q);
          cek(r !== undefined, `${nm}: kalimat "${o.isi}" benar atau punya satu jawaban nol sampai seratus`);
          semuaKalimat.push({ q, r, isi: o.isi, id: o.id, ketukan: i });
        }
      }
      // Bagan.
      const awalan = [...new Set(objs.filter((o) => /^[a-z0-9]+_Tn$/.test(o.id)).map((o) => o.id.replace(/_Tn$/, "")))];
      for (const p of awalan) {
        const T = kunci(objs, `${p}_Tn`)?.isi;
        const A = kunci(objs, `${p}_An`)?.isi;
        const B = kunci(objs, `${p}_Bn`)?.isi;
        if (T === undefined || A === undefined || B === undefined) continue; // sebagian batang belum tampil
        stat.bagan += 1;
        const num = (s) => (/^\d+$/.test(s) ? Number(s) : null);
        const [t, x, y] = [num(T), num(A), num(B)];
        const kosong = [t, x, y].filter((n) => n === null).length;
        cek(kosong <= 2, `${nm}: bagan ${p} tidak semuanya tanda tanya`);
        if (kosong === 0) cek(t === x + y, `${nm}: bagan ${p}: ${t} harus = ${x} + ${y}`);
        // Batang bawah sebanding: lebar batang kiri / lebar batang atas.
        const bT = kunci(objs, `${p}_T`);
        const bA = kunci(objs, `${p}_A`);
        const bB = kunci(objs, `${p}_B`);
        if (bT && bA && bB) {
          const tt = t ?? (x !== null && y !== null ? x + y : null);
          const fa = bA.w / bT.w;
          const harap = tt !== null && x !== null ? x / tt : tt !== null && y !== null ? 1 - y / tt : null;
          if (harap !== null) cek(Math.abs(fa - Math.max(0.22, Math.min(0.78, harap))) < 0.03, `${nm}: bagan ${p}: lebar batang kiri sebanding bilangan (${fa.toFixed(2)} vs ${harap.toFixed(2)})`);
          cek(Math.abs(bA.x + bA.w - bB.x) < 0.01 && Math.abs(bB.x + bB.w - (bT.x + bT.w)) < 0.01, `${nm}: bagan ${p}: dua batang bawah rapat dan selebar batang atas`);
        }
        // Teks tanda tanya ditulis merah.
        for (const id of ["Tn", "An", "Bn"]) {
          const o = kunci(objs, `${p}_${id}`);
          cek((o.isi === "?") === (o.warna === "#DC2626") || o.isi !== "?", `${nm}: tanda tanya bagan merah`);
        }
      }
      // Tabel: kolom awal, dikurangkan, sisa (atau kira, halim, selisih): awal - dikurangkan = sisa.
      const tabs = [...new Set(objs.filter((o) => /^[a-z0-9]+_r\d+_\d+$/.test(o.id)).map((o) => /^([a-z0-9]+)_r/.exec(o.id)[1]))];
      for (const p of tabs) {
        const baris = [...new Set(objs.filter((o) => new RegExp(`^${p}_r\\d+_`).test(o.id)).map((o) => Number(/_r(\d+)_/.exec(o.id)[1])))];
        for (const b of baris) {
          const sel = [0, 1, 2].map((j) => kunci(objs, `${p}_r${b}_${j}`)?.isi);
          if (sel.some((s) => s === undefined)) continue;
          stat.tabel += 1;
          const q = { op: "−", a: /^\d+$/.test(sel[0]) ? Number(sel[0]) : null, b: /^\d+$/.test(sel[1]) ? Number(sel[1]) : null, c: /^\d+$/.test(sel[2]) ? Number(sel[2]) : null };
          cek(selesaikan(q) !== undefined, `${nm}: tabel ${p} baris ${b + 1}: ${sel.join(" | ")} cocok sebagai awal - dikurangkan = sisa`);
        }
      }
      // Bungkus sepuluh: dihitung dari objek.
      const bungkusKotak = objs.filter((o) => /^[a-z0-9]+_k\d+$/.test(o.id) && o.t === "kotak" && /^(bk|bp)_/.test(o.id));
      if (bungkusKotak.length) {
        stat.bungkus += 1;
        const p = bungkusKotak[0].id.slice(0, 2);
        const warna = (o) => o.warna;
        const hijau = objs.filter((o) => o.id.startsWith(`${p}_k`) && warna(o) === "#DCFCE7").length;
        const merah = objs.filter((o) => o.id.startsWith(`${p}_k`) && warna(o) === "#FCA5A5").length;
        const bGijau = objs.filter((o) => o.id.startsWith(`${p}_o`) && warna(o) === "#DCFCE7").length;
        const bMerah = objs.filter((o) => o.id.startsWith(`${p}_o`) && warna(o) === "#FCA5A5").length;
        const dibuka = objs.filter((o) => o.id.startsWith(`${p}_k`) && o.putus).length;
        const rumus = (b, butir) => b * 10 + butir;
        if (p === "bk") {
          cek(bungkusKotak.length === 8, `${nm}: delapan bungkus sepuluh sama dengan delapan puluh`);
          if (dibuka) cek(rumus(hijau, bGijau) === 45 && rumus(merah, bMerah) <= 35 && (merah === 3 ? bMerah === 5 || bMerah === 0 : true), `${nm}: sisa empat bungkus dan lima butir sama dengan 45 (hijau ${hijau}, butir ${bGijau})`);
          if (merah === 3 && bMerah === 5) cek(rumus(hijau, bGijau) + rumus(merah, bMerah) === 80, `${nm}: sisa dan dijual berjumlah 80`);
        } else {
          cek(bungkusKotak.length === 6, `${nm}: enam bungkus sepuluh sama dengan enam puluh`);
          if (bGijau === 7) cek(rumus(hijau, bGijau) === 27, `${nm}: sisa dua bungkus dan tujuh butir sama dengan 27`);
          if (bMerah === 3 && bGijau === 7) cek(rumus(hijau, bGijau) + rumus(merah, bMerah) === 60, `${nm}: sisa dan dijual berjumlah 60`);
        }
      }
      // Jawaban latihan: pilihan yang disorot sama dengan penyelesaian kalimat atau bagan pada adegan itu.
      const sorot = objs.filter((o) => /^c[123]-k$/.test(o.id) && o.sorot);
      if (sorot.length === 1 && /^Betul/.test(kt.suara)) {
        const pil = [1, 2, 3].map((n) => kunci(objs, `c${n}-t`)?.isi).filter((x) => x !== undefined);
        const pilihan = kunci(objs, `${sorot[0].id.slice(0, 2)}-t`).isi;
        cek(new Set(pil).size === pil.length, `${nm}: pilihan jawaban berbeda semua`);
        // Penyelesaian dari kalimat dengan titik-titik pada adegan (keadaan awal) atau dari bagan yang berisi satu tanda tanya.
        const calon = new Set();
        for (let q = 0; q <= i; q += 1) for (const o of akhirAdegan(a, q).filter((z) => z.t === "teks" && z.isi)) {
          const k = uraiKalimat(o.isi);
          if (k && [k.a, k.b, k.c].some((x) => x === null)) {
            const r = selesaikan(k);
            if (r !== undefined && r !== null) calon.add(String(r));
          }
        }
        for (let q = 0; q <= i; q += 1) {
          const ob = akhirAdegan(a, q);
          for (const p of [...new Set(ob.filter((o) => /^[a-z0-9]+_Tn$/.test(o.id)).map((o) => o.id.replace(/_Tn$/, "")))]) {
            const [T, A, B] = ["Tn", "An", "Bn"].map((s) => kunci(ob, `${p}_${s}`)?.isi);
            const n = (s) => (/^\d+$/.test(s ?? "") ? Number(s) : null);
            if (A === "?" && n(T) !== null && n(B) !== null) calon.add(String(n(T) - n(B)));
            if (T === "?" && n(A) !== null && n(B) !== null) calon.add(String(n(A) + n(B)));
            if (B === "?" && n(T) !== null && n(A) !== null) calon.add(String(n(T) - n(A)));
          }
        }
        if (calon.size) {
          stat.jawaban += 1;
          cek(calon.has(pilihan), `${nm}: pilihan "${pilihan}" yang disorot cocok dengan penyelesaian (${[...calon].join(",")})`);
          cek(pil.filter((x) => calon.has(x)).length === 1, `${nm}: tepat satu pilihan benar (${pil.join(",")})`);
        }
      }
    });
    // Kalimat dengan titik-titik: ucapkan hasil sesuai letak (di tengah = kurangi, di depan = tambah) dicocokkan dengan kata di suara.
    for (const s of semuaKalimat) {
      if (s.q.a === null && s.q.op === "−") cek(typeof s.r === "number" && s.r === s.q.c + s.q.b, `${nm0}: "${s.isi}" di depan dicari dengan menambah`);
      if (s.q.b === null && s.q.op === "−") cek(typeof s.r === "number" && s.r === s.q.a - s.q.c, `${nm0}: "${s.isi}" di tengah dicari dengan mengurangi`);
    }
    jenisAdegan.set(nm0, semuaKalimat.length);
  }
}
{
  // Adegan inti memuat kalimat hitung.
  for (const id of ["tengah-kecil", "depan-kecil", "tabel-ayam", "bagan-ayam", "kalimat-awal", "bagan-awal", "contoh-tengah", "contoh-depan", "latihan-satu", "latihan-dua", "latihan-tiga"]) cek((jenisAdegan.get(`k3b2B-materi/${id}`) ?? 0) >= 2, `adegan ${id} memuat paling sedikit dua kalimat hitung`);
  // Ketukan jawaban latihan: tiap latihan punya pilihan dan satu kartu disorot.
  for (const id of ["latihan-satu", "latihan-dua", "latihan-tiga"]) {
    const a = adegan(M_VIDEO, id);
    cek(a.ketukan.length === 4, `${id}: empat ketukan (soal, pilihan, jawaban, penjelasan)`);
    cek(akhirAdegan(a, 1).some((o) => o.id === "c1-k") && akhirAdegan(a, 1).some((o) => o.id === "c3-k"), `${id}: tiga pilihan pada ketukan kedua`);
  }
  for (const id of ["luar-bagan-terapan", "luar-kebalikan-terapan", "luar-bungkus-terapan"]) {
    const a = adegan(U, id);
    cek(a.ketukan.length === 4 && a.ketukan.some((_, q) => akhirAdegan(a, q).some((o) => o.id === "c2-k")), `${id}: ketukan soal, pilihan, jawaban, penjelasan`);
  }
  stat.suara = jumlahSuaraBilangan;
}

/* ------------------------------ Aturan pemilik: belajar mandiri, digital, tanpa benda fisik ------------------------------ */
{
  const MANDIRI = /kerja kelompok|berkelompok|secara berkelompok|diskusi kelompok|sekelompok|kelompokmu|kelompok belajar|bersama kelompok|\bkelompok\b|tanya teman|survei|karet gelang|uang tabungan|tabungan|\bpaman\b|\btika\b|\bteman\w*|\bkawan\w*|sekawan|depan kelas|bersama kelas|seluruh kelas|\bkelas\b|kelas dua|berpasangan dengan (teman|kawan)|bekerja berpasangan|secara berpasangan|bermain bersama|bertanya kepada|buat ceritamu|buku|menulis di|menuliskan di|tulis di|tuliskan di|menggambar|gambarlah|gambar sendiri|\bbawa(lah)?\b|membawa|dibawa|\bkertas\b|\bpensil\b|\bpulpen\b|\bspidol\b|\bgunting\w*|ambil (benda|pensil|kelereng|bola|sedotan|balon|kerucut|kubus)|tangan (kiri|kanan)|\bjari\b|menyuruh|suruh|jengkal|telapak|\bdepa\b|penggaris|\bkoin\b|di sekitar|di rumah|di kelas|centimeter|\bmeter\b|kakimu|tanganmu|badanmu|\braba\w*|\bmeraba|\btubuh|\blengan|lingkari|coret|guru kelas|orang tua|\bayah\b|\bibu guru|bapak guru|\bloker\b|\bpaku\b|\brumah\b|\bpak\b|\bibu\b|\blidi\b|kantong plastik|kue cubit|rambutan|\bbetawi\b|sahabat|\bkantin\b|mempresentasikan|presentasi|\bpara teman|seperti lidi/i;
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      const semua = [a.judul, a.sumber];
      a.ketukan.forEach((kt, i) => {
        semua.push(kt.suara);
        semua.push(...L.teksTerlihat(L.keadaanStory(a, i, 9999)));
      });
      const kena = semua.filter((t) => MANDIRI.test(t));
      cek(kena.length === 0, `${v.id}/${a.id}: narasi mandiri dan digital, tanpa kelompok, teman, kelas, buku, kertas, pensil, atau benda fisik (${kena.slice(0, 2).join(" | ")})`);
    }
  }
  // Tokoh: nama orang berhuruf besar di suara hanya enam tokoh tetap (kata sambung dan istilah dikecualikan).
  const BOLEH = new Set(["Malosi", "Kira", "Upe", "Wei", "Halim", "Igil"]);
  const ISTILAH = new Set(["Halo", "Hari", "Kita", "Matematika", "Bagan", "Bilangan", "Awal", "Dan", "Bagian", "Operasi", "Kebalikan", "Bungkus", "Sepuluh", "Latihan", "Ini", "Ayo", "Mari", "Jadi", "Betul", "Hebat", "Siap", "Sampai", "Semua", "Guru", "Tiga", "Delapan", "Metode", "Matematikanya", "Titik", "Kalimat"]);
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      for (const kt of a.ketukan) {
        const kalimat = kt.suara.split(/(?<=[.?!:])\s+/);
        for (const s of kalimat) {
          const k = s.split(/\s+/);
          k.slice(1).forEach((w) => {
            const b = w.replace(/[^A-Za-z]/g, "");
            if (/^[A-Z]/.test(b) && !BOLEH.has(b) && !ISTILAH.has(b)) cek(false, `${v.id}/${a.id}: kata berhuruf besar "${b}" bukan tokoh tetap atau istilah`);
          });
        }
      }
    }
  }
  cek(true, "tokoh diperiksa");
}

/* ------------------------------ Sapaan, peta susun, dan tabel susun ------------------------------ */
{
  const S = await import("../src/components/modul/susun-logika.ts");
  const sap = adegan(M_VIDEO, "sapaan");
  const DAFTAR = ["Kalimat Matematika pengurangan", "Mencari bilangan yang dikurangkan", "Mencari bilangan awal"];
  cek(/Halo anak-anak/.test(sap.ketukan[0].suara) && /Mencari bilangan awal/i.test(L.teksTerlihat(akhirAdegan(sap, 1)).join(" | ")), "sapaan materi: tiga hal yang dipelajari tampil");
  sama(L.teksTerlihat(akhirAdegan(sap, 1)).filter((t) => DAFTAR.includes(t)), DAFTAR, "sapaan materi: daftar tiga hal");
  cek(!/\d/.test(sap.ketukan[1].suara) && !/\d/.test(DAFTAR.join(" ")), "sapaan materi: tanpa angka");
  const sapLuar = adegan(U, "sapaan");
  cek(/cara lain/i.test(L.teksTerlihat(akhirAdegan(sapLuar, 1)).join(" | ")) && /metode-luar|Metode luar/.test(sapLuar.sumber), "sapaan metode luar: pengumuman cara lain");
  let sumberRingkas = null;
  try {
    sumberRingkas = JSON.parse(readFileSync(new URL("../src/data/kelas3-bab2-ringkas.json", import.meta.url), "utf8")).subBab?.B;
  } catch {
    sumberRingkas = null;
  }
  const sementara = new URL("../.tmp-k3b2B-ringkas.json", import.meta.url);
  const A = sumberRingkas?.petaSusun && sumberRingkas?.tabelSusun ? sumberRingkas : existsSync(sementara) ? JSON.parse(readFileSync(sementara, "utf8")) : null;
  if (A) {
    for (const e of S.periksaPeta(A.petaSusun)) cek(false, `peta susun: ${e}`);
    for (const e of S.periksaTabel(A.tabelSusun)) cek(false, `tabel susun: ${e}`);
    const peta = A.petaSusun.simpul;
    const anak = (id) => peta.filter((s) => s.induk === id).map((s) => s.teks);
    const akar = peta.filter((s) => s.induk === null);
    cek(akar.length === 3, "peta susun: tiga cabang dari pusat");
    sama(anak(akar[0].id), DAFTAR, "peta susun: cabang pertama sama dengan daftar sapaan");
    sama([anak(akar[1].id).length, anak(akar[2].id).length, peta.length], [3, 2, 11], "peta susun: 3 cara, 2 hasil, 11 simpul");
    sama(peta.map((s) => s.nomor), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], "peta susun: nomor 1 sampai 11");
    cek(peta.every((s) => s.teks.length <= 34) && new Set(peta.map((s) => s.teks)).size === peta.length, "peta susun: teks <= 34 huruf dan unik");
    cek(!/\d/.test(A.petaSusun.pusat.suara) && !/\d/.test(A.petaSusun.petunjuk) && peta.every((s) => !/\d/.test(s.petunjuk ?? "")), "peta susun: suara dan petunjuk tanpa digit");
    cek(A.petaSusun.pusat.judul.length > 8 && A.petaSusun.pusat.judul.length <= 28 && /\?$/.test(A.petaSusun.pusat.judul), "peta susun: pusat berupa masalah (pertanyaan) sub-bab, <= 28 huruf");
    const T = A.tabelSusun;
    cek(T.baris.length >= 3 && T.baris.length <= 5 && T.kolom.length >= 3 && T.kolom.length <= 4, "tabel susun: 3 sampai 5 baris dan 3 sampai 4 kolom");
    cek(T.baris.every((b) => b.sel.length === T.kolom.length && b.sel.every((s) => s.length <= 26 && (s.match(/\d+/g) ?? []).length <= 1)), "tabel susun: sel <= 26 huruf dan paling banyak satu angka per sel");
    cek(T.baris.every((b) => b.label.split(/\s+/).every((w) => w.length <= 8)), "tabel susun: kata terpanjang kolom label <= 8 huruf");
    cek(!/\d/.test(T.suara) && !/\d/.test(T.petunjuk), "tabel susun: suara dan petunjuk tanpa digit");
    sama(T.kolom, ["Titik-titik", "Cara", "Jawaban"], "tabel susun: kolom titik-titik, cara, jawaban");
    // Isi tabel dihitung ulang: label = kalimat dengan titik-titik; sel = letak, cara, jawaban.
    for (const b of T.baris) {
      const q = uraiKalimat(b.label);
      cek(!!q && q.op === "−" && [q.a, q.b, q.c].filter((x) => x === null).length === 1, `tabel susun: label ${b.label} kalimat pengurangan dengan satu titik-titik`);
      if (!q) continue;
      const r = selesaikan(q);
      cek(String(r) === b.sel[2], `tabel susun: ${b.label} jawabannya ${r}, tabel ${b.sel[2]}`);
      const tengah = q.b === null;
      cek(b.sel[0] === (tengah ? "tengah" : "depan"), `tabel susun: ${b.label} letak titik-titik ${tengah ? "tengah" : "depan"}`);
      cek(b.sel[1] === (tengah ? "kurangi" : "tambahi"), `tabel susun: ${b.label} cara ${tengah ? "kurangi" : "tambahi"}`);
      stat.khusus = (stat.khusus ?? 0) + 1;
    }
    cek(new Set(T.baris.map((b) => b.label)).size === T.baris.length, "tabel susun: label berbeda");
    cek(T.baris.some((b) => b.sel[0] === "tengah") && T.baris.some((b) => b.sel[0] === "depan"), "tabel susun: ada letak tengah dan depan");
    const KATA_LARANG = /buku|halaman|kunci jawaban|kerja kelompok|\bkelompok|\bteman|kawan|kelas\b|kertas|pensil|\bbawa\b|menggambar|menulis di|depan kelas|luas|keliling|di rumah|\brumah\b|survei|karet gelang|uang tabungan|di sekitar|loker|ibu guru|bersusun|gunting|\bpaku\b|\bpak\b|\bayah\b|\bibu\b|lidi|kantong plastik|kantin|tabungan|menabung|koin|penjepit|sentimeter|centimeter|\bmeter\b|kaleng|kerikil|manik|toples|gelas|sahabat|slamet/i;
    cek(!KATA_LARANG.test(JSON.stringify({ p: A.petaSusun, t: A.tabelSusun })), "peta dan tabel susun: tanpa kata terlarang dan tanpa kelompok, teman, kelas, buku, kertas, pensil");
    cek(!NAMA_INGGRIS.test(JSON.stringify(A)), "peta dan tabel susun: tanpa nama metode berbahasa Inggris");
    cek(![...JSON.stringify({ p: A.petaSusun, t: A.tabelSusun })].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d), "peta dan tabel susun: tanpa emoji di atas Emoji 12 dan tanpa ZWJ");
  } else cek(false, "peta dan tabel susun: .tmp-k3b2B-ringkas.json atau kelas3-bab2-ringkas.json subBab.B.petaSusun ada");
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k3b2B-.*)\.(ts|tsx)$/.test(f));
  cek(berkas.length >= 10, `berkas story ditemukan (${berkas.length})`);
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
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k3b2B-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k3b2B sendiri (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d), `${v.id}/${a.id}: emoji gambar paling tinggi Emoji 12`);
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k3b2b.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|naskah-k3b2|data-k3b2|kit-k3b2|video-k3b2-umum|naskah-k1b/.test(pembungkus) && /VIDEO_MATERI_K3B2B/.test(pembungkus) && /VIDEO_LUAR_K3B2B/.test(pembungkus) && /export function VideoK3B2B/.test(pembungkus) && /daftar-video-cerita/.test(pembungkus), "video-k3b2b.tsx: dua video dari mesin Story, tanpa naskah lama");
  cek(!/\r/.test(pembungkus), "video-k3b2b.tsx: akhir baris LF");
  const sendiri = readFileSync(new URL("uji-story-k3b2B.mjs", import.meta.url), "utf8");
  cek(!/\r/.test(sendiri), "uji-story-k3b2B.mjs: akhir baris LF");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit diputar)`);
}
console.log(`Pemeriksaan: ${stat.kalimat} kalimat hitung, ${stat.bagan} bagan, ${stat.tabel} baris tabel, ${stat.bungkus} bungkus, ${stat.jawaban} jawaban latihan, ${stat.suara} bilangan suara dicocokkan, ${stat.khusus ?? 0} baris tabel susun`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
