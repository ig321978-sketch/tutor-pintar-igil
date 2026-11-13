// Uji Story Kelas 6 Bab 3 Sub-Bab B (Visualisasi Spasial): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, sinkron angka suara dan gambar, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas,
// tumpang tindih teks, pemisahan materi dan metode luar, hitungan mandiri (proyeksi tampak, matriks tinggi, dadu, susunan
// yang cocok), kutipan buku (bila PDF ada), emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k6b3b.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { spawnSync } from "node:child_process";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k6b3b-video.ts");
const G = await import("../src/components/modul/story/k6b3b-gambar.ts");
const R2 = await import("../src/components/modul/story/k6b3b-luar-2.ts");

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

/* ------------------------------ Isi dua video ------------------------------ */
const VIDEO = [V.VIDEO_MATERI_K6B3B, V.VIDEO_LUAR_K6B3B];
const bilanganDari = (t) => (t.match(/\d[\d.]*\d|\d/g) ?? []).map((v) => v.replace(/\./g, ""));
const semuaSidik = new Map();
const kataVideo = {};
let totalKetukan = 0;
let totalKata = 0;
const titikJalur = (d) => [...d.matchAll(/(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)/g)].map((m) => [Number(m[1]), Number(m[2])]);
const kotakTeks = (o) => {
  const lebar = (o.isi ?? "").length * (o.u ?? 10) * 0.56;
  const x = o.x ?? 0;
  const kiri = (o.anchor ?? "middle") === "middle" ? x - lebar / 2 : (o.anchor ?? "middle") === "end" ? x - lebar : x;
  return { kiri, kanan: kiri + lebar, atas: (o.y ?? 0) - (o.u ?? 10) * 0.82, bawah: (o.y ?? 0) + (o.u ?? 10) * 0.1 };
};
for (const v of VIDEO) {
  kataVideo[v.id] = 0;
  cek(v.adegan.length >= (v.jenis === "materi" ? 7 : 6), `${v.id}: jumlah adegan cukup (ada ${v.adegan.length})`);
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
      kataVideo[v.id] += kata.length;
      cek(kata.length >= 6 && kata.length <= 40, `${nama}#${i + 1}: 6 sampai 40 kata (ada ${kata.length})`);
      cek(!/[=×÷<>\/%]/.test(kt.suara), `${nama}#${i + 1}: suara tanpa lambang yang sulit dibaca mesin suara`);
      cek(/[.?!]$/.test(kt.suara.trim()), `${nama}#${i + 1}: suara berakhir tanda baca`);
      cek(kt.aksi.length >= 1, `${nama}#${i + 1}: ada aksi gambar`);
      for (const ak of kt.aksi) {
        const p = L.posisiKata(kt.suara, ak.at);
        cek(p >= 0, `${nama}#${i + 1}: pemicu "${ak.at}" ditemukan dalam kalimat`);
        if (typeof ak.at === "number") cek(ak.at >= 0 && ak.at < kata.length, `${nama}#${i + 1}: pemicu angka ${ak.at} dalam batas`);
      }
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
      const akhir = L.keadaanStory(a, i, 9999);
      const sidik = L.sidikKeadaan(akhir);
      cek(sebelumnya === null || sidik !== sebelumnya, `${nama}#${i + 1}: gambar berubah dibanding ketukan sebelumnya`);
      sebelumnya = sidik;
      if (i === a.ketukan.length - 1) {
        const lama = semuaSidik.get(sidik);
        cek(!lama, `${nama}: gambar akhir adegan tidak sama dengan adegan lain (${lama ?? ""})`);
        semuaSidik.set(sidik, nama);
      }
      for (let p = 0; p < kata.length; p += 1) for (const o of L.keadaanStory(a, i, p)) if (o.t === "teks" && o.isi) for (const b of bilanganDari(o.isi)) terlihat.add(b);
      for (const b of bilanganDari(kt.suara)) cek(terlihat.has(b), `${nama}#${i + 1}: bilangan ${b} di suara tampak di gambar`);
      const titik = [...new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at)))].sort((m, n) => m - n);
      if (titik.length >= 2) {
        const sid = titik.map((p) => L.sidikKeadaan(L.keadaanStory(a, i, p)));
        cek(new Set(sid).size >= 2, `${nama}#${i + 1}: gambar berubah mengikuti kata dalam kalimat`);
      }
      // batas kanvas 300 x 208 (benda terlihat saja; benda yang diredam hampir transparan tetap diperiksa)
      for (const o of akhir) {
        const x = o.x ?? 0;
        const y = o.y ?? 0;
        if (o.t === "teks") {
          const b = kotakTeks(o);
          cek(y > 0 && y < 200 && b.kiri > -4 && b.kanan < 304, `${nama}#${i + 1}: teks "${o.isi}" masuk kanvas (x=${x}, y=${y}, lebar=${Math.round(b.kanan - b.kiri)})`);
        } else if (o.t === "kotak") cek(x > -2 && y > -2 && x + (o.w ?? 0) < 302 && y + (o.h ?? 0) < 202, `${nama}#${i + 1}: kotak ${o.id} masuk kanvas`);
        else if (o.t === "bulat") cek(x - (o.r ?? 0) > -2 && x + (o.r ?? 0) < 302 && y - (o.r ?? 0) > -2 && y + (o.r ?? 0) < 202, `${nama}#${i + 1}: bulat ${o.id} masuk kanvas`);
        else if (o.t === "jalur") {
          const pts = titikJalur(o.d ?? "");
          cek(pts.length >= 3 && pts.every(([dx, dy]) => x + dx > -2 && x + dx < 302 && y + dy > -2 && y + dy < 202), `${nama}#${i + 1}: jalur ${o.id} masuk kanvas`);
        } else if (o.t === "garis" || o.t === "panah") cek(x + (o.x2 ?? 0) > -2 && x + (o.x2 ?? 0) < 302 && y + (o.y2 ?? 0) > -2 && y + (o.y2 ?? 0) < 202 && x > -2 && x < 302 && y > -2 && y < 202, `${nama}#${i + 1}: ${o.t} ${o.id} masuk kanvas`);
      }
      // teks tidak saling menimpa (hanya teks yang cukup jelas)
      const teksJelas = akhir.filter((o) => o.t === "teks" && o.isi && (o.op ?? 1) > 0.3);
      for (let m = 0; m < teksJelas.length; m += 1) for (let n = m + 1; n < teksJelas.length; n += 1) {
        const p = kotakTeks(teksJelas[m]);
        const q = kotakTeks(teksJelas[n]);
        const lebarTpk = Math.min(p.kanan, q.kanan) - Math.max(p.kiri, q.kiri);
        const tinggiTpk = Math.min(p.bawah, q.bawah) - Math.max(p.atas, q.atas);
        cek(!(lebarTpk > 1.5 && tinggiTpk > 1.5), `${nama}#${i + 1}: teks "${teksJelas[m].isi}" menimpa "${teksJelas[n].isi}"`);
      }
    });
  }
}

