// Uji Story Kelas 2 Bab 5 Sub-Bab B "Bibit untuk Dua Petak" (setengah dari kumpulan benda), tengah cerita Kebun Sekolah: video materi dan video metode global.
// Jalankan: node --no-warnings scripts/uji-story-k2b5B.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k2b5B-video.ts");
const U1 = await import("../src/components/modul/story/k2b5B-luar-1.ts");

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
const VIDEO = [V.VIDEO_MATERI_K2B5B, V.VIDEO_LUAR_K2B5B];
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

for (const v of VIDEO) for (const a of v.adegan) a.ketukan.forEach((_, i) => { for (const o of L.keadaanStory(a, i, 9999)) if (o.t === "teks") cek(typeof o.isi === "string" && o.isi.length > 0, `${v.id}/${a.id}#${i + 1}: teks berisi (${o.id})`); });


/* ------------------------------ Khusus Sub-Bab B Kelas 2 Bab 5 ------------------------------ */
const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
const M_VIDEO = V.VIDEO_MATERI_K2B5B;
const U = V.VIDEO_LUAR_K2B5B;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));
const jumlahId = (objs, awalan) => objs.filter((o) => o.id.startsWith(awalan)).length;
const SATUAN = { satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8, sembilan: 9, sepuluh: 10, sebelas: 11 };
const bilanganSuara = (s) => [...s.toLowerCase().matchAll(/\b(satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan|sepuluh|sebelas)\b/g)].map((m) => SATUAN[m[1]]);
sama(bilanganSuara("Satu, dua, tiga, kedua, keduanya, satuan dan enam."), [1, 2, 3, 6], "pembaca bilangan suara");
{
  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Dealing Out|Balance Scale|Doubling Check|Bagi Satu-Satu|Neraca Seimbang|Cek Dua Kali Lipat/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Dealing Out", "Balance Scale", "Doubling Check"], ["Bagi Satu-Satu", "Neraca Seimbang", "Cek Dua Kali Lipat"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Bibit untuk Dua Petak" && U.judul === M_VIDEO.judul && V.JUDUL_K2B5B === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k2b5B-materi" && U.id === "k2b5B-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,bibit-datang,salah-bagi,satu-satu,bukan-setengah,pola-setengah,ganjil,gabung,tiga-tanya,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-bagi,luar-bagi-terapan,luar-neraca,luar-neraca-terapan,luar-kali,luar-kali-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 52) && U.adegan.every((a) => /Metode global|Ringkasan|ringkasan/i.test(a.sumber) && a.sumber.length <= 52), "label sumber");
  const TERLARANG = /(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|bernilai|soal|tebak|kunci|latihan)/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa kata terlarang`);
  const SURUH = /bawalah|bawa benda|ambil benda di rumah|gambarlah|gambar di kertas|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!SURUH.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa suruhan membawa benda, menggambar di kertas, atau bermain bersama`);
  for (const v of [M_VIDEO, U])
    for (const a of v.adegan)
      for (const [i] of a.ketukan.entries())
        for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) for (const b of bilanganDari(t)) cek(Number(b) <= 10, `${v.id}/${a.id}#${i + 1}: angka paling besar sepuluh ("${t}")`);
  for (const v of [M_VIDEO, U])
    for (const a of v.adegan)
      if (a.id !== "sapaan")
        a.ketukan.forEach((kt, i) => {
          const terlihat = new Set();
          for (let p = -1; p < L.kataDari(kt.suara).length; p += 1) for (const t of L.teksTerlihat(L.keadaanStory(a, i, p))) for (const b of bilanganDari(t)) terlihat.add(Number(b));
          for (const n of bilanganSuara(kt.suara)) cek(terlihat.has(n), `${v.id}/${a.id}#${i + 1}: bilangan ${n} yang diucapkan tampak sebagai angka`);
        });
  const semuaSuara = M_VIDEO.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [1, 2, 3, 4, 5, 6, 8, 10]) cek(bilanganSuara(semuaSuara).includes(n), `video materi mengucapkan bilangan ${n}`);
  const semuaLuar = U.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [1, 2, 3]) cek(bilanganSuara(semuaLuar).includes(n), `video metode global mengucapkan bilangan ${n}`);
  for (const kata of ["Chacha", "Dika", "Nia", "Bu Sari", "Bu Wati", "bibit", "petak", "setengah", "sama banyak", "tidak sama banyak", "tersisa", "bedeng", "keranjang"])
    cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const pola of [/Igil/, /Kaka/, /Abang/, /Mamah/, /Pak Pos/i, /rumah rapi/i, /kereta/i, /festival/i, /kardus/i, /akuarium/i, /\bikan\b/i, /pasar malam/i, /rumah pohon/i, /pustaka/i, /perpustakaan/i, /kantin/i, /koperasi/i, /seragam/i, /\bkue\b/i, /Pak Tono/, /Pak Hasan/, /Pak Danu/, /ubin/i, /puzzle/i, /taman bermain/i, /gudang/i, /\brak\b/i, /peta kotak/i, /semangka/i, /pameran/i, /manik/i])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `durasi video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/belajar setengah dari sekumpulan benda\./.test(sapa.ketukan[0].suara) && ["Membagi bibit sama banyak", "Setengah dari bilangan", "Kapan tidak punya setengah"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
  cek(M_VIDEO.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  const naskah = readFileSync(new URL("../naskah/story-naskah-k2b5b.md", import.meta.url), "utf8");
  const dalamNaskah = (s) => naskah.replace(/\s+/g, " ").includes(s.replace(/\s+/g, " "));
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) cek(dalamNaskah(kt.suara), `${v.id}/${a.id}: suara sesuai naskah tetap ("${kt.suara.slice(0, 40)}")`);
  let banyakTitik = 0;
  let total = 0;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) { total += 1; if (new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at))).size >= 2) banyakTitik += 1; }
  cek(banyakTitik / total >= 0.9, `visual berubah mengikuti kata pada sedikitnya 90 persen ketukan (${banyakTitik}/${total})`);
}
{
  const d = (id) => adegan(M_VIDEO, id);
  const a1 = akhirAdegan(d("bibit-datang"), 0);
  cek(ada(a1, "pg0", "rm", "kj", "bw", "bw-kr", "b0", "b3", "bd", "bd-l", "bd-r", "bd-tl", "bd-tr"), "bibit datang: pagar, keranjang terguling, Bu Wati berkerudung, bibit berserakan, bedeng dua petak");
  cek(ada(akhirAdegan(d("bibit-datang"), 1), "bs", "bs-cp", "d2") && isiTeks(akhirAdegan(d("bibit-datang"), 1), "d2") === "2 petak" && ada(akhirAdegan(d("bibit-datang")), "no", "s1", "c0", "ad"), "bibit datang: Bu Sari bercaping, dua petak, petak sepi tidak adil");
  const s2 = akhirAdegan(d("salah-bagi"), 0);
  cek(ada(s2, "bd2", "ch", "q5", "n4", "n2") && isiTeks(s2, "n4") === "4" && isiTeks(s2, "n2") === "2" && ketemu(s2, "q0").x < 150 && ketemu(s2, "q4").x > 150, "salah bagi: empat di petak kiri dan dua di petak kanan");
  cek(ada(akhirAdegan(d("salah-bagi"), 1), "dk", "pk", "x1", "bs2"), "salah bagi: Dika menunjuk, bukan setengah");
  cek(ada(akhirAdegan(d("salah-bagi")), "bj", "tp", "tw") && ketemu(akhirAdegan(d("salah-bagi")), "bj").u > 14, "salah bagi: bibit jatuh ke topi dan tumbuh");
  const s3 = akhirAdegan(d("satu-satu"));
  cek(ada(s3, "ni", "cl", "cr", "lb-k") && isiTeks(s3, "cl") === "3" && isiTeks(s3, "cr") === "3" && isiTeks(s3, "lb-t0") === "setengah dari 6 adalah 3", "satu-satu: tiap petak tiga, setengah dari 6 adalah 3");
  const b4 = akhirAdegan(d("bukan-setengah"), 0);
  cek(jumlahId(b4, "l") >= 4 && ada(b4, "m0", "m1", "ln", "rn", "tg") && isiTeks(b4, "ln") === "4" && isiTeks(b4, "rn") === "2", "bukan setengah: tumpukan empat dan dua");
  cek(ada(akhirAdegan(d("bukan-setengah"), 1), "g0", "g1", "sd") && ada(akhirAdegan(d("bukan-setengah")), "dk", "x1", "sb", "bk"), "bukan setengah: garis penghubung, sisa, silang, sama banyak");
  const p5 = akhirAdegan(d("pola-setengah"));
  cek(["rr0", "rr1", "rr2", "rr3"].map((id) => isiTeks(p5, id)).join() === "2,3,4,5" && ["rl0", "rl1", "rl2", "rl3"].map((id) => isiTeks(p5, id)).join() === "4,6,8,10" && ada(p5, "bw", "dk", "pl-k", "pk"), "pola setengah: 4, 6, 8, 10 menjadi 2, 3, 4, 5, papan dengan panah naik");
  const g6 = akhirAdegan(d("ganjil"), 0);
  cek(ada(g6, "r4", "p1", "n5", "ni", "cl", "cr") && isiTeks(g6, "n5") === "5 bibit", "ganjil: lima bibit dibagi satu-satu");
  cek(ada(akhirAdegan(d("ganjil"), 1), "r4", "qm", "sx", "pp") && ada(akhirAdegan(d("ganjil")), "gt", "x1", "lb-k"), "ganjil: tersisa satu, gunting tidak boleh, tidak punya setengah utuh");
  const j7 = akhirAdegan(d("gabung"));
  cek(ada(j7, "a0", "c3", "bs", "ch", "fm", "ol", "sl-k") && isiTeks(j7, "fm") === "4 + 4 = 8" && ketemu(j7, "c0").x === 100, "gabung: dua tumpukan menyatu menjadi delapan");
  const t8 = akhirAdegan(d("tiga-tanya"));
  cek(ada(t8, "pc", "dk", "q1", "q2", "q3", "v1", "v2", "v3", "bm", "st") && isiTeks(t8, "q1") === "1. dibagi 2 bagian?", "tiga pertanyaan: papan catatan, tiga centang, dua petak kecil");
  cek(ada(akhirAdegan(d("penutup"), 0), "bd", "u3", "v3", "bw", "sn") && ada(akhirAdegan(d("penutup"), 1), "dk", "rg-k", "ok"), "penutup: dua petak penuh, Bu Wati, ringkasan Dika");
  const p9 = akhirAdegan(d("penutup"));
  cek(ada(p9, "ch", "dk", "ni", "bs", "bw", "w1", "w5") && !ketemu(p9, "pj"), "penutup: lima tokoh melambai");
  const tengah = L.keadaanStory(d("penutup"), 2, 15);
  cek(ada(tengah, "pj", "pj-km", "pj-b0", "lb", "l1", "o4", "qm"), "penutup: Pak Joko berkumis bersepatu bot, satu labu, empat orang");
}
{
  const op = adegan(U, "luar-pembuka");
  cek(ada(akhirAdegan(op, 0), "kj", "ni", "t3", "c0", "c1", "c2", "e0", "e1", "e2") && isiTeks(akhirAdegan(op, 0), "t3") === "3 kartu" && ada(akhirAdegan(op, 1), "bw", "sn", "tg"), "global pembuka: tiga kartu di bawah keranjang, Bu Wati");
  sama(["m0", "m1", "m2"].map((id) => isiTeks(akhirAdegan(op, 2), `${id}-t0`)), ["1. Dealing Out", "2. Balance Scale", "3. Doubling Check"], "global pembuka: tiga nama metode");
  sama(["n0", "n1", "n2"].map((id) => isiTeks(akhirAdegan(op, 3), `${id}-t0`)), ["Bagi Satu-Satu", "Neraca Seimbang", "Cek Dua Kali Lipat"], "global pembuka: tiga nama Indonesia");
  const bg = adegan(U, "luar-bagi");
  cek(ada(akhirAdegan(bg, 0), "no", "tg") && jumlahId(akhirAdegan(bg, 0), "p") >= 6 && ada(akhirAdegan(bg, 1), "tL", "tR", "lL", "lR") && isiTeks(akhirAdegan(bg, 1), "lL") === "tempat 1" && ada(akhirAdegan(bg), "cL", "cR", "eq", "ok"), "Bagi Satu-Satu: enam benda dibagi ke dua tempat, sama banyak");
  const bt = adegan(U, "luar-bagi-terapan");
  cek(ada(akhirAdegan(bt, 0), "ch", "bd", "n8", "s1", "p7") && isiTeks(akhirAdegan(bt, 0), "n8") === "8 bibit" && isiTeks(akhirAdegan(bt, 1), "cl") === "4" && ada(akhirAdegan(bt, 2), "cc-k", "tg") && ada(akhirAdegan(bt, 3), "kc-k", "b19", "jm", "no"), "Bagi Satu-Satu terapan: delapan bibit empat-empat, cocok dan kurang cocok");
  const nr = adegan(U, "luar-neraca");
  cek(ada(akhirAdegan(nr, 0), "nr-bk", "nr-pl", "nr-pr", "tb", "ps") && ada(akhirAdegan(nr, 1), "l0", "r2", "t1", "t2") && ada(akhirAdegan(nr, 2), "ok", "sm", "tp") && ketemu(akhirAdegan(nr), "nr-bk").y === 78 && ada(akhirAdegan(nr), "l3", "lb"), "Neraca Seimbang: seimbang lalu satu piringan turun");
  const nt = adegan(U, "luar-neraca-terapan");
  cek(ada(akhirAdegan(nt, 0), "dk", "l2", "r2", "tl", "tr", "ok") && isiTeks(akhirAdegan(nt, 0), "tl") === "3 tomat" && isiTeks(akhirAdegan(nt, 1), "tl") === "4 tomat" && ada(akhirAdegan(nt, 2), "cc-k", "a3", "c3") && ada(akhirAdegan(nt, 3), "kc-k", "bs", "kc2", "no"), "Neraca terapan: tiga tomat, tambah satu, cocok dan kurang cocok");
  const kl = adegan(U, "luar-kali");
  cek(ada(akhirAdegan(kl, 0), "no", "kl-k", "ul", "ak") && isiTeks(akhirAdegan(kl, 0), "kl-t0") === "Cek 2 kali lipat" && ada(akhirAdegan(kl, 1), "a2", "c2", "pl", "fm") && ada(akhirAdegan(kl, 2), "d2", "eq", "sl-k") && ada(akhirAdegan(kl), "hs", "sm", "no", "sl") && isiTeks(akhirAdegan(kl), "sm") === "semula: 10", "Cek Dua Kali Lipat: dua kali setengah, hasil tidak cocok");
  const kt = adegan(U, "luar-kali-terapan");
  cek(isiTeks(akhirAdegan(kt, 0), "n10") === "10 bibit" && isiTeks(akhirAdegan(kt, 0), "n5") === "5" && ada(akhirAdegan(kt, 1), "g04", "g14", "kl", "t10", "ok") && ada(akhirAdegan(kt, 2), "cc-k", "jw-k", "kc", "bl") && ada(akhirAdegan(kt, 3), "kc-k", "kk", "qk", "x2"), "Cek terapan: setengah dari 10 adalah 5, digandakan 10, cocok dan kurang cocok");
  const rk = adegan(U, "luar-ringkas");
  cek(isiTeks(akhirAdegan(rk, 0), "t3") === "3 cara" && ["r0", "r1", "r2"].map((id) => isiTeks(akhirAdegan(rk, 0), `${id}-t0`)).join() === U1.NAMA_METODE_ID.map((m, i) => `${i + 1}. ${m}`).join(), "ringkasan: tiga metode");
  cek(ada(akhirAdegan(rk), "q8", "c0", "c2", "pk") && isiTeks(akhirAdegan(rk), "q8") === "setengah dari 8 = 4", "ringkasan: pertanyaan penutup setengah dari delapan");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k2b5B-.*\.ts$/.test(f));
  cek(berkas.length === 8, `berkas story k2b5B (${berkas.length})`);
  cek(!berkas.includes("k2b5B-materi-4.ts") && !berkas.includes("k2b5B-materi-5.ts"), "k2b5B-materi-4.ts dan materi-5.ts sudah dihapus");
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku/i.test(s), `${f}: tanpa kata buku`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k2b5B-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, atau k2b5B (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k2b5b.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K2B5B/.test(pb) && /VIDEO_LUAR_K2B5B/.test(pb) && /export function VideoK2B5B/.test(pb) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pb) && !/\r/.test(pb) && !pb.startsWith("﻿") && !/data-k2b5|video-k2b5-umum/.test(pb), "video-k2b5b.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
