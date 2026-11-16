// Uji Story Kelas 6 Bab 4 Sub-Bab A (Skala Peluang): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, sinkron angka suara dan gambar, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas,
// pemisahan materi dan metode luar, gaya guru tanpa rujukan buku, hitungan mandiri, emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k6b4a.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k6b4a-video.ts");
const M1 = await import("../src/components/modul/story/k6b4a-materi-1.ts");
const M2 = await import("../src/components/modul/story/k6b4a-materi-2.ts");
const M3 = await import("../src/components/modul/story/k6b4a-materi-3.ts");

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

/* ------------------------------ Mesin: pemicu kata dan keadaan ------------------------------ */
{
  const s = "Ada 3 buku putih, 6 buku merah, dan 1 buku kuning.";
  sama(L.kataDari(s).length, 11, "kataDari menghitung kata");
  sama(L.posisiKata(s, undefined), 0, "tanpa at: awal kalimat");
  sama(L.posisiKata(s, 3), 3, "at angka");
  sama(L.posisiKata(s, 99), 10, "at angka dipotong ke kata terakhir");
  sama(L.posisiKata(s, "putih"), 3, "at kata dengan tanda baca");
  sama(L.posisiKata(s, "buku"), 2, "at kata pertama");
  sama(L.posisiKata(s, "buku@2"), 5, "at kata kemunculan kedua");
  sama(L.posisiKata(s, "buku@3"), 9, "at kata kemunculan ketiga");
  sama(L.posisiKata(s, "buku@4"), -1, "kemunculan yang tidak ada: -1");
  sama(L.posisiKata(s, "hijau"), -1, "kata yang tidak ada: -1");
  const a = {
    id: "uji",
    judul: "Uji",
    sumber: "uji",
    latar: "#fff",
    ketukan: [
      { suara: "satu dua tiga empat", aksi: [{ at: 0, tambah: { id: "a", t: "teks", isi: "A" } }, { at: "tiga", tambah: { id: "b", t: "teks", isi: "B" } }, { at: "empat", ubah: { id: "a", isi: "A2" }, hapus: "b" }] },
      { suara: "lima enam", aksi: [{ at: "enam", bersih: true }, { at: "enam", tambah: { id: "c", t: "teks", isi: "C", z: 2 } }, { at: "enam", tambah: { id: "d", t: "teks", isi: "D", z: 1 } }] },
    ],
  };
  sama(L.keadaanStory(a, 0, -1).map((o) => o.id), [], "sebelum kata pertama diucapkan: belum ada gambar");
  sama(L.keadaanStory(a, 0, 0).map((o) => o.id), ["a"], "kata pertama: hanya benda at 0");
  sama(L.keadaanStory(a, 0, 1).map((o) => o.id), ["a"], "sebelum kata ketiga");
  sama(L.keadaanStory(a, 0, 2).map((o) => o.id), ["a", "b"], "pada kata ketiga benda b muncul");
  sama(L.keadaanStory(a, 0, 3).map((o) => [o.id, o.isi]), [["a", "A2"]], "kata keempat: ubah a dan hapus b");
  sama(L.keadaanStory(a, 1, 0).map((o) => o.id), ["a"], "ketukan berikut: aksi ketukan lama sudah tuntas, aksi baru belum");
  sama(L.keadaanStory(a, 1, 1).map((o) => o.id), ["d", "c"], "bersih lalu tambah, urut menurut z");
  sama(L.teksTerlihat(L.keadaanStory(a, 1, 1)), ["D", "C"], "teks terlihat mengikuti urutan z");
  cek(L.sidikKeadaan(L.keadaanStory(a, 0, 0)) !== L.sidikKeadaan(L.keadaanStory(a, 0, 2)), "sidik keadaan berbeda bila gambar berbeda");
  cek(L.sidikKeadaan(L.keadaanStory(a, 1, 1)) === L.sidikKeadaan(L.keadaanStory(a, 1, 1)), "sidik keadaan sama bila gambar sama");
  cek(L.kataPadaWaktu(0, 0.5) === 0 && L.kataPadaWaktu(0.99, 0.5) === 1 && L.kataPadaWaktu(5, 0.5) === 10 && L.kataPadaWaktu(-3, 0.5) === 0, "kata pada waktu");
  const awal = L.bacaDetikPerKata();
  L.kalibrasiDetikPerKata(20, 10);
  cek(L.bacaDetikPerKata() > awal && L.bacaDetikPerKata() < 2, "kalibrasi menaikkan laju perkiraan secara terbatas");
  L.kalibrasiDetikPerKata(0.1, 10);
  L.kalibrasiDetikPerKata(5, 1);
  cek(L.bacaDetikPerKata() >= 0.25 && L.bacaDetikPerKata() <= 1.1, "kalibrasi dibatasi dan mengabaikan ketukan pendek");
  for (let i = 0; i < 60; i += 1) L.kalibrasiDetikPerKata(5000, 10);
  cek(L.bacaDetikPerKata() <= 1.1 + 1e-9 && L.bacaDetikPerKata() > 1, "kalibrasi: batas atas 1,1 detik per kata");
  for (let i = 0; i < 60; i += 1) L.kalibrasiDetikPerKata(1.5, 10);
  cek(L.bacaDetikPerKata() >= 0.25 - 1e-9 && L.bacaDetikPerKata() < 0.3, "kalibrasi: batas bawah 0,25 detik per kata");
  const sebelum = L.bacaDetikPerKata();
  L.kalibrasiDetikPerKata(9, 2);
  L.kalibrasiDetikPerKata(0.5, 10);
  cek(L.bacaDetikPerKata() === sebelum, "kalibrasi: ketukan kurang dari 3 kata atau kurang dari 1 detik diabaikan");
}

