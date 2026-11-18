// Uji Story Kelas 2 Bab 5 Sub-Bab A "Semangka Raksasa Pak Danu" (setengah dari benda utuh), awal cerita Kebun Sekolah: video materi dan video metode global.
// Jalankan: node --no-warnings scripts/uji-story-k2b5A.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k2b5A-video.ts");
const U1 = await import("../src/components/modul/story/k2b5A-luar-1.ts");

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
const VIDEO = [V.VIDEO_MATERI_K2B5A, V.VIDEO_LUAR_K2B5A];
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


/* ------------------------------ Khusus Sub-Bab A Kelas 2 Bab 5 ------------------------------ */
const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
const M_VIDEO = V.VIDEO_MATERI_K2B5A;
const U = V.VIDEO_LUAR_K2B5A;
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
  cek(!(/Fair Sharing|Mirror Test|Fraction Strips|Berbagi Adil|Uji Cermin|Pita Pecahan/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Fair Sharing", "Mirror Test", "Fraction Strips"], ["Berbagi Adil", "Uji Cermin", "Pita Pecahan"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Semangka Raksasa Pak Danu" && U.judul === M_VIDEO.judul && V.JUDUL_K2B5A === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k2b5A-materi" && U.id === "k2b5A-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,semangka-datang,salah-potong,adil-tengah,bagi-regu,setengah-sekitar,lipat-kertas,lingkaran,dua-gambar,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-adil,luar-adil-terapan,luar-cermin,luar-cermin-terapan,luar-pita,luar-pita-terapan,luar-ringkas", "urutan adegan metode global");
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
  for (const kata of ["Chacha", "Dika", "Nia", "Bu Sari", "Pak Danu", "Bu Wati", "semangka", "regu Merah", "regu Hijau", "adil", "tepat di tengah", "dua bagian sama besar", "setengah", "menumpuk", "ember", "gelas jus", "labu kecil", "karung bibit", "melipat", "lingkaran", "titik tengah", "gambar A", "gambar B", "tiga pertanyaan"])
    cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const pola of [/Igil/, /Kaka/, /Abang/, /Mamah/, /Pak Pos/i, /rumah rapi/i, /akuarium/i, /pasar malam/i, /rumah pohon/i, /pustaka/i, /perpustakaan/i, /kantin/i, /koperasi/i, /seragam/i, /Bu Dewi/, /Bu Ratna/, /Pak Rudi/, /Pak Tono/, /Pak Hasan/, /Bu Mira/, /ubin/i, /taman bermain/i, /puzzle/i, /gudang/i, /pameran/i, /\baula\b/i, /\brak\b/i, /manik/i, /Pak Joko/])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `durasi video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/setengah dari benda utuh/.test(sapa.ketukan[0].suara) && ["Membagi adil menjadi dua bagian sama besar", "Setengah di sekitar kita", "Melipat kertas menjadi setengah"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
  cek(M_VIDEO.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  // Naskah tetap: kalimat suara sama dengan berkas naskah.
  const naskah = readFileSync(new URL("../naskah/story-naskah-k2b5a.md", import.meta.url), "utf8");
  const dalamNaskah = (s) => naskah.replace(/\s+/g, " ").includes(s.replace(/\s+/g, " "));
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) cek(dalamNaskah(kt.suara), `${v.id}/${a.id}: suara sesuai naskah tetap ("${kt.suara.slice(0, 40)}")`);
  // Visual berubah mengikuti kata (paling sedikit dua titik waktu) pada hampir semua ketukan.
  let banyakTitik = 0;
  let total = 0;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) { total += 1; if (new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at))).size >= 2) banyakTitik += 1; }
  cek(banyakTitik / total >= 0.9, `visual berubah mengikuti kata pada sedikitnya 90 persen ketukan (${banyakTitik}/${total})`);
  // Gambar bukan hanya emoji: setiap adegan memuat bentuk gambar sendiri.
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") cek(akhirAdegan(a).some((o) => o.t !== "teks"), `${v.id}/${a.id}: gambar akhir memuat bentuk gambar sendiri, bukan hanya teks`);
}
{
  // 1. Semangka datang.
  const d = adegan(M_VIDEO, "semangka-datang");
  cek(ada(akhirAdegan(d, 0), "pg-p1", "bd", "pd", "pd-tj", "pd-tk", "gr", "gr-r", "sm", "sm-l0") && isiTeks(akhirAdegan(d, 0), "pd-n") === "Pak Danu" && isiTeks(akhirAdegan(d, 0), "n1") === "1 semangka", "semangka datang: pagar bambu, bedeng, Pak Danu bertopi jerami, gerobak, satu semangka raksasa");
  cek(ketemu(akhirAdegan(d, 0), "gr").x > 60 && sorot(akhirAdegan(d, 0), "sm"), "semangka datang: gerobak didorong, semangka menyala");
  cek(ada(akhirAdegan(d, 1), "bs", "bs-cp", "kr-k", "em", "eh", "rk1", "rk2") && isiTeks(akhirAdegan(d, 1), "kr-t0") === "Untuk 2 regu" && isiTeks(akhirAdegan(d, 1), "lm") === "Merah" && isiTeks(akhirAdegan(d, 1), "lh") === "Hijau", "semangka datang: Bu Sari bercaping, dua regu dengan ember Merah dan Hijau");
  cek(ada(akhirAdegan(d), "tk-k", "kc-k", "x1", "kl") && ketemu(akhirAdegan(d), "rk1").isi === "\u{1F625}" && tidakAda(akhirAdegan(d), "kr-k"), "semangka datang: tidak adil, satu regu kecewa");
  // 2. Salah potong.
  const s = adegan(M_VIDEO, "salah-potong");
  cek(ada(akhirAdegan(s, 0), "ch", "ps", "ph", "mj", "sm", "gm", "tn") && ketemu(akhirAdegan(s, 0), "ps").x > 100, "salah potong: Chacha dengan pisau plastik memotong semangka miring");
  cek(tidakAda(akhirAdegan(s, 1), "sm", "gm") && ada(akhirAdegan(s, 1), "pb", "pk", "dk", "sx") && ketemu(akhirAdegan(s, 1), "dk").isi === "\u{1F625}", "salah potong: dua potongan tidak sama, Dika menggeleng");
  cek(ketemu(akhirAdegan(s), "pk").x > ketemu(akhirAdegan(s, 1), "pk").x && ada(akhirAdegan(s), "eb") && ketemu(akhirAdegan(s), "ch").isi === "\u{1F635}", "salah potong: potongan kecil menggelinding, Chacha tersangkut ember");
  // 3. Adil itu tepat di tengah.
  const a = adegan(M_VIDEO, "adil-tengah");
  cek(ada(akhirAdegan(a, 0), "ni", "ni-tp", "kd-k", "sm", "gt") && isiTeks(akhirAdegan(a, 0), "kd-t0") === "2 bagian sama besar", "adil tengah: Nia berpikir, garis putus-putus di tengah semangka");
  cek(ada(akhirAdegan(a, 1), "pd", "bl", "br", "bj1-b0", "bj2-b0") && tidakAda(akhirAdegan(a, 1), "s2", "g2") && isiTeks(akhirAdegan(a, 1), "n1") === "1 semangka" && isiTeks(akhirAdegan(a, 1), "n2") === "2 bagian sama", "adil tengah: Pak Danu membelah, dua belahan sama besar");
  cek(sorot(akhirAdegan(a), "bl", "br") && isiTeks(akhirAdegan(a), "s1") === "setengah" && isiTeks(akhirAdegan(a), "s2") === "setengah", "adil tengah: tiap bagian disebut setengah");
  // 4. Bagi dua regu.
  const b = adegan(M_VIDEO, "bagi-regu");
  cek(ada(akhirAdegan(b, 0), "h1", "h2", "rk1", "rk2", "em", "eh", "sr1", "sr2") && isiTeks(akhirAdegan(b, 0), "lm") === "Merah" && isiTeks(akhirAdegan(b, 0), "lh") === "Hijau", "bagi regu: dua belahan untuk dua regu yang bersorak");
  cek(ada(akhirAdegan(b, 1), "dk", "h2", "h3", "ok") && tidakAda(akhirAdegan(b, 1), "h1") && isiTeks(akhirAdegan(b, 1), "n2") === "2 belahan", "bagi regu: Dika menumpuk dua belahan dan pas");
  cek(ada(akhirAdegan(b), "ub", "uk", "x3") && isiTeks(akhirAdegan(b), "bk") === "bukan setengah" && tidakAda(akhirAdegan(b), "h2", "h3"), "bagi regu: tidak pas berarti bukan setengah");
  // 5. Setengah di sekitar.
  const c = adegan(M_VIDEO, "setengah-sekitar");
  cek(ada(akhirAdegan(c, 0), "eb", "eb-a", "eb-m", "gl", "gl-a", "gl-m") && isiTeks(akhirAdegan(c, 0), "le") === "setengah ember" && isiTeks(akhirAdegan(c, 0), "lg") === "setengah gelas", "setengah sekitar: ember dan gelas terisi setengah dengan garis penanda");
  cek(ada(akhirAdegan(c, 1), "bs", "bs-cp", "lb", "kg", "kgi") && isiTeks(akhirAdegan(c, 1), "ll") === "setengah labu" && isiTeks(akhirAdegan(c, 1), "lk") === "setengah karung", "setengah sekitar: Bu Sari menunjukkan labu kecil dan karung bibit");
  cek(ada(akhirAdegan(c), "kc", "t1", "t2"), "setengah sekitar: ajakan mencari setengah lagi");
  // 6. Melipat kertas.
  const l = adegan(M_VIDEO, "lipat-kertas");
  cek(ada(akhirAdegan(l, 0), "ni", "kt", "lp", "pn", "tn") && isiTeks(akhirAdegan(l, 0), "n2") === "2 bagian sama", "lipat kertas: Nia melipat kertas persegi untuk papan nama");
  cek(ada(akhirAdegan(l, 1), "k1", "k2", "k3", "f1", "f2", "f3") && [isiTeks(akhirAdegan(l, 1), "l1"), isiTeks(akhirAdegan(l, 1), "l2"), isiTeks(akhirAdegan(l, 1), "l3")].join() === "tegak,mendatar,miring" && ketemu(akhirAdegan(l, 1), "f3").y2 > 0 && ketemu(akhirAdegan(l, 1), "f3").x2 > 0, "lipat kertas: lipat tegak, mendatar, dan miring");
  cek(ada(akhirAdegan(l), "hp", "hs", "ok") && isiTeks(akhirAdegan(l), "ph1") === "persegi panjang" && isiTeks(akhirAdegan(l), "ph2") === "segitiga", "lipat kertas: hasil persegi panjang dan segitiga berlabel setengah");
  // 7. Lingkaran.
  const g = adegan(M_VIDEO, "lingkaran");
  cek(ada(akhirAdegan(g, 0), "ni", "lk", "rt", "gl", "tt", "pt") && isiTeks(akhirAdegan(g, 0), "lbl") === "titik tengah", "lingkaran: lingkaran di tanah dengan titik tengah");
  cek(ada(akhirAdegan(g, 1), "g1", "g2", "g3", "ok") && tidakAda(akhirAdegan(g, 1), "gl") && ketemu(akhirAdegan(g, 1), "g1").x2 === 0 && ketemu(akhirAdegan(g, 1), "g2").y2 === 0 && ketemu(akhirAdegan(g, 1), "g3").x2 > 0 && ketemu(akhirAdegan(g, 1), "g3").y2 > 0, "lingkaran: tiga garis tegak, mendatar, miring lewat titik tengah");
  cek(ada(akhirAdegan(g), "c1", "c2", "g1", "s1", "s2") && tidakAda(akhirAdegan(g), "g2", "g3"), "lingkaran: dua bagian sama besar, masing-masing setengah");
  // 8. Gambar A dan gambar B.
  const dg = adegan(M_VIDEO, "dua-gambar");
  cek(ada(akhirAdegan(dg, 0), "dk", "pa", "pb", "ta", "tb") && isiTeks(akhirAdegan(dg, 0), "ta") === "A" && isiTeks(akhirAdegan(dg, 0), "tb") === "B" && isiTeks(akhirAdegan(dg, 0), "n2") === "2 papan", "dua gambar: dua papan, gambar A dan gambar B");
  cek(ketemu(akhirAdegan(dg, 1), "ga").x === 86 && ketemu(akhirAdegan(dg, 1), "gb").x === 190 && ada(akhirAdegan(dg, 1), "oka", "xb", "sa", "sb"), "dua gambar: A dibelah tengah dengan centang, B tidak sama dengan silang");
  cek(ada(akhirAdegan(dg), "pc", "pc-j", "c1", "c2", "c3", "dk") && isiTeks(akhirAdegan(dg), "h3") === "3 pertanyaan" && isiTeks(akhirAdegan(dg), "q1") === "dibagi 2 bagian?" && isiTeks(akhirAdegan(dg), "q3") === "1 bagian ditunjuk?", "dua gambar: papan catatan Dika dengan tiga pertanyaan dan tiga centang");
  // 9. Penutup.
  const pn = adegan(M_VIDEO, "penutup");
  cek(ada(akhirAdegan(pn, 0), "h1", "h2", "rk1", "rk2", "sm1", "sm2", "ok") && isiTeks(akhirAdegan(pn, 0), "n2") === "2 regu", "penutup: dua regu makan semangka dengan puas");
  cek(ada(akhirAdegan(pn, 1), "pc", "r1", "r2", "r3", "dk") && tidakAda(akhirAdegan(pn, 1), "n2", "ok"), "penutup: papan catatan merangkum setengah");
  const n3 = akhirAdegan(pn);
  cek(ada(n3, "bw", "bw-kd", "kj", "bb1", "tq", "ch", "dk", "ni", "bs", "pd") && isiTeks(n3, "bw-n") === "Bu Wati", "penutup: Bu Wati berkerudung hijau dengan keranjang bibit di pagar, lima tokoh melambai");
}
{
  const op = adegan(U, "luar-pembuka");
  cek(ada(akhirAdegan(op, 0), "gr", "ch", "c0-k", "c1-k", "c2-k") && isiTeks(akhirAdegan(op, 0), "n3") === "3 kartu", "global pembuka: gerobak dan tiga kartu lusuh");
  cek(ada(akhirAdegan(op, 1), "pd", "ja", "jb", "br", "xr") && ketemu(akhirAdegan(op, 1), "pd").isi === "\u{1F604}", "global pembuka: Pak Danu tertawa, cara petani membagi panen");
  sama(["m0", "m1", "m2"].map((id) => isiTeks(akhirAdegan(op, 2), id)), ["1. Fair Sharing", "2. Mirror Test", "3. Fraction Strips"], "global pembuka: tiga nama metode");
  sama(["n0", "n1", "n2"].map((id) => isiTeks(akhirAdegan(op, 3), id)), ["Berbagi Adil", "Uji Cermin", "Pita Pecahan"], "global pembuka: tiga nama bahasa Indonesia");
  const c = adegan(U, "luar-adil");
  cek(ada(akhirAdegan(c, 0), "ha", "gb-k") && isiTeks(akhirAdegan(c, 0), "nm") === "Berbagi Adil", "Berbagi Adil konsep: tangan berjabat dan bagian sama besar");
  cek(ada(akhirAdegan(c, 1), "jg", "tq", "o1", "o2", "gp", "sm-k"), "Berbagi Adil konsep: hasil panen untuk berapa orang, potong sama besar");
  cek(isiTeks(akhirAdegan(c, 2), "n2") === "2 orang" && isiTeks(akhirAdegan(c, 2), "n3") === "2 bagian" && ada(akhirAdegan(c, 2), "b1", "b2", "ok"), "Berbagi Adil konsep: dua orang, dua bagian sama besar");
  cek(ada(akhirAdegan(c), "s1", "s2", "ok2", "xs") && isiTeks(akhirAdegan(c), "n4") === "2 bagian", "Berbagi Adil konsep: menumpuk, pas atau tidak");
  const ct = adegan(U, "luar-adil-terapan");
  cek(ada(akhirAdegan(ct, 0), "dk", "h1", "h2", "p1", "p2", "ok") && tidakAda(akhirAdegan(ct, 0), "jg") && isiTeks(akhirAdegan(ct, 0), "n2") === "2 petani", "Berbagi Adil terapan: Dika membelah jagung untuk dua petani, belahan pas");
  cek(ada(akhirAdegan(ct, 1), "pn") && ketemu(akhirAdegan(ct, 1), "p1").isi === "\u{1F60A}" && ketemu(akhirAdegan(ct, 1), "h1").x === 170, "Berbagi Adil terapan: petani pertama memilih, tidak ada yang iri");
  cek(ada(akhirAdegan(ct, 2), "ok", "cc-k", "o3") && ada(akhirAdegan(ct, 3), "xs", "kc-k", "ba", "tq"), "Berbagi Adil terapan: cocok bila bisa dipotong, kurang cocok bila tidak");
  const cm = adegan(U, "luar-cermin");
  cek(ada(akhirAdegan(cm, 0), "cm", "cm-g", "kc-k") && isiTeks(akhirAdegan(cm, 0), "nm") === "Uji Cermin", "Uji Cermin konsep: cermin kecil bergagang");
  cek(ada(akhirAdegan(cm, 1), "gm", "cm2", "gg", "kc") && tidakAda(akhirAdegan(cm, 1), "cm"), "Uji Cermin konsep: cermin di garis pembagi gambar");
  cek(ada(akhirAdegan(cm, 2), "bg", "by", "ok") && isiTeks(akhirAdegan(cm, 2), "n1") === "bagian 1" && isiTeks(akhirAdegan(cm, 2), "n2") === "2 bagian sama" && ketemu(akhirAdegan(cm, 2), "by").putus, "Uji Cermin konsep: bayangan persis bagian yang lain");
  cek(ada(akhirAdegan(cm), "by2", "xp") && tidakAda(akhirAdegan(cm), "by") && isiTeks(akhirAdegan(cm), "tb") === "tidak sama besar", "Uji Cermin konsep: bayangan miring berarti tidak sama besar");
  const cmt = adegan(U, "luar-cermin-terapan");
  cek(ada(akhirAdegan(cmt, 0), "ni", "dn", "dn-t", "cm", "by", "ok"), "Uji Cermin terapan: Nia meletakkan cermin di tengah daun, bayangan persis");
  cek(ada(akhirAdegan(cmt, 1), "hl") && sorot(akhirAdegan(cmt, 1), "dn-t") && isiTeks(akhirAdegan(cmt, 1), "n2") === "2 bagian", "Uji Cermin terapan: garis membagi daun menjadi dua bagian sama");
  cek(ada(akhirAdegan(cmt, 2), "ok", "gr-k", "dn2", "kc", "sk") && ada(akhirAdegan(cmt, 3), "xs", "ir", "bi", "tq"), "Uji Cermin terapan: cocok untuk gambar rapi, kurang cocok untuk bentuk tidak beraturan");
  const pt = adegan(U, "luar-pita");
  cek(ada(akhirAdegan(pt, 0), "pt", "pt-c0", "pi") && isiTeks(akhirAdegan(pt, 0), "nm") === "Pita Pecahan", "Pita Pecahan konsep: pita bertingkat");
  cek(ada(akhirAdegan(pt, 1), "p1", "p2", "fl") && isiTeks(akhirAdegan(pt, 1), "n2") === "2 pita" && isiTeks(akhirAdegan(pt, 1), "l1") === "1 pita utuh", "Pita Pecahan konsep: dua pita sama panjang, satu utuh dan satu dilipat");
  cek(tidakAda(akhirAdegan(pt, 2), "fl") && isiTeks(akhirAdegan(pt, 2), "s1") === "setengah" && isiTeks(akhirAdegan(pt, 2), "s2") === "setengah", "Pita Pecahan konsep: dibuka, tiap bagian disebut setengah");
  cek(ada(akhirAdegan(pt, 3), "p1", "a1", "a2", "al", "ar", "ok2") && isiTeks(akhirAdegan(pt, 3), "n4") === "2 bagian", "Pita Pecahan konsep: dua bagian menutupi pita utuh dengan pas");
  const ptt = adegan(U, "luar-pita-terapan");
  cek(ada(akhirAdegan(ptt, 0), "ch", "u", "s1", "sp") && isiTeks(akhirAdegan(ptt, 0), "n1") === "1 pita setengah", "Pita Pecahan terapan: Chacha meletakkan satu pita setengah di bawah pita utuh");
  cek(ada(akhirAdegan(ptt, 1), "dk", "s2", "ok") && tidakAda(akhirAdegan(ptt, 1), "sp"), "Pita Pecahan terapan: Dika menambahkan pita setengah yang lain, pas");
  cek(ada(akhirAdegan(ptt, 2), "ok", "cu", "ch", "cb-k") && ada(akhirAdegan(ptt, 3), "xs", "lg", "lp", "tq"), "Pita Pecahan terapan: cocok untuk membandingkan, kurang cocok untuk benda bulat");
  const rk = adegan(U, "luar-ringkas");
  cek(["r0-t0", "r1-t0", "r2-t0"].map((id) => isiTeks(akhirAdegan(rk, 0), id)).join() === U1.NAMA_METODE_ID.map((m, i) => `${i + 1}. ${m}`).join() && isiTeks(akhirAdegan(rk, 0), "t3") === "3 cara", "ringkasan: tiga metode");
  cek(sorot(akhirAdegan(rk, 1), "r1-k") && ada(akhirAdegan(rk, 1), "jg", "kc", "o0", "o1"), "ringkasan: benda dipotong untuk Berbagi Adil, garis diperiksa dengan Uji Cermin");
  cek(sorot(akhirAdegan(rk, 2), "r2-k") && ada(akhirAdegan(rk, 2), "pi", "o2", "kk-k"), "ringkasan: Pita Pecahan untuk membandingkan, setengah harus sama besar");
  cek(ada(akhirAdegan(rk), "kt", "gk", "o0-k", "o1-k", "o2-k", "tq"), "ringkasan: pertanyaan membagi selembar kertas menjadi setengah");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k2b5A-.*\.ts$/.test(f));
  cek(berkas.length >= 8, `berkas story k2b5A (${berkas.length})`);
  cek(!berkas.includes("k2b5A-materi-4.ts"), "k2b5A-materi-4.ts sudah dihapus");
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku/i.test(s), `${f}: tanpa kata buku`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k2b5A-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, atau k2b5A (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k2b5a.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K2B5A/.test(pb) && /VIDEO_LUAR_K2B5A/.test(pb) && /export function VideoK2B5A/.test(pb) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pb) && !/\r/.test(pb) && !pb.startsWith("﻿") && !/data-k2b5|video-k2b5-umum/.test(pb), "video-k2b5a.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
