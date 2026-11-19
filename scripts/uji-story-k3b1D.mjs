// Uji Story Kelas 3 Bab 1 Sub-Bab D "Pesanan Bu Tuti" (penjumlahan sampai 100), Toko Kelontong Pak Joko: video materi dan video metode global.
// Jalankan: node --no-warnings scripts/uji-story-k3b1D.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k3b1D-video.ts");

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
const VIDEO = [V.VIDEO_MATERI_K3B1D, V.VIDEO_LUAR_K3B1D];
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
      cek(kata.length >= 4 && kata.length <= 40, `${nama}#${i + 1}: 4 sampai 40 kata (ada ${kata.length})`);
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

for (const v of VIDEO) for (const a of v.adegan) a.ketukan.forEach((_, i) => { for (const o of L.keadaanStory(a, i, 9999)) if (o.t === "teks") cek(typeof o.isi === "string" && o.isi.length > 0, `${v.id}/${a.id}#${i + 1}: teks berisi (${o.id})`); });




/* ------------------------------ Khusus Sub-Bab D Kelas 3 Bab 1 ------------------------------ */
{
  const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
  const U1 = await import("../src/components/modul/story/k3b1D-luar-1.ts");
  const M_VIDEO = V.VIDEO_MATERI_K3B1D;
  const U = V.VIDEO_LUAR_K3B1D;
  const adegan = (v, id) => v.adegan.find((a) => a.id === id);
  const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
  const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
  const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  const ketemu = (objs, id) => objs.find((o) => o.id === id);
  const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
  const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));
  const tidakAda = (objs, ...ids) => ids.every((id) => !ketemu(objs, id));
  const E_BENAR = "\u{2705}";
  const E_SALAH = "\u{274C}";

  // Pembaca bilangan yang diucapkan dengan kata: satuan, sepuluh, belasan (dua belas), puluhan majemuk, seratus.
  const SATUAN = { satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8, sembilan: 9 };
  const bilanganSuara = (s0) => {
    const t = s0.toLowerCase().split(/[^a-z]+/).filter(Boolean);
    const out = [];
    for (let i = 0; i < t.length; i += 1) {
      const w = t[i];
      if (w === "sepuluh") out.push(10);
      else if (w === "sebelas") out.push(11);
      else if (w === "seratus") out.push(100);
      else if (SATUAN[w]) {
        if (t[i + 1] === "belas") {
          out.push(10 + SATUAN[w]);
          i += 1;
        } else if (t[i + 1] === "puluh") {
          let n = SATUAN[w] * 10;
          if (SATUAN[t[i + 2]] && t[i + 3] !== "puluh") {
            n += SATUAN[t[i + 2]];
            i += 2;
          } else i += 1;
          out.push(n);
        } else out.push(SATUAN[w]);
      }
    }
    return out;
  };
  sama(bilanganSuara("Satu, dua, kedua, keduanya, satuannya, sepuluh."), [1, 2, 10], "pembaca bilangan suara (satuan)");
  sama(bilanganSuara("Lima, sepuluh, lima belas. Dua belas anak, tujuh belas, kelima."), [5, 10, 15, 12, 17], "pembaca bilangan suara (belasan)");
  sama(bilanganSuara("tiga puluh delapan ditambah dua puluh tujuh, empat puluh, tujuh puluh lima dan sembilan"), [38, 27, 40, 75, 9], "pembaca bilangan suara (puluhan)");
  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Standard Addition|Number Bond|Counting On|Penjumlahan Bersusun|Pasangan Bilangan|Menghitung Maju/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Standard Addition", "Number Bond", "Counting On"], ["Penjumlahan Bersusun", "Pasangan Bilangan", "Menghitung Maju"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Pesanan Bu Tuti" && U.judul === M_VIDEO.judul && V.JUDUL_K3B1D === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k3b1D-materi" && U.id === "k3b1D-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,pesanan-kue,susun-pendek,susun-panjang,lupa-simpan,tukar-sepuluh,tiga-bilangan,soal-cerita-tambah,periksa-tukar,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-susun,luar-susun-terapan,luar-pasangan,luar-pasangan-terapan,luar-maju,luar-maju-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 52) && U.adegan.every((a) => /Metode global|Ringkasan|ringkasan/i.test(a.sumber) && a.sumber.length <= 52), "label sumber");
  const TERLARANG = /(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|soal|tebak|kunci|latihan)/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa kata terlarang`);
  const SURUH = /bawalah|bawa benda (di|dari) rumah|ambil benda di rumah|gambarlah|gambar di kertas|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!SURUH.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa suruhan membawa benda, menggambar di kertas, atau bermain bersama`);
  // Angka di gambar paling besar seratus.
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) for (const [i] of a.ketukan.entries()) for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) for (const b of bilanganDari(t)) cek(Number(b) <= 100, `${v.id}/${a.id}#${i + 1}: angka paling besar seratus ("${t}")`);
  // Bilangan yang diucapkan tampak sebagai angka di gambar pada ketukan itu (atau sebelumnya dalam adegan). Sapaan bersama dikecualikan.
  for (const v of [M_VIDEO, U])
    for (const a of v.adegan)
      if (a.id !== "sapaan")
        a.ketukan.forEach((kt, i) => {
          const terlihat = new Set();
          for (let p = -1; p < L.kataDari(kt.suara).length; p += 1) for (const t of L.teksTerlihat(L.keadaanStory(a, i, p))) for (const b of bilanganDari(t)) terlihat.add(Number(b));
          for (const n of bilanganSuara(kt.suara)) cek(terlihat.has(n), `${v.id}/${a.id}#${i + 1}: bilangan ${n} yang diucapkan tampak sebagai angka`);
        });
  // Semua kalimat hitung "a + b (+ c) = d" di gambar benar.
  for (const v of [M_VIDEO, U])
    for (const a of v.adegan)
      a.ketukan.forEach((_, i) => {
        for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) {
          const m = t.match(/^(\d+) \+ (\d+)(?: \+ (\d+))? = (\d+)(?: \+ (\d+))?$/);
          if (m && !m[5]) cek(Number(m[1]) + Number(m[2]) + Number(m[3] ?? 0) === Number(m[4]), `${v.id}/${a.id}#${i + 1}: kalimat hitung benar ("${t}")`);
        }
      });
  const semuaSuara = M_VIDEO.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [1, 2, 3, 4, 5, 6, 7, 9, 10, 15, 23, 14, 37, 38, 27, 55, 65, 24, 31, 70, 46, 29, 75, 80]) cek(bilanganSuara(semuaSuara).includes(n), `video materi mengucapkan bilangan ${n}`);
  const semuaLuar = U.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [3, 6, 7, 13, 47, 36, 83, 38, 27, 40, 25, 65, 54, 23, 74, 75, 76, 77, 29]) cek(bilanganSuara(semuaLuar).includes(n), `video global mengucapkan bilangan ${n}`);
  for (const kata of ["Raka", "Salsa", "Bima", "Pak Joko", "Bu Tuti", "Pak Anto", "susun", "menyimpan", "puluhan", "satuan", "batang", "butir", "tiga bilangan", "menukar urutan", "menaksir", "loyang", "taruhan", "rak mi"])
    cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const pola of [/Igil/, /Kaka/, /Abang/, /Mamah/, /Pak Pos/i, /rumah rapi/i, /akuarium/i, /pasar malam/i, /rumah pohon/i, /pustaka/i, /perpustakaan/i, /kantin/i, /koperasi/i, /seragam/i, /Chacha/, /Dika/, /\bNia\b/, /Bu Sari/, /Pak Hendra/, /Bu Maya/, /Pak Ujang/, /Bu Lia/, /bank sampah/i, /pentas/i, /panggung/i, /Pak Dodi/, /Bu Wati/, /Kak Dewi/, /Bu Mirna/, /Nenek Ijah/, /Alfa/, /Galih/, /Alen/, /Meutia/, /Andi/, /Pak Bandi/])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `durasi video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/penjumlahan sampai seratus/.test(sapa.ketukan[0].suara) && ["Menjumlah dengan susun pendek dan susun panjang", "Menjumlah dengan menyimpan", "Menjumlah tiga bilangan"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
  cek(M_VIDEO.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  // Naskah tetap: kalimat suara sama dengan berkas naskah.
  const naskah = readFileSync(new URL("../naskah/story-naskah-k3b1d.md", import.meta.url), "utf8");
  const dalamNaskah = (s) => naskah.replace(/\s+/g, " ").includes(s.replace(/\s+/g, " "));
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) cek(dalamNaskah(kt.suara), `${v.id}/${a.id}: suara sesuai naskah tetap ("${kt.suara.slice(0, 40)}")`);
  // Visual berubah mengikuti kata pada hampir semua ketukan.
  let banyakTitik = 0;
  let total = 0;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) { total += 1; if (new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at))).size >= 2) banyakTitik += 1; }
  cek(banyakTitik / total >= 0.9, `visual berubah mengikuti kata pada sedikitnya 90 persen ketukan (${banyakTitik}/${total})`);
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") cek(akhirAdegan(a).some((o) => o.t !== "teks"), `${v.id}/${a.id}: gambar akhir memuat bentuk gambar sendiri, bukan hanya teks`);

  // Isi tiap adegan materi.
  const pk = adegan(M_VIDEO, "pesanan-kue");
  cek(ada(akhirAdegan(pk, 0), "lt", "mj", "bt", "bt-kr", "bt-dp") && isiTeks(akhirAdegan(pk, 0), "bt-n") === "Bu Tuti", "pesanan kue: Bu Tuti berkerudung merah muda membawa daftar di meja toko");
  cek(ada(akhirAdegan(pk, 1), "pj", "pj-ap", "pj-ps", "k1", "k2") && isiTeks(akhirAdegan(pk, 1), "c1") === "23" && isiTeks(akhirAdegan(pk, 1), "c2") === "14" && isiTeks(akhirAdegan(pk, 1), "n2") === "2 kotak", "pesanan kue: Pak Joko berapron biru dan dua kotak kue 23 dan 14");
  cek(ada(akhirAdegan(pk), "rk", "rk-ks", "sl", "sl-kp1", "sl-kc", "bm", "bm-ks"), "pesanan kue: Raka, Salsa, dan Bima menghitung dengan susun");
  const sp = adegan(M_VIDEO, "susun-pendek");
  cek(isiTeks(akhirAdegan(sp, 0), "ls-a") === "23" && isiTeks(akhirAdegan(sp, 0), "ls-b") === "14" && ada(akhirAdegan(sp, 0), "kc-t", "kc-s"), "susun pendek: 23 di atas 14 dalam kolom puluhan dan satuan");
  cek(isiTeks(akhirAdegan(sp, 1), "eq-s") === "3 + 4 = 7" && isiTeks(akhirAdegan(sp, 1), "ls-h-s") === "7", "susun pendek: satuan tiga ditambah empat sama dengan tujuh");
  cek(isiTeks(akhirAdegan(sp), "eq-p") === "2 + 1 = 3" && isiTeks(akhirAdegan(sp), "ls-h-t") === "3" && isiTeks(akhirAdegan(sp), "ha") === "37 kue", "susun pendek: puluhan dua tambah satu, hasil tiga puluh tujuh");
  const sg = adegan(M_VIDEO, "susun-panjang");
  cek(ada(akhirAdegan(sg, 0), "sl", "kc") && isiTeks(akhirAdegan(sg, 0), "u1") === "23 = 20 + 3" && isiTeks(akhirAdegan(sg, 0), "u2") === "14 = 10 + 4", "susun panjang: kertas catatan Salsa menguraikan 23 dan 14");
  cek(isiTeks(akhirAdegan(sg, 1), "t1") === "20 + 10 = 30" && isiTeks(akhirAdegan(sg, 1), "t2") === "3 + 4 = 7", "susun panjang: dua jumlah sementara tiga puluh dan tujuh");
  cek(isiTeks(akhirAdegan(sg), "t3") === "30 + 7 = 37" && isiTeks(akhirAdegan(sg), "sp") === "= susun pendek", "susun panjang: bergabung menjadi tiga puluh tujuh, sama dengan susun pendek");
  const ls = adegan(M_VIDEO, "lupa-simpan");
  cek(ada(akhirAdegan(ls, 0), "rk", "pk") && isiTeks(akhirAdegan(ls, 0), "s1") === "38 + 27" && isiTeks(akhirAdegan(ls, 0), "hs") === "55 ?" && isiTeks(akhirAdegan(ls, 0), "s2") === "5 dari 15", "lupa simpan: Raka menulis hasil 55 bertanda tanya");
  cek(ada(akhirAdegan(ls, 1), "bk", "ly1", "ly2", "ly3") && isiTeks(akhirAdegan(ls, 1), "tr") === "taruhan!", "lupa simpan: taruhan dan deretan loyang kotor di bak cuci");
  cek(ada(akhirAdegan(ls), "sl", "sl-kc", "f1", "f2", "f3", "sm") && tidakAda(akhirAdegan(ls), "hs", "s2") && isiTeks(akhirAdegan(ls), "f1") === "15" && isiTeks(akhirAdegan(ls), "f2") === "1 puluhan" && isiTeks(akhirAdegan(ls), "f3") === "5 satuan", "lupa simpan: Salsa menunjuk 15 menjadi 1 puluhan dan 5 satuan");
  const ts = adegan(M_VIDEO, "tukar-sepuluh");
  cek(ada(akhirAdegan(ts, 0), "bm", "bk-t-p5", "bs-1", "bs-15") && tidakAda(akhirAdegan(ts, 0), "bk-t-p6") && isiTeks(akhirAdegan(ts, 0), "lp") === "puluhan" && isiTeks(akhirAdegan(ts, 0), "ls") === "satuan", "tukar sepuluh: lima batang puluhan dan lima belas butir satuan");
  cek(tidakAda(akhirAdegan(ts, 1), "bs-1", "bs-10") && ada(akhirAdegan(ts, 1), "bs-11", "bs-15", "ts-p1") && ketemu(akhirAdegan(ts, 1), "ts-p1").x === 145 && isiTeks(akhirAdegan(ts, 1), "n10") === "10 butir", "tukar sepuluh: sepuluh butir ditukar satu batang yang pindah ke kolom puluhan");
  cek(isiTeks(akhirAdegan(ts), "sim") === "1" && isiTeks(akhirAdegan(ts), "eq") === "3 + 2 + 1 = 6" && isiTeks(akhirAdegan(ts), "h65") === "65", "tukar sepuluh: simpanan satu, puluhan enam, hasil enam puluh lima");
  const tb = adegan(M_VIDEO, "tiga-bilangan");
  sama(["c1", "c2", "c3"].map((id) => isiTeks(akhirAdegan(tb, 0), id)), ["15", "24", "31"], "tiga bilangan: tiga kotak kue lima belas, dua puluh empat, tiga puluh satu");
  cek(isiTeks(akhirAdegan(tb, 1), "eq") === "15 + 24 = 39 + 31" && ketemu(akhirAdegan(tb, 1), "k3").sorot === true, "tiga bilangan: lima belas ditambah dua puluh empat tiga puluh sembilan, lalu tambah tiga puluh satu");
  cek(isiTeks(akhirAdegan(tb), "e9") === "9 + 1 = 10" && isiTeks(akhirAdegan(tb), "ls2-h") === "70" && isiTeks(akhirAdegan(tb), "hk") === "70 kue" && ada(akhirAdegan(tb), "ls2-a", "ls2-b"), "tiga bilangan: sembilan tambah satu sepuluh, simpan satu, hasil tujuh puluh");
  const ct = adegan(M_VIDEO, "soal-cerita-tambah");
  cek(ada(akhirAdegan(ct, 0), "rk", "rk-s1", "r1", "r10", "pj") && isiTeks(akhirAdegan(ct, 0), "n46") === "46 roti" && isiTeks(akhirAdegan(ct, 0), "n29") === "29 roti", "cerita tambah: rak dengan 46 roti dan Pak Joko menambah 29 roti");
  cek(isiTeks(akhirAdegan(ct, 1), "e6") === "6 + 9 = 15" && isiTeks(akhirAdegan(ct, 1), "sm") === "simpan 1" && isiTeks(akhirAdegan(ct, 1), "kt") === "kata tambah = +", "cerita tambah: enam tambah sembilan lima belas, simpan satu");
  cek(isiTeks(akhirAdegan(ct), "e4") === "4 + 2 + 1 = 7" && isiTeks(akhirAdegan(ct), "h75") === "75 roti" && isiTeks(akhirAdegan(ct), "ls3-h-t") === "7" && isiTeks(akhirAdegan(ct), "ls3-h-s") === "5", "cerita tambah: puluhan empat tambah dua tambah satu tujuh, tujuh puluh lima");
  const px = adegan(M_VIDEO, "periksa-tukar");
  cek(isiTeks(akhirAdegan(px, 0), "a1") === "46 + 29" && isiTeks(akhirAdegan(px, 0), "b1") === "29 + 46" && isiTeks(akhirAdegan(px, 0), "a2") === "= 75" && isiTeks(akhirAdegan(px, 0), "b2") === "= 75", "periksa tukar: dua papan 46 + 29 dan 29 + 46 hasil sama");
  cek(isiTeks(akhirAdegan(px, 1), "sm") === "=" && isiTeks(akhirAdegan(px, 1), "bl") === "dibalik", "periksa tukar: tanda sama dengan, urutan boleh dibalik");
  sama(["v46", "v50", "v29", "v30", "v75", "v80"].map((id) => isiTeks(akhirAdegan(px), id)), ["46", "50", "29", "30", "75", "80"], "periksa tukar: garis bilangan taksiran dengan titik 75 dekat 80");
  cek(isiTeks(akhirAdegan(px), "eq") === "50 + 30 = 80", "periksa tukar: taksiran lima puluh ditambah tiga puluh");
  const pn = adegan(M_VIDEO, "penutup");
  cek(ada(akhirAdegan(pn, 0), "rk", "bk", "bu1", "ly1", "ly3", "kl1") && ketemu(akhirAdegan(pn, 0), "ly1").warna === "#E0F2FE", "penutup: Raka berbusa di depan bak cuci dengan loyang berkilau");
  cek(ada(akhirAdegan(pn, 1), "pa", "pa-km", "pa-ts", "rm", "m1") && isiTeks(akhirAdegan(pn, 1), "ks") === "hampir kosong" && isiTeks(akhirAdegan(pn, 1), "pa-n") === "Pak Anto", "penutup: Pak Anto berkemeja kotak-kotak di pintu, rak mi hampir kosong");
  cek(ada(akhirAdegan(pn), "pa", "rk", "sl", "bm", "pj", "bt", "tq", "w1", "w3"), "penutup: lima tokoh melambai dan pertanyaan penutup");

  // Isi tiap adegan metode global.
  const op = adegan(U, "luar-pembuka");
  cek(ada(akhirAdegan(op, 0), "sl", "mj", "c0-k", "c2-k") && isiTeks(akhirAdegan(op, 0), "n3") === "3 lembar", "global pembuka: Salsa menemukan tiga lembar catatan di bawah meja");
  cek(ada(akhirAdegan(op, 1), "bt", "ok") && isiTeks(akhirAdegan(op, 1), "n3") === "3 cara", "global pembuka: Bu Tuti berkata tiga cara");
  sama(["m0", "m1", "m2"].map((id) => isiTeks(akhirAdegan(op, 2), id)), ["1. Standard Addition", "2. Number Bond", "3. Counting On"], "global pembuka: tiga nama metode");
  sama(["g0", "g1", "g2"].map((id) => isiTeks(akhirAdegan(op, 3), id)), ["Penjumlahan Bersusun", "Pasangan Bilangan", "Menghitung Maju"], "global pembuka: tiga nama bahasa Indonesia");
  const sa = adegan(U, "luar-susun");
  cek(ada(akhirAdegan(sa, 0), "pk", "ls-a", "ls-b") && isiTeks(akhirAdegan(sa, 0), "nm") === "Standard Addition", "Penjumlahan Bersusun konsep: papan dengan dua bilangan bersusun");
  cek(ada(akhirAdegan(sa, 1), "kc-t", "kc-s", "kp", "ks"), "Penjumlahan Bersusun konsep: kolom puluhan dan satuan lurus");
  cek(isiTeks(akhirAdegan(sa, 2), "n9") === "lebih dari 9" && isiTeks(akhirAdegan(sa, 2), "sm") === "simpan 1", "Penjumlahan Bersusun konsep: lebih dari sembilan simpan satu puluhan");
  cek(ada(akhirAdegan(sa), "sim") && ketemu(akhirAdegan(sa), "kc-t").op === 0.8, "Penjumlahan Bersusun konsep: puluhan beserta simpanan");
  const st = adegan(U, "luar-susun-terapan");
  cek(isiTeks(akhirAdegan(st, 0), "ls-a") === "47" && isiTeks(akhirAdegan(st, 0), "ls-b") === "36" && isiTeks(akhirAdegan(st, 0), "eq") === "7 + 6 = 13" && isiTeks(akhirAdegan(st, 0), "sm") === "simpan 1", "Penjumlahan Bersusun terapan: 47 + 36, tujuh tambah enam tiga belas simpan satu");
  cek(isiTeks(akhirAdegan(st, 1), "e4") === "4 + 3 + 1 = 8" && isiTeks(akhirAdegan(st, 1), "ls-h") === "83", "Penjumlahan Bersusun terapan: delapan puluh tiga");
  cek(ada(akhirAdegan(st, 2), "tn", "cc-k") && ketemu(akhirAdegan(st, 2), "tn").isi === E_BENAR && ada(akhirAdegan(st, 3), "tn", "cc-k") && ketemu(akhirAdegan(st, 3), "tn").isi === E_SALAH, "Penjumlahan Bersusun terapan: cocok (benar) dan kurang cocok (salah)");
  const pa = adegan(U, "luar-pasangan");
  cek(isiTeks(akhirAdegan(pa, 0), "nm") === "Number Bond" && ada(akhirAdegan(pa, 0), "pb-a", "pb-b1", "pb-b2", "pb-l1", "pb-l2"), "Pasangan Bilangan konsep: diagram pasangan");
  cek(isiTeks(akhirAdegan(pa, 1), "n2") === "2 bagian" && isiTeks(akhirAdegan(pa, 1), "pk") === "puluhan", "Pasangan Bilangan konsep: dipecah dua bagian menuju puluhan");
  sama(["pb-at", "pb-b1t", "pb-b2t", "eq"].map((id) => isiTeks(akhirAdegan(pa, 2), id)), ["8", "2", "6", "38 + 2 = 40"], "Pasangan Bilangan konsep: delapan dipecah dua dan enam");
  cek(isiTeks(akhirAdegan(pa), "e2") === "40 + 6 = 46", "Pasangan Bilangan konsep: sisanya ditambahkan");
  const pt = adegan(U, "luar-pasangan-terapan");
  sama(["pb-at", "pb-b1t", "pb-b2t", "q"].map((id) => isiTeks(akhirAdegan(pt, 0), id)), ["27", "2", "25", "38 + 27"], "Pasangan Bilangan terapan: 27 dipecah 2 dan 25");
  cek(isiTeks(akhirAdegan(pt, 1), "e1") === "38 + 2 = 40" && isiTeks(akhirAdegan(pt, 1), "e2") === "40 + 25 = 65", "Pasangan Bilangan terapan: tiga puluh delapan jadi empat puluh, enam puluh lima");
  const mj = adegan(U, "luar-maju");
  cek(isiTeks(akhirAdegan(mj, 0), "nm") === "Counting On" && ada(akhirAdegan(mj, 0), "gb", "d0", "h1", "h2", "d1", "d2"), "Menghitung Maju konsep: garis bilangan dan lompatan");
  cek(ada(akhirAdegan(mj, 1), "kb-k", "kc-k", "pn") && isiTeks(akhirAdegan(mj, 1), "kb-t0") === "lebih besar" && isiTeks(akhirAdegan(mj, 1), "kc-t0") === "lebih kecil", "Menghitung Maju konsep: mulai dari yang lebih besar");
  cek(ada(akhirAdegan(mj, 2), "b1", "b2", "s1", "s3", "de") && isiTeks(akhirAdegan(mj, 2), "p1") === "+10" && isiTeks(akhirAdegan(mj, 2), "q3") === "+1", "Menghitung Maju konsep: per sepuluh dulu, baru per satu");
  cek(ketemu(akhirAdegan(mj, 3), "de").sorot === true && ada(akhirAdegan(mj, 3), "fl", "jm"), "Menghitung Maju konsep: berhenti di bilangan terakhir");
  const mt = adegan(U, "luar-maju-terapan");
  cek(isiTeks(akhirAdegan(mt, 0), "q") === "54 + 23" && isiTeks(akhirAdegan(mt, 0), "v54") === "54" && isiTeks(akhirAdegan(mt, 0), "p20") === "+20" && isiTeks(akhirAdegan(mt, 0), "v74") === "74", "Menghitung Maju terapan: dari 54 maju 20 jadi 74");
  sama(["v75", "v76", "v77", "p3"].map((id) => isiTeks(akhirAdegan(mt, 1), id)), ["75", "76", "77", "+3"], "Menghitung Maju terapan: maju tiga lagi 75, 76, 77");
  const rk = adegan(U, "luar-ringkas");
  cek(ada(akhirAdegan(rk, 0), "r0-k", "r1-k", "r2-k", "tq") && isiTeks(akhirAdegan(rk, 0), "n3") === "3 cara", "ringkasan: tiga kartu cara dan pertanyaan mana yang pas");
  cek(ketemu(akhirAdegan(rk, 1), "r1-k").sorot && !ketemu(akhirAdegan(rk, 1), "r0-k").sorot && isiTeks(akhirAdegan(rk, 1), "e1") === "hampir puluhan", "ringkasan: Pasangan Bilangan untuk hampir menggenapi puluhan");
  cek(ketemu(akhirAdegan(rk, 2), "r2-k").sorot && !ketemu(akhirAdegan(rk, 2), "r1-k").sorot && isiTeks(akhirAdegan(rk, 2), "e2") === "1 bilangan kecil", "ringkasan: Menghitung Maju untuk bilangan kecil");
  cek(isiTeks(akhirAdegan(rk), "n3") === "65 + 29" && ada(akhirAdegan(rk), "z0", "z1", "z2") && tidakAda(akhirAdegan(rk), "tq"), "ringkasan: pertanyaan memilih cara untuk 65 + 29");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k3b1D-.*\.ts$/.test(f));
  cek(berkas.length >= 8, `berkas story k3b1D (${berkas.length})`);
  cek(!berkas.includes("k3b1D-materi-4.ts") && !berkas.includes("k3b1D-materi-5.ts"), "k3b1D-materi-4.ts dan materi-5.ts sudah dihapus");
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku/i.test(s), `${f}: tanpa kata buku`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k3b1D-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, atau k3b1D (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of L.keadaanStory(a, i, 9999)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k3b1d.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K3B1D/.test(pb) && /VIDEO_LUAR_K3B1D/.test(pb) && /export function VideoK3B1D/.test(pb) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pb) && !/\r/.test(pb) && !pb.startsWith("﻿") && !/data-k3b1|video-k3b1-umum/.test(pb), "video-k3b1d.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
