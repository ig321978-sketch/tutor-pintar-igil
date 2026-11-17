// Uji Story Kelas 1 Bab 5 Sub-Bab A "Ikan Baru Datang" (bilangan sampai dua puluh), awal cerita Akuarium Ikan Hias Abang: video materi dan video metode global.
// Bagian umum sama dengan uji Bab 4; bagian khusus memeriksa kiriman guppy, satu ikan satu hitungan, sepuluh dulu lalu sisanya, label belasan,
// perkiraan ikan koki, ikan neon sampai dua puluh, jembatan ke Sub-Bab B, bilangan yang diucapkan tampak sebagai angka, dan tiga metode global.
// Jalankan: node --no-warnings scripts/uji-story-k1b5a.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k1b5a-video.ts");
const U1 = await import("../src/components/modul/story/k1b5a-luar-1.ts");

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
const VIDEO = [V.VIDEO_MATERI_K1B5A, V.VIDEO_LUAR_K1B5A];
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

/* ------------------------------ Khusus Sub-Bab A Bab 5 ------------------------------ */
const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
const G = await import("../src/components/modul/story/k1b5a-gambar.ts");
const M_VIDEO = V.VIDEO_MATERI_K1B5A;
const U = V.VIDEO_LUAR_K1B5A;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
const hitung = (objs, p) => objs.filter((o) => new RegExp(`^${p}\\d+$`).test(o.id)).length;
const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));
const deretIsi = (objs, p, n, dari = 0) => Array.from({ length: n }, (_, i) => isiTeks(objs, `${p}${dari + i}`)).join();
const angkaUrut = (dari, n) => Array.from({ length: n }, (_, i) => dari + i).join();
const dalam = (o, x0, y0, x1, y1) => !!o && o.x > x0 && o.x < x1 && o.y > y0 && o.y < y1;