/* ------------------------------ Pemisahan materi dan metode luar ------------------------------ */
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map((a) => [a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]));
  const NAMA_METODE = /Orthographic|Height-Matrix|Occlusion|Reconstruction from|metode luar|siluet/i;
  const materi = teksVideo(V.VIDEO_MATERI_K6B3B);
  const luar = teksVideo(V.VIDEO_LUAR_K6B3B);
  cek(!NAMA_METODE.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of ["Orthographic Projection", "Height-Matrix Silhouette", "Occlusion Max Rule", "Reconstruction from Views"]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  cek(!/persen|%/i.test(materi + luar), "kedua video tanpa persen");
  cek(V.VIDEO_MATERI_K6B3B.adegan.every((a) => /Buku Siswa/.test(a.sumber) && /hlm\./.test(a.sumber)), "video materi: tiap adegan mencatat halaman buku");
  cek(V.VIDEO_LUAR_K6B3B.adegan.every((a) => /metode (dari )?luar|Ringkasan/i.test(a.sumber)), "video metode luar: tiap adegan bersumber metode luar atau ringkasan");
  for (const kk of ["Eksplorasi 3.2", "Latihan 3.2", "Anike", "Fort Rotterdam", "Uji Kompetensi", "Berefleksi", "nomor 5", "nomor 6", "perspektif", "Panduan guru|panduan guru"]) cek(new RegExp(kk, "i").test(materi), `video materi memuat ${kk}`);
  const ids = V.VIDEO_LUAR_K6B3B.adegan.map((a) => a.id);
  cek(["luarb3-proyeksi", "luarb3-matriks", "luarb3-oklusi", "luarb3-rekonstruksi"].every((i) => ids.includes(i)), "video metode luar: tiap metode punya adegan");
  cek(totalKetukan >= 60, `total ketukan cukup dalam (${totalKetukan})`);
}