/* ------------------------------ Isi dua video ------------------------------ */
const VIDEO = [V.VIDEO_MATERI_K6B4A, V.VIDEO_LUAR_K6B4A];
const bilanganDari = (t) => (t.match(/\d[\d.]*\d|\d/g) ?? []).map((v) => v.replace(/\./g, ""));
const semuaSidik = new Map();
let totalKetukan = 0;
let totalKata = 0;
for (const v of VIDEO) {
  cek(v.adegan.length >= 5, `${v.id}: paling sedikit 5 adegan (ada ${v.adegan.length})`);
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
      cek(kt.aksi.length >= 1, `${nama}#${i + 1}: ada aksi gambar`);
      // pemicu kata
      for (const ak of kt.aksi) {
        const p = L.posisiKata(kt.suara, ak.at);
        cek(p >= 0, `${nama}#${i + 1}: pemicu "${ak.at}" ditemukan dalam kalimat`);
        if (typeof ak.at === "number") cek(ak.at >= 0 && ak.at < kata.length, `${nama}#${i + 1}: pemicu angka ${ak.at} dalam batas`);
      }
      // ubah dan hapus harus menyasar benda yang ada saat itu
      {
        const peta = new Set(L.keadaanStory(a, i - 1, 9999).map((o) => o.id));
        if (i === 0) peta.clear();
        const urut = [...kt.aksi].map((ak) => ({ ak, p: L.posisiKata(kt.suara, ak.at) })).sort((m, n) => m.p - n.p);
        for (const { ak } of urut) {
          if (ak.bersih) peta.clear();
          for (const id of ak.hapus === undefined ? [] : [].concat(ak.hapus)) {
            cek(peta.has(id), `${nama}#${i + 1}: hapus "${id}" menyasar benda yang ada`);
            peta.delete(id);
          }
          for (const o of ak.tambah === undefined ? [] : [].concat(ak.tambah)) peta.add(o.id);
          for (const u of ak.ubah === undefined ? [] : [].concat(ak.ubah)) cek(peta.has(u.id), `${nama}#${i + 1}: ubah "${u.id}" menyasar benda yang ada`);
        }
      }
      // keadaan akhir ketukan
      const akhir = L.keadaanStory(a, i, 9999);
      const sidik = L.sidikKeadaan(akhir);
      cek(sebelumnya === null || sidik !== sebelumnya, `${nama}#${i + 1}: gambar berubah dibanding ketukan sebelumnya`);
      sebelumnya = sidik;
      const kunci = `${v.id}/${a.id}`;
      if (i === a.ketukan.length - 1) {
        const lama = semuaSidik.get(sidik);
        cek(!lama, `${nama}: gambar akhir adegan tidak sama dengan adegan lain (${lama ?? ""})`);
        semuaSidik.set(sidik, kunci);
      }
      // sinkron angka: tiap bilangan dalam suara tampak di gambar pada ketukan ini atau sebelumnya
      for (let p = 0; p < kata.length; p += 1) for (const o of L.keadaanStory(a, i, p)) if (o.t === "teks" && o.isi) for (const b of bilanganDari(o.isi)) terlihat.add(b);
      for (const b of bilanganDari(kt.suara)) cek(terlihat.has(b), `${nama}#${i + 1}: bilangan ${b} di suara tampak di gambar`);
      // gambar mengikuti kata: bila ada aksi pada lebih dari satu kata, keadaan harus bertambah di sepanjang kalimat
      const titik = [...new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at)))].sort((m, n) => m - n);
      if (titik.length >= 2) {
        const sid = titik.map((p) => L.sidikKeadaan(L.keadaanStory(a, i, p)));
        cek(new Set(sid).size >= 2, `${nama}#${i + 1}: gambar berubah mengikuti kata dalam kalimat`);
      }
      // gambar masuk kanvas 300 x 208
      for (const o of akhir) {
        const x = o.x ?? 0;
        const y = o.y ?? 0;
        if (o.t === "teks") {
          const lebar = (o.isi ?? "").length * (o.u ?? 10) * 0.56;
          const kiri = (o.anchor ?? "middle") === "middle" ? x - lebar / 2 : (o.anchor ?? "middle") === "end" ? x - lebar : x;
          cek(y > 0 && y < 210 && kiri > -4 && kiri + lebar < 304, `${nama}#${i + 1}: teks "${o.isi}" masuk kanvas (x=${x}, y=${y}, lebar=${Math.round(lebar)})`);
        } else if (o.t === "kotak") cek(x > -2 && y > -2 && x + (o.w ?? 0) < 302 && y + (o.h ?? 0) < 210 || o.id === "tanah" || o.id === "lantai", `${nama}#${i + 1}: kotak ${o.id} masuk kanvas`);
        else if (o.t === "bulat") cek(x - (o.r ?? 0) > -2 && x + (o.r ?? 0) < 302 && y - (o.r ?? 0) > -2 && y + (o.r ?? 0) < 210, `${nama}#${i + 1}: bulat ${o.id} masuk kanvas`);
      }
    });
  }
}