// Bilangan yang diucapkan (satu sampai dua puluh, belasan dibaca utuh) dibaca dari suara. Nama metode "Dua Bingkai Sepuluh" bukan bilangan.
const SATUAN = { satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8, sembilan: 9 };
const POLA_BIL = /\b(sebelas|(?:satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan) belas|dua puluh|sepuluh|satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan)\b/g;
const nilaiBil = (m) => (m === "sebelas" ? 11 : m === "dua puluh" ? 20 : m === "sepuluh" ? 10 : m.endsWith(" belas") ? 10 + SATUAN[m.split(" ")[0]] : SATUAN[m]);
const bilanganSuara = (s) => [...s.toLowerCase().replace(/dua bingkai sepuluh/g, "nama_metode").matchAll(POLA_BIL)].map((m) => nilaiBil(m[1]));
sama(bilanganSuara("Dua belas, tiga belas, sebelas, sepuluh dan satu, dua puluh, kedua, satuannya, Dua Bingkai Sepuluh."), [12, 13, 11, 10, 1, 20], "pembaca bilangan suara");
{
  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!/Double Ten Frame|Rekenrek|Estimation Jar|Dua Bingkai Sepuluh|Manik Hitung|Toples Tebakan|metode global/i.test(materi), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Double Ten Frame", "Rekenrek", "Estimation Jar"], ["Dua Bingkai Sepuluh", "Manik Hitung", "Toples Tebakan"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Ikan Baru Datang" && U.judul === M_VIDEO.judul && V.JUDUL_K1B5A === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k1b5a-materi" && U.id === "k1b5a-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,ikan-datang,satu-satu,sepuluh-dulu,baca-tulis,perkiraan,dua-puluh,akuarium-berlabel,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-bingkai,luar-bingkai-terapan,luar-manik,luar-manik-terapan,luar-toples,luar-toples-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 46) && U.adegan.every((a) => /Metode global|Ringkasan/i.test(a.sumber) && a.sumber.length <= 46), "label sumber");
  const TERLARANG = /buku|panduan guru|kunci|rubrik|latihan|soal|kelas|teman|kelompok|skor|nilai/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa kata terlarang`);
  const SURUH = /bawalah|bawa benda|ambil benda di rumah|gambarlah|gambar di kertas|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!SURUH.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa suruhan membawa benda, menggambar di kertas, atau bermain bersama`);
  cek(!/tebak/i.test(materi), "video materi tanpa tebak-tebakan");
  // Bab 5: tanpa kali dan bagi, tanpa lambang lebih besar atau lebih kecil, angka paling besar dua puluh.
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) {
    for (const kt of a.ketukan) cek(!/\b(kali|dikali|bagi|dibagi|perkalian|pembagian)\b/i.test(kt.suara), `${v.id}/${a.id}: suara tanpa kali dan bagi`);
    for (const [i] of a.ketukan.entries()) for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) {
      cek(!/[<>×÷=]/.test(t) && !/\d\s*-\s*\d/.test(t), `${v.id}/${a.id}#${i + 1}: tanpa lambang hitung ("${t}")`);
      for (const b of bilanganDari(t)) cek(Number(b) <= 20, `${v.id}/${a.id}#${i + 1}: angka paling besar dua puluh ("${t}")`);
    }
  }
  // Bilangan yang diucapkan tampak sebagai angka di gambar pada ketukan itu. Sapaan bersama dikecualikan.
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") a.ketukan.forEach((kt, i) => {
    const terlihat = new Set();
    for (let p = -1; p < L.kataDari(kt.suara).length; p += 1) for (const t of L.teksTerlihat(L.keadaanStory(a, i, p))) for (const b of bilanganDari(t)) terlihat.add(Number(b));
    for (const n of bilanganSuara(kt.suara)) cek(terlihat.has(n), `${v.id}/${a.id}#${i + 1}: bilangan ${n} yang diucapkan tampak sebagai angka`);
  });
  const semuaSuara = M_VIDEO.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [10, 11, 13, 14, 15, 17, 18, 19, 20]) cek(bilanganSuara(semuaSuara).includes(n), `video materi mengucapkan bilangan ${n}`);
  for (const kata of ["Igil", "Kaka", "Abang", "Mamah", "guppy", "koki", "neon", "jaring", "wadah", "akuarium", "label", "sebelas", "empat belas", "dua puluh", "memperkirakan", "teras", "lapak"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const pola of [/Malosi/i, /\bKira\b/, /\bUpe\b/, /\bWei\b/, /Halim/i, /kebun/i, /bibit/i, /sekolah/i, /burung hantu/i, /piknik/i, /kereta/i, /Nenek/i, /festival/i, /kardus/i, /\bTika\b/i]) for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `durasi video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/bilangan sampai dua puluh/.test(sapa.ketukan[0].suara) && ["Satu benda, satu hitungan", "Sepuluh dulu, lalu sisanya", "Membaca dan menulis belasan"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
}
{
  // 1. Kiriman ikan: empat belas guppy berenang, hitungan Igil tiga belas lalu lima belas, perlu hitungan tepat dan label.
  const n = adegan(M_VIDEO, "ikan-datang");
  const n0 = akhirAdegan(n, 0);
  cek(ada(n0, "ab", "mm", "kt", "kt-ik", "lp") && hitung(n0, "g") === 14, "kiriman: Abang, Mamah, lapak, kantong berisi empat belas guppy");
  const n1 = akhirAdegan(n, 1);
  sama([isiTeks(n1, "tg-t0"), isiTeks(n1, "c1-t0"), isiTeks(n1, "c2-t0"), !!ketemu(n1, "ig")], ["guppy 14", "dapat 13", "dapat 15", true], "kiriman: tulisan penjual dan dua hitungan Igil berbeda");
  const awal = L.keadaanStory(n, 1, -1);
  cek(ketemu(awal, "g0").x !== ketemu(n1, "g0").x && n1.filter((o) => /^g\d+$/.test(o.id)).every((o) => dalam(o, 196, 92, 286, 158)), "kiriman: ikan berenang berpindah tempat di dalam kantong");
  const n2 = akhirAdegan(n);
  sama([isiTeks(n2, "tq"), isiTeks(n2, "tp-t0"), isiTeks(n2, "pln"), !!ketemu(n2, "pl")], ["13 atau 15?", "harus tepat", "label?", true], "kiriman: hitungan berubah, harus tepat, perlu label");
  // 2. Satu ikan satu hitungan: tiap kata bilangan memindahkan satu ikan ke sekat berikutnya.
  const s = adegan(M_VIDEO, "satu-satu");
  const s0 = akhirAdegan(s, 0);
  sama([isiTeks(s0, "cr-t0"), isiTeks(s0, "ws"), hitung(s0, "wc"), !!ketemu(s0, "jr")], ["1 ikan, 1 hitungan", "10 sekat", 10, true], "satu-satu: wadah bersekat sepuluh dan jaring");
  const KATA = ["satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh"];
  for (const [ke, dari] of [[1, 0], [2, 5]]) {
    const kata = L.kataDari(s.ketukan[ke].suara);
    const mulai = ke === 1 ? kata.indexOf("hitungan.") : 0;
    let c = dari;
    kata.forEach((w, p) => {
      if (p < mulai || !KATA.includes(w.toLowerCase().replace(/[^a-z]/g, ""))) return;
      c += 1;
      cek(hitung(L.keadaanStory(s, ke, p), "wn") === c, `satu-satu#${ke + 1}: kata "${w}" menambah tepat satu hitungan (${c})`);
    });
  }
  const s2 = akhirAdegan(s);
  sama(deretIsi(s2, "wn", 10), angkaUrut(1, 10), "satu-satu: hitungan satu sampai sepuluh");
  cek(Array.from({ length: 10 }, (_, i) => ketemu(s2, `g${i}`)).every((o, i) => Math.abs(o.x - G.sekat(130, 70, i, 30).x) < 0.5), "satu-satu: sepuluh ikan masing-masing di satu sekat");
  cek([10, 11, 12, 13].every((i) => ketemu(s2, `g${i}`).x < 100), "satu-satu: empat ikan masih di kantong");
  // 3. Sepuluh dulu, lalu sisanya: sepuluh dan empat menjadi empat belas.
  const t = adegan(M_VIDEO, "sepuluh-dulu");
  const t0 = akhirAdegan(t, 0);
  sama([hitung(t0, "g"), hitung(t0, "s"), isiTeks(t0, "p10")], [10, 4, "10"], "sepuluh dulu: wadah pertama penuh, empat ikan tersisa");
  const t1 = akhirAdegan(t, 1);
  sama([deretIsi(t1, "sn", 4), isiTeks(t1, "p4"), [0, 1, 2, 3].every((i) => ketemu(t1, `s${i}`).x > 155)], ["1,2,3,4", "4", true], "sepuluh dulu: sisa empat dihitung di wadah kedua");
  const t2 = akhirAdegan(t);
  sama([isiTeks(t2, "hs"), isiTeks(t2, "hsn"), isiTeks(t2, "tg-t0"), !!ketemu(t2, "kt")], ["14", "empat belas", "guppy 14", false], "sepuluh dulu: sepuluh dan empat menjadi empat belas, sama dengan tulisan");
  // 4. Membaca dan menulis: lambang 14 ditulis, nama empat belas, belasan dan sebelas.
  const b = adegan(M_VIDEO, "baca-tulis");
  const b0 = akhirAdegan(b, 0);
  cek(ketemu(b0, "tl0")?.t === "jalur" && ketemu(b0, "tl1")?.t === "jalur" && ketemu(b0, "tl0")?.gambar && isiTeks(b0, "lb") === "14 dibaca empat belas", "baca-tulis: lambang 14 ditulis tangan dan dibaca empat belas");
  const b1 = akhirAdegan(b, 1);
  sama([isiTeks(b1, "nm"), isiTeks(b1, "st"), isiTeks(b1, "bl")], ["empat belas", "4: empat", "lalu belas"], "baca-tulis: nama belasan dari satuan lalu belas");
  const b2 = akhirAdegan(b);
  sama([isiTeks(b2, "r12"), isiTeks(b2, "r13"), isiTeks(b2, "r19"), isiTeks(b2, "sb-t0"), isiTeks(b2, "sb-t1"), isiTeks(b2, "s10")], ["12 dua belas", "13 tiga belas", "19 sembilan belas", "11", "sebelas", "10 dan 1"], "baca-tulis: belasan dan sebelas istimewa");
  // 5. Perkiraan ikan koki: kira-kira sepuluh, hitungan sebelas.
  const p = adegan(M_VIDEO, "perkiraan");
  const p0 = akhirAdegan(p, 0);
  sama([hitung(p0, "kk"), isiTeks(p0, "pk-t0")], [11, "kira-kira 10"], "perkiraan: sebelas koki, perkiraan sepuluh");
  const p1 = akhirAdegan(p, 1);
  cek(Array.from({ length: 10 }, (_, i) => ketemu(p1, `kk${i}`)).every((o) => dalam(o, 145, 39, 285, 101)) && dalam(ketemu(p1, "kk10"), 145, 109, 285, 171), "perkiraan: sepuluh di wadah pertama, satu di wadah kedua");
  const p2 = akhirAdegan(p);
  sama([isiTeks(p2, "p10"), isiTeks(p2, "p1"), isiTeks(p2, "hs"), isiTeks(p2, "lk-t0"), !!ketemu(p2, "ok")], ["10", "1", "11", "11 sebelas", true], "perkiraan: sepuluh dan satu, sebelas, perkiraan dekat");
  // 6. Ikan neon: tujuh belas, tiga lagi, delapan belas, sembilan belas, dua puluh.
  const d = adegan(M_VIDEO, "dua-puluh");
  const d0 = akhirAdegan(d, 0);
  sama([hitung(d0, "n"), hitung(d0, "m"), isiTeks(d0, "p10"), isiTeks(d0, "p7"), ketemu(d0, "mk")?.x, deretIsi(d0, "gb-a", 11, 10)], [10, 7, "10", "7", 198, angkaUrut(10, 11)], "dua puluh: sepuluh dan tujuh, tujuh belas di garis bilangan");
  const kd = d.ketukan[1];
  for (const [w, x] of [["Delapan", 222], ["sembilan", 246], ["puluh.", 270]]) cek(ketemu(L.keadaanStory(d, 1, L.posisiKata(kd.suara, w)), "mk")?.x === x, `dua puluh: penanda garis bilangan bergeser saat "${w}"`);
  const d1 = akhirAdegan(d, 1);
  cek([0, 1, 2].every((j) => Math.abs(ketemu(d1, `b${j}`).x - G.sekat(160, 46, 7 + j, 25).x) < 0.5) && isiTeks(d1, "p7") === "10" && isiTeks(d1, "p3") === "3 lagi", "dua puluh: tiga ikan baru mengisi wadah kedua sampai penuh");
  const d2 = akhirAdegan(d);
  sama([isiTeks(d2, "h20"), isiTeks(d2, "lb-t0"), isiTeks(d2, "w2n"), ketemu(d2, "w1-b")?.sorot, ketemu(d2, "w2-b")?.sorot], ["20", "20 dua puluh", "2 wadah", true, true], "dua puluh: dua wadah sepuluh penuh, label dua puluh");
  // 7. Hasil: tiga akuarium berlabel, dua puluh akuarium kecil bernomor, pakan besok pagi (jembatan ke Sub-Bab B).
  const h = adegan(M_VIDEO, "akuarium-berlabel");
  const h0 = akhirAdegan(h, 0);
  sama(["l0", "l1", "l2"].map((id) => [isiTeks(h0, `${id}-t0`), isiTeks(h0, `${id}-t1`)]), [["14", "empat belas"], ["11", "sebelas"], ["20", "dua puluh"]], "hasil: tiga label lambang dan nama bilangan");
  cek(ada(h0, "a0", "a1", "a2", "mm"), "hasil: tiga akuarium dan Mamah");
  const h1 = akhirAdegan(h, 1);
  sama([hitung(h1, "ra") + hitung(h1, "rb"), deretIsi(h1, "ran", 10), deretIsi(h1, "rbn", 10)], [20, angkaUrut(1, 10), angkaUrut(11, 10)], "hasil: dua puluh akuarium kecil bernomor satu sampai dua puluh");
  const h2 = akhirAdegan(h);
  cek(/besok pagi/.test(isiTeks(h2, "bs-t0") ?? "") && /pakan/.test(isiTeks(h2, "bs-t0") ?? "") && /besok pagi/.test(h.ketukan[2].suara) && /pakan/.test(h.ketukan[2].suara), "hasil: jembatan ke Sub-Bab B (pakan besok pagi)");
  // 8. Penutup.
  const q = akhirAdegan(adegan(M_VIDEO, "penutup"), 1);
  sama(["p0a", "p1a", "p2a"].map((id) => isiTeks(q, id)), ["1 benda, 1 hitungan", "10 dulu sampai penuh", "14: empat belas"], "penutup: ringkasan tiga cara");
  const q2 = akhirAdegan(adegan(M_VIDEO, "penutup"));
  sama([isiTeks(q2, "tt"), isiTeks(q2, "t2"), hitung(q2, "qa") + hitung(q2, "qb"), ada(q2, "ig", "kk", "kk-pita", "ab", "mm")], ["20", "2 wadah penuh", 20, true], "penutup: dua puluh adalah dua sepuluh penuh, empat tokoh");
}
{
  // Metode global: Double Ten Frame pada ikan guppy, koki, neon.
  const bt = adegan(U, "luar-bingkai-terapan");
  const g0 = akhirAdegan(bt, 0);
  sama([hitung(g0, "b1t"), hitung(g0, "b2t"), isiTeks(g0, "p10"), isiTeks(g0, "p4"), isiTeks(g0, "n2")], [10, 4, "10", "4", "2 bingkai"], "Double Ten Frame: sepuluh dan empat");
  sama([isiTeks(akhirAdegan(bt, 1), "h-t0"), isiTeks(akhirAdegan(bt, 1), "k6")], ["guppy: 14", "6 kosong"], "Double Ten Frame: empat belas, enam kotak kosong");
  sama([hitung(akhirAdegan(bt, 2), "b2t"), isiTeks(akhirAdegan(bt, 2), "p4"), isiTeks(akhirAdegan(bt, 2), "h-t0")], [1, "1", "koki: 11"], "Double Ten Frame: koki sebelas");
  sama([hitung(akhirAdegan(bt), "b1t") + hitung(akhirAdegan(bt), "b2t"), isiTeks(akhirAdegan(bt), "h-t0")], [20, "neon: 20"], "Double Ten Frame: neon dua puluh, dua bingkai penuh");
  // Rekenrek: manik digeser ke kiri.
  const mt = adegan(U, "luar-manik-terapan");
  const kiri = (objs, b) => Array.from({ length: 10 }, (_, i) => ketemu(objs, `rk${b}${i}`)).filter((o, i) => o.x === G.xManik(i, true)).length;
  const m0 = akhirAdegan(mt, 0);
  sama([kiri(m0, "a"), kiri(m0, "b"), isiTeks(m0, "na"), [0, 5].map((i) => ketemu(m0, `rka${i}`).warna).join()], [10, 0, "10", "#DC2626,#FFFFFF"], "Rekenrek: kawat atas sepuluh, lima merah lima putih");
  sama([kiri(akhirAdegan(mt, 1), "b"), isiTeks(akhirAdegan(mt, 1), "h-t0")], [1, "koki: 11"], "Rekenrek: koki sebelas");
  sama([kiri(akhirAdegan(mt, 2), "b"), isiTeks(akhirAdegan(mt, 2), "nb"), isiTeks(akhirAdegan(mt, 2), "h-t0")], [7, "5 merah, 2 putih", "neon: 17"], "Rekenrek: neon tujuh belas");
  sama([kiri(akhirAdegan(mt), "a") + kiri(akhirAdegan(mt), "b"), isiTeks(akhirAdegan(mt), "h-t0"), isiTeks(akhirAdegan(mt), "n2")], [20, "neon: 20", "2 kawat"], "Rekenrek: dua kawat penuh, dua puluh");
  // Estimation Jar: perkiraan lalu dibuktikan dengan menghitung.
  const jt = adegan(U, "luar-toples-terapan");
  sama([hitung(akhirAdegan(jt, 0), "kr"), isiTeks(akhirAdegan(jt, 0), "pk-t0")], [16, "kira-kira 15"], "Estimation Jar: enam belas kerikil, perkiraan lima belas");
  sama([hitung(akhirAdegan(jt, 1), "b1t"), hitung(akhirAdegan(jt, 1), "b2t"), isiTeks(akhirAdegan(jt, 1), "p6")], [10, 6, "6"], "Estimation Jar: sepuluh dulu, sisanya enam");
  sama([isiTeks(akhirAdegan(jt, 2), "hh-t0"), isiTeks(akhirAdegan(jt, 2), "pk-t0"), isiTeks(akhirAdegan(jt, 2), "k1")], ["hitungan 16", "kira-kira 15", "kurang 1"], "Estimation Jar: hitungan enam belas, perkiraan kurang satu");
  sama([hitung(akhirAdegan(jt), "ks"), isiTeks(akhirAdegan(jt), "pk-t0"), isiTeks(akhirAdegan(jt), "hh-t0")], [18, "kira-kira 20", "hitungan 18"], "Estimation Jar: kerang delapan belas, perkiraan dua puluh");
  const rk = akhirAdegan(adegan(U, "luar-ringkas"));
  sama(["r0-t0", "r1-t0", "r2-t0"].map((id) => isiTeks(rk, id)), U1.NAMA_METODE, "ringkasan: tiga metode");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k1b5a-.*\.ts$/.test(f));
  cek(berkas.length >= 8, `berkas story k1b5a (${berkas.length})`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k1b1a-[a-z0-9-]+|k1b4a-gambar|k1b5a-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, k1b1a, k1b4a-gambar, atau k1b5a (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k1b5a.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K1B5A/.test(pb) && /VIDEO_LUAR_K1B5A/.test(pb) && /export function VideoK1B5A/.test(pb) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pb) && !/\r/.test(pb) && !pb.startsWith("﻿"), "video-k1b5a.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
