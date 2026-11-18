// Uji Story Kelas 2 Bab 4 Sub-Bab A "Rak Pameran Pak Hasan" (posisi benda), awal cerita Pameran Kerajinan Sekolah: video materi dan video metode global.
// Jalankan: node --no-warnings scripts/uji-story-k2b4A.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k2b4A-video.ts");
const U1 = await import("../src/components/modul/story/k2b4A-luar-1.ts");

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
const VIDEO = [V.VIDEO_MATERI_K2B4A, V.VIDEO_LUAR_K2B4A];
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


/* ------------------------------ Khusus Sub-Bab A Kelas 2 Bab 4 ------------------------------ */
const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
const M_VIDEO = V.VIDEO_MATERI_K2B4A;
const U = V.VIDEO_LUAR_K2B4A;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));
const tidakAda = (objs, ...ids) => ids.every((id) => !ketemu(objs, id));
const sorot = (objs, ...ids) => ids.every((id) => ketemu(objs, id)?.sorot);

const SATUAN = { satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8 };
const POLA_BIL = /\b(satu|dua|tiga|empat|lima|enam|tujuh|delapan)\b/g;
const bilanganSuara = (s) => [...s.toLowerCase().matchAll(POLA_BIL)].map((m) => SATUAN[m[1]]);
sama(bilanganSuara("Satu, dua, kedua, keduanya, satuannya, tiga puluh."), [1, 2, 3], "pembaca bilangan suara (satuan)");
{
  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Simon Says|Treasure Map|Barrier Game|Simon Berkata|Peta Harta Karun|Permainan Sekat/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Simon Says", "Treasure Map", "Barrier Game"], ["Simon Berkata", "Peta Harta Karun", "Permainan Sekat"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Rak Pameran Pak Hasan" && U.judul === M_VIDEO.judul && V.JUDUL_K2B4A === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k2b4A-materi" && U.id === "k2b4A-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,rak-datang,atas-bawah,depan-belakang,salah-kanan,kanan-kiri,berlawanan,kalimat,gabung-petunjuk,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-simon,luar-simon-terapan,luar-peta,luar-peta-terapan,luar-sekat,luar-sekat-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 52) && U.adegan.every((a) => /Metode global|Ringkasan|ringkasan/i.test(a.sumber) && a.sumber.length <= 52), "label sumber");
  const TERLARANG = /(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|soal|tebak|kunci|latihan)/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa kata terlarang`);
  const SURUH = /bawalah|bawa benda|ambil benda di rumah|gambarlah|gambar di kertas|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!SURUH.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa suruhan membawa benda, menggambar di kertas, atau bermain bersama`);
  // Angka di gambar paling besar delapan.
  for (const v of [M_VIDEO, U])
    for (const a of v.adegan)
      for (const [i] of a.ketukan.entries())
        for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) for (const b of bilanganDari(t)) cek(Number(b) <= 8, `${v.id}/${a.id}#${i + 1}: angka paling besar delapan ("${t}")`);
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
  for (const n of [1, 2, 3]) cek(bilanganSuara(semuaSuara).includes(n), `video materi mengucapkan bilangan ${n}`);
  const semuaLuar = U.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [1, 2, 3]) cek(bilanganSuara(semuaLuar).includes(n), `video global mengucapkan bilangan ${n}`);
  for (const kata of ["Chacha", "Dika", "Nia", "Bu Sari", "Pak Hasan", "kartu denah", "guci", "kendi", "topeng", "lampion", "wayang kertas", "boneka kain", "di atas rak", "di bawah rak", "di depan lampion", "sebelah kanan", "sebelah kiri", "berlawanan", "benda acuan", "kalimat posisi", "teka-teki", "kanan dan kiri dihitung dari kita", "membelakangi kita"])
    cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const pola of [/Igil/, /Kaka/, /Abang/, /Mamah/, /Pak Pos/i, /rumah rapi/i, /kebun/i, /bibit/i, /kereta/i, /festival/i, /kardus/i, /akuarium/i, /pasar malam/i, /rumah pohon/i, /pustaka/i, /perpustakaan/i, /kantin/i, /koperasi/i, /\bkue\b/i, /seragam/i, /Bu Dewi/, /Bu Ratna/, /Pak Rudi/, /Pak Tono/, /ubin/i, /taman bermain/i, /puzzle/i, /gudang/i])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `durasi video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/posisi benda/.test(sapa.ketukan[0].suara) && ["Enam kata posisi dan lawannya", "Kanan dan kiri sesuai pembaca", "Menggabungkan petunjuk posisi"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
  cek(M_VIDEO.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  // Naskah tetap: kalimat suara sama dengan berkas naskah (kecuali satu penyesuaian: kata itu dibuang agar materi tidak lebih dari 400 kata).
  const naskah = readFileSync(new URL("../naskah/story-naskah-k2b4a.md", import.meta.url), "utf8");
  const dalamNaskah = (s) => naskah.replace(/\s+/g, " ").includes(s.replace(/\s+/g, " "));
  const DEVIASI = ["Tunggu, kata Dika, di atas rak ada banyak karya! Bu Sari menambah: karya di sebelah kanan lampion."];
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) cek(dalamNaskah(kt.suara) || DEVIASI.includes(kt.suara), `${v.id}/${a.id}: suara sesuai naskah tetap ("${kt.suara.slice(0, 40)}")`);
  cek(dalamNaskah("Bu Sari menambah: karya itu di sebelah kanan lampion."), "naskah memuat kalimat asal yang dipotong satu kata (agar materi tidak lebih dari 400 kata)");
  // Visual berubah mengikuti kata (paling sedikit dua titik waktu) pada hampir semua ketukan.
  let banyakTitik = 0;
  let total = 0;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) { total += 1; if (new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at))).size >= 2) banyakTitik += 1; }
  cek(banyakTitik / total >= 0.9, `visual berubah mengikuti kata pada sedikitnya 90 persen ketukan (${banyakTitik}/${total})`);
  // Gambar bukan hanya emoji: setiap adegan memuat bentuk gambar sendiri.
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") cek(akhirAdegan(a).some((o) => o.t !== "teks"), `${v.id}/${a.id}: gambar akhir memuat bentuk gambar sendiri, bukan hanya teks`);
}
{
  // 1. Rak datang.
  const d = adegan(M_VIDEO, "rak-datang");
  cek(ada(akhirAdegan(d, 0), "at", "ph", "ph-ik", "ph-pn", "rk1", "rk2", "sb-k") && isiTeks(akhirAdegan(d, 0), "ph-n") === "Pak Hasan", "rak datang: atap kain, Pak Hasan berikat kepala, dua rak, hari Sabtu");
  cek(ada(akhirAdegan(d, 1), "bs", "bs-sl", "kd-k", "g1") && isiTeks(akhirAdegan(d, 1), "bs-st") === "PANITIA", "rak datang: Bu Sari berselempang PANITIA membawa kartu denah");
  cek(ada(akhirAdegan(d), "b1", "b2", "pj", "kc-k") && ketemu(akhirAdegan(d), "b1").rot > 0, "rak datang: karya berserakan, pameran kacau");
  // 2. Atas dan bawah.
  const a = adegan(M_VIDEO, "atas-bawah");
  cek(ketemu(akhirAdegan(a, 0), "gc").y < ketemu(akhirAdegan(a, 0), "rk").y && ada(akhirAdegan(a, 0), "ni", "pa"), "atas bawah: guci naik ke puncak rak");
  cek(ketemu(akhirAdegan(a, 1), "kd").y > ketemu(akhirAdegan(a, 1), "rk-m").y && ada(akhirAdegan(a, 1), "dk", "pb"), "atas bawah: kendi masuk kolong rak");
  cek(ada(akhirAdegan(a), "pu", "pd", "kl-k") && sorot(akhirAdegan(a), "rk"), "atas bawah: panah naik dan turun, kalimat");
  // 3. Depan dan belakang.
  const b = adegan(M_VIDEO, "depan-belakang");
  cek(ketemu(akhirAdegan(b, 0), "tp").z > (ketemu(akhirAdegan(b, 0), "lm").z ?? 0) && ketemu(akhirAdegan(b, 0), "tp").y > ketemu(akhirAdegan(b, 0), "lm").y, "depan belakang: topeng menutupi lampion");
  cek(isiTeks(akhirAdegan(b, 1), "lp") === "depan" && isiTeks(akhirAdegan(b, 1), "lbk") === "belakang", "depan belakang: label depan dan belakang");
  cek(ada(akhirAdegan(b), "pa-k", "pb-k", "ka", "ki"), "depan belakang: pasangan panah berlawanan");
  // 4. Salah kanan.
  const s = adegan(M_VIDEO, "salah-kanan");
  cek(ketemu(akhirAdegan(s, 0), "wy").x < ketemu(akhirAdegan(s, 0), "gc").x && isiTeks(akhirAdegan(s, 0), "lr") === "kiri", "salah kanan: wayang di kiri guci (salah)");
  cek(ada(akhirAdegan(s, 1), "dk", "sx", "mt") && sorot(akhirAdegan(s, 1), "gc"), "salah kanan: Dika menggeleng, kita yang melihat");
  cek(ada(akhirAdegan(s), "th1", "th2", "ch", "dk", "ni", "wy") && ketemu(akhirAdegan(s), "ch").isi === "\u{1F604}", "salah kanan: wayang di topi Nia seperti tanduk, semua tertawa");
  // 5. Kanan kiri.
  const kk = adegan(M_VIDEO, "kanan-kiri");
  cek(ada(akhirAdegan(kk, 0), "nb", "nb-bd", "hd", "rk"), "kanan kiri: Nia dari belakang menghadap rak");
  cek(isiTeks(akhirAdegan(kk, 1), "kl2") === "kiri kita" && isiTeks(akhirAdegan(kk, 1), "kn2") === "kanan kita", "kanan kiri: arah sama dengan kita");
  cek(ketemu(akhirAdegan(kk), "wy").x > ketemu(akhirAdegan(kk), "gc").x && ada(akhirAdegan(kk), "ok", "k4-k"), "kanan kiri: wayang di kanan guci sesuai kartu");
  // 6. Berlawanan.
  const bl = adegan(M_VIDEO, "berlawanan");
  const pasang = ["p1a", "p1b", "p2a", "p2b", "p3a", "p3b"].map((id) => isiTeks(akhirAdegan(bl, 0), id));
  cek(isiTeks(akhirAdegan(bl, 0), "n3") === "3 pasang" && pasang.join() === "atas,bawah,depan,belakang,kanan,kiri", "berlawanan: tiga pasang kata di papan catatan");
  cek(ada(akhirAdegan(bl, 1), "wy", "gc", "pk") && ketemu(akhirAdegan(bl, 1), "wy").x > ketemu(akhirAdegan(bl, 1), "gc").x, "berlawanan: wayang di kanan guci, guci di kiri wayang");
  cek(ada(akhirAdegan(bl), "ch", "ok", "ok2"), "berlawanan: Chacha mengangguk, kata lawan membantu memeriksa");
  // 7. Kalimat.
  const kl = adegan(M_VIDEO, "kalimat");
  cek(isiTeks(akhirAdegan(kl, 0), "w1") === "topeng" && isiTeks(akhirAdegan(kl, 0), "w2") === "di depan" && isiTeks(akhirAdegan(kl, 0), "w3") === "lampion" && ada(akhirAdegan(kl, 0), "bs"), "kalimat: topeng di depan lampion");
  cek(isiTeks(akhirAdegan(kl, 1), "n3") === "3 bagian" && ada(akhirAdegan(kl, 1), "b1-k", "b2-k", "b3-k"), "kalimat: tiga bagian berwarna");
  cek(ada(akhirAdegan(kl), "q1", "q2", "q3"), "kalimat: panah dari tiap kartu ke bagian kalimat");
  // 8. Gabung petunjuk.
  const gb = adegan(M_VIDEO, "gabung-petunjuk");
  cek(ada(akhirAdegan(gb, 0), "tp", "gc", "lm", "bn", "kd", "jr") && sorot(akhirAdegan(gb, 0), "tp", "gc", "lm", "bn"), "gabung petunjuk: empat karya di atas rak menyala");
  cek(ketemu(akhirAdegan(gb, 1), "lm").op < 1 && ketemu(akhirAdegan(gb, 1), "tp").op < 1 && ketemu(akhirAdegan(gb, 1), "bn").op === undefined && ada(akhirAdegan(gb, 1), "dk", "pk"), "gabung petunjuk: petunjuk kedua mengabu-abukan sisanya");
  cek(isiTeks(akhirAdegan(gb), "d2") === "2 petunjuk" && isiTeks(akhirAdegan(gb), "s1") === "1 karya" && sorot(akhirAdegan(gb), "bn") && ada(akhirAdegan(gb), "tp2"), "gabung petunjuk: tinggal boneka kain, Bu Sari bertepuk tangan");
  // 9. Penutup.
  const pn = adegan(M_VIDEO, "penutup");
  cek(ada(akhirAdegan(pn, 0), "rk", "gc", "wy", "bn", "lm", "tp", "kd", "ph", "ok"), "penutup: rak penuh rapi, Pak Hasan tersenyum");
  cek(ada(akhirAdegan(pn, 1), "pc", "c1", "c2", "c3", "dk"), "penutup: papan catatan merangkum tiga langkah");
  const n3 = akhirAdegan(pn);
  cek(ada(n3, "km-k", "m1", "m2", "m3", "m4", "mq", "ch", "dk", "ni", "bs", "ph") && ketemu(n3, "m1").warna === ketemu(n3, "m3").warna && ketemu(n3, "m2").warna === ketemu(n3, "m4").warna && ketemu(n3, "m1").warna !== ketemu(n3, "m2").warna, "penutup: kotak manik, untaian merah biru merah biru bertanda tanya, lima tokoh");
}
{
  const op = adegan(U, "luar-pembuka");
  cek(ada(akhirAdegan(op, 0), "rk", "lc", "ph", "ni", "c0-k", "c1-k", "c2-k") && isiTeks(akhirAdegan(op, 0), "n3") === "3 kartu", "global pembuka: laci tua rak, tiga kartu tua");
  cek(ada(akhirAdegan(op, 1), "m1", "m2", "x2", "y2") && ketemu(akhirAdegan(op, 1), "ph").isi === "\u{1F60A}", "global pembuka: Pak Hasan tersenyum, kartu cara menata");
  sama(["m0", "m1", "m2"].map((id) => isiTeks(akhirAdegan(op, 2), id)), ["1. Simon Says", "2. Treasure Map", "3. Barrier Game"], "global pembuka: tiga nama metode");
  sama(["n0", "n1", "n2"].map((id) => isiTeks(akhirAdegan(op, 3), id)), ["Simon Berkata", "Peta Harta Karun", "Permainan Sekat"], "global pembuka: tiga nama bahasa Indonesia");
  const c = adegan(U, "luar-simon");
  cek(ada(akhirAdegan(c, 0), "si", "gb-k") && isiTeks(akhirAdegan(c, 0), "sn") === "Simon Berkata", "Simon konsep: Simon dan gelembung perintah");
  cek(isiTeks(akhirAdegan(c, 1), "n1") === "1 orang" && ada(akhirAdegan(c, 1), "gb2-k", "mj", "bl") && ketemu(akhirAdegan(c, 1), "bl").y < ketemu(akhirAdegan(c, 1), "mj").y, "Simon konsep: bola ditaruh di atas meja");
  cek(ada(akhirAdegan(c, 2), "dk", "ok") && sorot(akhirAdegan(c, 2), "gb2-t0"), "Simon konsep: bergerak hanya bila diawali kata Simon berkata");
  cek(ada(akhirAdegan(c), "gb3-k", "xk", "td"), "Simon konsep: perintah tanpa kata diabaikan");
  const ct = adegan(U, "luar-simon-terapan");
  cek(ada(akhirAdegan(ct, 0), "ch", "dk", "gc", "gb-k", "rk") && ketemu(akhirAdegan(ct, 0), "gc").y > ketemu(akhirAdegan(ct, 0), "rk-m").y, "Simon terapan: guci dikerjakan Dika di bawah rak");
  cek(ada(akhirAdegan(ct, 1), "gb2-k", "xk", "zz"), "Simon terapan: perintah tanpa kata Simon, Dika diam");
  cek(ada(akhirAdegan(ct, 2), "ok", "td", "cc-k") && ada(akhirAdegan(ct, 3), "xs", "tq", "kc-k"), "Simon terapan: cocok melatih telinga, kurang cocok tanpa Simon");
  const p = adegan(U, "luar-peta");
  cek(ada(akhirAdegan(p, 0), "pt", "ptc0", "ptc11") && isiTeks(akhirAdegan(p, 0), "pn") === "Peta Harta Karun", "Peta konsep: kotak-kotak seperti papan catur");
  cek(ada(akhirAdegan(p, 1), "ht") && isiTeks(akhirAdegan(p, 1), "n1") === "1 kotak" && sorot(akhirAdegan(p, 1), "ptc6"), "Peta konsep: harta disembunyikan di satu kotak");
  cek(ada(akhirAdegan(p, 2), "a1", "a2", "st"), "Peta konsep: di atas bintang lalu di sebelah kanannya");
  cek(ada(akhirAdegan(p), "jr", "ht") && sorot(akhirAdegan(p), "ht", "ptc6"), "Peta konsep: tiap petunjuk menggeser satu kotak sampai harta");
  const pt = adegan(U, "luar-peta-terapan");
  cek(ada(akhirAdegan(pt, 0), "ni", "pq", "st", "a1", "a2") && ketemu(akhirAdegan(pt, 0), "a1").y2 > 0 && ketemu(akhirAdegan(pt, 0), "a2").x2 < 0, "Peta terapan: harta di bawah bintang lalu di kiri");
  cek(ada(akhirAdegan(pt, 1), "jr", "kn", "kn2") && isiTeks(akhirAdegan(pt, 1), "n1") === "1 kotak" && isiTeks(akhirAdegan(pt, 1), "n2") === "1 kotak", "Peta terapan: turun satu kotak, kiri satu kotak, koin");
  cek(ada(akhirAdegan(pt, 2), "ok", "cs-k", "ct-k", "pa") && ada(akhirAdegan(pt, 3), "xs", "kc-k", "pt1", "pt2"), "Peta terapan: cocok untuk petunjuk berurutan, kurang cocok tanpa kotak");
  const sk = adegan(U, "luar-sekat");
  cek(ada(akhirAdegan(sk, 0), "sk", "sk-k") && isiTeks(akhirAdegan(sk, 0), "pn") === "Permainan Sekat", "Sekat konsep: sekat di tengah");
  cek(isiTeks(akhirAdegan(sk, 1), "n2") === "2 orang" && isiTeks(akhirAdegan(sk, 1), "n1") === "1 orang" && ada(akhirAdegan(sk, 1), "dk", "ch", "lm", "tp", "xm", "mt"), "Sekat konsep: dua orang, satu menata, tidak mengintip");
  cek(ada(akhirAdegan(sk, 2), "gb-k", "lm2", "tp2") && ketemu(akhirAdegan(sk, 2), "lm2").x < ketemu(akhirAdegan(sk, 2), "tp2").x, "Sekat konsep: orang kedua menata sesuai ucapan");
  cek(tidakAda(akhirAdegan(sk), "sk", "sk-k") && ada(akhirAdegan(sk), "ok", "lm", "lm2"), "Sekat konsep: sekat dibuka, tatanan dibandingkan");
  const st = adegan(U, "luar-sekat-terapan");
  cek(isiTeks(akhirAdegan(st, 0), "n3") === "3 benda" && ada(akhirAdegan(st, 0), "tp", "lm", "bn", "gb-k") && ketemu(akhirAdegan(st, 0), "bn").y < ketemu(akhirAdegan(st, 0), "tp").y && ketemu(akhirAdegan(st, 0), "lm").x < ketemu(akhirAdegan(st, 0), "tp").x, "Sekat terapan: lampion di kiri topeng, boneka di atas topeng");
  cek(tidakAda(akhirAdegan(st, 1), "sk") && ada(akhirAdegan(st, 1), "lm2", "tp2", "bn2", "ok") && ketemu(akhirAdegan(st, 1), "bn2").y < ketemu(akhirAdegan(st, 1), "tp2").y, "Sekat terapan: Chacha menata, sekat dibuka, tatanan sama");
  cek(ada(akhirAdegan(st, 2), "ok", "p1-k", "p2-k", "kc") && ada(akhirAdegan(st, 3), "xs", "bk5", "pj-k"), "Sekat terapan: cocok untuk petunjuk jelas, kurang cocok bila benda terlalu banyak");
  const rk = adegan(U, "luar-ringkas");
  cek(["r0-t0", "r1-t0", "r2-t0"].map((id) => isiTeks(akhirAdegan(rk, 0), id)).join() === U1.NAMA_METODE_ID.map((m, i) => `${i + 1}. ${m}`).join() && isiTeks(akhirAdegan(rk, 0), "t3") === "3 cara", "ringkasan: tiga metode");
  cek(sorot(akhirAdegan(rk, 1), "r1-k") && ada(akhirAdegan(rk, 1), "td", "o0", "o1", "pe"), "ringkasan: telinga untuk Simon Berkata, urutan untuk Peta Harta Karun");
  cek(sorot(akhirAdegan(rk, 2), "r2-k") && ada(akhirAdegan(rk, 2), "kc", "o2", "mt"), "ringkasan: Permainan Sekat bila petunjuk harus jelas, tentukan siapa yang melihat");
  cek(ada(akhirAdegan(rk), "pz", "st", "a1", "a2", "ht", "o0-k", "o1-k", "o2-k", "tq"), "ringkasan: pertanyaan harta di bawah bintang lalu di kiri");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k2b4A-.*\.ts$/.test(f));
  cek(berkas.length >= 8, `berkas story k2b4A (${berkas.length})`);
  cek(!berkas.includes("k2b4A-materi-4.ts"), "k2b4A-materi-4.ts sudah dihapus");
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku/i.test(s), `${f}: tanpa kata buku`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k2b4A-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, atau k2b4A (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k2b4a.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K2B4A/.test(pb) && /VIDEO_LUAR_K2B4A/.test(pb) && /export function VideoK2B4A/.test(pb) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pb) && !/\r/.test(pb) && !pb.startsWith("﻿"), "video-k2b4a.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