/* ------------------------------ Hitungan mandiri ------------------------------ */
{
  // Proyeksi tampak dari daftar kubus {u, v, z, w}: u kiri ke kanan pada tampak depan, v dari depan ke belakang, z ke atas.
  const maks = (arr, f) => arr.reduce((m, c) => Math.max(m, f(c)), 0);
  const depan = (cs) => {
    const tz = maks(cs, (c) => c.z);
    const tu = maks(cs, (c) => c.u);
    return Array.from({ length: tz + 1 }, (_, r) => {
      const z = tz - r;
      return Array.from({ length: tu + 1 }, (_, u) => {
        const ada = cs.filter((c) => c.u === u && c.z === z).sort((a, b) => a.v - b.v)[0];
        return ada ? ada.w : ".";
      }).join("");
    });
  };
  const kanan = (cs) => {
    const tz = maks(cs, (c) => c.z);
    const tv = maks(cs, (c) => c.v);
    return Array.from({ length: tz + 1 }, (_, r) => {
      const z = tz - r;
      return Array.from({ length: tv + 1 }, (_, v) => {
        const ada = cs.filter((c) => c.v === v && c.z === z).sort((a, b) => b.u - a.u)[0];
        return ada ? ada.w : ".";
      }).join("");
    });
  };
  const atas = (cs) => {
    const tv = maks(cs, (c) => c.v);
    const tu = maks(cs, (c) => c.u);
    return Array.from({ length: tv + 1 }, (_, r) => {
      const v = tv - r;
      return Array.from({ length: tu + 1 }, (_, u) => {
        const ada = cs.filter((c) => c.u === u && c.v === v).sort((a, b) => b.z - a.z)[0];
        return ada ? ada.w : ".";
      }).join("");
    });
  };
  // Susunan Anike (Eksplorasi 3.2): tiga tampak pada buku.
  sama(depan(G.ANIKE), [".h.", "bmk"], "Anike: tampak depan berbentuk T");
  sama(kanan(G.ANIKE), ["h", "k"], "Anike: tampak kanan dua kubus bertumpuk");
  sama(atas(G.ANIKE), ["bhk"], "Anike: tampak atas tiga kotak");
  sama(G.ANIKE.length, 4, "Anike: 4 kubus");
  sama([maks(G.ANIKE, (c) => c.u) + 1, maks(G.ANIKE, (c) => c.z) + 1, maks(G.ANIKE, (c) => c.v) + 1], [3, 2, 1], "Anike: lebar 3, tinggi 2, kedalaman 1");
  // Latihan 3.2 nomor 5: tiga tampak pada buku harus cocok dengan empat kubus yang disusun.
  sama(depan(G.LATIHAN5), ["b.", "km"], "Latihan 3.2 no. 5: tampak depan");
  sama(kanan(G.LATIHAN5), ["b.", "mh"], "Latihan 3.2 no. 5: tampak kanan");
  sama(atas(G.LATIHAN5), ["h.", "bm"], "Latihan 3.2 no. 5: tampak atas");
  sama(G.LATIHAN5.length, 4, "Latihan 3.2 no. 5: 4 kubus");
  // Dua susunan yang tampak sama dari depan.
  sama(depan(G.CONTOH_A).map((r) => r.replace(/[a-z]/g, "x")), depan(G.CONTOH_B).map((r) => r.replace(/[a-z]/g, "x")), "dua susunan tampak sama dari depan (dua kotak)");
  cek(G.CONTOH_A.length === 2 && G.CONTOH_B.length === 3, "contoh A dua kubus, contoh B tiga kubus");
  sama(depan(G.CONTOH_C).map((r) => r.replace(/[a-z]/g, "x")), depan(G.CONTOH_D).map((r) => r.replace(/[a-z]/g, "x")), "dua susunan tampak sama dari depan (satu kotak)");
  cek(G.CONTOH_C.length === 1 && G.CONTOH_D.length === 2, "contoh C satu kubus, contoh D dua kubus");

  // Matriks tinggi: baris 0 adalah baris depan; kolom dari kiri ke kanan.
  const kolomMaks = (m) => m[0].map((_, c) => Math.max(...m.map((b) => b[c])));
  const barisMaks = (m) => m.map((b) => Math.max(...b));
  const jumlah = (m) => m.flat().reduce((s, n) => s + n, 0);
  const terisi = (m) => m.flat().filter((n) => n > 0).length;
  const dariMatriks = (m, warna) => m.flatMap((b, v) => b.flatMap((n, u) => Array.from({ length: n }, (_, z) => ({ u, v, z, w: warna }))));
  const ANI = [[1, 2, 1]];
  sama([kolomMaks(ANI), barisMaks(ANI), terisi(ANI), jumlah(ANI)], [[1, 2, 1], [2], 3, 4], "matriks Anike: depan 1,2,1; kanan 2; atas 3 sel; 4 kubus");
  const M5 = [[2, 1], [1, 0]];
  sama([kolomMaks(M5), barisMaks(M5), terisi(M5), jumlah(M5)], [[2, 1], [2, 1], 3, 4], "matriks nomor 5: depan 2,1; kanan 2,1; atas 3 sel; 4 kubus");
  sama(dariMatriks(M5, "x").length, 4, "matriks nomor 5 memberi 4 kubus");
  sama(depan(dariMatriks(M5, "x")), ["x.", "xx"], "matriks nomor 5 sama dengan tampak depan buku");
  sama(kanan(dariMatriks(M5, "x")), ["x.", "xx"], "matriks nomor 5 sama dengan tampak kanan buku");
  sama(atas(dariMatriks(M5, "x")), ["x.", "xx"], "matriks nomor 5 sama dengan tampak atas buku");
  const MO = [[2, 1], [1, 3]];
  sama([kolomMaks(MO), barisMaks(MO), jumlah(MO)], [[2, 3], [2, 3], 7], "contoh Occlusion: maksimum kolom dan baris, 7 kubus");
  sama(depan(dariMatriks(MO, "x")).join("").replace(/\./g, "").length, 5, "contoh Occlusion: tampak depan 5 kotak");
  sama(kanan(dariMatriks(MO, "x")).join("").replace(/\./g, "").length, 5, "contoh Occlusion: tampak kanan 5 kotak");
  // Kubus yang tidak terlihat dari depan: hitung satu per satu.
  {
    const cs = dariMatriks(MO, "x");
    const terlihatDepan = cs.filter((c) => !cs.some((d) => d.u === c.u && d.z === c.z && d.v < c.v));
    sama([cs.length, terlihatDepan.length, cs.length - terlihatDepan.length], [7, 5, 2], "7 kubus, 5 terlihat dari depan, 2 tersembunyi");
    const tersembunyi = cs.filter((c) => cs.some((d) => d.u === c.u && d.z === c.z && d.v < c.v));
    sama(tersembunyi.map((c) => [c.u, c.v, c.z]).sort(), [[0, 1, 0], [1, 1, 0]], "kubus tersembunyi: sel belakang kiri dan dasar tumpukan belakang kanan");
  }

  // Dadu: sisi berlawanan berjumlah 7. Dadu pertama: atas 6, kiri 4, kanan 5. Putar seperempat putaran sampai 5 berpindah ke kiri.
  {
    const lawan = (n) => 7 - n;
    sama([1, 2, 3].map((n) => [n, lawan(n)]), [[1, 6], [2, 5], [3, 4]], "pasangan sisi berlawanan dadu");
    // Mengelilingi sumbu tegak: kiri, kanan, lawan kiri, lawan kanan.
    const lingkar = [4, 5, lawan(4), lawan(5)];
    sama(lingkar, [4, 5, 3, 2], "sisi samping dadu pertama: 4, 5, 3, 2");
    // Putaran sehingga sisi kanan menjadi sisi kiri: urutan bergeser satu.
    const putar = [lingkar[1], lingkar[2], lingkar[3], lingkar[0]];
    sama([putar[0], putar[1]], [5, 3], "sesudah diputar: kiri 5, kanan 3");
    cek(putar[1] + 4 === 7 && putar[1] !== 6 && putar[1] !== 5 && putar[1] !== lawan(6) && putar[1] !== lawan(5), "sisi kosong bukan 6, 5, 1, atau 2");
    // Penelusuran semua pilihan: sisi kosong harus bertetangga dengan 6 dan 5, jadi hanya 3 atau 4; hanya 3 sesuai putaran.
    const calon = [1, 2, 3, 4].filter((n) => n !== lawan(6) && n !== lawan(5));
    sama(calon, [3, 4], "calon sisi kosong: 3 atau 4");
    sama(calon.filter((n) => n === putar[1]), [3], "sisi kosong adalah 3");
  }

  // Susunan 2 x 2 tinggi 1: bit b0 belakang kiri, b1 belakang kanan, b2 depan kiri, b3 depan kanan.
  {
    const semua = Array.from({ length: 15 }, (_, i) => i + 1);
    const sel = (m) => [0, 1, 2, 3].filter((b) => m & (1 << b));
    const kolomIsi = (m) => [0, 1].every((c) => sel(m).some((b) => b % 2 === c));
    const barisIsi = (m) => [0, 1].every((r) => sel(m).some((b) => Math.floor(b / 2) === r));
    const cocokDepan = semua.filter(kolomIsi);
    const cocokDepanKanan = cocokDepan.filter(barisIsi);
    sama([cocokDepan.length, cocokDepanKanan.length], [9, 7], "susunan cocok: satu tampak 9, dua tampak 7");
    sama([Math.min(...cocokDepan.map((m) => sel(m).length)), Math.max(...cocokDepan.map((m) => sel(m).length))], [2, 4], "kubus paling sedikit 2 dan paling banyak 4");
    sama([Math.min(...cocokDepanKanan.map((m) => sel(m).length)), Math.max(...cocokDepanKanan.map((m) => sel(m).length))], [2, 4], "dengan tampak kanan: paling sedikit 2, paling banyak 4");
    sama(cocokDepan, R2.SUSUNAN_DEPAN, "urutan susunan pada gambar sama dengan hitungan mandiri");
    sama(cocokDepan.filter((m) => !barisIsi(m)), [3, 12], "dua susunan gugur: hanya baris belakang atau hanya baris depan");
    sama(semua.filter((m) => R2.KANAN_BERISI(m)), semua.filter(barisIsi), "fungsi tampak kanan pada gambar sama dengan hitungan mandiri");
    // Tampak atas berbentuk L (belakang kiri, depan kiri, depan kanan) tinggal satu susunan.
    const topL = (m) => m === (1 | 4 | 8);
    sama(cocokDepanKanan.filter(topL), [13], "tampak atas L: tinggal satu susunan (13)");
    sama(R2.SUSUNAN_L, 13, "susunan L pada gambar");
    // Cek keadaan akhir adegan rekonstruksi: kelompok yang diredam sesuai.
    const adegan = V.VIDEO_LUAR_K6B3B.adegan.find((a) => a.id === "luarb3-rekonstruksi");
    const redam = (i) => {
      const s = L.keadaanStory(adegan, i, 9999);
      return cocokDepan.map((m, n) => ((s.find((o) => o.id === `g${n}-0`)?.op ?? 1) < 0.5 ? m : null)).filter((m) => m !== null);
    };
    sama(redam(2), [], "ketukan 3: tak ada susunan diredam");
    sama(redam(3), [3, 12], "ketukan 4: dua susunan gugur diredam");
    sama(redam(4), cocokDepan.filter((m) => m !== 13), "ketukan 5: semua kecuali susunan L diredam");
    // Sel terisi pada gambar sama dengan bit susunan.
    const s0 = L.keadaanStory(adegan, 2, 9999);
    cocokDepan.forEach((m, n) => {
      const terang = [0, 1, 2, 3].filter((b) => s0.find((o) => o.id === `g${n}-${b}`)?.warna === "#FDE68A");
      sama(terang, sel(m), `gambar susunan ${n} sama dengan bit ${m}`);
    });
  }

  // Warna sel tampak pada gambar sama dengan hitungan proyeksi (keadaan akhir ketukan terkait).
  const adegan = (v, id) => v.adegan.find((a) => a.id === id);
  const warnaDi = (a, i, id) => L.keadaanStory(a, i, 9999).find((o) => o.id === id)?.warna;
  const W2 = G.WARNA_KUBUS;
  {
    const a = adegan(V.VIDEO_MATERI_K6B3B, "eksplorasi-32");
    [["d-01", "h"], ["d-10", "b"], ["d-11", "m"], ["d-12", "k"]].forEach(([id, w]) => sama(warnaDi(a, 3, id), W2[w], `Anike depan ${id}`));
    sama(L.keadaanStory(a, 3, 9999).filter((o) => o.id.startsWith("d-")).length, 4, "Anike depan: 4 kotak");
    [["r-00", "h"], ["r-10", "k"]].forEach(([id, w]) => sama(warnaDi(a, 4, id), W2[w], `Anike kanan ${id}`));
    [["t-00", "b"], ["t-01", "h"], ["t-02", "k"]].forEach(([id, w]) => sama(warnaDi(a, 5, id), W2[w], `Anike atas ${id}`));
  }
  {
    const a = adegan(V.VIDEO_MATERI_K6B3B, "latihan-32");
    const kot = (i, awal) => L.keadaanStory(a, i, 9999).filter((o) => o.id.startsWith(awal));
    [["d-00", "b"], ["d-10", "k"], ["d-11", "m"]].forEach(([id, w]) => sama(warnaDi(a, 3, id), W2[w], `Latihan 5 depan ${id}`));
    [["r-00", "b"], ["r-10", "m"], ["r-11", "h"]].forEach(([id, w]) => sama(warnaDi(a, 4, id), W2[w], `Latihan 5 kanan ${id}`));
    [["t-00", "h"], ["t-10", "b"], ["t-11", "m"]].forEach(([id, w]) => sama(warnaDi(a, 4, id), W2[w], `Latihan 5 atas ${id}`));
    sama([kot(3, "d-").length, kot(4, "r-").length, kot(4, "t-").length], [3, 3, 3], "Latihan 5: tiap tampak tiga kotak");
    // Empat kubus pada gambar akhir: id c0..c3 dengan warna sesuai.
    const akhir = L.keadaanStory(a, 5, 9999);
    ["k", "b", "m", "h"].forEach((w, i) => sama(akhir.find((o) => o.id === `c${i}-k`)?.warna, W2[w], `kubus ${i} berwarna ${w}`));
    sama(new Set(akhir.filter((o) => /^c\d-k$/.test(o.id)).map((o) => o.id)).size, 4, "Latihan 5: empat kubus pada gambar akhir");
  }
}

