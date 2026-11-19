// Uji Story Kelas 2 Bab 8 Sub-Bab A "Alat Musik Pak Hendra" (diagram turus), awal cerita Pentas Seni Sekolah: video materi dan video metode global.
// Jalankan: node --no-warnings scripts/uji-story-k2b8A.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k2b8A-video.ts");

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
const VIDEO = [V.VIDEO_MATERI_K2B8A, V.VIDEO_LUAR_K2B8A];
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




/* ------------------------------ Khusus Sub-Bab A Kelas 2 Bab 8 ------------------------------ */
{
  const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
  const U1 = await import("../src/components/modul/story/k2b8A-luar-1.ts");
  const M_VIDEO = V.VIDEO_MATERI_K2B8A;
  const U = V.VIDEO_LUAR_K2B8A;
  const adegan = (v, id) => v.adegan.find((a) => a.id === id);
  const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
  const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
  const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  const ketemu = (objs, id) => objs.find((o) => o.id === id);
  const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
  const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));
  const tidakAda = (objs, ...ids) => ids.every((id) => !ketemu(objs, id));

  // Pembaca bilangan yang diucapkan dengan kata: satuan, sepuluh, belasan (dua belas), puluhan majemuk, seratus.
  const SATUAN = { satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8, sembilan: 9 };
  // "Hitung Lima-Lima" adalah nama metode (bukan bilangan yang perlu tampak sebagai angka).
  const bilanganSuara = (s0) => {
    const s = s0.replace(/Hitung Lima-Lima/g, "Hitung");
    const t = s.toLowerCase().split(/[^a-z]+/).filter(Boolean);
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
  sama(bilanganSuara("Sepuluh, dua puluh, lima puluh satu, Hitung Lima-Lima, lima-lima."), [10, 20, 51, 5, 5], "pembaca bilangan suara (nama metode)");
  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Sorting Mat|Count by Fives|Real Graph|Alas Pilah|Hitung Lima-Lima|Diagram Benda Nyata/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Sorting Mat", "Count by Fives", "Real Graph"], ["Alas Pilah", "Hitung Lima-Lima", "Diagram Benda Nyata"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Alat Musik Pak Hendra" && U.judul === M_VIDEO.judul && V.JUDUL_K2B8A === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k2b8A-materi" && U.id === "k2b8A-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,balik-tirai,pilah-hitung,satu-garis,salah-hitung,bundel-lima,diagram-turus,baca-diagram,data-sendiri,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-alas,luar-alas-terapan,luar-lima,luar-lima-terapan,luar-nyata,luar-nyata-terapan,luar-ringkas", "urutan adegan metode global");
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
  const semuaSuara = M_VIDEO.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12]) cek(bilanganSuara(semuaSuara).includes(n), `video materi mengucapkan bilangan ${n}`);
  const semuaLuar = U.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [1, 2, 3, 5, 6, 10, 15, 16, 17, 100]) cek(bilanganSuara(semuaLuar).includes(n), `video global mengucapkan bilangan ${n}`);
  for (const kata of ["Chacha", "Dika", "Nia", "Bu Sari", "Pak Hendra", "Bu Maya", "angklung", "seruling", "gendang", "rebana", "turus", "bundel", "dipilah", "kostum ayam", "tabel", "judul", "paling banyak", "lebihnya", "kurangnya", "tari", "musik", "drama", "papan layar"])
    cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const pola of [/Igil/, /Kaka/, /Abang/, /Mamah/, /Pak Pos/i, /rumah rapi/i, /akuarium/i, /pasar malam/i, /rumah pohon/i, /pustaka/i, /perpustakaan/i, /kantin/i, /koperasi/i, /seragam/i, /Bu Dewi/, /Pak Rudi/, /Pak Tono/, /Pak Hasan/, /Bu Mira/, /ubin/i, /taman bermain/i, /puzzle/i, /pameran/i, /\baula\b/i, /\brak\b/i, /manik/i, /Pak Joko/, /Pak Danu/, /Bu Wati/, /kebun/i, /semangka/i, /bedeng/i, /pagar/i, /Pak Anton/, /Bu Ratna/, /olahraga/i, /lapangan/i, /neraca/i, /troli/i, /Pak Ujang/, /Bu Lia/, /bank sampah/i, /gudang/i, /tali rafia/i, /botol/i, /Pak Ahmad/, /Halim/, /Malosi/, /Upe/, /Tika/, /Lili/])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `durasi video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/diagram turus/.test(sapa.ketukan[0].suara) && ["Memilah dan menghitung data", "Membuat diagram turus", "Membaca diagram turus"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
  cek(M_VIDEO.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  // Naskah tetap: kalimat suara sama dengan berkas naskah.
  const naskah = readFileSync(new URL("../naskah/story-naskah-k2b8a.md", import.meta.url), "utf8");
  const dalamNaskah = (s) => naskah.replace(/\s+/g, " ").includes(s.replace(/\s+/g, " "));
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) cek(dalamNaskah(kt.suara), `${v.id}/${a.id}: suara sesuai naskah tetap ("${kt.suara.slice(0, 40)}")`);
  // Visual berubah mengikuti kata pada hampir semua ketukan.
  let banyakTitik = 0;
  let total = 0;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) { total += 1; if (new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at))).size >= 2) banyakTitik += 1; }
  cek(banyakTitik / total >= 0.9, `visual berubah mengikuti kata pada sedikitnya 90 persen ketukan (${banyakTitik}/${total})`);
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") cek(akhirAdegan(a).some((o) => o.t !== "teks"), `${v.id}/${a.id}: gambar akhir memuat bentuk gambar sendiri, bukan hanya teks`);

  // Isi tiap adegan materi.
  const b = adegan(M_VIDEO, "balik-tirai");
  cek(ada(akhirAdegan(b, 0), "lt", "tr-l", "tr-r", "rg", "l1", "l2", "ps", "ps-t", "ph", "ph-cp", "ph-rm", "ph-sb", "pt", "pt-t", "pa", "pb", "pc") && isiTeks(akhirAdegan(b, 0), "ps-t") === "PENTAS SENI" && isiTeks(akhirAdegan(b, 0), "ph-n") === "Pak Hendra", "balik tirai: tirai, lampu sorot, poster PENTAS SENI, Pak Hendra bertopi biru dan bersabuk perkakas, peti alat musik");
  cek(ada(akhirAdegan(b, 1), "bs", "bs-sl", "bs-kp", "bs-rt", "bs-pj") && isiTeks(akhirAdegan(b, 1), "bs-rt") === "PANITIA", "balik tirai: Bu Sari berselendang batik, kartu PANITIA, papan jepit");
  cek(ada(akhirAdegan(b), "tp0", "tp3", "tp4", "tp6", "tp7", "tp8", "tp9", "tp10") && isiTeks(akhirAdegan(b), "n1") === "1 tumpukan", "balik tirai: empat jenis alat musik bercampur dalam satu tumpukan");
  const p = adegan(M_VIDEO, "pilah-hitung");
  cek(ada(akhirAdegan(p, 0), "al", "pl0", "pl8", "pl9", "pl22") && ketemu(akhirAdegan(p, 0), "pl0").x === 67 && ketemu(akhirAdegan(p, 0), "pl8").x === 187, "pilah hitung: dua puluh tiga alat musik terpilah ke empat baris");
  sama(["lb0", "lb1", "lb2", "lb3"].map((id) => isiTeks(akhirAdegan(p, 0), id)), ["Angklung", "Seruling", "Gendang", "Rebana"], "pilah hitung: nama empat jenis");
  sama(["t1", "t2", "t3"].map((id) => isiTeks(akhirAdegan(p, 1), id)), ["1", "2", "3"], "pilah hitung: tanda hitung satu, dua, tiga di baris angklung");
  cek(ada(akhirAdegan(p), "pj", "td-g0", "td-g2", "jt", "ld") && isiTeks(akhirAdegan(p), "jt") === "turus", "pilah hitung: garis lidi di papan jepit");
  const g = adegan(M_VIDEO, "satu-garis");
  cek(ada(akhirAdegan(g, 0), "g1", "rb", "pj", "tj-g0") && isiTeks(akhirAdegan(g, 0), "n1") === "1 garis" && isiTeks(akhirAdegan(g, 0), "n2") === "1 benda", "satu garis: satu rebana ditulis satu garis");
  cek(ada(akhirAdegan(g, 1), "gd0", "gd3", "gl0", "gl3") && isiTeks(akhirAdegan(g, 1), "n4") === "4 gendang" && isiTeks(akhirAdegan(g, 1), "n1") === "1 garis = 1 gendang", "satu garis: empat gendang empat garis");
  cek(ada(akhirAdegan(g), "bt", "pk", "pr", "gk0", "gk3", "gr0", "gr3") && isiTeks(akhirAdegan(g), "sm") === "=" && isiTeks(akhirAdegan(g), "tl") === "tidak lebih" && isiTeks(akhirAdegan(g), "tk") === "tidak kurang", "satu garis: garis sama banyak dengan benda");
  const sh = adegan(M_VIDEO, "salah-hitung");
  cek(ada(akhirAdegan(sh, 0), "ch", "cm0", "cm22", "ts", "ay", "gh") && ketemu(akhirAdegan(sh, 0), "ay").isi === "\u{1F414}", "salah hitung: Chacha menunjuk tumpukan campur, kostum ayam digantung");
  cek(ada(akhirAdegan(sh, 1), "rg", "d2", "xs", "ph", "tq", "r1", "r2", "r3") && isiTeks(akhirAdegan(sh, 1), "d2") === "2 kali" && ketemu(akhirAdegan(sh, 1), "cm9").op === 0.25, "salah hitung: angklung dua kali, seruling terlewat, Pak Hendra bingung");
  cek(ada(akhirAdegan(sh), "dk", "rp0", "rp22", "rc0", "rc3", "sp") && tidakAda(akhirAdegan(sh), "cm0", "ch"), "salah hitung: Dika menunjuk empat baris terpilah dengan tanda centang");
  const bl = adegan(M_VIDEO, "bundel-lima");
  cek(ada(akhirAdegan(bl, 0), "ch", "pg0", "pg8") && isiTeks(akhirAdegan(bl, 0), "n9") === "9 garis" && isiTeks(akhirAdegan(bl, 0), "n10") === "10", "bundel lima: sembilan garis panjang dihitung sepuluh");
  cek(ada(akhirAdegan(bl, 1), "ph", "bg0", "bg3", "bm") && isiTeks(akhirAdegan(bl, 1), "n1") === "1 bundel" && isiTeks(akhirAdegan(bl, 1), "n5") === "= 5", "bundel lima: empat garis dan coretan miring");
  sama(["c5", "c6", "c7", "c8", "c9"].map((id) => isiTeks(akhirAdegan(bl), id)), ["5", "6", "7", "8", "9"], "bundel lima: hitungan lima sampai sembilan");
  cek(ada(akhirAdegan(bl), "tu-g0", "tu-m0", "tu-g8") && tidakAda(akhirAdegan(bl), "tu-m1"), "bundel lima: satu bundel dan empat garis");
  const dt = adegan(M_VIDEO, "diagram-turus");
  cek(ada(akhirAdegan(dt, 0), "ni", "ni-tp", "tb", "tb-h", "tb-v0", "tb-v1") && isiTeks(akhirAdegan(dt, 0), "hn") === "Nama" && isiTeks(akhirAdegan(dt, 0), "ht") === "Turus" && isiTeks(akhirAdegan(dt, 0), "hb") === "Banyaknya" && isiTeks(akhirAdegan(dt, 0), "n3") === "3 kolom", "diagram turus: tabel tiga kolom nama, turus, banyaknya");
  cek(isiTeks(akhirAdegan(dt, 1), "jj") === "Alat Musik Pentas", "diagram turus: judul Alat Musik Pentas");
  cek(ada(akhirAdegan(dt), "r0-t-g0", "r1n", "r2n", "r3n"), "diagram turus: empat baris terisi turus");
  sama(["rb0", "rb1", "rb2", "rb3"].map((id) => isiTeks(akhirAdegan(dt), id)), ["9", "6", "4", "4"], "diagram turus: banyaknya 9, 6, 4, 4");
  const bd = adegan(M_VIDEO, "baca-diagram");
  cek(ada(akhirAdegan(bd, 0), "hl", "pb", "st") && isiTeks(akhirAdegan(bd, 0), "pb") === "paling banyak", "baca diagram: angklung paling panjang disorot");
  cek(ada(akhirAdegan(bd, 1), "h2", "h3", "br", "eq") && tidakAda(akhirAdegan(bd, 1), "hl") && isiTeks(akhirAdegan(bd, 1), "pb") === "sama banyak", "baca diagram: gendang dan rebana sama panjang");
  cek(isiTeks(akhirAdegan(bd), "l3") === "3 lebih" && isiTeks(akhirAdegan(bd), "k3") === "3 kurang" && ada(akhirAdegan(bd), "ta-g8", "ts-g5", "gd", "gh6", "gh8"), "baca diagram: tiga lebih dan tiga kurang");
  const ds = adegan(M_VIDEO, "data-sendiri");
  cek(ada(akhirAdegan(ds, 0), "ni", "kd0", "kd11", "bt-k", "bu-k", "bd-k") && isiTeks(akhirAdegan(ds, 0), "n12") === "12 anak", "data sendiri: Nia bertanya kepada dua belas anak");
  cek(ada(akhirAdegan(ds, 1), "u0-g0", "u0-m0", "u1-g3", "u2-g2") && tidakAda(akhirAdegan(ds, 1), "u1-m0"), "data sendiri: satu garis tiap jawaban di tiga baris");
  sama(["a5", "a4", "a3"].map((id) => isiTeks(akhirAdegan(ds), id)), ["5", "4", "3"], "data sendiri: tari 5, musik 4, drama 3");
  cek(ada(akhirAdegan(ds), "hl", "jr") && isiTeks(akhirAdegan(ds), "nj") === "jumlah 12 anak", "data sendiri: tari disorot, jumlah dua belas anak");
  const pn = adegan(M_VIDEO, "penutup");
  cek(ada(akhirAdegan(pn, 0), "ch", "l3", "l3-s", "kk") && ketemu(akhirAdegan(pn, 0), "ch").isi === "\u{1F414}" && isiTeks(akhirAdegan(pn, 0), "kk") === "kukuruyuk!", "penutup: Chacha berkostum ayam berkokok di bawah lampu sorot");
  cek(ada(akhirAdegan(pn, 1), "bm", "bm-kb", "bm-sg", "pl", "pl-v4", "pl-w3", "tq") && isiTeks(akhirAdegan(pn, 1), "bm-n") === "Bu Maya", "penutup: Bu Maya berkebaya ungu bersanggul membawa papan layar kosong");
  cek(ada(akhirAdegan(pn), "ch", "dk", "ni", "bs", "ph", "lb0", "lb4", "qq", "tq-g0"), "penutup: lima tokoh melambai dan pertanyaan penutup");

  // Isi tiap adegan metode global.
  const op = adegan(U, "luar-pembuka");
  cek(ada(akhirAdegan(op, 0), "ni", "n3", "c0-k", "c2-k") && isiTeks(akhirAdegan(op, 0), "n3") === "3 lembar", "global pembuka: Nia menemukan tiga lembar catatan");
  cek(ada(akhirAdegan(op, 1), "ph", "bb0", "ok") && ketemu(akhirAdegan(op, 1), "ph").isi === "\u{1F60A}", "global pembuka: Pak Hendra tersenyum");
  sama(["m0", "m1", "m2"].map((id) => isiTeks(akhirAdegan(op, 2), id)), ["1. Sorting Mat", "2. Count by Fives", "3. Real Graph"], "global pembuka: tiga nama metode");
  sama(["g0", "g1", "g2"].map((id) => isiTeks(akhirAdegan(op, 3), id)), ["Alas Pilah", "Hitung Lima-Lima", "Diagram Benda Nyata"], "global pembuka: tiga nama bahasa Indonesia");
  const al = adegan(U, "luar-alas");
  cek(ada(akhirAdegan(al, 0), "al", "al-s0", "al-s1") && isiTeks(akhirAdegan(al, 0), "nm") === "Alas Pilah", "Alas Pilah konsep: alas berbaris");
  cek(isiTeks(akhirAdegan(al, 1), "n1") === "1 baris = 1 jenis" && ada(akhirAdegan(al, 1), "hb", "b0", "b1", "b2", "kr"), "Alas Pilah konsep: satu baris satu jenis, nama di ujung kiri");
  cek(ada(akhirAdegan(al, 2), "i0", "i6", "ok") && ketemu(akhirAdegan(al, 2), "i0").y === 72 && ketemu(akhirAdegan(al, 2), "i3").y === 132, "Alas Pilah konsep: benda ditaruh di baris jenisnya");
  sama(["h0", "h1", "h2"].map((id) => isiTeks(akhirAdegan(al), id)), ["3", "2", "2"], "Alas Pilah konsep: hitung tiap baris");
  const at = adegan(U, "luar-alas-terapan");
  cek(ada(akhirAdegan(at, 0), "ch", "tp5", "sl2", "sp4") && !ketemu(akhirAdegan(at, 0), "tp6"), "Alas Pilah terapan: perlengkapan Chacha di alas");
  sama(["n6", "n3", "n5"].map((id) => isiTeks(akhirAdegan(at, 0), id)), ["6", "3", "5"], "Alas Pilah terapan: topi enam, selendang tiga, sepatu lima");
  cek(ada(akhirAdegan(at, 1), "c1", "c6", "pa", "pb", "pc"), "Alas Pilah terapan: dihitung satu per satu, bilangan di ujung kanan");
  cek(ada(akhirAdegan(at, 2), "ok", "cc-k", "cm0", "cm8") && ada(akhirAdegan(at, 3), "xs", "rt0", "rp3", "sa"), "Alas Pilah terapan: cocok untuk benda campur aduk, kurang cocok untuk benda sudah rapi");
  const li = adegan(U, "luar-lima");
  cek(ada(akhirAdegan(li, 0), "tf-g0", "tf-m2", "tf-g13") && isiTeks(akhirAdegan(li, 0), "nm") === "Hitung Lima-Lima", "Hitung Lima-Lima konsep: tiga bundel turus");
  cek(ada(akhirAdegan(li, 1), "b0", "b1", "p0", "p1", "n1") && isiTeks(akhirAdegan(li, 1), "n1") === "1 bundel", "Hitung Lima-Lima konsep: melompat lima-lima, menunjuk satu bundel");
  sama(["t0-n", "t5-n", "t10-n", "t15-n"].map((id) => isiTeks(akhirAdegan(li, 2), id)), ["0", "5", "10", "15"], "Hitung Lima-Lima konsep: lima, sepuluh, lima belas");
  cek(ada(akhirAdegan(li), "ts-g7", "c5", "c8", "bp", "n1") && isiTeks(akhirAdegan(li), "n1") === "+1 +1 +1", "Hitung Lima-Lima konsep: garis sisa dihitung satu-satu");
  const lt = adegan(U, "luar-lima-terapan");
  sama(["c5", "c10", "c15"].map((id) => isiTeks(akhirAdegan(lt, 0), id)), ["5", "10", "15"], "Hitung Lima-Lima terapan: tiga bundel lima, sepuluh, lima belas");
  cek(ada(akhirAdegan(lt, 1), "tt-g15", "tt-g16") && isiTeks(akhirAdegan(lt, 1), "c16") === "16" && isiTeks(akhirAdegan(lt, 1), "c17") === "17" && isiTeks(akhirAdegan(lt, 1), "tot") === "semuanya 17", "Hitung Lima-Lima terapan: dua garis sisa, tujuh belas");
  cek(ada(akhirAdegan(lt, 2), "ok", "cc-k", "tb-g0", "tb-m5") && ada(akhirAdegan(lt, 3), "xs", "tc-g2", "cp"), "Hitung Lima-Lima terapan: cocok untuk turus banyak, kurang cocok untuk sedikit");
  const nj = adegan(U, "luar-nyata");
  cek(ada(akhirAdegan(nj, 0), "gd", "rn0", "rn2") && isiTeks(akhirAdegan(nj, 0), "nm") === "Diagram Benda Nyata", "Diagram Benda Nyata konsep: benda aslinya dari garis dasar");
  cek(ada(akhirAdegan(nj, 1), "an6", "gn4", "l0", "l1", "l2", "ok") && isiTeks(akhirAdegan(nj, 1), "n1") === "1 jenis = 1 lajur", "Diagram Benda Nyata konsep: satu jenis satu lajur");
  cek(ada(akhirAdegan(nj, 2), "st", "pb") && ketemu(akhirAdegan(nj, 2), "an0").sorot === true, "Diagram Benda Nyata konsep: lajur terpanjang paling banyak");
  cek(ada(akhirAdegan(nj), "gp", "mt", "pj") && isiTeks(akhirAdegan(nj), "pj") === "lihat panjang lajur", "Diagram Benda Nyata konsep: membandingkan tanpa menghitung");
  const nt = adegan(U, "luar-nyata-terapan");
  cek(ada(akhirAdegan(nt, 0), "ni", "gd", "sr5", "rb3") && !ketemu(akhirAdegan(nt, 0), "rb4") && isiTeks(akhirAdegan(nt, 0), "n1") === "1 lajur", "Diagram Benda Nyata terapan: lajur seruling dan lajur rebana");
  cek(ada(akhirAdegan(nt, 1), "sm", "ok") && ketemu(akhirAdegan(nt, 1), "sr0").sorot === true, "Diagram Benda Nyata terapan: lajur seruling lebih panjang");
  cek(ada(akhirAdegan(nt, 2), "ok", "kc0", "kc6", "cc-k", "gd", "bj") && ada(akhirAdegan(nt, 3), "xs", "bg", "br", "pz", "sl"), "Diagram Benda Nyata terapan: cocok untuk benda kecil sama, kurang cocok untuk benda besar dan berat");
  const rk = adegan(U, "luar-ringkas");
  cek(ada(akhirAdegan(rk, 0), "r0-k", "r1-k", "r2-k", "tq", "tg") && isiTeks(akhirAdegan(rk, 0), "n3") === "3 cara", "ringkasan: tiga kartu cara dan pertanyaan mana yang pas");
  cek(ketemu(akhirAdegan(rk, 1), "r1-k").sorot && !ketemu(akhirAdegan(rk, 1), "r0-k").sorot && ada(akhirAdegan(rk, 1), "cp", "n5"), "ringkasan: Alas Pilah untuk benda campur, Hitung Lima-Lima untuk turus bundel lima-lima");
  cek(ketemu(akhirAdegan(rk, 2), "r2-k").sorot && !ketemu(akhirAdegan(rk, 2), "r1-k").sorot && isiTeks(akhirAdegan(rk, 2), "n1") === "1 benda = 1 kali", "ringkasan: Diagram Benda Nyata untuk membandingkan cepat, satu benda satu kali");
  cek(ada(akhirAdegan(rk), "tk0", "tk99", "p0-k", "p1-k", "p2-k", "tq") && isiTeks(akhirAdegan(rk), "n100") === "100 tiket", "ringkasan: pertanyaan memilih cara untuk seratus tiket");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k2b8A-.*\.ts$/.test(f));
  cek(berkas.length >= 8, `berkas story k2b8A (${berkas.length})`);
  cek(!berkas.includes("k2b8A-materi-4.ts") && !berkas.includes("k2b8A-materi-5.ts"), "k2b8A-materi-4.ts dan materi-5.ts sudah dihapus");
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku/i.test(s), `${f}: tanpa kata buku`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k2b8A-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, atau k2b8A (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of L.keadaanStory(a, i, 9999)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k2b8a.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K2B8A/.test(pb) && /VIDEO_LUAR_K2B8A/.test(pb) && /export function VideoK2B8A/.test(pb) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pb) && !/\r/.test(pb) && !pb.startsWith("﻿") && !/data-k2b8|video-k2b8-umum/.test(pb), "video-k2b8a.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