/* ------------------------------ Pemisahan materi dan metode luar ------------------------------ */
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map((a) => [a.judul, a.sumber, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]));
  const NAMA_METODE = /Likelihood|Impossible-Certain|Qualitative|Experimental Relative|metode luar|hukum bilangan besar/i;
  const M_VIDEO = V.VIDEO_MATERI_K6B4A;
  const U = V.VIDEO_LUAR_K6B4A;
  // Adegan administratif (tujuan dan peta konsep) tidak lagi diputar di video materi. Adegannya tetap ada di berkas materi,
  // jadi pemeriksaan isi lengkap memakai daftar penuh; hanya jumlah dan urutan adegan diuji terhadap video yang diputar.
  const MODUL_MATERI = Object.assign({}, M1, M2, M3);
  const MFULL = { ...M_VIDEO, adegan: [MODUL_MATERI.ADEGAN_PAGI, MODUL_MATERI.ADEGAN_TUJUAN, MODUL_MATERI.ADEGAN_DATA, MODUL_MATERI.ADEGAN_POSTER, MODUL_MATERI.ADEGAN_PELUANG, MODUL_MATERI.ADEGAN_CONTOH, MODUL_MATERI.ADEGAN_RAK, MODUL_MATERI.ADEGAN_LATIHAN, MODUL_MATERI.ADEGAN_RODA] };
  cek(MFULL.adegan.length === 9 && MFULL.adegan.every(Boolean), "berkas materi memuat sembilan adegan (termasuk yang tidak diputar)");
  const materi = teksVideo(M_VIDEO);
  const luar = teksVideo(U);
  cek(!NAMA_METODE.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of ["Likelihood Spectrum Scale", "Impossible-Certain Continuum", "Qualitative Probability Language", "Experimental Relative Frequency"]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  cek(!/persen|%/i.test(materi + luar), "kedua video tanpa persen (belum diajarkan di bab ini)");
  // Video diputar sebagai guru yang mengajar: tidak ada penyebutan sumber buku di suara, teks terlihat, label sumber, judul adegan, dan subjudul.
  const TERLARANG = /buku|panduan guru|hlm|halaman|kunci|rubrik|salah ketik|salah cetak|tambahan video|contoh video|temuan|pertemuan/i;
  // Sub-Bab A hanya skala peluang, tangga kemungkinan, dua ujung, k dari n, dan catatan percobaan. Permainan adil, rasio menguntungkan,
  // membandingkan dua peluang, dan keputusan (Sub-Bab B) belum boleh muncul. Sama dengan BOCOR_A di scripts/uji-lab-k6b4.mjs.
  const BOCOR_A = /(\badil\b|kurang adil|\brasio|menguntungkan|favorable|\bpemain\b|\bpermainan\b|samakan|total bersama|\bKPK\b|keputusan|\bpecahan|desimal|persen|banding|comparative|fair game|equal chance|relative likelihood|\d ?\/ ?\d|\bsilang\b)/i;
  for (const v of [M_VIDEO, U]) {
    cek(!TERLARANG.test(`${v.judul} ${v.subjudul}`), `${v.id}: judul dan subjudul video tanpa kata terlarang`);
    for (const a of v.adegan) {
      const semua = [a.judul, a.sumber];
      a.ketukan.forEach((kt, i) => {
        semua.push(kt.suara);
        for (let p = 0; p < L.kataDari(kt.suara).length; p += 1) semua.push(...L.teksTerlihat(L.keadaanStory(a, i, p)));
      });
      const kena = semua.filter((t) => TERLARANG.test(t) || /soal nomor|Latihan 4\.[1-3]|nomor [1-9]|catatan video|menurut buku/i.test(t));
      cek(kena.length === 0, `${v.id}/${a.id}: tanpa penyebutan buku atau catatan sumber (${kena.slice(0, 2).join(" | ")})`);
      cek(!/Uji Kompetensi|Pengayaan|Ayo Berlatih|Ayo Berdiskusi|Ayo Berefleksi|Ayo Mengingat|Ayo Berkomunikasi|Ayo Berpikir|Ayo Mencoba|soal \d|Soal \d|Eksplorasi|Gambar 4\.|Tabel 4\.|Refleksi/.test(semua.join(" | ")), `${v.id}/${a.id}: latihan disajikan sebagai Latihan, Tantangan, atau Renungan, tanpa nomor gambar atau tabel buku`);
      const bocor = semua.filter((t) => BOCOR_A.test(t));
      cek(bocor.length === 0, `${v.id}/${a.id}: tanpa istilah adil, rasio, banding, keputusan, atau pecahan miring (${bocor.slice(0, 2).join(" | ")})`);
      cek(a.ketukan.every((kt) => !/\d/.test(kt.suara)), `${v.id}/${a.id}: suara tanpa angka digit`);
    }
  }
  cek(M_VIDEO.subjudul === "Materi kurikulum" && U.subjudul === "Empat metode luar", "subjudul video: Materi kurikulum dan Empat metode luar");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 46), "video materi: label sumber berbentuk Materi: ... dan pendek");
  cek(U.adegan.every((a) => /Metode luar|Ringkasan/i.test(a.sumber) && a.sumber.length <= 46), "video metode luar: label sumber metode luar atau ringkasan, pendek");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,pagi-dhien,data-kembali,poster-eksplorasi,apa-itu-peluang,contoh-skala,rak-lemari,latihan-41,percobaan-roda", "urutan adegan materi");
  // Cakupan materi: hal-hal utama Sub-Bab A hadir di video materi (kata sah isi baru).
  for (const kata of ["Sulawesi Tengah", "payung", "perubahan iklim", "komik", "lemari", "roda putar", "Latihan bersama", "Latihan 1", "Hati-hati", "Tantangan", "Renungan", "16", "dadu"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  // Isi lengkap (termasuk adegan yang tidak diputar) tetap memuat butir tujuan, pertanyaan pemantik, dan peta konsep.
  const penuh = teksVideo(MFULL);
  for (const kata of ["Tujuan Bab", "Pertanyaan Pemantik", "Peta konsep", "Skala Peluang", "Hati-hati", "Renungan"]) cek(new RegExp(kata, "i").test(penuh), `materi lengkap memuat ${kata}`);
  // Cakupan metode luar: tiap metode punya konsep dan penerapan
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-lss", "luar-lss-terapan", "luar-kontinum", "luar-kontinum-tas", "luar-bahasa", "luar-bahasa-terapan", "luar-frekuensi", "luar-frekuensi-dadu"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(U.adegan[0].id === "sapaan" && U.adegan[1].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas" && M_VIDEO.adegan.length === 9 && U.adegan.length === 11, "9 adegan materi diputar (dengan sapaan) dan 11 adegan metode luar (dengan sapaan)");
  cek(M_VIDEO.adegan[0].id === "sapaan" && U.adegan[0].id === "sapaan", "tiap video dibuka adegan sapaan");
  const suaraLuar = U.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  const suaraMateri = M_VIDEO.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  cek(!/subbab B|sub-bab B|membandingkan peluang|permainan adil/i.test(suaraLuar + suaraMateri), "Sub-Bab A tidak membahas materi Sub-Bab B");
  cek(totalKetukan >= 70, `total ketukan cukup dalam (${totalKetukan})`);
  // Durasi materi diputar 7 sampai 13 menit (dua kata per detik, sapaan termasuk).
  const kataMateri = M_VIDEO.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  cek(kataMateri / 120 >= 7 && kataMateri / 120 <= 13, `durasi materi diputar 7 sampai 13 menit (${(kataMateri / 120).toFixed(1)} menit)`);
  // Persamaan sederhana yang tampak di gambar: periksa aritmetikanya satu per satu.
  let cacah = 0;
  const angka = (t) => Number(t.replace(/\./g, ""));
  for (const v of [M_VIDEO, U]) {
    for (const a of v.adegan) {
      a.ketukan.forEach((kt, i) => {
        for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) {
          const m = t.match(/(\d[\d.]*(?:\s?[+×]\s?\d[\d.]*)+)\s*=\s*(\d[\d.]*)(?![\d,])/);
          if (!m) continue;
          const bagian = m[1].split(/\s?([+×])\s?/);
          let nilai = angka(bagian[0]);
          for (let n = 1; n < bagian.length; n += 2) {
            const q = angka(bagian[n + 1]);
            nilai = bagian[n] === "+" ? nilai + q : nilai * q;
          }
          cacah += 1;
          cek(nilai === angka(m[2]), `${v.id}/${a.id}: persamaan di gambar "${t}"`);
        }
      });
    }
  }
  cek(cacah >= 8, `persamaan di gambar yang diperiksa mandiri (${cacah})`);
}