/* ------------------------------ Kutipan buku (bila PDF tersedia) ------------------------------ */
{
  const pdf = new URL("../bahan-sd/Matematika-BS-KLS-VI.pdf", import.meta.url);
  const ada = existsSync(pdf);
  const cobaPdf = ada ? spawnSync("pdftotext", ["-f", "91", "-l", "112", "-raw", pdf.pathname.replace(/^\/([A-Za-z]:)/, "$1"), "-"], { encoding: "utf8", maxBuffer: 1 << 26 }) : null;
  if (!ada || !cobaPdf || cobaPdf.status !== 0) console.log("PDF atau pdftotext tidak tersedia: pemeriksaan kutipan buku dilewati");
  else {
    const bersih = (t) => t.toLowerCase().replace(/-\s*\n\s*/g, "-").replace(/\s+/g, " ").trim();
    const buku = bersih(cobaPdf.stdout);
    let n = 0;
    for (const a of V.VIDEO_MATERI_K6B3B.adegan) for (const kt of a.kutipan ?? []) {
      n += 1;
      cek(buku.includes(bersih(kt)), `kutipan buku ${a.id}: "${kt}" ada di teks PDF`);
    }
    cek(n >= 20, `jumlah kutipan buku yang diperiksa (${n})`);
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k6b3b-.*\.(ts|tsx)$/.test(f));
  cek(berkas.length >= 8, `berkas story ditemukan (${berkas.length})`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    const buruk = [...s].filter((c) => {
      const kk = c.codePointAt(0);
      return kk > 0x1fa95 || kk === 0x1f7f0 || kk === 0x200d;
    });
    cek(buruk.length === 0, `${f}: tanpa emoji di atas Emoji 12 dan tanpa ZWJ (${buruk.map((c) => c.codePointAt(0).toString(16)).join()})`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: UTF-8 tanpa BOM dan akhir baris LF`);
    cek(!/fetch\(|XMLHttpRequest|openai|anthropic|gemini|correct_index|explanation/i.test(s), `${f}: tanpa jaringan, model bahasa, atau kunci jawaban`);
    cek(!/from "react"/.test(s), `${f}: logika dan data tanpa React`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|k6b3b-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas k6b3b sendiri (${impor.join(", ")})`);
  }
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k6b3b.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_B63/.test(pembungkus) && /VIDEO_MATERI_K6B3B/.test(pembungkus) && /VIDEO_LUAR_K6B3B/.test(pembungkus) && /export function VideoK6B3B/.test(pembungkus), "video-k6b3b: memakai dua video baru, bukan naskah dan visual lama");
}

console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara); materi ${kataVideo["k6b3b-materi"]} kata, luar ${kataVideo["k6b3b-luar"]} kata`);
process.exit(gagal ? 1 : 0);
