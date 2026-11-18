// Uji Story Kelas 2 Bab 4 Sub-Bab B "Pita Hias Bu Mira" (pola), akhir cerita Pameran Kerajinan Sekolah: video materi dan video metode global.
// Jalankan: node --no-warnings scripts/uji-story-k2b4B.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k2b4B-video.ts");
const U1 = await import("../src/components/modul/story/k2b4B-luar-1.ts");

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
const VIDEO = [V.VIDEO_MATERI_K2B4B, V.VIDEO_LUAR_K2B4B];
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


/* ------------------------------ Khusus Sub-Bab B Kelas 2 Bab 4 ------------------------------ */
const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
const M_VIDEO = V.VIDEO_MATERI_K2B4B;
const U = V.VIDEO_LUAR_K2B4B;
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
  cek(!(/Pattern Strips|Letter Coding|Rhythm Clap|Pita Pola|Kode Huruf|Tepuk Irama/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Pattern Strips", "Letter Coding", "Rhythm Clap"], ["Pita Pola", "Kode Huruf", "Tepuk Irama"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Pita Hias Bu Mira" && U.judul === M_VIDEO.judul && V.JUDUL_K2B4B === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k2b4B-materi" && U.id === "k2b4B-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,manik-tercecer,satuan-pola,salah-lanjut,cari-satuan,pola-bentuk,bukan-pola,gerakan-suara,buat-pola,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-pita,luar-pita-terapan,luar-kode,luar-kode-terapan,luar-tepuk,luar-tepuk-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 52) && U.adegan.every((a) => /Metode global|Ringkasan|ringkasan/i.test(a.sumber) && a.sumber.length <= 52), "label sumber");
  const TERLARANG = /(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|soal|tebak|kunci|latihan)/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa kata terlarang`);
  const SURUH = /bawalah|bawa benda|ambil benda di rumah|gambarlah|gambar di kertas|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!SURUH.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa suruhan membawa benda, menggambar di kertas, atau bermain bersama`);
  for (const v of [M_VIDEO, U])
    for (const a of v.adegan)
      for (const [i] of a.ketukan.entries())
        for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) for (const b of bilanganDari(t)) cek(Number(b) <= 9, `${v.id}/${a.id}#${i + 1}: angka paling besar sembilan ("${t}")`);
  for (const v of [M_VIDEO, U])
    for (const a of v.adegan)
      if (a.id !== "sapaan")
        a.ketukan.forEach((kt, i) => {
          const terlihat = new Set();
          for (let p = -1; p < L.kataDari(kt.suara).length; p += 1) for (const t of L.teksTerlihat(L.keadaanStory(a, i, p))) for (const b of bilanganDari(t)) terlihat.add(Number(b));
          for (const n of bilanganSuara(kt.suara)) cek(terlihat.has(n), `${v.id}/${a.id}#${i + 1}: bilangan ${n} yang diucapkan tampak sebagai angka`);
        });
  const semuaSuara = M_VIDEO.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  cek(bilanganSuara(semuaSuara).includes(2), "video materi mengucapkan bilangan 2");
  const semuaLuar = U.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [1, 2, 3]) cek(bilanganSuara(semuaLuar).includes(n), `video metode global mengucapkan bilangan ${n}`);
  for (const kata of ["Chacha", "Dika", "Nia", "Bu Sari", "Bu Mira", "manik", "pita hias", "satuan pola", "bukan pola", "pola bentuk", "pola gerakan", "pola suara", "membungkuk", "tepuk", "pameran", "dua unsur berbeda"])
    cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const pola of [/Igil/, /Kaka/, /Abang/, /Mamah/, /Pak Pos/i, /rumah rapi/i, /kebun/i, /bibit/i, /kereta/i, /festival/i, /kardus/i, /akuarium/i, /pasar malam/i, /rumah pohon/i, /pustaka/i, /perpustakaan/i, /kantin/i, /koperasi/i, /seragam/i, /\bkue\b/i, /Pak Tono/, /Pak Hasan/, /ubin/i, /puzzle/i, /taman bermain/i, /gudang/i, /\brak\b/i, /peta kotak/i])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `durasi video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/belajar pola\./.test(sapa.ketukan[0].suara) && ["Hal yang berulang dan teratur", "Pola bentuk, warna, gerakan, dan suara", "Melanjutkan dan membuat pola"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
  cek(M_VIDEO.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  const naskah = readFileSync(new URL("../naskah/story-naskah-k2b4b.md", import.meta.url), "utf8");
  const dalamNaskah = (s) => naskah.replace(/\s+/g, " ").includes(s.replace(/\s+/g, " "));
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) cek(dalamNaskah(kt.suara), `${v.id}/${a.id}: suara sesuai naskah tetap ("${kt.suara.slice(0, 40)}")`);
  let banyakTitik = 0;
  let total = 0;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) { total += 1; if (new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at))).size >= 2) banyakTitik += 1; }
  cek(banyakTitik / total >= 0.9, `visual berubah mengikuti kata pada sedikitnya 90 persen ketukan (${banyakTitik}/${total})`);
}
{
  const d = (id) => adegan(M_VIDEO, id);
  const m1 = akhirAdegan(d("manik-tercecer"), 0);
  cek(ada(m1, "st0", "st-m", "km", "bm", "mk0", "mk4") && jumlahId(m1, "bm-m") === 4, "manik tercecer: stan, kotak manik, Bu Mira berkalung manik, manik berhamburan");
  cek(ada(akhirAdegan(d("manik-tercecer"), 1), "bs", "bs-sl", "bs-pn", "dt", "kl-k") && ada(akhirAdegan(d("manik-tercecer")), "br0", "no", "cm"), "manik tercecer: Bu Sari berselempang PANITIA, daftar, Sabtu, pita berantakan");
  const s1 = akhirAdegan(d("satuan-pola"), 0);
  cek(["p0", "p1", "p2", "p3"].every((id) => ketemu(s1, id)) && ketemu(s1, "p0").warna === ketemu(s1, "p2").warna && ketemu(s1, "p1").warna === ketemu(s1, "p3").warna, "satuan pola: pita merah biru merah biru");
  cek(ada(akhirAdegan(d("satuan-pola"), 1), "lg0", "lg1", "lp-k") && ada(akhirAdegan(d("satuan-pola")), "kr", "ls-k") && ketemu(akhirAdegan(d("satuan-pola")), "p0").sorot === true, "satuan pola: lengkung ulang, kurung, label satuan pola");
  const j = akhirAdegan(d("salah-lanjut"), 0);
  cek(jumlahId(j, "r") >= 8 && ketemu(j, "r0").warna === ketemu(j, "r1").warna && ketemu(j, "r2").warna !== ketemu(j, "r1").warna, "salah lanjut: delapan manik jingga jingga biru");
  cek(ada(akhirAdegan(d("salah-lanjut"), 1), "ch", "mh", "no", "d2") && isiTeks(akhirAdegan(d("salah-lanjut"), 1), "d2") === "2 manik sama", "salah lanjut: Chacha memasang jingga, dua manik sama");
  cek(ada(akhirAdegan(d("salah-lanjut")), "dk", "kr", "bp") && ketemu(akhirAdegan(d("salah-lanjut")), "ch").rot !== undefined, "salah lanjut: Dika menyorot satuan, Chacha terpeleset");
  const c = akhirAdegan(d("cari-satuan"));
  cek(ada(c, "mb", "ok", "kl") && ketemu(c, "mb").x === 258, "cari satuan: manik biru terpasang, centang");
  cek(["cl1", "cl2", "cl3"].map((id) => isiTeks(akhirAdegan(d("cari-satuan"), 1), id)).filter(Boolean).length === 3, "cari satuan: tiga langkah bernomor");
  const b = akhirAdegan(d("pola-bentuk"));
  cek(ada(b, "lh1", "lh2", "s0", "d5", "lb1-k", "lb2-k", "lg0"), "pola bentuk: dua lembar hiasan dan dua label");
  const x = akhirAdegan(d("bukan-pola"), 1);
  cek(ada(x, "bm", "dk", "qm", "kc", "bp-k"), "bukan pola: Bu Mira bertanya, Dika memeriksa");
  cek(ada(akhirAdegan(d("bukan-pola")), "m0", "m5", "bx", "ub"), "bukan pola: semuanya sama, satu unsur berbeda");
  const g = akhirAdegan(d("gerakan-suara"), 0);
  cek(ada(g, "bs", "a1-h", "a3-h", "pn"), "gerakan: Bu Sari dan tiga anak membungkuk dan berdiri");
  cek(ada(akhirAdegan(d("gerakan-suara")), "h0", "h3", "g00", "g10", "ps-k") && ketemu(akhirAdegan(d("gerakan-suara")), "h0").u > ketemu(akhirAdegan(d("gerakan-suara")), "h1").u, "suara: tepuk keras besar dan pelan kecil");
  cek(ada(akhirAdegan(d("buat-pola"), 0), "ni", "s0", "s5", "kr", "lg") && ada(akhirAdegan(d("buat-pola")), "q1", "q2", "q3", "c1", "c2", "c3"), "buat pola: satuan hijau kuning kuning diulang, tiga pertanyaan periksa");
  const p = akhirAdegan(d("penutup"), 0);
  cek(jumlahId(p, "ph") === 12 && ada(p, "st-m", "k0", "bm", "ps"), "penutup: stan dengan pita hias, karya, Bu Mira");
  cek(ada(akhirAdegan(d("penutup"), 1), "m1", "m2", "m3", "dk") && ada(akhirAdegan(d("penutup")), "ib", "iw0", "ig", "is0", "qm", "ch", "ni", "bs", "bm", "lm4"), "penutup: tiga langkah, empat ikon jenis pola, lima tokoh melambai");
}
{
  const op = adegan(U, "luar-pembuka");
  cek(ada(akhirAdegan(op, 0), "km", "ch", "ps1", "ps2", "ps3") && isiTeks(akhirAdegan(op, 0), "t3") === "3 pita" && ada(akhirAdegan(op, 1), "bm", "kc"), "global pembuka: tiga pita tua di dasar kotak manik");
  sama(["m0", "m1", "m2"].map((id) => isiTeks(akhirAdegan(op, 2), `${id}-t0`)), ["1. Pattern Strips", "2. Letter Coding", "3. Rhythm Clap"], "global pembuka: tiga nama metode");
  sama(["n0", "n1", "n2"].map((id) => isiTeks(akhirAdegan(op, 3), `${id}-t0`)), ["Pita Pola", "Kode Huruf", "Tepuk Irama"], "global pembuka: tiga nama Indonesia");
  const pi = adegan(U, "luar-pita");
  cek(ada(akhirAdegan(pi, 0), "bar") && jumlahId(akhirAdegan(pi, 1), "s") >= 8 && ada(akhirAdegan(pi, 2), "kr", "lg") && ada(akhirAdegan(pi, 3), "no", "kc", "tt-k"), "Pita Pola: pita, kotak-kotak, satuan diulang, kotak tidak cocok");
  const pt = adegan(U, "luar-pita-terapan");
  cek(jumlahId(akhirAdegan(pt, 0), "e") >= 7 && isiTeks(akhirAdegan(pt, 0), "n3") === "3 kotak kosong" && ada(akhirAdegan(pt, 1), "ch", "ok") && ada(akhirAdegan(pt, 2), "cc-k", "bt") && ada(akhirAdegan(pt, 3), "kc-k", "an-h", "x2"), "Pita Pola terapan: tiga kotak kosong diisi, cocok dan kurang cocok");
  const k1 = adegan(U, "luar-kode");
  cek(ada(akhirAdegan(k1, 0), "ka-k", "kb-k", "kl-k") && isiTeks(akhirAdegan(k1, 1), "h1") === "1 huruf" && isiTeks(akhirAdegan(k1, 1), "kb-t") === "B" && jumlahId(akhirAdegan(k1, 2), "l") === 4 && isiTeks(akhirAdegan(k1, 3), "d2") === "2 pola", "Kode Huruf: A B, satu huruf satu jenis, ABAB, dua pola");
  const kt = adegan(U, "luar-kode-terapan");
  cek(ada(akhirAdegan(kt, 0), "dk", "r0", "r2", "u2", "g2") && ada(akhirAdegan(kt, 1), "ks-k", "kg") && ada(akhirAdegan(kt, 2), "cc-k", "p0-k", "p1-k") && ada(akhirAdegan(kt, 3), "kc-k", "ct", "c2"), "Kode Huruf terapan: A A B dua pola, cocok dan kurang cocok");
  const tp = adegan(U, "luar-tepuk");
  cek(ada(akhirAdegan(tp, 0), "hn", "gw0", "kl-k") && ada(akhirAdegan(tp, 1), "h0", "h1", "te") && jumlahId(akhirAdegan(tp, 2), "b") === 6 && ada(akhirAdegan(tp, 3), "b2", "dm", "u1"), "Tepuk Irama: tepuk keras pelan, batang bunyi, diam");
  const tt = adegan(U, "luar-tepuk-terapan");
  cek(ada(akhirAdegan(tt, 0), "ch", "ni", "b6") && ada(akhirAdegan(tt, 1), "n1", "n2", "n3") && ada(akhirAdegan(tt, 2), "cc-k", "an-h", "te") && ada(akhirAdegan(tt, 3), "kc-k", "o0", "x2"), "Tepuk Irama terapan: Chacha dan Nia, irama lagu, cocok dan kurang cocok");
  const rk = adegan(U, "luar-ringkas");
  cek(isiTeks(akhirAdegan(rk, 0), "t3") === "3 cara" && ["r0", "r1", "r2"].map((id) => isiTeks(akhirAdegan(rk, 0), `${id}-t0`)).join() === U1.NAMA_METODE_ID.map((m, i) => `${i + 1}. ${m}`).join(), "ringkasan: tiga metode");
  cek(ada(akhirAdegan(rk), "ms0", "pk3", "c0-k", "c2-k", "qm") && isiTeks(akhirAdegan(rk), "c1-t0") === "Kode Huruf", "ringkasan: menyalin pola manik, tiga pilihan cara");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k2b4B-.*\.ts$/.test(f));
  cek(berkas.length === 8, `berkas story k2b4B (${berkas.length})`);
  cek(!berkas.includes("k2b4B-materi-4.ts") && !berkas.includes("k2b4B-materi-5.ts"), "k2b4B-materi-4.ts dan materi-5.ts sudah dihapus");
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku/i.test(s), `${f}: tanpa kata buku`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k2b4B-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, atau k2b4B (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k2b4b.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K2B4B/.test(pb) && /VIDEO_LUAR_K2B4B/.test(pb) && /export function VideoK2B4B/.test(pb) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pb) && !/\r/.test(pb) && !pb.startsWith("﻿"), "video-k2b4b.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