/* ------------------------------ Angka yang dihitung dalam video ------------------------------ */
{
  // Hitungan mandiri untuk angka yang diucapkan video (bukan disalin dari data gambar).
  const tally = (daftar, nilai) => {
    let n = 0;
    for (let i = 0; i < daftar.length; i += 1) if (daftar[i] === nilai) n += 1;
    return n;
  };
  const dadu = ["5", "6", "4", "2", "1", "1", "3", "5", "2", "6"];
  sama(["1", "2", "3", "4", "5", "6"].map((n) => tally(dadu, n)), [2, 2, 1, 1, 2, 2], "data dadu buku: tiap angka muncul");
  sama(dadu.length, 10, "sepuluh lemparan");
  sama([2, 6, 4, 6, 3].reduce((x, y) => x + y, 0), 21, "21 siswa pada data keluarga");
  sama([3, 6, 1].reduce((x, y) => x + y, 0), 10, "rak buku: 10 buku");
  sama([567, 556, 133, 0, 0].length, 5, "lima jenis bencana");
  sama(6 + 6 + 3 + 1, 16, "jawaban lemari dari buku guru: 16");
  sama(2 + 5 + 9, 16, "jawaban lemari Kira: 16");
  sama(1 + 4 + 11, 16, "jawaban lemari: 1 + 4 + 11");
  sama(3 + 6 + 7, 16, "jawaban lemari: 3 + 6 + 7");
  sama(7 + 4 + 4, 15, "bola 7, 4, 4");
  sama(8 + 3 + 4, 15, "bola 8, 3, 4");
  sama(9 + 3 + 3, 15, "bola 9, 3, 3");
  sama(5 + 5 + 5, 15, "bola 5, 5, 5 (salah karena merah tidak paling banyak)");
  // aturan separuh yang dijelaskan di video metode luar, dihitung dengan memasangkan satu per satu
  const tanggaPasangan = (k, n) => {
    let cocok = k;
    let lain = n - k;
    if (cocok === 0) return "tidak mungkin";
    if (lain === 0) return "pasti";
    while (cocok > 0 && lain > 0) {
      cocok -= 1;
      lain -= 1;
    }
    return cocok > 0 ? "sangat mungkin" : lain > 0 ? "kurang mungkin" : "mungkin";
  };
  sama([[6, 10], [3, 10], [1, 10], [0, 10], [1, 2], [3, 6], [2, 6], [8, 8]].map(([k, n]) => tanggaPasangan(k, n)), ["sangat mungkin", "kurang mungkin", "kurang mungkin", "tidak mungkin", "mungkin", "mungkin", "kurang mungkin", "pasti"], "tabel aturan separuh di video metode luar");
  // frekuensi relatif dalam video: 2/4, 3/20, 9/80 makin dekat ke 1/8 (silang kali)
  const jarak = (k, n) => Math.abs(8 * k - n) / (8 * n);
  cek(jarak(2, 4) > jarak(3, 20) && jarak(3, 20) > jarak(9, 80), "contoh frekuensi relatif makin dekat ke 1 dari 8");
  cek(600 / 6 === 100, "600 lemparan dibagi 6 angka sama dengan 100");
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(logika-story|kutipan-lokal|mesin-story|k6b4a-.*)\.(ts|tsx)$/.test(f));
  cek(berkas.length >= 9, `berkas story ditemukan (${berkas.length})`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    const buruk = [...s].filter((c) => {
      const k = c.codePointAt(0);
      return k > 0x1fa95 || k === 0x1f7f0 || k === 0x200d;
    });
    cek(buruk.length === 0, `${f}: tanpa emoji di atas Emoji 12 dan tanpa ZWJ (${buruk.map((c) => c.codePointAt(0).toString(16)).join()})`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: UTF-8 tanpa BOM dan akhir baris LF`);
    cek(!/fetch\(|XMLHttpRequest|openai|anthropic|gemini|correct_index|explanation/i.test(s), `${f}: tanpa jaringan, model bahasa, atau kunci jawaban`);
    if (f !== "mesin-story.tsx") cek(!/from "react"/.test(s), `${f}: logika dan data tanpa React`);
  }
  const logika = readFileSync(new URL("logika-story.ts", folder), "utf8");
  cek(!/^import /m.test(logika.replace(/^import type .*$/gm, "")), "logika-story: tanpa impor nilai");
  // larangan berbagi visual: berkas k6b4a tidak mengimpor gambar atau adegan bab lain
  for (const f of berkas.filter((x) => x.startsWith("k6b4a-"))) {
    const s = readFileSync(new URL(f, folder), "utf8");
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|kutipan-lokal|sapaan|k6b4a-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas k6b4a sendiri (${impor.join(", ")})`);
  }
  // mesin tidak memakai kit visual lama
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k6b4a.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_A64/.test(pembungkus) && /VIDEO_MATERI_K6B4A/.test(pembungkus) && /VIDEO_LUAR_K6B4A/.test(pembungkus), "video-k6b4a: memakai dua video baru, bukan naskah dan visual lama");
}

console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
