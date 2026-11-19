// Uji Story Kelas 3 Bab 1 Sub-Bab G "Pesta Hari Jadi Toko" (pembagian sampai seratus), akhir cerita Toko Kelontong Pak Joko: video materi dan video metode global.
// Jalankan: node --no-warnings scripts/uji-story-k3b1G.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k3b1G-video.ts");
const U1 = await import("../src/components/modul/story/k3b1G-luar-1.ts");

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
const VIDEO = [V.VIDEO_MATERI_K3B1G, V.VIDEO_LUAR_K3B1G];
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




/* ------------------------------ Khusus Sub-Bab G Kelas 3 Bab 1 ------------------------------ */
const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
const M_VIDEO = V.VIDEO_MATERI_K3B1G;
const U = V.VIDEO_LUAR_K3B1G;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));
const banyakId = (objs, re) => objs.filter((o) => re.test(o.id)).length;

/** Bilangan yang diucapkan (kata) sebagai angka: satuan, belasan, puluhan dengan satuannya; "seratus" tidak dihitung. */
const SATUAN = { nol: 0, satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8, sembilan: 9 };
const NAMA_S = "nol|satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan";
function bilanganSuara(s) {
  let t = s.toLowerCase().replace(/[.,?!:;]/g, " ");
  const hasil = [];
  t = t.replace(new RegExp(`\\b(dua|tiga|empat|lima|enam|tujuh|delapan|sembilan) puluh(?: (satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan))?\\b`, "g"), (_, a, b) => {
    hasil.push(SATUAN[a] * 10 + (b ? SATUAN[b] : 0));
    return " ";
  });
  t = t.replace(/\bsepuluh\b/g, () => (hasil.push(10), " "));
  t = t.replace(/\bsebelas\b/g, () => (hasil.push(11), " "));
  t = t.replace(new RegExp(`\\b(${NAMA_S}) belas\\b`, "g"), (_, a) => (hasil.push(10 + SATUAN[a]), " "));
  for (const m of t.matchAll(new RegExp(`\\b(${NAMA_S})\\b`, "g"))) hasil.push(SATUAN[m[1]]);
  return hasil;
}
sama(bilanganSuara("Dua puluh, sepuluh anak, enam belas, kedua, tiga."), [20, 10, 16, 3], "pembaca bilangan suara");
const angkaTampak = (objs) => {
  const s = new Set();
  for (const o of objs) if (o.t === "teks" && (o.op ?? 1) > 0 && o.isi) for (const m of o.isi.matchAll(/\d+/g)) s.add(Number(m[0]));
  return s;
};
{
  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Fair Share|Repeated Subtraction|Fact Family|Bagi Rata|Kurang Berulang|Keluarga Fakta/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Fair Share", "Repeated Subtraction", "Fact Family"], ["Bagi Rata", "Kurang Berulang", "Keluarga Fakta"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Pesta Hari Jadi Toko" && U.judul === M_VIDEO.judul && V.JUDUL_K3B1G === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k3b1G-materi" && U.id === "k3b1G-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,hari-jadi,bagi-rata,tulis-bagi,salah-kurang,kurang-berulang,keluarga-fakta,soal-cerita-bagi,periksa-kali,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-rata,luar-rata-terapan,luar-kurang,luar-kurang-terapan,luar-keluarga,luar-keluarga-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 52) && U.adegan.every((a) => /Metode global|Ringkasan|ringkasan/i.test(a.sumber) && a.sumber.length <= 52), "label sumber");
  const TERLARANG = /(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|soal|tebak|kunci|latihan)/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa kata terlarang`);
  const SURUH = /bawalah|bawa benda|ambil benda di rumah|gambarlah|gambar di kertas|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!SURUH.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa suruhan membawa benda, menggambar di kertas, atau bermain bersama`);
  for (const v of [M_VIDEO, U])
    for (const a of v.adegan)
      if (a.id !== "sapaan")
        a.ketukan.forEach((kt, i) => {
          const terlihat = new Set();
          for (let p = -1; p < L.kataDari(kt.suara).length; p += 1) for (const n of angkaTampak(L.keadaanStory(a, i, p))) terlihat.add(n);
          for (const n of bilanganSuara(kt.suara)) cek(terlihat.has(n), `${v.id}/${a.id}#${i + 1}: bilangan ${n} yang diucapkan tampak sebagai angka`);
        });
  const semuaSuara = M_VIDEO.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [1, 3, 4, 5, 6, 15, 20, 24, 36]) cek(bilanganSuara(semuaSuara).includes(n), `video materi mengucapkan bilangan ${n}`);
  const semuaLuar = U.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [1, 2, 3, 4, 5, 7, 10, 18, 20, 21, 28, 45]) cek(bilanganSuara(semuaLuar).includes(n), `video global mengucapkan bilangan ${n}`);
  for (const kata of ["Raka", "Salsa", "Bima", "Pak Joko", "Nenek Ijah", "Kak Dewi", "Bu Wati", "Pak Dodi", "Bu Tuti", "Pak Anto", "Bu Mirna", "bingkisan", "keranjang", "dibagi", "pembagi", "hasil bagi", "pengurangan berulang", "keluarga fakta", "perkalian", "dua puluh empat", "manik-manik", "spanduk"])
    cek(materi.toLowerCase().includes(kata.toLowerCase()) || M_VIDEO.adegan.some((a) => a.ketukan.some((kt) => kt.suara.toLowerCase().includes(kata.toLowerCase()))), `video materi memuat "${kata}"`);
  for (const pola of [/Igil/, /Kaka/, /Abang/, /Mamah/, /Pak Pos/i, /rumah rapi/i, /bibit/i, /kereta/i, /festival/i, /akuarium/i, /pasar malam/i, /rumah pohon/i, /pustaka/i, /perpustakaan/i, /kantin/i, /koperasi/i, /seragam/i, /Chacha/, /Dika/, /Nia\b/, /Bu Sari/, /Bu Maya/, /Pak Hendra/, /Pak Ujang/, /Bu Lia/, /taman bermain/i, /pameran/i, /lapangan/i, /pentas/i, /bank sampah/i, /kebun/i])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `durasi video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(2)} menit)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/pembagian sampai seratus/.test(sapa.ketukan[0].suara) && ["Membagi sama banyak", "Pembagian sebagai pengurangan berulang", "Hubungan kali dan bagi"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
  cek(M_VIDEO.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  const naskah = readFileSync(new URL("../naskah/story-naskah-k3b1g.md", import.meta.url), "utf8");
  const dalamNaskah = (s) => naskah.replace(/\s+/g, " ").includes(s.replace(/\s+/g, " "));
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) cek(dalamNaskah(kt.suara), `${v.id}/${a.id}: suara sesuai naskah tetap ("${kt.suara.slice(0, 40)}")`);
  let banyakTitik = 0;
  let total = 0;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) { total += 1; if (new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at))).size >= 2) banyakTitik += 1; }
  cek(banyakTitik / total >= 0.9, `visual berubah mengikuti kata pada sedikitnya 90 persen ketukan (${banyakTitik}/${total})`);
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") cek(akhirAdegan(a).some((o) => o.t !== "teks"), `${v.id}/${a.id}: gambar akhir memuat bentuk gambar sendiri, bukan hanya teks`);
}
{
  /* Hitung ulang dari struktur gambar: banyak benda tiap bagian sesuai pembagian. */
  const hj = adegan(M_VIDEO, "hari-jadi");
  cek(ada(akhirAdegan(hj, 0), "tk", "pn-k", "b1", "p4", "h2") && isiTeks(akhirAdegan(hj, 0), "pn-t0") === "TOKO PAK JOKO" && !ketemu(akhirAdegan(hj, 0), "pj"), "hari jadi: toko dihias, papan nama, pelanggan, belum ada Pak Joko");
  cek(ada(akhirAdegan(hj, 1), "pj", "pj-ap", "nn", "nn-tg", "mj", "kn") && isiTeks(akhirAdegan(hj, 1), "n24") === "24" && banyakId(akhirAdegan(hj, 1), /^bk\d+$/) === 24, "hari jadi: Pak Joko, Nenek Ijah bertongkat, dua puluh empat bingkisan di meja");
  cek(banyakId(akhirAdegan(hj, 2), /^kr\d$/) === 4 && isiTeks(akhirAdegan(hj, 2), "n4") === "4 keranjang" && ada(akhirAdegan(hj, 2), "tz", "rk", "sl", "bm") && banyakId(akhirAdegan(hj, 2), /^bk\d+$/) === 24, "hari jadi: empat keranjang kosong, tiga anak, pertanyaan");
  const br = adegan(M_VIDEO, "bagi-rata");
  {
    const a0 = akhirAdegan(br, 0);
    cek(banyakId(a0, /^bk\d+$/) === 16 && banyakId(a0, /^f\d\d$/) === 8 && ada(a0, "f00", "f10", "f20", "f30", "f01", "f31") && !ketemu(a0, "bk0") && !ketemu(a0, "bk7") && ketemu(a0, "bk8") && isiTeks(a0, "s1") === "1 untuk tiap keranjang", "bagi rata: dua putaran bergiliran, delapan di keranjang dan enam belas tersisa");
    const a1 = akhirAdegan(br, 1);
    const tiap = [0, 1, 2, 3].map((i) => banyakId(a1, new RegExp(`^f${i}\\d$`)));
    sama(tiap, [6, 6, 6, 6], "bagi rata: tiap keranjang enam bingkisan (hitung ulang)");
    cek(tiap.reduce((a, b) => a + b, 0) === 24 && 24 / 4 === tiap[0] && banyakId(a1, /^bk\d+$/) === 0 && [0, 1, 2, 3].every((i) => isiTeks(a1, `h${i}`) === "6"), "bagi rata: dua puluh empat dibagi empat sama dengan enam, tumpukan habis");
    const a2 = akhirAdegan(br, 2);
    cek(isiTeks(a2, "kal") === "24 : 4 = 6" && !ketemu(a2, "mj"), "bagi rata: kalimat pembagian 24 : 4 = 6");
  }
  const tb = adegan(M_VIDEO, "tulis-bagi");
  cek(["a", "op", "g", "sd", "h"].map((id) => isiTeks(akhirAdegan(tb, 0), id)).join(" ") === "24 : 4 = 6" && isiTeks(akhirAdegan(tb, 0), "la-t0") === "yang dibagi" && ketemu(akhirAdegan(tb, 0), "a").sorot === true, "tulis bagi: 24 : 4 = 6 dengan label yang dibagi");
  cek(isiTeks(akhirAdegan(tb, 1), "lb-t0") === "pembagi" && isiTeks(akhirAdegan(tb, 1), "lc-t0") === "hasil bagi" && ketemu(akhirAdegan(tb, 1), "h").sorot === true && ketemu(akhirAdegan(tb, 1), "g").sorot === false, "tulis bagi: pembagi dan hasil bagi diberi label");
  cek(isiTeks(akhirAdegan(tb, 2), "rd") === "24 dibagi 4 sama dengan 6" && ada(akhirAdegan(tb, 2), "pj"), "tulis bagi: dibaca dua puluh empat dibagi empat sama dengan enam");
  const sk = adegan(M_VIDEO, "salah-kurang");
  cek(isiTeks(akhirAdegan(sk, 0), "pt") === "24 : 4 = 20" && isiTeks(akhirAdegan(sk, 0), "kg") === "24 - 4" && ada(akhirAdegan(sk, 0), "rk", "gl", "pp"), "salah kurang: Raka menulis 24 : 4 = 20 dan tinggal kurangi 4, kertas bergulung");
  {
    const a1 = akhirAdegan(sk, 1);
    cek(banyakId(a1, /^bk\d+$/) === 24 - 4 && !ketemu(a1, "bk3") && ketemu(a1, "bk4") && banyakId(a1, /^f0\d$/) === 4 && isiTeks(a1, "t4") === "4" && isiTeks(a1, "t20") === "20" && 24 - 4 === 20, "salah kurang: satu keranjang diisi empat, dua puluh tersisa (hitung ulang)");
    const a2 = akhirAdegan(sk, 2);
    sama([0, 1, 2, 3].map((i) => banyakId(a2, new RegExp(`^f${i}\\d$`))), [6, 6, 6, 6], "salah kurang: dibagi sampai habis, tiap keranjang sama banyak");
    cek(banyakId(a2, /^bk\d+$/) === 0 && isiTeks(a2, "sm") === "sama banyak" && !ketemu(a2, "t20"), "salah kurang: tumpukan habis");
  }
  const kb = adegan(M_VIDEO, "kurang-berulang");
  {
    const a0 = akhirAdegan(kb, 0);
    const nilai = [24, 20, 16, 12, 8, 4, 0];
    cek(nilai.every((v) => isiTeks(a0, `gl-l${v}`) === String(v)), "kurang berulang: angka 24 sampai 0 pada garis");
    const busur = [24, 20, 16, 12, 8, 4].map((v) => ketemu(a0, `gl-a${v}`));
    cek(busur.every(Boolean) && busur.length === 24 / 4 && busur.every((b) => b.t === "jalur" && /^M0 0 Q[\d.]+ -?\d+ [\d.]+ 0$/.test(b.d)) && ketemu(a0, "pt").x === 24, "kurang berulang: enam busur mundur empat, penanda berakhir di nol");
    cek(busur.every((b, i) => b.x === 24 + (24 - 4 * (i + 1)) * 10 && b.d === "M0 0 Q20 -20 40 0"), "kurang berulang: tiap busur melompat empat satuan ke kiri (letak busur)");
    const a1 = akhirAdegan(kb, 1);
    cek(isiTeks(a1, "c6") === "6 kali" && isiTeks(a1, "hs-t0") === "hasil bagi = 6", "kurang berulang: enam kali, hasil bagi enam");
    cek(isiTeks(akhirAdegan(kb, 2), "rg-t0") === "Pembagian = pengurangan berulang" && !ketemu(akhirAdegan(kb, 2), "hs-k"), "kurang berulang: pembagian adalah pengurangan berulang");
  }
  const kf = adegan(M_VIDEO, "keluarga-fakta");
  cek(ada(akhirAdegan(kf, 0), "bm", "rm") && ["fa", "fb", "fc", "eq"].map((id) => isiTeks(akhirAdegan(kf, 0), id)).join("|") === "24|4|6|4 × 6 = 24", "keluarga fakta: rumah segitiga 4, 6, 24 dan 4 × 6 = 24");
  cek(isiTeks(akhirAdegan(kf, 1), "d2") === "2 pembagian" && isiTeks(akhirAdegan(kf, 1), "k1-t0") === "24 : 4 = 6" && isiTeks(akhirAdegan(kf, 1), "k2-t0") === "24 : 6 = 4", "keluarga fakta: dua pembagian");
  cek(["m1-t0", "m2-t0", "b1-t0", "b2-t0"].map((id) => isiTeks(akhirAdegan(kf, 2), id)).join("|") === "4 × 6|6 × 4|24 : 4|24 : 6" && ada(akhirAdegan(kf, 2), "pa", "kc", "ok"), "keluarga fakta: empat kalimat, kali dan bagi berkaitan, diperiksa");
  const cb = adegan(M_VIDEO, "soal-cerita-bagi");
  cek(banyakId(akhirAdegan(cb, 0), /^mb\d+$/) === 15 && ada(akhirAdegan(cb, 0), "bw", "nn", "pl0", "pl2", "cc2") && isiTeks(akhirAdegan(cb, 0), "n15") === "15 manik" && isiTeks(akhirAdegan(cb, 0), "n3") === "3 cucu", "cerita bagi: lima belas manik di mangkuk, tiga piring dan tiga cucu");
  cek(isiTeks(akhirAdegan(cb, 1), "kb") === "3 × 5 = 15", "cerita bagi: tiga kali lima sama dengan lima belas");
  {
    const a2 = akhirAdegan(cb, 2);
    const tiap = [0, 1, 2].map((i) => banyakId(a2, new RegExp(`^pb${i}\\d$`)));
    cek(tiap.join() === "5,5,5" && 15 / 3 === tiap[0] && banyakId(a2, /^mb\d+$/) === 0 && isiTeks(a2, "ka") === "15 : 3 = 5" && isiTeks(a2, "kc") === "3 × 5 = 15", "cerita bagi: tiap cucu lima manik (hitung ulang), 15 : 3 = 5 dan 3 × 5 = 15");
  }
  const pk = adegan(M_VIDEO, "periksa-kali");
  cek(banyakId(akhirAdegan(pk, 0), /^an\d$/) === 9 && isiTeks(akhirAdegan(pk, 0), "n36") === "36 permen" && isiTeks(akhirAdegan(pk, 0), "n9") === "9 anak" && isiTeks(akhirAdegan(pk, 0), "kl") === "9 × ? = 36" && ada(akhirAdegan(pk, 0), "rk", "pm"), "periksa kali: Raka, tiga puluh enam permen, sembilan anak");
  cek(isiTeks(akhirAdegan(pk, 1), "kl") === "9 × 4 = 36" && isiTeks(akhirAdegan(pk, 1), "t4") === "tiap anak 4 permen" && 36 / 9 === 4, "periksa kali: sembilan kali empat sama dengan tiga puluh enam");
  cek(isiTeks(akhirAdegan(pk, 2), "pa-t0") === "36 : 9 = 4" && isiTeks(akhirAdegan(pk, 2), "pb-t0") === "9 × 4 = 36" && ada(akhirAdegan(pk, 2), "o1", "o2", "tw", "sr", "rk"), "periksa kali: pembagian cocok dengan perkalian, Raka tersenyum");
  const pn = adegan(M_VIDEO, "penutup");
  cek(ada(akhirAdegan(pn, 0), "rk", "gl", "kf0", "kf9", "sr", "b1", "b2", "ok") && banyakId(akhirAdegan(pn, 0), /^bk\d+$/) === 6, "penutup: Raka membungkus ulang bingkisan, balon dan konfeti");
  cek(ada(akhirAdegan(pn, 1), "sp", "sp-t", "pj", "t0", "t1", "t2", "t3", "t4", "t5", "tp0", "tp2") && isiTeks(akhirAdegan(pn, 1), "sp-t") === "OBRAL HARI JADI TOKO MERIAH", "penutup: spanduk OBRAL HARI JADI TOKO MERIAH, enam tamu bertepuk tangan");
  cek(["t0-n", "t1-n", "t2-n", "t3-n", "t4-n", "t5-n"].map((id) => isiTeks(akhirAdegan(pn, 1), id)).join() === "Dewi,Wati,Dodi,Tuti,Anto,Mirna", "penutup: enam tamu A sampai F");
  cek(ada(akhirAdegan(pn, 2), "sp", "sp-t", "kf0", "kf9", "rk", "sl", "bm", "pj", "nn", "t0", "t5", "b1", "b2", "pk") && ["o0", "o1", "o2", "o3", "o4"].map((id) => isiTeks(akhirAdegan(pn, 2), id)).join(" ") === "123 + - × :", "penutup: spanduk, konfeti, balon, lima tokoh, enam tamu, lima operasi");
  // Metode global.
  const op = adegan(U, "luar-pembuka");
  cek(ada(akhirAdegan(op, 0), "sp", "sl", "c0-k", "c2-k") && isiTeks(akhirAdegan(op, 0), "n3") === "3 catatan" && !ketemu(akhirAdegan(op, 0), "c3-k"), "global pembuka: Salsa menemukan tiga lembar catatan di bawah spanduk");
  cek(isiTeks(akhirAdegan(op, 1), "n3") === "3 cara" && ada(akhirAdegan(op, 1), "nn"), "global pembuka: Nenek Ijah menyebut tiga cara");
  sama(["m0", "m1", "m2"].map((id) => isiTeks(akhirAdegan(op, 2), id)), ["1. Fair Share", "2. Repeated Subtraction", "3. Fact Family"], "global pembuka: tiga nama metode");
  sama(["q0", "q1", "q2"].map((id) => isiTeks(akhirAdegan(op, 3), id)), ["Bagi Rata", "Kurang Berulang", "Keluarga Fakta"], "global pembuka: tiga nama bahasa Indonesia");
  const lr = adegan(U, "luar-rata");
  cek(isiTeks(akhirAdegan(lr, 0), "nm-t0") === "Fair Share" && isiTeks(akhirAdegan(lr, 0), "nid") === "Bagi Rata", "Bagi Rata konsep: nama");
  {
    const a1 = akhirAdegan(lr, 1);
    cek(isiTeks(a1, "s1") === "1 untuk tiap bagian" && [0, 1, 2].map((i) => banyakId(a1, new RegExp(`^g${i}\\d$`))).join() === "2,2,2" && banyakId(a1, /^bk\d$/) === 3, "Bagi Rata konsep: dibagi satu-satu bergiliran, dua putaran");
    const a2 = akhirAdegan(lr, 2);
    cek([0, 1, 2].map((i) => banyakId(a2, new RegExp(`^g${i}\\d$`))).join() === "3,3,3" && banyakId(a2, /^bk\d$/) === 0 && [0, 1, 2].every((i) => isiTeks(a2, `h${i}`) === "3"), "Bagi Rata konsep: sampai habis, isi tiap bagian dihitung");
    cek(isiTeks(akhirAdegan(lr, 3), "hb-t0") === "hasil bagi" && ketemu(akhirAdegan(lr, 3), "kr1").sorot === true, "Bagi Rata konsep: banyak barang tiap bagian adalah hasil bagi");
  }
  const lt = adegan(U, "luar-rata-terapan");
  cek(isiTeks(akhirAdegan(lt, 0), "n18") === "18 kue" && banyakId(akhirAdegan(lt, 0), /^ku\d+$/) === 18 && ada(akhirAdegan(lt, 0), "bm", "pg0", "pg2") && isiTeks(akhirAdegan(lt, 0), "n3") === "3 piring" && isiTeks(akhirAdegan(lt, 0), "s1") === "1 per piring", "Bagi Rata terapan: Bima, delapan belas kue, tiga piring");
  cek([0, 1, 2].map((i) => banyakId(akhirAdegan(lt, 1), new RegExp(`^kp${i}\\d$`))).join() === "6,6,6" && 18 / 3 === 6 && banyakId(akhirAdegan(lt, 1), /^ku\d+$/) === 0, "Bagi Rata terapan: tiap piring enam kue (hitung ulang)");
  cek(isiTeks(akhirAdegan(lt, 2), "cc-t0") === "Cocok" && banyakId(akhirAdegan(lt, 2), /^bk\d+$/) === 8 && ada(akhirAdegan(lt, 2), "ny", "tg", "ok") && isiTeks(akhirAdegan(lt, 3), "kc-t0") === "Kurang cocok" && isiTeks(akhirAdegan(lt, 3), "bs") === "96 kue" && ada(akhirAdegan(lt, 3), "jm", "x1"), "Bagi Rata terapan: cocok dan kurang cocok");
  const lk = adegan(U, "luar-kurang");
  cek(isiTeks(akhirAdegan(lk, 0), "nm-t0") === "Repeated Subtraction" && isiTeks(akhirAdegan(lk, 0), "nid") === "Kurang Berulang" && ada(akhirAdegan(lk, 1), "dv-k", "pb0-k", "pb1-k", "pb2-k"), "Kurang Berulang konsep: nama, bilangan yang dibagi dikurangi pembagi berulang");
  cek(isiTeks(akhirAdegan(lk, 2), "n0") === "0" && ada(akhirAdegan(lk, 2), "st", "hn-k") && isiTeks(akhirAdegan(lk, 3), "a-t0") === "banyak kurang" && isiTeks(akhirAdegan(lk, 3), "b-t0") === "hasil bagi" && isiTeks(akhirAdegan(lk, 3), "sm") === "=", "Kurang Berulang konsep: berhenti di nol, banyak pengurangan sama dengan hasil bagi");
  const ltr = adegan(U, "luar-kurang-terapan");
  {
    const a0 = akhirAdegan(ltr, 0);
    const busur = [20, 15, 10, 5].map((v) => ketemu(a0, `gl-a${v}`));
    cek([20, 15, 10, 5, 0].every((v) => isiTeks(a0, `gl-l${v}`) === String(v)) && busur.every(Boolean) && busur.length === 20 / 5 && busur.every((b, i) => b.x === 30 + (20 - 5 * (i + 1)) * 12) && ketemu(a0, "pt").x === 30 && ada(a0, "rk"), "Kurang Berulang terapan: dua puluh dikurangi lima empat kali sampai nol (hitung ulang busur)");
    cek(isiTeks(akhirAdegan(ltr, 1), "c4") === "4 kali" && isiTeks(akhirAdegan(ltr, 1), "hs-t0") === "hasil bagi = 4", "Kurang Berulang terapan: empat kali, hasil bagi empat");
    cek(isiTeks(akhirAdegan(ltr, 2), "cc-t0") === "Cocok" && banyakId(akhirAdegan(ltr, 2), /^gl-a\d+$/) === 2 && isiTeks(akhirAdegan(ltr, 2), "sd") === "2 langkah saja", "Kurang Berulang terapan: pembagi besar, dua langkah");
    cek(isiTeks(akhirAdegan(ltr, 3), "kc-t0") === "Kurang cocok" && banyakId(akhirAdegan(ltr, 3), /^gl-a\d+$/) === 30 / 2 && isiTeks(akhirAdegan(ltr, 3), "n15") === "15 langkah" && ada(akhirAdegan(ltr, 3), "jm"), "Kurang Berulang terapan: pembagi kecil, lima belas langkah kecil");
  }
  const lf = adegan(U, "luar-keluarga");
  cek(isiTeks(akhirAdegan(lf, 0), "nm-t0") === "Fact Family" && isiTeks(akhirAdegan(lf, 0), "nid") === "Keluarga Fakta" && ada(akhirAdegan(lf, 0), "ic"), "Keluarga Fakta konsep: nama");
  cek(isiTeks(akhirAdegan(lf, 1), "n3") === "3 bilangan" && isiTeks(akhirAdegan(lf, 1), "k2") === "2 perkalian" && isiTeks(akhirAdegan(lf, 1), "p2") === "2 pembagian" && ada(akhirAdegan(lf, 1), "rm", "n0", "n2"), "Keluarga Fakta konsep: tiga bilangan, dua perkalian, dua pembagian");
  cek(["fa", "fb", "fc"].map((id) => isiTeks(akhirAdegan(lf, 2), id)).join() === "21,3,7" && ["c0-t0", "c1-t0", "c2-t0", "c3-t0"].map((id) => isiTeks(akhirAdegan(lf, 2), id)).join("|") === "3 × 7 = 21|7 × 3 = 21|21 : 3 = 7|21 : 7 = 3" && 3 * 7 === 21 && 21 / 3 === 7 && 21 / 7 === 3, "Keluarga Fakta konsep: 3, 7, 21 membentuk empat kalimat");
  cek(isiTeks(akhirAdegan(lf, 3), "kl") === "4 × ? = 28" && ada(akhirAdegan(lf, 3), "pk-k", "hb-k", "pa", "lp"), "Keluarga Fakta konsep: perkalian mencari hasil bagi");
  const lft = adegan(U, "luar-keluarga-terapan");
  cek(isiTeks(akhirAdegan(lft, 0), "kb") === "28 : 4" && isiTeks(akhirAdegan(lft, 0), "kc") === "4 × ? = 28" && ada(akhirAdegan(lft, 0), "sl"), "Keluarga Fakta terapan: Salsa, 28 : 4 dan 4 × ? = 28");
  cek(isiTeks(akhirAdegan(lft, 1), "kc") === "4 × 7 = 28" && isiTeks(akhirAdegan(lft, 1), "hs-t0") === "28 : 4 = 7" && 4 * 7 === 28, "Keluarga Fakta terapan: empat kali tujuh, hasil bagi tujuh");
  cek(isiTeks(akhirAdegan(lft, 2), "pf") === "4 × 7 = 28" && ada(akhirAdegan(lft, 2), "cc-k", "ot") && isiTeks(akhirAdegan(lft, 3), "pf") === "? × ? = 56" && ada(akhirAdegan(lft, 3), "kc-k", "pk", "x1"), "Keluarga Fakta terapan: cocok dan kurang cocok");
  const rk = adegan(U, "luar-ringkas");
  cek(["r0-t0", "r1-t0", "r2-t0"].map((id) => isiTeks(akhirAdegan(rk, 0), id)).join() === "1. Bagi Rata,2. Kurang Berulang,3. Keluarga Fakta" && isiTeks(akhirAdegan(rk, 0), "n3") === "3 cara", "ringkasan: tiga metode");
  cek(ketemu(akhirAdegan(rk, 1), "r1-k").sorot === true && ada(akhirAdegan(rk, 1), "hd", "bs") && ketemu(akhirAdegan(rk, 2), "r2-k").sorot === true && ada(akhirAdegan(rk, 2), "ot", "kc", "ok"), "ringkasan: barang nyata, pembagi besar, perkalian hafal, diperiksa");
  cek(isiTeks(akhirAdegan(rk, 3), "n45") === "45 permen" && isiTeks(akhirAdegan(rk, 3), "n5") === "5 anak" && ada(akhirAdegan(rk, 3), "o0-k", "o1-k", "o2-k", "rk", "sl", "bm", "tz"), "ringkasan: empat puluh lima permen untuk lima anak, tiga cara dipilih");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k3b1G-.*\.ts$/.test(f));
  cek(berkas.length >= 8, `berkas story k3b1G (${berkas.length})`);
  cek(!berkas.includes("k3b1G-materi-4.ts") && !berkas.includes("k3b1G-materi-5.ts"), "k3b1G-materi-4.ts dan materi-5.ts sudah dihapus");
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku/i.test(s), `${f}: tanpa kata buku`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k3b1G-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, atau k3b1G (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k3b1g.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K3B1G/.test(pb) && /VIDEO_LUAR_K3B1G/.test(pb) && /export function VideoK3B1G/.test(pb) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pb) && !/\r/.test(pb) && !pb.startsWith("﻿"), "video-k3b1g.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
