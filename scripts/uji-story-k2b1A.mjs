// Uji Story Kelas 2 Bab 1 Sub-Bab A "Kue Kiriman dari Dapur" (menghitung, membaca, dan menulis bilangan sampai lima puluh), awal cerita Kue di Kantin Sekolah: video materi dan video metode global.
// Jalankan: node --no-warnings scripts/uji-story-k2b1a.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k2b1A-video.ts");
const U1 = await import("../src/components/modul/story/k2b1A-luar-1.ts");

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
const VIDEO = [V.VIDEO_MATERI_K2B1A, V.VIDEO_LUAR_K2B1A];
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


/* ------------------------------ Khusus Sub-Bab A Kelas 2 Bab 1 ------------------------------ */
const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
const M_VIDEO = V.VIDEO_MATERI_K2B1A;
const U = V.VIDEO_LUAR_K2B1A;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));
const tidakAda = (objs, ...ids) => ids.every((id) => !ketemu(objs, id));
const sorot = (objs, ...ids) => ids.every((id) => ketemu(objs, id)?.sorot);
const jumlahId = (objs, awalan) => objs.filter((o) => o.id.startsWith(awalan)).length;

const SATUAN = { satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8, sembilan: 9 };
const PULUHAN = { dua: 20, tiga: 30, empat: 40, lima: 50 };
const POLA_BIL = /\b(?:(dua|tiga|empat|lima) puluh(?: (satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan))?|sebelas|sepuluh|(?:satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan) belas|satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan)\b/g;
const nilaiBil = (m) => {
  if (m[1]) return PULUHAN[m[1]] + (m[2] ? SATUAN[m[2]] : 0);
  const t = m[0];
  if (t === "sebelas") return 11;
  if (t === "sepuluh") return 10;
  if (t.endsWith(" belas")) return 10 + SATUAN[t.split(" ")[0]];
  return SATUAN[t];
};
const bilanganSuara = (s) => [...s.toLowerCase().matchAll(POLA_BIL)].map(nilaiBil);
sama(bilanganSuara("Dua belas, sebelas, sepuluh dan satu, kedua, keduanya, satuannya, berdua."), [12, 11, 10, 1], "pembaca bilangan suara (belasan)");
sama(bilanganSuara("Dua puluh enam, tiga puluh, empat puluh lima, lima puluh, tiga puluhan dan enam satuan, tiga puluh ditambah enam."), [26, 30, 45, 50, 3, 6, 30, 6], "pembaca bilangan suara sampai lima puluh");
{
  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Ten Frame|Skip Counting|Counting On|Bingkai Sepuluh|Hitung Meloncat|Hitung Lanjut/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Ten Frame", "Skip Counting", "Counting On"], ["Bingkai Sepuluh", "Hitung Meloncat", "Hitung Lanjut"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Kue Kiriman dari Dapur" && U.judul === M_VIDEO.judul && V.JUDUL_K2B1A === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k2b1A-materi" && U.id === "k2b1A-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,kue-datang,jari-krim,geser,kotak-sepuluh,baca-tulis,antrean,nomor-sobek,tercatat,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-bingkai,luar-bingkai-terapan,luar-loncat,luar-loncat-terapan,luar-lanjut,luar-lanjut-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 52) && U.adegan.every((a) => /Metode global|Ringkasan|ringkasan/i.test(a.sumber) && a.sumber.length <= 52), "label sumber");
  const TERLARANG = /(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|soal|tebak|kunci|latihan)/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa kata terlarang`);
  const SURUH = /bawalah|bawa benda|ambil benda di rumah|gambarlah|gambar di kertas|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!SURUH.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa suruhan membawa benda, menggambar di kertas, atau bermain bersama`);
  // Angka di gambar paling besar lima puluh.
  for (const v of [M_VIDEO, U])
    for (const a of v.adegan)
      for (const [i] of a.ketukan.entries())
        for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) for (const b of bilanganDari(t)) cek(Number(b) <= 50, `${v.id}/${a.id}#${i + 1}: angka paling besar lima puluh ("${t}")`);
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
  for (const n of [3, 6, 10, 30, 34, 35, 36, 37, 38, 39]) cek(bilanganSuara(semuaSuara).includes(n), `video materi mengucapkan bilangan ${n}`);
  const semuaLuar = U.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [10, 17, 20, 25, 26, 27, 28, 40]) cek(bilanganSuara(semuaLuar).includes(n), `video global mengucapkan bilangan ${n}`);
  for (const kata of ["Chacha", "Dika", "Nia", "Bu Sari", "etalase", "nampan", "kotak kue", "puluhan", "satuan", "maju", "mundur", "nomor antrean", "karcis", "papan harga", "terhitung dua kali", "bekas krim"])
    cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const pola of [/Igil/, /Kaka/, /Abang/, /Mamah/, /Pak Pos/i, /rumah rapi/i, /kebun/i, /bibit/i, /kereta/i, /festival/i, /kardus/i, /akuarium/i, /pasar malam/i, /rumah pohon/i, /pustaka/i, /perpustakaan/i, /Pak Anto/, /Bu Dewi/])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `durasi video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/menghitung dan membaca bilangan sampai lima puluh/.test(sapa.ketukan[0].suara) && ["Menghitung kue satu per satu", "Mengemas per sepuluh", "Menghitung maju dan mundur"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
  cek(M_VIDEO.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  // Naskah tetap: kalimat suara sama dengan berkas naskah.
  const naskah = readFileSync(new URL("../naskah/story-naskah-k2b1a.md", import.meta.url), "utf8");
  const dalamNaskah = (s) => naskah.replace(/\s+/g, " ").includes(s.replace(/\s+/g, " "));
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) cek(dalamNaskah(kt.suara), `${v.id}/${a.id}: suara sesuai naskah tetap ("${kt.suara.slice(0, 40)}")`);
  // Visual berubah mengikuti kata (paling sedikit dua titik waktu) pada hampir semua ketukan.
  let banyakTitik = 0;
  let total = 0;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) { total += 1; if (new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at))).size >= 2) banyakTitik += 1; }
  cek(banyakTitik / total >= 0.9, `visual berubah mengikuti kata pada sedikitnya 90 persen ketukan (${banyakTitik}/${total})`);
}
{
  // 1. Kue datang.
  const d = adegan(M_VIDEO, "kue-datang");
  const d0 = akhirAdegan(d, 0);
  cek(ada(d0, "et", "n1", "n2", "bs", "bs-ap", "dp", "tr") && jumlahId(d0, "a") >= 6 && jumlahId(d0, "b") >= 6 && isiTeks(d0, "bs-n") === "Bu Sari", "kue datang: etalase kaca, nampan berkue, Bu Sari berapron, truk dari dapur");
  const d1 = akhirAdegan(d, 1);
  cek(ada(d1, "bl", "ct-k") && ketemu(d1, "bl").rot > 0 && tidakAda(d1, "tr"), "kue datang: bel berbunyi, jumlah belum tercatat");
  cek(ada(akhirAdegan(d), "jm", "sd", "xk", "ak0", "ak1", "ak2") && isiTeks(akhirAdegan(d), "ct-t1") === "salah catat!", "kue datang: anak antre lama pulang tanpa kue");
  // 2. Jari berkrim.
  const j = adegan(M_VIDEO, "jari-krim");
  const j0 = akhirAdegan(j, 0);
  cek(ada(j0, "np", "ch", "jr", "kr") && jumlahId(j0, "g") === 6 && jumlahId(j0, "h") === 6 && ketemu(L.keadaanStory(j, 0, L.posisiKata(j.ketukan[0].suara, "menunjuk-nunjuk,")), "jr").x === 136, "jari krim: Chacha menunjuk kue, jari berkrim bergerak");
  const j1 = akhirAdegan(j, 1);
  cek(ada(j1, "dk", "mt", "bk") && sorot(j1, "g3") && tidakAda(j1, "jr"), "jari krim: Dika melihat bekas krim pada kue yang sudah dihitung");
  const j2 = akhirAdegan(j);
  cek(["h1", "h2", "h3"].map((id) => isiTeks(j2, id)).join() === "35,38,34" && ada(j2, "c1", "c2", "c3", "td-k", "bs") && isiTeks(j2, "tk") === "2 kali", "jari krim: tiga hasil berbeda dicoret, kartu tandai yang sudah dihitung");
  // 3. Geser.
  const g = adegan(M_VIDEO, "geser");
  const g0 = akhirAdegan(g, 0);
  cek(jumlahId(g0, "k") === 36 && ketemu(g0, "k3").x > 150 && ketemu(g0, "k4").x < 110 && isiTeks(g0, "ct") === "4", "geser: tiga puluh enam kue, empat sudah digeser, penghitung naik");
  const g1 = akhirAdegan(g, 1);
  cek([...Array(36).keys()].every((i) => ketemu(g1, `k${i}`).x > 150) && isiTeks(g1, "ct") === "36" && sorot(g1, "ct", "nb"), "geser: semua kue pindah, penghitung 36");
  cek(ada(akhirAdegan(g), "ch", "qm", "ad") && ketemu(akhirAdegan(g), "ch").isi === "\u{1F629}", "geser: Chacha bertanya cara lebih cepat, tangan pegal");
  // 4. Kotak sepuluh.
  const b = adegan(M_VIDEO, "kotak-sepuluh");
  const b0 = akhirAdegan(b, 0);
  cek(ada(b0, "ni", "ni-tp", "b0") && jumlahId(b0, "b0-c") === 10 && [...Array(10).keys()].every((i) => ketemu(b0, `b0-c${i}`).warna === "#FBCFE8") && isiTeks(b0, "l0") === "10", "kotak sepuluh: Nia bertopi, kotak berisi sepuluh kue");
  const b1 = akhirAdegan(b, 1);
  cek(ada(b1, "b1", "b2") && isiTeks(b1, "e30") === "3 puluhan = 30" && isiTeks(b1, "e3") === "3 kotak" && ["l0", "l1", "l2"].every((id) => isiTeks(b1, id) === "10"), "kotak sepuluh: tiga kotak penuh sama dengan tiga puluh");
  const b2 = akhirAdegan(b);
  cek(jumlahId(b2, "lp") === 6 && ["f30", "fp", "f6", "fs", "f36"].map((id) => isiTeks(b2, id)).join(" ") === "30 + 6 = 36", "kotak sepuluh: enam kue lepas, 30 + 6 = 36");
  // 5. Baca tulis.
  const t = adegan(M_VIDEO, "baca-tulis");
  const t0 = akhirAdegan(t, 0);
  cek(ada(t0, "pk", "bs") && isiTeks(t0, "w36") === "36" && isiTeks(t0, "bb") === "banyak kue", "baca tulis: Bu Sari menulis 36 di papan catatan");
  const t1 = akhirAdegan(t, 1);
  cek(isiTeks(t1, "d3") === "3" && isiTeks(t1, "d6") === "6" && isiTeks(t1, "lp") === "puluhan" && isiTeks(t1, "ls") === "satuan" && ketemu(t1, "d3").warna === "#93C5FD" && ketemu(t1, "d6").warna === "#FCA5A5", "baca tulis: angka kiri puluhan (biru), angka kanan satuan (merah)");
  cek(["g36", "gs", "g3", "gp", "g6"].map((id) => isiTeks(akhirAdegan(t), id)).join(" | ") === "36 | = | 3 puluhan | + | 6 satuan", "baca tulis: 36 = 3 puluhan + 6 satuan");
  // 6. Antrean.
  const a = adegan(M_VIDEO, "antrean");
  const a0 = akhirAdegan(a, 0);
  cek(ada(a0, "jn", "sl", "bl", "a0", "a1", "a2") && ["p0t", "p1t", "p2t"].map((id) => isiTeks(a0, id)).join() === "34,35,36", "antrean: jendela kantin, tiga anak membawa nomor 34 35 36");
  const a1 = akhirAdegan(a, 1);
  cek(ada(a1, "mj", "bs") && sorot(a1, "p2") && !sorot(a1, "p0") && isiTeks(a1, "lb") === "maju: makin besar" && ketemu(a1, "mj").x2 > 0, "antrean: panah maju ke kanan, makin besar");
  const a2 = akhirAdegan(a);
  cek(ada(a2, "mn", "dk") && tidakAda(a2, "mj", "bs") && sorot(a2, "p0") && ketemu(a2, "mn").x2 < 0 && isiTeks(a2, "lb2") === "mundur: makin kecil", "antrean: panah mundur ke kiri, makin kecil");
  // 7. Karcis sobek.
  const s = adegan(M_VIDEO, "nomor-sobek");
  const s0 = akhirAdegan(s, 0);
  cek(["c0t", "c1t", "c3t", "c4t"].map((id) => isiTeks(s0, id)).join() === "36,37,39,40" && ketemu(s0, "bl").putus && isiTeks(s0, "tq") === "?" && isiTeks(s0, "sk-t0") === "1 nomor hilang", "karcis sobek: satu nomor hilang di antara 37 dan 39");
  const s1 = akhirAdegan(s, 1);
  cek(isiTeks(s1, "tq") === "38" && ada(s1, "a1", "a2", "ni"), "karcis sobek: setelah 37 datang 38, sebelum 39 juga 38");
  const s2 = akhirAdegan(s);
  cek(isiTeks(s2, "k38t") === "38" && ketemu(s2, "k38").x === 126 && ketemu(s2, "k38").y === 66 && ada(s2, "ok", "ch"), "karcis sobek: kartu 38 masuk ke tempat kosong");
  // 8. Tercatat.
  const c = adegan(M_VIDEO, "tercatat");
  const c0 = akhirAdegan(c, 0);
  cek(isiTeks(c0, "hj") === "Kue Lapis" && isiTeks(c0, "h36") === "36" && ada(c0, "ph", "bs"), "tercatat: papan harga memuat kue lapis 36");
  const c1 = akhirAdegan(c, 1);
  cek(ada(c1, "et", "n1", "n2", "ok") && c1.filter((o) => /^a\d$/.test(o.id)).length === 4 && c1.filter((o) => /^b\d$/.test(o.id)).length === 4, "tercatat: etalase rapi dan tercatat");
  cek(ada(akhirAdegan(c), "ak0", "ak2", "ku0", "ku2", "ch", "ck", "ks") && ketemu(akhirAdegan(c), "ch").isi === "\u{1F60B}", "tercatat: setiap anak dapat kue, Chacha menjilat bekas krim");
  // 9. Penutup.
  const n = adegan(M_VIDEO, "penutup");
  cek(ada(akhirAdegan(n, 0), "et", "bs", "kl", "pn-k", "sn") && ketemu(akhirAdegan(n, 0), "sn").isi === "\u{1F60A}" && ketemu(akhirAdegan(n, 0), "bs").isi !== "\u{1F60A}", "penutup: etalase penuh, Bu Sari tersenyum, pesanan besok");
  cek(["r1-t0", "r2-t0", "r3-t0"].map((id) => isiTeks(akhirAdegan(n, 1), id)).join() === "1. Geser tiap kue,2. Kemas per 10,3. Tulis puluhan dan satuan", "penutup: ringkasan tiga langkah");
  const n2 = akhirAdegan(n);
  cek(isiTeks(n2, "w36") === "36" && isiTeks(n2, "q2") === "3 puluhan = 30" && ada(n2, "ch", "dk", "ni", "bs", "l1", "l4"), "penutup: pertanyaan 3 pada 36, empat tokoh melambai");
}
{
  // Pembuka metode global.
  const op = adegan(U, "luar-pembuka");
  cek(ada(akhirAdegan(op, 0), "lc", "ni", "rk0-k", "rk1-k", "rk2-k") && isiTeks(akhirAdegan(op, 0), "n3") === "3 kartu resep", "global pembuka: laci etalase, tiga kartu resep tua");
  cek(ada(akhirAdegan(op, 1), "bs"), "global pembuka: Bu Sari tertawa");
  sama(["m0", "m1", "m2"].map((id) => isiTeks(akhirAdegan(op, 2), id)), ["1. Ten Frame", "2. Skip Counting", "3. Counting On"], "global pembuka: tiga nama metode");
  sama(["n0", "n1", "n2"].map((id) => isiTeks(akhirAdegan(op, 3), id)), ["Bingkai Sepuluh", "Hitung Meloncat", "Hitung Lanjut"], "global pembuka: tiga nama bahasa Indonesia");
  // Ten Frame.
  const f = adegan(U, "luar-bingkai");
  cek(jumlahId(akhirAdegan(f, 0), "bf-s") === 10 && isiTeks(akhirAdegan(f, 0), "s10") === "10", "Ten Frame: bingkai sepuluh kotak");
  cek(isiTeks(akhirAdegan(f, 1), "t10") === "10 kotak" && isiTeks(akhirAdegan(f, 1), "t2") === "2 baris" && isiTeks(akhirAdegan(f, 1), "t5") === "5 kotak", "Ten Frame: sepuluh kotak, dua baris, lima kotak");
  cek(jumlahId(akhirAdegan(f, 2), "bk") === 10 && isiTeks(akhirAdegan(f, 2), "ee") === "1 kotak = 1 benda", "Ten Frame: satu kotak satu benda");
  cek(sorot(akhirAdegan(f), "bf-s0", "bf-s9") && isiTeks(akhirAdegan(f), "pn") === "= 10" && ada(akhirAdegan(f), "xx"), "Ten Frame: penuh berarti sepuluh, tidak perlu dihitung");
  const ft = adegan(U, "luar-bingkai-terapan");
  cek(jumlahId(akhirAdegan(ft, 0), "d1-") === 10 && jumlahId(akhirAdegan(ft, 0), "d2-") === 7 && isiTeks(akhirAdegan(ft, 0), "a7") === "7 terisi", "Ten Frame terapan: satu bingkai penuh, bingkai kedua tujuh donat");
  cek(["p10", "pp", "p7", "ps", "p17"].map((id) => isiTeks(akhirAdegan(ft, 1), id)).join(" ") === "10 + 7 = 17", "Ten Frame terapan: 10 + 7 = 17");
  cek(ada(akhirAdegan(ft, 2), "ok", "cc-k") && ada(akhirAdegan(ft, 3), "xs", "mf11"), "Ten Frame terapan: cocok untuk sedikit, kurang cocok untuk ratusan");
  // Skip Counting.
  const l = adegan(U, "luar-loncat");
  cek(ada(akhirAdegan(l, 0), "gl", "kt", "tk4") && isiTeks(akhirAdegan(l, 0), "hm") === "Hitung Meloncat", "Skip Counting: katak di garis bilangan");
  cek(["j0", "j1", "j2", "j3"].every((id) => isiTeks(akhirAdegan(l, 1), id) === "+10") && ada(akhirAdegan(l, 1), "h3"), "Skip Counting: loncatan tetap sepuluh");
  cek(["v-0", "v1", "v2", "v3", "v4"].map((id) => isiTeks(akhirAdegan(l, 2), id)).join() === "0,10,20,30,40" && ketemu(akhirAdegan(l, 2), "kt").x === 264, "Skip Counting: 10, 20, 30, 40, katak berhenti di 40");
  cek(jumlahId(akhirAdegan(l), "bx") >= 4 && isiTeks(akhirAdegan(l), "sk") === "1 loncatan = 1 kotak", "Skip Counting: satu loncatan satu kotak");
  const lt = adegan(U, "luar-loncat-terapan");
  cek(["cc0", "cc1", "cc2", "cc3"].map((id) => isiTeks(akhirAdegan(lt, 0), id)).join() === "10,20,30,40" && jumlahId(akhirAdegan(lt, 0), "tp") === 4, "Skip Counting terapan: empat kotak bertumpuk, 10 20 30 40");
  cek(isiTeks(akhirAdegan(lt, 1), "n4") === "4 kotak" && isiTeks(akhirAdegan(lt, 1), "n40") === "40 kue", "Skip Counting terapan: empat kotak, empat puluh kue");
  cek(ada(akhirAdegan(lt, 2), "ok", "sm-k") && ada(akhirAdegan(lt, 3), "xs", "tt-k") && ["ib0", "ib1", "ib2", "ib3"].map((id) => isiTeks(akhirAdegan(lt, 3), id)).sort().join() !== "10,10,10,10", "Skip Counting terapan: sama isi cocok, beda isi kurang cocok");
  // Counting On.
  const n1 = adegan(U, "luar-lanjut");
  cek(ada(akhirAdegan(n1, 0), "ck-k", "hl-k", "pl") && isiTeks(akhirAdegan(n1, 1), "st-t0") === "25" && ada(akhirAdegan(n1, 1), "fg", "xx"), "Counting On: mulai dari yang sudah diketahui, jangan dari awal");
  cek(isiTeks(akhirAdegan(n1, 2), "sg") === "26, 27 ..." && ada(akhirAdegan(n1, 2), "sp") && ada(akhirAdegan(n1, 3), "tn", "ok"), "Counting On: sambung dari 25, hemat tenaga");
  const nt = adegan(U, "luar-lanjut-terapan");
  cek(isiTeks(akhirAdegan(nt, 0), "l25") === "25" && jumlahId(akhirAdegan(nt, 0), "kl") === 3 && isiTeks(akhirAdegan(nt, 0), "l3") === "3 lepas", "Counting On terapan: nampan 25 dan tiga kue lepas");
  cek(["c26", "c27", "c28"].map((id) => isiTeks(akhirAdegan(nt, 1), id)).join() === "26,27,28", "Counting On terapan: 26, 27, 28");
  cek(ada(akhirAdegan(nt, 2), "ok", "sb-k") && isiTeks(akhirAdegan(nt, 3), "tq-t0") === "?" && ada(akhirAdegan(nt, 3), "xs"), "Counting On terapan: cocok bila sebagian diketahui, kurang cocok bila belum");
  // Ringkasan.
  const rk = adegan(U, "luar-ringkas");
  cek(["r0-t0", "r1-t0", "r2-t0"].map((id) => isiTeks(akhirAdegan(rk, 0), id)).join() === U1.NAMA_METODE.map((m, i) => `${i + 1}. ${m}`).join() && isiTeks(akhirAdegan(rk, 0), "t3") === "3 cara", "ringkasan: tiga metode");
  cek(isiTeks(akhirAdegan(rk, 1), "q0b-t0") === "Bingkai Sepuluh (10)" && isiTeks(akhirAdegan(rk, 1), "q1b-t0") === "Hitung Meloncat" && isiTeks(akhirAdegan(rk, 2), "q2b-t0") === "Hitung Lanjut", "ringkasan: pilih cara menurut kue");
  cek(isiTeks(akhirAdegan(rk), "e4") === "4 kotak penuh" && isiTeks(akhirAdegan(rk), "e3") === "3 kue lepas" && ada(akhirAdegan(rk), "o0-k", "o2-k", "qq"), "ringkasan: pertanyaan empat kotak penuh dan tiga kue lepas");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k2b1A-.*\.ts$/.test(f));
  cek(berkas.length >= 8, `berkas story k2b1A (${berkas.length})`);
  cek(!berkas.includes("k2b1A-materi-4.ts"), "k2b1A-materi-4.ts sudah dihapus");
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku/i.test(s), `${f}: tanpa kata buku`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k1b1a-bantu|k1b4a-gambar|k2b1A-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, k1b1a-bantu, k1b4a-gambar, atau k2b1A (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k2b1a.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K2B1A/.test(pb) && /VIDEO_LUAR_K2B1A/.test(pb) && /export function VideoK2B1A/.test(pb) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pb) && !/\r/.test(pb) && !pb.startsWith("﻿"), "video-k2b1a.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
