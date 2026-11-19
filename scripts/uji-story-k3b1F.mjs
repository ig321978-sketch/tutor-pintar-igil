// Uji Story Kelas 3 Bab 1 Sub-Bab F "Telur Bu Mirna" (perkalian sampai seratus), Toko Kelontong Pak Joko: video materi dan video metode global.
// Jalankan: node --no-warnings scripts/uji-story-k3b1F.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k3b1F-video.ts");

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
const VIDEO = [V.VIDEO_MATERI_K3B1F, V.VIDEO_LUAR_K3B1F];
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
      cek(kata.length >= 5 && kata.length <= 40, `${nama}#${i + 1}: 5 sampai 40 kata (ada ${kata.length})`);
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





/* ------------------------------ Khusus Sub-Bab F Kelas 3 Bab 1 ------------------------------ */
{
  const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
  const U1 = await import("../src/components/modul/story/k3b1F-luar-1.ts");
  const M_VIDEO = V.VIDEO_MATERI_K3B1F;
  const U = V.VIDEO_LUAR_K3B1F;
  const adegan = (v, id) => v.adegan.find((a) => a.id === id);
  const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
  const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
  const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  const ketemu = (objs, id) => objs.find((o) => o.id === id);
  const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
  const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));
  const tidakAda = (objs, ...ids) => ids.every((id) => !ketemu(objs, id));

  // Pembaca bilangan yang diucapkan dengan kata: satuan, sepuluh, belasan, puluhan majemuk, seratus.
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
  sama(bilanganSuara("Sepuluh, dua puluh, lima puluh satu, tiga-tiga."), [10, 20, 51, 3, 3], "pembaca bilangan suara (puluhan dan ulang)");
  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Equal Groups|Skip Counting|Array|Isi Sama|Susunan Baris Kolom|Lompat Hitung/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Equal Groups", "Array", "Skip Counting"], ["Isi Sama", "Susunan Baris Kolom", "Lompat Hitung"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Telur Bu Mirna" && U.judul === M_VIDEO.judul && V.JUDUL_K3B1F === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k3b1F-materi" && U.id === "k3b1F-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,kotak-telur,tambah-berulang,tulis-kali,salah-jumlah,baris-kolom,tukar-urutan,lompat-hitung,cerita-kali,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-isi,luar-isi-terapan,luar-susunan,luar-susunan-terapan,luar-lompat,luar-lompat-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 52) && U.adegan.every((a) => /Metode global|Ringkasan|ringkasan/i.test(a.sumber) && a.sumber.length <= 52), "label sumber");
  const TERLARANG = /(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|soal|tebak|kunci|latihan)/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa kata terlarang`);
  const SURUH = /bawalah|bawa benda (di|dari) rumah|ambil benda di rumah|gambarlah|gambar di kertas|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!SURUH.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa suruhan membawa benda, menggambar di kertas, atau bermain bersama`);
  // Angka di gambar paling besar seratus.
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) for (const [i] of a.ketukan.entries()) for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) for (const b of bilanganDari(t)) cek(Number(b) <= 100, `${v.id}/${a.id}#${i + 1}: angka paling besar seratus ("${t}")`);
  // Bilangan yang diucapkan tampak sebagai angka di gambar pada ketukan itu. Sapaan bersama dikecualikan.
  for (const v of [M_VIDEO, U])
    for (const a of v.adegan)
      if (a.id !== "sapaan")
        a.ketukan.forEach((kt, i) => {
          const terlihat = new Set();
          for (let p = -1; p < L.kataDari(kt.suara).length; p += 1) for (const t of L.teksTerlihat(L.keadaanStory(a, i, p))) for (const b of bilanganDari(t)) terlihat.add(Number(b));
          for (const n of bilanganSuara(kt.suara)) cek(terlihat.has(n), `${v.id}/${a.id}#${i + 1}: bilangan ${n} yang diucapkan tampak sebagai angka`);
        });
  const semuaSuara = M_VIDEO.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [1, 3, 4, 5, 6, 7, 9, 10, 12, 14, 18, 20, 21, 30, 40, 50, 60]) cek(bilanganSuara(semuaSuara).includes(n), `video materi mengucapkan bilangan ${n}`);
  const semuaLuar = U.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [3, 4, 5, 6, 10, 12, 15, 18, 20, 24, 30]) cek(bilanganSuara(semuaLuar).includes(n), `video global mengucapkan bilangan ${n}`);
  for (const kata of ["Raka", "Salsa", "Bima", "Pak Joko", "Bu Mirna", "telur", "kotak", "penjumlahan berulang", "perkalian", "baris", "kolom", "lompatan", "rak", "pensil", "botol", "hari jadi", "bingkisan", "ditukar"])
    cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const pola of [/Igil/, /Kaka/, /Abang/, /Mamah/, /Pak Pos/i, /rumah rapi/i, /akuarium/i, /pasar malam/i, /rumah pohon/i, /pustaka/i, /perpustakaan/i, /kantin/i, /koperasi/i, /seragam/i, /Bu Dewi/, /Pak Rudi/, /Pak Tono/, /Pak Hasan/, /Bu Mira\b/, /ubin/i, /taman bermain/i, /puzzle/i, /pameran/i, /\baula\b/i, /manik/i, /Pak Danu/, /Bu Wati/, /kebun/i, /semangka/i, /bedeng/i, /Pak Anton/, /Bu Ratna/, /olahraga/i, /lapangan/i, /neraca/i, /Pak Ujang/, /Bu Lia/, /bank sampah/i, /tali rafia/i, /Pak Ahmad/, /Halim/, /Malosi/, /Upe/, /Tika/, /Lili/, /Chacha/, /Dika/, /\bNia\b/, /Bu Sari/, /Pak Hendra/, /Bu Maya/, /panggung/i, /tirai/i, /Alfa/, /Galih/, /Alen/, /Meutia/, /Andi/, /Pak Bandi/])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `durasi video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/perkalian sampai seratus/.test(sapa.ketukan[0].suara) && ["Perkalian sebagai penjumlahan berulang", "Menulis perkalian", "Menukar urutan bilangan perkalian"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
  cek(M_VIDEO.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  // Naskah tetap: kalimat suara sama dengan berkas naskah.
  const naskah = readFileSync(new URL("../naskah/story-naskah-k3b1f.md", import.meta.url), "utf8");
  const dalamNaskah = (s) => naskah.replace(/\s+/g, " ").includes(s.replace(/\s+/g, " "));
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) cek(dalamNaskah(kt.suara), `${v.id}/${a.id}: suara sesuai naskah tetap ("${kt.suara.slice(0, 40)}")`);
  // Visual berubah mengikuti kata pada hampir semua ketukan.
  let banyakTitik = 0;
  let total = 0;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) { total += 1; if (new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at))).size >= 2) banyakTitik += 1; }
  cek(banyakTitik / total >= 0.9, `visual berubah mengikuti kata pada sedikitnya 90 persen ketukan (${banyakTitik}/${total})`);
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") cek(akhirAdegan(a).some((o) => o.t !== "teks"), `${v.id}/${a.id}: gambar akhir memuat bentuk gambar sendiri, bukan hanya teks`);

  // Isi tiap adegan materi.
  const kt = adegan(M_VIDEO, "kotak-telur");
  cek(ada(akhirAdegan(kt, 0), "lt", "pn", "pn-t", "bu", "bu-cp", "bu-kj", "mj", "kt0", "kt0-e4", "pj", "pj-ap", "pj-km", "pj-ps") && isiTeks(akhirAdegan(kt, 0), "pn-t") === "TOKO PAK JOKO" && isiTeks(akhirAdegan(kt, 0), "bu-n") === "Bu Mirna", "kotak telur: papan TOKO PAK JOKO, meja, Bu Mirna bercaping, Pak Joko berapron");
  cek(ada(akhirAdegan(kt, 1), "kt1-e4", "kt2-e4", "kt3-e4") && isiTeks(akhirAdegan(kt, 1), "n1") === "4 kotak" && isiTeks(akhirAdegan(kt, 1), "n5") === "5 telur", "kotak telur: empat kotak, tiap kotak lima telur");
  cek(ada(akhirAdegan(kt), "rk", "rk-bj", "sl", "sl-kl", "sl-kr", "bm", "bm-bj", "tq", "lm"), "kotak telur: Raka berkaus merah, Salsa berkepang dua, Bima berkaus hijau bertanya cara cepat");
  const tb = adegan(M_VIDEO, "tambah-berulang");
  cek(ada(akhirAdegan(tb, 0), "kb0", "kb3", "kb3-e4", "a0", "a3") && isiTeks(akhirAdegan(tb, 0), "n4") === "4 kotak", "tambah berulang: empat kotak, lima di tiap kotak");
  sama(["s1", "s2", "s3"].map((id) => isiTeks(akhirAdegan(tb, 1), id)), ["10", "15", "20"], "tambah berulang: hasil antara 10, 15, 20");
  cek(isiTeks(akhirAdegan(tb), "tot") === "20" && ketemu(akhirAdegan(tb), "kb0").sorot === true, "tambah berulang: dua puluh telur, semua kotak disorot");
  const tk = adegan(M_VIDEO, "tulis-kali");
  cek(isiTeks(akhirAdegan(tk, 0), "pj") === "5 + 5 + 5 + 5" && isiTeks(akhirAdegan(tk, 0), "kl") === "4 × 5" && isiTeks(akhirAdegan(tk, 0), "hs") === "= 20", "tulis kali: penjumlahan berulang menjadi 4 × 5 = 20");
  cek(isiTeks(akhirAdegan(tk, 1), "l4") === "banyak kotak" && isiTeks(akhirAdegan(tk, 1), "l5") === "isi tiap kotak", "tulis kali: empat banyak kotak, lima isi tiap kotak");
  cek(isiTeks(akhirAdegan(tk), "rm") === "4 × 5 = 20" && isiTeks(akhirAdegan(tk), "rb") === "5 + 5 + 5 + 5 = 20", "tulis kali: dibaca dan disamakan dengan penjumlahan berulang");
  const sj = adegan(M_VIDEO, "salah-jumlah");
  cek(ada(akhirAdegan(sj, 0), "kd0", "kd2", "kd2-e5", "rk", "rk-bj", "rr", "db", "rj", "rh") && isiTeks(akhirAdegan(sj, 0), "rj") === "3 + 6" && isiTeks(akhirAdegan(sj, 0), "rh") === "= 9 ?", "salah jumlah: tiga kotak enam telur, Raka menjumlah 3 + 6, rak berdebu");
  sama(["c0", "c1", "c2"].map((id) => isiTeks(akhirAdegan(sj, 1), id)), ["6", "12", "18"], "salah jumlah: Salsa menghitung 6, 12, 18");
  cek(ada(akhirAdegan(sj, 1), "sl", "xs") && isiTeks(akhirAdegan(sj, 1), "ts") === "18 telur", "salah jumlah: delapan belas telur, bukan sembilan");
  cek(isiTeks(akhirAdegan(sj), "ka") === "3 × 6 = 6 + 6 + 6" && isiTeks(akhirAdegan(sj), "kd") === "2 bilangan" && ada(akhirAdegan(sj), "xk"), "salah jumlah: kali menjumlah isi berulang, bukan dua bilangan");
  const bk = adegan(M_VIDEO, "baris-kolom");
  cek(ada(akhirAdegan(bk, 0), "rk", "rk-t3", "bt0_0", "bt0_6", "bt2_6", "bt2_6-n", "bu", "bu-cp") && isiTeks(akhirAdegan(bk, 0), "n3") === "3 baris" && isiTeks(akhirAdegan(bk, 0), "n7") === "7 botol" && tidakAda(akhirAdegan(bk, 0), "bt3_0"), "baris kolom: dua puluh satu botol di rak tiga baris tujuh kolom");
  sama(["c0", "c1", "c2"].map((id) => isiTeks(akhirAdegan(bk, 1), id)), ["7", "14", "21"], "baris kolom: hitung per baris 7, 14, 21");
  cek(isiTeks(akhirAdegan(bk, 1), "ft") === "3 × 7", "baris kolom: ditulis 3 × 7");
  cek(isiTeks(akhirAdegan(bk), "ft") === "3 × 7 = 21" && ada(akhirAdegan(bk), "lb", "lk", "pb", "pk"), "baris kolom: 21 botol rapi dalam baris dan kolom");
  const tu = adegan(M_VIDEO, "tukar-urutan");
  cek(ada(akhirAdegan(tu, 0), "bm", "gb0", "gb20", "gb20-n") && isiTeks(akhirAdegan(tu, 0), "n7") === "7 baris" && isiTeks(akhirAdegan(tu, 0), "n3") === "3 botol", "tukar urutan: rak diputar menjadi tujuh baris tiga botol");
  cek(ketemu(L.keadaanStory(tu, 0, 0), "gb0")?.y !== ketemu(akhirAdegan(tu, 0), "gb0")?.y || ketemu(L.keadaanStory(tu, 0, 0), "gb20")?.x !== ketemu(akhirAdegan(tu, 0), "gb20")?.x, "tukar urutan: letak botol berubah saat diputar");
  cek(isiTeks(akhirAdegan(tu, 1), "ka-t0") === "3 × 7" && isiTeks(akhirAdegan(tu, 1), "kb-t0") === "7 × 3" && isiTeks(akhirAdegan(tu, 1), "h1") === "= 21" && isiTeks(akhirAdegan(tu, 1), "h2") === "= 21", "tukar urutan: 3 × 7 = 21 dan 7 × 3 = 21");
  cek(isiTeks(akhirAdegan(tu), "u3") === "7" && isiTeks(akhirAdegan(tu), "u7") === "3" && isiTeks(akhirAdegan(tu), "hs") === "hasil tetap 21" && ada(akhirAdegan(tu), "ok"), "tukar urutan: bilangan ditukar, hasil tetap");
  const lh = adegan(M_VIDEO, "lompat-hitung");
  sama(["t2-n", "t4-n", "t6-n", "t8-n", "t10-n"].map((id) => isiTeks(akhirAdegan(lh, 0), id)), ["2", "4", "6", "8", "10"], "lompat hitung: kali dua mendarat di 2, 4, 6, 8, 10");
  cek(ada(akhirAdegan(lh, 0), "b1", "b5", "sl", "gb") && isiTeks(akhirAdegan(lh, 0), "kl") === "kali 2", "lompat hitung: Salsa melompat dua-dua di garis bilangan");
  cek(isiTeks(akhirAdegan(lh, 1), "n5") === "5 lompatan" && isiTeks(akhirAdegan(lh, 1), "hs") === "5 × 2 = 10" && ada(akhirAdegan(lh, 1), "p0", "p4"), "lompat hitung: lima lompatan sebesar dua berarti sepuluh");
  cek(ada(akhirAdegan(lh), "kr0-k", "kr4-k", "lm", "kt") && ketemu(akhirAdegan(lh), "sl").isi === "\u{1F60A}", "lompat hitung: membantu mengingat perkalian dengan cepat");
  const ck = adegan(M_VIDEO, "cerita-kali");
  cek(ada(akhirAdegan(ck, 0), "rp", "kp0", "kp5", "kp5-e9", "pj", "tq") && isiTeks(akhirAdegan(ck, 0), "n6") === "6 kotak" && isiTeks(akhirAdegan(ck, 0), "n10") === "10 pensil", "cerita kali: enam kotak pensil, tiap kotak sepuluh pensil");
  sama(["c0", "c1", "c2", "c3", "c4", "c5"].map((id) => isiTeks(akhirAdegan(ck, 1), id)), ["10", "20", "30", "40", "50", "60"], "cerita kali: 10, 20, 30, 40, 50, 60");
  cek(isiTeks(akhirAdegan(ck), "n10") === "60 pensil" && isiTeks(akhirAdegan(ck), "bt") === "tidak lebih dari 100", "cerita kali: enam puluh pensil, tidak lebih dari seratus");
  const pn = adegan(M_VIDEO, "penutup");
  cek(ada(akhirAdegan(pn, 0), "rk", "rk-bj", "lp", "k1", "k3") && ada(akhirAdegan(pn, 1), "pj", "pg", "pg-t", "g1") && isiTeks(akhirAdegan(pn, 1), "pg-t") === "HARI JADI TOKO", "penutup: Raka mengelap rak, Pak Joko memasang pengumuman HARI JADI TOKO");
  cek(isiTeks(akhirAdegan(pn), "t20") === "20 telur" && isiTeks(akhirAdegan(pn), "n4") === "4 kotak" && ada(akhirAdegan(pn), "eb0", "eb3", "q0", "q3", "rk", "sl", "bm", "pj", "bu"), "penutup: dua puluh telur ke empat kotak, lima tokoh melambai");

  // Isi tiap adegan metode global.
  const op = adegan(U, "luar-pembuka");
  cek(ada(akhirAdegan(op, 0), "rk", "rt1", "rt2", "rka", "c0-k", "c2-k") && isiTeks(akhirAdegan(op, 0), "n3") === "3 lembar", "global pembuka: Raka menemukan tiga lembar catatan di bawah rak telur");
  cek(ada(akhirAdegan(op, 1), "bu", "bu-cp", "e1", "ok2") && isiTeks(akhirAdegan(op, 1), "n3") === "3 cara", "global pembuka: Bu Mirna menyebut tiga cara");
  sama(["m0", "m1", "m2"].map((id) => isiTeks(akhirAdegan(op, 2), id)), ["1. Equal Groups", "2. Array", "3. Skip Counting"], "global pembuka: tiga nama metode");
  sama(["g0", "g1", "g2"].map((id) => isiTeks(akhirAdegan(op, 3), id)), ["Isi Sama", "Susunan Baris Kolom", "Lompat Hitung"], "global pembuka: tiga nama bahasa Indonesia");
  const li = adegan(U, "luar-isi");
  cek(ada(akhirAdegan(li, 0), "ek0", "ek2", "ek2-e3") && isiTeks(akhirAdegan(li, 0), "nm") === "Isi Sama", "Isi Sama konsep: tiga kotak berisi sama banyak");
  cek(isiTeks(akhirAdegan(li, 1), "eq") === "4 = 4 = 4" && isiTeks(akhirAdegan(li, 1), "bk") === "beberapa kotak", "Isi Sama konsep: beberapa kotak, isi sama banyak");
  cek(isiTeks(akhirAdegan(li, 2), "jm") === "4 + 4 + 4" && isiTeks(akhirAdegan(li, 2), "kl") === "3 kali", "Isi Sama konsep: isi dijumlah berulang sebanyak kotaknya");
  cek(isiTeks(akhirAdegan(li), "kt") === "3 × 4 = 12", "Isi Sama konsep: artinya perkalian");
  const lit = adegan(U, "luar-isi-terapan");
  cek(ada(akhirAdegan(lit, 0), "sl", "tk0", "tk4", "tk4-e5") && isiTeks(akhirAdegan(lit, 0), "jm") === "6 + 6 + 6 + 6 + 6" && isiTeks(akhirAdegan(lit, 0), "n5") === "5 kali", "Isi Sama terapan: lima kotak enam telur dijumlah lima kali");
  sama(["c0", "c1", "c2", "c3", "c4"].map((id) => isiTeks(akhirAdegan(lit, 1), id)), ["6", "12", "18", "24", "30"], "Isi Sama terapan: 6, 12, 18, 24, 30");
  cek(ada(akhirAdegan(lit, 2), "ok", "cc-k", "cr0", "cr2") && ada(akhirAdegan(lit, 3), "xs", "kc0", "kc2", "pz") && isiTeks(akhirAdegan(lit, 3), "bd") === "3 + 5 + 2 = 10", "Isi Sama terapan: cocok untuk kotak isi sama, kurang cocok untuk isi berbeda");
  const ls = adegan(U, "luar-susunan");
  cek(ada(akhirAdegan(ls, 0), "ka0", "ka11") && isiTeks(akhirAdegan(ls, 0), "nm") === "Susunan Baris Kolom", "Susunan konsep: dua belas kaleng tiga baris empat kolom");
  cek(ada(akhirAdegan(ls, 1), "lb", "lk", "pb", "pk") && ketemu(akhirAdegan(ls, 1), "ka0").sorot === true, "Susunan konsep: baris dan kolom");
  sama(["e1", "e3", "e5"].map((id) => isiTeks(akhirAdegan(ls, 2), id)), ["3 baris", "4 kolom", "12"], "Susunan konsep: baris dikali kolom sama dengan semua");
  cek(isiTeks(akhirAdegan(ls), "e1") === "4 baris" && isiTeks(akhirAdegan(ls), "e3") === "3 kolom" && ada(akhirAdegan(ls), "pt"), "Susunan konsep: urutan boleh ditukar (diputar)");
  const lst = adegan(U, "luar-susunan-terapan");
  cek(ada(akhirAdegan(lst, 0), "rk", "rk-t4", "kr0_0", "kr3_4", "bm") && isiTeks(akhirAdegan(lst, 0), "t20") === "20" && isiTeks(akhirAdegan(lst, 0), "n4") === "4 baris", "Susunan terapan: kaleng di rak empat baris lima kolom");
  cek(ada(akhirAdegan(lst, 1), "kn0", "kn19", "pt") && isiTeks(akhirAdegan(lst, 1), "m5") === "5 baris" && isiTeks(akhirAdegan(lst, 1), "m4") === "4 kaleng" && isiTeks(akhirAdegan(lst, 1), "m20") === "20", "Susunan terapan: diputar menjadi lima baris empat kaleng");
  cek(ada(akhirAdegan(lst, 2), "ok", "cc-k", "ks0", "kt3") && ada(akhirAdegan(lst, 3), "xs", "bs0", "bs8", "bd", "pz"), "Susunan terapan: cocok untuk barang rapi, kurang cocok untuk barang berserakan");
  const lo = adegan(U, "luar-lompat");
  cek(ada(akhirAdegan(lo, 0), "gb", "t0", "kt") && isiTeks(akhirAdegan(lo, 0), "nm") === "Lompat Hitung", "Lompat Hitung konsep: garis bilangan dan katak");
  sama(["t5-n", "t10-n", "t15-n"].map((id) => isiTeks(akhirAdegan(lo, 1), id)), ["5", "10", "15"], "Lompat Hitung konsep: lima, sepuluh, lima belas");
  cek(ada(akhirAdegan(lo, 2), "q1", "q3", "sb", "ok"), "Lompat Hitung konsep: tiap lompatan menambah sama besar");
  cek(isiTeks(akhirAdegan(lo), "bl") === "3 lompatan" && isiTeks(akhirAdegan(lo), "hs") === "3 × 5 = 15" && ketemu(akhirAdegan(lo), "t15").sorot === true, "Lompat Hitung konsep: banyak lompatan, bilangan terakhir hasilnya");
  const lot = adegan(U, "luar-lompat-terapan");
  sama(["t3-n", "t6-n", "t9-n", "t12-n", "t15-n"].map((id) => isiTeks(akhirAdegan(lot, 0), id)), ["3", "6", "9", "12", "15"], "Lompat Hitung terapan: tiga-tiga sampai lima belas");
  cek(isiTeks(akhirAdegan(lot, 1), "l5") === "5 lompatan" && isiTeks(akhirAdegan(lot, 1), "hs") === "5 × 3 = 15", "Lompat Hitung terapan: lima lompatan sebesar tiga");
  cek(ada(akhirAdegan(lot, 2), "ok", "kr0-k", "kr4-k", "rk") && ada(akhirAdegan(lot, 3), "xs", "bj0", "bj11", "pz") && isiTeks(akhirAdegan(lot, 3), "bs") === "bilangan besar: 96", "Lompat Hitung terapan: cocok untuk bilangan kecil, kurang cocok untuk bilangan besar");
  const rk = adegan(U, "luar-ringkas");
  cek(ada(akhirAdegan(rk, 0), "r0-k", "r1-k", "r2-k", "tq") && isiTeks(akhirAdegan(rk, 0), "n3") === "3 cara", "ringkasan: tiga kartu cara dan pertanyaan mana yang pas");
  cek(ketemu(akhirAdegan(rk, 1), "r1-k").sorot === true && ada(akhirAdegan(rk, 1), "ri0", "rs5"), "ringkasan: Isi Sama untuk kotak, Susunan Baris Kolom untuk barang yang dijajarkan");
  cek(ketemu(akhirAdegan(rk, 2), "r2-k").sorot === true && ada(akhirAdegan(rk, 2), "rj3", "ok") && isiTeks(akhirAdegan(rk, 2), "sm") === "isi tiap bagian sama", "ringkasan: Lompat Hitung untuk menghafal, isi tiap bagian sama");
  cek(ada(akhirAdegan(rk, 3), "rk", "rb2_6", "p0-k", "p1-k", "p2-k", "tg"), "ringkasan: pertanyaan memilih cara untuk botol di rak");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k3b1F-.*\.ts$/.test(f));
  cek(berkas.length >= 8, `berkas story k3b1F (${berkas.length})`);
  cek(!berkas.includes("k3b1F-materi-4.ts") && !berkas.includes("k3b1F-materi-5.ts"), "k3b1F-materi-4.ts dan materi-5.ts sudah dihapus");
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku/i.test(s), `${f}: tanpa kata buku`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k3b1F-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, atau k3b1F (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of L.keadaanStory(a, i, 9999)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k3b1f.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K3B1F/.test(pb) && /VIDEO_LUAR_K3B1F/.test(pb) && /export function VideoK3B1F/.test(pb) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pb) && !/\r/.test(pb) && !pb.startsWith("﻿") && !/data-k3b1|video-k3b1-umum|naskah-k3b1|mesin-k3b1/.test(pb), "video-k3b1f.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
